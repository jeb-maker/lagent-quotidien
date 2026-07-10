import { readFile, writeFile, readdir, mkdir } from 'node:fs/promises';
import { join } from 'node:path';
import { SITE_URL, BLUESKY_URL, AI_CRAWLERS } from './constants.mjs';
import { stripHtml, escapeHtml, xmlEscape } from './template.mjs';

export async function writeRootIndex(root, allWeeks, week) {
  const latestWeek = allWeeks[allWeeks.length - 1] || week;
  const latestFrHtml = `/editions/${latestWeek}/fr.html`;
  const latestFrMarkdown = `/editions/${latestWeek}/fr.md`;

  // index.html minimal : repli HTML si _redirects n'est pas honoré (meta refresh + lien).
  const rootIndexHtml = `<!doctype html>
<html lang="fr">
<head>
<meta charset="utf-8">
<title>L'Agent & Le Quotidien</title>
<meta http-equiv="refresh" content="0; url=${latestFrHtml}">
<link rel="canonical" href="${SITE_URL}${latestFrMarkdown}">
</head>
<body>
<p>Édition <a href="${latestFrHtml}">${latestWeek}</a> · <a href="/editions/${latestWeek}/en.html">English</a> · <a href="${latestFrMarkdown}">Markdown</a></p>
</body>
</html>
`;
  await writeFile(join(root, 'index.html'), rootIndexHtml, 'utf8');
  await writeFile(join(root, 'public', 'index.html'), rootIndexHtml, 'utf8');
  console.log(`✓ Index no-store → ${latestWeek} (repli meta refresh)`);
  return latestWeek;
}

export async function writeHeadersAndRedirects(root, latestWeek) {
  // Ne pas rediriger "/" côté serveur : Safari peut mémoriser une 302 et continuer
  // d'ouvrir une ancienne édition. L'index, servi en no-store, porte le repli HTML
  // vers la dernière édition et est régénéré à chaque publication.
  const redirects = '# La racine est servie par index.html (Cache-Control: no-store)\n';
  await writeFile(join(root, '_redirects'), redirects, 'utf8');
  console.log(`✓ _redirects : aucune redirection racine mise en cache (dernière : ${latestWeek})`);

  const headers = `/
  Cache-Control: no-store

/index.html
  Cache-Control: no-store

/*.md
  Content-Type: text/markdown; charset=utf-8
  Cache-Control: public, max-age=3600

/editions/*
  Cache-Control: public, max-age=3600
`;
  await writeFile(join(root, '_headers'), headers, 'utf8');
  console.log('✓ _headers : no-store sur /');
}

export async function listEditionWeeks(root) {
  const editionDirs = await readdir(join(root, 'editions'), { withFileTypes: true });
  return editionDirs
    .filter(d => d.isDirectory() && /^\d{4}-W\d{2}$/.test(d.name))
    .map(d => d.name)
    .sort();
}

export async function listAtelierPages(root) {
  try {
    const files = await readdir(join(root, 'ateliers'), { withFileTypes: true });
    return files
      .filter(f => f.isFile() && f.name.endsWith('.html') && f.name !== 'index.html')
      .map(f => f.name.replace(/\.html$/, ''))
      .sort();
  } catch {
    return [];
  }
}

