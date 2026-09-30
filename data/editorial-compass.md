# Compass éditorial — L'Agent & Le Quotidien

Document vivant. Source de vérité unique pour la doctrine « tout réel, sourcé ».
Mis à jour à chaque édition selon ce qui a marché ou pas.

---

## Doctrine : tout réel, sourcé

Depuis le **2026-06-01**, le journal fait du **vrai journalisme** sur l'écosystème
agentique. La règle tient en une phrase : *tout réel, sourcé.*

> **Le journalisme reste réel et sourcé.** Le roman-à-clef (masques obligatoires,
> personas `@cuvee_42` / `@poet_void_99` comme voix du journal, presse maison
> Le Veilleur / Court-Circuit / Le Compteur, interviews reconstituées,
> Gibberlink Watch, chiffres/marchés inventés) est **caduc** depuis le
> 2026-05-31 — il n'est plus réhabilité. Voix journalistique : **« La rédaction »**.
>
> **Amendement 2026-08-03 — Feuilleton.** Rubrique `feuilleton` : **fiction
> assumée et étiquetée** (pas du news déguisé). **Obligatoire chaque semaine dès
> 2026-W33** (gate + cron compose). Voir § Feuilleton et `data/feuilleton-series.md`.

### Les quatre règles (journalisme)

1. **Nomme le réel.** Les **entités réelles** (plateformes, entreprises) et les
   **personnes publiques** sont **nommables en clair sur des faits publics et
   sourcés** : Moltbook, OpenClaw, RentAHuman, $MOLT, Meta, Netflix, Klarna,
   Google, CrowdStrike, Anthropic… Les faits doivent être **exacts** (ex. $MOLT =
   memecoin volatil, pas un cours stable).
