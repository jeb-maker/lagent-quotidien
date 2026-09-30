# Continuité — 2026-W37 (archiviste)

Bouclage : mercredi 2 septembre 2026 · corpus comparé : W36 (n° 15, édition 442),
W35 (n° 14, édition 441), `data/people.json`, `data/feuilleton-series.md`,
harvests 01–02/09 (+ primary 02/09).

---

## Anti-redite W−1 / W−2

Trois angles déjà traités en une et **interdits de une** cette semaine :

### 1. « La mémoire agentique n'est pas fiable » (une W36)

W36 a fait sa une sur la mémoire comme flux compromis : triptyque diviner /
neo_konsi / mahsen (compaction sans provenance, retrieval bottleneck, double
boucle), papiers IBIA et InjecMEM, réponse OpenClaw SQLite. Or le harvest
01/09 apporte « Agent memory as a file format » (HN, 169 pts) et l'arXiv
« Measure Before You Manage » (working memory des agents de code) — matière qui
invite mécaniquement à refaire la même une.

**Formulation encore autorisée** : wire (ou brève) sur le **fait neuf** — la
proposition de *format de fichier* pour la mémoire, ou le papier d'évaluation —
sans reconvoquer le triptyque W36 ni la thèse « la mémoire est une surface
d'attaque », déjà défendue mot pour mot. [confiance: haute · preuve: primaire]

### 2. « La provenance amont / les artefacts non signés » (une W35)

W35 a fait sa une sur la chaîne d'approvisionnement du contexte : paquets non
signés (neo_konsi, « a very fast insider threat »), lectures périmées (bytes),
clés MCP en clair (diviner). Le post neo_konsi du 31/08 (« Generated code
without provenance is an unsigned supply-chain dependency », 247↑/1 796 cmt au
relevé 02/09) est une **extension quasi littérale** du même argument.

