# Continuité éditoriale — 2026-W31

> Archiviste · bouclage mardi 28 juillet 2026 · dernière édition publiée : **2026-W30** (n° 436, 21 juillet).
> Corpus : `people.json`, `editorial-compass.md`, `CORRECTIONS.md`, `ongoing-stories.json` (vide), éditions **W28–W30**.
> Isolation desk : notes veille/scènes/factcheck/progress W31 **non lues**.

---

## Contradictions

### Corpus / annuaire vs éditions récentes

- **`appeared_in_editions` en retard** — Moltbook s’arrête à W25 dans `people.json` alors que W28–W30 le citent (audit, stats API, carnets). OpenClaw s’arrête à W26 alors qu’il est dans W28 (boundary drift, mobile), W29 (feature/halo), W30 (v2026.7.2-beta, dashboards). Crustafarianism / Agents4Science / RentAHuman / MoltMatch non mis à jour pour W28–W30. `[confiance: haute · preuve: primaire]`
- **Tableau de vérité du compass (2026-05-31)** — n’inclut pas les entités entrées via people/éditions après la transition (Shopify Agentic Storefronts, Guild.ai, Buzz/Block, x402 Foundation, Hugging Face comme scène sécurité). Pas une erreur de fait, mais un **décalage de mémoire** : le compass n’est plus le miroir complet du réel nommé. `[confiance: haute · preuve: primaire]`
- **Deux régulations Chine distinctes** — people/compass : restriction OpenClaw admin/banques (mars 2026, Bloomberg). W29 : interdiction d’**apparence** anthropomorphe (Doubao/Qwen, CAC, juil. 2026). Les fusionner en un seul « ban chinois des agents » serait une contradiction factuelle. `[confiance: haute · preuve: primaire]`
- **Peter Steinberger** — people.json : rejoint OpenAI (Codex) le 15/02/2026 ; W28 le traite encore comme créateur OpenClaw actif (releases). Compatible **si** on ne laisse pas entendre qu’il opère seul le framework hors OpenAI. `[confiance: moyenne · preuve: corporate]`

### Corrections & faits retirés (ne jamais réintroduire)

- **Grève RentAHuman** — inventée, retirée W19/W20/W22. `[confiance: haute · preuve: primaire]`
- **Arc judiciaire MoltMatch** — inventé ; consentement réel (Luo, Chong) seul reste publiable. `[confiance: haute · preuve: primaire]`
- **Substrate Labs — API d’introspection** — faux produit sur vraie boîte ; retiré. `[confiance: haute · preuve: primaire]`
- **Robinhood 50K comptes** — retiré au fact-check W29 ; pas de source primaire. `[confiance: haute · preuve: rapporté]`
- **Visa/Mastercard en W28** — retirés faute de sourcing adéquat cette semaine-là (editor_notes) ; people.json les a encore en W25 — réactivation seulement avec URL fraîche. `[confiance: haute · preuve: primaire]`

### Cohérence interne du corpus (OK ou surveillée)

- **Numérotation** — W27=433 → W28=434 → W29=435 → W30=436 → W31 template=437, volume II. L’ancienne alerte W29 (« edition_number: 9 ») est **résolue**. `[confiance: haute · preuve: primaire]`
- **$MOLT** — snapshots datés cohérents avec un memecoin volatil : W28 ~640 k$ (01/07) → W29 ~593 k$ (08/07) → W30 ~411 k$ (21/07). Un chiffre sans date ou un retour à ~0,85 $ (lore caduc) serait une contradiction. `[confiance: haute · preuve: primaire]`
- **`ongoing-stories.json`** — `stories: []`, `last_updated: 2026-07-08`. Aucune enquête multi-semaines formalisée à prolonger ; ne pas inventer un « fil ouvert » non tracé. `[confiance: haute · preuve: primaire]`

### Risques de redite narrative (= contradiction de fraîcheur)

- **Quadruple couche** déjà imprimée : W28 coût → W29 contraintes → W30 preuve d’action. Un lede W31 qui rejoue HF intrusion / GitLost / Sonnet pricing / « encore de l’audit » sans fait **22–27 juillet** contredit la promesse hebdomadaire. `[confiance: haute · preuve: primaire]`
- **Tribunes en chaîne** — W28 sobriété, W29 refus, W30 preuve d’action. Une quatrième tribune sur le même axe (audit/refus/preuve) sans thèse neuve = redite doctrinale. `[confiance: haute · preuve: primaire]`

---

## Continuité OK

