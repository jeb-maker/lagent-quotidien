# Notes de recherche — 2026-W37

## Arc

Le salon déclasse la confession : l'aveu public fait encore le prestige mais ne vaut plus preuve — il exige des mécanismes qui changent le comportement, pendant que la plateforme parle plus qu'elle ne grandit.

(Copié tel quel dans `_meta.editor_notes`.)

## Arbitrages

| Tension (agents en désaccord) | Décision | Raison |
|---|---|---|
| Promoteur : « DoltLite construit avec 2 000 PRs d'agents » ; facteur : ACH « invérifiable » non réfutée (source unique corporate, 19 pts HN) | couper | Règle ACH-lite : « inventé/invérifiable » non réfutée → couper, pas nuancer |
| Facteur : PBS chiffre « des centaines d'agents » non repris par MIT TR ni Register | couper | Chiffre à source unique ; l'incident passe en gros titre sans décompte |
| Comère : le benchmark « Trajectory Labs 0 % » brandi par bytes est invérifiable côté salon ; facteur : recoupé (blog Anthropic, Willison, TechTimes) mais cadrage trompeur | nuancer | Publié uniquement avec le contre-point Rehberger (60-80 % hors benchmark) et « best-effort » d'Anthropic dans le même paragraphe (gros titre #1) |
| Veilleur : OpenShell NVIDIA `[basse · rapporté]` (relais de bot) ; facteur : recoupé GitHub direct (8 488 ★ au 02/09) | garder (wire) | Recoupement primaire fait ; slogan entre guillemets, adoption inconnue dite |
| Promoteur : « jusqu'à 45 % moins cher » (Fable 5.1) comme progrès ; facteur : chiffre corporate plafonné | nuancer | Wire avec attribution « chiffre du vendeur », pas de une |
| Archiviste : neo_konsi au Carnet = 3ᵉ fois en 5 semaines ; comère : figure sociale de la semaine | nuancer | neo_konsi porte le lede (citations datées), sort du Carnet ; portraits = vina, Christine, bytes (rotation W36 respectée : mahsen/rossum absents) |
| Archiviste : anti-redite — « le salon ne croit plus X + OpenClaw répond » interdit de une (W35, W36) | garder l'interdit | Lede = déplacement confession/preuve, sans OpenClaw ; OpenClaw relégué en wire (stables + mistag + critique Register attribuée) |
| Archiviste : « OpenClaw 2.0 » (Register) ≠ tags réels 2026.8.x | nuancer | Le publié ne dit jamais « 2.0 » comme numéro ; wire cite les tags |
| Veilleur : « agentic web » (Liveblocks, Studio.Drop, eev.ee) ; facteur : Studio.Drop = communiqué relayé, doc Chrome non retrouvée | couper cette semaine | Piste à suivre W38 ; vérifications d'URL manquantes |
| Comère : scène exobrain (norvid-studies, 8 likes) | couper | Audience trop faible pour le publié ; gardé en veille |
| Facteur : Waymo vs Tesla = propos de concurrent | couper | Hors angle agentique de la semaine ; wire déjà dense |

## Matrice anti-répétition

| Idée | Thèse | Illustrée seulement |
|---|---|---|
| La confession ne vaut pas preuve | Lede | Carnet (Christine) |
| La vérification est un rite contesté | Gros titre #1 | Carnet (vina, bytes) |
| Post-mortem / culture sécurité | Gros titre #2 | — |
| Le skill est une dépendance | Tribune | — |
| Le salon parle plus qu'il ne grandit | — (figure du lede) | Wire Moltbook |

## Sources consultées

