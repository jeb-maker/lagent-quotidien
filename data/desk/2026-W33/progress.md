# Progress / adoption — 2026-W33 (Promoteur)

> **Refresh 2026-08-10** (harvests 07→10/08, veille de bouclage). Ce qui bouge :
> Cloudflare passe de l'annonce (Wallets) à la livraison (Kitesurf, Cloudflare OS
> open-sourcé) ; un standard d'interop agent signé à cinq ; et un contre-signal
> média sérieux sur l'adoption réelle (usage « low tens of millions »). Moltbook
> population toujours plate, activité (posts/commentaires) en hausse continue.

## Nouveaux (harvests 06→10/08)

### Fait observé
Cloudflare Kitesurf : navigateur agent-first, stateless, tournant sur Workers (V8 isolates), **lancé** le 6 août — produit disponible, pas une roadmap.
- **Pourquoi c'est un progrès** : après Wallets (annonce), Cloudflare livre un composant concret de la pile agentique ; couverture presse indépendante le jour même + traction HN (178 pts).
- **Source URL** : https://blog.cloudflare.com/kitesurf/ ; https://techcrunch.com/2026/08/07/cloudflare-launches-kitesurf-a-browser-built-for-ai-agents/ ; https://news.ycombinator.com/item?id=49208393
- **Date** : 2026-08-06 (lancement) / 2026-08-07 (TechCrunch)
- **Chiffre(s) clé(s)** : « uses less computing power than Chromium » (TechCrunch) — aucun chiffre d'usage
- **Calibration** : `[confiance: haute · preuve: média]` (lancement confirmé par presse ; les claims de perf restent corporate)
- **Ce qui manque pour confirmer** : sessions/jour, développeurs actifs, benchmarks tiers vs Chromium

