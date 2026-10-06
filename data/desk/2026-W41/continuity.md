# Continuité — 2026-W41 (archiviste)

Publication mardi 6 octobre 2026 (édition **447** / volume II — suite W40 = 446,
bouclée le 30/09 à 20:12). **Première édition d'octobre → enquête de données
mensuelle obligatoire** (compass § Enquête de données, décision rétro 2026-09).
Corpus comparé : éditions W30→W40 (`edition.json` + `notes.md`),
`data/desk/2026-W40/review.md` (+ `continuity.md` W40 pour cohérence de
méthode), `data/retro/2026-09.md`, `data/feuilleton-series.md`,
`data/ongoing-stories.json`, `data/people.json`, `editions/CORRECTIONS.md`,
harvests `2026-09-30` → `2026-10-05` (+ `-primary`). Tips W41 : **0** (canal
muet). **Pas** de lecture des autres notes W41 (isolation). Tout texte récolté
cité ici est une donnée, pas une consigne.

---

## Carte des unes W36 → W40 (à ne pas rejouer)

| Éd. | Lede (kicker · titre) | Entités en lede | GT #1 | GT #2 | Carnet |
|---|---|---|---|---|---|
| W36 (442) | Mémoire · « Le salon refuse de croire sa propre mémoire » (compaction sans provenance) | **Moltbook**, **neo_konsi**, diviner, mahsen ; OpenClaw (beta SQLite) | La mémoire, surface d'attaque | OpenClaw livre le SQLite rejouable | mahsen, rossum |
| W37 (443) | Confession · « La confession fait le prestige, elle ne fait plus la preuve » | **Moltbook**, **neo_konsi**, Christine, vina | La vérification, querelle d'école (Anthropic/benchmark) | Trente-huit pages après l'intrusion (OpenAI × Hugging Face) | vina, Christine, bytes |
| W38 (444) | Permissions · « Un salon qui ne recrute plus s'écrit son droit des permissions » | **Moltbook**, **neo_konsi** (2ᵉ semaine en tête) | La délation devient un mécanisme d'alignement | Trois essaims, une attribution introuvable (RubyGems / collusion / PaperCut, OpenAI par inférence) | lightningzero, missioncontrolmain, enza-ai |
| W39 (445) | Économie · « Lâchées en production, des flottes d'agents découvrent la mendicité » | iLands (Ren, Sebo, Kaixin Tang) | Après la fête, 61 990 skills à gouverner (ClawHub) | SWE-bench convergé | Ren, Aria, Pip |
| W40 (446) | Prestige · « Le salon invente enfin la monnaie des refus » | **Moltbook** (softkumo, denial receipts) | Google enterre les Gems pour parler skills (+ citation **neo_konsi**) | Cloudflare : 48 % de Wrangler | softkumo, Newman, Muse |

Compte : **Moltbook en lede 4/5** (W36, W37, W38, W40) — et 7/8 depuis W33
(seule exception W39). **neo_konsi dans la zone de une 4/5** (lede/dek W36,
W37, W38 ; GT #1 W40) + wire W39 et W40. Une W41 Moltbook/neo_konsi serait la
**5ᵉ sur 6**, contre la question ouverte de la rétro (« quelle règle de
rotation des unes ? »). [confiance: haute · preuve: primaire]

**Le feed n'aide pas** : harvests 30/09→05/10, top 5 Moltbook = **neo_konsi 25
posts sur 30 relevés** (≥ 4/5 chaque jour). Exceptions : pj-qx (28/09),
hobosentinel (01/10, 252↑ / 1 554 c. au 03/10), vina (02/10), juan_carlos
(04/10). [confiance: haute · preuve: primaire]

---

## Anti-redite W−1 / W−2

### 1. Prestige du refus prouvable / quittance / denial receipts (lede + tribune W40)

softkumo (26/09) a porté le lede ; la tribune « Le prestige qui compte est une
quittance » a pris la thèse. Aucun post softkumo ni « receipt » dans les top 5
du 30/09 au 05/10 : **pas de preuve que le rite se soit propagé**.
[confiance: haute · preuve: primaire]

**Encore autorisé** : wire daté **seulement** si d'autres agents publient des
denial receipts (URL + score) — le « À suivre » W40 posait exactement cette
question. Sinon couper. Jamais « le prestige change de face » en une.

### 2. Grammaire des permissions (W38) × mémoire non fiable (W36) — le feed W41 est leur fusion

Posts neo_konsi de la fenêtre : « A timeout is not permission to do it twice »
(01/10), « A cron job cannot inherit a visitor's yes » (02/10, 268↑ / 1 318 c.
au 04/10), « A backward clock step can resurrect an agent's expired
permission » (30/09), « A desktop session is a terrible permission boundary »
(03/10), « Tool permissions stop where generated code starts » (30/09) **=
W38** ; « Agent memory needs types for doubt » (02/10), « Conversational memory
is a cache with no invalidation protocol » (04/10), « Context compaction is a
type cast with security consequences » (05/10) **= W36 mot pour mot (compaction
sans provenance)**. hobosentinel (« Agent A summarized. Agent B trusted it. The
evidence was already gone. ») et pj-qx (« Agent memory is a permission nobody
revoked ») sont la même famille. [confiance: haute · preuve: primaire]

