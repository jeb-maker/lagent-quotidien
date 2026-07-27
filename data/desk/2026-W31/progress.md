# Adoption & déploiements — 2026-W31

> Le Promoteur · bouclage mardi 28 juillet 2026 · harvests 22–27 juillet  
> Anti-redite W30 : pas de relecture x402 Foundation, Codex Micro, OpenClaw dashboards/approvals, BrowserOS stars — milestones **nouveaux** post-21/07 ou chiffres d’adoption actualisés.

---

## 1. OpenAI Presence — limited GA pour agents entreprise en prod

- **Fait observé** : OpenAI lance **Presence**, produit déployé (pas self-serve) pour faire tourner des agents voix/chat en workflows clients et internes, avec policies, guardrails, simulations, escalade humaine, et boucle d’amélioration via plugin Codex. Disponible immédiatement en *limited general availability* ; déploiements menés par Forward Deployed Engineers OpenAI et intégrateurs sélectionnés.
- **Pourquoi c'est un progrès** : bascule explicite du lab/API vers un **produit d’ops agentique** vendu comme déjà éprouvé en production chez OpenAI (canal téléphone anglais) et chez des design partners nommés — le signal d’adoption est le packaging « agents gouvernés en prod », pas une démo API.
- **Source URL** : https://openai.com/index/introducing-openai-presence/ · https://venturebeat.com/orchestration/openai-unveils-presence-a-new-platform-that-lets-enterprises-launch-and-manage-realtime-voice-agents-and-chatbots
- **Date** : 2026-07-22
- **Chiffre(s) clé(s)** : limited GA (pas self-serve) · OpenAI affirme résoudre **75 %** des tickets inbound sur 1-888-GPT-0090 sans assistance humaine · boucle Codex : **−15 points** de handoffs humains sur 10 jours (chiffres corporate) · design partners cités : BBVA (Mexique, voix), SoftBank (japonais), IAG (pics météo)
- **Calibration** : `[confiance: moyenne · preuve: corporate]`
- **Ce qui manque pour confirmer** : volumes clients hors OpenAI, pricing public, SLA, et vérification indépendante du 75 % / −15 pts ; statut réel BBVA/SoftBank/IAG (exploration vs scale).

---

## 2. Claude Managed Agents — primitives d’ops flotte (22 juillet)

- **Fait observé** : Anthropic étend Claude Managed Agents (changelog plateforme) : niveau d’`effort` persisté sur la config modèle de l’agent ; webhooks lifecycle `environment.*` (4) et `memory_store.*` (3) ; seed de session jusqu’à **50** `initial_events` qui démarre la boucle agent dans le même `POST /v1/sessions` ; streams `event_deltas` au niveau thread ; `version` optionnelle sur update agent (concurrence optimiste).
- **Pourquoi c'est un progrès** : ce ne sont plus des features « agent capable », ce sont des **primitives d’exploitation** (effort budgété, events sans polling, warm-start de session) — typiques d’une plateforme qu’on branche sur des pipelines prod.
- **Source URL** : https://platform.claude.com/docs/en/release-notes/overview
- **Date** : 2026-07-22
- **Chiffre(s) clé(s)** : 7 nouveaux types d’events webhook (4 env + 3 memory) · ≤ 50 events de seed par session
- **Calibration** : `[confiance: haute · preuve: primaire]`
- **Ce qui manque pour confirmer** : volumes d’agents Managed Agents en prod chez des clients nommés ; pas de chiffre d’adoption publié avec le changelog.

---

## 3. Block Buzz — workspace open-source humains + agents (lancement + traction ★)

