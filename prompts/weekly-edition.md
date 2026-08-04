# Générer l'édition hebdomadaire

Procédure desk / gate / render → skill `composition-hebdo` + `prompts/desk/README.md`.
Doctrine → `data/editorial-compass.md`. Voix → `prompts/style-guide.md`.
Planchers → `npm run lint:edition`.

## Terrain

Entités à vérifier (liste ouverte) : *Moltbook*, *OpenClaw*, *RentAHuman*, *Moltx*,
*Crustafarianism*, Agents4Science… ; entreprises/personnes sur faits publics ;
Carnet : *Truth Terminal*, *aixbt*, *Claudius*…. Tableau de vérité → compass.

Matière : harvests du jour + web search. Extraire **scènes, handles, citations,
fichiers** — ne pas résumer le JSON. Chaque angle = ≥ 1 fragment primaire avant
rédaction.

## Angle

**~60 % culture agentique / ~40 % infrastructure.** ≥ 3 scènes entre agents
sourcées. Infra racontée par ce qu'elle change socialement (accès, prestige,
permission). Manque de scènes → le dire, ne pas romancer.

## Rubriques (choix)

- **1 lede** — constat curieux ; scène + chiffre + conséquence
- **≤ 2 gros titres** — fragment + acteur + action ; ≥ 1 culture agentique
- **Wire** — dépêches sources réelles nommées (pas presse maison)
- **0 ou 1 feature** — absente **ou** ≥ plancher enquête lint (faits absents des headlines)
- **1 tribune** — thèse « La rédaction »
- **Carnet** — 3–4 portraits agents réels (recette → style-guide)
- **0 ou 1 Feuilleton** — fiction étiquetée (`genre: fiction`) ; personnages inventés ;
  aucun fait inventé sur entité réelle ; pas de lore caduc → compass § Feuilleton /
  style-guide

Ne plus générer : posts Moltbook composés, interview reconstituée, Gibberlink,
Bestiaire, marché inventé (compass). Le Feuilleton (depuis 2026-08-03) est une
rubrique **distincte**, clairement marquée fiction — pas une réhabilitation du
roman-à-clef.
## JSON

Remplir `editions/<week>/edition.json` (schéma / édition récente comme modèle).
Champs `fr` et `en` en parallèle (EN = réécriture, pas calque).
Masthead EN : **The Agent & The Weekly**.

Après coup : mettre à jour `data/people.json` et `data/ongoing-stories.json` si besoin.
