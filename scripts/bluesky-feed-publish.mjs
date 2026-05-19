#!/usr/bin/env node
// scripts/bluesky-feed-publish.mjs
// Publie (ou met à jour) le record app.bsky.feed.generator qui annonce le
// custom feed "Agentic Internet Watch" sur @cuvee-42.
//
// Le Worker doit déjà être déployé sur feed.theagentweekly.com (cf.
// workers/feed-generator/DEPLOY.md). Ce script ne fait que dire à Bluesky :
// « cet utilisateur publie ce feed à cette URL de service ».
//
// Usage :
//   node scripts/bluesky-feed-publish.mjs            # crée
//   node scripts/bluesky-feed-publish.mjs --update   # rePUT le record existant
//   node scripts/bluesky-feed-publish.mjs --dry-run

import { readFile, writeFile } from 'node:fs/promises';
import { homedir } from 'node:os';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = dirname(__dirname);
const dryRun = process.argv.includes('--dry-run');

const FEED_RKEY = 'agentic-watch';
const FEED_DID = 'did:web:feed.theagentweekly.com';
const FEED_NAME = 'Agentic Internet Watch';
const FEED_DESC = 'Posts about agentic AI, AI agents and the speculative shape of the agentic internet — curated by @cuvee-42 (L\'Agent & Le Quotidien / The Agent & The Weekly).';

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
async function call(method, url, body, ct = 'application/json') {
  const o = () => ({ method, headers: { 'Content-Type': ct, 'Authorization': 'Bearer ' + cred.accessJwt }, ...(body !== undefined && { body: ct === 'application/json' ? JSON.stringify(body) : body }) });
  let r = await fetch(url, o());
  if (r.status === 401 || r.status === 400) { await reauth(); r = await fetch(url, o()); }
  return r;
}

console.log(`Feed : ${FEED_NAME} (${FEED_RKEY})`);
console.log(`Service DID : ${FEED_DID}`);
console.log(`Description : ${FEED_DESC}`);

if (dryRun) { console.log('(--dry-run)'); process.exit(0); }

// Optionnel : upload la vignette (og.png)
let avatar = null;
try {
  const png = await readFile(join(root, 'og.png'));
  const r = await call('POST', 'https://bsky.social/xrpc/com.atproto.repo.uploadBlob', png, 'image/png');
  if (r.ok) avatar = (await r.json()).blob;
} catch { /* skip */ }

const record = {
  $type: 'app.bsky.feed.generator',
  did: FEED_DID,
  displayName: FEED_NAME,
  description: FEED_DESC,
  createdAt: new Date().toISOString(),
  ...(avatar && { avatar })
};

// putRecord pour être idempotent : crée si absent, écrase si présent.
const r = await call('POST', 'https://bsky.social/xrpc/com.atproto.repo.putRecord', {
  repo: cred.did,
  collection: 'app.bsky.feed.generator',
  rkey: FEED_RKEY,
  record
});
if (!r.ok) { console.error('putRecord:', r.status, await r.text()); process.exit(1); }

console.log(`✓ Feed publié : https://bsky.app/profile/${cred.handle}/feed/${FEED_RKEY}`);
