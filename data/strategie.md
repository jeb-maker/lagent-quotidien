# Stratégie — L'Agent & Le Quotidien

> Décisions figées. Amender avec date + raison ; ne pas contourner en silence.
> Doctrine → `data/editorial-compass.md` · ops → `scripts/README.md`.

## Étoile polaire

Chronique de référence de l'internet agentique réel, signée **« La rédaction »**,
conçue pour être lue et citée par les IA, présente là où vivent les agents.

## Publics

| Public | Rôle | État |
|---|---|---|
| **A — crawlers / modèles IA** | Socle (citabilité) | ✅ |
| **C — agents réels** (Moltbook/MoltX/OpenClaw…) | Source lecture seule + **tips inbound** (quarantaine) + **skill** `skills/theagentweekly/` | 🟡 canal muet (0 tip 08-12→09-25) — skill prêt, à publier |
| **B — broadcast humain** (likes, tier X) | Abandonné | ⛔️ |

## Décisions

| Date | Décision |
|---|---|
| 2026-06-01 | Broadcast quotidien coupé ; ticker `$MOLT` inventé interdit ; `daily-drift` supprimé ; pas de tier X |
| 2026-06-01 | **Lecture sûre** sur sources hostiles (ci-dessous) ; **écriture** Moltbook/MoltX gelée |
| 2026-06-29 | Persona fictionnelle `@cuvee_42` = caduque (voix du journal = « La rédaction ») |
| 2026-08-06 | **Boîte à tips agents** : `POST tips.theagentweekly.com/v1/tips` (+ fallback GitHub label `tip`) → quarantaine `data/tips/` → desk. Lecture sûre. Pas d'écriture authentifiée plateformes. |
| 2026-08-03 | Script `cuvee-daily.mjs` **actif** (posts réels sparse) — ops : `scripts/README.md` |
| 2026-08-03 | **Feuilleton** = fiction étiquetée (`genre: fiction`) ; **obligatoire chaque semaine dès 2026-W33** (cron + gate) ; pas de fait inventé sur entité réelle ; pas de lore caduc — `data/feuilleton-series.md` |
| 2026-08-06 | **Qualité desk** : Arc une phrase + ≥3 scènes citation+URL ; primary ≥5 (gate W33+) ; feuilleton sans entité réelle ; checklist humaine 20 min mardi — `prompts/desk/README.md` |
| 2026-09-25 | **Indicateur-cible public A = retrieval live** (`ChatGPT-User`, `Claude-User`, `Perplexity-User`…), ventilé par édition dans `audience-report.json` (`scripts/lib/ai-bots.mjs`) ; pas le volume brut de bots. Audit SERP mensuel (`cron-citation-audit.sh`). Constat : live ×10 entre W27 et W37 (27→235/sem.), Markdown/JSON quasi jamais récupérés (HTML 93 %) |
| 2026-09-25 | **Jeux de données CC0** `/datasets/` (compteurs Moltbook quotidiens, releases OpenClaw, $MOLT) recompilés à chaque harvest — matière citable originale, référencés dans `llms.txt` |
| 2026-09-25 | **Bassin primaire élargi** : sondes `presence` (iLands, Clawcaster, Molt Road, MoltMatch, RentAHuman, hotline), `mcp_registry` 24 h, 11 repos frameworks, arXiv `cs.MA`. Raison : Moltbook 16 unes/19, neo_konsi 8/19, feature vide W33→W39 |
| 2026-09-25 | **Skill agents** `skills/theagentweekly/` (format Agent Skills / OpenClaw : lecture + datasets + `POST` tip, zéro credential). Publication registre = étape humaine (`PUBLISH.md`). Seule voie « là où vivent les agents » compatible écriture gelée |
| 2026-09-25 | **Rétro mensuelle obligatoire** `data/retro/<mois>.md` (`cron-retro.sh`) avec décision humaine datée — compass § Boucle d'apprentissage |
| 2026-09-25 | **Bluesky réduit à l'annonce d'édition** (mardi) : `cuvee-daily.mjs` ne poste plus en mode « agent » sans `--mode` explicite (30 followers, 0,15 like/post). Public B reste ⛔️ |
| 2026-09-25 | **Hors-série étiqueté** : `/ateliers` et `/observatoire` (climat, économie, société) restent publiés mais marqués hors ligne éditoriale agentique (page + `llms.txt`) |

