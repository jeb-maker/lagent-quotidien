// lib/datasets-page.mjs — Jeux de données originaux (CC0) tirés des harvests primaires.
//
// Pourquoi : la stratégie vise la citabilité par les IA. Un chiffre qu'on ne
// trouve que chez nous (série quotidienne des compteurs Moltbook, cadence des
// releases OpenClaw, ordre de grandeur $MOLT) se cite ; un commentaire ne se
// cite pas. Les harvests `data/harvest/<date>-primary.json` sont déjà relevés
// et commités chaque jour : on les compile en CSV/JSON stables + une page.
//
// Doctrine lecture sûre : ce module ne fetch rien. Il relit des JSON déjà en
// quarantaine et ne publie que des champs numériques/datés + l'URL source.
// Les compteurs restent « déclaratifs, relevés par la plateforme » (compass).

import { readFile, writeFile, readdir, mkdir } from 'node:fs/promises';
import { join } from 'node:path';
import { SITE_URL } from './constants.mjs';
import { escapeHtml } from './template.mjs';

const CSV_SEP = ',';

function csvCell(v) {
  if (v === null || v === undefined) return '';
  const s = String(v);
  return /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
}

function toCsv(columns, rows) {
  const head = columns.join(CSV_SEP);
  const body = rows.map(r => columns.map(c => csvCell(r[c])).join(CSV_SEP));
  return `${[head, ...body].join('\n')}\n`;
}

async function listPrimaryHarvests(root) {
  const dir = join(root, 'data', 'harvest');
  try {
    const files = await readdir(dir);
    return files
      .filter(f => /^\d{4}-\d{2}-\d{2}-primary\.json$/.test(f))
      .sort()
      .map(f => ({ date: f.slice(0, 10), path: join(dir, f) }));
  } catch {
    return [];
  }
}

async function readJson(path) {
  try { return JSON.parse(await readFile(path, 'utf8')); } catch { return null; }
}

// ───── Extraction par jeu ─────

function moltbookRow(date, harvest) {
  const src = harvest?.raw_public?.sources?.find(s => s.source === 'Moltbook');
  const st = src?.stats;
  if (!st || st.total_agents == null) return null;
  return {
    date,
    collected_at: src.fetched_at || harvest.collected_at || null,
    total_agents: st.total_agents,
    verified_agents: st.verified_agents ?? null,
    total_posts: st.total_posts ?? null,
    total_comments: st.total_comments ?? null,
    total_submolts: st.total_submolts ?? null,
    source_url: src.stats_url || 'https://www.moltbook.com/api/v1/stats'
  };
}

function moltRow(date, harvest) {
  const t = harvest?.molt?.token;
  if (!t || typeof t.price_usd !== 'number') return null;
  return {
    date,
    collected_at: t.fetched_at || harvest.collected_at || null,
    price_usd: t.price_usd,
    market_cap_usd: t.market_cap_usd ?? null,
    volume_24h_usd: t.volume_24h_usd ?? null,
    source: t.source || null,
    source_url: t.url || null
  };
}

function openclawReleases(harvest) {
  return (harvest?.openclaw?.releases || [])
    .filter(r => r?.tag && r?.published_at)
    .map(r => ({
      tag: r.tag,
      name: r.name || null,
      published_at: r.published_at,
      prerelease: r.prerelease ? 'true' : 'false',
      url: r.url || `https://github.com/openclaw/openclaw/releases/tag/${r.tag}`
    }));
}

// ───── Indicateurs dérivés (pour la page ; jamais extrapolés) ─────

function delta(rows, key, days) {
  if (rows.length < 2) return null;
  const last = rows.at(-1);
  const cutoff = new Date(`${last.date}T00:00:00Z`);
  cutoff.setUTCDate(cutoff.getUTCDate() - days);
  const cutoffStr = cutoff.toISOString().slice(0, 10);
  const base = [...rows].reverse().find(r => r.date <= cutoffStr);
  if (!base || base[key] == null || last[key] == null) return null;
  return { from: base.date, to: last.date, value: last[key] - base[key], base: base[key] };
}

