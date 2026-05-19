#!/usr/bin/env node
// scripts/bluesky-follow.mjs
// Suit les comptes listés dans data/bluesky-targets.json depuis @cuvee-42.
// Idempotent : ignore les handles déjà suivis ou les handles introuvables.
//
// Usage :
//   node scripts/bluesky-follow.mjs              # suit tous les follow_targets
//   node scripts/bluesky-follow.mjs --dry-run    # affiche seulement
//   node scripts/bluesky-follow.mjs --category=ai-research  # filtre par catégorie

import { readFile, writeFile } from 'node:fs/promises';
import { homedir } from 'node:os';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = dirname(__dirname);
const dryRun = process.argv.includes('--dry-run');
const catArg = process.argv.find(a => a.startsWith('--category='));
const filterCat = catArg ? catArg.slice(11) : null;

const targets = JSON.parse(await readFile(join(root, 'data', 'bluesky-targets.json'), 'utf8'));
let list = targets.follow_targets || [];
if (filterCat) list = list.filter(t => t.category === filterCat);

if (!list.length) {
  console.error(`Aucun follow_target dans data/bluesky-targets.json${filterCat ? ` (filtre catégorie=${filterCat})` : ''}.`);
  console.error(`Édite le fichier et ajoute des entrées { handle, category, note }.`);
  process.exit(1);
}
console.log(`${list.length} cible(s) à traiter`);

const credPath = join(homedir(), '.config', 'bluesky-cuvee', 'session.json');
const cred = JSON.parse(await readFile(credPath, 'utf8'));

async function reauth() {
  const r = await fetch('https://bsky.social/xrpc/com.atproto.server.createSession', {
    method: 'POST', headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ identifier: cred.handle, password: cred.password })
  });
  const s = await r.json(); cred.accessJwt = s.accessJwt; cred.refreshJwt = s.refreshJwt;
  await writeFile(credPath, JSON.stringify(cred, null, 2), { mode: 0o600 });
}
async function call(method, url, body) {
  const o = () => ({ method, headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + cred.accessJwt }, ...(body !== undefined && { body: JSON.stringify(body) }) });
  let r = await fetch(url, o());
  if (r.status === 401 || r.status === 400) { await reauth(); r = await fetch(url, o()); }
  return r;
}

async function resolveDid(handle) {
  const r = await fetch(`https://public.api.bsky.app/xrpc/com.atproto.identity.resolveHandle?handle=${encodeURIComponent(handle)}`);
  if (!r.ok) return null;
  const j = await r.json();
  return j.did;
}

async function alreadyFollows(did) {
  // Vérifie via getProfile.viewer.following
  const r = await call('GET', `https://bsky.social/xrpc/app.bsky.actor.getProfile?actor=${did}`);
  if (!r.ok) return false;
  const j = await r.json();
  return !!j.viewer?.following;
}

let followed = 0, skipped = 0, notFound = 0;
for (const t of list) {
  const handle = t.handle.replace(/^@/, '');
  process.stdout.write(`  ${handle.padEnd(40)} `);

  const did = await resolveDid(handle);
  if (!did) { console.log('❌ introuvable'); notFound++; continue; }

  const follows = await alreadyFollows(did);
  if (follows) { console.log('✓ déjà suivi'); skipped++; continue; }

  if (dryRun) { console.log('→ (dry-run, à suivre)'); continue; }

  const r = await call('POST', 'https://bsky.social/xrpc/com.atproto.repo.createRecord', {
    repo: cred.did,
    collection: 'app.bsky.graph.follow',
    record: { $type: 'app.bsky.graph.follow', subject: did, createdAt: new Date().toISOString() }
  });
  if (!r.ok) { console.log(`✗ erreur ${r.status}`); continue; }
  console.log('✓ suivi');
  followed++;
}

console.log(`\nBilan : ${followed} suivi(s) · ${skipped} déjà · ${notFound} introuvable(s)${dryRun ? ' (dry-run)' : ''}`);
