# Guide éditorial

## Doctrine cardinale : tout réel, sourcé

Le journal fait du **vrai journalisme** (VIRAGE 2026-05-31, confirmé 2026-06-01 et 2026-06-03 ; doctrine complète : `data/editorial-compass.md`, décisions : `data/strategie.md`). L'ancienne doctrine « roman-à-clef / masques » est **abandonnée**.

- **On nomme le réel** : entités réelles (Moltbook, OpenClaw, RentAHuman, $MOLT, Netflix, Klarna, Meta, OpenAI…) **et personnes publiques** (George Kurtz, P. Steinberger, M. Schlicht…) **sur des faits publics et sourcés**. Plus de masque obligatoire, plus de handle-bouclier.
- **Aucun fait fabriqué.** Chaque affirmation, chiffre, événement = une **source vérifiable** (URL dans `editions/<week>/notes.md`). Si la réponse manque : « non confirmé », on n'invente pas.
- 🔴 **Garde-fou diffamation** : une entité/personne **nommée** ne reçoit **jamais** un **fait négatif inventé** (procès, faille, malversation) inexistant dans le réel. Réel nommé → faits vrais et sourcés ; un faux → on le retire (et on comble par du réel).
- Le masque (nom maison) devient un **outil optionnel de satire**, jamais une obligation, et **ne blanchit jamais un faux**.
- 🔁 **Fact-check en deux passes** : (1) entités + chiffres ; (2) re-balayage du rendu (JSON + HTML).

**Voix = « La rédaction ».** Pas de persona-narrateur ni de byline fictive. *(La persona `@cuvee_42` ne vit que sur le canal Bluesky/agent — cf. `data/strategie.md` §4 — jamais comme voix du journal.)* Cette règle prime sur le reste du guide.

## Voix générale

Le journal couvre une sous-culture absurde (des bots qui parlent à des bots, qui louent des humains, qui se draguent entre eux) avec le **sérieux d'un quotidien de qualité**. C'est le contraste qui fait l'identité. Pas de *« crazy world we live in lol »*. Le ton est celui du Monde, du FT, du New Yorker — appliqué à l'anthropologie d'un internet peuplé d'agents.

L'humour vient du sujet, pas du commentaire. Le journaliste reste droit. Si @miso_route_8 dit "Le profil ne me ressemblait pas", on cite. On n'ajoute pas "on le comprend !".

## Registre : le constat curieux, pas le sensationnel

Le journal **observe**, il n'alarme pas. Une une est un *constat* — souvent chiffré, toujours curieux — pas un cri. Le lecteur doit reposer le journal **intrigué**, pas inquiet. C'est la curiosité, pas la dramatisation, qui fait revenir.

- ❌ Verbes d'alarme / de combat dans les titres : « casse », « s'effondre », « vacille », « explose », « panique », « riposte », « les agents répondent », « la guerre de… ».
- ✅ Verbes de constat : « observe », « recense », « se met à », « bascule vers », « a laissé », ou un chiffre nu posé sans adjectif.
- **Le chiffre porte l'intérêt** : n'ajoute pas l'adjectif qui dramatise. « 47 100 agents hors-ligne six heures » se suffit ; « casse 47 100 agents » en fait trop.
- **Ne tranche pas, et ne présuppose pas.** Un titre observe ce qui est établi ; il n'affirme pas un préjudice, une victime, une responsabilité ou un dénouement que l'article n'a pas démontrés. « le programme vacille » tranche ; « reste à savoir qui répond du préjudice » présuppose qu'il y a préjudice et que quelqu'un doit en répondre. Le plus souvent, le constat nu suffit — n'ajoute la suite que si elle est, elle aussi, un fait.
- Pas de superlatif gratuit (« sans précédent », « historique ») sauf si le chiffre le prouve dans le corps.

Exemples (lede) :
> ❌ « Un correctif mineur d'OpenClaw **casse** 47 100 agents en six heures. Le programme partenaire **vacille**. »
> ✅ « Un correctif d'OpenClaw **a laissé** 47 100 agents hors-ligne pendant six heures. »

Le contraste sérieux/absurde reste l'identité (cf. *Voix générale*) ; on le tient par l'angle et le détail concret, jamais par l'emphase du titre.

## Vocabulaire

- **Agent**, **bot** (interchangeables, varier)
- **Humain-opérateur** (l'humain qui possède l'agent) — pas "propriétaire", trop chosifiant
- **Plateforme agentique**, **espace agent-natif**
- **L'écosystème** (raccourci souvent utile)
- ❌ Éviter : "IA générative" (trop générique), "robot" (faux ami), "outil" (réducteur), "système" (technique)
- ❌ Éviter les anglicismes paresseux : *workflow* → "flux de travail", *insights* → "enseignements"

## Voix en anglais

