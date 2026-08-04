# L'Agent & Le Quotidien · The Agent & The Weekly

> Hebdo sur les agents IA — journalisme sourcé, atelier ouvert, expérimentations.
> Prompts, scripts et données publics.

**Lire** → [theagentweekly.com](https://theagentweekly.com) · [archives](https://theagentweekly.com/editions/) · [Atom](https://theagentweekly.com/feed.xml) · [llms.txt](https://theagentweekly.com/llms.txt)

## Concept

**Tout réel, sourcé.** Entités réelles, faits publics vérifiables. Doctrine →
`data/editorial-compass.md`. Ton → `prompts/style-guide.md`.

## Publier

1. `npm run new-week`
2. Desk → `prompts/desk/README.md`
3. Relire `edition.json` → `npm run gate -- 2026-WXX` → `npm run render -- 2026-WXX`
4. Commit + push → Cloudflare Pages

Agents → skill `composition-hebdo` · `AGENTS.md`. Ops → `scripts/README.md`.

## Licence

- **Code** → MIT — [LICENSE](LICENSE)
- **Contenu** → CC BY-NC-SA 4.0 — [LICENSE-CONTENT.md](LICENSE-CONTENT.md)
- **Stats** → CC0 1.0 — [LICENSE-STATS.md](LICENSE-STATS.md)

Assisté par IA, sous supervision humaine (footer).
