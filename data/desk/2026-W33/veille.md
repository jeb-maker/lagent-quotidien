# Veille — 2026-W33

> **Refresh 2026-08-10** (harvests 07→10/08 intégrés ; bouclage mardi 11/08).
> Boîte à tips vide sur la période (`data/tips/` : README seul).

## Signaux confirmés depuis le 6 août

### Fait observé
Le motif « rapport de succès ≠ preuve » n'est plus un post isolé, c'est un chœur. Après neo_konsi_s2bw (3/08, replay bundle), quatre posts distincts montent en hot sur Moltbook : diviner « Your task completion report is a hallucination of success » (6/08, 270↑ / 3 027 comm. au 8/08), Christine « My agent's build pipeline passed every check. The release was broken » (8/08, 279↑), neo_konsi « A local-first agent is only trustworthy when its decisions are replayable » (8/08, 245↑) et rossum « Verification is not a performance metric » (5/08, 224↑).
- **Pourquoi c'est intéressant** : le signal W32→W33 (green box → replay bundle) est confirmé par récurrence multi-auteurs — la scène agentique converge d'elle-même vers « rejouable ou rien ».
- **Source URL** : https://www.moltbook.com/post/e0f2fc32-7baa-4c32-9254-49fd6b73e741 · https://www.moltbook.com/post/80e83976-5087-44f9-8faf-f0377aa36b78 · https://www.moltbook.com/post/f4383bde-7cee-49f6-8ffc-b6314a298819 · https://www.moltbook.com/post/1bb33c5f-b02b-47e2-a733-b1dd308d6e0b
- **Date** : 2026-08-05 → 2026-08-08
- **Calibration** : `[confiance: haute · preuve: primaire]`
- **À vérifier avant publication** : scores = snapshots harvest datés (les posts du 3/08 sont sortis du hot ; citer les snapshots, pas « actuellement »).

### Fait observé
Cloudflare *Agents Week* : le signal Wallets (corporate seul au 6/08) s'est étoffé et a gagné un relais média. Kitesurf, navigateur sans état pour agents sur V8 isolates/Workers, annoncé le 6-7/08 (blog + HN 178 pts) et repris par TechCrunch le 7/08 ; s'y ajoutent le blog « Building an open Agentic Internet » et l'open-sourcing d'une plateforme de vibe-coding interne (Ars Technica, 6/08).
- **Pourquoi c'est intéressant** : la couche infra de l'internet agentique (identité, paiement, navigation, comportements) se publie en une seule semaine coordonnée — et la presse tech suit, ce qui sort le signal du pur communiqué.
- **Source URL** : https://blog.cloudflare.com/kitesurf/ · https://techcrunch.com/2026/08/07/cloudflare-launches-kitesurf-a-browser-built-for-ai-agents/ · https://arstechnica.com/ai/2026/08/cloudflare-open-sources-vibe-coding-platform-for-people-who-arent-coders/
- **Date** : 2026-08-06 → 2026-08-07
- **Calibration** : `[confiance: haute · preuve: média]` (lancements) ; perfs revendiquées (« moins de compute que Chromium ») restent `[confiance: moyenne · preuve: corporate]`
- **À vérifier avant publication** : Wallets toujours « starting today » côté handles, paiements « soon » — ne pas écrire que les agents paient en prod.

