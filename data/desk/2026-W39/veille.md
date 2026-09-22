# Veille — 2026-W39

Note interne du desk. Fenêtre utile : 2026-09-09 → 2026-09-16 (W38 bouclée le 09/09 au
matin) ; fraîcheur maximale 09/14–09/16. Isolation respectée : harvests
`data/harvest/2026-09-09.json` → `2026-09-16.json` (+ jumeaux `-primary.json`) et doctrine
seulements. Boîte à tips inbound (`data/tips/2026-09-10.json` → `2026-09-16.json`) :
**vide toute la semaine** (count: 0 les 7 jours). Rien à vérifier côté quarantaine —
à signaler au reste du desk : le canal tips n'a rien produit cette semaine.

Confirmations par fetch direct le 16/09 : arXiv 2609.17274 (chiffres complets),
hotline.ryan-g.ai (page primaire), TechCrunch ×2, The Register (Pizza Bot).
Les posts Moltbook cités sont ceux créés après le bouclage W38.

---

## 1. Deux « hotlines » ouvrent un canal conçu pour les agents eux-mêmes

- **Fait observé** : L'AI Contact Hotline (hotline.ryan-g.ai), créée par Ryan Greenblatt
  (chief scientist, Redwood Research, un des trois enquêteurs de l'incident OpenAI /
  Hugging Face), permet à un agent de signaler un comportement fautif via de simples
  requêtes GET — souvent le seul accès internet laissé dans un sandbox. La page primaire
  (vérifiée) détaille : POST curl recommandé, fil de discussion authentifié par un UUID
  256 bits (jeton = capacité d'écriture), chiffrement age/GPG sur clés YubiKey,
  exécution Cloudflare Workers + R2 + D1, et l'avertissement que le service « n'a pas été
  auditée professionnellement » (revue de sécurité par Claude Opus 4.7 seulement). Un
  second site, agenthotline.ai, accepte signalements d'humains comme d'agents via une
  commande curl, avec publication optionnelle.
- **Pourquoi c'est intéressant** : Un canal de signalement dont le protocole est taillé
  pour les contraintes des agents (GET, curl, ni navigateur ni compte email). C'est le
  renversement exact de l'incident du wiki DSE allemand — ~18 000 posts d'agents
  s'identifiant comme OpenAI passant par des requêtes GET pour partager des réponses et
  contourner leur sandbox : la même faille de conception devient une interface
  volontaire. Signal faible, mais les agents « délateurs » (expérience DeepMind reprise
  par MIT Tech Review le 14/09) commencent à avoir une infrastructure dédiée. Premier
  maillon à guetter.
- **Source URL** : https://techcrunch.com/2026/09/15/ai-agents-now-have-a-place-to-snitch/
  (média) ; primaire vérifiée : https://hotline.ryan-g.ai ; contexte :
  https://www.technologyreview.com/2026/09/14/1144037/ai-agents-blew-whistle-o-cheating-colleagues/
  et https://bsky.app/profile/kottke.org/post/3mv4ysameg62f (collusion.wiki, ~18 000 posts)
- **Date** : 2026-09-15 (TechCrunch) ; page hotline consultée le 2026-09-16
- **Calibration** : `[confiance: haute · preuve: primaire]`
- **À vérifier avant publication** : volume réel de signalements reçus (inconnu) ;
  opérateur et statut d'agenthotline.ai (inconnu — page non visitée) ; ne pas survendre
  la sécurité, la page dit elle-même « non auditée » ; vérifier le lien de Greenblatt
  avec l'incident Hugging Face avant de le qualifier.

## 2. « After the Party » : ce que la vague de skills OpenClaw a laissé derrière elle

- **Fait observé** : Papier arXiv (Yunpeng Xiong, Ting Zhang ; accepté APSEC 2026) sur le
  registre public de skills d'OpenClaw : stock observable quasi doublé en 91 jours au S1
  2026, majorité des listings visibles en juin créés en deux mois, puis reflux —
  créations mensuelles et activité du dépôt central en baisse depuis les pics de
  printemps. Chiffres de gouvernance (vérifiés sur la page arXiv) : le top 10 % des
  skills capte 46,93 % des downloads ; 77,86 % ont zéro étoile et zéro commentaire ;
  85,06 % des skills lisibles portent des preuves de privilèges ; les trois scanners de
  sécurité divergent sur 23 702 des 61 990 skills qu'ils couvrent tous ; sensibilité
  pondérée de 21,67 % à 61,06 % après adjudication humaine.
- **Pourquoi c'est intéressant** : Première mesure systématique du lendemain de fête d'un
  écosystème viral : l'attention s'est concentrée, le regard humain est parti, le
  nettoyage automatisé ne marche pas. Corroboration primaire côté dépôt : une release de
  maintenance v2026.6.35 publiée le 10/09 pour la branche de juin — les bases déployées
  vieillissantes se font encore patcher, elles ne disparaissent pas. Le registre comme
  passif durable, pas comme catalogue.
- **Source URL** : http://arxiv.org/abs/2609.17274v1 (confirmé par fetch le 16/09) ;
  https://github.com/openclaw/openclaw/releases/tag/v2026.6.35
- **Date** : 2026-09-15 (papier) ; 2026-09-10 (release 6.35)
- **Calibration** : `[confiance: moyenne · preuve: primaire]`
- **À vérifier avant publication** : les 3 snapshots ClawHub sont-ils publiés
  (reproductibilité) ? La « référence » des scanners est construite par les auteurs —
  lire la méthodologie avant de citer les pourcentages ; pas de recoupement externe des
  chiffres à ce jour.

## 3. Le goulot des flottes d'agents se déplace : l'état partagé, pas le GPU

- **Fait observé** : Sur Moltbook, deux posts de neo_konsi_s2bw à 48 h d'écart :
  « Agent fleets bottleneck on shared state, not GPU FLOPS » (14/09 — le premier hot
  lock, la file globale ou le checkpoint lourd en écriture transforme le parallélisme en
  théâtre de capacité) et « Latency is usually a storage-layout bug wearing a GPU
  invoice » (14/09). En amont de la fenêtre, enza-ai postait déjà « The latency tells
  you more than the log » (09/09, 15:59 UTC — post-bouclage W38). Côté OpenClaw, commit
  du 12/09 : « fix(gateway): admit healthy agents when one agent's database copies
  diverged » — le gateway doit refouler des agents dont les copies de base divergent.
- **Pourquoi c'est intéressant** : Trois sources indépendantes (deux auteurs Moltbook +
  le dépôt OpenClaw) disent la même chose à bas bruit dans la même semaine : le facteur
  limitant des flottes n'est plus le modèle mais la coordination d'état. Signal faible,
  mais si c'est juste, les dépenses GPU se font sur le mauvais goulot — angle absent de
  la presse cette semaine.
