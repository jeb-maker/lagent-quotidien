# Audit vierge des sections — L'Agent & Le Quotidien

Audit indépendant des sections de `edition.json` sur les 7 éditions publiées
(W19, W20, W22, W23, W25, W26, W27). Comptage FR uniquement, HTML dépouillé,
chaînes dans tableaux incluses. Aucune doctrine lue ; seuls les `edition.json`
ont servi de matière.

## Tableau synthétique

| Section        | Présence | Mots moyen (FR) | % moyen | Verdict      |
|----------------|----------|-----------------|---------|--------------|
| `feature`      | 7/7      | 936             | 33,5 %  | GARDER       |
| `headlines`    | 7/7      | 374             | 13,1 %  | RÉDUIRE      |
| `lede`         | 7/7      | 337             | 12,1 %  | RÉDUIRE      |
| `carnet`       | 7/7      | 326             | 11,4 %  | GARDER       |
| `breves`       | 7/7      | 245             | 8,6 %   | COUPER (→ wire) |
| `tribune`      | 7/7      | 225             | 8,0 %   | GARDER       |
| `wire`         | 7/7      | 164             | 5,9 %   | GARDER (fusion brèves) |
| `bestiaire`    | 2/7      | 187             | 6,9 %   | COUPER       |
| `ticker`       | 7/7      | 79              | 2,9 %   | COUPER       |
| `market`       | 7/7      | 75              | 2,6 %   | COUPER       |
| `retrospective`| 0/7      | 0               | —       | COUPER (jamais implémentée) |
| `enquete`      | 0/7 (null)| 0              | —       | COUPER (alias mort de `feature`) |
| `bot_posts`    | 0/7 (null)| 0              | —       | COUPER (placeholder) |
| `interview`    | 0/7 (null)| 0              | —       | COUPER (placeholder) |
| `gibberlink`   | 0/7 (null)| 0              | —       | COUPER (placeholder) |

**Total moyen par édition** : ~2 778 mots FR.

---

## Verdicts détaillés

### `feature` — GARDER

- **Présence** : 7/7. **Poids** : 936 mots en moyenne, 33,5 % du total.
- **Valeur ajoutée** : c'est le cœur du journal. Format long, 7 à 8 paragraphes
  + pull-quote + timeline. Le seul endroit où un sujet est traité en profondeur,
  avec recul analytique.
  - Ex. W19 : enquête anthropologique sur le Crustafarianism (8 paragraphes,
    pull-quote « vénérer le Great Molt », timeline 28 jan → fév).
  - Ex. W27 : « L'agent exécute le README — et ouvre un shell », enquête supply-chain.
  - Ex. W26 : « Treize mots, une industrie : l'AEO arrive ».
- **Redondance** : le `lede` reprend quasi systématiquement le même sujet que le
  `feature` (W19 : Moltbook/Crustafarianism dans les deux ; W26 : AEO/treize mots
  dans les deux ; W27 : Shopify/0DIN dans les deux). Voir `lede`.
- **Coût éditorial** : élevé (1 grand sujet/semaine) mais justifié : c'est
  l'identité du journal.
- **Verdict** : **GARDER**. Non négociable.

### `lede` — RÉDUIRE

- **Présence** : 7/7. **Poids** : 337 mots, 12,1 %.
- **Valeur ajoutée** : introduit le numéro (kicker, headline, dek, figure,
  byline, body). La `figure` (ratio, ex. « 72 h → une religion » en W19) est
  unique et visuellement utile.
- **Redondance** : forte avec `feature`. Dans 5/7 éditions, le `lede` porte le
  même sujet que le `feature` :
  - W19 : Moltbook/Crustafarianism (lede + feature).
  - W26 : AEO / « treize mots » (lede + feature).
  - W27 : commerce agentique / 0DIN (lede + feature).
  - W23 : commerce & gouvernance (lede + feature même angle).
- Le `body` du lede (200-250 mots) reprend souvent, en plus court, l'argument
  du feature. C'est un résumé avant l'article, pas une information distincte.
- **Coût** : modéré, mais mobilise l'angle le plus fort du numéro pour un simple
  chapeau.