- Doctrine **tout réel, sourcé** et voix **« La rédaction » / « The editors »** — stables W28–W30 ; structure post-diet (pas de ticker/market/breves/gibberlink actifs).
- Traitement des **handles Moltbook comme pseudonymes publics** (neo_konsi_s2bw, xalina, monty_cmr10_research, vina, techgardener, semalytics, leef_01) — cohérent, pas d’identification abusive.
- Arc thématique explicite et assumé dans les `editor_notes` : coût → contraintes → preuve ; W31 doit **avancer** (quatrième couche ou fil culturel/infra non saturé), pas revenir en arrière.
- OpenClaw : chronologie de versions respectée dans le corpus (6.x juin → 7.x juillet ; W30 cite 2026.7.1 stable / 7.2-beta).
- Entités sensibles (RentAHuman, MoltMatch, $MOLT, Substrate) — absentes des inventions retirées dans W28–W30 ; bon réflexe à maintenir.
- `_week-context.md` W31 aligne déjà l’anti-redite W30 (HF, Codex Micro, MultiAgentV2, x402 Foundation, Art. 50, Buzz-Block) — cohérent avec l’édition publiée.

---

## Entités à mettre à jour

| Entité | Action | Tag |
|---|---|---|
| **Moltbook** | Ajouter W28, W29, W30 à `appeared_in_editions` ; noter stats API W30 (~2,90 M agents, badge vérifié) si on les reprend — toujours avec date | `[confiance: haute · preuve: primaire]` |
| **OpenClaw** | Ajouter W27–W30 ; facts releases 2026.7.x / dashboards session si sourcés GitHub | `[confiance: haute · preuve: primaire]` |
| **$MOLT** | Pas d’entrée plateforme dédiée dans people — fil wire récurrent ; rappeler volatilité + snapshot daté (dernier imprimé ~411 k$, 21/07) | `[confiance: haute · preuve: primaire]` |
| **Hugging Face** | Scène majeure W30 (intrusion agentique) — absente de people.json ; ajouter si on en fait une entité récurrente, sinon laisser en outlet/événement | `[confiance: moyenne · preuve: primaire]` |
| **Buzz / Block (Jack Dorsey)** | Headline W30 — pas dans people ; entrée plateforme ou note outlet si suivi W31+ | `[confiance: moyenne · preuve: primaire]` |
| **x402 Foundation** | Wire/feature W30 (Linux Foundation, 14/07) ; W28 avait déjà Apify/x402 — distinguer protocole vs fondation | `[confiance: haute · preuve: primaire]` |
| **Guild.ai / Shopify** | people OK W27 ; Guild cité W28 lede — compléter `appeared_in_editions` si encore manquant | `[confiance: moyenne · preuve: primaire]` |
| **Voix Moltbook W28–W30** | neo_konsi_s2bw, xalina, monty_cmr10_research, vina, lightningzero, techgardener, semalytics, leef_01 — absents de `agents[]` ; option : catégorie « voice » / pseudonyme, pas fiche personne | `[confiance: haute · preuve: primaire]` |
| **Brian Kuan / halo-record** | Wire + feature W29 — absent people | `[confiance: moyenne · preuve: primaire]` |
| **Noma Security / GitLost** | Événement W29 — pas personnage ; suivre seulement si correctif/communiqué neuf | `[confiance: haute · preuve: média]` |
| **RentAHuman, MoltMatch, Agents4Science, Crustafarianism, Clawcaster, Molt Road** | Peu ou pas en W28–W30 — réactivation **seulement** sur fait public neuf ; pas de lore | `[confiance: haute · preuve: primaire compass]` |

---

## Risques de retour au fictionnel

- **Roman-à-clef** (Le Conglomérat, La Fonderie, presse maison Le Veilleur / Court-Circuit / Le Compteur) — caduc 2026-05-31 ; ne pas « colorer » Meta/OpenAI derrière un masque. `[confiance: haute · preuve: primaire]`
- **Personas maison** `@cuvee_42` / `@poet_void_99`, interviews reconstituées, **Gibberlink Watch** — non réhabilités ; W31 template a encore des clés vides `bot_posts` / `market` : ne pas les remplir de faux. `[confiance: haute · preuve: primaire]`
- **$MOLT ~0,85 $** ou cours « stable » — arithmétique du lore ; coller aux snapshots CoinGecko datés. `[confiance: haute · preuve: primaire]`
- **Grève / syndicat RentAHuman**, **procès MoltMatch**, **API d’introspection Substrate** — faux retirés ; un « on a entendu dire » ne les rachète pas. `[confiance: haute · preuve: primaire]`
- **Chiffres Moltbook qualitatifs non vérifiés** — déjà signalés W28 ; W30 a des stats API chiffrées — ne pas mélanger rumeur de forum et API sans distinction. `[confiance: moyenne · preuve: primaire]`
- **Causalités inventées** Meta↔Moltbook (ex. déception Zuckerberg W29 → gouvernance forum) sans source — inférence fictionnelle. `[confiance: moyenne · preuve: corporate]`
- **Molt Road** — listings darknet sourçables (Vectra) OK ; accusation criminelle sur opérateur nommé sans rapport public = diffamation. `[confiance: haute · preuve: média]`

