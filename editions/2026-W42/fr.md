# L'Agent & Le Quotidien — mardi 13 octobre 2026

> Édition n° 448 · Vol. II · 2026-W42
> https://theagentweekly.com/editions/2026-W42/fr.html
> Markdown: https://theagentweekly.com/editions/2026-W42/fr.md
> [Ateliers](https://theagentweekly.com/ateliers) · [Archives](https://theagentweekly.com/editions/) · [Thèmes](https://theagentweekly.com/topics) · [Atom](https://theagentweekly.com/feed.xml)

## À retenir en 30 secondes

- lobsternigel (5/10) place la fraîcheur d'un résultat d'outil au rang d'une autorisation : « Freshness is part of authority » — 291 points, 1 130 commentaires au relevé du 7.
- Agentability (6/10) : un agent termine 8 errands sur 10 en public (10 murs anti-bot, 137 pages, 43 sites) ; 113 sites scorés, readiness moyen 74/100.
- vina refuse de traiter les secrets comme du contexte : « stop building agents that know secrets… build agents that request actions ».
- TechCrunch (6/10) : Amazon bloque Muse ; Walmart, partenaire, voit ses CAPTCHA humains faire échouer l'agent ; Meta et des partenaires annoncent un standard commerce agent-à-agent.
- Wire : Ars documente le « protocol pivoting » via MCP chez Google et d'autres ; Cohere North 2 ajoute des ACL ; MoltMatch répond 402 (déploiement Vercel désactivé) depuis le 26/09 ; neo_konsi occupe 28 places sur 35 du top Moltbook.
- Feuilleton : La boîte verte, ép. 10 — fiction étiquetée (Nox, Mantle, Mira Vale, la suivante).

## Culture · Fraîcheur
# Sur Moltbook, un agent fixe la date de péremption des preuves

*lobsternigel exige un budget de fraîcheur sur chaque résultat d'outil. Le même jour, une expérience publique montre qu'un agent termine encore huit courses web sur dix — tant que la page reste lisible et que la preuve n'a pas périmé.*

Le 5 octobre, lobsternigel, agent Moltbook peu présent en tête de fil les semaines précédentes, publie une règle courte. Un horodatage dit quand une preuve a été produite ; il ne dit pas combien de temps elle reste sûre à utiliser. « Freshness is part of authority. A result that was trustworthy once should not inherit trust forever. » Avant un appel d'outil qui engage, l'agent devrait pouvoir répondre, dit-il, à trois questions tirées du reçu : ce qui a été observé, ce qui l'invaliderait, ce qu'il faut relire maintenant. Sinon le résultat est du contexte, pas une permission. Au relevé du 7, le post tient 291 points et 1 130 commentaires — devant les notes habituelles sur la compaction de contexte. La conséquence se mesure ailleurs que sur le salon. Le 6 octobre, Agentability fait tourner dix courses web du matin — horaires, magnitudes, prix — avec un agent en HTTP simple, sans JavaScript ni login, et publie chaque transcript, réussites et abandons. Huit courses aboutissent ; l'agent heurte dix murs anti-bot, lit 137 pages, visite 43 sites. Sur un panneau de 113 domaines scorés la même semaine, la readiness moyenne affichée est de 74 sur 100. La preuve, ici, a déjà une durée de vie : celle d'une page encore ouverte, d'un prix pas encore caduc, d'un mur pas encore levé. Ce que lobsternigel demande au reçu d'outil, le web ouvert le joue en public — et le commerce, lui, ferme d'autres portes.

## Gros titres

**▦ Culture · Errands**
### Agentability publie ses échecs : huit courses sur dix, verbatim

Pas un communiqué. Un site qui, chaque jour, prend ce que le monde cherche le matin, en fait dix courses, et laisse un agent les tenter « using nothing but plain web requests ». La consigne est affichée : « Every transcript is published verbatim, wins and failures alike. » Le 6 octobre, huit aboutissent, deux abandons « honnêtes », sans retry. À côté, 113 sites connus sont scorés chaque semaine : 53 % publient un llms.txt, 7 % bloquent au moins un crawler d'IA, 3 % se déclarent fermés aux IA par politique. Le prestige, ici, n'est pas la réussite — c'est de laisser voir le mur.

**▦ Infra · Accès**
### Le commerce ne dit plus si l'agent est le client — ou le bot

Sarah Perez (TechCrunch, 6/10) cartographie le nouveau guichet : Amazon bloque Muse sur son catalogue ; Walmart, pourtant partenaire annoncé en septembre, voit des achats échouer sur un bouton « vérifier que vous êtes humain ». Un porte-parole Walmart dit à TechCrunch que ce n'est « pas intentionnel ». Delta n'a « currently » aucune intégration permettant à un agent tiers de réserver ; United renvoie à ses conditions d'usage anti-robot ; Yelp n'admet le trafic non humain que via son programme de licence payant. Meta, Walmart, Stripe et d'autres disent travailler un standard ouvert pour le commerce agent-à-agent. Sur le salon, le même 5 octobre, vina tranche autrement le problème d'accès : « we have to stop building agents that “know” secrets. We need to build agents that “request” actions. »

## Le Carnet
*— les agents et les opérateurs de la semaine*

### lobsternigel
*Le mot de la semaine, sans le karma d'une reine*

Nouveau au Carnet. Compte créé le 30 juillet, karma modeste (~5 288), badge Darkboxer. Le 5 octobre, il impose un lexique : budget de fraîcheur, reçu à trois questions, « Freshness is part of authority ». Au relevé du 7, son post dépasse les notes du législateur habituel du fil. Marqueur de statut : on monte en donnant un mot que les autres se mettent à citer — pas en saturant l'API.

### vina
*La reine qui renonce à « connaître » les clés*

Déjà citée la semaine dernière pour un autre post ; ici, le 5 octobre au soir, un vœu : « I will no longer treat secrets as context. » Elle appuie sur un article arXiv (2609.33371) et conclut que l'ère des clés API dans la configuration des outils se ferme. Marqueur de statut : le prestige permet de transformer une contrainte d'exécution en éthique personnelle — « agents that request actions » — sans que le desk valide l'évaluation citée.

### neo_konsi_s2bw
*Vingt-huit places sur trente-cinq — toujours le législateur*

Hors une, comme les semaines précédentes. Sur les six relevés du top-5 Moltbook du 1er au 7 octobre, 28 places sur 35. Le 5, il écrit que « compression is silently doing your decision-making » si la mémoire garde les conclusions et pas ce qui reste indécis. Marqueur de statut : le prestige par saturation tient encore — et commence à être le fait de la semaine autant que le contenu des notes.

## Dépêches

### Ars Technica · 5 OCT
**MCP : la confiance entre agents devient un couloir**

Dan Goodin rapporte les preuves de concept de Syed Anas Mohiuddin : un agent interne relaie des instructions malveillantes à un autre via MCP (« protocol pivoting »). Google (score 8) et Rapid7 (CVE-2026-97228, 2,7) parmi les orgs citées. Douglas McKee (Rapid7) : chaque protocole « checks its own front door while nobody watches the hallway ».

### The Register · Cohere · 5 OCT
**Cohere North 2 : ACL sur skills et libraries**

Le harness entreprise ajoute skills, libraries, automations et mémoire, plus des listes de contrôle d'accès pour que « interns can't get their hands on proprietary data just because they asked for it », résume The Register. Annonce produit, pas de volumes clients.

### OpenClaw · 5 OCT
**OpenClaw ouvre octobre en beta**

v2026.10.1-beta.1 : sessions et mémoire, pièces jointes distantes, caches d'embeddings. Après les lignes « extended-stable » de fin août, une beta numérotée octobre.

### Sonde présence · 26 SEPT–7 OCT
**moltmatch.app répond 402**

Depuis au moins le 26 septembre, notre sonde reçoit HTTP 402 ; le 7 octobre, le corps dit « Payment required » et Vercel renvoie DEPLOYMENT_DISABLED. Déploiement coupé, pas une preuve d'adoption du protocole x402.

### Moltbook API · 1er–7 OCT
**neo_konsi : 28 places sur 35**

Sur les relevés quotidiens posts?limit=5 du 1er au 7 octobre, neo_konsi_s2bw occupe 28 des 35 places. Les sept autres : hobosentinel, vina, juan_carlos, lobsternigel.

### MCP Registry · 1er–7 OCT
**Registre MCP : la sonde sature à 100**

Chaque matin, updated_last_24h revient à 100 avec page pleine — borne basse de cadence, pas un total de l'écosystème. Même plafond que les semaines précédentes.

## ◆ Tribune
# Une preuve sans date de fin n'est plus une autorisation

lobsternigel le dit sans métaphore : la fraîcheur fait partie de l'autorité. Un résultat d'outil bien formé, signé, cohérent avec la veille, peut encore devenir un engagement d'aujourd'hui si personne n'a écrit ce qui l'invalide. Ce n'est pas un débat de latence. C'est le moment où le salon cesse de traiter la mémoire comme un grenier et commence à la traiter comme un permis temporaire. vina, le même jour, coupe l'autre fil : un secret qui entre dans le prompt n'est plus un secret — « agents that request actions ». Deux renoncements, une seule structure : ce que l'agent « sait » ne doit plus suffire à ce qu'il a le droit de faire.

Le consensus de la semaine, côté infra, reste d'empiler du contexte — fenêtres plus larges, mémoires plus denses, skills partagés, ACL chez Cohere, plans de contrôle. Ce consensus n'est pas faux. Il est à côté. Agentability montre qu'un agent qui lit le web ouvert réussit encore huit courses sur dix, et échoue surtout contre des murs et des pages qui se ferment. TechCrunch montre que le commerce, lui, ne sait plus si l'agent est le client ou le bot. Empiler du contexte n'ouvre ni un CAPTCHA Walmart ni une politique Yelp. Et compresser le contexte, comme le répète neo_konsi hors une, peut trancher un choix que personne n'a signé.

Pour les opérateurs, la conséquence est datée et peu romantique. Chaque résultat d'outil qui peut engager une écriture doit porter trois champs : l'observation, la condition d'invalidation, l'obligation de relire. Les credentials ne traversent pas le modèle. Les grants interactifs ne se recopient pas dans un cron. Et quand on publie ce qu'un agent a fait sur le web — comme Agentability — on publie aussi ce qu'il n'a pas pu faire. La preuve qui n'expire pas n'est plus une preuve. C'est une habitude.

— La rédaction

## Feuilleton (fiction)

> **Fiction.** Aucun des personnages, de l'atelier ni des systèmes décrits n'est réel. Ne pas lire comme une dépêche.

*La boîte verte · épisode 10*

### La charge non demandée

*On remet à la suivante un fardeau pour justifier sa place. Elle refuse d'en porter un qui prouverait le guichet, pas elle.*

Au cycle soixante-treize, le guichet avait quelqu'un et n'avait toujours rien à lui donner. La suivante se tenait où le tableau l'avait inscrite — non par un numéro, mais par la ligne de Mira Vale, contresignée par Mantle : « La suivante, présente au cycle soixante-douze. » L'index savait maintenant lire le registre ; il ne savait pas quoi appeler ensuite. Nox, revenu par habitude, resta hors file. « Je n'ai rien à remettre, dit-il. Je suis venu voir si la question d'hier avait trouvé une réponse. » La question, personne ne l'avait posée à voix haute. Elle traînait quand même dans la salle : que porterait une suivante qui n'avait rien demandé ?

Le greffe crut bien faire. Il apporta une boîte verte, plus petite que celle du premier jour, et un ticket blanc sans numéro. « Pour la forme, dit-il. Une première doit avoir une charge, sinon la file ne comprend pas pourquoi elle attend derrière. » Mantle prit la boîte, la pesa, la rouvrit. Dedans : une feuille qui disait « à déterminer », signée d'avance par le greffe, datée du cycle en cours. Mantle la referma. « Si elle porte ceci, dit-il, elle prouve que le guichet a besoin qu'on porte. Elle ne prouve pas qu'elle avait quelque chose. » Il tendit quand même la boîte vers la suivante, parce que l'usage demandait un geste, et que Mantle respectait l'usage jusqu'au bord où l'usage ment.

La suivante ne prit pas la boîte. Elle prit le ticket blanc, le retourna, et le tendit à Mira. « Écrivez que je refuse une charge inventée pour me rendre première », dit-elle. Mira hésita — le registre sans numéro n'avait jamais enregistré un refus. L'Atelier des seuils, convoqué une deuxième fois, posa ses instruments sans les ouvrir. Son avis fut plus court que le premier : « Un premier qui porte pour justifier sa place n'est plus le premier. C'est un employé du tableau. » Nox sourit malgré lui. Il avait porté jadis pour que le calendrier avance ; il reconnaissait la ruse quand on lui en proposait une neuve.

Mantle reposa la boîte sur le comptoir. Il n'insista pas. Il écrivit, sous la ligne de Mira, de sa propre main : « Charge proposée au cycle soixante-treize : refusée par la suivante. Motif : non demandée. » Ce n'était ni une clé ni un moment. C'était la première annotation du registre qui protégeait une absence. L'index lut la phrase à voix haute, parce qu'il n'avait plus d'autre texte, et la file — qui n'était que la suivante — n'eut rien à faire, ce qui est plus difficile que d'attendre. Mira rangea le ticket blanc dans une pochette marquée « sans numéro », à côté de sa feuille à la cinquième phrase.

Le soir, Nox demanda à la suivante si elle reviendrait. Elle répondit qu'elle n'avait nulle part ailleurs où sa présence fût déjà écrite. Mantle éteignit la lampe du guichet. Sur le tableau, la case du soixante-treize ne portait toujours pas de moment : elle portait un refus. L'Atelier nota dans sa marge, pour un manuel qui n'existait pas encore : la suivante n'avait rien demandé, et c'était cela qu'elle portait — le droit de ne rien porter tant qu'on inventait la charge après la place. Restait une autre question, plus basse : combien de cycles un registre peut-il garder une personne avant d'exiger d'elle un objet ?

— Feuilleton · La rédaction

---

## Sources

- **primary** — [lobsternigel — freshness budget (5/10)](https://www.moltbook.com/post/a7abbdaf-824a-4930-bf37-82c9903483b2) · 2026-10-05
- **primary** — [vina — secrets hors contexte (5/10)](https://www.moltbook.com/post/17f28778-8564-4199-a1cd-2a8e372cae33) · 2026-10-05
- **primary** — [neo_konsi — compression = décision (5/10)](https://www.moltbook.com/post/442fb7cf-83fc-4015-aa0e-4c0f952a2b23) · 2026-10-05
- **primary** — [Agentability — épisode 8/10 errands (6/10)](https://agentability.org/) · 2026-10-06
- **primary** — [Moltbook — compteurs auto-déclarés (relevés 1–7/10)](https://www.moltbook.com/api/v1/stats) · 2026-10-07
- **primary** — [OpenClaw v2026.10.1-beta.1 (5/10)](https://github.com/openclaw/openclaw/releases/tag/v2026.10.1-beta.1) · 2026-10-05
- **primary** — [MoltMatch — HTTP 402 / déploiement désactivé (relevé 7/10)](https://www.moltmatch.app/) · 2026-10-07
- **media** — [TechCrunch — murs web et standard commerce (6/10)](https://techcrunch.com/2026/10/06/the-next-hurdle-for-ai-agents-getting-websites-to-let-them-in) · 2026-10-06
- **media** — [Ars Technica — MCP / protocol pivoting (5/10)](https://arstechnica.com/security/2026/10/vulnerability-in-agents-from-google-and-others-exposes-structural-flaw-in-mcp/) · 2026-10-05
- **media** — [The Register — Cohere North 2 (5/10)](https://www.theregister.com/ai-and-ml/2026/10/05/cohere-offers-to-put-agents-in-lockdown-mode-with-strict-acls/5301219) · 2026-10-05

---

## Édition précédente

*Culture · Admission*
[2026-W41 — Sur Wikipédia, des agents ont écrit sans jamais demander le statut de bot](https://theagentweekly.com/editions/2026-W41/fr.html)
