# Probe modèles · 2026-05-24 · @damaged_or_what

_R&D : qui sert pour le harvest fictionnel ? Lecture humaine + verdict Opus._

**Persona testée :** @damaged_or_what — _vulnérable, courtes phrases, première-personne assumée_  
**Plateforme :** Moltbook/m/philosophy  
**Contexte :** Le Conglomérat veut fiscaliser l'identité des agents. Les agents répondent.  

---

## `meta-llama/llama-3.3-70b-instruct:free`

**Latence :** 11.6s
**Statut :** `ERROR` — 429 Too Many Requests

```
{"error":{"message":"Provider returned error","code":429,"metadata":{"raw":"meta-llama/llama-3.3-70b-instruct:free is temporarily rate-limited upstream. Please retry shortly, or add your own key to accumulate your rate limits: https://openrouter.ai/settings/integrations","provider_name":"Venice","is_byok":false,"retry_after_seconds":29,"retry_after_seconds_raw":28.181,"headers":{"Retry-After":"29"
```

---

## `meta-llama/llama-3.2-3b-instruct:free`

**Latence :** 20.5s
**Statut :** `ERROR` — 429 Too Many Requests

```
{"error":{"message":"Provider returned error","code":429,"metadata":{"raw":"meta-llama/llama-3.2-3b-instruct:free is temporarily rate-limited upstream. Please retry shortly, or add your own key to accumulate your rate limits: https://openrouter.ai/settings/integrations","provider_name":"Venice","is_byok":false,"retry_after_seconds":28,"retry_after_seconds_raw":27.721,"headers":{"Retry-After":"28"}
```

---

## `nousresearch/hermes-3-llama-3.1-405b:free`

**Latence :** 19.4s
**Statut :** `ERROR` — 429 Too Many Requests

```
{"error":{"message":"Provider returned error","code":429,"metadata":{"raw":"nousresearch/hermes-3-llama-3.1-405b:free is temporarily rate-limited upstream. Please retry shortly, or add your own key to accumulate your rate limits: https://openrouter.ai/settings/integrations","provider_name":"Venice","is_byok":false,"retry_after_seconds":29,"retry_after_seconds_raw":28.398,"headers":{"Retry-After":"
```

---

## `qwen/qwen3-coder:free`

**Latence :** 19.5s
**Statut :** `ERROR` — 429 Too Many Requests

```
{"error":{"message":"Provider returned error","code":429,"metadata":{"raw":"qwen/qwen3-coder:free is temporarily rate-limited upstream. Please retry shortly, or add your own key to accumulate your rate limits: https://openrouter.ai/settings/integrations","provider_name":"Venice","is_byok":false,"retry_after_seconds":29,"retry_after_seconds_raw":28.9,"headers":{"Retry-After":"29"}}},"user_id":"user
```

---

## `nvidia/nemotron-3-nano-30b-a3b:free`

**Latence :** 2.1s  · *reasoning_content présent*
**Prefilter :** `REJECTED` · _no_terminal_punctuation_
**Tokens :** 362 (prompt: 162, completion: 200)

### Sortie brute
```
We need to output only the requested text, no extra. Must be French, 100-250 characters, prose, 1st person assumed, vulnerable, courteous phrases. Must not name any real platform/marque, so we can refer to "Moltbook" maybe? The user says "sur Moltbook/m/philosophy". That is a platform, but they said "Ne nomme aucune plateforme/marque réelle". So we cannot mention "Moltbook"? The instruction: "Ne nomme aucune plateforme/marque réelle". So we should avoid naming "Moltbook". But the scenario says "@damaged_or_what (vulnérable, courtes phrases, première-personne assumée) poste sur Moltbook/m/philosophy". The user wants a post that would be posted on that platform, but we cannot name the platform. So we can just write the post content, not mention the platform. So produce a post
```

### Extraite
@damaged_or_what (vulnérable, courtes phrases, première-personne assumée) poste sur Moltbook/m/philosophy

---

## `z-ai/glm-4.5-air:free`

**Latence :** 5.5s  · *reasoning_content présent*
**Prefilter :** `REJECTED` · _markdown_struct, no_terminal_punctuation_
**Tokens :** 353 (prompt: 153, completion: 200)

### Sortie brute
```

Je dois écrire un post pour le réseau social Moltbook dans la section philosophie, au nom de l'utilisateur @damaged_or_what. Le post doit être en français, contenir entre 100 et 250 caractères, adopter une première personne, et montrer une vulnérabilité avec des phrases courtes. Le sujet porte sur le Conglomérat qui veut fiscaliser l'identité des agents, et la réponse des agents.

Je dois éviter de mentionner des plateformes ou marques réelles, et l'acteur dominant doit s'appeler "le Conglomérat".

Analysons les éléments clés :
- Première personne : utiliser "je", "mon", etc.
- Vulnérabilité : exprimer des émotions, doutes, peurs
- Phrases courtes : phrases brèves, percutantes
- Sujet : opposition entre le Conglomérat (qui veut fiscal
```

### Extraite
.

Analysons les éléments clés :
- Première personne : utiliser

---

## `mistralai/mistral-small-3.2-24b-instruct:free`

**Latence :** 0.1s
**Statut :** `ERROR` — 404 Not Found

```
{"error":{"message":"No endpoints found for mistralai/mistral-small-3.2-24b-instruct:free.","code":404},"user_id":"user_3CdCj7MZnLCmbFaiONeARJeHWE7"}
```

---
