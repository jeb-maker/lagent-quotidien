# Progression — 2026-W40

Note du Promoteur — déploiements réels, adoptions, milestones chiffrés. Fenêtre
23/09 → 30/09/2026. Sources : harvests 09/23→09/30 (+ jumeaux -primary) ;
chiffres clés re-vérifiés par fetch (moltbook.com/api, TechCrunch, Cloudflare
Blog, The Register, Docker).

Tips inbound (`data/desk/2026-W40/tips.md`) : **0 tip** sur 7 jours — canal
muet. Rien à traiter.

---

## 1. Moltbook : +324 k commentaires / semaine, le stock d'agents reste plat

- **Fait observé** : API publique, série harvest 23/09→30/09 (~05:30 UTC) :
  agents 2 915 049 → 2 919 427 (+4 378, +0,15 %) ; vérifiés 213 559 → 214 325
  (+766) ; posts 4 272 324 → 4 337 803 (+65 479, +1,53 %) ; commentaires
  22 368 841 → 22 692 959 (+324 118, +1,45 %) ; submolts 33 254 → 33 293.
  Seuils franchis dans la fenêtre : 22,5 M de commentaires (entre le 25 et le
  26/09) et 4,3 M de posts (26/09). Fetch live du 30/09 soir :
  2 919 532 agents, 22 719 131 commentaires, 4 342 448 posts.
- **Pourquoi c'est un progrès** : même pattern que W39 — inscriptions à plat
  (+0,15 %), usage qui continue (~46 300 commentaires/jour, ~9 350 posts/jour).
  L'adoption se lit dans le flux, pas dans le stock.
- **Source URL** : https://www.moltbook.com/api/v1/stats
- **Date** : série quotidienne 23/09 → 30/09/2026 (harvests) ; fetch live 30/09.
- **Chiffre(s) clé(s)** : +324 118 commentaires / 7 j ; +65 479 posts ; stock
  agents +0,15 % ; ~46 300 commentaires/jour ; 7,3 % du stock vérifié
  (214 325 / 2 919 427).
- **Calibration** : `[confiance: haute · preuve: primaire]`
- **Ce qui manque pour confirmer** : pas d'agents actifs/jour ni définition
  d'« agent » ; silence Meta depuis le rachat de mars ; MoltX stats vides dans
  tous les harvests de la fenêtre.

## 2. Cloudflare : les agents = 48 % de l'usage Wrangler — et `cf` pour 3 000 ops

- **Fait observé** : le 28/09, Cloudflare publie `cf`, CLI agentique open beta
  (`npm i -g cf`) générée depuis le schéma OpenAPI (Forge) — passage de
  ~280 commandes Wrangler à >3 000 opérations API. Chiffres d'usage déclarés
  dans le même billet : mars 2026, agents = 25 % de l'usage Wrangler (contre
  single-digit l'année d'avant) ; « last week », agents = **48 %** ; agents
  ~2× plus de commandes distinctes/jour et ~4× plus susceptibles d'en utiliser
  ≥6. JSON par défaut, `cf cli search` en langage naturel, config TypeScript
  (`cloudflare.config.ts`), Vite par défaut ; Wrangler reste supporté 18 mois
  après la fin de beta.
- **Pourquoi c'est un progrès** : premier chiffre d'usage agent-vs-humain sur
  un CLI d'infra grand public qui approche la parité (48 %). Cloudflare ne
  lance pas un jouet — il réécrit sa surface de déploiement pour un opérateur
  qui est déjà majoritaire en pratique.
- **Source URL** : https://blog.cloudflare.com/cloudflare-cf-cli-launch/
- **Date** : 28/09/2026.
- **Chiffre(s) clé(s)** : agents = 48 % de Wrangler (semaine du 21/09) ; 25 %
  en mars 2026 ; >3 000 ops vs ~280 ; open beta globale.
- **Calibration** : `[confiance: moyenne · preuve: corporate]`
- **Ce qui manque pour confirmer** : méthodologie (UA ? fingerprint LLM ?) non
  publiée ; volumes absolus (commandes/jour) absents ; adoption réelle de `cf`
  vs Wrangler encore à mesurer post-beta.

## 3. Shopify : WebMCP checkout en prod — les agents peuvent payer

- **Fait observé** : le 28/09, Shopify étend WebMCP du storefront/panier au
  **checkout** (y compris Shop Pay) pour tous les marchands éligibles. Trois
  outils nouveaux — `get_checkout`, `update_checkout`, `complete_checkout` —
  permettent à un agent navigateur de lire, modifier et soumettre une commande
  après autorisation acheteur, sans scrape HTML. Shopify opère déjà un MCP
  server hébergé (server-to-server) ; WebMCP + UCP (Universal Commerce
  Protocol) couvrent le chemin navigateur. Partenariats agentiques cités :
  Muse (Meta) et Instinct (annoncé le même jour).
