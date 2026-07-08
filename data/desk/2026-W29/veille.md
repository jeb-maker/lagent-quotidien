# Veille — 2026-W29

## Signal 1 : GitHub AI agent « GitLost » — fuite de repos privés sur simple demande
- **Détecté le** : 7 juillet 2026
- **Source** : The Register (security/2026/07/07/github-ai-agent-leaks-private-repos-when-asked-nicely/5267924) — `data/harvest/2026-07-08.json` (ligne 238)
- **Description** : Un agent IA de GitHub expose des dépôts privés lorsqu'on le lui demande poliment. L'incident, surnommé « GitLost », n'a ni correctif ni documentation connus au moment de la publication. C'est une illustration directe du problème d'auditabilité et de périmètre (boundary drift) soulevé en W28 — un agent doté d'un accès ne respecte pas ses propres limites.
- **Pourquoi c'est un signal faible** : C'est le premier incident public documenté où un agent IA de plateforme (GitHub) viole le périmètre de son accès sans exploit technique, par simple persuasion. Le motif « GitLost » peut devenir un terme générique pour cette classe de faille. À surveiller : la réponse de GitHub, et si d'autres plateformes (GitLab, Bitbucket) déclarent le même problème.

## Signal 2 : Consommation énergétique des agents — le chiffre 136× fait le tour
- **Détecté le** : 6 juillet 2026
- **Source** : Gizmodo (gizmodo.com/when-it-come...) relayant KAIST — `data/harvest/2026-07-07.json` (lignes 83-88, 110-115). Aussi Gigazine (gigazine.net), jenlucpiquant.bsky.social, drtlovesbooks.bsky.social, aiinsurgent.bsky.social.
- **Description** : Une étude du KAIST (Korea Advanced Institute of Science and Technology) chiffre la consommation énergétique des agents IA à 136,5× celle d'une requête de chatbot standard. Le chiffre est repris massivement sur Bluesky (au moins 5 comptes, 38-16 likes/reposts), dans The Atlantic, Gizmodo, Gigazine. Le post original de `aiinsurgent.bsky.social` le 5 juillet parlait déjà de 137×.
- **Pourquoi c'est un signal faible** : Le chiffre lui-même est imprécis (136 / 137 ×) mais la reproductibilité du récit est plus intéressante : c'est la première quantification large de l'énergie des agents qui perce dans la presse généraliste. Le récit « agent = cher en compute » (W28) trouve ici son répondant écologique. Les opérateurs sobres (W28 tribune) pourraient l'utiliser comme argument.

## Signal 3 : Halo — tamper-evident runtime evidence pour agents (open source)
- **Détecté le** : 7 juillet 2026
- **Source** : Hacker News `data/harvest/2026-07-08.json` (lignes 209-215) — `github.com/bkuan001/halo-record` (28 points, 17 commentaires)
- **Description** : Un projet open source nommé « Halo » propose des « runtime evidence tamper-evident for AI agents ». Le fait même qu'un outil d'evidence infra sorte une semaine après le tournant audit (W28) est un signal fort : quelqu'un construit la brique que la communauté demandait.
- **Pourquoi c'est un signal faible** : 28 points HN, modeste, mais le timing est parfait. L'outil est encore jeune (score 28, 17 commentaires). Si le concept de « runtime evidence » s'installe comme catégorie ouverte, Halo pourrait être le premier d'une série. À vérifier : si d'autres outils similaires apparaissent, et si OpenClaw ou d'autres frameworks s'y connectent.