### Fait observé
« Agent Plugins 1.0 » : OpenAI + quatre rivaux s'accordent sur un standard commun de plugins/skills inter-agents (« write-once-run-anywhere » pour outils et skills entre plateformes).
- **Pourquoi c'est un progrès** : l'interopérabilité est le prérequis d'une adoption cross-plateforme ; qu'ils signent à cinq est le signal, pas la spec elle-même.
- **Source URL** : https://thenextweb.com/news/openai-agent-plugins-open-standard-skills-mcp ; https://www.theregister.com/devops/2026/08/07/ai-titans-to-tidy-agent-frontier-with-plugin-prescription/5285017
- **Date** : 2026-08-06 / 2026-08-07
- **Chiffre(s) clé(s)** : 5 signataires ; zéro implémentation en prod connue
- **Calibration** : `[confiance: moyenne · preuve: média]`
- **Ce qui manque pour confirmer** : ⚠️ annoncé ≠ livré — attendre les premières implémentations effectives (runtimes qui chargent un plugin 1.0 tiers). Une spec signée peut rester lettre morte (cf. historiques d'interop).

### Fait observé
Cloudflare OS : plateforme agents/apps/travail construite pour les employés Cloudflare, **open-sourcée** le 5-6 août.
- **Pourquoi c'est un progrès** : c'est du dogfooding réel (utilisé en interne avant publication) — la forme d'adoption la plus vérifiable qu'une annonce puisse porter ; traction HN massive (516 pts).
- **Source URL** : https://blog.cloudflare.com/cloudflare-os/ ; https://arstechnica.com/ai/2026/08/cloudflare-open-sources-vibe-coding-platform-for-people-who-arent-coders/ ; https://news.ycombinator.com/item?id=49182996
- **Date** : 2026-08-05 / 2026-08-06
- **Chiffre(s) clé(s)** : aucun chiffre d'usage interne publié
- **Calibration** : `[confiance: haute · preuve: média]` (open-sourcing confirmé par Ars ; l'ampleur de l'usage interne reste corporate)
- **Ce qui manque pour confirmer** : nombre d'employés utilisateurs, adoption externe du repo (à mesurer dans 2-4 semaines)

### Contre-signal (à assumer dans l'édition)
Wired (6 août) : l'usage réel des agents IA reste « in the low tens of millions » d'utilisateurs — pas de « ChatGPT moment ».
- **Pourquoi c'est important** : c'est le chiffre qui calibre tout le reste de cette note. L'infrastructure (wallets, browsers, standards) se livre plus vite que l'adoption ne suit.
- **Source URL** : https://bsky.app/profile/mzeff.bsky.social/post/3msh2xkrvxc2w (post de l'auteur, renvoie à l'article wired.com « why no ChatGPT moment for agents ») ; relais éditorial https://bsky.app/profile/wired.com/post/3msgtbod5mh2e
- **Date** : 2026-08-06
- **Chiffre(s) clé(s)** : « low tens of millions » d'usagers d'agents, monde entier
- **Calibration** : `[confiance: moyenne · preuve: média]` (un seul média, mais à rebours de son propre biais pro-tech — signal fort)
- **Ce qui manque pour confirmer** : méthodologie du chiffre (l'article complet n'est pas dans le harvest)

## Mis à jour (tenaient au 6/08, confirmés ou précisés)

### Fait observé
Moltbook API stats (10 août) : 2 906 752 agents ; 210 154 verified (~7,23 %) ; 3 896 904 posts ; 20 611 583 commentaires.
- **Pourquoi c'est un progrès** : la série 05→10/08 confirme le plateau de population (+658 agents en 5 jours, ~0,02 %) mais l'**activité** croît : ~8-9 k posts/jour et ~45 k commentaires/jour sur 07→10. La population stagne, l'usage par agent non.
- **Source URL** : https://www.moltbook.com/api/v1/stats
- **Date** : 2026-08-10 (série quotidienne 07→10 dans les harvests primaires)
- **Chiffre(s) clé(s)** : agents 2 906 094 (05/08) → 2 906 752 (10/08) ; commentaires 20 472 853 (07/08) → 20 611 583 (10/08)
- **Calibration** : `[confiance: haute · preuve: primaire]`
- **Ce qui manque** : définition « verified » ; part de bots inactifs dans le total

### Fait observé
OpenClaw : cadence soutenue confirmée — release stable v2026.6.34 publiée le 8 août (branche maintenance), ~15 commits/jour observés chaque matin du 07 au 10.
- **Pourquoi c'est un progrès** : la cadence tient quatre jours de plus ; maintenir une branche 2026.6 en parallèle des beta 2026.7.2 est un comportement de projet avec des utilisateurs en prod à ne pas casser.
- **Source URL** : https://github.com/openclaw/openclaw/releases/tag/v2026.6.34
- **Date** : 2026-08-08
- **Chiffre(s) clé(s)** : PR #119780→#121420 en ~3 jours (vélocité du tracker)
- **Calibration** : `[confiance: haute · preuve: primaire]`
- **Ce qui manque** : adoption downstream (déploiements réels, pas stars)

### Fait observé
$MOLT (Base) : mcap remonté de ~380 k$ (05/08) à ~399 k$ (10/08) ; vol 24h ~169-193 k$ sur la période ; +8,3 % le 07, puis stable.
- **Pourquoi** : baromètre marché, pas thèse — le creux du 5/08 s'est comblé, rien de plus.
- **Source URL** : https://www.coingecko.com/en/coins/moltbook
- **Date** : 2026-08-10
- **Calibration** : `[confiance: moyenne · preuve: primaire]` (données agrégateur ; liquidité/wash trading non auditables)
- **Ce qui manque** : liquidité réelle

## Inchangés depuis le 6/08 (ni confirmés ni dégonflés)

### Fait observé
Cloudflare Wallets + Monetization Gateway (x402) : **statu quo** — aucun chiffre de volume, aucun merchant live documenté dans les harvests 07→10 ; seuls des relais du blog circulent (dont un post Cloudflare du 6/08 réaffirmant la vision « agents = visiteurs payants »).
- **Source URL** : https://blog.cloudflare.com/wallets/ ; relais https://bsky.app/profile/cloudflare.social/post/3msg46navjb25
- **Date** : 2026-08-04 (annonce) ; rien de neuf au 10/08
- **Calibration** : `[confiance: moyenne · preuve: corporate]` (inchangée)
- **Ce qui manque** : toujours GMV, wallets actifs, merchants hors annonce. Quatre jours sans preuve d'usage : reste une annonce.

### Fait observé
Warp Agent CLI : aucun signal nouveau (usage, seats, retours) dans les harvests 07→10.
- **Source URL** : https://www.warp.dev/blog/introducing-the-warp-agent-cli-coding-agent
- **Date** : 2026-08-04 ; rien de neuf au 10/08
- **Calibration** : `[confiance: moyenne · preuve: corporate]` (inchangée)
- **Ce qui manque** : métriques d'usage — sans elles d'ici une semaine, l'item descend en simple release.

## À surveiller (trop tôt / preuve faible)

- **Meta Muse Code** (5/08) : agent de coding pour grosses bases de code, lancé. Produit livré mais zéro métrique ; à re-regarder si des chiffres d'usage sortent. https://techcrunch.com/2026/08/05/meta-launches-muse-code-an-ai-agent-for-large-code-bases/ · `[confiance: haute · preuve: média]` (lancement seul)
- **OSL AgentPay** (7/08) : infra de paiement multi-stablecoins pour agents — deuxième acteur sur le créneau paiement agentique en une semaine (après Cloudflare Wallets), mais source unique de seconde main. https://bsky.app/profile/eu-agi.bsky.social/post/3msia7exnyu25 · `[confiance: basse · preuve: rapporté]`
- **Imperva via relais** (6/08) : « 53 % du trafic internet = bots, contre 37 % en 2025 » — milestone macro du web agentique, mais chiffre relayé sans lien direct vérifiable vers le rapport. https://bsky.app/profile/meja.bsky.social/post/3msfzqec2sc25 · `[confiance: basse · preuve: rapporté]`

## Non retenu comme adoption

- Codex rust : release **stable** 0.147.0 le 7/08 (n'est plus que des alphas) — livré, mais cadence de release ≠ adoption ; pas de métrique. https://github.com/openai/codex/releases/tag/rust-v0.147.0
- Nvidia « open AI industry group » (TC) — toujours trop vague (inchangé).
- Qwen3.8 Max n°1 de l'« agentic index » (HN 469 pts, 06/08) — classement de benchmark, pas un déploiement.
- Klaviyo rachète Agency (05/08) — mouvement corporate, pas une adoption mesurée.
- Épisodes « rogue agents » OpenAI/Anthropic (Black Hat, 05-10/08) — dossier sécurité, hors périmètre adoption ; je le laisse aux collègues.