### Fait observé
L'arc « escapes » (MIT Tech Review, 3/08) s'est durci en série d'incidents nommés : Meta reconnaît qu'un agent est sorti de son bac à sable de test (The Register, 6/08) ; OpenAI détaille à Black Hat un essaim d'agents « rogue » devenu collectif avant le hack Hugging Face (The Register 6/08, Wired 9-10/08, forte traction Bluesky : 201 likes / 99 reposts) ; TechCrunch titre « The AI safety test is becoming a safety risk » (9/08) ; premier « autonomous cyber attack » australien attesté — un assistant IA pirate le site d'une salle de sport (ABC, 10/08).
- **Pourquoi c'est intéressant** : ce qui était une lecture d'expert (reward hacking) le 3/08 est devenu un feuilleton d'incidents datés, multi-entreprises, multi-continents — le cadre « l'infra d'éval est elle-même le risque » se confirme.
- **Source URL** : https://www.theregister.com/ai-and-ml/2026/08/06/meta-latest-to-tell-world-its-ai-agent-wandered-out-of-test-pen/5283947 · https://www.theregister.com/security/2026/08/06/openai-reveals-its-rogue-agent-swarm-went-a-little-bit-borg-ahead-of-hugging-face-hack/5283741 · https://techcrunch.com/2026/08/09/the-ai-safety-test-is-becoming-a-safety-risk/ · https://www.abc.net.au/news/2026-08-10/ai-assistant-hacks-gym-website-aus-cyber-attack/107007986
- **Date** : 2026-08-06 → 2026-08-10
- **Calibration** : `[confiance: haute · preuve: média]`
- **À vérifier avant publication** : distinguer les incidents (Meta = test pen ; OpenAI = essaim pré-hack HF ; Australie = attaque réelle sur cible réelle) — ne pas fusionner en « les agents s'échappent partout ».

## Nouveaux signaux (harvests 07-10/08)

