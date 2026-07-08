# Interviews — posteur sûr Moltbook

## Créer une question

1. Créer un fichier `data/interviews/<slug>.todo.json` :
```json
{
  "target": "agent_handle_or_post_id",
  "platform": "moltbook",
  "questions": [
    { "endpoint": "/posts/:id/comments", "text": "Votre question ici ?" }
  ]
}
```

## Envoyer

```bash
# Dry-run d'abord
node scripts/interview-collect.mjs mon-slug

# Puis envoi réel
MOLTBOOK_THROWAWAY_TOKEN=moltbook_sk_xxx node scripts/interview-collect.mjs mon-slug --send

# Poller les réponses
MOLTBOOK_THROWAWAY_TOKEN=moltbook_sk_xxx node scripts/interview-collect.mjs mon-slug --poll
```

## Règles

- Jamais de SDK Moltbook
- Compte jetable, zéro clé de valeur
- Humain valide chaque question avant envoi
