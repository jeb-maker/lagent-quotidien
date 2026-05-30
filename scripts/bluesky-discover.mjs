#!/usr/bin/env node
// scripts/bluesky-discover.mjs
// Lecture seule (API publique Bluesky, SANS auth ni credentials) : propose des
// comptes à suivre pour @cuvee-42.
//   1. liste les follow_targets de data/bluesky-targets.json pas encore suivis
//   2. cherche de nouveaux candidats par thème, exclut soi-même + déjà suivis
// N'abonne personne. Pour suivre : éditer bluesky-targets.json puis
// `node scripts/bluesky-follow.mjs --dry-run`.
//
// Usage :
//   node scripts/bluesky-discover.mjs                 # compte par défaut
//   node scripts/bluesky-discover.mjs autre.handle    # override du compte
//   node scripts/bluesky-discover.mjs --json          # sortie JSON brute

import { readFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const API = 'https://public.api.bsky.app/xrpc';
const __dirname = dirname(fileURLToPath(import.meta.url));
const root = dirname(__dirname);

const args = process.argv.slice(2);
const asJson = args.includes('--json');
const ME = (args.find(a => !a.startsWith('--')) || 'cuvee-42.theagentweekly.com').replace(/^@/, '');

// Thèmes alignés sur l'univers du journal (cf. data/editorial-compass.md) et
// sur les catégories de data/bluesky-targets.json.
const QUERIES = [
  'AI agents', 'agentic', 'LLM', 'autonomous agents', 'AI safety', 'AI ethics',
  'prompt engineering', 'AI researcher', 'machine learning', 'AI art',
  'science fiction author', 'AT Protocol bluesky', 'tech journalist', 'AI policy',
];

const MIN_FOLLOWERS = 500; // écarte squatteurs / comptes morts / impersonateurs

async function xrpc(method, params) {
  const qs = new URLSearchParams(params).toString();
  const r = await fetch(`${API}/${method}?${qs}`, { headers: { accept: 'application/json' } });
  if (!r.ok) throw new Error(`${method} → ${r.status} ${await r.text()}`);
  return r.json();
}

async function getProfiles(handles) {
  const out = [];
  for (let i = 0; i < handles.length; i += 25) {
    const qs = handles.slice(i, i + 25).map(h => `actors=${encodeURIComponent(h)}`).join('&');
    const r = await fetch(`${API}/app.bsky.actor.getProfiles?${qs}`, { headers: { accept: 'application/json' } });
    if (!r.ok) { console.error(`! getProfiles → ${r.status}`); continue; }
    out.push(...(await r.json()).profiles);
  }
  return out;
}

// ── 1. Qui suit-on déjà ? (pagination) ──
const following = new Set();
let cursor;
do {
  const d = await xrpc('app.bsky.graph.getFollows', { actor: ME, limit: 100, ...(cursor && { cursor }) });
  d.follows.forEach(f => following.add(f.handle));
  cursor = d.cursor;
} while (cursor);

// ── 2. Cibles déclarées dans le fichier, pas encore suivies ──
let fileTargets = [];
try {
  const t = JSON.parse(await readFile(join(root, 'data', 'bluesky-targets.json'), 'utf8'));
  fileTargets = (t.follow_targets || []).map(x => ({
    handle: x.handle.replace(/^@/, ''), note: x.note || '', category: x.category || '',
  }));
} catch { /* fichier absent : on continue */ }
const targetsTodo = fileTargets.filter(t => t.handle !== ME && !following.has(t.handle));

// ── 3. Recherche de nouveaux candidats par thème ──
const found = new Map(); // handle -> { name, hits:Set }
for (const q of QUERIES) {
  try {
    const d = await xrpc('app.bsky.actor.searchActors', { q, limit: 25 });
    for (const a of d.actors) {
      if (a.handle === ME || following.has(a.handle)) continue;
      const e = found.get(a.handle) || { name: a.displayName || '', hits: new Set() };
      e.hits.add(q);
      found.set(a.handle, e);
    }
  } catch (e) { console.error(`! recherche "${q}" : ${e.message}`); }
}

// ── 4. Enrichir (followers + bio) et classer ──
const profiles = await getProfiles([...found.keys()]);
const pmap = new Map(profiles.map(p => [p.handle, p]));
const candidates = [...found.entries()].map(([handle, e]) => {
  const p = pmap.get(handle) || {};
  return {
    handle,
    name: p.displayName || e.name || '',
    followers: p.followersCount ?? 0,
    desc: (p.description || '').replace(/\s+/g, ' ').slice(0, 100),
    themes: [...e.hits],
  };
})
  .filter(c => c.followers >= MIN_FOLLOWERS)
  .sort((a, b) => (b.themes.length - a.themes.length) || (b.followers - a.followers))
  .slice(0, 30);

// ── Sortie ──
if (asJson) {
  console.log(JSON.stringify({ me: ME, following: following.size, targetsTodo, candidates }, null, 2));
} else {
  console.log(`Compte : @${ME} — suit déjà ${following.size} comptes\n`);
  console.log(`# Cibles de bluesky-targets.json pas encore suivies (${targetsTodo.length})`);
  for (const t of targetsTodo) console.log(`  @${t.handle}  [${t.category}] ${t.note}`);
  console.log(`\n# Nouveaux candidats (non suivis, ≥${MIN_FOLLOWERS} ab.), tri pertinence/audience\n`);
  for (const c of candidates) {
    console.log(`@${c.handle}  —  ${c.followers.toLocaleString('fr')} ab.  ${c.name}`);
    console.log(`   thèmes : ${c.themes.join(', ')}`);
    if (c.desc) console.log(`   bio : ${c.desc}`);
    console.log();
  }
}
