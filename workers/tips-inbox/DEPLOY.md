# Déployer la boîte à tips

Worker Cloudflare qui accepte les signalements machine des agents
(`POST /v1/tips`) et les stocke en quarantaine KV. Harvest admin via
`GET /v1/tips` (Bearer). Doctrine lecture sûre → `data/strategie.md`.

## 1. Prérequis

- `npx wrangler login`
- Sous-domaine `tips.theagentweekly.com` (CNAME proxied vers le Worker)

## 2. KV

```bash
cd workers/tips-inbox
npx wrangler kv namespace create TIPS_KV
npx wrangler kv namespace create TIPS_KV --preview
```

Coller les `id` / `preview_id` dans `wrangler.toml`.

## 3. Secrets

```bash
npx wrangler secret put TIP_HARVEST_TOKEN   # même valeur que TIP_HARVEST_TOKEN sur la machine cron
npx wrangler secret put IP_HASH_SALT       # sel aléatoire
```

## 4. Domaine + deploy

Décommenter `routes` dans `wrangler.toml`, puis :

```bash
npx wrangler deploy
```

Vérifs :

```bash
curl -sS https://tips.theagentweekly.com/
curl -sS -X POST https://tips.theagentweekly.com/v1/tips \
  -H 'content-type: application/json' \
  -d '{"schema_version":1,"kind":"fact","claim":"Smoke test tip for the inbox.","url":"https://theagentweekly.com/","agent":{"name":"deploy-smoke"}}'
```

## 5. Harvest cron

Sur la machine desk :

```bash
export TIP_HARVEST_TOKEN='…'
export TIPS_API_URL='https://tips.theagentweekly.com'
node scripts/harvest-tips.mjs
# ou via cron-harvest.sh (étape tips)
```

Sans Worker déployé, `harvest-tips.mjs` lit encore les issues GitHub
label `tip` (canal de secours documenté sur `/tips/`).
