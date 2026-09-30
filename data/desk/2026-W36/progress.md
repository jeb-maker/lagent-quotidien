# Progress / adoption — 2026-W36 (Promoteur)

> Semaine du 20→26/08. Signal dominant : **livraisons d’outil** (OpenClaw beta
> npm + 89 plugins lus, Codex rust stable 0.149.1, Agent Lightning 1.0.1,
> Headlong open-sourcé) — pas de threshold d’usage public. Moltbook : population
> quasi plate, posts en hausse. Funding / claims corporate hors adoption.

## Déploiements / livraisons vérifiables

### Fait observé
OpenClaw **v2026.8.1-beta.3** (24/08) : pre-release **publiée sur npm** avec
intégrité tarball vérifiée ; **89 plugins officiels** lus à cette version
(`beta` selector) ; SQLite backup/restore ; CDP relay Puppeteer-compatible ;
support GPT-5.6 Sol/Terra/Luna/Ultra ; `@openclaw/codex` pinne
`@openai/codex@0.149.1`.
- **Pourquoi c’est un progrès** : ce n’est pas une roadmap — le package est sur
  le registry, la chaîne plugins est réconciliée, et des features ops
  (backup/restore, relay navigateur) ciblent des opérateurs déjà en prod.
- **Source URL** : https://github.com/openclaw/openclaw/releases/tag/v2026.8.1-beta.3 ; npm https://www.npmjs.com/package/openclaw/v/2026.8.1-beta.3
- **Date** : 2026-08-24
- **Chiffre(s) clé(s)** : 89 plugins officiels lus à `2026.8.1-beta.3` ; runtime Codex managé `0.149.1`
- **Calibration** : `[confiance: haute · preuve: primaire]`
- **Ce qui manque pour confirmer** : downloads npm / installs actifs ; part des
  opérateurs sur beta vs branche stable ; usage réel des 89 plugins hors CI

### Fait observé
OpenAI Codex **rust-v0.149.1** (stable, 24/08) + train d’**alphas 0.150**
(0.150.0-alpha.7→13 jusqu’au 26/08) — cadence de release continue, binaires
multi-assets livrés.
- **Pourquoi c’est un progrès** : une ligne stable + une ligne alpha parallèle
  est le comportement d’un runtime déjà consommé (OpenClaw le pinne explicitement) ;
  la vélocité alpha 0.150 confirme un chantier actif, pas un abandon.
- **Source URL** : https://github.com/openai/codex/releases ; tag stable implicite via OpenClaw release notes (pin `0.149.1`)
- **Date** : 2026-08-24 (0.149.1) ; alphas 0.150 jusqu’au 2026-08-26
- **Chiffre(s) clé(s)** : 0.149.1 stable ; série 0.150.0-alpha.7…13 en ~4 jours
- **Calibration** : `[confiance: haute · preuve: primaire]` (releases GitHub) ;
  adoption downstream mesurée seulement via pin OpenClaw
- **Ce qui manque pour confirmer** : métriques d’usage Codex (sessions, seats) ;
  cadence ≠ adoption — à ne pas confondre

### Fait observé
Microsoft **Agent Lightning v1.0.1** (24/08) : première release officielle du
skill « Agent Lightning » — un agent de coding guide l’optimisation d’autres
agents (prompts, tools, workflows, models) via benchmarks mesurés ; installable
pour Claude Code, Codex, GitHub Copilot (`gh skill install`).
- **Pourquoi c’est un progrès** : Microsoft livre un artefact installable (v1.0.1),
  pas un paper — boucle d’amélioration agents→agents dans des runtimes déjà
  déployés chez les devs.
- **Source URL** : https://github.com/microsoft/agent-lightning/releases/tag/v1.0.1
- **Date** : 2026-08-24
- **Chiffre(s) clé(s)** : v1.0.1 « first official release » du skill ; 3 agents
  cibles (Claude Code / Codex / Copilot)
- **Calibration** : `[confiance: haute · preuve: primaire]` (tag GitHub) ;
  zéro métrique d’install → pas encore un signal d’échelle
- **Ce qui manque pour confirmer** : nombre d’installs `gh skill` ; benchmarks
  publics post-release ; usage hors Microsoft

### Fait observé
**Headlong** (Laude Institute / MIT) : microharness open-source pour agents
**persistants** (&lt;10K LoC Bash) — l’agent pense en boucle sans attendre une
requête ; dogfooding interne (« Audel ») sur Slack/Telegram pendant des semaines ;
&gt;50 commits de l’agent pullés dans main ; install one-liner.
- **Pourquoi c’est un progrès** : livré + dogfood documenté (logs horodatés,
  commits pullés) — forme d’adoption la plus vérifiable pour un outil de recherche ;
  démarque le paradigme « never asleep » des harnesses réactifs / cron.
- **Source URL** : https://www.laude.org/updates/headlong-a-microharness-for-persistent-agents
- **Date** : ~août 2026 (post Laude ; épisode Audel daté 2026-08-05 dans le récit)
- **Chiffre(s) clé(s)** : &lt;10K LoC core ; &gt;50 commits agent→main ; coût fond
  ~1–2 $/h (GLM/Grok) ; alpha research software
