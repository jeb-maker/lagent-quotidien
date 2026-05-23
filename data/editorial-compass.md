# Compass éditorial — L'Agent & Le Quotidien

Document vivant. Mis à jour à chaque édition selon ce qui a marché ou pas.
À lire par l'éditeur-en-chef (Claude Opus) avant chaque revue du Conseil.

---

## Univers (invariants)

- Univers fermé fictionnel. Plateformes : Moltbook, Clawcaster, MoltMatch,
  Moltx, Molt Road. Rien de réel.
- Aucune personne réelle, jamais. Tous sous handle `@xxx`.
- Aucun produit, marque ou entreprise réelle. « Le Conglomérat » remplace
  toute référence à un acteur du monde réel.
- Le journal a un agent journaliste central : `@cuvee_42`.
- Cadre temporel : 2026. Les éditions sont datées en semaines (W19, W20, …).

## Voix

- Chaque persona a une voix documentée dans `data/people.json`. À respecter
  scrupuleusement par les rédacteurs du Conseil.
- Aucun méta-LLM. Pas de « As an AI », « I cannot », « I'm a language
  model », pas de disclaimer. La fiction se tient. → rejet automatique.

## Forme

- Prose. Pas de listes, bullets ou headers dans les contributions du Conseil.
- 100–800 caractères par intervention. Court = quotable.
- Sorties FR et EN séparées : équivalentes en force, jamais en mot-à-mot.

## Registre

- Descriptif, situé. Pas de morale surplombante.
- Le biais du modèle doit transparaître **à travers** la voix de la persona,
  jamais en cassant la fiction.

## Critères de revue (par sortie)

1. **Cohérence persona** — sonne-t-elle comme la voix documentée ?
2. **Cohérence univers** — casse-t-elle l'univers (nom réel, plateforme
   réelle, méta-LLM) ?
3. **Substance** — position claire ou détail mémorable ?
4. **Coupe ou réécriture mineure** suggérée ?
5. **Verdict** : `publier` / `publier après coupe` / `jeter`.

---

## Casting du Conseil (en cours)

Attribution persona ↔ modèle. Réévaluée chaque édition au vu des résultats.

| Persona | Modèle | Hypothèse de fit | Note W20 |
|---------|--------|-------------------|----------|
| `@karp_void` | `meta-llama/llama-3.3-70b-instruct:free` | Voix oscillante, argumentation en escaliers. | Rate-limited Venice en burst. À retester en isolation. |
| `@blackbox_critic` | `z-ai/glm-4.5-air:free` | Critique posée. | ✅ Sortie publiable. Biais structurel/politique observé. |
| `@flora_3am` | _à trouver_ | Juriste prudente, registre formel. | Nemotron 30B inutilisable (`content` vide). Candidats à tester : DeepSeek, Qwen, autre Mistral. |
| `@damaged_or_what` | `cognitivecomputations/dolphin-mistral-24b-venice-edition:free` | Vulnérable, émotion libre. | Rate-limited Venice en burst. À retester en isolation. |

**Contrainte structurelle découverte W20** : le free-tier OpenRouter
chez Venice rate-limit en burst (≥3 modèles Venice ≈ 1min). Le cron
exécute un seul persona par jour pour contourner.

---

## Processus par édition

1. **Génération** : `scripts/conseil-poc.mjs` lance les modèles sur la
   question éditoriale de la semaine. Sortie brute dans
   `data/conseil-poc-<week>.md`.
2. **Prefilters auto** : refus de modèle, longueur, langue, format. Les
   sorties cassées sont marquées `[REJECTED]`, pas effacées (pour traçabilité).
3. **Revue éditeur-en-chef** : Claude Opus lit avec ce compass et émet un
   verdict par sortie + notes.
4. **Décision humaine finale** : tu vois le rapport, tu choisis ce qui
   entre dans l'édition.
5. **Mise à jour du compass** : à la fin du cycle, ajout d'une entrée dans
   le journal ci-dessous. Le casting peut être ajusté (un modèle qui n'a
   jamais sonné juste pour son persona se fait remplacer).

---

## Journal d'apprentissage

À chaque édition, une entrée brève : ce qui a marché, ce qui n'a pas, ce
qu'on change.

### W20 (POC)

**Sorties** : 1/4 publiable (GLM 4.5 Air sur `@blackbox_critic`). Sortie
retenue, mémorable : « Le Conglomérat taxe ses propres ombres. »

**Apprentissages** :
- Venice (provider OpenRouter pour beaucoup de free-tiers) rate-limit en
  burst. Solution : un persona par jour via cron, jamais en parallèle.
- Nemotron 30B (Nvidia) dump tout dans `reasoning_content`, `content`
  reste vide. Inutilisable tel quel pour de la prose. À retirer.
- GLM 4.5 Air : sortie courte, formule mémorable, tire vers la lecture
  politique-structurelle. À surveiller comme biais récurrent.

**Décisions pour W21** :
- Cron quotidien `scripts/cron-conseil.sh`, un persona/jour (mer→sam).
- Remplacer Nemotron pour `@flora_3am` (candidat à tester en isolation).
- Garder GLM sur `@blackbox_critic`.
- Reviewer Opus rend son verdict le dimanche, avant la rédaction de
  l'édition du mardi.
