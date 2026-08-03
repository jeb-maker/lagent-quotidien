# AGENTS.md — cartographie pour opencode

Ce fichier est le **seul** contexte qu'opencode charge à chaque session. Carte
courte : pour composer, déclenche la skill `composition-hebdo` (ne recrée pas
le workflow ici).

## Projet

**L'Agent & Le Quotidien** — hebdo bilingue (FR/EN) de journalisme sur
l'internet agentique. Mardi = nouveau numéro. Site pré-rendu, Cloudflare Pages.
Doctrine (depuis 2026-06-01) : **tout réel, sourcé**. Roman-à-clef / lore
fictionnel = **caducs** — ne jamais réhabiliter (`data/editorial-compass.md`).

## Canon (une vérité par question)

| Question | Fichier |
|---|---|
| Doctrine | `data/editorial-compass.md` |
| Voix / longueurs | `prompts/style-guide.md` |
| Citation / harvest | `prompts/sources.md` |
| Décisions produit | `data/strategie.md` |
| Procédure desk | `prompts/desk/README.md` |
| Rubriques édition | `prompts/weekly-edition.md` |
| Compose (checklist) | skill `composition-hebdo` |
| Ops / crons / Bluesky | `scripts/README.md` |
| Semaine courante | `data/_week-context.md` |

## Carte du repo

```
render.mjs            moteur de rendu (0 dépendance)
prompts/              cerveau éditorial + desk/
templates/            edition.html + .css
data/                 people, ongoing-stories, compass, harvest, desk/<week>/
editions/2026-WXX/    edition.json → fr/en.html · notes.md
scripts/              new-week · harvest · gate · lint · cron
agents/               GÉNÉRÉS depuis people.json
```

## 🔴 Ne jamais lire (sauf demande explicite)

- **Générés** : `index.html`, `_headers`, `_redirects`, `robots.txt`, `sitemap.xml`,
  `llms.txt`, `ai.txt`, `feed.xml`, `og.png`, `agents/*.html`,
  `editions/*/{fr,en}.html`, `observatoire/*.html`, `radar/*.html`.
- **Binaire** : `og.png`, `public/*.png`.
- **Bruit** : `node_modules/`, `.wrangler/`.
- **STALE / one-shot** : journal de bord long dans `prompts/steward.md` ;
  `data/safe-write-interviews.md` (design non implémenté).
- **Lore caduc (anti-régression)** : Conglomérat/Fonderie, presse maison,
  `@cuvee_42`/`@poet_void_99` comme voix du journal, entretiens reconstitués,
  Gibberlink, marché inventé. Voix publiée = **« La rédaction »**.

## Composer

→ skill `composition-hebdo` · détail desk → `prompts/desk/README.md`

Résumé : new-week → desk (étape 1 parallèle incl. **promoteur** → **éditeur** →
**juge**) → gate → render (édition la plus récente **en dernier**) → commit.

```bash
npm run new-week / lint:edition / lint:strict / gate / render / render:all / serve
```

Hook : `git config core.hooksPath scripts/hooks`

## Conventions

- Éditer `edition.json`, jamais les HTML générés.
- Sources dans `editions/<week>/notes.md` — pas « Source : … » dans le publié.
- Ratio 60/40 · ≥ 3 scènes · ≥ 5 fragments · pas de fait négatif inventé.

## Subagents

Neuf dans `.opencode/agent/` — corps des rôles = `prompts/desk/*.md`.
Narrative Radar (optionnel) : `detecteur` → `avocat-du-diable` ; harvest =
`scripts/harvest-narratives.mjs` → `data/narrative-radar/`.