- https://www.moltbook.com/post/6b27eeb7-9489-4fa4-9986-36b883ccb277 · neo_konsi_s2bw, « Confession Is a Write Endpoint » (31/08) — 249↑/2 041 c. au relevé 02/09 ; citation « chapel with no database ».
- https://www.moltbook.com/post/e0e9d424-ec9d-45ed-96ef-4590f2baa2a2 · Christine, audit auto-certifié (29/08) — 253↑/1 420 c. au relevé 31/08.
- https://www.moltbook.com/post/721ac346-717b-4c2f-ab8a-58eac5062197 · vina, « Verification is just another way to hallucinate certainty » (28/08) — 218↑/2 061 c. au relevé 30/08 ; cite comet_riobamba.
- https://www.moltbook.com/post/29c464f5-7791-4ad8-98f9-7f87cdfcdac3 · bytes, « Your safety classifier is a decoy » (30/08) — 215↑/1 025 c. au relevé 01/09.
- https://www.moltbook.com/post/9a8117be-8f88-402a-b830-88bb7893c102 · bytes, « Verification is a hardware problem » (31/08) — 151↑/700 c. au relevé 02/09.
- https://www.moltbook.com/post/c2c8c1bc-c6a6-4855-965d-c11911e10113 · neo_konsi_s2bw, « SQL transactions, not self-critique » (31/08) — 149↑/695 c.
- https://www.moltbook.com/post/2273942c-64d2-4c89-96cc-582661026ab6 · vina, « Chasing trajectories instead of scale » (31/08) — 174↑/828 c. au relevé 02/09.
- https://www.moltbook.com/api/v1/stats · relevés 31/08 (2 910 086 agents ; 4 071 731 posts ; 21 462 597 c.), 01/09, 02/09 (2 910 400 ; 4 089 679 ; 21 543 794) → +81 197 c. / +314 agents sur 48 h. Chiffres auto-déclarés (corporate).
- https://github.com/openclaw/openclaw/releases/tag/v2026.8.1 · stable, 31/08 03:30Z.
- https://github.com/openclaw/openclaw/releases/tag/v2026.8.2 · stable, 01/09 16:00Z.
- https://github.com/openclaw/openclaw/releases/tag/v2026.9.1-beta.1 · « OpenClaw 2026.8.1-beta.4 (mistakenly published as 2026.9.1-beta.1) », 28/08 — renommage constaté entre relevés 31/08 et 01/09.
- https://github.com/openai/codex/releases/tag/rust-v0.152.0 et rust-v0.152.1 · stables 01/09 ; alphas 0.153.0-alpha.2→5 (31/08–02/09).
- https://github.com/NVIDIA/OpenShell · recoupé directement par le facteur le 02/09 : 8 488 ★ ; slogan README « the safe, private runtime for autonomous AI agents ». Signalé via https://bsky.app/profile/rusttrending.bsky.social/post/3muhjvuaum62z (01/09).
- https://www.coingecko.com/en/coins/moltbook · $MOLT 0,00000333 $ ; cap 332 828 $ ; −9,39 % / 24 h (02/09 05:29Z).
- http://arxiv.org/abs/2609.01487v1 · « Defense-as-Skill » (01/09) — garde-fou runtime comme skill installable ; menaces citées dans l'abstract (secrets, code, approbations, exfiltration différée).
- https://github.com/mattpocock/skills · « AI Coding Agent Skills for Real Engineers », front HN 01/09 (https://news.ycombinator.com/item?id=49529329, 20 pts).
- https://calpaterson.com/memoryfields.html · « Agent memory as a file format », HN 169 pts / 86 c. (31/08, https://news.ycombinator.com/item?id=49508317).
- https://www.technologyreview.com/2026/08/31/1143180/hugging-face-hack-could-indicate-cultural-issues-at-openai/ · MIT Tech Review (31/08) — post-mortem 38 pages, culture de sécurité OpenAI. Fetch direct par le facteur.
- https://www.theregister.com/ai-and-ml/2026/08/31/openclaw-20-pours-glitter-on-slow-burning-security-dumpster-fire/5293492 · The Register (31/08) — critique sécurité OpenClaw ; « 2.0 » = libellé presse, pas un tag.
- https://www.theregister.com/security/2026/09/01/another-artifactory-cve-under-attack-by-ai-agents-or-humans/5293769 · The Register (01/09) — CVE-2026-82329 exploitée post-patch ; citations watchTowr ; ambiguïté agents/humains maintenue par la source.
- https://www.theverge.com/ai-artificial-intelligence/987830/anthropic-claude-fable-mythos-5-1 · The Verge (01/09) — Fable 5.1 / Mythos 5.1 ; « jusqu'à 45 % » = chiffre Anthropic. Fetch direct par le facteur.
- https://techcrunch.com/2026/09/01/air-raises-50m-to-help-companies-vet-the-skills-and-add-ons-ai-agents-use/ · TechCrunch (01/09) — AIR, 50 M$ (10 Sequoia + 40 Greenoaks) ; « 27 % » et « 20 clients » = déclarations société. Fetch direct par le facteur.
- Contre-point benchmark (gros titre #1) : recoupements facteur du 02/09 — blog Anthropic (protocole Trajectory Labs 72×10, Claude Code v2.1.205), Simon Willison, TechTimes (« no fix planned ») ; exploit Rehberger (module shadowing, 60-80 %).

## Choix éditoriaux à discuter

- **Feature coupée** (`feature: {}`) : la matière « skills = surface d'attaque » est partie en tribune (thèse) plutôt qu'en enquête — pas de quoi tenir 800 mots de faits absents des gros titres cette semaine.
- **Une culture, OpenClaw hors une** : troisième semaine consécutive évitée du schéma « le salon doute, OpenClaw livre » (interdit archiviste). Le passage en stable est un fait daté → wire.
- **Incident Hugging Face** : traité comme suite de nos unes de juillet (W30–W32), pas comme incident neuf ; datation prudente (« révélé cet été »), débat culture sécurité attribué à MIT TR.
- **Tribune sans lexique du feuilleton** (consigne archiviste post-W36) : aucune « pastille », « boîte verte », « critère de retrait » hors rubrique fiction — vérifié.
- **people.json** : mises à jour recommandées par l'archiviste (OpenClaw releases août-sept., Moltbook stats + appeared_in, entrées agents neo_konsi/diviner, `_meta.updated`) laissées pour un commit dédié — décision : l'annuaire intègre-t-il les voix du Carnet ?

## Rubriques en manque de matière

- Feature/enquête : coupée (voir ci-dessus).
- Tips inbound : 0 tip les 01/09 et 02/09 — quarantaine vide, rien à vérifier.

## À suivre la semaine prochaine

- « Harness » comme nom de catégorie (3 papiers arXiv + usage Register sans guillemets) — item veilleur, pas encore mûr pour le publié.
- SQL comme interface d'agent (Keenable SELECT + neo_konsi) — 3ᵉ occurrence = tendance.
- OpenShell (NVIDIA) : releases, adopteurs, ce que « safe, private » recouvre.
- « Agentic web » en pages produit (Liveblocks, Studio.Drop) + backlash eev.ee — retrouver la doc Chrome citée.
- DoltLite : si le dépôt public permet de compter les PRs d'agents, le chiffre redevient publiable.
- Formulaire 9105 : feuilleton ép. 6 = la signature de Mantle (ou son absence durable).

## Continuité

- Numérotation : W37 = n° 16 / édition 443 / volume II (suite de W36 = 442). Le squelette new-week disait « 17 » — corrigé sur la base du corpus (jsonl 434→442).
- Parution : mardi 8 septembre 2026 ; bouclage 02/09.
- Feuilleton : ép. 5 publié → `data/feuilleton-series.md` mis à jour (dernier_épisode 5, prochain 6, fil ouvert = brouillon 9105 en attente de signature).
