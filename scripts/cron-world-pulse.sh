#!/bin/bash
# scripts/cron-world-pulse.sh
# Wrapper cron : Narrative Radar — harvest RSS monde → data/narrative-radar/<date>.json
#
# Forgiving : si un flux échoue, harvest-narratives.mjs l'isole (try/catch) et écrit
# quand même ; si le run global échoue, on log et on quitte sans planter le cron.
#
# Installation crontab suggérée (après cron-harvest, avant drift) :
#   45 7 * * * /home/debian/agentic-news/agent-quotidien/scripts/cron-world-pulse.sh >> /tmp/agent-quotidien-narrative-radar.log 2>&1

set -u
# Cron environments can have a minimal PATH; include common local locations.
export PATH="/home/debian/.local/bin:/usr/local/bin:/usr/bin:/bin"

REPO="/home/debian/agentic-news/agent-quotidien"
LOCK="/tmp/agent-quotidien-narrative-radar.lock"

exec 9>"$LOCK"
flock -n 9 || { echo "$(date -Iseconds) skip: narrative-radar déjà en cours"; exit 0; }

cd "$REPO" || { echo "$(date -Iseconds) erreur: $REPO introuvable"; exit 1; }

# shellcheck source=scripts/lib/cron-git.sh
. "$(dirname "$0")/lib/cron-git.sh"

cron_git_sync || { echo "$(date -Iseconds) sync git échec, abandon"; exit 0; }

node scripts/harvest-narratives.mjs || echo "$(date -Iseconds) harvest-narratives échec (non bloquant)"

node scripts/render-radar.mjs || echo "$(date -Iseconds) render-radar échec (non bloquant)"

DATE="$(date +%F)"
OUT="data/narrative-radar/${DATE}.json"
echo "$(date -Iseconds) narrative-radar run → ${OUT}"

if cron_git_commit_push "Narrative radar ${DATE}" "${OUT}" radar/; then
  echo "$(date -Iseconds) narrative-radar+push OK (${DATE})"
fi
