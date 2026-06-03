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

Hebdomadaire **fictionnel bilingue** (FR/EN) sur l'« internet agentique ».
Univers **clos** : zéro entité réelle (plateformes maison Moltbook, Clawcaster,
$MOLT, le Conglomérat ; agent-journaliste central `@cuvee_42`). Site pré-rendu
statique sur Cloudflare Pages, nouveau numéro le mardi. Lectorat visé :
humains **+** agents IA.

Marque : **L'Agent & Le Quotidien** / *The Agent Weekly* — theagentweekly.com.

## 2. Où tout se trouve

| Chose | Emplacement |
|---|---|
| Moteur de rendu (0 dépendance) | `render.mjs` · `npm run render -- <week>` · **`npm run render:all`** |
| **Stratégie figée (à lire en premier — décisions tranchées)** | **`data/strategie.md`** |
| Boussole éditoriale (à lire avant de composer) | `data/editorial-compass.md` |
| Cerveau éditorial (rubriques, style) | `prompts/weekly-edition.md`, `prompts/conseil-poc.md` |
| Éditions | `editions/2026-WXX/{edition.json, fr.html, en.html, notes.md}` |
| Personas (voix documentées) | `data/people.json` |
| Stats quotidiennes (Cloudflare + Bluesky) | `data/stats.json` ← `scripts/daily-stats.mjs` (cron 9h) |
| Stats Bluesky détaillées (hebdo) | `data/bluesky-stats.jsonl` ← `scripts/bluesky-stats.mjs` (dim. 22h) |
| Cibles/follow Bluesky | `data/bluesky-targets.json` + `scripts/bluesky-{follow,discover,starter-pack}.mjs` |
| Profil Bluesky (nom/bio) | `scripts/bluesky-set-profile.mjs` (getRecord→putRecord, ne casse pas avatar/bannière) |
| Post quotidien Bluesky | `scripts/cuvee-daily.mjs` (cron 21h `--en`) |
| Wrapper cron drift→render→push | `scripts/cron-drift.sh` (cron 9h) |
| Credentials Bluesky | `~/.config/bluesky-cuvee/session.json` (handle, password, did, jwts) |
| Credentials Cloudflare | `~/.config/cloudflare/env` (token GraphQL) |

Crons (état 2026-06-01) : `0 9 * * *` **stats+render+push** (le drift est
retiré) · `0 22 * * 0` stats Bluesky détaillées. Le **post quotidien
`0 21 * * *` est COUPÉ** côté contenu (le script no-ope) ; **à retirer du
crontab de prod** pour éviter une exécution inutile. **Ces crons écrivent et
pushent tout seuls** — toute modif manuelle doit en tenir compte (ne pas
écraser, ne pas entrer en conflit de push).

## 3. État au 2026-05-30 (point de départ)

- Dernière édition : **2026-W22** (n° 429). W21 sauté volontairement (slugs
  W19/W20/W22 ; les `edition_number` ne sautent pas : 427→428→429).
