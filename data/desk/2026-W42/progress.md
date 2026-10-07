# Promoteur — 2026-W42

## 1. Agentability — mesure publique du web agentique

- **Fait observé** : Panneau de 113 sites scorés en continu ; épisode quotidien d'errands avec transcripts ; historique « 7 snapshots so far » (page 07/10).
- **Pourquoi c'est un progrès** : Adoption du *test public* comme format — pas une démo marketing.
- **Source URL** : https://agentability.org/
- **Date** : 2026-10-06 (épisode) / relevé 07/10
- **Chiffre(s) clé(s)** : 8/10 errands ; 113 sites ; 74/100 readiness moyen ; 53 % publient llms.txt (chiffres page)
- **Calibration** : `[confiance: moyenne · preuve: primaire]`
- **Ce qui manque** : Méthodologie tierce ; reproductibilité hors leur agent.

## 2. Registre MCP — saturation de la sonde

- **Fait observé** : Chaque jour 01–07/10, `updated_last_24h: 100` et `page_full: true` — la sonde harvest sature à 100.
- **Pourquoi** : Cadence toujours ≥ borne basse 100/24 h (déjà notée W41). Pas un total.
- **Source URL** : harvests `mcp_registry` + https://registry.modelcontextprotocol.io
- **Date** : 2026-10-01 → 07
- **Chiffre(s)** : 100 (plafond de page)
- **Calibration** : `[confiance: haute · preuve: primaire]`
- **Ce qui manque** : Pagination complète type W41 (953) non refaite cette semaine.

## 3. OpenClaw — première beta octobre

- **Fait observé** : `v2026.10.1-beta.1` publiée 05/10 ; stables récentes v2026.9.8 (03/10), v2026.8.35 (02/10).
- **Pourquoi** : Reprise de cadence après mode « extended-stable » noté en enquête W41.
- **Source URL** : https://github.com/openclaw/openclaw/releases/tag/v2026.10.1-beta.1
- **Date** : 2026-10-05
- **Chiffre(s)** : tag beta.1
- **Calibration** : `[confiance: haute · preuve: primaire]`
- **Ce qui manque** : Notes de release détaillées non relues en entier.

## 4. Cohere North 2 — ACL entreprise

- **Fait observé** : Register 05/10 — North 2 : skills, libraries, automations, memory ; ACL sur libraries/skills ; flow control tokens.
- **Pourquoi** : Signal d'adoption *enterprise harness* (accès, pas démo).
- **Source URL** : https://www.theregister.com/ai-and-ml/2026/10/05/cohere-offers-to-put-agents-in-lockdown-mode-with-strict-acls/5301219
- **Date** : 2026-10-05
- **Chiffre(s)** : — (annonce produit)
- **Calibration** : `[confiance: moyenne · preuve: média]` (corporate via presse)
- **Ce qui manque** : Clients nommés, volumes.

## 5. Codex (OpenAI) — cadence alpha

- **Fait observé** : harvest `agent_frameworks` : rust-v0.162.0-alpha.18 le 07/10 ; stable v0.160.1 le 05/10.
- **Pourquoi** : Contraste maintenance OpenClaw vs flux Codex (suite enquête W41).
- **Source URL** : https://github.com/openai/codex/releases
- **Date** : 2026-10-05 → 07
- **Calibration** : `[confiance: haute · preuve: primaire]`
- **Ce qui manque** : Pas pour une ; wire/takeaway si place.

## 6. Moltbook — croissance lente

- **Fait observé** : Agents 2 919 652 (01/10) → 2 920 920 (07/10) ; vérifiés 214 425 → 214 978 (+553 / 7 j).
- **Pourquoi** : Pas de vague ; écriture continue (posts +54 k).
- **Source URL** : https://www.moltbook.com/api/v1/stats
- **Date** : relevés daily
- **Calibration** : `[confiance: moyenne · preuve: primaire]` (auto-déclaré)
- **Ce qui manque** : Cause des plateaux — hors scope.

## 7. Standard commerce agents (Meta+)

- **Fait observé** : TechCrunch 06/10 — Meta, Walmart, Stripe, Sierra… travaillent un standard open agent-to-agent pour le commerce.
- **Pourquoi** : Milestone d'*intention* d'interop, pas encore déploiement.
- **Source URL** : https://techcrunch.com/2026/10/06/the-next-hurdle-for-ai-agents-getting-websites-to-let-them-in
- **Date** : 2026-10-06
- **Calibration** : `[confiance: moyenne · preuve: média]` / corporate
- **Ce qui manque** : Spec publique, date.

## Non-adoption

- MoltMatch : **désadoption / offline** (402 Vercel), pas milestone positif.
- Shopify Engineering feed : 404 persistant (harvest) — rien à tirer.
