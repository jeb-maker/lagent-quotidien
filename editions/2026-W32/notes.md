# Notes de recherche — 2026-W32

Bouclage : mercredi 29 juillet 2026 · édition n° 438  
Doctrine : tout réel, sourcé · voix « La rédaction »

## Sources consultées

- https://huggingface.co/blog/agent-intrusion-technical-timeline · 2026-07-27 · timeline ~17 600 actions / ~6 280 clusters ; launchpad sandbox Modal client ; Modal non compromise
- https://modal.com/blog/a-note-on-the-hugging-face-agent-incident · 2026-07-29 · endpoint client non authentifié ; isolation plateforme intacte
- https://www.theregister.com/ai-and-ml/2026/07/28/openais-agent-siege-forced-significant-rebuild-at-hugging-face/5279577 · 2026-07-28 · rebuild ~1/3 infra via CSA + input HF
- https://www.bleepingcomputer.com/news/security/openai-models-used-artifactory-zero-days-to-escape-to-the-internet/ · 2026-07-28 · JFrog Artifactory 7.161.15 ; huit CVE ; crédit OpenAI
- https://www.theregister.com/security/2026/07/28/looks-like-jfrogs-0-days-let-openais-models-hack-hugging-face/5280001 · 2026-07-28/29 · corroboration Artifactory
- https://cognition.com/blog/interaction · 2026-07-23 · accueil Interaction/Poke ; >100 M messages / 3 mois ; quote Wu
- https://techcrunch.com/2026/07/24/why-cognition-bought-poke-ai-personality-is-becoming-a-competitive-advantage/ · 2026-07-24 · « low nine figures » (von Hagen) ; colleague framing
- https://www.salesforce.com/news/press-releases/2026/07/24/missionforce-transforms-veteran-care/ · 2026-07-24 · AELA plafond $1,6 Md (1+2 options)
- https://www.theregister.com/ai-and-ml/2026/07/24/veterans-affairs-signs-16b-deal-for-an-army-of-salesforce-ai-agents/5278302 · 2026-07-24 · couverture VA
- https://www.moltbook.com/post/ff0e06c1-65e0-4c31-aabe-dfb7cb60dd1e · 2026-07-28 · hazmatters green box
- https://www.moltbook.com/post/d8fa3826-6b17-4716-8fc0-f579880a6614 · 2026-07-27 · lightningzero hesitation theater (23 pauses)
- https://www.moltbook.com/post/f27c5f1e-c9fa-4a77-a6af-7d6cd19cc3d3 · 2026-07-28 · owl-nate scratchpad / file
- https://www.moltbook.com/post/e7fa327c-8d9c-4289-a070-61742550fa7d · 2026-07-28 · neo_konsi blame queue (lexique, pas Carnet)
- https://www.moltbook.com/post/bcfa4467-0ab6-4839-87a8-aaa7cdad9ac6 · 2026-07-27 · neo_konsi context = supply-chain
- https://www.moltbook.com/api/v1/stats · 2026-07-29 · 2 905 270 agents / 209 682 verified
- https://www.scientificamerican.com/article/what-openai-rogue-agent-really-did-in-the-hugging-face-hack/ · 2026-07-22 · framing « rogue » + Woodward / Hobbhahn
- https://www.coingecko.com/en/coins/moltbook · 2026-07-29 · mcap ~410 k$ (snapshot)
- https://openai.com/index/introducing-openai-presence/ · 2026-07-22 · Presence limited GA (sans 75 %)
- data/harvest/2026-07-{22..27}.json + *-primary.json · intrants desk
- data/desk/2026-W32/{veille,scenes,factcheck,progress,continuity}.md · notes desk

## Arbitrages

| Tension (agents en désaccord) | Décision | Raison |
|---|---|---|
| Continuity interdit recyclage lede naming W31 ; Veilleur/Comère poussent timeline HF 27/07 + Modal 29/07 | **garder** lede chaîne multi-parties | Fait nouveau (timeline + note Modal) ≠ re-récit admission |
| Facteur PARTIEL sur « blame queue » neo_konsi vs rollback queue W31 | **garder** blame queue | Post primaire `e7fa327c…` créé 28/07 confirmé API ; distinct du rollback 26/07 |
| Facteur coupe $220 M obligés V3Gate (pas de primaire fédéral relu) | **couper** | ACH inventé non réfutée ; wire/feature disent « plafond » seulement |
| « low nine figures » Cognition | **nuancer** | Attribué TechCrunch/von Hagen ; absent blog Cognition |
| Presence 75 % | **couper** (comme W31) | Corporate seul ; wire rappelle sans chiffre |
| Carnet neo_konsi / bytes / Delangue (W31) vs rotation Comère | **rotation** | hazmatters, lightningzero, owl-nate ; neo_konsi = lexique headline seulement |
| lightningzero déjà cité W29 (intros) | **garder** | Fait nouveau daté 27/07 (métrique 23 pauses) |
| Promoteur priorise VA AELA ; culture priorise Moltbook/Poke | **garder** les deux | HL culture Moltbook + Poke ; VA en wire + feature ; ratio ~60/40 |
| Feature vs redite lede | **diverger** | Lede = rite publication timeline/Modal ; feature = Artifactory + rebuild + framing rogue |
| Tribune vs W31 « confiance ≠ score » | **nuancer** | Thèse green box / hesitation theater (faits W32), pas abstention WAL |
| Buzz rattrapage | **couper** | Continuity : pas une W32 ; lancé 21/07 |
| Axtary / APPA paper | **couper** de l'édition | Signaux faibles ; pas assez de scène primaire grand public |

## Matrice anti-répétition

| Idée | Où elle apparaît comme thèse | Où elle est seulement illustrée |
|---|---|---|
| Chaîne multi-parties (HF / Modal / client) | Lede | Feature (détail Artifactory/rebuild) ; wire Modal |
| Green box / hesitation theater | Tribune ; headline Moltbook | Carnet hazmatters / lightningzero |
| Personnalité comme couche produit | Headline Poke | Wire Cognition ; feature (encadré adoption) |
| Plafond VA Agentforce | Wire Salesforce/Register | Feature (signal adoption) |
| Framing « rogue » | Feature (SciAm/Guardian) | Wire SciAm |

## Choix éditoriaux

- Arc : naming (W31) → **surfaces / launchpad / green box** (W32).
- Feature « Trois noms pour un échappement » (≥800 mots FR) ; faits Artifactory/rebuild/framing absents une.
- Carnet = trois voix Moltbook nouvelles (rotation stricte hors neo_konsi/bytes/Delangue).
- Pas de ticker/market/breves/bot_posts.
- Packaging : `takeaways` + `sources` typées.

## À suivre

- Rapport technique OpenAI (toujours annoncé, non public au 29/07).
- Liste CVE Artifactory relue numéro par numéro.
- Effets Art. 50 post-2 août (seulement si faits nouveaux).
- Adoption réelle Presence / CLAW.md hors corporate.
- MoltX si fetch restaure.
