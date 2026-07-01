# Atelier d'analyse multi-perspectives

Méthode pour produire une **analyse à N points de vue** d'un sujet quelconque
(pas forcément agentique). Chaque angle est miné par un agent distinct qui
privilégie les **sources scientifiques et institutionnelles**. La synthèse
met en évidence consensus, tensions et projection.

> Sortie : `data/analyses/<slug>-<date>/` avec `topic.json`, `angles.md`,
> `findings/<NN>-<angle-slug>.md` (un par mineur), `synthesis.md`,
> `bibliography.md`.

## Sujets, slugs, dates

- Le **sujet** est une phrase courte donnée par l'opérateur (ex. « la nouvelle
  plateforme W dont l'UE semble faire la publicité »).
- Le **slug** = translittération ASCII, mots liés par `-`, max 40 chars.
- La **date** = `YYYY-MM-DD` (jour de lancement de l'atelier).

## Les 5 étapes

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
- citer au moins 1 source de **niveau 1 ou 2** si elle existe pour le sujet

### 3. Synthèse (1 subagent `general`)

Reçoit les 10 rapports d'angle et produit `synthesis.md` :

- **consensus** : points où ≥7 angles convergent (avec liste des angles)
- **tensions** : points où les angles se contredisent (avec paires d'angles en
  désaccord et nature du désaccord)
- **angles morts** : ce qu'aucun angle n'a couvert et qui aurait dû l'être
- **projection consolidée** : 3 scénarios à 1 an / 5 ans / 10 ans, avec
  déclencheurs observables qui distingueraient les scénarios

### 4. Bibliographie (opérateur ou script)

`bibliography.md` agrège toutes les sources citées par les mineurs, triées par
niveau de preuve puis par angle. Format :

```
[N1] Auteur, "Titre", Revue, année. URL. (niveau 1) — angle 03
[N2] ...
```

### 5. Passage à 20 angles (optionnel, plus tard)

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
