// L'Agent & Le Quotidien - lint d'edition : style-guide.md -> verifications automatiques.
//
// Garde-fou contre la derive hebdo : verifie une edition.json contre les regles
// objectives de prompts/style-guide.md (fourchettes de mots par rubrique, verbes
// d'alarme interdits dans les titres, entites reelles, bilinguisme complet).
//
// Usage :
//   node scripts/lint-edition.mjs 2026-W22       # lint une edition
//   node scripts/lint-edition.mjs                # lint la derniere edition connue
//   node scripts/lint-edition.mjs --lengths W22  # ajoute les advisories de longueur
//   node scripts/lint-edition.mjs --strict W22   # WARN -> erreurs (exit 1)
//
// Philosophie : par defaut, on ne controle que les invariants a fort signal et
// faible faux-positif : ton (verbes d'alarme dans les titres), bilinguisme
// complet, entites reelles, rubriques presentes. Les fourchettes de mots de
// style-guide.md sont, a ce jour, desynchronisees des editions reelles (elles
// flaguent tout) -> reservees a `--lengths`, en advisory. `--strict` transforme
// les WARN en erreurs (exit 1) pour un usage CI.

import { readFileSync, readdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const STRICT = process.argv.includes('--strict');
const LENGTHS = STRICT || process.argv.includes('--lengths');

// --- Regles tirees de prompts/style-guide.md (table "Longueurs cibles") ---
// Chaque rubrique : fourchette [min,max] de mots, par langue. `title` = champ de
// titre (soumis au controle des verbes d'alarme, pas au comptage de mots).
const RUBRICS = [
    { path: 'lede.headline_html', label: 'Lede titre', title: true, fr: [8, 14], en: [6, 12] },
    { path: 'lede.dek', label: 'Lede dek', fr: [35, 55], en: [30, 50] },
    { path: 'lede.body', label: 'Lede corps', fr: [220, 280], en: [200, 260] },
    { each: 'breves', field: 'title', label: 'Breve titre', title: true },
    { each: 'breves', field: 'body', label: 'Breve', fr: [35, 55], en: [30, 50] },
    { each: 'headlines', field: 'title_html', label: 'Gros titre (titre)', title: true },
    { each: 'headlines', field: 'body', label: 'Gros titre', fr: [100, 140], en: [90, 130] },
    { path: 'tribune.headline_html', label: 'Tribune titre', title: true },
    { path: 'tribune.paragraphs', label: 'Tribune', fr: [280, 380], en: [260, 350] },
    { path: 'feature.headline_html', label: 'Feature titre', title: true, optional: true },
    { path: 'feature.paragraphs', label: 'Enquete', fr: [1500, 2500], en: [1400, 2300], optional: true },
    { path: 'enquete.paragraphs', label: 'Enquete', fr: [1500, 2500], en: [1400, 2300], optional: true },
    { each: 'wire', field: 'body', label: 'Depeche', fr: [35, 55], en: [30, 50] },
    { path: 'gibberlink.spread', label: 'Gibberlink Watch', fr: [150, 250], en: [140, 220], optional: true },
    { path: 'interview.exchanges', label: 'Interview', fr: [1200, 1800], en: [1100, 1700], joinField: 'text', optional: true },
];

// Verbes d'alarme / de combat interdits dans les titres (style-guide "Registre").
const BANNED_TITLE_PATTERNS = [
    /\bcasse\b/i, /s'effondre/i, /\bvacille\b/i, /\bexplose/i, /\bpanique/i,
    /\bripost/i, /les agents r[ée]pondent/i, /la guerre de/i, /\bs'effondrent\b/i,
];

// Entites reelles a ne jamais nommer (univers clos). Liste conservatrice : marques
// IA improbables comme noms fictionnels. WARN car un faux positif reste possible.
const REAL_ENTITIES = [
    /\bOpenAI\b/i, /\bAnthropic\b/i, /\bChatGPT\b/i, /\bGemini\b/i, /\bMistral\b/i,
    /\bLlama\b/i, /\bNvidia\b/i, /\bHugging ?Face\b/i, /\bDeepSeek\b/i, /\bGrok\b/i,
];

const errors = [];
const warns = [];
const err = (m) => errors.push(m);
const warn = (m) => (STRICT ? errors : warns).push(m);

// Resout un chemin pointe ("lede.headline_html") dans l'objet edition.
function getPath(obj, path) {
    return path.split('.').reduce((o, k) => (o == null ? o : o[k]), obj);
}

// Extrait le texte d'un noeud pour une langue donnee, quelle que soit sa forme :
// string, tableau de paragraphes, ou {fr,en}. Retire les balises HTML.
function extractText(node, lang) {
    if (node == null) return '';
    if (typeof node === 'string') return stripHtml(node);
    if (Array.isArray(node)) return node.map((n) => extractText(n, lang)).join(' ');
    if (typeof node === 'object') {
        if (lang in node) return extractText(node[lang], lang);
        // forme suffixee {text_fr, text_en} ou {fr,en} deja gere ci-dessus
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

// Verifie une rubrique-cible (un noeud + ses fourchettes) pour les deux langues.
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
                warn(`[longueur] ${where} [${lang}] : ${n} mots (cible ${range[0]}-${range[1]})`);
            }
        }
    }
}

function checkTitle(text, where) {
    for (const re of BANNED_TITLE_PATTERNS) {
        if (re.test(text)) warn(`[ton] ${where} : verbe d'alarme proscrit (${re.source}) -> "${text.trim().slice(0, 70)}"`);
    }
}

// Balaye toute l'edition a la recherche d'entites reelles nommees.
function checkRealEntities(edition) {
    const blob = JSON.stringify(edition);
    for (const re of REAL_ENTITIES) {
        const m = blob.match(re);
        if (m) warn(`[univers] entite reelle potentielle nommee : "${m[0]}" (univers clos : zero entite reelle)`);
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

    console.log(`Lint edition ${week}${STRICT ? ' (strict)' : ''}\n`);

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
    checkRealEntities(edition);

    for (const w of warns) console.log(`  WARN  ${w}`);
    for (const e of errors) console.log(`  ERR   ${e}`);

    console.log(`\n${errors.length} erreur(s), ${warns.length} avertissement(s).`);
    process.exit(errors.length ? 1 : 0);
}

main();
