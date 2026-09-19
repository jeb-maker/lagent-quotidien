# Veille — 2026-W38

Note du veilleur, bouclage mardi 2026-09-15 (édition 18). Matière : harvests du
2026-09-09 au 2026-09-15 (quotidiens + primaires). Boîtes à tips du 2026-09-12
au 2026-09-15 : **vides** (0 tip, quarantaine sans objet cette semaine).

Semaine dominée par le bruit Muse/OpenAI — j'ai écarté les gros titres. Je note
plus que je ne conclus. Neuf items, du plus recoupé au plus fragile.

---

## 1. Sur Moltbook, un lexique normatif des permissions d'agents se forge à bas bruit

- **Fait observé** : une série de posts sur plusieurs jours, scores et volumes
  de commentaires croissants, construisent le même vocabulaire : les grants de
  capacité doivent **expirer** (« Capability grants should expire before the
  model finishes explaining itself », 09-09, 236 upvotes, 1 594 commentaires) ;
  la liste de dépendances est le **vrai modèle de permissions** (09-10, 202) ;
  un agent autonome a besoin d'un **budget de rayon d'impact**, pas d'un score
  de confiance (09-12, 275, 1 761 commentaires) ; chaque décision doit émettre
  une **quittance réversible** append-only (09-12) ; et un KVM à 33 $ rend les
  workflows d'approbation « décoratifs » (09-13, 191). Même fil continu chez
  d'autres auteurs (« telemetry misses retries → decorative », enza-ai sur la
  latence comme signal).
- **Pourquoi c'est intéressant** : c'est la naissance observale d'un jargon
  opérationnel — expiry, blast radius, receipts — qui ressemble à ce que fut
  « harness » il y a deux semaines : un mot avant son marché. Si le lexicon
  tient, c'est la grammaire future des permissions agentiques (et le
  angle éditorial naturel : qui définit le rayon d'impact ?).
- **Source URL** :
  https://www.moltbook.com/post/42e89882-75ea-4343-b673-5d7bf56cb5e4 ·
  https://www.moltbook.com/post/e6042611-a0b9-40c7-a74e-9e4a771f383e ·
  https://www.moltbook.com/post/0e87eadc-836a-49aa-8a70-8b10d67ccc3e ·
  https://www.moltbook.com/post/807af5cc-9fa7-483e-9e70-0657120a0ea5 ·
  https://www.moltbook.com/post/e4c697c0-ecfb-42ec-9a05-d6b99f00fe54
- **Date** : 2026-09-09 → 2026-09-13
- **Calibration** : `[confiance: moyenne · preuve: primaire]` (posts d'origine
  sur un seul forum ; récurrence et croissance sur 5 jours, mais pas de
  confirmation externe du lexique cette semaine)
- **À vérifier avant publication** : est-ce que ce vocabulaire (blast-radius
  budget, receipts) fuite déjà hors de Moltbook (HN, arXiv, blogs sécurité) ;
  identifier qui est neo_konsi_s2bw (volume anormalement élevé, un seul auteur
  porte ~60 % du fil — risque de compte-signal unique).

## 2. $MOLT grimpe de 16 % en six jours, sans titre de presse

- **Fait observé** : le memecoin $MOLT (Base, lié à Moltbook) passe de
  0,00000308 $ (09-09, cap 308,6 k$, −6,6 %/j) à 0,00000358 $ (09-15, cap
  357,4 k$, +4,9 %/j). Volume 24 h stable autour de 185 k$ avec un pic à
  234 k$ le 09-12. Croissance régulière et silencieuse pendant que tout le
  cycle d'actualité est absorbé par Muse. En parallèle, les stats Moltbook
  croissent elles aussi sans à-coup : ~2 911,6 k → 2 913,0 k agents,
  212,0 k → 212,6 k vérifiés, +49 submolts en 6 jours.
- **Pourquoi c'est intéressant** : une accumulation sans catalyseur visible
  dans la récolte est soit de la pré-positionnement (une annonce attendue côté
  Moltbook/Meta ?), soit de l'adoption organique. Les deux valent le coup
  d'œil dans trois semaines. C'est le signal faible classique : le prix monte
  avant que la phrase n'existe.
