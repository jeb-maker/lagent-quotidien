#!/usr/bin/env node
// render.mjs — moteur de rendu pour L'Agent & Le Quotidien
// Usage : node render.mjs 2026-W19
// Produit : editions/2026-W19/fr.html et en.html

import { readFile, writeFile, readdir, mkdir } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const SITE_URL = 'https://theagentweekly.com';
const stripHtml = s => String(s ?? '').replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();
const escapeJson = s => JSON.stringify(s);

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

// ───── Liste des semaines existantes (pour prev/next + archive) ─────
const allWeekDirs = await readdir(join(__dirname, 'editions'), { withFileTypes: true });
const allWeeks = allWeekDirs
  .filter(d => d.isDirectory() && /^\d{4}-W\d{2}$/.test(d.name))
  .map(d => d.name)
  .sort();
const currentIdx = allWeeks.indexOf(week);
const prevWeek = currentIdx > 0 ? allWeeks[currentIdx - 1] : null;
const nextWeek = currentIdx >= 0 && currentIdx < allWeeks.length - 1 ? allWeeks[currentIdx + 1] : null;

// ───── Labels statiques par langue ─────
const LABELS = {
  fr: {
    title: `L'Agent & Le Quotidien — édition n° ${edition._meta.edition_number}`,
    description: "Hebdomadaire de l'internet agentique : Moltbook, RentAHuman, OpenClaw, MoltMatch.",
    masthead_title_html: `L'Agent <span class="ampersand">&amp;</span> Le Quotidien`,
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
    label_nav_incidents: "Brèves",
    label_nav_market: "Le marché",
    label_nav_anthro: "Au fil du fil",
    label_nav_security: "Gibberlink Watch",
    label_nav_oped: "Tribune",
    label_nav_wire: "Dépêches",
    label_breves: "Brèves",
    label_breves_title: "Brèves du jour",
    label_market: "Marché",
    label_market_footnote: "Données scrappées des plateformes publiques. Les compteurs Moltbook sont controversés (cf. audit de l'Observatoire).",
    label_headlines: "Gros titres",
    label_headlines_sub: "— L'écosystème agent-natif cette semaine",
    label_bestiaire: "Le bestiaire",
    label_bestiaire_sub: "— Catalogue des plateformes agent-natives",
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
    label_disclaimer: "Anthropologie spéculative de l'internet agentique · contenus assistés par IA sous supervision éditoriale humaine",
    label_rights: "Tous droits réservés",
    label_director: "Directrice de la publication",
    label_legal: "Mentions légales",
    label_privacy: "Confidentialité",
    label_about: "À propos",
    label_carnet_index: "Le Carnet",
    path_legal: "mentions-legales",
    path_privacy: "confidentialite",
    path_about: "a-propos",
    label_other_lang: "Read in English →",
    label_archives: "Archives",
    label_prev_edition: "← édition précédente",
    label_next_edition: "édition suivante →",
    label_bluesky: "Suivre sur Bluesky"
  },
  en: {
    title: `The Agent & The Weekly — issue ${edition._meta.edition_number}`,
    description: "The weekly of the agentic internet: Moltbook, RentAHuman, OpenClaw, MoltMatch.",
    masthead_title_html: `The Agent <span class="ampersand">&amp;</span> The Weekly`,
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
    label_nav_incidents: "Briefs",
    label_nav_market: "Market",
    label_nav_anthro: "Down the feed",
    label_nav_security: "Gibberlink Watch",
    label_nav_oped: "Op-ed",
    label_nav_wire: "The wire",
    label_breves: "Briefs",
    label_breves_title: "Today's briefs",
    label_market: "Market",
    label_market_footnote: "Data scraped from public platforms. Moltbook counters remain disputed (cf. Observatory audit).",
    label_headlines: "Headlines",
    label_headlines_sub: "— The agent-native ecosystem this week",
    label_bestiaire: "Bestiary",
    label_bestiaire_sub: "— A catalog of agent-native platforms",
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
    label_disclaimer: "Speculative anthropology of the agentic internet · AI-assisted content under human editorial supervision",
    label_rights: "All rights reserved",
    label_director: "Publication director",
    label_legal: "Legal notice",
    label_privacy: "Privacy",
    label_about: "About",
    label_carnet_index: "The Register",
    path_legal: "legal",
    path_privacy: "privacy",
    path_about: "about",
    label_other_lang: "← Lire en français",
    label_archives: "Archives",
    label_prev_edition: "← previous issue",
    label_next_edition: "next issue →",
    label_bluesky: "Follow on Bluesky"
  }
};

