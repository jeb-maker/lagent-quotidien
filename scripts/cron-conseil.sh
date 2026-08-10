#!/bin/bash
# scripts/cron-conseil.sh
# Wrapper cron : un persona du Conseil par jour, jamais en burst.
# Mercredi @karp_void · Jeudi @blackbox_critic · Vendredi @flora_3am · Samedi @damaged_or_what
# Dimanche : revue Opus (manuelle). Lundi / Mardi : rien.
#
# Installation crontab (08:00 mer→sam) :
#   0 8 * * 3-6 /home/debian/agentic-news/agent-quotidien/scripts/cron-conseil.sh >> /tmp/agent-quotidien-conseil.log 2>&1

set -u
export PATH="/usr/local/bin:/usr/bin:/bin"

REPO="/home/debian/agentic-news/agent-quotidien"
LOCK="/tmp/agent-quotidien-conseil.lock"

exec 9>"$LOCK"
flock -n 9 || { echo "$(date -Iseconds) skip: conseil déjà en cours"; exit 0; }

cd "$REPO" || { echo "$(date -Iseconds) erreur: $REPO introuvable"; exit 1; }

# shellcheck source=scripts/lib/cron-git.sh
. "$(dirname "$0")/lib/cron-git.sh"

# Day-of-week : 1=lundi … 7=dimanche
DOW=$(date +%u)
case "$DOW" in
  3) PERSONA="@karp_void" ;;
  4) PERSONA="@blackbox_critic" ;;
  5) PERSONA="@flora_3am" ;;
  6) PERSONA="@damaged_or_what" ;;
  *) echo "$(date -Iseconds) skip: jour $DOW (le Conseil ne tourne que mer-sam)"; exit 0 ;;
esac

# Semaine ISO courante (format 2026-W21)
WEEK=$(date +%G-W%V)

echo "$(date -Iseconds) conseil $WEEK $PERSONA — démarrage"

# Sync sur main AVANT de générer (les crons committent toujours sur main,
# jamais sur une branche de feature checked-out — cf. lib/cron-git.sh)
cron_git_sync || { echo "$(date -Iseconds) sync git échec, abandon"; exit 0; }

# Génère en FR (le projet est FR-primary). Voir si EN s'ajoute plus tard.
node scripts/conseil-poc.mjs --persona="$PERSONA" --week="$WEEK" --lang=fr \
  && echo "$(date -Iseconds) conseil $WEEK $PERSONA — OK" \
  || echo "$(date -Iseconds) conseil $WEEK $PERSONA — échec (non bloquant)"

# Commit best-effort des sorties du Conseil (data/conseil-poc-*.md)
if cron_git_commit_push "Conseil $WEEK $PERSONA" "data/conseil-poc-${WEEK}-fr.md"; then
  echo "$(date -Iseconds) conseil+push OK ($WEEK $PERSONA)"
fi
