#!/bin/bash
# scripts/cron-bluesky-stats.sh
# Wrapper cron : snapshot hebdo Bluesky → data/bluesky-stats.jsonl → commit/push.
#
# Sans ce wrapper, `node scripts/bluesky-stats.mjs` laisse un WIP local qui
# bloque TOUS les `git pull --rebase` des autres crons (harvest, drift, …)
# jusqu'au dimanche suivant.
#
# Installation crontab (remplace l'appel direct à bluesky-stats.mjs) :
#   0 22 * * 0 /home/debian/agentic-news/agent-quotidien/scripts/cron-bluesky-stats.sh >> /tmp/bluesky-stats.log 2>&1

set -u
export PATH="/usr/local/bin:/usr/bin:/bin"

REPO="/home/debian/agentic-news/agent-quotidien"
LOCK="/tmp/agent-quotidien-bluesky-stats.lock"

exec 9>"$LOCK"
flock -n 9 || { echo "$(date -Iseconds) skip: bluesky-stats déjà en cours"; exit 0; }

cd "$REPO" || { echo "$(date -Iseconds) erreur: $REPO introuvable"; exit 1; }

# shellcheck source=scripts/lib/cron-git.sh
. "$(dirname "$0")/lib/cron-git.sh"

cron_git_sync || { echo "$(date -Iseconds) sync git échec, abandon"; exit 0; }

node scripts/bluesky-stats.mjs || { echo "$(date -Iseconds) bluesky-stats.mjs échec"; cron_git_restore_stash; exit 0; }

DATE="$(date +%F)"
if cron_git_commit_push "Bluesky stats ${DATE}" data/bluesky-stats.jsonl; then
  echo "$(date -Iseconds) bluesky-stats+push OK (${DATE})"
fi
