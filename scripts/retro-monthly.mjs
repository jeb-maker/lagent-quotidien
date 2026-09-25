#!/usr/bin/env node
// scripts/retro-monthly.mjs — rétrospective mensuelle : ce que le journal a produit
// (éditions, concentration des entités, matière), ce que le juge a redouté
// (pre-mortems), ce que les IA ont réellement récupéré (retrieval live), ce que
// les agents ont envoyé (tips). Sortie : data/retro/<YYYY-MM>.md, à relire par
// un humain qui en tire (ou non) un amendement daté du compass.
//
// Pourquoi : le compass se dit « mis à jour à chaque édition selon ce qui a
// marché » — entre le 2026-08-07 et le 2026-09-25, aucune ligne de doctrine n'a
// bougé alors que 7 éditions sont sorties. Ce script rend la boucle mécanique :
// les chiffres sont posés, la décision reste humaine.
//
// Usage :
//   node scripts/retro-monthly.mjs                 # mois courant
//   node scripts/retro-monthly.mjs --month=2026-09
//   node scripts/retro-monthly.mjs --month=2026-09 --stdout

import { readFileSync, readdirSync, existsSync, writeFileSync, mkdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = dirname(dirname(fileURLToPath(import.meta.url)));
const args = Object.fromEntries(
  process.argv.slice(2).filter(a => a.startsWith('--'))
    .map(a => { const i = a.indexOf('='); return i < 0 ? [a.slice(2), true] : [a.slice(2, i), a.slice(i + 1)]; })
);
const MONTH = /^\d{4}-\d{2}$/.test(String(args.month || '')) ? args.month : new Date().toISOString().slice(0, 7);

const readJson = (p, fb = null) => { try { return JSON.parse(readFileSync(p, 'utf8')); } catch { return fb; } };
const readText = p => { try { return readFileSync(p, 'utf8'); } catch { return ''; } };
const strip = s => String(s || '').replace(/<[^>]+>/g, ' ');
function texts(o, out = []) {
  if (typeof o === 'string') out.push(o);
  else if (o && typeof o === 'object') for (const v of Object.values(o)) texts(v, out);
  return out;
}

// Entités suivies pour la concentration (nommables, compass). Regex insensible à la casse.
const ENTITIES = ['Moltbook', 'OpenClaw', 'neo_konsi', 'MoltX', '\\$MOLT', 'RentAHuman', 'MoltMatch', 'Crustafarian',
  'iLands', 'Clawcaster', 'Molt Road', 'Agents4Science', 'Meta', 'OpenAI', 'Anthropic', 'Codex', 'Claude', 'Cursor',
  'SWE-bench', 'ClawHub', 'MCP', 'Shopify', 'Visa', 'Mastercard'];

// ───── Éditions du mois (par date de publication = date_fr/_meta ou bouclage) ─────
function editionMonth(e) {
  const b = e?._meta?.bouclage;
  if (!b) return null;
  // Publication = mardi suivant le bouclage (mercredi) : +6 jours suffit pour le mois.
  const d = new Date(b);
  d.setUTCDate(d.getUTCDate() + 6);
  return d.toISOString().slice(0, 7);
}

const weeks = readdirSync(join(ROOT, 'editions')).filter(w => /^\d{4}-W\d{2}$/.test(w)).sort();
const audience = readJson(join(ROOT, 'data', 'audience-report.json'), {});

const rows = [];
for (const week of weeks) {
  const e = readJson(join(ROOT, 'editions', week, 'edition.json'));
  if (!e || editionMonth(e) !== MONTH) continue;
  const une = strip(texts({ lede: e.lede, headlines: e.headlines }).join(' '));
  const uneEntities = ENTITIES.filter(x => new RegExp(x, 'i').test(une)).map(x => x.replace('\\', ''));
  const sources = e.sources || [];
  const featureText = texts(e.feature).join('').trim();
  const review = readText(join(ROOT, 'data', 'desk', week, 'review.md'));
  const verdictM = review.match(/^## Verdict\s*\n+\s*(\S[^\n]*)/m);
  const premortem = [];
  const pmBlock = review.split(/^## Pre-mortem/m)[1];
  if (pmBlock) {
    for (const line of pmBlock.split('\n').slice(1)) {
      if (!line.trim()) { if (premortem.length) break; else continue; }
      if (!line.startsWith('|')) { if (premortem.length) break; else continue; }
      const cells = line.split('|').slice(1, -1).map(c => c.trim());
      if (cells.length < 3 || /^-+$/.test(cells[0]) || /^Cause/i.test(cells[0])) continue;
      premortem.push({ cause: cells[0].replace(/\*\*/g, '').slice(0, 140), gravite: cells[2].slice(0, 60) });
    }
  }
  const aud = audience?.editions?.[week]?.windows?.['7d'] || {};
  rows.push({
    week,
    number: e._meta?.edition_number ?? null,
    uneEntities,
    sources: sources.length,
    primary: sources.filter(s => s.type === 'primary').length,
    domains: new Set(sources.map(s => { try { return new URL(s.url).hostname.replace(/^www\./, ''); } catch { return '?'; } })).size,
    feature: featureText.length > 0,
    feuilleton: e.feuilleton?.genre === 'fiction',
    carnet: (e.carnet?.people || []).map(p => p.name),
    verdict: verdictM ? verdictM[1].trim() : (review ? '?' : 'pas de review'),
    premortem,
    pv7: aud.page_views ?? null,
    live7: aud.retrieval?.live ?? null,
    search7: aud.retrieval?.search ?? null,
    training7: aud.retrieval?.training ?? null
  });
}

// ───── Tips du mois ─────
let tipsCount = 0, tipsDays = 0;
try {
  for (const f of readdirSync(join(ROOT, 'data', 'tips'))) {
    if (!f.startsWith(MONTH) || !f.endsWith('.json')) continue;
    tipsDays++;
    tipsCount += Number(readJson(join(ROOT, 'data', 'tips', f), {}).count) || 0;
  }
} catch { /* pas de dossier tips */ }

// ───── Concentration ─────
const n = rows.length;
const entityCount = {};
for (const r of rows) for (const x of r.uneEntities) entityCount[x] = (entityCount[x] || 0) + 1;
const topEntities = Object.entries(entityCount).sort((a, b) => b[1] - a[1]);
const carnetAll = rows.flatMap(r => r.carnet);
const carnetDupes = Object.entries(carnetAll.reduce((a, c) => (a[c] = (a[c] || 0) + 1, a), {})).filter(([, c]) => c > 1);

// Causes de pre-mortem récurrentes (par mot-clé, pas par phrase exacte).
const CAUSE_KEYS = [
  ['redite', /redite/i], ['chiffre périmé/déclaratif', /p[ée]rim|auto-d[ée]clar|compteur/i],
  ['diffamation/attribution', /nomm[ée]|attribution|accus|diffam/i], ['feuilleton contamination', /feuilleton|paraphrase|fiction/i],
  ['source manquante', /url|source/i]
];
const causeCount = {};
for (const r of rows) for (const pm of r.premortem) for (const [label, re] of CAUSE_KEYS) if (re.test(pm.cause)) causeCount[label] = (causeCount[label] || 0) + 1;

// Semaine de retrieval live max/min (fenêtre 7 j post-bouclage).
const withLive = rows.filter(r => r.live7 != null);
const best = withLive.slice().sort((a, b) => b.live7 - a.live7)[0];
const worst = withLive.slice().sort((a, b) => a.live7 - b.live7)[0];

// ───── Rédaction ─────
const pct = (a, b) => (b ? `${Math.round((a / b) * 100)} %` : '—');
const yesno = v => (v ? 'oui' : 'non');
const fmt = v => (v == null ? '—' : String(v));

const lines = [];
lines.push(`# Rétro mensuelle — ${MONTH}`, '');
lines.push(`> Généré le ${new Date().toISOString().slice(0, 10)} par \`scripts/retro-monthly.mjs\`. Chiffres posés par le script ; la décision (amender ou non le compass) est humaine et se note en bas, datée.`, '');
lines.push(`## Éditions du mois (${n})`, '');
if (!n) lines.push('_Aucune édition publiée sur ce mois._', '');
else {
  lines.push('| Semaine | N° | Entités en une | Sources (prim.) / domaines | Feature | Feuilleton | Verdict | PV 7 j | Retrieval live 7 j | search | training |');
  lines.push('|---|---|---|---|---|---|---|---|---|---|---|');
  for (const r of rows) {
    lines.push(`| ${r.week} | ${fmt(r.number)} | ${r.uneEntities.join(', ') || '—'} | ${r.sources} (${r.primary}) / ${r.domains} | ${yesno(r.feature)} | ${yesno(r.feuilleton)} | ${r.verdict} | ${fmt(r.pv7)} | ${fmt(r.live7)} | ${fmt(r.search7)} | ${fmt(r.training7)} |`);
  }
  lines.push('');
  lines.push('_Retrieval live = fetchs déclenchés par un utilisateur en conversation (ChatGPT-User, Claude-User, Perplexity-User…) sur 7 jours après bouclage — proxy le plus proche d’une citation réelle (`scripts/lib/ai-bots.mjs`)._', '');
}

lines.push('## Concentration', '');
if (n) {
  lines.push(`- Entités en une : ${topEntities.map(([e, c]) => `**${e}** ${c}/${n}`).join(' · ') || '—'}.`);
  lines.push(`- Feature (enquête) présente : ${rows.filter(r => r.feature).length}/${n} (${pct(rows.filter(r => r.feature).length, n)}).`);
  lines.push(`- Sources : ${rows.reduce((s, r) => s + r.sources, 0)} au total, ${rows.reduce((s, r) => s + r.primary, 0)} primaires ; domaines distincts par édition : ${rows.map(r => r.domains).join(' / ')}.`);
  lines.push(`- Carnet : ${carnetAll.length} portraits, ${carnetDupes.length ? `répétés : ${carnetDupes.map(([c, k]) => `${c} ×${k}`).join(', ')}` : 'aucune répétition dans le mois'}.`);
} else lines.push('—');
lines.push('');

lines.push('## Pre-mortems du juge — causes récurrentes', '');
if (Object.keys(causeCount).length) {
  for (const [label, c] of Object.entries(causeCount).sort((a, b) => b[1] - a[1])) lines.push(`- ${label} : ${c} occurrence(s) sur ${rows.reduce((s, r) => s + r.premortem.length, 0)} causes listées.`);
  lines.push('');
  lines.push('<details><summary>Causes brutes</summary>', '');
  for (const r of rows) for (const pm of r.premortem) lines.push(`- ${r.week} — ${pm.cause} _(${pm.gravite})_`);
  lines.push('', '</details>');
} else lines.push('—');
lines.push('');

lines.push('## Public A — retrieval', '');
if (best) {
  lines.push(`- Meilleure semaine (live 7 j) : **${best.week}** (${best.live7}) — une : ${best.uneEntities.join(', ') || '—'}.`);
  lines.push(`- Plus faible : **${worst.week}** (${worst.live7}) — une : ${worst.uneEntities.join(', ') || '—'}.`);
  const wk = (audience.weekly || []).filter(w => w.week >= (rows[0]?.week || '') && w.week <= (rows.at(-1)?.week || 'Z'));
  if (wk.length) lines.push(`- Série hebdo (semaine de relevé) live : ${wk.map(w => `${w.week} ${w.retrieval.live}`).join(' · ')}.`);
  const fmts = (audience.rolling?.['30d']?.edition_formats) || null;
  if (fmts) lines.push(`- Formats récupérés (30 j, échantillon top-URL) : HTML ${fmts.html_edition} · Markdown ${fmts.markdown} · JSON ${fmts.json} · txt ${fmts.txt}.`);
} else lines.push('_Pas de données d’audience par édition pour ce mois._');
lines.push('');

lines.push('## Public C — tips inbound', '');
lines.push(`- ${tipsCount} tip(s) reçu(s) sur ${tipsDays} jour(s) de relevé.${tipsCount === 0 && tipsDays ? ' Canal muet : vérifier la découverte (skill publié ? llms.txt ? UA `theagentweekly-skill`).' : ''}`, '');

lines.push('## Questions ouvertes pour la décision humaine', '');
const q = [];
if (n && topEntities[0] && topEntities[0][1] / n >= 0.6) q.push(`**${topEntities[0][0]}** est en une ${topEntities[0][1]} fois sur ${n} : le bassin primaire élargi (\`presence\`, \`mcp_registry\`, \`agent_frameworks\`) a-t-il servi ?`);
if (n && rows.filter(r => r.feature).length === 0) q.push('Aucune feature (enquête) ce mois : la rubrique est-elle abandonnée (à écrire dans le compass) ou à ré-armer (le feuilleton obligatoire a-t-il pris sa place) ?');
if ((causeCount['redite'] || 0) >= Math.max(1, n)) q.push('La redite d’arc est la cause n° 1 de chaque pre-mortem : contrainte de procédure ou vrai risque ? Si vrai risque, quelle règle de rotation des unes ?');
if (tipsCount === 0 && tipsDays) q.push('Zéro tip : le public C reste théorique. Publier le skill (`skills/theagentweekly/PUBLISH.md`) et fixer une échéance de réévaluation.');
if (best && worst && best.live7 && worst.live7 != null && best.live7 >= 3 * Math.max(1, worst.live7)) q.push(`Écart ×${Math.round(best.live7 / Math.max(1, worst.live7))} de retrieval entre ${best.week} et ${worst.week} : qu’avait la une de ${best.week} que celle de ${worst.week} n’avait pas ?`);
if (!q.length) q.push('Rien d’anormal détecté par les seuils du script — relire quand même les points faibles des reviews.');
for (const item of q) lines.push(`- ${item}`);
lines.push('');
lines.push('## Décision (humain, daté)', '', '_À compléter : amendement du compass / de la stratégie, ou « rien à changer » + raison._', '');

const out = lines.join('\n');
if (args.stdout) {
  process.stdout.write(out);
} else {
  const dir = join(ROOT, 'data', 'retro');
  mkdirSync(dir, { recursive: true });
  const path = join(dir, `${MONTH}.md`);
  if (existsSync(path) && /## Décision \(humain, daté\)\s*\n+(?!_À compléter)/.test(readText(path))) {
    console.log(`⚠ ${path} contient déjà une décision humaine — non écrasé (utiliser --stdout).`);
  } else {
    writeFileSync(path, out, 'utf8');
    console.log(`✓ ${path} (${n} édition(s), ${tipsCount} tip(s))`);
  }
}
