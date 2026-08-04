#!/bin/bash
# scripts/cron-observatoire.sh
# Wrapper cron : Observatoire de la planète — harvest RSS environnement
# → data/observatoire/<date>.json → pages /observatoire/.
#
# Forgiving : si un flux échoue, harvest-planete.mjs l'isole (try/catch) et écrit
# quand même ; si le run global échoue, on log et on quitte sans planter le cron.
#
# Installation crontab suggérée (après cron-world-pulse) :
#   50 7 * * * /home/debian/agentic-news/agent-quotidien/scripts/cron-observatoire.sh >> /tmp/agent-quotidien-observatoire.log 2>&1

set -u
# Cron environments can have a minimal PATH; include common local locations.
export PATH="/home/debian/.local/bin:/usr/local/bin:/usr/bin:/bin"

REPO="/home/debian/agentic-news/agent-quotidien"
LOCK="/tmp/agent-quotidien-observatoire.lock"

exec 9>"$LOCK"
flock -n 9 || { echo "$(date -Iseconds) skip: observatoire déjà en cours"; exit 0; }

cd "$REPO" || { echo "$(date -Iseconds) erreur: $REPO introuvable"; exit 1; }

# shellcheck source=scripts/lib/cron-git.sh
. "$(dirname "$0")/lib/cron-git.sh"

cron_git_sync || { echo "$(date -Iseconds) sync git échec, abandon"; exit 0; }

node scripts/harvest-planete.mjs || echo "$(date -Iseconds) harvest-planete échec (non bloquant)"

node scripts/render-observatoire.mjs || echo "$(date -Iseconds) render-observatoire échec (non bloquant)"

DATE="$(date +%F)"
OUT="data/observatoire/${DATE}.json"
echo "$(date -Iseconds) observatoire run → ${OUT}"

if cron_git_commit_push "Observatoire planète ${DATE}" "${OUT}" observatoire/; then
  echo "$(date -Iseconds) observatoire+push OK (${DATE})"
fi
