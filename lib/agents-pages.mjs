import { writeFile, mkdir } from 'node:fs/promises';
import { join } from 'node:path';
import { SITE_URL } from './constants.mjs';

export const slugOf = h => {
  if (h.startsWith('@')) return h.slice(1);
  return h.toLowerCase()
    .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
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
  const kindLabel = kind === 'platform' ? 'Plateforme' : 'Agent';
  const lead = entity.summary || '';

  const editions = (entity.appeared_in_editions || [])
    .map(w => `<a href="/editions/${w}/fr.md">${w}</a>`)
    .join('') || '<span style="color:var(--ink-mute)">Aucune apparition enregistrée</span>';

  let content = '';
  const profileRows = [
    entity.category && ['Catégorie', entity.category],
    entity.platform && ['Plateforme', entity.platform],
    entity.url && ['Site', `<a href="${entity.url}" rel="noopener">${entity.url.replace(/^https?:\/\//, '')}</a>`],
  ].filter(Boolean);
  if (profileRows.length) {
    content += '<h2>Profil</h2><div class="profile">';
    for (const [k, v] of profileRows) content += `<span>${k}</span> ${v}<br/>`;
    content += '</div>';
  }
  if (entity.facts?.length) {
    content += '<h2>Faits</h2><ul class="posts">';
    for (const f of entity.facts) content += `<li><div class="summary">${f}</div></li>`;
    content += '</ul>';
  }
  if (entity.sources?.length) {
    content += '<h2>Sources</h2><ul class="ref-list">';
    for (const s of entity.sources) content += `<li><span class="name"><a href="${s.url}" rel="noopener">${s.label}</a></span></li>`;
    content += '</ul>';
  }
  content += `<h2>Apparitions dans le journal</h2><div class="editions">${editions}</div>`;

  return `<!doctype html>
<html lang="fr">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>${handle} — Annuaire — L'Agent & Le Quotidien</title>
<meta name="description" content="Fiche ${kindLabel.toLowerCase()} : ${handle} — entité réelle de l'écosystème agentique, faits sourcés. L'Agent & Le Quotidien." />
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
  <div class="nav"><a href="/">← L'Agent &amp; Le Quotidien</a> · <a href="/agents">Annuaire</a></div>
  <div class="kind ${kind}">${kindLabel}</div>
  <h1 class="${titleClass}">${handle}</h1>
  <p class="voice">${lead}</p>
  ${content}
  <div class="small">Annuaire de l'écosystème agentique réel — entités et faits sourcés · L'Agent &amp; Le Quotidien.</div>
</div>
</body>
</html>
`;
}

function renderAgentsIndex(peopleData) {
  const cards = (arr, kind) => arr.map(e => {
    const slug = slugOf(e.name);
    return `<a class="card" href="/agents/${slug}">
  <span class="pill ${kind === 'platform' ? 'institution' : 'agent'}">${kind === 'platform' ? 'Plateforme' : 'Agent'}</span>
  <div class="h">${e.name}</div>
  <div class="v">${e.summary || ''}</div>
</a>`;
  }).join('\n');

  const refList = (arr) => arr.map(e =>
    `<li><span class="name">${e.url ? `<a href="${e.url}" rel="noopener">${e.name}</a>` : e.name}</span> <span class="role">${e.role || ''}</span></li>`
  ).join('\n');

  return `<!doctype html>
<html lang="fr">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>Annuaire de l'écosystème agentique — L'Agent & Le Quotidien</title>
<meta name="description" content="Annuaire factuel des plateformes et agents IA réels couverts par L'Agent & Le Quotidien. Faits sourcés." />
<link rel="canonical" href="${SITE_URL}/agents" />
<meta property="og:type" content="website" />
<meta property="og:title" content="Annuaire de l'écosystème agentique — L'Agent & Le Quotidien" />
<meta property="og:description" content="Plateformes et agents IA réels, faits sourcés." />
<meta property="og:url" content="${SITE_URL}/agents" />
${fontsLink}
<style>${agentsCss}</style>
</head>
<body>
<div class="container">
  <div class="nav"><a href="/">← L'Agent &amp; Le Quotidien</a></div>
  <h1>Annuaire de l'écosystème agentique</h1>
  <p class="voice">Les plateformes et agents IA <strong>réels</strong> que le journal couvre. Chaque fiche est factuelle et sourcée — aucune entité fictive.</p>

  <div class="section-intro">Plateformes · ${peopleData.platforms.length}</div>
  <div class="grid">
${cards(peopleData.platforms, 'platform')}
  </div>

  <div class="section-intro">Agents · ${peopleData.agents.length}</div>
  <div class="grid">
${cards(peopleData.agents, 'agent')}
  </div>

  <div class="section-intro">Sources &amp; médias cités · ${peopleData.outlets.length}</div>
  <ul class="ref-list">
${refList(peopleData.outlets)}
  </ul>

  <div class="small">Annuaire factuel : toutes les entités listées sont réelles et rattachées à des sources vérifiables. Mis à jour au fil des éditions.</div>
</div>
</body>
</html>
`;
}

/** @returns {Promise<string[]>} URLs des fiches agents pour le sitemap */
export async function writeAgentPages(root, peopleData) {
  await mkdir(join(root, 'agents'), { recursive: true });
  const agentUrls = [];
  for (const p of peopleData.platforms) {
    const slug = slugOf(p.name);
    await writeFile(join(root, 'agents', `${slug}.html`), renderAgentPage(p, 'platform'), 'utf8');
    agentUrls.push(`${SITE_URL}/agents/${slug}`);
  }
  for (const a of peopleData.agents) {
    const slug = slugOf(a.name);
    await writeFile(join(root, 'agents', `${slug}.html`), renderAgentPage(a, 'agent'), 'utf8');
    agentUrls.push(`${SITE_URL}/agents/${slug}`);
  }
  await writeFile(join(root, 'agents', 'index.html'), renderAgentsIndex(peopleData), 'utf8');
  console.log(`✓ /agents : ${peopleData.platforms.length + peopleData.agents.length} fiches réelles + index`);
  return agentUrls;
}
