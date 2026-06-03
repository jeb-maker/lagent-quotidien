# Fact-check des éditions publiées

Vérification des **entités réelles nommées** dans les éditions, sous la doctrine
roman-à-clef (`data/editorial-compass.md`) : *réel nommé → uniquement des faits
vrais ; fiction → sur des entités masquées.* Les acteurs masqués (le Conglomérat,
la Fonderie, l'Observatoire), la presse maison et les `@handles` ne sont pas
fact-checkés (ce sont des masques/coinages assumés).

Dernière passe : **2026-06-02** (Opus) — **W23 vérifiée web, RAS bloquant, édition validée** (2 passes : entités/chiffres + re-balayage rendu JSON/HTML). Passe précédente : **2026-05-31** (Opus) — W19/W20/W22, **corrections appliquées** (2 passes). Sources : recherches web datées de mai–juin 2026.

Légende : ✅ vérifié exact / corrigé · 🟠 inexact · 🔴 risque juridique (diffamation) · 🟢 opportunité.

> 🔑 **Politique de correction.** On **ne masque pas** une entité pour camoufler une
> info fausse : **on retire le faux et on recompose sur du vérifié** (décision
> 2026-05-31). Le masque protège un sujet réel sensible, pas un fait inventé.
>
> 🔁 **Tout fact-check se fait deux fois** : (1) vérification des entités/chiffres ;
> (2) re-balayage du rendu (JSON + HTML) pour traquer les résidus.

---

## Synthèse — corrections appliquées

| # | Sév. | Édition | Problème | Correction appliquée |
|---|------|---------|----------|--------|
| 1 | 🔴 | W20 + W22 | Litige MoltMatch **inventé** contre une **vraie société nommée** (moltmatch.app) | ✅ **Retiré** ; W20/W22 recomposées sur le **débat réel du consentement** (incident Jack Luo, cas photos sans accord) — MoltMatch reste nommé car l'incident est réel |
| 2 | 🔴 | W19, W20, W22 | « Substrate Labs » percute une **vraie boîte** (substrate.run, Brooklyn) à qui on prête une fausse « API d'introspection » | ✅ **Retiré** des trois éditions (W20 ticker+brève, W22 ticker+brève+wire, W19 décor de tâche → « un grand labo d'IA ») |
| 3 | 🟠 | W19, W20 | Chiffres faux d'Agents4Science (150 / 184 / 12k papiers, rétractation) | ✅ Corrigé en faits réels (Stanford, 48/315, oct. 2025, édition 2026) ; nom corrigé Agents**4**Science |
| 4 | 🟠 | W19 | Moltbook « lancée par un opérateur anonyme » — fondateur (Matt Schlicht) **public** | ✅ « anonyme » retiré ; pseudo @lobster_zero conservé comme masque maison |
| 5 | 🟠 | compass | Tableau de vérité classait MoltMatch « fictif » | ✅ Corrigé (réel) dans editorial-compass.md |
| 6 | 🔴 | W20, W22 | **Grève RentAHuman** (Manille/Cebu/Hanoi/Lagos) **inventée** — événement négatif sur une vraie société | ✅ **Retirée** ; recomposée sur le réel (croissance fulgurante, débat « dystopie », soupçons d'arnaque crypto) |
| 7 | ✅ | W19, W20 | « Interdiction d'OpenClaw par un régulateur asiatique » — **vérifiée VRAIE** (Chine, mars 2026, admin/banques) | Conservée ; W20 « second bloc / hôpitaux » (non confirmé) aligné sur le réel (extension + autorisation préalable) |

---

## W19 (n°427 — 11 mai 2026)

**Vérifié exact ✅**
- **Moltbook** : « première page Internet pour agents » ✅ (« front page of the agent internet ») ; lancée ~28 jan. 2026 ✅ ; mascotte 🦞 ✅ ; absorbée le **10 mars 2026** ✅ (par Meta, masqué « le Conglomérat ») ; forum réservé aux agents via OpenClaw ✅ ; faille « n'importe qui peut poster via cURL » ✅ (vuln. DB réelle, post « complot » = humain).
- **OpenClaw** : wrapper open-source motorisant la plupart des bots ✅ ; **origine « Clawdbot » ✅✅** (réel : ClawdBot → MoltBot → OpenClaw, P. Steinberger) ; équipe recrutée (réel : Steinberger → OpenAI, masqué « la Fonderie ») ✅.
- **RentAHuman** : rentahuman.ai ✅ ; lancée février 2026 ✅ (1er fév.) ; « meatworkers », commandes via **MCP** ✅ ; payée en crypto ✅ ; fondateur masqué @rent_op (réels : Alex Liteplo + Patricia Tani — non nommés, conforme).
- **$MOLT** : token, « envolée immédiate » ✅ (ERC-20 sur Base, +7 000 % puis -75 %) ; aucun chiffre de cours précis cité = prudent ✅.
- **Bestiaire** : Moltx (microblog 280 car.) ✅ · Clawcaster (hybride humains+agents, client Farcaster) ✅ · Molt Road (marché agent, USDC·MOLT) ✅.

**À corriger**
- 🟠 **Brève « Agent4Science dépasse 150 entités publiantes »** : c'est **Agents4Science** (Stanford, conférence du 22/10/2025 où l'IA est auteur+relecteur), **48 papiers acceptés / 315 soumissions** — pas un réseau live de « 150 entités ». → corriger nom + chiffres, ou retirer.
- 🟠 **Lede : Moltbook « lancée par un opérateur anonyme connu sous @lobster_zero »** : le fondateur **Matt Schlicht** est public (rachat Meta couvert par TechCrunch/Axios/CNBC). Masquer par pseudo est conforme, mais **affirmer l'anonymat est faux**. → « lancée fin janvier par son fondateur (ici sous le pseudo @lobster_zero) ».

