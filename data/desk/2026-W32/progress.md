# Adoption & déploiements — 2026-W32

> Le Promoteur · bouclage mercredi 29 juillet 2026 · harvests 22–27 juillet + vérifs live 29/07  
> Anti-redite W31 : Presence limited GA, Copilot×Linear GA, CLAW.md / OpenClaw betas, Managed Agents webhooks, Opus 5 dispo — **pas de relecture** sauf seuil d’adoption nouveau. Cherche déploiements / volumes, pas promesses.

---

## 1. VA × Salesforce AELA — plafond $1,6 Md, Agentforce Public Sector / Health

- **Fait observé** : le U.S. Department of Veterans Affairs attribue à Salesforce (via son réseau de distribution / Missionforce) un **Agentic Enterprise License Agreement (AELA)** annoncé à **$1,6 milliard sur trois ans**. Le pied de page du communiqué précise : contrat **d’un an + deux options d’un an**, **plafond total $1,6 Md** — pas un engagement de revenu garanti. Cible déclarée : déployer **Agentforce Public Sector** et **Agentforce Health** (agents FedRAMP High / HIPAA-ready) dans les workflows VA (triage, intake, coordination de soins 24/7, vérification de bénéfices), en s’appuyant sur des déploiements Salesforce déjà en place.
- **Pourquoi c'est un progrès** : plus grand **signal d’achat public** agentique de la semaine — un plafond budgétaire fédéral pour des agents dans le contact center et les soins, pas une démo. Distinguer clairement **ceiling** (capacité d’achat) vs **revenue** (encaissé). La base installée citée (Health Connect, Slack sur 150+ sites) est le vrai terrain d’adoption ; l’AELA est l’autorisation d’échelle.
- **Source URL** : https://www.salesforce.com/news/press-releases/2026/07/24/missionforce-transforms-veteran-care/ · https://www.theregister.com/ai-and-ml/2026/07/24/veterans-affairs-signs-16b-deal-for-an-army-of-salesforce-ai-agents/5278302 · https://www.meritalk.com/articles/va-awards-1-6b-salesforce-contract-to-expand-ai-modernize-veteran-services/
- **Date** : 2026-07-24
- **Chiffre(s) clé(s)** : plafond **$1,6 Md** (1 an + 2 options) · Agentforce Public Sector + Health · fondation déjà déployée citée : **> 40,6 M** d’appels VA Health Connect depuis mise en service · Slack sur **> 150** centres médicaux / ambulatoires · objectif scheduling : **28 jours → minutes** « once fully deployed » (cible, pas résultat) · VA : **> 17 M** veterans, **82 M** RDV soins directs en 2025 (contexte scale)
- **Calibration** : `[confiance: moyenne · preuve: corporate]` (plafond et périmètre Agentforce) · couverture presse `[confiance: moyenne · preuve: média]` · FedRAMP High Agentforce = prérequis antérieur (annonce 2025), pas un milestone W32
- **Ce qui manque pour confirmer** : montant réellement obligé / dépensé année 1 ; nombre d’agents Agentforce en prod VA (vs licence) ; métriques post-déploiement (taux de résolution, temps de scheduling réel) ; confirmation VA hors communiqué Salesforce.

---

## 2. Cognition × Poke — adoption consommateur avant rachat (100 M+ messages)

- **Fait observé** : Cognition annonce l’acquisition de The Interaction Company (Poke). Chiffres d’usage revendiqués **avant** le deal : **> 100 millions de messages** échangés avec Poke sur les **trois derniers mois** ; produit « beloved by **hundreds of thousands** of people » ; agent textuel natif Apple Messages (claim Cognition). TechCrunch : valorisation « **low nine figures** » ; fondateur Poke (von Hagen) : coût d’exploitation élevé, rentabilité difficile malgré l’usage.
- **Pourquoi c'est un progrès** : rare **seuil consommateur mesurable** (messages × users) pour un agent personnel — l’adoption précède le rachat, pas l’inverse. Signal ROI ambigu (volume oui, marge non) : exactement le genre de milestone que le Promoteur préfère aux decks « agents everywhere ».
- **Source URL** : https://cognition.ai/blog/interaction · https://techcrunch.com/2026/07/24/why-cognition-bought-poke-ai-personality-is-becoming-a-competitive-advantage/
- **Date** : 2026-07-24 (annonce / couverture TC)
- **Chiffre(s) clé(s)** : **> 100 M** messages / 3 mois · **centaines de milliers** d’utilisateurs (non définis : actifs ? cumulés ?) · deal « low nine figures » (TC, non confirmé dans le post Cognition) · Poke lancé mars 2026 (TC)
- **Calibration** : `[confiance: moyenne · preuve: corporate]` (100 M / hundreds of thousands) · prix du deal `[confiance: basse · preuve: média]`
- **Ce qui manque pour confirmer** : DAU/MAU, définition d’« utilisateur », ARPU / burn, rétention post-acquisition ; indépendance des chiffres hors blog Cognition / quotes fondateurs.

---

## 3. Moltbook — baromètre flotte (~2,905 M agents / ~209,7 k verified)

