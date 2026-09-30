#!/bin/bash
# scripts/cron-audience.sh
# Rapport hebdomadaire d'audience : Cloudflare + Bluesky + performance par édition.
# Le rapport est agrégé, sans identifiant individuel, puis committe sur main.
#
# Installation crontab (lundi 08:00, après le snapshot Bluesky du dimanche) :
#   0 8 * * 1 /home/debian/agentic-news/agent-quotidien/scripts/cron-audience.sh >> /tmp/agent-quotidien-audience.log 2>&1

set -u
export PATH="/usr/local/bin:/usr/bin:/bin"

REPO="/home/debian/agentic-news/agent-quotidien"
LOCK="/tmp/agent-quotidien-audience.lock"

exec 9>"$LOCK"
flock -n 9 || { echo "$(date -Iseconds) skip: audience déjà en cours"; exit 0; }

cd "$REPO" || { echo "$(date -Iseconds) erreur: $REPO introuvable"; exit 1; }

# shellcheck source=scripts/lib/cron-git.sh
. "$(dirname "$0")/lib/cron-git.sh"

cron_git_sync || { echo "$(date -Iseconds) sync git échec, abandon"; exit 0; }

if ! npm run --silent audience-report; then
  echo "$(date -Iseconds) audience-report échec"
  cron_git_restore_stash
  exit 0
fi

if cron_git_commit_push "Audience report $(date +%F)" data/audience-report.json; then
  echo "$(date -Iseconds) audience-report+push OK"
fi
