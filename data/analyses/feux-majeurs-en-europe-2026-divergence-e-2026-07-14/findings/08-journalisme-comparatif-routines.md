# 08. Journalisme comparé et routines éditoriales

**Angle** : études des médias / journalisme. **Question** : les formats « live » / « en direct » (El País, Guardian) vs titres institutionnels (ZH, AR) produisent-ils mécaniquement des récits différents sur le même événement ?

## Findings

1. **Tuchman (1973) fonde le concept de « routinisation de l'inattendu » : les rédactions transforment l'événement imprévisible en matière processable par des typifications organisationnelles.** Dans *Making News by Doing Work*, Gaye Tuchman montre que les journalistes classent les faits (hard/soft, spot/developing) par prototypes plutôt que par définitions explicites, et que la structure organisationnelle du travail impose des routines qui **réduisent la variabilité** des matériaux bruts ([Tuchman, *American Journal of Sociology*, 1973, DOI 10.1086/225510](https://doi.org/10.1086/225510), **N1**). Appliqué aux catastrophes : l'imprévu (incendie) devient prévisible dans sa **forme narrative** (heures initiales = impact immédiat, peu de prévention).

2. **La recherche sur les live blogs confirme une genre éditorial distinct du headline classique : temporalité roulante, tension immédiateté/crédibilité, sourcing formalisé.** Thurman & Walters (*Digital Journalism*, 2012, DOI 10.1080/21670811.2012.714935) et Thurman & Rodgers (2014) décrivent le live blog comme format pivot du breaking news en ligne. Une analyse quantitative de neuf live blogs néerlandais (crises, politique, sport) montre que les journalistes **reproduisent les conventions de l'article classique** (sources formelles majoritaires, direct speech) malgré la polyvocalité possible via réseaux sociaux ([Lecheler & Kruikemeier, *Journalism Practice*, 2024, DOI 10.1080/17512786.2024.2394561](https://doi.org/10.1080/17512786.2024.2394561), **N1**). Thurman et al. (2018) documentent une « culture de corroboration plus lâche » dans certains live blogs, avec tension entre transparence et spéculation ([*Journalism Studies*](https://epub.ub.uni-muenchen.de/29949/1/for%20distribution.pdf), **N1**).

3. **Les routines disaster news privilégient la phase aiguë « crise » au détriment de la prévention et du risque systémique — pattern reproductible indépendamment de la langue.** Une revue systématique sur la couverture des catastrophes en Amérique latine (Wilkins, cité dans Retegui et al., 2023) confirme Tuchman : les récits suivent des **patterns prévisibles** — impact immédiat, peu d'attention aux causes structurelles ou à la recovery à long terme ([Retegui et al., *Disertaciones*, DOI 10.12804/revistas.urosario.edu.co/disertaciones/a.14752](https://doi.org/10.12804/revistas.urosario.edu.co/disertaciones/a.14752), **N1**). Gitlin (1988, via analyse Tchernobyl) ajoute que les réseaux « domestiquent » la catastrophe en drame humain, stéréotypes et fable morale ([Gitlin, *Nordicom Review*, 1988, DOI 10.1177/028072708800600103](https://doi.org/10.1177/028072708800600103), **N1**).

4. **Application au corpus juillet 2026 : El País « en directo » vs 中国新闻网 bilan institutionnel — divergence de format, pas nécessairement de récit politique.** El País publie « Últimas noticias del incendio forestal de Los Gallardos (Almería), **en directo** | Identificadas otras tres víctimas… » — structure live, mise à jour continue, micro-événements ([harvest `2026-07-13.json`](../../narrative-radar/2026-07-13.json), **N4**). 中国新闻网 titre « **西班牙森林火灾致13人死亡** » — dépêche Xinhua, bilan agrégé, dateline Madrid/Beijing, sans marqueur « direct » ([même harvest](../../narrative-radar/2026-07-13.json)). BBC « Briton tells… » et Guardian « Firefighting planes scrambled… » relèvent du **headline événementiel** anglophone. Al Jazeera Arabic combine bilan Paris + Espagne dans un seul titre institutionnel. Le detecteur classe El País live sous `complexity-dilution` / `redirect-attention`, mais l'avocat-du-diable retient l'**inertie de format** : « direct » = routine newsroom, pas signal de manipulation ([detecteur-adverse.md W29](../../desk/2026-W29/detecteur-adverse.md), **N4** interne).

5. **Les agences et dépêches institutionnelles (Xinhua, AFP, Reuters) produisent mécaniquement des titres différents des live blogs occidentaux — contrainte de genre plus que choix idéologique.** La littérature sur les live blogs insiste : le format exige **staffing**, expertise technique et processus social de validation en temps réel ([Wilczek & Blachnitzky, entretiens livebloggers, *Digital Journalism*, 2023, DOI 10.1080/21670811.2023.2244986](https://doi.org/10.1080/21670811.2023.2244986), **N1**). Une dépêche d'agence optimise la **transmission d'état de fait** (morts, lieu, source officielle) pour republication multilingue — d'où l'homogénéité ZH/AR sur les bilans vs hétérogénéité EN/ES sur témoignages et live. **Non trouvé** : étude comparée peer-reviewed jumelant strictement El País live et Xinhua sur Los Gallardos juillet 2026 (corpus trop récent).

## Tension interne

Deux lectures s'affrontent. **Lecture routines (dominante N1)** : EN/ES et ZH ne racontent pas le « même » récit parce qu'ils n'occupent pas la même **case de production** — live blog vs dépêche ; la divergence est **générique**, pas preuve d'un cadrage « urgence climatique » manufacturé en EN. **Lecture framing (angle 04)** : les choix lexicaux (« climate emergency kills » dans certains résumés EN vs bilans neutres ZH) persistent **à l'intérieur** du même événement et peuvent dépasser la contrainte de format. Les deux peuvent être vraies : le live **amplifie** la saillance temporelle (updates, victimes au fil de l'eau) tandis que le titre institutionnel **compress** en chiffre — sans que l'un soit la traduction fidèle de l'autre. Point faible : comparer El País (live + portrait victime) à Xinhua (titre seul) mélange **format** et **personnalisation** (angle 07) ; une comparaison propre exigerait live vs live ou dépêche vs dépêche.

## Projection

**À 1 an.** Observables : (a) prochaine catastrophe européenne couverte simultanément par El País/Guardian (live) et agences ZH/AFP — mesurer si l'écart de titres persiste quand le format est aligné (AFP dépêche vs Xinhua dépêche) ; (b) adoption généralisée de live blogs IA-assistés — Thurman (2014) rappelait déjà le risque éthique sur événements sensibles ; (c) entrée en vigueur pleine des plans RD 716/2025 avec volet « comunicación » : voir si les administrations imitent le registre live (fil Twitter/X officiel) ou le registre dépêche.

**À 5 ans.** Si les live blogs deviennent default pour toute « canicule + feu » en Europe occidentale, la divergence avec presse institutionnelle asiatique/arabe pourrait **s'accentuer structurellement** sans nouvelle vague de « climate emergency » framing — simply par divergence de genres. Surveiller les études post-2024 sur corroboration dans live blogs (Lecheler 2024 vs critiques 2018) : une professionnalisation accrue rapprocherait El País et Reuters ; une pression engagement rapprocherait live et headline sensationnel.

## Recherche

**Moteurs/bases interrogés** : recherche web intégrée, doi.org, journals.sagepub.com, tandfonline.com, epub.ub.uni-muenchen.de, data/narrative-radar/2026-07-13.json, data/desk/2026-W29/detecteur.md et detecteur-adverse.md.

**Requêtes exactes (verbatim)** :
- `live blog journalism disaster coverage peer-reviewed Journalism Practice`
- `Tuchman disaster news routines journalistic peer-reviewed`
- `Thurman Walters Digital Journalism live blog 2012`
- `Performing Discourse live blogs Lecheler Kruikemeier 2024`
- `Rethinking news coverage disasters crisis risk management media routines Wilkins`

**Sources consultées mais écartées** :
- https://www.sourcefabric.org/uploads/guide-to-live-blogging.pdf — guide industriel Sourcefabric (N5), bonnes pratiques Ze.it Online, non peer-reviewed.
- https://openaccess.city.ac.uk/id/eprint/4045/ — chapitre Thurman & Rodgers 2014 (N2), utile contextuellement mais doublonne Digital Journalism 2012.
- https://doi.org/10.1177/1354856509342780 — Garcia Avilés & León, 9/11 newsrooms (N1) : pertinent sur crisis mode mais hors incendies/feux.
