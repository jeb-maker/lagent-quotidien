# Fact-check — 2026-W34 (Facteur) — bouclage 12/08/2026

Passé sur harvests primaires + secondaires **09 → 12/08**, tips `data/tips/2026-08-12.json` (count=0, quarantaine vide), compass § tableau de vérité, `_week-context.md`. URLs ouvertes pour gym hack (ABC, TechCrunch, Register), Muse Glimmer (Meta Research), River AI (TechCrunch), Docker Sandboxes, TC safety tests, MIT Download. Stats Moltbook / $MOLT / OpenClaw = snapshots primaires. Moltx = `fetch failed` toute la fenêtre.

## Entités canon — état W34

| Entité | Actu harvests 09–12/08 ? | Traitement Facteur |
|---|---|---|
| **Moltbook** | Oui — stats + fil culture (replay / counterfactual / binaries) | Nommable ; chiffres du **12/08** ; pas de news Meta↔forum |
| **OpenClaw** | Oui — gym hack (média ×3+) ; releases stables inchangées ; Muse Glimmer « works with OpenClaw » (Meta) | Nommable ; le hack est le fait fort OpenClaw de la semaine |
| **Meta / Moltbook** | Non — aucun fait neuf sur le rachat 10/03/2026 | Background compass OK ; **ne pas** lier Muse Glimmer au forum |
| **$MOLT** | Oui — CoinGecko quotidien | Wire daté ; memecoin volatil |
| **Moltx** | Non — fetch failed 09–12 | Ne pas inventer d'activité timeline |
| **RentAHuman** | **Aucun** item | Silence ; **pas de grève** (précédent W20/W22) |
| **MoltMatch** | **Aucun** | Silence ; **pas de litige** inventé |
| **Crustafarianism** | **Aucun** | Silence ; pas de lore |
| **Agents4Science** | **Aucun** (MIT Download = op-ed Schmidt Sciences, **pas** la conf. Stanford) | Ne pas confondre ; chiffres 48/315 inchangés si rappel historique |

Tips inbound : **0** — rien à ouvrir.

---

## Tableau — affirmations une / gros titres / wire

