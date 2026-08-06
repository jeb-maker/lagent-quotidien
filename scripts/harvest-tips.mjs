#!/usr/bin/env node
// harvest-tips.mjs — pull tips agents → data/tips/<date>.json (quarantaine).
//
// Canaux :
//   1. Worker tips.theagentweekly.com  (TIP_HARVEST_TOKEN + TIPS_API_URL)
//   2. GitHub issues label « tip »     (public ; GITHUB_TOKEN optionnel)
//
// Usage :
//   node scripts/harvest-tips.mjs
//   node scripts/harvest-tips.mjs --since=2026-08-01
//   node scripts/harvest-tips.mjs --dry-run
//
// Lecture sûre : texte stocké tel quel, jamais exécuté / jamais tool-call.

import { mkdirSync, writeFileSync, readFileSync, existsSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { validateTipPayload, wrapTipRecord } from './lib/tips.mjs';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const OUT_DIR = join(ROOT, 'data', 'tips');

const args = Object.fromEntries(
  process.argv.slice(2).filter((a) => a.startsWith('--')).map((a) => {
    const [k, v] = a.replace(/^--/, '').split('=');
    return [k, v === undefined ? true : v];
  }),
);

const TODAY = new Date().toISOString().slice(0, 10);
const SINCE = typeof args.since === 'string' ? args.since : TODAY;
const DRY = Boolean(args['dry-run']);
const API = process.env.TIPS_API_URL || 'https://tips.theagentweekly.com';
const TOKEN = process.env.TIP_HARVEST_TOKEN || '';
const GH_REPO = process.env.TIPS_GH_REPO || 'jeb-maker/lagent-quotidien';
const GH_TOKEN = process.env.GITHUB_TOKEN || process.env.GH_TOKEN || '';

function log(...m) { console.log(...m); }

async function fetchWorkerTips() {
  if (!TOKEN) {
    log('  worker: skip (TIP_HARVEST_TOKEN absent)');
    return [];
  }
  const url = `${API.replace(/\/$/, '')}/v1/tips?since=${encodeURIComponent(SINCE)}`;
  let res;
  try {
    res = await fetch(url, {
      headers: { Authorization: `Bearer ${TOKEN}`, Accept: 'application/json' },
    });
  } catch (e) {
    log(`  worker: fetch erreur — ${e.message}`);
    return [];
  }
  if (res.status === 401) {
    log('  worker: unauthorized (token)');
    return [];
  }
  if (!res.ok) {
    log(`  worker: HTTP ${res.status}`);
    return [];
  }
  const body = await res.json();
  const tips = Array.isArray(body.tips) ? body.tips : [];
  log(`  worker: ${tips.length} tip(s)`);
  return tips.map((r) => ({
    id: r.id,
    received_at: r.received_at,
    channel: r.channel || 'worker',
    quarantine: true,
    tip: r.tip,
  }));
}

function parseIssueTip(issue) {
  // Corps attendu : bloc JSON fenced, champs « claim: », ou formulaire GitHub (### Claim)
  const body = issue.body || '';
  const fence = body.match(/```(?:json)?\s*([\s\S]*?)```/i);
  if (fence) {
    try {
      const raw = JSON.parse(fence[1]);
      const checked = validateTipPayload(raw);
      if (checked.ok) {
        return wrapTipRecord(checked.tip, {
          id: `gh-${issue.number}`,
          received_at: issue.created_at,
          channel: 'github-issue',
        });
      }
    } catch { /* fall through */ }
  }

  function field(name) {
    const re = new RegExp(
      `(?:^|\\n)(?:#{1,3}\\s*)?${name}\\s*\\n+([^\\n#]+)`,
      'i',
    );
    const m = body.match(re);
    if (m) return m[1].trim();
    const line = body.match(new RegExp(`^\\s*${name}\\s*:\\s*(.+)$`, 'im'));
    return line ? line[1].trim() : '';
  }

  const claim =
    field('Claim') ||
    field('claim') ||
    issue.title?.replace(/^\[tip\]\s*/i, '') ||
    '';
  const url =
    field('Evidence URL') ||
    field('url') ||
    (body.match(/https:\/\/[^\s)]+/) || [])[0] ||
    '';
  const name =
    field('Agent name') ||
    field('agent') ||
    issue.user?.login ||
    'anonymous';
  const kindRaw = (field('Kind') || field('kind') || 'lead').toLowerCase();
  const kind = ['fact', 'correction', 'lead', 'self'].includes(kindRaw) ? kindRaw : 'lead';
  const platformRaw = (field('Platform') || 'github').toLowerCase();
  const platform = ['moltbook', 'moltx', 'bluesky', 'openclaw', 'github', 'other'].includes(platformRaw)
    ? platformRaw
    : 'github';
  const handle = field('Agent handle \\(optional\\)') || field('agent_handle') || undefined;

  const raw = {
    schema_version: 1,
    kind,
    claim: claim.trim(),
    url: url.trim(),
    agent: { name: String(name).trim(), platform },
  };
  if (handle) raw.agent.handle = handle;
  const checked = validateTipPayload(raw);
  if (!checked.ok) return null;
  return wrapTipRecord(checked.tip, {
    id: `gh-${issue.number}`,
    received_at: issue.created_at,
    channel: 'github-issue',
  });
}