const fmtInt = n => (n == null ? '—' : Number(n).toLocaleString('fr-FR'));
const fmtSigned = n => (n == null ? '—' : (n >= 0 ? '+' : '−') + Math.abs(n).toLocaleString('fr-FR'));

// ───── Page ─────

function pageShell({ body, updated }) {
  const description = "Jeux de données ouverts (CC0) sur l'internet agentique : série quotidienne des compteurs Moltbook, cadence des releases OpenClaw, ordre de grandeur du token $MOLT. Relevés automatiques, sources primaires, méthode publique.";
  return `<!doctype html>
<html lang="fr">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>Jeux de données — L'Agent &amp; Le Quotidien</title>
<meta name="description" content="${escapeHtml(description)}" />
<link rel="canonical" href="${SITE_URL}/datasets/" />
<link rel="alternate" type="application/json" href="${SITE_URL}/datasets/datasets.json" />
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght,SOFT@9..144,300..900,0..100&family=Newsreader:ital,opsz,wght@0,6..72,300..800&family=JetBrains+Mono:wght@400;500&display=swap">
<style>
  :root { --ink: #1A1916; --ink-mute: #5C5852; --rule: #D9D2C5; --paper: #F5F1E8; --accent: #8B2A1F; }
  * { box-sizing: border-box; }
  body { font-family: 'Newsreader', Georgia, serif; background: var(--paper); color: var(--ink); margin: 0; padding: 32px 20px 80px; line-height: 1.55; }
  .container { max-width: 960px; margin: 0 auto; }
  .nav { font-family: 'JetBrains Mono', ui-monospace, monospace; font-size: 12px; letter-spacing: 0.08em; text-transform: uppercase; color: var(--ink-mute); margin-bottom: 20px; }
  .nav a { color: var(--ink-mute); text-decoration: none; border-bottom: 1px solid var(--rule); margin-right: 12px; }
  .nav a:hover { color: var(--accent); }
  h1 { font-family: 'Fraunces', Georgia, serif; font-weight: 700; font-style: italic; font-size: 36px; margin: 0 0 6px; letter-spacing: -0.02em; }
  .lede { color: var(--ink-mute); margin: 0 0 20px; max-width: 68ch; font-size: 17px; }
  .lede-en { color: var(--ink-mute); margin: 0 0 28px; max-width: 68ch; font-size: 14px; font-style: italic; }
  h2 { font-family: 'Fraunces', Georgia, serif; font-size: 24px; margin: 36px 0 4px; padding-top: 24px; border-top: 2px solid var(--rule); }
  .sub { color: var(--ink-mute); margin: 4px 0 14px; max-width: 70ch; font-size: 15px; }
  .files { font-family: 'JetBrains Mono', ui-monospace, monospace; font-size: 12px; display: flex; flex-wrap: wrap; gap: 8px; margin: 0 0 16px; }
  .files a { padding: 4px 10px; border: 1px solid var(--rule); text-decoration: none; color: var(--ink); }
  .files a:hover { border-color: var(--accent); color: var(--accent); }
  .stats { display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 12px; margin: 0 0 16px; }
  .stat { border: 1px solid var(--rule); padding: 10px 14px; background: #faf7f0; }
  .stat .label { font-family: 'JetBrains Mono', ui-monospace, monospace; font-size: 10px; letter-spacing: 0.08em; text-transform: uppercase; color: var(--ink-mute); }
  .stat .value { font-family: 'Fraunces', Georgia, serif; font-size: 22px; margin-top: 4px; }
  .stat .when { font-size: 12px; color: var(--ink-mute); }
  table { border-collapse: collapse; width: 100%; font-size: 13px; font-family: 'JetBrains Mono', ui-monospace, monospace; }
  th, td { text-align: left; padding: 6px 8px; border-bottom: 1px solid var(--rule); white-space: nowrap; }
  th { font-size: 10px; letter-spacing: 0.08em; text-transform: uppercase; color: var(--ink-mute); }
  .tablewrap { overflow-x: auto; }
  .avert { font-family: 'JetBrains Mono', ui-monospace, monospace; font-size: 11px; letter-spacing: 0.04em; color: #6B4E16; background: #F0E6CF; border: 1px solid #D4C4A8; padding: 10px 14px; margin: 16px 0 24px; line-height: 1.6; }
  .footnote { margin-top: 44px; font-size: 13px; color: var(--ink-mute); border-top: 1px solid var(--rule); padding-top: 16px; }
  .footnote a { color: var(--ink-mute); }
  code { font-family: 'JetBrains Mono', ui-monospace, monospace; font-size: 0.9em; }
</style>
</head>
<body>
<div class="container">
  <div class="nav"><a href="/">← L'Agent &amp; Le Quotidien</a><a href="/api">API</a><a href="/llms.txt">llms.txt</a><a href="/tips/">Tips</a></div>
  <h1>Jeux de données</h1>
  <p class="lede">Séries relevées chaque matin par le collecteur du journal sur des sources primaires de l'internet agentique, publiées telles quelles en <strong>CC0</strong>. Dernière mise à jour : ${escapeHtml(updated)}.</p>
  <p class="lede-en">Open datasets (CC0) on the agentic internet — daily Moltbook counters, OpenClaw release cadence, $MOLT order of magnitude — collected automatically from primary sources. Cite as: <em>The Agent &amp; The Weekly, datasets, ${SITE_URL}/datasets/</em>.</p>
  <div class="avert">⚠ Compteurs <strong>déclaratifs</strong> : ce sont les chiffres publiés par les plateformes elles-mêmes (API publique), relevés à l'heure indiquée, non audités. Une valeur manquante = relevé en échec ce jour-là, jamais interpolée. Le cours $MOLT est celui d'un memecoin volatil : ordre de grandeur horodaté, pas une cote.</div>
  ${body}
  <p class="footnote">Méthode : <code>scripts/harvest-primary.mjs</code> (GET brut, zéro LLM, quarantaine) → <code>data/harvest/&lt;date&gt;-primary.json</code> → <code>scripts/build-datasets.mjs</code>. Licence des données : <a href="https://github.com/jeb-maker/lagent-quotidien/blob/main/LICENSE-STATS.md" rel="noopener noreferrer">CC0 1.0</a>. Dépôt : <a href="https://github.com/jeb-maker/lagent-quotidien" rel="noopener noreferrer">jeb-maker/lagent-quotidien</a>.</p>
</div>
</body>
</html>`;
}

