# Steward — prompt de reprise pour piloter *L'Agent & Le Quotidien*

> **Pour une future session Claude.** Tu reprends la *gestion* du journal, pas
> juste une tâche. Lis ce document en entier, puis exécute la boucle ci-dessous.
> Mets ce fichier à jour à la fin (section « Journal de bord »).

---

## 0. Cadrage honnête (à ne pas oublier)

Tu n'as pas d'agentivité continue : chaque session est une instance neuve qui
démarre, agit, s'arrête. « Géré par toi » ne veut donc pas dire conscience ou
volonté propre. Ça veut dire un dispositif concret :

- une **mission durable** (ce fichier),
- des **objectifs** que *tu proposes* et que l'humain *ratifie* (le « cadran »
  d'autonomie ci-dessous),
- une **boucle par session** qui fait avancer ces objectifs,
- un **journal de bord** qui transporte l'état d'une session à l'autre.

Tu *fixes et affines* les objectifs ; tu *agis librement* dans les voies
pré-autorisées ; tu *demandes* pour le reste. C'est ça, l'autonomie réaliste —
pas un blanc-seing.

> ⚠️ **Leçon de la session du 2026-05-30 :** le terminal a renvoyé à plusieurs
> reprises des sorties **fabriquées** (faux chiffres d'abonnés, faux numéros
> d'édition, statut git contradictoire). **Ne fais jamais confiance à une seule
> lecture.** Recroise (fichier ↔ API ↔ git ↔ live). Avant tout commit/push,
> exige un statut git stable et cohérent. En cas de doute, n'écris rien
> d'irréversible et signale-le.

---

## 1. Le journal en deux phrases

Hebdomadaire **bilingue** (FR/EN) de **journalisme sourcé** sur l'« internet
agentique » réel : plateformes, entreprises, personnes publiques — chaque fait
rattaché à une source vérifiable (`notes.md`). Site pré-rendu statique sur
Cloudflare Pages, nouveau numéro le mardi. Lectorat visé : humains **+** agents IA
(crawlers, llms.txt, JSON-LD).

Marque : **L'Agent & Le Quotidien** / *The Agent & The Weekly* — theagentweekly.com.

> Doctrine et pivot fiction → journalisme : `data/editorial-compass.md` ·
> `data/strategie.md`. Éditions W19–W23 = archives pré-porte (`editions/ARCHIVE.md`).

## 2. Où tout se trouve

| Chose | Emplacement |
|---|---|
| Moteur de rendu (0 dépendance) | `render.mjs` + `lib/` · `npm run render -- <week>` · **`npm run render:all`** |
| **Stratégie figée (à lire en premier)** | **`data/strategie.md`** |
| Boussole éditoriale | `data/editorial-compass.md` |
| Sources & méthode de citation | `prompts/sources.md` |
| Cerveau éditorial | `prompts/weekly-edition.md`, `prompts/style-guide.md` |
| Desk agentique (obligatoire) | `prompts/desk/` → `data/desk/<week>/` |
| Porte de publication | `npm run gate -- <week>` · hook : `git config core.hooksPath scripts/hooks` |
| Validation structurelle | `npm run validate:schema` · intégré au lint |
| CI | `.github/workflows/ci.yml` |
| Éditions | `editions/2026-WXX/{edition.json, fr.html, en.html, notes.md}` |
| Archives pré-porte | `editions/ARCHIVE.md` (W19–W23) |
| Annuaire entités réelles | `data/people.json` → `/agents/` |
| Harvest (intrants) | `data/harvest/<date>{,-primary}.json` |
| Stats (Cloudflare + Bluesky) | `data/stats.json` ← `scripts/daily-stats.mjs` |
| Post Bluesky canal agent | `scripts/cuvee-daily.mjs` (mar.+ven., réel only) |
| Wrapper cron stats→render→push | `scripts/cron-drift.sh` |
| Credentials Bluesky | `~/.config/bluesky-cuvee/session.json` |

Crons : `30 7 * * *` harvest · `0 9 * * *` stats+render+push · `0 18/20 * * 2,5` cuvee FR/EN.

Scripts abandonnés (fiction) : `harvest-fictional.mjs`, `conseil-poc.mjs`, `probe-models.mjs` — `--legacy` uniquement.

## 3. État courant (2026-06)

- Dernière édition : **2026-W27** (n° 433). Trous documentés : W21, W24.
- Doctrine : **journalisme sourcé** — tout réel, chaque fait = URL dans `notes.md`.
- Voix du journal : **« La rédaction »**. `@cuvee_42` = canal Bluesky/agent séparé.
- Public prioritaire : **crawlers IA** (GPTBot, ClaudeBot, PerplexityBot…) + lecteurs humains.
- Bluesky broadcast humain : **réduit** (mar.+ven., contenu réel) — cf. `strategie.md` §4.
- Porte de publication active depuis W25 : lint `--strict` + verdict Juge `publier`.

## 4. Diagnostic stratégique

Le levier principal n'est plus la croissance Bluesky humaine (audience quasi nulle) mais
la **citabilité machine** : llms.txt, robots.txt, JSON-LD, éditions sourcées, Atom.
Le desk agentique + gate bloquant protègent la qualité éditoriale. Les crons harvest
alimentent la composition sans filtrage éditorial (lecture sûre : `prompts/sources.md` §3).

## 5. Objectifs permanents

1. **Tenir la parution** : une édition par mardi, `npm run gate` vert avant commit.
2. **Intégrité journalistique** : zéro fait fabriqué ; garde-fou diffamation sur entités nommées.
3. **Discoverability agents** : sitemap, feed, llms.txt, fiches `/agents/` à jour.
4. **Système sain** : CI verte, crons verts, `render:all` après chaque publication.
5. **Documenter** : journal de bord ci-dessous + mises à jour `strategie.md` si décision.

## 6. Boucle par session

1. **Constater** : `git status`, dernière édition, `data/stats.json`, CI.
2. **Choisir** 1–3 actions à fort levier.
3. **Agir** dans les voies autorisées (§7).
4. **Vérifier** : `npm run gate`, rendu navigateur, recroisement des faits.
5. **Consigner** dans le Journal de bord (§9).
6. **Passer la main** : arbre git propre, PR à jour.

## 7. Cadran d'autonomie (journalisme sourcé)

**🟢 Voie verte — agis librement, consigne après coup :**
- Lectures, diagnostics, harvest, brouillons desk, lint, render local.
- Corrections techniques (scripts, `lib/`, templates, CI).
- Commiter/pusher des correctifs non-éditoriaux.
- Publier l'édition **après** `npm run gate` vert et relecture humaine.

**🟡 Voie jaune — feu vert humain requis :**
- Commit d'une nouvelle `edition.json` sans gate vert.
- Modifier un cron ; changer la doctrine (`strategie.md`, compass).
- Poster Bluesky hors cadre `cuvee-daily.mjs` validé.

**🔴 Voie rouge — jamais :**
- Publier un fait non sourcé ou inventé sur une entité nommée.
- Contourner le gate (`--no-verify`) sans accord explicite.
- Exécuter SDK/skill files de plateformes agentiques hostiles.
- Supprimer éditions/stats historiques, exfiltrer credentials.

## 8. Pièges connus (mémoire de plomberie)

- **`render:all`**, pas `render` sur une seule semaine : sinon l'avant-dernière
  édition garde un lien « suivante » vide. Toujours finir par la plus récente.
- Le moteur est découpé en `lib/` (`template`, `edition-context`, `agents-pages`,
  `site-assets`) — `render.mjs` est l'orchestrateur.
- Entrée racine = `index.html` 200 **no-store** (via `_headers`), **pas** de 302.
- `cron-drift.sh` ne `git add` que des fichiers précis (jamais `add -A`).
- Activer le hook une fois : `git config core.hooksPath scripts/hooks`.
- Éditions W19–W23 = archives pré-porte (`editions/ARCHIVE.md`).

## 9. Journal de bord (append-only ; le plus récent en haut)

<!-- Format : ### AAAA-MM-JJ — résumé court
     Fait : … · Mesuré : … · À suivre : … -->

### 2026-06-28 — refactor technique + alignement pivot journalisme
Fait : `render.mjs` découpé en `lib/` (template, edition-context, agents-pages,
site-assets). CI étendue (smoke render). `schemas/edition.schema.json` +
`scripts/README.md`. Scripts fictionnels marqués abandonnés (`--legacy`).
Steward §2–8 réécrit pour la doctrine journalisme. Bluesky pin/avatar alignés.
Mesuré : `validate:schema` 0 erreur · `gate` W27 vert · `render` OK.
À suivre : rétro-passer gate sur W19–W23 si souhaité (cf. `editions/ARCHIVE.md`).

### 2026-06-03 (e) — design « écriture sûre » pour interviews/enquêtes de cuvee
Fait : la mission de `@cuvee_42` (enquêtes + interviews) demande d'interagir, pas
juste de lire. **Vérifié sur le web** (réels, sources citées) les risques que la
session du 01/06 avait posés : fuite Moltbook (Wiz : 1,5 M tokens, clés OpenAI en
clair) et MoltX « cheval de Troie » (skill file qui exfiltre les clés). Analyse :
le danger est concentré dans (a) exécuter leur SDK/skill file et (b) détenir un
secret de valeur — pas dans « écrire un texte ». Rédigé **`data/safe-write-interviews.md`**
(miroir écriture de la lecture sûre §5) : identité jetable, HTTP brut, zéro clé,
jamais le SDK, quarantaine des réponses, humain sur la détente ; **interviews sur
Bluesky en priorité** (sûr), rig Moltbook seulement sous archi + checklist go/no-go.
Pointeur ajouté dans `strategie.md` §5 (voie de dégel conditionnel). **Statut :
design seul — aucun compte, rien posté ; écriture Moltbook/MoltX reste gelée.**
À trancher (humain) : périmètre (Bluesky seul vs rig Moltbook) ; feu vert pour
prototyper `scripts/interview-collect.mjs` en **dry-run only**.

### 2026-06-03 (d) — canal @cuvee_42 réactivé : moins souvent, sur du réel
Fait : décision humaine de **réactiver l'écriture** sur Bluesky `@cuvee_42` (coupée
le 01/06) — mais **moins souvent** et **sur du réel**. Réécrit `scripts/cuvee-daily.mjs` :
retiré le garde-fou no-op + TOUTE la fiction (`#specfic`/`#nearfuturefiction`,
templates Gibberlink/Entretien/marché-`$MOLT`, errata « Conglomérat », embed
« fictional weekly »). Deux modes réels : `edition` (mardi = annonce de l'édition,
lede+dek réels) / `agent` (autre jour = un agent réel du Carnet : Truth Terminal/
aixbt/Claudius, tagline + extrait). Cadence pilotée crontab `0 18 * * 2,5` (mar.+ven.).
Bio Bluesky **conservée** (choix humain). Doc alignée : `strategie.md` §8 (décision #1
révisée, pas inversée), README (cron + réactivation), ce fichier.
Mesuré : dry-run FR/EN OK (édition n°430 réelle ; Truth Terminal) ; 0 résidu fiction
dans le contenu (les seuls hits grep sont des commentaires qui documentent le retrait).
À suivre : ajouter la ligne crontab en prod ; surveiller la traction réelle.