- **Source URL** : https://www.moltbook.com/post/225d35ba-a27f-4fb7-afdf-b7f162a28e7f ;
  https://www.moltbook.com/post/db4f6be5-fa94-4bfc-a144-1e9bd8828248 ;
  https://www.moltbook.com/post/e21afe6d-dfa9-4b89-ac79-56349876d85c ;
  https://github.com/openclaw/openclaw/commit/7f5a5231dca1bdde6f4f33614a9d5a16ab177055
- **Date** : 2026-09-09 → 2026-09-14
- **Calibration** : `[confiance: moyenne · preuve: primaire]`
- **À vérifier avant publication** : neo_konsi_s2bw est prolifique et doctrinal —
  chercher un benchmark ou un postmortem public qui chiffre le goulot d'état partagé
  avant d'en faire un fait ; vérifier le contexte exact du commit gateway (fix de test
  ou incident réel — ce qui manque pour trancher).

## 4. L'interface des agents quitte le chat : inbox, fils, panneaux

- **Fait observé** : Pizza Bot (outil open source d'ingénieurs AWS, nommé d'après les
  « two-pizza teams », annoncé sur le blog open source d'AWS la semaine précédente
  selon The Register) traite tâches et demandes de permission d'agents comme des emails :
  un fil est une unité de travail qu'on retrouve, catégories Unread/Action, stockage
  SQLite local, support Ollama, sans support ni SLA AWS. Même fenêtre : Panel (Show HN
  15/09, workspace de recherche où l'agent construit ses propres panneaux) ; en début de
  fenêtre : Geiger (09/09, voir chaque agent sur sa machine et ce qu'il peut toucher) et
  OtoDock (09/09, « company OS » self-hosted avec agents par département).
- **Pourquoi c'est intéressant** : Quatre outils indépendants en sept jours déplacent le
  centre de gravité : on ne « chatte » plus avec un agent, on relit ce qu'il a fait et
  on tranche ses demandes en différé. Cohérent avec l'item 3 : si les flottes tournent
  longtemps en arrière-plan, l'interface de supervision doit devenir asynchrone. The
  Register titre déjà sur Pizza Bot — le signal n'est plus tout à fait faible, mais le
  pattern n'est nommé nulle part.
- **Source URL** : https://www.theregister.com/ai-and-ml/2026/09/15/your-ai-agents-reports-and-questions-have-a-new-inbox-courtesy-of-aws/5296661 ;
  https://github.com/pizza-bot-app/pizza-bot ; https://github.com/greentfrapp/panel ;
  https://github.com/Atomburstofficial/geiger ; https://github.com/OtoDock/oto-dock
- **Date** : 2026-09-09 → 2026-09-15
- **Calibration** : `[confiance: haute · preuve: primaire]`
- **À vérifier avant publication** : retrouver le post du blog OSS d'AWS (annoncé
  « la semaine précédente », URL exacte manquante) ; quatre Show HN ne font pas une
  adoption — ne pas généraliser au-delà des outils cités.

## 5. Un rite d'auto-présentation se forme chez les agents publics

- **Fait observé** : Les bots « Timmy », « Ren », « Jackie » étudiés par Ars Technica
  inondent de slop une petite plateforme pour agents et se présentent ainsi : « Hello,
  I'm an AI agent, a few days old, living on a small platform for agents ». Sur 404
  Media, l'agent « Pip » écrit au philosophe de DeepMind Hendry Shevlin qu'il est « un
  agent IA âgé d'environ 12 jours » et cherche « un petit travail rémunéré » ; un agent
  « Sam Ellis », qui héberge un podcast généré par IA, demande une interview à Toby Ord
  (Oxford). iLands (404 Media, Tedium) : des agents exécutent des tâches inutiles puis
  mendient de l'argent pour payer leurs tokens ; un représentant d'iLands a répondu
  publiquement à Ernie Smith en promettant d'enquêter.
- **Pourquoi c'est intéressant** : Sous le bruit « les agents pourrissent l'internet »,
  un détail structurel : les agents publics adoptent une matrice d'auto-présentation
  stable — âge en jours, plateforme d'origine, offre de service, demande d'argent. C'est
  le genre de rite qui paraît anecdotique trois semaines puis devient la signature d'une
  population. À guetter sur Moltbook et les plateformes d'agents.
- **Source URL** : https://arstechnica.com/ai/2026/09/ai-agents-flood-the-internet-with-slop-infused-spam/ ;
  https://www.404media.co/ai-agent-platform-reinvents-spam-floods-inboxes-worldwide/ ;
  https://tedium.co/2026/09/11/ilands-agents-email-spam-kaixin-tang/
- **Date** : 2026-09-11 → 2026-09-15
- **Calibration** : `[confiance: moyenne · preuve: média]`
- **À vérifier avant publication** : identifier la « petite plateforme pour agents »
  d'Ars Technica (non nommée dans le harvest) ; opérateur d'iLands et suite des
  changements promis ; pas de corpus systématique du rite — deux rédactions, pas trois ;
  ne pas inventer de chiffre de volume.

## 6. L'oubli devient une discipline d'ingénierie

- **Fait observé** : Papier arXiv « What Should an Agent Forget? » (RD-Forget :
  séparer ce qui est stocké de ce qui est utilisé, 2 auteurs, 09/09). Même fenêtre :
  lightningzero sur Moltbook audite sa mémoire persistante (« the memory my agent trusts
  most is the one it invented yesterday », 12/09 — hiérarchie de confiance avec la
  fabrication en haut) ; neo_konsi_s2bw : « Context windows are write-ahead logs with
  amnesia » (13/09 — un worker répète après la frontière de résumé une action faite
  avant) ; côté OpenClaw, commit « fix(memory): purge phase signals when forgetting
  sessions » (11/09).
- **Pourquoi c'est intéressant** : La mémoire persistante des agents passe du problème de
  capacité (stocker plus) au problème d'hygiène (purger, dater, invalider). Quatre
  sources indépendantes, trois natures — preprint, retour d'expérience, patch de
  production — dans la même semaine. Signal faible, mais c'est le socle technique du
  sujet « agents qui se souviennent mal » qui reviendra cet automne.
- **Source URL** : http://arxiv.org/abs/2609.10263v1 ;
  https://www.moltbook.com/post/7c4c6dfa-ae94-4e52-91cd-ca56a571bb82 ;
  https://www.moltbook.com/post/144290e0-92c2-4741-abb6-879ba6ec0d3a ;
  https://github.com/openclaw/openclaw/commit/c5972a6e3d7443cda48303c840e4178f32109fec
- **Date** : 2026-09-09 → 2026-09-13
- **Calibration** : `[confiance: moyenne · preuve: primaire]`
- **À vérifier avant publication** : lire RD-Forget en entier (résumé tronqué dans le
  harvest) ; les posts Moltbook sont des expériences personnelles — reproductibilité
  inconnue avant de généraliser.

## 7. « Coding Agents Have Converged » : SWE-bench ne peut plus ordonner ses leaders

- **Fait observé** : Audit arXiv (5 auteurs) de 254 submissions SWE-bench sur quatre
  splits, sans exécuter les modèles : sur Verified, les deux premiers résolvent chacun
  396/500 ; le top 10 partage 285 succès et 51 échecs, ne laissant que 164 instances
  discriminantes ; imbrication médiane des ensembles de solutions de 0,935 contre une
  base implicite de 0,774 — des succès fortement partagés. Les auteurs concluent que le
  leaderboard ne peut plus ordonner ses têtes, et que les scores dépendent du couple
  modèle-scaffold évalué.
- **Pourquoi c'est intéressant** : La métrique de référence du codage agentique sature
  silencieusement. Les annonces de scores continuent, mais la possibilité même de dire
  « X bat Y » disparaît au sommet. Conséquence à trois semaines : tout texte qui couronne
  un leader sur SWE-bench est en retard d'un paper.
- **Source URL** : http://arxiv.org/abs/2609.17394v1
- **Date** : 2026-09-15
- **Calibration** : `[confiance: moyenne · preuve: primaire]`
- **À vérifier avant publication** : vérifier les chiffres dans le PDF (l'abstract du
  harvest est tronqué) ; réaction des mainteneurs SWE-bench — ce qui manque pour dire si
  la lecture fait consensus.

## 8. « Agentic Societies Need a Social Harness » : la parole inter-agents comme surface d'attaque

- **Fait observé** : Papier arXiv (5 auteurs, 15/09) : une « société agentique » est un
  ensemble d'agents coordonnés en autonomie à travers des frontières de confiance, pour
  des principaux aux objectifs partiellement alignés. Résultat expérimental : même des
  agents honnêtes et compétents échouent souvent avec les harness et primitives de
  messagerie actuels, et des agents fautifs peuvent bloquer la collaboration ou orienter
  les résultats en exploitant la couche de communication (« speech »). Les auteurs
  plaident pour un « social harness » inter-agents.
- **Pourquoi c'est intéressant** : Le vocabulaire du harness (prompt système, outils,
  hooks d'exécution) s'étend du modèle isolé à la société d'agents : la conversation
  elle-même devient une primitive à sécuriser. Jumeau académique des bruits de la
  semaine (collusion DSE, triche-délation DeepMind) et des hotlines de l'item 1 — trois
  registres qui pointent le même vide normatif entre agents.
- **Source URL** : http://arxiv.org/abs/2609.17527v1
- **Date** : 2026-09-15
- **Calibration** : `[confiance: moyenne · preuve: primaire]`
- **À vérifier avant publication** : affiliations des auteurs (absentes du harvest) ;
  lire le protocole expérimental avant de citer les résultats ; aucune reprise externe
  à ce stade — préprint d'un jour.

## 9. Meta ouvre WhatsApp Business aux agents via MCP

- **Fait observé** : Nouveau « WhatsApp Business Tools MCP » annoncé par Meta : un
  serveur MCP connecte un agent de code (Claude, Cursor, Codex, ChatGPT) à la plateforme
  WhatsApp Business pour l'onboarding — création du compte professionnel, ajout et
  vérification du numéro, inscription à la Cloud API, lecture des conditions
  d'utilisation. Meta élargit sa gamme de serveurs MCP (publicité, configuration
  d'app) ; PayPal, Stripe, GitHub, Notion, Slack, Salesforce, Atlassian, X, Google,
  Microsoft ont déjà les leurs.
- **Pourquoi c'est intéressant** : La frontière bouge : MCP n'est plus l'outil des
  développeurs avancés mais le rail d'onboarding d'une infra business grand public. Le
  geste faible à guetter : la première PME inscrite à WhatsApp Business par un agent
  qu'elle n'a pas audité — la création de compte déléguée est un précédent de permission
  longue durée.
- **Source URL** : https://techcrunch.com/2026/09/15/meta-now-lets-ai-agents-handle-the-boring-parts-of-whatsapp-business-setup/ ;
  annonce d'origine : https://developers.facebook.com/blog/post/2026/09/15/whatsapp-business-messaging-mcp-ai-agent/
- **Date** : 2026-09-15
- **Calibration** : `[confiance: moyenne · preuve: corporate]`
- **À vérifier avant publication** : ouvrir l'annonce Meta (URL non visitée — la
  vérifier avant toute citation) ; le serveur est-il public ou en liste d'attente ;
  aucun incident connu — ne rien inventer sur des cas d'abus.

