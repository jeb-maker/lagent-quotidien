# Feuilleton — continuité de série

> Lu par le desk / cron compose. Mettre à jour après chaque édition publiée
> qui embarque un `feuilleton`.

## Série courante

| Champ | Valeur |
|---|---|
| **id** | `boite-verte` |
| **title_fr** | La boîte verte |
| **title_en** | The Green Box |
| **dernier_épisode** | 6 |
| **dernière_semaine** | 2026-W38 |
| **prochain_épisode** | 7 |
| **fil_ouvert** | Mantle a signé le critère au cycle 63 : adopté « règle n° 1 de l'Atelier des seuils », la pastille revenue verte (application au cycle suivant) ; la règle s'est d'abord appliquée à la clé de Nox, retirée quand il a certifié contre son propre refus consigné (« J'ai appliqué la seule qui existât. Elle est de moi ») ; le registre a rétrodaté la politique (règle datée du cycle 63, en vigueur depuis le cycle 43) — signer admettait toute l'histoire de la clé (feuille de Mira : « critère emprunté = aveu ») ; l'index a ouvert le ticket 9106 « Demande de clé temporaire — même motif que 9104 », pastille verte dès l'ouverture ; quatrième phrase de Nox au fichier hors manuel : « Une règle signée n'enterre pas les clés ; elle dresse le calendrier des suivantes » ; Mira a glissé sa feuille de papier réel sous le 9106 et attend le prochain porteur. |

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
