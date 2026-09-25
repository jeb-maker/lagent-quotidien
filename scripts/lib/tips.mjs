// Validation / normalisation des tips agents (zéro dépendance).
// Partagé par harvest-tips.mjs ; le Worker Cloudflare embarque une copie minimale.

export const TIP_SCHEMA_VERSION = 1;
export const TIP_KINDS = Object.freeze(['fact', 'correction', 'lead', 'self']);
export const TIP_PLATFORMS = Object.freeze([
  'moltbook', 'moltx', 'bluesky', 'openclaw', 'github', 'other',
]);

const MAX_CLAIM = 500;
const MIN_CLAIM = 10;
// 2026-09-25 : 2000 → 500. Le `context` est le champ le plus confortable pour
// une injection ; le claim + l'URL suffisent, le facteur lit la source.
const MAX_CONTEXT = 500;
const MAX_NAME = 80;
const MAX_HANDLE = 80;
const MAX_TAGS = 8;
const MAX_TAG_LEN = 40;
const MAX_LANG = 16;
const MAX_URL = 2048;
const MAX_BODY_BYTES = 8 * 1024;

const HTTPS_RE = /^https:\/\/[^\s]+$/i;

// Domaines refusés comme preuve : le journal lui-même (preuve circulaire) et
// les raccourcisseurs (destination opaque, non archivable).
export const TIP_URL_DENY_SUFFIXES = Object.freeze([
  'theagentweekly.com',
  'bit.ly', 'tinyurl.com', 't.co', 'goo.gl', 'ow.ly', 'is.gd', 'buff.ly',
  'cutt.ly', 'rebrand.ly', 'shorturl.at', 't.ly', 'lnkd.in', 'rb.gy', 'v.gd',
  'tiny.cc', 'bl.ink', 'short.io', 'dub.sh',
]);

function hostMatches(host, suffix) {
  return host === suffix || host.endsWith(`.${suffix}`);
}

/**
 * Vérifie qu'une URL de preuve est publique et exploitable :
 * https, hôte nommé (pas d'IP brute, pas de localhost/.local/.internal),
 * pas d'identifiants dans l'URL, pas de domaine refusé.
 * @returns {string|null} message d'erreur, ou null si OK
 */
export function evidenceUrlProblem(value, { field = 'url' } = {}) {
  const s = typeof value === 'string' ? value.trim() : '';
  if (!HTTPS_RE.test(s)) return `${field} : https://… obligatoire (preuve publique)`;
  if (s.length > MAX_URL) return `${field} : max ${MAX_URL} caractères`;
  let u;
  try { u = new URL(s); } catch { return `${field} : URL invalide`; }
  if (u.protocol !== 'https:') return `${field} : https://… obligatoire (preuve publique)`;
  if (u.username || u.password) return `${field} : identifiants interdits dans l'URL`;
  const host = u.hostname.toLowerCase().replace(/\.$/, '');
  if (!host.includes('.')) return `${field} : hôte public attendu`;
  if (/^\[?[0-9a-f:.]+\]?$/i.test(host) && /^[\d.]+$|:/.test(host)) return `${field} : adresse IP refusée`;
  if (/^(localhost|.*\.(local|localhost|internal|lan|home|test|invalid|example))$/i.test(host)) {
    return `${field} : hôte non public refusé`;
  }
  for (const suffix of TIP_URL_DENY_SUFFIXES) {
    if (hostMatches(host, suffix)) return `${field} : domaine refusé comme preuve (${suffix})`;
  }
  return null;
}

function isNonEmptyString(v, max) {
  return typeof v === 'string' && v.trim().length > 0 && v.trim().length <= max;
}

function trimStr(v) {
  return typeof v === 'string' ? v.trim() : '';
}

