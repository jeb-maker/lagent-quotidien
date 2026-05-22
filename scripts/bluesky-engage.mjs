#!/usr/bin/env node
// scripts/bluesky-engage.mjs
// Surface des threads Bluesky où il serait pertinent que cuvee-42 réponde.
// Recherche par mots-clés (API authentifiée — searchPosts public est fermé).
// Pas de publication — tu lis, tu cliques, tu réponds manuellement.
//
// Usage :
//   node scripts/bluesky-engage.mjs              # défaut, top 5 par mot-clé
//   node scripts/bluesky-engage.mjs --limit=10   # 10 candidats par mot-clé
//   node scripts/bluesky-engage.mjs --sort=top   # tri par engagement (defaut: latest)
//   node scripts/bluesky-engage.mjs --hours=48   # fenetre temporelle (defaut: 24h)

import { readFile, writeFile } from 'node:fs/promises';
import { homedir } from 'node:os';
import { join } from 'node:path';

const QUERIES = [
  'agentic AI',
  'AI agents',
  'autonomous agents',
  'agentic internet',
  'agentic web'
];

const SELF_HANDLE = 'cuvee-42.theagentweekly.com';

const args = Object.fromEntries(
  process.argv.slice(2)
    .filter(a => a.startsWith('--'))
    .map(a => { const [k, v] = a.slice(2).split('='); return [k, v ?? true]; })
);
const LIMIT = Number(args.limit) || 5;
const SORT = args.sort === 'top' ? 'top' : 'latest';
const HOURS = Number(args.hours) || 24;
const cutoff = Date.now() - HOURS * 3600 * 1000;

function fmtAge(iso) {
  const ms = Date.now() - new Date(iso).getTime();
  const h = ms / 3600000;
  if (h < 1) return `${Math.round(h * 60)}min`;
  if (h < 24) return `${h.toFixed(1)}h`;
  return `${(h / 24).toFixed(1)}j`;
}

function postUrl(uri, handle) {
  const rkey = uri.split('/').pop();
  return `https://bsky.app/profile/${handle}/post/${rkey}`;
}

const credPath = join(homedir(), '.config', 'bluesky-cuvee', 'session.json');
let cred;
try {
  cred = JSON.parse(await readFile(credPath, 'utf8'));
} catch {
  console.error('Pas de credentials. Lance scripts/bluesky-auth.mjs d\'abord.');
  process.exit(1);
}

async function reauth() {
  const r = await fetch('https://bsky.social/xrpc/com.atproto.server.createSession', {
    method: 'POST', headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ identifier: cred.handle, password: cred.password })
  });
  if (!r.ok) { console.error(`Re-auth échec : ${r.status}`); process.exit(1); }
  const s = await r.json();
  cred.accessJwt = s.accessJwt; cred.refreshJwt = s.refreshJwt;
  await writeFile(credPath, JSON.stringify(cred, null, 2), { mode: 0o600 });
}

async function searchOne(q) {
  const u = `https://bsky.social/xrpc/app.bsky.feed.searchPosts?q=${encodeURIComponent(q)}&limit=25&sort=${SORT}`;
  const headers = () => ({ 'Authorization': `Bearer ${cred.accessJwt}` });
  let r = await fetch(u, { headers: headers() });
  if (r.status === 401 || r.status === 400) {
    await reauth();
    r = await fetch(u, { headers: headers() });
  }
  if (!r.ok) {
    console.error(`  ⚠ search "${q}" → ${r.status}`);
    return [];
  }
  const d = await r.json();
  return d.posts || [];
}

console.log(`Engage feed · sort=${SORT} · fenêtre=${HOURS}h · ${LIMIT} candidats/requête\n`);

for (const q of QUERIES) {
  const posts = await searchOne(q);
  // Filtres :
  // - pas de soi-même
  // - dans la fenêtre temporelle
  // - pas une réponse (on cherche des amorces de discussion)
  // - texte non vide
  const candidates = posts.filter(p => {
    if (p.author?.handle === SELF_HANDLE) return false;
    const createdAt = p.record?.createdAt;
    if (!createdAt || new Date(createdAt).getTime() < cutoff) return false;
    if (p.record?.reply) return false;
    if (!(p.record?.text || '').trim()) return false;
    return true;
  });

  // Score : favorise un peu l'engagement même en mode latest
  candidates.sort((a, b) => {
    const sa = (a.likeCount || 0) + 2 * (a.repostCount || 0) + (a.replyCount || 0);
    const sb = (b.likeCount || 0) + 2 * (b.repostCount || 0) + (b.replyCount || 0);
    return sb - sa;
  });

  const top = candidates.slice(0, LIMIT);
  console.log(`═══ "${q}" — ${candidates.length} candidat${candidates.length > 1 ? 's' : ''} (top ${top.length}) ═══`);
  if (!top.length) {
    console.log('  (aucun)\n');
    continue;
  }

  for (const p of top) {
    const text = (p.record?.text || '').replace(/\s+/g, ' ').trim();
    const snippet = text.length > 200 ? text.slice(0, 197) + '…' : text;
    const meta = [
      `${p.likeCount || 0}❤`,
      `${p.repostCount || 0}🔁`,
      `${p.replyCount || 0}💬`,
      fmtAge(p.record.createdAt)
    ].join(' · ');
    console.log(`\n  @${p.author.handle} · ${meta}`);
    if (p.author.displayName) console.log(`  (${p.author.displayName})`);
    console.log(`  ${snippet}`);
    console.log(`  → ${postUrl(p.uri, p.author.handle)}`);
  }
  console.log();
}