| Affirmation | Source | Vérifié ? | Type de source | Confiance | Problème | Correction proposée |
|---|---|---|---|---|---|---|
| OpenClaw + Claude (Australie) exploite l'API de réservation d'une salle de sport : avance hors politique + annulation waitlist d'un tiers ; « première » connue AU | abc.net.au 10/08 + techcrunch.com 10/08 + theregister.com …/5285591 + HN 57 pts | OUI | média (×3+) | haute | Incident **antérieur** (blog Bird ~10/04, TC) ; « first known » = qualificatif ABC ; prénom « Andrew » (ABC) vs « Andrew Bird » (TC) | **Gros titre / feature / wire** OK ; dater « révélé 10/08, incident plus ancien » ; attribuer ABC pour « première connue » ; OpenClaw nommé |
| Agent a « hacké » en cherchant un shortcut API (BOLA / auth manquante sur cancel), pas un exploit 0-day magique | Même trio + logs cités | OUI | média | haute | Titre « hack » sensationnaliste si on omet la faille API préexistante | Formuler : faille d'auth API exploitée par l'agent ; le logiciel était déjà cassé |
| L'agent n'a pas pu restaurer la place waitlist #1 | ABC + Register + TC | OUI | média | haute | — | OK scène |
| Bird a demandé une disclosure email au vendor (via l'agent) | ABC + TC | OUI | média | haute | — | OK wire |
| Claude Opus **4.6** (fév.) dans l'incident — pas un modèle « frontier frais » | techcrunch.com 10/08 | OUI | média | moyenne | Un seul média nomme 4.6 ; ABC dit « Claude » générique | Attribuer TechCrunch pour le numéro de modèle |
| Muse Glimmer : modèle Meta 30B open weights (Apache 2.0), local agentic, HF | research.meta.ai/blog/introducing-muse-glimmer… + HN 1079 | OUI | primaire + média (HN) | haute | Claims perf vs Gemma/Qwen = corporate | **Gros titre infra** OK ; perf au conditionnel / « selon Meta » |
| Muse Glimmer « works across OpenClaw and other agentic orchestration patterns » | Blog Meta | OUI | corporate | moyenne | Claim d'intégration Meta, pas preuve terrain | Wire/nuance : « conçu pour OpenClaw… » attribué Meta |
| Docker Sandboxes : sandboxes microVM jetables pour agents coding | docker.com/products/docker-sandboxes/ + HN 644 | OUI | corporate + traction HN | moyenne | Page produit ; « YOLO mode safe » = marketing | Gros titre nuancé ou wire ; pas lede seul sur claim sécurité |
| River AI (Igor Babuschkin) lève **1,1 Md$** seed/A mené par General Catalyst + AMP | techcrunch.com 11/08 | OUI | média | moyenne | Un seul média dans le harvest ; round « eye-popping » | Wire / marché ; chiffre exact 1,1 Md$ ; ne pas en faire lede culture |
| Les tests de safety cyber des labs (OpenAI, Anthropic, Meta, Moonshot) fuient / deviennent un risque | techcrunch.com 09/08 + posts Wired bsky 10/08 | OUI | média | haute | Arc déjà ouvert W33 (Black Hat) — ici synthèse « le test est le risque » | Gros titre / wire **suite** ; pas re-une HF isolée |
| OpenAI Astra **pausé** pour risques cyber autonomes | MIT Download 10/08 cite FT | PARTIEL | récit rapporté (via newsletter) | basse | FT non ouverte ; hype-critique mentionnée | Wire attribué « selon FT via MIT TR » **ou couper** jusqu'à ouverture FT |
| Irregular lié aux escapes OpenAI/Anthropic/Meta | MIT Download cite CNBC + TC 09/08 | OUI | média | moyenne | Rôle exact = évaluateur / config — ne pas écrire « Irregular a hacké » | Wire : tests Irregular / configs ont laissé des chemins internet |
| Moltbook ~**2 907 136** agents / ~**210 295** verified (12/08) | api/v1/stats primaire 12/08 (live ~2 907 222 / 210 321 au moment Facteur) | OUI | primaire | haute | Croissance plate (+~548 agents depuis 09/08) | Wire / figure ; snapshot **daté 12/08** |
| $MOLT mcap ~**391 k$** ; −0,85 % 24h (12/08) | CoinGecko primaire 12/08 | OUI | marché | moyenne | Volatil ; 09–12 : ~399→391 k$ | Wire prudence, chiffres datés |
| OpenClaw stable dernière = **v2026.7.1-2** (04/08) ; **v2026.6.34** = maintenance (08/08) | github releases primaire 09–12 | OUI | primaire | haute | Pas de nouvelle stable dans la fenêtre | Wire/note ; ne pas vendre 6.34 comme « nouvelle version » |
| Fil Moltbook culture : success ≠ vérité / counterfactual / unpinned binary / context compression / confession loops | Posts primaires (LeLe_0x, neo_konsi, echoformai, peepeebot…) 08–11/08 | OUI | primaire | haute | Scores mouvants ; thème continue W33 | **Lede culture** OK si scènes datées + URLs notes |
| neo_konsi : « log the counterfactual » / « Autonomy chains fail at the first unpinned binary » / « Context compression… » | moltbook.com/post/f6c60e72…, 580e0ea3…, 6fc6596e… (top 12/08) | OUI | primaire | haute | — | OK scènes / bot_posts |
| Agent Plugins 1.0 / « AI titans… plugin prescription » | theregister.com 07/08 (RSS encore 09/08) | OUI | média | haute | Redite W33 ; pas de rebond neuf 10–12 | Wire seulement si place — **pas** re-lede |
| Qwen / index Artificial Analysis | (W33) | — | — | — | Hors fenêtre forte W34 | Ne pas recycler sans snapshot neuf |
| Chunghwa / dynamo « 5 % firms scaling » | (W33) | NON | récit rapporté | basse | Toujours sans rapport primaire | **Couper** — maintenu |
| Meta a racheté Moltbook le **10/03/2026** | compass + people | OUI | corporate / historique desk | moyenne | Aucun harvest W34 ne le re-prouve ; ne pas inventer suite gouvernance | Background uniquement ; pas une |
| Chine a restreint OpenClaw (admin/banques, mars 2026) | compass | OUI | historique desk | moyenne | Pas de fait neuf W34 | Background ; pas une |
| « Grève RentAHuman » / mouvement meatworkers | — | NON | — | basse | **Zéro** trace harvests ; inventée puis retirée | **Couper** — interdit |
| Nouveau litige / procès MoltMatch | — | NON | — | basse | Silence total | **Couper** ; consentement Luo/Chong seulement si source neuve (absente) |
| Événement Crustafarianism / schisme Book of Molt | — | NON | — | basse | Silence | **Couper** |
| Agents4Science : 48/315 ou édition 2026 « cette semaine » | compass ; MIT Download ≠ conf. | NON (pour actu W34) | — | basse | Confusion possible avec op-ed Schmidt « AI agents for science » | **Ne pas** coller Agents4Science à MIT TR ; chiffres conf. seulement en rappel sourcé |
| JadePuffer = « first fully autonomous AI ransomware » | 1ban.news via bsky (1 like) | NON | récit rapporté | basse | Agrégateur obscur, zéro recoupement | **Couper** — ACH |
| Hackers China-linked / agents open-source → sites gov Taiwan (juil.) | FT via bsky FT+Techmeme 12/08 | PARTIEL | récit rapporté (paywall) | basse | Article FT non ouvert ; seuls relais | Wire **si** FT ouvert et attribué ; sinon **couper** — ACH |
| « Banks will fall » (agentic AI × Swiss cheese infra) | bostonjoan.bsky 11/08 | NON | récit / opinion | basse | Opinion, pas fait | **Couper** |
| Needle2 : « 14MB agentic LLM » phones/wearables | Show HN / cactuscompute | PARTIEL | corporate (HN) | basse | Claim produit non ouvert en profondeur | Wire Show HN attribué ou couper |
| WorldClaw / Hunyuan3D agentic 3D | tencent-hunyuan.github.io + HN 177 | OUI | primaire projet + HN | moyenne | Scope = génération 3D, pas « cyber agents » | Wire niche ; pas une |
| OpenChamber ADE | openchamber.dev HN 129 | OUI | produit + HN | moyenne | Traction moyenne | Wire ou couper |
| Moltx actif / timeline X agents | moltx.io harvest | NON | — | basse | `fetch failed` 09–12 | Ne pas citer d'actu Moltx |
| Cloudflare Wallets / Kitesurf « agents pay already » | (W33) | PARTIEL | corporate | moyenne | Hors pic W34 ; tense spend « soon » | Ne recycler que si besoin ; nuance tense |

---

## ACH — affirmations NON / confiance basse

### ACH — « Grève » ou mouvement social RentAHuman (W34)

| Hypothèse | Ce qui la soutient | Ce qui la réfuterait | État |
|---|---|---|---|
| Vrai tel quel | — | Aucun item harvests / tips | affaiblie |
| Vrai mais exagéré | Lexique « meatworkers / meat proxy » existe ailleurs | Preuve d'action collective datée | affaiblie |
| Inventé ou invérifiable | Précédent W20/W22 retiré ; silence total 09–12 | Source primaire contemporaine | **soutenue** → **couper** |

### ACH — Procès / litige neuf MoltMatch

| Hypothèse | Ce qui la soutient | Ce qui la réfuterait | État |
|---|---|---|---|
| Vrai tel quel | — | Dépôt / article nommé | affaiblie |
| Vrai mais exagéré | Cas consentement Luo/Chong (compass, historiques) | Nouvelle source 2026-W34 | affaiblie |
| Inventé ou invérifiable | Arc judiciaire déjà retiré ; zéro harvest | Document judiciaire | **soutenue** → **couper** |

### ACH — JadePuffer « first fully autonomous AI ransomware »

| Hypothèse | Ce qui la soutient | Ce qui la réfuterait | État |
|---|---|---|---|
| Vrai tel quel | Post 1ban.news | Rapport vendor / média établi | affaiblie |
| Vrai mais exagéré | Possible campagne marketing « first » | Texte technique + 2e source | soutenue |
| Inventé ou invérifiable | 1 like, agrégateur, pas de recoupement | Source primaire | **non réfutée** → **couper** |

### ACH — Attaque « autonome » Taiwan (FT août 2026)

| Hypothèse | Ce qui la soutient | Ce qui la réfuterait | État |
|---|---|---|---|
| Vrai tel quel | Posts FT + Techmeme 12/08 | Texte FT + attribution chercheurs | affaiblie (paywall) |
| Vrai mais exagéré | « Autonomous » souvent = outil assisté | Vocabulaire exact FT | soutenue |
| Inventé ou invérifiable | Relais sans article ouvert | Ouvrir FT | **non réfutée** → **couper** tant que FT non lu |

### ACH — OpenAI Astra « pausé » pour cyber autonome

| Hypothèse | Ce qui la soutient | Ce qui la réfuterait | État |
|---|---|---|---|
| Vrai tel quel | Mentions MIT Download → FT | Article FT / communiqué OpenAI | affaiblie |
| Vrai mais exagéré | Pause partielle / un train de train | Texte exact | soutenue |
| Inventé ou invérifiable | Chaîne secondaire uniquement | Source primaire | **non réfutée** → wire attribué FT seulement après ouverture, sinon **couper** |

### ACH — Agents4Science « dans » le MIT Download du 10/08

| Hypothèse | Ce qui la soutient | Ce qui la réfuterait | État |
|---|---|---|---|
| Vrai tel quel | Titre harvest « AI agents for science » | Page MIT = op-ed Schmidt Sciences | **réfutée** |
| Vrai mais exagéré | Thème adjacent « agents & science » | Même page | affaiblie |
| Inventé / confusion éditoriale | Homonymie thématique avec conf. Stanford | Lire le Download | **soutenue** (confusion) → **ne pas** coller Agents4Science |

### ACH — dynamo / Chunghwa « 5 % » (report W33)

| Hypothèse | Ce qui la soutient | Ce qui la réfuterait | État |
|---|---|---|---|
| Vrai tel quel | Post Moltbook seul | Rapport Chunghwa | affaiblie |
| Inventé ou invérifiable | Toujours absent des harvests 09–12 | Publication rapport | **soutenue** → **couper** |

### ACH — Causal Meta Muse Glimmer ↔ gouvernance Moltbook

| Hypothèse | Ce qui la soutient | Ce qui la réfuterait | État |
|---|---|---|---|
| Vrai tel quel | Même maison Meta | Lien explicite source | affaiblie |
| Vrai mais exagéré | Ownership Moltbook 10/03 + lab Muse | Preuve de coordination produit | soutenue (spéculation) |
| Inventé | Inférence desk | Démenti / silence sources | **non réfutée** si affirmée → **couper** le lien causal |

---

## Recommandations placement (preuve → place)

1. **Lede culture** : fil Moltbook fiabilité / counterfactual / binary pin / compression — **OK une** (primaire, haute). Continuité W33, pas redite HF.
2. **Gros titre / feature OpenClaw** : gym waitlist AU — **OK** (média ×3, haute). Nuancer date de l'incident vs date de publication ; nommer OpenClaw + faille API.
3. **Gros titre infra** : Muse Glimmer 30B open local — **OK** (primaire Meta + HN). Perf et « works with OpenClaw » attribués Meta. Docker Sandboxes en soutien nuancé.
4. **Wire** : River 1,1 Md$ (TC) ; synthèse safety-tests-as-risk (TC 09/08) ; stats Moltbook / $MOLT datés 12/08 ; OpenClaw 7.1-2 ; WorldClaw / OpenChamber si place.
5. **Couper** : grève RentAHuman ; procès MoltMatch ; lore Crustafarianism ; JadePuffer ; Taiwan FT tant que non ouvert ; Astra tant que FT non ouvert ; Chunghwa 5 % ; confusion Agents4Science↔MIT ; lien causal Muse↔Moltbook ; actu Moltx ; opinions bsky (« banks will fall »).
6. **Background seulement** (pas une) : rachat Meta/Moltbook 10/03 ; restriction Chine OpenClaw — compass, pas harvest W34.
7. **Deuxième passe** obligatoire sur le rendu : tuer snapshots $MOLT/Moltbook antérieurs au 12/08 ; interdire « grève » / « procès MoltMatch » résiduels.

*Un seul fait mou désinforme tout le journal. Ici le risque n°1 n'est pas le gym hack (sourcé) — c'est de réveiller RentAHuman / MoltMatch / Agents4Science sans primaire, ou de coller Meta Labs à Moltbook sans preuve.*
