import { SITE_URL, BLUESKY_HANDLE, BLUESKY_URL, ARCHIVE_PATH } from './constants.mjs';
import { stripHtml } from './template.mjs';

export function pick(field, lang) {
  if (field === null || field === undefined) return '';
  if (typeof field === 'string') return field;
  if (typeof field === 'object' && (field.fr !== undefined || field.en !== undefined)) {
    return field[lang] ?? field.fr ?? field.en ?? '';
  }
  return field;
}

export function buildContext({ edition, week, lang, css, labels, prevWeek, nextWeek }) {
  const L = labels[lang];
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
    ? "L'Agent & Le Quotidien — masthead bilingue, journalisme sur l'internet agentique (faits sourcés)"
    : "The Agent & The Weekly — bilingual masthead, journalism on the agentic internet (sourced facts)";

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

  return {
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

    ...(() => {
      const molt = edition.market.rows.find(r => r.ticker === '$MOLT');
      if (!molt) return { has_masthead_molt: false };
      const up = molt.direction === 'up';
      return {
        has_masthead_molt: true,
        masthead_molt_arrow: up ? '▲' : '▼',
        masthead_molt_change: molt.change,
        masthead_molt_color: up ? '#2D7A3D' : 'var(--accent)'
      };
    })(),

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

    headlines: edition.headlines.map(h => ({
      tag: pick(h.tag, lang),
      title_html: pick(h.title_html, lang),
      body: pick(h.body, lang),
      meta: lang === 'fr' ? h.meta_fr : h.meta_en
    })),

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

    has_gibberlink: !!edition.gibberlink,
    gibberlink_label: edition.gibberlink ? pick(edition.gibberlink.title, lang) : '',
    gibberlink_title: edition.gibberlink ? (lang === 'fr' ? edition.gibberlink.term : edition.gibberlink.term_en) : '',
    gibberlink_subtitle: edition.gibberlink ? pick(edition.gibberlink.subtitle, lang) : '',
    gibberlink_term: edition.gibberlink ? (lang === 'fr' ? edition.gibberlink.term : edition.gibberlink.term_en) : '',
    gibberlink_first_seen: edition.gibberlink ? edition.gibberlink.first_seen : '',
    gibberlink_spread: edition.gibberlink ? (lang === 'fr' ? edition.gibberlink.spread_fr : edition.gibberlink.spread_en) : '',
    gibberlink_decoding: edition.gibberlink ? pick(edition.gibberlink.decoding, lang) : '',
    gibberlink_to_watch: edition.gibberlink ? (lang === 'fr' ? edition.gibberlink.to_watch_fr : edition.gibberlink.to_watch_en) : '',

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

    wire_items: edition.wire.map(w => ({
      source: w.source || '',
      ts: lang === 'fr' ? (w.ts_fr || w.time_fr || '') : (w.ts_en || w.time_en || ''),
      title: pick(w.title, lang),
      body: pick(w.body, lang)
    })),

    tribune_label: pick(edition.tribune.label, lang),
    tribune_headline: pick(edition.tribune.headline_html, lang),
    tribune_paragraphs: lang === 'fr' ? edition.tribune.paragraphs.fr : edition.tribune.paragraphs.en,
    tribune_initials: edition.tribune.author.initials,
    tribune_name: edition.tribune.author.name,
    tribune_role: lang === 'fr' ? edition.tribune.author.role_fr : edition.tribune.author.role_en
  };
}
