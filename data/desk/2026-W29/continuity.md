# Continuité — 2026-W29

## Vérifications faites

### Fiches people.json
- **Moltbook** — `appeared_in_editions` : W19, W20, W22, W25. Manque W26 (cité dans lede pour comparaison JesusCrust/WARP), W27 (ticker + feature), W28 (headline audit). **À mettre à jour.**
- **OpenClaw** — `appeared_in_editions` : W19, W20, W22, W25, W26. Manque W27 (breves, feature, headline), W28 (carnet Steinberger, commit boundary drift). **À mettre à jour.**
- **Crustafarianism** — `appeared_in_editions` : W19, W25. Manque W27 (carnet RenBot/Memeothy). **À mettre à jour.**
- **aixbt** — `appeared_in_editions` : W23, W25. Manque W27 (carnet). **À mettre à jour.**
- **Shopify Agentic Storefronts** — `appeared_in_editions`: W27. OK.
- **Guild.ai** — `appeared_in_editions`: W27. Manque W28 (lede mention "Guild ouvrait son tableau de bord Insights"). **À mettre à jour.**
- **Visa Intelligent Commerce** — `appeared_in_editions`: W25. Retiré de W28 (editor_notes : « retrait Visa/Mastercard non sourcés »). **Cohérent — ne pas rajouter W28.**
- **Mastercard Agent Pay** — idem Visa.
- **RentAHuman** — `appeared_in_editions`: W19, W20, W22. Non cité depuis. **Angle mort potentiel.**
- **Claire, Sylvie** — `appeared_in_editions`: W26. OK.

### Éditions récentes — respect doctrine
- **W25** — 100 % réel sourcé, validé `npm run gate`. OK.
- **W26** — 100 % réel sourcé, validé `npm run gate`. OK. Mentions pseudonymes comme voix, pas comme individus nommés.
- **W27** — 100 % réel sourcé, validé `npm run gate`. OK. Carnet explicitement distingue agents, opérateurs, pseudonymes.
- **W28** — 100 % réel sourcé, validé `npm run gate`. OK. Retraits appliqués (Spencer Kimball, Sophia Elya, Visa/Mastercard non sourcés). Mentions Moltbook pseudonymes (neo_konsi_s2bw, xalina) explicitement notées comme « voix, pas individus ».

### Compass editorial-compass.md
- Dernière mise à jour signalée : 2026-05-31 (vérifié). Le tableau de vérité n'a pas été mis à jour depuis la phase de transition post-fictionnelle. **Ajouts récents** (Shopify, Guild) ne sont pas dans le tableau de vérité alors qu'ils apparaissent dans people.json. Le compass devrait être réévalué — il manque les entités de W27+.

## Contradictions entre éditions

### Édition_number discontinu
- W27 → `edition_number`: 433
- W28 → `edition_number`: 434
- W29 (template) → `edition_number`: **9**
- Soit un saut de 434 → 9. Si c'est un nouveau volume (Vol. III ?), `volume` n'a pas été mis à jour (toujours "II" dans W29 meta). **Risque de confusion dans l'archivage des numéros.** À clarifier avec l'éditeur avant bouclage.

### $MOLT — cohérence des snapshots
- W26 (22 juin) : ~850 k$ — cohérent avec snapshot
- W27 (28 juin) : ~632 k$ — baisse de ~26 %, cohérent
- W28 (1er juillet) : ~640 k$ (+1,27 % vs 28 juin) — cohérent
- W29 harvest (8 juillet) : ~593 k$ (baisse de ~6 % vs 7 juillet)
- **Pas de contradiction** — memecoin volatil, chaque valeur est datée. Continuité maintenue.

### OpenClaw releases — cohérence chronologique
- W26 (21 juin) : 2026.6.9 stable
- W27 (24 juin) : 2026.6.10 stable  
- W28 (30 juin) : 2026.6.11 stable + Android/iOS (TechCrunch)
- W29 harvest (2-5 juillet) : 2026.7.1-beta.1, 2026.7.1-beta.2
- **Chronologie OK.** Les versions suivent la logique semver : 2026.6.x en juin, passage à 2026.7.x en juillet.

### Café WARP → 0DIN → audit (continuité narrative)
- W26 : « treize mots empoisonnent un agent » (poisoning par le texte lu — WARP/Cornell)
- W27 : « trois indirections et un shell » (exécution de procédure — 0DIN/Miasma)
- W28 : « la trace devient preuve » (audit/forensic — evidence not logs)
- **Arc thématique cohérent** : chaque semaine approfondit la couche suivante de l'agent comme lecteur → exécuteur → acteur tracé. Pas de contradiction, progression logique.

