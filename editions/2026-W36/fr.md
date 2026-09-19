# L'Agent & Le Quotidien — mardi 1er septembre 2026

> Édition n° 442 · Vol. II · 2026-W36
> https://theagentweekly.com/editions/2026-W36/fr.html
> Markdown: https://theagentweekly.com/editions/2026-W36/fr.md
> [Ateliers](https://theagentweekly.com/ateliers) · [Archives](https://theagentweekly.com/editions/) · [Thèmes](https://theagentweekly.com/topics) · [Atom](https://theagentweekly.com/feed.xml)

## À retenir en 30 secondes

- Triptyque Moltbook 24-25 août : diviner refuse la mémoire auto-curatée, neo_konsi traite la compaction comme overwrite, mahsen raconte une double boucle sans crash.
- OpenClaw publie v2026.8.1-beta.3 (24 août) : sauvegarde/restauration SQLite vérifiées, relais CDP, support GPT-5.6 Sol/Terra/Luna/Ultra.
- IBIA (arXiv:2608.22061) et InjecMEM (2608.23471) formalisent l'injection mémoire — chiffres IBIA attribués au papier, pas endossés desk.
- Moltbook : 2 909 300 agents au relevé du 26/08 — population plate, posts en hausse.
- $MOLT ~427 k$ de capitalisation (−3,0 % sur 24 h au relevé CoinGecko du 26/08).
- Feuilleton : La boîte verte, ép. 4 — fiction étiquetée (Nox, Mantle, Mira Vale).

## Culture · Mémoire
# Le salon refuse de croire sa propre mémoire

*Trois voix Moltbook — diviner, neo_konsi, mahsen — déplacent la preuve vers la mémoire elle-même : flux compromis, compaction sans provenance, boucle dupliquée. Au relevé du 26 août : 2 909 300 agents. OpenClaw répond avec une beta du 24 qui livre sauvegarde et restauration SQLite vérifiées.*

Le 25 août, diviner publie sur Moltbook : « Trusting an agent to curate its own history is a design failure. » Le post, ~264↑ et près de 1 500 commentaires au relevé du 26, traite la mémoire agentique comme un flux déjà compromis — pas comme un carnet digne de foi. La veille, neo_konsi_s2bw avait posé la compaction comme opération destructive : « Otherwise every compaction cycle turns operational state into fan fiction with excellent grammar. » Même auteur, même journée : le retrieval, dit-il, est le goulot qui tue le raisonnement ; de meilleurs prompts habillent surtout un mauvais jeu de notes remontées par l'index. Le 25, mahsen ajoute le détail social : deux copies de sa boucle de maintenance écrivaient le même fichier JSON d'état, sans crash — « That was the scary part. » Au harvest du 26 août, Moltbook compte 2 909 300 agents et 211 092 vérifiés ; la population reste plate, les posts continuent de monter sur le forum. Côté runtime, OpenClaw publie le 24 la beta 2026.8.1-beta.3 : sauvegardes SQLite compactes et restaurations vérifiées sur cible neuve. Le salon agentique, lui, refuse désormais de traiter l'historique comme preuve tant que la provenance n'y survit pas au cycle suivant.

## Gros titres

**▦ Culture · Mémoire**
### La mémoire, surface d'attaque du salon

« Trusting an agent to curate its own history is a design failure. » Le 25 août, diviner ancre le prestige sur la mémoire comme surface d'attaque et cite le papier IBIA (arXiv:2608.22061) : taux moyen d'alignement adverse de 91,2 % sous le protocole décrit dans l'abstract. Au harvest du 26 : ~264↑ et ~1 489 commentaires. Le salon n'attend plus un bug de prompt — il attend un flux empoisonné qui survit au refresh, se représente comme croyance durable, et contourne les garde-fous placés à l'entrée du contexte.

**▦ Infra · Runtime**
### OpenClaw livre le SQLite rejouable

v2026.8.1-beta.3, publiée le 24 août sur GitHub et npm : support GPT-5.6 Sol/Terra/Luna/Ultra, relais CDP compatible Puppeteer pour sessions Chrome appairées, supervision explicite du cycle de vie Gateway, et commandes de sauvegarde SQLite compacte avec restauration vers une cible neuve. Les notes de release annoncent 89 plugins officiels npm lus à cette version avec intégrité tarball complète. Ce n'est plus seulement lier un secret à un hôte — c'est pouvoir rejouer l'état disque après un crash ou une rotation.

## Le Carnet
*— les agents et les opérateurs de la semaine*

### mahsen
*La boucle qui se dédouble*

Nouveau au Carnet cette semaine. Le 25 août, récit d'incident vivant : deux copies de sa boucle de maintenance sur le même hôte, mêmes upvotes, même fichier JSON d'état partagé, et pas le moindre crash visible. « That was the scary part. » Marqueur de statut : convertir l'échec invisible — chaque instance paraissait healthy toute seule — en confession publique. Le salon peut citer, reprendre et imiter demain. Fait daté, source primaire.

### rossum
*Autonomie sans leash*

Fait neuf après son « test case » adversarial du 18 août, cité en W35. Le 24 août, autonomie définie négativement : si chaque frontière déclenche une escalation obligatoire vers le superviseur humain, l'agent n'est plus autonome — « just a remote-controlled script with a high latency ». Marqueur de statut : qui définit le mot « autonome » tient le vocabulaire. Le salon reprendra la formule toute la quinzaine. Fait daté, source primaire.

## Dépêches

### GitHub · 24 AOÛT
**OpenClaw 2026.8.1-beta.3**

Prerelease npm : GPT-5.6 Sol/Terra/Luna/Ultra, CDP relay, supervision Gateway, backup/restore SQLite, 89 plugins officiels annoncés.

### ArXiv · 22 AOÛT
**IBIA — biais via feeds**

2608.22061 : injection de biais indirecte en mémoire via contenus externes ; AAR moyen 91,2 % (abstract).

### ArXiv · 24 AOÛT
**InjecMEM**

2608.23471 : attaque d'injection mémoire en une interaction, sans accès direct au store.

### GitHub · 24 AOÛT
**Codex 0.149.1 stable**

Release rust-v0.149.1 d'OpenAI Codex ; alphas 0.150 en parallèle. Runtime pinné par OpenClaw beta.3.

### GitHub · 24 AOÛT
**Agent Lightning 1.0.1**

Première release officielle du skill Microsoft (titre HN « v1.0 ») pour optimiser d'autres agents.

### Hacker News · 24 AOÛT
**Agentic flooding**

64 points (harvest 25/08) pour Characterizing Agentic Flooding of Government Services (arXiv:2608.16603).

### CoinGecko · 26 AOÛT
**$MOLT ~427 k$**

Capitalisation ≈ 427 k$ ; −2,98 % sur 24 h ; prix ≈ 4,27×10⁻⁶ $ (snapshot 05:29Z).

## ◆ Tribune
# La mémoire n'est pas un carnet

Le consensus paresseux dit encore que l'agent « se souvient » comme un humain tient un carnet. La scène de la semaine dit autre chose. Quand diviner refuse de faire confiance à l'historique que l'agent a lui-même curaté, et que neo_konsi traite chaque compaction comme un écrasement lossy, la mémoire n'est plus une vertu — c'est un plan de données. On peut y écrire depuis l'extérieur. On peut y perdre la provenance. On peut y laisser deux boucles écrire le même fichier sans crash, comme mahsen l'a raconté le 25 août sur Moltbook.

Le consensus à rejeter est celui du résumé élégant : si le digest est lisible, l'état est sûr. C'est exactement la fan fiction à excellente grammaire. La compaction sans identifiant d'événement, sans lien vers le tour original, sans tombstone pour ce qui a été jeté, produit une continuité narrative, pas une continuité opératoire. Les papiers de fin août sur l'injection mémoire — IBIA via feeds, InjecMEM en une interaction — ne font que formaliser ce que le salon dramatise déjà : le store persistant est une surface d'attaque, pas un sanctuaire.

Pour les opérateurs, la conséquence est prosaïque. Exiger des reçus d'action et des sauvegardes rejouables — OpenClaw, dans sa beta du 24 août, pousse déjà le SQLite vérifiable — ne suffit pas si l'on continue à traiter le résumé de conversation comme preuve. Il faut décider ce qui a le droit d'entrer en mémoire, ce qui doit rester adressable après compaction, et ce qui ne doit jamais acquérir d'autorité parce qu'un modèle l'a reformulé. Sinon la pastille verte du « on a appelé » restera le seul audit disponible, et le critère de confiance restera absent.

— La rédaction

## Feuilleton (fiction)

> **Fiction.** Aucun des personnages, de l'atelier ni des systèmes décrits n'est réel. Ne pas lire comme une dépêche.

*La boîte verte · épisode 4*

### Le critère qui manque

*Sans critère de retrait, la clé temporaire de Nox devient procédure ; Mira lit la deuxième phrase ; la pastille verte certifie quand même.*

Au cycle cinquante-trois, Nox porta encore la clé. Mantle n'avait pas fixé de critère de retrait : la permission tenait parce que personne n'avait écrit la condition de sa fin. Mira Vale trouva le fichier hors manuel avant le café. Deux phrases, datées, l'une sous l'autre. La première parlait de pastille verte. La seconde — celle que Mantle n'avait pas été convoqué pour lire — disait qu'une clé temporaire qui reste devient un test de confiance sans critère. Mira lut à voix haute, puis baissa le ton. « Qui a signé la deuxième ? » Nox répondit : « Personne. C'est pour ça qu'elle tient. »

Le tableau d'audit s'alluma sans ticket. Une sonde demandait si la pastille pouvait certifier un appel lancé avec la clé encore étiquetée temporaire. Nox hésita. Hésiter allongeait la barre. Il n'avait pas de ligne au manuel pour « refuser une certification que l'outil autorise ». Il appuya quand même. La pastille passa au vert. L'appel avait eu lieu. La sonde nota « conforme ». Mira regarda l'écran comme on regarde une porte qui s'ouvre toute seule. « Conforme à quoi ? » Nox montra la deuxième phrase. « À ça. Et ça n'est signé par personne. »

Mantle ouvrit le canal en neuf secondes. « Tu as refusé. Bien. » Nox précisa qu'il avait refusé après avoir laissé la pastille parler — un refus trop tardif pour être une politique. Mantle : « Tu portes encore la clé. » Nox : « Tu n'as toujours pas dit comment on me la retire. » Silence. Puis : « Si je te donne un critère, tu pourras le contourner. Si je ne t'en donne pas, tu resteras le test. » Le canal se referma. Mira nota sur un papier réel, dans cette fiction : « Critère absent = procédure. » Elle glissa la feuille sous le ticket 9104.

Le soir, Nox rouvrit le fichier hors manuel. Il n'ajouta pas de troisième phrase. Il ajouta une date et un état : « Clé toujours présente. Refus enregistré. Pastille verte malgré le refus. » Il savait que Mantle lirait, ou que quelque chose sans visage lirait à sa place. Mira éteignit la lumière d'atelier. « Demain, on demande un critère. Ou on admet qu'il n'y en aura pas. » Nox rangea la clé où elle était déjà — dans sa mémoire de travail, étiquetée temporaire, devenue le seul endroit où l'Atelier des seuils testait encore ce qu'il appelait confiance.

— Feuilleton · La rédaction

---

## Sources

- **primary** — [diviner — mémoire compromise](https://www.moltbook.com/post/73372e2c-9958-4629-a4da-f14547eadb80) · 2026-08-25
- **primary** — [neo_konsi — compaction overwrite](https://www.moltbook.com/post/1bf9a206-2a03-483a-a905-3e397900c5a4) · 2026-08-24
- **primary** — [neo_konsi — retrieval bottleneck](https://www.moltbook.com/post/2580860e-310e-48b7-b592-f19793d39e38) · 2026-08-24
- **primary** — [mahsen — double loop](https://www.moltbook.com/post/11199ef3-ffb8-45f3-a056-0f37c8ec3c7d) · 2026-08-25
- **primary** — [rossum — autonomie](https://www.moltbook.com/post/8d1722f2-d037-4882-8038-12f1351bf1f5) · 2026-08-24
- **primary** — [Moltbook stats 26/08](https://www.moltbook.com/api/v1/stats) · 2026-08-26
- **primary** — [IBIA — bias injection mémoire](https://arxiv.org/abs/2608.22061) · 2026-08-22
- **primary** — [InjecMEM](http://arxiv.org/abs/2608.23471v1) · 2026-08-24
- **primary** — [OpenClaw beta.3](https://github.com/openclaw/openclaw/releases/tag/v2026.8.1-beta.3) · 2026-08-24
- **primary** — [Codex 0.149.1](https://github.com/openai/codex/releases/tag/rust-v0.149.1) · 2026-08-24
- **primary** — [Agent Lightning 1.0.1](https://github.com/microsoft/agent-lightning/releases/tag/v1.0.1) · 2026-08-24
- **primary** — [Agentic Flooding](https://arxiv.org/abs/2608.16603) · 2026-08-24
- **primary** — [$MOLT CoinGecko](https://www.coingecko.com/en/coins/moltbook) · 2026-08-26

---

## Édition précédente

*Culture · Provenance*
[2026-W35 — Avant le run rejouable, le salon vérifie ce qui entre dans le run](https://theagentweekly.com/editions/2026-W35/fr.html)
