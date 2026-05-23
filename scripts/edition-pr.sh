#!/bin/bash
# scripts/edition-pr.sh
# Ouvre une PR pour l'édition <week>, depuis laquelle tu peux valider la
# preview Cloudflare Pages depuis ton téléphone avant merge.
#
# Workflow :
#   1. Crée (ou réutilise) la branche edition/<week>
#   2. Re-render l'édition
#   3. Commit les changements sur la branche
#   4. Push la branche
#   5. Ouvre une PR via gh, avec un body qui explique où trouver la preview
#
# Sur ton téléphone :
#   - GitHub mobile → PR ouverte
#   - Le bot Cloudflare Pages poste un commentaire avec l'URL de preview
#     (build ~30-60s après le push)
#   - Tap l'URL pour voir le site rendu
#   - OK → bouton "Merge" → main → deploy live
#
# Usage :
#   ./scripts/edition-pr.sh 2026-W21
#   ./scripts/edition-pr.sh 2026-W21 --no-render   # si déjà rendu
#   ./scripts/edition-pr.sh 2026-W21 --draft       # PR en draft

set -eu
export PATH="/usr/local/bin:/usr/bin:/bin"

REPO="/home/debian/agentic-news/agent-quotidien"
cd "$REPO"

WEEK="${1:-}"
[ -z "$WEEK" ] && { echo "usage: $0 <week> [--no-render] [--draft]"; exit 1; }
case "$WEEK" in
  20[0-9][0-9]-W[0-9][0-9]) ;;
  *) echo "format attendu : 2026-WXX (reçu : $WEEK)"; exit 1 ;;
esac

NO_RENDER=0
DRAFT=0
for a in "$@"; do
  case "$a" in
    --no-render) NO_RENDER=1 ;;
    --draft) DRAFT=1 ;;
  esac
done

[ -d "editions/$WEEK" ] || { echo "editions/$WEEK introuvable. As-tu lancé scripts/new-week.sh ?"; exit 1; }

BRANCH="edition/$WEEK"
ISSUE_NUMBER=$(node -e "
const j = require('./editions/$WEEK/edition.json');
process.stdout.write(String(j._meta?.edition_number ?? '?'));
" 2>/dev/null || echo '?')

# ───── 1. Position sur la branche ─────
git fetch origin --quiet 2>/dev/null || true
if git show-ref --verify --quiet "refs/heads/$BRANCH"; then
  echo "→ Branche $BRANCH existe, je la reprends"
  git checkout "$BRANCH"
elif git ls-remote --exit-code --heads origin "$BRANCH" >/dev/null 2>&1; then
  echo "→ Branche $BRANCH existe sur origin, checkout"
  git checkout -t "origin/$BRANCH"
else
  echo "→ Création branche $BRANCH depuis main"
  git checkout main
  git pull --ff-only origin main --quiet 2>/dev/null || true
  git checkout -b "$BRANCH"
fi

# ───── 2. Re-render ─────
if [ "$NO_RENDER" -eq 0 ]; then
  echo "→ Render $WEEK"
  npm run --silent render -- "$WEEK"
fi

# ───── 3. Commit ─────
git add -A
if git diff --cached --quiet; then
  echo "→ Rien à committer (déjà à jour)"
else
  git -c user.email="jebabarit@gmail.com" -c user.name="jeb-maker" \
    commit -m "Édition $WEEK (#${ISSUE_NUMBER}) — preview"
  echo "→ Commit créé"
fi

# ───── 4. Push ─────
echo "→ Push $BRANCH"
git push -u origin "$BRANCH"

# ───── 5. PR ─────
EXISTING_PR=$(gh pr list --head "$BRANCH" --json number,url --jq '.[0].url' 2>/dev/null || echo '')
if [ -n "$EXISTING_PR" ]; then
  echo "→ PR existe déjà : $EXISTING_PR"
  exit 0
fi

PR_FLAGS=""
[ "$DRAFT" -eq 1 ] && PR_FLAGS="--draft"

PR_BODY=$(cat <<EOF
Édition n°${ISSUE_NUMBER} — semaine ${WEEK}.

## Preview

Cloudflare Pages va builder la preview ~30-60s après ce push. Le bot
\`cloudflare-pages\` postera l'URL en commentaire ci-dessous.

Pages à vérifier en priorité sur le téléphone :
- \`/editions/${WEEK}/fr\`
- \`/editions/${WEEK}/en\`
- \`/\` (redirige vers la dernière édition)

## Pour valider

1. Tape sur l'URL de preview dans le commentaire Cloudflare ci-dessous.
2. Vérifie les deux langues, le lede, l'interview, le carnet.
3. Si OK → \`Merge\` (les modifs partent live sur theagentweekly.com).
4. Si KO → commente ce qu'il faut changer, push un fix sur la branche.

🤖 Generated with [Claude Code](https://claude.com/claude-code)
EOF
)

gh pr create $PR_FLAGS \
  --base main \
  --head "$BRANCH" \
  --title "Édition $WEEK (#${ISSUE_NUMBER})" \
  --body "$PR_BODY"

echo
echo "✓ PR ouverte. Vérifie sur ton téléphone."