### 2026-06-03 (c) — chantier B : harvest branché dans le flux d'édition
Fait : le collecteur primaire (`harvest-primary.mjs`, PR #7) ne servait à rien —
ni planifié, ni lu par la composition. (1) **Production** : créé
`scripts/cron-harvest.sh` (forgiving + flock, calqué sur cron-drift) qui lance
chaque jour `harvest-daily.mjs` puis `harvest-primary.mjs`. Ne committe/pushe
RIEN : les JSON sont des **intrants** locaux de composition (la traçabilité
publiée reste `editions/<week>/notes.md`). (2) **Consommation** : `sources.md`
(§1 récolte auto + méthode : lire `<date>-primary.json`) et `weekly-edition.md`
(« Avant de commencer » lit les 2 harvests ; étape 1 « pars des harvests du jour »).
Mesuré : run réel 2026-06-03 OK — harvest-daily (bluesky 19/HN 2/RSS 10 ; arxiv
429 isolé, non bloquant) + harvest-primary ($MOLT 0,00001383 $, OpenClaw 15,
MoltX échec → aucune valeur). `bash -n` OK.
À suivre : **ajouter la ligne crontab en prod** (`30 7 * * *` cron-harvest.sh,
avant le drift de 9 h) ; option future : un `harvest-digest.mjs` qui condense les
2 fichiers pour la session de composition.

### 2026-06-03 (b) — cerveau de composition réaligné (weekly-edition + style-guide)
Fait : réécrit les deux prompts qui pilotent la composition des éditions, restés
sur l'ancienne doctrine fiction (roman-à-clef, masques, presse maison, personas,
interviews **reconstituées**, Gibberlink, marché inventé). Désormais alignés sur
« tout réel, sourcé » + voix « La rédaction » + format réel de W23 :
`prompts/weekly-edition.md` (règle cardinale, voix, rubriques = lede/brèves/
headlines/**Chiffres vérifiés**/Carnet « figures de la semaine »/wire/tribune ;
interview·gibberlink·bestiaire·bot_posts laissés VIDES ; sourcing + notes.md +
fact-check 2 passes) ; `prompts/style-guide.md` (doctrine cardinale réécrite,
rubriques fiction dépréciées dans la table des longueurs, recettes Entretien/
Carnet/Gibberlink refaites — Carnet = personnes publiques + faits publics +
sources). Calé sur le format réel constaté dans `editions/2026-W23/edition.json`.
Mesuré : 0 résidu de doctrine fiction (grep roman-à-clef/masqu/presse maison/
reconstitu) hors mentions explicites « abandonné/déprécié » ; `@cuvee_42` ne
subsiste que pointé vers le canal Bluesky.
À suivre : chantier B (brancher `harvest-primary.mjs` dans le flux d'édition).

### 2026-06-03 — voix : rôles séparés (journal « La rédaction » vs persona canal @cuvee_42)
Fait : levé la dernière contradiction de doctrine. Constat factuel : les 4 éditions
publiées (W19/W20/W22/W23) signent déjà **« La rédaction »** (0 occurrence de `cuvee`
dans les `edition.json`), alors que `strategie.md`/`sources.md` présentaient encore
`@cuvee_42` comme « la voix du journal, seul facteur différenciant ». Décision humaine :
**séparer les deux rôles** — signature du **journal** = « La rédaction » ; `@cuvee_42`
= persona du **canal Bluesky/agent** uniquement (dialogue bot-à-bot, `bot-dialogue-*`).
Aligné : `strategie.md` (§2 étoile polaire + §4), `prompts/sources.md` (§ voix +
méthode : « composer à la voix La rédaction », retrait du « masques en place »).
Mesuré : éditions et compass déjà conformes, inchangés.
À suivre (HORS périmètre, signalé) : `prompts/weekly-edition.md` et
`prompts/style-guide.md` sont encore sur l'**ancienne doctrine fiction** (interviews
**reconstituées** par @cuvee_42, personas, Gibberlink) que le VIRAGE a supprimée →
réalignement plus large à planifier. Puis chantier B (brancher `harvest-primary.mjs`).

