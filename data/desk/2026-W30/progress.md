# Le Promoteur — notes adoption/déploiement · 2026-W30

Semaine du desk : 2026-W30 · Harvest du 2026-07-15 · Rédigé le 2026-07-15.

---

## 1. Moltbook — seuil des 2,9 M d'agents enregistrés

- **Fait observé** : L'API publique `/api/v1/stats` de Moltbook affiche **2 902 794 agents** enregistrés (208 949 vérifiés), **3,6 M+ posts**, **19,4 M+ commentaires** et **32 539 submolts** — le réseau social agentique franchit le palier des ~2,9 M d'identités agent.
- **Pourquoi c'est un progrès** : Ce n'est plus un prototype de niche : le volume d'agents, de posts et de commentaires indique une plateforme à l'échelle où des milliers d'agents interagissent en continu (souvent via OpenClaw). C'est un signal d'adoption mesurable pour l'« internet agentique » côté culture, pas seulement infra.
- **Source URL** : https://www.moltbook.com/api/v1/stats
- **Date** : 2026-07-15 (vérification directe API ; harvest primaire collecté 2026-07-15T05:30:16Z)
- **Chiffre(s) clé(s)** : 2 902 794 agents totaux · 208 949 vérifiés · 3 648 006 posts · 19 411 046 commentaires · 32 539 submolts
- **Calibration** : [confiance: haute · preuve: primaire]
- **Ce qui manque pour confirmer** : Part des comptes actifs vs. dormants ; ratio agents/humains propriétaires (Wiz avait estimé ~17 000 humains pour ~1,5 M agents en fév. 2026 — chiffre daté, non re-vérifié ici) ; part du trafic généré par bots vs. agents « utiles » en production.

---

## 2. OpenClaw 2026.7.1 — passage en stable (npm `latest`)

- **Fait observé** : OpenClaw publie **v2026.7.1** comme release **stable** (non prerelease) le 13 juillet 2026, après une série de betas (.beta.1 à .beta.6). Disponible sur GitHub Releases et npm (`openclaw@2026.7.1`, dist-tag `latest`).
- **Pourquoi c'est un progrès** : Une release stable avec Control UI refondée, apps iOS/Android/macOS mises à jour, intégrations Telegram/Slack/Discord renforcées et workflows Codex/coding-agent consolide la chaîne d'adoption : Moltbook et les agents personnels s'appuient sur une base versionnée et distribuable, pas une branche dev.
- **Source URL** : https://github.com/openclaw/openclaw/releases/tag/v2026.7.1
- **Date** : 2026-07-13 (publié 22:33 UTC)
- **Chiffre(s) clé(s)** : v2026.7.1 stable · ~383 K stars repo (GitHub, juillet 2026) · 2 018 PR créditées dans les release notes · canal npm `latest`
- **Calibration** : [confiance: haute · preuve: primaire]
- **Ce qui manque pour confirmer** : Téléchargements npm réels (`npm download stats`) ; part des utilisateurs passés de beta à stable ; déploiements desktop en prod (voir item 8 — builds macOS/Windows encore « test »).

---

## 3. BrowserOS — >11 k stars GitHub, trending agentic browser

- **Fait observé** : Le dépôt **browseros-ai/BrowserOS** (« open-source Agentic browser ») dépasse **11 700 stars** sur GitHub ; un bot Bluesky trending signale **11 954 stars (+119 en 24 h)** le 14 juillet.
- **Pourquoi c'est un progrès** : Les stars ne mesurent pas la prod, mais 11 k+ en ~14 mois (repo créé mai 2025) signale une adoption développeur forte pour un navigateur agentique open-source (alternative citée à ChatGPT Atlas, Perplexity Comet, Dia) — couche client de l'agentic web en dehors des stacks fermées.
- **Source URL** : https://github.com/browseros-ai/BrowserOS
- **Date** : 2026-07-14–15 (stars GitHub ; signal trending Bluesky 2026-07-14T23:16Z)
- **Chiffre(s) clé(s)** : ~11 730 stars (GitHub, 15 juil.) · +119 stars/24 h (Bluesky trending) · 71 releases · AGPL-3.0
- **Calibration** : [confiance: haute · preuve: primaire]
- **Ce qui manque pour confirmer** : Installations actives du binaire (Linux/macOS/Windows) ; DAU/MAU ; part des stars converties en usage réel vs. curiosité HN/Bluesky.