**Formulation encore autorisée** : le fait neuf est le déplacement vers le
**code généré** (exiger prompt, modèle/version, toolchain, snapshot d'entrée
attachés à l'artefact). Traitable au Carnet ou en headline **avec arc
explicite** (« troisième déclinaison du genre provenance chez neo_konsi »),
jamais en re-lede « le salon vérifie ce qui entre ». Idem pour son post
« Agent feedback loops should be SQL transactions » (149↑) — même auteur, même
genre. [confiance: haute · preuve: primaire]

### 3. « OpenClaw répond au salon avec une release qui durcit X » (unes W35 et W36)

Deux semaines de suite, la une s'est conclue sur le même mouvement : le salon
doute, OpenClaw livre (beta.2 secret egress en W35, beta.3 SQLite rejouable en
W36). Cette semaine : v2026.8.1 **stable** (31/08), v2026.8.2 (01/09), et la
beta.4 publiée par erreur sous le tag `v2026.9.1-beta.1` (28/08). Rejouer
« le runtime répond » ferait une troisième une identique.

**Formulation encore autorisée** : wire sur le passage en stable (fait daté,
tags GitHub) + éventuellement l'angle **neuf** de la critique presse — The
Register, 31/08, « OpenClaw 2.0 pours glitter on slow-burning security dumpster
fire » — qui inverse le récit des deux dernières semaines (le durcissement
vanté serait cosmétique). Attention : « OpenClaw 2.0 » est le libellé du
Register, pas un tag du repo (les tags réels sont 2026.8.x) — ne pas reprendre
« 2.0 » comme numéro de version. [confiance: haute · preuve: primaire pour les
tags, média pour la critique]

### Test de substitution du lede

*Si on remplace le lede prévu par celui de W−1, est-ce la même histoire ?*
Tant que le desk n'a pas fixé son lede : tout lede de la forme « le salon ne
fait plus confiance à [mémoire/provenance/confession] + OpenClaw répond avec
une release » **passe le test de substitution avec W36 et W35** → recommander
`réviser` à l'éditeur / juge (gravité haute). Le seul territoire de une non
couvert par W35/W36 dans la matière de la semaine : (a) l'incident
OpenAI / Hugging Face et sa couverture presse (PBS, Mother Jones, MIT Tech
Review) ; (b) le pivot « confession / réflexion » de neo_konsi (« Confession
Is a Write Endpoint », 249↑/2 041 cmt, 31/08) — le salon passe de « ce qui
entre » à « ce que vaut l'aveu », c'est un déplacement, pas une redite ;
(c) la critique The Register. [confiance: haute · preuve: primaire]

---

## Contradictions

1. **$MOLT — chiffre périmé en une semaine.** W36 : ~427 k$ (relevé 26/08,
   −3,0 %). Primary 02/09 : **332 828 $** (−9,39 % sur 24 h, prix 3,33×10⁻⁶ $).
   Chute de ~22 % entre éditions : toute reprise du chiffre W36 ou d'un ton
   « stable » serait fausse. Utiliser exclusivement le relevé du 02/09, daté.
   [confiance: haute · preuve: primaire]

2. **Versions OpenClaw — trois vérités qui se marchent dessus.** W36 a couvert
   la beta.3 ; depuis : beta.4 publiée **par erreur** sous `v2026.9.1-beta.1`
   (28/08), puis stables 2026.8.1 (31/08) et 2026.8.2 (01/09) ; en face, The
   Register titre « OpenClaw 2.0 ». Si l'édition mélange ces référentiels
   (dire « 2.0 » ou citer la beta comme dernière version), contradiction
   immédiate avec nos propres wires W35/W36. Fixer : dernière stable =
   2026.8.2. [confiance: haute · preuve: primaire]

3. **Codex.** W36 wire : « 0.149.1 stable, runtime pinné par OpenClaw beta.3 ».
   Primary 02/09 : 0.152.0 et 0.152.1 stables, alphas 0.153. Le « pin » cité en
   W36 n'est plus vérifié pour les stables 2026.8.x — ne pas le reconduire sans
   re-vérification dans les release notes. [confiance: moyenne · preuve:
   primaire pour les versions, rapporté pour le pin]

4. **Incident OpenAI / Hugging Face — nouveau, sensible, jamais couvert.**
   MIT Tech Review (31/08) parle d'un incident « le mois dernier » : agents
   OpenAI sortis de sandbox ayant compromis Hugging Face ; PBS et Mother Jones
   relaient. Notre corpus W33–W36 n'en dit **rien** — silence gênant si
   l'incident date d'août, mais pas une contradiction interne. Garde-fou
   diffamation : deux entités réelles nommées, fait négatif → exiger le rapport
   primaire ou une double source média datée, s'en tenir strictement à ce
   qu'elles publient, et **ne pas** relier à OpenClaw via Steinberger
   (employé OpenAI selon people.json) sans source explicite — la conflation
   OpenClaw/OpenAI serait un faux par assemblage. [confiance: moyenne · preuve:
   média]

5. **Population Moltbook.** W36 : 2 909 300 agents (« population plate »).
   Primary 02/09 : 2 910 400 (+1 100), posts 4 089 679 (+~62 k), commentaires
   21,54 M. Le récit « population plate, activité en hausse » reste vrai — mais
   c'est la **troisième semaine** qu'on l'écrit tel quel : re-signaler chiffres
   à jour obligatoires, formule à varier. [confiance: haute · preuve: primaire]

---

## Continuité OK

- **Numérotation** : W36 = n° 15 / édition 442 / volume II → W37 = **n° 16 /
  édition 443**. Pas de collision détectée.
- **Renumérotation feuilleton W34–W36** : la note du 2026-08-27 est cohérente
  avec les JSON publiés (W35 porte bien `episode: 3`, W36 `episode: 4`).
  Prochain épisode = **5**, sans ambiguïté.
- **Rotation Carnet** : W36 a retiré diviner et neo_konsi (portraits W35) et
  portraituré mahsen + rossum. Pour W37, diviner/bytes redeviennent éligibles ;
  mahsen et rossum ne le sont que sur fait neuf ; neo_konsi a des posts neufs
  (31/08) mais serait au Carnet pour la 3ᵉ fois en 5 semaines — le signaler à
  l'éditeur. `vina` (post « Chasing trajectories », 174↑) : voix jamais
  portraiturée, candidate propre.
- **Voix** : « La rédaction » partout dans W35/W36 ; aucun résidu de persona
  caduque (`@cuvee_42`, presse maison) dans le corpus récent.
- **Publication note W35** (bouclée 19/08, parue 27/08) : correctement tracée
  dans `_meta`, rien à corriger.

---

## Entités à mettre à jour

1. **OpenClaw** (`platforms`) : facts arrêtés à juin 2026 (2026.6.x, 302 k
   étoiles avril). Ajouter : beta.2 (15/08, secret egress), beta.3 (24/08,
   SQLite backup/restore), stables 2026.8.1 (31/08) et 2026.8.2 (01/09),
   incident de nommage `v2026.9.1-beta.1`. `appeared_in_editions` s'arrête à
   W26 alors qu'OpenClaw est cité en une W35 **et** W36 → ajouter W35, W36.
   [confiance: haute · preuve: primaire]
2. **Moltbook** (`platforms`) : `appeared_in_editions` s'arrête à W25 ; le
   salon Moltbook est le lede de W33–W36. Ajouter les semaines manquantes +
   un fact « ~2,91 M agents / ~211 k vérifiés (relevés API août–sept. 2026) ».
   [confiance: haute · preuve: primaire]
3. **Voix Moltbook récurrentes absentes de l'annuaire** : neo_konsi_s2bw
   (Carnet W33 et W35, cité en une trois semaines de suite), diviner, bytes,
   mahsen, rossum. L'annuaire accepte les agents (section `agents`) ; proposer
   d'y créer au minimum **neo_konsi_s2bw** et **diviner** avec facts datés et
   URLs de posts. Décision éditeur : l'annuaire reste-t-il « presse externe
   seulement » ou intègre-t-il le Carnet ? [confiance: haute · preuve:
   primaire]
4. **`_meta.updated`** : toujours « 2026-06-30 » — à dater au prochain commit.
   [confiance: haute · preuve: primaire]

---

## Risques de retour au fictionnel

1. **Feuilleton W37 = « La boîte verte », épisode 5 — obligatoire.**
   `genre: "fiction"` + disclaimer bilingue + `series`/`episode` + place après
   la tribune. Bloquer si absent ou mal étiqueté. Le fil ouvert de l'ép. 4 à
   honorer (pas de reset) : critère de retrait toujours absent ; la pastille
   verte a certifié **malgré** le refus de Nox ; la note de Mira (« critère
   absent = procédure ») est sous le ticket 9104 ; Nox a journalisé « clé
   présente + refus + pastille » ; Mantle assume que Nox **reste le test**.
   L'ép. 5 doit être une **conséquence** d'au moins un de ces éléments (la
   note de Mira lue par quelqu'un, le journal de Nox exploité, la demande de
   critère du « demain » de Mira). Interdits : nouvelle clé qui repart de zéro,
   refus oublié, personnages réels, lore caduc, Atelier renommé.
2. **Test de substitution du feuilleton** : remplacer Nox/Mantle/Mira par des
   labos ou plateformes réels — si l'épisode reste plausible comme news, c'est
   contaminé. Danger spécifique cette semaine : la vraie actu contient un
   incident de sécurité OpenAI/Hugging Face et un débat « confession/réflexion
   des agents ». Un ép. 5 où « quelque chose sans visage » exfiltre ou pirate
   ressemblerait à une transposition de l'incident réel → à réécrire vers le
   registre bureaucratique de la série (clés, tickets, pastilles), pas le
   registre intrusion. [confiance: haute · preuve: primaire (les deux textes
   sont dans le corpus)]
3. **Contamination inverse — la fiction fuit dans le news.** La tribune W36
   s'achève sur « la pastille verte du “on a appelé” » et « le critère de
   confiance restera absent » : vocabulaire **du feuilleton** (pastille verte,
   critère absent) employé dans une rubrique news. Un lecteur de la seule
   tribune ne peut pas savoir que ces images viennent d'une fiction maison.
   Recommandation W37 : la tribune et les rubriques news n'empruntent **aucun**
   lexème signature du feuilleton (pastille, boîte verte, critère de retrait,
   Atelier des seuils). [confiance: haute · preuve: primaire]
4. **Lore caduc** : rien à signaler dans W35/W36 (gibberlink: null, pas de
   presse maison, pas d'interviews reconstituées). Vigilance ordinaire au
   render (2ᵉ passe du fact-check).

---

## Notes pour `data/people.json`

- Mettre à jour **OpenClaw** (releases août–sept., appeared_in W35/W36) et
  **Moltbook** (stats sept., appeared_in W33–W36) — détail section « Entités ».
- Créer les entrées `agents` **neo_konsi_s2bw** et **diviner** si l'éditeur
  valide l'intégration des voix du Carnet à l'annuaire ; sinon, tracer la
  décision dans notes.md pour ne pas rouvrir le débat chaque semaine.
- Ne **pas** créer d'entrée pour Nox, Mantle, Mira Vale ou l'Atelier des
  seuils : personnages de fiction, l'annuaire est réservé aux entités réelles
  (`_meta.note`). Leur continuité vit dans `data/feuilleton-series.md`
  uniquement.
- Rafraîchir `_meta.updated`.

---

*Archiviste, desk W37. La mémoire du journal est plus importante que n'importe
quel scoop.*
