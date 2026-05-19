#!/usr/bin/env node
// scripts/bluesky-starter-pack.mjs
// Crée (ou met à jour) un starter pack Bluesky depuis data/bluesky-targets.json.
//
// Un starter pack AT Protocol = un record app.bsky.graph.starterpack qui
// référence une app.bsky.graph.list (purpose = referencelist) peuplée de
// app.bsky.graph.listitem.
//
// Usage :
//   node scripts/bluesky-starter-pack.mjs              # crée pack + liste
//   node scripts/bluesky-starter-pack.mjs --dry-run    # affiche seulement
//   node scripts/bluesky-starter-pack.mjs --update     # met à jour la liste existante

import { readFile, writeFile } from 'node:fs/promises';
import { homedir } from 'node:os';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = dirname(__dirname);
const dryRun = process.argv.includes('--dry-run');
const update = process.argv.includes('--update');

const targets = JSON.parse(await readFile(join(root, 'data', 'bluesky-targets.json'), 'utf8'));
const pack = targets.starter_pack || {};
const list = targets.follow_targets || [];

if (!pack.name) { console.error('starter_pack.name manquant dans data/bluesky-targets.json'); process.exit(1); }
if (!list.length) { console.error('follow_targets vide — ajoute des handles avant de créer le pack'); process.exit(1); }

console.log(`Pack "${pack.name}" — ${list.length} membres potentiels`);
console.log(`Description : ${pack.description || '(aucune)'}`);

if (dryRun) { console.log('(--dry-run, pas de publication)'); process.exit(0); }

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
  const r = await fetch(`https://public.api.bsky.app/xrpc/com.atproto.identity.resolveHandle?handle=${encodeURIComponent(handle.replace(/^@/, ''))}`);
  if (!r.ok) return null;
  return (await r.json()).did;
}

// ───── Résoudre tous les DIDs ─────
const dids = [];
for (const t of list) {
  const did = await resolveDid(t.handle);
  if (did) { dids.push({ handle: t.handle, did }); process.stdout.write(`  ✓ ${t.handle}\n`); }
  else { process.stdout.write(`  ✗ ${t.handle} introuvable, ignoré\n`); }
}
if (!dids.length) { console.error('Aucun membre résolu. Abandon.'); process.exit(1); }

// ───── 1. Créer la liste (referencelist) ─────
const createdAt = new Date().toISOString();
const listR = await call('POST', 'https://bsky.social/xrpc/com.atproto.repo.createRecord', {
  repo: cred.did,
  collection: 'app.bsky.graph.list',
  record: {
    $type: 'app.bsky.graph.list',
    purpose: 'app.bsky.graph.defs#referencelist',
    name: pack.name,
    description: pack.description || '',
    createdAt
  }
});
if (!listR.ok) { console.error('createList:', listR.status, await listR.text()); process.exit(1); }
const { uri: listUri } = await listR.json();
console.log(`✓ Liste créée : ${listUri}`);

// ───── 2. Ajouter chaque membre comme listitem ─────
for (const { handle, did } of dids) {
  const r = await call('POST', 'https://bsky.social/xrpc/com.atproto.repo.createRecord', {
    repo: cred.did,
    collection: 'app.bsky.graph.listitem',
    record: { $type: 'app.bsky.graph.listitem', subject: did, list: listUri, createdAt }
  });
  if (!r.ok) console.warn(`  ⚠ ${handle} : ${r.status}`);
}
console.log(`✓ ${dids.length} membres ajoutés à la liste`);

// ───── 3. Créer le starter pack qui pointe vers la liste ─────
const spR = await call('POST', 'https://bsky.social/xrpc/com.atproto.repo.createRecord', {
  repo: cred.did,
  collection: 'app.bsky.graph.starterpack',
  record: {
    $type: 'app.bsky.graph.starterpack',
    name: pack.name,
    description: pack.description || '',
    list: listUri,
    createdAt
  }
});
if (!spR.ok) { console.error('createStarterPack:', spR.status, await spR.text()); process.exit(1); }
const { uri: spUri } = await spR.json();
const spId = spUri.split('/').pop();
console.log(`✓ Starter pack créé : https://bsky.app/starter-pack/${cred.handle}/${spId}`);