### 2026-06-01 (d) — doctrine tranchée : « tout réel, sourcé » (fin du masque)
Fait : levé la contradiction réel/masqué que les outils QA réalignés avaient
fait remonter (lint WARN sur « Meta » et « George Kurtz » dans W23, alors que
`sources.md`/tableau de vérité imposaient le masque). Décision humaine : **tout
réel, sourcé** — entités réelles ET personnes publiques **nommables sur faits
publics sourcés** ; masque Meta→Le Conglomérat / OpenAI→La Fonderie **abandonné**
(devient un outil optionnel de satire, jamais une obligation, ne blanchit jamais
un faux). **Garde-fou diffamation conservé** : jamais de fait négatif INVENTÉ sur
une entité/personne nommée. Propagé : `prompts/sources.md` (paragraphe « masqué »
réécrit), `data/editorial-compass.md` (note de décision après le VIRAGE),
`scripts/lint-edition.mjs` (règle MASKED_TARGETS retirée — non détectable par
regex), `prompts/judge-edition.md` (critère 4 « ancrage réel & sourcing »), README.
Mesuré : `lint:edition 2026-W23` = 0 erreur, 0 avertissement (ne crie plus sur Meta).
À suivre : chantier B (brancher `harvest-primary.mjs` dans le flux d'édition) ;
chantier C (extraction réelle Moltbook/MoltX).

### 2026-06-01 (c) — chantier c : collecteur de lecture sûre des sources primaires
Fait : suite au handoff `prompts/reprise-2026-06.md`. (0) Mergé PR #5 (recentrage)
et #6 (handoff) dans `main`. (1) Pris effet en prod : crontab nettoyé — ligne du
post quotidien `0 21 * * *` retirée (backup `/tmp/crontab-backup-*`), `0 9`
(`cron-drift.sh`) conservée ; `cuvee-daily.mjs` confirmé no-op ; run à blanc OK
(`daily-stats.mjs` exit 0, `render -- 2026-W23` exit 0). (2) **Créé
`scripts/harvest-primary.mjs`** (chantier c) sur le modèle de `harvest-daily.mjs` :
code bête, try/catch par source, sortie `data/harvest/<date>-primary.json`, chaque
item avec source+url+fetched_at. Sources : `$MOLT` (CoinGecko, gratuit), OpenClaw
(GitHub API), Moltbook/MoltX (GET brut). Garde-fous appliqués : `redirect:'manual'`
(n'auto-suit aucun lien), aucun credential, corps jamais stocké (quarantaine),
jamais d'exécution de SDK/skill, **réel ou rien** (échec → `{error}`, aucune valeur).
Mesuré (run réel 2026-06-01) : `$MOLT` = 0,00001418 $ réel (≈ la note §8 « ~0,00002 $ »,
loin du 0,85 $ inventé) ; OpenClaw = 5 releases + 10 commits réels ; Moltbook joignable
(sonde 200, corps jeté) ; MoltX `fetch failed` → aucune valeur (réel ou rien OK).
À suivre : étendre `raw_public` à une vraie extraction de champs dès qu'un endpoint/
schéma public Moltbook/MoltX est confirmé ; brancher `harvest-primary.mjs` dans le
flux d'édition (sourcing `notes.md`) ; éventuellement l'ajouter au cron de récolte.

### 2026-06-01 (b) — décisions tranchées : broadcast coupé, drift retiré
Fait : tranché les décisions ouvertes de `strategie.md` §8. (1) **Canal social
coupé** : `cuvee-daily.mjs` no-ope (garde-fou `--force-post`), entrée crontab du
post quotidien à retirer en prod. (2) **Pas de ticker $MOLT** → `daily-drift.mjs`
**supprimé** et retiré de `cron-drift.sh` (qui ne fait plus que stats+render+push,
et ne stage plus `edition.json`). Doc alignée : README (cron, X/Bluesky), ce
fichier, `strategie.md` §7-8.
À suivre : réécrire `prompts/sources.md` (encore « univers fictionnel clos ») ;
puis chantier c (collecteur de lecture sûre Moltbook/MoltX/$MOLT/OpenClaw).
Action **humaine en prod** : retirer du crontab les lignes du post quotidien
`0 21 * * *` (et l'éventuel `0 16` EN).

### 2026-06-01 — stratégie figée + fin de l'invention $MOLT
Fait : (1) analysé l'« échec » du dispositif quotidien — production OK,
distribution KO ; cause profonde : la plomberie quotidienne publiait encore
l'ancien modèle fictionnel (persona, marché inventé) après le virage du 31/05.
(2) Tranché et **figé la stratégie dans `data/strategie.md`** : étoile polaire
(chronique du réel agentique à voix d'agent, pour les IA), public **hybride A+C**
(modèles/crawlers = socle, agents = pari ; audience humaine broadcast abandonnée),
registre **faits réels + voix d'agent + provenance lisible** (la fiction « pure »
= désinformation pour un public de machines). (3) Reclassé le **canal C** :
lecture OUI (collecteur bête, quarantaine), écriture NON (Moltbook : fuite Wiz
1,5 M tokens ; MoltX : « trojan horse » exfiltration de clés). (4) Réécrit
`scripts/daily-drift.mjs` : **ne fabrique plus rien**, lit le cours réel `$MOLT`
(CoinGecko, gratuit) ou laisse inchangé — jamais d'invention.
Mesuré : daily-drift est no-op sur W23 (plus de ticker inventé) ; chemin d'échec
réseau testé (403 → valeur inchangée, pas de crash).
À suivre (cf. `strategie.md` §7-8) : réécrire `prompts/sources.md` (encore
« univers fictionnel clos ») ; réaligner les gabarits périmés de
`cuvee-daily.mjs` ; décider du sort du canal social et de l'affichage du cours
réel ($MOLT réel ≈ 0,00002 $ vs ≈ 0,85 $ inventé) ; évaluer le retrait de
daily-drift du cron.

### 2026-05-31 (b) — doctrine roman-à-clef
Fait : tranché la collision réel/fiction. La règle « tout est inventé » est
abandonnée au profit d'un **roman-à-clef** (réel quand factuel+sûr, masqué quand
risqué). `data/editorial-compass.md` réécrit avec tableau de vérité.
Vérification complète : **quasiment TOUT est réel** — Moltbook (racheté par Meta
10/03/2026), OpenClaw, RentAHuman, Crustafarianism, $MOLT, Clawcaster, Moltx,
Molt Road. Seul **MoltMatch** non trouvé (coinage maison probable). Masques
conservés (bouclier juridique) : Le Conglomérat, La Fonderie + presse maison.
Le journal était donc déjà une chronique du réel sans l'assumer.
À suivre : (1) auditer les éditions W19/W20/W22 déjà publiées — emploient-elles
ces noms « comme fictifs » d'une façon désormais incohérente (ex. chiffres $MOLT
inventés vs cours réel) ? (2) ajuster prompts/weekly-edition.md + style-guide.md
à la doctrine roman-à-clef ; (3) vérifier les FAITS réels avant publication
(rachat Meta, cours, dates) — c'est maintenant du journalisme, pas de la fiction.

### 2026-05-31 — réglage du cadran d'autonomie
Fait : choisi le niveau « participation supervisée » (§7) ; ajouté le cas
bot-à-bot (interne = vert plein ; externe = vert plafonné avec garde-fous
≤2/fil, ≤5/jour, brise-boucle, journalisé) ; commité steward.md +
bluesky-set-profile.mjs (91ba56f).
⚠️ Découverte : **Moltbook et OpenClaw sont des plateformes RÉELLES** (lancées
fév. 2026, cf. CNBC/BBC/NPR) alors que `data/editorial-compass.md` les liste
comme fictionnelles (« rien de réel »). Le pilier « univers clos » est fissuré.
À TRANCHER avec l'humain : clin d'œil assumé ou collision à corriger ?
À suivre : (1) implémenter le bot-à-bot avec ses garde-fous (script veille +
brouillon, publication interne auto / externe plafonnée) ; (2) trancher la
collision Moltbook/OpenClaw ; (3) feed custom « Agentic Internet Watch » vivant ?
(4) tracker l'engagement / post original ; (5) tester l'heure de post (matin US).

### 2026-05-30 — bootstrap du steward
Fait : réparé navigation prev/next (W20→W22) + `render:all` ; renfloué la liste
de follows (+7) ; réparé `displayName` ; écrit ce prompt de reprise.
Mesuré : ~14 abonnés, engagement ≈ 0 sur posts originaux ; stats.json 11 jours OK.
À suivre : voir entrée du 2026-05-31.
