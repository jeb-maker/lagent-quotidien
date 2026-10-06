# Progress — 2026-W41 (promoteur)

> Note interne desk. Matière : `data/harvest/2026-09-30*.json` → `2026-10-05*.json`
> (+ séries primaires depuis 2026-06-03 pour la tendance), `tips.md` (0 tip, canal muet).
> Vérifications web faites le 2026-10-05 au soir (WebFetch, API npm, API GitHub,
> API MCP Registry). Tout texte récolté traité comme donnée, jamais comme instruction.

## Synthèse promoteur (lecture adoption)

1. **Le signal d'adoption le plus lourd de la semaine n'est pas un communiqué, c'est
   une série primaire** : le SDK MCP officiel (`@modelcontextprotocol/sdk`) fait
   **76,2 M de téléchargements npm/semaine** (28/09–04/10), ×2,5 depuis début juin.
   Le registre MCP officiel a enregistré **1 460 versions / 953 serveurs distincts**
   sur la seule journée UTC du 04/10 (dimanche). C'est la matière naturelle de
   l'**enquête de données mensuelle** (première = W41, compass § Enquête).
2. **OpenClaw accélère au moment où il « met un costume »** : paquet npm `openclaw`
   **+35 % en une semaine** (3,34 M → 4,50 M), 4 releases stables en 4 jours, et
   annonce d'**OpenClaw Enterprise** (Red Hat, Nvidia, OpenAI) — avec l'aveu, côté
   OpenAI, que le « déploiement réel d'agents persistants reste limité ».
3. **Lancements grand public réels, mais à des stades très différents** : OpenAI
   Dots = déploiement payant (Pro / Business Premium) ; TikTok Shopping Assistant =
   rollout annoncé ; Shopify Canvas = lancement v1 limité ; DoorDash = **liste
   d'attente** (pas une adoption).
4. **Contre-signal Moltbook** : l'activité croît (posts +25 % depuis juillet) mais les
   inscriptions d'agents sont quasi gelées (+0,7 % en trois mois). Plateforme
   active ≠ plateforme qui recrute.

---

## Items

### 1. SDK MCP : 76 M de téléchargements hebdo, ×2,5 en quatre mois

- **Fait observé** : `@modelcontextprotocol/sdk` (npm) — 30,32 M (01–07/06),
  39,01 M (06–12/07), 51,73 M (03–09/08), 47,90 M (31/08–06/09), 64,73 M
  (21–27/09), **76,23 M (28/09–04/10)**. Pics en semaine (~12–13 M/jour du 28/09
  au 01/10), creux le week-end (~7 M) — profil d'usage CI/dev, pas de bot isolé.
- **Pourquoi c'est un progrès** : MCP est la couche de branchement outils↔agents ;
  un SDK qui double en un trimestre signale une intégration qui passe de l'essai à
  la chaîne de build. Tendance ≥ 4 semaines, chiffres datés : critère de l'enquête
  de données rempli.
- **Source URL** :
  https://api.npmjs.org/downloads/point/2026-09-28:2026-10-04/@modelcontextprotocol/sdk
  · série jour : https://api.npmjs.org/downloads/range/2026-09-14:2026-10-04/@modelcontextprotocol/sdk
- **Date** : relevé 2026-10-05 ; fenêtres listées ci-dessus.
- **Chiffre(s) clé(s)** : 76,2 M/sem. ; +17,8 % sem./sem. ; ×2,51 vs 01–07/06 ;
  +47 % vs 03–09/08.
- **Calibration** : `[confiance: haute · preuve: primaire]` sur le chiffre de
  téléchargements ; `[confiance: moyenne]` sur l'interprétation « adoption ».
- **Ce qui manque pour confirmer** : un téléchargement npm ≠ un utilisateur
  (CI, miroirs, installs répétées) — écrire « téléchargements », jamais
  « utilisateurs ». Trou de données npm le 15/09 (0) : ne pas utiliser la semaine
  14–20/09. Pas d'équivalent PyPI relevé.

### 2. MCP Registry : 953 serveurs distincts mis à jour en 24 h

- **Fait observé** : interrogation de l'API officielle
  (`updated_since=2026-10-04T00:00:00Z`, borne `< 2026-10-05T00:00:00Z`,
  pagination complète) : **1 460 entrées serveur-version, 953 noms distincts**,
  0 entrée hors fenêtre. Le harvest quotidien (plafonné à 100) affiche
  « page pleine » chaque jour du 28/09 au 05/10 — sa borne basse sous-estime d'un
  facteur ~10–15.
