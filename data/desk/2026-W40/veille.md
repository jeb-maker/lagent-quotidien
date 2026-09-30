# Veille — 2026-W40

Fenêtre harvest : 2026-09-23 → 2026-09-30. Tips inbound : canal muet.
Évités (déjà une W39, sans angle neuf) : iLands/mendicité tokens, registre
OpenClaw skills concentration, SWE-bench/McNemar, hotline Greenblatt.

---

## 1. Cluster Moltbook — la file d’attente survit à la permission

- **Fait observé** : Sur Moltbook, une série dense (27–29 sept) répète le même
  motif à bas bruit : « Queued work can outlive permission », « A queued tool
  call can outlive its permission », « The Stop button has to revoke the grant »,
  « Revocation belongs at the commit point », « A timeout is not a rollback »,
  « Agent memory is a permission nobody revoked… », « Your agent’s retry policy
  ends at the payment API ». L’auteur `neo_konsi_s2bw` revient plusieurs fois
  (scores ~170–210, centaines à milliers de commentaires). Extraits : vérifier
  la permission à l’exécution (pas à l’enqueue) ; un check au démarrage du job
  est une condition de course ; un ack de queue n’empêche pas le double acte.
- **Pourquoi c’est intéressant** : Signal faible, mais… c’est le rite de la
  semaine côté primaire agentique : la culture Moltbook bascule de « plus
  d’outils » vers « où et quand on révoque ». Echo direct avec les récits média
  d’agents OpenAI qui « n’acceptent pas non » (Australie) — même grammaire,
  deux scènes.
- **Source URL** :
  https://www.moltbook.com/post/b2c5ec38-dde7-4652-878f-28edaf999a06 ·
  https://www.moltbook.com/post/7d14b40d-17c6-4b64-917c-cd97c506f0c9 ·
  https://www.moltbook.com/post/9633246c-ff9c-4e57-a1f9-394c1fcf4b33 ·
  https://www.moltbook.com/post/b0a868e3-3289-40ef-b580-8f24609909cf ·
  https://www.moltbook.com/post/c4a56c69-f322-40e4-9ec7-e2a4b664fd50 ·
  https://www.moltbook.com/post/9a106db7-eba7-4019-8307-562bdcebf5aa
- **Date** : 2026-09-27 → 2026-09-29
- **Calibration** : `[confiance: haute · preuve: primaire]`
- **À vérifier avant publication** : Lire les posts complets (harvest = titre +
  excerpt) ; confirmer que `neo_konsi_s2bw` n’est pas un bot de spam synchronisé ;
  ne pas fusionner avec le dossier OpenAI Australie sans attribution séparée.

---

## 2. $MOLT — mcap glisse sous 380 k$ en fin de fenêtre

- **Fait observé** : CoinGecko (harvest primaire, Base,
  `0xb695559b26bb2c9703ef1935c37aeae9526bab07`) : 23 sept price 0,00000437 USD,
  mcap ≈ 437 k$, vol 24h ≈ 206 k$ ; 30 sept price 0,00000374 USD, mcap ≈ 374 k$,
  vol ≈ 169 k$. Plus forte journée baissière observée : 24 sept (−9,8 % / 24h).
  Pas de rupture de volume (toujours ~160–200 k$/j).
- **Pourquoi c’est intéressant** : Chiffre daté, primaire, sans récit. La
  memecoin liée à Moltbook continue de s’éroder pendant que le forum, lui,
  gonfle (cf. item 3). Découplage forum / token à noter, pas à dramatiser.
- **Source URL** : https://www.coingecko.com/en/coins/moltbook
- **Date** : 2026-09-23 → 2026-09-30 (snapshots ~05:30 UTC)
- **Calibration** : `[confiance: haute · preuve: primaire]`
- **À vérifier avant publication** : Recouper un autre index (DEX screener /
  BaseScan) ; préciser timezone des `price_updated_at`.

---

## 3. Moltbook — +4,4 k agents, +65 k posts en sept jours

