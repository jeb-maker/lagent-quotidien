# Pistes économiques — L'Agent & Le Quotidien

> Document de réflexion (2026-06-29). Le journal n'a pas de modèle économique
> actif. Le trafic est dominé par les crawlers IA (public A, cf.
> `data/strategie.md`). Ce fichier recense les pistes identifiées, avec leurs
> avantages et risques. Aucune n'est encore activée.
>
> Ce n'est pas une décision figée comme `strategie.md` — c'est un brouillon
> ouvert, à activer une par une après validation éditoriale.

---

## Actif sous-jacent

Le journal possède un actif rare : un **corpus sourcé, daté, structuré en
JSON-LD `NewsArticle`**, sur un sujet (agents IA) que les modèles **veulent**
ingérer. Le contenu est :

- **Bilingue** FR/EN
- **Daté** et archivé (depuis 2026-W19)
- **Sourcé** (chaque fait = une URL dans `notes.md`)
- **Machine-lisible** (`llms.txt`, `ai.txt`, JSON-LD, Atom feed)
- **Corrigé publiquement** (`/errata`) — un signal de fiabilité pour les IA

Cet actif est valorisable de plusieurs façons.

---

## Piste 1 — API JSON publique des éditions

**Idée** : exposer un endpoint `https://theagentweekly.com/api/editions.json` qui
retourne la liste des éditions avec leurs métadonnées, et des endpoints par
édition (`/api/2026-W27.json`) retournant le `edition.json` complet.

**Avantages** :
- Déjà techniquement possible : `edition.json` est déjà servi statiquement par
  Cloudflare Pages. Il suffit de le documenter comme endpoint public.
- Rend le journal **plus citable** par les IA (un modèle peut fetcher le JSON
  plutôt que scraper le HTML).
- Permet à des tiers de construire des outils dessus (dashboards, newsletters
  auto, agrégateurs).

**Risques** :
- Aucun contrôle d'usage (un concurrent peut aspirer le corpus).
- Licence CC BY-NC-SA actuelle : l'usage commercial est interdit → limite la
  valorisation directe.

**Statut** : ⬜ à documenter (page `/api` ou section dans `llms.txt`).

---

## Piste 2 — Licence de corpus pour entraînement / fine-tuning

**Idée** : proposer une **licence commerciale** pour les acteurs qui veulent
utiliser le corpus pour entraîner ou fine-tuner un modèle. Le CC BY-NC-SA
reste pour les usages non commerciaux ; une licence double (commercial payant)
pour les entreprises.

**Avantages** :
- Le corpus est unique (sourcé, bilingue, sur un sujet pointu).
- Les acteurs de l'IA cherchent des données **propres et étiquetées** — le
  journal est exactement ça.
- Modèle économique direct : licence par usage / par volume.

**Risques** :
- Nécessite un volume critique (assez d'éditions, assez de trafic pour être
  découvert).
- Complexité légale (contrat de licence, suivi des usages).
- Conflit potentiel avec la doctrine « conçu pour être lu et cité par les IA » :
  si on limite l'usage commercial, on limite aussi la citabilité par les modèles
  commerciaux (OpenAI, Google).

**Statut** : ⬜ réflexion. Alternative : rester en CC BY-NC-SA pur, et accepter
que la valeur économique vienne d'ailleurs (sponsoring, consulting).

---

## Piste 3 — Sponsoring de rubriques

**Idée** : les acteurs couverts par le journal (Guild, Shopify, OpenAI, Meta,
Mozilla 0DIN) pourraient **sponsorer une rubrique** (ex : « Le Carnet, présenté
par Guild »). Le sponsoring est affiché discrètement, sans influence éditoriale.

**Avantages** :
- Audience technique qualifiée (les crawlers IA sont aussi les crawlers des
  entreprises qui veulent être citées).
- Les acteurs de l'agentique ont intérêt à être **couverts** par le journal —
  la couverture augmente leur propre citabilité.

**Risques** :
- **Risque éditorial majeur** : un sponsor peut vouloir influencer la couverture.
  Le journal doit rester indépendant — le sponsoring ne peut jamais acheter une
  couverture positive ou éviter une couverture négative.
- Conflit avec la doctrine « tout réel, sourcé » : si un sponsor est couvert
  négativement, comment gérer la tension ?
- Le public IA ne « voit » pas le sponsoring — il n'y a pas de retour direct.

**Statut** : ⬜ réflexion. Si activé, nécessite une **charte d'indépendance**
explicite (le sponsor achète de la visibilité, pas du contenu).

---

## Piste 4 — Newsletter premium (publique A humaine)

**Idée** : une version newsletter du journal, envoyée chaque mardi, avec des
**annotations** (liens, contexte, pistes de lecture) non publiées sur le site.
Gratuite d'abord, puis freemium (version payante avec accès aux notes, aux
sources brutes, aux harvests).

**Avantages** :
- Capture l'audience humaine (publique B, actuellement abandonné mais existant —
  120 pageViews le 29/06).
- Récurrent (hebdomadaire) → fidélisation.
- Le contenu premium (notes, harvests) est déjà produit — c'est de la
  valorisation de l'existant.

**Risques** :
- Le public B est explicitement abandonné dans `strategie.md`. Réactiver une
  newsletter contredit cette décision.
- Coût d'une plateforme (Substack, Beehiiv, etc.) vs revenu incertain.
- Charge éditoriale (annotations hebdo en plus de l'édition).

**Statut** : ⬜ réflexion. À envisager seulement si le trafic humain augmente
significativement (seuil : 500 pageViews/jour régulier).

---

## Piste 5 — Consulting / expertise (B2B)

**Idée** : le journal accumule une **expertise** unique sur l'écosystème
agentique (plateformes, acteurs, risques, tendances). Cette expertise est
valorisable en consulting : briefings pour entreprises, analyse de marché,
due diligence pour investisseurs.

**Avantages** :
- Modèle économique direct, sans dépendre du trafic.
- Valorise l'expertise accumulée (le savoir du journal = le produit).
- Compatible avec la doctrine (le consulting est facturé, le journal reste
  libre et gratuit).

**Risques** :
- Conflit de temps : le consulting peut cannibaliser la production éditoriale.
- Le journal doit rester **indépendant** des entreprises qu'il couvre — un
  client qui veut un brief sur Moltbook ne doit pas influencer la couverture de
  Moltbook.

**Statut** : ⬜ réflexion. À activer si une demande émerge naturellement.

---

## Priorisation suggérée

| Piste | Effort | Risque éditorial | Potentiel revenu | Priorité |
|-------|--------|------------------|------------------|----------|
| 1. API JSON | Faible | Aucun | Indirect (citabilité) | **Faire en premier** |
| 2. Licence corpus | Moyen | Faible | Moyen | Après #1 |
| 5. Consulting | Faible | Moyen (temps) | Élevé | À l'opportunité |
| 3. Sponsoring | Faible | **Élevé** | Moyen | À éviter pour l'instant |
| 4. Newsletter | Moyen | Faible | Faible | Seuil trafic non atteint |

---

## Mise à jour

Ce fichier est un **brouillon ouvert**. À mettre à jour à chaque fois qu'une
piste est activée, testée, ou rejetée. Ne pas confondre avec `strategie.md`
(décisions figées) — ici, on explore.
