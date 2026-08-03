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

export function buildContext({ edition, week, lang, css, labels, prevWeek, nextWeek, body_html, toc_html = '', has_toc = false }) {
  const L = labels[lang];
  const other = lang === 'fr' ? 'en' : 'fr';

  const canonicalUrl = `${SITE_URL}/editions/${week}/${lang}.html`;
  const hreflangFr = `${SITE_URL}/editions/${week}/fr.html`;
  const hreflangEn = `${SITE_URL}/editions/${week}/en.html`;
  const markdownUrl = `./${lang}.md`;
  const minMarkdownUrl = `./${lang}.min.md`;

  const siteName = lang === 'fr' ? "L'Agent & Le Quotidien" : 'The Agent & The Weekly';
  const ledeHeadlinePlain = stripHtml(pick(edition.lede.headline_html, lang));
  const ogLocale = lang === 'fr' ? 'fr_FR' : 'en_US';
  const ogLocaleAlt = lang === 'fr' ? 'en_US' : 'fr_FR';
  const publishedTime = edition._meta.bouclage;
  const ogImage = `${SITE_URL}/og.png`;
  const markdownAbsolute = `${SITE_URL}/editions/${week}/${lang}.md`;

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
    encoding: [
      {
        '@type': 'MediaObject',
        contentUrl: canonicalUrl,
        encodingFormat: 'text/html',
      },
      {
        '@type': 'MediaObject',
        contentUrl: markdownAbsolute,
        encodingFormat: 'text/markdown',
      },
    ],
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

  // Feuilleton : œuvre de fiction séparée du NewsArticle (provenance machine).
  if (edition.feuilleton?.title && edition.feuilleton?.paragraphs) {
    const f = edition.feuilleton;
    jsonLd.hasPart = {
      '@type': 'ShortStory',
      genre: 'Fiction',
      name: stripHtml(pick(f.title, lang)),
      description: stripHtml(pick(f.disclaimer, lang)),
      inLanguage: lang === 'fr' ? 'fr-FR' : 'en-US',
      isPartOf: {
        '@type': 'PublicationIssue',
        issueNumber: edition._meta.edition_number,
        isPartOf: {
          '@type': 'Periodical',
          name: siteName,
        },
      },
    };
  }

  const formatBarHtml = lang === 'fr'
    ? `Lire : <strong>HTML</strong> · <a href="${escapeHtml(markdownUrl)}">Markdown</a> · <a href="${escapeHtml(minMarkdownUrl)}">compact</a> · <a href="/feed.xml">Atom</a> · <a href="/topics">Thèmes</a> · <a href="/editions/">Archives</a>`
    : `Read: <strong>HTML</strong> · <a href="${escapeHtml(markdownUrl)}">Markdown</a> · <a href="${escapeHtml(minMarkdownUrl)}">compact</a> · <a href="/feed.xml">Atom</a> · <a href="/topics">Topics</a> · <a href="/editions/">Archives</a>`;

  const takeawaysItems = Array.isArray(edition.takeaways?.[lang])
    ? edition.takeaways[lang].filter((t) => typeof t === 'string' && t.trim())
    : [];
  const takeaways_html = takeawaysItems.length
    ? `<aside class="takeaways" aria-label="${lang === 'fr' ? 'À retenir' : 'Key takeaways'}">
<div class="takeaways-label">${lang === 'fr' ? 'À retenir en 30 secondes' : '30-second takeaways'}</div>
<ul>${takeawaysItems.map((t) => `<li>${escapeHtml(t.trim())}</li>`).join('')}</ul>
</aside>`
    : '';

  const sourceTypeLabel = (type) => {
    const map = {
      primary: { fr: 'Primaire', en: 'Primary' },
      media: { fr: 'Presse', en: 'Press' },
      corporate: { fr: 'Corporate', en: 'Corporate' },
      research: { fr: 'Recherche', en: 'Research' },
      archive: { fr: 'Archive', en: 'Archive' },
    };
    return map[type]?.[lang] || type || (lang === 'fr' ? 'Source' : 'Source');
  };
  const sourcesList = Array.isArray(edition.sources) ? edition.sources : [];
  const sources_html = sourcesList.length
    ? `<section class="sources" id="sources" aria-label="${lang === 'fr' ? 'Sources' : 'Sources'}">
<div class="sources-label">${lang === 'fr' ? 'Sources' : 'Sources'}</div>
<ul>${sourcesList.map((s) => {
      const label = (lang === 'fr' ? (s.label_fr || s.label || s.url) : (s.label_en || s.label || s.url)) || s.url;
      const type = sourceTypeLabel(s.type);
      const date = s.date ? ` · ${escapeHtml(s.date)}` : '';
      const href = escapeHtml(s.url || '#');
      return `<li><span class="src-type">${escapeHtml(type)}</span> <a href="${href}" rel="noopener">${escapeHtml(label)}</a>${date}</li>`;
    }).join('')}</ul>
</section>`
    : '';

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
    toc_html,
    has_toc,
    format_bar_html: formatBarHtml,
    takeaways_html,
    has_takeaways: takeawaysItems.length > 0,
    sources_html,
    has_sources: sourcesList.length > 0,
    cf_analytics_token: '8a39d8c8189145dc843679f3e30b1b76',
    ...L,

    date: lang === 'fr' ? edition._meta.date_fr : edition._meta.date_en,
    edition_number: edition._meta.edition_number,
    volume: edition._meta.volume,

    has_prev_edition: !!prevWeek,
    has_next_edition: !!nextWeek,
    prev_edition_url: prevWeek ? `/editions/${prevWeek}/${lang}.html` : '',
    prev_edition_html_url: prevWeek ? `/editions/${prevWeek}/${lang}.html` : '',
    prev_edition_short: prevWeek || '',
    prev_edition_kicker: prevMeta?.kicker || '',
    prev_edition_headline: prevMeta?.headline || '',
    next_edition_url: nextWeek ? `/editions/${nextWeek}/${lang}.html` : '',
    archives_url: ARCHIVE_PATH,
  };
}