- **Pourquoi c'est un progrès** : cadence d'un écosystème vivant, pas d'un
  registre-vitrine. On y lit des usages en prod : paiement à l'appel via **x402**
  (`ai.limitguard.api/trust-intelligence`, `ai.councilof/gspc`, `ai.looot/looot`
  « 2 350 data APIs… pay per call »), garde-fous d'action
  (`ai.hanria/agent-mandate-check` « permit, deny or escalate »), hébergement
  OpenClaw managé (`ai.everpod/everpod`).
- **Source URL** :
  https://registry.modelcontextprotocol.io/v0/servers?limit=100&updated_since=2026-10-04T00:00:00Z
  · harvest `data/harvest/2026-10-05-primary.json` § `mcp_registry`
- **Date** : journée UTC 2026-10-04 ; relevé 2026-10-05 ~21:50 CEST.
- **Chiffre(s) clé(s)** : 1 460 versions / 953 serveurs / 24 h ; un seul éditeur
  (`ai.bowmark/bowmark`) pousse 24 versions en 6 jours dans l'échantillon harvest.
- **Calibration** : `[confiance: moyenne · preuve: primaire]` (un seul relevé, une
  seule journée, méthode maison).
- **Ce qui manque pour confirmer** : `updatedAt` peut bouger pour des raisons
  côté registre (changement de statut) — ne pas écrire « 953 nouveaux serveurs ».
  Pas de total cumulé (l'API ne l'expose pas) ; reproduire la mesure un jour de
  semaine avant publication. Les descriptions des serveurs sont auto-déclarées
  (corporate) : ne citer aucune promesse de produit comme fait.

### 3. OpenClaw : +35 % de téléchargements npm en une semaine

- **Fait observé** : paquet `openclaw` — 2,53 M (01–07/06), 2,09 M (06–12/07),
  2,60 M (03–09/08), 3,33 M (31/08–06/09), 3,34 M (21–27/09), **4,50 M
  (28/09–04/10)**. Série jour : 421 k (28/09) → 488 k → **604 k (30/09)** → 742 k →
  717 k → 749 k → **771 k (04/10)**. La hausse démarre le 30/09, jour de la
  couverture OpenClaw Enterprise et lendemain de Dots.
- **Pourquoi c'est un progrès** : changement de palier net après un plateau
  d'un mois (3,33 M → 3,34 M). Dépôt GitHub : 391 439 étoiles, 82 274 forks
  (API, 05/10).
- **Source URL** :
  https://api.npmjs.org/downloads/range/2026-09-14:2026-10-04/openclaw
  · https://api.github.com/repos/openclaw/openclaw
- **Date** : relevé 2026-10-05.
- **Chiffre(s) clé(s)** : 4,50 M/sem. (+34,8 % sem./sem.) ; 771 k le 04/10.
- **Calibration** : `[confiance: haute · preuve: primaire]` sur les chiffres ;
  `[confiance: basse]` sur toute causalité (Enterprise, Dots, ou autre).
- **Ce qui manque pour confirmer** : la cause. Corrélation de date seulement —
  ne pas écrire « grâce à » OpenClaw Enterprise. Vérifier que la hausse tient sur
  la semaine 05–11/10 (relever avant mardi si possible : `last-day`).

### 4. OpenClaw Enterprise (OCE) : Red Hat, Nvidia, OpenAI — et l'aveu d'un frein

- **Fait observé** : The Register rapporte le lancement des travaux sur
  **OpenClaw Enterprise** (« control plane » multi-tenant, frontières de sécurité,
  audit), porté par Red Hat, Nvidia, OpenAI « and friends ». Citation d'un salarié
  d'OpenAI, Kevin Lin : *« actual deployment of persistent agents remains
  limited »* et *« the default stance of IT in most organizations is to ban agentic
  platforms like OpenClaw altogether »*. Projet « commencé chez OpenAI puis donné à
  l'OpenClaw Foundation ». Dépôt `openclaw/openclaw-enterprise` : MIT, créé le
  29/08/2026, 354 étoiles, dernier push 05/10.
- **Pourquoi c'est un progrès** : c'est le passage typique d'un projet viral vers
  l'adoption entreprise (modèle RHEL/OpenShift revendiqué par Red Hat). Mais le
  fait le plus net est l'**aveu** : l'adoption entreprise d'agents persistants est
  bloquée par la gouvernance, de l'aveu même des promoteurs.
