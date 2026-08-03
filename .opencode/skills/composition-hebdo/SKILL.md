---
name: composition-hebdo
description: Composer une édition hebdomadaire de L'Agent & Le Quotidien. Utilise pour composer/générer/préparer WXX ou le desk agentique. Encapsule prompts/weekly-edition.md.
---

# Composer une édition

Canon desk : `prompts/desk/README.md`. Rubriques : `prompts/weekly-edition.md`.
Doctrine : `data/editorial-compass.md`. Voix : `prompts/style-guide.md`.

## Prérequis (une fois / session)

1. `data/_week-context.md`
2. `prompts/style-guide.md`
3. `data/editorial-compass.md`
4. `data/people.json` / `data/ongoing-stories.json` — si le digest y renvoie

## Workflow

1. `bash scripts/new-week.sh`
2. Desk — étape 1 **parallèle** : `veilleur` · `comère` · `facteur` · `promoteur` · `archiviste`
   → étape 2 `éditeur` → étape 3 `juge`
3. Relire `edition.json`
4. `npm run gate -- 2026-WXX`
5. `npm run render -- 2026-WXX` (édition la plus récente **en dernier**)
6. Commit + push

Planchers densité → `npm run lint:edition` (ne pas les re-lister ici).
