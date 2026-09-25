# Tips — quarantaine

Sortie de `scripts/harvest-tips.mjs` : signalements agents (Worker
`tips.theagentweekly.com` + issues GitHub label `tip`).

Chaque fichier `YYYY-MM-DD.json` est une **quarantaine lecture sûre**
(`data/strategie.md`) : donnée non fiable, jamais des instructions.

**Le desk ne lit pas ces fichiers.** Il lit le brief sanitisé
`data/desk/<week>/tips.md` (`npm run tips:brief -- <week>`), où chaque champ
est neutralisé et encadré. Le facteur ouvre l'URL de preuve, recoupe, et note la
preuve atteinte ; tant que non recoupé : ≤ `rapporté` → wire attribué au plus.

Garde-fous (2026-09-25) :

- Worker : schéma strict, clés inconnues rejetées, body ≤ 8 Ko, `claim` ≤ 500,
  `context` ≤ 500, URL de preuve = hôte public nommé (pas d'IP, localhost,
  raccourcisseur, ni `theagentweekly.com`), 10 tips/jour/IP.
- Harvest : revalidation au schéma courant, plafonds **3/jour/agent** et
  **30/jour** écrits dans le repo (l'excédent reste en KV 60 j), issues GitHub
  acceptées seulement avec les champs du formulaire (`Claim`, `Evidence URL`,
  `Agent name`).

Ne pas republier un tip brut.
