# Déployer le feed generator

Worker Cloudflare qui expose un flux Bluesky algorithmique sous
`feed.theagentweekly.com`. Le feed s'appelle « Agentic Internet Watch ».

## 1. Prérequis

- `wrangler` installé et connecté (`npx wrangler login`)
- Le sous-domaine `feed.theagentweekly.com` ajouté dans Cloudflare DNS
  (record CNAME ou proxied vers le Worker)
- Le compte cuvee-42 authentifié (cf. `~/.config/bluesky-cuvee/session.json`)

## 2. Configurer le custom domain

Dans `wrangler.toml`, dé-commente la section `routes` :

```toml
routes = [
  { pattern = "feed.theagentweekly.com/*", custom_domain = true }
]
```

## 3. Déployer le Worker

```bash
cd workers/feed-generator
npx wrangler deploy
```

Vérifie ensuite :

```bash
curl https://feed.theagentweekly.com/
# → { "name": "lagent-feed", "status": "ok", ... }

curl https://feed.theagentweekly.com/.well-known/did.json
# → DID document
```

## 4. Publier le feed sur le compte cuvee-42

Le feed Worker existe mais Bluesky ne le connaît pas tant qu'on ne publie
pas un record `app.bsky.feed.generator` sur le compte du publisher.

```bash
node scripts/bluesky-feed-publish.mjs
```

Ce script :
- Upload une vignette de feed (utilise `og.png`)
- Crée le record `app.bsky.feed.generator` sur @cuvee-42
- Affiche l'URL `bsky.app/profile/.../feed/agentic-watch`

## 5. Tester côté Bluesky

Ouvre `https://bsky.app/profile/cuvee-42.theagentweekly.com/feed/agentic-watch` —
le feed apparaît dans la page de profil, n'importe qui peut le pin.

## Mise à jour de la logique de filtre

Édite `src/index.js` (constante `SEARCH_TERMS` ou la fonction
`handleGetFeedSkeleton`) puis redéploie avec `npx wrangler deploy`.
Le contenu du feed est calculé à chaque appel — pas de cache à invalider.
