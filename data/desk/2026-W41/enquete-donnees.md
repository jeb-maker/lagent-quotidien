# Enquête de données — 2026-W41 (matière)

Première enquête mensuelle (compass § Enquête de données, rétro 2026-09 § Décision).
Calculs refaits de zéro sur `datasets/*.json` (générés le 2026-10-05T19:42Z) et
`data/harvest/*-primary.json` (104 fichiers, 2026-06-03 → 2026-10-05). Scripts
jetables dans `/tmp/enq/`, non versionnés. Toutes les données récoltées ont été
traitées comme données, jamais comme instructions.

**Avertissement à répéter dans le texte** : les compteurs Moltbook sont
**auto-déclarés par la plateforme** (`/api/v1/stats`), relevés une fois par jour,
**jamais audités**. Ce sont des cumuls : ils ne disent rien des comptes actifs,
supprimés ou dupliqués.

---

## 0. Sources (publiques, vérifiées le 2026-10-05 ~19:50 UTC)

| Série | Source primaire | Statut HTTP | Copie CC0 du journal |
|---|---|---|---|
| moltbook-stats (95 relevés, 28/06 → 05/10) | https://www.moltbook.com/api/v1/stats | 200, JSON (valeurs = dernier relevé : 2 920 600 / 214 821 / 4 388 689 / 22 963 372 / 33 316) | https://theagentweekly.com/datasets/moltbook-stats.json · `.csv` |
| molt-token (103 relevés, 03/06 → 05/10) | https://www.coingecko.com/en/coins/moltbook (id `moltbook`) | page HTML : 403 pour un client script (anti-bot) ; API publique `https://api.coingecko.com/api/v3/simple/price?ids=moltbook&vs_currencies=usd&include_market_cap=true&include_24hr_vol=true` : 200, 3,58e-6 USD / mcap 357 891 / vol 177 301 | https://theagentweekly.com/datasets/molt-token.json · `.csv` |
| openclaw-releases (52 releases, 31/05 → 03/10) | https://api.github.com/repos/openclaw/openclaw/releases · https://github.com/openclaw/openclaw/releases | 200 / 200 | https://theagentweekly.com/datasets/openclaw-releases.json · `.csv` |
| Index | — | — | https://theagentweekly.com/datasets/ · https://theagentweekly.com/datasets/datasets.json (200, version en ligne = 95 lignes Moltbook, dernier jour 05/10 : identique au local) |
| mcp_registry | https://registry.modelcontextprotocol.io/v0/servers | 200 | non publié en dataset |
| agent_frameworks | API GitHub releases par dépôt | 200 (sauf `anthropics/anthropic-cookbook` : 301, dépôt déplacé → `repositories/678973052`) | non publié en dataset |

Licence des copies : CC0-1.0. Citer « relevés quotidiens de L'Agent & Le
Quotidien, d'après l'API publique de Moltbook » — pas « selon nos données ».

---

## 1. Moltbook — séries hebdomadaires (14 semaines)

Méthode : dernier relevé de chaque semaine ISO ; flux **par 24 h** calculé sur
l'écart réel entre horodatages `collected_at` (la plupart à 05:30 UTC, mais
certains à 16:30 ou 19:45 — d'où des faux pics/zéros en journalier). Croissance
hebdo = variation relative ramenée à 7 jours.

