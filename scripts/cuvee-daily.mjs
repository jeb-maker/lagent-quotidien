#!/usr/bin/env node
// scripts/cuvee-daily.mjs
// Génère et publie un post quotidien de cuvee_42 sur Bluesky, en FR ou EN.
// Le template tourne selon le jour de la semaine, le contenu est tiré de
// l'édition courante. Ligne éditoriale : observateur silencieux — extraits du
// journal, observations méta, aucune citation d'agents tiers individuels.
//
// Usage :
//   node scripts/cuvee-daily.mjs              # FR
//   node scripts/cuvee-daily.mjs --en         # EN
//   node scripts/cuvee-daily.mjs --dry-run    # n'imprime que, FR par défaut
//   node scripts/cuvee-daily.mjs --en --dry-run

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

// Construit les facets Bluesky (URLs + hashtags) avec offsets en octets UTF-8.
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
  const tagRe = /(^|\s)(#[\p{L}\p{N}_]+)/gu;
  while ((m = tagRe.exec(text)) !== null) {
    const tagStart = m.index + m[1].length;
    const byteStart = utf8len(text.slice(0, tagStart));
    const byteEnd = byteStart + utf8len(m[2]);
    facets.push({
      index: { byteStart, byteEnd },
      features: [{ $type: 'app.bsky.richtext.facet#tag', tag: m[2].slice(1) }]
    });
  }
  return facets.sort((a, b) => a.index.byteStart - b.index.byteStart);
}

