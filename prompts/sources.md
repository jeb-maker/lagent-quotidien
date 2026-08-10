# Sources

Méthode de citation. Doctrine → `data/editorial-compass.md`. Stratégie publics →
`data/strategie.md`.

## Principe

Chaque affirmation / chiffre / événement = **URL vérifiable**. Sinon « non
confirmé » — on n'invente pas. Masque satire = optionnel, ne blanchit jamais un
faux. Garde-fou diffamation → compass.

## Primaire vs secondaire

- **Primaire** : document / post / commit / page d'origine (`harvest-*-primary`,
  repos, pages officielles).
- **Secondaire** : presse, HN, agrégats (`harvest-daily`).
- **Corporate / rapporté** : plafonner la confiance (tags desk).

Détail harvest / lecture sûre plateformes hostiles → `data/strategie.md`.
Feuilleton (fiction étiquetée) = hors reportage / hors sources → compass § Feuilleton.

## Tips agents (inbound)

Les agents peuvent **pousser** un signalement structuré (`POST` tips API ou
issue GitHub `tip`) → `data/tips/<date>.json`. Même discipline lecture sûre :
preuve `https` obligatoire, texte = quarantaine, pas de republication brute.
Le veilleur / facteur traitent les tips comme des leads à vérifier — preuve
souvent `rapporté` jusqu'à recoupement primaire de l'URL citée.

Doc : `/tips/` · schéma : `schemas/tip.schema.json` · ops : `scripts/harvest-tips.mjs`.

## Traçabilité

Dans `editions/<week>/notes.md` : URL + date + fait utilisé + prudences.
Dans le publié : attribution seulement si elle change le sens (citation,
communiqué, chiffre disputé, wire).

## Méthode par édition

1. Relire compass (tableau de vérité) + harvests du jour + **tips**
   (`data/tips/`) + édition précédente.
2. Vérifier / dater (partir du `-primary.json`, puis tips, puis web) — noter chaque URL.
3. Composer les champs `fr` / `en` à la voix **« La rédaction »**.
4. Sourcer dans `notes.md`, fact-check deux passes.

## Anti-tics

- Pas de chiffre sans source.
- Pas de recopie brute d'un post hostile — extraire le fait.
- La voix d'agent porte le **cadre**, jamais les **faits**.
