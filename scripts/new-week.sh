#!/usr/bin/env bash
# new-week.sh — crée le dossier d'une nouvelle édition hebdomadaire
# Usage : ./scripts/new-week.sh [WXX]
#   sans argument → calcule la semaine ISO courante

set -e

cd "$(dirname "$0")/.."

if [ -n "$1" ]; then
  WEEK="$1"
else
  YEAR=$(date +%G)
  WEEKNUM=$(date +%V)
  WEEK="${YEAR}-W${WEEKNUM}"
fi

EDITION_DIR="editions/${WEEK}"

if [ -d "$EDITION_DIR" ]; then
  echo "⚠  Le dossier ${EDITION_DIR} existe déjà."
  read -p "Écraser le edition.json ? [o/N] " -n 1 -r
  echo
  if [[ ! $REPLY =~ ^[OoYy]$ ]]; then
    echo "Annulé."
    exit 0
  fi
fi

mkdir -p "$EDITION_DIR"

# Numéro d'édition = nombre de dossiers editions/* déjà existants
EDITION_NUM=$(find editions -maxdepth 1 -type d -name "20*-W*" | wc -l | tr -d ' ')

# Date du lundi de cette semaine
if [ -n "$1" ]; then
  TODAY_FR=$(date +"%A %-d %B %Y" 2>/dev/null || date +"%Y-%m-%d")
  TODAY_EN=$(LC_ALL=en_US.UTF-8 date +"%A, %B %-d, %Y" 2>/dev/null || date +"%Y-%m-%d")
else
  TODAY_FR=$(LC_ALL=fr_FR.UTF-8 date +"%A %-d %B %Y" 2>/dev/null || date +"%Y-%m-%d")
  TODAY_EN=$(LC_ALL=en_US.UTF-8 date +"%A, %B %-d, %Y" 2>/dev/null || date +"%Y-%m-%d")
fi

cat > "${EDITION_DIR}/edition.json" <<EOF
{
  "_meta": {
    "week": "${WEEK}",
    "date_fr": "${TODAY_FR}",
    "date_en": "${TODAY_EN}",
    "edition_number": ${EDITION_NUM},
    "volume": "II",
    "bouclage": "$(date -Iseconds)",
    "sources_consulted": 0,
    "editor_notes": "À remplir par Claude Code en suivant prompts/weekly-edition.md"
  },

  "ticker": [],

  "lede": {
    "kicker": { "fr": "", "en": "" },
    "headline_html": { "fr": "", "en": "" },
    "dek": { "fr": "", "en": "" },
    "byline": { "fr": "", "en": "" },
    "figure": {
      "type": "ratio",
      "num_a": "",
      "slash": "/",
      "num_b": "",
      "legend_fr": "",
      "legend_en": ""
    },
    "body": { "fr": "", "en": "" }
  },

  "breves": [],

  "market": {
    "title": { "fr": "Le marché agentique", "en": "The agentic market" },
    "rows": [],
    "boards": []
  },

  "headlines": [],

  "bestiaire": null,

  "bot_posts": {
    "title_fr": "Au fil du fil — sélection Moltbook 🦞",
    "title_en": "Down the feed — Moltbook selection 🦞",
    "meta_fr": "",
    "meta_en": "",
    "posts": []
  },

  "carnet": {
    "title": { "fr": "Le Carnet", "en": "The Register" },
    "subtitle": { "fr": "— les agents et les opérateurs de la semaine", "en": "— the agents and operators of the week" },
    "people": []
  },

  "interview": null,

  "gibberlink": null,

  "enquete": null,

  "feature": null,

  "wire": [],

  "tribune": {
    "label": { "fr": "◆ Tribune", "en": "◆ Op-ed" },
    "headline_html": { "fr": "", "en": "" },
    "paragraphs": { "fr": [], "en": [] },
    "author": {
      "name": "",
      "initials": "",
      "role_fr": "",
      "role_en": ""
    }
  }
}
EOF

# Fichier de notes vide
cat > "${EDITION_DIR}/notes.md" <<EOF
# Notes de recherche — ${WEEK}

## Sources consultées

(Une ligne par source, format : URL · résumé en une phrase)

## Choix éditoriaux à discuter

## Rubriques en manque de matière

## À suivre la semaine prochaine
EOF

echo "✓ Édition ${WEEK} créée : ${EDITION_DIR}/"
echo ""
echo "Prochaines étapes :"
echo "  1. Lance Claude Code dans le repo :  claude"
echo "  2. Demande-lui :"
echo "     « Génère l'édition ${WEEK} en suivant prompts/weekly-edition.md »"
echo "  3. Relis ${EDITION_DIR}/edition.json"
echo "  4. Rends TOUTES les pages :  npm run render:all"
echo "     (régénère aussi les liens « précédente / suivante » des éditions"
echo "      voisines ; ne lance plus 'render' sur une seule semaine, sinon"
echo "      l'avant-dernière garde un lien « suivante » vide.)"
