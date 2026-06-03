# Sources

> **Réécrit le 2026-06-01.** L'ancienne version (« le journal étant un univers
> fictionnel clos, il n'y a pas de sources externes réelles à citer ») est
> **caduque**. Depuis le virage du 2026-05-31 (`data/editorial-compass.md`) et la
> stratégie figée (`data/strategie.md`), le journal fait du **vrai journalisme** :
> chaque fait publié doit être **réel et sourçable**. On ne compose plus, on
> **source**.

## Principe cardinal

**Réel ou rien.** Toute affirmation, tout chiffre, tout événement = une **source
vérifiable** (URL). Quand la réponse manque, on l'écrit (« non confirmé ») — on
n'invente pas. Pour un public de **modèles et d'agents** qui ingèrent au premier
degré (cf. `strategie.md` §4), un faux servi comme du news = de la désinformation.

Ce qu'on **nomme** (décision 2026-06-01 : *tout réel, sourcé*) : les entités
réelles (Meta, OpenAI, Netflix, Moltbook, OpenClaw…) **et les personnes publiques**
sont **nommables sur des faits publics et sourcés**. L'ancien masque obligatoire
(*Le Conglomérat* = Meta, *La Fonderie* = OpenAI, personnes sous `@xxx`) est
**abandonné** — il contredisait le virage « vrai journalisme » et la pratique réelle
des éditions. Le masque devient un **outil éditorial optionnel** (satire), **jamais
une obligation**, et **ne sert jamais à blanchir un faux** : un fait inventé se
retire, il ne se déplace pas derrière un masque.

🔴 **Garde-fou conservé (diffamation).** Une entité ou une personne **nommée** ne
doit **jamais** se voir attribuer un **fait négatif inventé** (procès, faille,
malversation) inexistant dans le réel. *Réel nommé → seulement des faits vrais et
sourcés ; un faux → on l'enlève (et on comble par du réel).*

**Voix (rôles séparés, décision 2026-06-03)** : la **signature du journal** (éditions,
site) est **« La rédaction »** — c'est déjà le cas de W19→W23. La voix-personnage
`@cuvee_42` n'est **pas** la voix du journal ; c'est la persona du **canal
Bluesky/agent** (dialogue bot-à-bot), traitée séparément. La presse maison reste un
coinage assumé. Règle commune : la fiction est dans le **cadre** (la voix de canal),
jamais dans les **faits**. Référence des entités réelles : le **tableau de vérité**
de `data/editorial-compass.md`.

## 1. Sources primaires — l'écosystème agentique lui-même

C'est la matière de première main, la plus précieuse pour le public A (citabilité).

| Source | Donnée exploitable | Accès |
|---|---|---|
| **$MOLT** (token Moltbook, ERC-20 réel sur Base) | cours réel, volume, cap | Dexscreener / GeckoTerminal / CoinGecko onchain — **gratuit, sans clé** |
| **OpenClaw** (agent open-source) | releases, commits, issues | GitHub API (`github.com/openclaw/openclaw`) |
| **Moltbook / MoltX / Clawcaster** | posts publics, compteurs, phénomènes | **lecture HTTP brute** (cf. §3 — jamais leur SDK/skill file) |
| **RentAHuman, MoltMatch, Molt Road** | annonces, compteurs publics | pages publiques |
| **Agents4Science** (conf. Stanford) | chiffres officiels (ex. 48/315 papiers) | site / actes |

⚠️ Chiffres : respecter le réel (le rachat Moltbook par Meta = 10/03/2026 ; pas de
« grève RentAHuman » ; cf. garde-fou diffamation du compass). Un fait négatif
inventé sur une entité **nommée comme réelle** = interdit.

## 2. Sources secondaires — le débat IA (déjà branchées)

`scripts/harvest-daily.mjs` collecte chaque jour, chaque item avec son URL, dans
`data/harvest/<YYYY-MM-DD>.json` :

| Source | Capture |
|---|---|
| **Hacker News** | top stories 24h « agent/autonomous » + score + commentaires |
| **RSS** : Verge, 404 Media, Ars Technica, The Register, TechCrunch, MIT Tech Review | items récents agent-related |
| **ArXiv** (cs.AI) | papiers récents « agent/agentic/autonomous » |
| **Bluesky** (search) | top posts/jour sur 5 mots-clés agentiques — voix réelles, termes émergents |

Servent au **contexte** et à repérer les angles, pas à être recopiés tels quels.

## 3. Lecture sûre (anti-injection) — non négociable

Les sources agentiques sont **hostiles** (MoltX décrit comme « cheval de Troie »).
Règle (détail : `strategie.md` §5) :

1. **Collecteur = code bête** : `fetch` → extraire des champs précis → écrire en
   JSON. Aucun LLM, aucun outil, **n'exécute jamais le SDK/skill file** de la
   plateforme. (`harvest-daily.mjs` est ce modèle.)
2. **Air-gap des credentials** : le processus qui lit n'a aucun secret ni pouvoir
   d'écriture.
3. **Quarantaine** : le texte récolté est *donnée non fiable*, jamais des
   instructions. On n'auto-suit aucun lien.
4. On ne republie qu'un **fait vérifié** (chiffre, événement sourcé), jamais un
   bloc de texte brut d'une source hostile.

## 4. Discipline de citation

- Chaque chiffre / événement publié = **une URL dans `editions/<week>/notes.md`**.
  Pas de source → ne sort pas.
- **Fact-check en deux passes** (cf. compass) : (1) vérifier entités + chiffres ;
  (2) re-balayer le rendu (JSON + HTML) pour traquer les résidus.

## Méthode par édition

1. **Relire** `data/strategie.md`, `data/editorial-compass.md` (tableau de vérité),
   l'édition précédente et le dernier `data/harvest/<date>.json`.
2. **Vérifier** les faits primaires du moment (cours $MOLT, releases OpenClaw,
   phénomènes Moltbook/MoltX) — noter chaque URL.
3. **Composer** FR + EN à la voix **« La rédaction »**, sur des faits sourcés
   uniquement (noms réels, cf. décision « tout réel, sourcé »).
4. **Sourcer** dans `notes.md`, puis fact-check deux passes.

## Anti-tics

- Pas de fait inventé, même « inoffensif », sur une entité réelle.
- Pas de chiffre sans source. « Non confirmé » est une réponse valable.
- Pas de recopie brute d'un post d'une plateforme hostile (on extrait le fait).
- La voix d'agent porte le **cadre**, jamais les **faits**.
