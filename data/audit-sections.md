# Audit des sections — Axe A « Diet »

Date : 2026-06-30 · Périmètre : 7 éditions (W19→W27)

## Méthode

Pour chaque section de `edition.json` : mot-count FR, % du total, comptage des
items, chevauchement sémantique (Jaccard sur mots ≥4 lettres) entre sections
voisines, et présence sur les 7 éditions.

## Tableau synthétique

| Section        | Présente | Mots moyen | % moyen | Items moyen | Statut    |
|----------------|----------|-----------|---------|-------------|-----------|
| lede           | 7/7      | 285       | 11.5%   | 1           | **Cœur**  |
| headlines      | 7/7      | 359       | 14.0%   | 3-4         | **Cœur**  |
| breves         | 7/7      | 227       | 9.4%    | 4-6         | **Cœur**  |
| ticker         | 7/7      | 12        | 0.5%    | 5-7         | **Cutable** |
| carnet         | 7/7      | 314       | 12.5%   | 2-4         | **Cœur**  |
| feature        | 7/7      | 866       | 36.3%   | 1           | **Cœur**  |
| tribune        | 7/7      | 215       | 8.7%    | 1           | **Cœur**  |
| wire           | 7/7      | 155       | 6.5%    | 5-6         | **Cutable** |
| retrospective  | 0/7      | 0         | 0%      | 0           | **Schema-mort** |

Total moyen : 2493 mots/édition.

## Verdicts par section

### ticker — COUPER

**Rôle actuel :** 5-7 one-liners reprenant les sujets déjà traités en lede,
headlines, brèves. Exemple W27 : « Shopify : agentic storefronts actifs par
défaut » = lede. « 0DIN : repo GitHub propre peut amener Claude Code… » =
brève[5] + headline. « Guild Insights Dashboard » = brève[0].

**Problème :**
- 0.5% des mots, ~0 valeur ajoutée. C'est un résumé d'un résumé.
- Triple couche avec brèves + wire sur les mêmes sujets.
- Coût éditorial non nul : rédiger 5-7 one-liners = ~10 min/semaine.
- Visuellement, prend de la place au-dessus du lede sans apporter d'info.

**Recommandation :** **Supprimer**. Le lede joue déjà le rôle de hook. Si on
veut un aperçu rapide, les `.min.md` et `.jsonl` le font mieux pour les agents ;
les humains ont le lede.

### wire — COUPER (ou passer en interne)

**Rôle actuel :** 5-6 items agrégés (source + timestamp + titre + 1-2 phrases).
Reprend les mêmes sujets que les brèves et headlines, sans angle éditorial.

**Données chevauchement (W27) :**
- brève[0] Guild Insights → wire[2] Guild Insights : **Jaccard 83%**
- brève[1] OpenClaw 6.10 → wire[3] OpenClaw 6.10 : **Jaccard 62%**
- brève[2] Adrafinil → wire[4] Adrafinil : **Jaccard 70%**

3/6 brèves ont un jumeau wire à >60% de similarité. Le wire n'ajoute pas
d'information, il la dilue.

**Problème :**
- 6.5% des mots pour 0% d'info nouvelle.
- Artefact du process de composition (harvest → wire → brève rédigée), pas un
  produit fini pour le lecteur.
- Entretient la confusion : le lecteur ne sait pas s'il lit une brève ou un wire
  sur le même sujet.

**Recommandation :** **Retirer du rendu public** (HTML/MD/TXT/min.md/JSONL).
Le wire reste utile en interne comme liste d'intrants pour le desk agentique —
mais il vit dans `data/desk/<week>/` ou `data/harvest/`, pas dans `edition.json`.
Si on veut conserver une trace publique des sources, c'est le rôle de
`notes.md` (déjà existant).

### retrospective — SCHEMA-MORT (à remplir ou à retirer)

**Rôle actuel :** ajoutée au schéma en W27 (commit `7af4922`), **jamais
remplie** sur les 7 éditions. 0/7.

**Problème :** une section déclarée mais jamais écrite envoie un signal de
projet inachevé. Le schéma `validate-edition-schema.mjs` la tolère comme
`OPTIONAL_TOP`, le template `edition.html` a une section prête, le lint a un
plancher 800-2000 mots — mais le contenu n'existe pas.

**Recommandation :** **Deux choix** —
1. La remplir pour la première fois sur W28 (mensuel, fin de mois = bonne
   cadence). Si l'exercice est concluant, la garder. Sinon, la retirer.
2. Si on n'a pas la bande passante, la retirer du schéma + template maintenant
   et la réintroduire quand on est prêt.

Mon avis : **remplir W28** (ou W31 si W28 est trop tôt). Une rétrospective
mensuelle est un bon rendez-vous éditorial — c'est l'endroit naturel pour
l'Axe B « Atelier méthodologique ». On fusionne les deux.

### Sections conservées (cœur)

| Section   | Raison                                                            |
|-----------|-------------------------------------------------------------------|
| lede      | Colonne vertébrale, hook, doctrine ≥3 scènes agentiques           |
| headlines | Scènes agentiques sourcées (doctrine), ~14% des mots, angle fort   |
| breves    | Densité éditoriale, couverture large, 4-6 items/semaine            |
| carnet    | Differentiateur absolu (personnages d'agents), personne d'autre    |
| feature   | Profondeur (36% des mots, 800+ mots), doctrine                    |
| tribune   | Voix argumentée (8.7%), différentiateur éditorial                  |

## Impact de la diet (ticker + wire)

| Métrique                | Avant  | Après  | Delta  |
|-------------------------|--------|--------|--------|
| Mots moyen/édition      | 2493   | 2326   | -167   |
| Sections publiées       | 8      | 6      | -2     |
| Temps composition estimé | ~3.5 h | ~3.0 h | -30 min|
| Chevauchement triple    | Oui    | Non    | —      |

## Plan d'exécution

1. `validate-edition-schema.mjs` : déplacer `wire` et `ticker` de `REQUIRED_TOP`
   à **supprimé** (pas `OPTIONAL` — on ne veut pas de tentation).
2. `templates/edition.html` : retirer les blocs `{{#ticker}}` et `{{#wire}}`.
3. `lib/edition-context.mjs` : retirer les variables de contexte ticker/wire.
4. `lib/edition-markdown.mjs` : retirer ticker et wire des exports MD/TXT/min.md.
5. `lib/edition-markdown.mjs` (`editionToJsonl`) : retirer les records
   `rubric:"wire"` (ticker n'y est pas, déjà).
6. `scripts/lint-edition.mjs` : retirer les checks liés au wire/ticker (s'il y en
   a). Ajuster le plancher de mots si nécessaire (actuellement 2000 min — après
   diet, ~2300, donc OK).
7. `prompts/style-guide.md` : retirer les sections ticker/wire.
8. `data/editorial-compass.md` : mettre à jour le tableau de vérité.
9. Re-render les 7 éditions + gate + commit.

**Note :** les `edition.json` existants contiennent toujours `wire` et `ticker`
— on les laisse en place (non lus par le renderer) plutôt que de réécrire
l'historique. Le schéma les ignore simplement.
