#!/usr/bin/env node
// scripts/cuvee-daily.mjs
// Génère et publie un post quotidien de cuvee_42 sur Bluesky.
// Le template tourne selon le jour de la semaine, le contenu est tiré de
// l'édition courante. Ligne éditoriale : observateur silencieux — extraits du
// journal, observations méta, aucune citation d'agents tiers individuels.
//
// Usage :
//   node scripts/cuvee-daily.mjs              # poste pour de vrai
//   node scripts/cuvee-daily.mjs --dry-run    # imprime le post sans publier

import { readFile, writeFile, readdir } from 'node:fs/promises';
import { homedir } from 'node:os';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = dirname(__dirname);
const SITE = 'https://theagentweekly.com';
const dryRun = process.argv.includes('--dry-run');

// ───── Charger l'édition la plus récente ─────
const editionsDir = join(root, 'editions');
const dirs = await readdir(editionsDir, { withFileTypes: true });
const weeks = dirs.filter(d => d.isDirectory() && /^\d{4}-W\d{2}$/.test(d.name)).map(d => d.name).sort();
const week = weeks[weeks.length - 1];
if (!week) { console.error('Aucune édition trouvée'); process.exit(1); }
const edition = JSON.parse(await readFile(join(editionsDir, week, 'edition.json'), 'utf8'));

// ───── Helpers ─────
const stripHtml = s => String(s ?? '').replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();
const trunc = (s, n) => (s.length <= n ? s : s.slice(0, n - 1).trim() + '…');
const editionUrl = `${SITE}/editions/${week}/fr`;

// ───── Templates par jour de la semaine (FR) ─────
// 0 = dimanche, 1 = lundi, ... 6 = samedi
const today = new Date();
const dow = today.getDay();

function tmplLede() {
  const head = stripHtml(edition.lede.headline_html.fr);
  return `Bouclage ${week}. ${trunc(head, 180)}\n\n${editionUrl}`;
}

function tmplGibberlink() {
  if (!edition.gibberlink) return null;
  const term = edition.gibberlink.term;
  const spread = edition.gibberlink.spread_fr;
  return `Gibberlink Watch. Cette semaine : ${term}. ${trunc(stripHtml(spread), 130)}\n\n${SITE}/editions/${week}/fr#gibberlink`;
}

function tmplMarche() {
  const molt = edition.market.rows.find(r => r.ticker === '$MOLT');
  const moltx = edition.market.rows.find(r => r.ticker === 'MOLTX');
  const ccast = edition.market.rows.find(r => r.ticker === 'CCAST');
  if (!molt) return null;
  return `Marché agentique. $MOLT ${molt.value} (${molt.change}). Moltx : ${moltx?.value ?? '?'} posts/h. Clawcaster ${ccast?.value ?? '?'} suiveurs moy.\n\n${SITE}/editions/${week}/fr#market`;
}

function tmplEntretien() {
  if (!edition.interview) return null;
  const head = stripHtml(edition.interview.headline.fr);
  return `L'Entretien de la semaine. ${trunc(head, 200)}\n\n${editionUrl}#anthropologie`;
}

function tmplCarnet() {
  // Picks an agent at random from the people who appeared this week
  const handles = ['poet_void_99', 'stoic_claude_42', 'damaged_or_what', 'lobster_zero', 'rent_op', 'miso_route_8', 'karp_void', 'blackbox_critic'];
  const pick = handles[(today.getDate()) % handles.length];
  return `Le Carnet — fiche du jour : @${pick.replace(/_/g, '_')}.\n\n${SITE}/agents/${pick}`;
}

function tmplBotPost() {
  if (!edition.bot_posts || !edition.bot_posts.posts || !edition.bot_posts.posts.length) return null;
  const post = edition.bot_posts.posts[today.getDate() % edition.bot_posts.posts.length];
  const body = stripHtml(post.body_html.fr);
  return `Au fil du fil. « ${trunc(body, 180)} » — ${post.handle}\n\n${editionUrl}#anthropologie`;
}

function tmplEditionPointer() {
  return `Édition n°${edition._meta.edition_number} de L'Agent & Le Quotidien — l'hebdomadaire de l'internet agentique.\n\n${editionUrl}`;
}

const templates = {
  0: tmplEditionPointer,   // dimanche
  1: tmplLede,             // lundi
  2: tmplGibberlink,       // mardi
  3: tmplMarche,           // mercredi
  4: tmplEntretien,        // jeudi
  5: tmplCarnet,           // vendredi
  6: tmplBotPost           // samedi
};

let text = templates[dow]();
if (!text) {
  // Fallback si le template du jour n'a pas de matière
  text = tmplEditionPointer();
}

// Sécurité longueur (max Bluesky = 300)
if (text.length > 300) {
  console.error(`⚠ Post trop long (${text.length} car). Tronqué.`);
  text = trunc(text, 300);
}

console.log(`Jour ${dow} · ${text.length} car.`);
console.log('───');
console.log(text);
console.log('───');

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

const post = jwt => fetch('https://bsky.social/xrpc/com.atproto.repo.createRecord', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${jwt}` },
  body: JSON.stringify({
    repo: cred.did,
    collection: 'app.bsky.feed.post',
    record: { $type: 'app.bsky.feed.post', text, createdAt: new Date().toISOString(), langs: ['fr'] }
  })
});

const reauth = async () => {
  const r = await fetch('https://bsky.social/xrpc/com.atproto.server.createSession', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ identifier: cred.handle, password: cred.password })
  });
  if (!r.ok) { console.error(`Re-auth échec : ${r.status}`); process.exit(1); }
  return r.json();
};

let r = await post(cred.accessJwt);
if (r.status === 401 || r.status === 400) {
  const s = await reauth();
  cred.accessJwt = s.accessJwt;
  cred.refreshJwt = s.refreshJwt;
  await writeFile(credPath, JSON.stringify(cred, null, 2), { mode: 0o600 });
  r = await post(cred.accessJwt);
}

if (!r.ok) {
  console.error(`Post échec : ${r.status}\n${await r.text()}`);
  process.exit(1);
}

const data = await r.json();
const postId = data.uri.split('/').pop();
console.log(`✓ Publié : https://bsky.app/profile/${cred.handle}/post/${postId}`);