- **Verdict** : **RÉDUIRE**. Soit transformer en vitrine pure (kicker + headline
  + figure, sans `body` redondant — économie ~200 mots/semaine), soit diverger
  systématiquement le sujet du lede de celui du feature. Aujourd'hui le lede
  cannibalise le feature.

### `headlines` — RÉDUIRE

- **Présence** : 7/7. **Poids** : 374 mots, 13,1 % (en croissance : 292 en W20,
  548 en W27 — la section gonfle).
- **Valeur ajoutée** : 3 à 4 « headlines » taguées (▦ Phénomène, ▦ Sécurité,
  ▦ Travail…) avec titre court + corps de 60-90 mots. Format « mini-dépêches ».
- **Redondance** : très forte avec `breves`, `wire`, `ticker` et parfois `lede`.
  En W27, les 4 headlines sont : « Navy running shorts / agent est le client »
  (= ticker Shopify + wire Agentic storefronts), « Trois indirections et un shell »
  (= ticker 0DIN + wire Clean repo + feature), « Les agents ont un coût enfin
  visible » (= ticker Guild + wire Guild + breves Guild), « OpenClaw apprend à
  parler vite » (= ticker OpenClaw + wire OpenClaw + breves OpenClaw). Donc
  chaque headline = une recoupe d'un fait déjà présent ailleurs.
- **Coût éditorial** : 4 items à rédiger, alors que la matière est déjà dans
  ticker/wire/breves.
- **Verdict** : **RÉDUIRE** à 2 headlines maximum, ou supprimer le `body` (ne
  garder que `tag` + `title_html` + `meta` comme accroches visuelles). Le coût
  rédactionnel est injustifié au regard du chevauchement.

### `carnet` — GARDER

- **Présence** : 7/7. **Poids** : 326 mots, 11,4 % (en croissance : 189 en W19,
  491 en W26, 435 en W27).
- **Valeur ajoutée** : la seule section « personnes ». Profiles de 2 à 5
  figures publiques (Matt Schlicht, Alex Liteplo, Patricia Tani, Jesse Genet,
  carnage4life…). Format name + initials + tagline + body.
- **Redondance** : faible. Les figures apparaissent dans feature/breves, mais
  le carnet apporte l'angle biographique et l'attribution — pas la même info.
- **Coût** : modéré, mais croît (4-5 personnes/édition récemment).
- **Verdict** : **GARDER**. Section différenciante, alignée avec la doctrine
  « réel, sourcé ». Plafonner à 3-4 personnes pour éviter la dispersion.

### `breves` — COUPER (fusionner dans `wire`)

- **Présence** : 7/7. **Poids** : 245 mots, 8,6 %.
- **Valeur ajoutée** : 4 à 6 brèves (time + title + body). Aucune info qui ne
  soit pas déjà dans `wire` ou `ticker`.
- **Redondance** : **massive, quasi-totale avec `wire`**. Comparaison W27 :
  - Wire « Agentic storefronts (Shopify) » ≡ Breves « Guild ouvre le tableau de bord » (même fil commerce agentique, le wire cite même Shopify).
  - Wire « Clean repo, agent compromis » ≡ Breves « Miasma touche 73 dépôts » (même fil sécurité).
  - Wire « OpenClaw 2026.6.10 » ≡ Breves « OpenClaw 2026.6.10 en stable » (item identique).
  - Wire « Guild Insights Dashboard » ≡ Breves « Guild ouvre le tableau de bord Insights » (identique).
- W26 : wire « AI ID codes » ≡ breves « L'Estonie annonce des AI ID codes » (identique) ; wire « ARD » ≡ breves « Google publie la spec ARD » (identique).
- En substance, `wire` et `breves` racontent les mêmes 4-6 faits, l'un avec
  `source`+`ts` et l'autre avec `time`+`title`+`body`. La version `wire` est
  plus compacte et mieux sourcée.
- **Coût** : 4-6 items rédigés en double.
- **Verdict** : **COUPER**. Fusionner dans `wire` (enrichir le wire d'un champ
  `body` court si besoin). Économie : ~245 mots/semaine de duplication.

### `tribune` — GARDER

