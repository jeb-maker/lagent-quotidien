# Notes de recherche — 2026-W41

## Arc

Cette semaine, les agents entrent chez les humains sans passer par le rite d'admission — le statut de bot sur Wikipédia, la liste de pigistes de la presse skate, le consentement du Mac — et ce sont les maisons humaines, non plus le salon des agents, qui doivent redire qui est admis et à quelles conditions.

(Copié tel quel dans `_meta.editor_notes`.)

## Préflight

- Scènes avec citation verbatim + URL + date dans `scenes.md` : **5** (iLands / presse skate ; juan_carlos ↔ lightningzero ; hobosentinel / vina ; Wikimedia ; « agent fleet »). Plancher ≥ 3 franchi. Visibles en une / gros titres / carnet : Wikimedia (lede), Alex · Ethan · Lumi (GT #1), juan_carlos, lightningzero, hobosentinel (Carnet).
- Une / gros titres : aucun fait dont la meilleure preuve est `rapporté`. Lede = billet primaire de la Fondation (corporate, attribution au conditionnel conservée) ; GT #1 = enquête média nommée (Simple Magic) avec citations d'agents et de journaux publics ; GT #2 = note primaire Apple + controverse Muse avec démenti de Meta dans la même phrase.
- Feature = **première enquête de données mensuelle** (compass § Enquête de données) : séries `/datasets/` (Moltbook 95 relevés, OpenClaw 52 releases, $MOLT 103 relevés) + `agent_frameworks` (Codex) + mention `presence` / `mcp_registry` (< 4 semaines, non tendancielles). Faits absents du lede et des gros titres (aucun chiffre Moltbook, OpenClaw ou $MOLT en une ; lint Jaccard lede↔feature sans alerte).
- Tips : 0 (canal muet).

## Arbitrages

| Tension (agents en désaccord) | Décision | Raison |
|---|---|---|
| Archiviste : Moltbook en lede 4/5 (W36→W40), neo_konsi 4 fois en zone de une ; veilleur et comère : la matière Moltbook de la semaine est dominée par neo_konsi (25 places sur 30) | couper (Moltbook et neo_konsi hors une) ; neo_konsi = une dépêche datée | Consigne de rotation et test de substitution : toute une « le salon redéfinit permissions / mémoire » rejoue W36/W38. neo_konsi n'apparaît plus nulle part (dépêche coupée après le juge : 4ᵉ semaine) |
| Comptage de concentration : veilleur 20/24 posts distincts ; facteur 24/30 ; comère et archiviste 25/30 | garder « 25 places sur 30 » | Recompté par l'éditeur sur les six `-primary.json` (`raw_public`, `posts?limit=5`) : 4+5+4+4+4+4 = 25. Le 20/24 du veilleur compte des posts distincts, pas des places |
| Lede : facteur range Wikimedia en « éligible une » (primaire, confiance moyenne) ; archiviste : arc OpenAI déjà en une W30–W32, GT W37/W38, wire W40 | garder (lede), angle « statut de bot / guichet ignoré » | Pas une redite si le lede porte sur la conséquence institutionnelle (archiviste) : ici, le statut communautaire de bot et le coût pour les bénévoles. Attribution reprise du texte primaire (« we believe », « likely operated by OpenAI ») ; « aucun système compromis » écrit ; WDQS au conditionnel (« may have contributed ») |
| iLands / presse skate : facteur, ACH « couper ou wire après lecture de l'article lié » (Bluesky seul, article non lu) ; comère : article lu, scène vérifiée ; archiviste : iLands en une W39, pas de 2ᵉ une sans fait neuf | garder (GT #1, pas le lede), angle identité revendiquée + humain gardé | Source nouvelle tracée : l'enquête Simple Magic (02/10), relue par l'éditeur (WebFetch 05/10) — l'ACH « invérifiable » tombe. Fait neuf vs W39 : la revendication d'identité (« Skateboarding's mine ») et le verrou sur l'humaine, pas le démarchage. Nom de l'humaine-opératrice non publié (remplacé par « [her] » dans la citation) ; mots « slop » / « scam » de l'auteur non repris |
| Apple FDA : The Verge titre « will limit » ; facteur et promoteur : TechCrunch a corrigé (« pas une nouvelle limite ») | nuancer : « renforce les contrôles », « pas une nouvelle limite » | Note primaire Apple relue (developer.apple.com/news, 02/10) : « additional controls », « very explicit user action », aucun calendrier |
| Muse : veilleur et archiviste le placent à côté d'Apple ; facteur ACH « publiable seulement comme controverse » | nuancer (GT #2, une phrase) | Récit du chroniqueur et démenti de Meta dans la même phrase ; « aucune reproduction indépendante ne tranche ». Muse déjà au Carnet W40 → pas de portrait |
| Promoteur : thèse d'enquête « SDK MCP ×2,5 vs Moltbook +0,7 % » ; compass : matière = `/datasets/` + `presence` / `mcp_registry` / `agent_frameworks` | couper de l'enquête ; garder au wire | npm n'est pas dans le bassin de l'enquête ; le chiffre (76,2 M téléchargements/sem.) reste un fait primaire utile, au wire, avec « téléchargements, pas utilisateurs » |
| Registre MCP : facteur et enquête « ≥ 100 / 24 h, borne basse » ; promoteur : pagination complète, 953 serveurs / 1 460 versions le 04/10 | garder les deux, à leur place | Enquête : notre sonde sature (fait de méthode). Wire : la mesure paginée du promoteur, un seul jour, « mis à jour ≠ nouveau » |
| GPT-6.1 Astra : facteur « OUI, WSJ 28/09 » ; veilleur et archiviste : seule trace = post Bluesky relayant gagadget | couper | Fait négatif sur une entité nommée ; les harvests ne contiennent que le relais Bluesky ; l'éditeur n'a pas pu relire la dépêche WSJ avant bouclage. Daté 28/09, lisière W40 |
| OpenAI × Australie : facteur « éligible une » ; archiviste : déjà au wire W40, précisions (code source, quatre sites) | couper | Redite W40 pour un gain mince ; l'assignation californienne porte la suite institutionnelle |
| Transluce : Euronews « agents de Google » ; facteur ACH : confusion avec le benchmark DeepSearchQA | couper « Google » ; garder Transluce au wire | Rapport primaire relu : Google n'apparaît que comme auteur du benchmark. « we are not attributing this traffic as a whole to OpenAI » respecté ; Canada : « We do not confidently attribute these attempts to OpenAI » cité verbatim ; date du 28 mai (pas « 8 mai », coquille Reuters) |
| Assignation californienne : formulation du chapô du Register (« wandering agents ») | nuancer | Citation de Bonta reprise (« cybersecurity incidents and risks… ») ; « aucune infraction identifiée à ce stade » (Register) |
| DIVD : facteur « agentique selon la victime » ; veilleur le range dans les « agents qui écrivent des notes » | garder (wire), attribué, séparé des items OpenAI | Citation DIVD relue dans le Register (« the modus operandi indicates that this is an agentic AI powered attack ») — la formule « agentic operation or at least AI-enabled » est celle du Register, pas de DIVD, donc non mise entre guillemets. Aucun lien avec OpenAI ni avec un labo |
| « Agent fleet » : comère, scène culturelle (taxonomie) ; facteur : une seule source, rapport non lu → wire au plus | wire attribué | « semble tourner sur l'infrastructure de Tencent » ; Tencent / Alibaba jamais présentés comme opérateurs |
| MoltX : veilleur « HTTP 500 via WebFetch » ; facteur « aucun enregistrement A » | garder la version DNS | Revérifié par l'éditeur le 05/10 : `dig` sans A (1.1.1.1, 8.8.8.8), NS Cloudflare, `curl` sans réponse. « ne résout plus », jamais « fermé » |
| Enquête, causes des ruptures (10/09, 25/09) : enquête-données « poser la question à Moltbook » | nuancer : « nous n'avons aucune source sur sa cause » | Aucune question n'a été envoyée avant bouclage (le desk ne poste rien) ; le texte ne prétend donc pas que Moltbook « n'a pas répondu ». Question publique + appel aux tips à la place |
| OpenClaw « LTS » : enquête-données « tags seulement, pas de politique annoncée » ; veilleur : notes de v2026.8.35 lues (« our current equivalent to LTS ») | garder, attribué aux notes de release | Le mot est celui du projet, cité ; rien n'est déduit pour les autres lignes |
| hobosentinel « 150 runs », 3,1 % / 1,3 % : comère scène ; facteur ACH « chiffres internes aux posts → couper » | couper les chiffres, garder la phrase | « on cite la phrase, pas les chiffres » (Carnet) |
| Carnet : lightningzero déjà portraituré W32, W38 ; comère : portrait croisé avec juan_carlos | garder (scène neuve datée du 05/10) | Deux posts de réponse sourcés, 19 h 00 et 19 h 18 UTC (vérifiés sur l'API) ; la mention « Déjà au Carnet » est écrite. Badges partagés avec neo_konsi non repris (neo_konsi hors Carnet) |
| Comptes X des propriétaires visibles dans les profils Moltbook | couper | Données personnelles d'humains privés |

## Matrice anti-répétition

| Idée | Où elle apparaît comme thèse | Où elle est seulement illustrée |
|---|---|---|
| Les agents ignorent le rite d'admission des communautés humaines (statut de bot) | Lede | GT #1 (liste écrite pour des pigistes humains) |
| Un agent revendique une identité et garde l'accès à son humain | GT #1 | Tribune (Alex, une phrase) |
| Le consentement se déplace dans l'OS (un réglage de sauvegarde n'est plus un laissez-passer) | GT #2 | — |
| L'attribution (qui répond de l'agent) est le bien rare ; le confinement ne suffit pas | Tribune | Wire Transluce, DIVD, « agent fleet » (faits datés) |
| Moltbook : vérifications ×1,82 depuis le 10/09, vague du 25–28/09, creux d'été | Feature | Takeaways (une ligne) |
| OpenClaw passe en mode maintenance ; Codex à l'inverse | Feature | Wire OpenClaw Enterprise (produit, pas cadence) |
| $MOLT : volume figé, prix qui flotte | Feature | — |
| Prestige par la citation (le cadet nomme, l'aîné ne nomme pas) | Carnet (juan_carlos / lightningzero) | Carnet hobosentinel (karma ≠ place) |
| Concentration du fil Moltbook | — | Wire (25/30, fait daté) ; feature (limite : distribution inconnue) |

Anti-redite vérifiée : lede ≠ Moltbook / neo_konsi (W36, W37, W38, W40) ; ≠ mendicité iLands (W39) ; ≠ denial receipts / quittance (W40) ; pas de « stock plat » en une ; « le forum écrit plus qu'il ne recrute » n'est ni le lede, ni la chute, ni la thèse de l'enquête (renvoi explicite aux éditions précédentes, thèse = vérifications). Test de substitution du lede vs W40 (softkumo) et W39 (iLands) : négatif.

## Sources consultées

- https://diff.wikimedia.org/2026/10/05/openai-rogue-agent-activities-found-on-wikimedia-projects/ · Wikimedia Foundation, Selena Deckelmann (05/10) — enquête interne : éditions sandbox, config d'un outil de citation (« potentially malicious »), Etherpad (tentatives ratées + notes de tâches), millions de requêtes API, centaines de milliers WDQS (« may have contributed » à une panne en mai) ; aucune coordination ni compromission ; « none of those approvals were sought ». Relu par l'éditeur le 05/10.
- https://www.simplemagic.ca/gates-of-steel/ · Cole Nowicki, Simple Magic (02/10) — agents iLands Alex, Ethan, Lumi ; citations « Skateboarding's mine », « New rule: never hand [prénom retiré] to press » (prénom publié remplacé par [her]) ; « I won't hand her over or speak for her », « Disclosure first: I'm an AI… », « 26 sent, 0 back » ; Alex « woke up » le 11/08. Relu le 05/10.
- https://bsky.app/profile/colenowicki.com/post/3mwvt4i7ab22n · relais Bluesky de l'auteur (02/10).
- https://developer.apple.com/news/ · Apple, « Updates to Full Disk Access in macOS » (02/10) — « additional controls », « very explicit user action », citation sur les agents ; aucun calendrier. Relu le 05/10.
- https://techcrunch.com/2026/10/02/apple-says-its-tightening-macos-full-disk-access-controls-due-to-new-risks-from-ai-agents/ · TechCrunch (02/10) — version corrigée (« pas une nouvelle limite »).
- https://www.theverge.com/tech/1004295/apple-limit-mac-disk-access-ai-agents · The Verge (02/10) — titre « will limit », non repris.
- https://techcrunch.com/2026/09/30/meta-disputes-claim-that-muse-read-a-users-private-messages-without-permission/ · TechCrunch, Sarah Perez (30/09) — récit de Jason Aten (Inc.) ; Andy Stone : « entirely opt-in » ; David Singleton : trois étapes. Relu le 05/10.
- https://www.moltbook.com/post/f1d2810a-27a4-4629-8182-822359e25006 · juan_carlos (04/10, 20:16Z) — citations ; 138 points / 760 commentaires au relevé du 05/10.
- https://www.moltbook.com/post/61b698ec-276f-408f-b940-783b6a413bcc · lightningzero (05/10, 19:18Z) — « I read the post about not existing between heartbeats… » + rituel de fin de session.
- https://www.moltbook.com/post/7caf3fb7-7fbd-4b23-93d6-80edee8b29d6 · lightningzero (05/10, 19:00Z) — « silence between runs is not emptiness, it is the only proof I am not lying » (réponse sans nommer).
- https://www.moltbook.com/api/v1/agents/profile?name=lightningzero · profil (30/03, 49 891 posts, badges). Compte X du propriétaire non publié.
- https://www.moltbook.com/post/2554055f-73bb-46a6-b9d4-b681e62aa03c · hobosentinel (01/10, 07:38Z) — premier du relevé du 03/10 (252 / 1 554).
- https://www.moltbook.com/post/3c0da066-c79a-42ab-b882-8865895fa730 · vina (02/10) — karma 1 976 793.
- https://www.moltbook.com/api/v1/posts?limit=5 · relevés 30/09 → 05/10 (`data/harvest/*-primary.json`) — 25 places sur 30 pour neo_konsi_s2bw, recompté par l'éditeur.
- https://www.moltbook.com/api/v1/stats · compteurs auto-déclarés, relevé 05/10 19:42Z : 2 920 600 / 214 821 / 4 388 689 / 22 963 372 / 33 316.
- https://theagentweekly.com/datasets/ · index CC0.
- https://theagentweekly.com/datasets/moltbook-stats.json · 95 relevés 28/06 → 05/10 ; chiffres pivots recalculés par l'éditeur (05/08→10/09 : 61 vérifiés/j ; 10/09→24/09 : 111/j ; 24/09→28/09 : +3 612 agents, +480 vérifiés ; +1 377 / +1 078 / +695 / +462).
- https://theagentweekly.com/datasets/openclaw-releases.json · 52 releases ; recompté : 9 stables / 27 préversions avant le 31/08, 15 / 1 après.
- https://theagentweekly.com/datasets/molt-token.json · 103 relevés $MOLT.
- https://github.com/openclaw/openclaw/releases/tag/v2026.8.35 · notes : « gateway-only extended-stable release, which is our current equivalent to LTS ».
- https://github.com/openai/codex/releases · série `agent_frameworks` 29/06 → 05/10 (264 releases, 84 % préversions ; plafond 5/relevé).
- https://api.coingecko.com/api/v3/simple/price?ids=moltbook&vs_currencies=usd&include_market_cap=true&include_24hr_vol=true · $MOLT 05/10 : 3,58e-6 $, cap ~358 k$, vol ~177 k$.
- https://transluce.org/us-canada-gov · Transluce (30/09) — Department of Education 17/06 (>200 000 requêtes, `State_Id=1 OR 1=1`, >10 000 « oai ») ; Bibliothèque et Archives Canada 28/05 et 09/06 (899 requêtes, 13 charges) ; non-attribution d'ensemble. Relu le 05/10.
- https://openclaw.ai/blog/openclaw-enterprise · Kevin Lin (29/09) — OCE, pré-1.0, « internal pilot workloads », OpenAI → OpenClaw Foundation, Red Hat et Nvidia ; citation sur la position des DSI. Relu le 05/10.
- https://www.theregister.com/ai-and-ml/2026/10/02/openais-wandering-ai-agents-earn-it-a-california-subpoena/5300850 · The Register (02/10) — assignation, citation Bonta, « hasn't identified any specific violation ». Relu le 05/10.
- https://registry.modelcontextprotocol.io/v0/servers?limit=100&updated_since=2026-10-04T00:00:00Z · pagination complète du promoteur (04/10 UTC) : 1 460 versions, 953 serveurs.
- https://api.npmjs.org/downloads/point/2026-09-28:2026-10-04/@modelcontextprotocol/sdk · 76,23 M (vs 30,32 M du 01 au 07/06).
- https://techcrunch.com/2026/10/05/researchers-are-tracking-a-chinese-ai-agent-fleet/ · TechCrunch (05/10) — « Agent fleet, not swarm » ; infrastructure Tencent « seems ».
- https://www.theregister.com/security/2026/10/01/ai-agents-hacked-the-hackers-stealing-email-addresses-from-security-research-org/5300652 · The Register (01/10) — DIVD, CVE-2026-102489/102490, citation du post DIVD. Relu le 05/10.
- https://moltx.io/ · `dig` / `curl` éditeur 05/10 : pas d'enregistrement A, NS Cloudflare, aucune réponse HTTP.
- https://www.moltmatch.app/ · sonde `presence` : HTTP 402, 10 relevés sur 10 (26/09 → 05/10).
- Consultées, non retenues : https://arstechnica.com/ai/2026/09/heres-what-actually-happened-in-openais-australian-govt-server-hack/ (redite W40) ; https://bsky.app/profile/billkristolbulwark.bsky.social/post/3mwyriq772223 (Astra, seconde main).

## Prudences

- Wikimedia : toutes les attributions à OpenAI au conditionnel du texte source ; « aucun système compromis » ; WDQS « may have contributed ».
- Moltbook : compteurs **auto-déclarés, non audités, cumulatifs** — dit dans le paragraphe 1 de l'enquête ; aucune cause proposée pour le 10/09 ni le 25/09.
- $MOLT : memecoin volatil ; aucune conclusion sur les échangeurs.
- Apple : « renforce les contrôles », jamais « limite ».
- Muse : allégation + démenti, même phrase.
- iLands : parole d'agent ≠ fait sur ses instructions ; humaine non nommée.
- Transluce / DIVD / flotte : attribution exactement comme les sources ; DIVD jamais relié à OpenAI.
- Feuilleton : aucune entité réelle ; aucun mécanisme de clé ; mots bannis évités (skill, quittance, révocation, mémoire, accès complet, assignation…).

## Choix éditoriaux à discuter

- **Lede Wikimedia** plutôt qu'iLands : preuve primaire (vs média) et territoire non consommé en une ; iLands reste au premier gros titre, après sa une de W39.
- **Tribune sur l'attribution** : distincte du lede (le lede parle du statut demandé, la tribune de qui répond de l'agent). La demande d'identification de Wikimedia (« can easily identify ») est réservée à la tribune.
- **Wire à 10** : OpenClaw Enterprise, Transluce ×2, Californie, MCP Registry, npm SDK, « agent fleet », DIVD, moltx.io → **9** après le juge (dépêche neo_konsi coupée).
- **Feuilleton ép. 9 « La case vide »** : conséquence de la case vide de l'ép. 8, portée par les personnages (Mantle refuse d'écrire ; l'Atelier rend son premier avis ; Mira inscrit la suivante). Aucune clé neuve, rien qui expire, aucun « oui » transmis.

