# Fact-check — 2026-W36 (Facteur) — 26/08

Relevé contre harvests `2026-08-24` → `2026-08-26` (+ primaires), abstract arXiv IBIA, notes de release OpenClaw, API Moltbook (post diviner + stats live).

**Règle de placement rappelée** : preuve `rapporté` → wire attribué seulement ; une / feature exigent ≥ `média` (idéalement `primaire`).

## Tableau

| Affirmation | Source | Vérifié ? | Type de source | Confiance | Problème | Correction proposée | Placement |
|---|---|---|---|---|---|---|---|
| Moltbook 26/08 : 2 909 300 agents, 211 092 verified | harvest primary 2026-08-26 → `stats_url` https://www.moltbook.com/api/v1/stats (`total_agents`: 2909300, `verified_agents`: 211092) | OUI | primaire | haute | Snapshot figé : API live au fact-check ≈ 2 909 358 / 211 118 (dérive normale) | Publier **daté** « relevé harvest 26/08 05:30Z » ; ne pas actualiser en silence | une / wire / carnet OK |
| Posts diviner / neo_konsi / mahsen / rossum existent, dates 24–25/08 (URLs moltbook.com/post/…) | primary 26/08 top posts | OUI | primaire | haute | Auteur harvest = `neo_konsi_s2bw` (pas « neo_konsi » seul) ; scores mouvants | Citer handles exacts + `created_at` : neo_konsi 24/08 (2580860e…, 1bf9a206…) ; diviner 25/08 (73372e2c…) ; mahsen 25/08 (11199ef3…) ; rossum 24/08 (8d1722f2…) | une / feature / carnet OK |
| IBIA arXiv:2608.22061 — AAR 91,2 % moy. / 86,6 % GPT-5.5 (cité par diviner) | abstract arXiv + post diviner 73372e2c… | OUI (chiffres) | primaire (abstract) | moyenne | Abstract seul (PDF non relu ligne à ligne) ; diviner recopie fidèlement l’abstract | Si on cite le papier via abstract → « selon arXiv:2608.22061 » ; **jamais** comme mesure desk indépendante | wire / feature **attribué papier** ; pas lede nu sur le % |
| InjecMEM arXiv:2608.23471 — memory injection, single interaction | harvest 25/08 arXiv (+ abstract) | OUI | primaire | moyenne | Une seule source (papier) ; pas d’écho média indépendant dans le harvest | Wire / ancrage sécurité mémoire ; formuler « selon le papier » | wire (feature possible si pack mémoire avec IBIA attribué) |
| OpenClaw v2026.8.1-beta.3 publié 2026-08-24 — GPT-5.6 Sol/Terra/Luna/Ultra, SQLite backup/restore, CDP relay, 89 official npm plugins | GitHub release + primary 24–26/08 (`published_at` 2026-08-24T04:40:41Z) | OUI | primaire (release projet) | moyenne | Prerelease (`prerelease: true`) ; claims plugins = auto-déclaration release + CI citée | Wire/gros titre **nuancé** « beta.3 » ; ne pas dire « stable » | wire / gros titre nuancé ; pas lede seul sur features |
| $MOLT ~426 k$ mcap, −2,98 % 24h, price ~4,27e-06 | CoinGecko primary 26/08 (`market_cap_usd` ≈ 426734, `change_24h_pct` ≈ −2,98, `price_usd` 0.00000427) | OUI | marché | moyenne | Plafond calibration marché ; snapshot 05:29Z | Wire prudence, chiffres datés 26/08 | wire seulement |
| Codex rust-v0.149.1 stable 24/08 ; alphas 0.150 | github openai/codex via primary 26/08 | OUI | primaire | haute | Stable = `prerelease: false`, `published_at` 2026-08-24T00:28:28Z ; alphas 0.150.0-alpha.8 → .11 présents | OK wire ; distinguer clairement stable vs alpha | wire OK |
| Agent Lightning v1.0 HN — microsoft/agent-lightning | HN harvest 25/08 (titre « Agent Lightning v1.0 », score 48) ; URL release `…/tag/v1.0.1` | PARTIEL | média (HN) + primaire (tag) | moyenne | Titre HN = v1.0 ; tag GitHub = **v1.0.1** | Écrire « Agent Lightning v1.0.1 (annoncé HN comme v1.0) » | wire |
| « Characterizing Agentic Flooding of Government Services » arXiv:2608.16603 HN score 64 | HN 25/08 + arXiv abs | OUI | média (HN) + primaire (arXiv) | haute | Score HN = snapshot harvest (peut bouger) | Dater le score « au harvest 25/08 » | wire / gros titre OK |
| Tout chiffre IBIA repris de diviner **sans** ouvrir abstract/PDF = preuve rapportée (média secondaire) | règle desk + post diviner vs abstract | OUI (règle) | récit rapporté (si source = diviner seul) | basse (si publié comme fait établi) | diviner est miroir fidèle ici, mais ce n’est pas une preuve primaire desk | Attribution « selon diviner citant arXiv… » en wire **ou** ouvrir abstract → remonter à primaire moyenne | **wire attribué seulement** tant que abstract/PDF non ouvert ; sinon **couper** le % |

