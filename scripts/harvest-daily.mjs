#!/usr/bin/env node
// scripts/harvest-daily.mjs
// Collecte quotidienne des signaux du discours agentique sur 4 sources :
// Bluesky (auth), Hacker News (public), RSS d'AI outlets (public), ArXiv (public).
// Persistance : data/harvest/<YYYY-MM-DD>.json
//
// Chaque source est isolée dans une fonction try/catch — si une plante, on a
// quand même les autres. Pas de filtrage éditorial ici : on capture, on garde.
// Le tri et la composition se font dans le desk + prompts/weekly-edition.md.
//
// Usage :
//   node scripts/harvest-daily.mjs
//   node scripts/harvest-daily.mjs --date=2026-05-23
//   node scripts/harvest-daily.mjs --skip=arxiv,rss   # debug

import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { homedir } from 'node:os';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = dirname(__dirname);
const args = Object.fromEntries(
  process.argv.slice(2)
    .filter(a => a.startsWith('--'))
    .map(a => { const i = a.indexOf('='); return i < 0 ? [a.slice(2), true] : [a.slice(2, i), a.slice(i + 1)]; })
);
const DATE = args.date || new Date().toISOString().slice(0, 10);
const SKIP = new Set(String(args.skip || '').split(',').filter(Boolean));

const KEYWORDS = ['agentic AI', 'AI agents', 'autonomous agents', 'agentic internet', 'agentic web'];
const TITLE_RE = /\bagent(s|ic)?\b|\bautonomous\b/i;

// ───── Bluesky ─────
async function harvestBluesky() {
  const credPath = join(homedir(), '.config', 'bluesky-cuvee', 'session.json');
  const cred = JSON.parse(await readFile(credPath, 'utf8'));

  async function reauth() {
    const r = await fetch('https://bsky.social/xrpc/com.atproto.server.createSession', {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ identifier: cred.handle, password: cred.password })
    });
    if (!r.ok) throw new Error(`Bluesky re-auth ${r.status}`);
    const s = await r.json();
    cred.accessJwt = s.accessJwt; cred.refreshJwt = s.refreshJwt;
    await writeFile(credPath, JSON.stringify(cred, null, 2), { mode: 0o600 });
  }
  async function search(q) {
    const url = `https://bsky.social/xrpc/app.bsky.feed.searchPosts?q=${encodeURIComponent(q)}&limit=25&sort=top`;
    let r = await fetch(url, { headers: { 'Authorization': `Bearer ${cred.accessJwt}` } });
    if (r.status === 401 || r.status === 400) { await reauth(); r = await fetch(url, { headers: { 'Authorization': `Bearer ${cred.accessJwt}` } }); }
    if (!r.ok) throw new Error(`searchPosts ${r.status}`);
    return (await r.json()).posts || [];
  }

  const cutoff = Date.now() - 24 * 3600 * 1000;
  const byQuery = {};
  for (const q of KEYWORDS) {
    const posts = await search(q);
    const filtered = posts
      .filter(p => {
        const createdAt = p.record?.createdAt;
        if (!createdAt || new Date(createdAt).getTime() < cutoff) return false;
        if (p.record?.reply) return false;
        if (!(p.record?.text || '').trim()) return false;
        return true;
      })
      .map(p => ({
        author: p.author?.handle,
        text: (p.record?.text || '').replace(/\s+/g, ' ').trim().slice(0, 500),
        likes: p.likeCount || 0,
        reposts: p.repostCount || 0,
        replies: p.replyCount || 0,
        createdAt: p.record.createdAt,
        url: `https://bsky.app/profile/${p.author?.handle}/post/${p.uri.split('/').pop()}`
      }))
      .sort((a, b) => (b.likes + 2*b.reposts) - (a.likes + 2*a.reposts))
      .slice(0, 10);
    byQuery[q] = filtered;
    await new Promise(r => setTimeout(r, 800));
  }
  const total = Object.values(byQuery).reduce((n, arr) => n + arr.length, 0);
  return { by_query: byQuery, count: total };
}

// ───── Hacker News ─────
async function harvestHN() {
  const r = await fetch('https://hacker-news.firebaseio.com/v0/topstories.json');
  if (!r.ok) throw new Error(`HN topstories ${r.status}`);
  const ids = (await r.json()).slice(0, 100);
  const cutoff = Math.floor((Date.now() - 24 * 3600 * 1000) / 1000);
  const stories = [];
  // En 4 lots parallèles pour ne pas marteler
  for (let i = 0; i < ids.length; i += 10) {
    const batch = ids.slice(i, i + 10);
    const items = await Promise.all(batch.map(id => fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json`).then(r => r.json()).catch(() => null)));
    for (const it of items) {
      if (!it || !it.title) continue;
      if (it.time < cutoff) continue;
      if (!TITLE_RE.test(it.title)) continue;
      stories.push({
        title: it.title,
        score: it.score || 0,
        comments: it.descendants || 0,
        url: it.url || `https://news.ycombinator.com/item?id=${it.id}`,
        hn_url: `https://news.ycombinator.com/item?id=${it.id}`,
        time: new Date(it.time * 1000).toISOString()
      });
    }
  }
  stories.sort((a, b) => b.score - a.score);
  return { stories: stories.slice(0, 15), count: stories.length };
}

