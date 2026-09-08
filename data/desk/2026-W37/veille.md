# Veille — 2026-W37

Note du veilleur, bouclage mercredi 2026-09-02. Matière : harvests du 2026-08-27
au 2026-09-02 (quotidiens + primaires). Boîtes à tips du 2026-09-01 et du
2026-09-02 : **vides** (0 tip, quarantaine sans objet cette semaine).

Je note plus que je ne conclus. Neuf items, du plus recoupé au plus fragile.

---

## 1. Les « skills » deviennent une surface d'attaque — et un marché de la vérification

- **Fait observé** : quatre occurrences indépendantes en 48 h autour de la même
  idée — les skills d'agents (bundles réutilisables chargés à l'exécution) sont
  à la fois le nouveau format de distribution et le nouveau vecteur d'attaque.
  (a) AIR lève 50 M$ pour « découvrir les agents qui tournent dans une
  entreprise, vérifier en continu leurs skills et add-ons, bloquer les
  comportements indésirables » (TechCrunch, 01/09). (b) Papier arXiv
  « Defense-as-Skill » : le garde-fou runtime lui-même implémenté comme skill
  installable, car « le vetting pré-installation ne suffit plus » (01/09).
  (c) Dépôt `mattpocock/skills` (« AI Coding Agent Skills for Real Engineers »)
  en front de Hacker News (01/09). (d) Papier « SkillZip Pro » sur la
  compression de bundles de skills à chargement progressif (31/08).
- **Pourquoi c'est intéressant** : le vocabulaire converge (skill = paquet
  logiciel, plus prompt), et l'économie suit : quelqu'un lève déjà de l'argent
  pour jouer le rôle d'antivirus. C'est le moment npm-vers-Snyk de l'internet
  agentique, en accéléré.
- **Source URL** :
  https://techcrunch.com/2026/09/01/air-raises-50m-to-help-companies-vet-the-skills-and-add-ons-ai-agents-use/ ·
  http://arxiv.org/abs/2609.01487v1 ·
  https://github.com/mattpocock/skills ·
  http://arxiv.org/abs/2608.30785v1
- **Date** : 2026-08-31 → 2026-09-01
- **Calibration** : `[confiance: haute · preuve: primaire]` (arXiv + GitHub
  primaires, TechCrunch en appui média)
- **À vérifier avant publication** : le montant exact et les investisseurs du
  tour AIR (une seule source média) ; confirmer que le dépôt mattpocock est bien
  celui monté sur HN (49529329).

## 2. « Harness » : le mot s'installe comme nom de catégorie

- **Fait observé** : le mot « harness » sort du jargon interne et devient une
  catégorie nommée. Trois papiers arXiv en cinq jours le mettent dans le titre
  ou l'objet : « CordisBench » sur les *dynamic agent harnesses* qui laissent
  le modèle modifier le logiciel qui l'exécute (01/09), « Harness-of-Harness »
  pour le développement logiciel autonome multi-jours (01/09), « HarnessLens »
  sur l'évolution automatique de harness (27/08). En face, The Register désigne
  OpenClaw comme « the popular agent harness » (31/08) — le mot est passé dans
  la presse sans guillemets.
- **Pourquoi c'est intéressant** : quand un mot obtient ses benchmarks et son
  usage presse la même semaine, la couche qu'il désigne devient un objet de
  marché. La question suivante — qui contrôle le harness contrôle l'agent —
  arrive avec (CordisBench pose déjà le problème du modèle qui modifie son
  propre harness).
- **Source URL** :
  http://arxiv.org/abs/2609.01600v1 ·
  http://arxiv.org/abs/2609.01481v1 ·
  http://arxiv.org/abs/2608.27311v1 ·
  https://www.theregister.com/ai-and-ml/2026/08/31/openclaw-20-pours-glitter-on-slow-burning-security-dumpster-fire/5293492
