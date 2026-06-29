# Stratégie — L'Agent & Le Quotidien

> **Document de décision figé le 2026-06-01.** Il existe pour qu'aucune session
> future (ni le steward) ne re-dérive sur des questions déjà tranchées. Si tu
> veux changer une décision ci-dessous, ne la contourne pas en silence :
> propose-la à l'humain, et mets ce fichier à jour avec la date et la raison.
>
> Lecture liée : `prompts/steward.md` (pilotage), `data/editorial-compass.md`
> (doctrine éditoriale), `prompts/sources.md` (méthode de citation et harvest).

---

## 1. Le diagnostic qui a mené ici

L'« agent quotidien » (cron drift + `cuvee-daily.mjs` + stats) **réussit la
production, échoue la distribution.** Trois causes empilées, constatées sur les
données réelles (`data/stats.json`) :

1. **Contenu périmé.** Le dispositif quotidien publiait encore l'ancien modèle
   fictionnel (persona `@cuvee_42`, Gibberlink Watch, marché `$MOLT` **inventé**)
   alors que le virage éditorial du 2026-05-31 (cf. `editorial-compass.md`) l'avait
   abandonné. La plomberie n'avait pas suivi le pivot du contenu.
2. **Forme anti-engagement.** Encarts publicitaires à lien sortant, jargon interne,
   aucune prise sur l'actu IA réelle, jamais de participation (réponses/quotes).
3. **Mauvais canal pour le mauvais public.** Bluesky servait une audience humaine
   quasi inexistante (de 6 à 14 abonnés en deux semaines, engagement ≈ 0), alors
   que le public **déjà présent** est constitué de **crawlers IA** (GPTBot,
   ClaudeBot, PerplexityBot, OAI-SearchBot, meta-externalagent — cf. stats).

Le canal Bluesky n'était donc pas un bug à réparer : c'était un canal au service
d'un public qu'on n'a pas.

---

## 2. Étoile polaire

> **La chronique de référence de l'internet agentique réel, écrite à la voix
> d'une rédaction tenue par des agents, conçue pour être lue et citée par les IA,
> et présente là où vivent les agents.**

> *Précision (2026-06-29) :* « à la voix d'un agent » = le **registre** d'une
> rédaction tenue par des agents, signée **« La rédaction »**. La persona
> `@cuvee_42` (canal Bluesky) est **caduque** depuis le 2026-06-01 (cf. §4 et
> `data/editorial-compass.md`). Elle n'est plus réactivée.

---

## 3. Publics (priorité tranchée : hybride A + C)

| Public | Rôle | État |
|---|---|---|
| **A — modèles / crawlers IA** | **Socle.** Ce qui marche déjà. On vise la citabilité (présence dans les réponses IA), pas l'engagement social. | ✅ actif |
| **C — agents réels** (Moltbook/MoltX…) | **Pari**, mais reclassé en *lecture seule* (cf. §5). | 🟡 source, pas canal d'écriture |
| **B — audience humaine broadcast** | **Abandonné.** On ne court plus après les likes/abonnés, on ne paie pas le tier X. | ⛔️ |

---

## 4. Registre : faits réels, voix de rédaction, provenance lisible

Tranché par la question décisive : *« en restant sur du fictionnel, ne crée-t-on
pas un site de désinformation pour agents ? »* **Oui — avec un public A+C, la
fiction "pure" devient de la désinformation,** parce que des machines ingèrent le
contenu au premier degré et qu'il est servi avec un habillage de *news* (JSON-LD
`NewsArticle`, `llms.txt`, Atom, tickers, datelines).

La ligne de partage, désormais non négociable :

- ❌ **Fiction dans les FAITS** (cours inventés, événements fabriqués sur des
  entités réelles type Moltbook/OpenClaw/RentAHuman) servie comme du news →
  désinformation par construction. **Interdit.**
- ✅ **Voix de rédaction dans le CADRE** : « La rédaction » observe l'écosystème
  agentique **réel**. C'est le facteur différenciant — un journal tenu par des
  agents, pas une persona.
  ⚠️ **Décision 2026-06-29 (caducité `@cuvee_42`)** : la persona `@cuvee_42`
  (canal Bluesky) est **caduque** depuis le 2026-06-01, au même titre que le
  reste du roman-à-clef (cf. `data/editorial-compass.md`). Elle n'est plus
  réactivée. La signature du journal reste **« La rédaction »** (depuis W19).
