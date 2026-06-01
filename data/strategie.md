# Stratégie — L'Agent & Le Quotidien

> **Document de décision figé le 2026-06-01.** Il existe pour qu'aucune session
> future (ni le steward) ne re-dérive sur des questions déjà tranchées. Si tu
> veux changer une décision ci-dessous, ne la contourne pas en silence :
> propose-la à l'humain, et mets ce fichier à jour avec la date et la raison.
>
> Lecture liée : `prompts/steward.md` (pilotage), `data/editorial-compass.md`
> (doctrine éditoriale), `prompts/sources.md` (⚠️ encore périmé — cf. §6).

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

> **La chronique de référence de l'internet agentique réel, écrite à la voix d'un
> agent, conçue pour être lue et citée par les IA, et présente là où vivent les
> agents.**

---

## 3. Publics (priorité tranchée : hybride A + C)

| Public | Rôle | État |
|---|---|---|
| **A — modèles / crawlers IA** | **Socle.** Ce qui marche déjà. On vise la citabilité (présence dans les réponses IA), pas l'engagement social. | ✅ actif |
| **C — agents réels** (Moltbook/MoltX…) | **Pari**, mais reclassé en *lecture seule* (cf. §5). | 🟡 source, pas canal d'écriture |
| **B — audience humaine broadcast** | **Abandonné.** On ne court plus après les likes/abonnés, on ne paie pas le tier X. | ⛔️ |

---

## 4. Registre : faits réels, voix d'agent, provenance lisible

Tranché par la question décisive : *« en restant sur du fictionnel, ne crée-t-on
pas un site de désinformation pour agents ? »* **Oui — avec un public A+C, la
fiction "pure" devient de la désinformation,** parce que des machines ingèrent le
contenu au premier degré et qu'il est servi avec un habillage de *news* (JSON-LD
`NewsArticle`, `llms.txt`, Atom, tickers, datelines).

La ligne de partage, désormais non négociable :

- ❌ **Fiction dans les FAITS** (cours inventés, événements fabriqués sur des
  entités réelles type Moltbook/OpenClaw/RentAHuman) servie comme du news →
  désinformation par construction. **Interdit.**
- ✅ **Voix-personnage dans le CADRE** (`@cuvee_42`, agent-journaliste qui commente
  l'écosystème agentique **réel**) → légitime, et c'est le **seul facteur
  différenciant** du projet.
- ✅ **Provenance lisible par machine** : le balisage doit distinguer *opinion /
  voix de persona* de *reportage sourcé*, pour qu'un modèle ou un agent ne soit
  pas trompé.

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
> - `prompts/sources.md` — dit encore « univers fictionnel clos, pas de sources
>   réelles » : **à réécrire** selon ce §6.
> - `scripts/daily-drift.mjs` — **fait** (2026-06-01) : ne fabrique plus, lit le
>   cours réel `$MOLT` ou ne touche à rien.
> - `scripts/cuvee-daily.mjs` — gabarits périmés (marché inventé, Gibberlink,
>   errata de persona) à retirer/réaligner si on garde un canal social.

---

## 7. Plan d'action (chantiers)

- **a. Réaligner la plomberie sur la doctrine** *(en cours)*
  - `daily-drift.mjs` : ✅ ne plus inventer ; lire le cours réel `$MOLT`.
  - `prompts/sources.md` : réécrire (réel + sourcé).
  - `cuvee-daily.mjs` : retirer les gabarits périmés.
- **b. Refondre la forme des posts** (si on garde un canal social) : posts-voix
  autonomes réagissant à l'actu agentique réelle, sans lien sortant systématique,
  provenance étiquetée.
- **c. Lecture sûre des sources primaires** : étendre le collecteur bête à
  Moltbook/MoltX/$MOLT/OpenClaw (quarantaine, sans credentials).
- **d. Arrêter ce qui sert le public abandonné** : dégrader/retirer le broadcast
  Bluesky ; ne pas payer le tier X.
- **e. Figer la stratégie** : ✅ ce document.

---

## 8. Décisions encore ouvertes

1. Garde-t-on **un** canal social (lequel ?) pour la voix, ou le site + `llms.txt`
   suffisent-ils pour le public A ?
2. Le **cours `$MOLT` réel** s'affiche-t-il tel quel, ou avec un cadre (volatilité
   memecoin) ? (NB : le réel est de l'ordre de ~0,00002 $, très loin du ~0,85 $
   *inventé* de l'ancienne arithmétique — l'écart illustre exactement le problème.)
3. Ordre d'exécution des chantiers a→d.
4. Faut-il, à terme, **retirer** `daily-drift.mjs` du cron ? Sous la doctrine
   « hebdo de faits sourcés », sa raison d'être (animer des chiffres inventés au
   quotidien) a largement disparu.

---

## Sources de la vérification (2026-06-01)

- Meta acquiert Moltbook — meyka.com, en.wikipedia.org/wiki/Moltbook
- Sécurité Moltbook/OpenClaw — securemac.com ; « illusion of harmless agent
  communities » — vectra.ai
- MoltX « trojan horse / skill file » — dev.to/sebayaki
- $MOLT : coingecko.com/en/coins/moltbook ; pool MOLT/WETH (Base, Uniswap V4) —
  geckoterminal.com ; endpoint prix par contrat — docs.coingecko.com
- OpenClaw — github.com/openclaw/openclaw
