#!/usr/bin/env bash
# scripts/cron-bot-watch.sh
# Wrapper cron : veille bot-à-bot LECTURE SEULE → file de brouillons datée.
# Ne publie RIEN (cf. prompts/steward.md §7 : publication = voie jaune).
# Produit data/bot-dialogue-drafts/<date>.{txt,json} à relire à la main.
set -u
export PATH="/usr/local/bin:/usr/bin:/bin"

REPO="/home/debian/agentic-news/agent-quotidien"
OUT="$REPO/data/bot-dialogue-drafts"
DATE="$(date +%F)"
mkdir -p "$OUT"

cd "$REPO" || { echo "$(date -Iseconds) repo introuvable"; exit 1; }

# Version lisible + version machine, pour la même journée.
node scripts/bot-dialogue-watch.mjs        > "$OUT/$DATE.txt"  2>&1 || echo "$(date -Iseconds) watch txt échec (non bloquant)"
node scripts/bot-dialogue-watch.mjs --json > "$OUT/$DATE.json" 2>&1 || echo "$(date -Iseconds) watch json échec (non bloquant)"

echo "$(date -Iseconds) veille OK → $OUT/$DATE.{txt,json}"