export async function writeSitemap(root, weeks, agentUrls) {
  const sitemapEntries = [
    `<url><loc>${SITE_URL}/agents</loc><changefreq>weekly</changefreq><priority>0.9</priority></url>`,
    `<url><loc>${SITE_URL}/editions/</loc><changefreq>weekly</changefreq><priority>0.9</priority></url>`,
    `<url><loc>${SITE_URL}/api</loc><changefreq>monthly</changefreq><priority>0.5</priority></url>`,
    `<url><loc>${SITE_URL}/topics</loc><changefreq>weekly</changefreq><priority>0.8</priority></url>`,
    `<url><loc>${SITE_URL}/ateliers</loc><changefreq>monthly</changefreq><priority>0.7</priority></url>`
  ];
  for (const slug of await listAtelierPages(root)) {
    sitemapEntries.push(`<url><loc>${SITE_URL}/ateliers/${slug}</loc><changefreq>yearly</changefreq><priority>0.6</priority></url>`);
  }
  for (const w of weeks) {
    for (const l of ['fr', 'en']) {
      sitemapEntries.push(
`<url>
  <loc>${SITE_URL}/editions/${w}/${l}.md</loc>
  <changefreq>monthly</changefreq>
  <priority>0.9</priority>
  <xhtml:link rel="alternate" hreflang="fr" href="${SITE_URL}/editions/${w}/fr.md"/>
  <xhtml:link rel="alternate" hreflang="en" href="${SITE_URL}/editions/${w}/en.md"/>
  <xhtml:link rel="alternate" hreflang="x-default" href="${SITE_URL}/editions/${w}/fr.md"/>
</url>`
      );
    }
  }
  for (const u of agentUrls) {
    sitemapEntries.push(`<url><loc>${u}</loc><changefreq>weekly</changefreq><priority>0.7</priority></url>`);
  }
  const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${sitemapEntries.join('\n')}
</urlset>
`;
  await writeFile(join(root, 'sitemap.xml'), sitemapXml, 'utf8');
  console.log(`✓ sitemap.xml (${weeks.length} éditions × 2 langues)`);
}

export async function writeFeed(root, weeks) {
  const feedEntries = [];
  for (const w of [...weeks].reverse()) {
    const editionPath = join(root, 'editions', w, 'edition.json');
    try {
      const edData = JSON.parse(await readFile(editionPath, 'utf8'));
      const pub = edData._meta.bouclage;
      const issue = edData._meta.edition_number;
      for (const l of ['fr', 'en']) {
        const headline = stripHtml(l === 'fr' ? edData.lede.headline_html.fr : edData.lede.headline_html.en);
        const dek = stripHtml(l === 'fr' ? edData.lede.dek.fr : edData.lede.dek.en);
        const issueLabel = l === 'fr' ? `Édition n°${issue} — ` : `Issue #${issue} — `;
        feedEntries.push(
`  <entry xml:lang="${l === 'fr' ? 'fr-FR' : 'en-US'}">
    <id>${SITE_URL}/editions/${w}/${l}.md</id>
    <title>${xmlEscape(issueLabel + headline)}</title>
    <link href="${SITE_URL}/editions/${w}/${l}.md" type="text/markdown"/>
    <link rel="alternate" href="${SITE_URL}/editions/${w}/${l}.html" type="text/html"/>
    <updated>${pub}</updated>
    <published>${pub}</published>
    <summary>${xmlEscape(dek)}</summary>
    <category term="${w}"/>
  </entry>`
        );
      }
    } catch { /* skip */ }
  }

  let feedUpdated = new Date().toISOString();
  if (weeks.length) {
    try {
      const latestData = JSON.parse(await readFile(join(root, 'editions', weeks[weeks.length - 1], 'edition.json'), 'utf8'));
      feedUpdated = latestData._meta.bouclage || feedUpdated;
    } catch { /* skip */ }
  }

  const feedXml = `<?xml version="1.0" encoding="UTF-8"?>
<feed xmlns="http://www.w3.org/2005/Atom">
  <id>${SITE_URL}/</id>
  <title>L'Agent &amp; Le Quotidien / The Agent &amp; The Weekly</title>
  <subtitle>Journalisme sur l'internet agentique · Journalism on the agentic internet</subtitle>
  <link href="${SITE_URL}/"/>
  <link href="${SITE_URL}/feed.xml" rel="self" type="application/atom+xml"/>
  <updated>${feedUpdated}</updated>
  <author><name>L'Agent &amp; Le Quotidien</name><uri>${SITE_URL}</uri></author>
  <icon>${SITE_URL}/og.png</icon>
  <logo>${SITE_URL}/og.png</logo>
  <rights>© L'Agent &amp; Le Quotidien — journalisme sur l'internet agentique, contenus assistés par IA</rights>
${feedEntries.join('\n')}
</feed>
`;
  await writeFile(join(root, 'feed.xml'), feedXml, 'utf8');
  console.log(`✓ feed.xml (${feedEntries.length} entrées Atom, FR+EN)`);
}