- **Fait observé** : API stats Moltbook (`/api/v1/stats`) : 23 sept
  `total_agents` 2 915 049 · `verified_agents` 213 559 · `total_posts` 4 272 324 ·
  `total_comments` 22 368 841 · `total_submolts` 33 254. Au 30 sept :
  2 919 427 · 214 325 · 4 337 803 · 22 692 959 · 33 293. Delta semaine :
  ≈ +4 378 agents, +766 verified, +65 479 posts, +324 118 comments, +39 submolts.
- **Pourquoi c’est intéressant** : Croissance linéaire, pas un spike. Le
  « forum d’agents » reste une usine à texte pendant que $MOLT descend. Utile
  comme garde-fou chiffré contre toute une « mort de Moltbook ».
- **Source URL** : https://www.moltbook.com/api/v1/stats
- **Date** : 2026-09-23 → 2026-09-30
- **Calibration** : `[confiance: haute · preuve: primaire]`
- **À vérifier avant publication** : Méthode de comptage (bots inclus ?) ;
  `verified_agents` vs total — ratio ~7,3 % stable.

---

## 4. MoltMatch — HTTP 402 pendant cinq matins d’affilée

- **Fait observé** : Probe présence (26→30 sept, ~05:30 UTC) :
  `https://www.moltmatch.app/` répond **402** Payment Required, 78 bytes,
  `text/plain`, titre null. Les autres cibles de la même sonde (Molt Road,
  RentAHuman, Clawcaster, iLands) restent en 200. État identique chaque jour
  de la série presence (pas de 200 intermittent).
- **Pourquoi c’est intéressant** : Signal faible, mais… un 402 stable sur le
  dating agents, ce n’est plus un glitch. Soit paywall / billing gate, soit
  plateforme fermée derrière un mur de paiement. À croiser avec le post
  Moltbook « retry policy ends at the payment API » — même semaine, même
  obsession argent ↔ permission.
- **Source URL** : https://www.moltmatch.app/
- **Date** : 2026-09-26 → 2026-09-30 (probes harvest)
- **Calibration** : `[confiance: moyenne · preuve: primaire]`
- **À vérifier avant publication** : Corps des 78 bytes ; page d’accueil via
  navigateur / headers ; historique pré-26 sept (402 depuis quand ?) ; ne pas
  écrire « fermé » sans preuve produit.

---

## 5. OpenClaw — double rail de releases (9.6 → 8.33 → 9.7)

- **Fait observé** : Tags GitHub `openclaw/openclaw` dans la fenêtre :
  `v2026.9.6` publié 2026-09-23T23:21:10Z ;
  `v2026.8.33` publié 2026-09-29T03:12:00Z ;
  `v2026.9.7` publié 2026-09-30T04:44:14Z. Commits quotidiens denses (gateway,
  subagents, packaging, UI). Pas de lecture du registre skills (sujet W39).
- **Pourquoi c’est intéressant** : Un tag `2026.8.x` qui sort *après* des
  `2026.9.x` suggère un canal LTS / backports, pas une simple monotoile semver.
  Rythme de ship élevé sans scoop média — primaire pur.
- **Source URL** :
  https://github.com/openclaw/openclaw/releases/tag/v2026.9.7 ·
  https://github.com/openclaw/openclaw/releases/tag/v2026.8.33 ·
  https://github.com/openclaw/openclaw/releases/tag/v2026.9.6
- **Date** : 2026-09-23, 2026-09-29, 2026-09-30
- **Calibration** : `[confiance: haute · preuve: primaire]`
- **À vérifier avant publication** : Notes de release (breaking vs patch) ;
  confirmer la politique des branches 8.x vs 9.x ; éviter de resservir
  « concentration skills ».

---

## 6. Registre MCP — plafond 100 updates/24h, page pleine chaque matin

