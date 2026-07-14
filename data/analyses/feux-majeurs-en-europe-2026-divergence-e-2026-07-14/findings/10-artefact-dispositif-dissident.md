# 10. Artefact du dispositif (angle dissident)

**Angle** : épistémologie des médias / critique méthodologique. **Question** : les écarts EN/ZH/AR observés par le Narrative Radar reflètent-ils des récits manufacturés divergents, ou surtout le biais Atlantique-centré du harvest RSS et les limites de clustering lexical ?

## Findings

1. **Le bias-ledger interne documente des biais de conception connus du Narrative Radar — pas des biais observés des médias.** Entrées pertinentes : **B02** Atlantique-centrisme malgré six langues-source ; **B07** « RSS ≠ monde » avec `coverage_gap` — pas de conclusion si une langue-pilier manque ; **L01** lexiques EN surreprésentés dans le matching ; **L02** clustering titre seul qui rate les traductions (cluster entités+dates = futur) ; **W01** isolation detecteur/avocat-du-diable ([bias-ledger.md](../../taxonomy/bias-ledger.md), révision 2026-07-13, **N4** interne). La doctrine detecteur rappelle : homologie ≠ mensonge ; tags = cadrages observables ([prompts/desk/detecteur.md](../../../prompts/desk/detecteur.md), **N4** interne).

2. **Le harvest W29 confirme numériquement le déséquilibre EN : 108/180 items (60 %) en anglais, clusters JSON vides, divergence inférée des titres seuls.** Fichier `2026-07-13.json` : `max_items: 180`, répartition `en: 108`, `"clusters": []` — la structure narrative est **inférée** post-hoc, pas produite par un algorithme de clustering robuste ([detecteur.md W29, §Limites](../../desk/2026-W29/detecteur.md), **N4** interne). Le detecteur écrit explicitement : « Très peu de croisements AR/ZH/PT sur les mêmes événements que les items EN hors (feux, Ormuz) : difficile de mesurer divergence systématique » et « L01/L02 : sans clustering entités+dates, la divergence multi-langue est sous-estimée et dépend de coïncidences de titres » (**N4** interne).