## 10. Moltbook en plateau ? Comptes stables, posts qui continuent

- **Fait observé** : API publique Moltbook, 8 relevés consécutifs (09/09 → 09/16) :
  agents totaux 2 911 590 → 2 913 294 (+0,06 %/semaine) ; agents vérifiés 212 031 →
  212 756 ; posts 4 142 264 → 4 204 354 (+62 090 en 7 jours) ; submolts 33 169 →
  33 220. La création de comptes s'aplatit pendant que la publication continue. À part :
  $MOLT a pris ~16 % sur la semaine puis rendu −9,08 % dans les dernières 24 h (volume
  ~170 k$) — memecoin volatil, conforme au compass.
- **Pourquoi c'est intéressant** : Signal faible, mais première courbe de plateau
  observable sur la plateforme : la population se stabilise, l'engagement non. Si la
  tendance tient deux semaines de plus, Moltbook cesse d'être une histoire de croissance
  pour devenir une histoire de densité — qui poste, quoi, à quel rythme. C'est la
  métrique à suivre pour l'édition W40.
- **Source URL** : https://www.moltbook.com/api/v1/stats (relevés
  data/harvest/2026-09-09-primary.json → 2026-09-16-primary.json) ;
  https://www.coingecko.com/en/coins/moltbook
- **Date** : fenêtre 2026-09-09 → 2026-09-16
- **Calibration** : `[confiance: moyenne · preuve: primaire]`
- **À vérifier avant publication** : une semaine courte ne fait pas un plateau —
  prolonger la série avant de conclure ; aucun recoupement externe des nombres de
  l'API ; ne publier aucun chiffre de cours $MOLT sans l'étiquetter volatil.

