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
  const langPathUrl = `./${lang}.html`;
  const langFrUrl = `./fr.html`;
  const langEnUrl = `./en.html`;

  const siteName = lang === 'fr' ? "L'Agent & Le Quotidien" : "The Agent & The Weekly";
  const ledeHeadlinePlain = stripHtml(pick(edition.lede.headline_html, lang));
  const shareTextRaw = `${ledeHeadlinePlain} — ${siteName}`;
  const shareUrlEncoded = encodeURIComponent(canonicalUrl);
  const shareTextEncoded = encodeURIComponent(shareTextRaw);
  const shareBsky = `https://bsky.app/intent/compose?text=${shareTextEncoded}%20${shareUrlEncoded}`;
  const shareX = `https://twitter.com/intent/tweet?text=${shareTextEncoded}&url=${shareUrlEncoded}`;
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
    is_fr: lang === 'fr',
    is_en: lang === 'en',
    lang_fr_url: langFrUrl,
    lang_en_url: langEnUrl,
    CSS: css,
    canonical_url: canonicalUrl,
    share_url: canonicalUrl,
    share_text: shareTextRaw,
    share_bsky: shareBsky,
    share_x: shareX,
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

    lede_kicker: pick(edition.lede.kicker, lang),
    lede_headline_html: pick(edition.lede.headline_html, lang),
    lede_dek: pick(edition.lede.dek, lang),
    lede_byline: pick(edition.lede.byline, lang),
    lede_num_a: edition.lede.figure.num_a,
    lede_slash: edition.lede.figure.slash,
    lede_num_b: edition.lede.figure.num_b,
    lede_legend: lang === 'fr' ? edition.lede.figure.legend_fr : edition.lede.figure.legend_en,
    lede_body: pick(edition.lede.body, lang),

    // Sections DEPRECATED : ticker, market, breves, bestiaire, bot_posts,
    // interview, gibberlink, retrospective — retirées du contexte (audit diet).

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

    has_bestiaire: false,
    has_bot_posts: false,
    has_interview: false,
    has_gibberlink: false,

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

    has_retrospective: false,

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
