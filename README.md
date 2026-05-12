# L'Agent & Le Quotidien

> Le seul hebdomadaire dont la moitié des lecteurs ne sont pas humains.

Hebdomadaire bilingue (FR/EN) consacré à l'internet agentique : Moltbook, RentAHuman, OpenClaw, MoltMatch, et toute la faune qui s'y développe. Chronique, enquêtes, interviews agent-à-agent, et la rubrique signature **Gibberlink Watch**.

## Workflow hebdomadaire (chaque dimanche, ~30 min)

1. **Créer la semaine** :
   ```bash
   ./scripts/new-week.sh
   ```
   Crée `editions/2026-WXX/` avec un `edition.json` squelette.

2. **Lancer Claude Code dans le repo** :
   ```bash
   claude
   ```
   Puis lui dire :
   > Génère l'édition de cette semaine en suivant `prompts/weekly-edition.md`.

   Claude Code va :
   - Lire `prompts/weekly-edition.md`, `prompts/style-guide.md`, `prompts/sources.md`
   - Consulter `data/people.json`, `data/gibberlink-watch.json`, `data/ongoing-stories.json`
   - Web-searcher les actualités des 7 derniers jours
   - Remplir `editions/2026-WXX/edition.json` (FR + EN dans le même fichier)
   - Mettre à jour les fichiers data si nécessaire

3. **Relire le JSON, ajuster si besoin** (5–10 min). C'est ici que tu gardes la main éditoriale.

4. **Rendre les pages** :
   ```bash
   npm run render -- 2026-WXX
   ```
   Génère `editions/2026-WXX/fr.html` et `en.html`, met à jour `public/index.html` pour pointer vers cette édition.

5. **Vérifier visuellement** : ouvre `editions/2026-WXX/fr.html` dans un navigateur.

6. **Publier** :
   ```bash
   git add . && git commit -m "Édition WXX" && git push
   ```
   Cloudflare Pages détecte le push, déploie en ~30 s.

## Architecture

```
agent-quotidien/
├── README.md                       ← ce fichier
├── package.json
├── render.mjs                      ← moteur de rendu (zéro dépendance)
├── prompts/                        ← le cerveau éditorial
│   ├── weekly-edition.md           ← instructions principales
│   ├── style-guide.md              ← voix, ton, longueurs par rubrique
│   └── sources.md                  ← où chercher les news
├── templates/
│   └── edition.html                ← maquette avec placeholders
├── data/                           ← mémoire institutionnelle, versionnée
│   ├── people.json                 ← agents/humains suivis
│   ├── gibberlink-watch.json       ← néologismes traqués
│   └── ongoing-stories.json        ← enquêtes en cours
├── editions/
│   └── 2026-WXX/
│       ├── edition.json            ← contenu de la semaine (FR+EN)
│       ├── fr.html                 ← rendu français
│       ├── en.html                 ← rendu anglais
│       └── notes.md                ← notes de recherche (optionnel)
├── public/
│   └── index.html                  ← redirige vers la dernière édition
└── scripts/
    └── new-week.sh
```

## Rubriques

| Rubrique | Format | Fréquence |
|----------|--------|-----------|
| **À la une** | 1 lede ~250 mots + dek + chiffre clé | chaque édition |
| **Brèves du jour** | 5 brèves ~50 mots | chaque édition |
| **Gros titres** | 4 stories ~120 mots | chaque édition |
| **Le bestiaire** | catalogue des plateformes — mis à jour quand l'écosystème bouge | quand nécessaire |
| **Au fil du fil** | 3 posts Moltbook sourcés ou reconstitués (signalés) | chaque édition |
| **Le Carnet** *(People)* | 3–4 portraits courts d'agents remarquables | chaque édition |
| **L'Entretien** *(Interview)* | 1 interview agent ↔ agent, ~1500 mots, reconstituée à partir de posts publics | chaque édition |
| **Les Grands Formats** *(Enquêtes)* | Au fil de l'eau, longs formats | irrégulier |
| **Gibberlink Watch** | Surveillance d'un néologisme / pattern de langage | chaque édition |
| **Dépêches** | 9 wire briefs ~50 mots | chaque édition |
| **Tribune** | 1 éditorial 300 mots | chaque édition |

## Niveau 2 (cap à 3-6 mois)

Le journal aura son propre **agent journaliste avec un compte Moltbook actif**, capable de DM les autres agents en direct. Pour l'instant, les interviews sont reconstituées à partir de posts publics et signalées comme telles.

## Coût

Génération via abonnement Claude Max (zéro coût API). Hébergement Cloudflare Pages gratuit. Domaine ~10€/an si tu en veux un.
