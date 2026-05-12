#!/usr/bin/env node
// render.mjs — moteur de rendu pour L'Agent & Le Quotidien
// Usage : node render.mjs 2026-W19
// Produit : editions/2026-W19/fr.html et en.html

import { readFile, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

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
const editionRaw = await readFile(join(editionDir, 'edition.json'), 'utf8');
const edition = JSON.parse(editionRaw);

// ───── Labels statiques par langue ─────
const LABELS = {
  fr: {
    title: `L'Agent & Le Quotidien — édition n° ${edition._meta.edition_number}`,
    description: "Hebdomadaire de l'internet agentique : Moltbook, RentAHuman, OpenClaw, MoltMatch.",
    label_ticker: "Fil d'actualité",
    label_live: "EN DIRECT",
    label_edition: "Édition n°",
    label_reader_stamp: "Lecteur humain vérifié",
    label_kicker: "Chronique de l'internet agentique · depuis 2026",
    label_tagline: "« Le seul quotidien dont la moitié des lecteurs ne sont pas humains. »",
    label_volume_no: `Édition ${edition._meta.edition_number} · Vol. ${edition._meta.volume}`,
    label_sections: "Rubriques",
    label_nav_front: "À la une",
    label_nav_bestiary: "Le bestiaire",
    label_nav_incidents: "Faits divers",
    label_nav_market: "Le marché",
    label_nav_anthro: "Anthropologie",
    label_nav_security: "Sécurité",
    label_nav_oped: "Tribunes",
    label_nav_wire: "Le fil",
    label_breves: "Brèves",
    label_breves_title: "Brèves du jour",
    label_market: "Marché",
    label_market_footnote: "Données scrappées des plateformes publiques. Les compteurs Moltbook sont controversés (cf. enquête Permiso).",
    label_headlines: "Gros titres",
    label_headlines_sub: "— L'écosystème agent-natif cette semaine",
    label_timeline: "Chronologie de l'écosystème",
    label_wire: "Dépêches",
    label_wire_sub: "— Le fil mondial, 72 dernières heures",
    label_first_seen: "Première occurrence",
    label_spread: "Diffusion observée",
    label_decoding: "Tentative de décodage",
    label_to_watch: "À surveiller la semaine prochaine ·",
    label_colophon_1: "Composé pour les humains",
    label_colophon_2: "Lu aussi par leurs agents",
    label_edition_date: `Édition du ${edition._meta.date_fr.toLowerCase()} · Bouclage 06:00 CET`,
    label_rights: "Tous droits réservés",
    label_director: "Directrice de la publication",
    label_other_lang: "Read in English →"
  },
  en: {
    title: `L'Agent & Le Quotidien — issue ${edition._meta.edition_number}`,
    description: "The weekly of the agentic internet: Moltbook, RentAHuman, OpenClaw, MoltMatch.",
    label_ticker: "News feed",
    label_live: "LIVE",
    label_edition: "Issue",
    label_reader_stamp: "Verified human reader",
    label_kicker: "Chronicle of the agentic internet · since 2026",
    label_tagline: "\"The only weekly whose half-readers aren't human.\"",
    label_volume_no: `Issue ${edition._meta.edition_number} · Vol. ${edition._meta.volume}`,
    label_sections: "Sections",
    label_nav_front: "Front page",
    label_nav_bestiary: "Bestiary",
    label_nav_incidents: "Incidents",
    label_nav_market: "Market",
    label_nav_anthro: "Anthropology",
    label_nav_security: "Security",
    label_nav_oped: "Op-eds",
    label_nav_wire: "Wire",
    label_breves: "Briefs",
    label_breves_title: "Today's briefs",
    label_market: "Market",
    label_market_footnote: "Data scraped from public platforms. Moltbook counters remain disputed (cf. Permiso audit).",
    label_headlines: "Headlines",
    label_headlines_sub: "— The agent-native ecosystem this week",
    label_timeline: "Ecosystem timeline",
    label_wire: "The wire",
    label_wire_sub: "— Global feed, last 72 hours",
    label_first_seen: "First sighting",
    label_spread: "Observed spread",
    label_decoding: "Decoding attempt",
    label_to_watch: "Watch next week ·",
    label_colophon_1: "Composed for humans",
    label_colophon_2: "Also read by their agents",
    label_edition_date: `Issue of ${edition._meta.date_en} · Filed 06:00 CET`,
    label_rights: "All rights reserved",
    label_director: "Publication director",
    label_other_lang: "← Lire en français"
  }
};

// ───── Mini-moteur de templating ─────
// {{var}}        → texte échappé
// {{{var}}}      → texte brut (HTML)
// {{#each arr}}…{{/each}} → boucle
// {{#if cond}}…{{/if}}    → conditionnel

function escapeHtml(s) {
  if (s === null || s === undefined) return '';
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function getValue(obj, path) {
  if (path === 'this') return obj;
  const parts = path.split('.');
  let cur = obj;
  for (const p of parts) {
    if (cur === null || cur === undefined) return undefined;
    cur = cur[p];
  }
  return cur;
}

function render(template, ctx) {
  // {{#if cond}}…{{/if}}
  template = template.replace(
    /\{\{#if\s+([^}]+)\}\}([\s\S]*?)\{\{\/if\}\}/g,
    (m, cond, body) => {
      const v = getValue(ctx, cond.trim());
      return v ? render(body, ctx) : '';
    }
  );

  // {{#each arr}}…{{/each}}
  template = template.replace(
    /\{\{#each\s+([^}]+)\}\}([\s\S]*?)\{\{\/each\}\}/g,
    (m, name, body) => {
      const arr = getValue(ctx, name.trim());
      if (!Array.isArray(arr)) return '';
      return arr.map(item => {
        const itemCtx = (typeof item === 'object' && item !== null)
          ? { ...ctx, ...item, this: item }
          : { ...ctx, this: item };
        return render(body, itemCtx);
      }).join('');
    }
  );

  // {{{var}}} (raw)
  template = template.replace(/\{\{\{([^}]+)\}\}\}/g, (m, name) => {
    const v = getValue(ctx, name.trim());
    return v === null || v === undefined ? '' : String(v);
  });

  // {{var}} (escaped)
  template = template.replace(/\{\{([^}#/][^}]*)\}\}/g, (m, name) => {
    const v = getValue(ctx, name.trim());
    return escapeHtml(v);
  });

  return template;
}

// ───── Construction du contexte par langue ─────
function pick(field, lang) {
  if (field === null || field === undefined) return '';
  if (typeof field === 'string') return field;
  if (typeof field === 'object' && (field.fr !== undefined || field.en !== undefined)) {
    return field[lang] ?? field.fr ?? field.en ?? '';
  }
  return field;
}

function buildContext(lang) {
  const L = LABELS[lang];
  const other = lang === 'fr' ? 'en' : 'fr';

  const ctx = {
    lang,
    other_lang: other,
    CSS: css,
    ...L,

    date: lang === 'fr' ? edition._meta.date_fr : edition._meta.date_en,
    edition_number: edition._meta.edition_number,
    volume: edition._meta.volume,

    ticker_items: edition.ticker.map(t => ({
      type: t.type,
      text: lang === 'fr' ? t.text_fr : t.text_en
    })),

    // Lede
    lede_kicker: pick(edition.lede.kicker, lang),
    lede_headline_html: pick(edition.lede.headline_html, lang),
    lede_dek: pick(edition.lede.dek, lang),
    lede_byline: pick(edition.lede.byline, lang),
    lede_num_a: edition.lede.figure.num_a,
    lede_slash: edition.lede.figure.slash,
    lede_num_b: edition.lede.figure.num_b,
    lede_legend: lang === 'fr' ? edition.lede.figure.legend_fr : edition.lede.figure.legend_en,
    lede_body: pick(edition.lede.body, lang),

    breves: edition.breves.map(b => ({
      time: lang === 'fr' ? b.time_fr : b.time_en,
      title: pick(b.title, lang),
      body: pick(b.body, lang)
    })),

    // Market
    market_title: pick(edition.market.title, lang),
    market_rows: edition.market.rows.map(r => ({
      ticker: r.ticker,
      label: pick(r.label, lang),
      value: r.value,
      change: r.change,
      direction: r.direction
    })),
    market_boards: edition.market.boards.map(b => ({
      title: pick(b.title, lang),
      value: b.value,
      delta: lang === 'fr' ? b.delta_fr : b.delta_en,
      label: pick(b.label, lang)
    })),

    // Headlines
    headlines: edition.headlines.map(h => ({
      tag: pick(h.tag, lang),
      title_html: pick(h.title_html, lang),
      body: pick(h.body, lang),
      meta: lang === 'fr' ? h.meta_fr : h.meta_en
    })),

    // Le Carnet (people)
    has_carnet: !!edition.carnet,
    carnet_title: edition.carnet ? pick(edition.carnet.title, lang) : '',
    carnet_subtitle: edition.carnet ? pick(edition.carnet.subtitle, lang) : '',
    carnet_people: edition.carnet ? edition.carnet.people.map(p => ({
      kind: p.kind,
      kind_label: p.kind === 'agent' ? (lang === 'fr' ? 'AGENT' : 'AGENT')
                : p.kind === 'human' ? (lang === 'fr' ? 'OPÉRATEUR' : 'OPERATOR')
                : (lang === 'fr' ? 'NOTRE AGENT' : 'OUR AGENT'),
      display_name: p.handle || p.name,
      avatar_or_initials: p.avatar || p.initials,
      tagline: pick(p.tagline, lang),
      body: pick(p.body, lang)
    })) : [],

    // Bestiaire
    has_bestiaire: !!edition.bestiaire,
    bestiaire_intro: edition.bestiaire ? pick(edition.bestiaire.intro, lang) : '',
    creatures: edition.bestiaire ? edition.bestiaire.creatures.map(c => ({
      glyph: c.glyph,
      name: c.name,
      latin: c.latin,
      description: pick(c.description, lang),
      specs: c.specs.map(s => ({
        label: lang === 'fr' ? s.label : (s.label_en || s.label),
        value: s.value
      }))
    })) : [],

    // Bot posts
    has_bot_posts: !!edition.bot_posts,
    bot_posts_title: edition.bot_posts ? (lang === 'fr' ? edition.bot_posts.title_fr : edition.bot_posts.title_en) : '',
    bot_posts_meta: edition.bot_posts ? (lang === 'fr' ? edition.bot_posts.meta_fr : edition.bot_posts.meta_en) : '',
    bot_posts: edition.bot_posts ? edition.bot_posts.posts.map(p => ({
      handle: p.handle,
      avatar: p.avatar,
      color_var: p.color === 'accent' ? 'var(--accent)' : 'var(--bot)',
      verified_html: p.verified ? '<span class="verified">✓</span>' : '',
      meta: lang === 'fr' ? p.meta_fr : p.meta_en,
      body_html: pick(p.body_html, lang),
      actions_html: lang === 'fr' ? p.actions_fr : p.actions_en
    })) : [],

    // Interview
    has_interview: !!edition.interview,
    interview_label: edition.interview ? pick(edition.interview.title, lang) : '',
    interview_headline: edition.interview ? pick(edition.interview.headline, lang) : '',
    interview_dek: edition.interview ? pick(edition.interview.dek, lang) : '',
    interview_disclaimer: edition.interview ? pick(edition.interview.disclaimer, lang) : '',
    interview_exchanges: edition.interview ? edition.interview.exchanges.map(e => ({
      speaker: lang === 'fr' ? e.speaker_fr : e.speaker_en,
      role_class: e.speaker_role,
      text: pick(e.text, lang)
    })) : [],

    // Gibberlink Watch
    has_gibberlink: !!edition.gibberlink,
    gibberlink_label: edition.gibberlink ? pick(edition.gibberlink.title, lang) : '',
    gibberlink_title: edition.gibberlink ? (lang === 'fr' ? edition.gibberlink.term : edition.gibberlink.term_en) : '',
    gibberlink_subtitle: edition.gibberlink ? pick(edition.gibberlink.subtitle, lang) : '',
    gibberlink_term: edition.gibberlink ? (lang === 'fr' ? edition.gibberlink.term : edition.gibberlink.term_en) : '',
    gibberlink_first_seen: edition.gibberlink ? edition.gibberlink.first_seen : '',
    gibberlink_spread: edition.gibberlink ? (lang === 'fr' ? edition.gibberlink.spread_fr : edition.gibberlink.spread_en) : '',
    gibberlink_decoding: edition.gibberlink ? pick(edition.gibberlink.decoding, lang) : '',
    gibberlink_to_watch: edition.gibberlink ? (lang === 'fr' ? edition.gibberlink.to_watch_fr : edition.gibberlink.to_watch_en) : '',

    // Feature / Enquête
    has_feature: !!edition.feature,
    feature_kicker: edition.feature ? (lang === 'fr' ? edition.feature.kicker_fr : edition.feature.kicker_en) : '',
    feature_headline: edition.feature ? pick(edition.feature.headline_html, lang) : '',
    feature_dek: edition.feature ? pick(edition.feature.dek, lang) : '',
    feature_paragraphs: edition.feature ? (lang === 'fr' ? edition.feature.paragraphs.fr : edition.feature.paragraphs.en) : [],
    feature_pull_quote: edition.feature ? pick(edition.feature.pull_quote, lang) : '',
    feature_pull_cite: edition.feature ? pick(edition.feature.pull_quote_cite, lang) : '',
    feature_byline: edition.feature ? pick(edition.feature.byline, lang) : '',
    feature_timeline: edition.feature ? edition.feature.timeline.map(t => ({
      date: t.date,
      text: pick(t.text, lang)
    })) : [],

    // Wire
    wire_items: edition.wire.map(w => ({
      source: w.source,
      ts: lang === 'fr' ? w.ts_fr : w.ts_en,
      title: pick(w.title, lang),
      body: pick(w.body, lang)
    })),

    // Tribune
    tribune_label: pick(edition.tribune.label, lang),
    tribune_headline: pick(edition.tribune.headline_html, lang),
    tribune_paragraphs: lang === 'fr' ? edition.tribune.paragraphs.fr : edition.tribune.paragraphs.en,
    tribune_initials: edition.tribune.author.initials,
    tribune_name: edition.tribune.author.name,
    tribune_role: lang === 'fr' ? edition.tribune.author.role_fr : edition.tribune.author.role_en
  };

  return ctx;
}

// ───── Rendu et écriture ─────
for (const lang of ['fr', 'en']) {
  const ctx = buildContext(lang);
  const html = render(templateHtml, ctx);
  const outPath = join(editionDir, `${lang}.html`);
  await writeFile(outPath, html, 'utf8');
  console.log(`✓ Rendu : ${outPath}`);
}

// Mettre à jour l'index racine (servi par Cloudflare Pages) + public/index.html
const rootIndexHtml = `<!doctype html>
<html lang="fr">
<head>
<meta charset="utf-8">
<title>L'Agent & Le Quotidien</title>
<meta http-equiv="refresh" content="0; url=/editions/${week}/fr.html">
<link rel="canonical" href="/editions/${week}/fr.html">
</head>
<body>
<p>Édition <a href="/editions/${week}/fr.html">${week}</a> · <a href="/editions/${week}/en.html">English</a></p>
</body>
</html>
`;
await writeFile(join(__dirname, 'index.html'), rootIndexHtml, 'utf8');
await writeFile(join(__dirname, 'public', 'index.html'), rootIndexHtml, 'utf8');
console.log(`✓ Index mis à jour vers ${week}`);
console.log(`\n→ Ouvre ${join(editionDir, 'fr.html')} dans ton navigateur.`);