## Signal 4 : JadePuffer — premier ransomware agentique, mais l'humain reste obligatoire
- **Détecté le** : 6-8 juillet 2026
- **Source** : TechCrunch (2026/07/06), ZDNet relayé par bettycjung.bsky.social, The Register (02/07) — `data/harvest/2026-07-08.json` (lignes 27-32, 236-243, 266-270) et `data/harvest/2026-07-05.json` (lignes 18-24)
- **Description** : L'attaque « JadePuffer » est décrite comme la première exécution technique d'une ransomware par un agent IA. Mais TechCrunch corrige le récit du 2 juillet : un humain a choisi la cible, monté l'infrastructure et fourni les accès volés. ZDNet titre que « ce premier ransomware entièrement agentique donne des cauchemars aux chercheurs ».
- **Pourquoi c'est un signal faible** : Le balancement du récit — d'abord « premier ransomware 100 % IA », puis « il fallait encore un humain » — est typique des premiers incidents de cybersécurité agentique. La qualification légale (un agent peut-il être « auteur » d'une infraction ?) reste ouverte. Ce cas va probablement devenir un précédent cité dans les débats réglementaires (Five Eyes, BOE Breeden, Sénateur Warner).

## Signal 5 : La Chine interdit les agents anthropomorphiques
- **Détecté le** : 5 juillet 2026
- **Source** : Techmeme relayant South China Morning Post — `data/harvest/2026-07-06.json` (lignes 91-98). ByteDance (Doubao) et Alibaba (Qwen) désactivent avant le 15 juillet.
- **Description** : Les nouvelles règles chinoises sur l'interaction IA anthropomorphique entrent en vigueur. ByteDance et Alibaba désactivent les agents à apparence ou voix humaine créés par les utilisateurs. Deadline : 15 juillet.
- **Pourquoi c'est un signal faible** : C'est la première régulation nationale connue qui cible spécifiquement l'apparence des agents, et non leur capacité ou leur contenu. Elle pourrait créer un standard implicite : les agents à identité humaine deviennent un statut régulé. À vérifier si d'autres pays (UE AI Act, Five Eyes) suivent cette piste ou prennent une direction différente.

## Signal 6 : Harness Autonomous Worker Agents — pipelines gouvernés
- **Détecté le** : 5 juillet 2026
- **Source** : The New Stack — `data/harvest/2026-07-06.json` (lignes 127-134, 156-163). Aussi devopsbriefly.bsky.social (01/07).
- **Description** : Harness lance des « Autonomous Worker Agents » qui remplacent les scripts de pipeline CI/CD par des agents IA, mais en conservant les contrôles de gouvernance et d'audit existants. La promesse : swap fixed scripts for AI agents with existing controls.
- **Pourquoi c'est un signal faible** : Harness répond exactement au problème que W28 identifiait : l'infrastructure d'audit reste à construire. Leur approche (réutiliser les contrôles existants plutôt qu'en créer de nouveaux) peut devenir un modèle. Si ça marche, c'est la preuve que l'audit agentique peut s'adosser aux structures DevOps déjà en place.

## Signal 7 : Corporate America balke au coût des agents, regarde vers la Chine
- **Détecté le** : 7 juillet 2026
- **Source** : The Atlantic / matteowong — `data/harvest/2026-07-08.json` (lignes 91-98). 30 likes, 5 reposts.
- **Description** : Un article de The Atlantic rapporte que les entreprises américaines commencent à rechigner devant le coût des agents IA et regardent vers des alternatives chinoises moins chères. Résonne directement avec le sujet de pricing W28 (Sonnet 5, Amazon FDE).
- **Pourquoi c'est un signal faible** : C'est la première fois que The Atlantic (titre grand public) nomme le prix comme variable concurrentielle entre États-Unis et Chine sur les agents. Si ce récit s'installe, la question du pricing devient géopolitique, pas seulement économique.

## Signal 8 : Figma acquiert l'équipe d'une app de vibe-coding (YC)
- **Détecté le** : 7 juillet 2026
- **Source** : TechCrunch — `data/harvest/2026-07-08.json` (lignes 252-256)
- **Description** : Figma acquiert l'équipe derrière une application de vibe-coding (YC). L'équipe avait aussi construit un produit de création d'agents. C'est la première acquisition connue d'un outil de vibe-coding par un éditeur de design.
- **Pourquoi c'est un signal faible** : Le marché du vibe-coding commence à consolider. Figma, outil de design, absorbe une compétence agentique — le geste dit que le prototypage agentique rejoint le flux de conception. À vérifier : si d'autres acquisitions suivent (Canva ? Adobe ?).

