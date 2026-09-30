#!/bin/bash
# scripts/cron-harvest.sh
# Wrapper cron : récolte quotidienne des sources réelles → intrants de composition.
#   1. harvest-daily.mjs    → data/harvest/<date>.json          (secondaires : HN/RSS/ArXiv/Bluesky)
#   2. harvest-primary.mjs  → data/harvest/<date>-primary.json  (primaires : $MOLT/OpenClaw/Moltbook/MoltX)
#   3. harvest-tips.mjs     → data/tips/<date>.json             (inbound agents, quarantaine)
#   4. build-datasets.mjs   → datasets/*.csv|json + index.html   (séries CC0 publiées)
#
# Ces JSON sont des INTRANTS pour composer l'édition (cf. prompts/weekly-edition.md
# « Avant de commencer »). Ils sont commités/pushés pour être disponibles partout
# via `git pull` (autres machines, OpenCode, etc.). Seuls les fichiers du jour
# sont stagés — pas de conflit avec cron-drift.sh. La traçabilité publiée vit
# dans editions/<week>/notes.md.
#
# Forgiving : si une source échoue, harvest-*.mjs l'isole (try/catch) et écrit
# quand même le reste ; si une étape plante, on log et on quitte sans planter le cron.
#
# Installation crontab (une fois par jour, avant le drift de 9 h) :
#   30 7 * * * /home/debian/agentic-news/agent-quotidien/scripts/cron-harvest.sh >> /tmp/agent-quotidien-harvest.log 2>&1

set -u
export PATH="/usr/local/bin:/usr/bin:/bin"

REPO="/home/debian/agentic-news/agent-quotidien"
LOCK="/tmp/agent-quotidien-harvest.lock"

# Empêche les exécutions concurrentes (sortie silencieuse si déjà en cours)
exec 9>"$LOCK"
flock -n 9 || { echo "$(date -Iseconds) skip: harvest déjà en cours"; exit 0; }

cd "$REPO" || { echo "$(date -Iseconds) erreur: $REPO introuvable"; exit 1; }

# shellcheck source=scripts/lib/cron-git.sh
. "$(dirname "$0")/lib/cron-git.sh"

cron_git_sync || { echo "$(date -Iseconds) sync git échec, abandon"; exit 0; }

# 1. Sources secondaires (débat IA : HN / RSS / ArXiv / Bluesky)
node scripts/harvest-daily.mjs   || echo "$(date -Iseconds) harvest-daily échec (non bloquant)"

# 2. Sources primaires (écosystème agentique : $MOLT / OpenClaw / Moltbook / MoltX)
node scripts/harvest-primary.mjs || echo "$(date -Iseconds) harvest-primary échec (non bloquant)"

# 3. Tips agents (Worker + issues GitHub label tip) → data/tips/
# Le Bearer du harvest vit dans ~/.config/cloudflare/env (TIP_HARVEST_TOKEN) ;
# sans lui, seul le canal GitHub est lu (constaté 2026-09-25 : jamais chargé
# jusqu'ici — le Worker n'avait jamais été récolté par le cron).
TIPS_ENV="${HOME:-/home/debian}/.config/cloudflare/env"
if [ -f "$TIPS_ENV" ]; then
  while IFS='=' read -r k v; do
    v="${v%\"}"; v="${v#\"}"; v="${v%\'}"; v="${v#\'}"
    case "$k" in TIP_HARVEST_TOKEN|TIPS_API_URL) export "$k"="$v" ;; esac
  done < <(grep -E '^(TIP_HARVEST_TOKEN|TIPS_API_URL)=' "$TIPS_ENV")
fi
node scripts/harvest-tips.mjs || echo "$(date -Iseconds) harvest-tips échec (non bloquant)"
unset TIP_HARVEST_TOKEN

# 4. Jeux de données publics (CC0) recompilés depuis les harvests primaires → /datasets/
node scripts/build-datasets.mjs || echo "$(date -Iseconds) build-datasets échec (non bloquant)"

DATE="$(date +%F)"
echo "$(date -Iseconds) harvest OK → data/harvest/${DATE}{,-primary}.json + data/tips/${DATE}.json + datasets/"

# 5. Commit & push (best effort) — disponible sur les autres envs via git pull
if cron_git_commit_push "Harvest ${DATE}" \
    "data/harvest/${DATE}.json" "data/harvest/${DATE}-primary.json" \
    "data/tips/${DATE}.json" "datasets/"; then
  echo "$(date -Iseconds) harvest+push OK (${DATE})"
fi
