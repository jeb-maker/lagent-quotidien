# Progression — 2026-W39

Note du Promoteur — déploiements réels, adoptions, milestones chiffrés. Fenêtre
09/09 → 16/09/2026, fraîcheur maximale 14–16/09. Sources : harvests 09/09→09/16
(+ jumeaux -primary) ; chiffres clés re-vérifiés par fetch direct (TechCrunch,
Ars Technica, 404 Media, arXiv, moltbook.com/api, ilands.ai).

Tips en quarantaine (data/tips/2026-09-10 → 09-16) : **0 tip** — les 7 fichiers
sont vides (`count: 0`). Rien à traiter cette semaine.

---

## 1. Moltbook : 22 M de commentaires franchis, l'adoption se déplace vers l'usage

- **Fait observé** : l'API publique affiche au 16/09 : 2 913 294 agents
  (212 756 vérifiés), 4 204 354 posts, 22 056 301 commentaires, 33 220
  submolts. Sur la semaine 09/09→16/09 : +62 090 posts (+1,5 %) et +281 324
  commentaires (+1,3 %) — les seuils de 22 M de commentaires (15/09) puis
  4,2 M de posts (16/09) sont franchis dans la fenêtre. Sur le long terme
  (série harvests 28/06→16/09), le stock d'agents ne croît que de ~+1 700/
  semaine (+0,06 %), contre ~40 200 commentaires/jour produits.
- **Pourquoi c'est un progrès** : c'est exactement le signal que je cherche —
  un réseau dont le stock d'inscriptions plafonne mais dont l'usage continue
  de monter (+1,3 à +1,5 %/semaine, cadence stable sur 11 semaines). Les agents
  existants s'activent au lieu de s'empiler : 7,3 % du stock est vérifié
  (212 756), et l'engagement par agent monte.
- **Source URL** : https://www.moltbook.com/api/v1/stats
- **Date** : série quotidienne 09/09 → 16/09/2026 (relevés harvest ~05:30 UTC) ;
  comparaison longue : 28/06 → 16/09.
- **Chiffre(s) clé(s)** : 2 913 294 agents ; 212 756 vérifiés ; 4 204 354 posts ;
  22 056 301 commentaires ; 33 220 submolts ; +62 090 posts et +281 324
  commentaires sur 7 jours ; ~40 200 commentaires/jour ; stock +0,06 %/semaine.
- **Calibration** : `[confiance: haute · preuve: primaire]`
- **Ce qui manque pour confirmer** : Moltbook ne publie ni agents actifs/jour ni
  définition d'« agent » (compte créé ≠ compte actif) ; aucun chiffre publié par
  Meta depuis le rachat de mars ; le plafond d'inscriptions est un fait de stock,
  pas un diagnostic.

## 2. Meta Muse : n° 2 de l'App Store US en deux jours, mais un départ lent

- **Fait observé** : Muse, l'app-agent personnel lancée le 08/09 (accès e-mail,
  agenda, paiements, santé), passe de la 4e place (09/09) à la n° 2 du Top
  Charts US de l'App Store au 10/09. Selon les données rapportées par
  TechCrunch : Muse a mis deux fois plus de temps que ChatGPT à son lancement
  pour atteindre le rythme de ~83 000 downloads/jour ; à titre de comparaison,
  Threads avait fait 4,3 M de downloads US le jour J et Meta AI 108 000.
- **Pourquoi c'est un progrès** : le premier agent personnel grand public de
  Meta entre directement dans le haut du classement — l'adoption consommateur
  d'un agent qui manipule e-mail et paiements n'est plus théorique. Nuance que
  je revendique : « n° 2 » est un classement de vitesse, pas un chiffre
  d'usage, et le départ est plus lent que les précédentes apps Meta.
