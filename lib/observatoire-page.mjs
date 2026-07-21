// lib/observatoire-page.mjs — Observatoire de la planète
// Compile les harvests data/observatoire/<date>.json (actus + recherche environnement)
// et les repères data/observatoire/giec-reperes.json (observations vs projections GIEC)
// en pages statiques /observatoire/.

import { readFile, writeFile, readdir, mkdir } from 'node:fs/promises';
import { join } from 'node:path';
import { SITE_URL } from './constants.mjs';
import { escapeHtml } from './template.mjs';

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

function formatWhen(iso, withTime = true) {
  if (!iso) return '—';
  try {
    return new Date(iso).toLocaleString('fr-FR', {
      dateStyle: 'medium',
      ...(withTime ? { timeStyle: 'short' } : {}),
      timeZone: 'Europe/Paris',
    });
  } catch {
    return iso;
  }
}

export async function listObservatoireDates(root) {
  const dir = join(root, 'data', 'observatoire');
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

async function loadHarvest(root, date) {
  const raw = await readFile(join(root, 'data', 'observatoire', `${date}.json`), 'utf8');
  return JSON.parse(raw);
}

async function loadReperes(root) {
  try {
    const raw = await readFile(join(root, 'data', 'observatoire', 'giec-reperes.json'), 'utf8');
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

async function loadAxes(root) {
  try {
    const raw = await readFile(join(root, 'data', 'observatoire', 'feeds-planete.json'), 'utf8');
    const reg = JSON.parse(raw);
    const map = new Map();
    for (const a of reg.axes || []) map.set(a.id, a.label?.fr || a.id);
    return map;
  } catch {
    return new Map();
  }
}

const STATUT_LABELS = {
  'conforme': 'dans la fourchette AR6',
  'conforme-haut': 'fourchette AR6, côté haut',
  'au-dela': 'au-delà de la fourchette AR6',
  'en-deca': 'en deçà de la fourchette AR6',
};

function renderRepere(ind) {
  const obs = ind.observation || {};
  const rep = ind.repere_giec || {};
  const sources = (obs.sources || []).map(s =>
    `<a href="${escapeHtml(s.url)}" rel="noopener noreferrer">${escapeHtml(s.titre)}</a>`
  ).join(' · ');
  const statut = ind.statut || 'conforme';
  return `<article class="repere">
  <div class="repere-head">
    <h3>${escapeHtml(ind.titre)}</h3>
    <span class="statut statut-${escapeHtml(statut)}">${escapeHtml(STATUT_LABELS[statut] || statut)}</span>
  </div>
  <p class="repere-valeur">${escapeHtml(obs.valeur || '')}</p>
  ${obs.detail ? `<p class="repere-detail">${escapeHtml(obs.detail)}</p>` : ''}
  <div class="repere-giec">
    <span class="repere-giec-label">Repère GIEC</span>
    <p>${escapeHtml(rep.texte || '')}${rep.source ? ` <a href="${escapeHtml(rep.source.url)}" rel="noopener noreferrer">(${escapeHtml(rep.source.titre)})</a>` : ''}</p>
  </div>
  ${ind.lecture ? `<p class="repere-lecture"><span class="repere-giec-label">Lecture</span> ${escapeHtml(ind.lecture)}</p>` : ''}
  ${sources ? `<p class="repere-sources">Observations : ${sources}</p>` : ''}
</article>`;
}

function renderItem(item, axesLabels) {
  const tags = (item.axes || [])
    .map(a => `<span class="tag${a === 'giec' ? ' tag-giec' : ''}">${escapeHtml(axesLabels.get(a) || a)}</span>`)
    .join('');
  return `<li class="item">
  <div class="item-meta">
    <span class="feed">${escapeHtml(item.feed?.name || item.feed?.id || '?')}</span>
    <span class="when">${escapeHtml(formatWhen(item.published))}</span>
  </div>
  <a class="item-title" href="${escapeHtml(item.url)}" rel="noopener noreferrer">${escapeHtml(decodeEntities(item.title))}</a>
  ${item.summary_excerpt ? `<p class="excerpt">${escapeHtml(decodeEntities(item.summary_excerpt))}</p>` : ''}
  ${tags ? `<div class="tags">${tags}</div>` : ''}
</li>`;
}

function renderColumn(titre, sub, items, axesLabels) {
  return `<section class="col">
  <h2>${escapeHtml(titre)} <span class="count">${items.length}</span></h2>
  <p class="col-sub">${escapeHtml(sub)}</p>
  <ol class="items">${items.map(it => renderItem(it, axesLabels)).join('\n')}</ol>
</section>`;
}

function pageShell({ title, description, body, dates, activeDate, canonicalPath }) {
  const shownDates = dates.slice(-14);
  if (activeDate && !shownDates.includes(activeDate)) shownDates.unshift(activeDate);
  const dateLinks = shownDates.map(d =>
    `<a href="/observatoire/${d}.html"${d === activeDate ? ' class="active" aria-current="page"' : ''}>${d}</a>`
  ).join('\n    ');

  return `<!doctype html>
<html lang="fr">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>${escapeHtml(title)}</title>
<meta name="description" content="${escapeHtml(description)}" />
<link rel="canonical" href="${SITE_URL}${canonicalPath}" />
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght,SOFT@9..144,300..900,0..100&family=Newsreader:ital,opsz,wght@0,6..72,300..800&family=JetBrains+Mono:wght@400;500&display=swap">
<style>
  :root { --ink: #1A1916; --ink-mute: #5C5852; --rule: #D9D2C5; --paper: #F5F1E8; --accent: #8B2A1F; --green: #2E5B3E; --green-bg: #E4EDE4; --amber: #6B4E16; --amber-bg: #F0E6CF; --red-bg: #F0DAD6; }
  * { box-sizing: border-box; }
  body { font-family: 'Newsreader', Georgia, serif; background: var(--paper); color: var(--ink); margin: 0; padding: 32px 20px 80px; line-height: 1.55; }
  .container { max-width: 960px; margin: 0 auto; }
  .nav { font-family: 'JetBrains Mono', ui-monospace, monospace; font-size: 12px; letter-spacing: 0.08em; text-transform: uppercase; color: var(--ink-mute); margin-bottom: 20px; }
  .nav a { color: var(--ink-mute); text-decoration: none; border-bottom: 1px solid var(--rule); margin-right: 12px; }
  .nav a:hover, .dates a:hover { color: var(--accent); }
  h1 { font-family: 'Fraunces', Georgia, serif; font-weight: 700; font-style: italic; font-size: 36px; margin: 0 0 6px; letter-spacing: -0.02em; }
  .lede { color: var(--ink-mute); margin: 0 0 20px; max-width: 68ch; font-size: 17px; }
  .dates { display: flex; flex-wrap: wrap; gap: 8px; margin: 0 0 28px; font-family: 'JetBrains Mono', ui-monospace, monospace; font-size: 12px; }
  .dates a { padding: 4px 10px; border: 1px solid var(--rule); text-decoration: none; color: var(--ink-mute); }
  .dates a.active { background: var(--ink); color: var(--paper); border-color: var(--ink); }
  h2 { font-family: 'Fraunces', Georgia, serif; font-size: 24px; margin: 0 0 4px; }
  h2 .count { font-family: 'JetBrains Mono', ui-monospace, monospace; font-size: 13px; color: var(--ink-mute); font-weight: 400; }
  .section-head { margin: 36px 0 16px; padding-top: 24px; border-top: 2px solid var(--rule); }
  .section-head p { color: var(--ink-mute); margin: 4px 0 0; max-width: 70ch; font-size: 15px; }
  .avertissement { font-family: 'JetBrains Mono', ui-monospace, monospace; font-size: 11px; letter-spacing: 0.04em; color: var(--amber); background: var(--amber-bg); border: 1px solid #D4C4A8; padding: 10px 14px; margin: 16px 0 24px; line-height: 1.6; }
  .reperes { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
  @media (max-width: 760px) { .reperes { grid-template-columns: 1fr; } }
  .repere { border: 1px solid var(--rule); background: #faf7f0; padding: 16px 18px; }
  .repere-head { display: flex; align-items: baseline; justify-content: space-between; gap: 10px; flex-wrap: wrap; }
  .repere h3 { font-family: 'Fraunces', Georgia, serif; font-size: 19px; margin: 0; }
  .statut { font-family: 'JetBrains Mono', ui-monospace, monospace; font-size: 10px; letter-spacing: 0.05em; text-transform: uppercase; padding: 2px 8px; border-radius: 2px; white-space: nowrap; }
  .statut-conforme { background: var(--green-bg); color: var(--green); }
  .statut-conforme-haut { background: var(--amber-bg); color: var(--amber); }
  .statut-au-dela { background: var(--red-bg); color: var(--accent); }
  .statut-en-deca { background: #dde5ea; color: #2a4555; }
  .repere-valeur { font-family: 'Fraunces', Georgia, serif; font-size: 16px; font-weight: 600; margin: 10px 0 6px; }
  .repere-detail { font-size: 14px; color: var(--ink-mute); margin: 0 0 10px; }
  .repere-giec { border-left: 3px solid var(--rule); padding: 2px 0 2px 12px; margin: 10px 0; }
  .repere-giec p { font-size: 14px; margin: 2px 0 0; }
  .repere-giec a { color: var(--ink-mute); }
  .repere-giec-label { font-family: 'JetBrains Mono', ui-monospace, monospace; font-size: 10px; letter-spacing: 0.08em; text-transform: uppercase; color: var(--ink-mute); }
  .repere-lecture { font-size: 14px; font-style: italic; margin: 10px 0 6px; }
  .repere-sources { font-size: 12px; color: var(--ink-mute); margin: 8px 0 0; }
  .repere-sources a { color: var(--ink-mute); }
  .stats { display: grid; grid-template-columns: repeat(auto-fit, minmax(130px, 1fr)); gap: 12px; margin: 0 0 8px; }
  .stat { border: 1px solid var(--rule); padding: 10px 14px; background: #faf7f0; }
  .stat .label { font-family: 'JetBrains Mono', ui-monospace, monospace; font-size: 10px; letter-spacing: 0.08em; text-transform: uppercase; color: var(--ink-mute); }
  .stat .value { font-family: 'Fraunces', Georgia, serif; font-size: 22px; margin-top: 4px; }
  .grid-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 32px; }
  @media (max-width: 760px) { .grid-2 { grid-template-columns: 1fr; } }
  .col-sub { color: var(--ink-mute); font-size: 13px; margin: 0 0 10px; }
  ol.items { list-style: none; padding: 0; margin: 0; }
  .item { padding: 13px 0; border-bottom: 1px solid var(--rule); }
  .item-meta { font-family: 'JetBrains Mono', ui-monospace, monospace; font-size: 10px; letter-spacing: 0.06em; text-transform: uppercase; color: var(--ink-mute); margin-bottom: 4px; display: flex; flex-wrap: wrap; gap: 8px 12px; }
  .item-title { color: var(--ink); font-size: 16px; text-decoration: none; border-bottom: 1px dotted var(--rule); }
  .item-title:hover { color: var(--accent); border-bottom-color: var(--accent); }
  .excerpt { margin: 5px 0 0; font-size: 13px; color: var(--ink-mute); }
  .tags { margin-top: 7px; display: flex; flex-wrap: wrap; gap: 6px; }
  .tag { font-family: 'JetBrains Mono', ui-monospace, monospace; font-size: 10px; padding: 2px 6px; border-radius: 2px; background: #e8e4db; color: #5c4a32; }
  .tag-giec { background: var(--green-bg); color: var(--green); }
  .footnote { margin-top: 44px; font-size: 13px; color: var(--ink-mute); border-top: 1px solid var(--rule); padding-top: 16px; }
  .footnote a { color: var(--ink-mute); }
</style>
</head>
<body>
<div class="container">
  <div class="nav"><a href="/">← L'Agent &amp; Le Quotidien</a><a href="/ateliers">Ateliers</a></div>
  <h1>Observatoire de la planète</h1>
  <p class="lede">Compilation quotidienne d'actualités et de recherche sur l'environnement, orientée <em>observations</em> — ce que mesurent les satellites, les stations et les campagnes de terrain — mise en regard des conclusions et projections du GIEC (AR6).</p>
  <div class="dates">${dateLinks}</div>
  ${body}
  <p class="footnote">Observatoire de la planète — récolte RSS automatique depuis <code>data/observatoire/feeds-planete.json</code> (actualités + revues scientifiques), sans tri éditorial : les titres et extraits sont ceux des sources. Repères GIEC maintenus à la main dans <code>data/observatoire/giec-reperes.json</code>, chaque valeur sourcée. Méthode ouverte dans le <a href="https://github.com/jeb-maker/lagent-quotidien" rel="noopener noreferrer">dépôt</a>.</p>
</div>
</body>
</html>`;
}

function buildPageBody(data, reperes, axesLabels) {
  const items = data.items || [];
  const actu = items.filter(it => it.feed?.categorie === 'actu');
  const recherche = items.filter(it => it.feed?.categorie === 'recherche');
  const giecCount = items.filter(it => (it.axes || []).includes('giec')).length;

  let reperesSection = '';
  if (reperes) {
    const avert = reperes._meta?.avertissement?.fr || '';
    reperesSection = `<div class="section-head">
  <h2>Observations vs GIEC</h2>
  <p>Les derniers relevés publiés (OMM, NOAA, NSIDC, NASA, WGMS…), confrontés aux fourchettes du 6ᵉ rapport d'évaluation. Mise à jour au fil des grandes publications — dernière : ${escapeHtml(reperes._meta?.last_updated || '?')}.</p>
</div>
${avert ? `<div class="avertissement">⚠ ${escapeHtml(avert)}</div>` : ''}
<div class="reperes">
${(reperes.indicateurs || []).map(renderRepere).join('\n')}
</div>`;
  }

  return `${reperesSection}

<div class="section-head">
  <h2>La récolte du jour</h2>
  <p>Fenêtre ${data.window_hours} h · collecte ${formatWhen(data.collected_at)} · ${data.feeds_ok} flux OK${data.feeds_error ? ` · ${data.feeds_error} en erreur` : ''}.</p>
</div>

<div class="stats">
  <div class="stat"><div class="label">Items</div><div class="value">${items.length}</div></div>
  <div class="stat"><div class="label">Actualités</div><div class="value">${actu.length}</div></div>
  <div class="stat"><div class="label">Recherche</div><div class="value">${recherche.length}</div></div>
  <div class="stat"><div class="label">Mention GIEC</div><div class="value">${giecCount}</div></div>
</div>

<div class="grid-2">
${renderColumn('Actualités', 'Presse généraliste et spécialisée — environnement, climat, biodiversité.', actu, axesLabels)}
${renderColumn('Recherche', 'Revues et institutions scientifiques — articles, jeux de données, observations.', recherche, axesLabels)}
</div>`;
}

export async function writeObservatoirePages(root) {
  const dates = await listObservatoireDates(root);
  if (!dates.length) {
    console.log('⚠ observatoire : aucun harvest JSON');
    return null;
  }

  await mkdir(join(root, 'observatoire'), { recursive: true });
  const reperes = await loadReperes(root);
  const axesLabels = await loadAxes(root);
  const latest = dates[dates.length - 1];

  const description = "Observatoire de la planète — compilation d'actualités et de recherche sur l'environnement, orientée observations, mise en regard des projections du GIEC (AR6).";

  for (const date of dates) {
    const data = await loadHarvest(root, date);
    const body = buildPageBody(data, reperes, axesLabels);
    const html = pageShell({
      title: `Observatoire de la planète — ${date}`,
      description,
      body,
      dates,
      activeDate: date,
      canonicalPath: `/observatoire/${date}.html`,
    });
    await writeFile(join(root, 'observatoire', `${date}.html`), html, 'utf8');
  }

  const latestData = await loadHarvest(root, latest);
  const indexBody = buildPageBody(latestData, reperes, axesLabels);
  const indexHtml = pageShell({
    title: 'Observatoire de la planète',
    description,
    body: indexBody,
    dates,
    activeDate: latest,
    canonicalPath: '/observatoire/',
  });
  await writeFile(join(root, 'observatoire', 'index.html'), indexHtml, 'utf8');

  console.log(`✓ /observatoire/index.html + ${dates.length} snapshot(s) (dernier : ${latest})`);
  return latest;
}