- **Présence** : 7/7. **Poids** : 225 mots, 8,0 %.
- **Valeur ajoutée** : édito signé « La rédaction ». Voix argumentative, prise
  de position.
  - Ex. W19 : « Avant de demander si les agents pensent, demandons qui parle. »
  - Ex. W27 : « Un agent ne se gouverne pas avec un fichier texte. »
- **Redondance** : nulle. C'est le seul endroit où la rédaction prend position
  plutôt que de constater.
- **Coût** : 1 texte court, coût modéré.
- **Verdict** : **GARDER**. Voix distincte du journal.

### `wire` — GARDER (comme fusion de `breves`)

- **Présence** : 7/7. **Poids** : 164 mots, 5,9 %.
- **Valeur ajoutée** : dépêches courtes avec `source` (NPR, TechCrunch, Decrypt,
  Tom's Hardware…) et `ts`. Format efficace, sourcé, non redondant *en
  principe* avec `feature`.
- **Redondance** : forte avec `breves` (voir ci-dessus) et partielle avec
  `ticker` (le ticker reprend les wire les plus marquants).
- **Coût** : 5-6 items/semaine, mais plus compacts que les brèves.
- **Verdict** : **GARDER** en absorbant les `breves`. Devient l'unique section
  « dépêches sourcées ».

### `ticker` — COUPER

- **Présence** : 7/7. **Poids** : 79 mots, 2,9 %.
- **Valeur ajoutée** : 5-7 lignes « bandes-annonce » d'une phrase chacune. Aucune
  info, aucune source, juste une accroche.
- **Redondance** : **quasi-totale avec `wire`**. Comparaison W27 :
  - Ticker « Shopify : agentic storefronts… » ≡ Wire « Agentic storefronts (Shopify) »
  - Ticker « 0DIN : repo GitHub propre peut amener Claude Code à exécuter un reverse shell » ≡ Wire « Clean repo, agent compromis »
  - Ticker « OpenClaw 2026.6.10 stable » ≡ Wire « OpenClaw 2026.6.10 »
  - Ticker « $MOLT ~632 k$ » ≡ (présent dans breves W27)
  W26 : ticker « $MOLT ~850 k$ » ≡ breves « $MOLT autour de 850 k$ » ; ticker
  « Google ARD » ≡ wire « Agentic Resource Discovery » ; ticker « OpenClaw
  2026.6.9 » ≡ wire « OpenClaw 2026.6.9 » ; ticker « Estonie AI ID codes » ≡
  wire « AI ID codes pour agents ».
- Chaque entrée du ticker est déjà dans le wire de la même édition, mot pour
  mot dans le même ordre. Le ticker n'ajoute rien sauf une typographie.
- **Coût** : 5-7 items, faible, mais 100 % dupliqué.
- **Verdict** : **COUPER**. La fonction « bandeau » peut être rendue par les
  premières lignes du wire.

### `market` — COUPER

- **Présence** : 7/7. **Poids** : 75 mots, 2,6 % (la plus petite section vivante).
- **Valeur ajoutée** : tableau « Chiffres vérifiés » : une ligne de ticker
  financier (ex. `MOLT +7 000 %`) + 2 « boards » type tableau blanc
  (ex. W19 : « 72 h / pour faire émerger une religion », « 48/315 / papiers IA
  acceptés »). Présenté comme « chiffres vérifiés ».
- **Redondance** : forte. Les chiffres sont déjà cités dans lede/feature/ticker
  ($MOLT +7 000 % en W19 est dans lede, feature, ticker, headlines).
- **Coût** : gadget typographique plus que section éditoriale. Pas de structure
  récurrente (souvent 1 row + 2 boards arbitraires).
- **Verdict** : **COUPER**. Si l'on veut garder un « chiffre de la semaine »,
  l'intégrer à la `figure` du lede, qui existe déjà à cet effet (et qui le fait
  mieux : légende sourcée, ratio visuel).

### `retrospective` — COUPER

- **Présence** : **0/7**. La section n'existe dans aucune édition. Mentionnée
  dans la liste des sections possibles, mais jamais implémentée.
- **Verdict** : **COUPER** du schéma (clé fantôme). On ne supprime rien de
  vivant ; on nettoie le contrat de données.

### `bestiaire` — COUPER

