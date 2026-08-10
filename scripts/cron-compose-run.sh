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

# Warning harvest : présence des 7 derniers jours (J−6…J) — non bloquant
echo "$(date -Iseconds) [run] contrôle harvest J-6…J" >> "$LOG_AGENT"
HARVEST_GAPS=0
for i in 0 1 2 3 4 5 6; do
  D=$(date -d "-${i} days" +%F 2>/dev/null || date -v-"${i}"d +%F 2>/dev/null || true)
  [ -z "$D" ] && continue
  if [ ! -f "data/harvest/${D}.json" ] || [ ! -f "data/harvest/${D}-primary.json" ]; then
    echo "$(date -Iseconds) [run] WARN harvest manquant : ${D}{,-primary}.json" >> "$LOG_AGENT"
    HARVEST_GAPS=$((HARVEST_GAPS + 1))
  fi
done
if [ "$HARVEST_GAPS" -gt 0 ]; then
  echo "$(date -Iseconds) [run] WARN ${HARVEST_GAPS} jour(s) de harvest absents — l'agent doit le noter et prioriser la matière dispo" >> "$LOG_AGENT"
else
  echo "$(date -Iseconds) [run] harvest J-6…J OK" >> "$LOG_AGENT"
fi

PROMPT=$(cat <<EOF
Prépare l'édition ${TARGET_WEEK} en suivant prompts/weekly-edition.md et la skill composition-hebdo.

Tu es sur la branche ${BRANCH}. Ne change pas de branche.

Workflow obligatoire :
1. Lis data/_week-context.md, prompts/style-guide.md, data/editorial-compass.md, data/feuilleton-series.md (une fois).
2. Desk agentique : veilleur, comère, facteur, promoteur, archiviste (parallèle) → éditeur → juge.
3. Préflight éditeur : ≥ 3 scènes (citation verbatim + URL + date) dans scenes.md ; sinon ne pas composer. Écrire \`## Arc\` (une phrase = déplacement de la semaine) en tête de notes.md et la copier dans _meta.editor_notes.
4. Feuilleton **obligatoire** chaque semaine (≥ 2026-W33) : fiction étiquetée genre:fiction, disclaimer bilingue, series + episode (continuer data/feuilleton-series.md sauf clôture notée), ≥ 400 mots FR / ≥ 350 EN, personnages inventés (Nox/Mantle/Mira sauf clôture), **aucune entité réelle nommée**, pas de lore caduc. Place après la tribune. Si un draft desk existe (data/desk/${TARGET_WEEK}/feuilleton-draft.json), l'intégrer ou le réécrire — ne pas omettre la rubrique. Mettre à jour le « fil ouvert » dans feuilleton-series.md.
5. npm run gate -- ${TARGET_WEEK}
6. npm run render -- ${TARGET_WEEK} si la porte est ouverte.
7. Si feuilleton publié dans l'édition : mets à jour data/feuilleton-series.md (dernier_épisode, dernière_semaine, prochain_épisode, fil ouvert).

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
