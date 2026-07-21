#!/usr/bin/env node
// scripts/harvest-planete.mjs
// Observatoire de la planète — moissonneur RSS/Atom bête (sans LLM).
// Actualités + recherche environnement, orientées observations.
//
// Sortie : data/observatoire/<YYYY-MM-DD>.json
//
// Usage :
//   node scripts/harvest-planete.mjs
//   node scripts/harvest-planete.mjs --date=2026-07-21
//   node scripts/harvest-planete.mjs --max=120
//   node scripts/harvest-planete.mjs --window_hours=168

import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createHash } from 'node:crypto';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = dirname(__dirname);

const args = Object.fromEntries(
  process.argv.slice(2)
    .filter(a => a.startsWith('--'))
    .map(a => {
      const i = a.indexOf('=');
      return i < 0 ? [a.slice(2), true] : [a.slice(2, i), a.slice(i + 1)];
    })
);

const DATE = String(args.date || new Date().toISOString().slice(0, 10));
const MAX_ITEMS = Math.max(10, Number.parseInt(String(args.max || 120), 10) || 120);
// Fenêtre par défaut d'une semaine : les revues (Nature, Copernicus) publient au fil de l'eau.
const WINDOW_HOURS = Math.max(6, Number.parseInt(String(args.window_hours || 168), 10) || 168);
const MAX_PER_FEED = Math.max(3, Number.parseInt(String(args.max_per_feed || 15), 10) || 15);
const CUTOFF_MS = Date.now() - WINDOW_HOURS * 3600 * 1000;
const UA = 'theagentweekly-harvest/1.0';

function stripCdata(s) {
  return String(s || '').replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, '$1');
}