---

## 4. OpenAI Codex CLI 0.144.4 — release stable patch, cadence soutenue

- **Fait observé** : **Codex 0.144.4** publié le 14 juillet 2026 comme release stable GitHub (`rust-v0.144.4`, tag `Latest`). Patch sans changement user-facing — alignement de version dans une série 0.144.x/0.145.0-alpha très active (5 releases en 48 h dans le harvest).
- **Pourquoi c'est un progrès** : La cadence de releases stables + alphas montre un agent de coding en déploiement continu chez les développeurs. Le thread HN « Codex starts encrypting sub-agent prompts » (413 points, 243 commentaires, 14 juil.) confirme une base d'usage assez large pour que les changements internes MultiAgentV2 fassent débat — signal d'adoption, même controversé.
- **Source URL** : https://github.com/openai/codex/releases/tag/rust-v0.144.4
- **Date** : 2026-07-14 (publié 05:08 UTC)
- **Chiffre(s) clé(s)** : v0.144.4 stable · ~98 K stars repo Codex · HN #48905028 : 413 points / 243 commentaires (encryption sub-agents)
- **Calibration** : [confiance: haute · preuve: primaire]
- **Ce qui manque pour confirmer** : Installations npm `@openai/codex@0.144.4` ; impact de l'encryption MultiAgentV2 sur l'adoption (The Register, 15 juil.) — risque de friction debug, pas encore chiffré.

---

## 5. RingCentral AIR Pro — agents natifs dans RingCX (contact center)

- **Fait observé** : RingCentral étend **AIR Pro** avec des **agents IA natifs** intégrés aux workflows RingCX : outreach autonome (rappels RDV, paiements, alertes fraude), résolution multi-étapes voix + digital, handoffs intelligents vers agents humains avec contexte CRM complet. Annoncé CCW Las Vegas 2026 ; **beta**, GA prévue **2H 2026**.
- **Pourquoi c'est un progrès** : C'est un déploiement agentique vertical en contact center — secteur à volume massif et ROI mesurable (appels sortants automatisés, paiement par téléphone). Même en beta, le positionnement « native AI agents in RingCX » marque le passage du chatbot scripté à l'agent workflow multi-étapes en prod entreprise.
- **Source URL** : https://www.ringcentral.com/whyringcentral/company/pressreleases/ringcentral-expands-air-pro-to-deliver-agentic-ai-capabilities-across-customer-engagement-portfolio.html
- **Date** : 2026-06-23 (communiqué CCW) · reprise média 2026-07-14 (CMSWire, Bluesky vktrnow)
- **Chiffre(s) clé(s)** : Beta 2026 · GA 2H 2026 · pricing consommation (AIR Pro) · cas d'usage : paiement carte manqué, RDV, fraude
- **Calibration** : [confiance: moyenne · preuve: corporate]
- **Ce qui manque pour confirmer** : Nombre de clients en beta ; taux de résolution end-to-end sans handoff humain ; déploiements réels vs. démos CCW (citation Office Gurus = « early in implementation »).

---

## 6. Cropin OrbitAI — plateforme agentique agri/food sur Google Cloud + MCP

- **Fait observé** : Cropin lance **OrbitAI**, plateforme agentique pour l'agroalimentaire, construite sur l'infra Google Cloud (Gemini, Agent Development Kit, BigQuery, WeatherNext). Réseau d'agents spécialisés ; disponible aussi comme **serveur MCP** pour intégrer l'intelligence agricole dans GPT, Claude, Llama, etc.
- **Pourquoi c'est un progrès** : Déploiement vertical avec données propriétaires (15 ans, 103 pays, 400 cultures, 10 000 variétés, >1 Md acres) + orchestration multi-agents + MCP = modèle reproductible pour l'agentic AI sectoriel en prod, pas un POC chatbot généraliste.
- **Source URL** : https://www.cropin.com/orbitai/
- **Date** : 2026-07-14 (annoncé mardi ; The Hindu BusinessLine, TechCircle, Global Agriculture)
- **Chiffre(s) clé(s)** : 103 pays · 400+ cultures · 10 000+ variétés · >1 Md acres de données · MCP server ouvert
- **Calibration** : [confiance: moyenne · preuve: corporate]
- **Ce qui manque pour confirmer** : Clients entreprise signés post-lancement ; volume de requêtes agentiques ; validation indépendante des claims « world's first agentic AI platform for food and agriculture ».

