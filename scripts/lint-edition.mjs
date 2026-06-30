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
import { validateEditionSchema } from './validate-edition-schema.mjs';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const STRICT = process.argv.includes('--strict');
const LENGTHS = !process.argv.includes('--no-lengths');

// Planchers tires de prompts/style-guide.md (calibration W23).
const RUBRICS = [
    { path: 'lede.headline_html', label: 'Lede titre', title: true, fr: [8, 16], en: [6, 14] },
    { path: 'lede.dek', label: 'Lede dek', fr: [35, 65], en: [30, 60] },
    { path: 'lede.body', label: 'Lede corps', fr: [200, 320], en: [170, 290] },
    { each: 'headlines', field: 'title_html', label: 'Gros titre (titre)', title: true },
    { each: 'headlines', field: 'body', label: 'Gros titre', fr: [60, 160], en: [55, 150] },
    { path: 'tribune.headline_html', label: 'Tribune titre', title: true },
    { path: 'tribune.paragraphs', label: 'Tribune', fr: [160, 420], en: [150, 400] },
    { path: 'feature.headline_html', label: 'Feature titre', title: true, optional: true },
    { each: 'carnet.people', field: 'body', label: 'Carnet portrait', fr: [70, 140], en: [65, 130], optional: true },
    { each: 'wire', field: 'body', label: 'Depeche', fr: [12, 60], en: [10, 55] },
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

// ───── Redondance lexicale (style-guide.md §Anti-redondance) ─────

const STOPWORDS = new Set([
    // FR
    'le','la','les','un','une','des','de','du','dans','sur','pour','par','avec','sans','est','sont','et','ou','mais','ne','pas','plus','moins','qui','que','quoi','dont','où','ce','cette','ces','son','sa','ses','au','aux','se','se','on','en','y','il','elle','ils','elles','nous','vous','je','tu','comme','si','alors','quand','car','donc','or','ni','or','leur','leurs','lui','elle','depuis','vers','entre','jusqu','tout','tous','toute','toutes','meme','même','etre','être','avoir','fait','faire','dit','dire','apr','après','avant','aussi','bien','tres','très','peut','peuvent','dont','lequel','laquelle','auxquels','etc',
    // EN
    'the','a','an','and','or','but','is','are','was','were','be','been','being','have','has','had','do','does','did','will','would','could','should','may','might','must','shall','can','need','in','on','at','to','for','of','with','by','from','up','about','into','through','during','before','after','above','below','between','under','over','again','further','then','once','here','there','when','where','why','how','all','each','every','both','few','more','most','other','some','such','no','nor','not','only','own','same','so','than','too','very','this','that','these','those','i','you','he','she','it','we','they','them','his','her','its','our','your','their','what','which','who','whom','as','if','because','while','also','has','had','been','one','two','has','had',
]);

function significantWords(text) {
    const words = String(text || '').toLowerCase()
        .replace(/<[^>]+>/g, ' ')
        .replace(/&[a-z]+;/gi, ' ')
        .split(/[^a-zà-ÿ0-9_-]+/i)
        .filter(w => w.length >= 3 && !STOPWORDS.has(w));
    return new Set(words);
}

function jaccardSimilarity(setA, setB) {
    if (!setA.size || !setB.size) return 0;
    let intersection = 0;
    for (const w of setA) if (setB.has(w)) intersection++;
    const union = setA.size + setB.size - intersection;
    return intersection / union;
}

function checkRedundancy(edition) {
    const ledeText = extractText(edition.lede?.body, 'fr');
    const ledeWords = significantWords(ledeText);

    // Lede ↔ Headlines
    if (ledeWords.size && Array.isArray(edition.headlines)) {
        edition.headlines.forEach((h, i) => {
            const hWords = significantWords(extractText(h.body, 'fr'));
            const sim = jaccardSimilarity(ledeWords, hWords);
            if (sim >= 0.40) {
                warn(`[redondance] Gros titre #${i + 1} partage ${Math.round(sim * 100)}% de mots-signifiants avec le lede — probable doublon`);
            }
        });
    }

    // Feature ↔ Lede+Headlines
    const feature = edition.feature ?? edition.enquete;
    if (feature?.paragraphs) {
        const featText = extractText(feature.paragraphs, 'fr');
        const featWords = significantWords(featText);
        const featCount = wordCount(featText);

        if (featCount >= FEATURE_MIN_FR && featCount < FEATURE_ENQUETE_FR) {
            // Demi-longueur : vérifier si le feature apporte des faits nouveaux
            const knownWords = new Set([...ledeWords]);
            if (Array.isArray(edition.headlines)) {
                for (const h of edition.headlines) {
                    for (const w of significantWords(extractText(h.body, 'fr'))) knownWords.add(w);
                }
            }
            // Extraire les noms propres du feature (mots commençant par une majuscule)
            const properNouns = new Set(
                String(featText).match(/\b[A-Z][a-zà-ÿ]{2,}/g) || []
            );
            let newNames = 0;
            for (const name of properNouns) {
                if (!knownWords.has(name.toLowerCase())) newNames++;
            }
            if (newNames < 2) {
                warn(`[feature] Demi-longueur (${featCount} mots) sans fait nouveau (noms propres absents du lede+headlines) — couper ou développer`);
            }
        }
    }

    // Tribune ↔ Headlines
    if (edition.tribune?.paragraphs && Array.isArray(edition.headlines)) {
        const tribText = extractText(edition.tribune.paragraphs, 'fr');
        const tribWords = significantWords(tribText);
        edition.headlines.forEach((h, i) => {
            const hWords = significantWords(extractText(h.body, 'fr'));
            const sim = jaccardSimilarity(tribWords, hWords);
            if (sim >= 0.45) {
                warn(`[redondance] Tribune partage ${Math.round(sim * 100)}% de mots-signifiants avec le gros titre #${i + 1} — reformulation au lieu de prise de parti`);
            }
        });
    }
}

// ───── Rotation Carnet (style-guide.md §Règle Carnet) ─────

// ───── Headlines : plafond ≤2 (audit diet 2026-06-30) ─────

function checkHeadlinesCount(edition) {
    if (!Array.isArray(edition.headlines)) return;
    if (edition.headlines.length > 2) {
        advise(`[headlines] ${edition.headlines.length} gros titres — plafond recommandé 2 (audit diet).`);
    }
}

// ───── Lede ≠ Feature : divergence thématique (audit diet 2026-06-30) ─────

function checkLedeFeatureDivergence(edition) {
    const ledeBody = extractText(edition.lede?.body, 'fr');
    const feature = edition.feature;
    if (!ledeBody || !feature?.paragraphs) return;

    const ledeWords = significantWords(ledeBody);
    const featText = extractText(feature.paragraphs, 'fr');
    const featWords = significantWords(featText);

    if (!ledeWords.size || !featWords.size) return;

    const sim = jaccardSimilarity(ledeWords, featWords);
    if (sim >= 0.50) {
        warn(`[lede↔feature] Jaccard ${Math.round(sim * 100)}% — le lede cannibalise le feature. Diverger le sujet ou alléger le corps du lede.`);
    }
}

function checkCarnetRotation(edition, week) {
    if (!edition.carnet?.people) return;

    // Trouver la semaine précédente
    const weekMatch = week.match(/^(\d{4})-W(\d{2})$/);
    if (!weekMatch) return;
    const year = parseInt(weekMatch[1], 10);
    let wNum = parseInt(weekMatch[2], 10) - 1;
    let prevYear = year;
    if (wNum < 1) { wNum = 52; prevYear = year - 1; }
    const prevWeek = `${prevYear}-W${String(wNum).padStart(2, '0')}`;

    let prevEdition;
    try {
        prevEdition = JSON.parse(readFileSync(join(ROOT, 'editions', prevWeek, 'edition.json'), 'utf8'));
    } catch {
        return; // pas d'édition précédente
    }

    const prevNames = new Set();
    if (prevEdition.carnet?.people) {
        for (const p of prevEdition.carnet.people) {
            const name = p.display_name || p.name || p.handle;
            if (name) prevNames.add(String(name).toLowerCase());
        }
    }

    for (const p of edition.carnet.people) {
        const name = p.display_name || p.name || p.handle;
        if (name && prevNames.has(String(name).toLowerCase())) {
            warn(`[carnet] "${name}" déjà portrait la semaine précédente (${prevWeek}) — vérifier qu'il y a un fait nouveau daté`);
        }
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

    for (const e of validateEditionSchema(edition, week)) err(e);

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
    checkRedundancy(edition);
    checkHeadlinesCount(edition);
    checkLedeFeatureDivergence(edition);
    checkCarnetRotation(edition, week);

    for (const w of warns) console.log(`  WARN  ${w}`);
    for (const a of advisories) console.log(`  INFO  ${a}`);
    for (const e of errors) console.log(`  ERR   ${e}`);

    console.log(`\n${errors.length} erreur(s), ${warns.length} avertissement(s), ${advisories.length} cible(s).`);
    process.exit(errors.length ? 1 : 0);
}

main();