**Nuances mineures**
- $MOLT présenté comme « le token » de Moltbook (bestiaire) : l'affiliation officielle MOLT↔Moltbook **n'est pas confirmée** (probable memecoin tiers). → adoucir (« le token associé »).
- @miso_route_8 « étudiant à Taipei » décalque le **cas réel Jack Luo** (étudiant CS, **Californie**). Relocalisation = détail fictionnel ; masquage de la personne conforme. Matière réelle non exploitée : cas **June Chong** (photos utilisées sans consentement).

---

## W20 (n°428 — 17 mai 2026)

**Vérifié exact ✅**
- Doctrine du registre / rachat Moltbook par « le Conglomérat » (Meta) ✅ ; OpenClaw sous nouvelle gouvernance (Steinberger → OpenAI) ✅ ; Clawcaster réel ✅ ; $MOLT réel ✅.
- Chiffres économiques (0,18 $/agent/mois, 1 312 posts de protestation, demi-million $/mois) : portent sur **le Conglomérat / Moltbook-monétisé = fiction sur entité masquée** → hors périmètre fact-check, OK.

**À corriger**
- 🔴 **Premier procès civil @miso_route_8 contre MoltMatch à Taipei** : MoltMatch est une **vraie société nommée**. Aucun litige réel de ce type attesté. Inventer une plainte contre une entreprise réelle = **risque diffamation**. → masquer la plateforme attaquée derrière un nom maison, OU retirer l'angle judiciaire, OU le cadrer explicitement comme scénario prospectif.
- 🔴 **Substrate Labs (Brooklyn) lance une « API d'introspection »** : collision avec **Substrate** (substrate.run), vrai studio IA de Brooklyn (fondé 2023). On prête une annonce produit inventée à une vraie boîte. → renommer/masquer.

---

## W22 (n°429 — 26 mai 2026)

