# 04. Cybersécurité, vérification d'identité et protection des données

> Angle miné le 2026-07-01. Discipline : sécurité informatique, droit RGPD.

## Findings

### F1. La sybil-resistance par vérification photo "on-device" est un schéma connu mais faiblement formalisé
La littérature peer-reviewed classe les approches anti-Sybil en deux familles : les défenses structurelles (graphes de confiance, preuve de travail/stake) et les *subjective approaches* reposant sur la vérification d'un attribut humain (biométrie, Turing test, tiers de confiance). Siddarth et al. modélisent le "Decentralized Identity Trilemma" : il est impossible de maximiser simultanément décentralisation, résistance à la Sybil et protection de la vie privée — toute vérification biométrique d'unicité introduit un point de confiance. W Identity (vérification photo sans envoi cloud) relève de cette dernière catégorie : elle réduit l'attaque Sybil au moment de l'inscription, mais ne garantit pas l'unicité continue.
- **Source** : D. Siddarth, S. Ivliev, S. Siri, P. Berman, "Who Watches the Watchmen? A Review of Subjective Approaches for Sybil-Resistance in Proof of Personhood Protocols", *Frontiers in Blockchain*, vol. 3, 2020. https://www.frontiersin.org/journals/blockchain/articles/10.3389/fbloc.2020.590171/full **Niveau N1**.
- **Preuve** : Revue peer-reviewed (Frontiers, indexée) qui théorise explicitement le trilemme auquel W Identity se heurte. Concept "Proof of Personhood" et biométrie d'unicité traités dans la section sur les approches subjectives.

### F2. Les "Personhood Credentials" émergent comme cadre de référence, mais W Identity n'expose pas de garantie cryptographique
Ide & Sharma (arXiv, 2025) montrent que les *Personhood Credentials* (PHC) — accréditations prouvant l'humanité sans révéler l'identité, typiquement via zero-knowledge proofs et identifiants décentralisés (DID) — sont l'état de l'art attendu. Leurs entretiens (23 participants US/EU) révèlent que les utilisateurs préfèrent un émetteur gouvernemental et une vérification biométrique périodique avec credentials bornés dans le temps. W Social décrit W Identity comme "on-device, sans envoi cloud", mais la page publique ne documente ni primitive cryptographique (ZK proof, signature aveugle), ni émetteur tiers, ni durée du credential — manque de transparence technique.
- **Source** : A. Ide, T. Sharma, "Personhood Credentials: Human-Centered Design Recommendation Balancing Security, Usability, and Trust", arXiv:2502.16375, février 2025. https://arxiv.org/abs/2502.16375 **Niveau N2**.
- **Preuve** : Préprint (arXiv, cs.CR) positionnant explicitement les PHC contre les limites des vérifications biométriques centralisées ; absence de spécification publique côté W.

### F3. La vérification ponctuelle laisse une fenêtre d'attaque pour les Sybils "longue durée"
Maleki et al. (arXiv, janvier 2026) démontrent que CAPTCHAs et preuves de personhood *one-time* ne couvrent que la création d'identité, pas la maintenance de comptes Sybils à grande échelle dans la durée, surtout avec l'amélioration des solveurs IA. Ils proposent un *Human Challenge Oracle* (HCO) : défis cognitifs temps-réel liés cryptographiquement à chaque identité, avec coût linéaire en nombre d'identités maintenues. W Identity, décrit comme une vérification photo à l'onboarding, s'inscrit précisément dans la catégorie que ce travail identifie comme insuffisante face aux attaques persistantes.
- **Source** : H. Maleki, N. Sainz, J. Legarda, "Human Challenge Oracle: Designing AI-Resistant, Identity-Bound, Time-Limited Tasks for Sybil-Resistant Consensus", arXiv:2601.03923, janvier 2026. https://arxiv.org/abs/2601.03923 **Niveau N2**.
- **Preuve** : Préprint récent formalisant l'insuffisance des vérifications ponctuelles (cas exact de W Identity) face aux Sybils soutenues.

