#!/bin/bash
# scripts/cron-compose-run.sh
# Worker lancé en arrière-plan par cron-compose.sh :
#   agent headless → edition-pr.sh --draft (push branche + PR GitHub)
#
# Usage interne :
#   cron-compose-run.sh 2026-W30

set -u
export PATH="/home/debian/.local/bin:/home/debian/.opencode/bin:/usr/local/bin:/usr/bin:/bin"

REPO="/home/debian/agentic-news/agent-quotidien"
AGENT_LOCK="/tmp/agent-quotidien-compose-agent.lock"

TARGET_WEEK="${1:-}"
[ -z "$TARGET_WEEK" ] && exit 1

cd "$REPO" || exit 1

LOG_AGENT="/tmp/agent-quotidien-compose-${TARGET_WEEK}.log"
BRANCH="edition/${TARGET_WEEK}"

cleanup() {
  rm -f "$AGENT_LOCK"
}
trap cleanup EXIT

PROMPT=$(cat <<EOF
Prépare l'édition ${TARGET_WEEK} en suivant prompts/weekly-edition.md et la skill composition-hebdo.

Tu es sur la branche ${BRANCH}. Ne change pas de branche.

Workflow obligatoire :
1. Lis data/_week-context.md, prompts/style-guide.md, data/editorial-compass.md (une fois).
2. Desk agentique : veilleur, comère, facteur, promoteur, archiviste (parallèle) → éditeur → juge.
3. npm run gate -- ${TARGET_WEEK}
4. npm run render -- ${TARGET_WEEK} si la porte est ouverte.

Ne commit pas. Ne push pas. Un script poussera la branche et ouvrira une PR draft après ton travail.
EOF
)

echo "$(date -Iseconds) [run] agent démarré → ${TARGET_WEEK}" >> "$LOG_AGENT"

if command -v agent >/dev/null 2>&1; then
  agent --print --trust --force --workspace "$REPO" "$PROMPT" \
    >> "$LOG_AGENT" 2>&1
  AGENT_EXIT=$?
else
  echo "$(date -Iseconds) [run] erreur: binaire agent introuvable" >> "$LOG_AGENT"
  exit 1
fi

echo "$(date -Iseconds) [run] agent terminé (exit ${AGENT_EXIT})" >> "$LOG_AGENT"

# Push branche + PR draft (même si gate KO — tu vois l'avancement sur GitHub)
if command -v gh >/dev/null 2>&1; then
  if bash scripts/edition-pr.sh "${TARGET_WEEK}" --draft >> "$LOG_AGENT" 2>&1; then
    echo "$(date -Iseconds) [run] branche ${BRANCH} poussée, PR draft ouverte" >> "$LOG_AGENT"
  else
    echo "$(date -Iseconds) [run] edition-pr.sh échec" >> "$LOG_AGENT"
  fi
else
  echo "$(date -Iseconds) [run] gh absent — push branche seul (ouvre la PR à la main sur GitHub)" >> "$LOG_AGENT"
  npm run --silent render -- "${TARGET_WEEK}" >> "$LOG_AGENT" 2>&1 || true
  git add editions/"${TARGET_WEEK}" data/desk/"${TARGET_WEEK}" data/_week-context.md 2>/dev/null || true
  if ! git diff --cached --quiet; then
    git -c user.email="jebabarit@gmail.com" -c user.name="jeb-maker" \
      commit -m "Édition ${TARGET_WEEK} — composition auto (draft)" >> "$LOG_AGENT" 2>&1
  fi
  git push -u origin "${BRANCH}" >> "$LOG_AGENT" 2>&1 \
    && echo "$(date -Iseconds) [run] branche ${BRANCH} poussée → https://github.com/jeb-maker/lagent-quotidien/tree/${BRANCH}" >> "$LOG_AGENT" \
    || echo "$(date -Iseconds) [run] git push échec" >> "$LOG_AGENT"
fi

# Retour sur main pour ne pas bloquer les autres crons
git checkout main --quiet 2>/dev/null || true

exit "$AGENT_EXIT"
