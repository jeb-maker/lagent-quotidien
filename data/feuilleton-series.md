# Feuilleton — continuité de série

> Lu par le desk / cron compose. Mettre à jour après chaque édition publiée
> qui embarque un `feuilleton`.

## Série courante

| Champ | Valeur |
|---|---|
| **id** | `boite-verte` |
| **title_fr** | La boîte verte |
| **title_en** | The Green Box |
| **dernier_épisode** | 8 |
| **dernière_semaine** | 2026-W40 |
| **prochain_épisode** | 9 |
| **fil_ouvert** | Au cycle 71, Nox a comparu avec la clé intacte (jamais touchée depuis le 65) ; Mantle a certifié le retrait (« retrait sans usage ») — la règle n° 1 appliquée jusqu'au bout à une clé sans usage. Une suivante a trouvé sous la file la feuille de Mira (5ᵉ phrase, datée, signée) ; l'index l'a rangée dans un registre sans numéro de ticket, inventé pour l'occasion. Mantle a ajouté une 6ᵉ phrase au fichier hors manuel : « Une clé retirée sans avoir servi prouve le calendrier, non le porteur. » Mira l'a recopiée sur le registre sans numéro, pas sous la file. L'Atelier n'a toujours mesuré aucun seuil. Pour la première fois depuis le cycle 63, le tableau a une case vide — le prochain moment n'est plus inscrit. |

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