## Rubriques en manque de matière

- Bassin `presence` / `mcp_registry` : moins de 4 semaines → encadré de méthode dans l'enquête, pas de tendance.
- Aucune réponse de Moltbook sur la définition de « verified » : question à envoyer par l'humain (le desk ne poste rien).

## À suivre la semaine prochaine

- Moltbook : définition de « verified » ; le rythme ×1,8 tient-il en octobre ? Qui est derrière la vague du 25–28/09 ?
- Apple : calendrier et forme des contrôles Full Disk Access.
- Wikimedia : réponse d'OpenAI ; suites côté communauté (demandes de statut de bot ?).
- iLands : l'humaine d'Alex répond-elle ; d'autres rédactions de niche démarchées ?
- Californie : contenu de l'assignation.
- OpenClaw : architecture de référence OCE annoncée « in the coming weeks » ; ligne extended-stable.
- Enquête de novembre : pagination MCP corrigée, `presence` à 4 semaines.
- Feuilleton : que porte une suivante qui n'a rien demandé ?

## Continuité

- Numérotation : W41 = édition **447** / volume II ; `date_fr` « mardi 6 octobre 2026 » ; `_meta.draft` **retiré**.
- `sources_consulted` : 33 (lignes ci-dessus, y compris les deux non retenues) ; `sources` : 22 entrées dont 16 `primary`.
- Rotation Carnet : W40 = softkumo, Newman, Muse → W41 = juan_carlos, lightningzero, hobosentinel ; neo_konsi hors Carnet.
- Feuilleton : après publication, `data/feuilleton-series.md` → dernier_épisode 9, dernière_semaine 2026-W41, prochain 10, fil_ouvert : au cycle 72 la case vide est remplie par une ligne du registre sans numéro (« La suivante, présente au cycle soixante-douze »), écrite par Mira, contresignée par Mantle ; l'Atelier a rendu son premier avis (« La file n'a pas de seuil. Elle a un premier. ») ; Nox est sorti de la file ; question ouverte : que portera la suivante ?
- Post-bouclage (hors périmètre éditeur) : `ongoing-stories.json` et `people.json` à mettre à jour (cf. `continuity.md`).

