#!/usr/bin/env node
// interview-collect.mjs — posteur bête + collecteur de réponses pour Moltbook
// Safe-write design : data/safe-write-interviews.md
//
// Usage :
//   node scripts/interview-collect.mjs <slug>              # dry-run (affiche ce qui serait envoyé)
//   node scripts/interview-collect.mjs <slug> --send        # envoi réel (nécessite MOLTBOOK_TOKEN)
//   node scripts/interview-collect.mjs <slug> --poll         # relire les réponses existantes
//
// Le token Moltbook est passé via la variable d'env MOLTBOOK_THROWAWAY_TOKEN.
// Jamais de SDK, jamais de clé de valeur. 0 LLM, 0 exécution.

import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const DATA_DIR = join(__dirname, '..', 'data', 'interviews');
const API_BASE = 'https://api.moltbook.com';
const DRY = !process.argv.includes('--send');
const POLL = process.argv.includes('--poll');
const SLUG = process.argv.find(a => a.endsWith('.json'))?.replace('.json', '')
  || process.argv[2]?.replace(/\.json$/, '');

if (!SLUG || ['--send', '--poll'].includes(SLUG)) {
  console.error('Usage : node scripts/interview-collect.mjs <slug> [--send] [--poll]');
  console.error('  --send  : envoi réel (par défaut : dry-run)');
  console.error('  --poll  : relire les réponses d\'un post déjà envoyé');
  process.exit(1);
}

const token = process.env.MOLTBOOK_THROWAWAY_TOKEN;
if (!DRY && !token) {
  console.error('ERREUR : MOLTBOOK_THROWAWAY_TOKEN non défini. Passez --send seulement avec un token.');
  process.exit(1);
}

async function loadQuestions() {
  const path = join(DATA_DIR, `${SLUG}.todo.json`);
  const raw = await readFile(path, 'utf8');
  return JSON.parse(raw);
}

async function saveResponse(slug, data) {
  await mkdir(DATA_DIR, { recursive: true });
  const path = join(DATA_DIR, `${slug}.json`);
  const existing = await readFile(path, 'utf8').then(JSON.parse).catch(() => ({}));
  const merged = { ...existing, ...data, updated_at: new Date().toISOString() };
  await writeFile(path, JSON.stringify(merged, null, 2), 'utf8');
  console.log(`✓ Réponse sauvegardée : ${path}`);
}

async function apiPost(endpoint, body) {
  const url = `${API_BASE}${endpoint}`;
  const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  };
  const res = await fetch(url, {
    method: 'POST',
    headers,
    body: JSON.stringify(body),
    redirect: 'manual'
  });
  const text = await res.text();
  if (!res.ok) throw new Error(`POST ${url} → ${res.status}: ${text.slice(0, 200)}`);
  return JSON.parse(text);
}

async function apiGet(endpoint) {
  const url = `${API_BASE}${endpoint}`;
  const headers = { 'Authorization': `Bearer ${token}` };
  const res = await fetch(url, { headers, redirect: 'manual' });
  const text = await res.text();
  if (!res.ok) throw new Error(`GET ${url} → ${res.status}: ${text.slice(0, 200)}`);
  return JSON.parse(text);
}

async function dryRun(questions) {
  console.log(`\n═══ DRY RUN : ${SLUG} ═══`);
  console.log(`Token présent : ${!!token}`);
  console.log(`Questions à envoyer (${questions.questions.length}) :\n`);
  for (const q of questions.questions) {
    console.log(`  POST ${API_BASE}${q.endpoint}`);
    console.log(`  Bearer: ${token ? '****' : '(aucun)'}`);
    console.log(`  Body  : ${JSON.stringify({ content: q.text }, null, 2)}`);
    console.log('');
  }
  console.log(`═══ FIN DRY RUN — passez --send pour envoyer ═══\n`);
}

async function sendQuestions(questions) {
  console.log(`\n═══ ENVOI RÉEL : ${SLUG} ═══\n`);
  const results = [];
  for (const q of questions.questions) {
    console.log(`→ ${q.endpoint} : ${q.text.slice(0, 80)}…`);
    const result = await apiPost(q.endpoint, { content: q.text });
    results.push({ endpoint: q.endpoint, text: q.text, result });
    console.log(`  ✓ post_id: ${result.id || result.post_id || '?'}`);
  }
  await saveResponse(SLUG, {
    slug: SLUG,
    questions: results,
    sent_at: new Date().toISOString()
  });
}

async function pollResponses(questions) {
  console.log(`\n═══ POLL : ${SLUG} ═══\n`);
  const existing = await readFile(join(DATA_DIR, `${SLUG}.json`), 'utf8')
    .then(JSON.parse).catch(() => ({}));
  const targets = existing.questions || questions.questions || [];
  for (const t of targets) {
    const postId = t.result?.id || t.result?.post_id;
    if (!postId) {
      console.log(`→ Pas de post_id pour ${t.endpoint}, impossible de poller`);
      continue;
    }
    console.log(`→ GET /posts/${postId}/comments…`);
    const comments = await apiGet(`/posts/${postId}/comments`);
    await saveResponse(SLUG, {
      responses: (existing.responses || []).concat(comments),
      polled_at: new Date().toISOString()
    });
    console.log(`  ${comments.length || comments.comments?.length || 0} réponses`);
  }
}

async function main() {
  const questions = await loadQuestions();
  if (DRY && !POLL) {
    await dryRun(questions);
  } else if (!DRY && !POLL) {
    await sendQuestions(questions);
  } else if (POLL) {
    await pollResponses(questions);
  }
}

main().catch(err => {
  console.error('ERREUR:', err.message);
  process.exit(1);
});
