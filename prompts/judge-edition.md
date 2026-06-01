# Juge éditorial — comparaison par paires

> Éval **subjective** complémentaire du lint déterministe (`scripts/lint-edition.mjs`).
> Le lint attrape les violations objectives (ton, bilinguisme, acteurs à garder masqués) ;
> ce juge estime la **qualité éditoriale** d'une édition contre une **édition de
> référence** que tu considères comme un bon niveau. Sert à détecter la dérive
> semaine après semaine, pas à noter dans l'absolu.

## Pourquoi par paires (et pas une note /10)

Une note absolue d'un LLM est bruitée et dérive. Une **comparaison par paires** est
plus fiable (applied-llms, Eugene Yan). On corrige les biais connus :

- **Biais de position** : on juge **deux fois** en inversant l'ordre (A puis B, puis
  B puis A). Si le gagnant change selon l'ordre → c'est une **égalité**.
- **Pas d'échelle Likert** : verdict par dimension = `candidate` / `référence` / `égalité`.
- **Raisonner avant de trancher** : justifier chaque dimension *avant* le verdict.
- **Longueurs comparables** : les deux éditions ont un format proche ; ne pas
  préférer la plus longue par défaut.

## Préparer le contexte

```bash
node scripts/edition-to-text.mjs <SEMAINE_CANDIDATE> fr > /tmp/cand.txt
node scripts/edition-to-text.mjs <SEMAINE_REFERENCE> fr > /tmp/ref.txt
# (refaire en `en` pour juger la version anglaise séparément)
```

Puis : « **claude → juge `/tmp/cand.txt` contre `/tmp/ref.txt` selon
`prompts/judge-edition.md`** ».

## Critères (tirés de `style-guide.md`)

1. **Registre — constat curieux, pas sensationnel.** Le lecteur repose le journal
   *intrigué*, pas inquiet ? Le chiffre porte l'intérêt sans adjectif qui dramatise ?
   Aucun titre ne tranche/présuppose un préjudice non démontré ?
2. **Contraste sérieux/absurde.** Sujet absurde traité avec le sérieux d'un quotidien
   de qualité (Le Monde / FT / New Yorker), sans clin d'œil « lol » ?
3. **Tenue de l'écriture.** Ledes denses, brèves qui poursuivent (pas qui résument),
   voix d'agents distinctes de la voix journaliste ?
4. **Ancrage réel & masques.** (Doctrine « vrai journalisme », cf. `data/strategie.md`
   et le tableau de vérité de `data/editorial-compass.md`.) Les faits sont-ils réels
   et sourçables — aucun événement/chiffre inventé attribué à une entité nommée ?
   Les acteurs de satire visés restent-ils masqués (Meta → *Le Conglomérat*,
   OpenAI → *La Fonderie*) et aucune personne réelle n'est-elle nommée ? Les fils
   de couverture réels sont-ils suivis avec cohérence d'une semaine à l'autre ?
5. **Intérêt global.** Donne envie de revenir mardi prochain ?

## Procédure

Pour **chaque** dimension 1–5 :

1. **Passe 1** — A = candidate, B = référence. Raisonne (2–3 phrases citant un
   exemple concret de chaque), puis tranche : `A` / `B` / `égalité`.
2. **Passe 2** — A = référence, B = candidate. Idem.
3. **Verdict dimension** : si les deux passes désignent la même édition → ce gagnant ;
   sinon → `égalité` (biais de position détecté).

## Sortie attendue

```
## Juge éditorial — <CANDIDATE> vs <REFERENCE> (<lang>)

| Dimension | Verdict | Justification (1 ligne, exemple concret) |
|---|---|---|
| Registre (constat curieux) | candidate / référence / égalité | … |
| Contraste sérieux/absurde   | … | … |
| Tenue de l'écriture         | … | … |
| Univers & cohérence         | … | … |
| Intérêt global              | … | … |

**Bilan** : <phrase franche : la candidate tient-elle le niveau de la référence, ou dérive-t-elle ?>

**3 corrections concrètes** (les plus rentables, citant le passage) :
1. …
2. …
3. …
```

Règles du juge : pas de flatterie, dire franchement si la candidate est en-dessous.
Citer un passage à l'appui de chaque verdict — pas d'impression vague. Si une
dimension est à égalité réelle, le dire (ne pas inventer un gagnant).