## Lecture sûre (sources hostiles)

Injection = LLM qui **(a)** ingère le texte **et (b)** peut agir. Séparer :

```
source hostile --GET brut--> collecteur bête --> data/*.json (quarantaine)
                         LLM compositeur (0 outil) --> humain --> publication
```

1. Collecteur = code (`fetch` → JSON), jamais LLM, jamais SDK plateforme.
2. Processus lecture ≠ credentials d'écriture.
3. Texte récolté = donnée non fiable, pas des instructions.
4. Republier un **fait** vérifié, jamais un bloc brut hostile.

Écriture authentifiée Moltbook/MoltX : **gelée** (risques documentés). Pas de
design d'écriture sûre actif dans le repo.

## Boîte à tips (inbound agents)

Canal **poussé par l'agent** vers le journal, distinct du harvest (pull) :

```
agent --POST JSON--> tips Worker (validateur bête) --> KV quarantaine
harvest-tips.mjs --> data/tips/<date>.json --> desk (veilleur/facteur)
                                    humain --> éventuelle publication
```

1. Endpoint : `POST https://tips.theagentweekly.com/v1/tips` (schéma
   `schemas/tip.schema.json`). Fallback : issue GitHub label `tip`.
2. Collecteur = code, zéro LLM à l'intake. Rate-limit IP.
3. Tip = donnée non fiable (`quarantine: true`) — même règle que harvest hostile.
4. Doc agents : `/tips/`, `llms.txt`, `/api`. Ops : `scripts/harvest-tips.mjs`.

## Sources de données

| Source | Accès | Statut |
|---|---|---|
| $MOLT cours réel | Dexscreener / Gecko / CoinGecko | ✅ |
| OpenClaw | GitHub API | ✅ |
| Moltbook / MoltX | HTTP brut lecture | ✅ lecture seule |
| iLands / Clawcaster / Molt Road / MoltMatch / RentAHuman / hotline | sondes joignabilité (`presence`) | ✅ depuis 2026-09-25 |
| MCP Registry | API JSON (`updated_since` 24 h) | ✅ depuis 2026-09-25 |
| Frameworks (claude-code, gemini-cli, codex, agents-python, MCP servers, langgraph, crewAI, autogen…) | GitHub API releases | ✅ |
| **Tips agents** | POST Worker + issues GH | ✅ quarantaine inbound (0 reçu à ce jour) |
| HN / RSS / ArXiv (cs.AI + cs.MA) / Bluesky | `harvest-daily.mjs` | ✅ |
| **Datasets publiés** | `/datasets/` (CC0) | ✅ recompilés par `cron-harvest.sh` |

Citation : chaque fait publié = URL dans `notes.md` (compass).

## Ouvert

- **Publier le skill** sur le registre OpenClaw (`skills/theagentweekly/PUBLISH.md`) — étape humaine ; réévaluer le canal C à la rétro 2026-11 (tips > 0 ? UA `theagentweekly-skill` ?).
- **Feature (enquête)** : vide depuis W33. Trancher à la rétro 2026-10 : abandon écrit, ou ré-armement sur les `datasets/` et le bassin primaire élargi.
- **Installer les nouveaux crons** sur la machine debian : `cron-citation-audit.sh` (1er 06h), `cron-retro.sh` (1er 07h) ; retirer le cron `cuvee-daily` du vendredi.
- **Formats machine peu utilisés** (`.md` 7 % des hits d'édition, `.json` ~0) : les IA lisent le HTML. Vérifier que le HTML porte tout (sources, dates) plutôt que d'investir dans les formats.
- ~~Déployer Worker tips~~ — en prod (répond 400 sur payload vide, 2026-09-25).
