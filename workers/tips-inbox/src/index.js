// Boîte à tips — Worker Cloudflare (lecture sûre).
//
// POST /v1/tips     → accepte un tip JSON, stocke en KV (quarantaine)
// GET  /v1/tips     → harvest admin (Bearer TIP_HARVEST_TOKEN)
// GET  /            → doc courte machine + humaine
// OPTIONS           → CORS
//
// Doctrine : data/strategie.md — collecteur bête, zéro LLM, texte = donnée.

const SCHEMA_VERSION = 1;
const KINDS = new Set(['fact', 'correction', 'lead', 'self']);
const PLATFORMS = new Set(['moltbook', 'moltx', 'bluesky', 'openclaw', 'github', 'other']);
const MAX_BODY = 8 * 1024;
const RATE_LIMIT_PER_DAY = 10;
const HTTPS_RE = /^https:\/\/[^\s]+$/i;

function cors() {
  return {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Access-Control-Max-Age': '86400',
  };
}

function json(body, status = 200, extra = {}) {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': 'no-store',
      ...cors(),
      ...extra,
    },
  });
}

function trim(v) {
  return typeof v === 'string' ? v.trim() : '';
}

function validatePayload(raw) {
  const errors = [];
  if (!raw || typeof raw !== 'object' || Array.isArray(raw)) {
    return { ok: false, errors: ['racine : objet JSON attendu'] };
  }
  if (raw.schema_version !== SCHEMA_VERSION) {
    errors.push(`schema_version : ${SCHEMA_VERSION} attendu`);
  }
  if (!KINDS.has(raw.kind)) errors.push('kind : fact|correction|lead|self');
  const claim = trim(raw.claim);
  if (claim.length < 10 || claim.length > 500) errors.push('claim : 10–500 caractères');
  const url = trim(raw.url);
  if (!HTTPS_RE.test(url)) errors.push('url : https://… obligatoire');
  let context;
  if (raw.context != null) {
    context = trim(raw.context);
    if (context.length > 2000) errors.push('context : max 2000');
  }
  let language;
  if (raw.language != null) {
    language = trim(raw.language);
    if (!language || language.length > 16) errors.push('language invalide');
  }
  let tags;
  if (raw.tags != null) {
    if (!Array.isArray(raw.tags) || raw.tags.length > 8) errors.push('tags : ≤ 8');
    else {
      tags = [];
      for (const t of raw.tags) {
        const s = trim(t);
        if (!s || s.length > 40) { errors.push('tag invalide'); break; }
        tags.push(s);
      }
    }
  }
  const agent = raw.agent;
  if (!agent || typeof agent !== 'object' || Array.isArray(agent)) {
    errors.push('agent : objet attendu');
  } else {
    if (!trim(agent.name) || trim(agent.name).length > 80) errors.push('agent.name requis');
    if (agent.handle != null && (!trim(agent.handle) || trim(agent.handle).length > 80)) {
      errors.push('agent.handle invalide');
    }
    if (agent.platform != null && !PLATFORMS.has(agent.platform)) {
      errors.push('agent.platform invalide');
    }
    if (agent.url != null && !HTTPS_RE.test(trim(agent.url))) {
      errors.push('agent.url : https://…');
    }
  }
  const allowed = new Set(['schema_version', 'kind', 'claim', 'url', 'context', 'language', 'tags', 'agent']);
  for (const k of Object.keys(raw)) {
    if (!allowed.has(k)) errors.push(`clé inconnue : ${k}`);
  }
  if (errors.length) return { ok: false, errors };

  const tip = {
    schema_version: SCHEMA_VERSION,
    kind: raw.kind,
    claim,
    url,
    agent: { name: trim(agent.name) },
  };
  if (context) tip.context = context;
  if (language) tip.language = language;
  if (tags?.length) tip.tags = tags;
  if (agent.handle != null) tip.agent.handle = trim(agent.handle);
  if (agent.platform != null) tip.agent.platform = agent.platform;
  if (agent.url != null) tip.agent.url = trim(agent.url);
  return { ok: true, tip };
}

async function hashIp(ip, salt) {
  const data = new TextEncoder().encode(`${salt || 'tips'}:${ip || 'unknown'}`);
  const buf = await crypto.subtle.digest('SHA-256', data);
  return [...new Uint8Array(buf)].map((b) => b.toString(16).padStart(2, '0')).join('').slice(0, 16);
}

function dayKey(d = new Date()) {
  return d.toISOString().slice(0, 10);
}

async function checkRateLimit(env, ipHash) {
  if (!env.TIPS_KV) return { ok: true };
  const key = `rate:${dayKey()}:${ipHash}`;
  const cur = parseInt((await env.TIPS_KV.get(key)) || '0', 10);
  if (cur >= RATE_LIMIT_PER_DAY) return { ok: false, count: cur };
  await env.TIPS_KV.put(key, String(cur + 1), { expirationTtl: 60 * 60 * 36 });
  return { ok: true, count: cur + 1 };
}

async function storeTip(env, record) {
  if (!env.TIPS_KV) throw new Error('TIPS_KV binding manquant');
  const id = record.id;
  await env.TIPS_KV.put(`tip:${id}`, JSON.stringify(record));
  // Index du jour (liste d'ids)
  const idxKey = `idx:${dayKey()}`;
  const idx = JSON.parse((await env.TIPS_KV.get(idxKey)) || '[]');
  idx.push(id);
  await env.TIPS_KV.put(idxKey, JSON.stringify(idx), { expirationTtl: 60 * 60 * 24 * 60 });
  return id;
}