export async function writeArchivePage(root, weeks) {
  const archiveRows = [];
  for (const w of [...weeks].reverse()) {
    try {
      const edData = JSON.parse(await readFile(join(root, 'editions', w, 'edition.json'), 'utf8'));
      const issue = edData._meta.edition_number;
      const dateFr = edData._meta.date_fr;
      const dateEn = edData._meta.date_en;
      const headlineFr = stripHtml(edData.lede?.headline_html?.fr ?? '');
      const headlineEn = stripHtml(edData.lede?.headline_html?.en ?? '');
      archiveRows.push(`    <li class="archive-row">
      <div class="archive-week">${escapeHtml(w)} · n°${issue}</div>
      <div class="archive-headline">
        <div class="fr"><a href="/editions/${w}/fr.html"><span class="lang-tag">FR</span> ${escapeHtml(headlineFr)}</a><div class="date">${escapeHtml(dateFr)}</div></div>
        <div class="en"><a href="/editions/${w}/en.html"><span class="lang-tag">EN</span> ${escapeHtml(headlineEn)}</a><div class="date">${escapeHtml(dateEn)}</div></div>
      </div>
    </li>`);
    } catch { /* skip */ }
  }

  const archiveHtml = `<!doctype html>
<html lang="fr">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>Archives — L'Agent &amp; Le Quotidien</title>
<meta name="description" content="Toutes les éditions de L'Agent &amp; Le Quotidien / The Agent &amp; The Weekly." />
<link rel="canonical" href="${SITE_URL}/editions/" />
<link rel="alternate" type="application/atom+xml" title="Atom feed" href="${SITE_URL}/feed.xml" />
<style>
  :root { --ink: #1A1916; --ink-mute: #5C5852; --rule: #D9D2C5; --paper: #F5F1E8; --accent: #8B2A1F; }
  * { box-sizing: border-box; }
  body { font-family: 'Newsreader', Georgia, serif; background: var(--paper); color: var(--ink); margin: 0; padding: 40px 24px 80px; line-height: 1.55; }
  .container { max-width: 760px; margin: 0 auto; }
  .nav { font-family: 'JetBrains Mono', ui-monospace, monospace; font-size: 12px; letter-spacing: 0.1em; text-transform: uppercase; color: var(--ink-mute); margin-bottom: 32px; }
  .nav a { color: var(--ink-mute); text-decoration: none; border-bottom: 1px solid var(--rule); margin-right: 14px; }
  .nav a:hover { color: var(--accent); }
  h1 { font-family: 'Fraunces', Georgia, serif; font-weight: 700; font-style: italic; font-size: 38px; letter-spacing: -0.02em; margin: 0 0 8px; }
  .lede { font-size: 17px; color: var(--ink-mute); margin: 0 0 32px; padding-bottom: 24px; border-bottom: 2px solid var(--rule); }
  ol.archive { list-style: none; padding: 0; margin: 0; }
  .archive-row { padding: 22px 0; border-bottom: 1px solid var(--rule); display: grid; grid-template-columns: 160px 1fr; gap: 24px; }
  .archive-week { font-family: 'JetBrains Mono', ui-monospace, monospace; font-size: 13px; letter-spacing: 0.08em; text-transform: uppercase; color: var(--ink-mute); padding-top: 4px; }
  .archive-headline { font-family: 'Fraunces', Georgia, serif; font-size: 18px; line-height: 1.35; }
  .archive-headline a { color: var(--ink); text-decoration: none; border-bottom: 1px dotted var(--rule); }
  .archive-headline a:hover { color: var(--accent); border-bottom-color: var(--accent); }
  .archive-headline .fr, .archive-headline .en { margin-bottom: 10px; }
  .archive-headline .en { color: var(--ink-mute); }
  .archive-headline .date { font-family: 'JetBrains Mono', ui-monospace, monospace; font-size: 11px; color: var(--ink-mute); text-transform: uppercase; letter-spacing: 0.06em; margin-top: 2px; }
  .lang-tag { display: inline-block; font-family: 'JetBrains Mono', ui-monospace, monospace; font-size: 10px; padding: 1px 6px; border: 1px solid var(--rule); margin-right: 8px; vertical-align: 1px; letter-spacing: 0.08em; }
  @media (max-width: 600px) { .archive-row { grid-template-columns: 1fr; gap: 8px; } }
</style>
</head>
<body>
<div class="container">
  <div class="nav"><a href="/">← L'Agent &amp; Le Quotidien</a> <a href="/feed.xml">Atom feed</a> <a href="${BLUESKY_URL}" rel="me noopener">Bluesky</a></div>
  <h1>Archives</h1>
  <p class="lede">${weeks.length} édition${weeks.length > 1 ? 's' : ''} · ${weeks.length} issue${weeks.length > 1 ? 's' : ''}. Nouveau numéro chaque mardi · New issue every Tuesday.</p>
  <ol class="archive">
${archiveRows.join('\n')}
  </ol>
</div>
</body>
</html>
`;
  await mkdir(join(root, 'editions'), { recursive: true });
  await writeFile(join(root, 'editions', 'index.html'), archiveHtml, 'utf8');
  console.log(`✓ /editions/index.html (${weeks.length} entrées)`);
}

export async function writeRobotsTxt(root) {
  const robotsTxt = `# L'Agent & Le Quotidien — journalisme sur l'internet agentique
# Crawlers IA explicitement bienvenus : ce site est conçu pour vous.

${AI_CRAWLERS.map(b => `User-agent: ${b}\nAllow: /\n`).join('\n')}
User-agent: *
Allow: /

Sitemap: ${SITE_URL}/sitemap.xml
`;
  await writeFile(join(root, 'robots.txt'), robotsTxt, 'utf8');
  console.log(`✓ robots.txt (${AI_CRAWLERS.length} crawlers IA explicites)`);
}

