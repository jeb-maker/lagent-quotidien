# Bias ledger — Narrative Radar

> Registre des biais **connus du dispositif**, pas des biais des médias observés.
> Mis à jour quand la taxonomie, les flux ou le workflow changent.
> Sortie desk/édition : **bilingue FR/EN**. Calibration : **6 langues-source** (EN, FR, AR, ES, ZH, PT).

Dernière révision : **2026-07-13**

---

## Biais de conception

| ID | Biais | Mitigation |
|---|---|---|
| B01 | **Patron industrial-stall sur-représenté** dans les cas calibrés | Contre-exemples obligatoires (`ozone-montreal-success`, `covid-origin-uncertainty`) |
| B02 | **Atlantique-centrisme** malgré 6 langues | Quota harvest hors-EN ; section desk **Angles morts** |
| B03 | **Homologie = mensonge** (hindsight) | Libellé fixe : « ressemble structuralement à » ; jamais « prouve la manipulation » |
| B04 | **Intérêt → intention** | `evidence_type` obligatoire ; plusieurs hypothèses concurrentes |
| B05 | **Contre-récit valorisé** par défaut | Avocat-du-diable : steel man du récit dominant + intérêts du contre-récit |
| B06 | **Taxonomie = worldview** (Chomsky, post-colonial, santé publique) | Révision trimestrielle ; `genuine-uncertainty` explicite |
| B07 | **RSS ≠ monde** | `coverage_gap` ; pas de conclusion si une langue-pilier absente du harvest |
| B08 | **Publication JSON interprétatif** | `data/narrative-radar/` interne ; `interpretive: true` ; pas de render web phase 1 |

---

## Biais linguistiques

| ID | Biais | Mitigation |
|---|---|---|
| L01 | Lexiques EN surreprésentés dans le matching | `narrative_roots` par langue dans chaque cas |
| L02 | Clustering titre seul rate les traductions | Cluster sur entités + dates (harvest futur) |
| L03 | FR/EN sortie ≠ neutralité culturelle | `lesson.fr` et `lesson.en` peuvent diverger légèrement — assumé |
| L04 | AR/ZH/PT sous-peuplés en v1 | Extension v2 (HI/SW) seulement avec pilier rédigé |

---

## Biais workflow desk

| ID | Biais | Mitigation |
|---|---|---|
| W01 | Détecteur et avocat-du-diable lisent les mêmes priors | **Isolation** : adverse ne lit que `detecteur.md`, pas les harvests bruts |
| W02 | Prompt utilisateur oriente Gaza/drogue/etc. | Checklist adverse §10 ; steel man obligatoire |
| W03 | LLM hallucine des `internal-doc` | Facteur peut veto si pont édition ; intérêts sans preuve = coupés |
| W04 | Scope creep vers journal généraliste | Pont édition : 1 paragraphe max/semaine, infra 40 % |

---

## Checklist adverse (chaque cluster publiable)

1. Steel man du récit dominant encore tenable ?
2. `genuine-uncertainty` plus probable que `manufacture-doubt` ?
3. Quels flux / langues **manquent** ?
4. Meilleur match calibration ou plus dramatique ?
5. Au moins **deux** intérêts concurrents sourcés ?
6. Intérêts propres au **contre-récit** nommés ?
7. Personne nommée : fait ou rôle narratif seulement ?
8. Dommage si erreur (diffamation, désinfo crawlers) ?

---

## Révision

| Date | Changement |
|---|---|
| 2026-07-13 | Création v0 — 12 cas, 6 langues, détecteur + avocat-du-diable séparés |
