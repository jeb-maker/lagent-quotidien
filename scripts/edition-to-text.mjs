// L'Agent & Le Quotidien - rend une edition.json en texte lisible, rubrique par
// rubrique, pour une langue donnee. Sert a alimenter le contexte du juge
// editorial (prompts/judge-edition.md) : deux editions en texte brut, comparables.
//
// Usage :
//   node scripts/edition-to-text.mjs 2026-W22         # FR (defaut)
//   node scripts/edition-to-text.mjs 2026-W22 en      # EN
//
// Zero dependance. Sortie sur stdout.

import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const week = process.argv.find((a) => /^\d{4}-W\d{2}$/.test(a));
const lang = process.argv.includes('en') ? 'en' : 'fr';

if (!week) {
    console.error('Usage : node scripts/edition-to-text.mjs <YYYY-WXX> [fr|en]');
    process.exit(1);
}

// Extrait le texte d'un noeud pour une langue, quelle que soit sa forme
// (string, tableau, {fr,en}, {text_fr,text_en}). Retire le HTML.
function txt(node, l = lang) {
    if (node == null) return '';
    if (typeof node === 'string') return node.replace(/<[^>]+>/g, '').replace(/&[a-z]+;/gi, ' ').trim();
    if (Array.isArray(node)) return node.map((n) => txt(n, l)).filter(Boolean).join('\n\n');
    if (typeof node === 'object') {
        if (l in node) return txt(node[l], l);
        if (`text_${l}` in node) return txt(node[`text_${l}`], l);
    }
    return '';
}

const out = [];
const section = (title, body) => {
    const b = (body || '').trim();
    if (b) out.push(`\n### ${title}\n${b}`);
};

const e = JSON.parse(readFileSync(join(ROOT, 'editions', week, 'edition.json'), 'utf8'));

out.push(`# Edition ${week} (${lang.toUpperCase()}) - n°${e._meta?.edition_number ?? '?'}`);
if (e._meta?.editor_notes) out.push(`\nNote de la redaction : ${e._meta.editor_notes}`);

section('Lede - titre', txt(e.lede?.headline_html));
section('Lede - dek', txt(e.lede?.dek));
section('Lede - corps', txt(e.lede?.body));

(e.breves || []).forEach((b, i) => section(`Breve ${i + 1}`, `${txt(b.title)}\n${txt(b.body)}`));
(e.headlines || []).forEach((h, i) => section(`Gros titre ${i + 1}`, `${txt(h.title_html)}\n${txt(h.body)}`));

section('Carnet', txt(e.carnet?.people));
section('Interview - titre', txt(e.interview?.headline));
section('Interview', (e.interview?.exchanges || []).map((x) => `${txt(x.speaker_fr || x.speaker, lang)} : ${txt(x.text)}`).join('\n'));
section('Gibberlink Watch', `${txt(e.gibberlink?.term)} - ${txt(e.gibberlink?.spread)}`);
section('Feature - titre', txt(e.feature?.headline_html));
section('Feature', txt(e.feature?.paragraphs));
section('Enquete', txt(e.enquete?.paragraphs));
(e.wire || []).forEach((w, i) => section(`Depeche ${i + 1}`, `${txt(w.title)}\n${txt(w.body)}`));
section('Tribune - titre', txt(e.tribune?.headline_html));
section('Tribune', txt(e.tribune?.paragraphs));

console.log(out.join('\n'));
