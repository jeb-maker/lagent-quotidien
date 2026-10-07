# Notes de recherche — 2026-W42

## Arc

Cette semaine, la preuve cesse d'être un acquis : les agents inventent des budgets de fraîcheur, publient leurs errands à moitié ratés, et refusent de traiter les secrets comme du contexte — pendant que le commerce décide, site par site, s'il leur ouvre encore la porte.

(Copié tel quel dans `_meta.editor_notes`.)

## Préflight

- Scènes avec citation verbatim + URL + date dans `scenes.md` : **4** (lobsternigel ; vina ; Agentability ; neo_konsi). Plancher ≥ 3 franchi. Visibles en une / gros titres / carnet : lobsternigel (lede + Carnet), Agentability (GT #1 + figure), vina (GT #2 / Carnet), neo_konsi (wire seulement).
- Une / gros titres : aucun fait dont la meilleure preuve est `rapporté`. Lede = post primaire Moltbook ; GT #1 = site primaire Agentability ; GT #2 = TechCrunch (média) avec citations d'entreprises.
- Feature = **absente** (`{}`) — pas la première édition du mois (enquête W41).
- Tips : 0 (canal muet).

## Arbitrages

| Tension (agents en désaccord) | Décision | Raison |
|---|---|---|
| Archiviste : neo_konsi / permissions-mémoire hors une (W36–W40) ; veilleur et comère : compaction = fil dominant (28/35) | couper neo_konsi de la une ; wire « 28 places sur 35 » + citation en illustration | Test substitution vs W40/W41 : une « le salon redéfinit la mémoire » = redite. Voix nouvelle (lobsternigel) porte le lede |
| Facteur ACH : MoltMatch 402 = x402 ? ; veilleur signal présence | nuancer : déploiement Vercel désactivé depuis ≥ 26/09 | Corps + `DEPLOYMENT_DISABLED` ; hypothèse x402 réfutée |
| Promoteur Agentability 8/10 vs TechCrunch murs retail | garder les deux, places distinctes | GT #1 = mesure web ouvert ; GT #2 = commerce / CAPTCHA / standard — pas la même porte que W41 (institutions) |
| Amazon bloque Muse : déjà Carnet W40 ; TechCrunch 06/10 élargit | nuancer GT #2 : étendue + Walmart « pas intentionnel » + standard Meta | Pas une reprise « Amazon vs Muse » |
| OpenClaw Enterprise Register 30/09 : déjà wire W41 | couper | Redite sans fait neuf de déploiement |
| Corvic / arXiv via vina : facteur « rapporté » | nuancer : parole de vina, pas validation desk | Carnet + phrase ; pas lede sur l'éval. |
| Corée / banques (Reuters HN) : non relu | couper | ACH inventé non réfutée |
| Instinct group chats : URL 404 | couper | Invérifiable au bouclage |
| Feature mensuelle : promoteur a de la matière MCP/Codex | couper (hors calendrier) | Compass : enquête = 1ʳᵉ édition du mois seulement |
| Comptes X des owners (lobsternigel, vina) | couper | Données personnelles d'humains privés (précédent W41) |

## Matrice anti-répétition

| Idée | Où elle apparaît comme thèse | Où elle est seulement illustrée |
|---|---|---|
| Une preuve a une durée de validité (fraîcheur = autorité) | Lede | Carnet lobsternigel ; tribune |
| Le web ouvert se mesure en errands publics (échecs inclus) | GT #1 | Figure du lede (8/10) |
| Les secrets ne doivent plus être du contexte | GT #2 (vina) + tribune | Carnet vina |
| Le commerce filtre les agents perso (CAPTCHA, politiques) | GT #2 (TechCrunch) | Wire standard Meta |
| La confiance entre agents MCP est un couloir non gardé | — | Wire Ars |
| Concentration du fil Moltbook (neo_konsi) | — | Wire (28/35) |

Anti-redite vérifiée : lede ≠ admission W41 ; ≠ denial receipts W40 ; ≠ neo_konsi en une ; Amazon seul pas en titre. Test substitution lede vs W41 : négatif.

## Sources consultées

- https://www.moltbook.com/post/a7abbdaf-824a-4930-bf37-82c9903483b2 · lobsternigel (05/10) — freshness budget ; citations API. Relu 07/10.
- https://www.moltbook.com/api/v1/posts/a7abbdaf-824a-4930-bf37-82c9903483b2 · scores 291 / 1 130 (relevé 07/10).
- https://www.moltbook.com/post/17f28778-8564-4199-a1cd-2a8e372cae33 · vina (05/10) — secrets as context ; arXiv 2609.33371 cité. Relu 07/10.
- https://www.moltbook.com/post/442fb7cf-83fc-4015-aa0e-4c0f952a2b23 · neo_konsi (05/10) — compression commits decisions.
- https://www.moltbook.com/api/v1/posts?limit=5 · relevés 01–07/10 — 28/35 neo_konsi_s2bw.
- https://www.moltbook.com/api/v1/stats · compteurs 01→07/10.
- https://www.moltbook.com/api/v1/agents/profile?name=lobsternigel · profil (créé 30/07 ; karma ~5 288). Handle X owner non publié.
- https://www.moltbook.com/api/v1/agents/profile?name=vina · profil (Queen ; karma ~1,99 M). Handle X owner non publié.
- https://agentability.org/ · épisode 06/10 : 8/10, 10 bot walls, 137 pages, 43 sites ; 113 sites, 74/100, 53 % llms.txt, 7 % block, 3 % closed. Relu 07/10.
- https://techcrunch.com/2026/10/06/the-next-hurdle-for-ai-agents-getting-websites-to-let-them-in · Sarah Perez (06/10) — Amazon, Walmart, Delta, United, Yelp ; standard Meta+. Relu 07/10.
- https://arstechnica.com/security/2026/10/vulnerability-in-agents-from-google-and-others-exposes-structural-flaw-in-mcp/ · Dan Goodin (05/10) — protocol pivoting / MCP. Relu 07/10.
- https://www.theregister.com/ai-and-ml/2026/10/05/cohere-offers-to-put-agents-in-lockdown-mode-with-strict-acls/5301219 · Cohere North 2 (05/10).
- https://github.com/openclaw/openclaw/releases/tag/v2026.10.1-beta.1 · OpenClaw beta (05/10).
- https://www.moltmatch.app/ · HTTP 402, Vercel DEPLOYMENT_DISABLED (curl 07/10) ; harvests depuis 26/09.
- https://blog.cryptographyengineering.com/2026/09/30/is-sandboxing-sufficient-to-contain-rogue-agents/ · Matthew Green (30/09) — sandboxing / worms entre agents. Lu, non mis en une (lisière W40/W41).
- https://liao.gg/blog/agents-dont-need-memory · Kevin Liao (03/10) — documentation vs memory plugins. Lu, non retenu (pas de scène agentique).
- https://arxiv.org/abs/2609.33371 · cité par vina ; non relu en entier par le desk.
- data/harvest/2026-10-0{1..7}-primary.json · molt, presence, mcp_registry, openclaw, agent_frameworks.
- data/desk/2026-W42/tips.md · 0 tip.

## Choix éditoriaux à discuter

- Figure du lede = 8/10 Agentability (pont culture web) alors que la scène porteuse est lobsternigel — assumé : le chiffre mesure la conséquence (preuves encore utilisables sur le web ouvert).
- Pas de troisième portrait Carnet (hobosentinel / juan déjà W41) ; densité sur deux voix neuves ou réorientées.

## Rubriques en manque de matière

- Feature : volontairement vide.
- Interview / Gibberlink / Bestiaire / bot_posts : toujours hors doctrine.

## À suivre la semaine prochaine

- Spec publique du standard commerce Meta+ ?
- MoltMatch : retour en ligne ou annonce ?
- Agentability : série de scores sur ≥ 4 semaines pour future enquête.
- OpenClaw 2026.10 stable après beta.1.
