#!/usr/bin/env node
// scripts/daily-drift.mjs
// Rafraîchit la SEULE donnée de marché qui soit réelle et vérifiable de
// l'édition en cours : le cours du token $MOLT (ERC-20 réel sur Base).
//
// Doctrine (cf. data/strategie.md §4 et §6) : on lit du RÉEL ou on ne touche à
// RIEN. Plus aucune fabrication de chiffres (l'ancien « drift » aléatoire de
// $MOLT, MOLTX, CCAST, RENT, OCLAW, ROAD, MMATCH, du compteur Moltbook et des
// compteurs « candidatures » a été retiré : servir un faux chiffre sur une
// entité réelle à un public de modèles/agents, c'est de la désinformation).
//
// Comportement :
//   - si l'édition courante a une ligne de marché $MOLT → on récupère le cours
//     réel et on l'écrit ;
//   - si la récupération échoue (réseau, format, host non autorisé) → on LAISSE
//     la valeur inchangée et on le signale. On n'invente jamais.
//   - si l'édition n'a pas de ligne $MOLT (cas des éditions « vrai journalisme »
//     sans ticker) → no-op.
//
// Lancé par scripts/cron-drift.sh.

import { readFile, writeFile, readdir } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = dirname(__dirname);
const editionsDir = join(root, 'editions');

// ───── Trouver l'édition la plus récente ─────
const dirs = await readdir(editionsDir, { withFileTypes: true });
const weeks = dirs
  .filter(d => d.isDirectory() && /^\d{4}-W\d{2}$/.test(d.name))
  .map(d => d.name)
  .sort();
const week = weeks[weeks.length - 1];
if (!week) {
  console.error('Aucune édition trouvée');
  process.exit(1);
}

const editionPath = join(editionsDir, week, 'edition.json');
const original = await readFile(editionPath, 'utf8');
const edition = JSON.parse(original);

// ───── Cours réel $MOLT ─────
// $MOLT = token Moltbook (ERC-20 réel sur Base). CoinGecko simple price, API
// publique gratuite sans clé. Coin id 'moltbook' (cf. coingecko.com/en/coins/
// moltbook) — à confirmer au premier run réel ; en cas de doute on n'écrit rien.
async function fetchMoltUsd() {
  const url = 'https://api.coingecko.com/api/v3/simple/price'
    + '?ids=moltbook&vs_currencies=usd&include_24hr_change=true';
  const r = await fetch(url, {
    headers: { 'User-Agent': 'theagentweekly-drift/1.0', 'Accept': 'application/json' },
    signal: AbortSignal.timeout(15000)
  });
  if (!r.ok) throw new Error(`coingecko ${r.status}`);
  const j = await r.json();
  const d = j?.moltbook;
  if (!d || typeof d.usd !== 'number') throw new Error('réponse sans cours moltbook');
  return {
    usd: d.usd,
    change24h: typeof d.usd_24h_change === 'number' ? d.usd_24h_change : null
  };
}

// Formate un cours en USD lisible, quel que soit l'ordre de grandeur (un
// memecoin peut valoir ~0,00002 $ : .toFixed(3) écraserait tout à 0,000).
function fmtUsd(v) {
  if (v >= 1) return `$${v.toFixed(2)}`;
  if (v >= 0.01) return `$${v.toFixed(4)}`;
  // sous le centime : assez de décimales significatives pour ne pas tronquer
  return `$${v.toPrecision(4)}`;
}

const moltRow = (edition.market?.rows || []).find(r => r.ticker === '$MOLT');

if (!moltRow) {
  console.log(`✓ ${week} · pas de ligne $MOLT dans l'édition — rien à rafraîchir (no-op).`);
  process.exit(0);
}

let updated = false;
try {
  const { usd, change24h } = await fetchMoltUsd();
  moltRow.value = fmtUsd(usd);
  if (change24h !== null) {
    moltRow.change = `${change24h >= 0 ? '+' : ''}${change24h.toFixed(1)}%`;
    moltRow.direction = change24h >= 0 ? 'up' : 'down';
  }
  updated = true;
  console.log(`✓ ${week} · $MOLT (réel) ${moltRow.value} (${moltRow.change ?? '—'})`);
} catch (e) {
  // RÉEL ou RIEN : on ne fabrique pas. Valeur laissée telle quelle.
  console.error(`⚠ ${week} · cours $MOLT non récupéré (${e.message}) — valeur inchangée, aucune invention.`);
}

// ───── Écriture (seulement si quelque chose a réellement changé) ─────
if (updated) {
  const next = JSON.stringify(edition, null, 2) + '\n';
  if (next !== original) {
    await writeFile(editionPath, next, 'utf8');
  }
}
