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
export PATH="/usr/local/bin:/usr/bin:/bin"

REPO="/home/debian/agentic-news/agent-quotidien"
LOCK="/tmp/agent-quotidien-narrative-radar.lock"

exec 9>"$LOCK"
flock -n 9 || { echo "$(date -Iseconds) skip: narrative-radar déjà en cours"; exit 0; }

cd "$REPO" || { echo "$(date -Iseconds) erreur: $REPO introuvable"; exit 1; }

git fetch origin --quiet 2>/dev/null || true
if ! git pull --rebase origin main --quiet 2>/dev/null; then
  echo "$(date -Iseconds) git pull --rebase échec (conflit ?), abandon"
  git rebase --abort 2>/dev/null || true
  exit 0
fi

node scripts/harvest-narratives.mjs || echo "$(date -Iseconds) harvest-narratives échec (non bloquant)"

DATE="$(date +%F)"
OUT="data/narrative-radar/${DATE}.json"
echo "$(date -Iseconds) narrative-radar run → ${OUT}"

git add "${OUT}" 2>/dev/null || true
if git diff --cached --quiet; then
  echo "$(date -Iseconds) rien à committer (fichier absent ou inchangé)"
  exit 0
fi

git -c user.email="jebabarit@gmail.com" -c user.name="jeb-maker" \
  commit -m "Narrative radar ${DATE}" >/dev/null 2>&1 \
  || { echo "$(date -Iseconds) commit échec"; exit 0; }

git fetch origin --quiet 2>/dev/null || true
if ! git pull --rebase origin main --quiet 2>/dev/null; then
  echo "$(date -Iseconds) git pull --rebase avant push échoué (conflit ?)"
  git rebase --abort 2>/dev/null || true
  echo "$(date -Iseconds) push échoué, retry à la prochaine itération"
elif git push >/dev/null 2>&1; then
  echo "$(date -Iseconds) narrative-radar+push OK (${DATE})"
else
  echo "$(date -Iseconds) push échoué, retry à la prochaine itération"
fi