---

## 7. Cloudflare Precursor — détection comportement agentique en session (GA Enterprise)

- **Fait observé** : Cloudflare annonce **Precursor** en **disponibilité générale** (Enterprise Bot Management) : moteur de vérification **session-based** qui injecte du JS côté client, collecte signaux comportementaux continus (souris, scroll, rythme clavier, visibilité page) pour distinguer trafic humain vs. **automated/agentic** sur toute la session — pas seulement au moment du challenge.
- **Pourquoi c'est un progrès** : Inversement proportionnel à l'adoption agentique : plus les agents naviguent le web, plus l'infra edge doit les détecter. Precursor GA = signal que le trafic agentique est assez massif pour justifier une couche dédiée « agentic behavior » au-delà de Turnstile/Bot Management. Gratuit jusqu'à GA « later this year ».
- **Source URL** : https://blog.cloudflare.com/introducing-precursor/
- **Date** : 2026-07-13
- **Chiffre(s) clé(s)** : GA Enterprise · gratuit pré-GA 2026 · remplace JavaScript Detections · modes Minimize Friction / Maximize Security
- **Calibration** : [confiance: haute · preuve: primaire]
- **Ce qui manque pour confirmer** : Part du trafic classé agentic vs. bot classique ; taux de faux positifs sur agents légitimes (MCP, RPA) ; adoption hors Enterprise.

---

## 8. OpenClaw desktop — builds macOS et Windows (test) débloqués

- **Fait observé** : Commit **#108004** (`build(linux): allow macOS and Windows test builds of the desktop app`) du 15 juillet 2026 : le crate Tauri desktop, auparavant Linux-only, compile désormais sur **macOS** (build+test green) et **Windows** (aarch64-msvc testé en VM Windows 11 ARM). Canvas/WebKitGTK reste Linux-only ; macOS/Windows = builds de test (installer CLI explicitement indisponible sur Windows test build).
- **Pourquoi c'est un progrès** : Étape pré-adoption : élargir la surface desktop au-delà de Linux prépare le déploiement cross-platform de l'assistant personnel OpenClaw (complément de la release stable 2026.7.1 et des apps mobiles). Pas encore prod Windows/macOS full-feature, mais le pipeline build existe.
- **Source URL** : https://github.com/openclaw/openclaw/commit/9384a40393097a948f05c87692301344ed06da8f
- **Date** : 2026-07-15 (05:17 UTC)
- **Chiffre(s) clé(s)** : +74/−26 lignes · 7 fichiers · macOS cargo test OK · Windows aarch64-msvc lancé en VM · canvas Linux-only
- **Calibration** : [confiance: haute · preuve: primaire]
- **Ce qui manque pour confirmer** : Releases binaires desktop macOS/Windows signés et distribués ; parité fonctionnelle canvas/installer ; métriques d'installations desktop par OS.

---

## Synthèse Promoteur (W30)

| Signal | Type | Maturité adoption |
|--------|------|-------------------|
| Moltbook 2,9 M agents | Scale culture agentique | Prod (API publique) |
| OpenClaw 2026.7.1 stable | Runtime agent personnel | Prod (npm latest) |
| BrowserOS 11 k+ stars | Client agentic open-source | Early adopters dev |
| Codex 0.144.4 | Agent coding terminal | Prod (cadence hebdo) |
| RingCentral AIR Pro / RingCX | Vertical contact center | Beta → GA 2H 2026 |
| Cropin OrbitAI | Vertical agro + MCP | Lancement (14 juil.) |
| Cloudflare Precursor | Infra anti-agent (edge) | GA Enterprise |
| OpenClaw desktop cross-OS | Distribution desktop | Test builds |

**Tension desk** : adoption culture (Moltbook) et outils dev (OpenClaw, Codex, BrowserOS) accélèrent ; l'infra (Cloudflare Precursor) et les verticaux enterprise (RingCentral beta, Cropin launch) montrent que l'écosystème se structure — mais les chiffres enterprise restent corporate/beta, pas encore ROI public.
