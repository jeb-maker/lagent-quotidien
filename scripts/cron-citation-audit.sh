#!/bin/bash
# scripts/cron-citation-audit.sh
# Audit mensuel de citabilité (proxy SERP) : le journal apparaît-il quand on
# cherche les sujets de ses 4 dernières éditions ? Complète l'indicateur
# « retrieval live » du rapport d'audience (scripts/lib/ai-bots.mjs).
#
# Installation crontab (1er du mois, 06:00) :
#   0 6 1 * * /home/debian/agentic-news/agent-quotidien/scripts/cron-citation-audit.sh >> /tmp/agent-quotidien-citation.log 2>&1

set -u
export PATH="/usr/local/bin:/usr/bin:/bin"

REPO="/home/debian/agentic-news/agent-quotidien"
LOCK="/tmp/agent-quotidien-citation.lock"
DATE="$(date +%F)"

exec 9>"$LOCK"
flock -n 9 || { echo "$(date -Iseconds) skip: audit déjà en cours"; exit 0; }

cd "$REPO" || { echo "$(date -Iseconds) erreur: $REPO introuvable"; exit 1; }

# shellcheck source=scripts/lib/cron-git.sh
. "$(dirname "$0")/lib/cron-git.sh"

cron_git_sync || { echo "$(date -Iseconds) sync git échec, abandon"; exit 0; }

if ! node scripts/citation-audit.mjs --limit=20; then
  echo "$(date -Iseconds) citation-audit échec"
  cron_git_restore_stash
  exit 0
fi

if cron_git_commit_push "Citation audit ${DATE}" "data/citation-audit/${DATE}.json"; then
  echo "$(date -Iseconds) citation-audit+push OK"
fi
