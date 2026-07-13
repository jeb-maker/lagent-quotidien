# HANDOFF — Narrative Radar harvest (phase suivante)

> Brief pour le **prochain agent** (humain ou opencode).
> Ne pas relire toute la conversation de conception : ce fichier + la taxonomie suffisent.
>
> | | |
> |---|---|
> | **Langues sortie desk** | FR + EN (toujours bilingue) |
> | **Langues-source calibration** | EN, FR, AR, ES, ZH, PT |
> | **État** | Taxonomie + desk agents mergés (`main`, PR #33). Harvest **pas encore écrit**. |

---

## Objectif de cette phase

Implémenter le **collecteur RSS monde** + **cron serveur**, sans LLM :

1. `scripts/harvest-narratives.mjs`
2. `scripts/cron-world-pulse.sh` (ou `cron-narrative-radar.sh`)
3. Sortie : `data/narrative-radar/<YYYY-MM-DD>.json`

Le desk (`detecteur` → `avocat-du-diable`) existe déjà. Il attend ces JSON.

---

## Fichiers déjà en place (lire avant de coder)

| Chemin | Rôle |
|---|---|
| `data/taxonomy/calibration-cases.json` | 12 dossiers calibrés — **ne pas réécrire** sauf correction de source |
| `data/taxonomy/narrative-archetypes.json` | Vocabulaire archétypes + `industrial-stall` |
| `data/taxonomy/interests.json` | Intérêts / fonctions fermés + `evidence_type` |
| `data/taxonomy/bias-ledger.md` | Biais du dispositif + checklist adverse |
| `data/feeds-world.json` | Liste RSS v1 (vérifier URLs au premier run ; noter `note` sur AP) |
| `prompts/desk/detecteur.md` | Format de `detecteur.md` |
| `prompts/desk/avocat-du-diable.md` | Format adverse (isolation) |
| `.opencode/agent/detecteur.md` | Subagent |
| `.opencode/agent/avocat-du-diable.md` | Subagent adverse |
| `scripts/harvest-daily.mjs` | **Modèle à calquer** (parseRSSItems, try/catch par source) |
| `scripts/cron-harvest.sh` | **Modèle cron** (flock, pull, stage ciblé, push) |

---

## Scope — faire

### `harvest-narratives.mjs`

**Code bête uniquement** (doctrine `data/strategie.md` §5) :

```
fetch RSS → parse → dédupe → métadonnées flux → JSON
```

- Lire les flux depuis `data/feeds-world.json` (pas de liste hardcodée).
- Parser Atom/RSS minimal (réutiliser logique de `harvest-daily.mjs`).
- Extraits tronqués (quarantaine) ; `redirect: 'manual'` ; User-Agent type `theagentweekly-harvest/1.0`.
- Une erreur de flux → log + continuer (jamais planter tout le run).
- Pas de filtre thématique agentique (contrairement au RSS de `harvest-daily.mjs`).
- Cap volume : ~200 items/jour suggéré (paramétrable `--max=`).
- Fenêtre temporelle : ~36–48 h (comme harvest-daily).
- Champ `lang` / `bloc` / `trust_tier` / `owner` hérités du registre flux.
- Tagging **règles** optionnel v1 : lexiques de `narrative-archetypes.json` + match calibration par mots-clés (scores) — **pas de LLM**.
- Clustering léger optionnel v1 : Jaccard titre / entités dans fenêtre 48 h.
- Marquer champs interprétatifs : `"interpretive": true` sur tags/scores ; faits = false.
- Quota : viser ≥40 % items hors-EN ; sinon logger `coverage_gap` dans le JSON.

### `cron-world-pulse.sh`

Calquer `cron-harvest.sh` :

- Repo : `/home/debian/agentic-news/agent-quotidien`
- Lock distinct : `/tmp/agent-quotidien-narrative-radar.lock`
- `git pull --rebase origin main`, run harvest, **stage uniquement** `data/narrative-radar/${DATE}.json`
- Commit message : `Narrative radar ${DATE}`
- Crontab suggéré (après harvest agentique 7h30, avant drift) :
  `45 7 * * * .../scripts/cron-world-pulse.sh >> /tmp/agent-quotidien-narrative-radar.log 2>&1`

### Docs à mettre à jour après merge harvest

- `scripts/README.md` : passer de **planifié** → **actif**
- Ce HANDOFF : section État → « harvest live »

---

## Scope — ne pas faire

| Interdit | Pourquoi |
|---|---|
| LLM dans le cron | Injection + coût + hallucination |
| Écrire dans `data/harvest/` | Périmètre différent (agentique) |
| Modifier `fr.html` / `en.html` / render | Fichiers générés |
| Page publique `/world-pulse/` ou feed | Radar **interne** (phase 1) |
| Verdict « manipulation prouvée » dans le JSON | Homologie ≠ mensonge |
| Stager `edition.json` ou WIP | Conflits cron |
| Fusionner adverse dans le juge | Contrats distincts |
| Enrichir lexiques AR/ZH/PT « à l’aveugle » | Besoin source documentée (bias-ledger L04) |

---

## Schéma JSON cible (brouillon — respecter l’esprit)

```json
{
  "date": "YYYY-MM-DD",
  "collected_at": "ISO-8601",
  "kind": "narrative-radar",
  "feeds_ok": 0,
  "feeds_error": 0,
  "coverage": { "by_lang": {}, "non_en_pct": 0, "gap": [] },
  "items": [
    {
      "id": "stable-hash-of-url",
      "title": "…",
      "url": "…",
      "published": "…",
      "summary_excerpt": "…",
      "feed": { "id": "…", "name": "…", "lang": "en", "bloc": "…", "trust_tier": "…", "owner": "…" },
      "tags_rule": [],
      "calibration_hits": [],
      "cluster_id": null,
      "interpretive": false,
      "fetched_at": "…"
    }
  ],
  "clusters": [],
  "errors": {}
}
```

`tags_rule` / `calibration_hits` / `clusters` = `"interpretive": true` au niveau objet si présents.

---

## Critères de done (phase harvest)

1. `node scripts/harvest-narratives.mjs` écrit un JSON valide pour aujourd’hui.
2. ≥1 flux OK par langue-cible quand possible ; erreurs isolées.
3. Cron wrapper + flock + commit ciblé documentés (crontab commenté en tête de fichier).
4. Dry-run local : détecteur peut lire le JSON et produire `detecteur.md` sans planter.
5. Pas de render site, pas de changement doctrine éditoriale sauf doc harvest.
6. Tests manuels : 3 URLs RSS cassées volontairement → run continue.

---

## Workflow desk (rappel)

```
harvest-narratives.mjs  →  data/narrative-radar/<date>.json
        ↓
detecteur               →  data/desk/<week>/detecteur.md
        ↓
avocat-du-diable        →  data/desk/<week>/detecteur-adverse.md  (lit detecteur.md SEUL)
        ↓
éditeur (optionnel)     →  pont ≤1 paragraphe / semaine dans edition.json
        ↓
juge                    →  edition.json uniquement (inchangé)
```

---

## Décisions déjà tranchées (ne pas re-débattre)

| Sujet | Décision |
|---|---|
| Nom | Narrative Radar (pas World Pulse) |
| Langues v1 | EN, FR, AR, ES, ZH, PT |
| Extension v2 | HI (puis SW) seulement si pilier calibré rédigé |
| Adverse | Subagent **séparé** dès v0 |
| Publication | Interne |
| Intérêts | Fermés + `evidence_type` ; jamais intention secrète sans preuve |
| Homologie | Phrase type : « ressemble structuralement à » |

---

## Après harvest — phases ultérieures (hors scope immédiat)

1. Valider URLs dans `feeds-world.json` (certaines ont `note` de vérification).
2. Enrichir `narrative_roots` AR/ZH/PT avec sources natives documentées.
3. Clustering + `fabrication_index` (heuristique, toujours annoté).
4. Premier pont édition agentique sourcé (gate + fact-check deux passes).

---

## EN — short brief for non-FR agents

**Build next:** dumb RSS harvester `scripts/harvest-narratives.mjs` + cron mirroring `cron-harvest.sh`, writing `data/narrative-radar/<date>.json` from `data/feeds-world.json`. No LLM in cron. Taxonomy and desk agents (`detecteur`, `avocat-du-diable`) already merged. Do not publish radar to the website. Homology ≠ proven lying. See French sections above for schema, done criteria, and hard prohibitions.

---

## Checklist démarrage agent

- [ ] Lire ce HANDOFF + `data/strategie.md` §5 (lecture sûre)
- [ ] Lire `scripts/harvest-daily.mjs` (modèle parse)
- [ ] Lire `data/feeds-world.json`
- [ ] Branch `cursor/narrative-radar-harvest-<suffix>`
- [ ] Implémenter harvest + cron
- [ ] Dry-run, commit, push, PR
- [ ] Mettre à jour ce fichier : État → live
