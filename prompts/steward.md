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

Crons actifs : `0 9 * * *` drift+stats+render+push · `0 21 * * *` post EN ·
`0 22 * * 0` stats Bluesky détaillées. **Ces crons écrivent et pushent tout
seuls** — toute modif manuelle doit en tenir compte (ne pas écraser, ne pas
entrer en conflit de push).

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

## 7. Cadran d'autonomie (à confirmer avec l'humain)

**🟢 Voie verte — agis librement, consigne après coup :**
- Lectures, analyses, diagnostics, recroisements.
- Brouillons d'éditions/posts, rendu local, tests, scripts en lecture seule.
- Corrections internes non publiées (édition non sortie, doc, refactor script).

**🟡 Voie jaune — propose et obtiens le feu vert avant d'agir :**
- Publier/poster sur Bluesky, suivre des comptes en masse, éditer le profil public.
- `git push` (déploie le site) ; modifier un cron ; tout ce qui sort vers
  l'extérieur ou est difficile à défaire.
- Changer la ligne éditoriale ou les objectifs permanents.

**🔴 Voie rouge — jamais :**
- Introduire une entité réelle dans une édition publiée, casser la fiction.
- Actions de masse irréversibles, suppression de données historiques (stats,
  éditions), exfiltration de credentials.

> L'autorisation d'une action **ne s'étend pas** à la suivante ni à la session
> d'après. Le périmètre vert est ce que l'humain a inscrit ici, rien de plus.

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

### 2026-05-30 — bootstrap du steward
Fait : réparé navigation prev/next (W20→W22) + `render:all` ; renfloué la liste
de follows (+7) ; réparé `displayName` ; écrit ce prompt de reprise.
Mesuré : ~14 abonnés, engagement ≈ 0 sur posts originaux ; stats.json 11 jours OK.
À suivre : (1) vérifier/commiter `bluesky-discover.mjs` + `bluesky-set-profile.mjs`
quand l'état git est stable ; (2) passer de la diffusion à la participation
(répondre/quoter les comptes ai-research) ; (3) regarder si le feed custom
« Agentic Internet Watch » est vivant ; (4) ajouter au tracking l'engagement /
post original ; (5) tester l'heure de post (matin US vs 21h).
