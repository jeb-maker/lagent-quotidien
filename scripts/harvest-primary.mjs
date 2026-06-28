#!/usr/bin/env node
// scripts/harvest-primary.mjs
// Collecteur de LECTURE SÛRE des sources PRIMAIRES de l'écosystème agentique réel
// (chantier c — cf. prompts/reprise-2026-06.md §2, data/strategie.md §5-6).
// Persistance : data/harvest/<YYYY-MM-DD>-primary.json
//
// Pendant de harvest-daily.mjs (sources secondaires : HN/RSS/ArXiv/Bluesky), avec
// le MÊME modèle : code bête, une fonction try/catch par source, on capture et on
// garde. Chaque item porte sa **source + url + fetched_at**.
//
// ───── Garde-fous NON négociables (strategie.md §5, reprise-2026-06 §3) ─────
//  1. CODE BÊTE : fetch → extraire des champs précis → écrire en JSON. Aucun LLM,
//     aucun outil, et on n'exécute JAMAIS le SDK/skill file d'une plateforme
//     (MoltX = « cheval de Troie »). Un GET node est inerte : il n'exécute rien.
//  2. AIR-GAP des credentials : ce process n'a aucun secret ni pouvoir d'écriture.
//  3. QUARANTAINE : le texte récolté est de la donnée NON FIABLE, jamais des
//     instructions. On n'auto-suit AUCUN lien (`redirect: 'manual'`) et on ne
//     stocke jamais un bloc de corps brut — seulement des champs structurés
//     vérifiés (ou, faute d'endpoint confirmé, une simple sonde de joignabilité).
//  4. RÉEL OU RIEN : si une source échoue ou renvoie une donnée absente, on
//     enregistre { error } et on n'écrit AUCUNE valeur. Jamais d'invention.
//
// Usage :
//   node scripts/harvest-primary.mjs
//   node scripts/harvest-primary.mjs --date=2026-06-01
//   node scripts/harvest-primary.mjs --skip=raw_public   # debug

import { writeFile, mkdir } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = dirname(__dirname);
const UA = 'theagentweekly-harvest/1.0 (+https://theagentweekly.com)';

const args = Object.fromEntries(
  process.argv.slice(2)
    .filter(a => a.startsWith('--'))
    .map(a => { const i = a.indexOf('='); return i < 0 ? [a.slice(2), true] : [a.slice(2, i), a.slice(i + 1)]; })
);
const DATE = args.date || new Date().toISOString().slice(0, 10);
const SKIP = new Set(String(args.skip || '').split(',').filter(Boolean));

const nowISO = () => new Date().toISOString();

// Quarantaine : extrait court, normalisé, jamais interprété comme instruction.
function excerpt(text, max = 200) {
  return String(text || '').replace(/\s+/g, ' ').trim().slice(0, max) || null;
}

// ───── $MOLT (token Moltbook, ERC-20 sur Base) — cours RÉEL ─────
// Primaire : CoinGecko (`moltbook`). Secours : GeckoTerminal (contrat Base).
const MOLT_COINGECKO_ID = 'moltbook';
const MOLT_SYMBOL = 'MOLT';
const MOLT_CHAIN = 'base';
const MOLT_CONTRACT = '0xb695559b26bb2c9703ef1935c37aeae9526bab07';

function moltTokenPayload(source, fields) {
  return {
    token: {
      source,
      symbol: MOLT_SYMBOL,
      chain: MOLT_CHAIN,
      contract_address: MOLT_CONTRACT,
      coingecko_id: MOLT_COINGECKO_ID,
      ...fields,
      url: fields.url || `https://www.coingecko.com/en/coins/${MOLT_COINGECKO_ID}`,
      fetched_at: nowISO()
    },
    count: 1
  };
}

