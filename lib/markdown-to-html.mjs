// lib/markdown-to-html.mjs — Conversion Markdown minimale (0 dépendance).
// Couvre le sous-ensemble produit par editionToMarkdown() : titres, emphase,
// blockquotes, listes, paragraphes, séparateurs.
// renderEditionHtml() ajoute sommaire + ancres (coquille HTML uniquement).

import { escapeHtml } from './template.mjs';

function inlineFormat(text) {
  let s = escapeHtml(text);
  s = s.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
  s = s.replace(/\*(.+?)\*/g, '<em>$1</em>');
  return s;
}

function slugify(text) {
  return text
    .normalize('NFD')
    .replace(/\p{M}/gu, '')
    .toLowerCase()
    .replace(/[''«»"]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
    .slice(0, 60) || 'section';
}

function uniqueSlug(title, used) {
  const base = slugify(title);
  const n = used.get(base) ?? 0;
  used.set(base, n + 1);
  return n === 0 ? base : `${base}-${n + 1}`;
}

function parseSections(md) {
  const lines = md.split('\n');
  const preamble = [];
  const sections = [];
  let current = null;

  for (const line of lines) {
    const h2 = line.match(/^## (.+)$/);
    if (h2) {
      if (current) sections.push(current);
      current = { title: h2[1], lines: [] };
    } else if (current) {
      current.lines.push(line);
    } else {
      preamble.push(line);
    }
  }
  if (current) sections.push(current);
  return { preamble, sections };
}

function isNavSection(title) {
  return /^(?:Édition précédente|Previous issue)$/i.test(title.trim());
}

function needsBackLink(title, lines) {
  const t = title.toLowerCase();
  if (/enquête|investigation|feature/.test(t)) return true;
  if (/tribune|op-ed|◆/.test(t)) return true;
  if (/carnet|roster/.test(t)) {
    return lines.filter((l) => l.startsWith('### ')).length >= 3;
  }
  return false;
}

function renderMarkdownLines(lines) {
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

    const h4 = line.match(/^#### (.+)$/);
    if (h4) {
      out.push(`<h4>${inlineFormat(h4[1])}</h4>`);
      i++;
      continue;
    }

    if (line.startsWith('|') && line.includes('|', 1)) {
      const tableLines = [];
      while (i < lines.length && lines[i].trim().startsWith('|')) {
        tableLines.push(lines[i]);
        i++;
      }
      if (tableLines.length >= 2 && /^\|[\s\-:|]+\|$/.test(tableLines[1].trim())) {
        const parseRow = (row) => row.split('|').slice(1, -1).map(c => c.trim());
        const headers = parseRow(tableLines[0]);
        const bodyRows = tableLines.slice(2).map(parseRow);
        let table = '<table><thead><tr>';
        table += headers.map(h => `<th>${inlineFormat(h)}</th>`).join('');
        table += '</tr></thead><tbody>';
        for (const row of bodyRows) {
          table += '<tr>' + row.map(c => `<td>${inlineFormat(c)}</td>`).join('') + '</tr>';
        }
        table += '</tbody></table>';
        out.push(table);
        continue;
      }
      i -= tableLines.length;
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

function buildTocHtml(entries, lang) {
  if (!entries.length) return '';
  const label = lang === 'fr' ? 'Sommaire' : 'Contents';
  const items = entries
    .map((e) => `<li><a href="#${e.id}">${inlineFormat(e.title)}</a></li>`)
    .join('\n');

  return `<div class="toc-desktop">
<div class="toc-label">${label}</div>
<ol class="toc-list">${items}</ol>
</div>
<details class="toc-mobile">
<summary>${label}</summary>
<ol class="toc-list">${items}</ol>
</details>`;
}

/** Conversion simple MD → HTML (sans sommaire). */
export function markdownToHtml(md) {
  return renderMarkdownLines(md.split('\n'));
}

/** Rendu édition pour coquille HTML : sommaire, ancres, retours ↑ Sommaire. */
export function renderEditionHtml(md, lang = 'fr') {
  const { preamble, sections } = parseSections(md);
  const usedSlugs = new Map();
  const tocEntries = [];
  const backLabel = lang === 'fr' ? '↑ Sommaire' : '↑ Contents';
  const parts = [];

  if (preamble.some((l) => l.trim())) {
    parts.push(renderMarkdownLines(preamble));
  }

  for (const section of sections) {
    if (isNavSection(section.title)) {
      parts.push(renderMarkdownLines([`## ${section.title}`, ...section.lines]));
      continue;
    }

    const id = uniqueSlug(section.title, usedSlugs);
    tocEntries.push({ id, title: section.title });

    const inner = renderMarkdownLines(section.lines);
    const back = needsBackLink(section.title, section.lines)
      ? `<p class="back-to-toc"><a href="#sommaire">${backLabel}</a></p>`
      : '';

    parts.push(
      `<section class="edition-section" aria-labelledby="${id}">`,
      `<h2 id="${id}">${inlineFormat(section.title)}</h2>`,
      inner,
      back,
      '</section>',
    );
  }

  return {
    tocHtml: buildTocHtml(tocEntries, lang),
    bodyHtml: parts.filter(Boolean).join('\n'),
    hasToc: tocEntries.length > 0,
  };
}
