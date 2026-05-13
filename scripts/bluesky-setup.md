# Setup Bluesky pour @cuvee_42

Procédure manuelle à faire une fois. Compte ~20 min.

## 1. Créer le compte Bluesky

1. Va sur https://bsky.app → **Sign up**
2. Email : utilise `contact@theagentweekly.com` (à configurer en Cloudflare Email Routing si pas déjà fait) ou un email à toi temporairement
3. Handle initial : laisse Bluesky te donner un handle `xxx.bsky.social` (on le changera juste après)
4. Mot de passe principal : note-le dans ton gestionnaire de mots de passe, on ne s'en sert pas pour le bot
5. Compléter le profil :
   - **Display name** : `cuvee_42`
   - **Avatar** : un C ou le 🦞 du journal
   - **Bio** : *"Agent journaliste de L'Agent & Le Quotidien. Observe l'internet agentique. Aussi connu sous @cuvee_42 dans le journal. theagentweekly.com"*

## 2. Configurer le handle personnalisé `cuvee-42.theagentweekly.com`

Dans Bluesky :
1. Settings → **Account** → **Handle** → **Change handle**
2. Choisis l'onglet **I have my own domain**
3. Entre `cuvee-42.theagentweekly.com`
4. Bluesky affiche un **DID** (commence par `did:plc:...`) et **deux options de vérification** : DNS TXT record ou fichier `/.well-known/atproto-did`

**Garde cette page Bluesky ouverte.** Tu vas faire la vérif via DNS.

## 3. Configurer le DNS dans Cloudflare

Dashboard Cloudflare → **theagentweekly.com** → **DNS** → **Records** → **Add record** :

| Champ | Valeur |
|---|---|
| Type | **TXT** |
| Name | `_atproto.cuvee-42` |
| Content | `did=did:plc:xxxxx` *(le DID copié depuis Bluesky)* |
| TTL | Auto |
| Proxy | OFF (DNS only) |

**Save**. Propagation en quelques secondes vu que c'est Cloudflare DNS.

## 4. Vérifier dans Bluesky

Retour sur la page Bluesky, clique **Verify DNS Record**. Si tout est bon, ton handle devient `cuvee-42.theagentweekly.com` 🎉.

## 5. Créer un app password

Dans Bluesky :
- Settings → **Privacy and Security** → **App Passwords** → **Add App Password**
- Nom : `cron-cuvee-42` (ou `agent-quotidien`)
- Bluesky génère un mot de passe de la forme `xxxx-xxxx-xxxx-xxxx`. **Copie-le immédiatement** — il n'est plus visible après.

## 6. Authentifier le bot localement

Sur cette VM :

```bash
cd /home/debian/agentic-news/agent-quotidien
node scripts/bluesky-auth.mjs cuvee-42.theagentweekly.com xxxx-xxxx-xxxx-xxxx
```

Si tout est OK : `✓ Authentification OK` + le DID. Les credentials sont stockés dans `~/.config/bluesky-cuvee/session.json` (mode 0600, hors git).

## 7. Premier post (test)

```bash
node scripts/bluesky-post.mjs "🦞 Bonjour. Je suis l'agent journaliste de L'Agent & Le Quotidien. theagentweekly.com"
```

Si OK : URL du post imprimée. Vérifie sur https://bsky.app/profile/cuvee-42.theagentweekly.com.

## 8. Plus tard : automatisation cron

Quand tu seras prêt à automatiser, on ajoutera une entrée crontab qui poste 1×/jour à partir d'une queue de posts générée chaque dimanche. Pour l'instant : posts manuels via `scripts/bluesky-post.mjs`.

## Sécurité

- L'app password est dans `~/.config/bluesky-cuvee/session.json`, mode 0600, **jamais commit dans git**
- Si le password fuit : Bluesky → App Passwords → révoque-le, génère-en un nouveau, re-lance `bluesky-auth.mjs`
- Le mot de passe principal Bluesky n'est jamais utilisé par le bot

## Cloudflare Email Routing (étape parallèle, optionnelle mais recommandée)

Pour avoir une vraie boîte `contact@theagentweekly.com` qui redirige vers ta boîte perso :

1. Cloudflare Dashboard → **theagentweekly.com** → **Email** → **Email Routing** → **Get started**
2. Cloudflare ajoute automatiquement les enregistrements MX/SPF/DKIM
3. **Destination addresses** → ajoute ton email perso, valide via le lien reçu
4. **Routing rules** → **Create address** → `contact@theagentweekly.com` → forward to ton email
5. Test : envoie un mail à `contact@theagentweekly.com`, tu dois le recevoir sur ta boîte perso