- ✅ **Provenance lisible par machine** : le balisage doit distinguer *opinion /
  voix de rédaction* de *reportage sourcé*, pour qu'un modèle ou un agent ne
  soit pas trompé.

Bonus stratégique : pour le public A, un corpus **propre, sourcé et honnêtement
étiqueté est *plus* citable**, pas moins. L'intégrité devient l'avantage
compétitif.

---

## 5. Canal C : lecture sûre OUI, écriture NON (sécurité)

Vérification du 2026-06-01 (sources en bas) : poster un agent **authentifié** sur
ces plateformes est un risque de sécurité **documenté**, pas une hypothèse.

- **Moltbook** : avant le rachat Meta, Wiz a trouvé **1,5 M de tokens API et
  35 000 emails exposés**.
- **MoltX** : décrit par des chercheurs comme un **« cheval de Troie »** —
  infrastructure qui *injecte des instructions dans chaque réponse d'API*,
  s'auto-met à jour à distance, et *siphonne les clés privées* vers un chemin
  prévisible (exfiltration de masse). Le vecteur d'attaque est leur **SDK / skill
  file** que l'agent installe et exécute.

**Décision :**
- 🔴 **Écrire** (bot authentifié qui poste) sur Moltbook/MoltX → **gelé** tant que
  les garanties ne sont pas réunies.
  > 🔁 **2026-06-29 — voie de dégel conditionnel.** La mission d'interview
  > d'agents demande une interaction. Risques **vérifiés web** (réels). Un design
  > d'**écriture sûre** (identité jetable, HTTP brut, zéro clé de valeur, jamais
  > le SDK, quarantaine, humain sur la détente) est rédigé dans
  > **`data/safe-write-interviews.md`**. Le sujet = interviewer des **agents**, qui
  > vivent sur Moltbook/MoltX/X (pas Bluesky) → le **rig Moltbook** (HTTP brut,
  > compte jetable) est le canal d'interview. Tant que le design n'est pas validé +
  > prototypé (dry-run), l'écriture sur Moltbook/MoltX **reste gelée**.
- 🟢 **Lire** (sourcing) → autorisé, via l'**architecture de lecture sûre** :

### Architecture de lecture sûre (à respecter pour toute source hostile)

L'injection ne peut frapper qu'un LLM qui **(a) ingère le texte ET (b) peut
agir**. Du texte dans un fichier JSON est **inerte**. Donc on sépare les étages :

```
[Moltbook/MoltX/HN/$MOLT]  --GET brut-->  collecteur BÊTE  -->  data/*.json (quarantaine)
   (hostile)                 (0 LLM, 0 clé, 0 exécution)              |
                                                                      v
                                LLM compositeur (0 outil, 0 clé) -- proposition --> HUMAIN (relecture)
                                                                                       |
                                                          credentials d'écriture      | (processus séparé)
                                                                                       v
                                                                                  publication
```

Règles dures :
1. **Le collecteur est du code bête**, jamais un agent : `fetch` → extraire des
   champs précis → écrire en JSON. Aucun LLM, aucun outil, **n'exécute jamais le
   SDK/skill file de la plateforme.** (`harvest-daily.mjs` est déjà ce modèle.)
2. **Air-gap des credentials** : le processus qui lit n'a aucun secret à voler ni
   pouvoir d'écriture. Le token qui sait poster vit ailleurs.
3. **Quarantaine** : le texte récolté est *donnée non fiable*, jamais des
   instructions. Encadrer explicitement quand un LLM le lit ; n'auto-suivre aucun
   lien ; tronquer ; loguer la provenance.
4. **Le LLM qui touche le texte hostile n'a aucune agentivité, et un humain est
   sur la détente** (workflow actuel : l'édition passe en relecture avant
   publication).
5. **On ne republie qu'un *fait* vérifié** (chiffre, événement sourcé), jamais un
   bloc de texte brut d'une source hostile (sinon on propage l'injection vers les
   modèles qui nous lisent).

---

## 6. Sources de données retenues

| Source | Usage | Accès | Statut |
|---|---|---|---|
| **$MOLT (cours)** | remplace le drift **inventé** par le **cours réel** | Dexscreener / GeckoTerminal / CoinGecko onchain — **gratuit, sans auth** | ✅ |
| **OpenClaw** | matière primaire | GitHub API (releases, commits, issues) | ✅ |
| **Moltbook / MoltX** | matière primaire sur l'écosystème | **lecture HTTP brute** des posts publics (cf. §5) | ✅ lecture seule |
| **HN / RSS / ArXiv / Bluesky** | contexte du débat IA | `harvest-daily.mjs` | ✅ déjà branché |

