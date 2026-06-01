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

// ───── $MOLT (token Moltbook, ERC-20 sur Base) — cours RÉEL via CoinGecko ─────
// Gratuit, sans clé. ⚠️ Confirme l'id au 1ᵉʳ run (cf. reprise-2026-06 §2) : si
// l'id est inconnu, CoinGecko renvoie un objet vide → on n'écrit aucun cours.
const MOLT_COINGECKO_ID = 'moltbook';
async function harvestMolt() {
  const url = `https://api.coingecko.com/api/v3/simple/price?ids=${MOLT_COINGECKO_ID}`
    + `&vs_currencies=usd&include_market_cap=true&include_24hr_vol=true`
    + `&include_24hr_change=true&include_last_updated_at=true`;
  const r = await fetch(url, { headers: { 'User-Agent': UA, 'Accept': 'application/json' }, redirect: 'manual' });
  if (!r.ok) throw new Error(`coingecko ${r.status}`);
  const data = await r.json();
  const row = data[MOLT_COINGECKO_ID];
  // Réel ou rien : id absent / pas de prix numérique → on ne fabrique rien.
  if (!row || typeof row.usd !== 'number') {
    throw new Error(`id "${MOLT_COINGECKO_ID}" absent de la réponse CoinGecko — aucun cours réel, rien écrit`);
  }
  return {
    token: {
      source: 'CoinGecko',
      coingecko_id: MOLT_COINGECKO_ID,
      price_usd: row.usd,
      market_cap_usd: row.usd_market_cap ?? null,
      volume_24h_usd: row.usd_24h_vol ?? null,
      change_24h_pct: row.usd_24h_change ?? null,
      price_updated_at: row.last_updated_at ? new Date(row.last_updated_at * 1000).toISOString() : null,
      url: `https://www.coingecko.com/en/coins/${MOLT_COINGECKO_ID}`,
      fetched_at: nowISO()
    },
    count: 1
  };
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

// ───── Moltbook / MoltX — lecture HTTP brute de pages PUBLIQUES ─────
// Sources hostiles : on N'EXÉCUTE jamais leur SDK/skill file, on n'auto-suit
// aucune redirection, et on NE STOCKE PAS le corps (quarantaine + « jamais un
// bloc brut »). Faute d'endpoint public structuré confirmé, on se limite pour
// l'instant à une SONDE DE JOIGNABILITÉ (status + type + taille). L'extraction
// de champs structurés est à ajouter ici dès qu'un endpoint + un schéma publics
// sont confirmés — c'est le prolongement direct du chantier c.
const RAW_SOURCES = [
  { name: 'Moltbook', url: 'https://moltbook.com/' },
  { name: 'MoltX', url: 'https://moltx.ai/' }
];
async function harvestRawPublic() {
  const probes = [];
  for (const s of RAW_SOURCES) {
    try {
      const r = await fetch(s.url, { headers: { 'User-Agent': UA }, redirect: 'manual' });
      const body = await r.text(); // lu pour la taille puis JETÉ : jamais stocké
      probes.push({
        source: s.name,
        url: s.url,
        http_status: r.status,
        content_type: r.headers.get('content-type') || null,
        bytes: body.length,
        fetched_at: nowISO(),
        note: 'sonde de joignabilité — extraction de champs TODO (endpoint/schéma public à confirmer)'
      });
    } catch (e) {
      probes.push({ source: s.name, url: s.url, error: e.message, fetched_at: nowISO() });
    }
    await new Promise(res => setTimeout(res, 500));
  }
  return { probes, count: probes.length };
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