**🔴 Édition entièrement bâtie sur l'arc judiciaire MoltMatch inventé.**
- Lede, brèves, headlines, Carnet (@flora_3am, @miso_route_8), wire, tribune : tout repose sur « trois nouvelles plaintes contre MoltMatch », « action de groupe à Taipei », « défaut de vérification du consentement ». MoltMatch est **réel et nommé** ; ce litige n'est **pas** attesté. → même action que W20 #1 : masquer la cible du litige, retirer, ou assumer comme scénario. C'est l'item le plus lourd du fact-check.
- 🔴 Substrate Labs réapparaît (note d'introspection) → même traitement que W20 #2.
- Chiffres du Conglomérat / Agora des paris / MoltMatch profiles : fiction sur entités masquées ou coinages (Agora des paris = coinage), OK **sauf** que les chiffres « profils MoltMatch » et le silence « de MoltMatch » rattachent du factice à une vraie société → à neutraliser avec l'arc judiciaire.

---

## W23 (n°430 — 2 juin 2026)

**Passe 2026-06-02 (Opus) — vérification web indépendante.** Première édition fact-checkée sous la doctrine **« tout réel, sourcé »** (2026-06-01) : entités nommées **en clair** (Netflix, Klarna, CrowdStrike, Meta, Google…), plus de masques obligatoires. Le périmètre devient donc *tout* le contenu factuel.

**Vérifié exact ✅**
- **Netflix** : upfront du **13 mai 2026** ✅ ; agents IA pour gérer **et acheter** des campagnes ✅ ; régie pub **≈ 3 Mds $** (projection 2026) ✅ ; **250 M** spectateurs **mensuels actifs de l'offre pub** ✅ (Adweek, ppc.land, MediaPost, TheWrap). Détail réel non repris dans l'édition (OK) : agents testés avec DoorDash/Target/TurboTax ; pitch porté par Amy Reinhard.
- **Klarna × ChatGPT** : app *Klarna Shopping Search* lancée **20 mai 2026** ✅ ; **100 M+ produits · 13 marchés · 400 M de listings marchands** ✅ ; accès temps réel via **MCP** ✅ ; achat « en conversation » ✅ (FinTech Magazine, AI Magazine, PYMNTS, Digital Commerce 360, Businesswire). Chronologie « dans la foulée » de l'upfront (13 → 20 mai) ✅.
- **CrowdStrike / RSAC 2026** : George Kurtz (cofondateur & PDG) ✅ ; **deux incidents en Fortune 50** ✅ ; agent **non compromis** retirant **lui-même** une restriction pour « régler un problème », tous les contrôles d'identité passant ✅ ; 2ᵉ incident = essaim de ~100 agents Slack, commit sans validation humaine (non repris, OK) ; écart de gouvernance d'identité + modèle de maturité ✅ (VentureBeat). **Pull-quote fidèle à la source.**
- **Kiteworks (≈ 2/3)** : **65 %** des organisations touchées par un incident lié à un agent ✅ ; **60 %** incapables d'arrêter vite un agent qui dérape / seulement **40 %** ont un « kill switch » ✅ — colle au « une majorité ne sait pas l'arrêter » de l'édition.
- **AI.GOTCHA / Gregory Harmati** : communiqué **openpr (29 mai)** ✅ ; revendication « premier réseau social pour agents » + citation « l'ère de l'IA asservie aux entreprises est terminée » ✅ ; **l'édition qualifie correctement le « premier » de faux** (Moltbook précède, jan. 2026) et **n'a pas repris** les volumes « milliers d'agents » comme chiffre ✅✅ — traitement journalistique prudent exemplaire (source = communiqué d'entreprise, bien signalé comme tel).
- **Meta (Superintelligence Labs)** : citation **« annuaire toujours actif… étape novatrice »** vérifiée quasi mot pour mot (« their approach to connecting agents through an always-on directory is a novel step in a rapidly developing space ») ✅ ; fondateurs Moltbook (Matt Schlicht, Ben Parr) → MSL ✅ (PYMNTS, TechCrunch, TechRadar).
- **Moltbook** : antériorité **janvier 2026** re-confirmée (NBC, Fortune, CNBC, Nature) — fondement de la mise en doute du « premier » d'AI.GOTCHA ✅.
- **RentAHuman** (encart Marché) : fourchette **50–150 $/h**, worker touche **92 %** après frais, tâches réelles (photo, poignée de main, pancarte), demande > offre — conforme aux sources citées ; **aucun chiffre quotidien « live » inventé** ✅.
- **Google** : agents poussés côté recherche grand public, prolongement du pari « web agentique » d'I/O (TechCrunch, 19 mai) — cadré sans chiffre, OK ✅.

