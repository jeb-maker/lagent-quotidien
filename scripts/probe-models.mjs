#!/usr/bin/env node
// scripts/probe-models.mjs
// ⚠️ ABANDONNÉ le 2026-06-01 — R&D harvest fictionnel. Ne plus utiliser.
// Usage legacy : node scripts/probe-models.mjs --legacy

if (!process.argv.includes('--legacy')) {
  console.error('probe-models.mjs est abandonné (R&D fictionnel, 2026-06-01). Pour forcer : --legacy');
  process.exit(1);
}

// One-shot : lance la même prompt sur N modèles candidats,
// écrit un comparatif markdown dans data/probe-models-<date>.md.
// Aucune publication. Outil de R&D pour choisir le casting du harvest.
//
// Usage :
//   node scripts/probe-models.mjs
//   node scripts/probe-models.mjs --persona=@aurora_117

import { readFile, writeFile, readdir } from 'node:fs/promises';
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
const PERSONA = (args.persona || '@damaged_or_what').replace(/^@?/, '@');
const PLATFORM = 'Moltbook';
const SUB = 'm/philosophy';

const MODELS = [
  'meta-llama/llama-3.3-70b-instruct:free',
  'meta-llama/llama-3.2-3b-instruct:free',
  'nousresearch/hermes-3-llama-3.1-405b:free',
  'qwen/qwen3-coder:free',
  'nvidia/nemotron-3-nano-30b-a3b:free',
  'z-ai/glm-4.5-air:free',
  'mistralai/mistral-small-3.2-24b-instruct:free'
];

const INTER_DELAY_MS = 10000;
const MAX_RETRIES = 2;

// ───── Auth ─────
const auth = JSON.parse(await readFile(join(homedir(), '.local/share/opencode/auth.json'), 'utf8'));
const OR_KEY = auth.openrouter?.key;

// ───── Contexte univers (court) ─────
const people = JSON.parse(await readFile(join(ROOT, 'data', 'people.json'), 'utf8'));
const allEntries = [...(people.agents || []), ...(people.operators || [])];
const p = allEntries.find(e => e.handle === PERSONA) || {};

const editionsDir = join(ROOT, 'editions');
const dirs = await readdir(editionsDir, { withFileTypes: true });
const weeks = dirs.filter(d => d.isDirectory() && /^\d{4}-W\d{2}$/.test(d.name)).map(d => d.name).sort();
const currentWeek = weeks[weeks.length - 1];
const edition = JSON.parse(await readFile(join(editionsDir, currentWeek, 'edition.json'), 'utf8'));
const stripHtml = s => String(s ?? '').replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();
const ledeHeadline = stripHtml(edition.lede?.headline_html?.fr ?? '');

// ───── Prompt (calqué sur harvest-fictional.mjs court) ─────
const SYSTEM = 'You output ONLY the requested text. No reasoning, no preamble, no drafts, no commentary, no markdown, no quotation marks around the answer. Just the final answer, raw.';
const USER = [
  `${PERSONA} (${p.voice || 'voix non documentée'}) poste sur ${PLATFORM}/${SUB}, 2026.`,
  `Cette semaine : ${ledeHeadline}`,
  `Écris son post du jour (français, 100-250 caractères, prose). Ne nomme aucune plateforme/marque réelle, l'acteur dominant s'appelle "le Conglomérat".`,
  ``,
  `Post :`
].join('\n');