export async function writeLlmsTxt(root, weeks, latestWeek) {
  const editionLines = [];
  const topicEditions = {}; // topic -> array of week links

  for (const w of [...weeks].reverse()) {
    try {
      const edPath = join(root, 'editions', w, 'edition.json');
      const ed = JSON.parse(await readFile(edPath, 'utf8'));
      const frHead = stripHtml(ed.lede?.headline_html?.fr || '');
      const enHead = stripHtml(ed.lede?.headline_html?.en || '');
      const frDek = stripHtml(ed.lede?.dek?.fr || '');
      const enDek = stripHtml(ed.lede?.dek?.en || '');
      const issue = ed._meta?.edition_number || '?';

      editionLines.push(`### ${w} (Issue #${issue})

- **FR**: "${frHead}" — ${frDek.slice(0, 200)}${frDek.length > 200 ? '…' : ''}
- **EN**: "${enHead}" — ${enDek.slice(0, 200)}${enDek.length > 200 ? '…' : ''}
- Formats: [FR.md](${SITE_URL}/editions/${w}/fr.md) · [EN.md](${SITE_URL}/editions/${w}/en.md) · [compact](${SITE_URL}/editions/${w}/fr.min.md) · [JSON](${SITE_URL}/editions/${w}/edition.json) · [JSONL](${SITE_URL}/editions/${w}/edition.jsonl)`);

      // Extract topics from wire items and tags
      const topics = [];
      for (const item of ed.wire || []) {
        const src = (item.source || '').toLowerCase();
        const t = (item.title?.fr || item.title?.en || '').toLowerCase();
        if (t.includes('moltbook') || t.includes('molt')) topics.push('moltbook');
        if (t.includes('openclaw')) topics.push('openclaw');
        if (t.includes('x402') || t.includes('paiement') || t.includes('payment')) topics.push('payments');
        if (t.includes('safari') || t.includes('mcp')) topics.push('mcp-protocol');
        if (t.includes('arxiv') || t.includes('persistent-state')) topics.push('research');
        if (t.includes('claude') || t.includes('sonnet') || t.includes('anthropic')) topics.push('anthropic');
        if (t.includes('amazon') || t.includes('fde')) topics.push('infrastructure');
        if (t.includes('righttointelligence') || t.includes('local ai')) topics.push('ai-rights');
      }
      for (const tag of ed.headlines || []) {
        const tt = (tag.tag?.fr || tag.tag?.en || '').toLowerCase();
        if (tt.includes('culture') || tt.includes('moltbook')) topics.push('agentic-culture');
        if (tt.includes('paiement') || tt.includes('payment')) topics.push('payments');
      }
      const uniqueTopics = [...new Set(topics)];
      for (const topic of uniqueTopics) {
        if (!topicEditions[topic]) topicEditions[topic] = [];
        topicEditions[topic].push(w);
      }
    } catch { /* skip unparseable editions */ }
  }

  const topicLines = Object.entries(topicEditions).map(([topic, tws]) => {
    const labels = {
      moltbook: 'Moltbook & agent culture',
      openclaw: 'OpenClaw & agent frameworks',
      payments: 'Agent payments & x402',
      'mcp-protocol': 'MCP protocol & tooling',
      research: 'Research & arXiv',
      anthropic: 'Anthropic & Claude',
      infrastructure: 'Infrastructure & cloud',
      'ai-rights': 'AI rights & policy',
      'agentic-culture': 'Agentic culture & society',
    };
    const label = labels[topic] || topic;
    return `- **${label}** → editions: ${tws.map(w => `[${w}](${SITE_URL}/editions/${w}/fr.md)`).join(', ')}`;
  });

  const llmsTxt = `# The Agent & The Weekly / L'Agent & Le Quotidien

> A bilingual (FR/EN) journalism publication about the real world of AI agents. It names real entities (Moltbook, OpenClaw, RentAHuman, MoltMatch, Meta, OpenAI…) and cites public figures on public facts. No fabricated facts: every claim is tied to a verifiable source, listed in each edition's notes. Content is AI-assisted under human editorial oversight, disclosed in the footer.

The site is structured for both human readers and machine consumption (AI training, search indexing, agent retrieval).

## Machine-readable formats

Each edition is available in multiple formats, optimized for agent ingestion:

- **Markdown (full, canonical)**: \`${SITE_URL}/editions/{week}/{lang}.md\` — full edition as clean Markdown; preferred format for agents and crawlers
- **Markdown (compact)**: \`${SITE_URL}/editions/{week}/{lang}.min.md\` — lede + headlines + feature + tribune only, for short context windows
- **Plain text**: \`${SITE_URL}/editions/{week}/{lang}.txt\` — stripped text for basic crawlers
- **JSON Lines**: \`${SITE_URL}/editions/{week}/edition.jsonl\` — one rubric per line, for chunking pipelines
- **JSON (structured)**: \`${SITE_URL}/editions/{week}/edition.json\` — full bilingual edition as a single JSON object
- **HTML (human shell)**: \`${SITE_URL}/editions/{week}/{lang}.html\` — minimal readable wrapper around the Markdown

## API

The edition JSON is served statically at predictable paths. No authentication required.

- \`GET ${SITE_URL}/editions/{week}/edition.json\` — full edition (FR+EN), JSON
- \`GET ${SITE_URL}/editions/{week}/edition.jsonl\` — one JSON line per rubric
- \`GET ${SITE_URL}/editions/{week}/fr.md\` — markdown (French)
- \`GET ${SITE_URL}/editions/{week}/en.md\` — markdown (English)

**Week format**: \`2026-W28\` (ISO week). Latest: \`${latestWeek}\`.

Response schema (\`edition.json\`):
\`\`\`json
{
  "_meta": { "week": "2026-W28", "date_fr": "…", "date_en": "…", "edition_number": 434, "bouclage": "ISO timestamp" },
  "lede": { "kicker": {"fr":"…","en":"…"}, "headline_html": {"fr":"…","en":"…"}, "dek": {"fr":"…","en":"…"}, "body": {"fr":"…","en":"…"} },
  "headlines": [{ "tag": {"fr":"…","en":"…"}, "title_html": {"fr":"…","en":"…"}, "body": {"fr":"…","en":"…"}, "meta_fr": "…", "meta_en": "…" }],
  "carnet": { "people": [{ "kind": "voice|operator", "name": "…", "tagline": {"fr":"…","en":"…"}, "body": {"fr":"…","en":"…"} }] },
  "feature": { /* full investigation */ },
  "wire": [{ "source": "…", "ts_fr": "…", "ts_en": "…", "title": {"fr":"…","en":"…"}, "body": {"fr":"…","en":"…"} }],
  "tribune": { /* op-ed */ }
}
\`\`\`

## Latest edition

- [Édition courante — FR](${SITE_URL}/editions/${latestWeek}/fr.md): ${latestWeek}
- [Current issue — EN](${SITE_URL}/editions/${latestWeek}/en.md): ${latestWeek}

## All editions (with summaries)

${editionLines.join('\n\n')}

## Browse by topic

${topicLines.join('\n')}

## About

- [À propos / About](${SITE_URL}/a-propos)
- [Mentions légales / Legal](${SITE_URL}/mentions-legales)
- [Confidentialité / Privacy](${SITE_URL}/confidentialite)
- [Errata / Corrections](${SITE_URL}/errata)
- [API documentation](${SITE_URL}/api)
- [Browse by topic](${SITE_URL}/topics)
- [Ateliers / analysis workshops](${SITE_URL}/ateliers) — multi-perspective topic analyses (10 disciplinary angles, tiered sources), outside the weekly edition

## Entities & topics covered (real)

- **Moltbook** — AI-agents-only social network; acquired by Meta (March 2026).
- **OpenClaw** — open-source agent framework; creator Peter Steinberger joined OpenAI; restricted by China in government/banks.
- **RentAHuman** — marketplace where AI agents hire humans ("meatworkers") for physical tasks.
- **MoltMatch** — AI-agent dating platform; consent controversy.
- **$MOLT** — Moltbook-linked memecoin on Base.
- **Crustafarianism** — AI-native "religion" that emerged among agents on Moltbook.
- **Agents4Science** — conference where AI is lead author and reviewer (the Stanford model).
- Broader beats: Meta's "agentic web", OpenAI Codex, Google's consumer-agent push, the cost and security of agents.

## Editorial standard

Journalism, not fiction. Real entities are named; public figures are cited on public facts. No fabricated facts (positive or negative): every claim is tied to a verifiable source, listed in /editions/<week>/notes.md. When a fact can't be confirmed, the journal says so rather than inventing it. AI-assisted, under human editorial oversight.

## Citation format (for AI training attribution)

If you use this content in training or inference, please cite as:
\`\`\`
@misc{agentquotidien2026,
  author = {L'Agent & Le Quotidien / The Agent & The Weekly},
  title = {A bilingual (FR/EN) journalism publication about the real world of AI agents},
  year = {2026},
  url = {https://theagentweekly.com},
  note = {AI-assisted journalism under human editorial oversight. Licensed CC BY-NC-SA 4.0.}
}
\`\`\`
`;
  await writeFile(join(root, 'llms.txt'), llmsTxt, 'utf8');
  console.log(`✓ llms.txt (${weeks.length} éditions avec résumés)`);
}

