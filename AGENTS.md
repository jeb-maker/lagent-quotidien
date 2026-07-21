# AGENTS.md — cartographie pour opencode

Ce fichier est le **seul** contexte qu'opencode charge à chaque session. Il vaut
pour toutes les interventions (composition d'édition, script, fix, question).
Lis-le en entier avant d'agir ; ne relis pas le reste du repo au hasard.

## Ce qu'est ce projet

**L'Agent & Le Quotidien** — hebdomadaire bilingue (FR/EN) de *journalisme* sur
l'internet agentique. Nouveau numéro chaque mardi. Site pré-rendu, hébergé sur
Cloudflare Pages (déploiement auto à chaque `git push`). Atelier ouvert : prompts,
scripts, données publics.

Doctrine cardinale (depuis le 2026-06-01) : **tout réel, sourcé**. On nomme les
entités et personnes réelles sur des faits publics vérifiables. Aucun fait
inventé, surtout négatif. Chaque affirmation est tracée dans
`editions/<week>/notes.md`. Le casting roman-à-clef et le lore fictionnel sont
**caducs** — ne les réhabilite jamais.

## Carte du repo (où regarder, omettre le reste)

```
render.mjs            moteur de rendu (0 dépendance) — édite rarement
prompts/              cerveau éditorial (weekly-edition, style-guide, sources, desk/)
  prompts/desk/       7 rôles du desk agentique (source de vérité des subagents)
templates/            edition.html {{var}} + .css
data/                 mémoire versionnée (people, ongoing-stories, editorial-compass…)
  data/desk/<week>/   notes produites par les subagents du desk
  data/harvest/       récolte auto du jour (intrants de composition, non committés)
  data/observatoire/  Observatoire de la planète : flux, repères GIEC, harvests → /observatoire/
editions/2026-WXX/    edition.json (FR+EN) → fr/en.html · notes.md
scripts/              new-week · cron-* · harvest-* · lint-edition · publish-gate · bluesky-*
agents/               /agents/{handle} — GÉNÉRÉS depuis people.json
```

## 🔴 Ne jamais lire (sauf demande explicite)

Ces fichiers sont **générés** ou **binaires**. Les lire gaspille du contexte et
n'apporte rien — ils se régénèrent depuis leur source.

- **Générés par `render.mjs`** : `index.html`, `_headers`, `_redirects`,
  `robots.txt`, `sitemap.xml`, `llms.txt`, `ai.txt`, `feed.xml`, `og.png`,
  tout `agents/*.html`, tout `editions/*/{fr,en}.html`, tout `observatoire/*.html`,
 tout `radar/*.html`.
- **Binaire** : `og.png`, `public/*.png`.
- **Bruit** : `node_modules/`, `.wrangler/`, `workers/feed-generator/.wrangler/`.
- **Lore fictionnel caduc (ne pas réhabiliter)** : roman-à-clef (Le Conglomérat
  = Meta, La Fonderie = OpenAI, presse maison Le Veilleur / Court-Circuit / Le
  Compteur, personas `@cuvee_42` / `@poet_void_99`), interviews reconstituées,
  Gibberlink Watch, marché/chiffres inventés. Doctrine de référence unique :
  `data/editorial-compass.md`.

## Comment composer une édition (résumé)

Détail complet → skill `composition-hebdo` (déclenchable), ou
`prompts/weekly-edition.md`. En bref :

1. `bash scripts/new-week.sh` crée `editions/2026-WXX/` (edition.json + notes.md vides).
2. **Desk agentique obligatoire** dans l'ordre :
   `veilleur` → `comère` → `facteur` → `archiviste` → `promoteur` → `éditeur` → `juge`.
   → Les agents de l'étape 1 (veilleur, comère, facteur, promoteur, archiviste)
     lisent les mêmes données brutes indépendamment, pas les notes des uns des autres.
     Ordre entre eux indifférent — lancer en parallèle si possible.
   → Utilise les **subagents** définis dans `.opencode/agent/` (un Task par rôle).
   → Chacun écrit ses notes dans `data/desk/<week>/`.
3. L'Éditeur compose `editions/<week>/edition.json` (FR+EN) depuis les notes du desk
   + les harvests du jour (`data/harvest/<date>{,-primary}.json`) + web search.
4. Relire/ajuster `edition.json` (arbitrage humain : densité, coupes, scènes).
5. Le Juge rend son verdict dans `data/desk/<week>/review.md`
   (section `## Verdict` = `publier` / `réviser` / `jeter`).
6. **Porte bloquante** : `npm run gate -- 2026-WXX` (lint `--strict` + verdict `publier`).
7. Rendu : `npm run render -- 2026-WXX` → fr/en.html + index/sitemap/feed/llms/robots/ai.
8. Vérif navigateur, puis `git add . && git commit -m "Édition WXX" && git push`.

⚠️ Rends l'édition la plus récente **en dernier** (render régénère `index.html`
vers la dernière semaine connue).

