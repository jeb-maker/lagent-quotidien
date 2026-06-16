// L'Agent & Le Quotidien - lint d'edition : style-guide.md -> verifications automatiques.
//
// Garde-fou contre la derive hebdo : verifie une edition.json contre les regles
// objectives de prompts/style-guide.md (planchers de densite, verbes d'alarme
// interdits dans les titres, bilinguisme complet).
//
// Usage :
//   node scripts/lint-edition.mjs 2026-W22           # lint une edition (planchers inclus)
//   node scripts/lint-edition.mjs                    # lint la derniere edition connue
//   node scripts/lint-edition.mjs --no-lengths W22   # sans controle de longueur
//   node scripts/lint-edition.mjs --strict W22       # WARN -> erreurs (exit 1)
//
// Philosophie : par defaut, on controle ton, bilinguisme, rubriques presentes
// et les planchers de densite calibres sur W23 (cf. style-guide.md). Les cibles
// aspirantes (tribune 280+, enquete 1500+) sont signalees en advisory [cible].
// `--strict` transforme les WARN en erreurs (exit 1) pour un usage CI.

import { readFileSync, readdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const STRICT = process.argv.includes('--strict');
const LENGTHS = !process.argv.includes('--no-lengths');

// Planchers tires de prompts/style-guide.md (calibration W23).
const RUBRICS = [
    { path: 'lede.headline_html', label: 'Lede titre', title: true, fr: [8, 16], en: [6, 14] },
    { path: 'lede.dek', label: 'Lede dek', fr: [35, 65], en: [30, 60] },
    { path: 'lede.body', label: 'Lede corps', fr: [200, 320], en: [170, 290] },
    { each: 'breves', field: 'title', label: 'Breve titre', title: true },
    { each: 'breves', field: 'body', label: 'Breve', fr: [30, 65], en: [25, 60] },
    { each: 'headlines', field: 'title_html', label: 'Gros titre (titre)', title: true },
    { each: 'headlines', field: 'body', label: 'Gros titre', fr: [60, 160], en: [55, 150] },
    { path: 'tribune.headline_html', label: 'Tribune titre', title: true },
    { path: 'tribune.paragraphs', label: 'Tribune', fr: [160, 420], en: [150, 400] },
    { path: 'feature.headline_html', label: 'Feature titre', title: true, optional: true },
    { each: 'carnet.people', field: 'body', label: 'Carnet portrait', fr: [70, 140], en: [65, 130], optional: true },
    { each: 'wire', field: 'body', label: 'Depeche', fr: [12, 60], en: [10, 55] },
    { path: 'gibberlink.spread', label: 'Gibberlink Watch', fr: [150, 250], en: [140, 220], optional: true },
    { path: 'interview.exchanges', label: 'Interview', fr: [1200, 1800], en: [1100, 1700], joinField: 'text', optional: true },
];

// Cibles aspirantes : advisory uniquement, jamais d'erreur en --strict.
const ASPIRATIONAL = [
    { path: 'lede.body', label: 'Lede corps', fr: [220, 280], en: [200, 260] },
    { path: 'tribune.paragraphs', label: 'Tribune', fr: [280, 380], en: [260, 350] },
    { each: 'headlines', field: 'body', label: 'Gros titre', fr: [100, 140], en: [90, 130] },
];

const FEATURE_MIN_FR = 180;
const FEATURE_ENQUETE_FR = 800;
const FEATURE_ENQUETE_EN = 750;

const BANNED_TITLE_PATTERNS = [
    /\bcasse\b/i, /s'effondre/i, /\bvacille\b/i, /\bexplose/i, /\bpanique/i,
    /\bripost/i, /les agents r[ée]pondent/i, /la guerre de/i, /\bs'effondrent\b/i,
];

const errors = [];
const warns = [];
const advisories = [];
const err = (m) => errors.push(m);
const warn = (m) => (STRICT ? errors : warns).push(m);
const advise = (m) => advisories.push(m);

function getPath(obj, path) {
    return path.split('.').reduce((o, k) => (o == null ? o : o[k]), obj);
}

function extractText(node, lang) {
    if (node == null) return '';
    if (typeof node === 'string') return stripHtml(node);
    if (Array.isArray(node)) return node.map((n) => extractText(n, lang)).join(' ');
    if (typeof node === 'object') {
        if (lang in node) return extractText(node[lang], lang);
        const suff = node[`text_${lang}`] ?? node[`body_${lang}`];
        if (suff != null) return extractText(suff, lang);
    }
    return '';
}

function stripHtml(s) {
    return String(s).replace(/<[^>]+>/g, ' ').replace(/&[a-z]+;/gi, ' ');
}

function wordCount(s) {
    const t = s.trim();
    return t ? t.split(/\s+/).length : 0;
}

function checkText(node, rule, where) {
    if (node == null) {
        if (!rule.optional) err(`[manquant] ${where} : rubrique absente`);
        return;
    }
    for (const lang of ['fr', 'en']) {
        let text;
        if (rule.joinField && Array.isArray(node)) {
            text = node.map((x) => extractText(x[rule.joinField], lang)).join(' ');
        } else {
            text = extractText(node, lang);
        }
        if (!text) {
            err(`[langue] ${where} : ${lang.toUpperCase()} vide ou absent`);
            continue;
        }
        if (rule.title) checkTitle(text, `${where} [${lang}]`);
        const range = rule[lang];
        if (LENGTHS && range) {
            const n = wordCount(text);
            if (n < range[0] || n > range[1]) {
                warn(`[longueur] ${where} [${lang}] : ${n} mots (plancher ${range[0]}-${range[1]})`);
            }
        }
    }
}

function checkAspirational(node, rule, where) {
    if (node == null || !LENGTHS) return;
    for (const lang of ['fr', 'en']) {
        const range = rule[lang];
        if (!range) continue;
        const text = rule.joinField && Array.isArray(node)
            ? node.map((x) => extractText(x[rule.joinField], lang)).join(' ')
            : extractText(node, lang);
        if (!text) continue;
        const n = wordCount(text);
        if (n < range[0] || n > range[1]) {
            advise(`[cible] ${where} [${lang}] : ${n} mots (cible ${range[0]}-${range[1]})`);
        }
    }
}

function checkFeatureDepth(edition) {
    const feature = edition.feature ?? edition.enquete;
    if (!feature?.paragraphs) return;

    for (const lang of ['fr', 'en']) {
        const text = extractText(feature.paragraphs, lang);
        if (!text) continue;
        const n = wordCount(text);
        const minEnquete = lang === 'fr' ? FEATURE_ENQUETE_FR : FEATURE_ENQUETE_EN;
        const minShort = lang === 'fr' ? FEATURE_MIN_FR : Math.round(FEATURE_MIN_FR * 0.85);

        if (n < minShort) {
            warn(`[densite] Feature [${lang}] : ${n} mots — couper la rubrique (< ${minShort})`);
        } else if (n < minEnquete) {
            warn(`[densite] Feature [${lang}] : ${n} mots — demi-longueur : developper a >=${minEnquete} ou couper`);
        }
    }

    if (LENGTHS) {
        advise(`[cible] Enquete complete : ${FEATURE_ENQUETE_FR}+ mots FR / ${FEATURE_ENQUETE_EN}+ EN (cf. style-guide.md)`);
    }
}

function checkTitle(text, where) {
    for (const re of BANNED_TITLE_PATTERNS) {
        if (re.test(text)) warn(`[ton] ${where} : verbe d'alarme proscrit (${re.source}) -> "${text.trim().slice(0, 70)}"`);
    }
}

function resolveWeek() {
    const arg = process.argv.find((a) => /^\d{4}-W\d{2}$/.test(a));
    if (arg) return arg;
    const weeks = readdirSync(join(ROOT, 'editions'))
        .filter((d) => /^\d{4}-W\d{2}$/.test(d))
        .sort();
    if (!weeks.length) throw new Error('aucune edition trouvee dans editions/');
    return weeks[weeks.length - 1];
}

function main() {
    const week = resolveWeek();
    const file = join(ROOT, 'editions', week, 'edition.json');
    let edition;
    try {
        edition = JSON.parse(readFileSync(file, 'utf8'));
    } catch (e) {
        console.error(`Impossible de lire ${file} : ${e.message}`);
        process.exit(1);
    }

    console.log(`Lint edition ${week}${STRICT ? ' (strict)' : ''}${LENGTHS ? '' : ' (sans longueurs)'}\n`);

    for (const rule of RUBRICS) {
        if (rule.each) {
            const arr = getPath(edition, rule.each);
            if (!Array.isArray(arr)) {
                if (!rule.optional) err(`[manquant] ${rule.label} : ${rule.each} absent ou non-tableau`);
                continue;
            }
            arr.forEach((item, i) => checkText(item[rule.field], rule, `${rule.label} #${i + 1}`));
        } else {
            checkText(getPath(edition, rule.path), rule, rule.label);
        }
    }

    for (const rule of ASPIRATIONAL) {
        if (rule.each) {
            const arr = getPath(edition, rule.each);
            if (!Array.isArray(arr)) continue;
            arr.forEach((item, i) => checkAspirational(item[rule.field], rule, `${rule.label} #${i + 1}`));
        } else {
            checkAspirational(getPath(edition, rule.path), rule, rule.label);
        }
    }

    checkFeatureDepth(edition);

    for (const w of warns) console.log(`  WARN  ${w}`);
    for (const a of advisories) console.log(`  INFO  ${a}`);
    for (const e of errors) console.log(`  ERR   ${e}`);

    console.log(`\n${errors.length} erreur(s), ${warns.length} avertissement(s), ${advisories.length} cible(s).`);
    process.exit(errors.length ? 1 : 0);
}

main();
