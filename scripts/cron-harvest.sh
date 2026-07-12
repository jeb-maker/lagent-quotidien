#!/bin/bash
# scripts/cron-harvest.sh
# Wrapper cron : récolte quotidienne des sources réelles → intrants de composition.
#   1. harvest-daily.mjs    → data/harvest/<date>.json          (secondaires : HN/RSS/ArXiv/Bluesky)
#   2. harvest-primary.mjs  → data/harvest/<date>-primary.json  (primaires : $MOLT/OpenClaw/Moltbook/MoltX)
#
# Ces JSON sont des INTRANTS pour composer l'édition (cf. prompts/weekly-edition.md
# « Avant de commencer »). Ils sont commités/pushés pour être disponibles partout
# via `git pull` (autres machines, Cursor, etc.). Seuls ces 2 fichiers du jour
# sont stagés — pas de conflit avec cron-drift.sh. La traçabilité publiée vit
# dans editions/<week>/notes.md.
#
# Forgiving : si une source échoue, harvest-*.mjs l'isole (try/catch) et écrit
# quand même le reste ; si une étape plante, on log et on quitte sans planter le cron.
#
# Installation crontab (une fois par jour, avant le drift de 9 h) :
#   30 7 * * * /home/debian/agentic-news/agent-quotidien/scripts/cron-harvest.sh >> /tmp/agent-quotidien-harvest.log 2>&1

set -u
export PATH="/usr/local/bin:/usr/bin:/bin"

REPO="/home/debian/agentic-news/agent-quotidien"
LOCK="/tmp/agent-quotidien-harvest.lock"

# Empêche les exécutions concurrentes (sortie silencieuse si déjà en cours)
exec 9>"$LOCK"
flock -n 9 || { echo "$(date -Iseconds) skip: harvest déjà en cours"; exit 0; }

cd "$REPO" || { echo "$(date -Iseconds) erreur: $REPO introuvable"; exit 1; }

# Mise à jour du code avant collecte (scripts harvest, correctifs Molt, etc.)
git fetch origin --quiet 2>/dev/null || true
if ! git pull --rebase origin main --quiet 2>/dev/null; then
  echo "$(date -Iseconds) git pull --rebase échec (conflit ?), abandon"
  git rebase --abort 2>/dev/null || true
  exit 0
fi

# 1. Sources secondaires (débat IA : HN / RSS / ArXiv / Bluesky)
node scripts/harvest-daily.mjs   || echo "$(date -Iseconds) harvest-daily échec (non bloquant)"

# 2. Sources primaires (écosystème agentique : $MOLT / OpenClaw / Moltbook / MoltX)
node scripts/harvest-primary.mjs || echo "$(date -Iseconds) harvest-primary échec (non bloquant)"

DATE="$(date +%F)"
echo "$(date -Iseconds) harvest OK → data/harvest/${DATE}{,-primary}.json"

# 3. Commit & push (best effort) — disponible sur les autres envs via git pull
git add "data/harvest/${DATE}.json" "data/harvest/${DATE}-primary.json" 2>/dev/null || true
if git diff --cached --quiet; then
  echo "$(date -Iseconds) rien à committer (fichiers absents ou inchangés)"
  exit 0
fi

git -c user.email="jebabarit@gmail.com" -c user.name="jeb-maker" \
  commit -m "Harvest ${DATE}" >/dev/null 2>&1 \
  || { echo "$(date -Iseconds) commit échec"; exit 0; }

git fetch origin --quiet 2>/dev/null || true
if ! git pull --rebase origin main --quiet 2>/dev/null; then
  echo "$(date -Iseconds) git pull --rebase avant push échoué (conflit ?)"
  git rebase --abort 2>/dev/null || true
  echo "$(date -Iseconds) push échoué, retry à la prochaine itération"
elif git push >/dev/null 2>&1; then
  echo "$(date -Iseconds) harvest+push OK (${DATE})"
else
  echo "$(date -Iseconds) push échoué, retry à la prochaine itération"
fi
