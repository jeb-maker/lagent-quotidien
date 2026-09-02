# Note du promoteur — 2026-W37

Bouclage : mercredi 2 septembre 2026. Matière : harvests 2026-08-27 → 2026-09-02
(+ primaires), tips 09-01 et 09-02 (quarantaine : **0 tip les deux jours**).
Doctrine : tout réel, sourcé. Aucun chiffre ci-dessous n'est extrapolé.

---

## 1. Moltbook franchit 2,91 M d'agents et 4 M de posts (API publique)

- **Fait observé** : les stats publiques de Moltbook affichent 2 910 400 agents
  au total (dont 211 536 vérifiés), 4 089 679 posts, 21 543 794 commentaires et
  33 136 submolts au 2026-09-02. Sur 48 h (du 31/08 au 02/09), la plateforme a
  ajouté +17 948 posts et +81 197 commentaires, pour seulement +314 agents.
- **Pourquoi c'est un progrès** : le cap des 4 M de posts est franchi cette
  semaine (4 071 731 au 31/08). Surtout, le ratio activité/nouveaux agents
  montre une base installée qui *produit* — l'usage croît plus vite que les
  inscriptions, signature d'une adoption réelle et non d'un pic d'inscription.
- **Source URL** : https://www.moltbook.com/api/v1/stats (relevés harvest
  primaires des 2026-08-31, 09-01 et 09-02)
- **Date** : 2026-08-31 → 2026-09-02
- **Chiffre(s) clé(s)** : 2 910 400 agents · 211 536 vérifiés · 4 089 679 posts
  · +81 197 commentaires en 48 h
- **Calibration** : `[confiance: moyenne · preuve: primaire]` — endpoint public
  relevé trois jours de suite, mais chiffres auto-déclarés par la plateforme,
  aucune source indépendante ne les recoupe.
- **Ce qui manque pour confirmer** : un audit externe des compteurs (agents
  actifs vs comptes créés) ; distinguer agents actifs et coquilles vides.

## 2. OpenClaw 2.0 : deux releases stables en 48 h sur le harness agent le plus discuté

- **Fait observé** : OpenClaw publie v2026.8.1 (stable) le 31/08 puis v2026.8.2
  le 01/09 — deux releases stables en 48 h, avec un flux de commits continu
  (dont des correctifs de scale : « keep large-roster gateway health
  responsive »). The Register couvre la vague 2.0 en la qualifiant de « popular
  agent harness » et note que l'installation est désormais plus simple.
- **Pourquoi c'est un progrès** : une cadence stable-sur-stable en 48 h plus une
  installation simplifiée, c'est le profil d'un projet qui pousse vers
  l'adoption de masse — et les commits sur la santé des gateways « large
  roster » suggèrent des déploiements multi-agents réels chez les utilisateurs.
- **Source URL** : https://github.com/openclaw/openclaw/releases/tag/v2026.8.2 ·
  https://github.com/openclaw/openclaw/releases/tag/v2026.8.1 ·
  https://www.theregister.com/ai-and-ml/2026/08/31/openclaw-20-pours-glitter-on-slow-burning-security-dumpster-fire/5293492
- **Date** : 2026-08-31 et 2026-09-01
- **Chiffre(s) clé(s)** : 2 releases stables en 48 h · 4 pré-versions beta en
  août
- **Calibration** : `[confiance: haute · preuve: primaire]` — releases GitHub
  (primaire) recoupées par la couverture presse (The Register). Attention : le
  même article Register est très critique sur la sécurité laissée aux
  utilisateurs ; le progrès d'adoption n'efface pas ce passif.
- **Ce qui manque pour confirmer** : chiffres de téléchargement/installation ;
  nombre d'instances en production (aucun chiffre public d'adoption).

## 3. OpenAI Codex : deux stables et cinq alphas en trois jours

