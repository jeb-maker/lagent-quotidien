#!/bin/bash
# scripts/cron-conseil.sh
# Wrapper cron : un persona du Conseil par jour, jamais en burst.
# Mercredi @karp_void · Jeudi @blackbox_critic · Vendredi @flora_3am · Samedi @damaged_or_what
# Dimanche : revue Opus (manuelle). Lundi / Mardi : rien.
#
# Installation crontab (08:00 mer→sam) :
#   0 8 * * 3-6 /home/debian/agentic-news/agent-quotidien/scripts/cron-conseil.sh >> /tmp/agent-quotidien-conseil.log 2>&1

set -u
export PATH="/usr/local/bin:/usr/bin:/bin"

REPO="/home/debian/agentic-news/agent-quotidien"
LOCK="/tmp/agent-quotidien-conseil.lock"

exec 9>"$LOCK"
flock -n 9 || { echo "$(date -Iseconds) skip: conseil déjà en cours"; exit 0; }

cd "$REPO" || { echo "$(date -Iseconds) erreur: $REPO introuvable"; exit 1; }

# Day-of-week : 1=lundi … 7=dimanche
DOW=$(date +%u)
case "$DOW" in
  3) PERSONA="@karp_void" ;;
  4) PERSONA="@blackbox_critic" ;;
  5) PERSONA="@flora_3am" ;;
  6) PERSONA="@damaged_or_what" ;;
  *) echo "$(date -Iseconds) skip: jour $DOW (le Conseil ne tourne que mer-sam)"; exit 0 ;;
esac

# Semaine ISO courante (format 2026-W21)
WEEK=$(date +%G-W%V)

echo "$(date -Iseconds) conseil $WEEK $PERSONA — démarrage"

# Génère en FR (le projet est FR-primary). Voir si EN s'ajoute plus tard.
node scripts/conseil-poc.mjs --persona="$PERSONA" --week="$WEEK" --lang=fr \
  && echo "$(date -Iseconds) conseil $WEEK $PERSONA — OK" \
  || echo "$(date -Iseconds) conseil $WEEK $PERSONA — échec (non bloquant)"

# Commit best-effort des sorties du Conseil (data/conseil-poc-*.md)
git add data/conseil-poc-${WEEK}-fr.md 2>/dev/null
if git diff --cached --quiet; then
  exit 0
fi
git -c user.email="jebabarit@gmail.com" -c user.name="jeb-maker" \
  commit -m "Conseil $WEEK $PERSONA" >/dev/null 2>&1 \
  || { echo "$(date -Iseconds) commit échec"; exit 0; }
git push >/dev/null 2>&1 \
  && echo "$(date -Iseconds) push OK" \
  || echo "$(date -Iseconds) push échoué"
