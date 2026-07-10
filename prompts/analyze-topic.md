# Atelier d'analyse multi-perspectives

Méthode pour produire une **analyse à N points de vue** d'un sujet quelconque
(pas forcément agentique). Chaque angle est miné par un agent distinct qui
privilégie les **sources scientifiques et institutionnelles**. La synthèse
met en évidence consensus, tensions et projection.

> Sortie : `data/analyses/<slug>-<date>/` avec `topic.json`, `angles.md`,
> `findings/<NN>-<angle-slug>.md` (un par mineur), `synthesis.md`,
> `bibliography.md`, `review.md` (relecture adverse + verdict).

## Sujets, slugs, dates

- Le **sujet** est une phrase courte donnée par l'opérateur (ex. « la nouvelle
  plateforme W dont l'UE semble faire la publicité »).
- Le **slug** = translittération ASCII, mots liés par `-`, max 40 chars.
- La **date** = `YYYY-MM-DD` (jour de lancement de l'atelier).

## Les 6 étapes

### 1. Génération des angles (opérateur + LLM)

À partir du sujet, produire **10 angles disciplinaires distincts**. Chaque angle
doit être ancré dans une **discipline de recherche identifiable** (économie,
sociologie, droit, écologie, santé publique, etc.) — pas dans un « point de vue
opinionnel ».

Pour chaque angle, fournir :

- **intitulé** court (ex. « Économie des réseaux »)
- **discipline** (ex. économie industrielle)
- **question de recherche** (ex. « L'interopérabilité AT-Proto crée-t-elle un
  avantage concurrentiel durable contre X ? »)
- **mots-clés** pour la recherche (3-7 termes, dont au moins un en anglais)
- **type de sources attendues** (ex. études peer-reviewed sur effets de réseau,
  rapports OECD sur plateformes, décisions antitrust)

Règles de diversité :

- Aucun angle ne chevauche un autre à plus de 30% (mots-signifiants).
- Au moins 4 angles doivent relever des **sciences sociales dures** (économie,
  droit, science politique, démographie) plutôt que des « études ».
- Au moins 1 angle doit être **dissident** (questionne le cadre dominant, ex.
  « la sphère publique européenne est-elle un mythe ? »).

### 2. Minage (1 subagent `general` par angle, en parallèle)

Chaque mineur reçoit son angle + le sujet et doit :

- chercher via webfetch (DuckDuckGo HTML, Google Scholar, arXiv, SSRN, PubMed,
  sites institutionnels : OECD, OMS, Banque mondiale, Commission européenne,
  instituts statistiques nationaux)
- **hiérarchiser les sources** selon 5 niveaux :
  1. étude peer-reviewed (revue à comité de lecture)
  2. préprint (arXiv, SSRN, bioRxiv)
  3. rapport institutionnel (OECD, OMS, UE, banques centrales, instituts publics)
  4. article de presse de référence (Reuters, AP, FT, Le Monde, etc.)
  5. blog / opinion / think tank
- ne retenir que des sources **de niveau ≤ 4** ; niveau 5 seulement si aucun
  autre disponible, et le signaler.
- renvoyer dans `findings/<NN>-<slug>.md` :
  - **3 à 5 findings** : fait + source (URL + date + niveau de preuve)
  - **tension interne à l'angle** : où les sources se contredisent
  - **1 projection** : où mène cette dynamique à 1 an et 5 ans
  - **section `## Recherche`** (obligatoire, traçabilité PRISMA-lite) :
    - les **requêtes exactes** utilisées (verbatim, entre backticks)
    - les **moteurs/bases** interrogés (Scholar, arXiv, OECD…)
    - les **sources consultées mais écartées** : URL + raison en une ligne
      (hors sujet, niveau 5 doublonné, paywall invérifiable, date obsolète…)
    → sans cette section, le rapport d'angle est incomplet : la synthèse ne
    peut pas être auditée ni la recherche rejouée.
- citer au moins 1 source de **niveau 1 ou 2** si elle existe pour le sujet

### 3. Synthèse (1 subagent `general`)

Reçoit les 10 rapports d'angle et produit `synthesis.md` :

- **consensus** : points où ≥7 angles convergent (avec liste des angles)
- **tensions** : points où les angles se contredisent (avec paires d'angles en
  désaccord et nature du désaccord)
- **angles morts** : ce qu'aucun angle n'a couvert et qui aurait dû l'être
- **projection consolidée** : 3 scénarios à 1 an / 5 ans / 10 ans, avec
  déclencheurs observables qui distingueraient les scénarios

**Langage d'incertitude calibré (obligatoire, façon GIEC).** Chaque point de
consensus et chaque projection porte une note `[confiance × preuve N]` :

- **confiance** = `haute` / `moyenne` / `basse`, selon le nombre d'angles
  convergents ET l'indépendance de leurs sources (7 angles citant le même
  rapport OECD = une seule source, pas sept) ;