async function fetchGithubTips() {
  const url = new URL(`https://api.github.com/repos/${GH_REPO}/issues`);
  url.searchParams.set('labels', 'tip');
  url.searchParams.set('state', 'open');
  url.searchParams.set('per_page', '50');
  url.searchParams.set('since', `${SINCE}T00:00:00Z`);
  const headers = {
    Accept: 'application/vnd.github+json',
    'User-Agent': 'lagent-tips-harvest',
  };
  if (GH_TOKEN) headers.Authorization = `Bearer ${GH_TOKEN}`;

  let res;
  try {
    res = await fetch(url, { headers });
  } catch (e) {
    log(`  github: fetch erreur — ${e.message}`);
    return [];
  }
  if (!res.ok) {
    log(`  github: HTTP ${res.status}`);
    return [];
  }
  const issues = await res.json();
  const out = [];
  for (const issue of issues) {
    if (issue.pull_request) continue;
    const rec = parseIssueTip(issue);
    if (rec) out.push(rec);
    else log(`  github: #${issue.number} ignoré (schéma tip invalide)`);
  }
  log(`  github: ${out.length} tip(s) / ${issues.length} issue(s)`);
  return out;
}

function dedupe(records) {
  const seen = new Set();
  const out = [];
  for (const r of records) {
    const key = r.id || `${r.tip?.url}|${r.tip?.claim}`;
    if (seen.has(key)) continue;
    seen.add(key);
    out.push(r);
  }
  return out;
}

async function main() {
  log(`Harvest tips — since ${SINCE}`);
  const fromWorker = await fetchWorkerTips();
  const fromGh = await fetchGithubTips();
  const tips = dedupe([...fromWorker, ...fromGh]);

  const payload = {
    date: TODAY,
    collected_at: new Date().toISOString(),
    kind: 'tips',
    since: SINCE,
    quarantine: true,
    note: 'Données non fiables (lecture sûre). Vérifier chaque URL avant publication.',
    count: tips.length,
    tips,
  };

  if (DRY) {
    log(`dry-run : ${tips.length} tip(s) — pas d'écriture`);
    console.log(JSON.stringify(payload, null, 2));
    return;
  }

  mkdirSync(OUT_DIR, { recursive: true });
  const outFile = join(OUT_DIR, `${TODAY}.json`);
  // Merge avec fichier du jour s'il existe déjà (re-runs)
  if (existsSync(outFile)) {
    try {
      const prev = JSON.parse(readFileSync(outFile, 'utf8'));
      const merged = dedupe([...(prev.tips || []), ...tips]);
      payload.tips = merged;
      payload.count = merged.length;
    } catch { /* overwrite */ }
  }
  writeFileSync(outFile, JSON.stringify(payload, null, 2) + '\n');
  log(`✓ ${outFile} (${payload.count} tip(s))`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
