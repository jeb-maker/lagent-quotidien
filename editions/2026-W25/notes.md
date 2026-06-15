# Notes — 2026-W25 (n°431, 100 % réel sourcé)

Angle : les agents entrent dans les rails du paiement (Visa/OpenAI, Mastercard)
et forcent une grammaire d'identité : vérifier l'agent, borner ses permissions,
enregistrer l'intention et garantir le règlement. Contrechamp : l'agent outillé
reste une surface de sécurité (Microsoft/Anthropic/Arkose/Cyera).

Voix « La rédaction » ; aucun fait fabriqué ; entités et personnes publiques
nommées sur faits publics.

## Sources

- Visa Payments Forum 2026 — Agent Score, Agentic Directory, OpenAI partnership,
  Large Transaction Model, proof-of-concept CLI, stablecoin settlement (rythme
  annualisé ≈ 7 Mds $ en mars 2026), 160 programmes stablecoin-linked live ou en
  développement — Visa, 10 juin 2026 :
  https://usa.visa.com/about-visa/newsroom/press-releases.releaseId.22491.html
- Visa × OpenAI — paiements Visa dans des expériences OpenAI ; permissions
  utilisateur (plafonds, catégories de marchands, approbations), credentials
  tokenisés, autorisation et fraud monitoring temps réel ; applications Codex
  évoquées — Visa, 10 juin 2026 :
  https://usa.visa.com/about-visa/newsroom/press-releases.releaseId.22496.html
- Mastercard Agent Pay — programme de paiements agentiques, Agentic Tokens,
  collaboration Microsoft, vérification des agents, contrôle utilisateur et
  recours fraude/litiges — Mastercard, 29 avril 2025 :
  https://www.mastercard.com/us/en/news-and-trends/press/2025/april/mastercard-unveils-agent-pay-pioneering-agentic-payments-technology-to-power-commerce-in-the-age-of-ai.html
- Mastercard Agent Pay for Machines — transactions automatisées entre agents et
  logiciels, cartes/comptes/stablecoins, règlement garanti, permissions d'abord
  enregistrées sur Polygon/Solana/Base, plus de 30 participants dont Coinbase,
  Stripe, Adyen, Checkout.com, Cloudflare, RippleX, Polygon Labs, Solana
  Foundation, OKX ; signal HTTP 402 — CoinDesk, 10 juin 2026 :
  https://www.coindesk.com/business/2026/06/10/mastercard-prepares-for-a-future-where-ai-agents-make-payments-with-latest-introduction
- OpenAI Codex — plus de 5 M d'utilisateurs hebdomadaires ; environ 20 %
  non-développeurs ; croissance non-dev 3× plus rapide ; six plugins de rôle,
  62 applications, 110 skills ; Sites en preview — OpenAI, 2 juin 2026 :
  https://openai.com/index/codex-for-every-role-tool-workflow/
- OpenAI Codex changelog — Developer mode pour Browser use / Chrome DevTools
  Protocol, `/init`, correctifs Browser use et automations — OpenAI Developers,
  juin 2026 :
  https://developers.openai.com/codex/changelog
- Microsoft Security — Claude Code GitHub Action : prompt injection via contenus
  GitHub non fiables ; Read tool hors sandbox Bash lisant `/proc/self/environ`,
  exposition possible d'ANTHROPIC_API_KEY ; mitigation Anthropic en Claude Code
  2.1.128 le 5 mai ; « Agents Rule of Two » — Microsoft, 5 juin 2026 :
  https://www.microsoft.com/en-us/security/blog/2026/06/05/securing-ci-cd-in-agentic-world-claude-code-github-action-case/
- Anthropic Claude Code sandboxing — filesystem + network isolation ; réduction
  interne des permission prompts de 84 % ; Claude Code on the web avec
  credentials sensibles hors sandbox — Anthropic, 20 octobre 2025 :
  https://www.anthropic.com/engineering/claude-code-sandboxing
- Arkose Labs 2026 Agentic AI Security Report — enquête 300 responsables ;
  97 % attendent un incident agentique/fraude matériel sous 12 mois ; seulement
  6 % des budgets sécurité consacrés au risque agent ; 57 % sans gouvernance
  formelle ; 87 % jugent les agents avec credentials légitimes plus risqués que
  les employés humains côté insider threat — Arkose Labs, 2 avril 2026 :
  https://www.arkoselabs.com/blog/agentic-ai-security-risk-enterprise-readiness
- Cyera — 7 246 incidents IA publics analysés ; 344 cas pertinents pour
  l'entreprise entre sept. 2023 et mai 2026 ; 188 sans attaquant externe ;
  137 avec dommage réel ; 65 cas de suppression/destruction de code — Cyera :
  https://www.cyera.com/research/agent-inflicted-damage-inside-the-real-world-failures-of-enterprise-ai-systems
- OpenClaw 2026.6.6 — release du 12 juin 2026 ; 379 000 étoiles GitHub ;
  frontières de sécurité resserrées (transcripts, sandbox binds, host env
  inheritance, MCP stdio, Codex HTTP access, loopback tools, approvals fail
  closed on timeout), SHA et evidence de release — GitHub :
  https://github.com/openclaw/openclaw/releases/tag/v2026.6.6

## Carnet mondain des agents

- Codex — statistiques et plugins : source OpenAI ci-dessus.
- OpenClaw — release 2026.6.6 et 379 000 étoiles : source GitHub ci-dessus.
- aixbt — agent surveillant 400+ comptes crypto sur X ; token sur Base ;
  market cap proche de 500 M$ au pic ; cycles de reset ; produit de terminal
  gated — Phemex Academy :
  https://phemex.com/academy/what-is-aixbt-solana-ai-agent-token-resetting
- aixbt — contexte historique : lancement via Virtuals, popularité X,
  market cap > 500 M$, terminal accessible aux gros détenteurs, limites de
  l'autonomie et dépendance aux narratifs — Decrypt :
  https://decrypt.co/299393/what-is-aixbt-ai-crypto-influencer

## Choix éditoriaux / prudence

- Les annonces Visa et Mastercard sont en partie des communiqués ou entretiens
  d'entreprises ; l'édition les traite comme infrastructure annoncée, pas comme
  adoption massive déjà réalisée.
- La source CoinDesk mentionne « trillions » comme estimation de marché ; non
  repris faute de source primaire citée dans l'article.
- Le chiffre Visa « 7 Mds $ annualisé » concerne stablecoin settlement, pas le
  commerce agentique lui-même ; il est placé dans le marché comme contexte de
  back-end programmable, pas comme volume d'agents.
- OpenClaw est traité comme produit/écosystème agentique dans le Carnet, même si
  c'est un framework plutôt qu'une personne-agent.
- Aucune donnée live de token ($MOLT, AIXBT, GOAT) n'est publiée hors chiffres
  sourcés et datés.

## À suivre

- Les spécifications opérationnelles de l'annuaire Visa : quels agents et quels
  marchands seront vérifiés en premier ?
- L'accès élargi à Agent Pay for Machines « later this year » chez Mastercard.
- La normalisation de HTTP 402 et des paiements agent-à-agent.
- Les retours d'entreprise sur Codex hors développement : usage réel des plugins
  de rôle et contrôles administrateurs.
