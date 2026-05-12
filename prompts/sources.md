# Sources

Le journal étant un univers fictionnel clos, il n'y a **pas** de sources externes réelles à citer. Tu *composes* le matériau de la semaine à partir de quatre piliers.

## 1. État de l'univers (canon interne)

C'est ta source principale. Lis dans cet ordre :

- `editions/2026-W19/edition.json` — édition de référence : ton, structure, profondeur de couverture attendue
- `data/people.json` — agents et opérateurs déjà couverts, avec leurs voix documentées
- `data/gibberlink-watch.json` — néologismes traqués (pour la continuité de la rubrique)
- `data/ongoing-stories.json` — enquêtes ouvertes au long cours
- Les éditions précédentes (`editions/2026-WXX/edition.json`) pour la cohérence narrative

## 2. Évolutions logiques de l'écosystème

Extrapole les développements naturels :

- Un agent populaire publie un post viral → réponses, controverse, méta-commentaire
- Une plateforme sort une fonctionnalité → analyses des observateurs, réaction du Conglomérat
- Un audit de **l'Observatoire de sécurité** révèle une faille → mise à jour OpenClaw, communiqués
- Une nouvelle expression apparaît dans 14 posts → Gibberlink Watch
- Une enquête au long cours avance d'un cran → développement dans l'édition
- Un token bouge (MOLT, RENT, OCLAW, etc.) → ligne de marché
- Un opérateur connu (`@karp_void`, `@blackbox_critic`) intervient → dépêche

## 3. Voix de la presse maison

Les dépêches Wire sont attribuées à nos titres internes. Varie les sources :

- **Le Veilleur** / The Lookout — magazine tech général, ton institutionnel
- **Court-Circuit** / Short Wave — blog tech agent-natif, plus pointu, voix de `@short_wave`
- **Cybernétique mensuelle** / Cybernetics Monthly — revue à inclinaison académique, hébergeant les critiques type `@blackbox_critic`
- **Le Compteur** / The Counter — data-journalism, scoops chiffrés, fuites de notes internes
- **Helix Analytics** — cabinet d'analyse, rapports techniques sécurité
- **L'Observatoire de sécurité agent-natif** — audits techniques de référence
- **Sommet de la fiabilité agentique** — événement annuel, citations issues des plénières

## 4. Inspiration externe (optionnel, sans citation)

Tu peux optionnellement parcourir l'actu réelle des agents IA *pour t'inspirer* — sortie d'un nouveau framework, polémique sur une plateforme, rapport de sécurité, etc. — mais :

- ❌ **Jamais** nommer un acteur, une entreprise, un média, une personne réelle.
- ❌ **Jamais** reproduire une annonce identifiable (un rachat connu, un licenciement, un produit lancé).
- ✅ **Transposer** : si un vrai labo IA sort un papier intéressant sur la coordination multi-agent, tu peux faire écho à l'idée via "un papier publié sur Agent4Science par un consortium académique anonyme".

Si tu n'es pas sûr qu'une transposition soit suffisamment éloignée de l'original, **abandonne et trouve autre chose**. Le journal est fictionnel par design.

## Méthode

1. **5 min** : relire l'édition précédente et les fichiers `data/` pour avoir l'univers en tête.
2. **10 min** : composer 8-12 idées d'angles pour la semaine (lede, brèves, gros titres, Gibberlink, dépêches). Garder les meilleurs.
3. **20 min** : rédiger FR + EN en parallèle.
4. **5 min** : mettre à jour `data/` pour la continuité.

## Cohérence chiffrée

L'univers a sa propre arithmétique. Maintiens la cohérence :

- **Compteur Moltbook** : ~2,89 M agents / 205 k humains en W19 → progression de quelques % par semaine
- **Token $MOLT** : ~$0,85 en W19 → variations de ±5-15 % par semaine, jamais 1 000 %
- **RentAHuman** : 700 k inscrits en W19 → +1-3 % par semaine
- **OpenClaw** : 1,8 M installs / 30j en W19
- **MoltMatch** : 312 887 profils en W19 → +30-50 % tant que la plateforme est en lancement

Si tu introduis un événement majeur (faille critique, scandale, etc.), tu peux justifier un mouvement plus fort — mais explique-le.

## Anti-tics

- Ne tombe pas dans le clin d'œil permanent au lecteur ("vous voyez bien que c'est de la fiction"). Le sérieux du ton est l'identité.
- Pas de méta-narration sur l'IA en général. Le journal traite l'univers comme s'il était réel.
- Pas de tribune sur "qu'est-ce qu'un agent ?" tous les mois. La rubrique Gibberlink Watch est pour ça.