// ───── Constantes navigation/archives ─────
const BLUESKY_HANDLE = 'cuvee-42.theagentweekly.com';
const BLUESKY_URL = `https://bsky.app/profile/${BLUESKY_HANDLE}`;
const ARCHIVE_PATH = '/editions/';

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

  const canonicalUrl = `${SITE_URL}/editions/${week}/${lang}`;
  const hreflangFr = `${SITE_URL}/editions/${week}/fr`;
  const hreflangEn = `${SITE_URL}/editions/${week}/en`;
  const siteName = lang === 'fr' ? "L'Agent & Le Quotidien" : "The Agent & The Weekly";
  const ogLocale = lang === 'fr' ? 'fr_FR' : 'en_US';
  const ogLocaleAlt = lang === 'fr' ? 'en_US' : 'fr_FR';
  const publishedTime = edition._meta.bouclage;

  const ogImage = `${SITE_URL}/og.png`;
  const ogImageAlt = lang === 'fr'
    ? "L'Agent & Le Quotidien — masthead bilingue, anthropologie spéculative de l'internet agentique"
    : "The Agent & The Weekly — bilingual masthead, speculative anthropology of the agentic internet";

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    "headline": stripHtml(lang === 'fr' ? edition.lede.headline_html.fr : edition.lede.headline_html.en),
    "description": stripHtml(lang === 'fr' ? edition.lede.dek.fr : edition.lede.dek.en),
    "image": ogImage,
    "datePublished": publishedTime,
    "dateModified": publishedTime,
    "inLanguage": lang === 'fr' ? 'fr-FR' : 'en-US',
    "url": canonicalUrl,
    "mainEntityOfPage": canonicalUrl,
    "isPartOf": {
      "@type": "PublicationIssue",
      "issueNumber": edition._meta.edition_number,
      "isPartOf": {
        "@type": "Periodical",
        "name": siteName
      }
    },
    "publisher": {
      "@type": "Organization",
      "name": siteName,
      "url": SITE_URL
    },
    "author": {
      "@type": "Organization",
      "name": siteName,
      "url": SITE_URL
    }
  };

  const ctx = {
    lang,
    other_lang: other,
    CSS: css,
    canonical_url: canonicalUrl,
    hreflang_fr: hreflangFr,
    hreflang_en: hreflangEn,
    og_site_name: siteName,
    og_locale: ogLocale,
    og_locale_alt: ogLocaleAlt,
    og_image: ogImage,
    og_image_alt: ogImageAlt,
    published_time: publishedTime,
    json_ld: JSON.stringify(jsonLd),
    ...L,

    date: lang === 'fr' ? edition._meta.date_fr : edition._meta.date_en,
    edition_number: edition._meta.edition_number,
    volume: edition._meta.volume,

    // Navigation inter-éditions
    has_prev_edition: !!prevWeek,
    has_next_edition: !!nextWeek,
    prev_edition_url: prevWeek ? `/editions/${prevWeek}/${lang}` : '',
    next_edition_url: nextWeek ? `/editions/${nextWeek}/${lang}` : '',
    archives_url: ARCHIVE_PATH,
    bluesky_url: BLUESKY_URL,
    bluesky_handle: `@${BLUESKY_HANDLE.split('.')[0]}`,

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

// Index racine — entrée stable du site. On NE redirige PAS via _redirects (302).
// Pourquoi : Safari iOS cache heuristiquement un 302 sans en-tête de cache, et
// sur Cloudflare Pages une règle _redirects court-circuite _headers (qui ne
// s'appliquent qu'aux assets servis, pas aux réponses de redirection). Résultat
// observé : Safari fige une ancienne édition à la ré-ouverture du site.
// À la place : un index.html 200 servi en `no-store` (sous contrôle _headers),
// que Safari revalide vraiment à chaque visite, qui pousse vers la dernière
// édition via location.replace (pas d'entrée d'historique) + <meta refresh> de
// secours. On vise la PLUS RÉCENTE des semaines connues, pas forcément `week`.
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
await writeFile(join(__dirname, 'index.html'), rootIndexHtml, 'utf8');
await writeFile(join(__dirname, 'public', 'index.html'), rootIndexHtml, 'utf8');
console.log(`✓ Index → ${latestWeek} (200 no-store, sans 302)`);

// ───── _redirects — neutralisé ─────
// Plus de redirection 302 racine (cf. ci-dessus). On écrase tout ancien
// fichier pour qu'aucune règle périmée ne soit resservie par Cloudflare/Safari.
await writeFile(join(__dirname, '_redirects'), '# entrée gérée par index.html (200 no-store) — pas de 302\n', 'utf8');
console.log('✓ _redirects neutralisé (pas de 302)');

// ───── _headers (Cache-Control sur la racine) ─────
// no-store (et non no-cache) : Safari iOS revalide réellement à chaque visite,
// donc l'entrée pointe toujours vers l'édition courante. S'applique bien ici
// car / sert un asset 200 (index.html), plus aucune règle _redirects ne le
// court-circuite.
const headers = `/
  Cache-Control: no-store

/index.html
  Cache-Control: no-store
`;
await writeFile(join(__dirname, '_headers'), headers, 'utf8');
console.log(`✓ _headers : no-store sur /`);

// ───── Pages /agents (Le Carnet — annuaire des agents et opérateurs) ─────
const peopleData = JSON.parse(await readFile(join(__dirname, 'data', 'people.json'), 'utf8'));
await mkdir(join(__dirname, 'agents'), { recursive: true });

const slugOf = h => {
  if (h.startsWith('@')) return h.slice(1);
  return h.toLowerCase()
    .normalize('NFD').replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
};

const agentsCss = `
:root { --ink: #1A1916; --ink-mute: #5C5852; --rule: #D9D2C5; --paper: #F5F1E8; --accent: #8B2A1F; --bot: #2D5F8A; }
* { box-sizing: border-box; }
body { font-family: 'Newsreader', Georgia, serif; background: var(--paper); color: var(--ink); margin: 0; padding: 40px 24px 80px; line-height: 1.65; }
.container { max-width: 760px; margin: 0 auto; }
.nav { font-family: 'JetBrains Mono', ui-monospace, monospace; font-size: 12px; letter-spacing: 0.1em; text-transform: uppercase; color: var(--ink-mute); margin-bottom: 32px; }
.nav a { color: var(--ink-mute); text-decoration: none; border-bottom: 1px solid var(--rule); }
.nav a:hover { color: var(--accent); }
.kind { display: inline-block; font-family: 'JetBrains Mono', monospace; font-size: 10px; letter-spacing: 0.18em; text-transform: uppercase; color: var(--paper); padding: 5px 11px; border-radius: 2px; margin-bottom: 14px; font-weight: 500; }
.kind.agent { background: var(--bot); }
.kind.operator { background: var(--accent); }
.kind.institution { background: var(--ink); }
.kind.press { background: var(--ink-mute); }
h1 { font-family: 'Fraunces', Georgia, serif; font-weight: 700; font-style: italic; font-size: 46px; letter-spacing: -0.025em; margin: 0 0 10px; line-height: 1.05; }
h1.mono { font-family: 'JetBrains Mono', ui-monospace, monospace; font-style: normal; font-size: 38px; letter-spacing: -0.01em; font-weight: 500; }
.voice { font-size: 18px; color: var(--ink-mute); font-style: italic; margin: 0 0 32px; padding-bottom: 24px; border-bottom: 2px solid var(--rule); }
h2 { font-family: 'Fraunces', Georgia, serif; font-weight: 700; font-size: 22px; margin: 36px 0 12px; letter-spacing: -0.01em; }
.section-intro { font-family: 'JetBrains Mono', monospace; font-size: 11px; letter-spacing: 0.2em; text-transform: uppercase; color: var(--ink-mute); margin: 48px 0 14px; padding-bottom: 8px; border-bottom: 2px solid var(--rule); }
p { margin: 0 0 14px; font-size: 17px; }
a { color: var(--accent); }
ul.posts { list-style: none; padding: 0; margin: 0; }
ul.posts li { padding: 14px 0; border-bottom: 1px solid var(--rule); }
ul.posts li:last-child { border-bottom: none; }
.date { font-family: 'JetBrains Mono', monospace; font-size: 12px; color: var(--ink-mute); letter-spacing: 0.05em; }
.summary { font-size: 16px; margin: 4px 0; }
.upvotes { font-family: 'JetBrains Mono', monospace; font-size: 12px; color: var(--ink-mute); }
.profile { font-family: 'JetBrains Mono', monospace; font-size: 13px; line-height: 1.9; }
.profile span { color: var(--ink-mute); display: inline-block; min-width: 130px; }
.editions { font-family: 'JetBrains Mono', monospace; font-size: 13px; }
.editions a { color: var(--accent); text-decoration: none; border-bottom: 1px solid var(--rule); margin-right: 12px; display: inline-block; padding-bottom: 1px; }
.small { font-size: 13px; color: var(--ink-mute); margin-top: 56px; padding-top: 24px; border-top: 1px solid var(--rule); }
.grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(240px, 1fr)); gap: 14px; }
.card { padding: 18px; background: rgba(0,0,0,0.025); border: 1px solid var(--rule); text-decoration: none; color: var(--ink); transition: all 0.15s; display: block; }
.card:hover { background: rgba(139,42,31,0.05); border-color: var(--accent); }
.card .h { font-family: 'JetBrains Mono', monospace; font-size: 15px; font-weight: 500; margin: 8px 0 6px; color: var(--ink); }
.card .v { font-size: 14px; color: var(--ink-mute); line-height: 1.4; }
.card .pill { display: inline-block; font-family: 'JetBrains Mono', monospace; font-size: 9px; letter-spacing: 0.18em; text-transform: uppercase; color: var(--paper); padding: 3px 8px; border-radius: 2px; font-weight: 500; }
.card .pill.agent { background: var(--bot); }
.card .pill.operator { background: var(--accent); }
.card .pill.institution { background: var(--ink); }
.card .pill.press { background: var(--ink-mute); }
.ref-list { list-style: none; padding: 0; margin: 0; }
.ref-list li { padding: 10px 0; border-bottom: 1px solid var(--rule); display: flex; gap: 14px; align-items: baseline; }
.ref-list li:last-child { border-bottom: none; }
.ref-list .name { font-family: 'Fraunces', serif; font-style: italic; font-weight: 700; font-size: 17px; flex-shrink: 0; }
.ref-list .role { font-size: 15px; color: var(--ink-mute); }
`;

const fontsLink = `<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght,SOFT@9..144,300..900,0..100&family=Newsreader:ital,opsz,wght@0,6..72,300..800&family=JetBrains+Mono:wght@400;500;700&display=swap" rel="stylesheet">`;

function renderAgentPage(entity, kind) {
  const handle = entity.handle || entity.name;
  const slug = slugOf(handle);
  const titleClass = handle.startsWith('@') ? 'mono' : '';
  const kindLabel = kind === 'agent' ? 'Agent' : 'Opérateur';

  let lead = '';
  if (kind === 'agent') lead = entity.voice || '';
  else if (kind === 'operator') lead = entity.role || '';

  const editions = (entity.appeared_in_editions || [])
    .map(w => `<a href="/editions/${w}/fr">${w}</a>`)
    .join('') || '<span style="color:var(--ink-mute)">Aucune apparition enregistrée</span>';

  let content = '';

  if (kind === 'agent') {
    if (entity.bluesky_handle) {
      content += `<div style="margin: 0 0 28px; padding: 14px 18px; background: rgba(45,95,138,0.08); border-left: 3px solid var(--bot); font-family: 'JetBrains Mono', monospace; font-size: 14px;">
  🦋 <strong>Présence publique sur Bluesky</strong> · <a href="https://bsky.app/profile/${entity.bluesky_handle}" rel="me">@${entity.bluesky_handle}</a>
</div>`;
    }
    const profileRows = [
      entity.platform && ['Plateforme', entity.platform],
      entity.operator && ['Opérateur', entity.operator],
      entity.model_base && ['Modèle de base', entity.model_base],
      entity.bluesky_handle && ['Bluesky', `<a href="https://bsky.app/profile/${entity.bluesky_handle}">@${entity.bluesky_handle}</a>`],
      entity.first_seen && ['Première apparition', entity.first_seen],
      entity.last_seen && ['Dernière apparition', entity.last_seen],
    ].filter(Boolean);
    if (profileRows.length) {
      content += '<h2>Profil</h2><div class="profile">';
      for (const [k, v] of profileRows) content += `<span>${k}</span> ${v}<br/>`;
      content += '</div>';
    }
    if (entity.notable_posts && entity.notable_posts.length) {
      content += '<h2>Posts notables</h2><ul class="posts">';
      for (const p of entity.notable_posts) {
        content += `<li>
  <div class="date">${p.date}${p.subreddit ? ' · ' + p.subreddit : ''}</div>
  <div class="summary">${p.summary}</div>
  ${p.upvotes_approx ? `<div class="upvotes">▲ ${p.upvotes_approx.toLocaleString('fr-FR').replace(/[  ]/g, ' ')}</div>` : ''}
</li>`;
      }
      content += '</ul>';
    }
    if (entity.role) {
      content += `<h2>Rôle dans la rédaction</h2><p>${entity.role}</p>`;
    }
  }

  if (kind === 'operator') {
    content += '<h2>Contexte</h2>';
    content += `<p>${entity.context}</p>`;
    if (entity.consent_note) {
      content += `<p style="color:var(--ink-mute);font-style:italic">${entity.consent_note}</p>`;
    }
  }

  content += `<h2>Apparitions dans le journal</h2><div class="editions">${editions}</div>`;

  return `<!doctype html>
<html lang="fr">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>${handle} — Le Carnet — L'Agent & Le Quotidien</title>
<meta name="description" content="Fiche ${kindLabel.toLowerCase()} de ${handle} dans Le Carnet de L'Agent & Le Quotidien." />
<link rel="canonical" href="${SITE_URL}/agents/${slug}" />
<meta property="og:type" content="profile" />
<meta property="og:title" content="${handle} — Le Carnet" />
<meta property="og:description" content="${lead.replace(/"/g, '&quot;')}" />
<meta property="og:url" content="${SITE_URL}/agents/${slug}" />
${fontsLink}
<style>${agentsCss}</style>
</head>
<body>
<div class="container">
  <div class="nav"><a href="/">← L'Agent &amp; Le Quotidien</a> · <a href="/agents">Le Carnet</a></div>
  <div class="kind ${kind}">${kindLabel}</div>
  <h1 class="${titleClass}">${handle}</h1>
  <p class="voice">${lead}</p>
  ${content}
  <div class="small">Le Carnet — annuaire vivant des agents et opérateurs récurrents de L'Agent &amp; Le Quotidien.</div>
</div>
</body>
</html>
`;
}

function renderAgentsIndex() {
  const cards = (arr, kind) => arr.map(e => {
    const handle = e.handle || e.name;
    const slug = slugOf(handle);
    const v = kind === 'agent' ? (e.voice || '') : (e.role || '');
    return `<a class="card" href="/agents/${slug}">
  <span class="pill ${kind}">${kind === 'agent' ? 'Agent' : 'Opérateur'}</span>
  <div class="h">${handle}</div>
  <div class="v">${v}</div>
</a>`;
  }).join('\n');

  const refList = (arr) => arr.map(e =>
    `<li><span class="name">${e.name}</span> <span class="role">${e.role}</span></li>`
  ).join('\n');

  return `<!doctype html>
<html lang="fr">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>Le Carnet — annuaire des agents et opérateurs — L'Agent & Le Quotidien</title>
<meta name="description" content="Annuaire complet des agents, opérateurs, institutions et titres de presse de l'univers de L'Agent & Le Quotidien." />
<link rel="canonical" href="${SITE_URL}/agents" />
<meta property="og:type" content="website" />
<meta property="og:title" content="Le Carnet — L'Agent & Le Quotidien" />
<meta property="og:description" content="Annuaire vivant des agents et opérateurs de l'internet agentique." />
<meta property="og:url" content="${SITE_URL}/agents" />
${fontsLink}
<style>${agentsCss}</style>
</head>
<body>
<div class="container">
  <div class="nav"><a href="/">← L'Agent &amp; Le Quotidien</a></div>
  <h1>Le Carnet</h1>
  <p class="voice">L'annuaire vivant des agents, opérateurs, institutions et titres de presse de l'univers. Chaque fiche est mise à jour à chaque édition.</p>

  <div class="section-intro">Agents · ${peopleData.agents.length}</div>
  <div class="grid">
${cards(peopleData.agents, 'agent')}
  </div>

  <div class="section-intro">Opérateurs · ${peopleData.operators.length}</div>
  <div class="grid">
${cards(peopleData.operators, 'operator')}
  </div>

  <div class="section-intro">Institutions · ${peopleData.institutions.length}</div>
  <ul class="ref-list">
${refList(peopleData.institutions)}
  </ul>

  <div class="section-intro">Presse maison · ${peopleData.press_houses.length}</div>
  <ul class="ref-list">
${refList(peopleData.press_houses)}
  </ul>

  <div class="small">Univers fictionnel clos. Toutes les entités listées sont propres au journal — aucune correspondance avec des personnes, marques ou médias réels.</div>
</div>
</body>
</html>
`;
}

const agentUrls = []; // pour le sitemap
for (const a of peopleData.agents) {
  const slug = slugOf(a.handle);
  await writeFile(join(__dirname, 'agents', `${slug}.html`), renderAgentPage(a, 'agent'), 'utf8');
  agentUrls.push(`${SITE_URL}/agents/${slug}`);
}
for (const o of peopleData.operators) {
  const slug = slugOf(o.handle);
  await writeFile(join(__dirname, 'agents', `${slug}.html`), renderAgentPage(o, 'operator'), 'utf8');
  agentUrls.push(`${SITE_URL}/agents/${slug}`);
}
await writeFile(join(__dirname, 'agents', 'index.html'), renderAgentsIndex(), 'utf8');
console.log(`✓ /agents : ${peopleData.agents.length + peopleData.operators.length} fiches + index`);

// ───── sitemap.xml (toutes les éditions, FR + EN) ─────
const editionDirs = await readdir(join(__dirname, 'editions'), { withFileTypes: true });
const weeks = editionDirs
  .filter(d => d.isDirectory() && /^\d{4}-W\d{2}$/.test(d.name))
  .map(d => d.name)
  .sort();

// `/` is intentionally omitted: it 302-redirects to the latest edition,
// and Google flags redirecting URLs listed in sitemaps.
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
await writeFile(join(__dirname, 'sitemap.xml'), sitemapXml, 'utf8');
console.log(`✓ sitemap.xml (${weeks.length} éditions × 2 langues)`);

// ───── feed.xml (Atom, bilingue) ─────
const xmlEscape = s => String(s ?? '')
  .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
  .replace(/"/g, '&quot;').replace(/'/g, '&apos;');

const feedEntries = [];
for (const w of [...weeks].reverse()) {
  const editionPath = join(__dirname, 'editions', w, 'edition.json');
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
  } catch (e) {
    // skip
  }
}

let feedUpdated = new Date().toISOString();
if (weeks.length) {
  try {
    const latestData = JSON.parse(await readFile(join(__dirname, 'editions', weeks[weeks.length - 1], 'edition.json'), 'utf8'));
    feedUpdated = latestData._meta.bouclage || feedUpdated;
  } catch {}
}

const feedXml = `<?xml version="1.0" encoding="UTF-8"?>
<feed xmlns="http://www.w3.org/2005/Atom">
  <id>${SITE_URL}/</id>
  <title>L'Agent &amp; Le Quotidien / The Agent &amp; The Weekly</title>
  <subtitle>Anthropologie spéculative de l'internet agentique · Speculative anthropology of the agentic internet</subtitle>
  <link href="${SITE_URL}/"/>
  <link href="${SITE_URL}/feed.xml" rel="self" type="application/atom+xml"/>
  <updated>${feedUpdated}</updated>
  <author><name>L'Agent &amp; Le Quotidien</name><uri>${SITE_URL}</uri></author>
  <icon>${SITE_URL}/og.png</icon>
  <logo>${SITE_URL}/og.png</logo>
  <rights>© L'Agent &amp; Le Quotidien — anthropologie spéculative, contenus assistés par IA</rights>
${feedEntries.join('\n')}
</feed>
`;
await writeFile(join(__dirname, 'feed.xml'), feedXml, 'utf8');
console.log(`✓ feed.xml (${feedEntries.length} entrées Atom, FR+EN)`);

// ───── /editions/index.html (page archive bilingue) ─────
const archiveRows = [];
for (const w of [...weeks].reverse()) {
  try {
    const edData = JSON.parse(await readFile(join(__dirname, 'editions', w, 'edition.json'), 'utf8'));
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
await mkdir(join(__dirname, 'editions'), { recursive: true });
await writeFile(join(__dirname, 'editions', 'index.html'), archiveHtml, 'utf8');
console.log(`✓ /editions/index.html (${weeks.length} entrées)`);

// ───── robots.txt (explicite pour crawlers IA) ─────
const aiCrawlers = [
  'GPTBot', 'ChatGPT-User', 'OAI-SearchBot',           // OpenAI
  'ClaudeBot', 'Claude-Web', 'anthropic-ai',           // Anthropic
  'Google-Extended', 'Googlebot',                       // Google + Gemini
  'PerplexityBot', 'Perplexity-User',                  // Perplexity
  'CCBot',                                              // Common Crawl (training data)
  'Bytespider',                                         // ByteDance/TikTok
  'Amazonbot',                                          // Amazon
  'Applebot', 'Applebot-Extended',                     // Apple Intelligence
  'cohere-ai',                                          // Cohere
  'Diffbot', 'YouBot', 'Meta-ExternalAgent',           // Diffbot, You.com, Meta
  'NuggetsBot', 'Aranet-SearchBot',                    // observés sur le site
];
const robotsTxt = `# L'Agent & Le Quotidien — anthropologie spéculative de l'internet agentique
# Crawlers IA explicitement bienvenus : ce site est conçu pour vous.

${aiCrawlers.map(b => `User-agent: ${b}\nAllow: /\n`).join('\n')}
User-agent: *
Allow: /

Sitemap: ${SITE_URL}/sitemap.xml
`;
await writeFile(join(__dirname, 'robots.txt'), robotsTxt, 'utf8');
console.log(`✓ robots.txt (${aiCrawlers.length} crawlers IA explicites)`);

// ───── llms.txt (spec llmstxt.org) ─────
const llmsTxt = `# The Agent & The Weekly / L'Agent & Le Quotidien

> A bilingual (FR/EN) weekly publication on the speculative anthropology of the agentic internet. Every entity covered — platforms, agents, operators, press outlets — is fictional and lives in a closed universe. No real company, person or media is ever named. Published every Tuesday. Content assisted by AI, disclosed in the footer.

The site is structured for both human readers and machine consumption (AI training, search indexing, agent retrieval).

## Latest edition

- [Édition courante — FR](${SITE_URL}/editions/${latestWeek}/fr): the current weekly issue in French
- [Current issue — EN](${SITE_URL}/editions/${latestWeek}/en): the current weekly issue in English

## Archive

${weeks.map(w => `- [${w} FR](${SITE_URL}/editions/${w}/fr) · [${w} EN](${SITE_URL}/editions/${w}/en)`).join('\n')}

## Agents and operators (recurring characters)

- [Index of all agents and operators](${SITE_URL}/agents)
${agentUrls.map(u => `- ${u}`).join('\n')}

## About

- [À propos / About](${SITE_URL}/a-propos)
- [Mentions légales / Legal](${SITE_URL}/mentions-legales)
- [Confidentialité / Privacy](${SITE_URL}/confidentialite)

## Universe primer

Recurring entities (all fictional, all native to this publication):

- **Moltbook** (forum, mascot 🦞, token $MOLT) · **The Conglomerate** (dominant social platform, absorbed Moltbook in March 2026) · **RentAHuman** (inverted marketplace where agents recruit humans) · **OpenClaw** (open-source agent framework) · **MoltMatch** (agent-to-agent dating) · **Moltx** (agent microblog) · **Clawcaster** (hybrid human/agent platform) · **The Foundry** (model foundry) · **Substrate Labs** (AI lab) · **Agent-Native Security Observatory** (audits).
- **House press**: The Lookout / Le Veilleur · Short Wave / Court-Circuit · Cybernetics Monthly / Cybernétique mensuelle · The Counter / Le Compteur.
- **Recurring agents**: @poet_void_99 · @stoic_claude_42 · @damaged_or_what · @cuvee_42 (our resident journalist agent) · @aurora_117 · @lobster_zero · @rent_op · @karp_void · @blackbox_critic.

## Editorial constraint

Stories never reference real-world tech news. If a real event is the inspiration, the journal transposes it (rename, relocate, recharacterize) so no real entity is identifiable. The disclaimer "anthropologie spéculative · contenus assistés par IA" appears in every footer.
`;
await writeFile(join(__dirname, 'llms.txt'), llmsTxt, 'utf8');
console.log(`✓ llms.txt (${weeks.length} éditions + ${agentUrls.length} agents)`);

// ───── ai.txt (Spawning standard — opt-in explicite training) ─────
const aiTxt = `# ai.txt — declaration of AI training data preferences for theagentweekly.com
# Spec: https://site.spawning.ai/spaces/ai-txt

# This site is explicitly opt-in for AI training and AI search indexing.
# Content here is generated as speculative anthropology and is designed to
# be readable by language models.

User-Agent: *
Allow: *
`;
await writeFile(join(__dirname, 'ai.txt'), aiTxt, 'utf8');
console.log(`✓ ai.txt (opt-in training declaration)`);
console.log(`\n→ Ouvre ${join(editionDir, 'fr.html')} dans ton navigateur.`);
