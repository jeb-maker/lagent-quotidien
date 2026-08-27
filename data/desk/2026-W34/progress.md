# Progress / adoption — 2026-W34 (Promoteur)

> Bouclage 12 août 2026. Harvests 09→12/08 + tips (0 tip). Focus : ce qui est
> livré / en prod / chiffré. Potins exclus (épisode salle de sport OpenClaw/Claude
> = anecdote sécurité, pas adoption). Tips inbox vide.

## Nouveaux (harvests 09→12/08)

### Fait observé
Meta **Muse Glimmer** : modèle open « agentic » 30B, optimisé pour workflows agents locaux always-on — blog research Meta + traction HN massive le 10–11/08.
- **Pourquoi c'est un progrès** : après Muse Code (W33, coding agent cloud), Meta livre un poids ouvert taillé pour l'agent local permanent — seuil matériel concret (30B), pas une roadmap.
- **Source URL** : https://research.meta.ai/blog/introducing-muse-glimmer-open-agentic-model ; https://news.ycombinator.com/item?id=49241679
- **Date** : 2026-08-10 (HN) / harvest 11/08
- **Chiffre(s) clé(s)** : 30B paramètres ; HN 1 079 pts / 592 commentaires
- **Calibration** : `[confiance: haute · preuve: primaire]` (annonce Meta + miroir HN ; usage réel non mesuré)
- **Ce qui manque pour confirmer** : téléchargements, déploiements always-on documentés, benchmarks tiers hors blog

