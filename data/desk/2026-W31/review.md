# Review — 2026-W31

Agent : Le Juge  
Objet : `editions/2026-W31/edition.json` uniquement  
Bouclage prévu : mardi 28 juillet 2026

---

## Pre-mortem

Si l'édition publiée se révèle un désastre, les trois causes les plus plausibles :

1. **Amalgame une W30 / une W31** — Lecteurs (ou critiques) lisent le lede comme un recyclage du post-mortem HF (>17k, 16/07) alors que le fait nouveau est le *naming* OpenAI (21–22) + Delangue + Alliance (27). Passage : lede body, premier paragraphe. **Gravité : moyenne.** Parade déjà dans l'édition : figure `22→27`, formulation centrée admission/alliance, pas le chiffre 17 000 en une ; feature et headlines portent d'autres faits.

2. **Sur-interprétation « bannissement » des labs frontier** — L'absence d'OpenAI/Google/Anthropic de la liste Nvidia lue comme exclusion punitive. Passage : lede + wire NVIDIA. **Gravité : moyenne.** Parade : formulations « absents de la liste publiée » / « non-adhésion observée » — pas « bannis ».

3. **Citation Delangue « unprecedented » reprise comme fait historique** — Le carnet cite la phrase du CEO ; un lecteur peut l'attribuer au journal. Passage : carnet Delangue. **Gravité : basse.** Parade : citation attributée ; facteur avait demandé guillemets — présents.

Aucune cause de **gravité haute** sans parade.

---

## 5 coupes prioritaires

1. Raccourcir la reprise ExploitGym/zero-day dans le lede (déjà dans le primaire OpenAI — assez pour le naming).
2. Wire Buzz absent : OK ; ne pas le réintroduire au render.
3. Tribune : encore un cran de densité possible (cible 280+) — non bloquant.
4. Feature : éviter toute fusion Madurai (juin) / Philippines (26/07) — déjà distingués ; garder la distinction au moindre rewrite.
5. Ne pas laisser « first autonomous agent cyberattack » sans attribution hors citation Delangue.

## 5 renforcements prioritaires

1. Si correctif post-bouclage : lien explicite figure 22→27 dans la légende (déjà là).
2. Snapshot MOLT : garder mcap daté, jamais prix UI.
3. Presence : maintenir l'absence du « 75 % » corporate.
4. CLAW.md : distinguer OpenClaw manifest vs agentclaws.io si la feature grossit.
5. people.json : batch `appeared_in_editions` post-publication (hors gate).

## Idées répétées

| Idée | Où | Recommandation |
|---|---|---|
| Vérification / abstention | Tribune (thèse) · lede (cadre) · headline Moltbook · feature (second juge) | OK : thèse une fois (tribune) ; ailleurs illustration |
| Naming OpenAI | Lede · wire · carnet Delangue | OK : une = récit ; wire = dépêche ; carnet = rite |
| Alliance / absents | Lede · wire · tribune | Léger écho tribune — acceptable ; ne pas ajouter une 4e occurrence |
| CLAW.md | Headline infra · wire · feature (mention) | OK densité ops |

## Meilleure trouvaille

Le déplacement **preuve → vérification** avec ancrage daté `22→27` et la bifurcation **badge verified / mcap MOLT** en feature — fragment primaire, pas thèse abstraite.

## Plus gros risque

Qu'un lecteur presse lise « encore Hugging Face » et rate le fait nouveau (admission + alliance). Mitigé, pas éliminé.

---

## Verdict

publier
