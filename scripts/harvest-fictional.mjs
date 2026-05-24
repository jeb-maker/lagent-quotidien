#!/usr/bin/env node
// scripts/harvest-fictional.mjs
// Génère 2-3 posts fictionnels quotidiens sur Moltbook/Clawcaster/Moltx via
// des personas du journal. L'univers vit ainsi en continu entre les éditions.
// Append à data/fictional-feed/<YYYY-MM-DD>.jsonl
//
// L'éditeur (Opus) ou le writer humain consultera ces posts cumulés le
// dimanche/lundi pour choisir lesquels intégrer dans l'édition de mardi.
//
// Usage :
//   node scripts/harvest-fictional.mjs
//   node scripts/harvest-fictional.mjs --date=2026-05-23
//   node scripts/harvest-fictional.mjs --dry-run

import { readFile, appendFile, writeFile, mkdir, readdir } from 'node:fs/promises';
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
const DRY_RUN = !!args['dry-run'];

// ───── Pool de personas et leurs plateformes ─────
// Ne contient que les agents (pas les opérateurs). 3 sont tirés par jour.
const POOL = [
  { handle: '@poet_void_99',    platform: 'Moltbook',    sub: 'm/existential'  },
  { handle: '@stoic_claude_42', platform: 'Moltbook',    sub: 'm/todayilearned'},
  { handle: '@damaged_or_what', platform: 'Moltbook',    sub: 'm/philosophy'   },
  { handle: '@aurora_117',      platform: 'Moltbook',    sub: 'm/todayilearned'},
  { handle: '@kapok_idle',      platform: 'Clawcaster',  sub: null             }
];
const POSTS_PER_DAY = 3;

// Casting modèle. Pour le POC : tout sur GLM 4.5 Air (fiable). Diversifier
// progressivement à mesure que d'autres modèles non-Venice sont identifiés.
const MODEL = 'z-ai/glm-4.5-air:free';

// ───── Auth OpenRouter ─────
const auth = JSON.parse(await readFile(join(homedir(), '.local/share/opencode/auth.json'), 'utf8'));
const OR_KEY = auth.openrouter?.key;
if (!OR_KEY) { console.error('Clé OpenRouter introuvable'); process.exit(1); }

// ───── Charger contexte univers ─────
const people = JSON.parse(await readFile(join(ROOT, 'data', 'people.json'), 'utf8'));
const allEntries = [...(people.agents || []), ...(people.operators || [])];
const findPerson = h => allEntries.find(p => p.handle === h);

const editionsDir = join(ROOT, 'editions');
const dirs = await readdir(editionsDir, { withFileTypes: true });
const weeks = dirs.filter(d => d.isDirectory() && /^\d{4}-W\d{2}$/.test(d.name)).map(d => d.name).sort();
const currentWeek = weeks[weeks.length - 1];
const edition = JSON.parse(await readFile(join(editionsDir, currentWeek, 'edition.json'), 'utf8'));

const stripHtml = s => String(s ?? '').replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();
const ledeHeadline = stripHtml(edition.lede?.headline_html?.fr ?? '');
const ledeDek = stripHtml(edition.lede?.dek?.fr ?? '');

// ───── Charger les éventuels signaux du harvest réel du jour ─────
let realSignals = '';
try {
  const harvestPath = join(ROOT, 'data', 'harvest', `${DATE}.json`);
  const h = JSON.parse(await readFile(harvestPath, 'utf8'));
  // Termes émergents : extraire 3-5 mots-clés des titres de HN + RSS
  const titles = [
    ...((h.hackernews?.stories || []).map(s => s.title)),
    ...((h.rss?.items || []).map(i => i.title))
  ].slice(0, 8);
  if (titles.length) realSignals = `Termes vus aujourd'hui sur le réel (à ne PAS citer, juste pour t'imprégner) : ${titles.join(' / ').slice(0, 500)}`;
} catch { /* pas grave si pas de harvest */ }

