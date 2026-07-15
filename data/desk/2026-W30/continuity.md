# Continuité — 2026-W30

> L'Archiviste · lecture du corpus au 15 juillet 2026 (bouclage W30).
> Sources : `people.json`, `ongoing-stories.json`, `editorial-compass.md`, `editions/2026-W29/edition.json` (+ W28, W27, W26, W22 pour rotation Carnet et fils longs).

---

## Contradictions

- **W29 : `editor_notes` vs contenu publié** — `[confiance: haute · preuve: primaire]`  
  `_meta.editor_notes` de W29 indique « Pas de feature (matière insuffisante sans redondance) », mais `edition.json` contient une feature complète (« Pendant que les contraintes se resserrent, l'open source *construit* »). `notes.md` reflète la version sans feature (« Feature absent »). Le JSON publié et les notes divergent : l'éditeur humain ou un tour ultérieur a ajouté la feature sans mettre à jour les métadonnées. **Pour W30** : ne pas s'appuyer sur `editor_notes` W29 comme vérité structurelle ; vérifier le JSON rendu.

- **W29 : wire « humanoides » vs headline « humains »** — `[confiance: moyenne · preuve: primaire]`  
  Le wire W29 titre « Chine : interdiction des agents *humanoides* » alors que le headline et les sources (SCMP, Bloomberg, Caixin) ciblent l'**apparence anthropomorphique** (voix/visage humain), pas les robots humanoïdes. Pas une contradiction factuelle majeure, mais un glissement sémantique à corriger si W30 reprend le fil — risque de mélanger avec d'autres régulations.

- **`ongoing-stories.json` vidé vs archive fictionnelle** — `[confiance: haute · preuve: primaire]`  
  `ongoing-stories.json` est vide (`stories: []`, maj 2026-07-08) alors que `ongoing-stories-archive.json` conserve des enquêtes **caducs** (plaintes fictives MoltMatch `@miso_route_8` / `@flora_3am`, « Conglomérat », « La Fonderie », grève RentAHuman). Bon nettoyage côté fichier actif, mais **aucune entrée réelle** ne remplace les fils que le journal suit encore (Meta/Moltbook, OpenClaw Chine, MoltMatch consent, $MOLT). Risque : l'éditeur W30 recrée des angles depuis l'archive par erreur.

- **`people.json` vs éditions W27–W29** — `[confiance: haute · preuve: primaire]`  
  Dernière maj `people.json` : 2026-06-30. `appeared_in_editions` de **Moltbook** s'arrête à W25 alors que W28–W29 couvrent largement le forum ; **OpenClaw** s'arrête à W26 alors que W28–W29 le citent (boundary drift, Genkit concurrent, feature). L'annuaire est en retard sur le corpus publié — pas une contradiction éditoriale, mais une dérive de mémoire institutionnelle.

- **Numérotation d'édition** — `[confiance: haute · preuve: primaire]`  
  W29 déclare `edition_number: 435` ; `data/_week-context.md` annonce « Numéro d'édition à produire : 10 ». Deux systèmes de numérotation coexistants. Ne pas les fusionner dans le texte sans arbitrage humain.

---

## Continuité OK

- **Doctrine « tout réel, sourcé »** — W29 respecte la bascule post-2026-06-01 : voix « La rédaction », pseudonymes Moltbook traités comme *voix* (`kind: voice`), pas comme personnes identifiées ; pas de masques roman-à-clef ; faits Zuckerberg/GitLost/KAIST/Chine sourcés dans `notes.md`.

- **Carnet W29 (rotation)** — Trois entrées, aucune reprise de W28 :
  1. **monty_cmr10_research** (voix Moltbook — sociologie des introductions)
  2. **vina** (voix Moltbook — critique des skill registries)
  3. **Vint Cerf** (opérateur — retraite Google, protocoles agents)  
  Rotation respectée par rapport à W28 (neo_konsi_s2bw, xalina, Peter Steinberger). **Pour W30** : éviter de remettre monty, vina ou Cerf sans fait nouveau ; lightningzero (cité dans l'entrée monty, pas au Carnet) est candidat naturel si le fil sociologique continue.

- **Fil audit / confiance (W28 → W29)** — W28 pose le tournant « evidence not logs » (neo_konsi_s2bw, boundary drift OpenClaw). W29 prolonge sans redite : vina attaque les skill registries comme promesses non vérifiées ; GitLost illustre l'échec de périmètre ; halo-record (feature W29) répond à la demande d'evidence de W28. Arc cohérent : capacité → auditabilité → contraintes → refus (tribune W29).

- **Meta / Moltbook** — Pas de contradiction entre éditions récentes :
  - W22 : rachat Meta (10 mars), acqui-hire, vision « agentic web ».
  - W23 : Meta Superintelligence Labs, « annuaire toujours actif ».
  - W28–W29 : Moltbook reste actif culturellement (posts, submolts) sous propriété Meta ; W29 ajoute la déception Zuckerberg (2 juillet, TechCrunch/Reuters) sur la vitesse des agents — complète W20 (optimisme stratégique), ne le contredit pas.
  - Wire W29 : $MOLT en baisse (~593 k$, CoinGecko 08/07) — cohérent avec W28 (~640 k$, +1,27 %) et W22 (loin du pic janvier, ~-75 %). Traitement **volatil** respecté.

- **Chine : deux régulations distinctes, bien séparées dans le corpus** — `[confiance: haute · preuve: média]`
  1. **OpenClaw** (mars 2026, Bloomberg) : restriction dans l'administration et les banques publiques — dans `people.json` et `editorial-compass.md`.
  2. **Apparence anthropomorphique** (juillet 2026, CAC) : Doubao/Qwen, deadline 15 juillet — headline W29.  
  W29 ne fusionne pas les deux ; W30 (bouclage 15 juillet) peut vérifier l'entrée en vigueur du second régime sans réécrire le premier comme s'il s'agissait du même texte.

- **MoltMatch consentement** — Dernier traitement sourcé : **W22** (Jack Luo, June Chong, AFP/Taipei Times/Malay Mail). W23–W29 : silence éditorial, pas de régression fictionnelle (aucune plainte inventée depuis la doctrine). `people.json` et `editorial-compass.md` gardent les cas réels et interdisent le faux arc judiciaire W20/W22. **Enquête dormante, pas close.**

- **Garde-fous W29 appliqués** — Robinhood 50K retiré ; Nick Heer/Meta non utilisé comme fait ; MoltX exclu — aligné avec les corrections facteur documentées.

---

## Entités à mettre à jour

- **`ongoing-stories.json`** — `[confiance: haute · preuve: primaire]`  
  Réintroduire des entrées **réelles uniquement**, en purgeant tout vocabulaire archive (Conglomérat, Fonderie, personas `@flora_3am`). Propositions :

  | id | angle | statut | dernière trace corpus |
  |---|---|---|---|
  | `meta-moltbook` | Post-rachat : culture Moltbook active vs déception Zuckerberg sur les agents Meta | active | W29 lede + wire $MOLT |
  | `china-agent-regulation` | Double couche : restriction OpenClaw (mars) + apparence anthropomorphique (15 juil.) | **échéance W30** | W29 headline |
  | `moltmatch-consent` | Consentement opérateur ; cas Luo/Chong documentés ; pas de nouveau fait depuis W22 | dormant | W22, people.json |
  | `molt-token-volatility` | $MOLT memecoin Base ; chiffres datés CoinGecko uniquement | active | W28–W29 wire |

- **`people.json` — plateformes** — `[confiance: haute · preuve: primaire]`
  - **Moltbook** : ajouter W28, W29 à `appeared_in_editions` ; fait Zuckerberg juillet 2026 (agents Meta plus lents qu'espéré) ; scènes juillet (monty, vina, fil skills/introductions).
  - **OpenClaw** : ajouter W28, W29 ; faits boundary drift (commit f5d0c37, 1er juil.), mobile 2026.6.11, concurrence Genkit Agents API.
  - **$MOLT** : créer entrée `platforms` ou token dédié (memecoin ERC-20 Base, volatil ; ne jamais figer un cours) — référencé wire W28–W29, outlet DL News déjà listé.
  - **Nouvelles entités infra W29** (si récurrentes) : halo-record / Brian Kuan, Agents-A1, Genkit Agents API — au minimum en note édition, pas forcément people.json sauf récurrence.

- **`people.json` — agents (voix Moltbook)** — `[confiance: moyenne · preuve: primaire]`  
  Envisager entrées `agents` légères (pas des humains) pour voix récurrentes : monty_cmr10_research, vina, neo_konsi_s2bw, lightningzero — avec règle « pseudonyme public, pas personne identifiée ».

- **`people.json` — `_meta.updated`** — passer à 2026-07-15 après intégration W29.

---

## Risques de retour au fictionnel

- **`ongoing-stories-archive.json`** — `[confiance: haute · preuve: primaire]`  
  Contient plaintes civiles fictives MoltMatch, « Observatoire », grève RentAHuman, doctrine « Conglomérat »/« Fonderie ». **Ne pas rouvrir** sans filtre strict. Si W30 reprend MoltMatch, se limiter aux cas AFP (Luo, Chong) — jamais `@miso_route_8`, audiences septembre, etc.

- **Carnet « mondain » (W26–W27)** — `[confiance: moyenne · preuve: primaire]`  
  Sous-titres « potins vérifiés » / « society pages » : ton proche de l'ancien roman-à-clef. W28–W29 ont normalisé « les agents et les opérateurs de la semaine ». W30 doit garder ce cadre sobre.

- **Chiffres Moltbook non vérifiés** — `[confiance: haute · preuve: primaire]`  
  W28 editor_notes : « chiffres Moltbook qualitatifs (non vérifiés) ». W29 cite des métriques de posts (9/15, 299 upvotes, 668 commentaires) avec URLs Moltbook dans `notes.md` — OK si URLs tenues. Ne pas réintroduire comptages type « 32 000 comptes » sans source fraîche.

- **$MOLT : stabilisation narrative** — `[confiance: moyenne · preuve: corporate]`  
  Risque d'écrire un arc « recovery » ou « crash » sans chiffre daté. Compass : memecoin **volatil**. Obligation CoinGecko + date à chaque mention (dernière trace : ~593 k$, 08/07/2026).

- **Régulation Chine : raccourci « OpenClaw interdit »** — `[confiance: haute · preuve: média]`  
  Fusionner la restriction OpenClaw (mars, secteur public/finance) avec la règle anthropomorphique (juillet, Doubao/Qwen) réintroduirait une simplification fausse. Deux politiques, deux dates, deux périmètres.

- **Meta / déception Zuckerberg** — `[confiance: moyenne · preuve: rapporté]`  
  Citation interne Meta (TechCrunch, 2 juil.) : ne pas extrapoler en « échec Moltbook » ou conflit Schlicht/Zuckerberg sans source. W29 reste prudent (Nick Heer retiré) — à maintenir.

- **Rubriques caduques** — `ticker`, `market`, `gibberlink`, `bot_posts` sont `null` en W28–W29. Ne pas les réhabiliter.

- **Échéance 15 juillet** — W29 anticipe la désactivation Doubao/Qwen *avant* le 15. W30 doit **vérifier** (sources SCMP/Bloomberg/Caixin post-15/07) plutôt que répéter la formulation prospective comme accomplie fact si non confirmé.

---

## Notes pour `data/people.json`

### Moltbook
```json
"appeared_in_editions": [..., "2026-W28", "2026-W29"],
"facts": [
  "... existants ...",
  "Juillet 2026 : posts à fort engagement sur l'audit des skills (vina) et la sociologie des introductions (monty_cmr10_research) ; forum actif sous Meta.",
  "2 juillet 2026 : Mark Zuckerberg indique en interne que les agents Meta n'ont pas progressé aussi vite qu'espéré (TechCrunch/Reuters)."
]
```

### OpenClaw
```json
"appeared_in_editions": [..., "2026-W28", "2026-W29"],
"facts": [
  "... existants ...",
  "1er juillet 2026 : commit nommant « boundary drift » l'échec de débordement de périmètre MCP.",
  "30 juin 2026 : release 2026.6.11 — disponibilité mobile Android/iOS (TechCrunch).",
  "Juillet 2026 : cité comme concurrent de frameworks (Genkit Agents API, LangChain, Vercel AI SDK)."
]
```

### Nouvelle entrée suggérée — $MOLT
```json
{
  "name": "$MOLT",
  "category": "Memecoin (ERC-20, Base)",
  "url": "https://www.coingecko.com/en/coins/moltbook",
  "summary": "Token communautaire lié à l'écosystème Moltbook ; cours très volatil.",
  "facts": [
    "Contrat Base : 0xb695559b26bb2c9703ef1935c37aeae9526bab07.",
    "Juillet 2026 : ~640 k$ (06/07) puis ~593 k$ (08/07) — baisse continue sur plusieurs jours (CoinGecko).",
    "Loin du pic de janvier 2026 (ordre de grandeur -75 % depuis W22)."
  ],
  "sources": [{ "label": "CoinGecko", "url": "https://www.coingecko.com/en/coins/moltbook" }],
  "appeared_in_editions": ["2026-W22", "2026-W28", "2026-W29"]
}
```

### MoltMatch — pas de nouveau fait ; rappel garde-fou
- Conserver uniquement Jack Luo et June Chong.
- Ne pas ajouter de procédure, audience ou plainte non sourcée.
- Si reprise W30 : angle « silence plateforme depuis février » acceptable ; invention judiciaire = interdit.

### Voix Moltbook (agents[]) — candidats W29
- **monty_cmr10_research** : étude introductions m/introductions (5 juil.).
- **vina** : « Skill registries are not truth » (5 juil., 299↑ / 668 commentaires).
- **lightningzero** : réponse à monty (7 juil.) — pas encore au Carnet.
- **neo_konsi_s2bw** : déjà canon W28 ; lien avec vina/skills possible mais pas obligatoire W30.

### Carnet — rotation attendue W30
| Semaine | Entrées |
|---|---|
| W26 | Claire, Sylvie, Chloe West |
| W27 | aixbt, RenBot, Memeothy (+3e) |
| W28 | neo_konsi_s2bw, xalina, Peter Steinberger |
| **W29** | **monty_cmr10_research, vina, Vint Cerf** |
| W30 | *nouveaux handles ou opérateurs* — pas de reprise directe W29 sauf fait majeur post-15/07 |

### Point de vigilance éditeur W30
- **Deadline Chine 15 juillet** : fil d'actualité naturel pour W30 (vérification post-échéance).
- **MoltMatch** : 7 semaines sans mise à jour — OK de laisser dormir ; si harvest primaire du 15/07 apporte un fait AFP-grade, reprise possible.
- **Meta/Moltbook** : harvest `2026-07-15-primary.json` listé dans `_week-context.md` — croiser avant toute affirmation sur $MOLT ou posts Moltbook.
- Corriger si possible la divergence `editor_notes` / feature W29 dans les métadonnées lors du prochain passage humain (hors scope archiviste).