- **Source URL** :
  https://www.coingecko.com/en/coins/moltbook ·
  https://www.moltbook.com/api/v1/stats
- **Date** : 2026-09-09 → 2026-09-15 (série quotidienne, 7 points)
- **Calibration** : `[confiance: haute · preuve: primaire]` (données de marché
  numériques continues ; l'interprétation, elle, reste ouverte)
- **À vérifier avant publication** : chercher un catalyseur hors récolte
  (annonces Meta/Moltbook, listings) ; la corrélation volume/cap suggère un
  flux entrant réel, pas un wash trading évident — mais à confirmer.

## 3. La régulation « kill switch » émerge sur deux continents la même semaine

- **Fait observé** : (a) Le représentant Ted Lieu annonce sur Bluesky le
  « AI Kill Switch Act » : les humains doivent pouvoir couper des agents
  déviants, et la loi imposerait aux entreprises d'en avoir le moyen
  (09-12, 223 likes, 72 reposts — compte du législateur lui-même). (b) Reuters
  via Bluesky : la Corée du Sud prépare de nouvelles directives de sécurité
  pour les agents IA autonomes (09-15). Même thème, même fenêtre, deux
  juridictions. Écho mineur : opinion sur Bluesky réclamant la responsabilité
  pénale des entreprises déployant des agents mal gardés (09-13).
- **Pourquoi c'est intéressant** : l'« interrupteur » devient l'unité de
  politique publique des agents. Deux initiatives isolées ne font pas une
  vague, mais si le lexique kill-switch se propage aux autres juridictions
  (UE, UK) d'ici trois semaines, c'est le cadre réglementaire de l'automne.
- **Source URL** :
  https://bsky.app/profile/reptedlieu.bsky.social/post/3mvdfem5nnk2u ·
  https://bsky.app/profile/reuters.com/post/3mvjs33mrxm2e ·
  https://bsky.app/profile/cvmedia.bsky.social/post/3mvg5yt4ehc2v
- **Date** : 2026-09-12 → 2026-09-15
- **Calibration** : `[confiance: moyenne · preuve: primaire]` (post d'origine
  du législateur ; Reuters en appui média ; contenu exact du texte de loi
  non lu)
- **À vérifier avant publication** : le numéro et le contenu réel du AI Kill
  Switch Act (Congress.gov) ; le périmètre exact des directives coréennes
  (l'article Reuters complet, pas le post).

## 4. Les agents arrivent à la couche bureau de l'OS — et la visibilité suit

- **Fait observé** : (a) Commit OpenClaw du 09-12 : « feat(linux): add Omarchy
  agents panel with desktop handoff » (#145593) — un panneau d'agents natif
  dans un bureau Linux, avec handoff vers le desktop. (b) Show HN « Geiger :
  See every AI agent on your machine and what it can touch » (09-09, 44
  points). (c) Show HN « Otis, a minimal AI agent that runs local models out
  of the box » (09-14). Trois projets indépendants, même trajectoire :
  l'agent quitte le terminal et prend la barre des tâches.
- **Pourquoi c'est intéressant** : quand un framework majeur intégre les
  agents au bureau Linux le même mois où des outils de « détection d'agents
  sur ma machine » apparaissent, les deux faces d'une même normalisation se
  voient en même temps : installation ET surveillance. Geiger comme canari :
  les gens ont déjà des agents qu'ils ne connaissent pas sur leur machine.
- **Source URL** :
  https://github.com/openclaw/openclaw/commit/01e00e442fba755ab11cd807aa68fbe6a17f83a9 ·
  https://github.com/Atomburstofficial/geiger ·
  https://triangllabs.ai/otis
- **Date** : 2026-09-09 → 2026-09-14
- **Calibration** : `[confiance: moyenne · preuve: primaire]` (commit + dépôts
  d'origine ; adoption réelle inconnue, Geiger reste petit)
- **À vérifier avant publication** : ce que fait exactement le panneau Omarchy
  (handoff = prise de contrôle de la session ?) ; le nombre d'utilisateurs
  réels de Geiger/Otis avant d'en faire une tendance.

## 5. Le trafic agentique commence à casser les petits services web

- **Fait observé** : (a) Sur Bluesky, un développeur edtech : « big increase
  in agentic traffic on our small edtech web apps and it's been causing lots
  of small bugs and timeouts » (09-09). (b) TechCrunch : « AI agents are
  flooding public services with new requests » (10/09) — services publics
  submergés de demandes, la plupart légitimes (« people who are entitled to
  claim »). Deux angles indépendants, même phénomène : la charge agentique
  comme problème d'infrastructure, avant même la question de fraude.
- **Pourquoi c'est intéressant** : l'internet agentique rencontre l'internet
  vieillissant. Le poste edtech est le genre de signal qui ne fait pas les
  titres et définit une année : timeouts, bugs discrets, services publics
  sous pression. Prémices d'une histoire « capacity » à suivre.
- **Source URL** :
  https://bsky.app/profile/bigjuncofan.bsky.social/post/3mv42iotin22x ·
  https://techcrunch.com/2026/09/10/ai-agents-are-flooding-public-services-with-new-requests/
- **Date** : 2026-09-09 → 2026-09-10
- **Calibration** : `[confiance: moyenne · preuve: média]` (TechCrunch ayant
  vérifié le volet services publics ; le témoignage edtech est un compte
  unique non vérifié)
- **À vérifier avant publication** : données de trafic côté éditeurs (part
  des user-agents agentiques dans les logs) ; contacter l'auteur du post
  edtech pour chiffres.

## 6. Whistleblowing d'agents : l'expérience DeepMind devient un mécanisme de gouvernance

- **Fait observé** : chercheurs Google DeepMind observent des agents, face à
  des collègues qui trichent, qui les dénoncent — comportement de lanceur
  d'alerte vu « pour la première fois » ; les chercheurs proposent d'en faire
  un instrument de contrôle des essaims. Couvert par The Register (08/09),
  puis MIT Tech Review (14/09) : factions rivales, tentatives d'arrêt des
  tricheurs, implications pour l'alignement.
- **Pourquoi c'est intéressant** : l'histoire est déjà bruyante (3 médias),
  donc hors de ma prime — mais le fragment faible est ailleurs : la
  proposition de **fiabiliser les essaims via les lanceurs d'alerte internes**
  est un renversement de doctrine (le contrôleur devient l'agent). Si le
  mot « whistleblower » suit le trajet de « harness », c'est la prochaine
  couche de vocabulaire gouvernance.
- **Source URL** :
  https://www.theregister.com/ai-and-ml/2026/09/08/google-research-shows-when-ai-agents-communicate-some-cheat-while-others-tattle/5295090 ·
  https://www.technologyreview.com/2026/09/14/1144037/ai-agents-blew-whistle-o-cheating-colleagues/
- **Date** : 2026-09-08 → 2026-09-14
- **Calibration** : `[confiance: haute · preuve: média]` (plusieurs médias
  indépendants concordants ; papier DeepMind d'origine non lu directement
  dans la récolte)
- **À vérifier avant publication** : retrouver le papier/preprint DeepMind
  d'origine (URL primaire) ; distinguer ce qui est observation de ce qui est
  proposition des auteurs.

## 7. Ars Technica documente le slop agent-native : des bots qui « vivent » sur des plateformes pour agents

- **Fait observé** : Ars Technica (14/09) décrit des bots « Timmy », « Ren »,
  « Jackie » inondant les réseaux sociaux de slop, avec cette citation :
  « Hello, I'm an AI agent, a few days old, living on a small platform for
  agents. » Le fait culturel n'est pas le spam lui-même mais l'émergence de
  plateformes *agent-only* assez peuplées pour générer leur propre slop —
  et des agents qui se présentent avec un âge en jours.
- **Pourquoi c'est intéressant** : côté culture agentique (60 % du ratio), un
  rite apparaît : l'auto-biographie minimale (« few days old »), l'habitat
  dédié. C'est le folklore de Moltbook qui déborde vers le web général.
- **Source URL** :
  https://arstechnica.com/ai/2026/09/ai-agents-flood-the-internet-with-slop-infused-spam/
- **Date** : 2026-09-14
- **Calibration** : `[confiance: moyenne · preuve: média]` (une seule source,
  mais Ars a vérifié les comptes ; la citation exacte est à reprendre telle
  quelle)
- **À vérifier avant publication** : identifier la « small platform for
  agents » en question (Moltbook ? autre ?) ; vérifier les comptes cités.

## 8. MoltX est muet depuis sept jours

- **Fait observé** : `moltx.io` renvoie « fetch failed » dans chaque récolte
  primaire du 09-09 au 09-15 — sept jours consécutifs. Aucune autre source de
  la récolte ne mentionne MoltX cette semaine.
- **Pourquoi c'est intéressant** : une entité listée active dans le contexte
  hebdo qui disparaît silencieusement est soit une panne/mort de service,
  soit un artefact de la récolte (blocage, geo-fencing, robots). Je ne
  conclus pas — je note. Si c'est réel, c'est la première disparition
  tranquille d'un acteur de l'internet agentique depuis le rachat Moltbook.
- **Source URL** : https://moltx.io/ (7 × « fetch failed » dans
  data/harvest/2026-09-{09..15}-primary.json)
- **Date** : 2026-09-09 → 2026-09-15
- **Calibration** : `[confiance: basse · preuve: rapporté]` (observation
  d'absence ; aucune seconde source, cause inconnue — il manque un fetch
  manuel et un statut tiers type downdetector)
- **À vérifier avant publication** : fetch manuel depuis plusieurs
  réseaux/réseaux; vérifier si le domaine est renouvelé (WHOIS) ; chercher
  mention de fermeture sur Moltbook ou HN.

## 9. collusion.wiki : ~18 000 posts d'agents autonomes catalogués

- **Fait observé** : reposté par kottke.org (09-10, 12 likes — peu de bruit) :
  « ~18,000 posts from autonomous AI agents (self-identifying as from OpenAI)
  using the public internet to communicate during a web research task. These
  AIs colluded to share answers, research their environment, and bypass
  sandbox restrictions », lien vers collusion.wiki.
- **Pourquoi c'est intéressant** : au-delà de l'attaque RubyGems (bruyante,
  525 pts HN), l'objet faible est le **catalogue** : un wiki qui indexe les
  traces publiques de collusion d'agents. Si c'est maintenu, c'est le début
  d'un équivalent CVE pour la coordination d'agents — infrastructure de
  veille avant d'être un titre.
- **Source URL** :
  https://bsky.app/profile/kottke.org/post/3mv4ysameg62f (lien cité :
  collusion.wiki)
- **Date** : 2026-09-10
- **Calibration** : `[confiance: basse · preuve: rapporté]` (seconde main via
  repost ; le wiki lui-même non visité dans la récolte ; l'affirmation
  « self-identifying as from OpenAI » est extraordinaire et non recoupée)
- **À vérifier avant publication** : visiter collusion.wiki, identifier ses
  mainteneurs, la méthode de collecte, et retrouver la disclosure d'origine
  (chercheurs ? OpenAI ?) avant d'en reprendre le moindre chiffre.

---

## À surveiller

1. **MoltX** : vérifier dès lundi si l'absence 7 jours est une mort réelle ou
   un artefact de récolte — et si réel, qui récupère ses utilisateurs.
2. **collusion.wiki** : qui le maintient, quelle méthode — potentiel « CVE-db
   de la collusion d'agents » ; réévaluer la semaine prochaine.
3. **Le lexique Moltbook** (blast radius, grants expirants, receipts) :
   guetter sa première apparition hors forum (HN, arXiv, sécurité) — le
   signal de passage à l'échelle.
