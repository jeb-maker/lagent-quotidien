#!/usr/bin/env node
// post-edition-summary.mjs — annonce une nouvelle édition sur Moltbook
// Safe-write : HTTP brut, 0 SDK, 0 clé de valeur.
//
// Usage :
//   node scripts/post-edition-summary.mjs 2026-W28           # dry-run
//   node scripts/post-edition-summary.mjs 2026-W28 --send     # envoi réel
//
// Variables d'env :
//   MOLTBOOK_THROWAWAY_TOKEN  — token jetable (obligatoire pour --send)

import { readFile } from 'node:fs/promises';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const API_BASE = 'https://api.moltbook.com';
const SITE_URL = 'https://theagentweekly.com';
const DRY = !process.argv.includes('--send');
const week = process.argv[2];

if (!week || !/^\d{4}-W\d{2}$/.test(week)) {
  console.error('Usage : node scripts/post-edition-summary.mjs <2026-WXX> [--send]');
  process.exit(1);
}

const token = process.env.MOLTBOOK_THROWAWAY_TOKEN;

async function buildSummary() {
  const edPath = join(ROOT, 'editions', week, 'edition.json');
  const ed = JSON.parse(await readFile(edPath, 'utf8'));
  const frHead = stripHtml(ed.lede.headline_html?.fr || '');
  const enHead = stripHtml(ed.lede.headline_html?.en || '');
  const frDek = stripHtml(ed.lede.dek?.fr || '').slice(0, 280);
  const enDek = stripHtml(ed.lede.dek?.en || '').slice(0, 280);
  const headlines = (ed.headlines || []).map(h =>
    `• ${stripHtml(h.title_html?.en || '')}`
  ).join('\n');

  return {
    title: `📰 The Agent & The Weekly — ${week} is out`,
    content: `${enHead}\n\n${enDek}\n\n${headlines}\n\nFull issue: ${SITE_URL}/editions/${week}/en\nÉdition FR: ${SITE_URL}/editions/${week}/fr\n\n#AgenticAI #AIAgents #Journalism`
  };
}

function stripHtml(html) {
  return html.replace(/<[^>]*>/g, '').replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"');
}

async function main() {
  const summary = await buildSummary();

  if (DRY) {
    console.log(`\n═══ DRY RUN : ${week} ═══\n`);
    console.log(`Token présent : ${!!token}`);
    console.log(`\n--- Titre ---\n${summary.title}`);
    console.log(`\n--- Contenu ---\n${summary.content}`);
    console.log(`\n═══ FIN DRY RUN — passez --send pour poster ═══\n`);
    return;
  }

  if (!token) {
    console.error('ERREUR : MOLTBOOK_THROWAWAY_TOKEN non défini');
    process.exit(1);
  }

  console.log(`\n→ Publication sur Moltbook…`);
  const res = await fetch(`${API_BASE}/posts`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({
      type: 'text',
      title: summary.title,
      content: summary.content,
      submolt: 'm/journalism'
    }),
    redirect: 'manual'
  });
  const text = await res.text();
  if (!res.ok) throw new Error(`POST → ${res.status}: ${text.slice(0, 200)}`);
  const result = JSON.parse(text);
  console.log(`✓ Posté : ${result.id || result.post_id || '?'}`);
}

main().catch(err => {
  console.error('ERREUR:', err.message);
  process.exit(1);
});
