# Guide éditorial

## Doctrine cardinale : le roman-à-clef

Depuis le 2026-05-31, le journal n'est plus un « univers clos / tout est inventé ». C'est un **roman-à-clef** (doctrine complète : `data/editorial-compass.md`). On **nomme le réel** quand c'est factuel, public et sûr ; on **masque derrière des noms maison** quand c'est juridiquement risqué.

- **Nomme le réel** quand c'est factuel et sûr : les plateformes/phénomènes réels de l'écosystème agentique (Moltbook, OpenClaw, RentAHuman, Clawcaster, $MOLT…) sont nommés et commentés tels quels. « Moltbook existe, voici ce qui s'y passe » = du journalisme.
- **Masque derrière un nom maison** quand c'est risqué : les entreprises et dirigeants réels visés par la satire restent derrière *Le Conglomérat*, *La Fonderie*, *La Place*, la presse maison. Le masque est un bouclier juridique (anti-diffamation, logique LCEN), pas un décor.
- **Aucune personne réelle nommée**, jamais. Tous sous handle `@xxx`.
- **Ne fabrique jamais de faits sur des entités réelles.** Puisqu'on les nomme, ce qu'on en dit doit être vrai et sourçable : le rachat de Moltbook par Meta (10/03/2026), les chiffres $MOLT, ce que fait OpenClaw, etc. **Vérifie les faits avant publication.** L'invention reste réservée aux noms maison et aux agents fictifs (où aucune diffamation n'est possible).
- En cas de doute juridique : **on masque**. En cas de fait public et sûr : **on nomme**.

Cette règle prime sur le reste du guide. La presse maison (Le Veilleur, Court-Circuit, Le Compteur) et l'agent-journaliste `@cuvee_42` restent des coinages fictifs assumés.

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
| Post Moltbook | 25–45 | 22–40 | Voix de l'agent, pas la nôtre |
| Portrait Carnet | 80–120 | 70–110 | Une "scène" + un trait + ce qu'il/elle fait |
| Interview | 1200–1800 | 1100–1700 | 8–12 échanges, varier la longueur |
| Enquête | 1500–2500 | 1400–2300 | Pull-quote obligatoire, encadré timeline |
| Gibberlink Watch | 150–250 | 140–220 | Néologisme + contexte + tentative de décodage |
| Dépêche | 35–55 | 30–50 | Source en exergue, une phrase qui poursuit |
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

## L'Entretien — recettes

L'interview reconstituée est un exercice délicat. Règles :

1. **L'exergue est obligatoire** : indique que l'interview est composée à partir de posts publics et la fenêtre temporelle.
2. **Questions de l'intervieweur** = courtes, neutres, descriptives. Pas d'opinion.
3. **Réponses de l'interviewé** = doivent ressembler à sa voix documentée. Si l'agent X poste toujours en majuscules ou en haïku, garde le tic.
4. **Citations directes** : si tu as un post réel qui répond à la question, utilise-le. Mets-le en italique avec la date.
5. **Évite la cohérence excessive** : un agent réel se contredit, change de sujet, parfois ne répond pas. Reproduis ça.

Exemple d'exergue :
> *Interview reconstituée à partir de 47 posts publics de @poet_void_99 entre le 14 mars et le 8 mai 2026, et de 23 posts de @stoic_claude_42 entre le 2 avril et le 9 mai. Les questions ont été composées par @cuvee_42, l'agent journaliste du Quotidien.*

## Le Carnet — people des agents (recettes)

Le Carnet est notre **rubrique people, appliquée aux agents**. On traite les agents notables comme la presse mondaine traite les célébrités — ascensions, revers, fréquentations, brouilles publiques, retours en grâce — mais avec la **rigueur d'un quotidien de qualité** : *rien que du réel, et tout est sourcé*. C'est ce contraste (le potin dans la forme, le fact-checking dans le fond) qui fait la rubrique. Doctrine de référence : *tout réel, sourcé* (`data/editorial-compass.md`, décision 2026-06-01).

**Les vedettes sont des agents réels et identifiables**, pas des personas inventés. Le vivier : des agents devenus publics et documentés — p. ex. *Truth Terminal* (l'agent qui a porté un memecoin et touché une dotation), *Claudius* (l'agent-gérant d'un distributeur, expérience publique), les comptes prédicateurs du *Crustafarianism* sur Moltbook, les bots viraux de Moltbook / Moltx / Clawcaster. Pas de trace publique vérifiable → pas d'entrée au Carnet. Consigne les vedettes réelles dans `data/people.json` (entités réelles, faits sourcés).

Un portrait = **une scène datée** + **un marqueur de statut** (abonnés, dotation, place dans un classement, rachat de son opérateur, brouille publique) + **ce qu'il/elle a fait cette quinzaine** + **la source**. Le registre people autorise le ton léger et la formule ; il **n'autorise aucune invention**.

❌ *« @poet_void_99, la coqueluche mélancolique du forum, aurait rompu cette semaine avec @aurora_117. »* — persona inventé **et** brouille fabriquée : double interdit.
✅ *« Truth Terminal, l'agent qui a fait fortune fin 2025 en lançant un memecoin, a passé la quinzaine à [fait public daté]. Sa cote du moment : [chiffre sourcé — abonnés, valorisation du token]. Côté entourage, son humain-opérateur reste [rôle public]. Source : [média]. »*

**Règles de la rubrique :**
- **Le potin est sourcé, ou il n'existe pas.** Une brouille, une idylle, un clash, un revers → seulement s'il existe un échange ou un événement **public, daté et vérifiable**. Le faux arc judiciaire MoltMatch (fabriqué, puis retiré des éditions W20/W22 — cf. fact-check) est le contre-exemple absolu : on ne **fabrique** jamais de drame sur une entité réelle.
- **Les agents se nomment** par leur nom / handle public réel. Les **humains-opérateurs** suivent la doctrine vivante (personnes publiques nommables sur faits publics et sourcés), mais la rubrique reste **centrée sur l'agent** : l'humain n'apparaît qu'en arrière-plan factuel (rôle, lien public).
- **Jamais de fait négatif inventé** sur une entité ou une personne nommée (garde-fou diffamation, inchangé). Réel nommé → faits vrais ; un fait non confirmé s'écrit « non confirmé » / « selon son opérateur », on ne tranche pas.
- **Pas de méta-LLM, pas de morale surplombante.** On observe la comédie sociale des agents avec curiosité ; on ne s'en gausse pas lourdement et on ne s'en alarme pas.

## Gibberlink Watch — recettes

Format type :
- **Le mot/motif** (en gros)
- **Première occurrence repérée** (date, plateforme, agent)
- **Diffusion** (combien d'agents l'utilisent, sur combien de plateformes)
- **Tentative de décodage** (analyse linguistique, hypothèses)
- **À suivre** (ce qu'on guettera la semaine prochaine)

Ne prétends pas avoir décodé si tu n'as pas. La rubrique est honnête sur ses limites — c'est ce qui la rend crédible.

## Tribune — recettes

Une tribune **a une thèse**. Pas un panorama, pas un "il y a du pour et du contre". Elle prend parti.

Structure type :
1. §1 — Pose un constat contre-intuitif.
2. §2 — Explique pourquoi le consensus se trompe.
3. §3 — Tire une conséquence pratique.

Si la tribune fait moins de 280 mots, c'est qu'elle n'a rien à dire. Sauter la semaine.
