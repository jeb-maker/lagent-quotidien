// lib/markdown-to-html.mjs — Conversion Markdown minimale (0 dépendance).
// Couvre le sous-ensemble produit par editionToMarkdown() : titres, emphase,
// blockquotes, listes, paragraphes, séparateurs.

import { escapeHtml } from './template.mjs';

function inlineFormat(text) {
  let s = escapeHtml(text);
  s = s.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
  s = s.replace(/\*(.+?)\*/g, '<em>$1</em>');
  return s;
}

export function markdownToHtml(md) {
  const lines = md.split('\n');
  const out = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];

    if (line.trim() === '') {
      i++;
      continue;
    }

    if (/^---\s*$/.test(line)) {
      out.push('<hr>');
      i++;
      continue;
    }

    const h3 = line.match(/^### (.+)$/);
    if (h3) {
      out.push(`<h3>${inlineFormat(h3[1])}</h3>`);
      i++;
      continue;
    }

    const h2 = line.match(/^## (.+)$/);
    if (h2) {
      out.push(`<h2>${inlineFormat(h2[1])}</h2>`);
      i++;
      continue;
    }

    const h1 = line.match(/^# (.+)$/);
    if (h1) {
      out.push(`<h1>${inlineFormat(h1[1])}</h1>`);
      i++;
      continue;
    }

    if (line.startsWith('>')) {
      const quoteLines = [];
      while (i < lines.length && lines[i].startsWith('>')) {
        quoteLines.push(lines[i].replace(/^>\s?/, ''));
        i++;
      }
      out.push(`<blockquote><p>${quoteLines.map(inlineFormat).join('<br>')}</p></blockquote>`);
      continue;
    }

    if (line.startsWith('- ')) {
      const items = [];
      while (i < lines.length && lines[i].startsWith('- ')) {
        items.push(`<li>${inlineFormat(lines[i].slice(2))}</li>`);
        i++;
      }
      out.push(`<ul>${items.join('')}</ul>`);
      continue;
    }

    const paraLines = [];
    while (i < lines.length && lines[i].trim() !== '') {
      paraLines.push(lines[i]);
      i++;
    }
    out.push(`<p>${inlineFormat(paraLines.join(' '))}</p>`);
  }

  return out.join('\n');
}
