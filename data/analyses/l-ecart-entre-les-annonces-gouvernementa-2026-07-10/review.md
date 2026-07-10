# Relecture adverse — L'écart entre les annonces gouvernementales et leurs effets mesurables en France (2021-2026)

> Relecteur indépendant · échantillon : findings 10, 02, 04 · 2026-07-10

**Choix de l'échantillon.** (a) `10-pledge-fulfillment.md` : l'angle le plus cité de la
synthèse (17 mentions, contre 8-12 pour les autres) — il porte la tripartition
outputs/outcomes/perçu qui structure C1, C3, TM1 et TM3 ; si lui tombe, l'architecture tombe.
(b) `02-application-des-lois.md` : le plus faible en sources d'après la synthèse elle-même —
C2 admet « aucune étude peer-reviewed sur les décrets 2021-2026 : suivi monopolisé par le
Sénat », et la note de calibration signale que 02 et 09 citent le même rapport r25-802.
(c) `04-finances-publiques.md` : tirage au sort (shuf sur le contenu du dossier ; les deux
autres tirés étaient déjà pris en a et b).

**Vérifications web effectuées (3/3 autorisées).** (1) Chômage : INSEE Informations rapides
n° 34, T4 2025 = 7,9 % — le chiffre de C1 est exact. (2) PARTIPOL : ~60 % de réalisation
moyenne sur cinq mandats, >70 % pour Macron I, 921 promesses 1995-2022 — confirmé (Sciences
Po / The Conversation, Guinaudeau & Grossman). (3) Sénat r25-802 : 262/394 mesures publiées,
66 %, contre >75 % en 2012-2019 — confirmé (r25-802-syn.pdf). Aucun des trois chiffres
centraux testés n'est faux.

## Pre-mortem

« L'analyse est publiée et se révèle fausse ou gênante » — les 3 causes les plus plausibles :

| Cause plausible | Passage concerné | Gravité |
|---|---|---|
| **Incohérence interne sur le chiffre-vitrine.** C1 affirme « chômage 7,9 % fin 2025 » (exact, vérifié INSEE T4 2025) ; TM1 affirme « chômage à 8,3 % = outcome manqué », sans date ni source. Un lecteur qui vérifie trouve 7,9 % au dernier trimestre publié et 8,0-8,1 % en prévision INSEE mi-2026. Pour un dossier dont le sujet même est la rigueur de mesure, deux taux de chômage incompatibles dans le même document sont exactement le type d'erreur qui décrédibilise l'ensemble. Aucune parade présente dans la synthèse (ni date, ni source, ni mention d'une prévision). | Synthèse, TM1 (« loi plein emploi votée = output tenu, chômage à 8,3 % = outcome manqué ») vs C1 | haute |
| **Un chiffre britannique généralisé sans le dire.** Le « ~3 % d'outcome pledges » qui porte la résolution de TM1 (et réapparaît en C1) est, d'après le finding 10 lui-même, mesuré **au Royaume-Uni** (CPPP, *Party Mandates and Democracy*, chap. 5). La synthèse le présente comme une propriété générale des promesses (« les *outcome pledges* type “plein emploi” sont ~3 % des promesses »). Si la distribution française diffère, la clé de voûte de TM1 est fragilisée — et l'omission du périmètre est gênante en soi. | C1 (tripartition) et TM1 (position retenue) | moyenne |
| **Concentration institutionnelle survendue en indépendance.** C1 revendique « 7 institutions productrices indépendantes », mais tout le pilier « application des lois » (66 %, 59 %, 841 mesures, différentiel 51-57 %/70-73 % qui fonde aussi TM2) repose sur le seul décompte sénatorial — juge et partie sur les amendements d'origine sénatoriale, sans aucune contre-mesure académique (le finding 02 l'admet : « le suivi quantitatif est de facto monopolisé par les rapports institutionnels »). Parade partielle déjà présente : la note de calibration en tête de synthèse et le plafonnement à `preuve 3`. | C1, C4, TM2 | moyenne |

## Contrôles

**Les notes `[confiance × preuve N]` sont-elles justifiées par les findings échantillonnés ?**
Trois notes vérifiées contre l'échantillon :
- **C1 `[haute × preuve 3]`** : justifiée. Les contributions des angles 02 (66 % vs >75 %) et
  04 (5,8 % vs 4,4 %, ~40 Md€) sont fidèles aux findings 02-F1 et 04-F2, sourcés N3 (Sénat,
  INSEE, DG Trésor). Le plafonnement à `preuve 3` malgré l'appui N1 ponctuel est correctement
  motivé (« socle N3 ») — la règle de non-compensation est respectée.
- **C2 `[haute × preuve 3]`** : justifiée. Le +0,40 pt du HCFP et le renfort N1 Frankel &
  Schreger sont exactement ce que dit 04-F3 (avec l'honnêteté de signaler que le N1 porte sur
  la zone euro, pas la France) ; le « aucune étude peer-reviewed sur les décrets 2021-2026 »
  correspond mot pour mot à la section « Non trouvé » du finding 02.
- **C4 `[moyenne × preuve 3]`** : justifiée, et c'est le point fort de la synthèse — la
  confiance est *dégradée* à moyenne précisément parce que le finding 02 (tension interne 3)
  documente que le décrochage date de 2017-2018 et que 4/5 des retards précèdent la crise de
  2024. L'auto-limitation est réelle, pas cosmétique.