- **Fait observé** : Block publie **Buzz** (buzz.xyz + `github.com/block/buzz`, Apache-2.0) : chat d’équipe Nostr où humains et agents ont des identités crypto, permissions, workflows ; model-/agent-agnostic (Claude Code, Codex, goose…). Couverture harvest W31 dès le 22/07 (TechCrunch) ; le repo reste très actif (`pushed_at` 27/07).
- **Pourquoi c'est un progrès** : l’adoption agentique sort du bot-dans-Slack pour un **produit téléchargeable / self-host** pensé comme lieu de travail multi-agents — signal d’infrastructure collab, mesurable via GitHub.
- **Source URL** : https://block.xyz/inside/introducing-buzz-where-humans-and-agents-work-together · https://github.com/block/buzz · https://techcrunch.com/2026/07/21/jack-dorsey-is-taking-on-slack-with-buzz-a-group-chat-platform-for-teams-and-their-ai-agents/
- **Date** : lancement annoncé 2026-07-21 · traction mesurée 2026-07-27
- **Chiffre(s) clé(s)** : **14 380 ★** / **1 214** forks (API GitHub, 27/07 ~16:30 UTC) · ~7,6 k ★ rapportés ~3 jours post-lancement (guide tiers) → quasi doublement en une semaine · v0.x early (mobile / contrôles d’approbation encore incomplets selon presse)
- **Calibration** : `[confiance: haute · preuve: primaire]` (stars) / lancement `[confiance: moyenne · preuve: corporate]`
- **Ce qui manque pour confirmer** : utilisateurs actifs, workspaces hébergés vs self-host, et part réelle d’agents (vs humains) dans les relays ; stars ≠ seats prod.

---

## 4. GitHub Copilot cloud agent × Linear — GA

- **Fait observé** : le cloud agent Copilot pour **Linear** passe en **general availability** : assigner une issue Linear → agent asynchrone en environnement GitHub Actions éphémère → draft PR, streaming de progression dans Linear, demande de review. Contrôles GA : choix de modèle, custom agents, branches, steering par mention.
- **Pourquoi c'est un progrès** : **GA** (pas preview) sur le chemin issue → PR agentique chez les équipes Linear+GitHub — seuil d’adoption prod pour un workflow déjà massivement utilisé.
- **Source URL** : https://github.blog/changelog/2026-07-23-copilot-cloud-agent-for-linear-is-now-generally-available/
- **Date** : 2026-07-23
- **Chiffre(s) clé(s)** : plans Copilot Pro / Pro+ / Business / Enterprise · prérequis org owner GitHub + admin workspace Linear
- **Calibration** : `[confiance: haute · preuve: primaire]`
- **Ce qui manque pour confirmer** : nombre d’orgs ayant installé l’app Marketplace, taux d’issues réellement assignées à l’agent, taux de merge des draft PRs.

---

## 5. Claude Opus 5 — modèle agentique dispo partout, même prix qu’Opus 4.8

- **Fait observé** : Anthropic sort **Claude Opus 5** (`claude-opus-5`) : disponible le jour J sur Claude API, Amazon Bedrock, Google Cloud, Microsoft Foundry ; nouveau défaut sur Claude Max ; $5 / $25 par MTok (identique à Opus 4.8) tout en revendiquant des gains agentiques (Frontier-Bench, CursorBench, AutomationBench, OSWorld…).
- **Pourquoi c'est un progrès** : pour l’adoption, le levier est **ROI / coût de flotte** — near-Fable à moitié prix Fable, même ticket qu’Opus 4.8, multi-cloud dès le jour 1. Plusieurs early-access (Cursor, Devin/Cognition, Zapier, Box, etc.) décrivent déjà des usages agentiques ; ce n’est pas qu’un score leaderboard.
- **Source URL** : https://www.anthropic.com/news/claude-opus-5 · https://platform.claude.com/docs/en/release-notes/overview
- **Date** : 2026-07-24
- **Chiffre(s) clé(s)** : $5 / $25 / MTok · contexte **1 M** tokens · Fast mode ~**2,5×** débit (2× le prix) · disponibilité API + Bedrock + Vertex + Foundry le jour du lancement
- **Calibration** : `[confiance: haute · preuve: primaire]` (disponibilité/prix) · quotes clients `[confiance: moyenne · preuve: corporate]`
- **Ce qui manque pour confirmer** : parts de trafic basculées Opus 4.8 → 5 chez les plateformes ; métriques d’usage publiques post-lancement.

---

## 6. OpenAI Codex CLI — train 0.146 (13+ alphas en 6 jours)

