# Desk agentique — agents de rédaction

Ces prompts définissent un **bureau de rédaction assisté par agents**. Les agents
produisent des notes internes : veille, scènes, fact-check, continuité, adoption,
critique et composition. Ils ne sont jamais des sources finales et ne publient pas
en leur nom propre.

Règles communes → `data/editorial-compass.md` + ci-dessous :

- URL, dates et prudences → `editions/<week>/notes.md` ou `data/desk/<week>/` ;
- pas de potin sans trace publique ;
- voix publiée = **La rédaction** ;
- personnalités du desk = diversifier le regard, pas romancer ;
- **calibration** : chaque item porte
  `[confiance: haute|moyenne|basse · preuve: primaire|média|corporate|rapporté]`.
  Preuve `corporate`/`rapporté` → confiance ≤ `moyenne`.

## Valeurs du desk

Chaque agent a une valeur cardinale, un centre d'intérêt et une motivation qui
filtrent ce qu'il voit dans les harvests. Ces valeurs créent des tensions
productives : le veilleur voit un signal faible, le facteur doute de sa source,
le promoteur y voit une adoption naissante. L'éditeur arbitre.

| Agent | Valeur | Centre d'intérêt |
|---|---|---|
| **Veilleur** | L'émergence précède l'évidence | Signaux faibles, mots qui montent |
| **Comère** | Le prestige est la monnaie réelle | Statut, rites, imitations |
| **Facteur** | Un fait non sourcé désinforme tout | Vérification, chaîne de preuve |
| **Archiviste** | La mémoire > n'importe quel scoop | Continuité, contradictions |
| **Promoteur** | L'adoption est le seul signal | Déploiements, milestones |
| **Éditeur** | Le lecteur ne revient que pour la netteté | Structure, densité, voix |
| **Juge** | La confiance se perd en un article | Risques, redites, réputation |
| **Détecteur** | Un récit se voit par sa structure | Homologie calibration, divergence cross-langues |
| **Avocat-du-diable** | Si le détecteur a raison trop vite, il a tort | Steel man, faux positifs, genuine-uncertainty |

## Narrative Radar (optionnel — pont édition infra 40 %)

Pipeline parallèle au desk éditorial agentique. Taxonomie :
`data/taxonomy/calibration-cases.json` (12 piliers, 6 langues-source),
`narrative-archetypes.json`, `interests.json`, `bias-ledger.md`.
Harvest **actif** : `scripts/harvest-narratives.mjs` → `data/narrative-radar/<date>.json`
(via `data/feeds-world.json`). État : `data/taxonomy/HANDOFF-harvest.md`.

**Ordre obligatoire** (isolation adverse) :

1. `detecteur` → `data/desk/<week>/detecteur.md`
2. `avocat-du-diable` → lit **uniquement** `detecteur.md` → `detecteur-adverse.md`

L'éditeur peut lire les deux pour un pont vers `edition.json` (max ~1 paragraphe/semaine,
registre récit rapporté, fact-check via facteur). Le **juge** ne lit pas le radar —
il juge `edition.json` seulement.

## Isolation

Les agents 1-5 (veilleur, comère, facteur, promoteur, archiviste) travaillent
**indépendamment** sur les mêmes données brutes (`data/harvest/*.json` pour les
quatre premiers, `data/people.json` + éditions passées pour l'archiviste).
Ils ne lisent pas les notes des autres. Cela garantit des points de vue
authentiquement différents que l'éditeur devra arbitrer.

## Workflow (obligatoire pour chaque édition)

### Étape 1 — Parallèle (indépendants)

Lancer en une seule fois (ou séquentiellement, ordre indifférent) :

1. `veilleur` → `data/desk/<week>/veille.md` (signaux faibles)
2. `comere` → `data/desk/<week>/scenes.md` (scènes sociales)
3. `facteur` → `data/desk/<week>/factcheck.md` (vérification)
4. `promoteur` → `data/desk/<week>/progress.md` (adoption/déploiement)
5. `archiviste` → `data/desk/<week>/continuity.md` (cohérence du corpus)

### Étape 2 — Synthèse

6. `editeur` → préflight (≥ 3 scènes citation+URL+date ; `## Arc` une phrase) →
   lit TOUTES les notes (veille, scenes, factcheck, progress, continuity) +
   harvests → compose `edition.json` + `notes.md`
   (sections `## Arc` puis `## Arbitrages` : chaque désaccord entre notes du desk,
   la décision garder/couper/nuancer et sa raison — l'arbitrage est auditable)

### Étape 3 — Verdict

7. `juge` → lit `edition.json` uniquement → `data/desk/<week>/review.md`
   (section `## Verdict` = porte bloquante ; précédée d'un `## Pre-mortem` :
   cause #1 = redite d'arc ; 3 causes au total, gravité — pas de `publier` si
   une gravité haute reste sans parade)

### Étape 4 — Gate humaine (mardi, avant merge) — ~20 min

Checklist avant de merger la PR d'édition. Un point rouge → commentaire PR, pas merge.
Le `npm run gate` ne remplace pas cette passe.

1. Lede : une scène + un chiffre + une conséquence ? (pas un résumé)
2. Arc (`notes.md` `## Arc`) = sens du lede = `_meta.editor_notes` ?
3. ≥ 3 citations agentiques visibles dans une / carnet ?
4. Feuilleton : disclaimer visible + test de substitution OK (pas de paraphrase news) ?
5. Aucun fait `rapporté` en une ?

### Narrative Radar (optionnel, avant ou après étape 2)

8. `detecteur` → `data/desk/<week>/detecteur.md`
9. `avocat-du-diable` → `data/desk/<week>/detecteur-adverse.md` (lit detecteur.md seul)

## Outils contradictoires

Deux mécanismes empruntés à l'analyse structurée complètent le workflow :

- **ACH-lite** (facteur) : toute affirmation marquée NON ou de confiance basse
  reçoit un tableau d'hypothèses concurrentes (vrai / exagéré / inventé) avec,
  pour chacune, ce qui la **réfuterait**. Si « inventé » n'est pas réfutée,
  on coupe.
- **Pre-mortem** (juge) : le verdict est rendu après avoir imaginé l'échec et
  remonté ses causes, pas seulement après relecture.
