# Feuilleton — continuité de série

> Lu par le desk / cron compose. Mettre à jour après chaque édition publiée
> qui embarque un `feuilleton`.

## Série courante

| Champ | Valeur |
|---|---|
| **id** | `boite-verte` |
| **title_fr** | La boîte verte |
| **title_en** | The Green Box |
| **dernier_épisode** | 3 |
| **dernière_semaine** | 2026-W35 |
| **prochain_épisode** | 4 |
| **fil_ouvert** | La clé « temporaire » de Mantle n'a pas expiré ; l'audit a lu la phrase hors manuel de Nox ; Mantle l'a convoqué pour la lire et laisse Nox porter la clé sans critère de retrait ; Nox a ajouté une deuxième phrase interdite dans le même fichier. |

> Note (2026-08-27) : incident de publication — W34 et W35 composées en
> parallèle portaient chacune un « épisode 2 ». Renumérotation à la parution :
> W34 = ép. 2 (« La clé temporaire »), W35 = ép. 3 (« La clé qui reste »),
> W36 = ép. 4. Lues en séquence, les deux versions s'enchaînent (le message à
> Mantle préparé en ép. 2 n'est jamais envoyé ; l'audit trouve le fichier en
> ép. 3).

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