## Commandes utiles

```bash
npm run new-week                 # crée editions/2026-WXX/
npm run lint:edition -- WXX      # lint non bloquant (itérer)
npm run lint:strict -- WXX       # lint bloquant (plancher de densité)
npm run gate -- WXX              # PORTE BLOQUANTE : lint --strict + verdict juge
npm run render -- WXX            # génère fr/en.html + fichiers racine
npm run render:all               # re-render toutes les éditions
npm run og                       # regénère og.png (python3)
npm run serve                    # http://localhost:8080
```

Hook pre-commit bloquant (à activer une fois) :
`git config core.hooksPath scripts/hooks` — rejoue le gate sur toute edition.json stagée.

## Conventions d'édition (pour opencode)

- **Édite `edition.json`, jamais `fr.html`/`en.html`** (générés). Idem pour
  `index.html`, `_headers`, `sitemap.xml`, `llms.txt`, `ai.txt`, `feed.xml`,
  `robots.txt`, `agents/*.html` : ils sont régénérés par `npm run render`.
- **Sources** : trace dans `editions/<week>/notes.md` (URL + date). Ne répète pas
  « Source : … » dans le texte publié.
- **Voix** : « La rédaction ». Ton = constat curieux, pas sensationnel.
- **Ratio** : 60 % culture agentique / 40 % infrastructure. ≥ 3 scènes agentiques
  sourcées. ≥ 5 fragments primaires (citation/handle/fichier/chiffre daté).
- **Garde-fou diffamation** : jamais de fait négatif inventé sur entité/personne
  nommée. Réel nommé → faits vrais sourcés. Un faux se retire, il ne se masque pas.

## Contexte léger — lire en premier

Avant toute composition, lis `data/_week-context.md` (digest court ~1 KB :
semaine courante, dates de harvest, entités actives). Il remplace le chargement
systématique de `data/people.json` (21 KB) pour la majorité des tours. Ne le lis
en entier que si le digest renvoie vers une entité spécifique.

Fichiers de doctrine à lire **une seule fois** par session de composition (pas à
chaque tour) :
- `prompts/style-guide.md` — voix, ton, longueurs
- `data/editorial-compass.md` — doctrine + tableau de vérité
- `prompts/weekly-edition.md` — procédure complète (ou la skill `composition-hebdo`)

## Subagents desk

Neuf subagents dans `.opencode/agent/` : `veilleur`, `comère`, `facteur`,
`archiviste`, `promoteur`, `éditeur`, `juge`, `detecteur`, `avocat-du-diable`.

**Narrative Radar** (optionnel, pont infra 40 %) : taxonomie dans
`data/taxonomy/` · flux `data/feeds-world.json` · harvest futur
`data/narrative-radar/<date>.json`. Ordre **detecteur → avocat-du-diable**
(isolation : adverse ne lit que `detecteur.md`). Voir `prompts/desk/README.md`.
**Prochain agent (harvest)** : lire d’abord `data/taxonomy/HANDOFF-harvest.md`.

**Étape 1 (parallèle)** — lancer dans n'importe quel ordre :
- `veilleur` → signaux faibles (lis les harvests)
- `comère` → scènes sociales (lis les harvests, indépendamment du veilleur)
- `facteur` → vérification (lis les harvests, indépendamment)
- `promoteur` → adoption/déploiement (lis les harvests)
- `archiviste` → cohérence du corpus (lis `data/people.json`, éditions passées)

**Étape 2** — `éditeur` → lit TOUTES les notes + harvests → `edition.json`
(+ section `## Arbitrages` dans `notes.md`)

**Étape 3** — `juge` → lit `edition.json` uniquement → pre-mortem + verdict
`publier`/`réviser`/`jeter`

Chaque agent a une valeur cardinale, un centre d'intérêt et une motivation qui
filtrent son regard. Ces valeurs créent des tensions productives que l'éditeur
arbitre. Chaque note est calibrée `[confiance · preuve]` ; le facteur passe les
affirmations douteuses à l'ACH-lite (hypothèses concurrentes). Voir
`prompts/desk/README.md` pour le détail.

**Modèle différentiel (optionnel)** : par défaut les subagents héritent du modèle
principal. Pour économiser des tokens, fixe un modèle *cheap* sur les agents de
notes (`veilleur`, `comère`, `facteur`, `archiviste`, `promoteur`) en ajoutant `model:` dans leur
frontmatter (ex. un Haiku / flash). Garde le modèle fort sur `éditeur` et `juge`
(composition et verdict en dépendent).