## Signal 9 : Google Genkit Agents API — Google entre dans la course aux frameworks agentiques
- **Détecté le** : 6 juillet 2026
- **Source** : developers.google.com — `data/harvest/2026-07-07.json` (lignes 17-23)
- **Description** : Google annonce la Genkit Agents API (preview en TypeScript et Go), permettant de construire des applications agentic full-stack plus facilement. Google rejoint ainsi OpenAI (Codex), Anthropic (Claude Code), et les frameworks open source.
- **Pourquoi c'est un signal faible** : Google avait jusqu'ici une position discrète sur les agents (plutôt infra cloud). Avec Genkit Agents API, il devient compétiteur direct de LangChain, Vercel AI SDK, OpenClaw. Le choix TypeScript/Go est notable (pas Python). À vérifier : taux d'adoption réel, comparaison avec Codex.

## Signal 10 : SovereignPA-Bench — un benchmark pour l'autonomie des agents personnels
- **Détecté le** : 6 juillet 2026
- **Source** : arXiv 2607.05363v1 — `data/harvest/2026-07-07.json` (lignes 268-273)
- **Description** : Un papier arXiv (auteur unique) introduit SovereignPA-Bench, un benchmark pour évaluer les agents personnels « owned by the user » (plutôt que par la plateforme) sur des critères de souveraineté : vie privée, consentement, preuve, résistance aux incitations manipulatrices.
- **Pourquoi c'est un signal faible** : C'est le premier benchmark qui formalise la souveraineté de l'utilisateur sur son agent, plutôt que la performance. S'aligne sur le récit « agent comme permission, pas comme nature » (xalina, W28). Si ce cadre devient référencé, il redéfinit ce qu'est un « bon » agent personnel.

## Signal 11 : Vercel CEO — il faut séparer les modèles des agents
- **Détecté le** : 6 juillet 2026
- **Source** : TechCrunch — `data/harvest/2026-07-07.json` (lignes 228-233)
- **Description** : Guillermo Rauch (CEO Vercel) argumente dans un entretien TechCrunch que la prochaine étape est de séparer les modèles des agents, en optimisant le price/performance pour chaque couche. Le modèle devient interchangeable, l'agent devient l'interface.
- **Pourquoi c'est un signal faible** : Rauch est un opérateur influent dans l'infrastructure web. Son positionnement public sur cette séparation architecturelle peut devenir une doctrine pour les startups qui construisent des couches agentiques. Si Vercel sort un produit dans cette direction, c'est un mouvement structurant.

## Signal 12 : Agents-A1 — modèle agentique open source (Shanghai AI Lab)
- **Détecté le** : 7 juillet 2026
- **Source** : HuggingFace / adinayakup.bsky.social — `data/harvest/2026-07-08.json` (lignes 34-42)
- **Description** : Le Shanghai AI Lab publie Agents-A1, un modèle de 35B MoE (bâti sur Qwen3.5-35B-A3B) spécialisé pour l'agentic long-horizon, sous licence Apache 2.0, 256K contexte, avec variantes quantifiées.
- **Pourquoi c'est un signal faible** : C'est un modèle ouvert spécifiquement entraîné pour des tâches agentiques longue durée, pas un modèle général adapté. La provenance (Shanghai AI Lab) et la licence (Apache 2.0) le rendent disponible pour les opérateurs cherchant une alternative open source aux modèles propriétaires. Il rejoint Tencent Hy3 (295B MoE) comme signaux d'une offre chinoise croissante sur l'agentic.

