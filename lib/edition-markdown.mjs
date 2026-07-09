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

export function editionToMarkdown(edition, week, lang, { prevWeek, prevKicker, prevHeadline } = {}) {
  const L = lang;
  const meta = edition._meta;
  const siteName = L === 'fr' ? "L'Agent & Le Quotidien" : 'The Agent & The Weekly';
  const url = `${SITE_URL}/editions/${week}/${L}.md`;
  const lines = [];

  // En-tête
  lines.push(`# ${siteName} — ${meta.date_fr && L === 'fr' ? meta.date_fr : meta.date_en}`);
  lines.push('');
  lines.push(`> ${L === 'fr' ? 'Édition' : 'Issue'} n° ${meta.edition_number} · Vol. ${meta.volume} · ${week}`);
  lines.push(`> ${url}`);
  lines.push('');

  // Sections DEPRECATED : ticker, breves, market, bestiaire, retrospective.
  // Le wire absorbe le rôle des brèves (dépêches sourcées).

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

  // Brèves : DEPRECATED (fusionné dans wire).

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

  // Rétrospective : DEPRECATED. Retirée.

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

  // Navigation
  if (prevWeek) {
    lines.push('---');
    lines.push('');
    lines.push(`## ${L === 'fr' ? 'Édition précédente' : 'Previous issue'}`);
    lines.push('');
    const pk = clean(prevKicker || '');
    const ph = clean(prevHeadline || '');
    if (pk) lines.push(`*${pk}*`);
    lines.push(`[${prevWeek} — ${ph}](${SITE_URL}/editions/${prevWeek}/${L}.md)`);
    lines.push('');
  }

  // Pied
  lines.push('---');
  lines.push('');
  lines.push(`${siteName} · ${L === 'fr' ? 'journalisme sur l\'internet agentique, faits sourcés' : 'journalism on the agentic internet, sourced facts'}`);
  lines.push(`${url}`);
  lines.push(`Errata: ${SITE_URL}/errata`);

  return lines.join('\n');
}

