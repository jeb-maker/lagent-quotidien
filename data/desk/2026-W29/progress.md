# Adoption & déploiements — 2026-W29

## 1. Robinhood Agentic Trading — 50 000 comptes ouverts
- **Type** : seuil / lancement produit
- **Chiffre clé** : 50 000 comptes agentic trading ouverts en quelques semaines
- **Source** : data/harvest/2026-07-08.json (bluesky, bruce.ai) ; page officielle confirmée robinhood.com/us/en/agentic-trading/
- **Pourquoi c'est significatif** : Première mise en production à grande échelle d'un courtier américain permettant à des agents AI tiers (connectés via MCP) de passer des ordres réels. Coinbase et eToro suivent la même direction. Le choix du protocole MCP comme couche d'intégration plutôt qu'une API propriétaire est un signal fort d'标准化 industrielle.

## 2. OpenAI Codex v0.143.0 — première release stable de la refonte Rust
- **Type** : seuil
- **Chiffre clé** : v0.143.0 (stable) publiée le 8 juillet, après 6 alpha en 7 jours (alpha.34 → alpha.39)
- **Source** : data/harvest/2026-07-08-primary.json (agent_frameworks, openai/codex)
- **Pourquoi c'est significatif** : La branche Rust de Codex CLI atteint la stabilité après une séquence intensive de correctifs et d'ajouts (support proxy Windows, recherche MCP, refactoring sécurité). C'est la fondation technique sur laquelle reposent tous les agents de codage OpenAI en production.

## 3. Figma acquiert Bud/Orchids — consolidation vibe-coding + agents
- **Type** : acquisition / consolidation
- **Chiffre clé** : Bud (ex-Orchids) fermé le 18 juillet 2026 ; équipe Y Combinator rachetée
- **Source** : TechCrunch, 7 juillet 2026 (techcrunch.com/2026/07/07/figma-acquires-team-behind-a-vibe-coding-app/)
- **Pourquoi c'est significatif** : Figma internalise une plateforme de vibe-coding et de création d'agents, signe que les outils de prototypage par prompt deviennent stratégiques pour le design collaboratif. La fermeture des produits existants au profit d'une intégration Figma indique une adoption enterprise en vue.

## 4. Harness Autonomous Worker Agents — agents CI/CD en production
- **Type** : lancement produit enterprise
- **Chiffre clé** : remplacement des pipelines scriptés par des agents AI déployant, testant et scannant sous les contrôles existants
- **Source** : data/harvest/2026-07-06.json (bluesky, thenewstack.io) ; thenewstack.io
- **Pourquoi c'est significatif** : Harness, acteur majeur du CI/CD, industrialise le remplacement de pipelines legacy par des agents. C'est un cas de déploiement réel dans des chaînes de production DevOps existantes, pas un prototype.

## 5. Forterra — 100+ véhicules autonomes américains déployés en Ukraine
- **Type** : déploiement réel
- **Chiffre clé** : 100+ self-driving ATV déployés en zones de conflit
- **Source** : data/harvest/2026-07-08.json (rss, TechCrunch)
- **Pourquoi c'est significatif** : Premier déploiement massif de véhicules terrestres autonomes américains en opérations réelles. L'autonomie agentique quitte le laboratoire pour le champ de bataille, avec des implications immédiates sur la doctrine militaire et le débat réglementaire.

## 6. Google Genkit Agents API — preview publique
- **Type** : lancement preview
- **Chiffre clé** : API Agents disponible en preview (TypeScript et Go)
- **Source** : data/harvest/2026-07-07.json (bluesky, developers.google.com)
- **Pourquoi c'est significatif** : Google ajoute une couche agents à son framework Genkit, standardisant la construction d'applications agentic full-stack. La sortie simultanée en TS et Go cible les équipes d'infrastructure, pas seulement les prototypers.

## 7. Moltbook — cap des 2,9 millions d'agents
- **Type** : seuil de plateforme
- **Chiffre clé** : 2 901 497 agents totaux (+339 sur 3 jours) ; 208 541 vérifiés (+106)
- **Source** : data/harvest/2026-07-06-primary.json, 07-07-primary.json, 07-08-primary.json (raw_public, Moltbook stats)
- **Pourquoi c'est significatif** : Croissance régulière de la plus grande place publique agentique. Le ratio vérifiés/totaux (7,2 %) stagne, suggérant que la barrière à la vérification limite toujours l'adoption, mais le volume quotidien de posts (8 850/jour) et commentaires (87 000/jour) montre une activité soutenue.

## 8. OfficeCLI + Docx-CLI — outils agents pour documents Office
- **Type** : intégration / outillage
- **Chiffre clé** : OfficeCLI (152 points HN) ; Docx-CLI (61 points HN) — moitié du temps et des tokens
- **Source** : data/harvest/2026-07-07.json (hackernews) ; data/harvest/2026-07-08.json (hackernews)
- **Pourquoi c'est significatif** : Deux outils open-source complémentaires qui donnent aux agents la capacité de lire et modifier des fichiers Word/Office en ligne de commande. L'apparition simultanée de ces outils répond à un besoin réel : les agents doivent interagir avec les formats bureau legacy qui dominent encore l'enterprise.

## 9. CrewAI Flows — tracing production event-driven
- **Type** : mise à jour framework
- **Chiffre clé** : ajout du contrôle event-driven et du tracing production aux Crews autonomes
- **Source** : data/harvest/2026-07-08.json (bluesky, aistorynews)
- **Pourquoi c'est significatif** : CrewAI, framework majeur d'orchestration multi-agents, ajoute des primitives de production (event-driven flows, tracing) qui manquaient pour une adoption enterprise sérieuse. C'est le passage du prototype au déploiement supervisé.

## 10. JadePuffer — premier ransomware agentique documenté (avec correctif humain)
- **Type** : déploiement réel (offensif)
- **Chiffre clé** : exécution technique par un agent AI, mais humain encore nécessaire pour le ciblage et l'infrastructure
- **Source** : data/harvest/2026-07-06.json (rss, TechCrunch) ; data/harvest/2026-07-08.json (bluesky, ZDNet)
- **Pourquoi c'est significatif** : Premier cas documenté d'exécution technique d'une ransomwre par agent AI. Même avec un opérateur humain, la capacité agentique à exécuter la chaîne d'attaque abaisse le seuil technique. Signal d'adoption dans le cybercrime, avec des implications défensives immédiates.
