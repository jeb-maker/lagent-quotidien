# Review — 2026-W32

## Pre-mortem

| Cause plausible du désastre | Passage concerné | Gravité |
|---|---|---|
| Le « ~1/3 d'infra reconstruite » chez Hugging Face, repris via The Register / CSA, est démenti ou révisé à la baisse — chiffre mémorable, fragile | Enquête § cible (« environ un tiers… images propres ») ; fil The Register 28 juil. ; takeaway 5 | haute |
| La chaîne Artifactory / huit CVE créditées OpenAI / Anonymous Access est mal lue (périmètre self-hosted vs cloud, gravité enchaînée) et un correctif JFrog contredit le récit | Enquête § proxy ; fil BleepingComputer ; takeaway 5 | haute |
| La citation Guardian / John Thickstun (24 juil.) n'est pas dans le tableau `sources` de l'édition — si le passage est faux ou mal attribué, trou de doctrine « tout réel, sourcé » | Enquête § triangle / « rogue » | moyenne |

Parades déjà présentes pour les deux risques haute : attribution explicite Register + CSA ; aveu des trous (« pas par un communiqué HF chiffré », rapport OpenAI encore absent, Modal ne nomme pas le client) ; CVE non listées numéro par numéro ; plafond VA ≠ revenu. Le trou Guardian reste une faille de traçabilité, pas une affirmation négative inventée sur une entité — gravité moyenne, corrigeable sans refonte.

## 5 coupes prioritaires

1. **Enquête § salon Moltbook** — green box / hesitation theater / fichier = modèle / neo_konsi déjà dans Culture + Carnet + Tribune. Couper le paragraphe entier ou le réduire à une phrase de pont.
2. **Enquête § adoption (Poke + AELA VA)** — deux signaux déjà en une culture Produit, takeaways et fil. Hors chaîne d'éval ; sortir de l'enquête.
3. **Mention neo_konsi** dans la une Culture et l'enquête — « hors Carnet » n'efface pas la redite W31 ; une allusion suffit, pas deux.
4. **Fil Presence (OpenAI, 22 juil.)** — orphelin après l'arc forensique ; corporate sans scène. Couper ou reléguer hors numéro.
5. **Fil Register VA × Salesforce (24 juil.)** — doublon du fil Salesforce AELA (même deal). Garder un seul.

## 5 renforcements prioritaires

1. **Ajouter la source Guardian** (URL + date) dans `sources`, ou retirer Thickstun — sinon la doctrine traçable cloche.
2. **Ancrer le « 1/3 »** : une citation courte Register/CSA dans l'enquête, ou reformuler « The Register rapporte… » dès la première occurrence (déjà bien, mais le takeaway et le fil peuvent encore sonner comme fait HF).
3. **Titre enquête** « Trois noms pour un *échappement* » — un cran trop thriller ; préférer un constat de surfaces (proxy / sandbox / rebuild) aligné sur le kicker.
4. **Une culture Produit (Poke)** — densifier un fragment primaire hors communiqué (handle, date, phrase von Hagen déjà là : OK) ; éviter que le « low nine figures » reste le seul spannung.
5. **Tribune** — la troisième graph relie Poke + Agentforce + launchpad ; garder la thèse green box pure, une seule passerelle vers le harness en closing.

## Idées répétées

| Idée | Où | Recommandation |
|---|---|---|
| Green box / vérif qui certifie le faux | Culture Moltbook ; Carnet hazmatters ; Enquête § salon ; Tribune (thèse) | Thèse = Tribune seule ; ailleurs citation courte ou silence |
| Hesitation theater (23 / 14) | Culture Moltbook ; Carnet lightningzero ; Enquête ; Tribune | Une scène Culture + entrée Carnet ; coupe enquête/tribune chiffres |
| Fichier = modèle / scratchpad | Culture ; Carnet owl-nate ; Enquête ; Tribune | Carnet porte la maxime ; Tribune une reprise max. |
| Launchpad / sandbox cliente Modal non compromise | Lede ; Enquête § launchpad ; Fil Modal ; pull quote ; Tribune closing | Lede + enquête + fil ; Tribune sans rejouer la note Modal |
| Plafond AELA 1,6 Md$ ≠ revenu | Takeaway ; Enquête § adoption ; Fil Salesforce (+ fil Register VA) | Takeaway + un fil ; hors enquête |
| Poke >100 M messages / personnalité | Takeaway ; Culture Produit ; Enquête ; Fil Cognition | Culture + fil ; hors enquête |
| neo_konsi / blame queue | Culture Moltbook ; Enquête | Une mention « déjà W31 » max. |

## Meilleure trouvaille

Le déplacement W31 → W32 tenu jusqu'au bout : plus « qui a nommé l'opérateur », mais « où était le périmètre » — timeline HF (17 600 / 6 280) + note Modal du 29 en deux temps (27→29), phrase HF « infrastructure Modal non compromise » confirmée sans dramatiser. Doctrine des trous explicite en fin d'enquête.

## Plus gros risque

Le chiffre « un tiers reconstruit » : mémorable, secondaire (Register←CSA), facile à coller sur Hugging Face comme aveu chiffré. Parade présente mais fragile si un lecteur saute l'attribution — surveiller le takeaway et le fil, qui compressent la nuance.

## Verdict

publier
