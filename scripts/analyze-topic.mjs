#!/usr/bin/env node
// scripts/analyze-topic.mjs
// Orchestrateur pour l'atelier d'analyse multi-perspectives.
// Cf. prompts/analyze-topic.md pour la méthode complète.
//
// Usage :
//   node scripts/analyze-topic.mjs "<sujet>" [--angles N] [--date YYYY-MM-DD]
//
// Crée data/analyses/<slug>-<date>/ avec :
//   - topic.json    (sujet, date, nombre d'angles, statut)
//   - angles.md     (vide — à remplir à l'étape 1)
//   - findings/     (dossier vide — rempli par les mineurs à l'étape 2)
//   - synthesis.md  (vide — rempli à l'étape 3)
//   - bibliography.md (vide — rempli à l'étape 4)
//
// L'orchestration des subagents (étapes 1-3) est faite par l'opérateur (opencode
// ou équivalent) en suivant prompts/analyze-topic.md. Ce script ne fait que
// préparer la structure et l'index.

import { mkdirSync, writeFileSync, existsSync } from "node:fs";
import { join } from "node:path";

const args = process.argv.slice(2);
if (args.length === 0 || args.includes("-h") || args.includes("--help")) {
  console.error(
    'Usage: node scripts/analyze-topic.mjs "<sujet>" [--angles N] [--date YYYY-MM-DD]'
  );
  process.exit(args.length === 0 ? 1 : 0);
}

let topic = null;
let anglesCount = 10;
let date = new Date().toISOString().slice(0, 10);

for (let i = 0; i < args.length; i++) {
  const a = args[i];
  if (a === "--angles") anglesCount = parseInt(args[++i], 10);
  else if (a === "--date") date = args[++i];
  else if (!topic) topic = a;
  else throw new Error(`argument inattendu : ${a}`);
}
if (!topic) throw new Error("sujet manquant");

// Slug : ASCII, kebab-case, max 40 chars
const slug =
  topic
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 40) || "sujet";

const dir = join("data", "analyses", `${slug}-${date}`);
if (existsSync(dir)) {
  console.error(`Erreur : ${dir} existe déjà. Change de date ou supprime le dossier.`);
  process.exit(1);
}

mkdirSync(join(dir, "findings"), { recursive: true });

writeFileSync(
  join(dir, "topic.json"),
  JSON.stringify(
    {
      topic,
      slug,
      date,
      angles_count: anglesCount,
      status: "angles-pending",
      created_at: new Date().toISOString(),
    },
    null,
    2
  ) + "\n"
);

const header = `# ${topic}

> Atelier d'analyse multi-perspectives — ${date}
> Méthode : \`prompts/analyze-topic.md\` · Angles : ${anglesCount}
> Statut : angles-pending (à générer à l'étape 1)

## Angles disciplinaires

<!-- Remplir à l'étape 1 : ${anglesCount} angles au format suivant —
## 01. <intitulé court>
- **Discipline** :
- **Question de recherche** :
- **Mots-clés** : (3-7, dont au moins 1 en anglais)
- **Type de sources attendues** :
-->
`;

writeFileSync(join(dir, "angles.md"), header);
writeFileSync(
  join(dir, "synthesis.md"),
  `# Synthèse — ${topic}\n\n<!-- Rempli à l'étape 3 par le subagent synthétiseur.\nReçoit les ${anglesCount} rapports d'angle dans findings/. -->\n`
);
writeFileSync(
  join(dir, "bibliography.md"),
  `# Bibliographie — ${topic}\n\n<!-- Rempli à l'étape 4. Tri par niveau de preuve, puis par angle. -->\n`
);

console.log(`✓ Atelier créé : ${dir}`);
console.log(`  Sujet        : ${topic}`);
console.log(`  Angles       : ${anglesCount}`);
console.log(`  Date         : ${date}`);
console.log("");
console.log("Prochaine étape : générer les angles dans angles.md (étape 1),");
console.log("puis lancer 1 subagent general par angle (étape 2, parallèle).");