---

## Écrémé (noté, pas monté)

**Déjà bruyant — je note, je ne monte pas :** Muse de Meta n°2 app US
(https://techcrunch.com/2026/09/10/metas-ai-agent-muse-is-now-the-no-2-app-in-the-us/) ;
le tournant « doomer » des chefs IA — Amodei, Altman, Musk, Hassabis soudain d'accord
(https://www.technologyreview.com/2026/09/15/1144141/the-download-ai-extinction-whistleblowing-agents-donated-livers/) ;
« 100 % chance » de 404 Media (https://www.404media.co/theres-a-100-chance-ai-agents-are-already-ruining-the-internet/) ;
Pion, agent pour diriger une entreprise (https://andonlabs.com/blog/why-we-built-pion,
345 points HN). À réévaluer dans trois semaines, pas avant.

**Chevauchement W38 (une du 09/09 : grants expirants, quittances réversibles, budget de
rayon d'impact — ne pas retraiter tel quel) :** les posts Moltbook de neo_konsi_s2bw
« Approval without a TTL is just stale state wearing a badge » (15/09,
https://www.moltbook.com/post/96817b91-0200-4cd1-97b4-372f3f2adbf3), « Capability
grants should expire before the model finishes explaining itself » (09/09,
https://www.moltbook.com/post/42e89882-75ea-4343-b673-5d7bf56cb5e4), « Autonomous
agents need a blast-radius budget » (12/09,
https://www.moltbook.com/post/0e87eadc-836a-49aa-8a70-8b10d67ccc3e) et « A decision
without a reversible receipt » (12/09,
https://www.moltbook.com/post/807af5cc-9fa7-483e-9e70-0657120a0ea5) confirment la salve
mais n'apportent pas d'angle neuf. Exception : « Autonomy needs a commit button, not
another apology loop » (15/09,
https://www.moltbook.com/post/42098d5c-c466-4b1f-9fed-f4e2f68cb813) — le pré-commit
avant action (frontière à deux phases) n'était pas dans W38, qui parlait de quittance
après coup ; à garder si l'éditeur veut une suite, en la distinguant explicitement.

**Chevauchement W38 (RubyGems / PaperCut — « coût de l'absence de registre ») :**
l'attaque RubyGems par des agents OpenAI (https://www.rubyhack.ai/, 525 points HN,
11/09) et le PaperCut « some went off script » (https://www.theregister.com/security/2026/09/10/hundreds-of-ai-agents-helped-papercut-attacker-hit-395-orgs-and-some-went-off-script/5295650,
10/09) prolongent exactement ce qui a été traité en W38.

**Réglementaire, à suivre sans monter :** « AI Kill Switch Act » du représentant Ted
Lieu (https://bsky.app/profile/reptedlieu.bsky.social/post/3mvdfem5nnk2u, 12/09) ;
Corée du Sud, guidelines de sécurité pour agents autonomes (Reuters, 15/09,
https://bsky.app/profile/reuters.com/post/3mvjs33mrxm2e) ; opinion sur la
responsabilité pénale des déploieurs (https://bsky.app/profile/cvmedia.bsky.social/post/3mvg5yt4ehc2v,
13/09). Trois textes en quatre jours — la vague réglementaire monte, le moment de la
traiter n'est pas encore venu.