function decodeEntities(s) {
  return String(s || '')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&#x27;/g, "'")
    .replace(/&#x2F;/g, '/');
}

function cleanText(s, maxLen) {
  const t = decodeEntities(stripCdata(s))
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
  return typeof maxLen === 'number' ? t.slice(0, maxLen) : t;
}

function stableIdFromUrl(url) {
  return createHash('sha1').update(String(url || '').trim()).digest('hex').slice(0, 16);
}

function parseRSSItems(xml) {
  const items = [];
  const re = /<(item|entry)\b[\s\S]*?<\/\1>/g;
  let m;
  while ((m = re.exec(xml)) !== null) {
    const block = m[0];
    const titleRaw = (block.match(/<title[^>]*>([\s\S]*?)<\/title>/) || [])[1] || '';

    let url = '';
    const atomLinks = Array.from(block.matchAll(/<link\b[^>]*>/gi)).map(m => m[0]);
    for (const tag of atomLinks) {
      const rel = (tag.match(/\brel="([^"]+)"/i) || [])[1] || '';
      const href = (tag.match(/\bhref="([^"]+)"/i) || [])[1] || '';
      if (!href) continue;
      if (!rel || rel.toLowerCase() === 'alternate') { url = href; break; }
    }
    if (!url) {
      const rssLink = (block.match(/<link[^>]*>([\s\S]*?)<\/link>/i) || [])[1] || '';
      url = cleanText(rssLink, 800);
    }

    const pubRaw =
      (block.match(/<pubDate[^>]*>([\s\S]*?)<\/pubDate>/i) || [])[1]
      || (block.match(/<published[^>]*>([\s\S]*?)<\/published>/i) || [])[1]
      || (block.match(/<updated[^>]*>([\s\S]*?)<\/updated>/i) || [])[1]
      || (block.match(/<dc:date[^>]*>([\s\S]*?)<\/dc:date>/i) || [])[1]
      || '';

    const summaryRaw =
      (block.match(/<description[^>]*>([\s\S]*?)<\/description>/i) || [])[1]
      || (block.match(/<summary[^>]*>([\s\S]*?)<\/summary>/i) || [])[1]
      || (block.match(/<content[^>]*>([\s\S]*?)<\/content>/i) || [])[1]
      || '';

    items.push({
      title: cleanText(titleRaw, 400),
      url,
      published_raw: cleanText(pubRaw, 200),
      summary_excerpt: cleanText(summaryRaw, 450)
    });
  }
  return items;
}

function matchLexicon(blobLower, lexicon = []) {
  const hits = [];
  for (const w of lexicon) {
    const needle = String(w || '').trim().toLowerCase();
    if (!needle) continue;
    if (blobLower.includes(needle)) hits.push(w);
  }
  return hits;
}

async function main() {
  const registry = JSON.parse(await readFile(join(ROOT, 'data', 'observatoire', 'feeds-planete.json'), 'utf8'));
  const feeds = Array.isArray(registry.feeds) ? registry.feeds : [];
  const lexEnv = registry.lexique_environnement || [];
  const lexGiec = registry.lexique_giec || [];
  const axes = (registry.axes || []).filter(a => a.lexicon?.length);

  const out = {
    date: DATE,
    collected_at: new Date().toISOString(),
    kind: 'observatoire-planete',
    window_hours: WINDOW_HOURS,
    max_items: MAX_ITEMS,
    feeds_ok: 0,
    feeds_error: 0,
    items: [],
    errors: {}
  };

  const seen = new Set();
  const collected = [];

  for (const feed of feeds) {
    const fid = feed?.id;
    const furl = feed?.url;
    if (!fid || !furl) continue;

    const t0 = Date.now();
    try {
      const r = await fetch(furl, {
        headers: { 'User-Agent': UA, 'Accept': 'application/rss+xml, application/atom+xml, text/xml, application/xml, text/html;q=0.8, */*;q=0.1' },
        redirect: 'follow'
      });
      if (!r.ok) throw new Error(`HTTP ${r.status}`);
      const xml = await r.text();
      const parsed = parseRSSItems(xml);

      let kept = 0;
      for (const it of parsed) {
        if (!it.title || !it.url) continue;

        const pubMs = Date.parse(it.published_raw);
        if (Number.isFinite(pubMs) && pubMs < CUTOFF_MS) continue;

        const id = stableIdFromUrl(it.url);
        if (seen.has(id)) continue;

        const blobLower = (it.title + ' ' + it.summary_excerpt).toLowerCase();

        // Flux généralistes : ne garder que les items qui matchent le lexique environnement.
        const envHits = matchLexicon(blobLower, lexEnv);
        if (feed.filtre_environnement && !envHits.length) continue;

        seen.add(id);

        const giecHits = matchLexicon(blobLower, lexGiec);
        const axesHit = [];
        for (const a of axes) {
          if (matchLexicon(blobLower, a.lexicon).length) axesHit.push(a.id);
        }
        if (giecHits.length) axesHit.push('giec');

        collected.push({
          id,
          title: it.title,
          url: it.url,
          published: Number.isFinite(pubMs) ? new Date(pubMs).toISOString() : null,
          summary_excerpt: it.summary_excerpt,
          feed: {
            id: fid,
            name: feed.name || fid,
            lang: feed.lang || 'en',
            categorie: feed.categorie || 'actu',
            owner: feed.owner || null
          },
          axes: axesHit,
          giec_hits: giecHits,
          fetched_at: new Date().toISOString()
        });

        kept++;
        if (kept >= MAX_PER_FEED) break;
      }

      out.feeds_ok += 1;
      const dt = ((Date.now() - t0) / 1000).toFixed(1);
      process.stdout.write(`  ${fid}: ok (${kept}/${parsed.length}) · ${dt}s\n`);

    } catch (e) {
      out.feeds_error += 1;
      out.errors[fid] = String(e?.message || e);
      const dt = ((Date.now() - t0) / 1000).toFixed(1);
      process.stdout.write(`  ${fid}: ERROR ${out.errors[fid]} · ${dt}s\n`);
      continue;
    }
  }

  // Plus récents d'abord (items sans date en dernier), plafonné à MAX_ITEMS.
  collected.sort((a, b) => {
    const ta = a.published ? Date.parse(a.published) : 0;
    const tb = b.published ? Date.parse(b.published) : 0;
    return tb - ta;
  });
  out.items = collected.slice(0, MAX_ITEMS);

  const dir = join(ROOT, 'data', 'observatoire');
  await mkdir(dir, { recursive: true });
  const outPath = join(dir, `${DATE}.json`);
  await writeFile(outPath, JSON.stringify(out, null, 2));
  process.stdout.write(`\n✓ ${outPath} (${out.items.length} items · ${out.feeds_ok} flux OK · ${out.feeds_error} en erreur)\n`);
}

await main();