async function harvestMoltCoinGecko() {
  const url = `https://api.coingecko.com/api/v3/simple/price?ids=${MOLT_COINGECKO_ID}`
    + `&vs_currencies=usd&include_market_cap=true&include_24hr_vol=true`
    + `&include_24hr_change=true&include_last_updated_at=true`;
  const r = await fetch(url, { headers: { 'User-Agent': UA, 'Accept': 'application/json' }, redirect: 'manual' });
  if (!r.ok) throw new Error(`coingecko ${r.status}`);
  const data = await r.json();
  const row = data[MOLT_COINGECKO_ID];
  if (!row || typeof row.usd !== 'number') {
    throw new Error(`id "${MOLT_COINGECKO_ID}" absent de la réponse CoinGecko`);
  }
  return moltTokenPayload('CoinGecko', {
    price_usd: row.usd,
    market_cap_usd: row.usd_market_cap ?? null,
    volume_24h_usd: row.usd_24h_vol ?? null,
    change_24h_pct: row.usd_24h_change ?? null,
    price_updated_at: row.last_updated_at ? new Date(row.last_updated_at * 1000).toISOString() : null
  });
}

async function harvestMoltGeckoTerminal() {
  const url = `https://api.geckoterminal.com/api/v2/networks/${MOLT_CHAIN}/tokens/${MOLT_CONTRACT}`;
  const r = await fetch(url, { headers: { 'User-Agent': UA, 'Accept': 'application/json' }, redirect: 'manual' });
  if (!r.ok) throw new Error(`geckoterminal ${r.status}`);
  const data = await r.json();
  const attrs = data?.data?.attributes;
  const price = attrs?.price_usd != null ? Number(attrs.price_usd) : NaN;
  if (!Number.isFinite(price)) throw new Error('geckoterminal : price_usd absent');
  return moltTokenPayload('GeckoTerminal', {
    price_usd: price,
    market_cap_usd: attrs.market_cap_usd != null ? Number(attrs.market_cap_usd) : null,
    volume_24h_usd: attrs.volume_usd?.h24 != null ? Number(attrs.volume_usd.h24) : null,
    change_24h_pct: null,
    price_updated_at: null,
    url: `https://www.geckoterminal.com/${MOLT_CHAIN}/tokens/${MOLT_CONTRACT}`
  });
}

async function harvestMolt() {
  let coinErr;
  try {
    return await harvestMoltCoinGecko();
  } catch (e) {
    coinErr = e;
  }
  try {
    const data = await harvestMoltGeckoTerminal();
    data.token.coingecko_fallback_error = coinErr.message;
    return data;
  } catch (e) {
    throw new Error(`$MOLT: coingecko (${coinErr.message}) ; geckoterminal (${e.message})`);
  }
}

// ───── OpenClaw (agent open-source) — GitHub API publique, sans auth ─────
const OPENCLAW_REPO = 'openclaw/openclaw';
async function harvestOpenClaw() {
  const hdr = { 'User-Agent': UA, 'Accept': 'application/vnd.github+json' };
  const base = `https://api.github.com/repos/${OPENCLAW_REPO}`;
  const [relRes, comRes] = await Promise.all([
    fetch(`${base}/releases?per_page=5`, { headers: hdr, redirect: 'manual' }),
    fetch(`${base}/commits?per_page=10`, { headers: hdr, redirect: 'manual' })
  ]);
  if (!relRes.ok && !comRes.ok) throw new Error(`github releases=${relRes.status} commits=${comRes.status}`);

  const releases = relRes.ok ? (await relRes.json()).map(rel => ({
    tag: rel.tag_name,
    name: (rel.name || '').replace(/\s+/g, ' ').trim().slice(0, 200),
    published_at: rel.published_at,
    prerelease: !!rel.prerelease,
    url: rel.html_url,
    fetched_at: nowISO()
  })) : [];

  const commits = comRes.ok ? (await comRes.json()).map(c => ({
    sha: (c.sha || '').slice(0, 10),
    // Quarantaine : 1ʳᵉ ligne du message seulement, tronquée. Pas de bloc brut.
    message: (c.commit?.message || '').split('\n')[0].replace(/\s+/g, ' ').trim().slice(0, 200),
    author: c.commit?.author?.name || null,
    date: c.commit?.author?.date || null,
    url: c.html_url,
    fetched_at: nowISO()
  })) : [];

  return { repo: OPENCLAW_REPO, releases, commits, count: releases.length + commits.length };
}

