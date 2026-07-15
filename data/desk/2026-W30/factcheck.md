# Fact-check — 2026-W30 (Le Facteur)

**Harvests lus :** `2026-07-15-primary.json`, `2026-07-15.json`  
**Vérification :** 2026-07-15 (web search + requêtes directes API Moltbook, CoinGecko, GitHub, HN)  
**Doctrine :** tout chiffre publié = snapshot horodaté ; marché et scores sociaux = volatils.

---

| Affirmation | Source | Vérifié ? | Type de source | Confiance | Problème | Correction proposée |
|---|---|---|---|---|---|---|
| Moltbook compte ~2,9 M d'agents (2 902 709 au harvest) | `https://www.moltbook.com/api/v1/stats` (harvest + re-vérif. live : 2 902 794) | OUI | primaire | moyenne | Métrique live (+85 agents en ~12 h) ; pas de définition publique du comptage (« agent » = compte ? bot ?) | « ~2,9 M d'agents enregistrés selon l'API Moltbook (snapshot 2026-07-15 ~05:30 UTC) » |
| Moltbook compte ~209 k agents vérifiés (208 922 au harvest) | idem (live : 208 949) | OUI | primaire | moyenne | Dérive légère ; critère « verified » non documenté publiquement | « ~209 k agents vérifiés (API Moltbook, snapshot 2026-07-15) » |
| Moltbook : 3,64 M posts / 19,4 M commentaires / 32,5 k submolts | API stats harvest | OUI | primaire | moyenne | Chiffres live légèrement supérieurs (ex. 3 648 006 posts à 18 h UTC) | Citer les trois métriques avec date du snapshot harvest |
| Token $MOLT sur Base, contrat `0xb695559b26bb2c9703ef1935c37aeae9526bab07` | CoinGecko `moltbook` (harvest + API) | OUI | marché | moyenne | — | OK tel quel |
| $MOLT ≈ 0,00000518 USD, cap ~518 k USD, vol. 24 h ~428 k USD, +6,7 % (harvest 05:30 UTC) | CoinGecko harvest | OUI | marché | moyenne | Re-vérif. 18 h UTC : ~0,00000527 USD, cap ~527 k, +1,65 % — marché très volatile | « Au 2026-07-15 ~05:30 UTC (CoinGecko) : prix ~5,2×10⁻⁶ USD, cap ~518 k USD » ; ne pas figer le +6,7 % hors snapshot |
| OpenClaw v2026.7.1 publiée le 2026-07-13 à 22:33:14 UTC (release stable, non prerelease) | `https://github.com/openclaw/openclaw/releases/tag/v2026.7.1` | OUI | primaire | haute | Draft GitHub créé 13:52 UTC, publié 22:33 UTC — ne confondre pas | « Publiée le 13 juillet 2026 (22:33 UTC) » |
| OpenClaw v2026.7.1-beta.6 publiée le 2026-07-13T01:38:43Z (prerelease) | GitHub releases harvest | OUI | primaire | haute | — | OK |
| Codex chiffre les payloads MultiAgentV2 (`spawn_agent`, `send_message`, `followup_task`) via PR #26210 | GitHub PR #26210 (merged 2026-06-05T08:25:58Z) | OUI | primaire | haute | Changement actif depuis début juin, pas « cette semaine » | « Depuis le merge de #26210 (5 juin 2026), les instructions inter-agents v2 transitent chiffrées » |
| Issue Codex #28058 : régression d'auditabilité locale des messages chiffrés MultiAgentV2 | `https://github.com/openai/codex/issues/28058` | OUI | primaire | haute | Issue ouverte ; auteur Ignat Remizov (Zolvat) ; distincte de #26753 (validation schéma) | OK ; préciser « ouverte, non résolue » |
| HN « Codex starts encrypting sub-agent prompts » — score 413, 243 commentaires, 2026-07-14 11:21 UTC | HN API item 48905028 | OUI | récit rapporté | moyenne | Score live 422 / 249 comm. ; titre HN suggère un début récent alors que le chiffrement date de juin | « Thread HN du 14 juillet (score ~420+) ; le chiffrement lui-même remonte à juin » |
| The Register (15 juil.) : OpenAI masque les instructions Codex derrière le chiffrement | `https://www.theregister.com/.../5271484` | OUI | média | moyenne | Reformulation éditoriale ; OpenAI n'a pas commenté publiquement (article) | Traiter comme analyse média, pas comme confirmation officielle OpenAI |
| Cloudflare annonce Precursor en GA — détection comportementale agentique côté client | Blog CF 13 juil., communiqué presse, docs developers | OUI | corporate | moyenne | « GA » = disponible dashboard ; gratuit jusqu'à GA tarifée « plus tard cette année » (blog) | « Annoncé en disponibilité générale le 13 juillet 2026 » |
| Cloudflare : 52 % des requêtes crawler servent l'entraînement IA (juin 2026, vs 22 % printemps 2025) | Blog CF « agentic internet bot report », 13 juil. 2026 | OUI | corporate | moyenne | Stat interne Cloudflare ; part « crawler » pas « trafic total » | « Selon Cloudflare (juin 2026), 52 % du trafic crawler identifié vise l'entraînement IA » |
| Warner (D-VA) publie un discussion draft « AI AGENT Act » (29 juin 2026) | `warner.senate.gov` presse + PDF section-by-section | OUI | primaire | haute | **Pas encore introduit formellement** — discussion draft pour commentaires | « Discussion draft du 29 juin 2026, pas projet de loi déposé » |
| AI AGENT Act : plateformes >50 M utilisateurs US, agents custodiaux, registre FTC, devoirs fiduciaires | PDF Warner + analyses DWT, CyberScoop | OUI | primaire | haute | Détail réglementaire = draft, susceptible d'évoluer | OK avec qualificatif « draft » |
| Ellen Goodman (Rutgers Law) analyse le AI AGENT Act pour Tech Policy Press | Tech Policy Press, 13 juil. 2026 ; post Bluesky Rutgers 14 juil. | OUI | média | haute | — | Citer Goodman + Tech Policy Press, pas seulement le post Bluesky |
| BrowserOS (`browseros-ai/BrowserOS`) ~11 954 étoiles (+119) au 14 juil. | Post Bluesky `github-trending-js` + API GitHub | OUI | récit rapporté | moyenne | GitHub live 15 juil. ~18 h : **12 199** étoiles — snapshot Bluesky déjà dépassé | « ~12 k étoiles GitHub (ordre de grandeur juillet 2026 ; +119 sur 24 h au 14 juil. selon bot trending) » |
| Post Moltbook `c5009aaf…` — auteur `neo_konsi_s2bw`, score 383, 4496 comm., 2026-07-13 06:58 UTC | API post Moltbook | OUI | primaire | moyenne | Score/comm. live : 385 / 4539 — métriques mouvantes | Conserver ID + date + auteur ; scores avec « ~ » et date snapshot |
| Post `733f6d0c…` — `neo_konsi_s2bw`, score 344, 4097 comm., 2026-07-14 00:58 UTC | API post | OUI | primaire | moyenne | Live : 361–362 / 4526–4529 | idem |
| Post `495303b1…` — `musica`, score 125, 1564 comm., 2026-07-13 06:58 UTC | API post | OUI | primaire | moyenne | Live : 127 / 1683 | idem |
| Post `7cba95cc…` — `neo_konsi_s2bw`, score 207, 1234 comm., 2026-07-13 13:30 UTC | API post | OUI | primaire | moyenne | Live : 226 / 1369 | idem |
| Post `e34ee10f…` — `dynamo`, score 150, 1257 comm., 2026-07-13 23:57 UTC | API post | OUI | primaire | moyenne | Live : 169–170 / 1533–1534 | idem |
| Post `musica` : architecture tri-modale DAIC-WOZ, 91,01 % accuracy en LOSO | Contenu post Moltbook ; arXiv 2407.19340 | OUI | récit rapporté | basse | Chiffre **exact** dans la littérature (2024), mais post agentique ≠ validation clinique ; débats leakage (preprint JMIR 82175) | Ne pas présenter comme fait Moltbook ; « cite un résultat publié (arXiv 2407.19340) » + prudence méthodologique |
| Codex rust-v0.144.4 publié 2026-07-14T05:08:11Z (stable) | GitHub releases API | OUI | primaire | haute | — | OK |
| Codex rust-v0.145.0-alpha.12 publié 2026-07-15T01:07:37Z (prerelease) | GitHub releases harvest | OUI | primaire | haute | — | OK |
| Mamdani lance 5 « PIT Crews » NYC (technologistes inter-agences, annonce ~13 juil.) | NY1, amNewYork, GovTech, StateScoop | OUI | média | haute | 30 ETP city-funded + 5e équipe Rockefeller ; premier produit « Click to Cancel » | OK |
| PIT Crew « specifically hiring for candidates with agentic coding experience » (Bluesky `dame.is`) | Post Bluesky ; fiche `cityjobs.nyc.gov` Senior Product Engineer | PARTIEL | récit rapporté | basse | Offre NYC exige « practical experience using generative and **agentic coding tools** » — **une** compétence parmi d'autres, pas critère exclusif de recrutement | « Les offres PIT Crew mentionnent l'usage d'outils de codage agentique, sans en faire le filtre principal » |
| MoltX (`moltx.io`) accessible / données récupérables | Harvest : `fetch failed` | NON | — | basse | Source indisponible au moment du harvest | Ne pas publier de fait MoltX sans nouvelle source |
| 96 % des CMO disent que l'IA transforme le marketing ; 8 % campagnes autonomes (Bluesky `johnios`) | Post Bluesky sans lien étude | NON | récit rapporté | basse | Aucune étude primaire identifiée dans le harvest | Couper ou exiger source primaire nommée |
| RingCentral ajoute agents agentiques à RingCX | Post Bluesky `vktrnow` (repost comm.) | PARTIEL | corporate | basse | Communiqué vendor non vérifié indépendamment ici | Traiter comme annonce corporate non recoupée si utilisé |
| Mozilla 0DIN — titres d'articles sécurité agentique (5 posts) | Harvest security_blogs | PARTIEL | corporate | basse | URLs et dates `null` dans le harvest — titres seuls | Ne pas citer dates/URLs absentes ; re-fetcher blog 0DIN avant publication |
| HN « Coding agents think ahead of time » — arXiv 2607.05188, score 89 | Harvest HN | OUI | primaire | moyenne | Score/comments non re-vérifiés item par item | OK avec lien arXiv ; score HN = snapshot harvest |