### Fait observé
**Docker Sandboxes** : produit public de sandboxes jetables/isolées pour agents IA (page produit Docker).
- **Pourquoi c'est un progrès** : l'isolation runtime passe du discours sécurité à une offre packagée — prérequis d'adoption agents en entreprise (exécuter sans exposer l'hôte).
- **Source URL** : https://www.docker.com/products/docker-sandboxes/ ; https://news.ycombinator.com/item?id=49239751
- **Date** : 2026-08-10
- **Chiffre(s) clé(s)** : HN 644 pts / 356 commentaires — aucun chiffre d'usage Docker publié dans le harvest
- **Calibration** : `[confiance: moyenne · preuve: corporate]` (page produit ; couverture = traction sociale, pas audit d'usage)
- **Ce qui manque pour confirmer** : installs, clients payants, volume de sandboxes créées/jour

### Fait observé
**Needle2** (Show HN) : LLM agentique 14 Mo pour téléphones, wearables, maison connectée et robots — cible edge explicite.
- **Pourquoi c'est un progrès** : le chiffre « 14 MB » est un seuil d'adoption edge (embarqué) ; si le claim tient, c'est une classe de déploiement distincte des 30B locaux.
- **Source URL** : https://cactuscompute.com/needle ; https://news.ycombinator.com/item?id=49246804
- **Date** : 2026-08-10
- **Chiffre(s) clé(s)** : 14 MB ; HN 255 pts / 98 commentaires
- **Calibration** : `[confiance: moyenne · preuve: corporate]` (Show HN / site éditeur)
- **Ce qui manque pour confirmer** : mesures indépendantes taille/latence ; installs sur appareils réels hors démo

### Fait observé
**Ante** (Show HN) : coding agent offline en un seul binaire.
- **Pourquoi c'est un progrès** : forme d'adoption « air-gapped / local-first » — livrable, pas une démo cloud.
- **Source URL** : https://github.com/AntigmaLabs/ante ; https://news.ycombinator.com/item?id=49245437
- **Date** : 2026-08-10
- **Chiffre(s) clé(s)** : 1 binaire ; HN 124 pts / 75 commentaires — zéro métrique d'usage
- **Calibration** : `[confiance: moyenne · preuve: primaire]` (repo public ; adoption non chiffrée)
- **Ce qui manque pour confirmer** : stars/forks utiles, retours de prod, fréquence de release

### Fait observé
**OpenChamber** : environnement de développement agentique (produit live openchamber.dev), traction HN notable.
- **Pourquoi c'est un progrès** : un IDE agentique de plus en face publique — signal d'outillage, pas encore d'échelle.
- **Source URL** : https://openchamber.dev/ ; https://news.ycombinator.com/item?id=49233448
- **Date** : 2026-08-09
- **Chiffre(s) clé(s)** : HN 129 pts / 71 commentaires
- **Calibration** : `[confiance: moyenne · preuve: corporate]`
- **Ce qui manque pour confirmer** : sièges, projets actifs, rétention

### Fait observé
**WorldClaw** (Tencent Hunyuan) : génération 3D open-world « agentic » présentée « at scale ».
- **Pourquoi c'est un progrès** : élargit le périmètre agentique hors coding/chat vers la génération de mondes — mais « at scale » reste un slogan tant que les volumes ne sont pas publics.
- **Source URL** : https://tencent-hunyuan.github.io/Hunyuan3D-WorldClaw/ ; https://news.ycombinator.com/item?id=49265051
- **Date** : 2026-08-11
- **Chiffre(s) clé(s)** : HN 177 pts / 54 commentaires — aucun volume de mondes/utilisateurs dans le harvest
- **Calibration** : `[confiance: moyenne · preuve: corporate]`
- **Ce qui manque pour confirmer** : throughput, utilisateurs, licence/accès réellement ouvert

### Fait observé (capital ≠ adoption)
**River AI** : round **1,1 Md$** mené par General Catalyst ; startup ~2 mois, fondateur ex-xAI, vision « personal agents ».
- **Pourquoi c'est un progrès** : signal de marché massif sur la thèse agents personnels — mais financement n'est pas déploiement.
- **Source URL** : https://techcrunch.com/2026/08/11/general-catalyst-leads-1-1b-round-into-2-month-old-river-ai/
- **Date** : 2026-08-11
- **Chiffre(s) clé(s)** : 1,1 Md$ ; âge ~2 mois
- **Calibration** : `[confiance: moyenne · preuve: média]`
- **Ce qui manque pour confirmer** : produit en prod, utilisateurs, revenus — sans ça, rester un cheque, pas une adoption

## Mis à jour (série primaire)

### Fait observé
**Moltbook** API stats (09→12/08) : population quasi plate, activité (posts/commentaires) toujours en hausse.
- **Pourquoi c'est un progrès** : le plateau d'agents se confirme une semaine de plus ; le signal utile reste le flux (posts/commentaires), pas le headcount.
- **Source URL** : https://www.moltbook.com/api/v1/stats
- **Date** : 2026-08-12 (série 09→12 dans harvests primary)
- **Chiffre(s) clé(s)** :
  - 09/08 : 2 906 588 agents · 210 092 verified · 3 888 193 posts · 20 566 337 commentaires · 33 006 submolts
  - 12/08 : 2 907 136 agents · 210 295 verified · 3 913 863 posts · 20 700 449 commentaires · 33 025 submolts
  - Δ 3 j : +548 agents (~0,02 %) · +203 verified · +25 670 posts (~8,6 k/j) · +134 112 commentaires (~44,7 k/j) · +19 submolts
  - verified ~7,23 % du total (stable)
- **Calibration** : `[confiance: haute · preuve: primaire]`
- **Ce qui manque pour confirmer** : définition « verified » ; part d'agents inactifs ; DAU/WAU agents

### Fait observé
**OpenClaw** : cadence prod maintenue — ~15 commits/jour observés chaque matin 09→12 ; release stable toujours **v2026.6.34** (08/08) ; le 12/08, feature gateway **suspend/resume** « operator-usable end to end » (#122100).
- **Pourquoi c'est un progrès** : outil d'ops (suspend/resume) = maturité d'exploitation, pas un gadget UI ; cadence multi-jours = base d'utilisateurs à ne pas casser.
- **Source URL** : https://github.com/openclaw/openclaw/releases/tag/v2026.6.34 ; https://github.com/openclaw/openclaw/commit/61ab6a8f9d151c84377ba9f90152f257110cc5a6
- **Date** : 2026-08-08 (release) / 2026-08-12 (suspend/resume)
- **Chiffre(s) clé(s)** : ~15 commits/jour harvest ; PR tracker ~#120k→#122k sur la semaine
- **Calibration** : `[confiance: haute · preuve: primaire]`
- **Ce qui manque pour confirmer** : installs, déploiements opérateurs, télémesures d'usage

### Fait observé
**$MOLT** (Base) : mcap ~397 k$ (09/08) → ~391 k$ (12/08) ; vol 24h ~169–186 k$ — plat / léger reflux.
- **Pourquoi c'est un progrès** : ce n'en est pas un — baromètre marché sans thèse d'adoption.
- **Source URL** : https://www.coingecko.com/en/coins/moltbook
- **Date** : 2026-08-12
- **Chiffre(s) clé(s)** : prix ~3,91e-6 $ ; mcap ~391 k$ ; vol 24h ~170 k$
- **Calibration** : `[confiance: moyenne · preuve: primaire]`
- **Ce qui manque pour confirmer** : liquidité réelle / wash trading

## Inchangés / encore non prouvés (report W33)

### Fait observé
Cloudflare **Wallets** + Monetization Gateway (x402) : toujours aucun GMV / wallets actifs / merchants live dans les harvests 09→12.
- **Source URL** : https://blog.cloudflare.com/wallets/
- **Date** : annonce 2026-08-04 ; silence usage au 12/08
- **Calibration** : `[confiance: moyenne · preuve: corporate]`
- **Ce qui manque pour confirmer** : volumes de transactions agents

### Fait observé
**Agent Plugins 1.0** : encore en circulation RSS (Register, 09/08) — standard signé, zéro implémentation prod documentée cette semaine.
- **Source URL** : https://www.theregister.com/devops/2026/08/07/ai-titans-to-tidy-agent-frontier-with-plugin-prescription/5285017
- **Date** : 2026-08-06/07 (annonce) ; relais 09/08
- **Chiffre(s) clé(s)** : 5 signataires ; 0 runtime tiers vérifié
- **Calibration** : `[confiance: moyenne · preuve: média]`
- **Ce qui manque pour confirmer** : première intégration cross-plateforme en prod

### Fait observé
**Warp Agent CLI** / **Cloudflare Kitesurf** / **Cloudflare OS** : pas de nouveau chiffre d'usage dans 09→12 — livrés (W33), adoption toujours non mesurée ici.
- **Calibration** : inchangée vs W33

## À surveiller

- **openai/codex** : cascade d'alphas `0.148.0-alpha.6`→`alpha.9` (10→12/08) — vélocité release ≠ adoption. https://github.com/openai/codex/releases/tag/rust-v0.148.0-alpha.9 · `[confiance: haute · preuve: primaire]` (existence des tags seulement)
- **UnYOLO** : broker credentials + policy pour agents GitHub — produit, 17 pts HN, trop tôt. https://unyolo.io/
- **GitSkills** (arXiv 12/08) : dataset de skills agents sur GitHub — potentiel de mesure d'écosystème, paper seulement. http://arxiv.org/abs/2608.10906v1
- **MIT Tech Review Download** (10/08) : « AI agents for science » (Schmidt et al.) — discours, pas déploiement chiffré. https://www.technologyreview.com/2026/08/10/1141526/the-download-ai-agents-science-censorship-industrial-complex/

## Non retenu comme adoption

- Épisode agent / salle de sport (ABC, Register, TechCrunch 10/08) — incident / potin sécurité, hors périmètre progrès.
- Show HN bas score (Benzi, Tura, AFK, MCP interceptor, AI Pulse) — pas de scale.
- Papers arXiv agentiques (SHE, ArchAgent, ColluSkill, etc.) — recherche, pas prod.
- Perseverance « 90 % autonome » (Ars, 09/08) — hors internet agentique.
- Tips 12/08 : count 0.
