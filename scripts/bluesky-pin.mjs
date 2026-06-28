#!/usr/bin/env node
// scripts/bluesky-pin.mjs
// Crée (si absent) un post manifeste bilingue avec image og.png et l'épingle
// au profil cuvee-42 sur Bluesky.
//
// Idempotent : si profile.pinnedPost existe déjà, ne fait rien.
//
// Usage :
//   node scripts/bluesky-pin.mjs            # crée + épingle si absent
//   node scripts/bluesky-pin.mjs --force    # remplace le post épinglé
//   node scripts/bluesky-pin.mjs --dry-run  # affiche le post sans publier

import { readFile, writeFile } from 'node:fs/promises';
import { homedir } from 'node:os';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = dirname(__dirname);
const SITE = 'https://theagentweekly.com';
const dryRun = process.argv.includes('--dry-run');
const force = process.argv.includes('--force');

const manifesto =
  `Bilingual weekly journalism on the real agentic internet. Sourced facts, cited sources. New issue every Tuesday.\n\n` +
  `Hebdo bilingue de journalisme sur l'internet agentique réel. Faits sourcés. Nouvelle édition chaque mardi.\n\n` +
  `theagentweekly.com\n` +
  `Feed → bsky.app/profile/cuvee-42.theagentweekly.com/feed/agentic-watch`;

const utf8len = s => new TextEncoder().encode(s).length;
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
  return facets;
}

console.log(`Manifeste (${manifesto.length} car.) :`);
console.log('───');
console.log(manifesto);
console.log('───');
if (manifesto.length > 300) { console.error(`⚠ Trop long.`); process.exit(1); }

if (dryRun) { console.log('(--dry-run)'); process.exit(0); }

// ───── Credentials ─────
const credPath = join(homedir(), '.config', 'bluesky-cuvee', 'session.json');
const cred = JSON.parse(await readFile(credPath, 'utf8'));

async function reauth() {
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
}

async function call(method, url, body, contentType = 'application/json') {
  const opts = () => ({
    method,
    headers: { 'Content-Type': contentType, 'Authorization': `Bearer ${cred.accessJwt}` },
    ...(body !== undefined && { body: contentType === 'application/json' ? JSON.stringify(body) : body })
  });
  let r = await fetch(url, opts());
  if (r.status === 401 || r.status === 400) { await reauth(); r = await fetch(url, opts()); }
  return r;
}

// ───── Lecture profil existant ─────
const profileUrl = `https://bsky.social/xrpc/com.atproto.repo.getRecord?repo=${cred.did}&collection=app.bsky.actor.profile&rkey=self`;
const profR = await fetch(profileUrl);
if (!profR.ok) { console.error(`getRecord profil échec : ${profR.status}`); process.exit(1); }
const profRec = await profR.json();
const existingPin = profRec.value?.pinnedPost;

if (existingPin && !force) {
  console.log(`✓ Pin déjà présent : ${existingPin.uri}`);
  console.log(`  (utilise --force pour remplacer)`);
  process.exit(0);
}

// ───── Upload image (vignette dédiée Bluesky, EN-only) ─────
const png = await readFile(join(root, 'public', 'bsky-thumb.png'));
const blobR = await call('POST', 'https://bsky.social/xrpc/com.atproto.repo.uploadBlob', png, 'image/png');
if (!blobR.ok) { console.error(`uploadBlob échec : ${blobR.status}\n${await blobR.text()}`); process.exit(1); }
const { blob } = await blobR.json();

// ───── Création du post ─────
const record = {
  $type: 'app.bsky.feed.post',
  text: manifesto,
  createdAt: new Date().toISOString(),
  langs: ['en', 'fr'],
  facets: buildFacets(manifesto),
  embed: {
    $type: 'app.bsky.embed.images',
    images: [{
      image: blob,
      alt: "The Agent & The Weekly — bilingual journalism on the real agentic internet.",
      aspectRatio: { width: 1200, height: 630 }
    }]
  }
};
const postR = await call('POST', 'https://bsky.social/xrpc/com.atproto.repo.createRecord', {
  repo: cred.did,
  collection: 'app.bsky.feed.post',
  record
});
if (!postR.ok) { console.error(`createRecord échec : ${postR.status}\n${await postR.text()}`); process.exit(1); }
const { uri, cid } = await postR.json();
console.log(`✓ Post créé : ${uri}`);

// ───── Épinglage : putRecord sur le profil ─────
const newProfile = { ...(profRec.value || { $type: 'app.bsky.actor.profile' }), pinnedPost: { uri, cid } };
const pinR = await call('POST', 'https://bsky.social/xrpc/com.atproto.repo.putRecord', {
  repo: cred.did,
  collection: 'app.bsky.actor.profile',
  rkey: 'self',
  record: newProfile,
  ...(profRec.cid && { swapRecord: profRec.cid })
});
if (!pinR.ok) { console.error(`putRecord profil échec : ${pinR.status}\n${await pinR.text()}`); process.exit(1); }

const postId = uri.split('/').pop();
console.log(`✓ Épinglé : https://bsky.app/profile/${cred.handle}/post/${postId}`);

// ───── Suppression de l'ancien pin si --force ─────
if (existingPin && force) {
  const oldRkey = existingPin.uri.split('/').pop();
  const delR = await call('POST', 'https://bsky.social/xrpc/com.atproto.repo.deleteRecord', {
    repo: cred.did,
    collection: 'app.bsky.feed.post',
    rkey: oldRkey
  });
  if (delR.ok) console.log(`✓ Ancien pin supprimé : ${existingPin.uri}`);
  else console.warn(`⚠ Suppression ancien pin échec : ${delR.status}`);
}
