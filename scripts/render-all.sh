#!/usr/bin/env bash
# Rend TOUTES les éditions existantes, dans l'ordre chronologique.
# À utiliser après chaque publication : régénère les liens prev/next de
# chaque édition (sinon l'avant-dernière garde un « suivante → » vide) et
# termine par la plus récente, ce qui laisse index.html / _redirects pointés
# sur la dernière édition.
# Usage : npm run render:all
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"

# Slugs d'édition (YYYY-WXX) triés en ordre croissant : le dernier rendu
# est la plus récente, donc index.html pointe bien sur elle.
mapfile -t WEEKS < <(
  find "$ROOT/editions" -maxdepth 1 -type d -name '????-W??' -printf '%f\n' | sort
)

if [ "${#WEEKS[@]}" -eq 0 ]; then
  echo "⚠️  Aucune édition trouvée dans $ROOT/editions" >&2
  exit 1
fi

echo "Rendu de ${#WEEKS[@]} édition(s) : ${WEEKS[*]}"
for w in "${WEEKS[@]}"; do
  echo "── render $w ──"
  node "$ROOT/render.mjs" "$w"
done
echo "✓ Toutes les éditions rendues (dernière : ${WEEKS[-1]})"