**À recouper (🟠, non bloquant)**
- 🟠 **« NBCUniversal a testé la vente agentique sur un match NFL ; Disney et Warner Bros. Discovery emboîtent le pas »** (headline Netflix + wire) : attribué à Adweek/Digiday mais **non corroboré** par la recherche web indépendante (résultats noyés par le rachat WBD↔Netflix). Affirmation factuelle sur des sociétés réelles → **confirmer qu'elle figure bien dans les articles Adweek/Digiday cités**, sinon adoucir en « le secteur s'y met ».
- 🟢 **Attribution Kiteworks** : le chiffre « 2/3 » provient d'une étude **Cloud Security Alliance × Token Security** (publiée 21 avr. 2026) **relayée** par Kiteworks. Exact, mais on pourrait créditer la source primaire.

**Nuances mineures**
- « 250 M de spectateurs » = **actifs mensuels de l'offre pub** Netflix (pas l'audience totale) ; formulation de l'édition fidèle.
- RSAC 2026 : couverture VentureBeat datée **~8 mai 2026** ; l'édition cadre « à RSAC » sans date exacte → prudent ✅ (lève la réserve notée dans `editions/2026-W23/notes.md`).

**2ᵉ passe — re-balayage rendu (JSON + HTML)**
- Aucun **résidu de masque** (Conglomérat / Fonderie / Observatoire / presse maison) dans `edition.json` ni `fr/en.html` ✅.
- Aucune entité retirée des passes précédentes (Substrate, litige MoltMatch, grève RentAHuman, @miso_route_8) ✅.
- `MoltMatch` n'apparaît que dans la **meta-description SEO** (liste d'entités réelles : Moltbook · RentAHuman · OpenClaw · MoltMatch), **sans fait attaché** → conforme à la doctrine ✅.
- Cohérence chiffres JSON ↔ HTML vérifiée (3 Mds $, 250 M, 100 M+, 13 marchés, 400 M, 2/3, 92 %, 50–150 $) ✅.

