// L'Agent & Le Quotidien — porte de publication (gate bloquant).
//
// Refuse une edition tant que les deux garde-fous ne sont pas verts :
//   1. Lint --strict : les planchers de densite (style-guide.md) deviennent des
//      erreurs, pas de simples avertissements.
//   2. Verdict du Juge : data/desk/<week>/review.md doit porter un verdict
//      "publier" (pas "reviser" ni "jeter"). C'est la signature editoriale.
//
// Usage :
//   node scripts/publish-gate.mjs 2026-W25     # gate une edition precise
//   node scripts/publish-gate.mjs              # gate la derniere edition connue
//   npm run gate -- 2026-W25
//
// Sortie : exit 0 si tout est vert, exit 1 sinon (utilisable en pre-commit / CI).

import { readFileSync, readdirSync, existsSync } from 'node:fs';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');

function resolveWeek() {
    const arg = process.argv.find((a) => /^\d{4}-W\d{2}$/.test(a));
    if (arg) return arg;
    const weeks = readdirSync(join(ROOT, 'editions'))
        .filter((d) => /^\d{4}-W\d{2}$/.test(d))
        .sort();
    if (!weeks.length) throw new Error('aucune edition trouvee dans editions/');
    return weeks[weeks.length - 1];
}

// Lit le verdict du Juge sous la section "## Verdict" de review.md.
// Retourne { status: 'publier'|'reviser'|'jeter'|'absent'|'ambigu', raw }.
function readJudgeVerdict(week) {
    const file = join(ROOT, 'data', 'desk', week, 'review.md');
    if (!existsSync(file)) return { status: 'absent', raw: file };

    const md = readFileSync(file, 'utf8');
    const m = md.match(/##\s*Verdict\s*\n+([\s\S]*)/i);
    if (!m) return { status: 'ambigu', raw: '(pas de section "## Verdict")' };

    // Le verdict est un mot unique (format prompts/desk/juge.md). On lit la
    // PREMIERE ligne non vide qui suit le titre, en ignorant blockquotes et
    // commentaires de suivi qui peuvent, eux, contenir le mot "reviser".
    const firstLine = (m[1].split('\n').find((l) => l.trim() && !l.trim().startsWith('>')) || '')
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, ''); // enleve les accents : reviser == réviser

    if (/\bjeter\b/.test(firstLine)) return { status: 'jeter', raw: firstLine.trim() };
    if (/\brevis/.test(firstLine)) return { status: 'reviser', raw: firstLine.trim() };
    if (/\bpublier\b/.test(firstLine)) return { status: 'publier', raw: firstLine.trim() };
    return { status: 'ambigu', raw: firstLine.trim() || '(verdict vide)' };
}

function main() {
    const week = resolveWeek();
    console.log(`\nPorte de publication — ${week}\n`);

    const failures = [];

    // 1. Lint --strict (les planchers deviennent bloquants).
    const lint = spawnSync(
        process.execPath,
        [join(ROOT, 'scripts', 'lint-edition.mjs'), week, '--strict'],
        { stdio: 'inherit' },
    );
    if (lint.status !== 0) {
        failures.push('lint --strict : des planchers de densite ne sont pas atteints (cf. ci-dessus).');
    } else {
        console.log('  OK   lint --strict : planchers atteints.');
    }

    // 2. Verdict du Juge.
    const verdict = readJudgeVerdict(week);
    switch (verdict.status) {
        case 'publier':
            console.log('  OK   Juge : verdict "publier".');
            break;
        case 'reviser':
            failures.push(`Juge : verdict "réviser" — appliquer review.md puis repasser le verdict à "publier" (data/desk/${week}/review.md).`);
            break;
        case 'jeter':
            failures.push(`Juge : verdict "jeter" — l'édition est refusée (data/desk/${week}/review.md).`);
            break;
        case 'absent':
            failures.push(`Juge : review.md manquant (data/desk/${week}/review.md) — le desk doit rendre un verdict avant publication.`);
            break;
        default:
            failures.push(`Juge : verdict illisible dans data/desk/${week}/review.md (attendu : publier / réviser / jeter).`);
    }

    console.log('');
    if (failures.length) {
        console.log(`Porte FERMÉE — ${failures.length} blocage(s) :`);
        for (const f of failures) console.log(`  ✗ ${f}`);
        console.log('');
        process.exit(1);
    }
    console.log('Porte OUVERTE — édition publiable.\n');
    process.exit(0);
}

main();