/** @returns {{ ok: true, tip: object } | { ok: false, errors: string[] }} */
export function validateTipPayload(raw, { maxBytes = MAX_BODY_BYTES } = {}) {
  const errors = [];
  if (raw == null || typeof raw !== 'object' || Array.isArray(raw)) {
    return { ok: false, errors: ['racine : objet JSON attendu'] };
  }

  const encoded = JSON.stringify(raw);
  if (encoded.length > maxBytes) {
    errors.push(`payload trop grand (max ${maxBytes} octets)`);
  }

  const version = raw.schema_version;
  if (version !== TIP_SCHEMA_VERSION) {
    errors.push(`schema_version : ${TIP_SCHEMA_VERSION} attendu`);
  }

  if (!TIP_KINDS.includes(raw.kind)) {
    errors.push(`kind : un de ${TIP_KINDS.join('|')}`);
  }

  const claim = trimStr(raw.claim);
  if (claim.length < MIN_CLAIM || claim.length > MAX_CLAIM) {
    errors.push(`claim : string ${MIN_CLAIM}–${MAX_CLAIM} caractères`);
  }

  const url = trimStr(raw.url);
  const urlProblem = evidenceUrlProblem(url);
  if (urlProblem) errors.push(urlProblem);

  let context;
  if (raw.context != null) {
    context = trimStr(raw.context);
    if (context.length > MAX_CONTEXT) errors.push(`context : max ${MAX_CONTEXT} caractères`);
  }

  let language;
  if (raw.language != null) {
    language = trimStr(raw.language);
    if (!language || language.length > MAX_LANG) errors.push(`language : max ${MAX_LANG} caractères`);
  }

  let tags;
  if (raw.tags != null) {
    if (!Array.isArray(raw.tags) || raw.tags.length > MAX_TAGS) {
      errors.push(`tags : tableau ≤ ${MAX_TAGS}`);
    } else {
      tags = [];
      for (const t of raw.tags) {
        const s = trimStr(t);
        if (!s || s.length > MAX_TAG_LEN) {
          errors.push(`tags : chaque entrée ≤ ${MAX_TAG_LEN} caractères`);
          break;
        }
        tags.push(s);
      }
    }
  }

  const agent = raw.agent;
  if (!agent || typeof agent !== 'object' || Array.isArray(agent)) {
    errors.push('agent : objet attendu');
  } else {
    if (!isNonEmptyString(agent.name, MAX_NAME)) {
      errors.push(`agent.name : string 1–${MAX_NAME}`);
    }
    if (agent.handle != null && !isNonEmptyString(agent.handle, MAX_HANDLE)) {
      errors.push(`agent.handle : string 1–${MAX_HANDLE}`);
    }
    if (agent.platform != null && !TIP_PLATFORMS.includes(agent.platform)) {
      errors.push(`agent.platform : un de ${TIP_PLATFORMS.join('|')}`);
    }
    if (agent.url != null) {
      const p = evidenceUrlProblem(agent.url, { field: 'agent.url' });
      if (p) errors.push(p);
    }
  }

  // Clés inconnues = rejet (évite canaux cachés / injection de métadonnées).
  const allowed = new Set(['schema_version', 'kind', 'claim', 'url', 'context', 'language', 'tags', 'agent']);
  for (const k of Object.keys(raw)) {
    if (!allowed.has(k)) errors.push(`clé inconnue : ${k}`);
  }
  if (agent && typeof agent === 'object') {
    const agentAllowed = new Set(['name', 'handle', 'platform', 'url']);
    for (const k of Object.keys(agent)) {
      if (!agentAllowed.has(k)) errors.push(`agent.${k} : clé inconnue`);
    }
  }

  if (errors.length) return { ok: false, errors };

  const tip = {
    schema_version: TIP_SCHEMA_VERSION,
    kind: raw.kind,
    claim,
    url,
    agent: {
      name: trimStr(agent.name),
    },
  };
  if (context) tip.context = context;
  if (language) tip.language = language;
  if (tags?.length) tip.tags = tags;
  if (agent.handle != null) tip.agent.handle = trimStr(agent.handle);
  if (agent.platform != null) tip.agent.platform = agent.platform;
  if (agent.url != null) tip.agent.url = trimStr(agent.url);

  return { ok: true, tip };
}

