// lib/edition-markdown.mjs — Convertit edition.json en Markdown et texte brut.
// Objectif : donner aux agents IA un format qu'ils ingèrent nativement,
// sans avoir à parser le HTML (ticker animé, CSS inline, JS).
//
// Genère :
//   editions/<week>/fr.md  + en.md   (Markdown propre)
//   editions/<week>/fr.txt + en.txt  (texte brut, repli pour crawlers basiques)
//
// Le Markdown est structuré avec des titres ##, listes, et citations.
// Pas de HTML résiduel — tout est balisé Markdown natif.

import { SITE_URL } from './constants.mjs';
import { stripHtml } from './template.mjs';

function pick(field, lang) {
  if (field === null || field === undefined) return '';
  if (typeof field === 'string') return field;
  if (typeof field === 'object' && (field.fr !== undefined || field.en !== undefined)) {
    return field[lang] ?? field.fr ?? field.en ?? '';
  }
  return field;
}

function clean(text) {
  return stripHtml(text).trim();
}

export function editionToMarkdown(edition, week, lang) {
  const L = lang;
  const meta = edition._meta;
  const siteName = L === 'fr' ? "L'Agent & Le Quotidien" : 'The Agent & The Weekly';
  const url = `${SITE_URL}/editions/${week}/${L}`;
  const lines = [];

  // En-tête
  lines.push(`# ${siteName} — ${meta.date_fr && L === 'fr' ? meta.date_fr : meta.date_en}`);
  lines.push('');
  lines.push(`> ${L === 'fr' ? 'Édition' : 'Issue'} n° ${meta.edition_number} · Vol. ${meta.volume} · ${week}`);
  lines.push(`> ${url}`);
  lines.push('');

  // Ticker (résumé en une ligne)
  if (Array.isArray(edition.ticker) && edition.ticker.length) {
    lines.push(`## ${L === 'fr' ? 'Fil d\'actualité' : 'News feed'}`);
    lines.push('');
    for (const t of edition.ticker) {
      const text = pick(t.text_fr ? { fr: t.text_fr, en: t.text_en } : t.text, L);
      lines.push(`- ${clean(text)}`);
    }
    lines.push('');
  }

  // Lede
  if (edition.lede) {
    const kicker = pick(edition.lede.kicker, L);
    if (kicker) lines.push(`## ${clean(kicker)}`);
    lines.push(`# ${clean(pick(edition.lede.headline_html, L))}`);
    lines.push('');
    const dek = clean(pick(edition.lede.dek, L));
    if (dek) { lines.push(`*${dek}*`); lines.push(''); }
    const body = clean(pick(edition.lede.body, L));
    if (body) { lines.push(body); lines.push(''); }
  }

  // Brèves
  if (Array.isArray(edition.breves) && edition.breves.length) {
    lines.push(`## ${L === 'fr' ? 'Brèves' : 'Briefs'}`);
    lines.push('');
    for (const b of edition.breves) {
      const time = L === 'fr' ? (b.time_fr || '') : (b.time_en || '');
      const title = clean(pick(b.title, L));
      const body = clean(pick(b.body, L));
      lines.push(`### ${time ? time + ' — ' : ''}${title}`);
      lines.push('');
      lines.push(body);
      lines.push('');
    }
  }

  // Headlines
  if (Array.isArray(edition.headlines) && edition.headlines.length) {
    lines.push(`## ${L === 'fr' ? 'Gros titres' : 'Headlines'}`);
    lines.push('');
    for (const h of edition.headlines) {
      const tag = clean(pick(h.tag, L));
      const title = clean(pick(h.title_html, L));
      const body = clean(pick(h.body, L));
      const meta_h = L === 'fr' ? (h.meta_fr || '') : (h.meta_en || '');
      if (tag) lines.push(`**${tag}**`);
      lines.push(`### ${title}`);
      if (meta_h) lines.push(`*${meta_h}*`);
      lines.push('');
      lines.push(body);
      lines.push('');
    }
  }

  // Carnet
  if (edition.carnet && Array.isArray(edition.carnet.people) && edition.carnet.people.length) {
    const title = clean(pick(edition.carnet.title, L));
    const subtitle = clean(pick(edition.carnet.subtitle, L));
    lines.push(`## ${title}`);
    if (subtitle) lines.push(`*${subtitle}*`);
    lines.push('');
    for (const p of edition.carnet.people) {
      const name = p.display_name || p.name || '';
      const tagline = clean(pick(p.tagline, L));
      const body = clean(pick(p.body, L));
      lines.push(`### ${name}`);
      if (tagline) lines.push(`*${tagline}*`);
      lines.push('');
      lines.push(body);
      lines.push('');
    }
  }

  // Feature / Enquête
  const feature = edition.feature ?? edition.enquete;
  if (feature && feature.paragraphs) {
    const kicker = L === 'fr' ? (feature.kicker_fr || '') : (feature.kicker_en || '');
    if (kicker) lines.push(`## ${kicker}`);
    lines.push(`# ${clean(pick(feature.headline_html, L))}`);
    lines.push('');
    const dek = clean(pick(feature.dek, L));
    if (dek) { lines.push(`*${dek}*`); lines.push(''); }
    const paras = L === 'fr' ? feature.paragraphs.fr : feature.paragraphs.en;
    if (Array.isArray(paras)) {
      for (const p of paras) { lines.push(clean(p)); lines.push(''); }
    }
    const pq = pick(feature.pull_quote, L);
    if (pq) {
      lines.push(`> ${clean(pq)}`);
      const cite = pick(feature.pull_quote_cite, L);
      if (cite) lines.push(`> — ${clean(cite)}`);
      lines.push('');
    }
    if (Array.isArray(feature.timeline) && feature.timeline.length) {
      lines.push(`### ${L === 'fr' ? 'Chronologie' : 'Timeline'}`);
      lines.push('');
      for (const t of feature.timeline) {
        const text = clean(pick(t.text, L));
        lines.push(`- **${t.date}** — ${text}`);
      }
      lines.push('');
    }
  }

  // Rétrospective mensuelle
  if (edition.retrospective && edition.retrospective.paragraphs) {
    const kicker = pick(edition.retrospective.kicker, L);
    if (kicker) lines.push(`## ${clean(kicker)}`);
    lines.push(`# ${clean(pick(edition.retrospective.headline_html, L))}`);
    lines.push('');
    const dek = clean(pick(edition.retrospective.dek, L));
    if (dek) { lines.push(`*${dek}*`); lines.push(''); }
    const paras = L === 'fr' ? edition.retrospective.paragraphs.fr : edition.retrospective.paragraphs.en;
    if (Array.isArray(paras)) {
      for (const p of paras) { lines.push(clean(p)); lines.push(''); }
    }
  }

  // Dépêches
  if (Array.isArray(edition.wire) && edition.wire.length) {
    lines.push(`## ${L === 'fr' ? 'Dépêches' : 'Wire'}`);
    lines.push('');
    for (const w of edition.wire) {
      const ts = L === 'fr' ? (w.ts_fr || w.time_fr || '') : (w.ts_en || w.time_en || '');
      const title = clean(pick(w.title, L));
      const body = clean(pick(w.body, L));
      lines.push(`### ${w.source}${ts ? ' · ' + ts : ''}`);
      lines.push(`**${title}**`);
      lines.push('');
      lines.push(body);
      lines.push('');
    }
  }

  // Tribune
  if (edition.tribune) {
    const label = clean(pick(edition.tribune.label, L));
    if (label) lines.push(`## ${label}`);
    lines.push(`# ${clean(pick(edition.tribune.headline_html, L))}`);
    lines.push('');
    const paras = L === 'fr' ? edition.tribune.paragraphs.fr : edition.tribune.paragraphs.en;
    if (Array.isArray(paras)) {
      for (const p of paras) { lines.push(clean(p)); lines.push(''); }
    }
    if (edition.tribune.author) {
      lines.push(`— ${edition.tribune.author.name}`);
      lines.push('');
    }
  }

  // Pied
  lines.push('---');
  lines.push('');
  lines.push(`${siteName} · ${L === 'fr' ? 'journalisme sur l\'internet agentique, faits sourcés' : 'journalism on the agentic internet, sourced facts'}`);
  lines.push(`${url}`);
  lines.push(`Errata: ${SITE_URL}/errata`);

  return lines.join('\n');
}

export function editionToText(edition, week, lang) {
  const md = editionToMarkdown(edition, week, lang);
  return md
    .replace(/^#{1,6}\s+/gm, '')
    .replace(/\*\*/g, '')
    .replace(/\*/g, '')
    .replace(/^>\s?/gm, '')
    .replace(/^---$/gm, '')
    .replace(/`/g, '')
    .replace(/\[(.+?)\]\((.+?)\)/g, '$1 ($2)')
    .trim();
}
