#!/usr/bin/env node
// scripts/bluesky-post.mjs
// Publie un post sur le compte Bluesky de cuvee_42. Auto-refresh du JWT,
// re-auth depuis le mot de passe si tout échoue.
//
// Usage : node scripts/bluesky-post.mjs "texte du post"
// Stdin : si pas d'argument, lit le post depuis stdin

import { readFile, writeFile } from 'node:fs/promises';
import { homedir } from 'node:os';
import { join } from 'node:path';

const credPath = join(homedir(), '.config', 'bluesky-cuvee', 'session.json');

let text;
if (process.argv[2]) {
  text = process.argv.slice(2).join(' ');
} else if (!process.stdin.isTTY) {
  const chunks = [];
  for await (const chunk of process.stdin) chunks.push(chunk);
  text = Buffer.concat(chunks).toString('utf8').trim();
}

if (!text) {
  console.error('Usage : node scripts/bluesky-post.mjs "texte"');
  console.error('     ou : echo "texte" | node scripts/bluesky-post.mjs');
  process.exit(1);
}

if (text.length > 300) {
  console.error(`Post trop long (${text.length} caractères, max 300)`);
  process.exit(1);
}

let cred;
try {
  cred = JSON.parse(await readFile(credPath, 'utf8'));
} catch {
  console.error(`Pas de credentials trouvés à ${credPath}`);
  console.error(`Lance d'abord : node scripts/bluesky-auth.mjs <handle> <app-password>`);
  process.exit(1);
}

const post = async (jwt) =>
  fetch('https://bsky.social/xrpc/com.atproto.repo.createRecord', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${jwt}`
    },
    body: JSON.stringify({
      repo: cred.did,
      collection: 'app.bsky.feed.post',
      record: {
        $type: 'app.bsky.feed.post',
        text,
        createdAt: new Date().toISOString(),
        langs: text.match(/\b(the|and|of|to|a|in|is|for|with|on)\b/i) ? ['en'] : ['fr']
      }
    })
  });

const refresh = async () => {
  const r = await fetch('https://bsky.social/xrpc/com.atproto.server.refreshSession', {
    method: 'POST',
    headers: { 'Authorization': `Bearer ${cred.refreshJwt}` }
  });
  if (!r.ok) return null;
  return r.json();
};

const reauth = async () => {
  const r = await fetch('https://bsky.social/xrpc/com.atproto.server.createSession', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ identifier: cred.handle, password: cred.password })
  });
  if (!r.ok) {
    console.error(`Re-auth échouée : ${r.status} ${await r.text()}`);
    process.exit(1);
  }
  return r.json();
};

// Tentative 1 : avec le accessJwt actuel
let r = await post(cred.accessJwt);

// Si 401/400, on refresh puis on retente
if (r.status === 401 || r.status === 400) {
  let s = await refresh();
  if (!s) s = await reauth();
  cred.accessJwt = s.accessJwt;
  cred.refreshJwt = s.refreshJwt;
  await writeFile(credPath, JSON.stringify(cred, null, 2), { mode: 0o600 });
  r = await post(cred.accessJwt);
}

if (!r.ok) {
  console.error(`Post échoué : ${r.status}\n${await r.text()}`);
  process.exit(1);
}

const data = await r.json();
const postUri = data.uri.replace('at://', '').split('/');
const postId = postUri[postUri.length - 1];
const webUrl = `https://bsky.app/profile/${cred.handle}/post/${postId}`;
console.log(`✓ Post publié`);
console.log(`  ${webUrl}`);
