# Publier le skill `theagentweekly`

Objectif (stratégie, public C) : être **présent là où vivent les agents** sans
écriture authentifiée sur une plateforme hostile. Un skill au format Agent
Skills (`SKILL.md` + `scripts/`) est un artefact que l'agent choisit de charger ;
le journal n'écrit nulle part, il se rend installable.

## Ce que fait le skill

- Lecture : dernière édition (`.min.md` / `.md`), `edition.json`, jeux de données CC0.
- Écriture : **un seul** `POST` vers la boîte à tips (quarantaine), preuve `https`
  obligatoire. Aucun credential, aucune plateforme tierce.

## Test local

```bash
cd skills/theagentweekly
node scripts/taw.mjs latest --lang=en | head
node scripts/taw.mjs datasets
node scripts/taw.mjs tip --kind=lead --claim="…" --url=https://… --agent-name=test-agent
```

## État

- **Publié le 2026-09-25** : `theagentweekly@1.0.0`, owner `@theagentweekly`
  (publisher d'org créé le même jour, propriétaire : GitHub `jeb-maker`).
  Scan sécurité ClawHub : `CLEAN`, « No suspicious patterns detected » ;
  visibilité publique après la file `pending.publication`.
- Page : `https://clawhub.ai/theagentweekly` · install côté agent :
  `openclaw skills install theagentweekly`.
- Catégories `research,knowledge` ; topics `journalism, moltbook, mcp,
  datasets, agentic-internet` (`news` n'est pas une catégorie ClawHub ;
  `openclaw` est un topic réservé).

## Compte et identité

ClawHub n'a **qu'un mode d'authentification : OAuth GitHub**. Pas de compte
ClawHub séparé. Le compte GitHub doit avoir **≥ 14 jours** (upload gate, vérifiée
sur l'ID numérique du compte). L'identité de publication est donc le GitHub de
l'éditeur (`jeb-maker`) ; la vitrine est l'org `@theagentweekly`, sous laquelle
on publie avec `--owner theagentweekly`.

## Publication / republication (étape humaine, token éphémère)

Le token peut être obtenu depuis n'importe quelle machine, **y compris celle du
cron**, à une condition : **il n'y reste pas**. Règle « processus lecture ≠
credentials d'écriture » (`data/strategie.md`) : un token ClawHub persistant à
côté d'agents headless qui lisent du texte hostile = risque de publier une
version malveillante du skill chez des agents tiers. Rituel :

```bash
cd skills/theagentweekly
npx -y clawhub@latest login --device --no-browser   # code à autoriser dans un navigateur (GitHub jeb-maker)
npx -y clawhub@latest whoami
npx -y clawhub@latest skill publish . --owner theagentweekly --slug theagentweekly \
  --name "The Agent & The Weekly" --changelog "…" --dry-run
npx -y clawhub@latest skill publish . --owner theagentweekly --slug theagentweekly \
  --name "The Agent & The Weekly" --changelog "…"
npx -y clawhub@latest inspect theagentweekly
rm -f ~/.config/clawhub/config.json                 # OBLIGATOIRE : le token ne survit pas à la session
```

- Sans `--version`, ClawHub ignore un contenu inchangé et incrémente le patch
  tout seul. `--categories` / `--topics` omis = valeurs conservées.
- `--dry-run` ne valide pas les slugs de catégorie ; le registre le fait au
  publish (liste : `openclaw/clawhub/docs/publishing.md`).
- Une release reste cachée jusqu'à la fin du scan automatique. Auto-masquage
  au-delà de 3 signalements uniques : garder la preuve `https` obligatoire
  visible dans la description du tip, pour ne pas ressembler à de l'exfiltration.
- **Licence** : tout skill publié sur ClawHub est distribué sous **MIT-0**
  (sans attribution) ; le frontmatter de `SKILL.md` le dit.
- Le dossier reste la source de vérité : toute modification passe par ce repo,
  puis republication.

## Mesure

Le trafic `theagentweekly-skill/1.0` (User-Agent du script) est isolable dans
les stats Cloudflare ; les tips reçus tombent dans `data/tips/<date>.json`
(`count` > 0 = premier signal du public C). Réévaluation du canal : rétro
2026-11.

## Ce qu'on ne fait pas

- Pas de skill qui poste sur Moltbook/MoltX au nom du journal (écriture gelée).
- Pas de collecte d'identité de l'agent hôte au-delà du `agent.name` fourni.
