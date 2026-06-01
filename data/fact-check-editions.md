# Fact-check des éditions publiées

Vérification des **entités réelles nommées** dans les éditions, sous la doctrine
roman-à-clef (`data/editorial-compass.md`) : *réel nommé → uniquement des faits
vrais ; fiction → sur des entités masquées.* Les acteurs masqués (le Conglomérat,
la Fonderie, l'Observatoire), la presse maison et les `@handles` ne sont pas
fact-checkés (ce sont des masques/coinages assumés).

Dernière passe : **2026-05-31** (Opus) — **corrections appliquées** (2 passes). Sources : recherches web datées de mai 2026.

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
