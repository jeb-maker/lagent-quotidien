#!/usr/bin/env node
// scripts/edition-report.mjs
// Lit data/stats.json, agrège par édition les 7 jours post-bouclage,
// sort un tableau pour guider les choix éditoriaux.
//
// Usage : node scripts/edition-report.mjs
// Usage : node scripts/edition-report.mjs --json   # sortie JSON

import { readFileSync, readdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const AS_JSON = process.argv.includes('--json');

const statsPath = join(ROOT, 'data', 'stats.json');
let stats;
try {
  stats = JSON.parse(readFileSync(statsPath, 'utf8'));
} catch (e) {
  console.error(`Impossible de lire ${statsPath}: ${e.message}`);
  process.exit(1);
}

if (!stats.length) {
  console.log('Aucune donnée stats.');
  process.exit(0);
}

// Convertir une date YYYY-MM-DD en semaine ISO
function isoWeek(dateStr) {
  const d = new Date(dateStr + 'T00:00:00Z');
  const dayNum = d.getUTCDay() || 7;
  d.setUTCDate(d.getUTCDate() + 4 - dayNum);
  const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
  const weekNo = Math.ceil((((d - yearStart) / 86400000) + 1) / 7);
  return `${d.getUTCFullYear()}-W${String(weekNo).padStart(2, '0')}`;
}

// Lire les éditions existantes pour connaître les dates de bouclage
function getEditions() {
  const editions = {};
  try {
    const dirs = readdirSync(join(ROOT, 'editions'), { withFileTypes: true });
    for (const d of dirs) {
      if (!d.isDirectory() || !/^\d{4}-W\d{2}$/.test(d.name)) continue;
      try {
        const meta = JSON.parse(readFileSync(join(ROOT, 'editions', d.name, 'edition.json'), 'utf8'))._meta;
        editions[d.name] = meta.bouclage ? meta.bouclage.slice(0, 10) : null;
      } catch {}
    }
  } catch {}
  return editions;
}

// Agrégation : pour chaque édition, on somme les 7 jours suivant son bouclage
function aggregate(stats, editions) {
  const report = {};

  for (const [week, bouclage] of Object.entries(editions)) {
    if (!bouclage) continue;
    const start = new Date(bouclage + 'T00:00:00Z');
    const end = new Date(start);
    end.setUTCDate(end.getUTCDate() + 7);
    const endStr = end.toISOString().slice(0, 10);
    const startStr = start.toISOString().slice(0, 10);

    let totalPv = 0, totalReq = 0, totalUniq = 0, aiBotReq = 0;
    const botCounts = {};
    const urlHits = {};

    for (const s of stats) {
      if (s.date >= startStr && s.date < endStr) {
        totalPv += s.cloudflare?.pageViews || 0;
        totalReq += s.cloudflare?.requests || 0;
        totalUniq += s.cloudflare?.uniques || 0;

        const bots = s.cloudflare?.user_agents?.ai_bots_detail || {};
        for (const [name, count] of Object.entries(bots)) {
          botCounts[name] = (botCounts[name] || 0) + count;
          aiBotReq += count;
        }

        for (const u of s.cloudflare?.top_urls || []) {
          if (u.path.startsWith('/editions/')) {
            urlHits[u.path] = (urlHits[u.path] || 0) + u.hits;
          }
        }
      }
    }

    if (totalReq === 0 && totalPv === 0) continue;

    const topBot = Object.entries(botCounts).sort((a, b) => b[1] - a[1])[0];
    const topUrl = Object.entries(urlHits).sort((a, b) => b[1] - a[1])[0];
    const botPct = totalReq > 0 ? Math.round((aiBotReq / totalReq) * 100) : 0;

    report[week] = {
      bouclage,
      pv: totalPv,
      req: totalReq,
      uniq: totalUniq,
      bots: botPct,
      top_bot: topBot ? `${topBot[0]} (${topBot[1]})` : '—',
      top_url: topUrl ? `${topUrl[0]} (${topUrl[1]} hits)` : '—',
    };
  }

  return report;
}

const editions = getEditions();
const report = aggregate(stats, editions);

const weeks = Object.keys(report).sort();

if (AS_JSON) {
  console.log(JSON.stringify(report, null, 2));
  process.exit(0);
}

// En-tête
console.log('Édition    Bouclage    Pages V  Requêtes Uniques  %Bots  Top Bot             Top URL');
console.log('─'.repeat(100));

for (const w of weeks) {
  const r = report[w];
  const pv = String(r.pv).padStart(7);
  const req = String(r.req).padStart(8);
  const uq = String(r.uniq).padStart(7);
  const bot = `${r.bots}%`.padStart(5);
  const botDetail = r.top_bot.padEnd(18).slice(0, 18);
  const detail = r.top_url.length > 30 ? r.top_url.slice(0, 30) + '…' : r.top_url.padEnd(33);
  console.log(`${w}  ${r.bouclage}  ${pv} ${req} ${uq}  ${bot}  ${botDetail}  ${detail}`);
}

console.log('');
console.log(`${weeks.length} édition(s) avec données stats.`);
