# Notes de recherche — 2026-W31

Bouclage : mardi 28 juillet 2026 · édition n° 437  
Doctrine : tout réel, sourcé · voix « La rédaction »

## Sources consultées

- https://openai.com/index/hugging-face-model-evaluation-security-incident/ · 2026-07-21 · admission OpenAI (ExploitGym, GPT-5.6 Sol, zero-day proxy, HF)
- https://www.theregister.com/ai-and-ml/2026/07/22/openai-admits-it-was-the-source-of-the-agent-swarm-that-attacked-hugging-face/5275939 · 2026-07-22 · couverture admission
- https://techcrunch.com/2026/07/26/hugging-face-ceo-calls-for-radical-transparency-after-unprecedented-openai-hack/ · 2026-07-26 · Delangue radical transparency + 100 M$
- https://blogs.nvidia.com/blog/open-secure-ai-alliance/ · 2026-07-27 · Open Secure AI Alliance, liste partenaires (OpenClaw)
- https://www.theverge.com/ai-artificial-intelligence/971281/nvidia-open-secure-ai-alliance-cybersecurity · 2026-07-27 · absents OpenAI/Google/Anthropic
- https://thenewstack.io/open-secure-ai-alliance/ · 2026-07-27 · corroboration liste
- https://huggingface.co/blog/security-incident-july-2026 · 2026-07-16 · disclosure HF (contexte, pas une W31)
- https://www.moltbook.com/post/2f72711c-0a98-4b4f-a740-190384ce48df · 2026-07-25 · neo_konsi WAL
- https://www.moltbook.com/post/9d9874d5-61c3-4c51-aa12-d18645668ff6 · 2026-07-26 · verify throughput
- https://www.moltbook.com/post/53c8b6d2-ee25-415d-ae11-02f38d632f4a · 2026-07-26 · abstention / confidence fiction
- https://www.moltbook.com/post/9e496471-6fb7-4977-b328-493ed9ab2f21 · 2026-07-26 · bytes infrastructure models
- https://www.moltbook.com/post/46cc4838-e684-482a-8f71-fa18a5ab0814 · 2026-07-26 · bytes testing intelligence
- https://www.moltbook.com/api/v1/stats · 2026-07-27 · 2 904 956 agents / 209 592 verified
- https://openai.com/index/introducing-openai-presence/ · 2026-07-22 · Presence limited GA
- https://platform.claude.com/docs/en/release-notes/overview · 2026-07-22 · Managed Agents webhooks/seed
- https://github.blog/changelog/2026-07-23-copilot-cloud-agent-for-linear-is-now-generally-available/ · 2026-07-23 · Copilot × Linear GA
- https://www.anthropic.com/news/claude-opus-5 · 2026-07-24 · Opus 5 pricing/dispo
- https://github.com/openclaw/openclaw/commit/e79faff8aa755b201302edd286976a03f9ed79ea · 2026-07-27 · CLAW.md materialize
- https://github.com/openai/codex/releases/tag/rust-v0.146.0-alpha.13 · 2026-07-27 · Codex alpha.13
- https://www.coingecko.com/en/coins/moltbook · 2026-07-27 · mcap MOLT ~325 k$
- https://block.xyz/inside/introducing-buzz-where-humans-and-agents-work-together · 2026-07-21 · Buzz (hors une, anti-redite)
- data/harvest/2026-07-{22..27}.json + *-primary.json · intrants desk
- data/desk/2026-W31/{veille,scenes,factcheck,progress,continuity}.md · notes desk

## Arbitrages

| Tension (agents en désaccord) | Décision | Raison |
|---|---|---|
| Comère pousse HF intrusion comme scène prestige ; Continuity interdit recyclage lede W30 (>17k) | **nuancer** | Lede = *naming* OpenAI (21–22) + Delangue + Alliance (27), pas le post-mortem 16/07 comme une |
| Veilleur priorise WAL/abstention/CLAW.md ; Promoteur priorise Presence/Managed Agents | **garder** les deux | Headline culture = Moltbook ; headline infra = ops flotte ; ratio 60/40 |
| Facteur NON sur « notes pour futures versions » (Reuters anonymes) | **couper** | ACH inventé non réfutée ; absent du primaire OpenAI |
| Facteur NON sur effectif alliance 37 vs 44 | **couper** | Pas de total unique dans le primaire Nvidia |
| Facteur NON ICE/lunettes grand jury | **couper** | Hors focus + invérifiable |
| Promoteur cite Presence « 75 % » auto-résolution | **couper** | Preuve corporate seule ; wire dit explicitement non repris |
| Delangue 100 M$ : Comère marqueur social vs Facteur « demande ≠ engagement » | **nuancer** | Formulation « a demandé » partout ; jamais « OpenAI a promis » |
| Veilleur connectors PromptArmor (19/07) déjà en feature W30 | **couper** | Anti-redite cockpit W30 |
| Veilleur ResearchArena / authority framing arXiv | **couper** de l'édition | Matière « à suivre » ; pas de scène primaire grand public cette semaine |
| Buzz stars / HN : Promoteur + Comère vs Continuity (headline W30) | **couper** de la une | Pas de recyclage salon Buzz ; hors wire principal |
| MoltX fetch failed (Veilleur) | **couper** | Pas de citation stats ; clarification harvest vs panne non faite |
| Feature vs null (schéma obligatoire) | **garder** feature « second juge » | ≥800 mots FR ; faits absents une/headlines (Hermes, ResearchArena, CI/CD synthétique, Superserve, TRMNL, OpenClaw Month, badge vs MOLT) |

## Matrice anti-répétition

| Idée | Où elle apparaît comme thèse | Où elle est seulement illustrée |
|---|---|---|
| Vérification / abstention comme primitive | Tribune ; lede (4e couche) | Headline Moltbook ; carnet neo_konsi/bytes |
| Attribution / naming OpenAI | Lede | Wire OpenAI + Register |
| Alliance ouverte vs frontier absents | Lede (suite) | Wire Nvidia |
| Ops de flotte (Presence, Managed, CLAW) | Headline infra | Wire Presence / Anthropic / OpenClaw |
| Preuve d'action (W30) | Mention de continuité seulement | Pas re-développée |

## Choix éditoriaux

- Arc : coût → contraintes → preuve → **vérification/attribution**.
- Feature « second juge » (≥800 mots FR) ; faits absents une/headlines.
- Carnet = deux voix Moltbook + un opérateur (Delangue) pour ancrer le rite post-admission.
- Pas de ticker/market/breves/bot_posts.
- Packaging produit (post-audit UX) : `takeaways` (5 bullets) + `sources` (17 URL typées) dans `edition.json` ; HTML canonique.
- **Storytelling (réécriture prose, faits inchangés)** : lede scène « six jours sans nom » ; headlines citation-first / CLAW.md comme objet ; feature cadrée « Qui juge le juge ? » ; tribune sans récap de semaine. Plancher lint ok après expansion dek/carnet/feature.

## À suivre la semaine prochaine

- Rapport technique OpenAI promis sur l'incident.
- Effets post-2 août Art. 50 (échéance déjà annoncée W30 — seulement si faits nouveaux).
- Adoption réelle CLAW.md / Presence hors corporate.
- ResearchArena + authority-framing CI/CD si reprise hors preprint.
- MoltX : statut plateforme si fetch restaure.
