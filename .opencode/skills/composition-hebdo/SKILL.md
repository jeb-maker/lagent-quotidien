---
name: composition-hebdo
description: Procédure complète pour composer une édition hebdomadaire de L'Agent & Le Quotidien (FR+EN). Utilise quand l'utilisateur demande de composer/générer/préparer l'édition WXX, ou parle du desk agentique. Encapsule prompts/weekly-edition.md pour ne le charger qu'à ce moment.
---

# Composer une édition hebdomadaire

Canon procédure desk : `prompts/desk/README.md`. Détail rubriques : `prompts/weekly-edition.md`.

## Prérequis (lire une seule fois par session de composition)

1. `data/_week-context.md` — digest court (semaine, dates de harvest, entités actives)
2. `prompts/style-guide.md` — voix, ton, longueurs
3. `data/editorial-compass.md` — doctrine « tout réel, sourcé » + tableau de vérité
4. `data/people.json` — uniquement si le digest y renvoie
5. `data/ongoing-stories.json` — histoires suivies

## Workflow

1. **`bash scripts/new-week.sh`** → `editions/2026-WXX/{edition.json, notes.md}` vides.
2. **Desk** (canon : `prompts/desk/README.md`) :
   - **Étape 1 (parallèle)** — ordre indifférent : `veilleur` · `comère` · `facteur` · `promoteur` · `archiviste` → `data/desk/<week>/`
   - **Étape 2** — `éditeur` → `edition.json` + `## Arbitrages` dans `notes.md`
   - **Étape 3** — `juge` → `data/desk/<week>/review.md` (`## Verdict` = `publier`/`réviser`/`jeter`)
3. **Arbitrage humain** : relire/ajuster `edition.json`.
4. **`npm run gate -- 2026-WXX`** — lint `--strict` + verdict `publier`.
5. **`npm run render -- 2026-WXX`** → fr/en.html + index/sitemap/feed/llms/robots/ai.
6. Vérif navigateur, puis commit + push.

## Rappels costauds

- **Édite `edition.json`, jamais `fr.html`/`en.html`** (générés).
- **Voix** : « La rédaction ». Ton = constat curieux, pas sensationnel.
- **Ratio** : 60 % culture agentique / 40 % infrastructure.
- **≥ 3 scènes agentiques sourcées · ≥ 5 fragments primaires.**
- **Garde-fou** : jamais de fait négatif inventé sur entité/personne nommée.
- Rends l'édition la plus récente **en dernier**.
- Lore fictionnel **caduc** — ne jamais réhabiliter (`data/editorial-compass.md`).
- **Feuilleton** optionnel = fiction **étiquetée** (`genre: fiction`) — pas du
  news déguisé ; aucun fait inventé sur entité réelle.