// Retire le bloc navigation du MD avant conversion HTML (le shell a son propre aside).
export function stripEditionNav(md) {
  return md.replace(
    /\n---\n\n## (?:Édition précédente|Previous issue)\n[\s\S]*?(?=\n---\n\n(?:L'Agent|The Agent))/,
    '',
  );
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

// edition.min.md : version dense pour LLM à context window court.
// Lede + headlines + feature + tribune uniquement. Pas de ticker, brèves, carnet, wire.
export function editionToMinMarkdown(edition, week, lang) {
  const L = lang;
  const meta = edition._meta;
  const siteName = L === 'fr' ? "L'Agent & Le Quotidien" : 'The Agent & The Weekly';
  const url = `${SITE_URL}/editions/${week}/${L}.md`;
  const lines = [];

  lines.push(`# ${siteName} — ${L === 'fr' ? meta.date_fr : meta.date_en} · ${week}`);
  lines.push(`> ${url}`);
  lines.push('');

  // Lede
  if (edition.lede) {
    lines.push(`## ${clean(pick(edition.lede.kicker, L))}`);
    lines.push(`# ${clean(pick(edition.lede.headline_html, L))}`);
    lines.push('');
    const dek = clean(pick(edition.lede.dek, L));
    if (dek) { lines.push(`*${dek}*`); lines.push(''); }
    const body = clean(pick(edition.lede.body, L));
    if (body) { lines.push(body); lines.push(''); }
  }

  // Headlines
  if (Array.isArray(edition.headlines)) {
    for (const h of edition.headlines) {
      const title = clean(pick(h.title_html, L));
      const body = clean(pick(h.body, L));
      lines.push(`## ${title}`);
      lines.push(body);
      lines.push('');
    }
  }

  // Feature
  const feature = edition.feature ?? edition.enquete;
  if (feature && feature.paragraphs) {
    lines.push(`## ${clean(pick(feature.headline_html, L))}`);
    const dek = clean(pick(feature.dek, L));
    if (dek) { lines.push(`*${dek}*`); lines.push(''); }
    const paras = L === 'fr' ? feature.paragraphs.fr : feature.paragraphs.en;
    if (Array.isArray(paras)) {
      for (const p of paras) { lines.push(clean(p)); }
      lines.push('');
    }
  }

  // Tribune
  if (edition.tribune) {
    lines.push(`## ${clean(pick(edition.tribune.headline_html, L))}`);
    const paras = L === 'fr' ? edition.tribune.paragraphs.fr : edition.tribune.paragraphs.en;
    if (Array.isArray(paras)) {
      for (const p of paras) { lines.push(clean(p)); }
      lines.push('');
    }
  }

  return lines.join('\n');
}

// edition.jsonl : JSON Lines, une rubrique par ligne.
// Utile pour les pipelines qui veulent chunker par rubrique.
// Chaque ligne = { rubric, week, lang, headline, body, ... }
export function editionToJsonl(edition, week) {
  const records = [];
  const meta = edition._meta;

  // Lede
  if (edition.lede) {
    for (const lang of ['fr', 'en']) {
      records.push({
        rubric: 'lede',
        week,
        lang,
        edition_number: meta.edition_number,
        date: lang === 'fr' ? meta.date_fr : meta.date_en,
        kicker: clean(pick(edition.lede.kicker, lang)),
        headline: clean(pick(edition.lede.headline_html, lang)),
        dek: clean(pick(edition.lede.dek, lang)),
        body: clean(pick(edition.lede.body, lang)),
      });
    }
  }

  // Headlines
  if (Array.isArray(edition.headlines)) {
    edition.headlines.forEach((h, i) => {
      for (const lang of ['fr', 'en']) {
        records.push({
          rubric: 'headline',
          week,
          lang,
          index: i,
          tag: clean(pick(h.tag, lang)),
          headline: clean(pick(h.title_html, lang)),
          body: clean(pick(h.body, lang)),
          meta: lang === 'fr' ? (h.meta_fr || '') : (h.meta_en || ''),
        });
      }
    });
  }

  // Brèves : DEPRECATED (fusionné dans wire). Retiré du JSONL.

  // Carnet
  if (edition.carnet && Array.isArray(edition.carnet.people)) {
    edition.carnet.people.forEach((p, i) => {
      for (const lang of ['fr', 'en']) {
        records.push({
          rubric: 'carnet',
          week,
          lang,
          index: i,
          name: p.display_name || p.name || '',
          kind: p.kind || '',
          tagline: clean(pick(p.tagline, lang)),
          body: clean(pick(p.body, lang)),
        });
      }
    });
  }

  // Feature
  const feature = edition.feature ?? edition.enquete;
  if (feature && feature.paragraphs) {
    for (const lang of ['fr', 'en']) {
      const paras = lang === 'fr' ? feature.paragraphs.fr : feature.paragraphs.en;
      if (Array.isArray(paras)) {
        paras.forEach((p, i) => {
          records.push({
            rubric: 'feature',
            week,
            lang,
            index: i,
            headline: i === 0 ? clean(pick(feature.headline_html, lang)) : '',
            dek: i === 0 ? clean(pick(feature.dek, lang)) : '',
            paragraph: clean(p),
          });
        });
      }
    }
  }

  // Tribune
  if (edition.tribune) {
    for (const lang of ['fr', 'en']) {
      const paras = lang === 'fr' ? edition.tribune.paragraphs.fr : edition.tribune.paragraphs.en;
      if (Array.isArray(paras)) {
        paras.forEach((p, i) => {
          records.push({
            rubric: 'tribune',
            week,
            lang,
            index: i,
            headline: i === 0 ? clean(pick(edition.tribune.headline_html, lang)) : '',
            paragraph: clean(p),
          });
        });
      }
    }
  }

  // Wire
  if (Array.isArray(edition.wire)) {
    edition.wire.forEach((w, i) => {
      for (const lang of ['fr', 'en']) {
        records.push({
          rubric: 'wire',
          week,
          lang,
          index: i,
          source: w.source || '',
          ts: lang === 'fr' ? (w.ts_fr || w.time_fr || '') : (w.ts_en || w.time_en || ''),
          headline: clean(pick(w.title, lang)),
          body: clean(pick(w.body, lang)),
        });
      }
    });
  }

  return records.map((r) => JSON.stringify(r)).join('\n');
}
