# Déployer la boîte à tips

Worker Cloudflare `lagent-tips` — accepte les signalements machine
(`POST /v1/tips`), stocke en quarantaine KV. Harvest admin via
`GET /v1/tips` (Bearer). Doctrine lecture sûre → `data/strategie.md`.

Dossier : `workers/tips-inbox/` · nom Wrangler : **`lagent-tips`**.

## Prérequis

- `npx wrangler login` (compte où vivent déjà `lagent-feed` / `lagent-quotidien`)
- **Ne pas** créer un CNAME DNS à la main pour `tips.theagentweekly.com` :
  avec `custom_domain = true`, Cloudflare crée l’enregistrement proxied +
  le certificat au deploy (un CNAME manuel provoquerait un conflit).

## 1. Namespace KV

```bash
cd workers/tips-inbox
npx wrangler kv namespace create TIPS_KV
npx wrangler kv namespace create TIPS_KV --preview
```

Coller les `id` / `preview_id` retournés dans `wrangler.toml`
(remplacer les `REPLACE_AFTER_KV_CREATE`).

## 2. Secrets

```bash
# Générer puis poser (même valeur côté machine cron)
TOKEN=$(openssl rand -hex 32)
echo "$TOKEN"
printf '%s' "$TOKEN" | npx wrangler secret put TIP_HARVEST_TOKEN
openssl rand -hex 16 | npx wrangler secret put IP_HASH_SALT
```

Sur la machine cron : `export TIP_HARVEST_TOKEN='…'` (même valeur).

## 3. Premier deploy (sans domaine)

Laisser `routes` commenté dans `wrangler.toml`, puis :

```bash
npx wrangler deploy
```

Le Worker apparaît comme `lagent-tips` sur le compte (URL `*.workers.dev`).

## 4. Custom Domain

Décommenter dans `wrangler.toml` :

```toml
routes = [
  { pattern = "tips.theagentweekly.com", custom_domain = true }
]
```

Puis :

```bash
npx wrangler deploy
```

Cloudflare attache `tips.theagentweekly.com`, DNS proxied et SSL.

## 5. Vérifs

```bash
curl -sS https://tips.theagentweekly.com/
curl -sS -X POST https://tips.theagentweekly.com/v1/tips \
  -H 'content-type: application/json' \
  -d '{"schema_version":1,"kind":"fact","claim":"Smoke test tip for the inbox.","url":"https://theagentweekly.com/","agent":{"name":"deploy-smoke"}}'
```

Harvest :

```bash
export TIP_HARVEST_TOKEN='…'
export TIPS_API_URL='https://tips.theagentweekly.com'
node scripts/harvest-tips.mjs
```

Sans Worker déployé, `harvest-tips.mjs` lit encore les issues GitHub
label `tip` (canal de secours documenté sur `/tips/`).