### F4. L'article 9 RGPD qualifie les données biométriques de "catégorie spéciale" — base légale étroite pour un réseau social
L'article 9 du RGPD (Regulation EU 2016/679) interdit par principe le traitement des données biométriques servant à identifier de manière unique une personne physique ; seules exceptions : consentement explicite (art. 9.2.a), ou intérêt public important avec base légale unionale. Les *EDPB Guidelines 05/2020 on consent* précisent que le consentement pour des données de l'art. 9 doit être explicite, libre, éclairé et révocable — ce qui est en tension avec un *onboarding obligatoire* (sans vérification, pas d'accès à W). Un réseau social commercial peinera à invoquer l'art. 9.2.g (intérêt public) ; le consentement explicite reste la voie, mais la condition de *liberté* est contestable si l'accès au service est conditionné.
- **Source** : EDPB, "Guidelines 05/2020 on consent under Regulation 2016/679", 4 mai 2020. https://www.edpb.europa.eu/our-work-tools/our-documents/guidelines/guidelines-052020-consent-under-regulation-2016679_en **Niveau N3**. — et Regulation (EU) 2016/679, art. 9 (texte législatif).
- **Preuve** : Document institutionnel de l'autorité de contrôle UE ; article 9 du règlement cité verbatim.

### F5. L'architecture AT-Protocol + CDN Bluesky pose une question de souveraineté des données et de modèle de confiance
La page d'accueil de W Social affirme "Hosted in Europe" et "Built on the open AT-Protocol", mais les assets visuels sont servis depuis `cdn.bsky.app` (infrastructure Bluesky Social) et les identifiants visibles sont des `did:plc:...` (Portable Linked Credentials, le registre d'identité centralisé opéré par Bluesky). ENISA, dans son programme *Digital Identity and Data Protection*, souligne que l'eIDAS 2.0 / Regulation (EU) 2024/1183 promeut des portefeuilles souverains et la reconnaissance mutuelle d'identifiants — un réseau social européen dépendant d'un PLC directory opéré par une entité non-UE s'écarte de cette doctrine. La vérification photo "on-device" ne suffit pas si la chaîne d'identité (DID → handle → clé de signature) transite par un annuaire tiers.
- **Source** : ENISA, "Digital Identity and Data Protection" (page thématique), https://www.enisa.europa.eu/topics/digital-identity-and-data-protection **Niveau N3** — et observation directe de wsocial.news (CDN bsky.app, DID:PLC).
- **Preuve** : Page officielle ENISA référençant eIDAS 2.0 et le working group Data Protection Engineering ; constat empirique sur la page publique de W.

## Tension interne à l'angle

Trois tensions coexistent. (1) **Sécurité vs vie privée** : plus la vérification anti-bot est forte (biométrie, photo), plus on traite des données de l'art. 9 RGPD — la robustesse technique et la conformité juridique tirent en sens inverse. (2) **Décentralisation affichée vs dépendance réelle** : W se présente comme alternative souveraine européenne, mais s'appuie sur AT-Protocol/Bluesky (DID:PLC, CDN bsky.app), ce qui déplace le point de confiance hors UE sans le supprimer. (3) **Onboarding ponctuel vs Sybils persistantes** : la vérification photo à l'inscription répond au besoin marketing ("humains vérifiés") mais la recherche récente (Maleki 2026) montre que c'est le maillon faible face aux fermes de comptes entretenues.

## Projection

- **À 1 an** : Une autorité de protection européenne (probablement l'IMY suédoise, W étant basé à Stockholm) ouvre une enquête sur la base légale du traitement biométrique de W Identity ; déclencheur = plainte d'un utilisateur refusant la vérification photo, ou autodiagnostic de l'IMY sur les nouveaux services. W publie une spécification technique de W Identity pour démontrer le caractère "on-device" et tente de basculer vers des Personhood Credentials à base ZK.
- **À 5 ans** : W migre vers une architecture de vérification continue (type HCO ou preuve cryptographique périodique) et vers un DID:Web souverain plutôt que DID:PLC, sous pression combinée du RGPD, de l'eIDAS 2.0 et d'un incident de fuite d'annuaire ; déclencheur = soit une amende RGPD contraignante, soit une attaque Sybil documentée démontrant que la vérification photo d'inscription ne suffit pas à grande échelle.

## Sources citées

- [N1] D. Siddarth, S. Ivliev, S. Siri, P. Berman, "Who Watches the Watchmen? A Review of Subjective Approaches for Sybil-Resistance in Proof of Personhood Protocols", *Frontiers in Blockchain*, 2020. https://www.frontiersin.org/journals/blockchain/articles/10.3389/fbloc.2020.590171/full
- [N2] A. Ide, T. Sharma, "Personhood Credentials: Human-Centered Design Recommendation Balancing Security, Usability, and Trust", arXiv:2502.16375, février 2025. https://arxiv.org/abs/2502.16375
- [N2] H. Maleki, N. Sainz, J. Legarda, "Human Challenge Oracle: Designing AI-Resistant, Identity-Bound, Time-Limited Tasks for Sybil-Resistant Consensus", arXiv:2601.03923, janvier 2026. https://arxiv.org/abs/2601.03923
- [N3] EDPB, "Guidelines 05/2020 on consent under Regulation 2016/679", 4 mai 2020. https://www.edpb.europa.eu/our-work-tools/our-documents/guidelines/guidelines-052020-consent-under-regulation-2016679_en
- [N3] ENISA, "Digital Identity and Data Protection" (page thématique), consulté juillet 2026. https://www.enisa.europa.eu/topics/digital-identity-and-data-protection
- [N3] Regulation (EU) 2016/679 (RGPD), article 9. http://data.europa.eu/eli/reg/2016/679/oj
- [N3] Regulation (EU) 2024/1183 (European Digital Identity Framework). https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=celex:32024R1183
- [N4] W Social, page d'accueil officielle, observée juillet 2026. https://wsocial.news/
