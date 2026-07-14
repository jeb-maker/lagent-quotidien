import { readFile, writeFile, readdir, mkdir } from 'node:fs/promises';
import { join } from 'node:path';
import { SITE_URL } from './constants.mjs';
import { escapeHtml } from './template.mjs';
import { renderEditionHtml } from './markdown-to-html.mjs';

const LANG_LABELS = {
  en: 'EN',
  fr: 'FR',
  es: 'ES',
  pt: 'PT',
  ar: 'AR',
  zh: 'ZH',
};

function decodeEntities(s) {
  return String(s ?? '')
    .replace(/&#x([0-9a-fA-F]+);/g, (_, hex) => String.fromCodePoint(parseInt(hex, 16)))
    .replace(/&#(\d+);/g, (_, dec) => String.fromCodePoint(parseInt(dec, 10)))
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'");
}

function formatWhen(iso) {
  if (!iso) return '—';
  try {
    return new Date(iso).toLocaleString('fr-FR', {
      dateStyle: 'medium',
      timeStyle: 'short',
      timeZone: 'Europe/Paris',
    });
  } catch {
    return iso;
  }
}

export async function listRadarDates(root) {
  const dir = join(root, 'data', 'narrative-radar');
  try {
    const files = await readdir(dir);
    return files
      .filter(f => /^\d{4}-\d{2}-\d{2}\.json$/.test(f))
      .map(f => f.replace(/\.json$/, ''))
      .sort();
  } catch {
    return [];
  }
}

async function loadRadar(root, date) {
  const raw = await readFile(join(root, 'data', 'narrative-radar', `${date}.json`), 'utf8');
  return JSON.parse(raw);
}

async function findDeskAnalysis(root, radarDate) {
  const deskRoot = join(root, 'data', 'desk');
  let weeks = [];
  try {
    weeks = (await readdir(deskRoot, { withFileTypes: true }))
      .filter(d => d.isDirectory())
      .map(d => d.name)
      .sort()
      .reverse();
  } catch {
    return null;
  }

  for (const week of weeks) {
    const detecteurPath = join(deskRoot, week, 'detecteur.md');
    try {
      const md = await readFile(detecteurPath, 'utf8');
      if (!md.includes(radarDate)) continue;
      let adverseHtml = '';
      try {
        const adverseMd = await readFile(join(deskRoot, week, 'detecteur-adverse.md'), 'utf8');
        adverseHtml = renderEditionHtml(adverseMd, 'fr').bodyHtml;
      } catch { /* optional */ }
      const { bodyHtml } = renderEditionHtml(md, 'fr');
      return { week, bodyHtml, adverseHtml };
    } catch { /* try next week */ }
  }
  return null;
}

function renderTags(item) {
  const parts = [];
  for (const t of item.tags_rule || []) {
    parts.push(`<span class="tag archetype" title="interprétatif">${escapeHtml(t.archetype)}</span>`);
  }
  for (const c of item.calibration_hits || []) {
    parts.push(`<span class="tag calibration" title="score ${c.score} · interprétatif">${escapeHtml(c.case)}</span>`);
  }
  if (!parts.length) return '';
  return `<div class="tags">${parts.join('')}</div>`;
}

function renderItem(item) {
  const lang = item.feed?.lang || 'en';
  return `<li class="item">
  <div class="item-meta">
    <span class="lang">${escapeHtml(LANG_LABELS[lang] || lang.toUpperCase())}</span>
    <span class="feed">${escapeHtml(item.feed?.name || item.feed?.id || '?')}</span>
    <span class="when">${escapeHtml(formatWhen(item.published))}</span>
  </div>
  <a class="item-title" href="${escapeHtml(item.url)}" rel="noopener noreferrer">${escapeHtml(decodeEntities(item.title))}</a>
  ${item.summary_excerpt ? `<p class="excerpt">${escapeHtml(decodeEntities(item.summary_excerpt))}</p>` : ''}
  ${renderTags(item)}
</li>`;
}

function renderCoverage(byLang = {}) {
  const total = Object.values(byLang).reduce((n, c) => n + c, 0) || 1;
  return Object.entries(byLang)
    .sort((a, b) => b[1] - a[1])
    .map(([lang, count]) => {
      const pct = Math.round((count / total) * 100);
      return `<div class="cov-row">
  <span class="cov-lang">${escapeHtml(LANG_LABELS[lang] || lang.toUpperCase())}</span>
  <div class="cov-bar"><span style="width:${pct}%"></span></div>
  <span class="cov-count">${count}</span>
</div>`;
    })
    .join('\n');
}

function renderClusters(data) {
  const byId = new Map(data.items.map(it => [it.id, it]));
  const clusters = (data.clusters || []).slice(0, 12);
  if (!clusters.length) {
    return '<p class="muted">Aucun cluster titre identique sur cette fenêtre.</p>';
  }
  return clusters.map(cl => {
    const items = cl.item_ids.map(id => byId.get(id)).filter(Boolean);
    const sample = items.slice(0, 4).map(it =>
      `<li><span class="lang-inline">${escapeHtml(LANG_LABELS[it.feed?.lang] || it.feed?.lang || '?')}</span> ${escapeHtml(decodeEntities(it.title))}</li>`
    ).join('');
    return `<div class="cluster">
  <div class="cluster-head">${items.length} flux · titres alignés</div>
  <ul>${sample}</ul>
</div>`;
  }).join('\n');
}

function renderItemsByLang(items) {
  const byLang = new Map();
  for (const it of items) {
    const lang = it.feed?.lang || 'en';
    if (!byLang.has(lang)) byLang.set(lang, []);
    byLang.get(lang).push(it);
  }
  return [...byLang.entries()]
    .sort((a, b) => b[1].length - a[1].length)
    .map(([lang, langItems]) => `<section class="lang-block">
  <h2>${escapeHtml(LANG_LABELS[lang] || lang.toUpperCase())} <span class="count">${langItems.length}</span></h2>
  <ol class="items">${langItems.map(renderItem).join('\n')}</ol>
</section>`)
    .join('\n');
}

function pageShell({ title, body, dates, activeDate }) {
  const dateLinks = dates.map(d =>
    `<a href="/radar/${d}.html"${d === activeDate ? ' class="active" aria-current="page"' : ''}>${d}</a>`
  ).join('\n    ');

  return `<!doctype html>
<html lang="fr">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<meta name="robots" content="noindex, nofollow" />
<title>${escapeHtml(title)}</title>
<style>
  :root { --ink: #1A1916; --ink-mute: #5C5852; --rule: #D9D2C5; --paper: #F5F1E8; --accent: #8B2A1F; --warn: #6B4E16; --warn-bg: #F0E6CF; }
  * { box-sizing: border-box; }
  body { font-family: 'Newsreader', Georgia, serif; background: var(--paper); color: var(--ink); margin: 0; padding: 32px 20px 80px; line-height: 1.55; }
  .container { max-width: 920px; margin: 0 auto; }
  .banner { background: var(--warn-bg); border: 1px solid #D4C4A8; color: var(--warn); font-family: 'JetBrains Mono', ui-monospace, monospace; font-size: 11px; letter-spacing: 0.08em; text-transform: uppercase; padding: 10px 14px; margin-bottom: 24px; }
  .nav { font-family: 'JetBrains Mono', ui-monospace, monospace; font-size: 12px; letter-spacing: 0.08em; text-transform: uppercase; color: var(--ink-mute); margin-bottom: 20px; }
  .nav a { color: var(--ink-mute); text-decoration: none; border-bottom: 1px solid var(--rule); margin-right: 12px; }
  .nav a:hover, .dates a:hover { color: var(--accent); }
  .dates { display: flex; flex-wrap: wrap; gap: 8px; margin: 0 0 28px; font-family: 'JetBrains Mono', ui-monospace, monospace; font-size: 12px; }
  .dates a { padding: 4px 10px; border: 1px solid var(--rule); text-decoration: none; color: var(--ink-mute); }
  .dates a.active { background: var(--ink); color: var(--paper); border-color: var(--ink); }
  h1 { font-family: 'Fraunces', Georgia, serif; font-weight: 700; font-style: italic; font-size: 34px; margin: 0 0 6px; }
  .lede { color: var(--ink-mute); margin: 0 0 24px; max-width: 62ch; }
  .stats { display: grid; grid-template-columns: repeat(auto-fit, minmax(140px, 1fr)); gap: 12px; margin-bottom: 28px; }
  .stat { border: 1px solid var(--rule); padding: 12px 14px; background: #faf7f0; }
  .stat .label { font-family: 'JetBrains Mono', ui-monospace, monospace; font-size: 10px; letter-spacing: 0.08em; text-transform: uppercase; color: var(--ink-mute); }
  .stat .value { font-family: 'Fraunces', Georgia, serif; font-size: 24px; margin-top: 4px; }
  .grid-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 24px; margin-bottom: 32px; }
  @media (max-width: 720px) { .grid-2 { grid-template-columns: 1fr; } }
  h2 { font-family: 'Fraunces', Georgia, serif; font-size: 22px; margin: 0 0 12px; }
  .cov-row { display: grid; grid-template-columns: 36px 1fr 36px; gap: 8px; align-items: center; margin-bottom: 6px; font-family: 'JetBrains Mono', ui-monospace, monospace; font-size: 11px; }
  .cov-bar { height: 8px; background: #e8e4db; border-radius: 1px; overflow: hidden; }
  .cov-bar span { display: block; height: 100%; background: var(--accent); }
  .cluster { border: 1px solid var(--rule); padding: 12px 14px; margin-bottom: 10px; background: #faf7f0; }
  .cluster-head { font-family: 'JetBrains Mono', ui-monospace, monospace; font-size: 11px; text-transform: uppercase; letter-spacing: 0.06em; color: var(--ink-mute); margin-bottom: 8px; }
  .cluster ul { margin: 0; padding-left: 18px; font-size: 14px; }
  .lang-inline { font-family: 'JetBrains Mono', ui-monospace, monospace; font-size: 10px; border: 1px solid var(--rule); padding: 0 4px; margin-right: 6px; }
  .lang-block { margin-bottom: 36px; }
  .lang-block .count { font-family: 'JetBrains Mono', ui-monospace, monospace; font-size: 13px; color: var(--ink-mute); font-weight: 400; }
  ol.items { list-style: none; padding: 0; margin: 0; }
  .item { padding: 14px 0; border-bottom: 1px solid var(--rule); }
  .item-meta { font-family: 'JetBrains Mono', ui-monospace, monospace; font-size: 10px; letter-spacing: 0.06em; text-transform: uppercase; color: var(--ink-mute); margin-bottom: 4px; display: flex; flex-wrap: wrap; gap: 8px 12px; }
  .item-meta .lang { border: 1px solid var(--rule); padding: 1px 5px; }
  .item-title { color: var(--ink); font-size: 17px; text-decoration: none; border-bottom: 1px dotted var(--rule); }
  .item-title:hover { color: var(--accent); border-bottom-color: var(--accent); }
  .excerpt { margin: 6px 0 0; font-size: 14px; color: var(--ink-mute); }
  .tags { margin-top: 8px; display: flex; flex-wrap: wrap; gap: 6px; }
  .tag { font-family: 'JetBrains Mono', ui-monospace, monospace; font-size: 10px; padding: 2px 6px; border-radius: 2px; }
  .tag.archetype { background: #e8dfd0; color: #5c4a32; }
  .tag.calibration { background: #dde5ea; color: #2a4555; }
  .desk { margin-top: 40px; padding-top: 28px; border-top: 2px solid var(--rule); }
  .desk .md-body h2 { font-size: 20px; margin-top: 24px; }
  .desk .md-body table { width: 100%; border-collapse: collapse; font-size: 13px; margin: 12px 0; }
  .desk .md-body th, .desk .md-body td { border: 1px solid var(--rule); padding: 6px 8px; vertical-align: top; }
  .muted { color: var(--ink-mute); font-size: 14px; }
  .footnote { margin-top: 40px; font-size: 13px; color: var(--ink-mute); border-top: 1px solid var(--rule); padding-top: 16px; }
</style>
</head>
<body>
<div class="container">
  <div class="banner">Usage interne · non indexé · homologie ≠ manipulation prouvée</div>
  <div class="nav"><a href="/">← Édition</a></div>
  <div class="dates">${dateLinks}</div>
  ${body}
  <p class="footnote">Narrative Radar — harvest RSS depuis <code>data/feeds-world.json</code>. Tags et scores marqués <em>interprétatifs</em> dans le JSON source. Non publié dans le sitemap ni le feed.</p>
</div>
</body>
</html>`;
}

function buildPageBody(data, desk) {
  const tagged = data.items.filter(it => (it.tags_rule?.length || it.calibration_hits?.length));
  let deskSection = '';
  if (desk) {
    deskSection = `<section class="desk">
  <h2>Analyse desk · ${escapeHtml(desk.week)}</h2>
  <div class="md-body">${desk.bodyHtml}</div>
  ${desk.adverseHtml ? `<h2>Avocat du diable</h2><div class="md-body">${desk.adverseHtml}</div>` : ''}
</section>`;
  }

  return `<h1>Narrative Radar</h1>
<p class="lede">Fenêtre ${data.window_hours}h · collecte ${formatWhen(data.collected_at)} · ${data.items.length} items · ${data.coverage?.non_en_pct ?? '?'}% hors anglais</p>

<div class="stats">
  <div class="stat"><div class="label">Flux OK</div><div class="value">${data.feeds_ok}</div></div>
  <div class="stat"><div class="label">Items</div><div class="value">${data.items.length}</div></div>
  <div class="stat"><div class="label">Hors EN</div><div class="value">${data.coverage?.non_en_pct ?? 0}%</div></div>
  <div class="stat"><div class="label">Taggés</div><div class="value">${tagged.length}</div></div>
</div>

<div class="grid-2">
  <section>
    <h2>Couverture linguistique</h2>
    ${renderCoverage(data.coverage?.by_lang)}
  </section>
  <section>
    <h2>Clusters titre</h2>
    ${renderClusters(data)}
  </section>
</div>

${deskSection}

<h2>Items par langue</h2>
${renderItemsByLang(data.items)}`;
}

export async function writeRadarPages(root) {
  const dates = await listRadarDates(root);
  if (!dates.length) {
    console.log('⚠ radar : aucun harvest JSON');
    return null;
  }

  await mkdir(join(root, 'radar'), { recursive: true });
  const latest = dates[dates.length - 1];

  for (const date of dates) {
    const data = await loadRadar(root, date);
    const desk = await findDeskAnalysis(root, date);
    const body = buildPageBody(data, desk);
    const html = pageShell({
      title: `Narrative Radar — ${date}`,
      body,
      dates,
      activeDate: date,
    });
    const out = join(root, 'radar', `${date}.html`);
    await writeFile(out, html, 'utf8');
  }

  const latestData = await loadRadar(root, latest);
  const latestDesk = await findDeskAnalysis(root, latest);
  const indexBody = buildPageBody(latestData, latestDesk);
  const indexHtml = pageShell({
    title: `Narrative Radar — ${latest}`,
    body: indexBody,
    dates,
    activeDate: latest,
  });
  await writeFile(join(root, 'radar', 'index.html'), indexHtml, 'utf8');

  console.log(`✓ /radar/index.html + ${dates.length} snapshot(s) (dernier : ${latest})`);
  return latest;
}