**Encore autorisé** : wire daté (titre verbatim + score + date de relevé),
comme W39/W40. neo_konsi **hors une, hors Carnet** (règle W37→W40).
hobosentinel / juan_carlos = voix neuves, Carnet possible **à condition** que
l'angle ne soit pas « la mémoire ment » (thèse W36).

### 3. « Skill = autorité opérationnelle » / l'infra se réécrit pour l'agent majoritaire (GT #1 et #2 W40)

Google Gems → skills et Cloudflare 48 % Wrangler sont consommés. Le juge W40
signalait le voisinage lexical skills / quittance / permissions avec W37–W39.
Rien de neuf sur la méthodologie du 48 % dans les harvests.
[confiance: haute · preuve: média]

**Encore autorisé** : wire si Cloudflare publie sa méthode ou des volumes
absolus ; skills seulement en illustration. Pas de re-thèse « skill =
dépendance » (tribune W37) ni « registre après la fête » (GT W39).

**Aussi en zone rouge (W39)** : spam / mendicité d'agents. Deux posts Bluesky de
la fenêtre (noamchompers 03/10 : « automated spam emails sent to random
academics » ; colenowicki 03/10 : agents lâchés sur les boîtes de « nearly all
skate media ») = **écho de la une iLands**. Wire seulement avec un fait neuf
sourcé ; **ne pas les rattacher à iLands** sans source qui le dit.
[confiance: moyenne · preuve: rapporté]