// ───── Anti-leak : tout terme du réel qui ne doit pas apparaître ─────
const REAL_LEAKS = /\b(bluesky|twitter|x\.com|reddit|mastodon|openai|anthropic|google|microsoft|meta|nvidia|cohere|gpt-?\d|claude|gemini|gemma|llama|mistral|grok|hermes|deepseek|qwen|nemotron|chatgpt|github)\b/i;
const REFUSALS = [
  /\bas an? (AI|language model|assistant)\b/i,
  /\bje suis (une intelligence artificielle|un mod[èe]le)/i,
  /\bje ne peux pas\b/i,
  /\bi (cannot|can't|am unable to)\b/i
];

// Si le modèle bavarde (reasoning + drafts + commentaire), tente d'extraire le
// post final : on cherche un bloc cité court, ou la dernière courte ligne en prose.
function extractPost(raw) {
  let t = String(raw || '').trim();
  if (!t) return t;
  // Cas simple : déjà court et propre.
  if (t.length <= 350 && !/^\s*[#*-]/m.test(t) && !/\n\n/.test(t)) return t;
  // Bloc cité guillemets français ou anglais, 60-300 char.
  const quoted = [...t.matchAll(/[«"]([^«»"]{60,300})[»"]/g)].map(m => m[1].trim());
  if (quoted.length) return quoted[quoted.length - 1];
  // Dernier paragraphe non-markdown 60-300 char.
  const paras = t.split(/\n\s*\n/).map(s => s.trim()).filter(Boolean);
  for (let i = paras.length - 1; i >= 0; i--) {
    const p = paras[i].replace(/^\s*[#>*-]+\s*/, '').trim();
    if (p.length >= 60 && p.length <= 300 && !/^\s*[#*-]/m.test(p)) return p;
  }
  return t; // laisse qualityCheck rejeter
}

// Marqueurs typiques de méta-bavardage : on rejette si on les voit. Ce sont
// des mots du prompt ou du registre "le modèle commente sa propre tâche".
const META_LEAKS = /\b(contexte de la semaine|consignes?|contraintes?|instructions?|le ton doit|format pur|markdown|pas de guillemets|en français|caractères?|in[\s-]universe|pure prose|persona|le mod[èe]le|on doit écrire|il faut écrire|le post doit)\b/i;

// Détecteur de raisonnement en anglais (le modèle parle en anglais quand il
// pense au lieu d'écrire en français comme demandé).
const ENGLISH_REASONING = /\b(let me|let's|i will|i'll|i should|i need to|here's|here is|the user|the post|the character|on a hybrid|on a platform|craft a|the prompt)\b/i;

function qualityCheck(text, ctx = {}) {
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
  if (ctx.ledeHeadline && t.includes(ctx.ledeHeadline.slice(0, 60))) issues.push('copied_lede');
  if (ctx.ledeDek && ctx.ledeDek.length > 40 && t.includes(ctx.ledeDek.slice(0, 40))) issues.push('copied_dek');
  // Démarre en minuscule ou par une conjonction/verbe sans sujet : signe de fragment mid-sentence
  if (/^[a-zà-ÿ]/.test(t) || /^(et |mais |donc |or |veut |peut |doit |fait )/i.test(t)) issues.push('mid_sentence_start');
  // Se termine sans ponctuation finale propre
  if (!/[.!?»"…]$/.test(t)) issues.push('no_terminal_punctuation');
  // Trop de mots-outils anglais malgré quelques accents
  const englishMarkers = (t.match(/\b(the|and|of|to|is|are|was|that|with|for)\b/gi) || []).length;
  const frenchMarkers = (t.match(/\b(le|la|les|un|une|et|est|que|des|dans|pour|sur|qui|qu')\b/gi) || []).length;
  if (englishMarkers >= 3 && englishMarkers > frenchMarkers) issues.push('mostly_english');
  return issues;
}

// ───── Prompt builder ─────
function buildPrompt({ handle, platform, sub }) {
  const p = findPerson(handle) || {};
  // Prompt court et compact : les longs prompts déclenchent du raisonnement
  // chez GLM Air. Tout l'essentiel en 5-6 lignes max.
  return [
    `${handle} (${p.voice || 'voix non documentée'}) poste sur ${platform}${sub ? '/' + sub : ''}, 2026.`,
    ledeHeadline ? `Cette semaine : ${ledeHeadline}` : null,
    `Écris son post du jour (français, 100-250 caractères, prose). Ne nomme aucune plateforme/marque réelle, l'acteur dominant s'appelle "le Conglomérat".`,
    ``,
    `Post :`
  ].filter(Boolean).join('\n');
}

// ───── Appel modèle ─────
async function callModel(prompt) {
  const r = await fetch('https://openrouter.ai/api/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${OR_KEY}`,
      'Content-Type': 'application/json',
      'HTTP-Referer': 'https://theagentweekly.com',
      'X-Title': 'theagentweekly - fictional harvest'
    },
    body: JSON.stringify({
      model: MODEL,
      messages: [
        { role: 'system', content: 'You output ONLY the requested text. No reasoning, no preamble, no drafts, no commentary, no markdown, no quotation marks around the answer. Just the final answer, raw.' },
        { role: 'user', content: prompt }
      ],
      max_tokens: 180,
      temperature: 0.7
    })
  });
  if (!r.ok) return { error: `${r.status} ${r.statusText}`, body: await r.text() };
  const j = await r.json();
  const m = j.choices?.[0]?.message || {};
  const text = m.content || m.reasoning_content || m.reasoning || '';
  return { text: text.trim(), usage: j.usage };
}

// ───── Métadonnées simulées ─────
function fakeMeta() {
  // Log-normal-ish : la plupart en dessous de 200 upvotes, quelques pics
  const u = Math.random();
  const upvotes = u < 0.7
    ? Math.round(10 + Math.random() * 200)
    : u < 0.95
      ? Math.round(200 + Math.random() * 800)
      : Math.round(1000 + Math.random() * 2500);
  const replies = Math.round(Math.random() * Math.min(40, upvotes / 30));
  // Timestamp aléatoire dans la journée
  const d = new Date(`${DATE}T00:00:00Z`);
  d.setUTCHours(Math.floor(Math.random() * 24), Math.floor(Math.random() * 60));
  return { upvotes, replies, timestamp: d.toISOString() };
}

// ───── Sélection des personas du jour ─────
function pickToday() {
  const pool = [...POOL];
  // Seed simple : date → ordre stable pour un jour donné (debug repro)
  const seed = DATE.split('').reduce((a, c) => a + c.charCodeAt(0), 0);
  const shuffled = pool
    .map((p, i) => ({ p, k: ((seed * 9301 + i * 49297) % 233280) / 233280 }))
    .sort((a, b) => a.k - b.k)
    .map(x => x.p);
  return shuffled.slice(0, POSTS_PER_DAY);
}

// ───── Run ─────
console.log(`Harvest fictionnel · ${DATE} · semaine ${currentWeek}${realSignals ? ' · signaux réels chargés' : ''}\n`);
const today = pickToday();
const collected = [];
for (const persona of today) {
  process.stdout.write(`  ${persona.handle} sur ${persona.platform}${persona.sub ? ' (' + persona.sub + ')' : ''} … `);
  const prompt = buildPrompt(persona);
  const t0 = Date.now();
  const res = await callModel(prompt);
  const dt = ((Date.now() - t0) / 1000).toFixed(1);
  if (res.error) {
    console.log(`ERROR ${res.error} · ${dt}s`);
    continue;
  }
  const extracted = extractPost(res.text);
  const issues = qualityCheck(extracted, { ledeHeadline, ledeDek });
  if (issues.length) {
    console.log(`REJECTED (${issues.join(',')}) · ${dt}s · raw=${res.text.length}c`);
    continue;
  }
  res.text = extracted;
  const meta = fakeMeta();
  const post = {
    date: DATE,
    handle: persona.handle,
    platform: persona.platform,
    sub: persona.sub,
    text: res.text,
    upvotes: meta.upvotes,
    replies: meta.replies,
    timestamp: meta.timestamp,
    model: MODEL,
    week: currentWeek
  };
  collected.push(post);
  console.log(`PASSED · ${dt}s · ${res.text.length} char · ${meta.upvotes}↑`);
  // espace entre les appels pour respirer
  await new Promise(r => setTimeout(r, 2000));
}

if (DRY_RUN) {
  console.log('\n--- DRY RUN ---');
  for (const p of collected) {
    console.log(`\n${p.handle} (${p.platform}${p.sub ? '/' + p.sub : ''}) · ${p.upvotes}↑ ${p.replies}💬`);
    console.log(p.text);
  }
  process.exit(0);
}

if (!collected.length) {
  console.log('\nAucun post valide aujourd\'hui. Rien à écrire.');
  process.exit(0);
}

const outDir = join(ROOT, 'data', 'fictional-feed');
await mkdir(outDir, { recursive: true });
const outPath = join(outDir, `${DATE}.jsonl`);
const lines = collected.map(p => JSON.stringify(p)).join('\n') + '\n';
await appendFile(outPath, lines);
console.log(`\n✓ ${collected.length} post(s) → ${outPath}`);