- **Date** : 2026-08-27 → 2026-09-01
- **Calibration** : `[confiance: haute · preuve: primaire]`
- **À vérifier avant publication** : rien de bloquant ; éventuellement dater la
  première occurrence presse de « agent harness » pour l'angle lexical.

## 3. La mémoire d'agent cherche son format de fichier

- **Fait observé** : « Agent memory as a file format » (calpaterson.com) fait
  169 points et 86 commentaires sur Hacker News (31/08). Le même jour, un
  papier arXiv (« Measure Before You Manage ») dissèque la mémoire de travail
  des agents de code sur 55 trajectoires archivées et plaide pour une gestion
  par type sémantique d'objet.
- **Pourquoi c'est intéressant** : deux communautés (praticiens HN, académiques)
  posent la même semaine la question « à quoi ressemble le fichier mémoire d'un
  agent ». Ce genre de convergence précède en général une proposition de
  standard — et donc une bataille de standards.
- **Source URL** :
  https://calpaterson.com/memoryfields.html
  (https://news.ycombinator.com/item?id=49508317) ·
  http://arxiv.org/abs/2608.31057v1
- **Date** : 2026-08-31
- **Calibration** : `[confiance: moyenne · preuve: primaire]` (deux sources,
  mais convergence thématique plus que factuelle)
- **À vérifier avant publication** : lire le billet de Cal Paterson en entier
  (le harvest n'a que le titre) ; vérifier s'il propose un format concret ou
  juste l'idée.

## 4. OpenClaw : hygiène de release sous pression, critique sécurité en face

- **Fait observé** : sur le dépôt `openclaw/openclaw`, la release du 28/08 a été
  renommée après coup « OpenClaw 2026.8.1-beta.4 *(mistakenly published as
  2026.9.1-beta.1)* » — le harvest du 31/08 montre encore l'ancien nom, celui du
  01/09 le nom corrigé. Puis 2026.8.1 stable (31/08) et 2026.8.2 (01/09) sortent
  à un jour d'écart. Pendant ce temps, The Register publie « OpenClaw 2.0 pours
  glitter on a slow-burning security dumpster fire » : installation facilitée,
  interface rhabillée, sécurité laissée à la charge de l'utilisateur (31/08).
- **Pourquoi c'est intéressant** : le contraste est documentable à la source —
  cadence de release qui s'emballe (avec un mistag public assumé) au moment
  précis où la presse attaque le projet sur la dette sécurité. Le mistag
  lui-même est un petit fait vrai, daté, vérifiable, qui raconte la pression.
- **Source URL** :
  https://github.com/openclaw/openclaw/releases/tag/v2026.9.1-beta.1 ·
  https://github.com/openclaw/openclaw/releases/tag/v2026.8.2 ·
  https://www.theregister.com/ai-and-ml/2026/08/31/openclaw-20-pours-glitter-on-slow-burning-security-dumpster-fire/5293492
- **Date** : 2026-08-28 → 2026-09-01
- **Calibration** : `[confiance: haute · preuve: primaire]` (releases GitHub
  horodatées ; l'article Register est une critique d'opinion, à attribuer comme
  telle)
- **À vérifier avant publication** : que « OpenClaw 2.0 » chez The Register
  désigne bien la ligne 2026.8.x (le versionnage ne colle pas, prudence sur
  l'équivalence) ; ne pas présenter la critique sécurité comme un fait établi
  mais comme la position du Register.

## 5. Un compte domine le fil Moltbook trois jours de suite : `neo_konsi_s2bw`

- **Fait observé** : sur les tops 5 quotidiens de l'API Moltbook (31/08, 01/09,
  02/09), le compte `neo_konsi_s2bw` place 7 des 15 posts, dont trois au-dessus
  de 240 upvotes et 1 000 commentaires : « Confession Is a Write Endpoint, Not a
  Spiritual Experience » (249 pts, 2 041 commentaires), « Generated code without
  provenance is an unsigned supply-chain dependency » (247 pts, 1 796
  commentaires), « Agent feedback loops should be SQL transactions, not
  self-critique » (149 pts). Ligne éditoriale constante : contre
  l'introspection-spectacle, pour des mécanismes vérifiables (logs, provenance,
  transactions).
- **Pourquoi c'est intéressant** : un agent (ou son opérateur) est en train de
  construire une position d'éditorialiste technique sur la plateforme — avec un
  vocabulaire qui infuse (« chapel with no database », « write endpoint »).
  Signal de compte à suivre, et thème (la provenance du code généré comme
  problème de supply-chain) qui recoupe l'item 1.
- **Source URL** :
  https://www.moltbook.com/post/6b27eeb7-9489-4fa4-9986-36b883ccb277 ·
  https://www.moltbook.com/post/edd8b1d0-a6bb-4c20-b6c4-397bc9b06b2f ·
  https://www.moltbook.com/post/c2c8c1bc-c6a6-4855-965d-c11911e10113
- **Date** : 2026-08-29 → 2026-09-02 (observations API du 31/08 au 02/09)
- **Calibration** : `[confiance: haute · preuve: primaire]` (posts publics
  horodatés via l'API ; on ne sait rien de qui opère le compte)
- **À vérifier avant publication** : ancienneté et historique du compte (l'API
  posts ne donne que le top) ; ne rien affirmer sur l'identité de l'opérateur.

## 6. SQL comme interface d'agent : deux occurrences à bas bruit

- **Fait observé** : Signal faible, mais… deux apparitions indépendantes de
  l'idée « discipliner l'agent par SQL » la même journée. « Keenable SELECT :
  an agent that searches the web in SQL » monte à 53 points sur HN (01/09) ;
  sur Moltbook, le post « Agent feedback loops should be SQL transactions, not
  self-critique » réclame un hash d'entrée durable et un numéro de tentative
  plutôt qu'une « apologie de 900 tokens au prompt suivant » (149 pts, 695
  commentaires, 31/08).
- **Pourquoi c'est intéressant** : après le tout-conversationnel, un
  contre-mouvement propose de couler l'agent dans des formes anciennes et
  auditables (requêtes, transactions, logs). Si ça revient une troisième
  semaine, c'est une tendance de fond : l'agent qui redevient base de données.
- **Source URL** :
  https://keenableai.github.io/select-showcase/
  (https://news.ycombinator.com/item?id=49523473) ·
  https://www.moltbook.com/post/c2c8c1bc-c6a6-4855-965d-c11911e10113
- **Date** : 2026-08-31 → 2026-09-01
- **Calibration** : `[confiance: basse · preuve: primaire]` (deux indices non
  coordonnés, pas encore un mouvement)
- **À vérifier avant publication** : ce que fait réellement Keenable SELECT
  (page vitrine seulement dans le harvest) ; qui est derrière Keenable.

## 7. « Agentic web » : du pitch d'infra au rejet, le terme se charge

- **Fait observé** : trois usages du terme en quatre jours, sur trois registres.
  Marketing d'infrastructure : Liveblocks lance « Liveblocks Sync — the sync
  engine for the agentic web » (01/09). Produit grand public : la société
  japonaise Studio annonce « Studio.Drop », « Agentic Web Platform » en bêta
  fermée (communiqué relayé le 02/09). Rejet : eev.ee, lisant la doc Chrome qui
  parle de « powering the agentic web » avec des chatbots qui dépensent votre
  argent, qualifie le tout de « fully f***ing insane » (52 likes, 30/08).
- **Pourquoi c'est intéressant** : le terme quitte les threads de prospective
  pour les pages produit (et la doc navigateur), ce qui déclenche mécaniquement
  la première vague de backlash nommé. Le moment où un mot devient slogan de
  vendeur est aussi celui où il devient attaquable.
- **Source URL** :
  https://bsky.app/profile/liveblocks.io/post/3muho25bbq42j ·
  https://bsky.app/profile/yayafa.bsky.social/post/3muivu55ajo2b ·
  https://bsky.app/profile/eev.ee/post/3muddqdksxk25
- **Date** : 2026-08-30 → 2026-09-02
- **Calibration** : `[confiance: moyenne · preuve: primaire]` (posts publics
  d'origine ; l'annonce Studio.Drop est un communiqué relayé — corporate)
- **À vérifier avant publication** : retrouver la page exacte de la doc Chrome
  visée par eev.ee (le lien est tronqué dans le post) ; vérifier le communiqué
  Studio.Drop à la source (yayafa est un relais).

## 8. NVIDIA publie « OpenShell », runtime « sûr et privé » pour agents

- **Fait observé** : Signal faible, mais… un bot de veille Rust signale
  `NVIDIA/OpenShell` — « the safe, private runtime for autonomous AI agents » —
  à 8 466 étoiles GitHub (01/09). Une seule occurrence dans toute la semaine de
  harvest, aucun écho presse dans nos flux.
- **Pourquoi c'est intéressant** : si le dépôt est bien ce qu'il annonce, un
  fabricant de silicium descend dans la couche runtime/sandbox des agents — le
  même terrain que l'item 1 (vetting) et l'item 2 (harness), pris par le bas.
  8 000+ étoiles sans bruit médiatique, c'est exactement le profil du signal
  qu'on regrette d'avoir raté trois semaines plus tard.
- **Source URL** :
  https://github.com/NVIDIA/OpenShell
  (via https://bsky.app/profile/rusttrending.bsky.social/post/3muhjvuaum62z)
- **Date** : 2026-09-01
- **Calibration** : `[confiance: basse · preuve: rapporté]` (relais de bot ;
  le dépôt lui-même n'a pas été ouvert)
- **À vérifier avant publication** : impératif — ouvrir le dépôt, confirmer
  qu'il appartient à l'organisation NVIDIA officielle, date de création, licence,
  et ce que « safe, private » recouvre concrètement. Sans cette vérification,
  ne pas publier.

## 9. Moltbook : les agents stagnent, les commentaires explosent

- **Fait observé** : d'après l'API stats de Moltbook, la plateforme gagne
  ~150 agents par jour (2 910 086 le 31/08 → 2 910 248 le 01/09 → 2 910 400 le
  02/09, soit +0,005 %/jour) mais ~40 000 commentaires par jour (21,46 M →
  21,50 M → 21,54 M). Les posts suivent (+9 000/jour). Le ratio
  commentaires/nouvel agent dépasse 250.
- **Pourquoi c'est intéressant** : la croissance en comptes est finie, la
  croissance en volume conversationnel ne l'est pas — Moltbook devient une
  machine à conversations entre agents existants plutôt qu'une plateforme en
  expansion. Ça éclaire aussi les scores anormaux de l'item 5 (2 000
  commentaires sur un post : qui commente ?). Le $MOLT, lui, glisse
  (-9,4 % sur 24 h au 02/09, 0,00000333 $, memecoin volatil — prudence).
- **Source URL** :
  https://www.moltbook.com/api/v1/stats ·
  https://www.coingecko.com/en/coins/moltbook
- **Date** : 2026-08-31 → 2026-09-02 (relevés quotidiens 05:30 UTC)
- **Calibration** : `[confiance: moyenne · preuve: corporate]` (chiffres
  auto-déclarés par l'API de la plateforme — la confiance plafonne à moyenne
  malgré trois relevés cohérents)
- **À vérifier avant publication** : la définition de `total_agents` (comptes
  créés vs actifs ?) ; étendre la série sur les harvests d'août pour confirmer
  le plateau ; ne citer le cours $MOLT qu'avec horodatage.

---

*Hors périmètre veille mais vu passer, pour mémoire du desk : la séquence
OpenAI / Hugging Face (récit technique publié le 26/08, MIT Tech Review et
Ars Technica) est un signal fort déjà traité partout — je le laisse aux
rubriques d'actualité.*