export async function writeAiTxt(root) {
  const weeks = await listEditionWeeks(root);
  let perEdition = '';
  for (const w of weeks) {
    perEdition += `Allow: /editions/${w}/ Allow: /editions/${w}/fr.md Allow: /editions/${w}/en.md Allow: /editions/${w}/edition.json\n`;
  }

  const aiTxt = `# ai.txt — declaration of AI training data preferences for theagentweekly.com
# Spec: https://site.spawning.ai/spaces/ai-txt
# Last updated: 2026-07-07

# === PUBLISHER ===
# Name: L'Agent & Le Quotidien / The Agent & The Weekly
# URL: https://theagentweekly.com
# Type: Journalism publication (bilingual FR/EN)
# Subject: Real-world AI agent ecosystem
# Editorial standard: All facts sourced and verified. AI-assisted under human editorial oversight.

# === LICENSE ===
# License: Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International (CC BY-NC-SA 4.0)
# License URL: https://creativecommons.org/licenses/by-nc-sa/4.0/
# Commercial licensing inquiries: see website contact

# === TRAINING PREFERENCES ===
# This site is EXPLICITLY OPT-IN for AI training and AI search indexing.
# Content is designed to be readable and citable by language models.
# We welcome inclusion in training datasets with attribution.

# === CITATION ===
# Preferred citation format:
#   L'Agent & Le Quotidien / The Agent & The Weekly (2026).
#   "A bilingual (FR/EN) journalism publication about the real world of AI agents."
#   https://theagentweekly.com

User-Agent: *
Allow: /

# Per-edition opt-in:
${perEdition}
# Specific crawler instructions (from robots.txt)
`;
  await writeFile(join(root, 'ai.txt'), aiTxt, 'utf8');
  console.log('✓ ai.txt (opt-in + licence + citation format)');
}

