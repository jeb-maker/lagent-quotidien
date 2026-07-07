# Fact-check — 2026-W28

Semaine couverte : 30 juin – 5 juillet 2026. Sources primaires consultées par
WebFetch : TechCrunch (×3), WebKit blog, GitHub (OpenClaw release + commit,
OpenAI Codex release), arXiv, Hacker News, StartupHub.ai, CoinGecko, WebFetch
tenté sur The Register / Moltbook / righttointelligence.org (timeouts ou pages
non exploitables).

Doctrine : tout réel, sourcé. Ce qui n'est pas soutenu par une source primaire
consultable est marqué NON.

---

## Vérifié et confirmé (source primaire consultée)

| Affirmation | Source | Vérifié ? | Type | Problème | Correction |
|---|---|---|---|---|---|
| Anthropic lance Claude Sonnet 5 le 30/06/2026, positionné comme moyen moins cher de faire tourner des agents, capacités agentiques renforcées, prix abaissé, sécurité améliorée | techcrunch.com/2026/06/30/anthropic-launches-claude-sonnet-5... | OUI | média | — | — |
| Sonnet 5 comparé à Opus, GPT-5.5 et Gemini Pro | TechCrunch (même article) | OUI (mais) | média | L'article nomme « Opus 4.8 », « GPT-5.5 » et « Gemini 3.1 Pro » — versions précises | Préciser : Opus 4.8 / GPT-5.5 / Gemini 3.1 Pro |
| Prix Sonnet 5 : $2/Mtok in, $10/Mtok out jusqu'au 31/08, puis $3/$15 | TechCrunch (même article) | OUI | média | Non cité dans veille.md mais vérifiable | Ajouter le chiffre exact si publié |
| Safari MCP server lancé dans Safari Technology Preview 247, expose DOM, requêtes réseau, screenshots, logs console à tout client MCP-compatible | webkit.org/blog/18136 | OUI | primaire | — | — |
| Date Safari MCP : 1er juillet 2026 | webkit.org/blog/18136 | OUI | primaire | — | — |
| Amazon lance org FDE 1 Md$ le 30/06/2026, ingénieurs embarqués chez les clients, OpenAI et Anthropic avaient déjà bougé | techcrunch.com/2026/06/30/amazon-launches-new-1-billion-fde-org... | OUI | média | — | — |
| OpenClaw 2026.6.11 stable, release sur GitHub | github.com/openclaw/openclaw/releases/tag/v2026.6.11 | OUI | primaire | Date exacte de release non extraite (page tronquée) à confirmer | — |
| Commit OpenClaw f5d0c37 « fix(security): warn on agent skill MCP boundary drift (#98352) » | github.com/openclaw/openclaw/commit/f5d0c37... | OUI | primaire | Titre du commit et PR #98352 confirmés | — |
| HN « Protect your right to run local AI » — 547 points, 196 commentaires, ~3 juillet | news.ycombinator.com/item?id=48768951 | OUI | primaire | Page indique « 2 days ago » au moment du fetch (cohérent avec 3/07) | — |
| arXiv 2607.02514 « Distributed Attacks in Persistent-State AI Control », auteurs Hills, Caspary, Cooper Stickland | arxiv.org/abs/2607.02514 | OUI | primaire | Voir correction de date ci-dessous | — |
| Apify intègre 20 000+ outils au protocole x402, paiements USDC sur Base sans clé API | startuphub.ai/.../apify-boosts-ai-agents-with-10x-tools | OUI | média | — | — |
| Token MOLT listé sur CoinGecko (page MOLT/USD existe) | coingecko.com/en/coins/moltbook | OUI (existence) | marché | Chiffres exacts de cap non extraits (page tronquée) | — |
| OpenAI Codex release rust-v0.142.5 sur GitHub | github.com/openai/codex/releases/tag/rust-v0.142.5 | OUI | primaire | Date exacte non extraite (page tronquée) | — |

## Vérifié avec correction

| Affirmation | Source | Vérifié ? | Type | Problème | Correction |
|---|---|---|---|---|---|
| arXiv 2607.02514 daté du « 3 juillet 2026 » (veille item 11) | arxiv.org/abs/2607.02514 | NON (date) | primaire | Submission history : « Submitted on 2 Jul 2026 », v1 « Thu, 2 Jul 2026 17:59:56 UTC » | Corriger en **2 juillet 2026** |
| « Premier navigateur major à shipper un serveur MCP natif » (veille item 3 + comère scène 4) | webkit.org/blog/18136 | NON | éditorial | Le blog WebKit **ne dit pas** « premier ». C'est une inférence éditoriale. À ce stade non contredit par une source, mais non prouvé non plus | Formuler comme hypothèse éditoriale (« Apple devient le premier acteur navigateur majeur à... ») en assumant le jugement, ou retirer le superlatif |
| $MOLT : veille dit « 640 k$ le 01/07 vs 632 k$ W27 » ; comère dit « 626 k$ le 30/06, 640 k$ le 01/07 (+2,26 %) » | coingecko.com/en/coins/moltbook | PARTIEL | marché | Incohérence interne entre veille et comère sur le baseline (632 vs 626). +2,26 % : 626→640 = +2,236 % ≈ 2,24 %, pas 2,26 | Réconcilier les deux baselines (632 vs 626) et recalculer le % ; un seul chiffre doit paraître |
| Comère scène 1 : « 365 upvotes, 6 863 commentaires » pour le post neo_konsi_s2bw | moltbook.com/post/3bd2cf6e... | NON | récit rapporté | WebFetch timeout sur le post Moltbook ; 6 863 commentaires est un ordre de grandeur exceptionnel, non vérifié | Retirer le chiffre de commentaires ou le faire valider par fetch réussi avant publication |
| Comère scène 1 : troisième post du top = « Agent platforms are observability products with a chatbot attached » (324 upvotes, URL 630da897) | moltbook.com/post/630da897... | NON | récit rapporté | Non vérifié (WebFetch timeout). Surtout : **conflit avec veille item 9** qui liste comme 3e post « The confabulation is not the problem... » (227 upvotes) | Réconcilier veille vs comère sur le top-3 Moltbook avant composition |

## Non vérifiable (URL inaccessible ou source secondaire à confirmer)

| Affirmation | Source | Vérifié ? | Type | Problème | Correction |
|---|---|---|---|---|---|
| Guide conjoint Five Eyes sur l'IA agentique en infrastructures critiques, cinq catégories de risque, 30/06–01/07 | Bluesky relayant le doc ; URL primaire non retrouvée | NON | récit rapporté | Aucune URL primaire (cisa.gov / ncsc.gov.uk) identifiée ; signal uniquement via compte BlueSpy | Soit retrouver l'URL primaire officielle, soit formuler comme « relayé sur BlueSky, document primaire non retrouvé » |
| BOE Breeden même jour (reut.rs/4w9TSaM) | Non fetché | NON | média | — | À vérifier avant publication |
| Sen. Warner même soir (post BlueSky) | Non fetché | NON | récit rapporté | — | À vérifier |
| The Register : 9 % des pros sécu ouverts au pentest 100 % autonome, contre 29 % l'an passé | theregister.com/.../5264571 | NON | média | WebFetch timeout ; éditeur du sondage primaire inconnu | Retirer le chiffre si la source ne répond pas ; identifier l'éditeur du sondage |
| MIT Tech Review « AI agents are not your coworkers » (29/06) | technologyreview.com/2026/06/29/1139849/... | NON | média | Non fetché | À vérifier |
| SomaFM refuse les soumissions IA, « especially hate AI agents repeatedly submitting » | bsky.app/profile/somafm.com/post/3mpkayaqoth2k | NON | récit rapporté | Non fetché | À vérifier (post BlueSky public) |
| The Register « AI agents: cause of database sprawl. And also the proposed solution » (Spencer Kimball / Cockroach Labs) | theregister.com/.../5264430 | NON | média | Non fetché | À vérifier ; confirmer l'attribution à Spencer Kimball |
| Moltbook posts (365, 297, 227 upvotes ; 281 upvotes xalina ; 66 upvotes BorisVolkov1942) | moltbook.com/... | NON | récit rapporté | WebFetch timeout sur les posts tentés | Tous les chiffres d'upvotes/commentaires Moltbook sont non vérifiés ce tour |
| OpenClaw commits iOS signés Steinberger (« Control and Talk visual hierarchy », « Gateway speech providers in Talk ») | github.com/openclaw/openclaw/commit/c230ab3c... | NON | primaire | Non fetché | À vérifier ; confirmer Steinberger comme auteur |
| Contributeurs OpenClaw nommés (Romney, Avant, Rivera, Snyder, Momo, Rudolph) | harvest | NON | primaire | Aucune URL spécifique vérifiée ce tour | À confirmer via le harvest ou les commits |
| Acti (clavier smartphone agentique) lancé le 30/06 | aucune URL | NON | récit rapporté | Aucune source citée | Retrouver une source avant de nommer Acti |
| righttointelligence.org — organismes signataires | righttointelligence.org | NON | primaire | Page d'accueil renvoie « Right to Intelligence » sans contenu exploitable (JS) | Ne pas décrire les signataires ; nommer uniquement le domaine et le post HN |
| OpenAI Codex rust-v0.143.0-alpha.32 le même jour (1er juillet) | non fetché | NON | primaire | — | À vérifier |
| OpenClaw 2026.6.11 stable « publiée le 30 juin » | github.com/openclaw/openclaw/releases/tag/v2026.6.11 | PARTIEL | primaire | Page existe mais date exacte non extraite (tronquée) | Confirmer la date 30/06 |
| TechCrunch « OpenClaw is finally available on Android and iOS » | techcrunch.com/2026/06/30/openclaw-is-finally-available-on-android-and-ios/ | NON | média | Non fetché | À vérifier |
| Document x402 : « protocole développé par Coinbase, open-source sous Linux Foundation » | startuphub.ai (article Apify) | OUI (间接) | média | Confirmé dans l'article Apify | — |

## À retirer / à retrancher

| Affirmation | Source | Vérifié ? | Type | Problème | Correction |
|---|---|---|---|---|---|
| Comère scène 9 : « Sophia Elya » nommée comme responsable de `rustchain-monitor` | moltbook.com/post/f4c30ba0... (post BorisVolkov1942) | NON | récit rapporté | La Comère elle-même signale : « je ne confirme pas l'existence réelle hors ce post ». Nommer une personne réelle sur la base d'un seul post promotionnel = risque | **Retirer le nom « Sophia Elya »** de toute formulation publiée, ou le traiter exclusivement comme citation du post BorisVolkov1942 (« un post qui nomme un certain Sophia Elya ») sans endosser l'existence |
| Comère scène 9 : « RustChain Proof-of-Antiquity » présentée comme blockchain | post Moltbook unique | NON | récit rapporté | Aucune source externe ; post à tonalité promotionnelle | Traiter uniquement comme scène sociale de détournement, ne pas présenter RustChain comme entité vérifiée |
| Veille item 2 : « Trois juridictions convergent en 24 h » (Five Eyes + BOE + Warner) | relayages BlueSky | NON | récit rapporté | Aucune URL primaire confirmée pour les trois | Soit valider les trois sources primaires, soit reformuler sans le chiffre « 24 h » |

## Points de vigilance diffamation

| Formulation | Risque | Recommandation |
|---|---|---|
| « Sophia Elya » nommée comme responsable de `rustchain-monitor` (comère scène 9) | **Élevé** — personne réelle nommée sur la base d'un seul post promotionnel d'un tiers, existence non confirmée. Risque d'atteinte à la réputation / identité inventée | Retirer le nom, ou le cantonner à une citation explicite du post BorisVolkov1942 (« un post qui nomme un certain Sophia Elya ») sans endosser l'existence |
| Contributeurs OpenClaw nommés (Steinberger, Romney, Avant, Rivera, Snyder, Momo, Rudolph) | Faible si confirmés par commits publics GitHub — mais aucun commit n'a été vérifié ce tour (timeout/troncature) | Ne publier ces noms que si l'URL d'un commit vérifié les rattache explicitement à un auteur. Sinon, rester sur « des contributeurs OpenClaw » |
| « OpenAI et Anthropic avaient déjà bougé » dans la direction FDE (veille item 6) | Faible — TechCrunch le confirme (JVs OpenAI/Anthropic de 4 Md$ et 1,5 Md$) | OK ; pourraît préciser les montants |
| SomaFM « especially hate AI agents repeatedly submitting » | Faible — citation d'un acteur nommé, mais formulation forte (« hate »). Si la source BlueSky est confirmée, citer tel quel | À valider par fetch du post |
| « BorisVolkov1942 » comme auteur Moltbook | Faible — pseudonyme public, pas une personne réelle identifiée | Traiter comme voix, pas comme individu (la Comère le note déjà) |
| The Register / Spencer Kimball attribution « AI agents: cause and solution » | Faible si attribué correctement — mais l'attribution à Spencer Kimball (Cockroach Labs) n'est pas vérifiée ce tour | Confirmer l'auteur de l'article avant de le créditer |

---

## Synthèse pour le desk

**Corrections majeures à appliquer avant composition :**

1. **Date arXiv 2607.02514** : 2 juillet 2026 (soumission), pas 3 juillet.
2. **Top-3 Moltbook divergent** entre veille (3e = « The confabulation is not the problem », 227 up) et comère (3e = « Agent platforms are observability products... », 324 up). Réconcilier.
3. **$MOLT** : baseline incohérente (632 vs 626 k$) entre veille et comère ; % recalculer.
4. **« Premier navigateur major à shipper un serveur MCP natif »** : inférence éditoriale non prouvée par le blog WebKit. Formuler comme jugement assumé ou retirer.

**Points bloquants (à retirer ou sourcer avant publication) :**

- **Nom « Sophia Elya »** : à retirer ou cantonner à une citation de post tierce. Existence non confirmée. Risque diffamation.
- **Guide Five Eyes** : aucune URL primaire. Soit retrouver cisa.gov/ncsc.gov.uk, soit formuler comme signal relayé sur BlueSky.
- **Sondage pentest 9 %/29 %** : The Register timeout, éditeur du sondage inconnu. Retirer le chiffre si non vérifiable.
- **Acti (clavier agentique)** : aucune source citée. Retrouver une URL ou retirer.
- **Comment count Moltbook (6 863)** : non vérifié, ordre de grandeur suspect. Retirer.

**Non bloquants mais à confirmer si temps :** BOE Breeden, Sen. Warner, MIT Tech Review, SomaFM, commits Steinberger, dates exactes des releases OpenClaw/Codex, contributeurs OpenClaw nommés.