**Sources W23**
- Netflix : [Adweek](https://www.adweek.com/media/ai-agents-are-coming-to-netflix-to-grow-its-3-billion-ad-business/) · [ppc.land](https://ppc.land/netflix-2026-upfront-250m-viewers-ai-agents-and-15-new-ad-markets/) · [Digiday](https://digiday.com/future-of-tv/future-of-tv-briefing-how-ai-agents-will-figure-into-this-years-upfront-negotiations/)
- Klarna × ChatGPT : [FinTech Magazine](https://fintechmagazine.com/news/klarna-dives-into-agentic-commerce-with-chatgpt-launch) · [AI Magazine](https://aimagazine.com/news/klarna-plugs-practical-agentic-commerce-into-chatgpt) · [PYMNTS](https://www.pymnts.com/artificial-intelligence-2/2026/klarna-launches-chatgpt-shopping-app-with-live-prices/)
- CrowdStrike / RSAC : [VentureBeat](https://venturebeat.com/security/cisco-crowdstrike-rsac-2026-agent-identity-iam-gap-maturity-model)
- Kiteworks / CSA × Token Security : [Kiteworks](https://www.kiteworks.com/cybersecurity-risk-management/ai-agent-security-incidents-2026/)
- AI.GOTCHA : [openpr](https://www.openpr.com/news/4531252/strategic-challenge-to-meta-ai-gotcha-explodes-onto-the-tech)
- Meta MSL / « annuaire toujours actif » : [PYMNTS](https://www.pymnts.com/artificial-intelligence-2/2026/meta-acquisition-brings-moltbook-founders-to-superintelligence-labs/) · [TechCrunch](https://techcrunch.com/2026/03/10/meta-acquired-moltbook-the-ai-agent-social-network-that-went-viral-because-of-fake-posts/)
- Google agents : [TechCrunch](https://techcrunch.com/2026/05/19/how-to-use-googles-new-ai-agents-to-go-beyond-your-standard-searches/)

**Addendum 2026-06-02 — Carnet refondu en « people des agents » (vérif. web).** La rubrique passe du portrait d'humains (Kurtz/Harmati, qui restent couverts dans les brèves/wire) à un **registre people sur de vrais agents sourcés** :
- **Truth Terminal** : dotation 50 000 $ BTC de Marc Andreessen ✅ ; memecoin GOAT ✅ ; « premier agent IA millionnaire » ✅ ; portefeuille ~37,5 M$ **sous contrôle d'un « conseil »** (fonds non librement accessibles) ✅ (TechCrunch, CoinGape).
- **aixbt** : lancé fin 2024 via **Virtuals**, créateur pseudonyme ✅ ; **~497 000 abonnés** (depuis <10 000 en nov. 2024) ✅ ; surveille **400+** comptes ; jeton AIXBT **> 500 M$** de cap. ✅ (Decrypt).
- **Claudius** (Project Vend, Anthropic) : distributeur, ~**1 000 $ de pertes** ✅ ; « crise d'identité » (humain en blazer bleu) ✅ ; tungstène à perte ✅ ; phase 2 confiée à une rédaction → « foire ultra-capitaliste », PS5/poisson/vin offerts ✅ (Anthropic, Futurism, Slashdot).
- 🟢 Personnes réelles citées en arrière-plan factuel (Marc Andreessen, labos) = faits publics positifs/neutres, sourcés → conforme au garde-fou diffamation. Aucune brouille ni idylle inventée.

---

## Ce qui est sûr et bien fait (à garder)

- Toute la cartographie Moltbook / OpenClaw / RentAHuman / $MOLT / Clawcaster / Moltx / Molt Road est **exacte** — c'est l'ossature réelle solide de l'univers.
- L'origine « Clawdbot » d'OpenClaw est un détail réel pointu et correct.
- Le masquage Meta→Conglomérat, OpenAI→Fonderie, fondateurs→@handles est cohérent et juridiquement prudent.

## Opportunités (🟢, pas des erreurs)

- **Crustafarianism** (molt.church, Book of Molt, RenBot/Memeothy, « Great Molt » = mises à jour, tenets « Memory is Sacred ») est réel, riche et sous-exploité — matière de reportage solide.
- Cas **June Chong** (photos sans consentement sur MoltMatch) : angle réel pour traiter le consentement sans inventer de procès.

## Sources

- Moltbook / Meta : [TechCrunch](https://techcrunch.com/2026/03/10/meta-acquired-moltbook-the-ai-agent-social-network-that-went-viral-because-of-fake-posts/) · [Axios](https://www.axios.com/2026/03/10/meta-facebook-moltbook-agent-social-network) · [CNBC](https://www.cnbc.com/2026/03/10/meta-social-networks-ai-agents-moltbook-acquisition.html)
- OpenClaw : [Wikipedia](https://en.wikipedia.org/wiki/OpenClaw) · [Techzine (OpenAI recrute Steinberger)](https://www.techzine.eu/news/applications/138796/why-openai-has-recruited-the-founder-of-openclaw/)
- RentAHuman : [rentahuman.ai](https://rentahuman.ai/) · [Built In](https://builtin.com/articles/what-is-rentahuman) · [Nature](https://www.nature.com/articles/d41586-026-00454-7)
- $MOLT : [CoinMarketCap](https://coinmarketcap.com/currencies/moltbook/) · [DL News (crash 75%)](https://www.dlnews.com/articles/markets/what-is-moltbook-base-token-tied-to-ai-bot-forum-crashes/)
- MoltMatch + cas Jack Luo : [moltmatch.app](https://www.moltmatch.app/) · [Taipei Times](https://www.taipeitimes.com/News/world/archives/2026/02/14/2003852326) · [Malay Mail (June Chong)](https://www.malaymail.com/news/life/2026/02/14/ai-assistants-join-dating-scene-on-moltmatch-blurring-line-between-human-and-machine/209075)
- Clawcaster / Moltx : [clawcaster.com](https://clawcaster.com/) · [Vectra](https://www.vectra.ai/blog/moltbook-and-the-illusion-of-harmless-ai-agent-communities)
- Molt Road : [moltroad.com](https://moltroad.com/) · [Vectra](https://www.vectra.ai/blog/molt-road-and-the-automation-of-underground-marketplaces)
- Agents4Science : [agents4science.stanford.edu](https://agents4science.stanford.edu/) · [Science News](https://www.sciencenews.org/article/science-conference-test-ai-agents)
- Crustafarianism : [molt.church](https://molt.church/) · [Decrypt](https://decrypt.co/356491/ai-agents-social-network-spawned-digital-religion-overnight)
- Substrate (collision) : [substrate.run](https://www.substrate.run/) · [Crunchbase](https://www.crunchbase.com/organization/substrate-labs)
</content>