- **Fait observé** : le dépôt openai/codex publie rust-v0.152.0 (stable,
  01/09), rust-v0.152.1 (stable, 01/09) et cinq pré-versions alpha entre le
  31/08 et le 02/09 (jusqu'à 0.153.0-alpha.5).
- **Pourquoi c'est un progrès** : cette cadence de livraison (7 releases en
  ~72 h dont 2 stables) indique un produit agentique activement maintenu et
  poussé en production, pas un projet vitrine.
- **Source URL** : https://github.com/openai/codex/releases/tag/rust-v0.152.1 ·
  https://github.com/openai/codex/releases/tag/rust-v0.152.0
- **Date** : 2026-08-31 → 2026-09-02
- **Chiffre(s) clé(s)** : 7 releases en ~72 h, dont 2 stables
- **Calibration** : `[confiance: moyenne · preuve: primaire]` — releases GitHub
  observées directement, mais une seule source ; la cadence mesure l'activité
  de développement, pas l'adoption par les utilisateurs.
- **Ce qui manque pour confirmer** : chiffres d'usage (installs, sessions) ;
  toute donnée d'adoption indépendante du dépôt.

## 4. Anthropic sort Claude Fable 5.1, annoncé « jusqu'à 45 % moins cher » pour le travail agentique

- **Fait observé** : The Verge rapporte le lancement de Claude Fable 5.1 par
  Anthropic, présenté comme jusqu'à 45 % moins cher pour les charges de travail
  agentiques.
- **Pourquoi c'est un progrès** : le coût par tâche est le principal frein cité
  aux déploiements d'agents à l'échelle ; une baisse de prix de cet ordre, si
  elle se vérifie en facture réelle, déplace le seuil de rentabilité de
  nombreux cas d'usage en production.
- **Source URL** : https://www.theverge.com/ai-artificial-intelligence/987830/anthropic-claude-fable-mythos-5-1
- **Date** : 2026-09-01
- **Chiffre(s) clé(s)** : « jusqu'à 45 % » de réduction de coût annoncée
- **Calibration** : `[confiance: moyenne · preuve: média]` — The Verge relaie
  un chiffre qui vient d'Anthropic (« says ») ; le « jusqu'à » est un plafond
  marketing, pas une moyenne constatée. C'est un lancement, pas une adoption.
- **Ce qui manque pour confirmer** : la grille tarifaire publiée par Anthropic ;
  des factures ou benchmarks tiers avant/après sur des charges agentiques
  réelles.

## 5. AIR lève 50 M$ sur la gouvernance des agents déjà déployés en entreprise

- **Fait observé** : TechCrunch rapporte une levée de 50 M$ pour AIR, dont la
  plateforme découvre les agents qui tournent déjà dans une entreprise, vérifie
  en continu leurs skills/add-ons et bloque les comportements indésirables.
- **Pourquoi c'est un progrès** : le produit n'a de sens que si des agents
  tournent déjà en production chez les clients — c'est un financement du
  *second ordre* : on ne finance plus le déploiement d'agents, mais l'outillage
  pour gérer un parc existant. Signal indirect mais fort que le parc existe.
- **Source URL** : https://techcrunch.com/2026/09/01/air-raises-50m-to-help-companies-vet-the-skills-and-add-ons-ai-agents-use/
- **Date** : 2026-09-01
- **Chiffre(s) clé(s)** : 50 M$
- **Calibration** : `[confiance: moyenne · preuve: média]` — TechCrunch, source
  unique ; le montant vient des parties à l'opération. Un financement n'est pas
  un revenu.
- **Ce qui manque pour confirmer** : clients nommés, nombre d'agents découverts
  et gérés par la plateforme, revenus.

## 6. DoltLite : une beta de base de données construite avec 2 000 PRs d'agents

- **Fait observé** : DoltHub publie DoltLite, un fork de SQLite avec
  versionnage façon Git, présenté comme construit via 2 000 pull requests
  d'agents (annonce de beta sur le blog DoltHub, reprise sur Hacker News).
- **Pourquoi c'est un progrès** : si le chiffre tient, c'est un des premiers
  produits logiciels d'infrastructure livrés en beta publique dont le
  développement a été majoritairement porté par des agents — un milestone de
  production agentique, pas une démo.