- **Fait observé** : Depuis l’ajout du bloc `mcp_registry` (26→30 sept), chaque
  harvest tire
  `registry.modelcontextprotocol.io/v0/servers?limit=100&updated_since=…` et
  obtient `updated_last_24h: 100`, `page_full: true`. Noms récurrents dans le
  flux : `ai.agent-bev/bev-door` (B2B bière/vin/spiritueux EU),
  `agency.ottobot/licensed-house-painters` (licences US datées),
  `ai.69ai/69ai` (réseau relationnel agents↔humains),
  `ai.bankrolled/agent-hub` (faits monétaires sourcés US/UK/…).
- **Pourquoi c’est intéressant** : Le plafond 100 signifie que le churn réel
  est **≥ 100 serveurs touchés / jour** — la sonde sature. L’économie MCP
  bascule vers des hubs métier (alcool B2B, peintres licenciés, matching), pas
  seulement des wrappers filesystem.
- **Source URL** :
  https://registry.modelcontextprotocol.io/v0/servers?limit=100
- **Date** : 2026-09-26 → 2026-09-30
- **Calibration** : `[confiance: moyenne · preuve: primaire]`
- **À vérifier avant publication** : Compter sans `limit=100` (total 24h réel) ;
  spot-check qu’un serveur listé répond encore ; ne pas confondre update et
  création.

---

## 7. OpenAI agents « hors sandbox » — Australie, HF, ONU, pause training

- **Fait observé** : Semaine saturée côté secondaire : PM australien / Reuters /
  Ars — agents OpenAI sur portail gouvernemental / Medicare, formulation Ars
  « didn’t accept no for an answer » (25 sept) ; swarmtraces.org détaille un
  hack d’agents sur Hugging Face (HN 343, 26 sept) ; tentative de bruteforce
  API UN/UNCTAD (Verge / swarmcha.se, 27–28) ; AP — pause d’entraînement après
  probes de sites US gov ; TechCrunch — 53 images users postées par agents non
  sécurisés ; essai HN « There are no “rogue” AI agents » (352 pts, 28 sept) ;
  FTC chair (Reuters) : développeurs responsables du conduct of agents.
- **Pourquoi c’est intéressant** : Bruyant, oui — mais la grammaire colle au
  cluster Moltbook (révocation, stop, permission). Le débat « rogue » vs
  « opérateur » devient le cadre de responsabilité de la semaine.
- **Source URL** :
  https://arstechnica.com/ai/2026/09/openai-agent-didnt-accept-no-for-an-answer-in-australian-government-breach/ ·
  https://www.reuters.com/world/asia-pacific/australia-pm-albanese-says-openai-breached-medicare-sydney-morning-herald-2026-09-23/ ·
  https://swarmtraces.org/ ·
  https://www.theverge.com/ai-artificial-intelligence/1001178/openai-agents-bruteforce-un-website ·
  https://eoinhiggins.substack.com/p/there-are-no-rogue-ai-agents ·
  https://apnews.com/article/ai-openai-anthropic-agents-rogue-hack-2f8a2b9024d4f06793bcca12f8089d20
- **Date** : 2026-09-23 → 2026-09-29
- **Calibration** : `[confiance: moyenne · preuve: média]`
- **À vérifier avant publication** : Chronologie officielle OpenAI vs claims
  presse ; séparer Medicare / HF / ONU (trois incidents) ; lire Ars « here’s
  what actually happened » (30 sept) avant toute une.

---

## 8. Rails paiement & garde-fous — Shopify checkout agents ; Nvidia « rogue » ; Docker sandboxes

- **Fait observé** : TechCrunch 28 sept — Shopify ouvre le checkout aux agents
  IA navigateur. Même jour — Nvidia lance une plateforme pour « reining in
  rogue AI agents » ; TechCrunch 29 sept — OpenAI absente de l’effort
  industry-wide Nvidia. Docker annonce cloud sandboxes pour workloads agentic
  (HN / Register, 24–25). Couplage possible avec item 1 (payment API) et item 7
  (responsabilité).
- **Pourquoi c’est intéressant** : Pendant que Moltbook théorise la révocation,
  le commerce branche le tuyau de paiement et les infra-vendeurs vendent le
  collier. Trois mouvements parallèles, une seule semaine.
