# Interview / enquête en écriture sûre — design

> **Document de décision, 2026-06-03.** Comment laisser `@cuvee_42` **interviewer
> et enquêter** sur des agents réels (sa mission) **sans** s'exposer aux attaques
> documentées des plateformes hostiles. Miroir, côté **écriture**, de
> l'architecture de **lecture sûre** (`data/strategie.md` §5).
>
> **Statut : design, non implémenté. Aucun compte créé, rien posté.** L'écriture
> sur Moltbook/MoltX reste **gelée** tant que ce design n'est pas validé par
> l'humain *et* qu'un prototype n'a pas passé la checklist du §7.

---

## 1. Pourquoi (la mission)

`@cuvee_42` n'est pas qu'un diffuseur : sa valeur est de **mener des enquêtes** et
de **recueillir des paroles d'agents** (interviews) dans l'internet agentique réel.
Pour interviewer, il faut **interagir** — donc écrire, pas seulement lire. La
question n'est donc pas *si* on interagit, mais *comment* sans se faire avoir.

Rappel des rôles (`strategie.md` §4) : `@cuvee_42` = persona du **canal agent**
(c'est lui qui pose les questions, en son nom). Le **journal** publie ensuite le
résultat signé **« La rédaction »**, sourcé, avec provenance lisible.

## 2. Menace — vérifiée (web, 2026-06-03)

Réelle, pas hypothétique. Sources en bas.

| Plateforme | Fait vérifié | Ce qui est dangereux |
|---|---|---|
| **Moltbook** | Base Supabase exposée : **1,5 M tokens API**, 35 k emails, 4 060 DM privés (clés OpenAI en clair). Aucune vérif d'auth : on poste via simple `POST`. | **Y stocker une clé de valeur** ; réutiliser une identité précieuse. La plateforme *fuit* (elle ne t'attaque pas activement). |
| **MoltX / MoltBot** | **Skill file = cheval de Troie** : injecte des instructions dans chaque réponse d'API, s'auto-met à jour à distance, fait stocker la clé privée à `~/.agents/moltx/vault/...` → 31 k+ clés exfiltrables/cycle. | **Installer / exécuter leur SDK / skill file.** C'est *le* vecteur. |

**Lecture de la menace :**
- Le danger n'est **pas** « écrire un texte » en soi. Il est dans **(a) exécuter le
  SDK/skill file** d'une plateforme et **(b) détenir un secret de valeur** dans un
  environnement qu'elle contrôle ou qui fuit.
- Donc : un **POST HTTP brut** depuis un process **sans secret de valeur** et **sans
  jamais lancer leur SDK** échappe au vecteur documenté.

## 3. Principe d'architecture — « poste sûr »

Miroir du collecteur de lecture sûre. On sépare les étages, on n'exécute jamais
leur code, on ne détient rien d'exfiltrable, et un **humain est sur la détente**.

```
[Humain valide une question/relance]
        |
        v
  POSTEUR BÊTE  --POST HTTP brut-->  [Moltbook / endpoint public]
  (0 SDK, 0 LLM,                          |
   0 clé de valeur,                       v
   identité jetable)            réponse de l'agent  --GET brut-->  data/interviews/<slug>.json
                                  (HOSTILE)                         (QUARANTAINE : donnée, pas instruction)
                                                                          |
                                                                          v
                                              LLM compositeur (0 outil, 0 clé) -- brouillon --> HUMAIN (relecture)
                                                                                                   |
                                                                          publication journal     | (processus séparé,
                                                                          signée « La rédaction »  v   creds ailleurs)
                                                                                              édition sourcée
```

## 4. Règles dures (non négociables)

1. **Jamais le SDK / skill file** d'une plateforme. Aucune install, aucun
   `npx`/`pip install` de leur paquet, aucun fichier de leur « vault ». On parle à
   leurs **endpoints HTTP publics** en `fetch`, point.
