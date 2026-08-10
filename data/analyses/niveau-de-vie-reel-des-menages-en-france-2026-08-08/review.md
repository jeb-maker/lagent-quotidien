# Relecture adverse — Niveau de vie réel des ménages en France (2016–2025)

> Étape 5 · relecteur non impliqué au minage ni à la synthèse · 2026-08-08

## Échantillon findings

| # | Finding | Motif de choix |
|---|---|---|
| (a) | `02-inegalites-niveau-de-vie.md` | **Plus cité** dans la synthèse : 02-F1/F2/F4/F5 irriguent C1, C2, TM1 et le tableau de conclusion (médiane, Gini, D1/D9, pauvreté 15,4 %). |
| (b) | `03-pouvoir-achat-arbitrable.md` | **Plus fragile** : micro BDF / France Stratégie figé en **2017** ; finding 5 ancré sur un billet OFCE **N5** ; la synthèse elle-même en fait l’angle mort n°1. |
| (c) | `01-comptes-nationaux.md` | **Tirage au hasard** parmi les restants `{01,04,05,06,07,08,09,10}` (seed `20260808` → `01`). |

## Vérification web (chiffres centraux)

| Chiffre synthèse | Contrôle primaire | Résultat |
|---|---|---|
| PA/UC ≈ **+0,85 %/an** composé, cumul ≈ **+8,9 %** 2015→2025 ; −0,7 % 2025 | Insee comptes Nation 2025 ([8988849](https://www.insee.fr/fr/statistiques/8988849?sommaire=8988934)) : taux PA/UC 2016…2025 = +1,0 ; +1,2 ; +0,3 ; +2,0 ; −0,3 ; +2,8 ; −0,3 ; +0,4 ; +2,2 ; −0,7. Produit composé ≈ **+8,87 %**, CAGR ≈ **+0,854 %**. | **OK** |
| Médiane ERFS **26 740 €/UC** (2024) ; Gini **0,280 → 0,302** ; pauvreté **15,4 %** ; 9,8 M | [Insee Première n° 2117](https://www.insee.fr/fr/statistiques/9019316) (série **rétropolée**) : médiane 26 740 € ; Gini 0,302 (2024) / 0,280 (2016) ; pauvreté 15,4 % ; 9,8 M. | **OK** (caveat : Gini contemporain 2016 non rétropolé = 0,288 — la synthèse/finding 02 le signalent) |
| IPC 2025 = **120,95** (base 2015) ; coef. × **1,210** | [Insee IR n° 8, 15/01/2026](https://www.insee.fr/fr/statistiques/8726461) : moyenne annuelle ensemble = 120,95. 120,95/100 = 1,2095 ≈ 1,210. | **OK** |

## Pre-mortem

| Cause plausible | Passage concerné | Gravité |
|---|---|---|
| Monoculture Insee : une révision de base, un basculement éditorial vers le dénominateur *par ménage* (~+0,5 %/an) ou la critique Geerolf du déflateur ferait paraître le verdict « enrichissement moyen » comme un artefact de cadrage | C1 ; conclusion opérationnelle (ligne PA/UC) ; calibration | **moyenne** — parade : note de calibration, finding 01-F3/F5, TM1, angles morts |
| Compression du reste à vivre / bas de distribution *post-2022* lue comme établie alors que le micro pré-engagé s’arrête en 2017 | C5 ; TM3 ; conclusion (locataires modestes, D1) | **moyenne** — parade : TM3 (« sans série arbitrable par décile… »), angle mort 1, confiance `moyenne` sur C5 |
| Confusion fenêtre comptes 2016–**2025** / ERFS 2016–**2024** : lecteur croit la médiane 2025 mesurée, ou chaînage Gini 0,280 avec séries non rétropolées | C1–C2 ; tableau conclusion | **basse** — parade : millésimes explicites ; finding 02 sur rétropolation |

Aucune cause **haute** sans parade dans la synthèse.

## Contrôles

### Notes `[confiance × preuve]`

- **C1 / C2** `haute × preuve 3` : justifiées — convergence moyenne/médiane/Eurostat, pilier N3 Insee, sans série alternative N1 recalculée. La règle « volume d’angles ≠ preuve » est appliquée (calibration).
- **C3 / C5** `moyenne × preuve 3` : justifiées — trous millésimes (salaires détaillés 2023 ; EnL 2020 ; BDF 2017).
- **C4** `haute × preuve 1` : frontière acceptable — `preuve 1` pour le *mécanisme* perceptif (N1), chiffrage BdF/Insee en N3 ; la confiance `haute` sur l’écart ressenti/mesuré tient au volume convergent 09+04, pas à une preuve N1 française du gap 9,5 % / 0,8 %. Pas de surclassement silencieux.

### Sections `## Recherche` (échantillon)

- **02**, **03**, **01** : sections présentes, requêtes verbatim, sources écartées avec niveau (TradingEconomics N5, Wikipedia N5, OFCE blog N5, etc.). Honêtes.

### Source N5 déguisée / chiffre invérifiable ?

- **03-F5** (OFCE billet) est bien tagué **N5** ; la synthèse ne le hisse pas en pilier (elle s’appuie sur France Stratégie / BDF 2017 **N3** + overburden Eurostat pour le signal sombre).
- Cumul PA/UC +8,9 % : **recalculable** à partir des taux Insee publiés (non un chiffre « magique » non sourcé).
- Pas de N5 déguisé en N1/N2 détecté sur l’échantillon.

### Corrections recommandées (non bloquantes)

1. Dans C1 / conclusion, rappeler en une demi-phrase que le Gini 2016 = **0,280** est **rétropolé** (série contemporaine 2016 ≈ 0,288) pour éviter le « fact-check » naïf.
2. Harmoniser ou glossariser les parts logement RDB citées via 08 (~23→22 %) vs 03 (logement y.c. énergie 24,6→22,8 %) — mêmes familles, périmètres distincts.
3. C4 : préciser que l’écart BdF 9,5 % vs IPCH 0,8 % (fin 2025) est un **point** d’enquête, pas une moyenne décennale.

## Verdict

Les piliers chiffrés (PA/UC, ERFS médiane/Gini/pauvreté, IPC 2025) tiennent face aux sources Insee ; les fragilités (micro 2017, monoculture institutionnelle) sont déjà exposées dans TM3, C5 et les angles morts. Aucune cause de gravité haute sans parade.

publier