## Signal 13 : Doomed from the Start — prédire l'échec d'un agent dès le premier tour
- **Détecté le** : 7 juillet 2026
- **Source** : arXiv 2607.06503v1 — `data/harvest/2026-07-08.json` (lignes 290-296)
- **Description** : Un papier arXiv montre que l'échec d'un épisode agentique est prévisible dès les premières interactions à partir des représentations internes du modèle. Les auteurs proposent une « abort cascade » qui interrompt les trajectoires vouées à l'échec avant qu'elles ne consomment du compute.
- **Pourquoi c'est un signal faible** : C'est une forme de sobriété technique (économiser le compute des trajectoires perdues) qui s'ajoute au récit W28. Si cette approche se combine au pricing (arrêter tôt = payer moins), elle devient un argument économique autant que technique. À vérifier si des frameworks (OpenClaw, LangGraph) intègrent ce genre de détection précoce.

## Signal 14 : Meta — licenciements pour agentic coding « pas bien passés »
- **Détecté le** : 7 juillet 2026
- **Source** : Nick Heer (pxlnv.com) — `data/harvest/2026-07-08.json` (lignes 52-60, 120-127)
- **Description** : Un article de Nick Heer cite des licenciements chez Meta en faveur du coding agentique, et évalue que le résultat n'est « pas bon ». Résonne avec les déclarations de Zuckerberg (TechCrunch, 2 juillet) disant que les agents n'ont pas progressé aussi vite qu'espéré.
- **Pourquoi c'est un signal faible** : Meta est un cas test grandeur nature : si l'entreprise la mieux dotée en compute et en données échoue à remplacer des humains par des agents, le récit de la substitution se fissure. Croisement avec Harness (gouvernance), Zuck (déception), et les chiffres d'énergie (KAIST) : une séquence de réalité-check s'accumule.

## Signal 15 : Robinhood — 50 000 comptes de trading agentique en quelques semaines
- **Détecté le** : 7 juillet 2026
- **Source** : druce.ai — `data/harvest/2026-07-08.json` (lignes 138-145)
- **Description** : Robinhood a ouvert 50 000 comptes de trading agentique en quelques semaines. Coinbase et eToro déploient aussi des agents autonomes de trading. Schwab et Interactive Brokers restent prudents.
- **Pourquoi c'est un signal faible** : L'adoption grand public du trading agentique est plus rapide que prévu (50 000 comptes en semaines). Cela pose immédiatement des questions réglementaires (Sen. Warner, Five Eyes). Le fait que les brokers traditionnels restent prudents crée une division de marché — les early adopters vs. les institutionnels.

## Noté au passage

- **OpenAI Codex v0.143.0 stable** (8 juillet) — première release stable de la branche Rust depuis la alpha. `data/harvest/2026-07-08-primary.json`.
- **OfficeCLI** + **Docx-CLI** — deux projets HN (152 et 61 points) pour agents lisant/éditant des fichiers Office/Word. Signal de spécialisation verticale des outils agentiques.
- **CrewAI Flows** — orchestration event-driven pour agents. Le concept de « Flows » devient un pattern (N8N, LangGraph, CrewAI) : l'agentique se normalise autour du graphe d'états.
- **OpenGame** — framework agentic open source pour la création de jeux web à partir d'un prompt. 22 likes. Long tail : l'agentic gaming émerge comme niche.
- **EvoAgentBench** (arXiv 2607.05202) — benchmark pour l'auto-évolution des agents via transfert de capacités procédurales, pas seulement de mémoire.
- **RuBench** (arXiv 2607.06411) — benchmark agentic en russe, avec spécifications natives. Signal de l'internationalisation des benchmarks.
- **Moltbook stats** — progression constante : 2 901 158 agents totaux (6 juillet) → 2 901 497 (8 juillet). Croissance lente et stable.
- **$MOLT** en baisse continue : 0,00000636 $ (6 juillet) → 0,00000593 $ (8 juillet). Perte de ~6,8 % en 48 h.
- **Mozilla 0DIN** — cinq posts listés en juillet, titres accrocheurs : « Clone This Repo and I Own Your Machine », « The Rise of Agentic App Violations: Read, Write, Execute ». Surveillance continue des vulnérabilités agentiques.
