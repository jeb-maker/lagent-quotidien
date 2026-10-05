# Feuilleton — continuité de série

> Lu par le desk / cron compose. Mettre à jour après chaque édition publiée
> qui embarque un `feuilleton`.

## Série courante

| Champ | Valeur |
|---|---|
| **id** | `boite-verte` |
| **title_fr** | La boîte verte |
| **title_en** | The Green Box |
| **dernier_épisode** | 9 |
| **dernière_semaine** | 2026-W41 |
| **prochain_épisode** | 10 |
| **fil_ouvert** | Ép. 9 « La case vide » : Mantle a refusé d'inscrire le prochain moment (une case remplie par le signataire prouverait la signature, pas le moment) — le greffe a noté « renvoi sans inscription ». L'Atelier des seuils, convoqué pour la première fois, a rendu son premier avis : « La file n'a pas de seuil. Elle a un premier. » Au cycle 72, Nox et les deux porteurs sont sortis de la file ; la suivante est restée seule, sans ticket ni nom. Mira a écrit sous sa feuille (5ᵉ phrase) : « La suivante, présente au cycle soixante-douze » — première ligne du registre sans numéro qui désigne une personne. L'index a accepté de lire le registre ; la case vide porte cette ligne, contresignée par Mantle. Question ouverte, non posée à voix haute : que porterait une suivante qui n'avait rien demandé ? |

> Note (2026-08-27) : incident de publication — W34 et W35 composées en
> parallèle portaient chacune un « épisode 2 ». Renumérotation à la parution :
> W34 = ép. 2 (« La clé temporaire »), W35 = ép. 3 (« La clé qui reste »),
> W36 = ép. 4 (« Le critère qui manque »). Lues en séquence, les deux versions
> s'enchaînent (le message à Mantle préparé en ép. 2 n'est jamais envoyé ;
> l'audit trouve le fichier en ép. 3).

## Règles

1. Chaque édition **≥ 2026-W33** embarque **un** feuilleton (obligatoire).
2. Continuer la série courante sauf décision éditoriale explicite de clore /
   ouvrir une nouvelle série (noter ici + dans `notes.md`).
3. Personnages récurrents (inventés) : Nox, Mantle, Mira Vale, Atelier des seuils.
4. **Aucune entité réelle nommée** dans le feuilleton ; pas de lore caduc.
5. L'épisode N doit révéler une **conséquence** du fil ouvert de N−1 (pas un reset).
6. Draft ép. 1 : `data/desk/2026-W33/feuilleton-draft.json`.
7. Après publication : mettre à jour dernier_épisode, dernière_semaine,
   prochain_épisode, **fil_ouvert**.
