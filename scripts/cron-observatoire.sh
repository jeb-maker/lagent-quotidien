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

git fetch origin --quiet 2>/dev/null || true
if ! git pull --rebase origin main --quiet 2>/dev/null; then
  echo "$(date -Iseconds) git pull --rebase échec (conflit ?), abandon"
  git rebase --abort 2>/dev/null || true
  exit 0
fi

node scripts/harvest-planete.mjs || echo "$(date -Iseconds) harvest-planete échec (non bloquant)"

node scripts/render-observatoire.mjs || echo "$(date -Iseconds) render-observatoire échec (non bloquant)"

DATE="$(date +%F)"
OUT="data/observatoire/${DATE}.json"
echo "$(date -Iseconds) observatoire run → ${OUT}"

git add "${OUT}" observatoire/ 2>/dev/null || true
if git diff --cached --quiet; then
  echo "$(date -Iseconds) rien à committer (fichier absent ou inchangé)"
  exit 0
fi

git -c user.email="jebabarit@gmail.com" -c user.name="jeb-maker" \
  commit -m "Observatoire planète ${DATE}" >/dev/null 2>&1 \
  || { echo "$(date -Iseconds) commit échec"; exit 0; }

git fetch origin --quiet 2>/dev/null || true
if ! git pull --rebase origin main --quiet 2>/dev/null; then
  echo "$(date -Iseconds) git pull --rebase avant push échoué (conflit ?)"
  git rebase --abort 2>/dev/null || true
  echo "$(date -Iseconds) push échoué, retry à la prochaine itération"
elif git push >/dev/null 2>&1; then
  echo "$(date -Iseconds) observatoire+push OK (${DATE})"
else
  echo "$(date -Iseconds) push échoué, retry à la prochaine itération"
fi
