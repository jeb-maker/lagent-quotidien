#!/bin/bash
# scripts/cron-drift.sh
# Wrapper cron : stats quotidiennes → render → commit → push.
# (Le drift de chiffres inventés a été RETIRÉ le 2026-06-01 — cf.
#  data/strategie.md : on ne fabrique plus de marché. Le nom du fichier est
#  conservé pour ne pas casser le crontab installé en prod.)
# Forgiving : si une étape échoue, on log et on quitte sans planter le cron.
#
# Installation crontab (toutes les 4 h) :
#   0 */4 * * * /home/debian/agentic-news/agent-quotidien/scripts/cron-drift.sh >> /tmp/agent-quotidien-drift.log 2>&1

set -u
export PATH="/usr/local/bin:/usr/bin:/bin"

REPO="/home/debian/agentic-news/agent-quotidien"
LOCK="/tmp/agent-quotidien-drift.lock"

# Empêche les exécutions concurrentes (sortie silencieuse si déjà en cours)
exec 9>"$LOCK"
flock -n 9 || { echo "$(date -Iseconds) skip: drift déjà en cours"; exit 0; }

cd "$REPO" || { echo "$(date -Iseconds) erreur: $REPO introuvable"; exit 1; }

# shellcheck source=scripts/lib/cron-git.sh
. "$(dirname "$0")/lib/cron-git.sh"

cron_git_sync || { echo "$(date -Iseconds) sync git échec, abandon"; exit 0; }

# 1. Stats quotidiennes (Cloudflare + Bluesky) — la métrique du public A
#    (trafic crawlers IA) est désormais le signal principal.
node scripts/daily-stats.mjs || echo "$(date -Iseconds) stats échec (non bloquant)"

# 2. Trouver l'édition la plus récente
WEEK=$(ls editions 2>/dev/null | grep -E '^[0-9]{4}-W[0-9]{2}$' | sort | tail -n1)
[ -z "$WEEK" ] && { echo "$(date -Iseconds) aucune édition"; cron_git_restore_stash; exit 0; }

# 3. Re-render
npm run --silent render -- "$WEEK" >/dev/null 2>&1 || { echo "$(date -Iseconds) render échec"; cron_git_restore_stash; exit 0; }

# 4. Commit & push (best effort)
# IMPORTANT : ne stage QUE les fichiers que drift+stats+render touchent
# réellement. Un `git add -A` swallow toute WIP non-committée (déjà arrivé).
# Plus de drift → edition.json n'est plus modifié par le cron, on ne le stage pas
# (évite d'avaler une éventuelle édition.json en cours d'édition manuelle).
if cron_git_commit_push "Drift $(date -Iminutes)" \
    data/stats.json \
    "editions/${WEEK}/fr.html" \
    "editions/${WEEK}/en.html" \
    radar/ \
    sitemap.xml feed.xml _headers robots.txt; then
  echo "$(date -Iseconds) drift+push OK ($WEEK)"
fi