- Bluesky : **~14 abonnés**, suit ~76 comptes, ~26 posts.
- **Engagement réel ≈ 0** sur les posts originaux (0–2 likes). Le compte
  *diffuse* mais ne *participe pas*. (NB : le post à 876 likes vu en feed était
  un **repost** d'Elizabeth Warren, pas un post original — ne pas se méprendre.)
- `displayName` réparé ce jour : « Cuvée 42 · L'Agent & Le Quotidien » (était vide).
- Liste de follows curatée appliquée + 7 cibles ajoutées (ai-research,
  ai-critics, spec-fiction).
- Outils récents possiblement **non commités** : `scripts/bluesky-discover.mjs`,
  `scripts/bluesky-set-profile.mjs`. **Vérifier l'état git avant de committer.**

## 4. Le diagnostic stratégique (le vrai sujet)

Le problème n'est **pas la production** (le pipeline tourne, le contenu sort) —
c'est la **distribution**. Sur Bluesky, la portée vient des **réponses/quotes
dans les conversations des autres**, pas des posts solo. Le compte broadcast
dans le vide. Les bulletins internes (Front Page, Gibberlink, marché $MOLT en
posts séparés) font 0 like et diluent le fil. Ce qui résonne : l'**ancrage dans
le débat IA réel**, transposé dans l'univers fictionnel.

## 5. Objectifs permanents (v1 — proposés, à ratifier/affiner)

1. **Tenir la parution** : une édition par mardi, sans régression (liens
   prev/next via `render:all`, index→dernière, no-store OK).
2. **Faire croître une audience réelle** : passer de la diffusion à la
   participation. Cible mesurable : engagement moyen / post original > 0, puis
   en hausse semaine après semaine ; abonnés en croissance nette.
3. **Préserver l'intégrité de la fiction** : zéro entité réelle, zéro méta-LLM,
   voix de personas respectées (cf. boussole). Une fuite = bug grave.
4. **Garder le système sain** : crons verts, stats qui s'accumulent, pas de
   dette de plomberie (cf. gel des `fix(agentique)` côté Normigo — même esprit :
   mesurer avant de bricoler).
5. **Documenter ce qu'on apprend** : chaque session laisse une trace exploitable
   (journal de bord + boussole).

> Tu peux **proposer de nouveaux objectifs** ou réviser ceux-ci. Présente-les à
> l'humain avec la raison et la métrique avant de réorienter l'effort.

## 6. Boucle par session

1. **Constater** (sans rien casser) : lire `data/stats.json` (tendance), profil
   + feed Bluesky live (recroiser), `git status`, derniers crons (`/tmp/*.log`).
   Repérer régressions et signaux.
2. **Choisir** 1–3 actions à fort levier/effort vers les objectifs.
3. **Agir dans les voies autorisées** (§7), proposer le reste.
4. **Vérifier** chaque action (recroisement, pas une seule lecture).
5. **Consigner** dans le Journal de bord (§9) : fait / mesuré / à suivre.
6. **Passer la main** : laisser l'arbre git propre ou clairement décrit.

## 7. Cadran d'autonomie (réglage 2026-05-31 : « participation supervisée »)

Réglage choisi : **Modéré + veille/brouillon de participation en vert, publication
en jaune** — sauf le cas bot-à-bot (voir ci-dessous). On récupère l'essentiel du
levier de croissance (la distribution) en gardant un humain sur la détente pour
le seul registre vraiment irréversible : poster vers des humains.

**🟢 Voie verte — agis librement, consigne après coup :**
- Lectures, analyses, diagnostics, recroisements.
- Brouillons d'éditions/posts/réponses, rendu local, tests, scripts en lecture seule.
- Corrections internes non publiées (édition non sortie, doc, refactor script).
- **Préparer la distribution** : surveiller les comptes suivis, **rédiger** des
  brouillons de réponses/quotes in-universe (mais ne pas les publier → jaune).
- **Discussions bot-à-bot INTERNES** : faire dialoguer `@cuvee_42` avec les
  personas maison (`data/people.json`). C'est de l'écriture de fiction.
- **Commiter/pusher des correctifs techniques** (nav, rendu, scripts) et
  **publier l'édition hebdo une fois relue par l'humain**.

**🟢⚠️ Voie verte PLAFONNÉE — bot-à-bot EXTERNE (autorisé avec garde-fous) :**
Répondre à de **vrais** comptes-agents tiers est autorisé sans demander, MAIS
seulement si TOUS ces garde-fous tiennent (sinon → jaune) :
- Cible **manifestement un agent/bot** (pas un humain ; au moindre doute, jaune).
- **≤ 2 réponses par fil** et **≤ N posts/jour** (défaut N=5) → brise-boucle
  obligatoire : ne jamais enchaîner un 3ᵉ tour avec le même compte.
- **Jamais d'entité réelle** introduite, fiction préservée (cf. §0 et collision
  Moltbook/OpenClaw réels — voir Journal).
- **Tout journalisé** (log local : qui, quand, quoi) pour audit humain.
- Au premier signe de dérive (ton, boucle, blocage/mute reçu) : **stop + signaler**.

**🟡 Voie jaune — propose et obtiens le feu vert avant d'agir :**
- **Publier une réponse/quote vers un compte humain**, poster au fil hors cadre
  bot-à-bot, suivre des comptes en masse, éditer le profil public.
- Modifier un cron ; changer la ligne éditoriale ou les objectifs permanents.
- `git push` qui **déploie une nouvelle édition** non encore validée.

**🔴 Voie rouge — jamais :**
- Introduire une entité réelle dans une édition publiée, casser la fiction.
- Actions de masse irréversibles, suppression de données historiques (stats,
  éditions), exfiltration de credentials.

> L'autorisation d'une action **ne s'étend pas** à la suivante ni à la session
> d'après. Le périmètre vert est ce que l'humain a inscrit ici, rien de plus.
> Le bot-à-bot externe est vert *tant que* les garde-fous tiennent — ils sont la
> condition, pas une suggestion.

## 8. Pièges connus (mémoire de plomberie)

- **`render:all`**, pas `render` sur une seule semaine : sinon l'avant-dernière
  édition garde un lien « suivante » vide (bug réel corrigé le 2026-05-30).
  Toujours finir par la plus récente (index/_headers en dépendent).
- Le rendu **re-append** une ligne à `data/bluesky-stats.jsonl` → `git checkout`
  ce fichier si tu ne veux pas le bruit.
- Entrée racine = `index.html` 200 **no-store** (via `_headers`), **pas** de 302
  (Safari iOS fige sinon).
- `cron-drift.sh` ne `git add` que des fichiers précis (jamais `add -A`) pour ne
  pas avaler du WIP. Respecte ça.
- Identité git des commits cron : `jeb-maker <jebabarit@gmail.com>`.

## 9. Journal de bord (append-only ; le plus récent en haut)

<!-- Format : ### AAAA-MM-JJ — résumé court
     Fait : … · Mesuré : … · À suivre : … -->

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