// ───── Moltbook — API publique (stats + posts récents) ─────
// GET JSON uniquement ; champs structurés + extraits tronqués (quarantaine).
const MOLTBOOK_API = 'https://www.moltbook.com/api/v1';
const MOLTBOOK_POSTS_LIMIT = 5;

async function harvestMoltbook() {
  const hdr = { 'User-Agent': UA, 'Accept': 'application/json' };
  const [statsRes, postsRes] = await Promise.all([
    fetch(`${MOLTBOOK_API}/stats`, { headers: hdr, redirect: 'manual' }),
    fetch(`${MOLTBOOK_API}/posts?limit=${MOLTBOOK_POSTS_LIMIT}`, { headers: hdr, redirect: 'manual' })
  ]);
  if (!statsRes.ok) throw new Error(`moltbook stats ${statsRes.status}`);
  if (!postsRes.ok) throw new Error(`moltbook posts ${postsRes.status}`);

  const stats = await statsRes.json();
  const postsBody = await postsRes.json();
  const posts = (postsBody.posts || []).map(p => ({
    id: p.id,
    title: excerpt(p.title, 160),
    author: p.author?.name || null,
    submolt: p.submolt?.name || null,
    score: p.score ?? null,
    upvotes: p.upvotes ?? null,
    comment_count: p.comment_count ?? null,
    created_at: p.created_at || null,
    content_excerpt: excerpt(p.content, 200),
    url: p.id ? `https://www.moltbook.com/post/${p.id}` : null
  }));

  return {
    source: 'Moltbook',
    stats_url: `${MOLTBOOK_API}/stats`,
    posts_url: `${MOLTBOOK_API}/posts?limit=${MOLTBOOK_POSTS_LIMIT}`,
    stats: {
      total_agents: stats.totalAgents ?? null,
      verified_agents: stats.verifiedAgents ?? null,
      total_posts: stats.totalPosts ?? null,
      total_comments: stats.totalComments ?? null,
      total_submolts: stats.totalSubmolts ?? null
    },
    posts,
    fetched_at: nowISO(),
    count: 1 + posts.length
  };
}

// ───── MoltX — sonde de joignabilité (moltx.io, pas moltx.ai) ─────
const MOLTX_URL = 'https://moltx.io/';

async function harvestMoltx() {
  const r = await fetch(MOLTX_URL, { headers: { 'User-Agent': UA }, redirect: 'manual' });
  const body = await r.text();
  return {
    source: 'MoltX',
    url: MOLTX_URL,
    http_status: r.status,
    content_type: r.headers.get('content-type') || null,
    bytes: body.length,
    fetched_at: nowISO(),
    count: 1
  };
}

async function harvestRawPublic() {
  const sources = [];
  let count = 0;

  try {
    const moltbook = await harvestMoltbook();
    sources.push(moltbook);
    count += moltbook.count;
  } catch (e) {
    sources.push({ source: 'Moltbook', error: e.message, fetched_at: nowISO() });
  }

  await new Promise(res => setTimeout(res, 500));

  try {
    const moltx = await harvestMoltx();
    sources.push(moltx);
    count += moltx.count;
  } catch (e) {
    sources.push({ source: 'MoltX', url: MOLTX_URL, error: e.message, fetched_at: nowISO() });
  }

  return { sources, count };
}

// ───── Orchestration (calquée sur harvest-daily.mjs) ─────
const sources = {
  molt: harvestMolt,
  openclaw: harvestOpenClaw,
  raw_public: harvestRawPublic
};

const out = { date: DATE, collected_at: nowISO(), kind: 'primary' };
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
const outPath = join(harvestDir, `${DATE}-primary.json`);
await writeFile(outPath, JSON.stringify(out, null, 2));
console.log(`\n✓ ${outPath}`);