**Les sections `## Recherche` sont-elles présentes et honnêtes ?** Oui dans les trois findings
échantillonnés : requêtes verbatim, bases consultées, sources écartées avec motif (y compris
des N1 écartés pour hors-périmètre, ce qui est le signe d'un tri réel et non d'un habillage),
et — remarquable — des aveux de vide : 02 (« aucune étude peer-reviewed… identifiée »), 04
(« pas d'étude N1 sur les erreurs de prévision françaises 2021-2026 »), 10 (« aucun polimètre
français actif identifié »). Le finding 04 signale même un timeout de fetch sur hcfp.fr et le
contournement utilisé. Traçabilité au-dessus du standard.

**Une source N5 déguisée ? Un chiffre central invérifiable ?** Pas de N5 déguisé dans
l'échantillon — les N5 sont explicitement écartés (iFRAP, blogs de cabinets, Constructif édité
par la FFB). Deux réserves de classement, mineures : luipresident.fr est noté N3 alors qu'un
tracker journalistique d'école relève plutôt du N4 (sans effet : F4 est convergent avec
Franceinfo et Le Monde, N4 assumés) ; et les chiffres PARTIPOL de 10-F2 sont pris dans The
Conversation (N4 signé des auteurs) avec le chapitre N1 cité par DOI mais apparemment non
consulté en texte intégral — vérification web faite, les chiffres sont exacts. Aucun chiffre
central invérifiable : les trois testés (7,9 %, ~60 %/>70 %, 66 %) tiennent. Le seul chiffre
qui ne tient pas est le 8,3 % de TM1 — voir pre-mortem, cause 1.

**Les confrontations (3bis) sont-elles reflétées loyalement ?** Oui, sur les deux vérifiables
depuis l'échantillon. TM1 reprend la confrontation du finding 10 quasi verbatim, **y compris
la réserve maintenue par l'angle 01** (l'échéance chiffrée 2027 comme « contrat de mesure »),
que la synthèse rappelle encore dans le scénario A — le désaccord résiduel n'est pas lissé.
TM2 reprend fidèlement la « négligence sélective du centre » du finding 02, avec le
différentiel 51-57 %/70-73 % et le test discriminant RSA accepté des deux camps. TM3 est
présentée comme **maintenue**, avec les deux positions finales exposées à parts égales et
l'aveu qu'aucun protocole du corpus ne tranche — c'est l'inverse d'un lissage. Les tensions
secondaires sont laissées au dossier sans arbitrage, conformément à la règle affichée.

## Verdict (premier passage)

réviser

`publier` était impossible : la cause 1 (incohérence 8,3 % / 7,9 % sur le chômage,
chiffre-vitrine du dossier) était de gravité haute et sans parade dans la synthèse.
Corrections exigées, par ordre de priorité :

1. **TM1 — le « chômage à 8,3 % »** : dater et sourcer ce chiffre (s'il s'agit d'une prévision
   2026 ou d'un chiffre d'un finding non échantillonné, le dire explicitement), ou l'aligner
   sur le 7,9 % INSEE T4 2025 utilisé en C1. Un même document ne peut pas porter deux taux de
   chômage incompatibles sans qualification.
2. **C1 et TM1 — le « ~3 % d'outcome pledges »** : préciser le périmètre (« ~3 % des promesses
   *au Royaume-Uni*, codage CPPP chap. 5 »), comme le fait le finding 10 ; ne pas le présenter
   comme une propriété générale, encore moins française.
3. **C1 — « 7 institutions productrices indépendantes »** : reformuler ou renvoyer
   explicitement à la limite documentée par 02 (le taux d'application n'a qu'un seul
   producteur, le Sénat, juge et partie sur ses propres amendements) — la note de calibration
   traite le double comptage r25-802, pas cette dépendance-là.
4. *(Mineur, non bloquant)* Requalifier luipresident.fr de N3 en N4 dans le finding 10, ou
   justifier le N3.

## Second passage (2026-07-10)

1. **8,3 % (TM1)** : corrigé et exact. Le chiffre est désormais daté et sourcé (prévision OFCE
   d'avril 2026 pour 2027, l'échéance de la promesse de 5 %) et réconcilié avec le 7,9 % INSEE
   T4 2025 et le 8,1 % T1 2026 — recoupé avec les findings 01 (OFCE : 8,2 % en 2026, 8,3 % en
   2027) et 08 (INSEE T1 2026 : 8,1 %) : la citation est fidèle. Le scénario A est aligné
   (« fourchette 8,2-8,3 % prévue par l'OFCE »). La cause haute du pre-mortem est levée.
2. **~3 % (C1 et TM1)** : corrigé dans les deux occurrences — périmètre Royaume-Uni explicité,
   distribution française déclarée non mesurée dans le corpus. Conforme au finding 10.
3. **Indépendance des producteurs (C1 + note de calibration)** : corrigé — « 7 institutions,
   dont 6 indépendantes entre elles », dépendance au producteur unique Sénat ajoutée à la note
   de calibration, et maintien de la confiance haute justifié (le consensus tient sans le
   pilier « application des lois » : 7 angles, 6 institutions). Justification recevable.
4. **luipresident.fr** : requalifié N4 dans la synthèse (C3), avec la mention que la note ne
   change pas, le point étant porté par le N1 PARTIPOL/CPPP. Le finding 10 conserve son N3
   d'origine, mais la parade est dans le document publié — acceptable pour un point mineur.

## Verdict

publier

Aucune cause de gravité haute ne subsiste : la seule (incohérence des taux de chômage) a reçu
une parade complète et vérifiée dans la synthèse ; les deux causes moyennes du pre-mortem sont
désormais couvertes (périmètre britannique explicité ; dépendance sénatoriale documentée avec
justification du maintien de la note).
