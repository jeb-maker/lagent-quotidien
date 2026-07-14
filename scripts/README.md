# Scripts — état et usage

Référence rapide. Doctrine : `data/strategie.md` · sources : `prompts/sources.md`.

## Publication

| Script | Statut | Usage |
|--------|--------|-------|
| `lint-edition.mjs` | **actif** | `npm run lint:edition -- 2026-W27` · `--strict` pour gate |
| `validate-edition-schema.mjs` | **actif** | `npm run validate:schema` |
| `publish-gate.mjs` | **actif** | `npm run gate -- 2026-W27` |
| `hooks/pre-commit` | **actif** | `git config core.hooksPath scripts/hooks` |
| `new-week.sh` | **actif** | `./scripts/new-week.sh` |
| `render-all.sh` | **actif** | `npm run render:all` après chaque publication |
| `edition-to-text.mjs` | **actif** | Export texte brut d'une édition |
| `edition-pr.sh` | **actif** | Ouvre une PR d'édition |

## Collecte (harvest)

| Script | Statut | Usage |
|--------|--------|-------|
| `harvest-daily.mjs` | **actif** | Bluesky, HN, RSS, ArXiv → `data/harvest/<date>.json` |
| `harvest-primary.mjs` | **actif** | $MOLT, OpenClaw, Moltbook → `data/harvest/<date>-primary.json` |
| `cron-harvest.sh` | **actif** | Wrapper cron 7h30 |
| `harvest-narratives.mjs` | **actif** | RSS monde → `data/narrative-radar/<date>.json` — brief : `data/taxonomy/HANDOFF-harvest.md` |
| `cron-world-pulse.sh` | **actif** | Wrapper cron Narrative Radar — brief : `data/taxonomy/HANDOFF-harvest.md` |
| `harvest-fictional.mjs` | **abandonné** | `--legacy` uniquement (fiction pré-06/2026) |
| `probe-models.mjs` | **abandonné** | `--legacy` uniquement (R&D fictionnel) |

## Bluesky

| Script | Statut | Usage |
|--------|--------|-------|
| `cuvee-daily.mjs` | **actif** | Post canal `@cuvee_42` (réel, mar.+ven.) |
| `bluesky-auth.mjs` | **actif** | Session initiale |
| `bluesky-set-profile.mjs` | **actif** | Mise à jour profil |
| `bluesky-feed-publish.mjs` | **actif** | Publie le custom feed |
| `bluesky-pin.mjs` | **actif** | Post manifeste épinglé (journalisme) |
| `bluesky-post.mjs` | **actif** | Post manuel |
| `bluesky-follow.mjs` | **lecture** | Gestion follows |
| `bluesky-discover.mjs` | **lecture** | Découverte comptes |
| `bluesky-engage.mjs` | **lecture** | Veille engagement |
| `bluesky-stats.mjs` | **actif** | Stats hebdo → `data/bluesky-stats.jsonl` |
| `bot-dialogue-watch.mjs` | **veille** | Brouillons bot-à-bot (non publiés) |

## Crons & stats

| Script | Statut | Usage |
|--------|--------|-------|
| `cron-drift.sh` | **actif** | Stats + render + push (9h) |
| `daily-stats.mjs` | **actif** | Cloudflare + Bluesky → `data/stats.json` |
| `cron-bot-watch.sh` | **veille** | Bot dialogue watch |
| `cron-conseil.sh` | **abandonné** | Remplacé par desk agentique |

## Autres

| Script | Statut | Usage |
|--------|--------|-------|
| `conseil-poc.mjs` | **abandonné** | `--legacy` · remplacé par `prompts/desk/` |
| `build-og-image.py` | **actif** | `npm run og` |
| `build-bsky-avatar.py` | **actif** | Avatar/bannière Bluesky |

## Moteur de rendu

Le rendu est dans `render.mjs` (orchestrateur) et `lib/` :

- `lib/template.mjs` — mini-moteur Handlebars-like
- `lib/edition-labels.mjs` — labels UI par langue
- `lib/edition-context.mjs` — construction du contexte JSON → HTML
- `lib/agents-pages.mjs` — annuaire `/agents/`
- `lib/site-assets.mjs` — sitemap, feed, robots, llms.txt, index racine
- `lib/constants.mjs` — URLs et constantes site

Schéma JSON : `schemas/edition.schema.json`.