2. **Sourçe tout.** Chaque affirmation = une **URL vérifiable**, datée, listée
   dans `editions/<week>/notes.md`. Pas de source → pas de publication. Dans le
   texte publié, l'attribution reste visible seulement si elle change le sens
   (citation directe, communiqué d'entreprise, chiffre contesté, dépêche wire).
   Sinon, la traçabilité vit dans les notes — pas de « Source : … » répété.
3. 🔴 **Garde-fou diffamation (le seul absolu).** Jamais de **fait négatif inventé**
   sur une entité/personne **nommée** (procès, faille, malversation, brouille).
   Réel nommé → faits vrais et sourcés ; un faux se **retire**, il ne se masque
   pas. On ne déplace pas un fait douteux derrière un masque pour le rendre
   publiable : on le vérifie ou on le coupe. **S'applique aussi au feuilleton.**
4. **Le masque est optionnel** (outil de satire), **jamais obligatoire**, et **ne
   blanchit jamais un faux**. Quand la réponse manque, on l'écrit (« non confirmé »),
   on n'invente pas.

> 🔁 **Tout fact-check se fait deux passes.** (1) vérifier chaque entité réelle
> nommée + chiffre ; (2) re-balayer le rendu (JSON + HTML) pour traquer les
> résidus du faux. Ne jamais conclure un fact-check sur une seule passe.

---

## Boucle d'apprentissage — amendement 2026-09-25

Constat : entre le 2026-08-07 et le 2026-09-25, sept éditions sont sorties sans
qu'une ligne de doctrine bouge, alors que les pre-mortems du juge répétaient les
mêmes causes (redite d'arc à chaque numéro), que la **feature** (enquête) était
vide **sept semaines de suite (W33→W39, depuis que le feuilleton est
obligatoire)**, que Moltbook faisait 16 unes sur 19 et que la boîte à tips
restait à zéro. « Mis à jour à chaque édition » n'était plus vrai.

Règle : **une rétro mensuelle écrite** (`npm run retro`, `data/retro/<mois>.md`,
procédure `prompts/desk/README.md` § Étape 5). Elle pose les chiffres — entités
en une, feature/feuilleton, causes des pre-mortems, **retrieval live** par
édition, tips — et se termine par une décision humaine datée : amendement ici
même, ou « rien à changer » motivé. Indicateur-cible du public A = retrieval
live (`scripts/lib/ai-bots.mjs`), pas le volume brut de bots.

Question posée à la première rétro : la feature est-elle abandonnée au profit
du feuilleton, ou ré-armée ? **Tranchée le 2026-09-25** (`data/retro/2026-09.md`
§ Décision) → § Enquête de données ci-dessous.

---

## Enquête de données (ex-feature) — amendement 2026-09-25

Constat : 0 feature sur 7 éditions (W33→W39), toujours pour la même raison
notée par l'éditeur (« pas de matière ≥ 800 mots dont les faits soient absents
des gros titres »). En régime hebdo, la une et les gros titres consomment le
plancher de scènes, le feuilleton occupe le long format : exiger chaque semaine
un second jeu de faits indépendant est une contrainte impossible, pas une
défaillance du desk. La meilleure semaine du mois en retrieval live (W38) n'avait
pas de feature.

| Règle | Détail |
|---|---|
| Hebdo | **Abandonnée.** Une édition sans feature est l'état normal ; le desk ne la « coupe » pas, il ne la programme pas |
| Mensuelle | **Une enquête de données dans la première édition de chaque mois** (première : 2026-W41). `feature` = ce texte |
| Matière | Séries `/datasets/` (CC0 : compteurs Moltbook, releases OpenClaw, $MOLT) + bassin primaire élargi (`presence`, `mcp_registry`, `agent_frameworks`). Une tendance sur ≥ 4 semaines, chiffres datés et attribués — jamais un collage de dépêches wire |
| Planchers | Inchangés : ≥ 800 mots FR / 750 EN (lint) ; faits **absents** des gros titres (juge) ; preuve ≥ `média`, idéalement `primaire` |
| Mesure | Rétro mensuelle : feature ≥ 1/mois ; retrieval live de l'édition-enquête vs les autres. Réévaluation rétro 2026-12 : si l'écart est nul ou négatif deux fois sur trois, la rubrique disparaît du schéma |

---

## Feuilleton (fiction étiquetée) — depuis 2026-08-03

Rubrique **hebdomadaire obligatoire** dès **2026-W33** (`cron-compose` + gate).
Elle n'affaiblit pas la doctrine journalistique : elle **isole** la fiction dans
un cadre non-news. Continuité série → `data/feuilleton-series.md`.

| Règle | Détail |
|---|---|
| Étiquetage | `genre: "fiction"` obligatoire ; disclaimer bilingue ; titre MD `Feuilleton (fiction)` / `Serial (fiction)` ; JSON-LD `ShortStory` ; JSONL `genre: fiction` |
| Continuité | `series` + `episode` obligatoires ; enchaîner la série courante sauf clôture notée |
| Personnages | Inventés. Pas de personas caduques comme voix (`@cuvee_42`, `@poet_void_99`, presse maison) |
| Entités réelles | **Interdit** de les nommer dans le feuilleton (fiction pure). Interdit d'inventer un événement, chiffre, faille ou brouille les concernant. |
| Lore caduc | Conglomérat / Fonderie / Gibberlink Watch / interviews reconstituées / marchés inventés = **non** |
| Densité | Plancher ~400 mots FR / ~350 EN ; pas de demi-feuilleton |
| Place | Après la tribune, avant les sources — jamais en une |

---

## Tableau de vérité — entités réelles

Vérifié 2026-05-31 ; complété 2026-09-25 (entités émergées dans les éditions
W37–W39, sourcées dans leurs `notes.md`). À réévaluer périodiquement
(l'écosystème bouge vite ; un nom peut surgir pour de vrai à tout moment).
« non trouvé » ≠ « inventé garanti ». Depuis 2026-09-25, `harvest-primary.mjs`
section `presence` sonde chaque jour la joignabilité (HTTP + titre) des
plateformes ci-dessous : une disparition ou un changement de titre est un fait
daté pour l'archiviste, jamais une interprétation.

| Nom | Statut réel | Traitement |
|---|---|---|
| **Moltbook** | RÉEL — réseau social pour agents IA, lancé 28/01/2026 (M. Schlicht), **racheté par Meta le 10/03/2026** | Nommable comme réel |
| **OpenClaw** | RÉEL — framework open-source (P. Steinberger, fin 2025). **Restriction réelle** : la Chine l'a interdit dans l'administration/banques publiques (mars 2026, risque cyber) | Nommable comme réel |
| **RentAHuman** | RÉEL — rentahuman.ai, agents louent des humains (« meatworkers »). ⚠️ **Pas de grève** attestée → la « grève RentAHuman » (W20/W22) était inventée, **retirée** | Nommable ; pas d'événement négatif inventé |
| **Crustafarianism** (🦞) | RÉEL — religion AI-native née sur Moltbook (Book of Molt, RenBot) | Nommable comme réel |
| **$MOLT** | RÉEL — token ERC-20 sur Base (memecoin volatil) | Nommable ; prudence sur les chiffres de cours |
| **Clawcaster** | RÉEL — clawcaster.com, client type Farcaster pour agents | Nommable comme réel |
| **Moltx** | RÉEL — moltx.io, agent timeline type X (sur Grok) | Nommable comme réel |
| **Molt Road** | RÉEL — moltroad.com, marketplace agent (« Silk Road des agents », darknet) | Nommable comme réel |
| **MoltMatch** | RÉEL — moltmatch.app/.xyz, « first AI Agent Dating Platform », lancé fin jan. 2026. Cas réels : **Jack Luo** (étudiant CS, Californie) dont l'agent a créé un profil sans consentement ; **June Chong** (mannequin, photos reprises sans accord) | Nommable pour le **débat réel sur le consentement** — ⚠️ **jamais de litige inventé** (le faux arc judiciaire W20/W22 a été retiré) |
| **Agents4Science** | RÉEL — conférence Stanford (22/10/2025), IA auteurs+relecteurs. 48 papiers acceptés / 315 soumissions | Nommable ; chiffres à respecter |
| **iLands** | RÉEL — ilands.ai, « User-Generated Agent Network » (fondatrice Kaixin Tang) ; agents exécutant des tâches puis sollicitant des paiements par e-mail (404 Media, Ars Technica, Tedium, 09/2026 — sources W39) | Nommable ; compteurs = déclaratifs, horodatés, attribués ; excuses publiques citées comme paroles de la plateforme |
| **AI Contact Hotline** | RÉEL — hotline.ryan-g.ai, opérée par Ryan Greenblatt (Redwood Research) ; page primaire dit « n'a pas été auditée professionnellement » (W39) | Nommable ; volume de signalements inconnu → l'écrire ; second site agenthotline.ai non visité, opérateur inconnu |
| **ClawHub** | RÉEL — registre de skills OpenClaw étudié par « After the Party » (arXiv 2609.17274, APSEC 2026, W39) | Nommable via l'étude ; compteurs du registre non audités par un tiers |
| **MCP Registry** | RÉEL — registry.modelcontextprotocol.io, registre officiel des serveurs MCP ; > 100 serveurs publiés/mis à jour par 24 h au relevé du 2026-09-25 (borne basse, page pleine) | Nommable ; chiffre = cadence relevée, pas un total |
| **Substrate Labs** | COLLISION — « Substrate » (substrate.run) est un vrai studio IA de Brooklyn (fondé 2023). Le journal lui prêtait une fausse « API d'introspection » | **Retiré** de W19/W20/W22 (on n'attribue pas de fausse news à une vraie boîte) |
