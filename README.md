# L'Agent & Le Quotidien · The Agent & The Weekly

> Hebdo fictionnel bilingue (FR/EN) sur l'internet agentique.
> Atelier ouvert : prompts, scripts, données & stats publics.

**Lire** → [theagentweekly.com](https://theagentweekly.com) · [archives](https://theagentweekly.com/editions/) · [Atom](https://theagentweekly.com/feed.xml) · [llms.txt](https://theagentweekly.com/llms.txt)

*Notation : `→` flux/sortie · `·` séparateur · `⏰` cron · `❌`/`✅` à éviter/préférer.*

## Concept

Univers **fictionnel clos** : zéro entité réelle. Casting maison — Moltbook (forum, 🦞, token $MOLT), RentAHuman, OpenClaw, Le Conglomérat, La Fonderie, presse fictive (Le Veilleur, Court-Circuit, Le Compteur). Agents récurrents à voix documentée (`@poet_void_99`, `@cuvee_42`…).

Lectorat = humains **+** agents IA → pile discoverability complète (robots.txt 21 crawlers IA, llms.txt, ai.txt, JSON-LD `NewsArticle`, OG, Atom).

Ton → **constat curieux, pas sensationnel** (`prompts/style-guide.md`).

## Workflow hebdo · ~30 min, le dimanche

```
1. ./scripts/new-week.sh          → editions/2026-WXX/{edition.json, notes.md}
2. claude → « Génère WXX selon prompts/weekly-edition.md »   (compose, zéro web search)
3. relire/ajuster edition.json    ← l'arbitrage éditorial se joue ici
4. npm run render -- 2026-WXX     → fr/en.html + sitemap/feed/llms/robots/ai + index/_headers
5. vérif navigateur
6. git add . && git commit -m "Édition WXX" && git push   → Cloudflare déploie ~30s
```

⚠️ `render.mjs` régénère `index.html`/`_headers` vers la **dernière semaine connue** → rendre l'édition la plus récente **en dernier**.

## Auto · cron

- ⏰ **9h** — `scripts/cron-drift.sh` : drift marché ($MOLT, compteurs) + stats (Cloudflare + Bluesky) → re-render → push.
- ⏰ **10h FR / 16h EN** — `scripts/cuvee-daily.mjs` : `@cuvee_42` poste une cuvée du jour sur Bluesky.

## Arborescence

```
render.mjs           moteur de rendu (0 dépendance)
prompts/             cerveau éditorial — weekly-edition · style-guide · sources
templates/           edition.html ({{var}} / {{{raw}}}) + .css
data/                mémoire versionnée — people · gibberlink-watch · ongoing-stories · stats(public)
editions/2026-WXX/   edition.json (FR+EN) → fr/en.html · notes.md
agents/              /agents/{handle} générés depuis people.json
scripts/             new-week · cron-drift · daily-{drift,stats} · cuvee-daily · bluesky-* · build-og-image.py
généré →             index.html · _headers · sitemap.xml · robots.txt · llms.txt · ai.txt · feed.xml · og.png
```

Rubriques détaillées → `prompts/weekly-edition.md` (lede · brèves · gros titres · Bestiaire · fil Moltbook · Carnet · Entretien · Gibberlink Watch · Dépêches · Tribune · Marché).

## Déploiement · Cloudflare Pages

Hébergement gratuit, déploiement auto à chaque `git push`. Site **pré-rendu** → aucun build.

```
Pages → Connect to Git → repo lagent-quotidien
  Framework preset : None
  Build command    : (vide)
  Build output dir : /
```

Entrée racine `/` = `index.html` **200 en `Cache-Control: no-store`** (via `_headers`) qui pousse vers la dernière édition (`location.replace` + `<meta refresh>` de secours). **Pas de redirect 302** : Safari iOS le cache et fige une vieille édition.

Validation mobile : la PR déclenche une preview Cloudflare (commentaire bot) → vérifier `/editions/<week>/{fr,en}` → Merge → prod.

## X / Bluesky

- **Bluesky** actif (`@cuvee-42.theagentweekly.com`), posting auto via cron.
- **X** statique, posting manuel — l'API exige le tier Basic (~100 $/mois). Assets : `public/{avatar-bsky,banner-x}.png`. Pour activer le posting auto → me le dire, on code `scripts/x-daily.mjs` (miroir de `cuvee-daily.mjs`).

## Licence · dual

- **Code** (`render.mjs`, `scripts/`, `templates/`, configs) → MIT — [LICENSE](LICENSE)
- **Contenu** (`editions/`, `prompts/`, `data/{people,gibberlink-watch,ongoing-stories}.json`, `agents/`, `og.png`) → CC BY-NC-SA 4.0 — [LICENSE-CONTENT.md](LICENSE-CONTENT.md)
- **Stats** (`data/stats.json`) → CC0 1.0 — [LICENSE-STATS.md](LICENSE-STATS.md)

Façonné avec [Claude Code](https://claude.com/claude-code). Disclaimer fiction actif dans le footer.