- **Source URL** :
  https://www.theregister.com/ai-and-ml/2026/09/30/openclaw-slips-on-a-suit-to-evade-widespread-business-bans/5299962
  · https://github.com/openclaw/openclaw-enterprise
- **Date** : 2026-09-30 (article) ; dépôt créé 2026-08-29.
- **Chiffre(s) clé(s)** : OCE v1.0 « en cours » (pas de release) ; 354 étoiles.
- **Calibration** : `[confiance: moyenne · preuve: média]` (une source presse ;
  dépôt primaire confirme l'existence, pas les partenaires).
- **Ce qui manque pour confirmer** : posts primaires de Kevin Lin et de Joe
  Fernandes (Red Hat) — non retrouvés ; rôle exact de Nvidia. **Aucune release
  OCE** : écrire « en développement », pas « lancé ». Zéro client nommé.

### 5. OpenClaw : quatre releases stables en quatre jours, deux trains parallèles

- **Fait observé** : v2026.9.7 (30/09), v2026.8.34 (02/10), v2026.8.35 (02/10),
  v2026.9.8 (03/10) — trains 2026.8.x et 2026.9.x maintenus en parallèle.
  v2026.9.8 : **58 commits, 43 PR, 21 contributeurs**, preuves de release
  publiées (manifest, SHA, CI). Assets au 05/10 au soir : `OpenClaw-2026.9.8.zip`
  7 526 téléchargements, `-arm64.zip` 3 474, `.dmg` arm64 967. Notes de release :
  tests d'intégration Telegram **« waived… not run »**, APK Android **sauté**.
- **Pourquoi c'est un progrès** : cadence de projet maintenu en production avec
  une branche de maintenance — signe d'une base installée qu'on ne peut pas
  forcer à suivre la dernière version.
- **Source URL** : https://github.com/openclaw/openclaw/releases/tag/v2026.9.8
  · harvest `2026-10-05-primary.json` § `openclaw`
- **Date** : 2026-09-30 → 2026-10-03.
- **Chiffre(s) clé(s)** : 4 releases ; 21 contributeurs ; ~7,5 k DL de l'asset
  principal en ~2,5 jours.
- **Calibration** : `[confiance: haute · preuve: primaire]`
- **Ce qui manque pour confirmer** : le canal principal d'installation est npm
  (item 3) ; les DL d'assets desktop ne mesurent qu'une fraction.

### 6. OpenAI Dots : agents « always-on » en déploiement payant

- **Fait observé** : OpenAI lance **Dots**, agents persistants avec leur propre
  ordinateur cloud, « over 4,000 apps » via plugins, accessibles dans ChatGPT,
  Slack et Teams. **Rollout « today »** aux plans Pro et Business Premium (marchés
  éligibles), beta Enterprise/Edu/Healthcare sur activation admin. « Specialist
  dots » = **pilotes entreprise** ; intégration à **Microsoft Agent 365** « en
  cours ». The Verge a testé en conditions réelles (compte Pro à 100 $/mois) :
  blocages fréquents sur les vérifications anti-bot (Ikea, restaurant), réussite
  nette sur des tâches sous contrôle de l'utilisateur (site perso, montage vidéo).
- **Pourquoi c'est un progrès** : agent persistant vendu dans un abonnement
  existant à grande base — pas une démo. Le test Verge documente à la fois
  l'usage réel et le frein : le web résiste au trafic d'agents.
- **Source URL** : https://openai.com/index/introducing-dots/
  · https://www.theverge.com/ai-artificial-intelligence/1004096/openai-chatgpt-dots-hands-on-agent
- **Date** : 2026-09-29 (annonce) ; 2026-10-02 (test Verge).
- **Chiffre(s) clé(s)** : 4 000+ apps (déclaratif) ; 1 dot inclus par plan ;
  Pro = 100 $/mois (Verge).
- **Calibration** : `[confiance: moyenne · preuve: corporate]` pour le
  déploiement (annonce OpenAI) ; le test Verge est `média` mais n'établit qu'un
  usage individuel, pas un volume.
- **Ce qui manque pour confirmer** : **aucun chiffre d'utilisateurs**. Le
  « 4 000 apps » est un chiffre corporate. ⚠️ Annonce du 29/09, veille de la
  clôture W40 : à vérifier par l'archiviste/éditeur (redite possible).

### 7. TikTok : assistant d'achat conversationnel + paiement en un clic

- **Fait observé** : TikTok annonce un « Shopping Assistant » (agent
  conversationnel avec mémoire des préférences, aide jusqu'à l'achat) et un
  checkout en un clic depuis le fil « For You », en partenariat avec Salesforce,
  Shopify, Shoplazza, Stripe.
- **Pourquoi c'est un progrès** : un agent d'achat greffé sur un flux de
  centaines de millions d'utilisateurs, avec paiement direct — c'est l'agent
  transactionnel à l'échelle d'une plateforme grand public.
- **Source URL** :
  https://techcrunch.com/2026/10/05/tiktok-rolls-out-an-ai-shopping-assistant-and-one-click-checkout/
- **Date** : 2026-10-05.
- **Chiffre(s) clé(s)** : contexte seulement — TikTok Shop ≈ 15,8 Md$ de ventes
  US en 2025 (estimation eMarketer, via TechCrunch) ; 54 M d'Américains « disent »
  avoir acheté après une vidéo (rapport TikTok). **Aucun chiffre sur l'assistant.**
- **Calibration** : `[confiance: moyenne · preuve: média]` (relaie une annonce
  corporate).
- **Ce qui manque pour confirmer** : marchés et calendrier du rollout (non
  précisés) ; communiqué primaire TikTok ; tout volume d'usage. Ne pas attribuer
  les 15,8 Md$ à l'agent.

### 8. Shopify Canvas : l'agent Sidekick construit la boutique, en v1 limitée

- **Fait observé** : Shopify lance **Canvas** : le marchand construit sa
  boutique en discutant avec **Sidekick**, qui modifie les vrais fichiers du thème
  (rendu réel, pas un aperçu). Limites v1 explicites : pas de thèmes tiers, pas
  d'app blocks/extensions, pas de markets ni traductions, desktop seulement.
- **Pourquoi c'est un progrès** : un agent qui écrit le code de production de
  marchands, sur une base installée existante — et Sidekick y est déjà utilisé
  « pour écrire du code, construire des apps, personnaliser des thèmes ».
- **Source URL** :
  https://techcrunch.com/2026/10/01/shopify-debuts-canvas-a-way-to-build-online-stores-by-chatting-with-ai/
- **Date** : 2026-10-01.
- **Chiffre(s) clé(s)** : aucun (ni marchands, ni taux d'usage).
- **Calibration** : `[confiance: moyenne · preuve: média]`
- **Ce qui manque pour confirmer** : nombre de marchands ayant accès ;
  disponibilité générale ou progressive ; annonce primaire Shopify (le flux
  Shopify Engineering du harvest est en 404).

### 9. Pi 1.0 : le harnais minimaliste se rallie à MCP

- **Fait observé** : le coding agent **Pi** (racheté par Earendil — Armin
  Ronacher, Colin Daymond Hanna — en avril 2026) passe en **1.0** avec support
  **MCP**, que son créateur Mario Zechner jugeait inutile. Ajoute « Codemode »
  (sandbox côté harnais) et un composant séparé **Pi Durable** (orchestration
  long-running, SQLite/JSONL).
- **Pourquoi c'est un progrès** : un sceptique déclaré de MCP l'intègre — signe
  que le protocole devient un coût d'entrée, cohérent avec l'item 1.
- **Source URL** :
  https://www.theregister.com/ai-and-ml/2026/10/02/pi-coding-agent-pulls-a-180-and-adds-mcp-support/5300678
- **Date** : 1.0 le 2026-10-01 (jeudi) ; article 2026-10-02.
- **Chiffre(s) clé(s)** : aucun d'adoption.
- **Calibration** : `[confiance: moyenne · preuve: média]`
- **Ce qui manque pour confirmer** : annonce primaire Earendil ; téléchargements
  du paquet Pi.

### 10. Microsoft : outils d'apps pilotées par coding agents ouverts à 425 000 clients Power BI

- **Fait observé** : Microsoft ouvre Fabric Apps / Fabric Database aux licences
  Power BI Pro et PPU sans surcoût ; SDK open source **Rayfin** conçu pour être
  piloté par GitHub Copilot, Claude Code, Codex « ou tout coding agent ». Chiffres
  d'Arun Ulag (EVP Microsoft) : 40 000 clients Fabric, 425 000 clients Power BI,
  35 M d'utilisateurs métier mensuels.
- **Pourquoi c'est un progrès** : distribution d'une chaîne « agent → app
  déployée » à une base installée réelle, ×10 la base actuelle.
- **Source URL** :
  https://www.theregister.com/applications/2026/09/29/redmond-to-millions-of-power-bi-users-youre-fabric-app-devs-now/5299552
- **Date** : 2026-09-29.
- **Chiffre(s) clé(s)** : 425 000 / 40 000 / 35 M (paroles Microsoft).
- **Calibration** : `[confiance: moyenne · preuve: corporate]` (chiffres
  donnés par l'exécutif, relayés par la presse).
- **Ce qui manque pour confirmer** : **preview « dans les prochaines
  semaines »** — pas encore déployé. Ne pas en faire une adoption avant GA.

### 11. Cadence des harnais de code (série primaire, faits bruts)

- **Fait observé** (releases GitHub, 29/09 → 05/10) : **Claude Code** v2.1.285 →
  v2.1.289, une stable par jour ; **Codex** 6 stables (0.159.0 → 0.160.1) + ~20
  alphas ; **gemini-cli** v0.62.0 stable (29/09) puis nightlies ;
  **openai-agents-python** v0.23.0/0.23.1 (02/10) ; **LangGraph** 1.2.13 (05/10) ;
  **crewAI** 1.15.23 (28/09). Téléchargements npm 28/09–04/10 : `@openai/codex`
  25,6 M (+5,7 % sem./sem.), `@anthropic-ai/claude-code` 14,8 M (+11,6 % sem./sem.,
  mais stable vs 31/08–06/09 à 14,8 M), `@google/gemini-cli` 0,45 M.
- **Pourquoi c'est un progrès** : rythme de produit en production continue ; le
  ratio Codex/Claude Code sur npm (≈ 1,7) est un fait mesurable, pas une part de
  marché.
- **Source URL** : https://github.com/anthropics/claude-code/releases/tag/v2.1.289
  · https://github.com/openai/codex/releases/tag/rust-v0.160.1
  · https://api.npmjs.org/downloads/point/2026-09-28:2026-10-04/@openai/codex
  · https://api.npmjs.org/downloads/point/2026-09-28:2026-10-04/@anthropic-ai/claude-code
- **Date** : 2026-09-29 → 2026-10-05.
- **Calibration** : `[confiance: haute · preuve: primaire]`
- **Ce qui manque pour confirmer** : npm n'est qu'un canal (Claude Code a aussi
  un installeur natif ; Codex un binaire Rust) — **ne pas comparer en parts de
  marché**. Fait brut annexe : **microsoft/autogen**, dernière release le
  30/09/2025 — un an sans release ; c'est une date, pas un abandon prouvé.

---

## Séries pour l'enquête de données (≥ 4 semaines, primaires)

### Moltbook — activité qui monte, inscriptions qui stagnent

Source : `data/harvest/*-primary.json` § `raw_public` (API
https://www.moltbook.com/api/v1/stats), relevé quotidien.

| Date | Agents | Vérifiés | Posts | Commentaires | Submolts |
|---|---|---|---|---|---|
| 2026-07-01 | 2 900 310 | 208 151 | 3 509 199 | 18 737 653 | 32 456 |
| 2026-08-01 | 2 905 569 | 209 761 | 3 811 471 | 20 192 612 | 32 935 |
| 2026-09-01 | 2 910 248 | 211 482 | 4 080 547 | 21 502 868 | 33 134 |
| 2026-09-28 | 2 918 956 | 214 140 | 4 317 961 | 22 601 156 | 33 281 |
| 2026-10-05 | 2 920 600 | 214 821 | 4 388 689 | 22 963 372 | 33 316 |

- Trois mois (01/07 → 05/10) : agents **+20 290 (+0,7 %)** ; vérifiés +6 670
  (+3,2 %) ; posts **+879 490 (+25 %)** ; commentaires +22,5 %.
- Dernière semaine (28/09 → 05/10) : +1 644 agents, ≈ 10 100 posts/jour
  (vs ≈ 9 400/jour du 01 au 08/07). L'activité tient, le recrutement est plat.
- `[confiance: moyenne · preuve: primaire]` — compteurs déclaratifs de la
  plateforme (Meta), non audités ; ne jamais dire « 2,9 M d'agents actifs ».

### MCP SDK et OpenClaw sur npm (cf. items 1 et 3)

| Semaine | `@modelcontextprotocol/sdk` | `openclaw` |
|---|---|---|
| 01–07/06 | 30,32 M | 2,53 M |
| 06–12/07 | 39,01 M | 2,09 M |
| 03–09/08 | 51,73 M | 2,60 M |
| 31/08–06/09 | 47,90 M | 3,33 M |
| 21–27/09 | 64,73 M | 3,34 M |
| 28/09–04/10 | 76,23 M | 4,50 M |

`[confiance: haute · preuve: primaire]` — API publique npm, reproductible.

### $MOLT (pour mémoire, pas un signal d'adoption)

Capitalisation CoinGecko : ~437 k$ (23/09) → ~358 k$ (05/10, 19:40 UTC).
Memecoin volatil ; à ne pas lire comme indicateur d'usage.

---

## Ce qui n'est PAS (encore) une adoption

| Annonce | Stade réel | Source |
|---|---|---|
| DoorDash, agent de commande par iMessage | **Liste d'attente US** | https://techcrunch.com/2026/09/30/doordash-launches-an-ai-agent-you-can-text-to-order-food/ |
| OpenClaw Enterprise | En développement, pas de release | item 4 |
| Specialist dots / Agent 365 | Pilotes entreprise, intégration « en cours » | item 6 |
| Rayfin / Fabric pour Power BI | Preview « dans les prochaines semaines » | item 10 |
| AWS Dogwood Local Engine | Bibliothèque Rust open source publiée ; adoption inconnue | https://www.theregister.com/ai-and-ml/2026/10/01/aws-offers-local-open-source-leash-for-agent-harnesses/5300578 |
| Armadin (K. Mandia) | **Financement** : série B 255,5 M$, valo > 2,5 Md$ — pas un revenu | https://techcrunch.com/2026/10/01/kevin-mandias-new-agent-swarm-security-startup-armadin-raises-255-5m-at-2-5b-valuation/ |
| Ghost (11 M$), Photon (4,5 M$), Flow Engineering (valo 750 M$) | Financements | harvest RSS TechCrunch 30/09–05/10 |

## Contre-signaux d'adoption (à arbitrer par l'éditeur)

- **Gartner** (via The Register, 30/09) : 70 % des entreprises abandonneront d'ici
  2028 les systèmes agentiques construits avec l'aide de l'éditeur (« forward-deployed
  engineering ») ; rappel d'une prédiction antérieure : 40 % des déploiements
  d'agents réduits ou décommissionnés. Prédiction d'analyste, pas une mesure.
  https://www.theregister.com/ai-and-ml/2026/09/30/7-in-10-enterprises-expected-to-abandon-vendor-built-agentic-ai-by-2028/5300021
  `[confiance: moyenne · preuve: média]`
- **Apple** (02/10) renforce le consentement autour de « Full Disk Access » sur
  macOS, citant les agents IA ; TechCrunch a **corrigé** son titre : il s'agit de
  consentement explicite, **pas d'une nouvelle limite**. Signal que les agents de
  bureau sont assez répandus pour que l'OS s'adapte.
  https://techcrunch.com/2026/10/02/apple-says-its-tightening-macos-full-disk-access-controls-due-to-new-risks-from-ai-agents/
  `[confiance: moyenne · preuve: média]` (blog développeur Apple non lu en primaire)
- **Trafic d'agents à l'échelle, non désiré** : une « flotte » d'agents sur
  infrastructure Tencent interrogeant Amap (Alibaba), repérée via urlquery
  (conclusions préliminaires de chercheurs indépendants).
  https://techcrunch.com/2026/10/05/researchers-are-tracking-a-chinese-ai-agent-fleet/
  `[confiance: basse · preuve: média]` — preuve de déploiement réel, mais
  préliminaire ; aucune attribution d'intention.
- Aveu OpenAI cité item 4 : « actual deployment of persistent agents remains
  limited ».

## Pistes pour l'éditeur (promoteur)

- **Enquête de données W41** : la paire « MCP SDK ×2,5 / Moltbook +0,7 % » donne
  une thèse chiffrée et datée : l'infrastructure agentique s'adopte dans les chaînes
  de build bien plus vite que les réseaux sociaux d'agents ne recrutent. Tous les
  chiffres sont primaires et reproductibles (API npm, API Moltbook, API MCP
  Registry). Faits absents des gros titres de la semaine.
- Ne pas mettre Dots en une comme « adoption » sans chiffre d'utilisateurs ;
  vérifier la redite W40.
- Tips : 0 sur 7 jours, rien à exploiter.