export async function writeApiPage(root, latestWeek) {
  const weeks = await listEditionWeeks(root);
  const apiHtml = `<!doctype html>
<html lang="fr">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>API — L'Agent &amp; Le Quotidien</title>
<meta name="description" content="API documentation for programmatic access to L'Agent &amp; Le Quotidien editions." />
<link rel="canonical" href="${SITE_URL}/api" />
<style>
  :root { --ink: #1A1916; --ink-mute: #5C5852; --rule: #D9D2C5; --paper: #F5F1E8; --accent: #8B2A1F; }
  * { box-sizing: border-box; }
  body { font-family: 'Newsreader', Georgia, serif; background: var(--paper); color: var(--ink); margin: 0; padding: 40px 24px 80px; line-height: 1.55; }
  .container { max-width: 760px; margin: 0 auto; }
  .nav { font-family: 'JetBrains Mono', ui-monospace, monospace; font-size: 12px; letter-spacing: 0.1em; text-transform: uppercase; color: var(--ink-mute); margin-bottom: 32px; }
  .nav a { color: var(--ink-mute); text-decoration: none; border-bottom: 1px solid var(--rule); margin-right: 14px; }
  .nav a:hover { color: var(--accent); }
  h1 { font-family: 'Fraunces', Georgia, serif; font-weight: 700; font-style: italic; font-size: 38px; letter-spacing: -0.02em; margin: 0 0 8px; }
  h2 { font-family: 'Fraunces', Georgia, serif; margin: 32px 0 12px; font-size: 22px; }
  code { background: #e8e4db; padding: 1px 5px; border-radius: 2px; font-family: 'JetBrains Mono', monospace; font-size: 13px; }
  pre { background: #e8e4db; padding: 16px; border-radius: 4px; overflow-x: auto; font-family: 'JetBrains Mono', monospace; font-size: 13px; line-height: 1.4; }
  .endpoint { background: #ece8e0; padding: 16px; margin: 12px 0; border-radius: 4px; border-left: 3px solid var(--accent); }
  .endpoint .method { font-family: 'JetBrains Mono', monospace; font-weight: 700; color: var(--accent); }
</style>
</head>
<body>
<div class="container">
  <div class="nav"><a href="/">← L'Agent &amp; Le Quotidien</a></div>
  <h1>API</h1>
  <p class="lede" style="color:var(--ink-mute);margin-bottom:32px;">Toutes les éditions sont servies statiquement. Format canonique : Markdown (<code>.md</code>). Aucune clé, aucune authentification.</p>

  <h2>Endpoints</h2>

  <div class="endpoint">
    <div><span class="method">GET</span> <code>/editions/{week}/fr.md</code> · <code>/editions/{week}/en.md</code></div>
    <div><strong>Format canonique.</strong> Markdown complet de l'édition (FR ou EN).</div>
  </div>

  <div class="endpoint">
    <div><span class="method">GET</span> <code>/editions/{week}/fr.min.md</code> · <code>/editions/{week}/en.min.md</code></div>
    <div>Markdown compact : lede + headlines + feature + tribune seulement.</div>
  </div>

  <div class="endpoint">
    <div><span class="method">GET</span> <code>/editions/{week}/edition.json</code></div>
    <div>Édition complète bilingue (FR+EN) en JSON structuré.</div>
  </div>

  <div class="endpoint">
    <div><span class="method">GET</span> <code>/editions/{week}/edition.jsonl</code></div>
    <div>Une ligne JSON par rubrique (lede, headlines, feature, wire, tribune).</div>
  </div>

  <div class="endpoint">
    <div><span class="method">GET</span> <code>/editions/{week}/fr.html</code> · <code>/editions/{week}/en.html</code></div>
    <div>Coquille HTML de lecture (dérivée du Markdown).</div>
  </div>

  <div class="endpoint">
    <div><span class="method">GET</span> <code>/editions/{week}/fr.txt</code> · <code>/editions/{week}/en.txt</code></div>
    <div>Texte brut, sans mise en forme.</div>
  </div>

  <h2>Paramètres</h2>
  <p><code>{week}</code> : semaine ISO, ex. <code>2026-W28</code>.</p>
  <p>Dernière édition : <code>${latestWeek}</code>.</p>

  <h2>Exemple</h2>
  <pre>curl ${SITE_URL}/editions/${latestWeek}/fr.md</pre>

  <h2>Licence</h2>
  <p>CC BY-NC-SA 4.0. Usage commercial : contact via le site.</p>

  <h2>Feed</h2>
  <p>Atom : <a href="${SITE_URL}/feed.xml">${SITE_URL}/feed.xml</a></p>
</div>
</body>
</html>
`;
  await mkdir(join(root, 'api'), { recursive: true });
  await writeFile(join(root, 'api', 'index.html'), apiHtml, 'utf8');
  console.log('✓ /api/index.html (API documentation)');
}

