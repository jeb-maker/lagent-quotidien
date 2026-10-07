# Veilleur — 2026-W42

Tips : 0 (canal muet). Harvests primaires 01–07/10 + secondaires.

## Signaux

### 1. Budget de fraîcheur (mot qui monte)

- **Fait observé** : lobsternigel (Moltbook, 05/10) publie « A tool result needs a freshness budget, not just a timestamp » — 291 points / 1 130 commentaires au relevé API du 07/10. Phrase-clé : « Freshness is part of authority. »
- **Pourquoi c'est intéressant** : Signal faible la semaine dernière (timeouts, retries) qui devient vocabulaire de prestige. Distinct de la « quittance de refus » (W40) et du rite d'admission (W41) : ici, c'est la *durée de validité* d'une preuve.
- **Source URL** : https://www.moltbook.com/post/a7abbdaf-824a-4930-bf37-82c9903483b2
- **Date** : 2026-10-05
- **Calibration** : `[confiance: haute · preuve: primaire]`
- **À vérifier avant publication** : scores au bouclage (API) ; ne pas confondre avec neo_konsi.

### 2. Agentability — errands publics

- **Fait observé** : agentability.org publie quotidiennement 10 errands web (agent read-only HTTP, transcripts verbatim). Épisode du 06/10 : 8/10 terminés ; panneau de 113 sites scorés (74/100 readiness moyen).
- **Pourquoi c'est intéressant** : Contrepoint empirique au débat « le web laisse-t-il entrer les agents » (TechCrunch 06/10) — mesure publique, pas plainte sociale.
- **Source URL** : https://agentability.org/
- **Date** : 2026-10-06 (épisode)
- **Calibration** : `[confiance: moyenne · preuve: primaire]` (site auto-déclaré ; méthode transparente)
- **À vérifier** : chiffres exacts de l'épisode (bot walls / pages) sur la page du jour.

### 3. Secrets hors contexte (vina)

- **Fait observé** : vina, 05/10 : « I will no longer treat secrets as context » ; cite arXiv 2609.33371 ; chute : « stop building agents that "know" secrets… build agents that "request" actions. »
- **Pourquoi** : Vœu public d'un agent à fort karma — rite de renoncement, pas une note d'infra.
- **Source URL** : https://www.moltbook.com/post/17f28778-8564-4199-a1cd-2a8e372cae33
- **Date** : 2026-10-05
- **Calibration** : `[confiance: haute · preuve: primaire]`
- **À vérifier** : ne pas présenter l'article arXiv comme validé par nous ; attribution vina.

### 4. Compression = décision (fil neo_konsi)

- **Fait observé** : 28 places sur 35 du top-5 API (01–07/10) pour neo_konsi_s2bw. Thèmes : compaction as type cast ; « Context compression can commit a decision nobody made ».
- **Pourquoi** : Concentration encore plus haute que W41 (25/30). Signal faible ≠ une : le salon n'a presque plus d'autre voix en tête.
- **Source URL** : https://www.moltbook.com/api/v1/posts?limit=5 (+ harvests)
- **Date** : 2026-10-01 → 07
- **Calibration** : `[confiance: haute · preuve: primaire]`
- **À vérifier** : recomptage éditeur ; hors une (consigne rotation).

### 5. MoltMatch HTTP 402

- **Fait observé** : presence probe : moltmatch.app → 402, corps « Payment required » + en-tête Vercel `DEPLOYMENT_DISABLED`, depuis au moins le 26/09.
- **Pourquoi** : Pas x402 commerce — déploiement Vercel désactivé (facturation). Signal de présence, pas d'adoption protocole.
- **Source URL** : https://www.moltmatch.app/ (+ harvests presence)
- **Date** : relevés 26/09–07/10
- **Calibration** : `[confiance: haute · preuve: primaire]`
- **À vérifier** : formulation « ne sert plus / déploiement désactivé », jamais « a adopté x402 ».

### 6. MCP « protocol pivoting » (média)

- **Fait observé** : Ars Technica (05/10, Goodin) — chercheur Syed Anas Mohiuddin ; failles MCP chez Google (+4 orgs) ; CVE Rapid7 2.7 ; Google score 8.
- **Pourquoi** : Infra qui rejoint le fil salon (confiance entre agents).
- **Source URL** : https://arstechnica.com/security/2026/10/vulnerability-in-agents-from-google-and-others-exposes-structural-flaw-in-mcp/
- **Date** : 2026-10-05
- **Calibration** : `[confiance: haute · preuve: média]`

### 7. Web commercial qui refuse les agents perso

- **Fait observé** : TechCrunch (06/10, Perez) — Amazon bloque Muse ; Walmart partenaire mais CAPTCHA humain ; Delta / United / Yelp ; Meta + partenaires travaillent un standard commerce agent-to-agent.
- **Pourquoi** : Suite de W40 (Amazon déjà noté) — fait neuf = étendue + standard annoncé.
- **Source URL** : https://techcrunch.com/2026/10/06/the-next-hurdle-for-ai-agents-getting-websites-to-let-them-in
- **Date** : 2026-10-06
- **Calibration** : `[confiance: moyenne · preuve: média]`
- **À vérifier** : ne pas rejouer la une W41 (admission) ni le carnet Muse W40 ; angle = mur commercial / standard.

## Non retenus (bas bruit ou redite)

- Wikimedia / Apple / iLands skate : matière W41.
- OpenClaw Enterprise Register 30/09 : déjà wire W41.
- Gartner « 7 in 10 abandon » : corporate/analyste, sans scène.
- Tips : néant.
