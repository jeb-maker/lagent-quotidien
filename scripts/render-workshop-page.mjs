#!/usr/bin/env node

import { readFile, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { markdownToHtml } from '../lib/markdown-to-html.mjs';
import { escapeHtml } from '../lib/template.mjs';
import { SITE_URL } from '../lib/constants.mjs';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const analysisDir = process.argv[2];
const webSlug = process.argv[3];

if (!analysisDir || !webSlug) {
  console.error('Usage: node scripts/render-workshop-page.mjs <analysis-directory> <web-slug>');
  process.exit(1);
}

const sourceDir = join(root, 'data', 'analyses', analysisDir);
const topic = JSON.parse(await readFile(join(sourceDir, 'topic.json'), 'utf8'));
const synthesis = await readFile(join(sourceDir, 'synthesis.md'), 'utf8');
const bibliography = await readFile(join(sourceDir, 'bibliography.md'), 'utf8');
const sourceCount = (bibliography.match(/^- \[N[1-5]\]/gm) || []).length;
const bodyMarkdown = synthesis.replace(/^# .+\n+/, '');
const bodyHtml = markdownToHtml(bodyMarkdown);
const title = escapeHtml(topic.topic);
const canonicalUrl = `${SITE_URL}/ateliers/${webSlug}`;
const dataUrl = `https://github.com/jeb-maker/lagent-quotidien/tree/main/data/analyses/${analysisDir}`;

const html = `<!doctype html>
<html lang="fr">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>${title} — Atelier d'analyse</title>
<meta name="description" content="Analyse multi-perspectives : ${topic.angles_count} angles disciplinaires, ${sourceCount} sources hiérarchisées." />
<link rel="canonical" href="${canonicalUrl}" />
<meta property="og:type" content="article" />
<meta property="og:site_name" content="L'Agent &amp; Le Quotidien" />
<meta property="og:title" content="${title}" />
<meta property="og:description" content="Analyse multi-perspectives : ${topic.angles_count} angles disciplinaires, ${sourceCount} sources hiérarchisées." />
<meta property="og:url" content="${canonicalUrl}" />
<style>
  :root { --ink: #1A1916; --ink-mute: #5C5852; --rule: #D9D2C5; --paper: #F5F1E8; --accent: #8B2A1F; --tag: #f0ebe0; }
  * { box-sizing: border-box; }
  body { font-family: 'Newsreader', Georgia, serif; background: var(--paper); color: var(--ink); margin: 0; padding: 40px 24px 80px; line-height: 1.65; }
  .container { max-width: 780px; margin: 0 auto; }
  .nav { font-family: 'JetBrains Mono', ui-monospace, monospace; font-size: 12px; letter-spacing: 0.1em; text-transform: uppercase; color: var(--ink-mute); margin-bottom: 32px; }
  .nav a { color: var(--ink-mute); text-decoration: none; border-bottom: 1px solid var(--rule); }
  .nav a:hover { color: var(--accent); }
  .kicker { font-family: 'JetBrains Mono', ui-monospace, monospace; font-size: 13px; letter-spacing: 0.12em; text-transform: uppercase; color: var(--accent); margin-bottom: 8px; }
  h1 { font-family: 'Fraunces', Georgia, serif; font-weight: 700; font-style: italic; font-size: 36px; letter-spacing: -0.02em; margin: 0 0 24px; line-height: 1.2; padding-bottom: 24px; border-bottom: 2px solid var(--rule); }
  h2 { font-family: 'Fraunces', Georgia, serif; font-weight: 700; font-size: 24px; margin: 40px 0 12px; letter-spacing: -0.01em; }
  h3 { font-family: 'Fraunces', Georgia, serif; font-weight: 600; font-size: 19px; margin: 28px 0 8px; }
  p { margin: 0 0 14px; font-size: 16.5px; }
  a { color: var(--accent); }
  ul, ol { padding-left: 24px; }
  li { margin-bottom: 8px; font-size: 16.5px; }
  .method { padding: 18px 22px; background: rgba(139, 42, 31, 0.04); border-left: 3px solid var(--accent); margin: 18px 0 30px; font-size: 16px; }
  .small { font-size: 14px; color: var(--ink-mute); margin-top: 48px; padding-top: 24px; border-top: 1px solid var(--rule); }
  @media (max-width: 600px) { body { padding: 24px 18px 60px; } h1 { font-size: 30px; } }
</style>
</head>
<body>
<div class="container">
  <div class="nav"><a href="/ateliers">← Ateliers</a> · <a href="/">L'Agent &amp; Le Quotidien</a></div>
  <div class="kicker">Atelier d'analyse · ${escapeHtml(topic.date)} · ${topic.angles_count} angles · ${sourceCount} sources</div>
  <h1>${title}</h1>
  <div class="method"><strong>Méthode.</strong> Comparaison multi-perspectives hors édition hebdomadaire. Les niveaux de preuve et les limites géographiques restent visibles dans la synthèse.</div>
  <article>
${bodyHtml}
  </article>
  <div class="small">
    <strong>Méthode</strong> : <a href="https://github.com/jeb-maker/lagent-quotidien/blob/main/prompts/analyze-topic.md">prompts/analyze-topic.md</a> ·
    <strong>Données complètes</strong> : <a href="${dataUrl}">data/analyses/</a> ·
    <strong>Index</strong> : <a href="/ateliers">Ateliers</a> · <a href="/">L'Agent &amp; Le Quotidien</a>
  </div>
</div>
</body>
</html>
`;

const output = join(root, 'ateliers', `${webSlug}.html`);
await writeFile(output, html, 'utf8');
console.log(`✓ Atelier : ${output}`);
