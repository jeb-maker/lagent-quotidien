#!/bin/bash
# scripts/deploy-site.sh
# Déploie le site (Worker `lagent-quotidien`, assets = racine filtrée par
# .assetsignore) directement sur Cloudflare, SANS GitHub.
#
# Contexte : l'intégration GitHub→Cloudflare est morte avec la restriction du
# compte GitHub (déploiements arrêtés le 2026-08-13, constaté le 27). Ce
# script est le chemin de prod : wrangler deploy depuis cette machine.
#
# Prérequis (une fois, dans /home/debian/.config/cloudflare/env) :
#   CLOUDFLARE_DEPLOY_TOKEN=<token API « Edit Cloudflare Workers »>
#   (à créer sur dash.cloudflare.com → My Profile → API Tokens →
#    template « Edit Cloudflare Workers », scope = le compte)
#   CLOUDFLARE_ACCOUNT_ID est déjà présent dans ce fichier.
#
# Usage :
#   ./scripts/deploy-site.sh
#
# Appelé par : cron-publish.sh (mardi), edition-preview.sh (mercredi),
# cron quotidien 09:30 (fraîcheur radar/drift).

set -u
export PATH="/home/debian/.local/bin:/usr/local/bin:/usr/bin:/bin"

REPO="${AGENT_QUOTIDIEN_REPO:-/home/debian/agentic-news/agent-quotidien}"
ENV_FILE="/home/debian/.config/cloudflare/env"
LOCK="/tmp/agent-quotidien-deploy.lock"

exec 9>"$LOCK"
flock -n 9 || { echo "$(date -Iseconds) skip: deploy déjà en cours"; exit 0; }

cd "$REPO" || { echo "$(date -Iseconds) erreur: $REPO introuvable"; exit 1; }

# On ne déploie que l'état de main (le worker compose travaille sur des
# branches edition/ dans ce même dossier)
BRANCH_NOW=$(git rev-parse --abbrev-ref HEAD 2>/dev/null || echo '?')
if [ "$BRANCH_NOW" != "main" ]; then
  echo "$(date -Iseconds) skip: branche courante ${BRANCH_NOW} ≠ main (compose en cours ?)"
  exit 0
fi

if [ -f "$ENV_FILE" ]; then
  while IFS='=' read -r k v; do
    v="${v%\"}"; v="${v#\"}"; v="${v%\'}"; v="${v#\'}"
    case "$k" in CLOUDFLARE_*) export "$k"="$v" ;; esac
  done < <(grep -E '^CLOUDFLARE_[A-Z_]+=' "$ENV_FILE")
fi

if [ -z "${CLOUDFLARE_DEPLOY_TOKEN:-}" ]; then
  echo "$(date -Iseconds) deploy IMPOSSIBLE : CLOUDFLARE_DEPLOY_TOKEN absent de ${ENV_FILE}"
  echo "$(date -Iseconds)   → dash.cloudflare.com → My Profile → API Tokens → « Edit Cloudflare Workers »"
  echo "$(date -Iseconds)   → puis : echo 'CLOUDFLARE_DEPLOY_TOKEN=…' >> ${ENV_FILE}"
  exit 0
fi

export CLOUDFLARE_API_TOKEN="$CLOUDFLARE_DEPLOY_TOKEN"

echo "$(date -Iseconds) wrangler deploy (worker lagent-quotidien) …"
if OUT=$(npx --yes wrangler@3 deploy 2>&1); then
  echo "$OUT" | grep -E "Uploaded|Deployed|assets|Current Version" | head -5
  echo "$(date -Iseconds) ✓ site déployé"
else
  echo "$OUT" | tail -15
  echo "$(date -Iseconds) ✗ deploy échec"
  exit 1
fi
exit 0
