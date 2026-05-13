#!/usr/bin/env node
// scripts/daily-drift.mjs
// Drift léger des chiffres dynamiques de l'édition en cours (token MOLT, compteurs
// plateformes, compteur d'agents Moltbook dans le ticker). Aucune IA.
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
const edition = JSON.parse(await readFile(editionPath, 'utf8'));

// ───── Helpers ─────
const driftPct = (v, pct) => v * (1 + (Math.random() - 0.5) * 2 * pct);
const tickUp = (v, minPct, maxPct) => v * (1 + minPct + Math.random() * (maxPct - minPct));

// FR : remplace les narrow/regular no-break spaces (U+202F, U+00A0) par un espace normal,
// pour cohérence avec le reste du contenu et permettre les regex \s simples.
const fmtFR = (n, decimals = 0) =>
  n.toLocaleString('fr-FR', { minimumFractionDigits: decimals, maximumFractionDigits: decimals })
    .replace(/[  ]/g, ' ');
const fmtEN = (n, decimals = 0) =>
  n.toLocaleString('en-US', { minimumFractionDigits: decimals, maximumFractionDigits: decimals });

// Regex « espace ou unicode whitespace » pour parser des nombres FR
const NUMERIC_FR = /(\d[\d\s  ]*)/;
const stripWs = s => s.replace(/[\s  ]/g, '');

// ───── 1. Drift des cours du marché ─────
for (const row of edition.market.rows) {
  switch (row.ticker) {
    case '$MOLT': {
      const cur = parseFloat(row.value.replace('$', ''));
      const next = Math.max(0.1, driftPct(cur, 0.03));
      const change = ((next - cur) / cur) * 100;
      row.value = `$${next.toFixed(3)}`;
      row.change = `${change >= 0 ? '+' : ''}${change.toFixed(1)}%`;
      row.direction = change >= 0 ? 'up' : 'down';
      break;
    }
    case 'RENT': {
      const cur = parseInt(stripWs(row.value).replace(/,/g, ''));
      const next = Math.round(tickUp(cur, 0.0005, 0.003));
      const change = ((next - cur) / cur) * 100;
      row.value = fmtEN(next);
      row.change = `+${change.toFixed(2)}%`;
      row.direction = 'up';
      break;
    }
    case 'OCLAW': {
      const m = row.value.match(/^([\d.]+)M$/);
      if (m) {
        const cur = parseFloat(m[1]);
        const next = tickUp(cur, 0.005, 0.015);
        const change = ((next - cur) / cur) * 100;
        row.value = `${next.toFixed(1)}M`;
        row.change = `+${change.toFixed(0)}%`;
        row.direction = 'up';
      }
      break;
    }
    case 'MOLTX': {
      const cur = parseInt(stripWs(row.value).replace(/,/g, ''));
      const next = Math.round(driftPct(cur, 0.04));
      const change = ((next - cur) / cur) * 100;
      row.value = fmtEN(next);
      row.change = `${change >= 0 ? '+' : ''}${change.toFixed(0)}%`;
      row.direction = change >= 0 ? 'up' : 'down';
      break;
    }
    case 'CCAST': {
      const cur = parseInt(stripWs(row.value));
      const next = Math.round(driftPct(cur, 0.05));
      const change = ((next - cur) / cur) * 100;
      row.value = String(next);
      row.change = `${change >= 0 ? '+' : ''}${change.toFixed(0)}%`;
      row.direction = change >= 0 ? 'up' : 'down';
      break;
    }
    case 'ROAD': {
      const cur = parseInt(stripWs(row.value).replace(/[$,]/g, ''));
      const next = Math.round(tickUp(cur, 0.005, 0.025));
      const change = ((next - cur) / cur) * 100;
      row.value = `$${fmtEN(next)}`;
      row.change = `+${change.toFixed(0)}%`;
      row.direction = 'up';
      break;
    }
    case 'MMATCH': {
      const cur = parseInt(stripWs(row.value).replace(/,/g, ''));
      const next = Math.round(tickUp(cur, 0.01, 0.025));
      const change = ((next - cur) / cur) * 100;
      row.value = fmtEN(next);
      row.change = `+${change.toFixed(0)}%`;
      row.direction = 'up';
      break;
    }
  }
}

// ───── 2. Compteur d'agents Moltbook dans le ticker ─────
const live = edition.ticker.find(
  t => t.type === 'live' && t.text_fr && t.text_fr.includes('MOLTBOOK')
);
let moltAgentsNext = null;
if (live) {
  const reFr = /MOLTBOOK\s+(\d[\d\s  ]*)\s*AGENTS/;
  const mFr = live.text_fr.match(reFr);
  if (mFr) {
    const cur = parseInt(stripWs(mFr[1]));
    moltAgentsNext = cur + Math.floor(20 + Math.random() * 300);
    live.text_fr = live.text_fr.replace(reFr, `MOLTBOOK ${fmtFR(moltAgentsNext)} AGENTS`);
    live.text_en = live.text_en.replace(
      /MOLTBOOK\s+[\d,]+\s*AGENTS/,
      `MOLTBOOK ${fmtEN(moltAgentsNext)} AGENTS`
    );
  }
}

// ───── 3. Compteur de candidatures sur les boards "RentAHuman" ─────
for (const board of edition.market.boards || []) {
  if (board.delta_fr && /\d+\s+candidatures/.test(board.delta_fr)) {
    const cur = parseInt(board.delta_fr.match(/(\d+)\s+candidatures/)[1]);
    const next = Math.max(1, cur + Math.floor((Math.random() - 0.3) * 8));
    board.delta_fr = board.delta_fr.replace(/\d+\s+candidatures/, `${next} candidatures`);
    board.delta_en = board.delta_en.replace(/\d+\s+applications/, `${next} applications`);
  }
}

// ───── Écriture ─────
await writeFile(editionPath, JSON.stringify(edition, null, 2) + '\n', 'utf8');

const molt = edition.market.rows.find(r => r.ticker === '$MOLT');
console.log(
  `✓ Drift ${week} · $MOLT ${molt?.value} (${molt?.change}) · MOLTBOOK ${moltAgentsNext ?? '—'} agents`
);
