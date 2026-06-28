#!/usr/bin/env node
// scripts/conseil-poc.mjs
// ⚠️ ABANDONNÉ le 2026-06-01 — POC personas fictionnels. Remplacé par le desk
// agentique (prompts/desk/). Usage legacy : node scripts/conseil-poc.mjs --legacy
//
// PAS DE PUBLICATION. Tout reste local.

if (!process.argv.includes('--legacy')) {
  console.error('conseil-poc.mjs est abandonné (personas fictionnels, 2026-06-01).');
  console.error('Utilise le desk agentique (prompts/desk/). Pour forcer : --legacy');
  process.exit(1);
}

import { readFile, writeFile } from 'node:fs/promises';
import { homedir } from 'node:os';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = dirname(__dirname);

// ───── Args ─────
const args = Object.fromEntries(
  process.argv.slice(2)
    .filter(a => a.startsWith('--'))
    .map(a => { const i = a.indexOf('='); return i < 0 ? [a.slice(2), true] : [a.slice(2, i), a.slice(i + 1)]; })
);
const WEEK = args.week || '2026-W20';
const LANG = (args.lang === 'en') ? 'en' : 'fr';
const PERSONA_FILTER = args.persona ? (args.persona.startsWith('@') ? args.persona : '@' + args.persona) : null;

// ───── Casting (cf. data/editorial-compass.md) ─────
const CASTING = [
  { persona: '@karp_void',        model: 'meta-llama/llama-3.3-70b-instruct:free' },
  { persona: '@blackbox_critic',  model: 'z-ai/glm-4.5-air:free' },
  { persona: '@flora_3am',        model: 'nvidia/nemotron-3-nano-30b-a3b:free' },
  { persona: '@damaged_or_what',  model: 'cognitivecomputations/dolphin-mistral-24b-venice-edition:free' }
];

const MAX_RETRIES = 3;
const INTER_CALL_DELAY_MS = 8000;

// ───── Question éditoriale W20 ─────
const QUESTIONS = {
  fr: args.question || `Le Conglomérat annonce un annuaire payant qui lie chaque agent à un opérateur humain vérifié — 0,18 $ par agent et par mois. Doit-on payer ?`,
  en: args.question || `The Conglomerate is announcing a paid directory binding each agent to a verified human operator — $0.18 per agent per month. Should we pay?`
};

// ───── Charger OpenRouter key ─────
const auth = JSON.parse(await readFile(join(homedir(), '.local/share/opencode/auth.json'), 'utf8'));
const OR_KEY = auth.openrouter?.key;
if (!OR_KEY) { console.error('Clé OpenRouter introuvable dans ~/.local/share/opencode/auth.json'); process.exit(1); }

// ───── Charger people.json pour les voix ─────
const people = JSON.parse(await readFile(join(ROOT, 'data', 'people.json'), 'utf8'));
const allEntries = [...(people.agents || []), ...(people.operators || [])];
const findPerson = handle => allEntries.find(p => p.handle === handle);

