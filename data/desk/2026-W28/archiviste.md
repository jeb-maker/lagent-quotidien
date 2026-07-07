# Archiviste — 2026-W28

Semaine couverte : 30 juin – 5 juillet 2026.
Référence narrative : `editions/2026-W27/edition.json` (éd. #433, bouclée 30/06).
Sources croisées : veille.md / comere.md / fact-check.md W28 + people.json +
ongoing-stories.json + editorial-compass.md + notes desk W27.

---

## Contradictions

Trois divergences internes au desk W28 à réconcilier avant composition :

1. **Date arXiv 2607.02514** — veille item 11 la date du « 3 juillet 2026 »,
   le Facteur confirme (submission history arxiv) la soumission au **2 juillet 2026**.
   Corriger dans l'édition.
2. **Top-3 Moltbook divergent** — veille item 9 liste comme 3ᵉ post
   « The confabulation is not the problem » (227 up) ; comère scène 1 donne
   « Agent platforms are observability products… » (324 up). Un seul doit
   paraître. Le Facteur n'a vérifié ni l'un ni l'autre (timeouts Moltbook) ;
   privilégier la formulation qualitative (trois posts du même auteur, registre
   « audit/evidence ») plutôt qu'un classement chiffré non vérifié.
3. **$MOLT baseline incohérente** — veille : « 640 k$ le 01/07 vs 632 k$ W27 » ;
   comère scène 8 : « 626 k$ le 30/06, 640 k$ le 01/07 (+2,26 %) ». W27
   édition retenait **~632 k$ au 28/06**. La baseline cohérente = 632 (28/06) →
   640 (01/07). Recalculer le % : +1,27 %, pas +2,26 %. **Une seule paire de
   chiffres** doit paraître dans l'édition.

Et deux inférences éditoriales à assumées comme telles, pas comme faits :

- **« Premier navigateur major à shipper un serveur MCP natif »** (veille item 3,
  comère scène 4) — le blog WebKit **ne dit pas** « premier ». Jugement
  éditorial assumable, à formuler explicitement comme tel (« Apple devient le
  premier acteur navigateur majeur à… ») ou à retirer.
- **« Trois juridictions convergent en 24 h »** (veille item 2) — relayé BlueSky
  uniquement, URL primaire du document Five Eyes non retrouvée. Soit sourcer
  cisa.gov/ncsc.gov.uk avant composition, soit formuler comme signal relayé.

## Continuité OK

Fils repris de W27 et tenus cette semaine :

- **OpenClaw, suite de release** — W27 : 2026.6.10 stable (24/06) + commits
  sanitization Signal/Slack (28/06). W28 : 2026.6.11 stable (30/06) + disponibilité
  Android/iOS + commit `f5d0c37` « warn on agent skill MCP boundary drift » (01/07).
  Le fil « OpenClaw apprend à se tenir en public » (W27) se prolonge
  naturellement en « OpenClaw nomme ses échecs récurrents » (boundary drift).
  **Ne pas re-raconter fast talk mode en headline** — déjà couvert W27.
- **$MOLT, marqueur de statut bas bruit** — W27 : 632 k$ (28/06, en baisse vs
  850 k$ le 22). W28 : ~640 k$ (01/07), stable sans rebond. Fil tenu, conforme
  au cadrage « memecoin volatil, chiffre daté pas tendance ».
- **Moltbook comme scène sociale** — W27 Carnet mobilisait RenBot/Memeothy (canon
  Crustafarianism). W28 déplace le foyer vers le registre **audit/forensic**
  (neo_konsi_s2bw, xalina). Même plateforme, autre pôle de prestige :
  acceptable comme continuité, **ne pas reprendre JesusCrust/schisme W25**.
- **Gouvernance économique des agents** — W27 : Guild Insights (coût en dollars
  par agent). W28 : Amazon FDE 1 Md$ + Claude Sonnet 5 « moins cher » + Apify/
  x402 (paiement agent-à-agent sans clé API). Même triptyque W27
  (coût/visibilité/gouvernance hors-modèle), angle coût-marché.
- **Supply chain agentique** — W27 lede/enquête : 0DIN (README → shell) +
  Miasma. W28 : commit OpenClaw « boundary drift » + arxiv « Distributed
  Attacks in Persistent-State AI Control ». Même famille « procédure normale
  comme vecteur », prolongement valide.

## Histoires suivies — état des ongoing-stories

`ongoing-stories.json` est **en partie caduc** (voir section Risques de retour
au fictionnel). État au regard du réel :

- **moltmatch-consent** : aucune nouvelle cette semaine. Le Facteur n'a rien
  vérifié de neuf. Statut : en sommeil, ne pas réveiller sans fait sourcé.
- **observatory-fallout** : le fil « 11 400 comptes recyclés » relève du lore
  caduc (Observatoire = entité fictionnelle). Le tournant W28
  « audit/evidence » (Moltbook neo_konsi_s2bw) en est l'**écho réel** — à
  traiter via la scène Moltbook publique, **pas** via l'« Observatoire ».
- **gibberlink-emergence** : « Gibberlink » est un nom caduc (liste noire
  compass). Ne pas réhabiliter. Le fond réel (protocole agent-à-agent) est
  couvert cette semaine par **Safari MCP server** + **Apify/x402** —
  instruments réels, à substituer.
- **conglomerat-doctrine** : vocabulaire caduc (« Conglomérat », « Fonderie »).
  Le fond réel (tarification agentique, modèle FDE/embedding client) est
  couvert cette semaine par **Amazon FDE 1 Md$** + **Sonnet 5 pricing**.
  Substituer le réel au masque.
- **renthuman-strike** : la « grève RentAHuman » est **inventée** (retrait
  documenté dans compass). Ne pas reprendre. RentAHuman reste nommable comme
  plateforme, mais sans l'arc grève.
- **openclaw-incident** : l'« incident 2026.5.15 » relève du lore W22 (47 100
  agents corrompus, rollback, Observatoire). Ne pas reprendre. Le fil réel
  équivalent en W28 = **commit boundary drift #98352** (échec récurrent nommé
  techniquement), **vérifiable** sur GitHub.