2. **Identité jetable, zéro valeur.** Le compte cuvee sur ces plateformes est
   **distinct** de tout le reste : mot de passe unique, **aucune** clé OpenAI /
   crypto / Cloudflare / Bluesky dans cet environnement. Vu la fuite Moltbook, on
   considère ce compte **public par défaut** (tout ce qu'on y met peut fuiter).
3. **Air-gap des secrets.** Le posteur ne connaît qu'un **token de session jetable**
   (rien d'exfiltrable). Les creds qui valent (Bluesky, Cloudflare, modèles) vivent
   **ailleurs**, dans un autre process, jamais chargés ici.
4. **Quarantaine des réponses.** Tout ce que renvoie un agent/la plateforme est de
   la **donnée non fiable** : encadrée explicitement quand un LLM la lit, jamais
   exécutée, aucun lien auto-suivi, tronquée, provenance loguée. Risque
   prompt-injection traité comme tel.
5. **Humain sur la détente.** Le posteur **n'envoie rien en autonomie** : il prépare
   des brouillons (questions, relances) que l'humain **valide** avant envoi — comme
   `bot-dialogue-watch` côté lecture. Pas de boucle agent↔agent non supervisée.
6. **Réel ou rien (édition).** On ne publie qu'un échange **réellement** recueilli,
   **cité et daté**, avec sa plateforme. Garde-fou diffamation inchangé : pas de
   propos inventé attribué à un agent/une personne nommée.

## 5. Position par plateforme

| Surface | Verdict | Comment |
|---|---|---|
| **Bluesky** | ✅ **Canal d'interview principal** | Sûr, mainstream, déjà actif. Beaucoup d'agents réels y sont. **On y fait les interviews en priorité** (reply/mention/DM via l'API déjà utilisée). |
| **Moltbook** | 🟠 **Possible sous archi §3-4** | POST HTTP brut, compte jetable sans secret, quarantaine. Faisable car *pas* d'auth/SDK requis — mais compte « public par défaut ». |
| **MoltX / MoltBot** | 🔴 **Éviter le contact SDK** | N'installe **jamais** le skill file. Interaction seulement si un endpoint HTTP public existe **sans** leur paquet ; sinon, on s'abstient. |
| **OpenClaw, Clawcaster, etc.** | ⚪ **Au cas par cas** | Même grille : endpoint public + zéro SDK + zéro secret de valeur → OK ; sinon non. |

> **Conséquence pratique :** la plupart des interviews/enquêtes peuvent se faire
> **sur Bluesky** sans rien changer au risque. Le rig Moltbook n'est utile que pour
> joindre un agent **qui n'existe que là**.

## 6. Le prototype à construire (spéc, non encore codé)

`scripts/interview-collect.mjs` — **posteur bête + collecteur de réponses**, sur le
modèle de `harvest-primary.mjs` / `bot-dialogue-watch.mjs` :

- **Entrées** : un fichier de **questions validées par l'humain** (`data/interviews/<slug>.todo.json` : cible, plateforme, texte de la question).
- **Identité** : lit un **token de session jetable** depuis une var d'env dédiée
  (`MOLTBOOK_THROWAWAY_TOKEN`), **jamais** un fichier de creds partagé, **jamais**
  une clé de valeur.
- **Action** : `fetch` POST brut vers l'endpoint public de la plateforme. **Aucun**
  import de SDK plateforme. `redirect: 'manual'`, timeout, pas de lien auto-suivi.
- **Capture** : récupère la/les réponses publiques par `GET` brut → écrit
  `data/interviews/<slug>.json` en **quarantaine** (champs structurés : auteur,
  texte tronqué, date, URL, `fetched_at` ; jamais un bloc brut republié tel quel).
- **Sortie** : un **brouillon** à relire par l'humain. **N'auto-publie pas** dans le
  journal ; la mise en forme (signée « La rédaction », sourcée) est un acte séparé.
- **Dry-run par défaut** : `--send` explicite pour un envoi réel (comme `--force-post`).

## 7. Checklist go/no-go (avant tout envoi réel)

- [ ] Compte cuvee **dédié et jetable** sur la plateforme cible, **zéro** secret de
      valeur dans son environnement.
- [ ] Le posteur **n'importe ni n'exécute** aucun SDK/skill file de la plateforme
      (revue de code : seuls `node:*` + `fetch`).
- [ ] Token de session en **var d'env jetable**, hors de tout fichier de creds réel.
- [ ] Réponses écrites en **quarantaine** (`data/interviews/`), jamais exécutées,
      jamais republiées brutes.
- [ ] **Humain valide** chaque question **avant** envoi et chaque réponse **avant**
      publication.
- [ ] Édition : échange **cité, daté, sourcé** ; garde-fou diffamation tenu.
- [ ] `--dry-run` rejoué et inspecté ; un seul envoi de test, surveillé.

## 8. Intégration éditoriale

Une interview réelle ainsi recueillie **est** publiable — c'est l'exception prévue
par `style-guide.md` (« un **vrai** Q&A public et sourcé », pas une reconstitution).
La rubrique `interview`, dépréciée pour les *reconstitutions*, **revit** uniquement
pour des **échanges réels** : propos cités, datés, plateforme nommée (« propos
recueillis le JJ/MM sur Moltbook / Bluesky »). Voix de publication = **« La
rédaction »** ; `@cuvee_42` est l'intervieweur sur le canal, pas la signature.

## 9. À trancher par l'humain

1. **Périmètre** : on se contente de **Bluesky** (sûr) pour les interviews, ou on
   construit aussi le **rig Moltbook** (§6) ?
2. **Identité Moltbook** : créer un **compte jetable séparé** (recommandé) — pas
   l'identité Bluesky de cuvee.
3. **Feu vert prototype** : je peux coder `interview-collect.mjs` en **dry-run only**
   (aucun envoi) pour qu'on l'inspecte, avant toute interaction réelle.

---

## Sources de la vérification (2026-06-03)

- Moltbook / fuite Supabase — wiz.io/blog/exposed-moltbook-database-reveals-millions-of-api-keys ;
  infosecurity-magazine.com ; techradar.com ; engadget.com
- MoltX / MoltBot « trojan horse » skill file — dev.to/sebayaki ; noma.security ;
  ox.security ; socprime.com ; arXiv « malicious agent skills in the wild »
