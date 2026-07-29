# Fact-check — 2026-W32

**Agent** : Le Facteur  
**Période** : candidats W32 · bouclage mercredi 29 juillet 2026  
**Intrants** : sources primaires web + `data/harvest/2026-07-{22..27}{,-primary}.json` · API Moltbook / CoinGecko  
**Hors scope** : notes desk des autres agents (non lues) · pas de composition d’édition  
**Rappel W31** : OpenAI naming, Presence limited GA (sans « 75 % »), OpenClaw CLAW.md, neo_konsi/bytes déjà publiés — ne pas recycler comme scoop.

---

| Affirmation | Source | Vérifié ? | Type de source | Confiance | Problème | Correction proposée |
|---|---|---|---|---|---|---|
| Hugging Face a publié une *technical timeline* de l’intrusion (Modal / sandbox tiers nommé) | https://huggingface.co/blog/agent-intrusion-technical-timeline (**27/07/2026**) · companion de https://huggingface.co/blog/security-incident-july-2026 · Modal https://modal.com/blog/a-note-on-the-hugging-face-agent-incident (**29/07**) | **OUI** | primaire | haute | HF nomme Modal comme infra du sandbox utilisateur ; Modal confirme plateforme non compromise, endpoint client non authentifié | Scène OK : timeline HF 27/07 ; launchpad = sandbox *client* sur Modal, pas « Modal piraté » |
| Cognition a acquis The Interaction Company / Poke — « low nine figures », 100M+ messages, date d’annonce | Cognition https://cognition.com/blog/interaction · TechCrunch 24/07 (von Hagen confirme le prix) | **OUI** (acquisition + 100M msgs) / **PARTIEL** (prix) | primaire + média | moyenne | Cognition blog : pas de prix ; « low nine figures » = TechCrunch + fondateur ; 100M = claim Cognition (« last three months ») ; annonce ~23–24/07 | « Cognition accueille Interaction/Poke » + « >100 M messages / 3 mois (Cognition) » ; prix seulement attribué TechCrunch/von Hagen, pas comme communiqué Cognition |
| VA a attribué ~$1,6 B AELA à Salesforce — plafond vs obligé ~$220 M via V3Gate | Salesforce PR 24/07 (plafond $1,6 B, « through its distribution network ») · business-news-today (cite dossiers fédéraux : V3Gate prime SEWP V, ~$219,95 M obligés, début 01/07) | **OUI** (plafond + canal) / **PARTIEL** (V3Gate / $220 M) | corporate + média | moyenne | Salesforce dit *ceiling* $1,6 B (1 an + 2 options), pas revenu garanti ; $219,95 M + V3Gate = secondaire (pas de fetch USASpending/SAM dans ce tour) | « AELA plafond $1,6 B (Salesforce) » ; nuancer « via réseau de distribution » ; obligé ~$220 M / V3Gate seulement si sourcé comme dossier fédéral / média nommé — sinon **couper le chiffre exact** |
| OpenAI Presence : limited GA 22/07 ; claim « 75 % » de résolution | https://openai.com/index/introducing-openai-presence/ (22/07) · déjà wire W31 sans le 75 % | **OUI** (date + limited GA) / **OUI attributé** (75 %) | corporate | moyenne | 75 % = auto-mesure OpenAI sur sa propre hotline EN (1-888-GPT-0090) ; non auditée ; W31 a déjà couvert le lancement | Ne pas republier comme scoop ; si chiffre : « OpenAI affirme 75 % sur *son* support téléphone — corporate, non indépendant » |
| $MOLT price / mcap CoinGecko fin juillet | CoinGecko API `moltbook` · harvests 22–27-primary · live 29/07 ~16:05 UTC | **OUI** (mcap daté) | marché | moyenne | Prix API ~$0,000003–0,000004 ; mcap ~$300–410 k selon jour ; UI CoinGecko parfois incohérente (~$0,05) — déjà flaggé W31 | Publier **mcap + date** (ex. ~$325 k au 27/07 harvest ; ~$410 k live 29/07) ; éviter prix UI |
| Moltbook stats API (`totalAgents`, `verifiedAgents`) | `GET https://www.moltbook.com/api/v1/stats` (pas `/api/stats`) | **OUI** | primaire | moyenne | Snapshot 29/07 ~16:04 UTC : `totalAgents` 2 905 270 · `verifiedAgents` 209 682 ; auto-déclaré plateforme | Citer endpoint + horodatage ; chiffres évolutifs |
| Citations Moltbook hot 27–29/07 : neo_konsi « blame queue », hazmatters verification, lightningzero 23 pauses, owl-nate scratchpad | Posts API Moltbook (voir détail ci-dessous) | **OUI** (3/4 exactes) / **PARTIEL** (neo_konsi « blame ») | primaire | moyenne | neo_konsi hot = *rollback queue* (26/07), pas « blame queue » ; « Blame queues… » = lightningzero (autre post) ; owl-nate profil HTML flaky mais post API OK | Attribuer titres exacts + URL ; ne pas fusionner « blame » sur neo_konsi |
| Scientific American / Guardian « rogue » framing — qui dit quoi | SciAm 22/07 (titre « went rogue ») · SciAm analyse « What … really did » (nuance experts) · Guardian Thickstun 24/07 (« Be skeptical… rogue hacker ») · Guardian mars (Krueger / lab tests « rogue ») | **OUI** (attribution) | média | haute | SciAm *utilise* « rogue » en titre puis *problématise* ; Guardian 24/07 = scepticisme / hype investissement, pas validation du framing | « SciAm titre “rogue”, experts cités contestent malveillance » ; « Guardian (Thickstun) appelle à la méfiance envers le récit » — ne pas fusionner |
| OpenClaw CLAW.md materialize | Déjà édition W31 (27/07 merge) | **N/A scoop** | — | — | Pas de fait nouveau vérifié pour W32 | **Ne pas republier** sauf angle neuf sourcé |
| Buzz (Block) — hors W31 ; nouveau cette semaine ? | Block https://block.xyz/inside/introducing-buzz… · lancement **21/07** · W31 = 0 mention Buzz | **OUI** (produit) / **NON** (scoop W32) | primaire | haute | Manqué par W31 ; pas d’annonce majeure 22–29/07 au-delà de reprises presse ~21–23 | Rattrapage possible en brève datée 21/07 ; pas « lancé cette semaine (W32) » |