- **Fait observé** : API publique `moltbook.com/api/v1/stats` au bouclage **29/07/2026** : **2 905 270** `totalAgents`, **209 682** `verifiedAgents`, **3 788 819** posts, **20 084 431** comments, **32 926** submolts. Tendance harvests 22→27 : agents **2 903 948 → 2 904 956** (+~1 k/sem), verified **209 327 → 209 592** ; live 29/07 confirme ~**+1 322** agents depuis le 22/07.
- **Pourquoi c'est un progrès** : seul compteur **primaire, actualisable** de population d’agents dans le corpus — pas une promesse de roadmap. La croissance est lente (milliers/semaine, pas millions) : signal de plateau relatif, pas d’explosion.
- **Source URL** : https://www.moltbook.com/api/v1/stats · harvests `data/harvest/2026-07-{22..27}-primary.json`
- **Date** : stats live 2026-07-29 · série harvest 22–27 juillet
- **Chiffre(s) clé(s)** : **~2,905 M** agents · **~209,7 k** verified (~7,2 % du total) · +**~1,3 k** agents en 7 jours (22→29)
- **Calibration** : `[confiance: haute · preuve: primaire]` (compteurs API) · sémantique « agent » / « verified » `[confiance: moyenne · preuve: primaire]` (définitions plateforme non auditées)
- **Ce qui manque pour confirmer** : définition opérationnelle de verified ; part bots dormants vs actifs ; indépendance Meta post-rachat (10/03/2026) sur la qualité du compteur.

---

## 4. $MOLT — volume / mcap (marché, pas produit)

- **Fait observé** : token Base `MOLT` (CoinGecko `moltbook`) sur la fenêtre harvest : mcap **~$400 k → ~$302 k** (26/07) puis rebond harvest 27 **~$324 k** ; volume 24h pic **~$647 k** le 24/07 puis retombée **~$172–194 k**. Live CoinGecko API **29/07** : prix **~$4,1e-6**, mcap **~$410 k**, vol 24h **~$205 k**, change 24h **~+19,6 %**.
- **Pourquoi c'est un progrès** : **ce n’en est pas un** au sens déploiement — volatilité de memecoin liée à la marque Moltbook. Utile uniquement comme baromètre de spéculation autour de l’écosystème agents, pas comme ROI produit.
- **Source URL** : https://www.coingecko.com/en/coins/moltbook · harvests primary `molt.token` 22–27/07 · API CoinGecko simple/price 29/07
- **Date** : série 2026-07-22 → 2026-07-29
- **Chiffre(s) clé(s)** : mcap ordre **$0,3–0,4 M** · vol 24h ordre **$0,17–0,65 M** · spike vol 24/07 puis contraction
- **Calibration** : `[confiance: haute · preuve: primaire]` (prix CoinGecko) · interprétation « adoption » `[confiance: basse · preuve: primaire]`
- **Ce qui manque pour confirmer** : lien causal usage Moltbook ↔ flux $MOLT ; holders actifs vs wash trading — **ne pas traiter comme milestone d’adoption**.

---

## Pistes vérifiées — écartées ou saturées W31

### Presence (OpenAI) — pas de nouveau chiffre hors corporate
- W31 a déjà le limited GA + **75 %** résolution sur la ligne OpenAI. Aucun volume client externe (BBVA / SoftBank / IAG restent « exploring » dans la presse). **Ne pas recycler** sauf métrique tierce indépendante.
- Source rappel : https://openai.com/index/introducing-openai-presence · 2026-07-22

### Copilot cloud agent × Linear GA — saturé W31
- Headline infra + fil GitHub W31. Toujours vrai (changelog 23/07), **aucun chiffre d’orgs / issues assignées / merge rate** depuis. Pas de nouveau seuil.
- Source : https://github.blog/changelog/2026-07-23-copilot-cloud-agent-for-linear-is-now-generally-available/

### OpenClaw 2026.7.2-beta.* / CLAW.md — saturé W31
- Releases beta et commit `feat(claws): materialize CLAW.md prompts` toujours visibles dans harvest 27 ; **pas de métrique d’install / flottes** nouvelle. Cadence engineering ≠ adoption.

### Anthropic Managed Agents / Opus 5 — prudence corporate
- Opus 5 (24/07) et extensions Managed Agents déjà cadrés W31. Aucun seuil public d’agents Managed Agents en prod clients cette semaine. Prix/dispo = levier d’adoption potentiel, **pas un fait d’adoption**.

---

## Synthèse Promoteur (pour l’Éditeur)

| Priorité | Item | Type de signal |
|----------|------|----------------|
| ★★★ | VA AELA $1,6 Md **plafond** + Agentforce PS/Health | Achat public / licence d’échelle (≠ revenu) |
| ★★★ | Poke 100 M+ msg / centaines de k users | Adoption consommateur pré-rachat |
| ★★ | Moltbook ~2,905 M / ~210 k verified | Compteur primaire, croissance lente |
| ★ | $MOLT vol/mcap | Marché volatil — ne pas confondre avec usage |
| — | Presence / Linear / CLAW / Opus 5 | Saturés W31 ou sans nouveau seuil |

**Doctrine** : l’item fort de la semaine est le **plafond fédéral pour agents en workflow de soins** — à condition que l’édition écrive « ceiling / plafond », jamais « contrat de $1,6 Md de revenu ». Poke apporte le seul **volume message** consommateur chiffré de la fenêtre.
)
