#!/usr/bin/env node
// scripts/harvest-narratives.mjs
// Narrative Radar — dumb RSS/Atom harvester (no LLM).
//
// Output: data/narrative-radar/<YYYY-MM-DD>.json
//
// Usage:
//   node scripts/harvest-narratives.mjs
//   node scripts/harvest-narratives.mjs --date=2026-07-13
//   node scripts/harvest-narratives.mjs --max=200
//   node scripts/harvest-narratives.mjs --window_hours=48

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
const MAX_ITEMS = Math.max(10, Number.parseInt(String(args.max || 200), 10) || 200);
const WINDOW_HOURS = Math.max(6, Number.parseInt(String(args.window_hours || 48), 10) || 48);
const MAX_PER_FEED = Math.max(5, Number.parseInt(String(args.max_per_feed || 60), 10) || 60);
const CUTOFF_MS = Date.now() - WINDOW_HOURS * 3600 * 1000;
const UA = 'theagentweekly-harvest/1.0';

function stripCdata(s) {
  return String(s || '').replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, '$1');
}

function decodeEntities(s) {
  // Minimal entities decoding for the most common RSS cases.
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
  // Minimal parser: extracts <item>..</item> or <entry>..</entry>.
  const items = [];
  const re = /<(item|entry)\b[\s\S]*?<\/\1>/g;
  let m;
  while ((m = re.exec(xml)) !== null) {
    const block = m[0];
    const titleRaw = (block.match(/<title[^>]*>([\s\S]*?)<\/title>/) || [])[1] || '';

    // RSS: <link>URL</link>
    // Atom: <link href="URL" ... />
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

async function loadJSON(relPath) {
  const p = join(ROOT, relPath);
  return JSON.parse(await readFile(p, 'utf8'));
}

async function main() {
  const feedsRegistry = await loadJSON('data/feeds-world.json');
  const archetypes = await loadJSON('data/taxonomy/narrative-archetypes.json');
  const cases = await loadJSON('data/taxonomy/calibration-cases.json');

  const feeds = Array.isArray(feedsRegistry.feeds) ? feedsRegistry.feeds : [];

  const out = {
    date: DATE,
    collected_at: new Date().toISOString(),
    kind: 'narrative-radar',
    window_hours: WINDOW_HOURS,
    max_items: MAX_ITEMS,
    feeds_ok: 0,
    feeds_error: 0,
    coverage: { by_lang: {}, non_en_pct: 0, gap: [] },
    items: [],
    clusters: [],
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
        redirect: 'manual'
      });

      if (r.status >= 300 && r.status < 400) {
        const loc = r.headers.get('location') || '';
        throw new Error(`HTTP ${r.status} redirect ${loc}`.trim());
      }
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
        seen.add(id);

        const lang = feed.lang || 'en';
        const blobLower = (it.title + ' ' + it.summary_excerpt).toLowerCase();

        const tags_rule = [];
        for (const a of (archetypes.archetypes || [])) {
          const signals = a?.signals?.[lang] || a?.signals?.en || [];
          const hits = matchLexicon(blobLower, signals);
          if (hits.length) {
            tags_rule.push({
              archetype: a.id,
              hits,
              interpretive: true
            });
          }
        }

        const calibration_hits = [];
        for (const c of (cases.cases || [])) {
          let score = 0;
          const shared_archetypes = new Set();
          const rootsByLang = [];

          for (const dn of (c.dominant_narratives || [])) {
            for (const at of (dn.archetypes || [])) shared_archetypes.add(at);
            const lex = dn?.narrative_roots?.[lang]?.lexicon
              || dn?.narrative_roots?.en?.lexicon
              || [];
            const hits = matchLexicon(blobLower, lex);
            if (hits.length) {
              score += hits.length;
              rootsByLang.push(...hits.slice(0, 6));
            }
          }

          if (score > 0) {
            calibration_hits.push({
              case: c.id,
              score,
              shared_archetypes: Array.from(shared_archetypes),
              lexicon_hits: rootsByLang.slice(0, 12),
              interpretive: true
            });
          }
        }
        calibration_hits.sort((a, b) => b.score - a.score);

        const interpretive = tags_rule.length > 0 || calibration_hits.length > 0;

        collected.push({
          id,
          title: it.title,
          url: it.url,
          published: Number.isFinite(pubMs) ? new Date(pubMs).toISOString() : null,
          summary_excerpt: it.summary_excerpt,
          feed: {
            id: fid,
            name: feed.name || fid,
            lang,
            bloc: feed.bloc || null,
            trust_tier: feed.trust_tier || null,
            owner: feed.owner || null,
            type: feed.type || null
          },
          tags_rule,
          calibration_hits: calibration_hits.slice(0, 4),
          cluster_id: null,
          interpretive,
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

  // Prefer non-EN items to meet quota target, while keeping some language diversity.
  const nonEnTarget = Math.ceil(MAX_ITEMS * 0.4);
  const nonEnItems = collected.filter(it => (it?.feed?.lang || 'en') !== 'en');
  const enItems = collected.filter(it => (it?.feed?.lang || 'en') === 'en');

  const preferredNonEnLangs = ['fr', 'es', 'pt', 'ar', 'zh'];
  const minPerLang = Math.max(3, Math.floor(nonEnTarget / Math.max(1, preferredNonEnLangs.length))); // typically 3-10

  const picked = [];
  const pickedIds = new Set();
  const byLangMap = new Map();
  for (const it of nonEnItems) {
    const l = it?.feed?.lang || 'en';
    if (!byLangMap.has(l)) byLangMap.set(l, []);
    byLangMap.get(l).push(it);
  }

  // 1) Guarantee a small baseline per preferred non-EN language (if available)
  for (const l of preferredNonEnLangs) {
    const arr = byLangMap.get(l) || [];
    for (const it of arr.slice(0, minPerLang)) {
      if (picked.length >= nonEnTarget) break;
      if (pickedIds.has(it.id)) continue;
      picked.push(it);
      pickedIds.add(it.id);
    }
  }

  // 2) Fill remaining non-EN quota with any remaining non-EN items
  for (const it of nonEnItems) {
    if (picked.length >= nonEnTarget) break;
    if (pickedIds.has(it.id)) continue;
    picked.push(it);
    pickedIds.add(it.id);
  }

  // 3) Fill the rest with EN items
  const finalItems = [...picked];
  for (const it of enItems) {
    if (finalItems.length >= MAX_ITEMS) break;
    if (pickedIds.has(it.id)) continue;
    finalItems.push(it);
    pickedIds.add(it.id);
  }

  out.items = finalItems.slice(0, MAX_ITEMS);

  // Coverage
  const byLang = {};
  for (const it of out.items) {
    const l = it?.feed?.lang || 'en';
    byLang[l] = (byLang[l] || 0) + 1;
  }
  out.coverage.by_lang = byLang;
  const total = out.items.length || 1;
  const nonEn = Object.entries(byLang).reduce((n, [l, c]) => n + (l === 'en' ? 0 : c), 0);
  out.coverage.non_en_pct = Math.round((nonEn / total) * 1000) / 10;
  if (out.coverage.non_en_pct < 40) out.coverage.gap.push('non_en_quota');

  // Minimal clustering v1: identical normalized titles.
  const clusters = new Map();
  for (const it of out.items) {
    const norm = String(it.title || '')
      .toLowerCase()
      .replace(/[^a-z0-9\u00C0-\u017F]+/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();
    if (!norm) continue;
    const cid = createHash('sha1').update(norm).digest('hex').slice(0, 10);
    it.cluster_id = cid;
    if (!clusters.has(cid)) clusters.set(cid, []);
    clusters.get(cid).push(it.id);
  }
  out.clusters = Array.from(clusters.entries())
    .filter(([, ids]) => ids.length > 1)
    .map(([id, item_ids]) => ({ id, item_ids, interpretive: true }))
    .sort((a, b) => b.item_ids.length - a.item_ids.length)
    .slice(0, 50);

  const dir = join(ROOT, 'data', 'narrative-radar');
  await mkdir(dir, { recursive: true });
  const outPath = join(dir, `${DATE}.json`);
  await writeFile(outPath, JSON.stringify(out, null, 2));
  process.stdout.write(`\n✓ ${outPath}\n`);
}

await main();