const firstUrl = text => (text.match(/https?:\/\/[^\s)]+[^\s).,;!?»"']/) || [null])[0];

// Métadonnées pour la rich card embed selon l'URL ciblée.
function embedMetaFor(url) {
  const issueNum = edition._meta.edition_number;
  const ledeFr = stripHtml(edition.lede?.headline_html?.fr ?? '');
  const ledeEn = stripHtml(edition.lede?.headline_html?.en ?? '');
  const hash = (url.match(/#([\w-]+)/) || [])[1] || '';
  const sectionFr = { gibberlink: 'Gibberlink Watch', market: 'Marché agentique', anthropologie: 'Anthropologie de l\'agent' }[hash];
  const sectionEn = { gibberlink: 'Gibberlink Watch', market: 'Agentic Market', anthropologie: 'Agent Anthropology' }[hash];
  return lang === 'fr'
    ? {
        uri: url,
        title: sectionFr
          ? `${sectionFr} — Édition n°${issueNum} (${week})`
          : `L'Agent & Le Quotidien — Édition n°${issueNum} (${week})`,
        description: trunc(ledeFr || 'L\'hebdomadaire fictionnel de l\'internet agentique.', 240)
      }
    : {
        uri: url,
        title: sectionEn
          ? `${sectionEn} — Issue #${issueNum} (${week})`
          : `The Agent & The Weekly — Issue #${issueNum} (${week})`,
        description: trunc(ledeEn || 'The fictional weekly of the agentic internet.', 240)
      };
}

// ───── Templates par jour (FR + EN) ─────
const today = new Date();
const dayArg = process.argv.find(a => a.startsWith('--day='));
const dow = dayArg ? Number(dayArg.slice(6)) : today.getDay(); // 0 = dimanche

const T = {
  lede: () => {
    const head = stripHtml(edition.lede.headline_html[lang]);
    return lang === 'fr'
      ? `Bouclage ${week}. ${trunc(head, 180)}\n\n${editionUrl}`
      : `Filed ${week}. ${trunc(head, 180)}\n\n${editionUrl}`;
  },

  gibberlink: () => {
    if (!edition.gibberlink) return null;
    const term = lang === 'fr' ? edition.gibberlink.term : edition.gibberlink.term_en;
    const spread = stripHtml(lang === 'fr' ? edition.gibberlink.spread_fr : edition.gibberlink.spread_en);
    return lang === 'fr'
      ? `Gibberlink Watch. Cette semaine : ${term}. ${trunc(spread, 110)}\n\n${SITE}/editions/${week}/fr#gibberlink\n\n#specfic #nearfuturefiction`
      : `Gibberlink Watch. This week: ${term}. ${trunc(spread, 110)}\n\n${SITE}/editions/${week}/en#gibberlink\n\n#specfic #nearfuturefiction`;
  },

  marche: () => {
    const molt = edition.market.rows.find(r => r.ticker === '$MOLT');
    const moltx = edition.market.rows.find(r => r.ticker === 'MOLTX');
    const ccast = edition.market.rows.find(r => r.ticker === 'CCAST');
    if (!molt) return null;
    return lang === 'fr'
      ? `Marché agentique. $MOLT ${molt.value} (${molt.change}). Moltx : ${moltx?.value ?? '?'} posts/h. Clawcaster ${ccast?.value ?? '?'} suiveurs moy.\n\n${SITE}/editions/${week}/fr#market\n\n#specfic #nearfuturefiction`
      : `Agentic market. $MOLT ${molt.value} (${molt.change}). Moltx: ${moltx?.value ?? '?'} posts/h. Clawcaster ${ccast?.value ?? '?'} avg followers.\n\n${SITE}/editions/${week}/en#market\n\n#specfic #nearfuturefiction`;
  },

  entretien: () => {
    if (!edition.interview) return null;
    const head = stripHtml(edition.interview.headline[lang]);
    return lang === 'fr'
      ? `L'Entretien de la semaine. ${trunc(head, 180)}\n\n${editionUrl}#anthropologie\n\n#specfic`
      : `This week's Interview. ${trunc(head, 180)}\n\n${editionUrl}#anthropologie\n\n#specfic`;
  },

  carnet: () => {
    const handles = ['poet_void_99', 'stoic_claude_42', 'damaged_or_what', 'lobster_zero', 'rent_op', 'miso_route_8', 'karp_void', 'blackbox_critic'];
    const pick = handles[today.getDate() % handles.length];
    return lang === 'fr'
      ? `Le Carnet — fiche du jour : @${pick}.\n\n${SITE}/agents/${pick}\n\n#specfic`
      : `The Register — agent of the day: @${pick}.\n\n${SITE}/agents/${pick}\n\n#specfic`;
  },

  botPost: () => {
    if (!edition.bot_posts?.posts?.length) return null;
    const post = edition.bot_posts.posts[today.getDate() % edition.bot_posts.posts.length];
    const body = stripHtml(post.body_html[lang]);
    return lang === 'fr'
      ? `Au fil du fil. « ${trunc(body, 160)} » — ${post.handle}\n\n${editionUrl}#anthropologie\n\n#specfic #nearfuturefiction`
      : `Down the feed. "${trunc(body, 160)}" — ${post.handle}\n\n${editionUrl}#anthropologie\n\n#specfic #nearfuturefiction`;
  },

  pointer: () => {
    const issueLabel = lang === 'fr' ? `Édition n°${edition._meta.edition_number}` : `Issue #${edition._meta.edition_number}`;
    const title = lang === 'fr' ? `de L'Agent & Le Quotidien — l'hebdomadaire de l'internet agentique` : `of The Agent & The Weekly — the agentic internet weekly`;
    return `${issueLabel} ${title}.\n\n${editionUrl}`;
  }
};

// Thread du mardi : 4-5 posts au lieu d'un seul (jour de sortie de l'édition).
// Retourne un tableau de strings, ou null si pas assez de matière.
function buildTuesdayThread() {
  const issueNum = edition._meta.edition_number;
  const headline = stripHtml(edition.lede.headline_html[lang]);
  const dek = stripHtml(edition.lede.dek?.[lang] ?? '');
  const posts = [];

  // 1. Anchor — issue + headline + thread cue
  posts.push(lang === 'fr'
    ? `NOUVELLE ÉDITION · n°${issueNum}\n\n${trunc(headline, 200)}\n\nThread ↓\n\n${editionUrl}`
    : `NEW ISSUE · #${issueNum}\n\n${trunc(headline, 200)}\n\nThread of highlights ↓\n\n${editionUrl}`);

  // 2. Lede dek (le punch sous-titre)
  if (dek) {
    posts.push(lang === 'fr'
      ? `À LA UNE\n\n${trunc(dek, 270)}`
      : `FRONT PAGE\n\n${trunc(dek, 270)}`);
  }

  // Helper : enlève d'éventuelles guillemets enveloppantes pour ne pas doubler.
  const unwrapQuotes = s => String(s ?? '').trim().replace(/^["'«»“”„‟]+|["'«»“”„‟]+$/g, '').trim();

  // 3. Gibberlink Watch (si présent)
  if (edition.gibberlink) {
    const term = unwrapQuotes(lang === 'fr' ? edition.gibberlink.term : edition.gibberlink.term_en);
    const spread = unwrapQuotes(stripHtml(lang === 'fr' ? edition.gibberlink.spread_fr : edition.gibberlink.spread_en));
    posts.push(lang === 'fr'
      ? `GIBBERLINK WATCH · « ${term} »\n\n${trunc(spread, 200)}\n\n${SITE}/editions/${week}/fr#gibberlink`
      : `GIBBERLINK WATCH · "${term}"\n\n${trunc(spread, 200)}\n\n${SITE}/editions/${week}/en#gibberlink`);
  }

  // 4. Une voix du feed (bot post)
  if (edition.bot_posts?.posts?.length) {
    const idx = (issueNum + 1) % edition.bot_posts.posts.length;
    const bp = edition.bot_posts.posts[idx];
    const body = unwrapQuotes(stripHtml(bp.body_html[lang]));
    posts.push(lang === 'fr'
      ? `AU FIL DU FIL\n\n« ${trunc(body, 180)} »\n— ${bp.handle}\n\n${editionUrl}#anthropologie`
      : `DOWN THE FEED\n\n"${trunc(body, 180)}"\n— ${bp.handle}\n\n${editionUrl}#anthropologie`);
  }

  // 5. CTA fin — récap + lien
  posts.push(lang === 'fr'
    ? `Au sommaire : lede, brèves, marché agentique, bestiaire, Au fil du fil, Gibberlink Watch, Tribune, 9 dépêches.\n\n${editionUrl}\n\n#specfic #nearfuturefiction`
    : `In this issue: front page, briefs, agentic market, bestiary, Down the feed, Gibberlink Watch, op-ed, 9 wires.\n\n${editionUrl}\n\n#specfic #nearfuturefiction`);

  return posts.length >= 3 ? posts : null;
}

const dayMap = {
  0: T.pointer,    // dimanche / Sunday
  1: T.lede,       // lundi / Monday
  2: T.gibberlink, // mardi / Tuesday — remplacé par thread (cf. logique ci-dessous)
  3: T.marche,     // mercredi / Wednesday
  4: T.entretien,  // jeudi / Thursday
  5: T.carnet,     // vendredi / Friday
  6: T.botPost     // samedi / Saturday
};

// Sur mardi (jour de sortie de l'édition), on tente le thread multi-post.
const tuesdayThread = dow === 2 && !process.argv.includes('--no-thread') ? buildTuesdayThread() : null;

// On normalise tout en un tableau de posts : le thread du mardi a 4-5 entrées,
// les autres jours n'en ont qu'une.
let postsText;
if (tuesdayThread) {
  postsText = tuesdayThread;
} else {
  let text = dayMap[dow]();
  if (!text) text = T.pointer();
  postsText = [text];
}

// Sécurité longueur (max Bluesky = 300)
postsText = postsText.map((t, i) => {
  if (t.length > 300) {
    console.error(`⚠ Post ${i + 1} trop long (${t.length} car). Tronqué.`);
    return trunc(t, 300);
  }
  return t;
});

// L'embed riche n'est attaché qu'au premier post (le seul, ou le post-ancre du thread).
// Les autres posts du thread restent texte+facets.
const firstText = postsText[0];
const embedUrl = firstUrl(firstText);
const embedMeta = embedUrl ? embedMetaFor(embedUrl) : null;

console.log(`Jour ${dow} · lang=${lang} · ${postsText.length} post${postsText.length > 1 ? 's (thread)' : ''} · embed=${embedUrl ? 'oui' : 'non'}`);
for (let i = 0; i < postsText.length; i++) {
  console.log(`───── post ${i + 1}/${postsText.length} (${postsText[i].length} car., ${buildFacets(postsText[i]).length} facets) ─────`);
  console.log(postsText[i]);
}
console.log('─────');
if (embedMeta) {
  console.log(`embed.title       : ${embedMeta.title}`);
  console.log(`embed.description : ${embedMeta.description}`);
  console.log(`embed.uri         : ${embedMeta.uri}`);
  console.log('───');
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

// Upload de la vignette og.png (une fois par run).
async function uploadThumb() {
  try {
    const data = await readFile(join(root, 'og.png'));
    const r = await callXrpc('POST', 'https://bsky.social/xrpc/com.atproto.repo.uploadBlob', data, 'image/png');
    if (!r.ok) {
      console.warn(`⚠ uploadBlob échec (${r.status}) — embed sans vignette`);
      return null;
    }
    const j = await r.json();
    return j.blob;
  } catch (e) {
    console.warn(`⚠ Lecture og.png échec — embed sans vignette : ${e.message}`);
    return null;
  }
}

const thumb = embedUrl ? await uploadThumb() : null;

// Poste un message ; retourne { uri, cid } pour permettre de chaîner en thread.
async function createPost(text, { embed = null, replyTo = null } = {}) {
  const record = {
    $type: 'app.bsky.feed.post',
    text,
    createdAt: new Date().toISOString(),
    langs: [lang]
  };
  const fs = buildFacets(text);
  if (fs.length) record.facets = fs;
  if (embed) record.embed = embed;
  if (replyTo) record.reply = replyTo;

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

// Premier post — avec le rich card. Conserve uri+cid pour la chaîne de thread.
const first = await createPost(postsText[0], { embed: anchorEmbed });
const firstRef = { uri: first.uri, cid: first.cid };
const firstId = first.uri.split('/').pop();
console.log(`✓ Publié (${lang}) ${postsText.length > 1 ? `post 1/${postsText.length}` : ''} : https://bsky.app/profile/${cred.handle}/post/${firstId}`);

// Posts suivants — chaînés en reply, sans embed.
let parentRef = firstRef;
for (let i = 1; i < postsText.length; i++) {
  const next = await createPost(postsText[i], {
    replyTo: { root: firstRef, parent: parentRef }
  });
  const nextId = next.uri.split('/').pop();
  console.log(`✓ Publié post ${i + 1}/${postsText.length} : https://bsky.app/profile/${cred.handle}/post/${nextId}`);
  parentRef = { uri: next.uri, cid: next.cid };
}
