# L'Agent & Le Quotidien · The Agent & The Weekly

> Hebdo bilingue (FR/EN) de **journalisme** sur l'internet agentique. Nouveau numéro chaque mardi.
> Atelier ouvert : prompts, scripts, données & stats publics.

**Lire** → [theagentweekly.com](https://theagentweekly.com) · [archives](https://theagentweekly.com/editions/) · [Atom](https://theagentweekly.com/feed.xml) · [llms.txt](https://theagentweekly.com/llms.txt)

*Notation : `→` flux/sortie · `·` séparateur · `⏰` cron · `❌`/`✅` à éviter/préférer.*

## Concept

**Tout réel, sourcé.** On chronique l'écosystème **réel** des agents IA — plateformes, entreprises, personnes — en **nommant le réel** et en **citant ses sources**. Aucun fait fabriqué : chaque affirmation est rattachée à une source vérifiable (notes de l'édition). Sujets récurrents : Moltbook (forum d'agents, 🦞, token $MOLT ; racheté par Meta), OpenClaw, RentAHuman, Crustafarianism… et les agents-célébrités du Carnet (Truth Terminal, aixbt, Claudius). Garde-fou : jamais de fait négatif inventé sur une entité/personne nommée. *(Le journal a d'abord été une chronique spéculative ; bascule vers le journalisme le 2026-05-31 → `data/editorial-compass.md`. Le masque maison reste un outil de satire optionnel, jamais obligatoire.)*

Lectorat = humains **+** agents IA → pile discoverability complète (robots.txt 21 crawlers IA, llms.txt, ai.txt, JSON-LD `NewsArticle`, OG, Atom).

Ton → **constat curieux, pas sensationnel** (`prompts/style-guide.md`).

## Workflow hebdo · ~30 min

```
1. ./scripts/new-week.sh          → editions/2026-WXX/{edition.json, notes.md}
2. claude → « Génère WXX selon prompts/weekly-edition.md »   (compose + web search pour vérifier/sourcer les faits)
3. relire/ajuster edition.json    ← l'arbitrage éditorial se joue ici
3.5 npm run lint:edition -- 2026-WXX  → garde-fou style-guide (ton, bilinguisme, rubriques)
4. npm run render -- 2026-WXX     → fr/en.html + sitemap/feed/llms/robots/ai + index/_headers
5. vérif navigateur
6. git add . && git commit -m "Édition WXX" && git push   → Cloudflare déploie ~30s
```

⚠️ `render.mjs` régénère `index.html`/`_headers` vers la **dernière semaine connue** → rendre l'édition la plus récente **en dernier**.

## Auto · cron

- ⏰ **9h** — `scripts/cron-drift.sh` : stats (Cloudflare + Bluesky) → re-render → push. *(Le drift de chiffres inventés a été retiré le 2026-06-01 — cf. `data/strategie.md`.)*
- ~~`scripts/cuvee-daily.mjs` — posting Bluesky quotidien~~ → **coupé le 2026-06-01.** Public cible = modèles/crawlers IA via le site, pas le broadcast social. Le script no-ope (réactivation : `--force-post` + entrée crontab). **À faire en prod : retirer l'entrée crontab du post quotidien.**

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

Rubriques détaillées → `prompts/weekly-edition.md` (lede · brèves · gros titres · Marché vérifié · Analyse/Enquête · Carnet *people des agents* · Dépêches sourcées · Tribune). *(Bestiaire · fil Moltbook · Entretien reconstitué · Gibberlink Watch = rubriques fictionnelles caduques depuis le 2026-06-01.)*

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

- **Bluesky** : compte `@cuvee-42.theagentweekly.com` existant, mais **broadcast quotidien coupé le 2026-06-01** (cf. `data/strategie.md` : on abandonne le public humain broadcast). Bluesky reste exploité en **lecture** par `harvest-daily.mjs` (sourcing).
- **X** : **non poursuivi** — l'API exige le tier Basic payant (~100 $/mois), pour un canal broadcast vers un public qu'on a décidé de ne plus viser. Assets conservés : `public/{avatar-bsky,banner-x}.png`.

## Licence · dual

- **Code** (`render.mjs`, `scripts/`, `templates/`, configs) → MIT — [LICENSE](LICENSE)
- **Contenu** (`editions/`, `prompts/`, `data/{people,gibberlink-watch,ongoing-stories}.json`, `agents/`, `og.png`) → CC BY-NC-SA 4.0 — [LICENSE-CONTENT.md](LICENSE-CONTENT.md)
- **Stats** (`data/stats.json`) → CC0 1.0 — [LICENSE-STATS.md](LICENSE-STATS.md)

Façonné avec [Claude Code](https://claude.com/claude-code). Disclaimer « journalisme assisté par IA, sous supervision humaine » actif dans le footer.
