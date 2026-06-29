---
name: composition-hebdo
description: Procédure complète pour composer une édition hebdomadaire de L'Agent & Le Quotidien (FR+EN). Utilise quand l'utilisateur demande de composer/générer/préparer l'édition WXX, ou parle du desk agentique. Encapsule prompts/weekly-edition.md pour ne le charger qu'à ce moment.
---

# Composer une édition hebdomadaire

Procédure détaillée : `prompts/weekly-edition.md`. Voici le résumé exécutable.

## Prérequis (lire une seule fois par session de composition)

1. `data/_week-context.md` — digest court (semaine, dates de harvest, entités actives)
2. `prompts/style-guide.md` — voix, ton, longueurs
3. `data/editorial-compass.md` — doctrine « tout réel, sourcé » + tableau de vérité
4. `data/people.json` — annuaire réel (uniquement si le digest y renvoie)
5. `data/ongoing-stories.json` — histoires suivies

## Workflow

1. **`bash scripts/new-week.sh`** → crée `editions/2026-WXX/{edition.json, notes.md}` vides.
2. **Desk agentique obligatoire** (un subagent Task à la fois, dans l'ordre) :
   `veilleur` → `comère` → `facteur` → `archiviste` → `éditeur` → `juge`.
   Les 5 premiers écrivent dans `data/desk/<week>/`. L'éditeur compose `edition.json`.
3. **Arbitrage humain** : relire/ajuster `edition.json` (densité, coupes, scènes).
4. **Juge** → `data/desk/<week>/review.md` (section `## Verdict` = `publier`/`réviser`/`jeter`).
5. **Porte bloquante** : `npm run gate -- 2026-WXX` (lint `--strict` + verdict `publier`).
6. **Rendu** : `npm run render -- 2026-WXX` → `fr/en.html` + index/sitemap/feed/llms/robots/ai.
7. Vérif navigateur (`npm run serve`), puis `git add . && git commit -m "Édition WXX" && git push`.

## Rappels costauds

- **Édite `edition.json`, jamais `fr.html`/`en.html`** (générés par `render.mjs`).
- **Voix** : « La rédaction ». Ton = constat curieux, pas sensationnel.
- **Ratio** : 60 % culture agentique / 40 % infrastructure.
- **≥ 3 scènes agentiques sourcées. ≥ 5 fragments primaires** (citation/handle/fichier/chiffre daté).
- **Garde-fou diffamation** : jamais de fait négatif inventé sur entité/personne nommée.
  Réel nommé → faits vrais sourcés. Un faux se retire, il ne se masque pas.
- Rends l'édition la plus récente **en dernier** (render régénère `index.html`).

## Modèle différentiel (économiser des tokens)

Pour économiser, fixe un modèle *cheap* sur les agents de notes (`veilleur`,
`comère`, `archiviste`) via `model:` dans leur frontmatter. Garde le modèle fort
sur `éditeur` et `juge` (composition et verdict en dépendent).
