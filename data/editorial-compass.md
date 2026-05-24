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

---

## Harvest quotidien (réel + fictionnel)

Deux scripts s'exécutent chaque jour pour alimenter l'édition de mardi.

### `scripts/harvest-daily.mjs` — signaux réels

Capture 4 sources sur le discours agentique réel :

| Source | Cible | Utilité |
|--------|-------|---------|
| Bluesky | top posts/jour sur 5 mots-clés agentiques | termes émergents, voix réelles |
| Hacker News | top stories 24h avec « agent » dans le titre | enjeux tech grand public |
| RSS d'AI outlets (Verge, 404 Media, Ars, Register, TechCrunch, MIT TR) | items récents agent-related | angle journalistique |
| ArXiv (cs.AI) | papiers récents avec « agent » dans l'abstract | matière académique brute |

Output : `data/harvest/<YYYY-MM-DD>.json`. Anti-leak : les noms réels
restent dans le JSON (données brutes) mais doivent **jamais** apparaître
dans une édition publiée. Seuls les *patterns* (term, fréquence, datapoint
chiffré) traversent vers la fiction.

### `scripts/harvest-fictional.mjs` — feed fictionnel quotidien

3 personas tirées chaque jour. **Le fictionnel est une *refraction* du
réel** : chaque post réagit à un signal du jour (Bluesky/HN/RSS/ArXiv),
transposé in-universe (Google/NVIDIA/etc. → le Conglomérat, Bluesky/Twitter
→ Moltbook). Pas de circuit fermé fictif → fictif.

Backend : **Ollama local** sur cette machine.

**Modèle actuel** : `mistral:7b-instruct-q4_K_M` (~4.4 GB, CPU). Vitesse
~30-60s/post.

**Baseline observée W20 (mode refraction)** :
- Taux de réussite : 2/3 PASSED en moyenne (vs ~0-1/3 via free-tier OpenRouter).
- Pas de reasoning leak, pas de rate-limit, pas de dépendance réseau.
- Refraction visible : les posts reprennent le sujet du signal réel mais
  transposé (« le Conglomérat a toujours eu ses propres PCs » en réaction
  à NVIDIA, etc.).
- Qualité linguistique faible : fautes grammaticales fréquentes
  (« j'est », « essayer de cela »), syntaxe à corriger à la main.
- Voix : respecte 1ère personne, sujet correctement transposé. Voix de
  persona souvent diluée — Mistral tend vers analytique/explicatif là où on
  voudrait vulnérable/minimaliste.
- Chaque post est sauvegardé avec `source_signal` (source + URL) pour
  traçabilité éditoriale.

**À iterer si besoin** :
- Modèle plus grand (mistral-nemo:12b, gemma2:9b) si la RAM permet — meilleur
  français mais ~2× plus lent.
- Prompt par persona (le prompt unique convient mal aux minimalistes).
- Diversification : un modèle par persona pour des voix vraiment distinctes.

**Pourquoi pas OpenRouter free-tier** : 4/7 modèles Venice rate-limited en
burst, 2/7 modèles à raisonnement (Nemotron, GLM Air) qui mangent leur
budget tokens à débattre du prompt. Cf. `data/probe-models-2026-05-24-*.md`.

Output : `data/fictional-feed/<YYYY-MM-DD>.jsonl` (append). À review le
dimanche pour sélection des posts intégrables dans l'édition de mardi
(section `bot_posts`).
