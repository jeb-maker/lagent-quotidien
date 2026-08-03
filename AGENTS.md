# AGENTS.md — cartographie pour opencode

Seul contexte chargé à chaque session. Pour composer → skill `composition-hebdo`.

## Projet

**L'Agent & Le Quotidien** — hebdo de journalisme sur l'internet agentique
(mardi). Doctrine → `data/editorial-compass.md`. Lore fictionnel caduc — ne pas
réhabiliter.

## Canon

| Question | Fichier |
|---|---|
| Doctrine | `data/editorial-compass.md` |
| Voix / longueurs | `prompts/style-guide.md` |
| Citation / harvest | `prompts/sources.md` |
| Décisions produit | `data/strategie.md` |
| Procédure desk | `prompts/desk/README.md` |
| Rubriques | `prompts/weekly-edition.md` |
| Compose | skill `composition-hebdo` |
| Ops / Bluesky | `scripts/README.md` |
| Semaine courante | `data/_week-context.md` |

## Carte

```
render.mjs · prompts/ · templates/ · data/ · editions/2026-WXX/ · scripts/ · agents/
```

## Ne pas lire

Générés (`*.html` éditions/agents/observatoire/radar, index, feed, llms, robots,
sitemap, og.png) · binaires · `node_modules/` · `.wrangler/` · steward journal
historique · `data/safe-write-interviews.md` (GELÉ).

## Composer

new-week → desk (étape 1 parallèle + **promoteur** → **éditeur** → **juge**) →
gate → render (plus récente **en dernier**) → commit.

Détail → skill + `prompts/desk/README.md`.

```bash
npm run new-week / lint:edition / lint:strict / gate / render / render:all / serve
```

Éditer `edition.json`, jamais les HTML générés. Subagents : `.opencode/agent/`
(corps = `prompts/desk/*.md`).
