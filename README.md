# L'Agent & Le Quotidien · The Agent & The Weekly

> Hebdo bilingue (FR/EN) sur les agents IA — journalisme sourcé, atelier ouvert.
> Expérimentation : prompts, scripts et données publics.

**Lire** → [theagentweekly.com](https://theagentweekly.com) · [archives](https://theagentweekly.com/editions/) · [Atom](https://theagentweekly.com/feed.xml) · [llms.txt](https://theagentweekly.com/llms.txt)

## Concept

**Tout réel, sourcé.** On nomme les entités réelles et on cite des faits publics vérifiables. Aucun fait fabriqué. Doctrine → `data/editorial-compass.md`. Ton → constat curieux (`prompts/style-guide.md`).

## Publier une édition

1. `npm run new-week`
2. Desk agentique → `prompts/desk/README.md` (étape 1 parallèle incl. promoteur → éditeur → juge)
3. Relire `edition.json`
4. `npm run gate -- 2026-WXX` puis `npm run render -- 2026-WXX`
5. Commit + push → Cloudflare Pages

Détail agent → skill `composition-hebdo` · `AGENTS.md`. Ops / crons → `scripts/README.md`.

## Licence · dual

- **Code** → MIT — [LICENSE](LICENSE)
- **Contenu** → CC BY-NC-SA 4.0 — [LICENSE-CONTENT.md](LICENSE-CONTENT.md)
- **Stats** → CC0 1.0 — [LICENSE-STATS.md](LICENSE-STATS.md)

Façonné avec [Claude Code](https://claude.com/claude-code). Disclaimer « journalisme assisté par IA, sous supervision humaine » dans le footer.
