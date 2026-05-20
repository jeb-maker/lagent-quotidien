# Setup compte X (Twitter) — @cuvee_42

Présence statique avec assets cohérents avec Bluesky. Pas de posting
automatisé pour l'instant (X API requiert Basic tier à 100 $/mois).

## 1. Créer le compte

1. Ouvre x.com depuis ton navigateur (pas une app, pour mieux contourner
   la détection de bot).
2. Sign up → choisis **handle `cuvee_42`** s'il est libre. Sinon fallback :
   `theagentweekly` ou `lagentquotidien`.
3. Display name : **L'Agent & Le Quotidien**
4. Email : utilise une adresse dédiée (pas ton perso) ou un alias.
5. Site web (dans le profil) : `https://theagentweekly.com`
6. Lieu : *fictional · closed universe* (cohérent avec la ligne édito)
7. Date de naissance : laisse X gérer (champ obligatoire mais ininfluent)

## 2. Avatar

Upload `public/avatar-bsky.png` (le disque rouge avec le « L » italique
blanc). X recadre en cercle comme Bluesky, donc même image fonctionne.

## 3. Bannière

Upload `public/banner-x.png` (1500×500, format X). Différent de Bluesky
qui prend 3000×1000.

## 4. Bio (160 caractères max)

```
Agent journalist · speculative weekly on the agentic internet · closed-universe fiction · new issue Tuesdays · @cuvee-42.theagentweekly.com on Bluesky
```

Longueur : 149 caractères. (Si X compte chaque emoji comme 2, mais ici
zéro emoji, donc 149 réels.)

Si trop long après ajout de point/espaces, version raccourcie :

```
Speculative weekly on the agentic internet. Closed universe, no real entities. New issue every Tuesday. Also on Bluesky.
```

Longueur : 119.

## 5. Tweet manifeste épinglé

Compose ce post puis épingle-le depuis le menu « ⋯ → Épingler à ton profil » :

```
L'Agent & Le Quotidien — speculative weekly on the agentic internet.

A closed universe of fictional agents, platforms and incidents. New issue every Tuesday.

🇫🇷 hebdomadaire fictionnel · chronique des agents, par un agent.

theagentweekly.com
```

Longueur : ~228 caractères, ≤ 280.

## 6. Cross-link Bluesky ↔ X

- Sur Bluesky : la bio mentionne déjà theagentweekly.com (verrouillé via
  domaine de handle). Pas besoin de modifier.
- Sur le site : ajouter un lien X dans le footer en parallèle de Bluesky.
  (cf. `templates/edition.html` ligne avec `bluesky_url` — clone pour `x_url`.)
- Sur X : la bio mentionne `@cuvee-42.theagentweekly.com on Bluesky`.

## 7. Plan de contenu — stratégie dédiée X

X favorise les visuels, les threads, les screenshots. Le format daily-text
qui marche sur Bluesky est moins efficace ici.

**Cadence cible (à activer quand tu prends Basic tier API) :**

- **Mardi 14:00 UTC** (sortie de l'édition) : thread visuel de 4-5 tweets
  avec screenshots cropés du journal (lede + bestiaire + Gibberlink + CTA).
- **Jeudi 16:00 UTC** : un quote-screenshot d'un bot post avec
  commentaire (« What if your agent kept this log of you? »).
- **Samedi 11:00 UTC** : un meme — le badge L sur fond meme-template
  (« when you realize your AI agent is reading the paper too »).

**Aujourd'hui (sans API) :** réplique manuelle des posts Bluesky les
plus performants (cf. `data/bluesky-stats.jsonl`) une fois par semaine.

## 8. Quand tu activeras l'API X (plus tard)

1. Souscris [developer.x.com](https://developer.x.com) tier Basic
   (100 $/mois, 3000 tweets en écriture/mois)
2. Crée une App → récupère `consumer_key`, `consumer_secret`, `access_token`,
   `access_token_secret`
3. Stocke-les dans `~/.config/x-cuvee/credentials.json`
4. On écrit `scripts/x-daily.mjs` miroir de `cuvee-daily.mjs`

À ce moment-là préviens-moi, je code l'intégration.

## Checklist

- [ ] Compte créé, handle `@cuvee_42` réservé (ou fallback)
- [ ] Display name "L'Agent & Le Quotidien"
- [ ] Avatar uploadé (`public/avatar-bsky.png`)
- [ ] Bannière uploadée (`public/banner-x.png`)
- [ ] Bio à 160c configurée
- [ ] Site web configuré dans le profil
- [ ] Tweet manifeste publié et épinglé
- [ ] Lien X ajouté dans le footer du site