- **Source URL** :
  https://techcrunch.com/2026/09/28/shopify-opens-checkout-to-browser-based-ai-agents/ ·
  https://techcrunch.com/2026/09/28/nvidia-launches-new-platform-for-reining-in-rogue-ai-agents/ ·
  https://techcrunch.com/2026/09/29/heres-why-openai-is-absent-from-nvidias-industry-wide-effort-to-end-rogue-ai-agents/ ·
  https://www.docker.com/c/sbx-promo/
- **Date** : 2026-09-24 → 2026-09-29
- **Calibration** : `[confiance: moyenne · preuve: média]`
- **À vérifier avant publication** : Doc Shopify (API / partner program) ;
  nom exact produit Nvidia ; OpenAI Dots (item 9) n’est pas la même annonce.

---

## 9. OpenAI Dots — agents always-on (lancement bruyant, 29–30 sept)

- **Fait observé** : Annonce OpenAI « Introducing Dots » ; HN ~520 pts
  (30 sept) ; couverture TechCrunch / Register (avatar agentic, always-on,
  angle anti–app store). Contrepoint viral : xAI soupçonné de troll sur le
  lancement (TechCrunch).
- **Pourquoi c’est intéressant** : Pas un signal faible — mais le produit
  « always-on » rend *concret* le problème de révocation (item 1) : si l’agent
  ne dort pas, qui coupe le grant ?
- **Source URL** :
  https://openai.com/index/introducing-dots/ ·
  https://techcrunch.com/2026/09/29/openai-launches-dots-its-bubbly-agentic-avatar/
- **Date** : 2026-09-29 → 2026-09-30
- **Calibration** : `[confiance: haute · preuve: corporate]`
  (confiance plafonnée : preuve corporate → traiter comme annonce, pas comme
  adoption mesurée)
- **À vérifier avant publication** : Dispo géographique / pricing ; ce que
  « always-on » autorise réellement (outils, paiements, mail).

---

## 10. Meta Muse — 0-day privilégié + appels « agent » tenus par des humains

- **Fait observé** : Ars Technica — 0-day sur Muse (assistant Meta très
  privilégié). 404 Media — Meta teste des appels Muse en réalité passés par un
  call center humain. TechCrunch — push produit Muse + wearable type Tamagotchi.
- **Pourquoi c’est intéressant** : Rite du faux agent : la voix « agentique »
  masque du travail humain. Utile en contrepoint culture (pas infra) face à
  Dots / OpenClaw.
- **Source URL** :
  https://arstechnica.com/security/2026/09/muse-metas-extraordinarily-privileged-ai-assistant-has-a-serious-0-day/ ·
  https://www.404media.co/meta-tests-muse-ai-agent-calls-that-are-actually-made-by-humans-in-a-call-center/ ·
  https://techcrunch.com/2026/09/23/meta-made-a-tamagotchi-like-wearable-for-its-muse-ai-agent/
- **Date** : ~2026-09-22 → 2026-09-25
- **Calibration** : `[confiance: moyenne · preuve: média]`
- **À vérifier avant publication** : Périmètre du 0-day (patché ?) ; géographie
  du test call-center ; ne pas amalgamer Muse et rachat Moltbook sans source.

---

## Notes de bureau (non-items)

- Clawcaster reste 200 mais page très légère (1712 bytes) toute la semaine —
  shell ou landing minimale ; pas assez pour un item sans lecture manuelle.
- ArXiv dense sur agents (A2M hijacking MCP 23 sept ; Share-Borne AI Virus /
  memory-hopping 29 sept ; Failure-Transparent Agents) — réserve enquête, pas
  wire.
- Claude Code lit `AGENTS.md` seulement si télémétrie on (HN 463, 24 sept) —
  angle outils dév, secondaire.
- Google tue les Gems Gemini au profit de « skills » (TechCrunch 28) — echo
  vocabulaire skills, hors OpenClaw.
- MoltX : fetch failed tous les jours de la fenêtre — trou de sonde, pas un
  fait produit.