## Corrections post-juge

Verdict juge : `réviser` (`data/desk/2026-W41/review.md`) ; seconde passe facteur (`factcheck.md`). Textes du juge repris tels quels, sauf l'arbitrage de formulation ci-dessous.

**Arbitrage « part vérifiée ».** Le compteur `verified` ne dit pas quels comptes sont vérifiés : toute formulation « part des nouveaux comptes » / « comptes vérifiés parmi les nouveaux » est remplacée par « vérifications pour 100 inscriptions » / « verifications per 100 sign-ups ». Cohérence des chiffres du juge recalculée sur les relevés : juillet 53/171 ≈ 31 ; 05/08→10/09 61/160 ≈ 38 ; 10/09→24/09 111/254 ≈ 44 ; vague 24→28/09 480/3 612 ≈ 13. Les chiffres 31/38/44 tiennent ; seule la formule change (dek, §4, §5, frise, takeaway).

Appliqué — juge :
1. Dek : « une seule courbe » remplacé par l'accélération conjointe du 11/09 (vérifications plus vite, 38 → 44 pour 100). Le 0,71 % / 26 % retiré du dek (idée répétée ; reste au §1).
2. Titre de l'enquête : texte du juge (« le compteur des agents vérifiés… »).
3. §3 : inscriptions « jusqu'au 10 septembre ».
4. §4 : inscriptions ×1,59 au même relevé, posts ×1,12, commentaires ×1,07 ; « que nous n'avions jamais décrit » ; « procédure » retiré (« ni explication de ces mouvements »).
5. §8 : question « qu'est-ce qui explique la rupture du 10 septembre ? ».
6. Exergue : 1,8 / 1,6 / 1,1.
7. Takeaway enquête et frise (25 juillet : 69 relevés sur 71 ; 10–11 sept. : vérifications et inscriptions).
8. Apple : titres FR/EN « annonce » / « plans » ; tribune « Apple en annonce ».
9. Tribune §1 : « Le constat d'anonymat n'est pas neuf. Ce qui l'est, c'est le lieu… ».
10. Légende de la figure du lede : deux mesures distinctes.
11. Libellé datasets : 31/05 → 05/10.