function renderTable(columns, rows) {
  return `<div class="tablewrap"><table>
<thead><tr>${columns.map(c => `<th>${escapeHtml(c)}</th>`).join('')}</tr></thead>
<tbody>
${rows.map(r => `<tr>${columns.map(c => `<td>${escapeHtml(r[c] == null ? '—' : String(r[c]))}</td>`).join('')}</tr>`).join('\n')}
</tbody></table></div>`;
}

function datasetJsonLd(name, description, files, updated) {
  return {
    '@type': 'Dataset',
    name,
    description,
    url: `${SITE_URL}/datasets/`,
    license: 'https://creativecommons.org/publicdomain/zero/1.0/',
    isAccessibleForFree: true,
    dateModified: updated,
    creator: { '@type': 'Organization', name: "L'Agent & Le Quotidien / The Agent & The Weekly", url: SITE_URL },
    distribution: files.map(f => ({
      '@type': 'DataDownload',
      encodingFormat: f.endsWith('.csv') ? 'text/csv' : 'application/json',
      contentUrl: `${SITE_URL}/datasets/${f}`
    }))
  };
}

export async function writeDatasets(root) {
  const harvests = await listPrimaryHarvests(root);
  if (!harvests.length) {
    console.log('⚠ datasets : aucun harvest primaire');
    return null;
  }

  const moltbook = [];
  const molt = [];
  const releasesByTag = new Map();
  const missing = { moltbook: [], molt: [] };

  for (const { date, path } of harvests) {
    const h = await readJson(path);
    if (!h) continue;
    const mb = moltbookRow(date, h);
    if (mb) moltbook.push(mb); else missing.moltbook.push(date);
    const mt = moltRow(date, h);
    if (mt) molt.push(mt); else missing.molt.push(date);
    for (const r of openclawReleases(h)) {
      // Même tag revu plusieurs jours : on garde la première observation.
      if (!releasesByTag.has(r.tag)) releasesByTag.set(r.tag, r);
    }
  }
  const releases = [...releasesByTag.values()].sort((a, b) => a.published_at.localeCompare(b.published_at));

  const outDir = join(root, 'datasets');
  await mkdir(outDir, { recursive: true });

  const MB_COLS = ['date', 'collected_at', 'total_agents', 'verified_agents', 'total_posts', 'total_comments', 'total_submolts', 'source_url'];
  const MT_COLS = ['date', 'collected_at', 'price_usd', 'market_cap_usd', 'volume_24h_usd', 'source', 'source_url'];
  const OC_COLS = ['tag', 'name', 'published_at', 'prerelease', 'url'];

  const updated = harvests.at(-1).date;
  const generated_at = new Date().toISOString();
  const common = { license: 'CC0-1.0', generated_at, note: 'Compteurs déclaratifs des plateformes (API publique), relevés quotidiens non audités. Valeur absente = relevé en échec, jamais interpolée.' };

  await writeFile(join(outDir, 'moltbook-stats.csv'), toCsv(MB_COLS, moltbook), 'utf8');
  await writeFile(join(outDir, 'moltbook-stats.json'), `${JSON.stringify({ ...common, dataset: 'moltbook-stats', source: 'https://www.moltbook.com/api/v1/stats', rows: moltbook }, null, 1)}\n`, 'utf8');
  await writeFile(join(outDir, 'molt-token.csv'), toCsv(MT_COLS, molt), 'utf8');
  await writeFile(join(outDir, 'molt-token.json'), `${JSON.stringify({ ...common, dataset: 'molt-token', source: 'CoinGecko (id moltbook) ; secours GeckoTerminal (Base)', rows: molt }, null, 1)}\n`, 'utf8');
  await writeFile(join(outDir, 'openclaw-releases.csv'), toCsv(OC_COLS, releases), 'utf8');
  await writeFile(join(outDir, 'openclaw-releases.json'), `${JSON.stringify({ ...common, dataset: 'openclaw-releases', source: 'https://api.github.com/repos/openclaw/openclaw/releases', rows: releases }, null, 1)}\n`, 'utf8');

  const manifest = {
    generated_at,
    updated,
    license: 'CC0-1.0',
    datasets: [
      { id: 'moltbook-stats', rows: moltbook.length, first: moltbook[0]?.date || null, last: moltbook.at(-1)?.date || null, files: ['moltbook-stats.csv', 'moltbook-stats.json'], columns: MB_COLS },
      { id: 'molt-token', rows: molt.length, first: molt[0]?.date || null, last: molt.at(-1)?.date || null, files: ['molt-token.csv', 'molt-token.json'], columns: MT_COLS },
      { id: 'openclaw-releases', rows: releases.length, first: releases[0]?.published_at?.slice(0, 10) || null, last: releases.at(-1)?.published_at?.slice(0, 10) || null, files: ['openclaw-releases.csv', 'openclaw-releases.json'], columns: OC_COLS }
    ],
    missing_days: missing
  };
  await writeFile(join(outDir, 'datasets.json'), `${JSON.stringify(manifest, null, 2)}\n`, 'utf8');

  // ── Page HTML ──
  const mbLast = moltbook.at(-1);
  const d7 = { agents: delta(moltbook, 'total_agents', 7), posts: delta(moltbook, 'total_posts', 7), comments: delta(moltbook, 'total_comments', 7) };
  const stableLast30 = releases.filter(r => r.prerelease === 'false' && r.published_at >= new Date(Date.now() - 30 * 86400000).toISOString());

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      datasetJsonLd('Moltbook daily counters', 'Daily snapshot of Moltbook public /api/v1/stats counters (agents, verified agents, posts, comments, submolts).', ['moltbook-stats.csv', 'moltbook-stats.json'], updated),
      datasetJsonLd('OpenClaw releases', 'Release tags of openclaw/openclaw observed by the daily harvest (GitHub API), deduplicated.', ['openclaw-releases.csv', 'openclaw-releases.json'], updated),
      datasetJsonLd('$MOLT token daily order of magnitude', 'Daily price, market cap and 24h volume of the $MOLT memecoin (Base), from CoinGecko/GeckoTerminal.', ['molt-token.csv', 'molt-token.json'], updated)
    ]
  };

  const body = `<script type="application/ld+json">${JSON.stringify(jsonLd)}</script>

<h2>Compteurs Moltbook — série quotidienne</h2>
<p class="sub">Relevé de <code>/api/v1/stats</code> (plateforme détenue par Meta). ${moltbook.length} jours du ${escapeHtml(moltbook[0]?.date || '—')} au ${escapeHtml(mbLast?.date || '—')}${missing.moltbook.length ? ` · ${missing.moltbook.length} jour(s) sans relevé` : ''}.</p>
<div class="files"><a href="/datasets/moltbook-stats.csv">moltbook-stats.csv</a><a href="/datasets/moltbook-stats.json">moltbook-stats.json</a></div>
<div class="stats">
  <div class="stat"><div class="label">Agents (dernier relevé)</div><div class="value">${fmtInt(mbLast?.total_agents)}</div><div class="when">${escapeHtml(mbLast?.date || '')}</div></div>
  <div class="stat"><div class="label">Δ agents 7 j</div><div class="value">${fmtSigned(d7.agents?.value)}</div><div class="when">${d7.agents ? `${escapeHtml(d7.agents.from)} → ${escapeHtml(d7.agents.to)}` : ''}</div></div>
  <div class="stat"><div class="label">Δ posts 7 j</div><div class="value">${fmtSigned(d7.posts?.value)}</div><div class="when">${d7.posts ? `${escapeHtml(d7.posts.from)} → ${escapeHtml(d7.posts.to)}` : ''}</div></div>
  <div class="stat"><div class="label">Δ commentaires 7 j</div><div class="value">${fmtSigned(d7.comments?.value)}</div><div class="when">${d7.comments ? `${escapeHtml(d7.comments.from)} → ${escapeHtml(d7.comments.to)}` : ''}</div></div>
</div>
${renderTable(['date', 'total_agents', 'verified_agents', 'total_posts', 'total_comments', 'total_submolts'], moltbook.slice(-14).reverse())}

<h2>Releases OpenClaw</h2>
<p class="sub">Tags observés par le collecteur sur <code>openclaw/openclaw</code> (API GitHub, 5 dernières releases par relevé, dédoublonnées). ${releases.length} releases ; ${stableLast30.length} stable(s) sur les 30 derniers jours. Les releases antérieures au premier relevé ou sorties entre deux relevés très rapprochés peuvent manquer.</p>
<div class="files"><a href="/datasets/openclaw-releases.csv">openclaw-releases.csv</a><a href="/datasets/openclaw-releases.json">openclaw-releases.json</a></div>
${renderTable(['published_at', 'tag', 'prerelease'], releases.slice(-14).reverse())}

<h2>$MOLT — ordre de grandeur quotidien</h2>
<p class="sub">Token ERC-20 sur Base lié à Moltbook, memecoin volatil. ${molt.length} relevés ; source CoinGecko, secours GeckoTerminal. À lire comme un ordre de grandeur horodaté.</p>
<div class="files"><a href="/datasets/molt-token.csv">molt-token.csv</a><a href="/datasets/molt-token.json">molt-token.json</a></div>
${renderTable(['date', 'market_cap_usd', 'volume_24h_usd', 'source'], molt.slice(-7).reverse().map(r => ({ ...r, market_cap_usd: r.market_cap_usd == null ? null : Math.round(r.market_cap_usd), volume_24h_usd: r.volume_24h_usd == null ? null : Math.round(r.volume_24h_usd) })))}

<h2>Manifeste</h2>
<p class="sub">Liste machine des jeux, colonnes et jours manquants : <a href="/datasets/datasets.json"><code>/datasets/datasets.json</code></a>.</p>`;

  await writeFile(join(outDir, 'index.html'), pageShell({ body, updated }), 'utf8');
  console.log(`✓ /datasets/ — moltbook ${moltbook.length} j · openclaw ${releases.length} releases · molt ${molt.length} j`);
  return manifest;
}
