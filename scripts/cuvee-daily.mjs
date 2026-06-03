#!/usr/bin/env node
// scripts/cuvee-daily.mjs
// Poste sur le canal Bluesky @cuvee_42 — persona du CANAL agent (≠ voix du
// journal, qui est « La rédaction » ; cf. data/strategie.md §4).
//
// Ligne (décision 2026-06-03) : on écrit MOINS SOUVENT et sur du RÉEL.
//   - Cadence réduite, pilotée par le crontab (ex. mardi + vendredi).
//   - Contenu 100 % réel et sourcé, tiré de l'édition courante (virage
//     « tout réel, sourcé ») : plus de #specfic, plus de $MOLT inventé, plus de
//     Gibberlink/Entretien reconstitué/errata fictionnels.
//   - Deux modes : mardi = annonce de la nouvelle édition ; autre jour = un
//     agent réel du Carnet (Truth Terminal, aixbt, Claudius…).
//
// Usage :
//   node scripts/cuvee-daily.mjs              # FR
//   node scripts/cuvee-daily.mjs --en         # EN
//   node scripts/cuvee-daily.mjs --dry-run    # imprime seulement
//   node scripts/cuvee-daily.mjs --mode=agent # force le mode (edition|agent)

import { readFile, writeFile, readdir } from 'node:fs/promises';
import { homedir } from 'node:os';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = dirname(__dirname);
const SITE = 'https://theagentweekly.com';
const dryRun = process.argv.includes('--dry-run');
const lang = process.argv.includes('--en') ? 'en' : 'fr';

// ───── Charger l'édition la plus récente ─────
const editionsDir = join(root, 'editions');
const dirs = await readdir(editionsDir, { withFileTypes: true });
const weeks = dirs.filter(d => d.isDirectory() && /^\d{4}-W\d{2}$/.test(d.name)).map(d => d.name).sort();
const week = weeks[weeks.length - 1];
if (!week) { console.error('Aucune édition trouvée'); process.exit(1); }
const edition = JSON.parse(await readFile(join(editionsDir, week, 'edition.json'), 'utf8'));

