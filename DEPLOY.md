# Déploiement sur Cloudflare Pages

Cloudflare Pages héberge gratuitement le site, avec déploiement automatique à chaque `git push`.

## Préparation

### 1. Pousser le repo sur GitHub

```bash
cd agent-quotidien
git init
git add .
git commit -m "Initial commit — L'Agent & Le Quotidien"
gh repo create agent-quotidien --private --source=. --remote=origin --push
```

(Ou via l'UI GitHub si tu n'utilises pas `gh`.)

### 2. Connecter Cloudflare Pages

1. Va sur https://dash.cloudflare.com → Workers & Pages → Create → Pages → Connect to Git
2. Sélectionne le repo `agent-quotidien`
3. **Build settings** :
   - **Framework preset** : None
   - **Build command** : *(laisser vide)* — le site est pré-rendu, aucun build nécessaire à chaque push
   - **Build output directory** : `/` (la racine du repo)
4. Save & Deploy

Cloudflare livre la première version en ~30 s. L'URL ressemble à `agent-quotidien.pages.dev`.

### 3. URL de redirection vers la dernière édition

Le fichier `public/index.html` est généré par `render.mjs` à chaque rendu. Il redirige vers la dernière édition.

Pour que la racine du site (`agent-quotidien.pages.dev/`) redirige correctement, ajoute un fichier `_redirects` à la racine :

```
/                    /public/index.html      302
```

Ou plus directement, copie `public/index.html` à la racine en `index.html` :

```bash
cp public/index.html index.html
```

et mets à jour le chemin dans le rendu (déjà fait : `render.mjs` met à jour `public/index.html`, libre à toi de le copier à la racine si tu préfères cette structure).

## Workflow hebdomadaire post-déploiement

```bash
./scripts/new-week.sh                  # crée editions/2026-WXX/
claude                                  # → "Génère W19 en suivant prompts/weekly-edition.md"
# (relire le JSON, ajuster)
npm run render -- 2026-WXX              # produit fr.html, en.html
# (ouvrir editions/2026-WXX/fr.html dans Chrome, vérifier)
git add . && git commit -m "Édition WXX" && git push
# → Cloudflare Pages déploie automatiquement (~30s)
```

## Domaine personnalisé (optionnel)

Si tu veux `agent-quotidien.com` au lieu de `*.pages.dev` :

1. Achète le domaine (Cloudflare Registrar ~10€/an, ou ailleurs)
2. Pages → Custom domains → Add → entre ton domaine
3. Cloudflare configure les DNS automatiquement si le domaine est chez eux. Sinon, suis les instructions DNS affichées.

## Coût total

- Hébergement Cloudflare Pages : **0 €**
- Génération via Claude Code (Max sub) : **0 €** (compris dans ton abo)
- Domaine optionnel : **~10 €/an**
- **Temps par édition : ~30 min le dimanche**
