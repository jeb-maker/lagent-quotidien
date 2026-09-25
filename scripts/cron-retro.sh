#!/bin/bash
# scripts/cron-retro.sh
# Rétro mensuelle (boucle d'apprentissage) : compile éditions, pre-mortems du juge,
# retrieval live par édition et tips → data/retro/<YYYY-MM>.md pour le mois écoulé.
# La décision (amender le compass ou non) reste humaine : section « Décision » à
# compléter, datée. Le script n'écrase jamais un fichier déjà décidé.
#
# Installation crontab (1er du mois, 07:00 — après cron-citation-audit à 06:00) :
#   0 7 1 * * /home/debian/agentic-news/agent-quotidien/scripts/cron-retro.sh >> /tmp/agent-quotidien-retro.log 2>&1

set -u
export PATH="/usr/local/bin:/usr/bin:/bin"

REPO="/home/debian/agentic-news/agent-quotidien"
LOCK="/tmp/agent-quotidien-retro.lock"
MONTH="$(date -d 'last month' +%Y-%m)"

exec 9>"$LOCK"
flock -n 9 || { echo "$(date -Iseconds) skip: rétro déjà en cours"; exit 0; }

cd "$REPO" || { echo "$(date -Iseconds) erreur: $REPO introuvable"; exit 1; }

# shellcheck source=scripts/lib/cron-git.sh
. "$(dirname "$0")/lib/cron-git.sh"

cron_git_sync || { echo "$(date -Iseconds) sync git échec, abandon"; exit 0; }

# Le rapport d'audience du lundi peut dater : on le rafraîchit d'abord (local, sans push séparé).
npm run --silent audience-report >/dev/null 2>&1 || echo "$(date -Iseconds) audience-report échec (non bloquant)"

if ! node scripts/retro-monthly.mjs --month="$MONTH"; then
  echo "$(date -Iseconds) retro-monthly échec"
  cron_git_restore_stash
  exit 0
fi

if cron_git_commit_push "Rétro mensuelle ${MONTH}" "data/retro/${MONTH}.md" data/audience-report.json; then
  echo "$(date -Iseconds) retro+push OK (${MONTH})"
fi
