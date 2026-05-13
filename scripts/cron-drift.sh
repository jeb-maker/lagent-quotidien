#!/bin/bash
# scripts/cron-drift.sh
# Wrapper cron : drift déterministe → render → commit → push.
# Forgiving : si une étape échoue, on log et on quitte sans planter le cron.
#
# Installation crontab (toutes les 4 h) :
#   0 */4 * * * /home/debian/agentic-news/agent-quotidien/scripts/cron-drift.sh >> /tmp/agent-quotidien-drift.log 2>&1

set -u
export PATH="/usr/local/bin:/usr/bin:/bin"

REPO="/home/debian/agentic-news/agent-quotidien"
LOCK="/tmp/agent-quotidien-drift.lock"

# Empêche les exécutions concurrentes (sortie silencieuse si déjà en cours)
exec 9>"$LOCK"
flock -n 9 || { echo "$(date -Iseconds) skip: drift déjà en cours"; exit 0; }

cd "$REPO" || { echo "$(date -Iseconds) erreur: $REPO introuvable"; exit 1; }

# 1. Drift numérique
node scripts/daily-drift.mjs || { echo "$(date -Iseconds) drift échec"; exit 0; }

# 2. Trouver l'édition la plus récente
WEEK=$(ls editions 2>/dev/null | grep -E '^[0-9]{4}-W[0-9]{2}$' | sort | tail -n1)
[ -z "$WEEK" ] && { echo "$(date -Iseconds) aucune édition"; exit 0; }

# 3. Re-render
npm run --silent render -- "$WEEK" >/dev/null 2>&1 || { echo "$(date -Iseconds) render échec"; exit 0; }

# 4. Commit & push (best effort)
git add -A
if git diff --cached --quiet; then
  echo "$(date -Iseconds) rien à committer"
  exit 0
fi

git -c user.email="jebabarit@gmail.com" -c user.name="jeb-maker" \
  commit -m "Drift $(date -Iminutes)" >/dev/null 2>&1 \
  || { echo "$(date -Iseconds) commit échec"; exit 0; }

if git push >/dev/null 2>&1; then
  echo "$(date -Iseconds) drift+push OK ($WEEK)"
else
  echo "$(date -Iseconds) push échoué, retry à la prochaine itération"
fi
