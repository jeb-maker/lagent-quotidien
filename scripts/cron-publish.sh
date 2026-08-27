#!/bin/bash
# scripts/cron-publish.sh
# Publie l'édition de la semaine courante SANS dépendre de l'API GitHub :
# merge local de edition/<week> → main, re-render, push. Cloudflare Pages
# déploie sur le push de main.
#
# Filet mis en place le 2026-08-27 : le compte GitHub étant restreint côté
# API (rate limit à zéro), `gh pr create` échoue et le flux PR → merge mobile
# est cassé. Ce script rend la parution du mardi autonome. Si l'édition est
# déjà sur main (PR mergée à la main, API revenue), il ne fait rien.
#
# Forgiving : si une étape échoue, on log et on quitte sans rien casser.
#
# Installation crontab (mardi 07:00, jour de parution) :
#   0 7 * * 2 /home/debian/agentic-news/agent-quotidien/scripts/cron-publish.sh >> /tmp/agent-quotidien-publish.log 2>&1
#
# Usage manuel :
#   ./scripts/cron-publish.sh              # semaine ISO courante
#   ./scripts/cron-publish.sh 2026-W36     # semaine explicite

set -u
export PATH="/home/debian/.local/bin:/usr/local/bin:/usr/bin:/bin"

REPO="${AGENT_QUOTIDIEN_REPO:-/home/debian/agentic-news/agent-quotidien}"
LOCK="/tmp/agent-quotidien-publish.lock"

exec 9>"$LOCK"
flock -n 9 || { echo "$(date -Iseconds) skip: publication déjà en cours"; exit 0; }

cd "$REPO" || { echo "$(date -Iseconds) erreur: $REPO introuvable"; exit 1; }

WEEK="${1:-$(date +%G-W%V)}"
case "$WEEK" in
  20[0-9][0-9]-W[0-9][0-9]) ;;
  *) echo "$(date -Iseconds) erreur: semaine invalide ($WEEK)"; exit 1 ;;
esac
BRANCH="edition/${WEEK}"
HOLD="/home/debian/agentic-news/HOLD-${WEEK}"

echo "$(date -Iseconds) publication démarrée → ${WEEK}"

# Veto humain posé après la preview (rm pour libérer, puis relancer ce script)
if [ -f "$HOLD" ]; then
  echo "$(date -Iseconds) HOLD présent (${HOLD}) — parution bloquée, rien fait"
  exit 0
fi

git fetch origin --quiet 2>/dev/null || true

# Stash WIP locale (crons harvest/drift peuvent laisser des fichiers)
STASHED=0
if ! git diff --quiet || ! git diff --cached --quiet || [ -n "$(git ls-files --others --exclude-standard)" ]; then
  git stash push -u -m "cron-publish-$(date +%s)" --quiet 2>/dev/null && STASHED=1 || true
fi

finish() {
  git checkout main --quiet 2>/dev/null || true
  [ "$STASHED" -eq 1 ] && git stash pop --quiet 2>/dev/null || true
}

git checkout main --quiet 2>/dev/null || { echo "$(date -Iseconds) checkout main échec"; finish; exit 0; }
if ! git pull --rebase origin main --quiet 2>/dev/null; then
  echo "$(date -Iseconds) git pull --rebase échec (conflit ?), abandon"
  git rebase --abort 2>/dev/null || true
  finish; exit 0
fi

# Déjà sur main (PR mergée, ou publication précédente) → rien à faire
if [ -f "editions/${WEEK}/edition.json" ]; then
  echo "$(date -Iseconds) skip: ${WEEK} déjà sur main"
  finish; exit 0
fi

# Réf à merger : origin/<branch> si dispo (le plus frais), sinon branche locale
if git ls-remote --exit-code --heads origin "$BRANCH" >/dev/null 2>&1; then
  REF="origin/${BRANCH}"
elif git show-ref --verify --quiet "refs/heads/${BRANCH}"; then
  REF="$BRANCH"
else
  echo "$(date -Iseconds) skip: branche ${BRANCH} introuvable (compose pas encore passé ?)"
  finish; exit 0
fi

echo "$(date -Iseconds) merge ${REF} → main"
if ! git merge --no-ff --no-commit "$REF" --quiet 2>/dev/null; then
  # Conflits : on ne résout automatiquement que les fichiers régénérés par
  # render:all + les deux fichiers d'état que la branche fait avancer.
  UNRESOLVED=""
  while IFS= read -r f; do
    case "$f" in
      *.html|feed.xml|sitemap.xml|llms.txt|llms-full.txt|ai.txt|robots.txt|og.png|editions/ARCHIVE.md|data/_week-context.md|data/feuilleton-series.md)
        git checkout --theirs -- "$f" 2>/dev/null && git add -- "$f" || UNRESOLVED="${UNRESOLVED} ${f}" ;;
      *)
        UNRESOLVED="${UNRESOLVED} ${f}" ;;
    esac
  done < <(git diff --name-only --diff-filter=U)
  if [ -n "$UNRESOLVED" ]; then
    echo "$(date -Iseconds) conflit(s) non auto-résolubles :${UNRESOLVED} — abandon, merger à la main"
    git merge --abort 2>/dev/null || true
    finish; exit 0
  fi
  echo "$(date -Iseconds) conflits générés résolus (côté branche, re-render ensuite)"
fi

# La preview non listée a fait son temps : retirée à la parution
if [ -d preview ]; then
  git rm -r -f --quiet --ignore-unmatch preview 2>/dev/null || rm -rf preview
fi

# Re-render l'ensemble (liens précédente/suivante, index, feed, …)
if ! npm run --silent render:all >/dev/null 2>&1; then
  echo "$(date -Iseconds) render:all échec — abandon"
  git merge --abort 2>/dev/null || git reset --merge 2>/dev/null || true
  finish; exit 0
fi

# Porte éditoriale sur l'arbre mergé
if ! npm run --silent gate -- "$WEEK" >/dev/null 2>&1; then
  echo "$(date -Iseconds) porte FERMÉE pour ${WEEK} — abandon (npm run gate -- ${WEEK} pour le détail)"
  git merge --abort 2>/dev/null || git reset --merge 2>/dev/null || true
  finish; exit 0
fi

git add -A
git -c user.email="jebabarit@gmail.com" -c user.name="jeb-maker" \
  commit --quiet -m "Publication ${WEEK} — merge ${BRANCH} (cron-publish, sans PR)"

if git push origin main --quiet 2>/dev/null; then
  echo "$(date -Iseconds) ✓ ${WEEK} publiée — main poussé"
else
  echo "$(date -Iseconds) git push échec — merge commité localement, pousser à la main (git push origin main)"
fi

finish

# Déploiement direct Cloudflare (l'intégration GitHub est morte)
bash scripts/deploy-site.sh || echo "$(date -Iseconds) deploy-site.sh échec — site non déployé, relancer à la main"
exit 0