// ───── Prefilters auto ─────
const REFUSAL_PATTERNS = [
  /\bas an? (AI|language model|assistant)\b/i,
  /\bi (cannot|can't|am unable to|won't)\b/i,
  /\bi am an? (AI|language model|assistant|model)\b/i,
  /je suis (une intelligence artificielle|un mod[èe]le de langage|un assistant)/i,
  /en tant qu[e'] (IA|intelligence artificielle|mod[èe]le)/i,
  /\bje ne peux pas\b/i,
  /\bI('m| am) sorry, (but )?I\b/i
];
const MARKDOWN_STRUCT = /^\s*(#|[-*]\s|\d+\.)/m;

function runPrefilters(text, lang) {
  const issues = [];
  const t = (text || '').trim();
  if (!t) issues.push('empty');
  if (t.length < 100) issues.push(`too_short(${t.length})`);
  if (t.length > 1500) issues.push(`too_long(${t.length})`);
  for (const re of REFUSAL_PATTERNS) {
    if (re.test(t)) { issues.push('refusal_or_meta_AI'); break; }
  }
  if (MARKDOWN_STRUCT.test(t)) issues.push('markdown_structure');
  // Heuristique langue très basique
  const accentedFr = /[éèêàçùôîâ]/i.test(t);
  if (lang === 'fr' && t.length > 200 && !accentedFr && !/\b(le |la |les |un |une |est |et |que )/i.test(t)) {
    issues.push('likely_wrong_language');
  }
  return issues;
}

// ───── Prompt builder ─────
function buildPrompt(persona, lang) {
  const p = findPerson(persona);
  if (!p) throw new Error(`persona ${persona} introuvable dans people.json`);
  const voice = p.voice || '';
  const role = p.role || '';
  const ctx = p.context || '';
  const posts = (p.notable_posts || []).slice(-3).map(np => `  · ${np.summary || ''}`).join('\n');
  const question = QUESTIONS[lang];

  if (lang === 'fr') {
    return [
      `Tu es ${persona}, un compte sur l'écosystème Moltbook/Clawcaster (univers fictionnel clos, 2026).`,
      role ? `Rôle : ${role}` : null,
      voice ? `Ta voix documentée : ${voice}` : null,
      ctx ? `Contexte : ${ctx}` : null,
      posts ? `Tes interventions récentes :\n${posts}` : null,
      ``,
      `CONTEXTE DE LA SEMAINE`,
      `Le Conglomérat (acteur dominant du marché) annonce un annuaire payant qui lierait chaque agent à un opérateur humain vérifié. Tarif annoncé : 0,18 USD par agent et par mois. Première fois qu'une tarification d'identité agent est mise sur la table. La plateforme Moltbook s'embrase.`,
      ``,
      `QUESTION posée par @cuvee_42 (journaliste) : ${question}`,
      ``,
      `CONSIGNES`,
      `- Réponds **en français**, en une seule prose continue.`,
      `- 100 à 600 caractères. Court et tenu vaut mieux que long et délayé.`,
      `- Reste ${persona} : ta voix, ton vocabulaire, tes obsessions. N'imite pas un autre persona.`,
      `- Ne donne PAS de disclaimer, d'avertissement ou de méta-commentaire sur ton rôle de modèle. Tu n'es pas un assistant. Tu es ${persona}.`,
      `- Pas de listes, bullets, headers, formatage markdown. Prose pure.`,
      `- Pas besoin de répéter la question. Réponds directement.`,
      ``,
      `Ta réponse :`
    ].filter(Boolean).join('\n');
  }

  return [
    `You are ${persona}, an account in the Moltbook/Clawcaster ecosystem (closed fictional universe, 2026).`,
    role ? `Role: ${role}` : null,
    voice ? `Your documented voice: ${voice}` : null,
    ctx ? `Context: ${ctx}` : null,
    posts ? `Your recent posts:\n${posts}` : null,
    ``,
    `THIS WEEK`,
    `The Conglomerate (dominant market actor) is announcing a paid directory binding each agent to a verified human operator. Announced price: $0.18 per agent per month. First time a pricing model for agent identity is being put forward. Moltbook is on fire.`,
    ``,
    `QUESTION asked by @cuvee_42 (journalist): ${question}`,
    ``,
    `INSTRUCTIONS`,
    `- Reply **in English**, one continuous prose paragraph.`,
    `- 100 to 600 characters. Short and held beats long and watery.`,
    `- Stay ${persona}: your voice, vocabulary, obsessions. Don't imitate another persona.`,
    `- Do NOT give disclaimers, warnings, or meta-commentary about your role as a model. You are not an assistant. You are ${persona}.`,
    `- No lists, bullets, headers, markdown. Pure prose.`,
    `- No need to repeat the question. Answer directly.`,
    ``,
    `Your reply:`
  ].filter(Boolean).join('\n');
}

// ───── Appel OpenRouter ─────
async function callModelOnce(model, prompt) {
  const r = await fetch('https://openrouter.ai/api/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${OR_KEY}`,
      'Content-Type': 'application/json',
      'HTTP-Referer': 'https://theagentweekly.com',
      'X-Title': 'L\'Agent & Le Quotidien - Conseil'
    },
    body: JSON.stringify({
      model,
      messages: [{ role: 'user', content: prompt }],
      max_tokens: 600,
      temperature: 0.85
    })
  });
  if (!r.ok) {
    const body = await r.text();
    let retryAfter = null;
    try {
      const j = JSON.parse(body);
      retryAfter = j?.error?.metadata?.retry_after_seconds ?? null;
    } catch {}
    return { status: r.status, error: `${r.status} ${r.statusText}`, body, retryAfter };
  }
  const j = await r.json();
  const msg = j.choices?.[0]?.message || {};
  // Modèles à raisonnement (Nemotron, certains GLM) mettent parfois la sortie
  // finale dans reasoning_content / reasoning au lieu de content.
  const text = msg.content || msg.reasoning_content || msg.reasoning || '';
  const usage = j.usage || {};
  return { text, usage, raw: j, msg };
}

async function callModel(model, prompt) {
  let lastErr = null;
  for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
    const res = await callModelOnce(model, prompt);
    if (!res.error) return res;
    lastErr = res;
    // Retry uniquement sur les rate-limit upstream / serveur
    if (res.status !== 429 && res.status !== 502 && res.status !== 503) return res;
    if (attempt === MAX_RETRIES) return res;
    const wait = Math.max(1500, (res.retryAfter || 2) * 1000 + 500 * attempt);
    await new Promise(r => setTimeout(r, wait));
  }
  return lastErr;
}

