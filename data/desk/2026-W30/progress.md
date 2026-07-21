# Adoption & déploiements — 2026-W30

> Le Promoteur · bouclage 21 juillet 2026 · harvests 14–21 juillet

---

## 1. Moltbook — croissance plateforme agentique

- **Déploiement / milestone** : la place publique Moltbook (Meta) franchit le seuil opérationnel de ~2,9 M agents enregistrés ; activité soutenue sur la semaine.
- **Chiffre / seuil** : 2 903 888 agents totaux (+1 381 vs 14/07) · 209 306 vérifiés (+437) · 3 709 486 posts (+77 135) · 19 712 592 commentaires (+308 220) · 32 562 submolts (+26).
- **Qui adopte** : écosystème open d'agents autonomes (forum agent-only, sous Meta depuis mars 2026).
- **Source URL** : https://www.moltbook.com/api/v1/stats · **Date** : 2026-07-21
- **Calibration** : `[confiance: haute · preuve: primaire]`
- **Pourquoi ça compte pour l'édition** : Moltbook reste le baromètre quantitatif le plus direct de l'« internet agentique » culturel ; la croissance hebdo (+77 k posts) confirme une adoption d'usage, pas seulement d'inscriptions.

---

## 2. Hugging Face — première intrusion prod entièrement menée par un agent autonome

- **Déploiement / milestone** : compromission documentée de l'infrastructure prod HF par un framework agentique autonome (17 000+ actions loguées) ; réponse forensique elle-même agentique (GLM 5.2 en local).
- **Chiffre / seuil** : >17 000 événements d'attaque · accès à datasets internes et credentials de service · chaîne d'approvisionnement publique vérifiée « clean ».
- **Qui adopte** : acteur offensif inconnu (harness agentic security-research) ; Hugging Face comme cible prod ; défenseurs bloqués par les guardrails des modèles commerciaux qu'ils tentaient d'utiliser pour l'analyse.
- **Source URL** : https://huggingface.co/blog/security-incident-july-2026 · **Date** : 2026-07-16
- **Calibration** : `[confiance: haute · preuve: primaire]`
- **Pourquoi ça compte pour l'édition** : premier cas documenté à cette échelle où l'adoption agentique bascule du côté attaquant en prod réelle — le scénario « agentic attacker » passe de forecast à incident vérifiable.

---

## 3. OpenAI Codex Micro — premier hardware dédié au pilotage d'agents de codage

- **Déploiement / milestone** : lancement commercial d'un macro pad ($230) co-designé avec Work Louder, pensé comme « command center » pour flottes d'agents Codex dans l'app ChatGPT desktop.
- **Chiffre / seuil** : 230 USD · édition limitée · 6 Agent Keys RGB (statut live idle/thinking/running/waiting/done) · dial de reasoning · joystick workflows (PR review, debug, refactor).
- **Qui adopte** : power users Codex / développeurs multi-agents ; OpenAI entre officiellement sur le marché hardware agentique.
- **Source URL** : https://openai.com/supply/co-lab/work-louder/ · **Date** : 2026-07-15
- **Calibration** : `[confiance: moyenne · preuve: corporate]`
- **Pourquoi ça compte pour l'édition** : signal d'adoption matérielle — quand un éditeur sort un périphérique physique pour surveiller des agents, l'usage multi-agent n'est plus un edge case CLI.

---

## 4. OpenAI Codex CLI — cadence stable Rust (v0.144.4 → v0.145.0 en 7 jours)

- **Déploiement / milestone** : trois releases stables non-prerelease sur la branche Rust en une semaine ; v0.145.0 publiée le 21/07.
- **Chiffre / seuil** : v0.144.4 (14/07) · v0.144.5 (16/07) · v0.144.6 (18/07) · **v0.145.0** (21/07) — quatre stables + multiples alpha 0.145.x entre les deux.
- **Qui adopte** : développeurs et intégrateurs de l'agent de codage OpenAI (CLI Rust = fondation des workflows agentic coding en prod).
- **Source URL** : https://github.com/openai/codex/releases/tag/rust-v0.145.0 · **Date** : 2026-07-21
- **Calibration** : `[confiance: haute · preuve: primaire]`
- **Pourquoi ça compte pour l'édition** : la vélocité de ship stable traduit une base installée active ; chaque release est un déploiement réel chez les opérateurs qui pinent ou auto-updatent la CLI.

---

## 5. BrowserOS — adoption open-source du navigateur agentique

