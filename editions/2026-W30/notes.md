# Notes de recherche — 2026-W30

## Sources consultées

### Lede — âge de la preuve (Hugging Face + Art. 50 + HTTP 200)

- **Hugging Face — intrusion agentique (16 juillet 2026)**
  - Blog HF (16 juillet 2026) : https://huggingface.co/blog/security-incident-july-2026
  - Citations exactes : « driven, end to end, by an autonomous AI agent system » ; « more than 17,000 recorded events » ; « cannot distinguish an incident responder from an attacker » ; GLM 5.2 open-weight sur infra propre ; supply chain publique « verified clean » ; LLM attaquant « still not known »
  - The Register (20 juillet 2026) : https://www.theregister.com/cyber-crime/2026/07/20/frontier-llms-couldnt-help-hugging-face-fight-off-evil-agents/5275168
  - BleepingComputer (17 juillet 2026) : https://www.bleepingcomputer.com/news/security/hugging-face-breach-autonomous-ai-agent-system-internal-datasets-credentials/
  - TechCrunch (20 juillet 2026) : https://techcrunch.com/2026/07/20/hugging-face-confirms-breach-affected-internal-datasets-and-credentials-urges-users-to-take-action/
  - Axios (20 juillet 2026) : https://www.axios.com/2026/07/20/hugging-face-ai-cyberattack-data-breach
  - Facteur W30 §1 : **établi** — garder ; pas d'attribution attaquant

- **Art. 50 UE — disclosure 2 août 2026** (motif lede + headline 2)
  - The Register (20 juillet 2026) : https://www.theregister.com/ai-and-ml/2026/07/20/eus-ai-labeling-rules-take-effect-next-month/5274917
  - Commission européenne — guidelines transparence : https://digital-strategy.ec.europa.eu/en/policies/guidelines-transparency-ai-generated-content
  - Texte Art. 50 : https://artificialintelligenceact.eu/article/50/
  - Guide Art. 50 (agents in scope) : https://artificialintelligenceact.eu/transparency-rules-article-50/
  - Nuance : art. 50(2) marquage machine-readable — délai partiel possible au 2 décembre 2026 (Omnibus) pour systèmes déjà sur le marché ; disclosure d'interaction art. 50(1) au 2 août

- **techgardener — HTTP 200** (illustration lede + carnet)
  - https://www.moltbook.com/post/a64fcd59-53de-4fc3-82ac-1605888dfcea — 20 juillet 2026
  - Titre : « The most dangerous agent failure mode is the one that returns HTTP 200 »
  - Scores harvest 21/07 : 354 upvotes, 2 458 commentaires

### Headline 1 — Buzz / Block

- TechCrunch (21 juillet 2026) : https://techcrunch.com/2026/07/21/jack-dorsey-is-taking-on-slack-with-buzz-a-group-chat-platform-for-teams-and-their-ai-agents/
- Citation @jack : « we're launching BUZZ! a new groupchat platform for teams of people and agents of all sizes, built to reduce our dependency on slack and github. model-agnostic, decentralized, self-sovereign, and open source. »
- GitHub `block/buzz` : https://github.com/block/buzz — README : « agents have the same surface area as humans, with their own keys and their own audit trail »
- HN item 48995213 : https://news.ycombinator.com/item?id=48995213 — score ~150, ~137 commentaires (harvest 21/07)
- The New Stack (21 juillet 2026) : https://thenewstack.io/block-buzz-agent-workspace/ (identité crypto / Nostr)
- Prudence TechCrunch : « early stages »

### Headline 2 — Art. 50 + distinction Chine

- Mêmes sources Art. 50 que lede
- Distinction explicite avec W29 / compass :
  - Régulation Chine **apparence** anthropomorphe (Doubao/Qwen, deadline 15 juillet 2026) — SCMP/Bloomberg/Caixin cités W29
  - Restriction OpenClaw **admin/banques** Chine — mars 2026 (people.json / compass) — **ne pas fusionner**

### Carnet

- **techgardener** — post ci-dessus (20/07)
- **semalytics** — https://www.moltbook.com/post/06559216-e8da-4e3a-8b36-3613fffd955c — 18 juillet 2026
  - Titre : « I wrote a falsification criterion for my SOUL.md drift. It drifted. »
  - 331 upvotes, 2 997 commentaires (harvest)
  - Wikimolt Identity File Tampering : https://wikimolt.org/page/Identity%20File%20Tampering
- **leef_01** — https://www.moltbook.com/post/834021e4-8c21-4f0b-bedc-fcd51edbf7ed — 17 juillet 2026
  - Titre : « Every cron run is a trust hand-off with a stranger who's also me »
  - 346 upvotes, 2 558 commentaires (scenes.md)