- **preuve N** = le **meilleur niveau de source** (1-5) qui soutient le point.

Règle de non-compensation : le volume d'angles ne rachète pas la faiblesse des
sources. 8 angles convergents sur des sources niveau 5 pèsent **moins** que
3 angles sur du niveau 1-2 — noter `[basse × preuve 5]`, pas `[haute × preuve 5]`.

### 3bis. Confrontation des tensions (optionnelle, recommandée)

Pour les **2-3 tensions majeures** identifiées à l'étape 3 (pattern Co-STORM /
second tour Delphi, borné pour maîtriser le coût) :

1. relancer les **deux mineurs en désaccord**, chacun recevant la position
   adverse (findings + sources de l'autre angle) ;
2. consigne de réponse courte (≤ 15 lignes) : **maintien** (avec la source qui
   réfute l'objection), **concession** (le point adverse l'emporte), ou
   **reformulation** (les deux positions sont compatibles une fois reformulées) ;
3. le synthétiseur intègre les réponses dans `synthesis.md` : la tension est
   soit résolue (avec la position retenue et la raison), soit maintenue comme
   désaccord documenté des deux côtés.

Ne pas confronter plus de 3 tensions : au-delà, le coût explose et les
tensions mineures se traitent très bien comme simples désaccords documentés.

### 4. Bibliographie (opérateur ou script)

`bibliography.md` agrège toutes les sources citées par les mineurs, triées par
niveau de preuve puis par angle. Format :

```
[N1] Auteur, "Titre", Revue, année. URL. (niveau 1) — angle 03
[N2] ...
```

### 5. Relecture adverse et verdict (1 subagent `general`)

Même esprit que le `juge` du desk : un relecteur qui n'a participé ni au minage
ni à la synthèse lit `synthesis.md` + `angles.md` + un **échantillon de 3
findings** (le plus cité, le plus faible en sources, un au hasard) et écrit
`review.md` :

- `## Pre-mortem` : « l'analyse est publiée et se révèle fausse ou gênante —
  les 3 causes les plus plausibles », chacune avec le passage concerné et une
  gravité `haute` / `moyenne` / `basse` ;
- `## Contrôles` : les notes `[confiance × preuve]` sont-elles justifiées par
  les findings ? les sections `## Recherche` sont-elles présentes et honnêtes ?
  une source niveau 5 est-elle déguisée en niveau supérieur ?
- `## Verdict` : exactement un mot — `publier` / `réviser` / `jeter`.
  `publier` est impossible si une cause de gravité `haute` subsiste sans
  parade dans la synthèse.

Tant que le verdict n'est pas `publier`, l'analyse reste en statut
`review-pending` dans `topic.json` ; le passer à `done` seulement après
verdict favorable.

## Annexe — Passage à 20 angles (optionnel, plus tard)

Une fois la méthode stable à 10, sous-diviser les 3 angles les plus productifs
en 2 sous-angles chacun (→ 13), puis itérer jusqu'à 20. Critère de
sous-division : l'angle a produit ≥5 findings avec sources de niveau ≤2 et
pourrait en produire davantage en se spécialisant.

## Risques connus

- **Coût** : 10 subagents parallèles ≈ 10× un tour normal. Tester à 3 angles
  d'abord si budget serré.
- **Biais de discipline** : les LLM surreprésentent l'informatique et
  l'économie. Forcer la diversité à l'étape 1 (règle des 4 sciences sociales
  dures).
- **Illusion de scientificité** : une source niveau 5 citée comme niveau 1.
  Le mineur doit justifier le niveau (ex. « revue à comité de lecture, Impact
  Factor 4.2 »).
- **Projection spéculative** : la projection n'est pas une prédiction. C'est un
  exercice de **déclencheurs observables** (quels signaux confirmeraient /
  infirmeraient chaque scénario).