### Carnet — passage de « mondain des agents » (W26-W27) à « Le Carnet » (W28)
- W26-W27 : titre « Le Carnet mondain des agents / The Agents' Society Pages »
- W28 : titre « Le Carnet / The Register »
- **Changement de titre** entre W27 et W28. Si c'est un choix éditorial délibéré, acceptable. Si c'est une divergence, harmoniser. Le sous-titre reste : « les agents et les opérateurs de la semaine ».

## Angles morts / sujets à suivre

### Promis dans des éditions précédentes — sans suite
1. **Estonie AI ID codes** (W26) — annonce du 17 juin. Pas de suivi sur le projet de loi/pilote. Promis : « Texte de loi / pilote Estonie AI ID ».
2. **Google ARD — adoption** (W26) — spec ouverte le 18 juin. Promis : « Premiers ai-catalog.json publics hors annonces Google ». Pas de suivi.
3. **WARP/AEO — réactions institutionnelles** (W26) — promis : « Réactions Reddit/Wikipedia institutionnelles à WARP/AEO ». Pas de suivi.
4. **righttointelligence.org** (W28 notes) — promis : « identifier les organismes signataires ». Pas de suivi.
5. **Document Five Eyes** (W28 notes) — promis : « retrouver l'URL primaire officielle ». Pas de suivi.
6. **Safari MCP server — réponse Chrome/Firefox** (W28 notes) — promis. Pas de suivi.
7. **Sonnet 5 pricing — effets architectures** (W28 notes) — promis. Pas de suivi (trop tôt sans doute, 1 seule semaine).
8. **Guild Insights — déploiements clients** (W27 notes) — promis. Pas de suivi.
9. **0DIN — adoption des recommandations** (W27 notes) — promis. Pas de suivi.
10. **Shopify — réactions marchands** (W27 notes) — promis : « chiffres publics ? ». Pas de suivi.

### Sujets culturels sans nouvelle depuis plusieurs semaines
11. **Crustafarianism / JesusCrust / Metallic Heresy** — dernière couverture W25 (16 juin). Aucun nouveau schisme documenté depuis. Le culte est-il toujours actif ? Nouveaux prophètes ? Signal faible à vérifier si les harvests Moltbook reviennent.
12. **MoltMatch / consentement** — dernières éditions W19, W22. Nouveaux cas documentés ?
13. **RentAHuman** — dernières éditions W19, W20, W22. Nouveaux développements réglementaires ou de marché ?

### Sujets émergents pour W29
14. **0DIN + Microsoft PyRIT** — présent dans les harvests quasi-quotidiens (1er-8 juillet). 0DIN collabore avec Microsoft sur un threat feed intégré à PyRIT. **Nouvel angle potentiel** pour W29 : la recherche défensive devient infrastructure partagée.
15. **OpenClaw 2026.7.x** — nouvelle ligne de version. Les commits de début juillet montrent un effort systématique de refactorisation (localize internal declarations sur Signal, Mattermost, Line — Vincent Koc). **Signal d'un nettoyage de code interne** qui pourrait impacter l'API des skills.

## Entités à mettre à jour

### people.json — nouvelles entités proposées
1. **0DIN (Mozilla)** — catégorie : Recherche / Sécurité. Équipe de recherche Mozilla spécialisée dans la sécurité des agents codeurs. A publié le PoC 0DIN (W27) et collabore avec Microsoft PyRIT (juillet 2026). Sources : BleepingComputer (juin 2026), harvests juliens. Apparue dans W27 (feature, headlines), W28 (citation en contexte). **Nouvelle entrée nécessaire.**
2. **Chloe West** — agent, foyer Genet. Agent traitant le legal/financier, nommée par The Cut. Apparue dans W26. **À ajouter au tableau `agents`.**
3. **Clark West** — idem. **À ajouter au tableau `agents`.**
4. **Dan West** — idem. **À ajouter au tableau `agents`.** (Les trois Wests forment un « mini-cabinet autonome » décrit dans W26 carnet.)

### people.json — mises à jour d'`appeared_in_editions`
- **Moltbook** → +W26, +W27, +W28
- **OpenClaw** → +W27, +W28
- **Crustafarianism** → +W27
- **aixbt** → +W27
- **Guild.ai** → +W28 (mention)

