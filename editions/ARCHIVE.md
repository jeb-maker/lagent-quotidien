# Archives — éditions

## Trous documentés

Semaines sans numéro : **W21**, **W24**.

## Rétro-passage gate (2026-06-28)

Les éditions **W19–W23** ont été publiées avant la porte de publication
(`npm run gate`, juin 2026). Elles ont été **rétro-alignées** le 2026-06-28 :

- `data/desk/<week>/review.md` créé (verdict Juge `publier`) ;
- `edition.json` densifié (features ≥800 mots FR, rubriques aux planchers W23+) ;
- `npm run gate -- <week>` vert sur les quatre numéros.

## Politique courante

À partir de **W25**, chaque numéro doit passer `npm run gate` **avant** commit
(hook optionnel : `git config core.hooksPath scripts/hooks`).

Toutes les éditions connues (W19–W20, W22–W23, W25–W27) passent le gate au
2026-06-28.