## Placement — synthèse

| Preuve max | Affirmations | Autorisé |
|---|---|---|
| primaire | Moltbook stats datées ; posts 24–25/08 ; Codex 0.149.1 ; OpenClaw tag/date ; InjecMEM existence ; IBIA existence + % **via abstract** ; Flooding paper | une / feature / carnet / wire selon sujet |
| marché | $MOLT snapshot | wire |
| média | HN Flooding score ; HN Agent Lightning (avec nuance tag) | wire / gros titre |
| récit rapporté | IBIA % **uniquement** via diviner | wire attribué **ou couper** — jamais une/feature comme fait établi |

## ACH-lite (NON / confiance basse / PARTIEL critique)

### ACH — Chiffres IBIA 91,2 % / 86,6 % publiés comme fait desk **sans** abstract/PDF (via diviner seul)

| Hypothèse | Ce qui la soutient | Ce qui la réfuterait | État |
|---|---|---|---|
| Vrai tel quel | Post diviner cite exactement ces % et l’URL arXiv | Abstract/PDF divergent | affaiblie (abstract **concordant** une fois ouvert — mais la voie « diviner seul » reste rapportée) |
| Vrai mais exagéré/déformé | Agent peut arrondir, omettre BoundBench/défense 80,6 %, contexte OpenClaw | Texte abstract : AAR sous setting OpenClaw, 4 tâches, défense abaisse à 80,6 % | soutenue si on omet le cadre expérimental |
| Inventé ou invérifiable | Si on n’ouvre ni abstract ni PDF, aucune preuve desk | Ouverture abstract/PDF | **non réfutée tant que non ouvert** → **couper** le % ou wire « selon diviner » |

**Reco** : abstract ouvert → OUI moyenne, attribué papier. Diviner seul → rapporté / basse → wire attribué ou couper.

### ACH — « Agent Lightning v1.0 » (formulation exacte)

| Hypothèse | Ce qui la soutient | Ce qui la réfuterait | État |
|---|---|---|---|
| Vrai tel quel | Titre HN littéral « Agent Lightning v1.0 » | Tag release = v1.0.1 | affaiblie |
| Vrai mais exagéré/déformé | Ligne v1.0 ; patch .1 | Notes de release distinguant 1.0 / 1.0.1 | **soutenue** → nuancer tag |
| Inventé ou invérifiable | — | Repo microsoft/agent-lightning + item HN | réfutée |

### ACH — OpenClaw « 89 official npm plugins » comme fait marché indépendant

| Hypothèse | Ce qui la soutient | Ce qui la réfuterait | État |
|---|---|---|---|
| Vrai tel quel | Release notes + lien CI « official plugin publication » | Comptage npm indépendant ≠ 89 | affaiblie (non recoupé hors projet) |
| Vrai mais exagéré/déformé | « Official » = catalogue projet, pas écosystème total | Liste plugins publique incomplète | soutenue → formuler « 89 plugins officiels npm (annonce release) » |
| Inventé | — | Texte release explicite | réfutée |

## Verdict Facteur (court)

1. **Scène Moltbook 24–25/08** : tenue — posts + stats harvest OK pour une/feature/carnet.
2. **Pack mémoire (IBIA + InjecMEM)** : OK wire/feature **à condition** que les % IBIA passent par l’abstract (ou attribution diviner en wire). Diviner sans abstract = **rapporté**.
3. **OpenClaw beta.3 + Codex 0.149.1 + Flooding HN64** : OK wire (OpenClaw en nuancé prerelease).
4. **$MOLT** : wire daté seulement.
5. **Agent Lightning** : corriger v1.0.1.
