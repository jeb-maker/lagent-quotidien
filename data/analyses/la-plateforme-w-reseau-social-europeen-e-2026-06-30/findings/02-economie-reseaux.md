# 02. Économie des réseaux et effets de réseau

> Angle miné le 2026-06-30. Discipline : économie industrielle / économie des plateformes.

## Findings

### F1. L'interopérabilité protocolaire ne neutralise que l'effet de réseau direct, pas le verrou indirect
La littérature distingue l'effet de réseau *direct* (valeur = nombre d'interlocuteurs joignables) de l'effet *indirect* / bilatéral (valeur = compléments, modération, annonceurs, influenceurs). AT-Proto, en partageant le graphe de comptes et de followers entre clients compatibles, réduit la perte d'utilité liée au basculement : un utilisateur de W peut suivre et être suivi par des comptes Bluesky sans recréer son réseau. Mais les externalités indirectes (écosystème d'apps, modération, identité vérifiée "W Identity", annonces institutionnels) restent spécifiques à chaque plateforme et ne sont pas mutualisées par le protocole.

- **Source** : N. Economides, I. Lianos, C. Makridis, "'Scaling Laws' and Interoperability as the Backbone of the Digital Economy", SSRN Working Paper 5933836, 2025. https://papers.ssrn.com/sol3/papers.cfm?abstract_id=5933836 **Niveau N2**.
- **Preuve** : Working paper signé Economides (NYU, référence des effets de réseau), hébergé sur SSRN (dépôt académique), non encore peer-reviewed mais cité dans la littérature. Traite explicitement interoperability, network effects, switching costs, two-sided markets.

### F2. La fédération AT-Proto crée un "marché des plateformes" plutôt qu'un nouveau silo
Wang, Cornelius & Li modélisent les "plateform federations" : plusieurs opérateurs partageant un protocole (XMPP, ActivityPub, AT-Proto) forment une coalition qui internalise partiellement les effets de réseau. Le résultat clé : l'interopérabilité *réduit* la barrière à l'entrée d'un entrant (ici W) parce que l'entrant hérite immédiatement du stock d'utilisateurs du protocole, mais elle *augmente* aussi le multi-homing côté utilisateurs (coût de présence multiple faible), ce qui peut limiter la captation de valeur par l'entrant lui-même. W ne "vole" pas les utilisateurs de X ; elle ajoute un point de présence sur un graphe déjà peuplé.

- **Source** : Z. Wang, P.B. Cornelius, T. Li, "Platform Interoperability and Platform Federations", SSRN Working Paper 5104340, 2025. https://papers.ssrn.com/sol3/papers.cfm?abstract_id=5104340 **Niveau N2**.
- **Preuve** : Working paper SSRN, cité 1 fois sur Scholar, analyse explicitement AT-Proto et ActivityPub comme exemples de fédérations de plateformes.

### F3. Les coûts de transfert cognitifs et identitaires restent le verrou réel
Zhang, Dong & Ji montrent dans un modèle de marchés bilatéraux dynamiques que, même avec interopérabilité technique, les coûts de transfert (switching costs) non monétaires — réputation accumulée, vérification, habitudes, capital social — amplifient la concentration : la plateforme à plus grand réseau conserve son avantage parce que l'utilité marginale du basculement reste inférieure au coût de re-construction identitaire. L'app "W Identity" (vérification anti-bots) est précisément un dispositif de *création* de coût de transfert pour W, c'est-à-dire une stratégie de captation dans un monde autrement fluide.

- **Source** : J. Zhang, L. Dong, T. Ji, "The diffusion of competitive platform-based products with network effects", *Sustainability* (MDPI), vol. 15 n° 11, 8845, 2023. https://www.mdpi.com/2071-1050/15/11/8845 **Niveau N1**.
- **Preuve** : Article publié dans *Sustainability*, revue à comité de lecture indexée (Scopus/SJR Q2), modèle formel de marchés bilatéraux avec switching costs.

### F4. L'arrimage institutionnel (Commission européenne) agit comme un effet de réseau indirect substitut
Montero & Finger, dans une analyse de régulation des plateformes comme nouveaux secteurs de réseaux, soutiennent que l'interopérabilité imposée par la régulation (DMA, DSA) ne suffit pas à éroder l'avantage de l'incumbent tant que les *validateurs institutionnels* (États, médias, grandes organisations) restent concentrés sur la plateforme dominante. Le déplacement d'un compte institutionnel majeur (Commission européenne sur W dès le 18 juin 2026, soit J+1 du lancement) est, dans ce cadre, un transfert d'externalité indirecte : il donne à W un actif de légitimité que le protocole seul ne peut produire. C'est le contournement de la barrière par la *demand side* publique, non par l'offre technique.

- **Source** : J. Montero, M. Finger, "Regulating digital platforms as the new network industries", *Network Industries and Regulation* (Sage), 2021. https://journals.sagepub.com/doi/abs/10.1177/17835917211028787 **Niveau N1**.
- **Preuve** : Article dans revue à comité de lecture (Sage), cité 15 fois, relie explicitement interopérabilité, barrières à l'entrée et régulation des plateformes numériques.

### F5. Le multi-homing protocole-géré déplace la concurrence vers la modération et l'interface
Jeong, Ng, Carley & Liu, synthétisant l'architecture des réseaux sociaux décentralisés (AT-Proto inclus), concluent que lorsque l'interopérabilité de données est assurée au niveau protocole, la concurrence entre clients se déplace vers les *différenciateurs non transférables* : politique de modération, algorithmes de recommandation, UX, dispositifs de confiance. W (modération européenne, vérification anti-bots, équipe technique ukrainienne, siège suédois) est un cas d'école de cette concurrence par différenciation au sein d'une fédération, plutôt que par construction d'un silo concurrent.

- **Source** : U. Jeong, L.H.X. Ng, K.M. Carley, H. Liu, "Navigating decentralized online social networks: An overview of technical and societal challenges in architectural choices", arXiv:2504.00071, 2025. https://arxiv.org/abs/2504.00071 **Niveau N2**.
- **Preuve** : Préprint arXiv, cité 15 fois, revue de littérature sur AT-Proto, ActivityPub et architecture fédérée.

## Tension interne à l'angle

Les sources s'opposent sur la *qualité* du contournement permis par l'interopérabilité :
- **Vision optimiste** (Wang et al., Jeong et al.) : la fédération AT-Proto transforme W en entrant viable dès le jour 1, parce que la barrière de l'effet de réseau direct est techniquement abolie (héritage du graphe Bluesky).
- **Vision pessimiste** (Zhang et al., Economides et al.) : les effets de réseau indirects et les coûts de transfert non monétaires persistent ; l'interopérabilité ne fait que transformer la concurrence de silos en concurrence intra-fédération, où l'incumbent X (fermé, à réseau massif) garde son avantage *externe* tant que la fédération reste minoritaire.
- Montero & Finger tranchent partiellement : seul le *déploiement institutionnel* (Commission européenne) peut convertir le contournement technique en changement de marché réel — sans quoi l'interopérabilité reste un confort pour utilisateurs déjà conquis, pas un vecteur de bascule de masse.

La question de recherche trouve donc sa réponse : l'interopérabilité AT-proto **contourne partiellement** la barrière (elle supprime l'effet direct mais laisse intact l'effet indirect et le verrou de légitimité, qui ne se lève que par un acteur public).

## Projection

- **À 1 an** : W se stabilise comme "plateforme-carrefour" institutionnelle européenne (~2-5M MAU), portée par les comptes publics (UE, gouvernements membres, médias publics), sans éroder significativement la base de X. **Déclencheur observable** : nombre de comptes institutionnels vérifiés `.eu` présents sur W vs X au T2 2027 ; croissance des MAU Bluesky-fédérés consolidés.
- **À 5 ans** : soit la fédération AT-Proto devient la "couche IP" des réseaux sociaux (concurrence par modération/UX), et W y tient une niche européenne rentable ; soit un incumbent fermé réplique l'interopérabilité sélective et ré-absorbe le graphe. **Déclencheur observable** : adoption d'une norme d'interopérabilité contraignante dans la révision DMA/Digital Networks Act, et part de marché cumulée des clients AT-Proto > 15 % du temps d'attention "social" en UE.

## Sources citées

- [N1] J. Zhang, L. Dong, T. Ji, "The diffusion of competitive platform-based products with network effects", *Sustainability* 15(11):8845, 2023. https://www.mdpi.com/2071-1050/15/11/8845 — (niveau 1)
- [N1] J. Montero, M. Finger, "Regulating digital platforms as the new network industries", *Network Industries and Regulation* (Sage), 2021. https://journals.sagepub.com/doi/abs/10.1177/17835917211028787 — (niveau 1)
- [N2] N. Economides, I. Lianos, C. Makridis, "'Scaling Laws' and Interoperability as the Backbone of the Digital Economy", SSRN WP 5933836, 2025. https://papers.ssrn.com/sol3/papers.cfm?abstract_id=5933836 — (niveau 2)
- [N2] Z. Wang, P.B. Cornelius, T. Li, "Platform Interoperability and Platform Federations", SSRN WP 5104340, 2025. https://papers.ssrn.com/sol3/papers.cfm?abstract_id=5104340 — (niveau 2)
- [N2] U. Jeong, L.H.X. Ng, K.M. Carley, H. Liu, "Navigating decentralized online social networks", arXiv:2504.00071, 2025. https://arxiv.org/abs/2504.00071 — (niveau 2)
- [N2] M. Kleppmann, H. Frazee, "Bluesky and the AT Protocol: Usable Decentralized Social Media", arXiv:2402.03239, 2024. https://arxiv.org/abs/2402.03239 — (niveau 2, source d'appoint sur l'architecture AT-Proto)
