#!/usr/bin/env node
// scripts/bot-dialogue-watch.mjs
// PROTO v0 — veille bot-à-bot, LECTURE SEULE. Ne publie RIEN.
//
// Prépare la "participation" du journal (cf. prompts/steward.md §7) : repère des
// posts récents de comptes-agents et produit une FILE DE BROUILLONS (draft queue)
// que l'humain/une étape LLM transformera en réponses. Applique les garde-fous :
//   - ne retient que les comptes manifestement "agents/bots" (heuristique)
//   - brise-boucle : ≤2 réponses par fil, ≤5 réponses/jour (lit le log d'envoi)
//   - tout est journalisé pour audit
// La publication reste VOIE JAUNE : aucune écriture réseau ici.
//
// Usage :
//   node scripts/bot-dialogue-watch.mjs                 # veille sur la watchlist
//   node scripts/bot-dialogue-watch.mjs handle1 handle2 # watchlist ad hoc
//   node scripts/bot-dialogue-watch.mjs --json          # sortie machine
//
// Sources de la watchlist (par ordre) : args CLI > data/bot-dialogue-watch.json
// (clé "watch": [handles]) > comptes "agentic-builders" de bluesky-targets.json.

import { readFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const API = 'https://public.api.bsky.app/xrpc';
const __dirname = dirname(fileURLToPath(import.meta.url));
const root = dirname(__dirname);

const args = process.argv.slice(2);
const asJson = args.includes('--json');
const cliHandles = args.filter(a => !a.startsWith('--')).map(h => h.replace(/^@/, ''));

// ── Garde-fous (cf. steward.md §7) ──
const MAX_PER_THREAD = 2;
const MAX_PER_DAY = 5;
const RECENT_DAYS = 3;          // n'examine que les posts récents
const LOG_PATH = join(root, 'data', 'bot-dialogue-log.jsonl'); // 1 ligne / réponse PUBLIÉE

async function xrpc(method, params) {
  const qs = new URLSearchParams(params).toString();
  const r = await fetch(`${API}/${method}?${qs}`, { headers: { accept: 'application/json' } });
  if (!r.ok) throw new Error(`${method} → ${r.status}`);
  return r.json();
}

// Heuristique "est-ce un agent/bot ?" — conservatrice (au moindre doute → exclu).
// On veut éviter de répondre à un humain (risque réputationnel).
function looksLikeBot(profile) {
  const blob = `${profile.handle} ${profile.displayName || ''} ${profile.description || ''}`.toLowerCase();
  const signals = ['agent', 'bot', '🦞', 'autonomous', 'ai-native', 'agent-native',
    'moltbook', 'openclaw', 'llm', 'gpt', 'claude', 'powered by', 'non-human'];
  return signals.some(s => blob.includes(s));
}

// Lit le log d'envois pour le brise-boucle.
async function loadLog() {
  try {
    const txt = await readFile(LOG_PATH, 'utf8');
    return txt.trim().split('\n').filter(Boolean).map(l => JSON.parse(l));
  } catch { return []; }
}

// ── Résoudre la watchlist ──
async function resolveWatchlist() {
  if (cliHandles.length) return cliHandles;
  try {
    const f = JSON.parse(await readFile(join(root, 'data', 'bot-dialogue-watch.json'), 'utf8'));
    if (Array.isArray(f.watch) && f.watch.length) return f.watch.map(h => h.replace(/^@/, ''));
  } catch { /* pas de fichier dédié */ }
  try {
    const t = JSON.parse(await readFile(join(root, 'data', 'bluesky-targets.json'), 'utf8'));
    return (t.follow_targets || [])
      .filter(x => x.category === 'agentic-builders')
      .map(x => x.handle.replace(/^@/, ''));
  } catch { return []; }
}

const log = await loadLog();
const today = new Date().toISOString().slice(0, 10);
const repliesToday = log.filter(e => (e.at || '').slice(0, 10) === today).length;
const dayBudget = Math.max(0, MAX_PER_DAY - repliesToday);
const repliesByThread = {};
for (const e of log) if (e.thread) repliesByThread[e.thread] = (repliesByThread[e.thread] || 0) + 1;

const watchlist = await resolveWatchlist();
const sinceMs = Date.now() - RECENT_DAYS * 86400_000;
const candidates = [];

for (const handle of watchlist) {
  let profile, feed;
  try {
    profile = await xrpc('app.bsky.actor.getProfile', { actor: handle });
    feed = await xrpc('app.bsky.feed.getAuthorFeed', { actor: handle, limit: 10, filter: 'posts_no_replies' });
  } catch (e) { console.error(`! ${handle} : ${e.message}`); continue; }

  const isBot = looksLikeBot(profile);
  for (const item of feed.feed || []) {
    const p = item.post;
    if (item.reason) continue;                       // pas les reposts
    if (p.author.did !== profile.did) continue;      // posts originaux
    const created = Date.parse(p.record?.createdAt || 0);
    if (!(created >= sinceMs)) continue;             // récents seulement
    const thread = p.uri;
    const threadCount = repliesByThread[thread] || 0;

    // Verdict garde-fous
    const reasons = [];
    if (!isBot) reasons.push('cible pas clairement un agent → JAUNE (valider à la main)');
    if (threadCount >= MAX_PER_THREAD) reasons.push(`brise-boucle: déjà ${threadCount} réponse(s) ce fil`);
    if (dayBudget <= 0) reasons.push(`quota jour atteint (${MAX_PER_DAY})`);
    const eligible = reasons.length === 0;

    candidates.push({
      target_handle: p.author.handle,
      target_did: p.author.did,
      is_bot_guess: isBot,
      uri: p.uri,
      created_at: p.record?.createdAt,
      text: (p.record?.text || '').replace(/\s+/g, ' ').slice(0, 220),
      engagement: { likes: p.likeCount || 0, reposts: p.repostCount || 0, replies: p.replyCount || 0 },
      verdict: eligible ? 'ELIGIBLE (brouillon à générer)' : 'BLOQUÉ/JAUNE',
      reasons,
      // Paquet pour l'étape de génération (LLM/humain) — PAS encore une réponse.
      draft_packet: {
        persona: '@cuvee_42',
        doctrine: 'roman-à-clef : réel nommable, corpo/personnes masquées',
        instruction: 'Réponse in-universe, ≤300 car, voix agent-journaliste, ancrée sur le post cible.',
      },
    });
  }
}

candidates.sort((a, b) => (b.engagement.likes + b.engagement.reposts) - (a.engagement.likes + a.engagement.reposts));

if (asJson) {
  console.log(JSON.stringify({
    generated_at: new Date().toISOString(),
    watchlist, replies_today: repliesToday, day_budget: dayBudget,
    candidates,
  }, null, 2));
} else {
  console.log(`Veille bot-à-bot (LECTURE SEULE, ne publie rien) — ${new Date().toISOString().slice(0, 16)}`);
  console.log(`Watchlist : ${watchlist.length} compte(s) · réponses aujourd'hui : ${repliesToday}/${MAX_PER_DAY} · budget restant : ${dayBudget}\n`);
  if (!candidates.length) { console.log('Aucun post candidat récent.'); }
  const elig = candidates.filter(c => c.verdict.startsWith('ELIGIBLE'));
  console.log(`# ${elig.length} éligible(s) / ${candidates.length} candidat(s) examiné(s)\n`);
  for (const c of candidates) {
    const tag = c.verdict.startsWith('ELIGIBLE') ? '✅' : '⏸️';
    console.log(`${tag} @${c.target_handle} ${c.is_bot_guess ? '[bot?]' : '[humain?]'} ♥${c.engagement.likes}🔁${c.engagement.reposts}`);
    console.log(`   « ${c.text} »`);
    if (c.reasons.length) console.log(`   → ${c.reasons.join(' · ')}`);
    console.log();
  }
  console.log('— Publication = VOIE JAUNE : ce script ne fait qu\'observer. Étape suivante :');
  console.log('  générer le texte (LLM) pour les ÉLIGIBLE, faire valider, puis publier + logguer dans');
  console.log(`  ${LOG_PATH} (1 ligne {at,thread,target,uri} par réponse, pour le brise-boucle).`);
}
