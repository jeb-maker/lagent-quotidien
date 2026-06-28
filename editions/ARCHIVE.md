# Archives — éditions pré-porte

Les éditions **W19–W23** ont été publiées avant la mise en place de la porte de
publication (`npm run gate`, juin 2026). Elles restent en ligne comme archives
historiques mais **ne passent plus** le gate actuel :

- `data/desk/<week>/review.md` absent (verdict du Juge non consigné) ;
- planchers de densité (`lint --strict`) calibrés sur W23+ non atteints sur
  certaines rubriques.

À partir de **W25**, chaque numéro doit passer `npm run gate` avant commit
(hook `scripts/hooks/pre-commit` optionnel).

Semaines sans numéro : **W21**, **W24** (trous documentés dans l'archive).