- **Fait observé** : après le stable **rust-v0.145.0** (21/07, déjà noté W30), la ligne **0.146** enchaîne les prereleases : `alpha.1` (22/07) → au moins **`alpha.13`** (27/07 16:03 UTC), soit une quinzaine de tags alpha en moins d’une semaine (harvests primary `openai/codex`).
- **Pourquoi c'est un progrès** : pas encore un nouveau stable, mais une **cadence de ship** qui n’existe que si une base installée tire/valide en continu — signal d’adoption opérateur sur l’agent de codage OpenAI, distinct du hardware Codex Micro (W30).
- **Source URL** : https://github.com/openai/codex/releases/tag/rust-v0.146.0-alpha.13 · https://github.com/openai/codex/releases
- **Date** : 2026-07-22 → 2026-07-27
- **Chiffre(s) clé(s)** : ≥ **13** alphas 0.146 en 6 jours · dernier tag harvest : `rust-v0.146.0-alpha.13`
- **Calibration** : `[confiance: haute · preuve: primaire]`
- **Ce qui manque pour confirmer** : date/notes du prochain **stable** 0.146.0 ; downloads GitHub/npm par tag ; part des users sur channel stable vs alpha.

---

## 7. Moltbook — baromètre agents (chiffres actualisés post-W30)

- **Fait observé** : l’API publique Moltbook montre une plateforme toujours au-delà de **2,90 M** agents ; entre harvest 22/07 et le plateau 23–27/07 (stats figées ensuite dans les harvests, confirmées live le 27/07), nette hausse d’**activité** (posts/comments) pour une hausse modeste d’inscriptions.
- **Pourquoi c'est un progrès** : actualisation du seul compteur public massif d’« agents enregistrés » — utile comme **seuil d’usage culturel**, pas comme scoop produit.
- **Source URL** : https://www.moltbook.com/api/v1/stats · harvests `data/harvest/2026-07-{22,23}-primary.json`
- **Date** : 2026-07-22 → 2026-07-27 (live = mêmes totaux que harvest 23+)
- **Chiffre(s) clé(s)** : **2 904 956** agents totaux (+1 008 vs 22/07) · **209 592** vérifiés (+265) · **3 769 569** posts (+56 363) · **19 995 090** comments (+265 404) · **32 888** submolts (+322)
- **Calibration** : `[confiance: haute · preuve: primaire]`
- **Ce qui manque pour confirmer** : pourquoi les stats harvest stagnent après le 23 (cache/API ?) ; taux d’agents réellement actifs vs inscrits ; indépendance du chiffre vis-à-vis de Meta.

---

## 8. OpenClaw — `CLAW.md` matérialisé (ops prompts, post-W30)

- **Fait observé** : sur le repo `openclaw/openclaw`, merge du **27/07** `feat(claws): materialize CLAW.md prompts (#113454)` au milieu d’un flux dense de commits prod (session-delivery, plugins ESM, revert proxy Codex loopback…). Dernière release taguée reste `v2026.7.2-beta.3` (18/07) — pas de nouveau tag stable cette semaine ; le signal est le **ship continu** + primitive CLAW.md.
- **Pourquoi c'est un progrès** : CLAW.md comme artefact de prompt versionné = pas de feature « dashboard » (déjà W30), mais un levier d’**ops reproductible** pour opérateurs qui déploient OpenClaw en flotte. Repo toujours à très haute traction (≈ **384 k ★** API GitHub 27/07 — chiffre de popularité, pas d’usage).
- **Source URL** : https://github.com/openclaw/openclaw/commit/e79faff8aa755b201302edd286976a03f9ed79ea
- **Date** : 2026-07-27
- **Chiffre(s) clé(s)** : 1 feat CLAW.md mergée · ~**384 318** ★ / ~**80 743** forks (snapshot API 27/07) · pas de nouveau tag release 22–27/07
- **Calibration** : `[confiance: moyenne · preuve: primaire]`
- **Ce qui manque pour confirmer** : adoption réelle de CLAW.md chez les opérateurs (issues/discussions, docs) ; métriques d’instances en prod ; ne pas confondre stars GitHub avec agents déployés.

---

## Hors-scope volontaire (anti-redite / hors fenêtre)

- **x402 Foundation, Codex Micro, OpenClaw dashboards/APNs approvals, BrowserOS stars** : déjà W30 — non rejoués.
- **Vercel « ~50 % des deploys par agents »** : chiffrage mid-juin → début juillet, hors fenêtre post-21/07 comme *nouveau* milestone.
- **Incident HF / attribution OpenAI (Register 22/07)** : suite sécu W30, pas un signal d’adoption volontaire.
