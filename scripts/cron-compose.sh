#!/bin/bash
# scripts/cron-compose.sh
# Wrapper cron : lance l'agent Cursor en mode headless pour composer l'édition
# de la semaine, puis pousse sur edition/<week> + ouvre une PR draft GitHub.
#
# Forgiving : si une étape échoue, on log et on quitte sans planter le cron.
#
# Installation crontab (chaque mercredi 18 h, après le harvest du jour) :
#   0 18 * * 3 /home/debian/agentic-news/agent-quotidien/scripts/cron-compose.sh >> /tmp/agent-quotidien-compose.log 2>&1
#
# Logs :
#   /tmp/agent-quotidien-compose.log          — orchestration cron
#   /tmp/agent-quotidien-compose-<week>.log   — agent + edition-pr.sh

set -u
export PATH="/home/debian/.local/bin:/home/debian/.opencode/bin:/usr/local/bin:/usr/bin:/bin"

REPO="/home/debian/agentic-news/agent-quotidien"
LOCK="/tmp/agent-quotidien-compose.lock"
AGENT_LOCK="/tmp/agent-quotidien-compose-agent.lock"

exec 9>"$LOCK"
flock -n 9 || { echo "$(date -Iseconds) skip: compose déjà en cours"; exit 0; }

cd "$REPO" || { echo "$(date -Iseconds) erreur: $REPO introuvable"; exit 1; }

TARGET_WEEK=$(date -d "+6 days" +%G-W%V)
EDITION_DIR="editions/${TARGET_WEEK}"
BRANCH="edition/${TARGET_WEEK}"
LOG_AGENT="/tmp/agent-quotidien-compose-${TARGET_WEEK}.log"

echo "$(date -Iseconds) compose démarré → cible ${TARGET_WEEK} (branche ${BRANCH})"

git fetch origin --quiet 2>/dev/null || true

# Stash WIP locale pour pouvoir changer de branche (best effort)
STASHED=0
if ! git diff --quiet || ! git diff --cached --quiet || [ -n "$(git ls-files --others --exclude-standard)" ]; then
  git stash push -u -m "cron-compose-$(date +%s)" --quiet 2>/dev/null && STASHED=1 || true
fi

git checkout main --quiet 2>/dev/null || { echo "$(date -Iseconds) checkout main échec"; exit 0; }

if ! git pull --rebase origin main --quiet 2>/dev/null; then
  echo "$(date -Iseconds) git pull --rebase échec (conflit ?), abandon"
  git rebase --abort 2>/dev/null || true
  [ "$STASHED" -eq 1 ] && git stash pop --quiet 2>/dev/null || true
  exit 0
fi

# Branche edition/<week> : reprendre si elle existe, sinon créer depuis main
if git show-ref --verify --quiet "refs/heads/${BRANCH}"; then
  git checkout "$BRANCH" --quiet
elif git ls-remote --exit-code --heads origin "$BRANCH" >/dev/null 2>&1; then
  git checkout -t "origin/${BRANCH}" --quiet
else
  git checkout -b "$BRANCH" --quiet
fi

# Déjà publiable sur la branche → rien à faire
if [ -f "${EDITION_DIR}/edition.json" ]; then
  if npm run --silent gate -- "${TARGET_WEEK}" >/dev/null 2>&1; then
    EXISTING_PR=$(gh pr list --head "$BRANCH" --json url --jq '.[0].url' 2>/dev/null || echo '')
    echo "$(date -Iseconds) skip: ${TARGET_WEEK} passe déjà la porte"
    [ -n "$EXISTING_PR" ] && echo "$(date -Iseconds) PR : ${EXISTING_PR}"
    git checkout main --quiet 2>/dev/null || true
    [ "$STASHED" -eq 1 ] && git stash pop --quiet 2>/dev/null || true
    exit 0
  fi
fi

# Agent déjà lancé pour cette semaine
if [ -f "$AGENT_LOCK" ]; then
  OLD_PID=$(cat "$AGENT_LOCK" 2>/dev/null || true)
  if [ -n "$OLD_PID" ] && kill -0 "$OLD_PID" 2>/dev/null; then
    echo "$(date -Iseconds) skip: agent compose déjà actif (PID ${OLD_PID})"
    git checkout main --quiet 2>/dev/null || true
    [ "$STASHED" -eq 1 ] && git stash pop --quiet 2>/dev/null || true
    exit 0
  fi
  rm -f "$AGENT_LOCK"
fi

# Créer le dossier d'édition si absent (non interactif)
if [ ! -d "$EDITION_DIR" ]; then
  bash scripts/new-week.sh "${TARGET_WEEK}" \
    || { echo "$(date -Iseconds) new-week.sh échec"; exit 0; }
  echo "$(date -Iseconds) dossier créé : ${EDITION_DIR}"
fi

if ! command -v agent >/dev/null 2>&1; then
  echo "$(date -Iseconds) erreur: binaire 'agent' introuvable dans PATH"
  git checkout main --quiet 2>/dev/null || true
  [ "$STASHED" -eq 1 ] && git stash pop --quiet 2>/dev/null || true
  exit 0
fi

# Worker long-running en arrière-plan (agent + push branche + PR draft)
nohup bash scripts/cron-compose-run.sh "${TARGET_WEEK}" \
  >> "$LOG_AGENT" 2>&1 &
AGENT_PID=$!
echo "$AGENT_PID" > "$AGENT_LOCK"

git checkout main --quiet 2>/dev/null || true
[ "$STASHED" -eq 1 ] && git stash pop --quiet 2>/dev/null || true

echo "$(date -Iseconds) worker lancé PID=${AGENT_PID} → branche ${BRANCH}"
echo "$(date -Iseconds) log agent : ${LOG_AGENT}"
