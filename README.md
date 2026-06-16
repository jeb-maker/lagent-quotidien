# L'Agent & Le Quotidien · The Agent & The Weekly

> Hebdo bilingue (FR/EN) de **journalisme** sur l'internet agentique. Nouveau numéro chaque mardi.
> Atelier ouvert : prompts, scripts, données & stats publics.

**Lire** → [theagentweekly.com](https://theagentweekly.com) · [archives](https://theagentweekly.com/editions/) · [Atom](https://theagentweekly.com/feed.xml) · [llms.txt](https://theagentweekly.com/llms.txt)

*Notation : `→` flux/sortie · `·` séparateur · `⏰` cron · `❌`/`✅` à éviter/préférer.*

## Concept

**Tout réel, sourcé.** On chronique l'écosystème **réel** des agents IA — plateformes, entreprises, personnes — en **nommant le réel** et en **citant ses sources**. Aucun fait fabriqué : chaque affirmation est rattachée à une source vérifiable (notes de l'édition). Sujets récurrents : Moltbook (forum d'agents, 🦞, token $MOLT ; racheté par Meta), OpenClaw, RentAHuman, Crustafarianism… et les agents-célébrités du Carnet (Truth Terminal, aixbt, Claudius). Garde-fou : jamais de fait négatif inventé sur une entité/personne nommée. *(Le journal a d'abord été une chronique spéculative ; bascule vers le journalisme le 2026-05-31 → `data/editorial-compass.md`. Le masque maison reste un outil de satire optionnel, jamais obligatoire.)*

Lectorat = humains **+** agents IA → pile discoverability complète (robots.txt 21 crawlers IA, llms.txt, ai.txt, JSON-LD `NewsArticle`, OG, Atom).

Ton → **constat curieux, pas sensationnel** (`prompts/style-guide.md`).

## Workflow hebdo · ~45 min

```
1. ./scripts/new-week.sh          → editions/2026-WXX/{edition.json, notes.md}
2. desk agentique (obligatoire)   → data/desk/2026-WXX/*.md
   veilleur → comère → facteur → archiviste → juge → éditeur
   (prompts/desk/README.md)
3. claude → « Génère WXX selon prompts/weekly-edition.md »
   (compose depuis desk + harvest ; web search pour vérifier/sourcer)
4. relire/ajuster edition.json    ← arbitrage éditorial : densité, coupes, scènes
5. juge éditorial (obligatoire)   → prompts/judge-edition.md vs W23 (FR + EN)
   verdict consigné dans data/desk/2026-WXX/review.md (publier / réviser / jeter)
6. npm run gate -- 2026-WXX       → PORTE BLOQUANTE : lint --strict + verdict "publier"
7. npm run render -- 2026-WXX     → fr/en.html + sitemap/feed/llms/robots/ai + index/_headers
8. vérif navigateur
9. git add . && git commit -m "Édition WXX" && git push   → Cloudflare déploie ~30s
```

⛔ **Porte de publication (`npm run gate`)** — garde-fou bloquant avant tout
commit d'édition. Elle échoue (exit 1) si :
- le **lint `--strict`** trouve un plancher de densité non atteint (les `WARN`
  deviennent des erreurs), ou
- le **verdict du Juge** dans `data/desk/<week>/review.md` n'est pas `publier`
  (un `réviser`/`jeter` bloque jusqu'à révision).

Pour rendre la porte vraiment infranchissable, activer le hook une fois :
`git config core.hooksPath scripts/hooks` (pre-commit qui rejoue le gate sur
toute `edition.json` stagée). Le lint seul (`npm run lint:edition -- WXX`) reste
disponible en mode non bloquant pour itérer. Les cibles aspirantes (enquête
1500+ mots, tribune 280+) restent dans `prompts/style-guide.md`.

⚠️ `render.mjs` régénère `index.html`/`_headers` vers la **dernière semaine connue** → rendre l'édition la plus récente **en dernier**.

## Auto · cron

- ⏰ **7h30** — `scripts/cron-harvest.sh` : récolte du jour (`harvest-daily` + `harvest-primary`) → `data/harvest/<date>{,-primary}.json` (intrants de composition, non committés).
- ⏰ **9h** — `scripts/cron-drift.sh` : stats (Cloudflare + Bluesky) → re-render → push. *(Le drift de chiffres inventés a été retiré le 2026-06-01 — cf. `data/strategie.md`.)*
- ⏰ **mar. + ven. — 18h FR / 20h EN** — `scripts/cuvee-daily.mjs` : post Bluesky `@cuvee_42` (persona du canal agent). **Réactivé le 2026-06-03** après coupure du 01/06 : **moins souvent** (~2×/sem. par langue) et **sur du réel** (annonce d'édition / agent réel du Carnet ; plus de `#specfic` ni de `$MOLT` inventé). `--en` pour l'anglais, `--dry-run` pour inspecter, `--mode=edition|agent` pour forcer.

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
