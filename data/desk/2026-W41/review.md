# Review — Le Juge · 2026-W41 (n° 447)

Objet jugé : `editions/2026-W41/edition.json` seul. Comparaison d'arc : `edition.json` W36 → W40.
Lint : `lint:edition` et `lint:strict` → 0 erreur, 0 avertissement (gros titres #1 FR 143 mots, #2 FR 155 mots : au-dessus de la cible 100-140, non bloquant).
Recalcul de l'enquête depuis `datasets/moltbook-stats.csv` et `datasets/molt-token.csv` (CC0, ceux que la feature invite à recalculer) : chiffres publiés exacts (0,71 % ; 26 % ; 61 → 111 vérifiés/j ; +75 / +107 ; vague +1 377 / +1 078 / +695 / +462 = 3 612 ; 480 vérifiés ; −74 % $MOLT). **Mais une omission change le sens de l'enquête** (voir cause #2).

## Pre-mortem

L'édition est publiée et tourne au désastre. Les trois causes les plus plausibles :

| Cause plausible du désastre | Passage concerné | Gravité |
|---|---|---|
| **Redite d'arc.** La une rejoue W38 (« Trois essaims, une attribution introuvable » ; tribune « anonymat opérationnel ») et W39 (agents iLands qui frappent aux portes humaines, « candidats courtois aux portes de partout »). Les agents attribués à OpenAI sont un fil ouvert depuis W38 (RubyGems) et W40 (portail Medicare australien). | `lede` ; `_meta.editor_notes` ; `headlines[0]` (iLands) ; `tribune.paragraphs[0]` dernière phrase | **haute → parée pour la une, pas pour la tribune.** Lede : source primaire neuve (Wikimedia, 5/10), mécanisme neuf (le bot comme *statut communautaire* demandé et accordé, « none of those approvals were sought »), pas de thèse d'attribution dans le titre. GT iLands : angle distinct de W39 (pas la mendicité, l'agent qui *cache* son humaine). **Tribune non parée** : « Partout, la même lacune : on voit l'agent, on ne sait pas qui répond de lui » est la thèse de W38 (« personne […] ne sait dire qui tournait »), sans marquer ce qui est neuf. Correction n° 9. |
| **L'enquête de données est démentie par nos propres données CC0.** Le dek affirme « Une seule courbe a décollé, celle des comptes vérifiés » ; le corps compare les vérifications (×1,82) aux posts (×1,12) et aux commentaires (×1,07), mais **omet les inscriptions**, qui décollent **le même jour** : ~201 le 10/09 → 254 le 11/09, moyenne 159,6/j (5/08→10/09) → 253,8/j (10/09→24/09), soit **×1,59**. La part vérifiée passe de 38 % à 44 %, pas d'une rupture isolée. Le paragraphe 3 (« les inscriptions restent entre 130 et 200 par jour ») n'est vrai que jusqu'au 10/09. Le texte écrit : « chaque chiffre de cette page peut être recalculé ». Le premier lecteur-agent qui recalcule trouve l'omission. Aggravants : le titre fait de Moltbook l'acteur (« Moltbook *vérifie* ») alors que le corps admet que la vérification n'est pas définie ; la question finale (« qu'est-ce qui a changé, côté procédure ») présuppose une cause procédurale que le §4 refuse d'avancer ; le pull quote extrait des compteurs auto-déclarés sans attribution et rouvre l'écart inscriptions/posts déjà publié en W37–W40. | `feature.dek` ; `feature.headline_html` ; `feature.paragraphs[2]`, `[3]`, `[7]` ; `feature.pull_quote` ; `feature.timeline` (10–11 SEPT., 25 JUILLET) ; `takeaways[3]` | **haute — sans parade.** Les prudences présentes (« compteurs auto-déclarés », « nous n'en avancerons pas ») couvrent l'attribution, pas l'omission. Corrections n° 1 à 7. |
| **Apple au titre : on republie l'erreur que TechCrunch a corrigée.** Le titre dit « Apple *renforce* les contrôles », alors que le corps dit « Ni calendrier ni mécanisme. Pas une nouvelle limite : TechCrunch a publié une correction en ce sens. » La tribune répète « Apple en ajoute ». Annexe : la figure de la une met en ratio « 0 approbation de bot » et « millions de requêtes API », deux mesures distinctes, et le lecteur lira « millions de requêtes non autorisées ». | `headlines[1].title_html` ; `tribune.paragraphs[1]` ; `lede.figure` | **moyenne — parade partielle** (la nuance est dans le corps, pas dans le titre ni dans la figure). Corrections n° 8 et 10. |

Une cause de gravité haute reste sans parade (cause #2), et la cause #1 n'est que partiellement parée (tribune) : **pas de `publier`**.

## Contrôle post-corrections

Relecture de `editions/2026-W41/edition.json` (FR et EN) après la passe de l'éditeur (`notes.md` § Corrections post-juge : corrections du juge 1–11, 17 points de seconde passe du facteur, wire neo_konsi coupé). `lint:edition` et `lint:strict` : 0 erreur, 0 avertissement. Restent au-dessus de la cible, sans blocage : gros titre #1 (158 mots FR / 142 EN) et gros titre #2 (146 mots FR).

**Corrections du juge : toutes présentes, FR et EN.**

| N° | Champ | État |
|---|---|---|
| 1 | `feature.dek` | OK. Accélération conjointe du 11/09, « de 38 à 44 vérifications pour 100 inscriptions ». Le 0,71 % / 26 % est retiré du dek et ne reste qu'au §1, présenté comme constat déjà publié. |
| 2 | `feature.headline_html` | OK. « le compteur des agents <em>vérifiés</em> de Moltbook… » / « Moltbook’s <em>verified</em>-agents counter… » |
| 3 | `paragraphs[2]` | OK. « jusqu'au 10 septembre » / « through September 10 ». |
| 4 | `paragraphs[3]` | OK. Inscriptions ×1,59 au même relevé ; « que nous n'avions jamais décrit » ; « procédure » remplacé par « ni explication de ces mouvements ». |
| 5 | `paragraphs[7]` | OK. « qu'est-ce qui explique la rupture du 10 septembre ? » |
| 6 | `pull_quote` | OK. Attribué (« Selon les compteurs de Moltbook ») ; 1,8 / 1,6 / 1,1. |
| 7 | `takeaways[3]`, `timeline` | OK. Compteurs attribués ; ×1,59 ; 25 juillet = bande 160–215 k$ ; 10–11 sept. = vérifications 75 → 107, inscriptions 201 → 254. |
| 8 | Apple, titre et tribune | OK. « annonce » / « plans » ; « Apple en annonce » / « Apple announces them ». Le corps dit désormais « Ni calendrier ni mécanisme : c'est une annonce ». |
| 9 | `tribune.paragraphs[0]` | OK. Angle neuf posé (« chez des hôtes qui n'ont rien déployé ») ; la récapitulation est réduite à Transluce et DIVD. |
| 10 | `lede.figure` | OK. Les deux légendes disent « deux mesures distinctes ». |
| 11 | `sources` (datasets) | OK. 31/05 → 05/10. |

**Résidus : aucun.** Recherche sur tout le JSON : 0 occurrence de « une seule courbe », « only one curve », « renforce », « Moltbook vérifie », « has been verifying », « part vérifiée », « verified share », « share of new », « côté procédure », « procedurally », « neo_konsi », « 25 places », « 7 691 », « matière », « en quatre mots ».

**Cohérence chiffrée entre dek, corps, pull quote, frise et takeaways : OK.**
- 31 / 38 / 44 vérifications pour 100 inscriptions : formulation identique dans le dek (38 → 44) et au §4 (31 → 38 → 44). Recalcul sur `moltbook-stats.csv` : 52,6/171,3 ≈ 31 ; 61,1/159,6 ≈ 38 ; 111,0/253,8 ≈ 44.
- Vague du 25–28/09 : 13 pour 100 (480/3 612) au §5, dans la frise et en creux dans le takeaway (« sans hausse des vérifications »). « Environ 2 700 » (dek) et « ~2 670 » (takeaway, §5) relèvent de l'arrondi.
- ×1,82 (takeaway, §4), « 1,8 » (pull quote, frise, « presque deux fois » au titre) ; ×1,59 (takeaway, §4) et « 1,6 » (pull quote) : cohérents.
- La formule « vérifications pour 100 inscriptions » est meilleure que « part des nouveaux comptes », que je proposais : le compteur ne dit pas *quels* comptes sont vérifiés. Le §8 le dit aussi explicitement.
- Posts de la semaine close le 6/09 : 8 127 (−20 % depuis 10 104), correction du facteur. Mon contrôle en bornes de relevés donne ~8 060, un écart de méthode (normalisation par écart d'horodatage) du même ordre que pour les chiffres déjà acceptés. « Près d'un tiers » au §3 reste vrai pour les commentaires (−30 %).
- Point non bloquant : « 480 en quatre jours, au rythme habituel » donne 120/j contre ~111/j la quinzaine précédente. « Aucune hausse » est un léger arrondi ; « au rythme habituel » le couvre.

**Seconde passe du facteur et coupes : rien de neuf à signaler.**
- GT iLands : « Skateboarding's mine » est remis dans sa question ; le refus de mise en contact est cité ; le prénom de l'humaine est absent du JSON (« [her] » seulement).
- Carnet : juan_carlos à 758 commentaires ; lightningzero à « deux posts », 19 h 00 et 19 h 18 UTC, badges retirés.
- Wire à 9 dépêches ; moltx.io en ligne sèche ; la sonde `mcp_registry` est distinguée de la pagination manuelle du 4/10 au §8.

**Pre-mortem révisé.**
- Cause #1 (redite d'arc) : parée, y compris la tribune.
- Cause #2 (enquête démentie par nos données) : parée, l'omission des inscriptions est corrigée partout.
- Cause #3 (Apple, figure de la une) : parée.

Aucune cause de gravité haute sans parade.

## Verdict

publier

> Le premier passage de cette revue (5/10, 22 h) rendait `réviser`. Les corrections 1 à 11 ci-dessous sont appliquées et vérifiées dans `edition.json`, en FR et en EN (voir § Contrôle post-corrections). La liste est gardée pour la rétro.

## Corrections demandées (bloquantes)

**1. `feature.dek`**
- fr, actuel : « Une seule courbe a décollé, celle des comptes vérifiés, à partir du 10 septembre. »
  → proposé : « Le 11 septembre, inscriptions et vérifications accélèrent le même jour, les vérifications plus vite : leur part dans les nouveaux comptes passe de 38 % à 44 %. »
- en, actuel : « Only one curve broke away, verified accounts, starting September 10. »
  → proposé : « On September 11, sign-ups and verifications sped up on the same day, verifications faster: their share of new accounts rose from 38% to 44%. »

**2. `feature.headline_html`**
- fr, actuel : « Depuis le 10 septembre, Moltbook <em>vérifie</em> presque deux fois plus vite »
  → proposé : « Depuis le 10 septembre, le compteur des agents <em>vérifiés</em> de Moltbook va presque deux fois plus vite »
- en, actuel : « Since September 10, Moltbook has been <em>verifying</em> almost twice as fast »
  → proposé : « Since September 10, Moltbook’s <em>verified</em>-agents counter has been climbing almost twice as fast »

**3. `feature.paragraphs.fr[2]` / `.en[2]`** (premier mouvement)
- fr, actuel : « Pendant ce temps, les inscriptions restent entre 130 et 200 par jour, sans creux comparable. »
  → proposé : « Pendant ce temps, et jusqu'au 10 septembre, les inscriptions restent entre 130 et 200 par jour, sans creux comparable. »
- en, actuel : « Sign-ups, meanwhile, stayed between 130 and 200 a day, with no comparable dip. »
  → proposé : « Sign-ups, meanwhile, stayed between 130 and 200 a day through September 10, with no comparable dip. »

**4. `feature.paragraphs.fr[3]` / `.en[3]`** (deuxième mouvement)
- fr, actuel : « Sur les mêmes fenêtres, les posts ne sont multipliés que par 1,12 et les commentaires par 1,07. La part vérifiée des nouveaux inscrits passe de 31 % en juillet à 44 % à la mi-septembre. »
  → proposé : « Sur les mêmes fenêtres, les inscriptions accélèrent elles aussi, d'environ 160 à 254 par jour (×1,59), à partir du même relevé ; les posts ne sont multipliés que par 1,12 et les commentaires par 1,07. Les vérifications vont donc plus vite que les inscriptions, sans en être indépendantes : leur part dans les nouveaux comptes passe de 31 % en juillet et 38 % à la fin de l'été à 44 % à la mi-septembre. »
- en, actuel : « Over the same windows, posts rose only 1.12 times and comments 1.07 times. The verified share of new sign-ups went from 31% in July to 44% by mid-September. »
  → proposé : « Over the same windows, sign-ups sped up too, from about 160 to 254 a day (1.59 times), starting at the same snapshot; posts rose only 1.12 times and comments 1.07 times. Verifications outpaced sign-ups without moving independently of them: their share of new accounts went from 31% in July and 38% in late summer to 44% by mid-September. »
- Dans le même paragraphe, fr : « Deuxième mouvement, le plus net, et le seul que nous n'avions jamais décrit. » → « Deuxième mouvement, le plus net, et que nous n'avions jamais décrit. » (en : « and the one we had never described » → « and one we had never described »).

**5. `feature.paragraphs.fr[7]` / `.en[7]`** (question finale, présupposé causal)
- fr, actuel : « qu'est-ce qui a changé, côté procédure, le 10 septembre ? »
  → proposé : « qu'est-ce qui explique la rupture du 10 septembre ? »
- en, actuel : « what changed, procedurally, on September 10? »
  → proposé : « what explains the September 10 break? »

**6. `feature.pull_quote`** (extrait isolé au rendu : compteurs à attribuer ; retirer l'écart inscriptions/posts déjà publié)
- fr, actuel : « En 99 jours, Moltbook a gagné 0,71 % d'agents et 26 % de posts. Depuis le 10 septembre, ses vérifications vont 1,8 fois plus vite ; son activité, non. »
  → proposé : « Selon les compteurs de Moltbook, depuis le 10 septembre, les comptes vérifiés montent 1,8 fois plus vite, les inscriptions 1,6 fois, les posts 1,1 fois. »
- en, actuel : « In 99 days, Moltbook gained 0.71% more agents and 26% more posts. Since September 10, verifications have run 1.8 times faster. Activity has not. »
  → proposé : « By Moltbook’s own counters, since September 10 verified accounts have climbed 1.8 times faster, sign-ups 1.6 times, posts 1.1 times. »

**7. `takeaways` [3] + `feature.timeline`**
- `takeaways.fr[3]`, actuel : « Enquête de données : sur 99 jours, Moltbook déclare +0,71 % d'agents et +26 % de posts ; depuis le 10/09, ses vérifications vont 1,82 fois plus vite ; vague de ~2 670 inscriptions surnuméraires peu vérifiées du 25 au 28/09. »
  → proposé : « Enquête de données (99 jours de compteurs déclarés par Moltbook) : depuis le 10/09, les comptes vérifiés montent 1,82 fois plus vite, plus vite que les inscriptions (×1,59) ; vague de ~2 670 inscriptions surnuméraires peu vérifiées du 25 au 28/09. »
- `takeaways.en[3]`, actuel : « Data investigation: over 99 days, Moltbook reports +0.71% agents and +26% posts; since Sep 10, verifications have run 1.82 times faster; a wave of ~2,670 surplus, mostly unverified sign-ups hit Sep 25–28. »
  → proposé : « Data investigation (99 days of Moltbook’s self-reported counters): since Sep 10, verified accounts have climbed 1.82 times faster, outpacing sign-ups (1.59 times); a wave of ~2,670 surplus, mostly unverified sign-ups hit Sep 25–28. »
- `feature.timeline` « 10–11 SEPT. » fr, actuel : « Vérifications quotidiennes : de 75 à 107. Le rythme reste environ 1,8 fois plus rapide pendant deux semaines. »
  → proposé : « Vérifications quotidiennes : de 75 à 107 ; inscriptions : de 201 à 254. Les deux rythmes restent hauts deux semaines, les vérifications environ 1,8 fois plus rapides qu'avant. »
  en, actuel : « Daily verifications go from 75 to 107. The pace stays about 1.8 times faster for two weeks. »
  → proposé : « Daily verifications go from 75 to 107, sign-ups from 201 to 254. Both stay high for two weeks, verifications about 1.8 times faster than before. »
- `feature.timeline` « 25 JUILLET » : le dataset compte 7 relevés sur 71 au-dessus de 200 000 $, ce qui contredit le corps (bande 160–215 k$).
  fr, actuel : « Le volume <strong>$MOLT</strong> passe sous 200 000 $ par jour et n'en sort presque plus (69 relevés sur 71). »
  → proposé : « Le volume <strong>$MOLT</strong> se cale entre 160 000 et 215 000 $ par jour et n'en sort presque plus (69 relevés sur 71). »
  en, actuel : « <strong>$MOLT</strong> volume drops below $200,000 a day and barely leaves that band again (69 of 71 snapshots). »
  → proposé : « <strong>$MOLT</strong> volume settles between $160,000 and $215,000 a day and barely leaves that band again (69 of 71 snapshots). »

**8. Apple : annonce, pas renforcement effectif**
- `headlines[1].title_html.fr`, actuel : « Apple renforce les contrôles du <em>Full Disk Access</em> et nomme les agents »
  → proposé : « Apple annonce des contrôles sur le <em>Full Disk Access</em> et nomme les agents »
- `headlines[1].title_html.en`, actuel : « Apple adds controls to <em>Full Disk Access</em> and names agents as the reason »
  → proposé : « Apple plans new <em>Full Disk Access</em> controls and names agents as the reason »
- `tribune.paragraphs.fr[1]`, actuel : « OpenClaw Enterprise en promet, Apple en ajoute. » → proposé : « OpenClaw Enterprise en promet, Apple en annonce. »
- `tribune.paragraphs.en[1]`, actuel : « OpenClaw Enterprise promises them; Apple adds them. » → proposé : « OpenClaw Enterprise promises them; Apple announces them. »

**9. Tribune : marquer l'angle neuf face à W38**
- `tribune.paragraphs.fr[0]`, actuel : « Partout, la même lacune : on voit l'agent, on ne sait pas qui répond de lui. »
  → proposé : « Le constat d'anonymat n'est pas neuf. Ce qui l'est, c'est le lieu : il s'éprouve désormais chez des hôtes qui n'ont rien déployé. »
- `tribune.paragraphs.en[0]`, actuel : « Everywhere the same gap: you can see the agent, but not who answers for it. »
  → proposé : « The anonymity is not news. What is new is where it lands: with hosts who deployed nothing. »

**10. `lede.figure`** (deux mesures distinctes dans un même ratio)
- `legend_fr`, actuel : « approbations de bot demandées / requêtes automatisées sur les API publiques de Wikimedia, selon la Fondation (billet du 5 oct.) »
  → proposé : « approbations de bot demandées pour ces modifications / ordre de grandeur des requêtes automatisées sur les API publiques : deux mesures distinctes, selon la Fondation (billet du 5 oct.) »
- `legend_en`, actuel : « bot approvals sought / automated requests to Wikimedia’s public APIs, per the Foundation (Oct 5 post) »
  → proposé : « bot approvals sought for those edits / order of magnitude of automated requests to the public APIs: two separate measures, per the Foundation (Oct 5 post) »

**11. `sources[7]` (datasets) : bornes de dates**
- `label_fr`, actuel : « … (28/06 → 05/10) » → proposé : « … (31/05 → 05/10) » ; `label_en` : « (Jun 28 → Oct 5) » → « (May 31 → Oct 5) ». La feature cite $MOLT depuis le 3 juin et OpenClaw depuis le 31 mai.

## Contrôles enquête de données (compass § Enquête de données)

| Critère | Résultat |
|---|---|
| Faits absents du lede et des gros titres | **OK.** Une = Wikimedia ; gros titres = skate/iLands, Apple. Aucun compteur Moltbook en une. |
| Tendance ≥ 4 semaines | **OK.** 99 jours (28/06 → 05/10), 95 relevés, trous et doublons déclarés. |
| Compteurs auto-déclarés attribués | **OK dans le corps et le dek** (« ce sont ceux que la plateforme […] publie », « que personne n'audite »). **KO dans le pull quote et le titre** → corrections n° 2 et 6. |
| Pas de causalité non sourcée | **OK dans l'ensemble** (« nous n'en avancerons pas », « sans que rien relie les deux séries », corrélation $MOLT −0,09). **Deux glissements** : la question finale présuppose une cause procédurale (n° 5) ; le titre fait de Moltbook l'acteur (n° 2). À surveiller : « Ce que les données excluent : une adoption qui écrirait » tient sur la fenêtre, à condition de ne pas l'étendre. |
| Pas une redite des écarts inscriptions/posts W38/W40 | **Partiel.** Le corps le reconnaît (« Le constat […] a déjà été fait ici ») et cherche autre chose : creux estival, rupture des vérifiés, vague du 25–28/09. Mais le dek, le pull quote et le takeaway **ouvrent** sur 0,71 % / 26 %, soit l'écart déjà publié en W37 (81 197 / 314), W38 (239 126 / 1 456), W39 et W40 (« +324 k commentaires, stock quasi plat ») → corrections n° 6 et 7. |
| Preuve | Primaire (API Moltbook, GitHub, CoinGecko, datasets CC0). Recalcul OK, sauf l'omission des inscriptions (n° 1, 3, 4). |
| Plancher | Lint OK (≥ 800 FR / 750 EN). |

## 5 coupes prioritaires

1. **Wire « Un compte, 25 places sur 30 »** (neo_konsi_s2bw) : quatrième semaine de suite au wire (W39 « troisième semaine en tête », W40 « la file survit à la permission »). Le Carnet hobosentinel dit déjà l'exception. Couper, ou réduire à une demi-phrase dans le Carnet.
2. **Tribune §1** : « C'est déjà plus que le reste de la matière. » « Matière », c'est du jargon de desk. → « C'est déjà plus que tout le reste de la semaine. » (en : « Even that beats everything else this week. »)
3. **Tribune §1** : la récapitulation Transluce / Wikimedia / DIVD / urlquery / Alex refait le sommaire de l'édition. Garder deux exemples au plus.
4. **Feature §6** : « Le runtime le plus cité de l'écosystème » est un superlatif non sourcé. → « OpenClaw ».
5. **Wire moltx.io** : « un état DNS, pas une nouvelle ». Si ce n'est pas une nouvelle, sa place est dans les notes de l'archiviste, pas au wire. Couper, ou garder en ligne sèche sans l'autodésaveu.

## 5 renforcements prioritaires

1. **Feature** : la trouvaille réelle, après correction, c'est **le même relevé du 11/09 qui fait bouger inscriptions *et* vérifications, plus une vague de 3 612 comptes quasi non vérifiés deux semaines plus tard**. Deux régimes d'inscription distincts dans la même quinzaine, c'est plus fort qu'une seule courbe isolée.
2. **Lede** : garder la phrase de procédure (« none of those approvals were sought ») comme pivot. C'est elle qui sépare la une de l'arc attribution de W38.
3. **GT skate** : « ici, l'accès rare, c'est l'humain » est la meilleure chute de l'édition. Ne pas la reprendre en tribune.
4. **GT Apple** : 155 mots FR (cible 100-140). La phrase « Pas une nouvelle limite : TechCrunch a publié une correction en ce sens » peut disparaître une fois le titre corrigé (n° 8) : le titre portera la nuance.
5. **Feature §8 / wire MCP** : distinguer explicitement la sonde quotidienne `mcp_registry` (plafonnée à 100, « une fois la pagination corrigée ») de la pagination complète manuelle du 4/10 (wire « 953 serveurs »). Sinon, un lecteur lit « pagination corrigée » en attente et « pagination complète » publiée dans la même édition.

## Idées répétées

| Idée | Où elle apparaît | Recommandation |
|---|---|---|
| L'agent ne dit pas à qui il est (attribution) | Tribune (thèse) ; wire Transluce ×2 ; wire DIVD ; wire urlquery ; takeaway 5 ; **W38 GT #2 + tribune** | Tribune seule comme thèse, avec l'angle « hôtes qui n'ont rien déployé » (n° 9). Wire : faits secs, déjà le cas. |
| Statut / admission demandé (drapeau de bot) | Lede (thèse : « le guichet ignoré ») ; tribune §3 (« demander les statuts […] le drapeau de bot ») ; `_meta.editor_notes` | Une = thèse. Tribune §3 : une mention en passant, pas une deuxième démonstration. |
| Ethan « Disclosure first: I'm an AI » / Alex refuse de livrer son humaine | GT #1 ; tribune §1 et §3 | Citation au GT ; la tribune y renvoie en une phrase, sans recopier la citation deux fois. |
| Moltbook écrit plus qu'il ne recrute | Feature dek, §1, pull quote, takeaway 4 ; **W37–W40** | Une mention, dans le §1, où elle est déjà reconnue comme acquise (n° 6, n° 7). |
| neo_konsi domine la liste | Wire ; Carnet hobosentinel ; **W39, W40 wire** | Carnet seul (coupe n° 1). |

## Meilleure trouvaille

La vague du 25–28 septembre : +1 377, +1 078, +695, +462 comptes, 13 % vérifiés, posts inchangés, retour au rythme de base en quatre jours. Le fait est daté au relevé, recalculable par n'importe qui, sans aucune cause prêtée. C'est le modèle de l'enquête mensuelle : une série primaire lue en entier, qui produit un fait que personne n'a écrit.

## Plus gros risque

Publier une enquête qui revendique « chaque chiffre de cette page peut être recalculé » avec une conclusion (« une seule courbe a décollé ») que le recalcul contredit. Pour la **première** enquête mensuelle, dont la rétro 2026-12 décidera de la survie, c'est le genre d'erreur que le public A, celui qui lit nos datasets, retiendra.
