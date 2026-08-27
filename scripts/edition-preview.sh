#!/bin/bash
# scripts/edition-preview.sh
# Publie une preview de l'édition <week> sur le site de prod, sous un chemin
# non listé : https://theagentweekly.com/preview/<week>/fr.html
#
# Remplace les previews Cloudflare Pages par branche (le flux PR est mort :
# API GitHub restreinte en permanence). Aucune dépendance GitHub côté humain :
# tu valides depuis ton téléphone sur le site, et si c'est KO tu bloques la
# parution du mardi avec :
#   touch /home/debian/agentic-news/HOLD-<week>
#
# Le chemin /preview/ est exclu de robots.txt, absent du sitemap et des index ;
# le canonical des pages pointe vers l'URL de prod. cron-publish.sh supprime
# le dossier preview/ au moment de la vraie parution.
#
# Usage :
#   ./scripts/edition-preview.sh 2026-W37
#
# Appelé automatiquement par cron-compose-run.sh après le push de la branche.

set -u
export PATH="/home/debian/.local/bin:/usr/local/bin:/usr/bin:/bin"

REPO="${AGENT_QUOTIDIEN_REPO:-/home/debian/agentic-news/agent-quotidien}"
LOCK="/tmp/agent-quotidien-preview.lock"
SITE="https://theagentweekly.com"

exec 9>"$LOCK"
flock -n 9 || { echo "$(date -Iseconds) skip: preview déjà en cours"; exit 0; }

cd "$REPO" || { echo "$(date -Iseconds) erreur: $REPO introuvable"; exit 1; }

WEEK="${1:-}"
case "$WEEK" in
  20[0-9][0-9]-W[0-9][0-9]) ;;
  *) echo "usage: $0 <YYYY-WXX>"; exit 1 ;;
esac
BRANCH="edition/${WEEK}"

git fetch origin --quiet 2>/dev/null || true

if git ls-remote --exit-code --heads origin "$BRANCH" >/dev/null 2>&1; then
  REF="origin/${BRANCH}"
elif git show-ref --verify --quiet "refs/heads/${BRANCH}"; then
  REF="$BRANCH"
else
  echo "$(date -Iseconds) erreur: branche ${BRANCH} introuvable"; exit 0
fi

STASHED=0
if ! git diff --quiet || ! git diff --cached --quiet || [ -n "$(git ls-files --others --exclude-standard)" ]; then
  git stash push -u -m "edition-preview-$(date +%s)" --quiet 2>/dev/null && STASHED=1 || true
fi

finish() {
  git checkout main --quiet 2>/dev/null || true
  [ "$STASHED" -eq 1 ] && git stash pop --quiet 2>/dev/null || true
}

git checkout main --quiet 2>/dev/null || { echo "$(date -Iseconds) checkout main échec"; finish; exit 0; }
if ! git pull --rebase origin main --quiet 2>/dev/null; then
  echo "$(date -Iseconds) git pull --rebase échec, abandon"
  git rebase --abort 2>/dev/null || true
  finish; exit 0
fi

# Un seul dossier de preview à la fois : purge des anciennes semaines
rm -rf preview
mkdir -p "preview/${WEEK}"

BANNER='<div style="position:sticky;top:0;z-index:999;background:#b45309;color:#fff;text-align:center;padding:6px 10px;font:600 13px/1.4 system-ui">PREVIEW — édition non publiée. OK : rien à faire (parution mardi 07:00). KO : touch /home/debian/agentic-news/HOLD-'"${WEEK}"'</div>'

OK=0
for f in fr.html en.html; do
  if git show "${REF}:editions/${WEEK}/${f}" 2>/dev/null \
     | sed "s|<body>|<body>${BANNER}|" > "preview/${WEEK}/${f}"; then
    [ -s "preview/${WEEK}/${f}" ] && OK=$((OK + 1))
  fi
done
if [ "$OK" -eq 0 ]; then
  echo "$(date -Iseconds) erreur: aucun HTML trouvé sur ${REF} (render pas fait ?)"
  rm -rf preview
  finish; exit 0
fi

git add -A preview
if git diff --cached --quiet; then
  echo "$(date -Iseconds) preview inchangée, rien à pousser"
  finish; exit 0
fi
git -c user.email="jebabarit@gmail.com" -c user.name="jeb-maker" \
  commit --quiet -m "Preview ${WEEK} — validation avant parution"

if git push origin main --quiet 2>/dev/null; then
  echo "$(date -Iseconds) ✓ preview en ligne (~1 min) : ${SITE}/preview/${WEEK}/fr.html"
  echo "$(date -Iseconds)   EN : ${SITE}/preview/${WEEK}/en.html"
  echo "$(date -Iseconds)   KO ? → touch /home/debian/agentic-news/HOLD-${WEEK}"
else
  echo "$(date -Iseconds) git push échec — preview commitée localement"
fi

finish
exit 0
