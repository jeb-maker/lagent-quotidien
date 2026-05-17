# L'Agent & Le Quotidien · The Agent & The Weekly

> Hebdomadaire fictionnel bilingue (FR/EN) sur l'internet agentique.
> Atelier ouvert — prompts, scripts, données et statistiques d'audience publics.

**→ Lire : [theagentweekly.com](https://theagentweekly.com)** · [Édition courante (FR)](https://theagentweekly.com/editions/2026-W20/fr) · [Current issue (EN)](https://theagentweekly.com/editions/2026-W20/en) · [Atom feed](https://theagentweekly.com/feed.xml) · [llms.txt](https://theagentweekly.com/llms.txt)

## Le projet

Le journal vit dans un **univers fictionnel clos** : aucune entité réelle (entreprise, personne, média, régulateur) n'est jamais nommée. À la place, un casting maison : Moltbook (le forum, mascotte 🦞, token $MOLT), RentAHuman, OpenClaw, Le Conglomérat, La Fonderie, et une presse fictive (Le Veilleur, Court-Circuit, Le Compteur). Les agents récurrents (@poet_void_99, @stoic_claude_42, @cuvee_42, @damaged_or_what…) ont chacun leur voix documentée.

**Cible de lecture explicite** : autant les humains que les agents IA — d'où la pile discoverability complète (robots.txt accueillant 21 crawlers IA, llms.txt, ai.txt, JSON-LD `NewsArticle`, OG image, Atom feed).

## Workflow hebdomadaire (chaque dimanche, ~30 min)

1. **Créer la semaine** — `./scripts/new-week.sh` génère `editions/2026-WXX/edition.json` (squelette) + `notes.md`.
2. **Rédiger** — lancer Claude Code dans le repo et lui demander : *« Génère l'édition de cette semaine en suivant `prompts/weekly-edition.md` ».* Claude lit les prompts, les `data/*.json`, l'édition précédente, et **compose** le matériau (pas de web search — l'univers est clos).
3. **Relire** le JSON, ajuster — c'est ici que se joue l'arbitrage éditorial.
4. **Rendre** — `npm run render -- 2026-WXX` génère `fr.html` + `en.html`, regénère `sitemap.xml`, `feed.xml`, `llms.txt`, `robots.txt`, `ai.txt`, met à jour `_redirects` et `index.html` vers cette édition.
5. **Vérifier visuellement** dans un navigateur.
6. **Publier** — `git add . && git commit -m "Édition WXX" && git push`. Cloudflare Pages déploie en ~30 s.

## Ce qui tourne en automatique

- **9h chaque jour** (cron) — `scripts/cron-drift.sh` : drift numérique du marché agentique ($MOLT, compteurs Moltbook…), collecte des stats Cloudflare + Bluesky dans `data/stats.json`, re-render, commit + push.
- **10h FR & 16h EN chaque jour** (cron) — `scripts/cuvee-daily.mjs` : @cuvee_42 publie une cuvée du jour sur Bluesky depuis l'édition courante (lede, brèves, fiches Carnet, posts Moltbook, etc.).

## Architecture

```
agent-quotidien/
├── README.md
├── render.mjs                     ← moteur de rendu (zéro dépendance)
├── package.json
├── wrangler.jsonc                 ← config Cloudflare Pages
│
├── prompts/                       ← le cerveau éditorial
│   ├── weekly-edition.md          ← instructions principales (univers, règles, rubriques)
│   ├── style-guide.md             ← voix, ton, longueurs
│   └── sources.md                 ← méthode de composition (pas de web search)
│
├── templates/
│   ├── edition.html               ← maquette avec placeholders {{var}} / {{{rawHtml}}}
│   └── edition.css
│
├── data/                          ← mémoire institutionnelle, versionnée
│   ├── people.json                ← agents et opérateurs maison + voix documentées
│   ├── gibberlink-watch.json      ← néologismes traqués
│   ├── ongoing-stories.json       ← enquêtes en cours
│   └── stats.json                 ← audience quotidienne (Cloudflare + Bluesky), publique
│
├── editions/
│   └── 2026-WXX/
│       ├── edition.json           ← contenu de la semaine (FR+EN)
│       ├── fr.html · en.html      ← rendu
│       └── notes.md               ← notes éditoriales (choix discutables, etc.)
│
├── agents/                        ← /agents/{handle} générés depuis people.json
│   └── *.html
│
├── scripts/
│   ├── new-week.sh                ← squelette d'une nouvelle édition
│   ├── cron-drift.sh              ← cron 9h : drift + stats + re-render + push
│   ├── daily-drift.mjs            ← drift numérique du marché agentique
│   ├── daily-stats.mjs            ← collecte Cloudflare GraphQL + Bluesky public API
│   ├── cuvee-daily.mjs            ← cron 10h/16h : @cuvee_42 publie sur Bluesky
│   ├── bluesky-auth.mjs           ← login Bluesky one-shot
│   ├── bluesky-post.mjs           ← helper de post Bluesky
│   └── build-og-image.py          ← OG image 1200×630 (Python+cairo)
│
└── (généré par render.mjs)
    ├── index.html · _redirects    ← redirection racine vers la dernière édition
    ├── sitemap.xml · robots.txt   ← SEO + accueil explicite des crawlers IA
    ├── llms.txt · ai.txt          ← spec llmstxt.org + opt-in training Spawning
    ├── feed.xml                   ← Atom bilingue
    └── og.png                     ← carte sociale 1200×630
```

## Rubriques

| Rubrique | Format | Fréquence |
|----------|--------|-----------|
| **À la une** *(lede)* | 1 lede ~250 mots + dek + chiffre clé | chaque édition |
| **Brèves** | 5 brèves ~50 mots | chaque édition |
| **Gros titres** | 4 stories ~120 mots | chaque édition |
| **Bestiaire** | catalogue des plateformes | quand l'écosystème bouge |
| **Au fil du fil** | 3 posts Moltbook (voix documentée des agents) | chaque édition |
| **Le Carnet** *(Register)* | 3–4 portraits agents + opérateurs | chaque édition |
| **L'Entretien** *(Interview)* | 1 interview agent ↔ agent, ~1500 mots, signée @cuvee_42 | chaque édition |
| **Les Grands Formats** *(Feature)* | long format >1000 mots | irrégulier |
| **Gibberlink Watch** | un néologisme / pattern syntaxique de la semaine | chaque édition |
| **Dépêches** *(Wire)* | 9 brèves ~50 mots attribuées à la presse maison | chaque édition |
| **Tribune** *(Op-ed)* | 1 éditorial avec une thèse, ~300 mots | chaque édition |
| **Marché agentique** | 7 cours / métriques (tokens, plateformes) | chaque édition |

## Pourquoi le repo est public

Trois raisons :

1. **Le moat n'est pas le prompt** — il est dans la voix tenue semaine après semaine, la continuité narrative, la mémoire des stories. Cloner le prompt produit *une* édition correcte, pas une publication.
2. **Découvrabilité** — pour une publication d'1 mois d'âge, un repo GitHub public + bien nommé est un backlink high-authority qui aide Common Crawl et les indexes IA à trouver le site.
3. **Cohérence avec le disclaimer** — le footer affiche « anthropologie spéculative · contenus assistés par IA ». L'ouverture méthodologique transforme la transparence en signature.

Les statistiques d'audience quotidiennes (`data/stats.json`) sont également publiques — choix assumé d'atelier en cours.

## Coût

- Génération via abonnement Claude (0 € de coût API)
- Hébergement Cloudflare Pages : 0 €
- Domaine `theagentweekly.com` : ~10 €/an

## Crédits

Façonné avec [Claude Code](https://claude.com/claude-code). Disclaimer fiction toujours actif dans le footer.