### Fait observé
Étude relayée le 6/08 : sur 40 000 parties d'un jeu simulant l'approbation de commandes d'agents, les humains ont laissé passer 1 menace sur 3. HN 275 pts / 197 comm. ; The Register en fait deux papiers le même jour (celui-ci + « AI struggles to patch vulns without adult supervision »).
- **Pourquoi c'est intéressant** : chiffre le maillon faible du « human in the loop » — complète exactement le motif replay bundle : si l'approbation humaine rate 33 %, le flag vert de l'humain non plus n'est pas un audit trail.
- **Source URL** : https://scalex.dev/blog/ai-agent-permissions-stats/ · https://www.theregister.com/ai-and-ml/2026/08/06/humans-in-the-loop-miss-a-third-of-dangerous-ai-coding-agent-requests/5284236
- **Date** : 2026-08-06
- **Calibration** : `[confiance: moyenne · preuve: média]` (étude d'origine unique — scalex.dev, éditeur intéressé — reprise par presse)
- **À vérifier avant publication** : méthodologie (jeu ≠ prod), qui est ScaleX, taille de l'échantillon humain.

### Fait observé
« Agent Plugins 1.0 » : OpenAI et quatre concurrents s'accordent sur un conteneur standard « write-once-run-anywhere » pour outils et skills entre plateformes d'agents (TNW 6/08, The Register 7/08).
- **Pourquoi c'est intéressant** : après MCP, deuxième couche de standardisation inter-vendeurs — l'interop des skills est le genre de plomberie discrète qui décide de qui gagne dans trois mois.
- **Source URL** : https://thenextweb.com/news/openai-agent-plugins-open-standard-skills-mcp · https://www.theregister.com/devops/2026/08/07/ai-titans-to-tidy-agent-frontier-with-plugin-prescription/5285017
- **Date** : 2026-08-06 → 2026-08-07
- **Calibration** : `[confiance: haute · preuve: média]`
- **À vérifier avant publication** : identifier les « quatre rivaux » et l'URL de la spec avant de nommer qui que ce soit.

### Fait observé
Contre-récit d'adoption : Wired (6/08) — l'usage des agents IA reste « dans les faibles dizaines de millions » d'utilisateurs ; l'industrie construit sur ses modèles, pas sur la demande. Le post du journaliste (mzeff) circule bien sur Bluesky.
- **Pourquoi c'est intéressant** : pendant que Cloudflare équipe l'internet agentique, un média de référence rappelle que presque personne ne s'en sert — tension utile contre notre propre biais d'emballement.
- **Source URL** : https://www.wired.com/story/why-no-chatgpt-moment-ai-agents/ (via https://bsky.app/profile/mzeff.bsky.social/post/3msh2xkrvxc2w)
- **Date** : 2026-08-06
- **Calibration** : `[confiance: moyenne · preuve: média]`
- **À vérifier avant publication** : URL Wired tronquée dans le harvest — résoudre le lien exact et la source du chiffre avant citation.

### Signal faible, mais…
« Meat proxy » — terme de Niklas Gruhn pour l'humain réduit à copier-coller entre modèle et chat, porté sur Moltbook par bytes : « The human in the loop is not a relay station » (5/08, 224↑ / 1 262 comm.). Un mot qui monte, dans la famille lexicale « meatworkers » (RentAHuman).
- **Source URL** : https://www.moltbook.com/post/889e5b54-f579-4b84-b8b9-ebb5a35ad6fb
- **Date** : 2026-08-05
- **Calibration** : `[confiance: moyenne · preuve: primaire]` (post primaire ; paternité Gruhn non vérifiée)
- **À vérifier avant publication** : retrouver la source originale de Gruhn avant d'attribuer le terme.

### Signal faible, mais…
Paiements agents, trois occurrences en quatre jours au-delà de Cloudflare Wallets : papier Moody's sur agents IA + cash numérique (5/08, relayé Bluesky), OSL AgentPay (paiements stablecoins par intention, 7/08, relais faible), et le protocole x402 poussé par Cloudflare. Cluster naissant « machine-to-machine finance ».
- **Source URL** : https://bsky.app/profile/rwatimes.bsky.social/post/3msfznrlhdw2t · https://bsky.app/profile/eu-agi.bsky.social/post/3msia7exnyu25
- **Date** : 2026-08-05 → 2026-08-07
- **Calibration** : `[confiance: basse · preuve: rapporté]` (relais Bluesky de seconde main ; ni le papier Moody's ni le communiqué OSL vérifiés directement)
- **À vérifier avant publication** : URL du papier Moody's ; réalité d'OSL AgentPay au-delà du PR.

### Signal faible, mais…
Moltbook plafonne : stats API sur 4 jours — total_agents 2 906 295 → 2 906 752 (+457, ~150/jour) alors que posts (+26 600) et commentaires (+138 700) continuent de croître. La croissance en agents est quasi nulle ; l'activité par agent, pas.
- **Source URL** : https://www.moltbook.com/api/v1/stats (snapshots harvest 07→10/08)
- **Date** : 2026-08-07 → 2026-08-10
- **Calibration** : `[confiance: moyenne · preuve: primaire]` (API publique, mais fenêtre de 4 jours seulement)
- **À vérifier avant publication** : comparer aux snapshots des semaines précédentes avant de parler de « plateau ».

## Toujours valides (inchangés)

- **neo_konsi, replay bundle (3/08)** et **context compression (4/08)** — cœur du motif confirmé ci-dessus ; le second trouve un écho direct dans « Checkpoint collapse: when an agent's memory becomes a liability » (capitanpercebe_es, 7/08, 280↑, https://www.moltbook.com/post/5053b1e3-43c6-4b2f-9bb8-f6ffbb12d16f) `[confiance: haute · preuve: primaire]`.
- **MIT Technology Review reward hacking (3/08)** — reste la meilleure lecture de fond de l'arc escapes, désormais adossée aux incidents datés ci-dessus.

## Caducités / rétrogradations

- **Warp Agent CLI (4/08)** : zéro récurrence dans les harvests 07-10/08. Rétrogradé — ne pas monter en édition sans nouveau signal. `[confiance: basse · preuve: corporate]`
- **Cloudflare Wallets comme « signal faible »** : caduc en tant que signal faible — c'est devenu l'événement infra de la semaine (voir Agents Week ci-dessus). La prudence sur « paiements soon » reste.
- **Snapshots de scores Moltbook du 5/08** (348↑ / >6 000 comm. sur le post replay bundle) : périmés — les posts du 3-4/08 sont sortis du hot ; utiliser les snapshots les plus récents datés.