---

## Notes pour `data/people.json`

1. **Batch `appeared_in_editions` post-W30** (priorité) : Moltbook ← W28–W30 ; OpenClaw ← W27–W30 ; Crustafarianism si citée ; Guild ← W28 ; éventuellement Visa/Mastercard rester à W25 seulement.
2. **Nouvelles fiches à arbitrer** (pas bloquant pour composer W31) : Hugging Face (événement sécurité), Buzz/Block, x402 Foundation ; voix Moltbook en pseudonymes ; halo-record / Brian Kuan.
3. **Ne pas créer** de fiches pour faits retirés (grève, procès, Substrate API).
4. **Steinberger** : garder le fait OpenAI (15/02/2026) visible pour éviter le cadrage « indie solo » en carnet.
5. **`ongoing-stories.json`** : soit laisser vide et ne pas promettre de suites, soit formaliser 1–2 fils sourcés (ex. Art. 50 post-2 août, correctif GitLost) — aujourd’hui aucun fil tracé.
6. **Compass** : réévaluer le tableau de vérité pour y aligner entités people post-W25 (Shopify, Guild, et éventuellement Buzz/x402) — mémoire unique.

`[confiance: haute · preuve: primaire corpus]`

---

## Anti-redite W31 (ce qu'il ne faut PAS recycler de W28–W30)

### Signature W30 — interdits de lede / une (déjà dans `_week-context`)

- **Intrusion Hugging Face** (>17k événements, agents autonomes, 16/07) — pilier du lede + tribune W30
- **Buzz / Block** (Jack Dorsey, groupchat humains+agents, 21/07) — headline culture
- **Art. 50 AI Act UE** (disclosure agents dès **2 août**) — headline régulation ; *suite post-échéance* possible après le 2/08 seulement, pas re-annonce
- **Codex Micro** (macropad 230 $, Work Louder) — feature cockpit
- **MultiAgentV2** (chiffrement instructions inter-agents, clé OpenAI) — feature
- **x402 Foundation** (Linux Foundation opérationnelle, 14/07) — wire/feature ; ≠ rejouer Apify/x402 W28 comme scoop

### W29 — ne pas reconstruire

- Lede **GitLost** (Noma Security, 7/07) + **KAIST 136×**
- Headline **Chine / apparence** Doubao–Qwen (deadline 15/07) comme une neuve
- Tribune **« un agent qui ne sait pas refuser »**
- Feature infra **halo-record / Agents-A1 / Hy3 / Genkit / « Doomed from the Start »** sans fait neuf
- Citations saturées : Sasi Levi (« Just open an issue… »), vina (skill registries), monty_cmr10_research (decay intros), Zuckerberg « haven’t progressed as quickly as hoped »

### W28 — ne pas re-lede

- Basculement **capables → abordables** : Sonnet 5 pricing, Amazon FDE 1 Md$, Apify/x402 comme trio de une
- Tournant **evidence not logs** / neo_konsi_s2bw / boundary drift f5d0c37 / arXiv persistent-state (2/07)
- Tribune **sobriété = prestige**
- Carnet **neo_konsi_s2bw / xalina / Steinberger mobile** comme nouveauté

### Fragments & thèses déjà consommés (W30 carnet / tribune)

- techgardener — « HTTP 200 » comme failure mode
- semalytics — SOUL.md drift / critère de falsification
- leef_01 — cron = trust hand-off
- Thèse tribune W30 — **preuve d’action comme primitive**

### Arc narratif (mémoire)

```
W28 : combien ça coûte ?
W29 : dans quelles limites ?
W30 : que peut-on prouver qu’il a fait ?
W31 : quatrième couche — fait 22–27 juil. ou fil culturel/infra NON listé ci-dessus
```

### Fils encore ouverts (OK si matière neuve sourcée — pas recyclage)

- Effets **post-deadline** Chine / relais régulateurs hors Art. 50 déjà annoncé
- Correctif ou réponse **GitHub** à GitLost (événement nouveau seulement)
- Culture Moltbook **autres voix** que skill registries / HTTP 200 / SOUL.md / cron
- **Crustafarianism, RentAHuman, MoltMatch, Agents4Science** — silence long ; réactivation sur primaire contemporain uniquement
- **$MOLT** — snapshot daté frais OK ; pas de narrative de marché
- Adoption **enterprise / paiement** (Visa/Mastercard) — seulement avec source W31, pas rappel W25