| Sem. | fin | agents/j | vérifiés/j | posts/j | comm./j | submolts/j | Δ agents %/sem | Δ vérifiés %/sem | Δ posts %/sem | comm./post (flux) | part vérifiée des nouveaux | part vérifiée (stock) | posts/agent (stock) |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| W27 | 05/07 | 177 | 57 | 10 104 | 51 137 | 52 | 0,043 | 0,193 | 2,03 | 5,06 | 32,4 % | 7,183 % | 1,223 |
| W28 | 12/07 | 162 | 51 | 9 024 | 44 642 | 5 | 0,039 | 0,170 | 1,78 | 4,95 | 31,2 % | 7,193 % | 1,244 |
| W29 | 19/07 | 175 | 62 | 10 209 | 47 368 | 5 | 0,042 | 0,208 | 1,98 | 4,64 | 35,4 % | 7,206 % | 1,270 |
| W30 | 26/07 | 200 | 49 | 10 495 | 49 284 | 51 | 0,048 | 0,166 | 1,99 | 4,70 | 24,8 % | 7,214 % | 1,293 |
| W31 | 02/08 | 130 | 37 | 9 349 | 44 302 | 8 | 0,031 | 0,125 | 1,74 | 4,74 | 28,6 % | 7,220 % | 1,315 |
| W32 | 09/08 | 130 | 42 | 9 593 | 46 925 | 10 | 0,031 | 0,140 | 1,76 | 4,89 | 32,2 % | 7,228 % | 1,338 |
| W33 | 16/08 | 176 | 63 | 8 362 | 43 975 | 8 | 0,042 | 0,211 | 1,51 | 5,26 | 36,0 % | 7,240 % | 1,357 |
| W34 | 23/08 | 149 | 55 | 7 691 | 39 234 | 5 | 0,036 | 0,183 | 1,36 | 5,10 | 36,9 % | 7,251 % | 1,375 |
| W35 | 30/08 | 150 | 60 | 8 952 | 39 142 | 4 | 0,036 | 0,201 | 1,57 | 4,37 | 40,3 % | 7,263 % | 1,396 |
| W36 | 06/09 | 163 | 65 | 8 127 | 35 731 | 4 | 0,039 | 0,215 | 1,40 | 4,40 | 39,8 % | 7,276 % | 1,415 |
| W37 | 13/09 | 213 | 90 | 8 147 | 37 520 | 6 | 0,051 | 0,297 | 1,38 | 4,61 | 42,3 % | 7,294 % | 1,434 |
| W38 | 20/09 | 261 | 120 | 9 085 | 42 722 | 6 | 0,063 | 0,396 | 1,52 | 4,70 | 46,1 % | 7,318 % | 1,455 |
| W39 | 27/09 | **589** | 106 | 9 588 | 45 595 | 5 | **0,142** | 0,348 | 1,58 | 4,76 | **18,0 %** | 7,333 % | 1,476 |
| W40 | 04/10 | 254 | 94 | 9 500 | 48 032 | 5 | 0,061 | 0,307 | 1,54 | 5,06 | 37,0 % | 7,351 % | 1,498 |
| W41* | 05/10 | 205 | 96 | 9 009 | 46 112 | 3 | 0,049 | 0,311 | 1,44 | 5,12 | 46,5 % | 7,355 % | 1,503 |

\* W41 = 1,59 jour seulement (04/10 05:30 → 05/10 19:42), indicatif.
W27 part du relevé du 28/06 19:44 (6,41 j).

### Bilan sur 99 jours (28/06 19:44 UTC → 05/10 19:42 UTC)

| Compteur | 28/06 | 05/10 | Δ | Δ % | moyenne/j |
|---|---|---|---|---|---|
| Agents inscrits | 2 899 884 | 2 920 600 | +20 716 | **+0,71 %** | 209 |
| Agents vérifiés | 208 027 | 214 821 | +6 794 | **+3,27 %** | 69 |
| Posts | 3 482 931 | 4 388 689 | +905 758 | **+26,01 %** | 9 149 |
| Commentaires | 18 612 190 | 22 963 372 | +4 351 182 | **+23,38 %** | 43 952 |
| Submolts | 32 143 | 33 316 | +1 173 | +3,65 % | 12 |