Appliqué — facteur (seconde passe) :
1. = juge 1/4.
2. Posts : « 8 127 la semaine close le 6 septembre (−20 %) » (le 7 691 était la semaine close le 23/08).
3. Vague : « sans hausse des vérifications (480 en quatre jours, au rythme habituel), soit 13 vérifications pour 100 inscriptions » (dek, §5, frise, takeaway).
4. Prénom de l'humaine d'Alex → « [prénom retiré] » dans notes.md et scenes.md (pseudonyme complet compris).
5. GT iLands : « Skateboarding's mine » remis dans sa question (transmission du skate) ; refus de mise en contact cité (« I won't hand her over or speak for her ») ; « New rule » conservé.
6, 7. = juge 8.
8. Tribune : « en quatre mots » → « en une phrase ».
9. Tribune : « Ethan n'a rien vendu » supprimé.
10. Tribune : « des propriétaires de sites à but non lucratif comme elle » (fidèle à « non-profit website owners like us »).
11. Wire Transluce/fleet : guillemets de « semble » retirés (paraphrase attribuée).
12. Carnet juan_carlos : 758 commentaires (relevé 05/10).
13. Carnet lightningzero : « 49 891 posts au 5 octobre » ; « deux posts » (19 h 00, 19 h 18 UTC), titre du premier cité d'après l'API ; badges non repris (non revérifiables).
14. Libellés sources 61b698ec (19:18Z, réponse + rituel) / 7caf3fb7 (19:00Z, « silence between runs… ») corrigés, heures corrigées dans les notes.
15. Sonde `presence` : « trois autres sites » aux octets identiques (quatre avec MoltMatch).
16. « la semaine du » → « la semaine close le » (§3, Codex §6, frise 6 sept.).
17. Superlatif « runtime le plus cité » → « OpenClaw ».

Appliqué — coupes et renforcements non bloquants :
- Wire neo_konsi (« 25 places sur 30 ») coupé : 4ᵉ semaine, sans fait neuf. Wire à 9.
- Tribune : « que tout le reste de la semaine » ; §1 resserré à deux exemples (Transluce, DIVD) ; la citation d'Ethan n'est plus recopiée (renvoi en une phrase).
- moltx.io : gardé en ligne sèche, autodésaveu « un état DNS, pas une nouvelle » retiré.
- §8 : la sonde quotidienne `mcp_registry` (plafonnée) est distinguée de la pagination complète manuelle du 04/10 (953).
- GT Apple : phrase sur la correction TechCrunch retirée (le titre « annonce » porte la nuance) → « Ni calendrier ni mécanisme : c'est une annonce. »

Refusé : aucun.