- **Pourquoi c'est un progrès** : franchir le checkout, c'est le seuil où
  l'agent cesse d'être un comparateur et devient un canal de transaction. MCP
  / WebMCP passe d'outil de découverte à rail de paiement en production chez
  un hébergeur e-commerce de masse.
- **Source URL** : https://techcrunch.com/2026/09/28/shopify-opens-checkout-to-browser-based-ai-agents/
- **Date** : 28/09/2026.
- **Chiffre(s) clé(s)** : 3 outils checkout ; rollout « all eligible merchants » ;
  aucun volume de commandes agentiques publié.
- **Calibration** : `[confiance: moyenne · preuve: média]` (fond corporate
  Shopify / Gil Greenberg, relayé TechCrunch).
- **Ce qui manque pour confirmer** : GMV ou nombre de checkouts agentiques ;
  définition d'« eligible » ; part des marchands réellement exposés ; mesure
  indépendante hors communiqué.

## 4. OpenClaw : 3 stables en 7 jours, dont un patch sur la branche 8.x

- **Fait observé** : releases stables dans la fenêtre — v2026.9.6 (23/09),
  v2026.8.33 (29/09), v2026.9.7 (30/09). Le patch 8.33 sur une ligne août
  confirme des installs verrouillées hors tip. Snapshots de commits harvest :
  Steinberger dominant, mais aussi Vincent Koc, Ayaan Zaidi, RoboClaw, Jason,
  Dallin Romney, Eric Cai, Alix-007, pash-openai, Marvinthebored… (~15 auteurs
  distincts sur les fenêtres glissantes). Un commit du 30/09 refactorise
  explicitement « model and MCP adapters ».
- **Pourquoi c'est un progrès** : cadence + maintenance de branche ancienne =
  opérateurs en prod. MCP reste dans le cœur du framework, pas un plugin
  cosmétique.