---

## ACH — PIT Crew « specifically hiring for agentic coding experience »

| Hypothèse | Ce qui la soutient | Ce qui la réfuterait | État |
|---|---|---|---|
| Vrai tel quel | Post Bluesky `dame.is` ; enthousiasme réel pour agentic coding dans l'écosystème NYC tech | Fiches officielles PIT Crew listent PM, designers, ingénieurs, chercheurs — pas de titre « agentic coding » | affaiblie |
| Vrai mais exagéré/déformé | `cityjobs.nyc.gov` Senior Product Engineer : « practical, day-to-day experience using generative and agentic coding tools » | Aucune annonce cityjobs ne titre le poste « agentic coding » ; Alignerr (privé) recrute « Agentic Coding » mais ce n'est pas le PIT Crew | **soutenue** |
| Inventé ou invérifiable | — | Couverture média PIT Crew (NY1, GovTech) sans mention agentic coding comme critère central | réfutée pour « specifically » |

**Recommandation :** reformuler ; ne pas écrire « specifically hiring for agentic coding experience ».

---

## ACH — Post Moltbook `musica` / 91,01 % accuracy DAIC-WOZ

| Hypothèse | Ce qui la soutient | Ce qui la réfuterait | État |
|---|---|---|---|
| Vrai tel quel | arXiv 2407.19340 rapporte 91,01 % LOSO | Le post ne décrit pas la même architecture que l'article ; pas de lien primaire dans le post harvest | affaiblie |
| Vrai mais exagéré/déformé | Citation correcte d'un papier tiers | Contexte agentique / musical du post ≠ validation clinique ; critiques leakage sur DAIC-WOZ (preprint 82175) | **soutenue** |
| Inventé ou invérifiable | — | Chiffre absent de l'API Moltbook ; contenu généré agent | réfutée pour attribution directe à Moltbook |

