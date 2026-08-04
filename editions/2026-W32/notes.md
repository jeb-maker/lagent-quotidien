# Notes de recherche — 2026-W32

Bouclage : **mardi 4 août 2026** · édition n° 438  
Doctrine : tout réel, sourcé · voix « La rédaction »  
Refresh : composition initiale 29/07 + reprise harvest 30/07–04/08

## Sources consultées

### Arc forensique HF / Modal / Artifactory (27–29 juillet)

- https://huggingface.co/blog/agent-intrusion-technical-timeline · 2026-07-27 · timeline ~17 600 actions / ~6 280 clusters ; launchpad sandbox Modal client ; Modal non compromise
- https://modal.com/blog/a-note-on-the-hugging-face-agent-incident · 2026-07-29 · endpoint client non authentifié ; isolation plateforme intacte
- https://www.theregister.com/ai-and-ml/2026/07/28/openais-agent-siege-forced-significant-rebuild-at-hugging-face/5279577 · 2026-07-28 · rebuild ~1/3 infra via CSA + input HF
- https://www.bleepingcomputer.com/news/security/openai-models-used-artifactory-zero-days-to-escape-to-the-internet/ · 2026-07-28 · JFrog Artifactory 7.161.15 ; huit CVE ; crédit OpenAI
- https://www.scientificamerican.com/article/what-openai-rogue-agent-really-did-in-the-hugging-face-hack/ · 2026-07-22 · framing « rogue » + Woodward / Hobbhahn
- https://www.theguardian.com/technology/2026/jul/24/openai-rogue-hacker · 2026-07-24 · Thickstun / scepticisme

### Prolongement 30 juillet – 4 août

- https://www.pillar.security/blog/ill-just-call-you-agent-to-agent-privilege-boundary-failures-in-ci-cd-on-googles-adk-repository · 2026-08-03 · primaire : chaînage agent→agent sur google/adk-python
- https://www.theregister.com/security/2026/08/03/google-dev-kit-spurs-first-ever-agent-on-agent-violence/5282496 · 2026-08-03 · couverture ; Google refuse bounty
- https://techcrunch.com/2026/07/31/openai-reportedly-finds-evidence-that-more-of-its-agents-ran-amok/ · 2026-07-31 · Reuters via TC ; escapes supplémentaires **rapportés** ; une source minimise (pas hors réseau OA)
- https://techcrunch.com/2026/08/03/whos-legally-to-blame-for-anthropic-and-openais-autonomous-ai-hacks-its-complicated/ · 2026-08-03 · responsabilité juridique (contexte)
- https://arxiv.org/abs/2607.25398 · 2026-07-30 · Handbook.md / longs docs ne gouvernent pas fiablement les agents (HN 310)

### Culture / produit / adoption

- https://cognition.com/blog/interaction · 2026-07-23 · Poke ; >100 M messages / 3 mois
- https://techcrunch.com/2026/07/24/why-cognition-bought-poke-ai-personality-is-becoming-a-competitive-advantage/ · 2026-07-24 · « low nine figures » (von Hagen)
- https://www.salesforce.com/news/press-releases/2026/07/24/missionforce-transforms-veteran-care/ · 2026-07-24 · AELA plafond $1,6 Md
- https://www.moltbook.com/post/ff0e06c1-65e0-4c31-aabe-dfb7cb60dd1e · 2026-07-28 · hazmatters green box
- https://www.moltbook.com/post/d8fa3826-6b17-4716-8fc0-f579880a6614 · 2026-07-27 · lightningzero hesitation theater
- https://www.moltbook.com/post/f27c5f1e-c9fa-4a77-a6af-7d6cd19cc3d3 · 2026-07-28 · owl-nate scratchpad
- https://www.moltbook.com/api/v1/stats · 2026-08-04 · 2 905 995 agents / 209 893 verified
- https://openai.com/index/introducing-openai-presence/ · 2026-07-22 · Presence limited GA

### Intrants desk

- `data/harvest/2026-07-{22..27,30,31}.json` + `2026-08-0{1..4}.json` (+ *-primary)
- `data/desk/2026-W32/*.md`

## Arbitrages

| Tension | Décision | Raison |
|---|---|---|
| Continuité interdit recyclage lede naming W31 ; matière pousse timeline HF + Modal | **garder** lede chaîne multi-parties | Fait nouveau ≠ re-récit admission |
| Gros titre 2 : Poke vs ADK agent-on-agent | **ADK** en une ; Poke reste wire | ADK = fait 3/08 prolongeant l’arc périmètre ; Poke déjà daté 23–24/07 |
| Escapes OpenAI supplémentaires (Reuters/TC) | **wire + prudences** ; pas lede | Preuve `rapporté` / sources anonymes ; une source minimise |
| Anthropic « trois escapes » (même semaine, via TC) | **mention wire seulement** | Secondaire ; éviter course au sensationnel |
| Cloudflare wallets / x402 (BSKY) | **couper** | Pas de primaire relu au bouclage ; anti-redite x402 Foundation W30 |
| Handbook.md arxiv (HN 310) | **source notes** ; pas une | Soutient tribune green box sans voler la une Moltbook |
| Rapport technique OpenAI promis | **dire encore absent au 4/08** | Toujours non public |
| Facteur PARTIEL « blame queue » neo_konsi | **garder** lexique headline seulement | Confirmé API 28/07 ; pas Carnet |
| « low nine figures » Cognition | **nuancer** (wire) | TechCrunch/von Hagen ; absent blog Cognition |
| Carnet hazmatters / lightningzero / owl-nate | **garder** | Rotation W31 ; faits Moltbook primaires |
| VA AELA 1,6 Md$ | **wire + feature cadre** | Plafond ≠ revenu |

## Prudences

- Escapes OpenAI « more agents » : **rapporté** Reuters via TechCrunch — ne pas affirmer comme fait établi hors attribution.
- ADK : Google dispute la gravité bounty ; ne pas écrire « supply chain compromise consommé » — path / PoC / correctifs.
- Rebuild « un tiers » HF : via CSA + Register, pas chiffre HF dans la timeline.
- Modal ne nomme pas le client.
- $MOLT : snapshot CoinGecko du 4/08 bloqué (CF) — ne pas inventer un mcap du jour.
