#!/bin/bash
# scripts/cron-harvest.sh
# Wrapper cron : récolte quotidienne des sources réelles → intrants de composition.
#   1. harvest-daily.mjs    → data/harvest/<date>.json          (secondaires : HN/RSS/ArXiv/Bluesky)
#   2. harvest-primary.mjs  → data/harvest/<date>-primary.json  (primaires : $MOLT/OpenClaw/Moltbook/MoltX)
#
# Ces JSON sont des INTRANTS pour composer l'édition de mardi (cf.
# prompts/weekly-edition.md « Avant de commencer » + prompts/sources.md). Ce ne
# sont PAS des sorties publiées : ce wrapper ne committe et ne pushe RIEN — il
# laisse les fichiers en place pour la session de composition (et évite tout
# conflit de push avec cron-drift.sh). La traçabilité publiée vit dans
# editions/<week>/notes.md (les URL qui entrent réellement dans l'édition).
#
# Forgiving : si une source échoue, harvest-*.mjs l'isole (try/catch) et écrit
# quand même le reste ; si une étape plante, on log et on quitte sans planter le cron.
#
# Installation crontab (une fois par jour, avant le drift de 9 h) :
#   30 7 * * * /home/debian/agentic-news/agent-quotidien/scripts/cron-harvest.sh >> /tmp/agent-quotidien-harvest.log 2>&1

set -u
export PATH="/usr/local/bin:/usr/bin:/bin"

REPO="/home/debian/agentic-news/agent-quotidien"
LOCK="/tmp/agent-quotidien-harvest.lock"

# Empêche les exécutions concurrentes (sortie silencieuse si déjà en cours)
exec 9>"$LOCK"
flock -n 9 || { echo "$(date -Iseconds) skip: harvest déjà en cours"; exit 0; }

cd "$REPO" || { echo "$(date -Iseconds) erreur: $REPO introuvable"; exit 1; }

# 1. Sources secondaires (débat IA : HN / RSS / ArXiv / Bluesky)
node scripts/harvest-daily.mjs   || echo "$(date -Iseconds) harvest-daily échec (non bloquant)"

# 2. Sources primaires (écosystème agentique : $MOLT / OpenClaw / Moltbook / MoltX)
node scripts/harvest-primary.mjs || echo "$(date -Iseconds) harvest-primary échec (non bloquant)"

echo "$(date -Iseconds) harvest OK → data/harvest/$(date +%F){,-primary}.json"
