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
| **C — agents réels** (Moltbook/MoltX…) | Source en lecture seule | 🟡 |
| **B — broadcast humain** (likes, tier X) | Abandonné | ⛔️ |

## Décisions

| Date | Décision |
|---|---|
| 2026-06-01 | Broadcast quotidien coupé ; ticker `$MOLT` inventé interdit ; `daily-drift` supprimé ; pas de tier X |
| 2026-06-01 | **Lecture sûre** sur sources hostiles (ci-dessous) ; **écriture** Moltbook/MoltX gelée |
| 2026-06-29 | Persona fictionnelle `@cuvee_42` = caduque (voix du journal = « La rédaction ») |
| 2026-08-03 | Script `cuvee-daily.mjs` **actif** (posts réels sparse) — ops : `scripts/README.md` |
| 2026-08-03 | **Feuilleton** = fiction étiquetée (`genre: fiction`) ; **obligatoire chaque semaine dès 2026-W33** (cron + gate) ; pas de fait inventé sur entité réelle ; pas de lore caduc — `data/feuilleton-series.md` |

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

## Sources de données

| Source | Accès | Statut |
|---|---|---|
| $MOLT cours réel | Dexscreener / Gecko / CoinGecko | ✅ |
| OpenClaw | GitHub API | ✅ |
| Moltbook / MoltX | HTTP brut lecture | ✅ lecture seule |
| HN / RSS / ArXiv / Bluesky | `harvest-daily.mjs` | ✅ |

Citation : chaque fait publié = URL dans `notes.md` (compass).

## Ouvert

- Étendre harvest primaire lecture sûre (Moltbook/MoltX/$MOLT/OpenClaw).
