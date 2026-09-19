#!/usr/bin/env node
// Rapport d'audience reproductible depuis les statistiques Cloudflare et Bluesky.
// Aucune identite individuelle n'est collectee.

import { readFileSync, readdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(fileURLToPath(new URL('..', import.meta.url)));
const STATS_PATH = join(ROOT, 'data', 'stats.json');
const BSKY_PATH = join(ROOT, 'data', 'bluesky-stats.jsonl');
const EDITIONS_PATH = join(ROOT, 'editions');
const OUTPUT_PATH = join(ROOT, 'data', 'audience-report.json');
const AS_JSON = process.argv.includes('--json');
const CATEGORY_KEYS = ['ai_bot', 'search_engine', 'attack', 'cli', 'other'];

function readJson(path, fallback) {
  try { return JSON.parse(readFileSync(path, 'utf8')); } catch { return fallback; }
}

function readJsonl(path) {
  try {
    return readFileSync(path, 'utf8').split('\n').filter(Boolean).map(line => JSON.parse(line));
  } catch {
    return [];
  }
}

function addUrlHits(target, rows) {
  for (const row of rows) {
    for (const item of row.cloudflare?.top_urls || []) {
      target[item.path] = (target[item.path] || 0) + (Number(item.hits) || 0);
    }
  }
}

function summarize(rows) {
  const categories = Object.fromEntries(CATEGORY_KEYS.map(key => [key, 0]));
  const aiBots = {};
  const urls = {};
  const totals = { requests: 0, page_views: 0, reported_uniques: 0, days: rows.length };

  for (const row of rows) {
    const cloudflare = row.cloudflare || {};
    totals.requests += Number(cloudflare.requests) || 0;
    totals.page_views += Number(cloudflare.pageViews) || 0;
    totals.reported_uniques += Number(cloudflare.uniques) || 0;
    for (const key of CATEGORY_KEYS) {
      categories[key] += Number(cloudflare.user_agents?.categories?.[key]) || 0;
    }
    for (const [name, count] of Object.entries(cloudflare.user_agents?.ai_bots_detail || {})) {
      aiBots[name] = (aiBots[name] || 0) + (Number(count) || 0);
    }
  }

  addUrlHits(urls, rows);
  const topUrls = Object.entries(urls)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 15)
    .map(([path, hits]) => ({ path, hits }));
  const topAiBots = Object.entries(aiBots)
    .sort((a, b) => b[1] - a[1])
    .map(([name, requests]) => ({ name, requests }));

  return { ...totals, categories, top_ai_bots: topAiBots, top_urls: topUrls };
}

function dateRange(rows) {
  return rows.length ? { from: rows[0].date, to: rows.at(-1).date } : null;
}

function rollingWindows(stats) {
  return Object.fromEntries([7, 30, 90].map(days => {
    const rows = stats.slice(-days);
    return [`${days}d`, { ...dateRange(rows), ...summarize(rows) }];
  }));
}

function loadEditions() {
  return readdirSync(EDITIONS_PATH, { withFileTypes: true })
    .filter(entry => entry.isDirectory() && /^\d{4}-W\d{2}$/.test(entry.name))
    .map(entry => {
      const edition = readJson(join(EDITIONS_PATH, entry.name, 'edition.json'), null);
      return { week: entry.name, edition };
    })
    .filter(({ edition }) => edition?._meta?.draft !== true && edition?._meta?.bouclage);
}

function editionWindows(stats, editions) {
  return Object.fromEntries(editions.map(({ week, edition }) => {
    const bouclage = edition._meta.bouclage.slice(0, 10);
    const windows = {};
    for (const days of [7, 14, 28]) {
      const end = new Date(`${bouclage}T00:00:00Z`);
      end.setUTCDate(end.getUTCDate() + days);
      const endDate = end.toISOString().slice(0, 10);
      const rows = stats.filter(row => row.date >= bouclage && row.date < endDate);
      windows[`${days}d`] = { ...dateRange(rows), ...summarize(rows) };
    }
    return [week, { bouclage, windows }];
  }));
}

function blueskySummary(records) {
  const latest = records.at(-1);
  const previous = records.at(-2);
  if (!latest) return null;
  const delta = key => previous ? (Number(latest[key]) || 0) - (Number(previous[key]) || 0) : null;
  return {
    date: latest.date,
    handle: latest.handle,
    followers: latest.followers || 0,
    follows: latest.follows || 0,
    posts_total: latest.posts_total || 0,
    posts_sampled: latest.posts_sampled || 0,
    engagement: latest.engagement || {},
    delta_from_previous_snapshot: {
      followers: delta('followers'),
      posts_total: delta('posts_total')
    }
  };
}

const stats = readJson(STATS_PATH, []).sort((a, b) => String(a.date).localeCompare(String(b.date)));
const bsky = readJsonl(BSKY_PATH);
const report = {
  report_type: 'audience',
  as_of: stats.at(-1)?.date || null,
  rolling: rollingWindows(stats),
  editions: editionWindows(stats, loadEditions()),
  bluesky: blueskySummary(bsky),
  interpretation: {
    reported_uniques: 'Cloudflare aggregate, not a count of identified people.',
    user_agents: 'Observations from the adaptive user-agent query; categories are not page views and may use a different window.',
    human_audience: 'No individual tracking. Human-likely traffic is intentionally not asserted from these aggregates.'
  }
};

writeFileSync(OUTPUT_PATH, `${JSON.stringify(report, null, 2)}\n`, 'utf8');

if (AS_JSON) {
  console.log(JSON.stringify(report, null, 2));
} else {
  const week = report.rolling['7d'];
  console.log(`Audience report ${report.as_of || 'sans données'}`);
  console.log(`7 jours : ${week.page_views} page views · ${week.reported_uniques} uniques Cloudflare rapportés · ${week.categories.ai_bot} observations bots IA`);
  console.log(`Bluesky : ${report.bluesky?.followers ?? 0} followers · ${report.bluesky?.engagement?.likes_total ?? 0} likes sur l'échantillon récent`);
  console.log(`Écrit : ${OUTPUT_PATH}`);
}
