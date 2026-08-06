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

// Schéma post-diet (audit 2026-06-30) :
// - wire absorbe breves (section unique « dépêches sourcées »)
// - ticker, market, bestiaire, enquete, bot_posts, interview, gibberlink,
//   retrospective : DEPRECATED — ignorés silencieusement (éditions historiques)
// - carnet et feature promus REQUIRED (cœur éditorial, présents 7/7)
const REQUIRED_TOP = ['_meta', 'lede', 'headlines', 'wire', 'carnet', 'feature', 'tribune'];
const OPTIONAL_TOP = ['takeaways', 'sources', 'feuilleton'];
const DEPRECATED_TOP = ['ticker', 'market', 'breves', 'bestiaire', 'enquete', 'gibberlink', 'interview', 'bot_posts', 'retrospective'];
const META_KEYS = ['week', 'date_fr', 'date_en', 'edition_number', 'volume', 'bouclage'];

/** Feuilleton obligatoire à partir de cette semaine (archive antérieure exemptée). */
const FEUILLETON_REQUIRED_FROM = '2026-W33';

/** Lore caduc — ne doit pas réapparaître dans le feuilleton. */
const CADUC_LORE_RE = /\b(Conglom[eé]rat|La Fonderie|Gibberlink|Court-Circuit|Le Compteur|@cuvee_42|@poet_void_99)\b/i;

/**
 * Entités réelles (tableau de vérité + labs fréquents) — interdites dans le
 * feuilleton (qualité : contraste fiction, pas paraphrase news).
 */
const REAL_ENTITY_RE = /\b(Moltbook|OpenClaw|RentAHuman|Crustafarianism|Clawcaster|Moltx|Molt\s*Road|MoltMatch|Agents4Science|OpenAI|Anthropic|Hugging\s*Face|Google|Meta|Microsoft|Nvidia|Salesforce|Cognition|Modal|Artifactory|JFrog|Pillar\s*Security|CoinGecko|\$MOLT)\b/i;