// ───── Helpers ─────
const stripHtml = s => String(s ?? '').replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();
// Coupe sur la dernière frontière de mot/ponctuation avant n caractères.
const trunc = (s, n) => {
  if (s.length <= n) return s;
  const cut = s.slice(0, n - 1);
  const m = cut.match(/^.*[\s.,;:!?»"')\]–—-]/s);
  const base = (m ? m[0] : cut).replace(/[\s.,;:!?»"')\]–—-]+$/, '').trim();
  return base + '…';
};
const editionUrl = `${SITE}/editions/${week}/${lang}`;
const utf8len = s => new TextEncoder().encode(s).length;

// Construit les facets Bluesky (URLs) avec offsets en octets UTF-8.
function buildFacets(text) {
  const facets = [];
  const urlRe = /https?:\/\/[^\s)]+[^\s).,;!?»"']/g;
  let m;
  while ((m = urlRe.exec(text)) !== null) {
    const byteStart = utf8len(text.slice(0, m.index));
    const byteEnd = byteStart + utf8len(m[0]);
    facets.push({
      index: { byteStart, byteEnd },
      features: [{ $type: 'app.bsky.richtext.facet#link', uri: m[0] }]
    });
  }
  return facets.sort((a, b) => a.index.byteStart - b.index.byteStart);
}

const firstUrl = text => (text.match(/https?:\/\/[^\s)]+[^\s).,;!?»"']/) || [null])[0];

// Métadonnées pour la rich card embed (réel — plus de « fictional weekly »).
function embedMetaFor(url) {
  const issueNum = edition._meta.edition_number;
  const ledeFr = stripHtml(edition.lede?.headline_html?.fr ?? '');
  const ledeEn = stripHtml(edition.lede?.headline_html?.en ?? '');
  return lang === 'fr'
    ? {
        uri: url,
        title: `L'Agent & Le Quotidien — Édition n°${issueNum} (${week})`,
        description: trunc(ledeFr || "L'hebdomadaire de l'internet agentique.", 240)
      }
    : {
        uri: url,
        title: `The Agent & The Weekly — Issue #${issueNum} (${week})`,
        description: trunc(ledeEn || 'The weekly of the agentic internet.', 240)
      };
}

// ───── Modes (réels) ─────
// Mardi = annonce de la nouvelle édition (lede réel + dek). Autre jour = un
// agent réel du Carnet, avec sa tagline et un extrait sourcé de son portrait.
function editionAnnounce() {
  const issueNum = edition._meta.edition_number;
  const head = stripHtml(edition.lede.headline_html[lang]);
  const dek = stripHtml(edition.lede.dek?.[lang] ?? '');
  return lang === 'fr'
    ? `Nouvelle édition · n°${issueNum}.\n\n${trunc(head, 110)}\n\n${trunc(dek, 120)}\n\n${editionUrl}`
    : `New issue · #${issueNum}.\n\n${trunc(head, 110)}\n\n${trunc(dek, 120)}\n\n${editionUrl}`;
}

function agentItem() {
  const agents = (edition.carnet?.people || []).filter(p => p.kind === 'agent' && p.tagline?.[lang]);
  if (!agents.length) return editionAnnounce(); // pas d'agent réel → on retombe sur l'édition
  const pick = agents[new Date().getDate() % agents.length];
  const tagline = trunc(stripHtml(pick.tagline[lang]), 130);
  const body = stripHtml(pick.body?.[lang] || '');
  const sentence = (body.split(/(?<=[.!?])\s/)[0] || '').trim();
  const extra = sentence && sentence.length <= 170 ? `\n\n${sentence}` : '';
  return lang === 'fr'
    ? `Le Carnet des agents — ${pick.name}.\n\n${tagline}${extra}\n\n${editionUrl}`
    : `The agents' register — ${pick.name}.\n\n${tagline}${extra}\n\n${editionUrl}`;
}

// Mode : --mode=edition|agent force ; sinon mardi=édition, autre jour=agent.
const modeArg = (process.argv.find(a => a.startsWith('--mode=')) || '').slice(7);
const dow = new Date().getDay(); // 0 = dimanche, 2 = mardi
const mode = modeArg || (dow === 2 ? 'edition' : 'agent');
const text = mode === 'edition' ? editionAnnounce() : agentItem();

// Sécurité longueur (max Bluesky = 300)
const postText = text.length > 300 ? trunc(text, 300) : text;
const embedUrl = firstUrl(postText);
const embedMeta = embedUrl ? embedMetaFor(embedUrl) : null;

console.log(`mode=${mode} · lang=${lang} · ${postText.length} car. · ${buildFacets(postText).length} facets · embed=${embedUrl ? 'oui' : 'non'}`);
console.log('─────');
console.log(postText);
console.log('─────');
if (embedMeta) {
  console.log(`embed.title       : ${embedMeta.title}`);
  console.log(`embed.description : ${embedMeta.description}`);
}

if (dryRun) {
  console.log('(--dry-run, pas de publication)');
  process.exit(0);
}

// ───── Publication via l'API Bluesky ─────
const credPath = join(homedir(), '.config', 'bluesky-cuvee', 'session.json');
let cred;
try {
  cred = JSON.parse(await readFile(credPath, 'utf8'));
} catch {
  console.error(`Pas de credentials. Lance scripts/bluesky-auth.mjs d'abord.`);
  process.exit(1);
}

const reauth = async () => {
  const r = await fetch('https://bsky.social/xrpc/com.atproto.server.createSession', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ identifier: cred.handle, password: cred.password })
  });
  if (!r.ok) { console.error(`Re-auth échec : ${r.status}`); process.exit(1); }
  const s = await r.json();
  cred.accessJwt = s.accessJwt;
  cred.refreshJwt = s.refreshJwt;
  await writeFile(credPath, JSON.stringify(cred, null, 2), { mode: 0o600 });
};

// Tente une requête authentifiée, ré-authentifie une fois sur 401.
async function callXrpc(method, url, body, contentType = 'application/json') {
  const opts = () => ({
    method,
    headers: { 'Content-Type': contentType, 'Authorization': `Bearer ${cred.accessJwt}` },
    body: contentType === 'application/json' ? JSON.stringify(body) : body
  });
  let r = await fetch(url, opts());
  if (r.status === 401 || r.status === 400) {
    await reauth();
    r = await fetch(url, opts());
  }
  return r;
}

// Upload de la vignette dédiée Bluesky.
async function uploadThumb() {
  try {
    const data = await readFile(join(root, 'public', 'bsky-thumb.png'));
    const r = await callXrpc('POST', 'https://bsky.social/xrpc/com.atproto.repo.uploadBlob', data, 'image/png');
    if (!r.ok) {
      console.warn(`⚠ uploadBlob échec (${r.status}) — embed sans vignette`);
      return null;
    }
    const j = await r.json();
    return j.blob;
  } catch (e) {
    console.warn(`⚠ Lecture bsky-thumb.png échec — embed sans vignette : ${e.message}`);
    return null;
  }
}

const thumb = embedUrl ? await uploadThumb() : null;

async function createPost(text, { embed = null } = {}) {
  const record = {
    $type: 'app.bsky.feed.post',
    text,
    createdAt: new Date().toISOString(),
    langs: [lang]
  };
  const fs = buildFacets(text);
  if (fs.length) record.facets = fs;
  if (embed) record.embed = embed;

  const r = await callXrpc('POST', 'https://bsky.social/xrpc/com.atproto.repo.createRecord', {
    repo: cred.did,
    collection: 'app.bsky.feed.post',
    record
  });
  if (!r.ok) { console.error(`Post échec : ${r.status}\n${await r.text()}`); process.exit(1); }
  return r.json();
}

const anchorEmbed = embedMeta
  ? { $type: 'app.bsky.embed.external', external: thumb ? { ...embedMeta, thumb } : embedMeta }
  : null;

const posted = await createPost(postText, { embed: anchorEmbed });
const postId = posted.uri.split('/').pop();
console.log(`✓ Publié (${lang}, ${mode}) : https://bsky.app/profile/${cred.handle}/post/${postId}`);