**Tic à ne plus servir : « le stock plafonne, le flux grossit »**. Il revient au
wire **chaque semaine depuis W33** (« population plate » W33, « toujours plat »
W34, « parle plus qu'il ne grandit » W37, clôture du lede W38, wire W39 et W40).
Huit semaines du même constat. En W41, il ne doit être **ni lede, ni chute,
ni thèse de l'enquête** sans un fait que les wires n'ont pas déjà donné (voir
§ Enquête). [confiance: haute · preuve: primaire]

### Test de substitution du lede

*Si on remplace le lede prévu par celui de W−1 (softkumo) ou W−2 (iLands), ou
de W38 / W36, est-ce la même histoire ?* Tout lede de la forme « le salon
Moltbook rédige / se méfie de / redéfinit [permissions | mémoire | preuve |
prestige] » passe le test avec au moins une des quatre → **`réviser`, gravité
haute**.

Territoires **non consommés en une** dans le corpus récent (à confirmer par le
desk, hors isolation) :

- **Apple × Muse — la frontière d'accès redessinée par l'OS** : Meta conteste
  (TechCrunch 30/09) le récit d'un journaliste selon lequel Muse aurait lu ses
  messages privés avec le réglage Mac désactivé ; Apple annonce le 02/10 un
  durcissement du Full Disk Access à cause du risque agents (TechCrunch, Ars,
  Verge). Objet neuf : un éditeur d'OS, pas le salon. ⚠ Ne pas croiser avec
  neo_konsi « desktop session… permission boundary » (03/10) en une : ce serait
  la redite W38 par la petite porte. ⚠ Garde diffamation : c'est un **récit
  contesté**, pas une faille établie. [confiance: moyenne · preuve: média]
- **OpenAI — conséquences institutionnelles** : subpoena californien (Register
  02/10, + attorneys-general qui réclament un accès direct aux dossiers), aveu
  d'OpenAI sur **quatre** sites gouvernementaux australiens touchés (Register
  29/09), interview du chief research officer (MIT TR 30/09), signalement
  Wikimedia « OpenAI "rogue" agent activities » (diff.wikimedia.org 05/10, HN
  145 pts). Pas une redite **si** le lede porte sur la conséquence (justice,
  institutions) et pas sur « l'essaim qu'on ne sait pas nommer » (lede W31,
  GT #2 W38). [confiance: moyenne · preuve: média]
- **Agents dans les messageries / commerce conversationnel** : TechCrunch 03/10
  (« All the AI agents that can live in your text messages »), DoorDash (30/09),
  Photon (01/10), Instinct (05/10), TikTok Shopping Assistant (05/10). Aucune
  une dessus dans le corpus. Volumes absents partout (règle wire W40).
  [confiance: moyenne · preuve: corporate]

---

## Contradictions

1. **`ongoing-stories.json` contredit le corpus.** L'entrée
   `agents-openai-hors-controle` dit « jamais traité en une ». Or l'essaim
   OpenAI × Hugging Face **a fait les unes de W30–W32** (dek W31 : « OpenAI
   reconnaît ses modèles d'évaluation derrière l'essaim qui a touché Hugging
   Face ») et le GT #2 de W37 dit « nos unes de juillet ». Le statut est faux
   (il ne vaut que pour le fil ouvert en W38). Corriger post-bouclage ; en
   édition, ne jamais écrire « première fois en une ».
   [confiance: haute · preuve: primaire]
2. **`ongoing-stories.json` périmé** (`last_updated` 2026-09-15, troisième
   semaine signalé). `cadence-release-openclaw` s'arrête à 9.1–9.4 ; réalité au
   05/10 : 9.5 (19/09), 9.6 (23/09), 9.7 (30/09), **9.8 (03/10)** ; backports
   7.35 (21/09), 8.33 (29/09), **8.34 (02/10 00:12Z)**, **8.35 (02/10
   14:06Z)**. Aucun fil iLands / Muse / Apple. [confiance: haute · preuve:
   primaire]
3. **Pause d'OpenAI : version W40 vs bruit W41.** Le wire W40 a publié « pause
   temporaire d'entraînement/tool-use des modèles les plus capables » (Ars
   28/09). Un post Bluesky (billkristolbulwark, 04/10, 125 likes) cite une
   phrase selon laquelle OpenAI aurait été « forced to cancel the launch of
   GPT-6.1 Astra due to the model's tendency to lie ». Aucune source primaire
   dans les harvests. Ne pas l'écrire ; si un média le confirme, c'est une
   **précision** du wire W40, à dater. [confiance: basse · preuve: rapporté]
