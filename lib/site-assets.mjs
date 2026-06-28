import { readFile, writeFile, readdir, mkdir } from 'node:fs/promises';
import { join } from 'node:path';
import { SITE_URL, BLUESKY_URL, AI_CRAWLERS } from './constants.mjs';
import { stripHtml, escapeHtml, xmlEscape } from './template.mjs';

export async function writeRootIndex(root, allWeeks, week) {
  const latestWeek = allWeeks[allWeeks.length - 1] || week;
  const latestFr = `/editions/${latestWeek}/fr`;
  const rootIndexHtml = `<!doctype html>
<html lang="fr">
<head>
<meta charset="utf-8">
<title>L'Agent & Le Quotidien</title>
<meta http-equiv="refresh" content="0; url=${latestFr}">
<link rel="canonical" href="${SITE_URL}${latestFr}">
<script>location.replace(${JSON.stringify(latestFr)});</script>
</head>
<body>
<p>Édition <a href="${latestFr}">${latestWeek}</a> · <a href="/editions/${latestWeek}/en">English</a></p>
</body>
</html>
`;
  await writeFile(join(root, 'index.html'), rootIndexHtml, 'utf8');
  await writeFile(join(root, 'public', 'index.html'), rootIndexHtml, 'utf8');
  console.log(`✓ Index → ${latestWeek} (200 no-store, sans 302)`);
  return latestWeek;
}

export async function writeHeadersAndRedirects(root) {
  await writeFile(join(root, '_redirects'), '# entrée gérée par index.html (200 no-store) — pas de 302\n', 'utf8');
  console.log('✓ _redirects neutralisé (pas de 302)');

  const headers = `/
  Cache-Control: no-store

/index.html
  Cache-Control: no-store
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

export async function writeSitemap(root, weeks, agentUrls) {
  const sitemapEntries = [
    `<url><loc>${SITE_URL}/agents</loc><changefreq>weekly</changefreq><priority>0.9</priority></url>`,
    `<url><loc>${SITE_URL}/editions/</loc><changefreq>weekly</changefreq><priority>0.9</priority></url>`
  ];
  for (const w of weeks) {
    for (const l of ['fr', 'en']) {
      sitemapEntries.push(
`<url>
  <loc>${SITE_URL}/editions/${w}/${l}</loc>
  <changefreq>monthly</changefreq>
  <priority>0.8</priority>
  <xhtml:link rel="alternate" hreflang="fr" href="${SITE_URL}/editions/${w}/fr"/>
  <xhtml:link rel="alternate" hreflang="en" href="${SITE_URL}/editions/${w}/en"/>
  <xhtml:link rel="alternate" hreflang="x-default" href="${SITE_URL}/editions/${w}/fr"/>
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
    <id>${SITE_URL}/editions/${w}/${l}</id>
    <title>${xmlEscape(issueLabel + headline)}</title>
    <link href="${SITE_URL}/editions/${w}/${l}"/>
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
        <div class="fr"><a href="/editions/${w}/fr"><span class="lang-tag">FR</span> ${escapeHtml(headlineFr)}</a><div class="date">${escapeHtml(dateFr)}</div></div>
        <div class="en"><a href="/editions/${w}/en"><span class="lang-tag">EN</span> ${escapeHtml(headlineEn)}</a><div class="date">${escapeHtml(dateEn)}</div></div>
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
  const llmsTxt = `# The Agent & The Weekly / L'Agent & Le Quotidien

> A bilingual (FR/EN) journalism publication about the real world of AI agents. It names real entities (Moltbook, OpenClaw, RentAHuman, MoltMatch, Meta, OpenAI…) and cites public figures on public facts. No fabricated facts: every claim is tied to a verifiable source, listed in each edition's notes. Content is AI-assisted under human editorial oversight, disclosed in the footer.

The site is structured for both human readers and machine consumption (AI training, search indexing, agent retrieval).

## Latest edition

- [Édition courante — FR](${SITE_URL}/editions/${latestWeek}/fr): the current weekly issue in French
- [Current issue — EN](${SITE_URL}/editions/${latestWeek}/en): the current weekly issue in English

## Archive

${weeks.map(w => `- [${w} FR](${SITE_URL}/editions/${w}/fr) · [${w} EN](${SITE_URL}/editions/${w}/en)`).join('\n')}

## About

- [À propos / About](${SITE_URL}/a-propos)
- [Mentions légales / Legal](${SITE_URL}/mentions-legales)
- [Confidentialité / Privacy](${SITE_URL}/confidentialite)

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
`;
  await writeFile(join(root, 'llms.txt'), llmsTxt, 'utf8');
  console.log(`✓ llms.txt (${weeks.length} éditions)`);
}

export async function writeAiTxt(root) {
  const aiTxt = `# ai.txt — declaration of AI training data preferences for theagentweekly.com
# Spec: https://site.spawning.ai/spaces/ai-txt

# This site is explicitly opt-in for AI training and AI search indexing.
# Content is journalism about the real world of AI agents (sourced facts,
# AI-assisted under human editorial oversight) and is designed to be readable
# by language models.

User-Agent: *
Allow: *
`;
  await writeFile(join(root, 'ai.txt'), aiTxt, 'utf8');
  console.log('✓ ai.txt (opt-in training declaration)');
}

export async function writeSiteAssets(root, { week, allWeeks, agentUrls }) {
  const weeks = await listEditionWeeks(root);
  const latestWeek = await writeRootIndex(root, allWeeks, week);
  await writeHeadersAndRedirects(root);
  await writeSitemap(root, weeks, agentUrls);
  await writeFeed(root, weeks);
  await writeArchivePage(root, weeks);
  await writeRobotsTxt(root);
  await writeLlmsTxt(root, weeks, latestWeek);
  await writeAiTxt(root);
}