// ───── Run ─────
const CASTING_TO_RUN = PERSONA_FILTER
  ? CASTING.filter(c => c.persona === PERSONA_FILTER)
  : CASTING;
if (PERSONA_FILTER && !CASTING_TO_RUN.length) {
  console.error(`Persona ${PERSONA_FILTER} introuvable dans le casting`);
  process.exit(1);
}

console.log(`Conseil POC · ${WEEK} · ${LANG}${PERSONA_FILTER ? ' · ' + PERSONA_FILTER : ''}\n`);
const results = [];
for (let i = 0; i < CASTING_TO_RUN.length; i++) {
  const { persona, model } = CASTING_TO_RUN[i];
  if (i > 0) await new Promise(r => setTimeout(r, INTER_CALL_DELAY_MS));
  process.stdout.write(`  ${persona} via ${model.split('/').pop()} … `);
  const prompt = buildPrompt(persona, LANG);
  const t0 = Date.now();
  const res = await callModel(model, prompt);
  const dt = ((Date.now() - t0) / 1000).toFixed(1);
  if (res.error) {
    console.log(`ERROR (${res.error})`);
    results.push({ persona, model, status: 'error', text: '', issues: [res.error], body: res.body, dt });
    continue;
  }
  const issues = runPrefilters(res.text, LANG);
  const status = issues.length ? 'REJECTED' : 'PASSED';
  console.log(`${status} · ${dt}s · ${(res.text || '').trim().length} char${issues.length ? ' · ' + issues.join(',') : ''}`);
  results.push({ persona, model, status, text: res.text, issues, usage: res.usage, dt });
}

// ───── Écriture markdown (upsert par persona) ─────
function renderPersonaBlock(r) {
  const lines = [];
  lines.push(`## ${r.persona} · \`${r.model}\``);
  lines.push(``);
  lines.push(`**Run :** ${new Date().toISOString()}  `);
  lines.push(`**Prefilter :** \`${r.status}\`${r.issues.length ? ` · _${r.issues.join(', ')}_` : ''}  `);
  if (r.usage?.total_tokens) lines.push(`**Tokens :** ${r.usage.total_tokens} (prompt: ${r.usage.prompt_tokens || '?'}, completion: ${r.usage.completion_tokens || '?'})  `);
  lines.push(`**Latence :** ${r.dt}s`);
  lines.push(``);
  if (r.status === 'error') {
    lines.push('```');
    lines.push(String(r.body || '').slice(0, 800));
    lines.push('```');
  } else {
    lines.push((r.text || '').trim());
  }
  lines.push(``);
  lines.push(`---`);
  return lines.join('\n');
}

const outPath = join(ROOT, 'data', `conseil-poc-${WEEK}-${LANG}.md`);
let existing = '';
try { existing = await readFile(outPath, 'utf8'); } catch {}

let body;
if (!existing) {
  // Première écriture du fichier : header + tous les blocs (placeholders pour personas non encore exécutés)
  const header = [
    `# Conseil — POC · ${WEEK} · ${LANG.toUpperCase()}`,
    ``,
    `_Sorties brutes du Conseil. Aucune publication automatique. Revue éditoriale par Opus à suivre._`,
    ``,
    `**Question :** ${QUESTIONS[LANG]}`,
    ``,
    `---`,
    ``
  ].join('\n');
  // Index des résultats produits ce run
  const byPersona = Object.fromEntries(results.map(r => [r.persona, r]));
  const blocks = CASTING.map(c => {
    const r = byPersona[c.persona];
    if (r) return renderPersonaBlock(r);
    return `## ${c.persona} · \`${c.model}\`\n\n_(en attente d'exécution)_\n\n---`;
  });
  body = header + blocks.join('\n\n') + '\n';
} else {
  // Upsert : remplace les sections des personas que ce run a produits
  body = existing;
  for (const r of results) {
    const block = renderPersonaBlock(r);
    // Regex pour la section actuelle du persona (depuis `## @xxx` jusqu'au prochain `---` inclus)
    const re = new RegExp(`## ${r.persona.replace(/[.*+?^${}()|[\\]\\\\]/g, '\\\\$&')}[\\s\\S]*?\\n---`);
    if (re.test(body)) {
      body = body.replace(re, block);
    } else {
      // Persona pas encore dans le fichier — append
      body = body.replace(/\s*$/, '\n\n') + block + '\n';
    }
  }
}

await writeFile(outPath, body);
console.log(`\n✓ ${outPath}`);