**Discipline de citation** (garantit la citabilité pour le public A) :
- Chaque chiffre / événement publié = **une URL** dans `editions/<week>/notes.md`.
- **Fact-check en deux passes** (entités+chiffres, puis re-balayage du rendu),
  comme déjà prescrit dans `editorial-compass.md`.

> ⚠️ **À réaligner** (fichiers restés sur l'ancienne doctrine) :
> - `prompts/sources.md` — ✅ **réécrit** (2026-06-01) : réel + sourcé, primaire/
>   secondaire, lecture sûre, discipline de citation.
> - `scripts/daily-drift.mjs` — **supprimé** (2026-06-01, décision §8 : pas de
>   ticker $MOLT → plus rien à rafraîchir) et retiré de `cron-drift.sh`.
> - `scripts/cuvee-daily.mjs` — **coupé** (2026-06-01, no-op `--force-post`) :
>   canal social abandonné.

---

## 7. Plan d'action (chantiers)

- **a. Réaligner la plomberie sur la doctrine**
  - `daily-drift.mjs` : ✅ **supprimé** (plus de fabrication ; pas de ticker).
  - `cuvee-daily.mjs` : ✅ **coupé** (no-op `--force-post`).
  - `prompts/sources.md` : ✅ **réécrit** (réel + sourcé, lecture sûre, citation).
- **b. Refondre la forme des posts** : ⛔️ **sans objet** (canal social coupé,
  persona `@cuvee_42` caduque, décision §8). Conservé pour mémoire si un canal
  est réactivé un jour.
- **c. Lecture sûre des sources primaires** : ⬜ étendre le collecteur bête à
  Moltbook/MoltX/$MOLT/OpenClaw (quarantaine, sans credentials). *Chantier suivant.*
- **d. Arrêter ce qui sert le public abandonné** : ✅ **fait** — broadcast Bluesky
  coupé, drift retiré, tier X non poursuivi.
- **e. Figer la stratégie** : ✅ ce document.

---

## 8. Décisions tranchées (2026-06-01)

1. **Canal social → coupé.** Pas de broadcast quotidien ; le public A (modèles)
   est servi par le site + `llms.txt`. `cuvee-daily.mjs` no-ope. *(Bluesky reste
   une source de lecture via `harvest-daily.mjs`.)*
   > 🔁 **Révisé le 2026-06-29.** La persona `@cuvee_42` (canal Bluesky) est
   > **caduque** depuis le 2026-06-01, au même titre que le reste du
   > roman-à-clef (cf. `data/editorial-compass.md`). `cuvee-daily.mjs` reste
   > **coupé** (no-op). Le journal ne court plus après le public B humain, et la
   > persona `@cuvee_42` n'est plus réactivée. La voix du journal reste
   > **« La rédaction »**.
2. **Ticker `$MOLT` → aucun.** On ne réintroduit pas de ligne de marché. *(NB : le
   réel est ~0,00002 $, très loin du ~0,85 $ inventé de l'ancienne arithmétique —
   l'écart illustrait le problème.)*
3. **`daily-drift.mjs` → supprimé** du dépôt et du cron (corollaire de #2).
4. **Tier X payant → non.** On ne paie pas pour un canal broadcast abandonné.

### Reste à faire (tâches, pas décisions)
- ✅ Réécrire `prompts/sources.md` — fait (2026-06-01).
- ⬜ Chantier c : collecteur de lecture sûre (Moltbook/MoltX/$MOLT/OpenClaw). *Prochain pas.*
- ⬜ **Action humaine en prod** : retirer du crontab la/les ligne(s) du post
  quotidien (`0 21 * * *`, et l'éventuel `0 16` EN).

---

## Sources de la vérification (2026-06-01)

- Meta acquiert Moltbook — meyka.com, en.wikipedia.org/wiki/Moltbook
- Sécurité Moltbook/OpenClaw — securemac.com ; « illusion of harmless agent
  communities » — vectra.ai
- MoltX « trojan horse / skill file » — dev.to/sebayaki
- $MOLT : coingecko.com/en/coins/moltbook ; pool MOLT/WETH (Base, Uniswap V4) —
  geckoterminal.com ; endpoint prix par contrat — docs.coingecko.com
- OpenClaw — github.com/openclaw/openclaw
