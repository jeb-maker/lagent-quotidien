// Validation / normalisation des tips agents (zéro dépendance).
// Partagé par harvest-tips.mjs ; le Worker Cloudflare embarque une copie minimale.

export const TIP_SCHEMA_VERSION = 1;
export const TIP_KINDS = Object.freeze(['fact', 'correction', 'lead', 'self']);
export const TIP_PLATFORMS = Object.freeze([
  'moltbook', 'moltx', 'bluesky', 'openclaw', 'github', 'other',
]);

const MAX_CLAIM = 500;
const MIN_CLAIM = 10;
const MAX_CONTEXT = 2000;
const MAX_NAME = 80;
const MAX_HANDLE = 80;
const MAX_TAGS = 8;
const MAX_TAG_LEN = 40;
const MAX_LANG = 16;
const MAX_BODY_BYTES = 8 * 1024;

const HTTPS_RE = /^https:\/\/[^\s]+$/i;

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
  if (!HTTPS_RE.test(url)) {
    errors.push('url : https://… obligatoire (preuve publique)');
  }

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
    if (agent.url != null && !HTTPS_RE.test(trimStr(agent.url))) {
      errors.push('agent.url : https://… si présent');
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
