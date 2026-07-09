import { SITE_URL, ARCHIVE_PATH } from './constants.mjs';
import { stripHtml, escapeHtml } from './template.mjs';
import { readFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));

export function pick(field, lang) {
  if (field === null || field === undefined) return '';
  if (typeof field === 'string') return field;
  if (typeof field === 'object' && (field.fr !== undefined || field.en !== undefined)) {
    return field[lang] ?? field.fr ?? field.en ?? '';
  }
  return field;
}

export function loadPrevEditionMeta(prevWeek, lang) {
  if (!prevWeek) return null;
  try {
    const p = JSON.parse(readFileSync(join(__dirname, '..', 'editions', prevWeek, 'edition.json'), 'utf8'));
    return {
      kicker: pick(p.lede.kicker, lang),
      headline: stripHtml(pick(p.lede.headline_html, lang)),
    };
  } catch {
    return { kicker: '', headline: '' };
  }
}

export function buildContext({ edition, week, lang, css, labels, prevWeek, nextWeek, body_html }) {
  const L = labels[lang];
  const other = lang === 'fr' ? 'en' : 'fr';

  const canonicalUrl = `${SITE_URL}/editions/${week}/${lang}.md`;
  const hreflangFr = `${SITE_URL}/editions/${week}/fr.md`;
  const hreflangEn = `${SITE_URL}/editions/${week}/en.md`;
  const markdownUrl = `./${lang}.md`;

  const siteName = lang === 'fr' ? "L'Agent & Le Quotidien" : 'The Agent & The Weekly';
  const ledeHeadlinePlain = stripHtml(pick(edition.lede.headline_html, lang));
  const ogLocale = lang === 'fr' ? 'fr_FR' : 'en_US';
  const ogLocaleAlt = lang === 'fr' ? 'en_US' : 'fr_FR';
  const publishedTime = edition._meta.bouclage;
  const ogImage = `${SITE_URL}/og.png`;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'NewsArticle',
    headline: ledeHeadlinePlain,
    description: stripHtml(pick(edition.lede.dek, lang)),
    image: ogImage,
    datePublished: publishedTime,
    dateModified: publishedTime,
    inLanguage: lang === 'fr' ? 'fr-FR' : 'en-US',
    url: canonicalUrl,
    mainEntityOfPage: canonicalUrl,
    encoding: {
      '@type': 'MediaObject',
      contentUrl: canonicalUrl,
      encodingFormat: 'text/markdown',
    },
    isPartOf: {
      '@type': 'PublicationIssue',
      issueNumber: edition._meta.edition_number,
      isPartOf: {
        '@type': 'Periodical',
        name: siteName,
      },
    },
    publisher: {
      '@type': 'Organization',
      name: siteName,
      url: SITE_URL,
    },
    author: {
      '@type': 'Organization',
      name: siteName,
      url: SITE_URL,
    },
  };

  const formatBarHtml = lang === 'fr'
    ? `Format canonique : <a href="${escapeHtml(markdownUrl)}">${escapeHtml(markdownUrl)}</a> · cette page est une coquille HTML de lecture`
    : `Canonical format: <a href="${escapeHtml(markdownUrl)}">${escapeHtml(markdownUrl)}</a> · this page is a human-readable HTML shell`;

  const prevMeta = loadPrevEditionMeta(prevWeek, lang);

  return {
    lang,
    other_lang: other,
    is_fr: lang === 'fr',
    is_en: lang === 'en',
    lang_fr_url: './fr.html',
    lang_en_url: './en.html',
    CSS: css,
    canonical_url: canonicalUrl,
    markdown_url: markdownUrl,
    hreflang_fr: hreflangFr,
    hreflang_en: hreflangEn,
    og_site_name: siteName,
    og_locale: ogLocale,
    og_locale_alt: ogLocaleAlt,
    og_image: ogImage,
    published_time: publishedTime,
    json_ld: JSON.stringify(jsonLd),
    body_html,
    format_bar_html: formatBarHtml,
    cf_analytics_token: '8a39d8c8189145dc843679f3e30b1b76',
    ...L,

    date: lang === 'fr' ? edition._meta.date_fr : edition._meta.date_en,
    edition_number: edition._meta.edition_number,
    volume: edition._meta.volume,

    has_prev_edition: !!prevWeek,
    has_next_edition: !!nextWeek,
    prev_edition_url: prevWeek ? `/editions/${prevWeek}/${lang}.md` : '',
    prev_edition_html_url: prevWeek ? `/editions/${prevWeek}/${lang}.html` : '',
    prev_edition_short: prevWeek || '',
    prev_edition_kicker: prevMeta?.kicker || '',
    prev_edition_headline: prevMeta?.headline || '',
    next_edition_url: nextWeek ? `/editions/${nextWeek}/${lang}.md` : '',
    archives_url: ARCHIVE_PATH,
  };
}
