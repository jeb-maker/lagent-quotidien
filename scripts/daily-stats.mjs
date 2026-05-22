#!/usr/bin/env node
// scripts/daily-stats.mjs
// Collecte quotidienne : Cloudflare GraphQL (24h glissantes) + Bluesky public API.
// Append au tableau data/stats.json. Pas d'écriture si déjà run pour la date.

import { readFile, writeFile } from 'node:fs/promises';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const REPO = join(__dirname, '..');

const ENV_FILE = '/home/debian/.config/cloudflare/env';
async function loadEnv(path) {
  const text = await readFile(path, 'utf8');
  for (const line of text.split('\n')) {
    const m = line.match(/^([A-Z_]+)=(.*)$/);
    if (m) process.env[m[1]] = m[2].replace(/^["']|["']$/g, '');
  }
}
await loadEnv(ENV_FILE);

const { CLOUDFLARE_API_TOKEN: TOKEN, CLOUDFLARE_ZONE_ID: ZONE } = process.env;
if (!TOKEN || !ZONE) {
  console.error('Missing CLOUDFLARE_API_TOKEN or CLOUDFLARE_ZONE_ID in', ENV_FILE);
  process.exit(1);
}

const BSKY_HANDLE = 'cuvee-42.theagentweekly.com';

const sinceISO = new Date(Date.now() - 24 * 3600 * 1000).toISOString().replace(/\.\d+Z$/, 'Z');
const untilISO = new Date().toISOString().replace(/\.\d+Z$/, 'Z');
const today = new Date().toISOString().slice(0, 10);

const AI_BOT_RE = /GPTBot|ClaudeBot|anthropic-ai|Google-Extended|CCBot|PerplexityBot|cohere-ai|YouBot|Diffbot|Bytespider|FacebookBot|Applebot-Extended|Amazonbot|OAI-SearchBot|ChatGPT-User|Claude-Web|Aranet|Nuggets|Meta-ExternalAgent/i;
const ATTACK_RE = /wp-admin|wp-includes|wlwmanifest|xmlrpc|CMS-Checker|\.env|sqlmap|nikto/i;
const SEARCH_RE = /bingbot|Googlebot|DuckDuckBot|YandexBot|Baiduspider|MJ12bot|SemrushBot|AhrefsBot/i;
const CLI_RE = /^curl|^wget|^python-requests|^Go-http|^Java\/|^okhttp|^libwww|^aiohttp|Dalvik|NetAPI/i;

async function cfGraphQL(query) {
  const res = await fetch('https://api.cloudflare.com/client/v4/graphql', {
    method: 'POST',
    headers: { Authorization: `Bearer ${TOKEN}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ query })
  });
  const data = await res.json();
  if (data.errors) throw new Error('GraphQL: ' + JSON.stringify(data.errors));
  return data.data;
}

async function cfDailyTotals() {
  const day = today;
  const q = `query { viewer { zones(filter: {zoneTag: "${ZONE}"}) { httpRequests1dGroups(limit: 1, filter: {date: "${day}"}) { sum { requests pageViews bytes } uniq { uniques } } } } }`;
  const d = await cfGraphQL(q);
  const g = d.viewer.zones[0].httpRequests1dGroups[0] || {};
  return {
    requests: g.sum?.requests ?? 0,
    pageViews: g.sum?.pageViews ?? 0,
    bytes: g.sum?.bytes ?? 0,
    uniques: g.uniq?.uniques ?? 0
  };
}

async function cfTopUserAgents() {
  const q = `query { viewer { zones(filter: {zoneTag: "${ZONE}"}) { httpRequestsAdaptiveGroups(limit: 100, filter: {datetime_geq: "${sinceISO}", datetime_leq: "${untilISO}"}, orderBy: [count_DESC]) { count dimensions { userAgent } } } } }`;
  const d = await cfGraphQL(q);
  const groups = d.viewer.zones[0].httpRequestsAdaptiveGroups;
  const cats = { ai_bot: 0, search_engine: 0, attack: 0, cli: 0, other: 0 };
  const aiBots = {};
  let total = 0;
  for (const g of groups) {
    const ua = g.dimensions.userAgent;
    total += g.count;
    if (AI_BOT_RE.test(ua)) {
      cats.ai_bot += g.count;
      const m = ua.match(/(GPTBot|ClaudeBot|anthropic-ai|Google-Extended|CCBot|PerplexityBot|cohere-ai|YouBot|Diffbot|Bytespider|Applebot-Extended|Amazonbot|OAI-SearchBot|ChatGPT-User|Claude-Web|Aranet-SearchBot|NuggetsBot|Meta-ExternalAgent)/i);
      if (m) aiBots[m[1]] = (aiBots[m[1]] || 0) + g.count;
    } else if (ATTACK_RE.test(ua)) cats.attack += g.count;
    else if (SEARCH_RE.test(ua)) cats.search_engine += g.count;
    else if (CLI_RE.test(ua)) cats.cli += g.count;
    else cats.other += g.count;
  }
  return { categories: cats, ai_bots_detail: aiBots, total_categorized: total };
}

async function cfTopUrls() {
  const q = `query { viewer { zones(filter: {zoneTag: "${ZONE}"}) { httpRequestsAdaptiveGroups(limit: 10, filter: {datetime_geq: "${sinceISO}", datetime_leq: "${untilISO}", edgeResponseStatus: 200}, orderBy: [count_DESC]) { count dimensions { clientRequestPath } } } } }`;
  const d = await cfGraphQL(q);
  return d.viewer.zones[0].httpRequestsAdaptiveGroups.map(g => ({
    path: g.dimensions.clientRequestPath,
    hits: g.count
  }));
}

async function bskyStats() {
  const profile = await fetch(`https://public.api.bsky.app/xrpc/app.bsky.actor.getProfile?actor=${BSKY_HANDLE}`).then(r => r.json());
  const feed = await fetch(`https://public.api.bsky.app/xrpc/app.bsky.feed.getAuthorFeed?actor=${BSKY_HANDLE}&limit=30`).then(r => r.json());
  // getAuthorFeed inclut les reposts d'autres comptes : on filtre par DID
  // pour ne mesurer que l'engagement des posts originaux de cuvee-42.
  const posts = (feed.feed || []).filter(f => f.post?.author?.did === profile.did).map(f => f.post);
  const engagement = posts.reduce((acc, p) => ({
    likes: acc.likes + (p.likeCount || 0),
    reposts: acc.reposts + (p.repostCount || 0),
    replies: acc.replies + (p.replyCount || 0),
    quotes: acc.quotes + (p.quoteCount || 0)
  }), { likes: 0, reposts: 0, replies: 0, quotes: 0 });
  return {
    handle: profile.handle,
    followers: profile.followersCount,
    follows: profile.followsCount,
    posts_total: profile.postsCount,
    engagement_recent_30: { ...engagement, posts_sampled: posts.length }
  };
}

const statsPath = join(REPO, 'data', 'stats.json');
let allStats = [];
try { allStats = JSON.parse(await readFile(statsPath, 'utf8')); } catch {}
if (allStats.find(e => e.date === today)) {
  console.log(`${today} déjà présent dans data/stats.json — skip`);
  process.exit(0);
}

const [cfTotals, cfUAs, cfUrls, bsky] = await Promise.all([
  cfDailyTotals(), cfTopUserAgents(), cfTopUrls(), bskyStats()
]);

const entry = {
  date: today,
  collected_at: new Date().toISOString(),
  cloudflare: { ...cfTotals, user_agents: cfUAs, top_urls: cfUrls },
  bluesky: bsky
};

allStats.push(entry);
await writeFile(statsPath, JSON.stringify(allStats, null, 2), 'utf8');

console.log(`${today} · pv=${cfTotals.pageViews} uniq=${cfTotals.uniques} ai_bots=${cfUAs.categories.ai_bot} attacks=${cfUAs.categories.attack} · bsky followers=${bsky.followers} engagement=${bsky.engagement_recent_30.likes}L/${bsky.engagement_recent_30.reposts}R/${bsky.engagement_recent_30.replies}C`);