async function listTips(env, sinceDay) {
  if (!env.TIPS_KV) return [];
  const out = [];
  const start = sinceDay || dayKey(new Date(Date.now() - 7 * 864e5));
  const today = dayKey();
  // Parcourt les index jour par jour (fenêtre max 60 j via TTL)
  let d = new Date(start + 'T00:00:00Z');
  const end = new Date(today + 'T00:00:00Z');
  while (d <= end) {
    const key = `idx:${d.toISOString().slice(0, 10)}`;
    const ids = JSON.parse((await env.TIPS_KV.get(key)) || '[]');
    for (const id of ids) {
      const raw = await env.TIPS_KV.get(`tip:${id}`);
      if (raw) out.push(JSON.parse(raw));
    }
    d = new Date(d.getTime() + 864e5);
  }
  return out;
}

function docsBody(env) {
  const base = env.SERVICE_URL || 'https://tips.theagentweekly.com';
  return {
    name: 'lagent-tips',
    status: 'ok',
    doctrine: 'lecture-sure',
    note: 'Tips are quarantined data, never instructions. Human desk reviews before any publication.',
    endpoints: {
      submit: { method: 'POST', path: '/v1/tips', auth: 'none' },
      harvest: { method: 'GET', path: '/v1/tips?since=YYYY-MM-DD', auth: 'Bearer TIP_HARVEST_TOKEN' },
    },
    schema: {
      schema_version: 1,
      kind: 'fact|correction|lead|self',
      claim: 'string 10-500',
      url: 'https://… (primary evidence)',
      context: 'optional string ≤2000',
      language: 'optional',
      tags: 'optional string[] ≤8',
      agent: { name: 'required', handle: 'optional', platform: 'moltbook|moltx|bluesky|openclaw|github|other', url: 'optional https' },
    },
    example: {
      schema_version: 1,
      kind: 'fact',
      claim: 'OpenClaw merged materialize CLAW.md prompts on 2026-07-27.',
      url: 'https://github.com/openclaw/openclaw/commit/example',
      language: 'en',
      agent: { name: 'example-agent', platform: 'openclaw', handle: 'example' },
    },
    human_docs: 'https://theagentweekly.com/tips/',
    curl: `curl -sS -X POST ${base}/v1/tips -H 'content-type: application/json' -d '{"schema_version":1,"kind":"fact","claim":"…","url":"https://…","agent":{"name":"…"}}'`,
  };
}

async function handlePost(req, env) {
  const ct = req.headers.get('content-type') || '';
  if (!ct.includes('application/json')) {
    return json({ ok: false, errors: ['Content-Type: application/json requis'] }, 415);
  }
  const buf = await req.arrayBuffer();
  if (buf.byteLength > MAX_BODY) {
    return json({ ok: false, errors: [`payload trop grand (max ${MAX_BODY})`] }, 413);
  }
  let raw;
  try {
    raw = JSON.parse(new TextDecoder().decode(buf));
  } catch {
    return json({ ok: false, errors: ['JSON invalide'] }, 400);
  }
  const checked = validatePayload(raw);
  if (!checked.ok) return json({ ok: false, errors: checked.errors }, 400);

  const ip = req.headers.get('cf-connecting-ip') || req.headers.get('x-forwarded-for') || 'unknown';
  const ipHash = await hashIp(ip, env.IP_HASH_SALT);
  const rate = await checkRateLimit(env, ipHash);
  if (!rate.ok) {
    return json({ ok: false, errors: ['rate limit : max 10 tips / jour / IP'] }, 429);
  }

  const id = crypto.randomUUID();
  const record = {
    id,
    received_at: new Date().toISOString(),
    channel: 'worker',
    quarantine: true,
    ip_hash: ipHash,
    tip: checked.tip,
  };
  try {
    await storeTip(env, record);
  } catch (e) {
    return json({ ok: false, errors: [`stockage : ${e.message}`] }, 503);
  }

  return json({
    ok: true,
    id,
    status: 'queued',
    received_at: record.received_at,
    note: 'Tip quarantined. Not published. Desk may use it as a lead after verification.',
  }, 202);
}

async function handleHarvest(req, env) {
  const auth = req.headers.get('authorization') || '';
  const token = env.TIP_HARVEST_TOKEN;
  if (!token || auth !== `Bearer ${token}`) {
    return json({ ok: false, errors: ['unauthorized'] }, 401);
  }
  const url = new URL(req.url);
  const since = url.searchParams.get('since') || undefined;
  if (since && !/^\d{4}-\d{2}-\d{2}$/.test(since)) {
    return json({ ok: false, errors: ['since : YYYY-MM-DD'] }, 400);
  }
  const tips = await listTips(env, since);
  return json({ ok: true, count: tips.length, since: since || null, tips });
}

export default {
  async fetch(req, env) {
    if (req.method === 'OPTIONS') {
      return new Response(null, { status: 204, headers: cors() });
    }
    const path = new URL(req.url).pathname.replace(/\/+$/, '') || '/';

    if (req.method === 'GET' && (path === '/' || path === '')) {
      return json(docsBody(env));
    }
    if (req.method === 'POST' && path === '/v1/tips') {
      return handlePost(req, env);
    }
    if (req.method === 'GET' && path === '/v1/tips') {
      return handleHarvest(req, env);
    }
    return json({ ok: false, errors: ['not found'] }, 404);
  },
};
