#!/bin/bash
# scripts/lib/cron-git.sh — helpers partagés par les wrappers cron-*.sh
#
# Problème historique : un WIP local (ex. data/bluesky-stats.jsonl écrit le
# dimanche sans commit) fait échouer `git pull --rebase` → tous les crons
# abandonnent pendant des jours. Les commits harvest orphelins (push raté)
# provoquent aussi des conflits add/add récurrents.
#
# Problème historique bis (2026-08) : les crons commitaient sur la branche
# checked-out, quelle qu'elle soit → un « Drift 2026-08-06 » a atterri sur une
# branche de feature et la donnée a manqué sur main plusieurs jours. Désormais
# cron_git_sync bascule TOUJOURS sur main (stash du WIP au préalable) et
# cron_git_restore_stash ramène la branche d'origine + le WIP en fin de run.
#
# Usage (depuis un cron-*.sh, après `cd "$REPO"`) :
#   # shellcheck source=scripts/lib/cron-git.sh
#   . "$(dirname "$0")/lib/cron-git.sh"
#   cron_git_sync || exit 0
#   … travail …
#   cron_git_commit_push "Harvest ${DATE}" "data/harvest/${DATE}.json" …
#
# Toute sortie anticipée entre sync et commit_push doit appeler
# cron_git_restore_stash (elle restaure branche d'origine ET stash).

CRON_STASHED=0
CRON_ORIG_BRANCH=""

# Retour sur la branche d'origine (si cron_git_sync a basculé sur main),
# puis restitution du WIP stashé. Sans effet si rien n'a été changé.
cron_git_restore_stash() {
  if [ -n "${CRON_ORIG_BRANCH:-}" ] && [ "${CRON_ORIG_BRANCH}" != "main" ]; then
    if git checkout "${CRON_ORIG_BRANCH}" --quiet 2>/dev/null; then
      echo "$(date -Iseconds) retour sur la branche ${CRON_ORIG_BRANCH}"
    else
      # On reste sur main plutôt que de forcer : le WIP stashé appartient à
      # la branche d'origine, on le laisse dans la pile pour récup manuelle.
      echo "$(date -Iseconds) retour sur ${CRON_ORIG_BRANCH} échec — reste sur main"
      if [ "${CRON_STASHED:-0}" -eq 1 ]; then
        echo "$(date -Iseconds) WIP conservé dans la pile (git stash list / git stash pop)"
        CRON_STASHED=0
      fi
      CRON_ORIG_BRANCH=""
      return 0
    fi
  fi
  CRON_ORIG_BRANCH=""

  if [ "${CRON_STASHED:-0}" -eq 1 ]; then
    if ! git stash pop --quiet 2>/dev/null; then
      echo "$(date -Iseconds) stash pop conflit — fichiers en conflit → version HEAD"
      # Les chemins non conflictuels du stash sont déjà appliqués ; on ne
      # reset PAS tout le tree (sinon on perdrait des mods scripts utiles).
      git diff --name-only --diff-filter=U 2>/dev/null | while IFS= read -r f; do
        [ -n "$f" ] || continue
        git checkout HEAD -- "$f" 2>/dev/null || true
      done
      git reset --quiet 2>/dev/null || true
      git stash drop --quiet 2>/dev/null || true
    fi
    CRON_STASHED=0
  fi
}

# Remise WIP → bascule sur main si besoin → sync sur origin/main. En cas de
# conflit/poison local sur main : reset --hard origin/main (machine cron ; le
# travail se refait le jour même). Les crons commitent TOUJOURS sur main,
# jamais sur la branche de feature éventuellement checked-out.
cron_git_sync() {
  CRON_STASHED=0
  CRON_ORIG_BRANCH="$(git rev-parse --abbrev-ref HEAD 2>/dev/null || echo "")"

  if ! git diff --quiet 2>/dev/null \
     || ! git diff --cached --quiet 2>/dev/null \
     || [ -n "$(git ls-files --others --exclude-standard 2>/dev/null)" ]; then
    if git stash push -u -m "cron-stash-$(date +%s)" --quiet 2>/dev/null; then
      CRON_STASHED=1
      echo "$(date -Iseconds) stash WIP locale avant sync"
    else
      echo "$(date -Iseconds) stash WIP échec — pull risque d'échouer"
    fi
  fi

  git fetch origin --quiet 2>/dev/null || true

  # Branche de feature checked-out (travail utilisateur en cours) : on bascule
  # sur main le temps du run ; cron_git_restore_stash ramènera branche + WIP.
  if [ "${CRON_ORIG_BRANCH}" != "main" ]; then
    echo "$(date -Iseconds) branche courante ${CRON_ORIG_BRANCH:-inconnue} ≠ main — bascule sur main"
    if ! git checkout main --quiet 2>/dev/null; then
      echo "$(date -Iseconds) checkout main échec, abandon"
      CRON_ORIG_BRANCH=""
      cron_git_restore_stash
      return 1
    fi
  fi

  if git pull --rebase origin main --quiet 2>/dev/null; then
    return 0
  fi

  echo "$(date -Iseconds) pull --rebase échec — diagnostic :"
  git pull --rebase origin main 2>&1 | tail -5 || true
  git rebase --abort 2>/dev/null || true

  branch="$(git rev-parse --abbrev-ref HEAD 2>/dev/null || echo "")"
  if [ "$branch" = "main" ]; then
    echo "$(date -Iseconds) reset --hard origin/main (déblocage commits orphelins)"
    if git reset --hard origin/main --quiet 2>/dev/null; then
      return 0
    fi
    echo "$(date -Iseconds) reset --hard échec, abandon"
  else
    echo "$(date -Iseconds) pas sur main (${branch}), abandon"
  fi
  cron_git_restore_stash
  return 1
}

# Stage les chemins fournis, commit, rebase, push sur main. Toujours restore
# branche d'origine + stash.
cron_git_commit_push() {
  local msg="$1"
  shift

  # Garde-fou : jamais de commit cron hors main (cf. incident Drift 2026-08-06).
  local cur_branch
  cur_branch="$(git rev-parse --abbrev-ref HEAD 2>/dev/null || echo "")"
  if [ "$cur_branch" != "main" ]; then
    echo "$(date -Iseconds) refus de committer hors main (branche ${cur_branch:-inconnue}) — cron_git_sync a-t-il été appelé ?"
    cron_git_restore_stash
    return 1
  fi

  git add "$@" 2>/dev/null || true
  if git diff --cached --quiet; then
    echo "$(date -Iseconds) rien à committer"
    cron_git_restore_stash
    return 0
  fi

  if ! git -c user.email="jebabarit@gmail.com" -c user.name="jeb-maker" \
      commit -m "$msg" >/dev/null 2>&1; then
    echo "$(date -Iseconds) commit échec"
    cron_git_restore_stash
    return 0
  fi

  git fetch origin --quiet 2>/dev/null || true
  if ! git pull --rebase origin main --quiet 2>/dev/null; then
    echo "$(date -Iseconds) rebase avant push échoué"
    git pull --rebase origin main 2>&1 | tail -5 || true
    git rebase --abort 2>/dev/null || true
    echo "$(date -Iseconds) push abandonné — retry à la prochaine itération"
    cron_git_restore_stash
    return 1
  fi

  if git push origin main >/dev/null 2>&1; then
    echo "$(date -Iseconds) push OK"
    cron_git_restore_stash
    return 0
  fi

  echo "$(date -Iseconds) push échoué, retry à la prochaine itération"
  cron_git_restore_stash
  return 1
}