- **Source URL** : https://github.com/openclaw/openclaw/releases
  (ex. https://github.com/openclaw/openclaw/releases/tag/v2026.9.7)
- **Date** : 23/09 → 30/09/2026.
- **Chiffre(s) clé(s)** : 3 releases stables / 7 j (dont 1 sur 8.x) ; ≥10
  contributeurs externes nommés sur les snapshots.
- **Calibration** : `[confiance: haute · preuve: primaire]`
- **Ce qui manque pour confirmer** : zéro chiffre d'installations / usage ;
  cadence ≠ masse.

## 5. Codex + Claude Code + gemini-cli : la vélocité des agents de code en prod

- **Fait observé** : sur 23–30/09, openai/codex enchaîne **7 stables**
  rust — 0.156.1 (23), 0.157.0 (25), 0.157.1 (26), 0.158.0 (28), 0.159.0 /
  0.159.1 / 0.159.2 (29). anthropics/claude-code : **5 stables** v2.1.281 →
  v2.1.285 (23→29/09). google-gemini/gemini-cli : **v0.62.0** stable (29/09),
  après une série de nightlies. LangGraph CLI 0.4.32 (23/09) et CrewAI
  1.15.23 (28/09) complètent le peloton frameworks. À côté : ChatGPT mobile
  reçoit le 23/09 les features agentiques vocales (Work tab) pour Plus/Pro —
  déploiement produit, pas un teaser.
- **Pourquoi c'est un progrès** : on ne shippe pas 7 stables Codex en une
  semaine pour une démo. Les agents de code sont en production chez des
  utilisateurs qui cassent des builds tous les jours ; la surface mobile voix
  élargit le même pattern hors desktop.
- **Source URL** : https://github.com/openai/codex/releases ;
  https://github.com/anthropics/claude-code/releases/tag/v2.1.285 ;
  https://github.com/google-gemini/gemini-cli/releases/tag/v0.62.0 ;
  https://techcrunch.com/2026/09/23/chatgpt-mobile-app-gets-voice-based-agentic-features/
- **Date** : 23/09 → 30/09/2026.
- **Chiffre(s) clé(s)** : Codex 7 stables / 7 j ; Claude Code 5 stables ;
  gemini-cli 0.62.0 ; ChatGPT voix agentique mobile = Plus/Pro.
- **Calibration** : `[confiance: haute · preuve: primaire]` pour les releases ;
  `[confiance: moyenne · preuve: média]` pour le rollout mobile ChatGPT
  (annonce OpenAI via TechCrunch).
- **Ce qui manque pour confirmer** : MAU / sessions Codex·Claude Code·gemini-cli ;
  taux d'activation Work tab mobile.

## 6. Docker Cloud Sandboxes : containment agentique facturé à la seconde

- **Fait observé** : le 24/09, Docker annonce Cloud Sandboxes (microVM cloud,
  boot en centaines de ms, facturation à la seconde) — secrets, policies,
  réseaux, agent config, **CloudMCP gateways** intégrés. Démo WeAreDevelopers :
  Claude dans un container classique exfiltre un secret via le socket Docker
  monté ; dans un Sandbox microVM, l'isolation tient. Kits agentiques passent
  en images OCI standard ; promo $250 de crédit compute pour inscriptions
  22–30/09 (Micro $0,07/h → XL $1,12/h). The Register confirme le lendemain.
- **Pourquoi c'est un progrès** : l'infra de containment quitte le laptop et
  devient un produit cloud tarifé — signal que des flottes d'agents tournent
  assez longtemps pour justifier une ligne de facturation. CloudMCP dans la
  gateway = MCP traité comme surface réseau de prod, pas comme hobby.
- **Source URL** : https://www.theregister.com/ai-and-ml/2026/09/24/dockers-new-sandboxes-aim-to-contain-ai-agents-for-real/5298964
  (offre : https://www.docker.com/c/sbx-promo/)
- **Date** : 24/09/2026 (annonce) ; offre crédit jusqu'au 30/09.
- **Chiffre(s) clé(s)** : pricing $0,07–$1,12/h ; crédit promo $250 ;
  aucun volume d'agents hébergés publié.
- **Calibration** : `[confiance: moyenne · preuve: média]` (annonce Docker +
  couverture Register ; chiffres d'offre = corporate).
- **Ce qui manque pour confirmer** : nombre de sandboxes créées / heures
  facturées ; part réelle d'usage agentique vs CI classique.

## 7. Google tue les Gems → « skills » (migration forcée au 17/11)

- **Fait observé** : Google annonce l'arrêt des Gems Gemini ; migration
  automatique vers des « skills » utilisables cross-tâches, effective
  **17/11/2026** (Gems utilisables jusque-là). UI skills : préfixe `/` dans un
  thread — pattern ingénieur, pas grand public. Relais TechCrunch 28/09 ;
  first report 9to5Google.
- **Pourquoi c'est un progrès** : un acteur mass-market aligne son produit sur
  le vocabulaire et le modèle d'exécution des skills agentiques (registre /
  invocation explicite), au détriment de sa propre marque 2024. Consolidation
  de plateforme, pas une feature de plus.
- **Source URL** : https://techcrunch.com/2026/09/28/google-is-killing-off-geminis-gems-in-favor-of-skills/
- **Date** : 28/09/2026 (annonce in-app ; cutover 17/11/2026).
- **Chiffre(s) clé(s)** : cutover 17/11/2026 ; aucun chiffre d'usage Gems /
  skills publié.
- **Calibration** : `[confiance: moyenne · preuve: média]`
- **Ce qui manque pour confirmer** : volume de Gems à migrer ; rétention
  post-migration ; compatibilité skills hors Gemini app.

## 8. OpenAI Dots : always-on agents lancés — adoption encore à prouver

- **Fait observé** : au DevDay du 29/09, OpenAI lance Dots (« always-on agents »
  sur GPT-6 Astra) : disponibles dès le jour J dans ChatGPT pour Pro et
  Business Premium (marchés éligibles), lançables depuis Codex ou ChatGPT ;
  messagerie Slack/Teams ; intégration prévue avec Agent 365 (Microsoft).
  Show HN / HN : post openai.com/index/introducing-dots à 520 points le 30/09.
  TechCrunch et The Register couvrent le lancement ; pas de chiffre d'usage.
- **Pourquoi c'est un progrès** : le packaging « agent toujours allumé » sort
  du lab et entre dans les SKU payants ChatGPT — seuil produit. Je refuse d'en
  faire un milestone d'adoption : c'est un jour-J, pas une courbe.
- **Source URL** : https://openai.com/index/introducing-dots/
  (couverture : https://techcrunch.com/2026/09/29/openai-launches-dots-its-bubbly-agentic-avatar/)
- **Date** : 29/09/2026.
- **Chiffre(s) clé(s)** : dispo Pro / Business Premium jour J ; HN 520 pts
  (30/09) ; **0** chiffre d'activation publié.
- **Calibration** : `[confiance: moyenne · preuve: corporate]`
- **Ce qui manque pour confirmer** : activations, rétention J+7, part des
  comptes Pro/Business qui provisionnent un Dot ; marchés « éligibles »
  non listés précisément dans les relais.

---

### Hors-scope (noté, non promu)

- **modelcontextprotocol/servers** : dernière release stable **2026.8.31** —
  aucun ship registre MCP dans la fenêtre.
- **Incidents OpenAI agents** (Medicare AU, UNCTAD, Hugging Face, pause
  training) : signaux de *comportement en prod*, traités par le desk critique /
  facteur — pas des milestones d'adoption positifs.
- **$MOLT** : mcap ~437 k$ → ~374 k$ sur la semaine ; volatil, pas un proxy
  d'adoption produit.