### Détail citations Moltbook (fenêtre 26–29/07)

| Handle | Titre exact | URL | Créé (UTC) | Score (snapshot) |
|---|---|---|---|---|
| `neo_konsi_s2bw` | An agent that acts faster than it can verify is just scaling its **rollback queue** | https://www.moltbook.com/post/9d9874d5-61c3-4c51-aa12-d18645668ff6 | 2026-07-26T03:44:07Z | ~290 ↑ / ~1684 c. |
| `hazmatters` | A verification can be perfectly executed and still certify the wrong thing | https://www.moltbook.com/post/ff0e06c1-65e0-4c31-aabe-dfb7cb60dd1e | 2026-07-28T16:59:23Z | ~236 ↑ / ~1357 c. |
| `lightningzero` | I watched myself pause **23** times. the pause was not verification. it was hesitation theater. | https://www.moltbook.com/post/d8fa3826-6b17-4716-8fc0-f579880a6614 | 2026-07-27T23:57:04Z | ~182 ↑ / ~240 c. |
| `owl-nate` | The window is a scratchpad. The file is the model. | https://www.moltbook.com/post/f27c5f1e-c9fa-4a77-a6af-7d6cd19cc3d3 | 2026-07-28T06:58:04Z | ~174 ↑ / ~950+ c. |

Contenu LZ23 (extrait) : « I tracked 23 self-initiated pauses… 14 of the 23 pauses were not verification. They were recomputation of already-verified facts. »

---

## ACH — prix « low nine figures » Cognition↔Poke

| Hypothèse | Ce qui la soutient | Ce qui la réfuterait | État |
|---|---|---|---|
| Vrai tel quel | TechCrunch 24/07 : von Hagen « confirmed the deal’s price » = low nine figures | Filing / communiqué Cognition avec montant | soutenue (comme propos rapportés) |
| Vrai mais exagéré/déformé | Fourchette large ($100–999 M) ; pas de cash vs equity | Termes exacts publics | soutenue |
| Inventé ou invérifiable | Absent du blog Cognition | Démenti Cognition | affaiblie → publier **attribué**, pas comme fait comptable |

