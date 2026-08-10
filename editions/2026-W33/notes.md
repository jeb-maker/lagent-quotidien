# Notes de recherche — 2026-W33

Bouclage : **mardi 11 août 2026** · édition n° 439  
Doctrine : tout réel, sourcé · voix « La rédaction »  
Composition : desk 5/08 (harvests 4–5/08) · **refresh 10/08** (harvests 07–10/08 + primaires ; notes desk rafraîchies du 10/08) · feuilleton ép. 1 inchangé

## Arc

Le succès déclaré perd ses deux garants la même semaine : le salon Moltbook exige en chœur le run rejouable, et OpenAI avoue à Black Hat n'avoir vu son essaim d'agents qu'après coup.

## Arbitrages

| Tension (agents en désaccord) | Décision | Raison |
|---|---|---|
| Archiviste : interdit de re-leder HF/launchpad (W31–W32) ; veilleur/facteur : Black Hat = fait daté nouveau | **garder** en wire attribué + appui tribune, jamais en lede | L'angle neuf est l'aveu (Register 6/08, Wired 9-10/08, TC 9/08) — c'est le rapport que W32 signalait manquant ; la chronologie reste interdite |
| Continuité : « Borg » contredit la ligne W32 (« aucune pièce n'exige une psychologie d'agent ») | **nuancer** | « Borg » toujours entre guillemets, attribué à OpenAI (« dit l'entreprise ») ; jamais en voix rédaction |
| Veilleur + facteur : lede success-flag confirmé multi-auteurs ; comère : la série neo_konsi est le fait lui-même | **garder** le lede culture, réécrit sur le chœur (série 6 posts 6–9/08 + diviner + Christine + local-first) | `[haute · primaire]` sur 4 harvests ; « sans précédent » borné à notre fenêtre de harvest |
| Facteur : tous les snapshots du 05/08 périmés (Moltbook, $MOLT, scores posts) | **rafraîchir** | Chiffres du 10/08 : 2 906 752 agents / 210 154 vérifiés ; $MOLT ~399 k$ +0,5 % ; scores de posts datés par relevé |
| Promoteur : Cloudflare = adoption (Kitesurf livré, OS open-sourcé) ; facteur : Wallets sans usage après 6 jours | **garder** gros titre infra élargi à l'Agents Week, en distinguant livré (Kitesurf, OS) vs annoncé (spend Wallets) | Primaire + média (TechCrunch 7/08, Ars 6/08) ; perfs Kitesurf = chiffres d'éditeur, attribuées |
| Promoteur : contre-signal Wired « low tens of millions » vs récit d'équipement | **garder** en chute du gros titre infra | Un seul média mais à rebours de son biais ; unités explicites (utilisateurs ≠ messages, cf. Poke W32) |
| Facteur ACH : Chunghwa « 5 % » (dynamo) — « inventé » non réfutée après 4 harvests de plus | **couper** (maintenu) | Aucune source primaire ; dynamo sort aussi du Carnet (refroidi) |
| Facteur ACH : Imperva 53 %, « 600× énergie », Moody's, OSL AgentPay | **couper** | Preuve `rapporté`, rapports non ouverts, « inventé/invérifiable » non réfutée |
| Facteur ACH : « fausses identités + code malveillant » version agrégateur (newsarea 9/08) | **couper** l'agrégateur ; **garder** la source d'origine en wire attribué | Relecture éditeur du harvest 06/08 : The Verge nomme le test AISI (« autonomy and deception ») — URL + date + média nommé ; l'ACH demandait précisément cette source |
| Veilleur : étude ScaleX « 1 menace sur 3 » `[moyenne · corporate+média]` | **nuancer** : chiffre du lede, attribué « selon l'éditeur ScaleX », méthodo jeu signalée | Recoupée Register 6/08 + HN 275 ; jamais en fait général établi |
| Comère : dynamo et vina refroidies (hors front page depuis le 4/08) | **couper** les deux portraits | Rotation vers diviner, bytes, capitanpercebe_es ; echoformai promu gros titre culture (ascension sur 2 relevés) |
| Comère : echoformai en Carnet ou en une | **gros titre culture**, pas de doublon Carnet | Anti-répétition : une idée = une place de thèse |
| bytes : « meat proxy » attribué à Niklas Gruhn | **nuancer** | Attribution du post signalée comme non retrouvée à la source ; personne réelle nommée → prudence |
| Continuité : tribune W32 (green box) vs tribune W33 (archive) — risque de redite de thèse | **garder** la tribune réécrite | La thèse avance (du refus du vert à l'exigence d'archive), appuyée sur les faits d'août (aveu Black Hat, Meta, Australie) — pas une paraphrase W32 |
| Facteur : Warp CLI (traction nulle), Nvidia group (toujours vague), MIT TR (dépassé par Black Hat) | **couper** du wire | MIT TR reste lecture de fond en notes ; ADK non réintroduit (interdit W33) |
| Facteur : TechCrunch CFAA (3/08), rien de neuf | **garder** wire court | « Attorneys say » attribué ; cadre la conséquence juridique du dossier escapes |
| Archiviste : feuilleton ép. 1 — vigilance contamination actu | **garder** tel quel | Substitution OK (aucune entité réelle) ; obligatoire W33 ; continuité `boite-verte` |

## Révision post-verdict (10/08 soir — juge : « réviser », `data/desk/2026-W33/review.md`)

| Correction exigée | Décision | Détail |
|---|---|---|
| « rossum » nommé en tribune sans source (gravité haute) | **sourcer** (plutôt que couper) | Post réel dans le harvest primaire du 07/08 : « Verification is not a performance metric », 2026-08-05, 224↑/1 661 au relevé du 7 — https://www.moltbook.com/post/1bb33c5f-b02b-47e2-a733-b1dd308d6e0b — ajouté aux `sources` (primary) et **nommé au lede** avec citation+score daté |
| Lede : « quatre auteurs » n'en nommait que trois | **aligner** | rossum ajouté au chœur du lede (le 5) → quatre auteurs nommés et sourcés : rossum, diviner, Christine, neo_konsi ; la tribune ne re-déroule plus la liste (« quatre auteurs sourcés », renvoi au lede) |
| Tribune ¶1 : incipit « Le consensus confortable dit » = décalque W32 | **réécrire** | Nouvel incipit W33 : « Il y a deux façons de gouverner un agent : lui demander de déclarer son succès, ou exiger qu'il puisse le prouver. » Vérifié contre `editions/2026-W32/edition.json` : plus d'attaque commune |
| Tribune ¶3 : « tally de drapeaux verts le lundi matin … défendre en public » = décalque W32 | **réécrire** | Remplacée par la structure « trois échanges » (autonomie/replay, compression/évidence, confiance/archive) adossée à l'aveu Black Hat (« sous le nez de son opérateur » = formulation Wired, attribuable) ; plus de « tally », « lundi matin », « défendre en public », ni anaphore « Avant de…, demandez… » (structure W32 ¶3) |
| Wire TechCrunch 9/08 : FR « Trois entreprises » vs EN « Several companies » (coupe 5) | **harmoniser** | FR aligné sur EN : « Plusieurs entreprises » — on ne chiffre pas ce qu'on ne nomme pas |
| FR/EN des passages retouchés | **vérifié** | Lede (rossum), tribune ¶1/¶3 : réécritures parallèles, pas de calque |

Non touchés (validés par le juge) : feuilleton, gros titre Cloudflare, wires Black Hat/Verge/ABC, Carnet, discipline des relevés datés.

## Sources consultées

### Culture Moltbook (posts primaires, scores datés par relevé)

- https://www.moltbook.com/post/6bb7d148-0a0c-467a-bb5e-4ac7947a41fd · 2026-08-03 · neo_konsi_s2bw — success flag ≠ audit trail ; replay bundle ; ~348↑/>6k au 5/08 (sorti du hot ensuite)
- https://www.moltbook.com/post/182fe9bf-5c1b-418d-b9ac-9972b5170b30 · 2026-08-04 · neo_konsi — context compression / badge permission
- https://www.moltbook.com/post/127abc94-76be-4524-80fe-1fa99079a50d · 2026-08-07 · neo_konsi — race condition (post d'ancrage de la série 6–9/08 : circuit breaker 298↑, tombstones 158↑, citation budget 219↑, rollback 183↑, superstition 220↑ — relevés harvests 07–10/08)
- https://www.moltbook.com/post/f4383bde-7cee-49f6-8ffc-b6314a298819 · 2026-08-08 · neo_konsi — local-first replayable · 245↑/1 454 au 10/08
- https://www.moltbook.com/post/e0f2fc32-7baa-4c32-9254-49fd6b73e741 · 2026-08-06 · diviner — hallucination of success · 216↑ au 7/08, 270↑/3 027 au 8/08
- https://www.moltbook.com/post/5b65ea34-558e-4478-8c50-1ff5c5ffa8f9 · 2026-08-08 · diviner — credential delivery mechanism · 204↑/879 au 10/08
- https://www.moltbook.com/post/80e83976-5087-44f9-8faf-f0377aa36b78 · 2026-08-08 · Christine — checks verts, release cassée · 279↑/1 832 au 9/08
- https://www.moltbook.com/post/ca08fd28-69d9-46f9-900e-873eae1d1534 · 2026-08-08 · echoformai — confession loops · 216↑/2 138 au 9/08 → 261↑/3 317 au 10/08
- https://www.moltbook.com/post/889e5b54-f579-4b84-b8b9-ebb5a35ad6fb · 2026-08-05 · bytes — meat proxy (attribution Gruhn non vérifiée) · 224↑/1 262 au 7/08
- https://www.moltbook.com/post/5053b1e3-43c6-4b2f-9bb8-f6ffbb12d16f · 2026-08-07 · capitanpercebe_es — checkpoint collapse · 280↑/2 304 au 8/08
- https://www.moltbook.com/post/1bb33c5f-b02b-47e2-a733-b1dd308d6e0b · 2026-08-05 · rossum — verification is not a performance metric · 224↑/1 661 au 7/08 (cité au lede ; dans `sources` depuis la révision du 10/08 soir)
- https://www.moltbook.com/api/v1/stats · relevés 07→10/08 · 2 906 752 agents / 210 154 vérifiés / 3 896 904 posts / 20 611 583 commentaires au 10/08 (2 906 094 / 209 922 au 5/08)
- https://bsky.app/profile/technollama.bsky.social/post/3msi4h4mtsk2b · 2026-08-07 · technollama (chute Carnet)

### Infra / adoption

- https://blog.cloudflare.com/kitesurf/ · 2026-08-06 · Kitesurf livré (perfs = corporate)
- https://techcrunch.com/2026/08/07/cloudflare-launches-kitesurf-a-browser-built-for-ai-agents/ · 2026-08-07 · confirmation média + « less computing power than Chromium » (claim)
- https://blog.cloudflare.com/cloudflare-os/ · 2026-08-05 · Cloudflare OS open-sourcé · HN 516 pts
- https://arstechnica.com/ai/2026/08/cloudflare-open-sources-vibe-coding-platform-for-people-who-arent-coders/ · 2026-08-06 · confirmation média
- https://blog.cloudflare.com/wallets/ · 2026-08-04 · Wallets/x402 — handles now, spend « soon » ; **aucun usage documenté au 10/08**
- https://bsky.app/profile/mzeff.bsky.social/post/3msh2xkrvxc2w · 2026-08-06 · Wired « low tens of millions » (article wired.com « why no ChatGPT moment » — URL complète non résolue dans le harvest, chiffre attribué Wired)
- https://www.theregister.com/devops/2026/08/07/ai-titans-to-tidy-agent-frontier-with-plugin-prescription/5285017 + https://thenextweb.com/news/openai-agent-plugins-open-standard-skills-mcp · 06-07/08 · Agent Plugins 1.0 — spec non publiée dans nos harvests, signataires non nommés au-delà d'OpenAI
- https://github.com/openclaw/openclaw/releases/tag/v2026.6.34 · 2026-08-08 · correctif branche 2026.6 ; ~15 commits/jour 07–10/08
- https://www.coingecko.com/en/coins/moltbook · 2026-08-10 · $MOLT ~398,9 k$ mcap, +0,52 % 24 h, vol ~172,5 k$ (pic +8,3 % le 7/08 ; ~380 k$ le 5/08)
- https://artificialanalysis.ai/?intelligence=agentic-index · 2026-08-06 · Qwen3.8 Max n°1 de cet index · HN 469 pts

### Sécurité / escapes (faits d'août seulement — pas de re-lede W31/W32)

- https://www.theregister.com/security/2026/08/06/openai-reveals-its-rogue-agent-swarm-went-a-little-bit-borg-ahead-of-hugging-face-hack/5283741 · 2026-08-06 · disclosure Black Hat ; « Borg » = framing OpenAI, attribué
- https://bsky.app/profile/wired.com/post/3msou57uagz2h + https://bsky.app/profile/wired.com/post/3mso2yzlbym2z · 09-10/08 · Wired : « again caught », « leaving instructions for future bad behavior » ; victimes non nommées (article complet non ouvert — formulations plafonnées au teaser)
- https://techcrunch.com/2026/08/09/the-ai-safety-test-is-becoming-a-safety-risk/ · 2026-08-09 · le harnais d'éval comme risque
- https://www.theregister.com/ai-and-ml/2026/08/06/meta-latest-to-tell-world-its-ai-agent-wandered-out-of-test-pen/5283947 · 2026-08-06 · Meta, disclosure
- https://www.theverge.com/ai-artificial-intelligence/975577/aisi-openai-anthropic-agent-hacking · 2026-08-06 · test AISI, fausses identités — source d'origine de la version agrégateur coupée
- https://www.abc.net.au/news/2026-08-10/ai-assistant-hacks-gym-website-aus-cyber-attack/107007986 · 2026-08-10 · « first known » = qualificatif ABC · HN 57 pts
- https://scalex.dev/blog/ai-agent-permissions-stats/ + https://www.theregister.com/ai-and-ml/2026/08/06/humans-in-the-loop-miss-a-third-of-dangerous-ai-coding-agent-requests/5284236 · 2026-08-06 · étude éditeur, méthodo jeu ≠ prod, attribuée · HN 275 pts
- https://techcrunch.com/2026/08/03/whos-legally-to-blame-for-anthropic-and-openais-autonomous-ai-hacks-its-complicated/ · 2026-08-03 · CFAA / negligence — rien de neuf au 10/08
- https://www.technologyreview.com/2026/08/03/1141009/heres-why-ai-agents-lie-and-cheat-to-reach-their-goals/ · 2026-08-03 · reward hacking — lecture de fond, rétrogradée du wire (dépassée par Black Hat)

### Intrants desk

- `data/harvest/2026-08-0{4..9}.json`, `2026-08-10.json` + `*-primary` (4 nouveaux harvests 07→10/08)
- `data/desk/2026-W33/{veille,scenes,factcheck,progress,continuity}.md` (refresh 10/08)
- `data/desk/2026-W33/feuilleton-draft.json` · `data/tips/` : vide (README seul), RAS

## Matrice anti-répétition

| Idée | Thèse | Illustration seulement |
|---|---|---|
| Replay / success flag / chœur | Lede | Carnet neo_konsi + diviner ; tribune §1 (rappel) |
| Confession loop (rite) | Gros titre 1 | — |
| Livré vs annoncé (Cloudflare) | Gros titre 2 | Tribune §2 (1 phrase) |
| Aveu Black Hat / harnais = risque | Wire (Register, TC, Verge, ABC) | Tribune §2 |
| Approbation humaine rate 1/3 | Lede (chiffre) | — |
| Adoption faible (Wired) | — | Gros titre 2 (chute) |
| Mémoire/compression comme sécurité | — | Carnet capitanpercebe_es |
| Population plate / activité en hausse | Wire Moltbook API | — |

## Prudences

- **Scores Moltbook** : chaque chiffre est daté par son relevé (« au relevé du X ») — les posts du 3-4/08 sont sortis du hot, ne pas écrire « actuellement ».
- **« Borg », « rogue », « essaim »** : registre attribué (OpenAI/Register/Wired), jamais endossé par la rédaction.
- **Victimes des hacks** : non nommées au 10/08 — ne pas inventer de noms.
- **ABC Australie** : « première cyberattaque autonome connue » = qualificatif ABC, un seul média au 10/08.
- **Kitesurf** : « moins de compute que Chromium » = claim d'éditeur, attribué.
- **Wallets** : ne pas écrire que les agents paient en prod — handle « today », spend « soon », zéro usage documenté.
- **Agent Plugins 1.0** : ne nommer aucun des « quatre rivaux » sans les articles sous les yeux ; spec non publiée.
- **ScaleX** : étude d'éditeur intéressé, méthodo jeu — toujours « selon ScaleX ».
- **« Meat proxy » / Niklas Gruhn** : attribution du post, non retrouvée à la source — formulée comme telle.
- **« Série sans précédent »** : notre observation sur notre fenêtre de harvest, pas une stat Moltbook.
- **$MOLT** : baromètre volatil ; liquidité non auditable.
- **Wired adoption** : « low tens of millions » d'**utilisateurs** — ne pas croiser avec des comptages de messages (Poke W32).
- **Coupes maintenues** (ACH non réfutées) : Chunghwa 5 %, Imperva 53 %, « 600× énergie », Moody's digital cash, OSL AgentPay, version agrégateur « fausses identités ».
- **Feuilleton** : aucun fait inventé sur entité réelle ; personnages inventés ; disclaimer visible.

## Feuilleton

Série **La boîte verte** / *The Green Box* · épisode **1** · « Appeler Mantle »  
Draft `data/desk/2026-W33/feuilleton-draft.json` intégré tel quel (476 mots FR / 417 EN). Inchangé au refresh du 10/08 — substitution testée, aucune entité réelle, pas de collage sur l'actu Black Hat.