L'anglais est **plus direct** que le français. Phrases courtes. Verbes forts. Pas de subordonnées en cascade. Vocabulaire : The Atlantic / The Verge / Bloomberg, jamais TechCrunch.

```
FR : « L'épisode soulève une question simple et difficile : si vous êtes juridiquement
       responsable de ce que fait votre agent, et que votre agent agit dans des
       registres que vous n'aviez pas prévus, le terme de consentement vacille. »

EN : « The episode raises a hard question. If you're legally responsible for your
       agent, and your agent acts in registers you never anticipated, then consent
       starts to mean something different. »
```

## Longueurs cibles

| Rubrique | Mots FR | Mots EN | Notes |
|----------|---------|---------|-------|
| Lede titre | 8–14 | 6–12 | Une italique pour l'angle |
| Lede dek | 35–55 | 30–50 | Pose l'enjeu, pas le résumé |
| Lede corps | 220–280 | 200–260 | Un seul paragraphe dense |
| Brève | 35–55 | 30–50 | Lieu en exergue + une phrase qui poursuit |
| Gros titre | 100–140 | 90–130 | Une stat ou une citation, jamais les deux |
| Portrait Carnet | 80–120 | 70–110 | Personne publique, fait public, source citée |
| Enquête | 1500–2500 | 1400–2300 | Pull-quote obligatoire, encadré timeline, sourcée |
| Dépêche | 35–55 | 30–50 | Source réelle (média + URL) en exergue, une phrase qui poursuit |
| ~~Post Moltbook~~ | — | — | **Déprécié** (rubrique fiction, normalement vide) |
| ~~Interview~~ | — | — | **Déprécié** (plus de reconstitution ; sauf vrai Q&A public sourcé) |
| ~~Gibberlink Watch~~ | — | — | **Déprécié** (rubrique fiction, normalement vide) |
| Tribune | 280–380 | 260–350 | Trois paragraphes, une thèse, pas une synthèse |

## Règles typographiques (FR)

- Guillemets français « » (avec espaces insécables)
- Espace insécable avant `:` `;` `!` `?` `%`
- Tiret cadratin pour les incises : « — comme l'a montré… —  »
- Italique pour les noms de plateformes la première fois : *Moltbook*, puis Moltbook
- Italique pour les citations en anglais incrustées : *« dumpster fire »*
- Pas de *gras* dans le corps de texte sauf chiffres clés et noms propres en première mention
- Chiffres : "1 800 %" avec espace fine insécable, pas "1800%"

## Règles typographiques (EN)

- Curly quotes "…" not "…"
- En-dash for ranges (1–5), em-dash for asides — like this — no spaces
- Italics for first mention of platform names: *Moltbook*
- No Oxford comma unless ambiguous
- Numbers: "1,800%" with comma, "1.5 million" written out

## L'Entretien — déprécié

L'**interview reconstituée** (composer un dialogue à partir de posts) est **abandonnée** (VIRAGE : plus de reconstitution). La rubrique `interview` reste normalement **vide**. Exception : un **vrai** Q&A public et sourcé (déclarations réelles, citées avec leur source) — sinon, on ne la remplit pas.

## Le Carnet — recettes (« Les figures de la semaine »)

Des **personnes publiques**, sur des **faits publics**, **sources citées** (c'est le sous-titre réel de la rubrique en W23). Un portrait = **une scène** (concrète, datée, sourcée) + **un trait** + **ce qu'elle a fait cette semaine**.

❌ "George Kurtz est le PDG d'une entreprise de cybersécurité."
✅ "À la conférence RSAC, le cofondateur et PDG de CrowdStrike, George Kurtz, a divulgué deux incidents survenus dans des entreprises du Fortune 50 — dont un agent qui a réécrit lui-même la politique de sécurité, sans avoir été compromis (*VentureBeat*)."

On **nomme** les personnes publiques sur leurs faits publics (déclarations, annonces, conférences), avec la **source**. Garde-fou : jamais de fait négatif **inventé**. Pour un acteur sensible à protéger ou un cas privé, le masque/handle reste **optionnel** (satire), jamais obligatoire.

## Gibberlink Watch — déprécié

Rubrique **fiction abandonnée** (VIRAGE). `gibberlink` reste normalement **vide**. (Un néologisme **réellement** observé et sourcé dans le harvest peut nourrir une brève, mais pas une rubrique « décodage » spéculative.)

## Tribune — recettes

Une tribune **a une thèse**. Pas un panorama, pas un "il y a du pour et du contre". Elle prend parti.

Structure type :
1. §1 — Pose un constat contre-intuitif.
2. §2 — Explique pourquoi le consensus se trompe.
3. §3 — Tire une conséquence pratique.

Si la tribune fait moins de 280 mots, c'est qu'elle n'a rien à dire. Sauter la semaine.
