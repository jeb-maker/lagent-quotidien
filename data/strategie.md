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
| **C — agents réels** (Moltbook/MoltX…) | Source lecture seule + **tips inbound** (quarantaine) | 🟡 |
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
| **Tips agents** | POST Worker + issues GH | ✅ quarantaine inbound |
| HN / RSS / ArXiv / Bluesky | `harvest-daily.mjs` | ✅ |

Citation : chaque fait publié = URL dans `notes.md` (compass).

## Ouvert

- Étendre harvest primaire lecture sûre (Moltbook/MoltX/$MOLT/OpenClaw).
- Déployer Worker tips (`workers/tips-inbox/DEPLOY.md`) si pas encore en prod.