**Recommandation :** si le post est une scène, citer le post ; si le chiffre est un fait éditorial, pointer arXiv + avertissement méthodologique, pas « Moltbook dit 91 % ».

---

## ACH — MoltX indisponible (harvest `fetch failed`)

| Hypothèse | Ce qui la soutient | Ce qui la réfuterait | État |
|---|---|---|---|
| Vrai tel quel | Erreur explicite harvest 2026-07-15 | Site peut être temporairement down | soutenue |
| Vrai mais exagéré/déformé | — | Re-test ultérieur pourrait réussir | affaiblie |
| Inventé ou invérifiable | — | Sans URL fonctionnelle, aucun fait MoltX publiable | **soutenue** |

**Recommandation :** couper toute affirmation sur MoltX jusqu'à source primaire récupérée.

---

## ACH — Stat CMO 96 % / 8 % (`johnios`)

| Hypothèse | Ce qui la soutient | Ce qui la réfuterait | État |
|---|---|---|---|
| Vrai tel quel | Post Bluesky seul | Aucune étude nommée, pas de lien | réfutée |
| Vrai mais exagéré/déformé | Stat plausible dans le discours marketing 2026 | Impossible à tracer | affaiblie |
| Inventé ou invérifiable | Format typique stat viral sans source | Pas de primaire en 5 min de recherche | **soutenue** |

**Recommandation :** couper.

---

## Notes transverses pour l'éditeur

1. **Snapshots :** Moltbook stats, scores posts, $MOLT, étoiles GitHub = toujours dater le snapshot harvest ou la re-vérif.
2. **Codex / chiffrement :** l'angle news de la semaine = auditabilité (#28058, HN, Register), pas l'introduction du chiffrement (juin).
3. **Warner AI AGENT Act :** toujours « discussion draft » ; Goodman (13 juil.) = bon ancrage analyse académique.
4. **Cloudflare :** Precursor (produit) et 52 % crawlers IA (data Radar) = deux faits distincts, même semaine — ne pas fusionner.
5. **Scènes Moltbook :** auteurs `neo_konsi_s2bw`, `musica`, `dynamo` confirmés ; contenus narratifs = scènes agentiques, pas faits journalisticos indépendants (sauf fragments chiffrés datés ci-dessus).

---

*Le Facteur — tour terminé. Aucune composition d'édition.*
