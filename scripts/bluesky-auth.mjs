#!/usr/bin/env node
// scripts/bluesky-auth.mjs
// One-shot : prend un handle Bluesky + un app password, crée une session,
// stocke les credentials dans ~/.config/bluesky-cuvee/session.json (0600).
//
// Usage : node scripts/bluesky-auth.mjs <handle> <app-password>
// Ex.   : node scripts/bluesky-auth.mjs cuvee-42.theagentweekly.com xxxx-xxxx-xxxx-xxxx

import { mkdir, writeFile } from 'node:fs/promises';
import { homedir } from 'node:os';
import { join } from 'node:path';

const handle = process.argv[2];
const password = process.argv[3];

if (!handle || !password) {
  console.error('Usage : node scripts/bluesky-auth.mjs <handle> <app-password>');
  console.error('App password : générer dans Bluesky → Settings → Privacy and Security → App Passwords');
  process.exit(1);
}

const r = await fetch('https://bsky.social/xrpc/com.atproto.server.createSession', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ identifier: handle, password })
});

if (!r.ok) {
  console.error(`Auth échouée : ${r.status}\n${await r.text()}`);
  process.exit(1);
}

const session = await r.json();
const configDir = join(homedir(), '.config', 'bluesky-cuvee');
await mkdir(configDir, { recursive: true, mode: 0o700 });
await writeFile(
  join(configDir, 'session.json'),
  JSON.stringify({
    handle,
    password,
    did: session.did,
    accessJwt: session.accessJwt,
    refreshJwt: session.refreshJwt
  }, null, 2),
  { mode: 0o600 }
);

console.log(`✓ Authentification OK`);
console.log(`  Handle  : ${session.handle}`);
console.log(`  DID     : ${session.did}`);
console.log(`  Stocké  : ${configDir}/session.json (0600)`);
console.log(`\nTu peux maintenant lancer :`);
console.log(`  node scripts/bluesky-post.mjs "Hello world from cuvee_42 🦞"`);