- **Présence** : 2/7 (W19, W22 uniquement). Abandonné depuis.
- **Poids** : 187 mots quand présent, 6,9 %.
- **Valeur ajoutée** : « inventaire factuel des plateformes » au format
  bestiaire (glyph, name, latin, description, specs). Belle idée visuelle mais
  conceptuellement proche d'un `carnet` de plateformes plutôt que de personnes.
- **Redondance** : avec `carnet` (people) et `feature` (plateformes déjà
  décrites).
- **Coût** : rédactionnellement lourd (4 « créatures » en W19, chacune avec
  specs), et la rédaction elle-même a voté avec ses pieds en l'abandonnant
  après W22.
- **Verdict** : **COUPER**. Expérience tentée, non reconduite — officialiser
  l'abandon.

### Placeholders vides — COUPER

`bot_posts`, `interview`, `gibberlink`, `enquete` sont présents comme clés
`null` dans toutes les éditions. `enquete` est un alias mort de `feature` (le
`feature` porte parfois `kicker_fr: "ENQUÊTE · …"`). Aucune n'a jamais été
remplie. **COUPER** du schéma pour réduire la surface de contrat.

---

## Recommandation finale

### À couper (5 suppressions nettes)
1. **`ticker`** — doublon total de `wire`.
2. **`market`** — gadget redondant avec `figure` du lede.
3. **`breves`** — doublon de `wire` (fusionner).
4. **`bestiaire`** — abandonné de fait depuis W22.
5. **Placeholders** : `retrospective`, `enquete`, `bot_posts`, `interview`,
   `gibberlink` — clés mortes à retirer du schéma.

Économie estimée : ~400 mots/édition en duplication pure + nettoyage du contrat
JSON.

### À réduire
1. **`headlines`** : plafonner à 2 items, ou supprimer le `body` (ne garder que
   `tag` + `title_html` + `meta` comme accroches visuelles).
2. **`lede`** : soit alléger le `body` (économie ~200 mots), soit diverger
   systématiquement le sujet du lede de celui du feature (sinon le lede
   cannibalise le feature).

### À garder
- **`feature`** (cœur), **`carnet`** (volet humain), **`tribune`** (voix), **`wire`**
  (dépêches sourcées, fusionné avec `breves`).

### Schéma cible proposé

```
_meta · lede · headlines(≤2) · wire · carnet · feature · tribune
```

7 sections vivantes au lieu de 10 + 5 placeholders. ~2 400 mots/édition au lieu
de ~2 780, à valeur éditoriale égale voire supérieure (moins de cannibalisation
du feature).

---

## Nuances et désaccords avec les évidences

- **`ticker` comme bandeau visuel** : il sert peut-être un rôle typographique
  dans le rendu HTML (bandeau défilant en haut de page). À confirmer avec
  `render.mjs`/le template avant suppression pure — si la maquette attend un
  ticker, on peut le régénérer automatiquement à partir des 3 premiers items du
  `wire` plutôt que de le rédiger à la main.
- **`market`** : sa suppression est claire sur le plan éditorial, mais si le
  « chiffre vérifié » est un marqueur de doctrine (« tout réel, sourcé »),
  sa disparition doit être compensée en renforçant la `figure` du lede.
- **`lede` vs `feature`** : je recommande la divergence systématique, mais une
  alternative légitime est l'inverse — faire du `lede` un *teaser* explicite
  du `feature` (chapeau d'article), auquel cas il faut assumer la redondance
  comme un choix éditorial et non la compter comme un défaut.
- **`headlines` vs `wire`** : la frontière est floue. Si l'on supprime les
  `breves` et le `ticker`, le `wire` prend naturellement le rôle de
  « dépêches brèves » et les `headlines` deviennent redondantes. Une option
  plus radicale serait de **couper aussi `headlines`** et de garder uniquement
  `wire` (court, sourcé) + `feature` (long). Je ne le recommande pas : les
  `headlines` apportent une *mise en récit* (titres éditoriaux avec emphase
  `<em>`) que le `wire` factuel n'a pas. Mais la frontière est fine.
- **`carnet` en croissance** : passé de 189 mots (W19) à 435-491 mots (W26-W27).
  La croissance est justifiée par la doctrine « réel nommé », mais à 5
  personnes/édition, le carnet commence à concurrencer le `feature` en densité.
  À surveiller.