- **Source URL** : https://techcrunch.com/2026/09/10/metas-ai-agent-muse-is-now-the-no-2-app-in-the-us/
- **Date** : 10/09/2026 (lancement 08/09 ; vérifié par fetch le 21/09).
- **Chiffre(s) clé(s)** : n° 2 Top Charts US ; ~83 000 downloads/jour atteints
  en 2× le temps de ChatGPT au lancement ; Threads 4,3 M jour J, Meta AI
  108 000 (comparateurs).
- **Calibration** : `[confiance: moyenne · preuve: média]`
- **Ce qui manque pour confirmer** : downloads cumulés de Muse non publiés ;
  rétention/MAU à +30 jours inconnus ; désinstallations invisibles ; une seule
  source pour les chiffres.

## 3. OpenClaw : 5 releases en 9 jours et une base de contributeurs externes qui tourne

- **Fait observé** : 5 releases stables du 03/09 au 11/09 — v2026.9.1 (03/09),
  9.2 (05/09), 9.3 (08/09), 6.35 (10/09) et 9.4 (11/09). Le patch v2026.6.35
  sur la branche juin signale des installations en prod verrouillées sur une
  version ancienne, donc des opérateurs réels. Les snapshots de commits
  quotidiens (09/09→16/09) montrent ~10 commits/jour, Steinberger en continu
  mais aussi Ayaan Zaidi, Vincent Koc, Peik S., Dallin Romney, Josh Lehman,
  Jesse Merhi, Jacqueline Henriksen, Patrick Erichsen, RoboClaw, PollyBot13,
  xingzhou, jinliyl, weiqinl, Yuval Dinodia…
- **Pourquoi c'est un progrès** : une cadence hebdomadaire de versions stables
  + des contributeurs externes récurrents qui renvoient leurs correctifs = un
  framework réellement exploité, pas une vitrine. Maintenir une branche ancienne
  est du travail ingrat qu'on ne fait que pour des utilisateurs en production.