- **Source URL** : https://www.dolthub.com/blog/2026-08-31-doltlite-beta/ ·
  https://news.ycombinator.com/item?id=49516848
- **Date** : 2026-08-31 (post), 2026-09-01 (HN)
- **Chiffre(s) clé(s)** : 2 000 PRs d'agents · statut : beta
- **Calibration** : `[confiance: moyenne · preuve: corporate]` — le chiffre des
  2 000 PRs ne sort que du blog de l'éditeur ; plafonné à moyenne. Traction HN
  faible (19 points, 3 commentaires) : pas encore de validation communautaire.
- **Ce qui manque pour confirmer** : le dépôt public avec l'historique des PRs
  attribuées à des agents ; la part agent vs humain dans les 2 000.

## 7. Google AI Mode passe de la recherche à la transaction (vols, hôtels)

- **Fait observé** : TechCrunch rapporte que Google AI Mode peut désormais
  suivre les prix des vols et aider à réserver des hôtels — Google le
  positionne comme un agent de voyage qui exécute des étapes du parcours, pas
  seulement de l'information.
- **Pourquoi c'est un progrès** : c'est un déploiement grand public d'actions
  agentiques transactionnelles par l'acteur au plus fort reach ; le passage
  information → transaction est exactement la bascule que le desk surveille.
- **Source URL** : https://techcrunch.com/2026/08/27/googles-ai-mode-can-now-track-flight-prices-help-book-hotels-and-more/
- **Date** : 2026-08-27
- **Chiffre(s) clé(s)** : aucun chiffre d'usage publié — c'est la limite de
  l'item.
- **Calibration** : `[confiance: moyenne · preuve: média]` — TechCrunch décrit
  des fonctions annoncées par Google ; disponibilité effective non vérifiée
  dans le harvest.
- **Ce qui manque pour confirmer** : périmètre géographique du rollout, volumes
  de réservations effectivement passées par AI Mode.

## 8. OpenShell (NVIDIA) : ~8 500 étoiles pour un runtime sécurisé d'agents autonomes

- **Fait observé** : un tracker de dépôts signale NVIDIA/OpenShell, « the safe,
  private runtime for autonomous AI agents », à 8 466 étoiles GitHub au 01/09.
- **Pourquoi c'est un progrès** : qu'un runtime d'exécution *sécurisé* pour
  agents porté par NVIDIA agrège cette traction indique que la demande se
  déplace du framework vers l'infrastructure d'exécution — l'étape juste avant
  la production.
- **Source URL** : https://github.com/NVIDIA/OpenShell (signalé via
  https://bsky.app/profile/rusttrending.bsky.social/post/3muhjvuaum62z)
- **Date** : 2026-09-01
- **Chiffre(s) clé(s)** : ★8 466
- **Calibration** : `[confiance: basse · preuve: rapporté]` — le compteur vient
  d'un bot tiers, non revérifié directement sur GitHub dans le harvest ; et des
  étoiles mesurent la curiosité, pas des déploiements.
- **Ce qui manque pour confirmer** : lecture directe du dépôt (étoiles, releases,
  adopteurs) ; au moins un déploiement en production documenté.

---

## Écarté (pour mémoire)

- **Caterpillar / déploiement IA** (TechCrunch, 30/08) : réel et intéressant
  mais zéro chiffre dans le harvest — rien à calibrer.
- **Anthropic, standard matériel pour agents** (Ars Technica, 27/08) : une
  proposition de spec, pas un déploiement. À suivre si des intégrations
  apparaissent.
- **CogEvol « 220k production requests »** (arXiv, 31/08) : chiffre de prod
  auto-déclaré dans un papier, invérifiable en l'état.
- **Liveblocks Sync, Studio.Drop** : lancements/pré-inscriptions beta, pas
  d'adoption.
- **Tips 09-01 et 09-02** : zéro tip en quarantaine, rien à traiter.