// ───── RSS d'AI outlets ─────
const RSS_FEEDS = [
  { name: 'The Verge', url: 'https://www.theverge.com/rss/index.xml' },
  { name: '404 Media', url: 'https://www.404media.co/rss/' },
  { name: 'Ars Technica', url: 'https://arstechnica.com/feed/' },
  { name: 'The Register', url: 'https://www.theregister.com/headlines.atom' },
  { name: 'TechCrunch', url: 'https://techcrunch.com/feed/' },
  { name: 'MIT Tech Review', url: 'https://www.technologyreview.com/feed/' }
];

function parseRSSItems(xml) {
  // Parser minimaliste : on extrait les <item>...</item> ou <entry>...</entry>
  const items = [];
  const re = /<(item|entry)\b[\s\S]*?<\/\1>/g;
  let m;
  while ((m = re.exec(xml)) !== null) {
    const block = m[0];
    const title = (block.match(/<title[^>]*>([\s\S]*?)<\/title>/) || [])[1] || '';
    const link = (block.match(/<link[^>]*(?:href="([^"]+)"|>([\s\S]*?)<\/link>)/) || []);
    const pubDate = (block.match(/<(pubDate|published|updated)[^>]*>([\s\S]*?)<\/\1>/) || [])[2] || '';
    const desc = (block.match(/<(description|summary|content[^>]*)>([\s\S]*?)<\/\1>/) || [])[2] || '';
    items.push({
      title: stripCdata(title).replace(/\s+/g, ' ').trim(),
      url: (link[1] || link[2] || '').trim(),
      published: pubDate.trim(),
      summary: stripCdata(desc).replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim().slice(0, 400)
    });
  }
  return items;
}
function stripCdata(s) { return String(s).replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, '$1'); }

async function harvestRSS() {
  const cutoff = Date.now() - 36 * 3600 * 1000; // 36h pour rattraper les retards d'update
  const items = [];
  for (const feed of RSS_FEEDS) {
    try {
      const r = await fetch(feed.url, { headers: { 'User-Agent': 'theagentweekly-harvest/1.0' } });
      if (!r.ok) { console.error(`  rss ${feed.name}: ${r.status}`); continue; }
      const xml = await r.text();
      const parsed = parseRSSItems(xml);
      for (const it of parsed) {
        if (!it.title) continue;
        const pubMs = Date.parse(it.published);
        if (Number.isFinite(pubMs) && pubMs < cutoff) continue;
        // Filtre éditorial : titre OU summary mentionne agent/autonomous
        const blob = it.title + ' ' + it.summary;
        if (!TITLE_RE.test(blob)) continue;
        items.push({ source: feed.name, ...it });
      }
    } catch (e) {
      console.error(`  rss ${feed.name}: ${e.message}`);
    }
  }
  return { items, count: items.length };
}

// ───── ArXiv ─────
async function harvestArXiv() {
  const query = 'cat:cs.AI+AND+(abs:agent+OR+abs:agentic+OR+abs:autonomous)';
  const url = `http://export.arxiv.org/api/query?search_query=${query}&start=0&max_results=20&sortBy=submittedDate&sortOrder=descending`;
  const r = await fetch(url, { headers: { 'User-Agent': 'theagentweekly-harvest/1.0' } });
  if (!r.ok) throw new Error(`arxiv ${r.status}`);
  const xml = await r.text();
  const entries = [];
  const re = /<entry>([\s\S]*?)<\/entry>/g;
  let m;
  const cutoff = Date.now() - 36 * 3600 * 1000;
  while ((m = re.exec(xml)) !== null) {
    const block = m[1];
    const title = (block.match(/<title>([\s\S]*?)<\/title>/) || [])[1] || '';
    const summary = (block.match(/<summary>([\s\S]*?)<\/summary>/) || [])[1] || '';
    const published = (block.match(/<published>([\s\S]*?)<\/published>/) || [])[1] || '';
    const link = (block.match(/<id>([\s\S]*?)<\/id>/) || [])[1] || '';
    const authorsCount = (block.match(/<author>/g) || []).length;
    if (!title) continue;
    const pubMs = Date.parse(published);
    if (Number.isFinite(pubMs) && pubMs < cutoff) continue;
    entries.push({
      title: title.replace(/\s+/g, ' ').trim(),
      abstract: summary.replace(/\s+/g, ' ').trim().slice(0, 600),
      authors_count: authorsCount,
      published,
      url: link.trim()
    });
  }
  return { papers: entries.slice(0, 12), count: entries.length };
}

// ───── Orchestration ─────
const sources = {
  bluesky: harvestBluesky,
  hackernews: harvestHN,
  rss: harvestRSS,
  arxiv: harvestArXiv
};

const out = { date: DATE, collected_at: new Date().toISOString() };
for (const [name, fn] of Object.entries(sources)) {
  if (SKIP.has(name)) { console.log(`  ${name}: skip`); continue; }
  process.stdout.write(`  ${name}: `);
  const t0 = Date.now();
  try {
    const data = await fn();
    const dt = ((Date.now() - t0) / 1000).toFixed(1);
    out[name] = data;
    console.log(`${data.count} items · ${dt}s`);
  } catch (e) {
    const dt = ((Date.now() - t0) / 1000).toFixed(1);
    out[name] = { error: e.message };
    console.log(`ERROR ${e.message} · ${dt}s`);
  }
}

const harvestDir = join(ROOT, 'data', 'harvest');
await mkdir(harvestDir, { recursive: true });
const outPath = join(harvestDir, `${DATE}.json`);
await writeFile(outPath, JSON.stringify(out, null, 2));
console.log(`\n✓ ${outPath}`);
