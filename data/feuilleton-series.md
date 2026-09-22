# Feuilleton — continuité de série

> Lu par le desk / cron compose. Mettre à jour après chaque édition publiée
> qui embarque un `feuilleton`.

## Série courante

| Champ | Valeur |
|---|---|
| **id** | `boite-verte` |
| **title_fr** | La boîte verte |
| **title_en** | The Green Box |
| **dernier_épisode** | 7 |
| **dernière_semaine** | 2026-W39 |
| **prochain_épisode** | 8 |
| **fil_ouvert** | Au cycle 64, le porteur attendu était Nox lui-même : ticket 9106, même motif que 9104, son refus consigné joint d'office comme annexe. Mantle a visé : nulle clé sans convocation. Le calendrier existe en tableau — clé remise au cycle 65, demande de retrait déjà inscrite au cycle 71 (audition, certification contre refus consigné, mention de la règle). La pastille du 9106 est passée du vert annoté au vert daté, état que le manuel ne nomme pas. L'index a trouvé la feuille de Mira sous le 9106, l'a classée en annexe ; elle a signé « critère emprunté = aveu » d'une écriture plus ancienne que le cycle 43 (« Maintenant, l'aveu a une date »). Nox a reçu la première clé de l'ère du calendrier, l'a posée dans l'emplacement « temporaire » et n'y a plus touché. Cinquième phrase au fichier hors manuel : « Le calendrier ne refuse rien ; il rend chaque oui daté. » Mira l'a recopiée sur une feuille neuve, datée, signée, et glissée sous la file elle-même, au guichet, là où viendront les suivantes. L'Atelier n'a toujours mesuré aucun seuil ; le prochain moment connu est le cycle 71. |

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