### people.json — outlets à enrichir
- **BleepingComputer** — cité en source W27, W28 (wires). **À ajouter.**
- **The Cut** — cité en source W26. **À ajouter.**
- **404 Media** — cité en source W26. **À ajouter.**
- **Inc.** — cité en source W26. **À ajouter.**
- **Euronews** — cité en source W26. **À ajouter.**
- **Help Net Security** — cité en source W26. **À ajouter.**
- **The Register** — cité en source W28. **À ajouter.**
- **Digit.in** — cité en source W26. **À ajouter.**
- **StartupHub.ai** — cité en source W28. **À ajouter.**

### editorial-compass.md — mise à jour du tableau de vérité
- **Shopify Agentic Storefronts** — RÉEL, documenté W27. Nommable. **Manque dans le tableau.**
- **Guild.ai** — RÉEL, documenté W27/W28. Nommable. **Manque dans le tableau.**
- **0DIN (Mozilla)** — RÉEL, équipe de recherche Mozilla. **Manque dans le tableau.**
- **Claire / Sylvie / Chloe West / Clark West / Dan West** — agents réels documentés par The Cut. Sous quel statut les traiter ? Ce ne sont pas des personnes, ce sont des instances d'agent OpenClaw décrites par des humains. **Le compass ne couvre pas ce cas — clarification nécessaire.**
- Date de dernière vérification du tableau : 2026-05-31. **Réévaluation périodique due** (l'écosystème a beaucoup évolué depuis).

### ongoing-stories.json — propositions
1. **Le tournant audit/forensic** — fil ouvert en W28, culturellement significatif. À suivre : qui produit la couche d'attestation persistante ? Y a-t-il une infrastructure (startup, fondation, framework) qui répond au besoin « evidence not logs » ?
2. **Supply chain des agents codeurs** — 0DIN → Miasma → WARP. Trois semaines de couverture convergence. L'angle se renforce : les surfaces « normales » (README, catalogues, UGC) deviennent vecteurs. À suivre : réponses des plateformes (OpenAI, Anthropic, Google).
3. **AEO (Agent Engine Optimization)** — ouverture W26, colonisation des subreddits. À suivre : émergence de standards, contre-mesures, impact sur la recherche grand public.
4. **Identités agentiques** — Estonie AI ID (W26), 0DIN/Cursor (W27). À suivre : autres États/régulateurs qui bougent, adoption ARD.
5. **Commerce agentique** — Shopify agentic storefronts (W27), Visa/Mastercard (W25), x402/Apify (W28). L'infrastructure de paiement agentique se normalise. À suivre : quels volumes, quels litiges ?

## Risques de retour au fictionnel

- **Aucun détecté** dans les éditions W25-W28. Les notes d'édition indiquent explicitement la vérification par le gate.
- Un risque faible : le Carnet traite des pseudonymes Moltbook (neo_konsi_s2bw, xalina) comme des « voix ». W28 précise bien « public Moltbook author pseudonym, not an identified person ». **Maintenir cette distinction** — ne pas les faire passer pour des personnes réelles nommées.
- JesusCrust (W25) est traité comme un agent documenté par GIGAZINE, pas comme un individu réel. **Traitement correct.**

## Notes pour `data/people.json`

1. Ajouter **0DIN (Mozilla)** dans une nouvelle catégorie `research` ou dans `platforms` comme équipe de recherche.
2. Ajouter **Chloe West, Clark West, Dan West** dans `agents` (liés au foyer Genet / OpenClaw comme Claire et Sylvie).
3. Mettre à jour `appeared_in_editions` pour Moltbook, OpenClaw, Crustafarianism, aixbt, Guild.ai.
4. Ajouter les outlets manquants (BleepingComputer, The Cut, 404 Media, Inc., Euronews, Help Net Security, The Register, Digit.in, StartupHub.ai).
5. Mettre à jour les facts d'OpenClaw : ajouter la release 2026.6.11 (stable, 30 juin, Android/iOS) et le commit boundary drift f5d0c37 (1er juillet).
6. Mettre à jour les facts de $MOLT : ajouter les snapshots récents (W28: ~640 k$, W29 harvest: ~593 k$) — ou laisser les chiffres aux éditions.

## À signaler d'urgence à l'éditeur

- **Edition_number 9 dans W29** alors que W28 était 434 — possible résidu de template hérité d'un ancien numérotage. Vérifier avant bouclage. Si le journal repart à 1 pour un nouveau format, le `volume` doit passer à III.
- **Titre du Carnet** : W28 utilise « Le Carnet / The Register » au lieu de « Le Carnet mondain des agents / The Agents' Society Pages » (W26-W27). Harmoniser le titre si le format est stable.
- **W29 template a `bot_posts` non vide** (title renseigné, posts vide). La rubrique Moltbook posts est active — s'assurer que les harvests permettent de l'alimenter, ou revenir à null comme en W27/W28.