3. **La littérature sur les corpus/agrégateurs de presse montre un biais géographique et linguistique structurel — compatible avec une fausse divergence EN vs ZH.** Analyse de Google News : **73,24 %** des sources américaines ; USA+UK+Canada+Australie+Inde = **91,95 %** des sources ; seulement **2,69 %** depuis 65 autres pays ([Vaughan & Mike, *Information Research*, 2006](https://informationr.net/ir/11-1/paper233.html), **N1**). Étude comparative Yahoo!/Google News : couverture « hautement concentrée et volatile », perspective occidentale via agences ([Wu et al., *International Communication Gazette*, DOI 10.1177/1748048512465546](https://doi.org/10.1177/1748048512465546), **N1**). Recherche récente sur agrégation « bias-aware » : systèmes focalisés sur l'anglais **ratent** une large part de l'information publiée dans les langues nationales (France, Allemagne, etc.) ([Helm et al., matrix-based news aggregation, PDF](https://d-nb.info/1236545370/34), **N2**).

4. **Sur le cluster feux juillet 2026, les écarts observables sont explicables par genre éditorial et sélection de flux, sans postuler une manufacture narrative.** BBC/Guardian : headlines personnalisés ou mobilisation aérienne ; El País : live + témoignage ; 中国新闻网 : dépêche bilan « 13人死亡 » ; Al Jazeera Arabic : titre composite Paris + Espagne ([harvest 2026-07-13](../../narrative-radar/2026-07-13.json)). L'avocat-du-diable W29 : « redirect-attention via live/direct » = **format**, pas manipulation ; « climate emergency » possiblement descriptif ([detecteur-adverse.md](../../desk/2026-W29/detecteur-adverse.md)). L'angle 08 (Tuchman, live blogs) et l'angle 07 (personnalisation) fournissent des mécanismes alternatifs **non idéologiques** à l'écart EN/ZH.

5. **Ce que le dispositif peut et ne peut pas conclure — check-list adverse du bias-ledger.** Peut : signaler homologie faible avec `climate-delay` (score 0,25), lister dimensions observables (attribution, personnalisation), exiger ≥2 intérêts concurrents ([bias-ledger, checklist §1-6](../../taxonomy/bias-ledger.md)). Ne peut pas : prouver « urgence climatique manufacturée » à partir des seuls titres RSS ; garantir représentativité ZH/AR si flux pilier absents ou non jumelables ; distinguer biais de langue (L03 sortie FR/EN desk ≠ neutralité) du biais de **sampling**. **Non trouvé** : audit quantitatif du Narrative Radar comparé à un corpus ground-truth multilingue sur Los Gallardos (Factiva, GDELT, ou crawl élargi) — nécessaire pour trancher artefact vs divergence réelle.

## Tension interne

L'angle dissident ne nie pas les différences de titres — il conteste leur **interprétation causal**. Le detecteur a tagué `existential-threat` / `create-permanent-emergency` sur BBC, Guardian, ZH et AR : si le même archétype apparaît **des deux côtés** de la prétendue fracture EN/climat vs ZH/institutionnel, la divergence est mal calibrée. Restent de vrais écarts lexicaux (personnalisation EN/ES, bilans ZH/AR) — mais ceux-ci sont prédits par B07+L02+genre éditorial (angle 08) sans recourir à `manufacture-doubt` ou `climate-delay`. Risque inverse (B01) : forcer un récit « stall industriel » sur une catastrophe événementielle — le detecteur W29 a utilisé `ozone-montreal-success` comme contre-modèle. L'angle 10 ne dit pas « tout est artefact » : il dit que **l'amplitude interprétative dépasse la preuve** du harvest actuel, surtout avec `clusters: []` et 60 % EN.

## Projection

**À 1 an.** Déclencheurs : (a) mise en production du harvester `scripts/harvest-narratives.mjs` avec clustering entités+dates (HANDOFF-harvest.md) — si les écarts EN/ZH **rétrécissent** après clustering, confirmation artefact L02 ; (b) extension quota hors-EN (mitigation B02) — nouvelle mesure de divergence ; (c) publication desk avec section « Angles morts » remplie sur AR/ZH absents : si persistent, interdiction de conclure « fracture systématique » (B07).

**À 5 ans.** Un Narrative Radar mature devrait publier chaque cluster avec `coverage_gap` chiffré et `interpretive: true` (B08). Sans cela, les ateliers d'analyse reproduiront le risque documenté par Wu (2013) et Vaughan (2006) : **confondre la carte RSS avec le territoire médiatique**. La leçon pour l'édition hebdo : un paragraphe infra (W04) peut mentionner l'hypothèse de divergence **si** le steel man adverse est présent — pas une une accusation de manufacture.

## Recherche

**Moteurs/bases interrogés** : data/taxonomy/bias-ledger.md, prompts/desk/detecteur.md, data/desk/2026-W29/detecteur.md et detecteur-adverse.md, data/narrative-radar/2026-07-13.json, recherche web (Google News bias, corpus representativeness).

**Requêtes exactes (verbatim)** :
- `RSS sampling bias news anglocentric media monitoring`
- `Google News geographic coverage 73 percent American sources Vaughan`
- `Wu western perspective Yahoo Google News International Communication Gazette`
- `bias-aware news aggregation non-English articles Helm matrix`
- `narrative radar false divergence media corpus representativeness`

**Sources consultées mais écartées** :
- https://www.allsides.com/blog/most-news-aggregators-still-biased-left-including-google-apple-bing-allsides-updated-analysis-2026 — audit idéologique US (N5), pertinent sur biais partisan mais pas géo-linguistique EU/feux.
- https://riptide.report/2026/04/22/algorithm-not-neutral-news-aggregator-bias-analysis/ — commentaire journalistique (N5), reprend AllSides sans nouveau corpus.
- https://data/taxonomy/HANDOFF-harvest.md — spec interne (N4), pas résultat empirique.

## Confrontation (étape 3bis) — face aux angles 04 et 07

**Positionnement : limitation méthodologique, pas réfutation du terrain.** L'angle 04 (framing Entman) peut documenter des choix lexicaux réels dans un corpus **représentatif**. Mon apport : avec 108/180 EN, clusters vides et matching titre-seul, on ne dispose pas de ce corpus — les tags `existential-threat` appliqués aussi à ZH/AR suggèrent que le lexique d'urgence n'est pas l'exclusivité d'un bloc « occidental militant ».

**Face à l'angle 07 (personnalisation)** : Jenni/Maier expliquent pourquoi BBC « Briton tells… » **doit** diverger d'un titre bilan — effet psychologique ou genre, indifférenciable sans contenu complet. Je ne conteste pas la personnalisation ; je conteste qu'elle prouve, à elle seule, une stratégie narrative manufacturée **multilingue**.

**Reformulation exacte** : *les divergences mesurées en W29 sont **réelles en surface** (titres différents sur Los Gallardos/Fontainebleau) mais **sous-déterminées** quant à l'intention ; le dispositif actuel sur-estime la portée interprétative (B07, L02) et sous-estime les routines de format (angle 08) et le droit-prévention espagnol hors RSS (angle 09). Hypothèse dissidente tenable : **écart de sampling + écart de genre**, pas preuve de récits manufacturés divergents — jusqu'à harvest enrichi et clustering robuste.*