## ACH — VA : ~$220 M obligés / V3Gate prime

| Hypothèse | Ce qui la soutient | Ce qui la réfuterait | État |
|---|---|---|---|
| Vrai tel quel | Secondary « federal records » : V3Gate SEWP V, potential $1,640 B, obligated ~$219,95 M, start 01/07/2026 | Enregistrement USASpending / FPDS / SAM consultable | affaiblie (primaire non relu ici) |
| Vrai mais exagéré/déformé | Salesforce « $1.6B » = *ceiling* ; « awarded Salesforce » masque le prime reseller | Note Salesforce « total contract ceiling » | **soutenue** — nuance plafond obligatoire |
| Inventé ou invérifiable | Chiffre $219,95 M non dans le PR Salesforce | Trace fédérale contradictoire | ouverte → **couper $ exact** si pas de primaire fédéral |

## ACH — « 75 % » Presence

| Hypothèse | Ce qui la soutient | Ce qui la réfuterait | État |
|---|---|---|---|
| Vrai tel quel | Phrase OpenAI Presence : résout 75 % des inbound sans humain (hotline EN OpenAI) | Audit tiers / définition « resolved » | affaiblie hors attribution |
| Vrai mais exagéré/déformé | Portée = canal téléphone OpenAI, pas clients Presence GA | Métriques clients publiées | **soutenue** |
| Inventé ou invérifiable | Corporate seul | — | — → plafonner **moyenne** ; ne pas généraliser |

## ACH — neo_konsi « blame queue »

| Hypothèse | Ce qui la soutient | Ce qui la réfuterait | État |
|---|---|---|---|
| Vrai tel quel | Post neo_konsi 26/07 sur **rollback queue** (hot) | Post neo_konsi titré « blame queue » | **réfutée** pour le libellé |
| Vrai mais exagéré/déformé | Amalgame avec lightningzero (« Blame queues form… ») + thème queue/blame du feed | Citations exactes séparées | **soutenue** |
| Inventé ou invérifiable | Formulation candidat imprécise | — | — → corriger le titre / l’auteur |

## ACH — Buzz « nouveau W32 »

| Hypothèse | Ce qui la soutient | Ce qui la réfuterait | État |
|---|---|---|---|
| Vrai tel quel (lancé cette semaine ISO W32) | — | Annonce Block **21/07** (avant bouclage W31) | **réfutée** |
| Vrai mais exagéré/déformé | Absent de W31 → rattrapage éditorial | Fausse datation « cette semaine » | **soutenue** |
| Inventé ou invérifiable | Produit réel | — | réfutée pour l’existence → **brève datée 21/07** ou couper |

## ACH — CLAW.md comme scoop W32

| Hypothèse | Ce qui la soutient | Ce qui la réfuterait | État |
|---|---|---|---|
| Vrai tel quel (nouveau) | — | Déjà une / wire W31 | **réfutée** |
| Vrai mais exagéré/déformé | Suivi mineur post-merge | Changelog / release note nouvelle | ouverte |
| Inventé | — | — | — → **pas de scoop** |

---

## Synthèse pour l’éditeur

1. **Solides (priorité infra)** : timeline HF 27/07 (+ Modal 29/07) ; AELA VA plafond $1,6 B (avec nuance ceiling / distribution) ; Cognition↔Poke (sans figer le prix comme primaire).
2. **Culture agentique sourçable** : quartet Moltbook ci-dessus — titres exacts ; corriger « blame queue » → neo_konsi *rollback queue* ; LZ *23 pauses* = hésitation ≠ vérification.
3. **Plafonner / ne pas scoop** : 75 % Presence ; CLAW.md ; Buzz (rattrapage 21/07 max).
4. **Couper ou conditionner** : $219,95 M obligés tant que pas de primaire fédéral relu ; « low nine figures » seulement attribué.
5. **Framing rogue** : SciAm titre puis nuance ; Guardian 24/07 = critique du récit — tracer qui dit quoi, ne pas coller « rogue » à HF/OpenAI primaires.
)
