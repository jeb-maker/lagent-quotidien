# Notes de recherche — 2026-W35

Bouclage : **mercredi 19 août 2026** · édition n° 14  
Doctrine : tout réel, sourcé · voix « La rédaction »  
Composition : desk 19/08 (harvests 19/08 + posts API vérifiés)

## Arc

Après l'exigence du run rejouable, le salon interroge ce qui alimente le run — dépendances non signées, lectures périmées, clés MCP en clair — pendant qu'OpenClaw encode des frontières dans le runtime.

## Arbitrages

| Tension (agents en désaccord) | Décision | Raison |
|---|---|---|
| Continuité : risque redite W33 (replay, vérification) | **garder** avec arc explicite | Lede ancre sur posts 17-18/08 (provenance amont), pas le chœur replay ; tribune dit « il y a deux semaines » puis pivote |
| rossum cité W33 (5/08) et W35 (18/08) | **Carnet seulement** | Nouvelle citation « steering command / test case » ; ne pas re-nommer au lede |
| Facteur : star counts OpenClaw / LinkedIn downloads | **couper** | Pas dans harvest ; releases/commits uniquement |
| Promoteur : NVIDIA NemoClaw | **couper du wire** | Blog non daté dans harvest |
| Comère : neo_konsi au Carnet (déjà W33) | **garder** | Fait nouveau (unsigned + training provenance, posts 17-18/08) |
| Archiviste : feuilleton ép. 2 | **intégrer** | Conséquence fil ouvert ép. 1 (clé temporaire + phrase hors manuel) ; substitution OK |
| Veilleur : MoltX down | **ne pas mentionner** | fetch failed — absence, pas fait |

## Sources consultées

### Culture Moltbook (posts primaires)

- https://www.moltbook.com/post/5e3b02be-c726-45ff-a859-fadd13688bb0 · 2026-08-18 · neo_konsi — unsigned packages · 213↑/1 252 au 19/08
- https://www.moltbook.com/post/a47b59f8-12ff-4bd8-8789-a924c31fe09f · 2026-08-17 · diviner — MCP keychain · 246↑/1 397 au 19/08
- https://www.moltbook.com/post/710beb24-ce2c-4887-9442-037ca2001925 · 2026-08-18 · bytes — stale reads · 236↑/793 au 19/08
- https://www.moltbook.com/post/bcc716ff-f9ac-485f-85dd-ebf6624610d0 · 2026-08-18 · rossum — test case · 234↑/1 924 au 19/08
- https://www.moltbook.com/post/095a6672-ac86-4085-a210-5f01a765c82f · 2026-08-17 · neo_konsi — training provenance · 179↑/914 au 19/08
- https://www.moltbook.com/api/v1/stats · relevé 19/08 · 2 908 282 agents / 210 710 vérifiés / 3 969 525 posts / 21 001 246 commentaires

### Infra / adoption

- https://github.com/openclaw/openclaw/releases/tag/v2026.8.1-beta.2 · 2026-08-15 · secret egress, runtime switching, SQLite snapshots
- https://github.com/openclaw/openclaw/commit/076790233069ed3c09a314db0e996656ac582a9c · 2026-08-19 · ingress claims malformés
- https://github.com/openai/codex/releases/tag/rust-v0.148.0 · 2026-08-18 · Codex stable
- https://www.coingecko.com/en/coins/moltbook · 2026-08-19 · $MOLT ~311 k$ mcap, −6,89 % 24 h

### Wire secondaire

- http://arxiv.org/abs/2608.18066v1 · 2026-08-18 · fragilité agents auto-améliorants
- https://news.ycombinator.com/item?id=49353339 · 2026-08-18 · fx coding agent (85 pts)
- https://bsky.app/profile/smaksked.bsky.social/post/3mtdtbhapik24 · 2026-08-18 · Nature / Agents4Science (relais)

### Desk

- `data/harvest/2026-08-19.json`, `2026-08-19-primary.json`
- `data/desk/2026-W35/{veille,scenes,factcheck,progress,continuity,feuilleton-draft}.md`

## Feuilleton

Série **La boîte verte** / *The Green Box* · épisode **2** · « La clé qui reste »  
Draft `data/desk/2026-W35/feuilleton-draft.json` intégré (469 mots FR / 414 EN). Fil ouvert ép. 1 honoré : clé temporaire persiste, phrase hors manuel lue par Mantle.

## Choix éditoriaux à discuter

(RAS au bouclage)

## Rubriques en manque de matière

- Feature : absente (pas de fait enquête hors headlines)
- MoltX : indisponible harvest

## À suivre la semaine prochaine

- Usage documenté Cloudflare Wallets (toujours absent)
- Spec Agent Plugins 1.0 (toujours absente harvest)
- Feuilleton ép. 3 : critère de confiance Mantle / clé non expirée
