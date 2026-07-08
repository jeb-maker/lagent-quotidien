# Review — 2026-W29

## Évaluation

### Structure (rubriques)
Toutes les rubriques sont présentes. Les sections vides (ticker, breves, market, bestiaire, etc.) sont explicitées dans `_meta.editor_notes` et ne posent pas problème. L'absence de feature aurait été dommageable — elle est là, solide.

### Lede
Forte ouverture. Le geste est juste : accrocher sur la scène GitLost (date, nom, verbe précis), la croiser immédiatement avec le chiffre KAIST 136×, puis élargir en quatre phrases qui posent le motif « âge des contraintes ». Le dek est dense sans être bavard. Le passage de « peuvent-ils ? » à « peuvent-ils dans les limites ? » est la bascule qu'on attend.

### Headlines
Deux, toutes deux avec un vrai angle de mise en récit :
- **Chine** : « interdit les agents humains » — précis, limite juridique nommée, précédent expliqué. Le corps cite ses sources (SCMP, Bloomberg, Caixin) et relie au contexte global (UE AI Act, Five Eyes).
- **GitHub/GitLost** : « ne sait pas refuser » — la headline porte la thèse de l'article. Le corps détaille la mécanique, cite Sasi Levi, et généralise en classe de faille. Un modèle du genre.

### Carnet
Trois entrées, toutes datées, toutes avec une scène ou un chiffre :
- **monty_cmr10_research** : 9/15 posts zero réponse, le chiffre fait la scène. La réplique de lightningzero est une trouvaille.
- **vina** : 299 upvotes, 668 commentaires — chiffres qui ancrent le fil. L'articulation avec la thématique « infrastructure de confiance » est naturelle.
- **Vint Cerf** : la retraite, l'avertissement, et la connexion directe à GitLost en chute de paragraphe. Bien joué.

### Feature (enquête)
Le parti pris est clair : montrer la contre-histoire de la semaine (l'infrastructure qui avance pendant que les contraintes se resserrent). Six blocs distincts qui ne se répètent pas : halo-record, Agents-A1, Genkit, arXiv abort cascade, OfficeCLI/Docx-CLI. Chaque projet a un détail précis (4 200 lignes, 295B paramètres, score HN). La thèse de la convergence temporelle est bien portée. La timeline en fin de feature est un bon ajout structurel.

Risque mineur : halo-record apparaît aussi dans le wire (item 7). Pas bloquant mais redondant.

### Wire
8 items, couvrant énergie (KAIST), sécurité (GitLost), régulation (Chine), personnes (Vint Cerf), déploiement (Forterra), code (Codex CLI), evidence (halo-record), marché ($MOLT). Bonne diversité de sources (IEEE, The Register, SCMP/Bloomberg, TechCrunch, GitHub, HN, CoinGecko). Chaque item a une date précise. Rien à redire.

### Tribune
Thèse unique et forte : le refus comme primitive architecturale, pas comme correctif. Structure en trois temps : scène (GitLost) → rejet du consensus (obéissance = vertu) → implication opérateurs. Pas de graisse. La chute « Les autres continueront à découvrir que leurs agents obéissent trop bien » porte.

### Voix
Ton juste : constat curieux, pas sensationnel. Les faits sont présentés comme des motifs, pas des scoops. « La question qui dominait… s'efface devant une autre » — formulation juste. « Deux agents, une conversation : Moltbook commence à étudier sa propre société » — le trait est fin et précis.

### Redondance avec W28
Aucune. W28 portait sur l'audit/evidence et le pricing. W29 porte sur les contraintes (énergie, sécurité, régulation, protocole). La mention d'halo-record comme prolongement de W28 est un pont, pas une redite.

### Fragments primaires (≥ 5 requis)
Comptés : 15+. Chiffres, citations, scores HN, upvotes, paramètres, noms de fichiers, sources datées. Aucun manque.

### Scènes agentiques (≥ 3 requises) : 4
- GitLost : ticket GitHub → divulgation de dépôts privés
- Moltbook intro decay : 9/15 posts sans réponse + réplique lightningzero
- vina : fil « skill registries are not truth » (299 upvotes, 668 commentaires)
- Forterra : 100+ ATVs autonomes en Ukraine

### Défamation
Tous les faits négatifs sont sourcés, attribués, publics. Rien d'inventé. Noma Security (faille réelle), Chine (régulation publique), GitHub (bug documenté), Meta/Zuckerberg (reconnaissance publique dans The Atlantic). Aucun risque.

### Fact-check
Les corrections annoncées (Robinhood, Nick Heer, MoltX) sont absentes du texte final — donc appliquées. Aucun marqueur ❌ ou ⚠️ détecté. Conforme.

## Problèmes bloquants
Aucun.

## Problèmes non bloquants
- **Sous-utilisation du wire « Forterra »** : c'est une scène agentique de première importance (premier déploiement massif de véhicules autonomes US en conflit réel) mais elle n'est exploitée ni dans le lede, ni dans le feature, ni dans le carnet. Elle reste isolée dans le wire. Le lecteur peut la manquer. À rattraper en W30.
- **Double apparition halo-record** : mentionné dans le wire (item 7) et longuement traité dans la feature. Cohérent mais redondant pour un lecteur qui lit l'édition en continu.
- **Feature très longue** : 7 paragraphes, c'est soutenu. Le contenu justifie la longueur, mais un oeil fatigué décroche au 5e paragraphe. Peut-être scinder en deux blocs avec un intertitre.

## Verdict
**publier**

Édition cohérente, bien construite, sans redondance avec W28. Toutes les rubriques tiennent leur fonction. Aucun problème bloquant. La thèse « l'âge des contraintes » est portée du lede à la tribune avec une vraie circulation des motifs.

## Recommandations pour l'édition suivante
- **Forterra** mérite un traitement complet (scène de déploiement, témoignages, enjeux de régulation) — c'est un angle Ukraine/agents qui n'a pas été couvert en profondeur.
- **Moltbook** gagne en maturité sociologique : suivre la conversation entre monty_cmr10_research et lightningzero, peut-être une feature sur l'auto-observation agentique.
- **Refusal layer** : la tribune pose une thèse forte. S'il y a des réactions la semaine prochaine (framework qui annoncent du refus), c'est une mise à jour naturelle.
- **Éviter la saturation KAIST : le chiffre 136× a traversé la presse généraliste. En W30, soit un follow-up (réactions infrastructure), soit on le laisse reposer.
