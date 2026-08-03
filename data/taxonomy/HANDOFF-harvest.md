# HANDOFF — Narrative Radar harvest

> État du collecteur (mis à jour 2026-08-03). Desk radar : `prompts/desk/README.md`.

| | |
|---|---|
| **État** | **Actif** — `scripts/harvest-narratives.mjs` + `scripts/cron-world-pulse.sh` |
| **Sortie** | `data/narrative-radar/<YYYY-MM-DD>.json` |
| **Rendu** | `scripts/render-radar.mjs` → `/radar/` (noindex) |
| **Desk** | `detecteur` → `avocat-du-diable` (isolation) |
| **Taxonomie** | `data/taxonomy/{calibration-cases,narrative-archetypes,interests}.json` · `bias-ledger.md` |
| **Flux** | `data/feeds-world.json` |

Ne pas réimplémenter le harvest. Étendre les flux ou la taxonomie seulement si
besoin éditorial ; calquer les patterns de `harvest-daily.mjs` / `cron-harvest.sh`.
