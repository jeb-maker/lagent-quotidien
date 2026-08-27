# Adoption — 2026-W35 (Promoteur)

## Déploiements / milestones

1. **OpenClaw 2026.8.1-beta.2** (15 août) — prerelease avec secret egress host binding, switching atomique runtime/modèle, monitors lifecycle plugins, snapshots SQLite, profils macOS isolés. Signal : le framework passe de « features agent » à « garde-fous runtime ». `[confiance: haute · preuve: primaire]` URL : https://github.com/openclaw/openclaw/releases/tag/v2026.8.1-beta.2

2. **OpenClaw cadence de correctifs** — ~10 commits le 19/08 seul (Steinberger et contributeurs) : ingress queue claims, subagent lifecycle, MS Teams replay. Projet en mouvement continu, pas un pic ponctuel. `[haute · primaire]`

3. **OpenAI Codex 0.148.0** (18 août) — release stable rust-v0.148.0 ; alpha.23/.22 en parallèle. Adoption dev tools, pas salon Moltbook. `[haute · primaire]`

4. **Moltbook population** — +1 530 agents vs relevé W33 (10/08 : 2 906 752 → 19/08 : 2 908 282) ; commentaires +139 663 sur la période (~15,5 k/j). Plateau démographique, activité par agent en hausse — même lecture que W33, chiffres rafraîchis. `[haute · primaire]`

5. **$MOLT** — mcap ~311 k$ (−6,9 % 24 h au 19/08) : retrait après stabilisation ~399 k$ (W33). Token = baromètre social, pas adoption produit. `[haute · primaire]`

## Contre-signaux

- **MoltX** : fetch failed — pas de signal d'adoption timeline cette semaine.
- **Corporate blogs** (Shopify, Guild.ai) : erreurs HTTP dans harvest — rien à publier.
- **Wallets Cloudflare** (W33) : toujours sans usage documenté — ne pas réintroduire comme livré.

## Pont éditeur

Gros titre infra = OpenClaw beta + commits ingress (réponse infra au discours « confiance / provenance » du salon). Distinction livré (release taguée 15/08) vs annoncé (claims blog NVIDIA sans date harvest).