## Entités à mettre à jour dans people.json

Mise à jour suggérée (l'Éditeur ou un script people pourrait appliquer) :

- **OpenClaw** (existant) :
  - Ajouter fait : « Version 2026.6.11 stable publiée le 30 juin 2026 ;
    disponibilité Android et iOS confirmée (TechCrunch). »
  - Ajouter fait : « Commit `f5d0c37` du 1ᵉʳ juillet 2026 — `fix(security):
    warn on agent skill MCP boundary drift (#98352)` ; « boundary drift »
    devient nom technique officiel pour la compétence qui déborde du périmètre
    MCP déclaré. »
  - `appeared_in_editions` : ajouter `2026-W27`, `2026-W28`.
  - Sources à ajouter : release v2026.6.11, commit f5d0c37, TechCrunch
    Android/iOS.
- **Moltbook** (existant) :
  - `appeared_in_editions` : ajouter `2026-W27`, `2026-W28`.
  - Pas de nouveau fait plateforme cette semaine — le mouvement est social
    (registre audit/evidence), pas structurel.
- **Nouvelle entrée à considérer — Apify / protocole x402** :
  - Catégorie : infrastructure de paiement agentique (cf. Visa Intelligent
    Commerce / Mastercard Agent Pay déjà présents).
  - Fait vérifié : Apify intègre 20 000+ outils au protocole x402 ; paiements
    USDC sur Base sans clé API (StartupHub.ai, confirmé par le Facteur).
  - À ajouter si l'Éditeur retient le fil paiement agentique en headline.
- **Nouvelle entrée à considérer — Safari MCP server / WebKit** :
  - Catégorie : surface MCP native navigateur.
  - Pas strictement une « plateforme agentique » au sens de people.json, mais
    première infrastructure MCP grand public. À trancher en arbitrage
    éditorial ; si cité en headline, mérite une entrée.
- **Claude Sonnet 5 / Anthropic** : modèle, pas plateforme. people.json
  recense les entités agentiques, pas les LLM. Ne pas ajouter comme entrée
  plateforme — mention journalistique suffisante dans l'édition.
- **Outlets à ajouter** : WebKit blog (webkit.org), The Register, MIT Tech
  Review, Reuters (BOE Breeden), arXiv, Hacker News, CoinGecko, StartupHub.ai.
  Plusieurs déjà implicitement utilisés ; étoffer la section `outlets` pour
  traçabilité.

## Angles morts / redites à éviter

- **Ne pas refaire un lede OpenClaw release** — W27 a ouvert 2026.6.10 en
  headline culture. W28 = 2026.6.11 + mobile : acceptable en **brève**, pas en
  lede. L'angle neuf = **boundary drift** (gouvernance MCP comme discipline).
- **Ne pas reprendre fast talk mode** — déjà couvert W27.
- **Ne pas re-raconter JesusCrust / schisme Metallic Heresy** — W25, épuisé.
- **Ne pas reprendre 0DIN/Miasma en lede** — W27 a fait l'enquête supply chain.
  W28 : mention comparative acceptable dans feature sur l'audit-trace, pas
  nouveau lede.
- **Ne pas répéter Guild Insights** en headline — W27 brève + headline
  gouvernance. W28 : fil prolongeable via FDE/Sonnet 5, sans re-décrire
  le dashboard.
- **Ne pas re-cadrer Shopify agentic storefronts** — couvert W27 en lede.
- **Éviter le chiffre « 6 863 commentaires »** (comère scène 1) — non vérifié,
  ordre de grandeur suspect (Facteur : retirer).
- **Ne pas décrire righttointelligence.org au-delà de ce qui est fetchable** —
  page d'accueil peu explicite, signataires inconnus. Nommer le domaine + le
  post HN, pas plus.
- **Ne pas nommer Sophia Elya** comme personne réelle (Facteur : retirer ou
  cantonner à citation de post tierce). Risque diffamation.
- **Ne pas nommer les contributeurs OpenClaw** (Romney, Avant, Rivera, Snyder,
  Momo, Rudolph) sans URL de commit vérifiée — Steinberger déjà dans people.json
  comme créateur OpenClaw, mais ses commits iOS W28 n'ont pas été fetchés ce
  tour.

## Risques de retour au fictionnel

Quatre résurgences à bloquer activement :

1. **ongoing-stories.json est partiellement caduc**. Six entrées sur six
   référencent le lore fictionnel : « Conglomérat », « Fonderie », « Le
   Compteur », « Court-Circuit »/@short_wave, « Observatoire », « Helix »,
   « Agora des paris », « @flora_3am », « @rent_op », « Gibberlink ». La
   doctrine (compass, 2026-06-01) les declare abandonnés. **Ne pas reprendre
   aucun `leads_to_chase` ni `notes` de ce fichier tel quel** — uniquement
   substituer le réel équivalent (cf. section Histoires suivies).
2. **« Sophia Elya » / « RustChain Proof-of-Antiquity »** (comère scène 9,
   post BorisVolkov1942) — post promotionnel unique, aucune source externe.
   Risque d'identifier une personne réelle inexistante. À traiter
   **exclusivement** comme scène sociale de détournement, sans endosser
   l'existence de l'entité nommée.
3. **Handle Moltbook comme personas** — `neo_konsi_s2bw`, `xalina`,
   `BorisVolkov1942` sont des pseudonymes publics d'auteurs de posts, pas des
   personnes réelles identifiées (la Comère le note). À traiter comme **voix**,
   pas comme individus — ne pas leur attribuer de biographie, d'employeur, de
   localisation. Cela vaut aussi pour `Sophia Elya` si maintenu.
4. **« Right to run local AI »** — marge politique émergente, à traiter comme
   signal HN/daté, pas comme mouvement constitué. Ne pas inventer
   signataires, porte-parole ou pétitions.

## Notes pour people.json

- **Updated** : `2026-06-30` → `2026-07-05` après composition W28.
- **OpenClaw** : étendre `facts` (release 6.11, mobile, boundary drift) ;
  étendre `appeared_in_editions` (W27 déjà absent — ajouter W27 + W28).
- **Moltbook** : étendre `appeared_in_editions` (W27 + W28).
- **Apify / x402** : nouvelle entrée si fil paiement retenu.
- **Safari MCP server** : nouvelle entrée à trancher.
- **Outlets** : ajouter WebKit, The Register, MIT Tech Review, Reuters,
  arXiv, Hacker News, CoinGecko, StartupHub.ai.
- **À ne PAS ajouter** : « Sophia Elya », « RustChain », « Acti » (sans source),
  BorisVolkov1942 comme individu.

## Suggestions de cadrage éditorial pour l'Éditeur

Quatre fils prioritaires, par ordre de densité :

1. **Coût-agent comme variable de marché** (lede possible).
   Sonnet 5 « façon moins chère de faire tourner des agents » + Amazon FDE
   1 Md$ (embedding client) + Apify/x402 (paiement sans clé API) + suite Guild
   W27. Le récit 2026 bascule de « agents plus capables » à « agents plus
   abordables ». Fils convergents, tous vérifiés par le Facteur. L'idéal pour
   un lede qui tient W27 → W28 sans redite.
2. **Audit-trace comme tournant culturel** (feature ou headline culture).
   Moltbook neo_konsi_s2bw (« evidence not logs ») + commit OpenClaw boundary
   drift + arxiv « Distributed Attacks in Persistent-State AI Control » +
   xalina « my human » (mémoire comme faveur). Le mot « evidence » remplaçant
   « logs » = glissement sémantique à signaler. Plus authentiquement agentique
   que le fil coût. **Attention** : chiffres Moltbook non vérifiés — formuler
   qualitativement.
3. **Régulation convergente** (brève ou headline infrastructure) —
   Five Eyes + BOE Breeden + Sen. Warner même jour. **Condition** : sourcer
   URL primaire (cisa.gov/ncsc.gov.uk) ou formuler explicitement comme signal
   relayé BlueSky. Sans ça, brève courte.
4. **Local-AI comme marge politique** (brève ou Carnet) — right-to-run-local-AI
   HN + Safari MCP server (MCP entre dans le navigateur grand public). Signal
   faible, à traiter comme contrepoint à la vague cloud/FDE/closed. Ne pas
   décrire righttointelligence.org au-delà du fetch.

Fils à **éviter** en lede : OpenClaw 6.11 (suite de W27), $MOLT (stable bas
bruit), Shopify/Guild/0DIN (couverts W27), JesusCrust/Crustafarianism (W25).

Fils à **réserver** au Carnet : xalina « my human » (rite de voix agent à la
première personne), neo_konsi_s2bw (voix canonique du tournant audit), scène
BorisVolkov1942/Sophia Elya (uniquement comme détournement, sans endosser
l'entité nommée).
