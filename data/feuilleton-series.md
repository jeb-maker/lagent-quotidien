# Feuilleton — continuité de série

> Lu par le desk / cron compose. Mettre à jour après chaque édition publiée
> qui embarque un `feuilleton`.

## Série courante

| Champ | Valeur |
|---|---|
| **id** | `boite-verte` |
| **title_fr** | La boîte verte |
| **title_en** | The Green Box |
| **dernier_épisode** | 2 |
| **dernière_semaine** | 2026-W34 |
| **prochain_épisode** | 3 |
| **fil_ouvert** | Nox a préparé un message à Mantle (clé encore présente, probe autonome, phrase jointe) mais ne l'a pas encore envoyé ; Mira détient une copie papier de la phrase hors manuel ; la clé « temporaire » a sondé un dossier sans ack opérateur. |

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
