#!/usr/bin/env node
// render.mjs — moteur de rendu pour L'Agent & Le Quotidien
// Usage : node render.mjs 2026-W19
// Produit : editions/2026-W19/fr.html et en.html + assets site (sitemap, feed, …)

import { readFile, writeFile, readdir } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { buildLabels } from './lib/edition-labels.mjs';
import { buildContext } from './lib/edition-context.mjs';
import { render } from './lib/template.mjs';
import { writeAgentPages } from './lib/agents-pages.mjs';
import { writeSiteAssets } from './lib/site-assets.mjs';
import { editionToMarkdown, editionToText } from './lib/edition-markdown.mjs';

const __dirname = dirname(fileURLToPath(import.meta.url));

const week = process.argv[2];
if (!week) {
  console.error('Usage : node render.mjs <YYYY-WXX>');
  console.error('Ex.   : node render.mjs 2026-W19');
  process.exit(1);
}

const editionDir = join(__dirname, 'editions', week);
const templateHtml = await readFile(join(__dirname, 'templates', 'edition.html'), 'utf8');
const css = await readFile(join(__dirname, 'templates', 'edition.css'), 'utf8');
const edition = JSON.parse(await readFile(join(editionDir, 'edition.json'), 'utf8'));

const allWeekDirs = await readdir(join(__dirname, 'editions'), { withFileTypes: true });
const allWeeks = allWeekDirs
  .filter(d => d.isDirectory() && /^\d{4}-W\d{2}$/.test(d.name))
  .map(d => d.name)
  .sort();
const currentIdx = allWeeks.indexOf(week);
const prevWeek = currentIdx > 0 ? allWeeks[currentIdx - 1] : null;
const nextWeek = currentIdx >= 0 && currentIdx < allWeeks.length - 1 ? allWeeks[currentIdx + 1] : null;

const labels = buildLabels(edition);

for (const lang of ['fr', 'en']) {
  const ctx = buildContext({ edition, week, lang, css, labels, prevWeek, nextWeek });
  const html = render(templateHtml, ctx);
  const outPath = join(editionDir, `${lang}.html`);
  await writeFile(outPath, html, 'utf8');
  console.log(`✓ Rendu : ${outPath}`);

  const md = editionToMarkdown(edition, week, lang);
  await writeFile(join(editionDir, `${lang}.md`), md, 'utf8');
  const txt = editionToText(edition, week, lang);
  await writeFile(join(editionDir, `${lang}.txt`), txt, 'utf8');
  console.log(`✓ Agent : ${join(editionDir, `${lang}.md`)} + .txt`);
}

const peopleData = JSON.parse(await readFile(join(__dirname, 'data', 'people.json'), 'utf8'));
const agentUrls = await writeAgentPages(__dirname, peopleData);
await writeSiteAssets(__dirname, { week, allWeeks, agentUrls });

console.log(`\n→ Ouvre ${join(editionDir, 'fr.html')} dans ton navigateur.`);