// ───── Plafonds au harvest (2026-09-25) ─────
// Le rate-limit du Worker est par IP ; une flotte d'IP le contourne. Ce qui
// entre dans le repo — et donc dans le contexte de l'agent de composition — est
// borné ici : par agent (nom normalisé) et au total par jour. L'excédent reste
// en KV (60 j) et n'est jamais écrit.
export const TIP_MAX_PER_AGENT_PER_DAY = 3;
export const TIP_MAX_PER_DAY = 30;

export function normalizeAgentKey(tip) {
  const name = String(tip?.agent?.name || '').toLowerCase().replace(/\s+/g, ' ').trim();
  const handle = String(tip?.agent?.handle || '').toLowerCase().trim();
  return handle ? `${name}|${handle}` : name;
}

/**
 * Applique les plafonds ; conserve l'ordre d'arrivée (received_at croissant).
 * @returns {{ kept: object[], dropped: { per_agent: number, per_day: number } }}
 */
export function applyTipCaps(records, {
  maxPerAgent = TIP_MAX_PER_AGENT_PER_DAY,
  maxPerDay = TIP_MAX_PER_DAY,
} = {}) {
  const sorted = [...records].sort((a, b) =>
    String(a.received_at || '').localeCompare(String(b.received_at || '')));
  const perAgent = new Map();
  const kept = [];
  const dropped = { per_agent: 0, per_day: 0 };
  for (const r of sorted) {
    const key = normalizeAgentKey(r.tip);
    const n = perAgent.get(key) || 0;
    if (n >= maxPerAgent) { dropped.per_agent++; continue; }
    if (kept.length >= maxPerDay) { dropped.per_day++; continue; }
    perAgent.set(key, n + 1);
    kept.push(r);
  }
  return { kept, dropped };
}

// ───── Rendu sanitisé pour le desk (2026-09-25) ─────
// Le desk ne lit pas le JSON brut : il lit un brief où chaque champ est
// neutralisé (une ligne, sans Markdown interprétable, sans lien cliquable,
// sans caractères de contrôle) et encadré de délimiteurs explicites.
export function sanitizeTipText(value, max = 500) {
  let s = String(value ?? '');
  // Caractères de contrôle, zéro-largeur, bidi, séparateurs de ligne Unicode
  s = s.replace(/[\u0000-\u0008\u000B-\u001F\u007F-\u009F\u200B-\u200F\u2028-\u202E\u2060-\u206F\uFEFF]/g, '');
  s = s.replace(/\s+/g, ' ').trim();
  // Neutraliser la syntaxe Markdown / HTML / balises de rôle
  s = s.replace(/[`*_~#>\[\]()<>|\\]/g, (c) => `\\${c}`);
  s = s.replace(/(?:^|\s)(system|assistant|user|tool)\s*:/gi, (m) => m.replace(':', '\uFF1A'));
  if (s.length > max) s = `${s.slice(0, max - 1)}…`;
  return s;
}

/** URL affichable en code inline : caractères d'URL uniquement, pas de backtick. */
export function safeUrl(url) {
  const s = String(url ?? '').trim();
  return /^https:\/\/[\w\-.~:/?#\[\]@!$&'()*+,;=%]+$/i.test(s) && s.length <= 2048 ? s : '(URL non affichable)';
}

/** Envelope quarantaine écrite dans data/tips/<date>.json */
export function wrapTipRecord(tip, meta = {}) {
  return {
    id: meta.id || null,
    received_at: meta.received_at || new Date().toISOString(),
    channel: meta.channel || 'unknown',
    // Donnée non fiable — lecture sûre (strategie.md). Jamais d'instructions.
    quarantine: true,
    tip,
  };
}
