// scripts/lib/ai-bots.mjs — classification des user-agents IA par FONCTION.
//
// Le public A (stratégie) est « lu et cité par les IA ». Un compteur global
// « ai_bot » mélange trois choses qui n'ont pas la même valeur pour ce but :
//
//  - live      : fetch déclenché par un utilisateur en conversation (ChatGPT-User,
//                Claude-User, Perplexity-User…). C'est la trace la plus proche
//                d'une CITATION réelle : une réponse IA a pointé vers nous.
//  - search    : index de recherche des assistants (OAI-SearchBot, PerplexityBot,
//                Claude-SearchBot…). Préalable à la citation, pas la citation.
//  - training  : crawl d'entraînement (GPTBot, ClaudeBot, CCBot, Bytespider…).
//                Utile à long terme, aucun signal court terme.
//  - other_ai  : reconnu IA mais non classé — à ranger quand il apparaît.
//
// Classification d'après la documentation publique des éditeurs (robots pages
// OpenAI / Anthropic / Perplexity / Meta), à réévaluer si un UA change de rôle.

const LIVE = [
  'chatgpt-user', 'claude-user', 'claude-web', 'perplexity-user',
  'meta-externalfetcher', 'mistralai-user', 'duckassistbot'
];
const SEARCH = [
  'oai-searchbot', 'claude-searchbot', 'perplexitybot', 'youbot',
  'amazonbot', 'aranet-searchbot', 'nuggetsbot'
];
const TRAINING = [
  'gptbot', 'claudebot', 'anthropic-ai', 'ccbot', 'bytespider',
  'google-extended', 'cohere-ai', 'applebot-extended', 'diffbot',
  'meta-externalagent', 'facebookbot', 'omgili', 'omgilibot', 'timpibot'
];

export const RETRIEVAL_CLASSES = ['live', 'search', 'training', 'other_ai'];

export function classifyAiBot(name) {
  const n = String(name || '').trim().toLowerCase();
  if (LIVE.includes(n)) return 'live';
  if (SEARCH.includes(n)) return 'search';
  if (TRAINING.includes(n)) return 'training';
  return 'other_ai';
}

// Agrège un dictionnaire { UA: count } (casse variable) en { live, search, training, other_ai }.
export function retrievalBreakdown(aiBotsDetail) {
  const out = Object.fromEntries(RETRIEVAL_CLASSES.map(k => [k, 0]));
  const unknown = {};
  for (const [name, count] of Object.entries(aiBotsDetail || {})) {
    const cls = classifyAiBot(name);
    out[cls] += Number(count) || 0;
    if (cls === 'other_ai') unknown[name] = (unknown[name] || 0) + (Number(count) || 0);
  }
  return { ...out, unknown };
}

// Regex de détection (daily-stats) : union des trois listes. Le groupe capturant
// sert à extraire le nom canonique du UA (ordre : noms longs d'abord pour que
// « applebot-extended » ne soit pas tronqué en « applebot »).
const ALL_NAMES = [...LIVE, ...SEARCH, ...TRAINING].sort((a, b) => b.length - a.length);
export const AI_BOT_RE = new RegExp(`(${ALL_NAMES.join('|')})`, 'i');

// Nom canonique tel que listé ci-dessus (minuscules), ou null.
export function canonicalAiBotName(userAgent) {
  const m = String(userAgent || '').match(AI_BOT_RE);
  return m ? m[1].toLowerCase() : null;
}
