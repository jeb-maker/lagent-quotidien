# Facteur — 2026-W42

| Affirmation | Source | Vérifié ? | Type de source | Confiance | Problème | Correction proposée |
|---|---|---|---|---|---|---|
| lobsternigel a écrit « Freshness is part of authority… » le 05/10 | API Moltbook post a7abbdaf… | OUI | primaire | haute | — | Citer verbatim ; scores = relevé daté |
| Score lobsternigel 291 / 1130 com. | API 07/10 | OUI | primaire | haute | Scores évoluent | « au relevé du 7 octobre » |
| vina : « stop building agents that "know" secrets… » | API post 17f28778… | OUI | primaire | haute | — | Attribution vina ; arXiv = ce qu'elle cite |
| Éval. Corvic vault « held across 16 probes » | vina cite arXiv 2609.33371 | PARTIEL | rapporté (via vina) | basse | Pas relu le PDF | Ne pas mettre en une comme fait établi ; « vina cite » |
| Agentability ép. 06/10 : 8/10 errands | agentability.org | OUI | primaire | moyenne | Auto-mesuré | Attribuer au site ; méthode visible |
| 113 sites, readiness moyen 74/100 | agentability.org | OUI | primaire | moyenne | Idem | Idem |
| Amazon bloque Muse shopping | TechCrunch 06/10 + déjà Ars/W40 | OUI | média | haute | Déjà W40 | Fait neuf = étendue (Walmart CAPTCHA, Delta, standard Meta) pas Amazon seul en une |
| Walmart partenaire Muse mais CAPTCHA bloque | TechCrunch 06/10 (spokesperson) | OUI | média | moyenne | — | Nuancer : « pas intentionnel » selon Walmart |
| Delta n'a pas d'intégration agent tiers | TechCrunch (citation Chavda) | OUI | média | moyenne | — | Wire / GT nuancé |
| MCP « protocol pivoting », Google + 4 orgs | Ars 05/10 | OUI | média | haute | — | Garder noms orgs cités par Ars ; CVE Rapid7 2.7, Google 8 |
| Cohere North 2 : ACL sur libraries/skills | Register 05/10 | OUI | média | moyenne | Corporate via média | Wire ; « Cohere dit » |
| OpenClaw Enterprise = Kubernetes for agents | Register 30/09 | OUI | média | moyenne | Déjà wire W41 | Couper ou une ligne max |
| MoltMatch répond 402 car x402 | presence + curl | NON | — | — | Vercel DEPLOYMENT_DISABLED | « déploiement désactivé (Vercel) », pas protocole x402 |
| MoltMatch down depuis 26/09 | harvests presence | OUI | primaire | haute | — | « depuis au moins le 26 septembre » |
| neo_konsi 28/35 places top-5 | harvests 01–07/10 | OUI | primaire | haute | — | Recompter éditeur |
| $MOLT ~3,47e-6 $ le 07/10 | CoinGecko via primary | OUI | marché | moyenne | Volatil | Wire si utile ; pas une |
| OpenClaw v2026.10.1-beta.1 publié 05/10 | GitHub releases harvest | OUI | primaire | haute | — | Wire |
| Corée du Sud / banques / agents IA | Reuters (HN) | NON | récit rapporté | basse | 401, article non relu | **Couper** |
| Instinct group chats | TechCrunch harvest | NON | — | basse | URL 404 au fetch | Couper ou revérifier |
| Tips inbound | tips.md | — | — | — | 0 tip | Rien |

## ACH — MoltMatch « a adopté les paiements x402 »

| Hypothèse | Ce qui la soutient | Ce qui la réfuterait | État |
|---|---|---|---|
| Vrai tel quel | Docs solana/x402 ailleurs ; code 402 | Corps + header Vercel DEPLOYMENT_DISABLED | réfutée |
| Vrai mais exagéré | Site payant volontairement | Message « Payment required » + disabled | affaiblie |
| Inventé / autre cause | Curl 07/10 | — | **soutenue** (déploiement coupé) |

→ **Couper** toute lecture x402. Garder : présence 402 / déploiement désactivé.

## ACH — « Le web refuse les agents » (lede)

| Hypothèse | Soutien | Réfuterait | État |
|---|---|---|---|
| Vrai tel quel | Amazon, Yelp, plaintes | Agentability 8/10 ; Walmart partenaire | affaiblie |
| Exagéré | Mix blocs intentionnels / anti-bot | TechCrunch le dit | **soutenue** |
| Inventé | — | Articles media | réfutée |

→ Nuancer : murs commerciaux + mesure Agentability dans la même édition. Pas de une alarmiste.

## Placement

- **Éligible une** (≥ média/primaire) : fraîcheur lobsternigel ; Agentability (chiffres attribués) ; vina (parole d'agent).
- **Wire** : Ars MCP ; Cohere ; MoltMatch 402 ; OpenClaw beta ; concentration neo_konsi ; TechCrunch mur web (si pas GT).
- **Couper** : Corée banques ; Instinct 404 ; OpenClaw Enterprise en reprise ; Corvic comme fait maison.
