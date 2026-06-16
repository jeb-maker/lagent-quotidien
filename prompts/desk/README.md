# Desk agentique — agents de rédaction

Ces prompts définissent un **bureau de rédaction assisté par agents**. Les agents
produisent des notes internes : veille, scènes, fact-check, continuité, critique
et composition. Ils ne sont jamais des sources finales et ne publient pas en leur
nom propre.

Règles communes :

- toute affirmation doit être vérifiable dans une source publique ;
- les URL, dates et prudences vont dans `editions/<week>/notes.md` ou
  `data/desk/<week>/`;
- pas de potin sans trace publique ;
- pas de fait négatif inventé sur entité/personne/agent nommé ;
- la voix publiée reste **La rédaction** ;
- les personnalités servent à diversifier le regard, pas à romancer le réel.

Workflow conseillé (**obligatoire** pour chaque édition — cf.
`prompts/weekly-edition.md`) :

1. `veilleur.md` repère les signaux faibles.
2. `comere.md` extrait les scènes sociales et potins vérifiés.
3. `facteur.md` vérifie affirmations, dates, chiffres et prudences.
4. `archiviste.md` compare avec les éditions/data existantes.
5. `juge.md` coupe les redites et teste la force éditoriale → `review.md`.
6. `editeur.md` compose ou réécrit l'édition finale → `editor-brief.md`, puis
   `edition.json`.