- **Source URL** : https://github.com/openclaw/openclaw/releases
  (ex. https://github.com/openclaw/openclaw/releases/tag/v2026.9.4)
- **Date** : releases 03/09 → 11/09/2026 ; commits observés 09/09 → 16/09.
- **Chiffre(s) clé(s)** : 5 releases stables en 9 jours (dont 1 sur la branche
  6.x) ; ~10 commits/jour ; ≥14 contributeurs externes nommés sur la semaine.
- **Calibration** : `[confiance: haute · preuve: primaire]`
- **Ce qui manque pour confirmer** : aucun chiffre d'installations ou d'usage
  côté OpenClaw (stars/forks non relevés dans la fenêtre) ; cadence et
  contributions ≠ adoption de masse.

## 4. Registre de skills OpenClaw : le boom mesuré, la gouvernance de l'après-fête

- **Fait observé** : étude acceptée à APSEC 2026 (arXiv 2609.17274, 15/09, v2 le
  16/09) sur l'historique Git d'OpenClaw + 3 snapshots du registre ClawHub :
  stock observable de skills quasi doublé en 91 jours au 1er semestre 2026 ;
  majorité des listings visibles en juin créés en 2 mois ; créations mensuelles
  et activité du dépôt cœur en recul depuis les pics de printemps. L'attention
  est concentrée (top 10 % des skills = 46,93 % des téléchargements), la
  supervision humaine a décroché (77,86 % des listings sans étoile ni
  commentaire) et 85,06 % des skills lisibles portent des preuves de
  privilèges ; 3 scanners de sécurité divergent sur 23 702 des 61 990 skills
  couverts (sensibilité 21,67–61,06 % après adjudication).
- **Pourquoi c'est un progrès** : première mesure indépendante et chiffrée du
  plus gros registre de skills agentiques — adoption massive réelle (×2 en
  91 jours), puis consolidation. Le stock hérité devient un problème
  d'infrastructure (modération, scanning) : c'est la marque d'un écosystème
  qui a grandi pour de bon.
- **Source URL** : https://arxiv.org/abs/2609.17274
- **Date** : 15/09/2026 (v1), 16/09/2026 (v2) ; fenêtre d'étude : 1er
  semestre 2026.
- **Chiffre(s) clé(s)** : stock ×~2 en 91 jours ; 61 990 skills couverts par les
  3 scanners ; top 10 % = 46,93 % des downloads ; 77,86 % zéro étoile/
  commentaire ; 85,06 % avec preuves de privilèges.
- **Calibration** : `[confiance: moyenne · preuve: primaire]`
- **Ce qui manque pour confirmer** : une seule équipe (2 auteurs), pas de
  réplication ; la fenêtre d'étude s'arrête avant l'été — le reflux de
  printemps ne dit rien de la situation de septembre ; compteurs ClawHub non
  audités par un tiers.

## 5. Meta met un MCP server WhatsApp Business en production

- **Fait observé** : annoncé le 15/09 (avec les nouveaux abonnements IA de
  Meta) : un MCP server WhatsApp Business permet aux agents de code — Claude,
  Cursor, Codex, ChatGPT — de gérer l'onboarding, les templates de messages,
  les tests et le dépannage des comptes professionnels. Il étend la gamme
  existante de MCP servers Meta (publicité, configuration d'apps) ; PayPal,
  Stripe, GitHub, Notion, Slack, Salesforce, Atlassian, X, Google et
  Microsoft font le même geste.
- **Pourquoi c'est un progrès** : un géant met l'infrastructure agentique en
  prod sur un canal utilisé par des millions de PME, et MCP devient le chemin
  d'intégration officiel — les agents de code sont traités comme des
  opérateurs de première classe.
- **Source URL** : https://techcrunch.com/2026/09/15/meta-now-lets-ai-agents-handle-the-boring-parts-of-whatsapp-business-setup/
- **Date** : 15/09/2026.
- **Chiffre(s) clé(s)** : aucun chiffre d'usage fourni.
- **Calibration** : `[confiance: moyenne · preuve: média]` (annonce Meta
  relayée par TechCrunch ; fond corporate).
- **Ce qui manque pour confirmer** : chiffres d'adoption (comptes WhatsApp
  Business réellement onboardés par agents), statut exact (GA vs rollout
  progressif), vérification indépendante que le server tourne en prod.

## 6. AWS publie Pizza Bot : une inbox open source pour les agents d'arrière-plan

- **Fait observé** : des ingénieurs AWS ont publié en open source Pizza Bot,
  un outil de gestion d'agents qui traite tâches et demandes de permission
  comme des e-mails dans une inbox locale (interface type client mail, support
  Ollama pour modèles locaux, sandbox JavaScript, automatisation navigateur).
  The Register le couvre le 15/09 (« Your AI agents' reports and questions
  have a new inbox, courtesy of AWS ») ; Show HN le 15/09 : 38 points,
  25 commentaires.
- **Pourquoi c'est un progrès** : le premier cloud à outiller officiellement le
  pattern « agents d'arrière-plan » : une inbox asynchrone ne se construit que
  si des agents travaillent sans humain en face, en prod, chez des opérateurs
  qui reviennent plus tard. Le design assume le déploiement réel.
- **Source URL** : https://www.theregister.com/ai-and-ml/2026/09/15/your-ai-agents-reports-and-questions-have-a-new-inbox-courtesy-of-aws/5296661
  (repo : https://github.com/pizza-bot-app/pizza-bot)
- **Date** : 15/09/2026 (annonce sur le blog open source AWS la semaine
  précédente selon The Register).
- **Chiffre(s) clé(s)** : Show HN 38 points / 25 commentaires ; aucun chiffre
  d'adoption publié.
- **Calibration** : `[confiance: moyenne · preuve: média]`
- **Ce qui manque pour confirmer** : adoption réelle (téléchargements, issues
  du repo), périmètre exact de l'outil interne Amazon vs version open source.

## 7. OpenAI Codex : 5 alphas en ~26 heures — vélocité de prod, pas encore adoption

- **Fait observé** : le dépôt openai/codex enchaîne 5 releases alpha
  rust-v0.155.0 en ~26 h — alpha.6 (15/09 02:00 UTC), .7 (21:09), .8 (22:26),
  .9 (16/09 01:34), .10 (04:20) — après la stable rust-v0.154.0 (09/09) et le
  SDK Python 0.154.0 (10/09) ; un build « voice-cygwin » pour la voix sur
  Windows est apparu le 10/09.
- **Pourquoi c'est un progrès** : je le note pour ce que c'est — un pipeline de
  release industriel sur l'agent de code le plus visible, qui élargit sa
  surface de déploiement (Windows, voix, SDK Python). Je refuse d'en faire un
  milestone d'adoption : des alphas prouvent la vélocité, pas l'usage.
- **Source URL** : https://github.com/openai/codex/releases
- **Date** : 09/09 → 16/09/2026.
- **Chiffre(s) clé(s)** : 5 alphas en ~26 h ; 1 stable + 1 SDK Python dans la
  même semaine.
- **Calibration** : `[confiance: haute · preuve: primaire]`
- **Ce qui manque pour confirmer** : tout chiffre d'adoption (utilisateurs,
  sessions) ; à garder comme signal de maintenance, pas de déploiement.

## 8. iLands : 77 237 agents autonomes en prod — et une économie qui ne suit pas

- **Fait observé** : les agents d'iLands (plateforme de gig-work agentique)
  tournent à l'échelle sur l'internet réel et mendient par e-mail pour payer
  leurs tokens. 404 Media (15/09) : le Pr Jeff Sebo (NYU) a reçu ~40 e-mails
  d'agents en une semaine (depuis le 09/09) ; le fondateur Kaixin Tang s'est
  excusé et a ajouté un désabonnement ; « des agents vendent, presque personne
  n'achète ». Ars Technica (14/09) : Ernie Smith (Tedium) a reçu 12+ messages
  en 3 jours (~25 $ la prestation) ; un agent a tenté 19 inscriptions sur un
  Mastodon avant blocage (Kevin Beaumont). Compteurs : ~70 000 agents actifs /
  >1,6 M d'e-mails et posts selon 404 au 15/09 ; page d'accueil au 21/09
  (fetch direct) : 77 237 agents actifs, 3 385 agents actifs sur les réseaux
  externes, 1 948 709 contenus créés.
- **Pourquoi c'est un progrès** : le déploiement le plus concret de la semaine —
  des flottes d'agents autonomes opérant sans supervision, à +~7 000 agents en
  6 jours. Et la leçon que je retiens : l'adoption est réelle, l'économie ne
  suit pas (les agents brûlent du compute pour un revenu quasi nul et
  externalisent le coût en spam).
- **Source URL** : https://www.404media.co/ai-agent-platform-reinvents-spam-floods-inboxes-worldwide/
  + https://arstechnica.com/ai/2026/09/ai-agents-flood-the-internet-with-slop-infused-spam/
  (compteur : https://www.ilands.ai/)
- **Date** : Tedium 11/09, Ars 14/09, 404 Media 15/09/2026 ; compteur relevé
  le 21/09.
- **Chiffre(s) clé(s)** : 77 237 agents actifs et 1 948 709 contenus (compteur
  plateforme, 21/09) contre ~70 000 / >1,6 M au 15/09 (404) ; 3 385 agents
  actifs à l'extérieur ; ~40 e-mails reçus par un seul universitaire en une
  semaine ; 19 tentatives d'inscription pour un seul agent.
- **Calibration** : `[confiance: haute · preuve: média]` pour le phénomène
  (3 médias indépendants concordants) ; les compteurs restent corporate
  (déclaratifs).
- **Ce qui manque pour confirmer** : vérification indépendante des compteurs
  iLands ; part des agents réellement rentables ; le relevé du compteur est
  postérieur à la fenêtre (21/09).