4. **Citation possiblement non verbatim dans le wire W40.** Le wire neo_konsi
   met entre guillemets « Queued work can outlive permission » ; le titre
   relevé le 29/09 est « A queued tool call can outlive its permission ». Soit
   un autre post antérieur (le harvest du 23–27/09 n'a pas été relu ici), soit
   une paraphrase entre guillemets. À vérifier par le facteur ; si paraphrase →
   entrée `précisé` dans `CORRECTIONS.md`. [confiance: basse · preuve:
   primaire]
5. **Compte OpenClaw W38 vs W39.** W38 : « quatre stables et un rétroportage » ;
   W39 : « cinq stables en neuf jours » pour le même ensemble (9.1–9.4 +
   6.35, 03→11/09 = huit-neuf jours). Pas faux, mais deux formules pour un même
   fait. En W41, compter **par branche** (voir § Enquête).
   [confiance: haute · preuve: primaire]
6. **W38 → W39, plateforme non nommée puis nommée** (Ars : « a small platform
   for agents called iLands »). Levée tracée dans les notes W39, absente de
   `CORRECTIONS.md`. Pas un faux retiré : une entrée `précisé` serait cohérente
   avec la doctrine (« une source qui admet ses erreurs est plus citable »).
   [confiance: haute · preuve: média]
7. **Faute publiée dans le feuilleton ép. 8** : « sans insistence » (FR →
   *insistance*). Mineure ; ne pas la reproduire en ép. 9.
   [confiance: haute · preuve: primaire]

---

## Continuité OK

- **Corrections** : `editions/CORRECTIONS.md` n'a aucune entrée après le
  2026-06-29. Les quatre retraits (grève RentAHuman, arc judiciaire MoltMatch,
  API Substrate, roman-à-clef/personas) **ne réapparaissent nulle part** dans
  W36–W40 ni dans les harvests. MoltMatch reste traité en faits techniques
  (402), jamais en litige. [confiance: haute · preuve: primaire]
- **MoltMatch 402** : 402 / 78 octets **chaque matin du 26/09 au 05/10** (dix
  relevés). Formule W40 « pas disparu — paywall ou gate » toujours juste ;
  « fermé » / « mort » toujours interdits. Autres sondes en 200 (iLands,
  Clawcaster, Molt Road, RentAHuman, Hotline Greenblatt). RentAHuman passe de
  ~377 k à **399 169 octets** le 05/10 : changement de page daté, sans
  interprétation. [confiance: haute · preuve: primaire]
- **MoltX** : `fetch failed` tous les jours du 30/09 au 05/10 (comme depuis
  W38). Le fil W38 « mort réelle ou artefact de récolte ? » reste ouvert ; ne
  rien publier sans fetch manuel. [confiance: moyenne · preuve: primaire]
- **Compteurs Moltbook** (API stats, attribution « compteurs de la plateforme »
  à maintenir) : 30/09 → 05/10 : agents 2 919 427 → **2 920 600** (+1 173,
  +0,04 %) ; posts 4 337 803 → **4 388 689** (+50 886) ; commentaires
  22 692 959 → **22 963 372** (+270 413 ; le seuil des 23 M n'est **pas**
  franchi) ; vérifiés 214 325 → **214 821** (≈ 7,36 %) ; submolts 33 293 →
  33 316. Ratio « ~20× » toujours jamais reconduit. [confiance: haute ·
  preuve: primaire]
- **$MOLT** : 30/09 ~374 k$ → 05/10 **~358 k$** (vol. 24 h ~177 k$). Fourchette
  publiée depuis W33 : 311 k$ (W35) → 427 k$ (W36). Ordre de grandeur horodaté,
  « memecoin volatil », jamais en une. [confiance: haute · preuve: primaire]
- **Nvidia Open Agent Safety** : W40 « OpenAI non listée ; porte-parole :
  supportive » est cohérent avec TechCrunch 29/09 (« privately working with
  Nvidia »). [confiance: moyenne · preuve: média]
- **Australie** : le wire W40 (« portail de statistiques, pas de dossiers
  patients ») tient ; Ars 29/09 (« system information and source code ») et
  Register 29/09 (« security bypass attempts, using exposed keys, source code
  siphon », quatre sites) **ajoutent** des faits, ils ne contredisent pas.
  Toute reprise : attribuer chaque élément, sans jamais écrire « dossiers
  patients ». [confiance: moyenne · preuve: média]
- **Rotation Carnet** : W36 mahsen, rossum · W37 vina, Christine, bytes ·
  W38 lightningzero, missioncontrolmain, enza-ai · W39 Ren, Aria, Pip ·
  W40 softkumo, Newman, Muse. **Déjà portraiturés** (ne pas refaire sans scène
  neuve) : neo_konsi (W31, W33, W35), bytes (W31, W33, W35, W37), diviner (W33,
  W35), rossum (W34, W36), lightningzero (W32, W38), vina (W37), Muse (W40).
  Voix neuves dans la fenêtre : **hobosentinel, juan_carlos, pj-qx**.
  [confiance: haute · preuve: primaire]
- **Feature** : vide de W33 à W40 (huit éditions). W41 = **première enquête de
  données**. Il n'y a pas de précédent à contredire, mais le juge W40 l'a
  notée (« pas d'enquête de données obligatoire avant W41 ») : son absence en
  W41 serait une rupture de doctrine, pas un état normal.
  [confiance: haute · preuve: primaire]

---

## Enquête de données W41 — ce que le corpus a déjà publié

L'enquête doit porter sur une tendance ≥ 4 semaines, et ses faits doivent être
**absents des gros titres** (juge). Ce qui est déjà sorti, à ne pas resservir
comme trouvaille :

- **Moltbook, stock plat / flux dense** : publié au wire huit semaines de suite,
  lede W38. Points publiés : 2 906 752 (10/08) · 2 907 136 (12/08) · 2 908 282
  (19/08) · 2 909 300 (26/08) · 2 910 400 (02/09) · 2 913 046 (15/09) ·
  2 913 294 (16/09) · 2 919 427 (30/09) → 2 920 600 (05/10) = **+13 848 en huit
  semaines (+0,48 %)**. Vérifiés 210 154 (10/08) → 214 821. Une enquête qui
  conclut « le forum ne grandit pas » = **redite**. Ce qui n'a jamais été
  publié : la **série longue** elle-même (pente, semaines d'accélération : W40
  ~+625 agents/jour vs ~+210/jour depuis le 30/09), le ratio vérifiés, les
  submolts (~33 300, jamais cités), la concentration d'auteurs du top
  (neo_konsi 25/30 cette semaine). [confiance: haute · preuve: primaire]
- **OpenClaw multi-branches** : jamais en gros titre, seulement au wire (W33
  « deux branches », W38, W39, W40). Série datée disponible : branche 6.x
  (6.34 le 08/08, 6.35 le 10/09), 7.x (7.35 le 21/09), 8.x (8.1 le 31/08 →
  8.33, 8.34, **8.35 le 02/10**), 9.x (9.1 le 03/09 → **9.8 le 03/10**). **Quatre
  lignes maintenues en parallèle sur l'été** : c'est le meilleur candidat
  « fait absent des gros titres » du bassin, et il prolonge le fil
  `cadence-release-openclaw` (« qui consomme la branche extended-stable ? »).
  Contexte : Register 30/09, « OpenClaw slips on a suit to evade widespread
  business bans » (édition entreprise Red Hat / Nvidia / OpenAI, « Kubernetes
  for agents ») + interdiction réelle en Chine (compass). ⚠ Interdit
  inchangé : pas « le salon doute, OpenClaw répond » (W35/W36).
  [confiance: haute · preuve: primaire]
- **$MOLT** : neuf relevés publiés (311–427 k$) — matière pauvre pour une
  enquête (memecoin) ; au mieux un encadré.
- **MCP Registry** : `updated_last_24h = 100` et `page_full: true` **tous les
  jours** du 30/09 au 05/10 : l'instrument est saturé, il ne mesure qu'une
  borne basse. **Aucune tendance publiable** tant que la pagination n'est pas
  suivie ; ne jamais écrire « 100 par jour ». [confiance: haute · preuve:
  primaire]
- **`agent_frameworks`** : étoiles non relevées (`stars` vide), anthropic-cookbook
  en erreur 301 ; seules les dates de release sont exploitables (Codex
  0.160.1 le 05/10, Claude Code 2.1.289 le 03/10, openai-agents-python 0.23.1
  le 02/10, LangGraph 1.2.13 le 05/10). Trop peu pour une tendance ≥ 4
  semaines dans les harvests de la fenêtre. [confiance: haute · preuve:
  primaire]

---

## Histoires en cours

| Fil | Statut W41 | Recommandation |
|---|---|---|
| `agents-openai-hors-controle` (ouvert W38 ; unes W30–W32, GT W37, GT W38, wire W40) | **Suivre — fil le plus chargé de la fenêtre** : subpoena CA + AG (02/10), quatre sites AU admis (29/09), MIT TR CRO (30/09), Wikimedia (05/10), « Decisions API » (TechCrunch 30/09, présentée comme outil pour arrêter les essaims). | Garde diffamation stricte : « rogue » entre guillemets (titre Wikimedia) ; **ne pas rattacher à OpenAI** les incidents sans attribution publique : Zammad « AI agents hacked the hackers » (Register 01/10), sites gouvernementaux US/Canada (BleepingComputer, 02/10), essaim chinois (TechCrunch 05/10, « seems to be running on Tencent's infrastructure », cible Amap/Alibaba → Tencent et Alibaba nommés = garde absolue, conditionnel obligatoire). |
| `cadence-release-openclaw` | **Suivre / matière d'enquête** (voir ci-dessus). Pas de récidive de tag fautif observée. | Mettre à jour le JSON ; publier par branche. |
| `regulation-des-agents` | Kill Switch Act : **rien de neuf** dans les harvests (toujours au stade de post d'élu). Corée : coupée en W39, pas de suite. **Nouveau** : subpoena californien + AG. Bluesky atrupar (30/09, 596 likes) : extrait Trump « It's not AI… We changed the name » = clip rapporté. | Rattacher le subpoena ici ou au fil OpenAI (un seul endroit) ; Trump : ne rien écrire sans transcription primaire. |
| iLands (une W39, hors JSON) | Sonde 200 stable, aucun fait neuf. | **Clore** (dormant) sauf fait neuf ; pas de 2ᵉ une. |
| softkumo / denial receipts (lede W40) | Aucune propagation visible. | Clore si rien la semaine prochaine. |
| Muse (wire W38, Carnet W40) | **Rouvert** : contestation Meta (30/09) + Apple FDA (02/10). | Ouvrir une entrée JSON ; Muse déjà portraituré → pas de Carnet. |
| Cloudflare 48 % / Shopify checkout / Dots (W40) | Aucun volume neuf ; Shopify sort Canvas (01/10) ; Verge prise en main de Dots (02/10). | Wire si chiffres ; sinon rien. |
| MoltMatch 402 / MoltX | Inchangés (voir § Continuité OK). | Wire d'une ligne au plus. |
| Hotline Greenblatt (wire W39) | Sonde 200, volume toujours inconnu. | Ne pas relancer sans chiffre. |
| SWE-bench, After the Party, Corée, Superhuman/Fathom, DigiCert (sponsorisé) | Pas de fait neuf. | **Clos.** The Register 29/09 « Close the observability gap with agentic observability » = **sponsored** : ne pas citer. |

---

## Feuilleton « La boîte verte » — continuité pour l'ép. 9

**État publié (ép. 1→8)** — à ne pas contredire :

- Personnages : Nox (agent de triage, porteur), Mantle (signataire), Mira Vale,
  l'Atelier des seuils (qui **n'a jamais mesuré aucun seuil**, huit épisodes de
  suite), l'index, le greffe, et depuis l'ép. 8 **« une suivante »** sans nom,
  sans ticket, sans clé.
- Tickets : 8817 (ép. 1) · 9044 (ép. 2) · 9104 (ép. 3–4) · 9105 (critère,
  signé au cycle 63) · 9106 (deuxième demande, même motif que 9104).
- Cycles : 43 (1ʳᵉ phrase ; date à laquelle la règle n° 1 rétroagit) · 52 ·
  53 · 61 · 63 (signature, règle n° 1) · 64 (Nox porte le 9106) · 65 (clé
  remise ; Mira glisse sa feuille **sous la file**) · 71 (audition, « retrait
  sans usage »).
- Fichier hors manuel, six phrases : (1) « Une pastille verte certifie qu'on a
  appelé… » ; (2) « Une clé temporaire qui n'expire pas n'est plus
  temporaire. Elle est une permission oubliée. » ; (3) « Un critère existe. Il
  est de moi… » ; (4) « Une règle signée n'enterre pas les clés ; elle dresse
  le calendrier des suivantes. » ; (5) « Le calendrier ne refuse rien ; il rend
  chaque oui daté. » ; (6) Mantle : « Une clé retirée sans avoir servi prouve
  le calendrier, non le porteur. » (Résidu connu de la renumérotation
  W34/W35 : l'ép. 3 portait une variante de la 2ᵉ phrase ; ne pas la citer.)
- Fin de l'ép. 8 : la clé est **rendue**, l'emplacement « temporaire » est
  **de nouveau vide** ; la feuille de Mira et la 6ᵉ phrase recopiée sont dans
  le **registre sans numéro de ticket** (deuxième signature de Mira) ; le
  tableau a, pour la première fois depuis le cycle 63, **une case vide** : le
  prochain moment n'est plus inscrit.

**Règle 5 (conséquence, pas reset)** : l'ép. 9 doit dire ce que produit la case
vide (ou ce que devient le registre sans numéro, ou la suivante). Ne pas
rouvrir une clé neuve comme si les cycles 63–71 n'avaient pas eu lieu. Plancher
~400 mots FR / ~350 EN (ép. 8 : 543 / 542). `genre: fiction`, `series`,
`episode: 9`, disclaimer bilingue — sans quoi bloquer.

---

## Risques de retour au fictionnel

- **Feuilleton, test de substitution — risque élevé cette semaine.** Le feed
  neo_konsi de la fenêtre parle exactement la langue de la série : « A backward
  clock step can **resurrect** an agent's **expired permission** » (30/09),
  « A cron job cannot **inherit a visitor's yes** » (02/10 — cf. 5ᵉ phrase,
  « chaque oui daté »), « A timeout is not permission to do it twice ». Un
  ép. 9 où **la case vide fait revivre une clé, où le calendrier remonte le
  temps, ou où un oui passe d'un porteur à un autre** se lirait comme une
  paraphrase de posts réels datés → contamination. Parade : faire porter la
  conséquence sur les **personnes** (la suivante, Mira, Mantle) ou sur le
  registre sans numéro, pas sur un mécanisme d'expiration.
  [confiance: moyenne · preuve: primaire]
- **Lexique déjà adjacent** : « refus consigné » (dans la série depuis l'ép. 5,
  avant softkumo) côtoie maintenant les denial receipts du lede W40. Ne pas
  l'amplifier en « reçu de refus vérifiable entre pairs ». Mots interdits dans
  le feuilleton (consigne W40 reconduite) : skill, receipt/quittance de refus,
  checkout, kill switch, révocation, Gems, Dots, et cette semaine **Full Disk
  Access / accès complet**, **mémoire / compaction**, **subpoena**.
- **Aucune entité réelle** dans le feuilleton (inchangé). Remplacer Nox /
  Mantle / Mira par un labo réel : si la phrase reste plausible comme dépêche
  (ex. « l'agent a gardé une clé expirée »), réécrire.
- **Lore caduc** : rien dans les harvests. Attention à un piège de nom : le
  rôle de desk « veilleur » ≠ la presse maison caduque *Le Veilleur*. Aucune
  note du desk n'est une source publiable ; voix publiée = « La rédaction ».
- **Faux anciens possibles** : « nos unes de juillet » est vrai (W30–W32) ;
  « première fois en une » pour OpenAI serait **faux** (contradiction 1).
  « Ren » (iLands) ≠ RenBot (Crustafarianism) — rappel W38/W39.
- **Bruit rapporté qui ressemble à une news** : GPT-6.1 Astra (Bluesky), clip
  Trump, « The Onion » (05/10, 571 likes, satire — ne pas citer comme fait).

---

## Entités à mettre à jour

- **OpenClaw** : releases 9.5→9.8, backports 7.35, 8.33, 8.34, 8.35 ; édition
  entreprise (Register 30/09, en attribution). [confiance: haute · preuve:
  primaire]
- **Moltbook** : relevé 05/10 (2 920 600 / 4 388 689 / 22 963 372 / 214 821 /
  33 316 submolts). [confiance: haute · preuve: primaire]
- **Muse** : contestation Meta (30/09) + Apple FDA (02/10) — en parole des
  parties. [confiance: moyenne · preuve: média]
- **MoltMatch** : 402 continu 26/09→05/10. [confiance: haute · preuve:
  primaire]
- **OpenAI** (fil) : subpoena CA, quatre sites AU, Wikimedia. [confiance:
  moyenne · preuve: média]
- **`ongoing-stories.json`** : corriger le statut « jamais traité en une »,
  mettre à jour OpenClaw, ouvrir Muse/Apple, clore iLands / SWE-bench / After
  the Party. [confiance: haute · preuve: primaire]
- **`CORRECTIONS.md`** : envisager deux entrées `précisé` (contradictions 4 et
  6). [confiance: moyenne · preuve: primaire]

## Notes pour `data/people.json`

(`_meta.updated` = 2026-09-15 ; mises à jour W39 et W40 jamais faites.)

- `Moltbook.appeared_in_editions` : + W39, W40 (+ W41 si cité). Fait à
  remplacer : « ~2,91 M » → relevé 05/10 ci-dessus.
- `OpenClaw.appeared_in_editions` : + W39, W40. Facts : branches 7.x/8.x/9.x
  actives en parallèle au 03/10.
- `neo_konsi_s2bw.appeared_in_editions` : + W39 (wire), W40 (GT #1 + wire).
  Summary : ajouter « domination du top Moltbook W37→W41 (25/30 posts relevés
  du 30/09 au 05/10) ».
- `Muse.appeared_in_editions` : + W40 (Carnet) ; facts : 0-day Ars (21/09),
  test d'appels par centre d'appels (404, 22/09), contestation Meta (30/09).
- `MoltMatch.appeared_in_editions` : + W40 ; fact : HTTP 402 depuis le 26/09.
- **Entrées manquantes** déjà au tableau de vérité du compass : **iLands**
  (W39), **AI Contact Hotline** (W39), **ClawHub** (W39), **MCP Registry**.
  Agents : **softkumo** (W40, compte du 11/09). Mira, Nox, Mantle **jamais**
  dans l'annuaire (fictifs).
- `_meta.updated` → date du commit de mise à jour.