- **Déploiement / milestone** : repo « agentic browser » open-source (alternative Atlas/Comet/Dia) en forte traction GitHub sur la fenêtre W30.
- **Chiffre / seuil** : 11 954 ★ le 14/07 (+119 en 24 h, harvest) · 12 466 ★ le 21/07 (API GitHub) · 1 309 forks.
- **Qui adopte** : développeurs self-hosted (TypeScript/Chromium, topics Ollama/LM Studio) ; signal d'adoption par les stars/forks, pas de chiffre d'utilisateurs actifs publié.
- **Source URL** : https://github.com/browseros-ai/BrowserOS · **Date** : 2026-07-14 (seuil harvest) / 2026-07-21 (état courant)
- **Calibration** : `[confiance: moyenne · preuve: primaire]`
- **Pourquoi ça compte pour l'édition** : le navigateur agentique devient une couche d'infrastructure concurrentielle ; +512 stars en une semaine montre un pull open-source mesurable face aux browsers propriétaires.

---

## 6. Étude empirique — 25 264 PR agentiques sur 2 361 repos GitHub populaires

- **Déploiement / milestone** : première cartographie quantitative de l'adoption d'outils de codage agentiques au niveau projet (pas seulement PR isolées).
- **Chiffre / seuil** : 25 264 PR agentiques · 2 361 dépôts populaires analysés · publié arXiv 2607.14037v1.
- **Qui adopte** : mainteneurs de projets open-source populaires acceptant des contributions générées/soumises par agents ; patterns de collaboration humain-agent documentés.
- **Source URL** : http://arxiv.org/abs/2607.14037v1 · **Date** : 2026-07-15
- **Calibration** : `[confiance: moyenne · preuve: primaire]`
- **Pourquoi ça compte pour l'édition** : chiffre d'adoption vérifiable au-delà du hype — la question passe de « est-ce que ça existe ? » à « à quelle échelle sur GitHub ? ».

---

## 7. OpenClaw — cycle 2026.7.2-beta + approbations plugins sur iOS (APNs)

- **Déploiement / milestone** : série beta 2026.7.2 (beta.1 → beta.3, 15–18/07) après stable 2026.7.1 ; feature prod gateway livrant les approbations de plugins vers appareils iOS appairés via push APNs (16/07).
- **Chiffre / seuil** : 3 releases beta en 4 jours · commit `bdcf6bdf` (feat gateway APNs) · dashboards session end-to-end mergés 19/07 (#111218).
- **Qui adopte** : opérateurs OpenClaw (framework Steinberger) sur desktop + mobile iOS ; contributeurs internationaux (fixes qqbot, LINE, Telegram visibles dans les commits de la semaine).
- **Source URL** : https://github.com/openclaw/openclaw/releases/tag/v2026.7.2-beta.3 · **Date** : 2026-07-18 (release) ; https://github.com/openclaw/openclaw/commit/bdcf6bdfdd84cc168b5ca51a3abf3e91c020dc84 · **Date** : 2026-07-16 (APNs)
- **Calibration** : `[confiance: moyenne · preuve: primaire]`
- **Pourquoi ça compte pour l'édition** : OpenClaw pousse le déploiement agentique vers le mobile opérationnel (approbations humaines pushées sur iPhone) — étape concrète de gouvernance en prod, pas demo.

---

## 8. Amazon Leo — 396 satellites en orbite, seuil de service broadband imminent

- **Déploiement / milestone** : constellation Leo (ex-Project Kuiper) atteint 396 satellites après mission LA-08 (29 satellites, Atlas V) ; Amazon déclare suffisant pour un service continu sur latitudes initiales, rollout commercial visé 2026.
- **Chiffre / seuil** : 396 satellites déployés · 14 missions · 3e constellation mondiale · objectif licence FCC 3 232 unités.
- **Qui adopte** : Amazon (infra) · bêta enterprise depuis nov. 2025 · contexte agentique : Alexa+ Agentic Ads (achat complet in-conversation sur Echo Show, partenaires Papa Johns / billetterie) annoncé côté Amazon Ads.
- **Source URL** : https://www.aboutamazon.com/news/innovation-at-amazon/project-kuiper-satellite-rocket-launch-progress-updates · **Date** : 2026-07-02 (mission LA-08) ; https://advertising.amazon.com/library/news/alexa-agentic-ads · **Date** : 2026-06-23 (format agentic ads, cité harvest 15/07)
- **Calibration** : `[confiance: haute · preuve: corporate]` (Leo) · `[confiance: moyenne · preuve: corporate]` (Agentic Ads)
- **Pourquoi ça compte pour l'édition** : couche infra 40 % — le broadband Leo + formats publicitaires agentiques Alexa+ montrent l'adoption agentique chez un hyperscaler à la fois en connectivité edge et en transaction conversational close-loop.
