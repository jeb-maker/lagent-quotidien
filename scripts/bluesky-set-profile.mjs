#!/usr/bin/env node
// scripts/bluesky-set-profile.mjs
// Met à jour le displayName (et optionnellement la bio) du profil @cuvee-42.
// Lit/écrit le record app.bsky.actor.profile via getRecord→putRecord :
// préserve avatar, bannière et tout champ non touché (pas d'écrasement).
//
// Usage :
//   node scripts/bluesky-set-profile.mjs --name "Cuvée 42"            # change le nom
//   node scripts/bluesky-set-profile.mjs --name "X" --dry-run          # affiche, n'écrit pas
//   node scripts/bluesky-set-profile.mjs --name "X" --bio "nouvelle bio"

import { readFile, writeFile } from 'node:fs/promises';
import { homedir } from 'node:os';
import { join } from 'node:path';

const args = process.argv.slice(2);
const dryRun = args.includes('--dry-run');
const get = (flag) => { const i = args.indexOf(flag); return i >= 0 ? args[i + 1] : undefined; };
const newName = get('--name');
const newBio = get('--bio');

if (!newName && !newBio) {
  console.error('Rien à faire : passe --name "…" et/ou --bio "…".');
  process.exit(1);
}

const credPath = join(homedir(), '.config', 'bluesky-cuvee', 'session.json');
const cred = JSON.parse(await readFile(credPath, 'utf8'));

async function reauth() {
  const r = await fetch('https://bsky.social/xrpc/com.atproto.server.createSession', {
    method: 'POST', headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ identifier: cred.handle, password: cred.password }),
  });
  if (!r.ok) throw new Error('createSession ' + r.status);
  const s = await r.json();
  cred.accessJwt = s.accessJwt; cred.refreshJwt = s.refreshJwt;
  await writeFile(credPath, JSON.stringify(cred, null, 2), { mode: 0o600 });
}
async function call(method, path, body) {
  const o = () => ({ method, headers: { 'Content-Type': 'application/json', Authorization: 'Bearer ' + cred.accessJwt }, ...(body !== undefined && { body: JSON.stringify(body) }) });
  let r = await fetch(`https://bsky.social/xrpc/${path}`, o());
  if (r.status === 401 || r.status === 400) { await reauth(); r = await fetch(`https://bsky.social/xrpc/${path}`, o()); }
  return r;
}

// 1. Lire le record profil existant (pour préserver avatar/banner/etc.)
const params = new URLSearchParams({ repo: cred.did, collection: 'app.bsky.actor.profile', rkey: 'self' });
const getR = await call('GET', `com.atproto.repo.getRecord?${params}`);
let record = {};
if (getR.ok) {
  record = (await getR.json()).value || {};
} else if (getR.status === 400) {
  record = { $type: 'app.bsky.actor.profile' }; // pas encore de record : on le crée
} else {
  console.error('getRecord:', getR.status, await getR.text()); process.exit(1);
}

console.log('Avant :', JSON.stringify({ displayName: record.displayName, description: record.description, hasAvatar: !!record.avatar, hasBanner: !!record.banner }, null, 2));

// 2. Modifier uniquement ce qui est demandé
if (newName !== undefined) record.displayName = newName;
if (newBio !== undefined) record.description = newBio;
record.$type = 'app.bsky.actor.profile';

console.log('Après :', JSON.stringify({ displayName: record.displayName, description: record.description, hasAvatar: !!record.avatar, hasBanner: !!record.banner }, null, 2));

if (dryRun) { console.log('\n(--dry-run : aucune écriture)'); process.exit(0); }

// 3. Réécrire
const putR = await call('POST', 'com.atproto.repo.putRecord', {
  repo: cred.did,
  collection: 'app.bsky.actor.profile',
  rkey: 'self',
  record,
});
if (!putR.ok) { console.error('putRecord:', putR.status, await putR.text()); process.exit(1); }
console.log('\n✓ Profil mis à jour.');