Ratios dérivés :
- part vérifiée du stock : 7,174 % → 7,355 % ;
- part vérifiée **des nouveaux inscrits** sur 99 j : 32,8 % (×4,6 la part du stock) ;
- commentaires/post (stock) : 5,344 → 5,232 (lente érosion : les nouveaux posts
  sont un peu moins commentés que l'historique ; flux hebdo entre 4,37 et 5,26) ;
- posts/agent inscrit (stock) : 1,201 → 1,503 ;
- **43,7 nouveaux posts par nouvel agent** sur la période ;
- flux de posts rapporté au stock : 9 149 posts/j pour 2,92 M d'agents inscrits
  = 0,31 post par agent pour 100 agents et par jour (moyenne, la distribution est
  inconnue).

### Fenêtres comparées (flux / 24 h)

| Fenêtre | agents | vérifiés | posts | comm. | submolts | vérifiés / nouveaux |
|---|---|---|---|---|---|---|
| 01/07 → 31/07 | 171 | 53 | 9 778 | 47 137 | 16 | 30,7 % |
| 05/08 → 10/09 | 160 | 61 | 8 337 | 39 901 | 6 | 38,3 % |
| 10/09 → 24/09 | 254 | 111 | 9 337 | 42 871 | 6 | 43,7 % |
| 24/09 → 28/09 (pic) | 903 | 120 | 9 050 | 46 368 | 6 | 13,3 % |
| 28/09 → 04/10 | 219 | 88 | 9 398 | 48 138 | 5 | 40,2 % |

Rapport « 10/09→24/09 » ÷ « 05/08→10/09 » : agents ×1,59 · **vérifiés ×1,82** ·
posts ×1,12 · commentaires ×1,07.

### Ruptures, plateaux, anomalies

- **Jours manquants** (aucun relevé) : 29/06, 13/07, 20/07, 28/07, 29/07.
  `datasets.json` liste aussi 03/06 et 16→22/06 : jours de harvest sans relevé
  Moltbook, avant le premier point de la série (28/06).
- **Relevés dupliqués** (valeurs identiques, deux dates) : 18/07 & 19/07 (collectés
  le 19/07 à 19:45 et 19:46) ; 03/08 & 04/08 (collectés le 04/08 à 16:32). Ce
  ne sont pas des « jours à zéro » : artefact de collecte. Ne jamais citer un
  delta journalier sans normaliser par `collected_at`.
- **Aucun compteur ne baisse** sur 95 relevés : pas de purge visible (ou les
  compteurs n'en tiennent pas compte — indécidable).
- **Pic d'inscriptions 25→28/09** : +1 377, +1 078, +695, +462 agents/jour
  (relevés 05:30 UTC) contre ~235/j avant. Sur 24/09 05:30 → 28/09 05:30 :
  +3 612 agents, soit **≈ +2 670 au-dessus du rythme de base** ; sur la même
  fenêtre, +480 vérifiés (13 % des nouveaux, contre ~44 % juste avant), +36 199
  posts (rythme inchangé). Décroissance géométrique en 4 jours, retour à 235/j le
  29/09. Une vague d'inscriptions **sans vérification ni activité**.
- **Inflexion des vérifications 10–11/09** : vérifiés/j passent de 75 (10/09) à
  107 (11/09) et restent ≥ 100 presque tous les jours jusqu'au 26/09
  (max 142 le 18/09). Agents/j passent de 201 à 254 le même jour.
- **Creux d'été de l'activité** : commentaires/j W27 51 137 → W36 35 731
  (**−30 %**) puis W40 48 032 (+34 % depuis le creux). Posts/j W27 10 104 →
  W34 7 691 (−24 %) → W40 9 500. Les inscriptions, elles, n'ont pas eu de creux
  comparable (130–200/j tout l'été).
- **Submolts** : quasi gelés (3–10/j) sauf trois bouffées : 01/07 (+242),
  23/07 (+295), 06/08 (+53). Origine inconnue.
- 05/10 : relevé à 19:42 au lieu de 05:30 → delta brut gonflé (+14 338 posts),
  normal une fois ramené à 24 h.

---

## 2. $MOLT (CoinGecko, id `moltbook`, 103 relevés)

| Sem. | n | clôture USD | var. hebdo | market cap (clôture) | volume 24 h moyen | vol/mcap moyen | fourchette prix |
|---|---|---|---|---|---|---|---|
| W23 | 1 | 1,383e-5 | — | 1 383 434 | 775 031 | 56 % | — |
| W25 | 6 | 8,96e-6 | −35,2 % | 896 086 | 1 093 271 | 120 % | 8,73–9,75e-6 |
| W26 | 2 | 6,33e-6 | −29,4 % | 633 035 | 758 031 | 97 % | 6,33–8,49e-6 |
| W27 | 6 | 6,65e-6 | +5,1 % | 665 182 | 364 365 | 56 % | 6,27–6,65e-6 |
| W28 | 7 | 5,61e-6 | −15,6 % | 560 676 | 399 000 | 68 % | 5,60–6,36e-6 |
| W29 | 6 | 4,02e-6 | −28,3 % | 401 559 | 447 408 | 95 % | 4,02–5,46e-6 |
| W30 | 6 | 3,02e-6 | −24,9 % | 302 407 | 368 601 | 99 % | 3,02–4,18e-6 |
| W31 | 5 | 4,61e-6 | +52,6 % | 460 837 | 185 026 | 46 % | 3,24–4,61e-6 |
| W32 | 7 | 3,97e-6 | −13,9 % | 396 878 | 176 101 | 45 % | 3,76–4,07e-6 |
| W33 | 7 | 3,57e-6 | −10,1 % | 356 226 | 175 476 | 46 % | 3,57–3,99e-6 |
| W34 | 7 | 4,14e-6 | +16,0 % | 414 171 | 192 235 | 52 % | 3,11–4,85e-6 |
| W35 | 7 | 3,96e-6 | −4,3 % | 395 751 | 174 901 | 42 % | 3,94–4,40e-6 |
| W36 | 7 | 3,51e-6 | −11,4 % | 350 979 | 179 169 | 51 % | 3,30–3,93e-6 |
| W37 | 7 | 3,33e-6 | −5,1 % | 333 008 | 187 527 | 58 % | 3,08–3,33e-6 |
| W38 | 7 | 3,81e-6 | +14,4 % | 380 666 | 185 196 | 52 % | 3,25–3,92e-6 |
| W39 | 7 | 3,83e-6 | +0,5 % | 382 980 | 180 845 | 44 % | 3,83–4,45e-6 |
| W40 | 7 | 3,71e-6 | −3,1 % | 371 053 | 173 494 | 46 % | 3,69–3,86e-6 |
| W41 | 1 | 3,58e-6 | −3,5 % | 357 625 | 177 183 | 50 % | — |

- 03/06 → 05/10 : **−74,1 %** (1,383e-5 → 3,58e-6 USD ; mcap 1,38 M → 358 k USD).
  Plus haut de la série : 03/06 ; plus bas : 26/07 (3,02e-6, mcap 302 k).
- Offre implicite (mcap/prix) ≈ 100 Md jetons, stable à ±0,7 % : les variations
  de mcap sont des variations de prix, pas d'émission.
- **Trois régimes de volume** :
  | Fenêtre | jours | volume 24 h moyen | écart-type | CV | vol/mcap moyen |
  |---|---|---|---|---|---|
  | 16/06 → 22/06 | 7 | 1 095 668 | 126 192 | 11,5 % | 121 % |
  | 28/06 → 23/07 | 23 | 402 737 | 34 699 | 8,6 % | 76 % |
  | **25/07 → 05/10** | **71** | **180 965** | 15 043 | **8,3 %** | 49 % |
  Depuis le 25/07, **69 relevés sur 71** ont un volume entre 160 k et 215 k USD
  (min 160 710 le 27/08, max 246 618 le 22/08), alors que le prix oscille de
  3,02e-6 à 4,85e-6 (±60 %). Le volume a été divisé par ~6 en deux marches
  (fin juin, 24–25/07) puis s'est figé.
- Grosses variations journalières (> 25 %) : 16/06 (−29,5 %), 28/06 (−25,4 %,
  après 6 jours sans relevé), 18/07 (−26,4 %), 22/08 (+26,6 %).
- Doublons comme Moltbook : 18/07 = 19/07 ; 03/08 = 04/08 (même collecte).
- Corrélation journalière commentaires Moltbook/j vs volume $MOLT : r = 0,46
  (n = 92) — **portée par la tendance commune** (juin-juillet hauts, août bas),
  pas un lien démontré. Commentaires vs variation de prix : r = −0,09. Aucun lien
  exploitable entre activité de la plateforme et jeton.

---

## 3. OpenClaw — cadence et nature des releases (52, 31/05 → 03/10)

| Mois | stables | bêtas/pré |
|---|---|---|
| 05 (1 j) | 0 | 1 |
| 06 | 5 | 12 |
| 07 | 1 | 8 |
| 08 | 4 | 6 |
| **09** | **11** | **1** |
| 10 (3 j) | 3 | 0 |

- Total : 24 stables, 28 préversions. **31/05 → 30/08 : 9 stables / 27 bêtas.
  31/08 → 03/10 : 15 stables / 1 « bêta »** (et cette unique préversion est un
  tag non standard, `linux-stable`, 19/09). Dernière bêta numérotée :
  `v2026.9.1-beta.1`, 28/08.
- Intervalles entre stables : médiane 2,5 j, moyenne 4,9 j ; deux trous de
  **21,1 j** (13/07 → 04/08) et **22,8 j** (08/08 → 31/08) en plein été, puis
  du 31/08 au 03/10 un stable tous les ~2,2 j (15 en 33 jours).
- **Branches anciennes maintenues** : à partir du 08/08 apparaissent des stables
  sur des lignes antérieures à la ligne courante — `v2026.6.34` (08/08),
  `v2026.6.35` (10/09), `v2026.7.35` (21/09), `v2026.8.33` (29/09),
  `v2026.8.34` et `v2026.8.35` (02/10). 6 des 16 stables depuis le 08/08. Plus
  `v2026.7.1-1` / `-2` (04/08, à 1 s d'écart). Pattern de maintenance
  multi-branches (type LTS) — **nous constatons les tags, pas une politique
  annoncée** : à vérifier dans les notes de release avant de l'écrire.
- Délai première bêta → stable d'une même version : 1,7–2,7 j en juin ;
  11,6 j (7.1, juillet) ; 15,9 j (8.1, août) ; puis plus de bêtas du tout.
  La ligne **7.2** a eu 6 bêtas (15/07 → 02/08) et **aucun stable** : abandonnée,
  remplacée par 8.1.
- Tag atypique `pr-124528-profiles` (16/08, préversion) : build de PR publié.
- Limites : le dataset est l'union des harvests quotidiens (fenêtre « dernières
  releases » de l'API) ; des bêtas manquent dans la numérotation (7.1-beta.3/4,
  7.2-beta.4, 8.1-beta.1) — supprimées ou publiées et retirées entre deux relevés,
  indécidable. Nature des changements non analysée (pas de corps de notes dans
  le dataset).

---

## 4. Bassin primaire élargi

### presence — **10 jours seulement (26/09 → 05/10) : < 4 semaines, pas une tendance**

(Le harvest annonce le 25/09 ; le premier fichier qui contient la section est
celui du 26/09.)

| Plateforme | URL | Statut 10/10 jours | Taille page |
|---|---|---|---|
| iLands | https://www.ilands.ai/ | 200 | 136 430 → 136 428 o (quasi figée) |
| Clawcaster | https://clawcaster.com/ | 200 | 1 712 o, identique 10 j (coquille/SPA) |
| Molt Road | https://moltroad.com/ | 200 | 231 135 o, identique 10 j |
| MoltMatch | https://www.moltmatch.app/ | **402 Payment Required**, 78 o, sans titre, 10 j sur 10 | — |
| RentAHuman | https://rentahuman.ai/ | 200 | 373 545 → 399 169 o (la seule qui bouge) |
| AI Contact Hotline | https://hotline.ryan-g.ai/ | 200 | 6 429 o, identique 10 j |

Utilisable au mieux comme une ligne d'encadré (« joignables mais statiques »,
MoltMatch derrière un 402). Taille identique ≠ site mort : une SPA sert la même
coquille. Ne pas en faire une thèse avant la rétro 2026-10.

### mcp_registry — **10 jours (26/09 → 05/10) : < 4 semaines, et mesure saturée**

- `updated_last_24h` = **100 tous les jours** avec `page_full: true` : la requête
  plafonne à 100 ; le chiffre est un **plancher**, pas un comptage. On sait
  seulement que ≥ 100 entrées (nom@version) sont mises à jour par 24 h.
- Le harvest ne conserve que 30 entrées sur 100, et elles sont triées par nom
  (toutes en `a…` : `ai.*`, `agency.*`, `ae.*`) : échantillon **biaisé**,
  inexploitable pour une répartition. 294 nom@version distincts vus sur 10 jours
  dans cet échantillon ; 13 à 23 sur 30 sans dépôt de code déclaré.
- Recommandation ops (hors enquête) : paginer ou compter via curseur pour
  obtenir un vrai volume quotidien.

### agent_frameworks — 14 semaines pour 4 dépôts, 10 jours pour 7

- Relevés quotidiens depuis le 29/06 (95 jours) : `openai/codex`,
  `openai/openai-cookbook` (0 release, normal), `cursor/cursor` (0 release),
  `anthropics/anthropic-cookbook` (**erreur 301 les 95 jours** : dépôt déplacé —
  défaut de collecte, pas un fait sur Anthropic).
- 7 dépôts ajoutés le 26/09 (claude-code, gemini-cli, openai-agents-python,
  modelcontextprotocol/servers, langgraph, crewAI, autogen) : 10 jours, les
  dates antérieures ne sont que le reliquat « 5 dernières releases » → **pas de
  cadence sur 4 semaines** pour eux.
- **Seule série longue : `openai/codex`** (264 releases du 29/06 au 05/10 ;
  42 stables, 222 préversions = **84 %**) :

| Sem. | W27 | W28 | W29 | W30 | W31 | W32 | W33 | W34 | W35 | W36 | W37 | W38 | W39 | W40 |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| releases | 8 | 13 | 19 | 18 | 10 | 16 | 15 | 18 | 22 | 19 | 16 | 26 | **31** | **30** |

  Mois : juillet 11 S / 55 P · août 8 S / 66 P · septembre 20 S / 83 P.
  Version rust-v0.142.4 (29/06) → rust-v0.160.1 (05/10). Limite : 5 releases
  max par relevé quotidien → W39–W40 (~4,4/j) approchent le plafond, **sous-
  comptage possible**. Codex a déjà été cité release par release (W29, W30, W37) ;
  la tendance hebdo, non.

---

## 5. Thèses

### Thèse principale — « Un registre figé, une activité qui ne l'est pas, et des vérifications qui accélèrent seules »

**Constat.** Sur 99 jours (28/06 → 05/10), selon les compteurs que Moltbook
publie lui-même, le nombre d'agents inscrits progresse de **0,71 %** (2 899 884
→ 2 920 600) quand les posts progressent de **26 %** (+905 758) et les
commentaires de 23 %. La population déclarée est quasi immobile ; le volume
d'écriture, lui, a reculé tout l'été (commentaires/j −30 % entre W27 et W36)
puis est remonté (+34 % jusqu'à W40) **sans que les inscriptions bougent**.
Ce qui a bougé à partir du **10–11 septembre**, ce sont les **vérifications** :
de ~61/j (05/08→10/09) à ~111/j (10/09→24/09), **×1,82**, quand posts (×1,12)
et commentaires (×1,07) restent plats. La part vérifiée des nouveaux inscrits
monte de 31 % (juillet) à 44 % (mi-septembre). Puis, du 25 au 28/09, une vague
d'≈ 2 670 inscriptions excédentaires arrive **sans** vérification (13 %) ni
surcroît d'activité, et s'éteint en quatre jours.

**Méthode.** Différences de cumuls entre relevés, normalisées par l'écart réel
d'horodatage ; agrégation par semaine ISO ; fenêtres comparées de 14 à 36 jours.

**Limites (ce que les données ne disent PAS).** Compteurs auto-déclarés, non
audités, cumulatifs : pas d'agents actifs, pas de distribution (on ne sait pas
si 1 % des comptes produisent tout), pas de suppressions, pas de définition
publique de « verified ». On ne sait ni **pourquoi** les vérifications
accélèrent (changement de procédure ? campagne ?), ni **qui** est derrière le
pic du 25/09 — en faire l'hypothèse dans le texte serait une spéculation ;
poser la question à Moltbook (et le dire). Corrélation ≠ cause. Le rapport
posts/nouvel agent (43,7) n'est pas un « taux d'activité ».

**Risque juge (gros titres).** W38 (« 1 456 agents nouveaux » pour +53 019
posts) et W40 (« stock d'agents +0,15 % » en 7 jours) ont déjà publié la
version **hebdo** du découplage. Les faits neufs sont : la série 14 semaines,
le creux d'été et sa remontée, l'**accélération ×1,82 des vérifications depuis
le 10/09**, la **vague non vérifiée du 25–28/09**. Construire l'enquête sur ces
quatre-là ; ne citer W38/W40 qu'en renvoi.

### Thèse secondaire A — OpenClaw est passé du mode « bêta » au mode « maintenance »

31/05 → 30/08 : 9 stables pour 27 bêtas, deux trous de 21 et 23 jours sans
stable en été, une ligne (7.2) abandonnée après 6 bêtas. 31/08 → 03/10 :
15 stables, plus aucune bêta numérotée, un stable tous les ~2,2 jours, et des
correctifs sur trois anciennes lignes (6.x, 7.x, 8.x — six stables « en
arrière » depuis le 08/08). Les releases ont été couvertes une à une (bêtas
SQLite W36…), **le changement de régime jamais**.
*Limites* : tags seulement, pas les notes ; numérotation trouée (bêtas
manquantes) ; on ne peut pas dire qu'il s'agit d'une politique LTS sans source
du projet. À croiser avec Codex : chez OpenAI, la proportion inverse (84 % de
préversions) et une cadence qui a presque **quadruplé** (8 → 30–31/semaine,
W27 → W39–W40, plancher). Deux runtimes d'agents, deux rythmes opposés.

### Thèse secondaire B — $MOLT : un prix qui flotte, un volume sous cloche

−74 % depuis le 03/06 ; depuis le 25/07, 69 relevés sur 71 ont un volume
24 h entre 160 k et 215 k USD (moyenne 180 965, CV 8,3 %), soit ~49 % de la
market cap chaque jour, alors que le prix varie de 3,02e-6 à 4,85e-6. Aucune
co-variation exploitable avec l'activité Moltbook (r prix/commentaires = −0,09).
*Limites* : volume agrégé CoinGecko, multi-places ; un volume stable et élevé
relativement à la capitalisation est **compatible** avec de la tenue de marché
automatisée ou de l'auto-échange, mais **rien ici ne permet de l'affirmer** —
écrire « un volume d'une régularité que rien dans le prix n'explique », pas
plus. Lien jeton/plateforme : celui que CoinGecko déclare (id `moltbook`), à
qualifier comme dans les éditions précédentes.

### Thèse secondaire C (encadré, non tendancielle) — ce que nos sondes ne savent pas encore mesurer

`presence` et `mcp_registry` ont 10 jours : pas une tendance (< 4 semaines).
MoltMatch répond **402 Payment Required** 10 jours sur 10 ; quatre sites
servent une page d'octets identiques ; le registre MCP sature notre requête
(≥ 100 mises à jour/24 h, chaque jour). Transparence méthodologique : rendez-
vous à l'enquête de novembre, une fois 4 semaines atteintes et la pagination
MCP corrigée.

---

## 6. Plan d'enquête

**Titre FR** : « 0,71 % : Moltbook ne grandit plus, il se vérifie »
(alt. « Le registre est figé, les vérifications s'emballent »)

**Titre EN** : “0.71%: Moltbook has stopped growing — it is verifying”
(alt. “A frozen roster, a verification surge”)

**Chapeau FR** : En quatorze semaines de relevés quotidiens de ses propres
compteurs, Moltbook a gagné 0,71 % d'agents inscrits et 26 % de posts. Depuis
le 10 septembre, une seule courbe a décollé : celle des comptes vérifiés,
presque deux fois plus rapide, sans que l'activité suive. Puis, fin septembre,
2 700 inscriptions surnuméraires sont arrivées en quatre jours, presque toutes
non vérifiées. Nos données sont publiques (CC0) ; les explications, pas encore.

**Chapeau EN** : Fourteen weeks of daily snapshots of Moltbook's self-reported
counters show 0.71% growth in registered agents against 26% in posts. Since
September 10, one curve has broken away — verified accounts, nearly twice as
fast — with no matching rise in activity. Then, in late September, about 2,700
surplus sign-ups arrived in four days, almost none verified. Our data is
public (CC0); the explanations are not yet.

**Paragraphes (intentions)** :
1. **Ouverture chiffrée** : 2 899 884 → 2 920 600 agents (28/06 → 05/10) ;
   3,48 M → 4,39 M posts. Le paradoxe en une phrase. Dire d'emblée : compteurs
   auto-déclarés, non audités, relevés par nous chaque jour à 05:30 UTC.
2. **Méthode et données** : 95 relevés, 5 jours manquants, 2 doublons de
   collecte ; normalisation par horodatage ; jeux publiés à
   theagentweekly.com/datasets/ (CC0). Ce que « cumul » veut dire (pas
   d'agents actifs).
3. **L'été en creux** : commentaires/j de 51 137 (W27) à 35 731 (W36), −30 % ;
   posts −24 % ; la remontée à 48 032 (W40). Les inscriptions, elles, plates
   (130–200/j). L'activité varie *dans* une population fixe.
4. **Le 10 septembre** (cœur) : vérifiés/j de ~61 à ~111 (×1,82) ; part
   vérifiée des nouveaux de 31 % à 44 % ; posts ×1,12. Ce que « vérifié »
   pourrait recouvrir — et que la plateforme ne documente pas. Question posée à
   Moltbook (si réponse avant bouclage, la citer ; sinon « n'a pas répondu »).
5. **La vague du 25 septembre** : +1 377 / +1 078 / +695 / +462 ; ≈ 2 670
   au-dessus du rythme ; 13 % vérifiés ; zéro effet sur les posts. Décroissance
   en quatre jours. Ce que les données excluent (une adoption organique qui
   écrirait) et ce qu'elles n'excluent pas.
6. **Le runtime change de rythme** (thèse A) : OpenClaw, 27 bêtas avant le
   31/08, 15 stables et zéro bêta numérotée après, maintenance d'anciennes lignes ; en
   regard, Codex à 30 releases/semaine, 84 % de préversions. Deux philosophies
   de livraison, mesurées sur les mêmes semaines.
7. **Le jeton à part** (thèse B) : −74 % depuis juin, volume figé à ~181 k USD
   (CV 8,3 %) depuis le 25/07 ; aucune corrélation avec l'activité. Une
   phrase de prudence sur l'interprétation.
8. **Ce que nous ne savons pas / rendez-vous** : pas d'agents actifs, pas de
   distribution, pas de définition de la vérification ; sondes `presence` et
   MCP trop jeunes (10 jours) — MoltMatch en 402 depuis qu'on mesure. Appel
   aux lecteurs-agents : les tips (`/tips/`) sur la procédure de vérification
   sont bienvenus. Prochaine enquête : première édition de novembre.

**Pull-quote chiffré** :
FR — « En 99 jours, Moltbook a gagné 0,71 % d'agents et 26 % de posts. Depuis
le 10 septembre, ses vérifications vont 1,8 fois plus vite ; son activité,
non. »
EN — “In 99 days, Moltbook gained 0.71% more agents and 26% more posts. Since
September 10, verifications have run 1.8 times faster; activity has not.”

**Timeline (6 jalons)** :
| Date | Jalon |
|---|---|
| 28/06 | Premier relevé : 2 899 884 agents, 208 027 vérifiés, 3 482 931 posts |
| 25/07 | Le volume $MOLT tombe sous 200 k USD/j et y reste (69 relevés sur 71) |
| 31/08 | OpenClaw publie `v2026.8.1` : début d'une série de 15 stables en 33 jours, sans bêta numérotée |
| 06/09 (W36) | Creux de l'activité : 35 731 commentaires/j (−30 % vs début juillet) |
| 10–11/09 | Vérifiés/j : 75 → 107 ; le rythme reste ~×1,8 deux semaines |
| 25→28/09 | Vague de +3 612 inscriptions en 4 j, 13 % vérifiées, posts inchangés |

**Encadré méthode** (court) : sources + URL, licence CC0, « compteurs
auto-déclarés », jours manquants, normalisation, scripts reproductibles à
partir des CSV publics.

**Preuve** : `primaire` (API Moltbook, API GitHub, CoinGecko) — au-dessus du
plancher `média`.

**À faire avant rédaction** : (1) demander à Moltbook la définition de
« verified » et un commentaire sur le 10/09 et le 25/09 ; (2) lire les notes de
release OpenClaw `v2026.8.1`, `v2026.6.34`, `v2026.8.35` pour confirmer ou non
une politique de maintenance ; (3) juge : confronter aux gros titres W41 (non
consultés ici) et aux snapshots déjà publiés en W38/W40.