function weekGte(week, minWeek) {
  const m1 = String(week).match(/^(\d{4})-W(\d{2})$/);
  const m2 = String(minWeek).match(/^(\d{4})-W(\d{2})$/);
  if (!m1 || !m2) return false;
  const y1 = Number(m1[1]); const w1 = Number(m1[2]);
  const y2 = Number(m2[1]); const w2 = Number(m2[2]);
  return y1 > y2 || (y1 === y2 && w1 >= w2);
}

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
    if (!REQUIRED_TOP.includes(key) && !OPTIONAL_TOP.includes(key) && !DEPRECATED_TOP.includes(key)) {
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

  // Sections DEPRECATED : ticker, market, breves — ignorées silencieusement.
  // Le wire absorbe le rôle des breves (dépêches sourcées + mise en récit).

  const lede = edition.lede;
  if (lede) {
    for (const field of ['kicker', 'headline_html', 'dek', 'byline', 'body']) {
      if (!isBilingual(lede[field])) errors.push(`${prefix} lede.${field} : { fr, en } attendu`);
    }
    if (!lede.figure || typeof lede.figure !== 'object') {
      errors.push(`${prefix} lede.figure : objet attendu`);
    }
  }

  // breves : DEPRECATED (fusionné dans wire). Validation retirée.

  if (!isArray(edition.headlines, 1)) errors.push(`${prefix} headlines : au moins un gros titre`);
  else {
    edition.headlines.forEach((h, i) => {
      if (!isBilingual(h.title_html)) errors.push(`${prefix} headlines[${i}].title_html : bilingue attendu`);
      if (!isBilingual(h.body)) errors.push(`${prefix} headlines[${i}].body : bilingue attendu`);
    });
  }

  // market : DEPRECATED. Validation retirée.

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

  if (!edition.carnet) errors.push(`${prefix} carnet : section obligatoire`);
  else {
    if (!isBilingual(edition.carnet.title)) errors.push(`${prefix} carnet.title : bilingue attendu`);
    if (!isArray(edition.carnet.people, 1)) errors.push(`${prefix} carnet.people : au moins une entrée`);
  }

  const feature = edition.feature;
  if (!feature) errors.push(`${prefix} feature : section obligatoire`);
  else if (feature.paragraphs) {
    if (!isArray(feature.paragraphs.fr, 1) || !isArray(feature.paragraphs.en, 1)) {
      errors.push(`${prefix} feature.paragraphs : { fr, en } non vide attendu`);
    }
  }

  // retrospective : DEPRECATED. Validation retirée.

  if (edition.takeaways != null) {
    const t = edition.takeaways;
    if (!t || typeof t !== 'object' || !isArray(t.fr, 1) || !isArray(t.en, 1)) {
      errors.push(`${prefix} takeaways : { fr: string[], en: string[] } non vide attendu`);
    }
  }
  if (edition.sources != null) {
    if (!isArray(edition.sources, 1)) errors.push(`${prefix} sources : tableau non vide attendu`);
    else {
      edition.sources.forEach((s, i) => {
        if (!isNonEmptyString(s?.url)) errors.push(`${prefix} sources[${i}].url manquant`);
      });
    }
  }

  // Feuilleton : fiction étiquetée — obligatoire ≥ 2026-W33 (cron compose).
  const feuilletonRequired = weekGte(week, FEUILLETON_REQUIRED_FROM);
  if (feuilletonRequired && edition.feuilleton == null) {
    errors.push(`${prefix} feuilleton : obligatoire depuis ${FEUILLETON_REQUIRED_FROM}`);
  }
  if (edition.feuilleton != null) {
    const f = edition.feuilleton;
    if (!f || typeof f !== 'object' || Array.isArray(f)) {
      errors.push(`${prefix} feuilleton : objet attendu`);
    } else {
      if (f.genre !== 'fiction') {
        errors.push(`${prefix} feuilleton.genre : "fiction" obligatoire`);
      }
      if (!isBilingual(f.disclaimer)) {
        errors.push(`${prefix} feuilleton.disclaimer : { fr, en } attendu`);
      } else {
        for (const lang of ['fr', 'en']) {
          if (!/fiction/i.test(f.disclaimer[lang])) {
            errors.push(`${prefix} feuilleton.disclaimer.${lang} : doit mentionner "fiction"`);
          }
        }
      }
      if (!isBilingual(f.title)) errors.push(`${prefix} feuilleton.title : { fr, en } attendu`);
      const paras = f.paragraphs;
      if (!paras || !isArray(paras.fr, 1) || !isArray(paras.en, 1)) {
        errors.push(`${prefix} feuilleton.paragraphs : { fr: string[], en: string[] } non vide attendu`);
      }
      if (feuilletonRequired || f.series != null) {
        if (!isBilingual(f.series)) {
          errors.push(`${prefix} feuilleton.series : { fr, en } obligatoire`);
        }
      }
      if (feuilletonRequired || f.episode != null) {
        if (typeof f.episode !== 'number' || !Number.isInteger(f.episode) || f.episode < 1) {
          errors.push(`${prefix} feuilleton.episode : entier ≥ 1 obligatoire`);
        }
      }
      if (f.dek != null && !isBilingual(f.dek)) {
        errors.push(`${prefix} feuilleton.dek : { fr, en } attendu si présent`);
      }
      if (f.byline != null && !isBilingual(f.byline)) {
        errors.push(`${prefix} feuilleton.byline : { fr, en } attendu si présent`);
      }
      // Anti-régression lore caduc + ban entités réelles
      const blob = JSON.stringify(f);
      if (CADUC_LORE_RE.test(blob)) {
        errors.push(`${prefix} feuilleton : lore caduc détecté (Conglomérat/Fonderie/Gibberlink/@cuvee_42/…) — interdit`);
      }
      const realHit = blob.match(REAL_ENTITY_RE);
      if (realHit) {
        errors.push(`${prefix} feuilleton : entité réelle « ${realHit[1]} » — interdite (fiction pure)`);
      }
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