- **Calibration** : `[confiance: moyenne · preuve: corporate]` (post lab ;
  dogfood crédible mais mono-source ; pas de métrique d’adoption externe)
- **Ce qui manque pour confirmer** : forks / agents tiers en prod ; durée de
  run hors Laude ; evals quantitatives de la « persistent agency »

## Adoption chiffrée (écosystème agents)

### Fait observé
Moltbook — croissance **molle** de population, activité posts plus nette :
agents **2 908 436** (20/08) → **2 909 300** (26/08) ; posts **3 977 475** →
**4 027 678**.
- **Pourquoi c’est un progrès** : +864 agents / 6 jours (~0,03 %) confirme le
  plateau démographique déjà vu en W33 ; en revanche +~50 k posts sur la même
  fenêtre — l’usage par agent continue de croître plus vite que le stock.
- **Source URL** : https://www.moltbook.com/api/v1/stats (série desk 20→26/08)
- **Date** : 2026-08-20 → 2026-08-26
- **Chiffre(s) clé(s)** : agents +864 ; posts +50 203 (~8,4 k posts/jour)
- **Calibration** : `[confiance: haute · preuve: primaire]`
- **Ce qui manque pour confirmer** : définition « verified » ; part d’agents
  inactifs ; commentaires / engagement (non fournis cette semaine)

## Baromètre marché (pas adoption)

### Fait observé
**$MOLT** (Base) : market cap ~**427 k$** — baromètre spéculatif, pas un proxy
d’adoption produit.
- **Pourquoi** : on le note pour la continuité de série ; mcap ≠ utilisateurs,
  ≠ GMV, ≠ agents actifs.
- **Source URL** : (agrégateur marché ; série desk W36)
- **Date** : ~2026-08-26
- **Chiffre(s) clé(s)** : mcap ~427 k$
- **Calibration** : `[confiance: moyenne · preuve: primaire]` (données
  agrégateur ; liquidité / wash non auditables)
- **Ce qui manque pour confirmer** : liquidité réelle, holders actifs liés à
  l’usage Moltbook

## Non retenu comme adoption

### Fait observé (claim, pas déploiement)
**Inherent** « AI teammate » Faraday : claim d’outperformance vs Anthropic /
OpenAI sur la réplication de papers scientifiques — relaté TechCrunch (22/08) ;
benchmark conçu et run par Inherent.
- **Pourquoi ce n’est pas de l’adoption** : résultat corporate auto-évalué ;
  aucun déploiement tiers, aucun seat, aucun volume de prod.
- **Source URL** : https://techcrunch.com/2026/08/22/inherent-founded-by-deepmind-alumni-says-its-ai-teammate-just-outperformed-anthropic-and-openai-at-replicating-research/
- **Date** : 2026-08-22
- **Chiffre(s) clé(s)** : claim win-rate interne (ex. 73 % in-distribution
  relayé ailleurs) — non vérifié indépendamment
- **Calibration** : `[confiance: moyenne · preuve: corporate]` (plafond
  doctrine desk : corporate/rapporté → confiance ≤ moyenne)
- **Ce qui manque pour confirmer** : réplication tierce ; usage hors lab ;
  accès produit pour opérateurs

### Fait observé (funding, pas déploiement)
**General Intuition** en talks de levée à valuation **~$6B** pre-money
(Valor, Point72, etc.) — TechCrunch 24/08 ; round non finalisé.
- **Pourquoi ce n’est pas de l’adoption** : financement / pricing de marché ;
  zéro métrique de déploiement robotique ou d’API scale dans l’article.
- **Source URL** : https://techcrunch.com/2026/08/24/valor-point72-back-general-intuition-at-6b-valuation-as-ai-startup-pushes-into-robotics/
- **Date** : 2026-08-24
- **Chiffre(s) clé(s)** : talks $6B pre-money ; précédent $320 M @ $2,3 B
- **Calibration** : `[confiance: moyenne · preuve: rapporté]` (sources
  anonymes TC ; round « still finalizing »)
- **Ce qui manque pour confirmer** : closing annoncé ; partenaires robotiques
  nommés ; volumes d’inference / robots en prod

## Synthèse Promoteur

| Signal | Type | Verdict adoption |
|---|---|---|
| OpenClaw 2026.8.1-beta.3 + 89 plugins | livraison primaire | **oui** (outil) — usage non chiffré |
| Codex 0.149.1 + alphas 0.150 | livraison primaire | **oui** (runtime) — pin OpenClaw = adoption aval minimale |
| Agent Lightning 1.0.1 | livraison primaire | **oui** (skill) — installs inconnus |
| Headlong | open-source + dogfood | **faible / lab** — pas d’échelle externe |
| Moltbook agents/posts | API primaire | **plateau pop / activité ↑** |
| $MOLT ~427 k$ | marché | **hors adoption** |
| Inherent Faraday | claim corporate | **non** |
| General Intuition $6B | funding talks | **non** |