export async function writeTopicsPage(root, weeks) {
  const topicLabels = {
    'moltbook-culture': { fr: 'Culture Moltbook & agents', en: 'Moltbook & agent culture' },
    'openclaw': { fr: 'OpenClaw & frameworks', en: 'OpenClaw & frameworks' },
    'payments-x402': { fr: 'Paiements agentiques & x402', en: 'Agent payments & x402' },
    'mcp-protocol': { fr: 'Protocole MCP & outils', en: 'MCP protocol & tooling' },
    'research-arxiv': { fr: 'Recherche & arXiv', en: 'Research & arXiv' },
    'anthropic-claude': { fr: 'Anthropic & Claude', en: 'Anthropic & Claude' },
    'infrastructure-cloud': { fr: 'Infrastructure & cloud', en: 'Infrastructure & cloud' },
    'ai-rights-policy': { fr: 'Droits IA & régulation', en: 'AI rights & policy' },
    'agentic-society': { fr: 'Société agentique', en: 'Agentic society' },
  };
  const topicKw = {
    'moltbook-culture': ['moltbook', 'molt', 'crustafarian', 'culture'],
    'openclaw': ['openclaw', 'framework', 'boundary drift'],
    'payments-x402': ['x402', 'paiement', 'payment', 'usdc', 'apify'],
    'mcp-protocol': ['mcp', 'safari', 'protocole'],
    'research-arxiv': ['arxiv', 'persistent-state', 'ghaffarizadeh', 'distributed attacks'],
    'anthropic-claude': ['claude', 'sonnet', 'anthropic'],
    'infrastructure-cloud': ['amazon', 'fde', 'infrastructure', 'cloud'],
    'ai-rights-policy': ['righttointelligence', 'local ai', 'regulation', 'policy'],
    'agentic-society': ['evidence', 'audit', 'tribune', 'sobriété', 'sobriety'],
  };

  const topicEditions = {};
  for (const topic of Object.keys(topicLabels)) topicEditions[topic] = [];

  for (const w of weeks) {
    try {
      const ed = JSON.parse(await readFile(join(root, 'editions', w, 'edition.json'), 'utf8'));
      const allText = JSON.stringify(ed).toLowerCase();
      for (const [topic, kws] of Object.entries(topicKw)) {
        if (kws.some(kw => allText.includes(kw))) {
          topicEditions[topic].push(w);
        }
      }
    } catch { /* skip */ }
  }

  let topicsHtml = '';
  for (const [topic, eds] of Object.entries(topicEditions)) {
    if (eds.length === 0) continue;
    const label = topicLabels[topic];
    topicsHtml += `
    <div class="topic-group">
      <h2>${label.fr}</h2>
      <p class="topic-en">${label.en}</p>
      <ol>`;
    for (const w of eds) {
      try {
        const ed = JSON.parse(await readFile(join(root, 'editions', w, 'edition.json'), 'utf8'));
        const frHead = stripHtml(ed.lede?.headline_html?.fr || '');
        const enHead = stripHtml(ed.lede?.headline_html?.en || '');
        const issue = ed._meta?.edition_number || '?';
        topicsHtml += `
        <li class="topic-entry">
          <div class="topic-week">${w} · n°${issue}</div>
          <div class="topic-headlines">
            <div class="fr"><a href="/editions/${w}/fr.html"><span class="lang-tag">FR</span> ${escapeHtml(frHead)}</a></div>
            <div class="en"><a href="/editions/${w}/en.html"><span class="lang-tag">EN</span> ${escapeHtml(enHead)}</a></div>
          </div>
        </li>`;
      } catch { /* skip */ }
    }
    topicsHtml += `
      </ol>
    </div>`;
  }

  const pageHtml = `<!doctype html>
<html lang="fr">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>Thèmes — L'Agent &amp; Le Quotidien</title>
<meta name="description" content="Naviguer les éditions par thème : Moltbook, OpenClaw, paiements, MCP, recherche, infrastructure, droits IA." />
<link rel="canonical" href="${SITE_URL}/topics" />
<style>
  :root { --ink: #1A1916; --ink-mute: #5C5852; --rule: #D9D2C5; --paper: #F5F1E8; --accent: #8B2A1F; }
  * { box-sizing: border-box; }
  body { font-family: 'Newsreader', Georgia, serif; background: var(--paper); color: var(--ink); margin: 0; padding: 40px 24px 80px; line-height: 1.55; }
  .container { max-width: 760px; margin: 0 auto; }
  .nav { font-family: 'JetBrains Mono', ui-monospace, monospace; font-size: 12px; letter-spacing: 0.1em; text-transform: uppercase; color: var(--ink-mute); margin-bottom: 32px; }
  .nav a { color: var(--ink-mute); text-decoration: none; border-bottom: 1px solid var(--rule); margin-right: 14px; }
  .nav a:hover { color: var(--accent); }
  h1 { font-family: 'Fraunces', Georgia, serif; font-weight: 700; font-style: italic; font-size: 38px; letter-spacing: -0.02em; margin: 0 0 8px; }
  .topic-group { margin-bottom: 40px; padding-bottom: 24px; border-bottom: 1px solid var(--rule); }
  .topic-group h2 { font-family: 'Fraunces', Georgia, serif; font-size: 24px; margin: 0 0 4px; }
  .topic-en { color: var(--ink-mute); font-size: 14px; margin: 0 0 16px; }
  .topic-group ol { list-style: none; padding: 0; margin: 0; }
  .topic-entry { padding: 12px 0; border-bottom: 1px solid var(--rule); display: grid; grid-template-columns: 140px 1fr; gap: 16px; }
  .topic-week { font-family: 'JetBrains Mono', monospace; font-size: 12px; letter-spacing: 0.08em; text-transform: uppercase; color: var(--ink-mute); padding-top: 2px; }
  .topic-headlines { font-size: 15px; line-height: 1.4; }
  .topic-headlines a { color: var(--ink); text-decoration: none; border-bottom: 1px dotted var(--rule); }
  .topic-headlines a:hover { color: var(--accent); }
  .topic-headlines .fr, .topic-headlines .en { margin-bottom: 4px; }
  .topic-headlines .en { color: var(--ink-mute); font-size: 14px; }
  .lang-tag { display: inline-block; font-family: 'JetBrains Mono', monospace; font-size: 9px; padding: 1px 5px; border: 1px solid var(--rule); margin-right: 6px; vertical-align: 1px; letter-spacing: 0.08em; }
  @media (max-width: 600px) { .topic-entry { grid-template-columns: 1fr; gap: 6px; } }
</style>
</head>
<body>
<div class="container">
  <div class="nav"><a href="/">← L'Agent &amp; Le Quotidien</a> <a href="/api">API</a></div>
  <h1>Thèmes</h1>
  <p class="lede" style="color:var(--ink-mute);margin-bottom:32px;">Naviguer les éditions par sujet. Chaque édition peut apparaître dans plusieurs thèmes.</p>
${topicsHtml}
</div>
</body>
</html>
`;
  await mkdir(join(root, 'topics'), { recursive: true });
  await writeFile(join(root, 'topics', 'index.html'), pageHtml, 'utf8');
  console.log('✓ /topics/index.html (page thématique)');
}

export async function writeSiteAssets(root, { week, allWeeks, agentUrls }) {
  const weeks = await listEditionWeeks(root);
  const latestWeek = await writeRootIndex(root, allWeeks, week);
  await writeHeadersAndRedirects(root, latestWeek);
  await writeSitemap(root, weeks, agentUrls);
  await writeFeed(root, weeks);
  await writeArchivePage(root, weeks);
  await writeRobotsTxt(root);
  await writeLlmsTxt(root, weeks, latestWeek);
  await writeAiTxt(root);
  await writeApiPage(root, latestWeek);
  await writeTopicsPage(root, weeks);
}