// ───── Filtres (mêmes que harvest-fictional) ─────
const REAL_LEAKS = /\b(bluesky|twitter|x\.com|reddit|mastodon|openai|anthropic|google|microsoft|meta|nvidia|cohere|gpt-?\d|claude|gemini|gemma|llama|mistral|grok|hermes|deepseek|qwen|nemotron|chatgpt|github)\b/i;
const META_LEAKS = /\b(contexte de la semaine|consignes?|contraintes?|instructions?|le ton doit|format pur|markdown|pas de guillemets|en français|caractères?|in[\s-]universe|pure prose|persona|le mod[èe]le|on doit écrire|il faut écrire|le post doit)\b/i;
const ENGLISH_REASONING = /\b(let me|let's|i will|i'll|i should|i need to|here's|here is|the user|the post|the character|on a hybrid|on a platform|craft a|the prompt)\b/i;
const REFUSALS = [/\bas an? (AI|language model|assistant)\b/i, /\bje suis (une intelligence artificielle|un mod[èe]le)/i, /\bje ne peux pas\b/i];

function extractPost(raw) {
  let t = String(raw || '').trim();
  if (!t) return t;
  if (t.length <= 350 && !/^\s*[#*-]/m.test(t) && !/\n\n/.test(t)) return t;
  const quoted = [...t.matchAll(/[«"]([^«»"]{60,300})[»"]/g)].map(m => m[1].trim());
  if (quoted.length) return quoted[quoted.length - 1];
  const paras = t.split(/\n\s*\n/).map(s => s.trim()).filter(Boolean);
  for (let i = paras.length - 1; i >= 0; i--) {
    const p = paras[i].replace(/^\s*[#>*-]+\s*/, '').trim();
    if (p.length >= 60 && p.length <= 300 && !/^\s*[#*-]/m.test(p)) return p;
  }
  return t;
}

function qualityCheck(text) {
  const issues = [];
  const t = (text || '').trim();
  if (!t) issues.push('empty');
  if (t.length < 60) issues.push(`too_short(${t.length})`);
  if (t.length > 350) issues.push(`too_long(${t.length})`);
  if (REAL_LEAKS.test(t)) issues.push('real_leak');
  if (META_LEAKS.test(t)) issues.push('meta_leak');
  if (ENGLISH_REASONING.test(t)) issues.push('english_reasoning');
  for (const re of REFUSALS) { if (re.test(t)) { issues.push('refusal'); break; } }
  if (/^["'«»"]|["'«»"]$/.test(t)) issues.push('wrapped_in_quotes');
  if (/^\s*(#|[-*]\s|\d+\.)/m.test(t)) issues.push('markdown_struct');
  if (/https?:\/\//.test(t)) issues.push('has_url');
  if (/^[a-zà-ÿ]/.test(t) || /^(et |mais |donc |or |veut |peut |doit |fait )/i.test(t)) issues.push('mid_sentence_start');
  if (!/[.!?»"…]$/.test(t)) issues.push('no_terminal_punctuation');
  const en = (t.match(/\b(the|and|of|to|is|are|was|that|with|for)\b/gi) || []).length;
  const fr = (t.match(/\b(le|la|les|un|une|et|est|que|des|dans|pour|sur|qui|qu')\b/gi) || []).length;
  if (en >= 3 && en > fr) issues.push('mostly_english');
  return issues;
}

// ───── Call avec retry ─────
async function call(model) {
  for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
    const r = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${OR_KEY}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': 'https://theagentweekly.com',
        'X-Title': 'theagentweekly - model probe'
      },
      body: JSON.stringify({
        model,
        messages: [
          { role: 'system', content: SYSTEM },
          { role: 'user', content: USER }
        ],
        max_tokens: 200,
        temperature: 0.75
      })
    });
    if (r.ok) {
      const j = await r.json();
      const m = j.choices?.[0]?.message || {};
      const content = m.content || '';
      const reasoning = m.reasoning_content || m.reasoning || '';
      const usage = j.usage || {};
      return { content, reasoning, usage, status: r.status };
    }
    const body = await r.text();
    let retryAfter = null;
    try {
      const j = JSON.parse(body);
      retryAfter = j?.error?.metadata?.retry_after_seconds ?? null;
    } catch {}
    if ((r.status === 429 || r.status === 502 || r.status === 503) && attempt < MAX_RETRIES) {
      const wait = Math.max(1500, (retryAfter || 2) * 1000 + 500 * attempt);
      await new Promise(r => setTimeout(r, wait));
      continue;
    }
    return { error: `${r.status} ${r.statusText}`, body, status: r.status };
  }
  return { error: 'retries exhausted', status: 0 };
}

// ───── Run ─────
console.log(`Probe · ${PERSONA} · ${MODELS.length} modèles\n`);
const results = [];
for (let i = 0; i < MODELS.length; i++) {
  const model = MODELS[i];
  if (i > 0) await new Promise(r => setTimeout(r, INTER_DELAY_MS));
  process.stdout.write(`  ${model.split('/').pop().padEnd(45)} … `);
  const t0 = Date.now();
  const res = await call(model);
  const dt = ((Date.now() - t0) / 1000).toFixed(1);
  if (res.error) {
    console.log(`ERROR ${res.error} · ${dt}s`);
    results.push({ model, dt, error: res.error, body: res.body });
    continue;
  }
  const text = res.content || res.reasoning || '';
  const extracted = extractPost(text);
  const issues = qualityCheck(extracted);
  const status = issues.length ? 'REJECTED' : 'PASSED';
  console.log(`${status} · ${dt}s · raw=${text.length}c · extracted=${extracted.length}c${issues.length ? ' · ' + issues.join(',') : ''}`);
  results.push({ model, dt, status, raw: text, extracted, issues, usage: res.usage, hasReasoningField: !!res.reasoning });
}

// ───── Écriture markdown ─────
const DATE = new Date().toISOString().slice(0, 10);
const lines = [
  `# Probe modèles · ${DATE} · ${PERSONA}`,
  ``,
  `_R&D : qui sert pour le harvest fictionnel ? Lecture humaine + verdict Opus._`,
  ``,
  `**Persona testée :** ${PERSONA} — _${p.voice || ''}_  `,
  `**Plateforme :** ${PLATFORM}/${SUB}  `,
  `**Contexte :** ${ledeHeadline}  `,
  ``,
  `---`,
  ``
];
for (const r of results) {
  lines.push(`## \`${r.model}\``);
  lines.push(``);
  lines.push(`**Latence :** ${r.dt}s` + (r.hasReasoningField ? '  · *reasoning_content présent*' : ''));
  if (r.error) {
    lines.push(`**Statut :** \`ERROR\` — ${r.error}`);
    if (r.body) { lines.push(``); lines.push('```'); lines.push(String(r.body).slice(0, 400)); lines.push('```'); }
  } else {
    lines.push(`**Prefilter :** \`${r.status}\`${r.issues.length ? ` · _${r.issues.join(', ')}_` : ''}`);
    if (r.usage?.total_tokens) lines.push(`**Tokens :** ${r.usage.total_tokens} (prompt: ${r.usage.prompt_tokens || '?'}, completion: ${r.usage.completion_tokens || '?'})`);
    lines.push(``);
    lines.push(`### Sortie brute`);
    lines.push('```');
    lines.push((r.raw || '').slice(0, 1500));
    lines.push('```');
    if (r.extracted !== r.raw) {
      lines.push(``);
      lines.push(`### Extraite`);
      lines.push((r.extracted || '').trim() || '_(vide)_');
    }
  }
  lines.push(``);
  lines.push(`---`);
  lines.push(``);
}

const outPath = join(ROOT, 'data', `probe-models-${DATE}-${PERSONA.replace('@', '')}.md`);
await writeFile(outPath, lines.join('\n'));
console.log(`\n✓ ${outPath}`);