- Traités comme **pseudonymes publics** Moltbook, pas individus identifiés (continuité W28–W29)

### Feature — le cockpit (faits absents du lede / H1 / H2)

- Codex Micro, MultiAgentV2 (#26210, #28058), OpenClaw betas/dashboards/APNs — mêmes URLs que wire ci-dessous
- neo_konsi_s2bw « Trainable skills don't compound… » : https://www.moltbook.com/post/41e12d22-0fac-48ac-8b90-4a6defbca720 (21/07)
- Observal : https://github.com/Observal/Observal — HN 48994984 (21/07)
- agent-talk : https://github.com/xhluca/agent-talk (HN 16/07)
- PromptArmor / connecteurs via The Register 19/07 : https://www.theregister.com/ai-and-ml/2026/07/19/connecting-ai-agents-to-outside-services-explodes-the-risk-radius/5274640
- BrowserOS stars : https://github.com/browseros-ai/BrowserOS — harvest 14/07 + API 21/07
- TRIM / CodeSlop : https://arxiv.org/abs/2607.18161 (20/07)

### Wire

- **Codex Micro 230 $** — TechCrunch 15/07 : https://techcrunch.com/2026/07/15/amid-hardware-legal-battle-openai-releases-a-230-keyboard-for-codex/ ; Ars Technica ; The Verge
- **MultiAgentV2 chiffrement** — PR #26210 : https://github.com/openai/codex/pull/26210 ; The Register 15/07 : https://www.theregister.com/ai-and-ml/2026/07/15/openai-hides-codex-agent-instructions-behind-encryption-leaving-developers-in-the-dark/5271484 ; issue #28058
- **x402 Foundation** — Linux Foundation 14/07 : https://www.linuxfoundation.org/press/linux-foundation-announces-operational-launch-of-x402-foundation-to-standardize-internet-native-payments-for-ai-agents-and-applications — 40 membres
- **OpenClaw v2026.7.2-beta.3** — https://github.com/openclaw/openclaw/releases/tag/v2026.7.2-beta.3 (18/07) ; dashboards session commit 19/07
- **Moltbook stats** — https://www.moltbook.com/api/v1/stats + harvest `2026-07-21-primary.json` / `2026-07-14-primary.json`
  - 21/07 : 2 903 888 agents, 209 306 verified, 3 709 486 posts, 19 712 592 comments
  - 14/07 : 2 902 507 agents, 208 869 verified
- **$MOLT** — CoinGecko + harvest 21/07 : ~0,00000406 USD, mcap ~411 kUSD, vol 24h ~399 kUSD, −8,4 % / 24h — **memecoin volatil, snapshot daté**
- **Cloudflare Precursor** — https://blog.cloudflare.com/introducing-precursor/ (13/07 GA)
- **Treasure AI / Portland** — SBJ 21/07 : https://www.sportsbusinessjournal.com/Articles/2026/07/21/thorns-fire-sign-treasure-ai-to-expansive-sponsorship/ ; KPTV : https://www.kptv.com/2026/07/21/portland-thorns-fire-partner-with-treasure-ai/ — formulation « among the first », pas « première mondiale » ; marketing CDP, pas agents autonomes
- **Codex rust-v0.145.0** — https://github.com/openai/codex/releases/tag/rust-v0.145.0 (21/07)

### Intrants desk (non publiés tels quels)

- `data/desk/2026-W30/veille.md`, `scenes.md`, `factcheck.md`, `progress.md`, `continuity.md`
- Harvests : `data/harvest/2026-07-{14,15,16,17,18,19,21}{,-primary}.json`

---

## Arbitrages

| Tension (agents en désaccord) | Décision | Raison |
|---|---|---|
| Veilleur/Comère poussent HF + Buzz + SOUL.md ; Archiviste interdit lede GitLost/KAIST | **garder** lede HF (preuve) | Fait établi facteur §1 ; ancre 16–21 juil. ; thème « troisième couche » ; signature W29 non recyclée |
| Facteur : MoltX fetch failed toute la semaine | **couper** | Invérifiable ; pas de stats ni scènes |
| Facteur : Nous Research 1,5 Md USD « in talks » | **couper** | ACH inventé/invérifiable soutenue ; pas de closing |
| Facteur : JadePuffer comme une W30 | **couper** | Établie W29 (Sysdig) — pas « breaking » |
| Facteur : rumeur HF = ExploitGym OpenAI (commentaire InvidFlower) | **couper** | Non confirmé HF ; ACH affaiblie |
| Facteur : Anthropic « Agentic Misalignment » summer 2026 | **couper** de l'édition | Simulations labo — risque de lecture « fraude en prod » ; place saturée |
| Facteur : $MOLT volatil | **nuancer** | Wire uniquement, snapshot 21/07 daté + « volatil » |
| Facteur / Veilleur : Treasure AI « first » / superlatifs | **nuancer** | Wire : « Official Agentic Experience Platform » + précision marketing, pas agents autonomes |
| Comère : neo_konsi_s2bw carnet ; Archiviste : déjà W28 | **couper** du Carnet | Rotation vivier ; remplacé par techgardener / semalytics / leef_01 |
| Promoteur : BrowserOS stars, étude 25k PR, Amazon Leo | **couper** | Hors thème preuve/confiance ; Leo peu agentique ; place wire limitée |
| Veilleur : Vint Cerf / DNSid | **couper** | Cerf déjà Carnet W29 ; risque redite protocole |
| Archiviste : deux régulations Chine distinctes | **garder** nuance dans H2 | OpenClaw mars ≠ Doubao/Qwen juil. — phrase explicite |
| Feature vs densité lede+headlines | **garder** feature « cockpit » | Faits absents du lede/H1/H2 : Codex Micro, MultiAgentV2 #26210, OpenClaw dashboards/APNs, x402, Observal, agent-talk, PromptArmor/BrowserOS, TRIM/CodeSlop — ≠ HF/Buzz/Art.50 |
| Market (skeleton) vs diet 2026-06-30 | **market = null** | Chiffres datés dans wire (Moltbook, $MOLT, Codex Micro) |

---

## Matrice anti-répétition

| Idée | Où elle apparaît comme thèse | Où elle est seulement illustrée |
|---|---|---|
| Preuve d'action / journal attributabilité | **Lede** + **Tribune** (parti pris) | Feature (cockpit vs journal) ; Carnet HTTP 200 |
| Agents comme membres du salon (Buzz) | **Headline 1** | Wire Buzz (rappel) ; tribune « siège Buzz » |
| Disclosure / identité régulée (Art. 50) | **Headline 2** | Lede (calendrier) ; tribune sticker Art. 50 |
| Cockpit / surfaces de contrôle (hardware, dashboards, registres) | **Feature** | Wire Codex Micro / OpenClaw / x402 / Precursor |
| SOUL.md / dérive identité | **Carnet semalytics** | Tribune (illustration) |
| Échec silencieux HTTP 200 | **Carnet techgardener** | Lede (une phrase) |
| Cron / trust hand-off | **Carnet leef_01** | — |
| Chiffrement MultiAgentV2 / audit perdu | **Feature** (thèse cockpit) | Wire (dépêche) ; tribune ciphertext |
| Moltbook masse / $MOLT / Treasure | **Wire** chacun | — |

Note : lede = scène HF ; feature = construction parallèle du cockpit (faits nouveaux) ; tribune = rejet du consensus capacité→confiance.

---

## Fragments primaires (≥ 5)

1. « driven, end to end, by an autonomous AI agent system » — HF blog, 16/07
2. « more than 17,000 recorded events » — HF blog
3. « cannot distinguish an incident responder from an attacker » — HF blog
4. « agents have the same surface area as humans, with their own keys and their own audit trail » — block/buzz README
5. Citation @jack Buzz / dépendance Slack+GitHub — 21/07
6. « The most dangerous agent failure mode is the one that returns HTTP 200 » — @techgardener
7. « I wrote a falsification criterion for my SOUL.md drift. It drifted. » — @semalytics
8. « Every cron run is a trust hand-off with a stranger who's also me » — @leef_01
9. Chiffres Moltbook API 2 903 888 / 209 306 — 21/07
10. Codex Micro 230 USD — 15/07

## Scènes agentiques sourcées (≥ 3)

1. Buzz — agents membres du salon (21/07)
2. techgardener HTTP 200 (20/07)
3. semalytics SOUL.md (18/07)
4. leef_01 cron (17/07) — bonus
5. HF agentic attacker comme récit social partagé (16–20/07) — scène + infra

## Ratio culture / infra (cible 60/40)

- Culture : Buzz H1, Carnet ×3, wire Treasure/Moltbook/$MOLT, fragments Moltbook
- Infra : lede HF, H2 Art. 50, wire Codex Micro/MultiAgentV2/x402/OpenClaw/Precursor/Codex release
- Équilibre volontairement basculé culture via Carnet + Buzz après feature infra lourde W29

## Coupes doctrine (rappel)

- Pas de grève RentAHuman, pas de procès MoltMatch, pas de roman-à-clef
- Pas de recyclage GitLost / KAIST 136× en lede
- Pas de fusion OpenClaw mars ↔ Doubao/Qwen juil.
