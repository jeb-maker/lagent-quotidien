// Validation structurelle de edition.json (zéro dépendance).
//
// Usage :
//   node scripts/validate-edition-schema.mjs              # toutes les éditions
//   node scripts/validate-edition-schema.mjs 2026-W27     # une semaine
//
// Intégré dans lint-edition.mjs ; appelé en CI sur l'archive complète.

import { readFileSync, readdirSync, existsSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');

const REQUIRED_TOP = ['_meta', 'ticker', 'lede', 'breves', 'headlines', 'market', 'wire', 'tribune'];
const OPTIONAL_TOP = ['carnet', 'feature', 'enquete', 'bestiaire', 'gibberlink', 'interview', 'bot_posts', 'retrospective'];
const META_KEYS = ['week', 'date_fr', 'date_en', 'edition_number', 'volume', 'bouclage'];

function isBilingual(obj) {
  return obj && typeof obj === 'object' && typeof obj.fr === 'string' && typeof obj.en === 'string';
}

function isNonEmptyString(v) {
  return typeof v === 'string' && v.trim().length > 0;
}

function isArray(v, min = 0) {
  return Array.isArray(v) && v.length >= min;
}

/** @returns {string[]} */
export function validateEditionSchema(edition, week = '?') {
  const errors = [];
  const prefix = `[schema:${week}]`;

  if (!edition || typeof edition !== 'object' || Array.isArray(edition)) {
    return [`${prefix} racine : objet attendu`];
  }

  for (const key of REQUIRED_TOP) {
    if (!(key in edition)) errors.push(`${prefix} clé obligatoire manquante : ${key}`);
  }

  for (const key of Object.keys(edition)) {
    if (!REQUIRED_TOP.includes(key) && !OPTIONAL_TOP.includes(key)) {
      errors.push(`${prefix} clé inconnue : ${key}`);
    }
  }

  const meta = edition._meta;
  if (meta && typeof meta === 'object') {
    for (const k of META_KEYS) {
      if (!(k in meta)) errors.push(`${prefix} _meta.${k} manquant`);
    }
    if (meta.week && week !== '?' && meta.week !== week) {
      errors.push(`${prefix} _meta.week (${meta.week}) ≠ dossier (${week})`);
    }
  }

  if (!isArray(edition.ticker, 1)) errors.push(`${prefix} ticker : tableau non vide attendu`);

  const lede = edition.lede;
  if (lede) {
    for (const field of ['kicker', 'headline_html', 'dek', 'byline', 'body']) {
      if (!isBilingual(lede[field])) errors.push(`${prefix} lede.${field} : { fr, en } attendu`);
    }
    if (!lede.figure || typeof lede.figure !== 'object') {
      errors.push(`${prefix} lede.figure : objet attendu`);
    }
  }

  if (!isArray(edition.breves, 1)) errors.push(`${prefix} breves : au moins une brève`);
  else {
    edition.breves.forEach((b, i) => {
      if (!isBilingual(b.title)) errors.push(`${prefix} breves[${i}].title : bilingue attendu`);
      if (!isBilingual(b.body)) errors.push(`${prefix} breves[${i}].body : bilingue attendu`);
    });
  }

  if (!isArray(edition.headlines, 1)) errors.push(`${prefix} headlines : au moins un gros titre`);
  else {
    edition.headlines.forEach((h, i) => {
      if (!isBilingual(h.title_html)) errors.push(`${prefix} headlines[${i}].title_html : bilingue attendu`);
      if (!isBilingual(h.body)) errors.push(`${prefix} headlines[${i}].body : bilingue attendu`);
    });
  }

  const market = edition.market;
  if (market) {
    if (!isBilingual(market.title)) errors.push(`${prefix} market.title : bilingue attendu`);
    if (!isArray(market.rows, 1)) errors.push(`${prefix} market.rows : au moins une ligne`);
    else {
      market.rows.forEach((r, i) => {
        if (!isNonEmptyString(r.ticker)) errors.push(`${prefix} market.rows[${i}].ticker manquant`);
        if (!isBilingual(r.label)) errors.push(`${prefix} market.rows[${i}].label : bilingue attendu`);
        if (!isNonEmptyString(r.value)) errors.push(`${prefix} market.rows[${i}].value manquant`);
        if (!['up', 'down'].includes(r.direction)) errors.push(`${prefix} market.rows[${i}].direction : up|down`);
      });
    }
    if (!isArray(market.boards, 1)) errors.push(`${prefix} market.boards : au moins un panneau`);
  }

  if (!isArray(edition.wire, 1)) errors.push(`${prefix} wire : au moins une dépêche`);
  else {
    edition.wire.forEach((w, i) => {
      if (!isNonEmptyString(w.source)) errors.push(`${prefix} wire[${i}].source manquant`);
      if (!isBilingual(w.title)) errors.push(`${prefix} wire[${i}].title : bilingue attendu`);
      if (!isBilingual(w.body)) errors.push(`${prefix} wire[${i}].body : bilingue attendu`);
    });
  }

  const tribune = edition.tribune;
  if (tribune) {
    if (!isBilingual(tribune.label)) errors.push(`${prefix} tribune.label : bilingue attendu`);
    if (!isBilingual(tribune.headline_html)) errors.push(`${prefix} tribune.headline_html : bilingue attendu`);
    const paras = tribune.paragraphs;
    if (!paras || !isArray(paras.fr, 1) || !isArray(paras.en, 1)) {
      errors.push(`${prefix} tribune.paragraphs : { fr: string[], en: string[] } non vide attendu`);
    }
    if (!tribune.author?.name) errors.push(`${prefix} tribune.author.name manquant`);
  }

  if (edition.carnet) {
    if (!isBilingual(edition.carnet.title)) errors.push(`${prefix} carnet.title : bilingue attendu`);
    if (!isArray(edition.carnet.people, 1)) errors.push(`${prefix} carnet.people : au moins une entrée`);
  }

  const feature = edition.feature ?? edition.enquete;
  if (feature?.paragraphs) {
    if (!isArray(feature.paragraphs.fr, 1) || !isArray(feature.paragraphs.en, 1)) {
      errors.push(`${prefix} feature.paragraphs : { fr, en } non vide attendu`);
    }
  }

  if (edition.retrospective) {
    const retro = edition.retrospective;
    if (!isBilingual(retro.headline_html)) errors.push(`${prefix} retrospective.headline_html : bilingue attendu`);
    if (!isBilingual(retro.dek)) errors.push(`${prefix} retrospective.dek : bilingue attendu`);
    const paras = retro.paragraphs;
    if (!paras || !isArray(paras.fr, 1) || !isArray(paras.en, 1)) {
      errors.push(`${prefix} retrospective.paragraphs : { fr: string[], en: string[] } non vide attendu`);
    }
  }

  return errors;
}

function listWeeks() {
  return readdirSync(join(ROOT, 'editions'))
    .filter((d) => /^\d{4}-W\d{2}$/.test(d))
    .sort();
}

function resolveWeeks(argv) {
  const arg = argv.find((a) => /^\d{4}-W\d{2}$/.test(a));
  if (arg) return [arg];
  return listWeeks();
}

function main() {
  const weeks = resolveWeeks(process.argv.slice(2));
  if (!weeks.length) {
    console.error('Aucune édition trouvée dans editions/');
    process.exit(1);
  }

  let total = 0;
  for (const week of weeks) {
    const file = join(ROOT, 'editions', week, 'edition.json');
    if (!existsSync(file)) {
      console.error(`  ERR   ${file} introuvable`);
      total++;
      continue;
    }
    let edition;
    try {
      edition = JSON.parse(readFileSync(file, 'utf8'));
    } catch (e) {
      console.error(`  ERR   ${week} : JSON invalide — ${e.message}`);
      total++;
      continue;
    }
    const errs = validateEditionSchema(edition, week);
    for (const e of errs) console.error(`  ERR   ${e}`);
    total += errs.length;
  }

  console.log(`\nSchema : ${weeks.length} édition(s), ${total} erreur(s).`);
  process.exit(total ? 1 : 0);
}

if (process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1]) {
  main();
}
