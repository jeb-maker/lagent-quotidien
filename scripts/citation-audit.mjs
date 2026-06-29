#!/usr/bin/env node
// scripts/citation-audit.mjs
//
// Mesure la CITABILITÉ du journal par les IA : est-ce que theagentweekly.com
// apparaît dans les résultats de recherche quand on interroge un moteur sur un
// sujet couvert par le journal ?
//
// ───── Pourquoi ce script existe ─────
// La stratégie (data/strategie.md §3) place le **public A — modèles / crawlers
// IA** comme socle : l'objectif n'est pas l'engagement social, mais la
// **citabilité** (présence dans les réponses IA). data/stats.json confirme que
// le trafic est dominé par GPTBot, ClaudeBot, OAI-SearchBot, PerplexityBot…
// Ce script est l'instrument de mesure : il génère des queries naturelles sur
// les sujets couverts par les dernières éditions, interroge un moteur de
// recherche, et note si le journal apparaît dans les résultats.
//
// ───── Approche (zéro dépendance, zéro clé API) ─────
//  1. Lire les 4 dernières éditions (editions/2026-W*/edition.json).
//  2. Extraire des sujets : titre du lede EN, titres des headlines EN, noms
//     d'entités du carnet, tickers du marché. Construire une query de recherche
//     naturelle en anglais par sujet.
//  3. Pour chaque query : GET https://html.duckduckgo.com/html/?q=... — pas de
//     clé, parsing HTML minimal (regex sur les blocs de résultats).
//  4. Chercher `theagentweekly.com` dans les résultats retournés.
//  5. Persister le rapport dans data/citation-audit/<date>.json.
//
// ───── Limites ─────
//  - DuckDuckGo peut bloquer (rate limit, captcha) ou renvoyer du HTML inattendu.
//    Dans ce cas, on enregistre { found: false, error: "..." } sans faire échouer
//    le script.
//  - Les résultats ne sont pas exhaustifs : la SERP DDG HTML n'est pas la SERP
//    vue par ChatGPT/Perplexity, et encore moins ce qu'un modèle connaît en
//    interne. C'est un proxy, pas une mesure directe de la citation par un LLM.
//  - Délai de 1,5 s entre requêtes pour rester poli.
//  - Le nombre de résultats parsés est limité (~30 par page DDG).
//
// Usage :
//   node scripts/citation-audit.mjs
//   node scripts/citation-audit.mjs --weeks=2026-W27,2026-W26
//   node scripts/citation-audit.mjs --limit=8   # cap du nombre de queries

import { readdir, readFile, writeFile, mkdir, stat } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = dirname(__dirname);
const EDITIONS_DIR = join(ROOT, 'editions');
const OUT_DIR = join(ROOT, 'data', 'citation-audit');

const UA = 'theagentweekly-citation-audit/1.0 (+https://theagentweekly.com)';
const SITE_DOMAIN = 'theagentweekly.com';
const DDG_URL = 'https://html.duckduckgo.com/html/?q=';
const DELAY_MS = 1500;

const args = Object.fromEntries(
  process.argv.slice(2)
    .filter(a => a.startsWith('--'))
    .map(a => { const i = a.indexOf('='); return i < 0 ? [a.slice(2), true] : [a.slice(2, i), a.slice(i + 1)]; })
);
const LIMIT = args.limit ? Number(args.limit) : null;
const WEEKS_FILTER = args.weeks ? String(args.weeks).split(',').map(w => w.trim()).filter(Boolean) : null;
const DATE = new Date().toISOString().slice(0, 10);

const nowISO = () => new Date().toISOString();
const sleep = ms => new Promise(r => setTimeout(r, ms));

// ───── Découverte des éditions ─────
async function listEditionWeeks() {
  if (WEEKS_FILTER) return WEEKS_FILTER;
  const entries = await readdir(EDITIONS_DIR);
  const weeks = [];
  for (const e of entries) {
    if (!/^2026-W\d{2}$/.test(e)) continue;
    const p = join(EDITIONS_DIR, e, 'edition.json');
    try { await stat(p); weeks.push(e); } catch { /* pas une édition */ }
  }
  weeks.sort();
  return weeks.slice(-4);
}

// ───── Utilitaires d'extraction ─────
function stripHtml(s) {
  return String(s || '')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&[a-z]+;/gi, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

// Transforme un titre en query de recherche naturelle (EN, court).
function titleToQuery(title) {
  const clean = stripHtml(title);
  if (!clean) return null;
  // Garde les mots clés, retire la ponctuation lourde, plafonne à ~60 chars.
  let q = clean.replace(/[—–\-–]+/g, ' ').replace(/["""']/g, '').replace(/\s+/g, ' ').trim();
  if (q.length > 80) q = q.slice(0, 80).replace(/\s+\S*$/, '');
  return q || null;
}

// Extrait les sujets couverts par une édition.
function extractSubjects(edition, week) {
  const out = [];
  const seen = new Set();
  const add = (query, source_subject, kind) => {
    if (!query) return;
    const q = query.toLowerCase();
    if (seen.has(q)) return;
    seen.add(q);
    out.push({ query, source_subject: source_subject || query, source_week: week, kind });
  };

  // 1. Lede (titre EN simplifié)
  const ledeTitle = edition?.lede?.headline_html?.en;
  if (ledeTitle) add(titleToQuery(ledeTitle), stripHtml(ledeTitle), 'lede');

  // 2. Headlines (titres EN)
  for (const h of edition?.headlines || []) {
    const t = h?.title_html?.en;
    if (t) add(titleToQuery(t), stripHtml(t), 'headline');
  }

  // 3. Ticker (phrases EN — on garde un extrait court)
  for (const t of edition?.ticker || []) {
    const txt = t?.text_en;
    if (!txt) continue;
    // On prend les 5-6 premiers mots comme query.
    const q = stripHtml(txt).split(' ').slice(0, 6).join(' ');
    if (q && q.length > 10) add(q, q, 'ticker');
  }

  // 4. Breves (titres EN)
  for (const b of edition?.breves || []) {
    const t = b?.title?.en;
    if (t) add(titleToQuery(t), stripHtml(t), 'breve');
  }

  // 5. Carnet — noms d'entités (agents / personnes)
  const people = edition?.carnet?.people || [];
  for (const p of people) {
    const name = p?.name;
    if (!name) continue;
    add(`what is ${name}`, name, 'carnet-entity');
  }

  // 6. Market — tickers (SHOPIFY, GUILD, MOLT, OPENCLAW…)
  for (const row of edition?.market?.rows || []) {
    const tk = row?.ticker;
    if (!tk) continue;
    add(`${tk.toLowerCase()} agentic AI`, tk, 'market-ticker');
  }

  return out;
}

// ───── Parsing de la SERP DuckDuckGo HTML ─────
// DDG HTML renvoie des blocs <a class="result__a" href="...">titre</a> avec un
// <a class="result__snippet">. L'URL réelle est encodée dans un redirect
// `//duckduckgo.com/l/?uddg=<url encodée>`.
function parseDdgResults(html) {
  const results = [];
  const re = /<a[^>]+class="result__a"[^>]*href="([^"]+)"[^>]*>([\s\S]*?)<\/a>[\s\S]*?<a[^>]+class="result__snippet"[^>]*>([\s\S]*?)<\/a>/g;
  let m;
  let pos = 0;
  while ((m = re.exec(html)) !== null) {
    let url = m[1];
    // Décodage du wrapper DDG : //duckduckgo.com/l/?uddg=<encoded>&rut=...
    const u = /uddg=([^&]+)/.exec(url);
    if (u) {
      try { url = decodeURIComponent(u[1]); } catch { /* garde l'URL brute */ }
    }
    const title = stripHtml(m[2]);
    const snippet = stripHtml(m[3]);
    results.push({ url, title, snippet, position: pos + 1 });
    pos++;
    if (pos >= 30) break;
  }
  return results;
}

// ───── Recherche de theagentweekly.com dans la SERP ─────
function findSite(results, domain) {
  for (const r of results) {
    try {
      const host = new URL(r.url).hostname;
      if (host === domain || host.endsWith('.' + domain)) return r;
    } catch {
      // URL invalide, ignore
    }
    // Fallback : recherche du domaine dans l'URL brute.
    if (r.url && r.url.includes(domain)) return r;
  }
  return null;
}

// ───── Une query ─────
async function runQuery(subject) {
  const url = DDG_URL + encodeURIComponent(subject.query);
  const checked_at = nowISO();
  try {
    const r = await fetch(url, {
      headers: { 'User-Agent': UA, 'Accept': 'text/html', 'Accept-Language': 'en-US,en;q=0.9' },
      redirect: 'manual'
    });
    if (r.status >= 400) {
      return { ...subject, found: false, error: `http ${r.status}`, checked_at };
    }
    const html = await r.text();
    // Détection de blocage DDG (page "unusual traffic" / captcha).
    if (/an unusual amount of automated|unusual traffic|captcha|blocked/i.test(html) && html.length < 8000) {
      return { ...subject, found: false, error: 'ddg_blocked (captcha/unusual traffic)', checked_at };
    }
    const results = parseDdgResults(html);
    if (results.length === 0) {
      return { ...subject, found: false, error: 'no_results_parsed', checked_at, raw_bytes: html.length };
    }
    const hit = findSite(results, SITE_DOMAIN);
    if (hit) {
      return {
        ...subject,
        found: true,
        position: hit.position,
        snippet: hit.snippet.slice(0, 300),
        url: hit.url,
        total_results_seen: results.length,
        checked_at
      };
    }
    return {
      ...subject,
      found: false,
      total_results_seen: results.length,
      checked_at
    };
  } catch (e) {
    return { ...subject, found: false, error: e.message, checked_at };
  }
}

// ───── Main ─────
const weeks = await listEditionWeeks();
console.log(`Éditions scannées : ${weeks.join(', ') || '(aucune)'}`);

let subjects = [];
for (const w of weeks) {
  const p = join(EDITIONS_DIR, w, 'edition.json');
  let raw;
  try { raw = await readFile(p, 'utf8'); }
  catch { console.log(`  ${w}: edition.json introuvable, skip`); continue; }
  let edition;
  try { edition = JSON.parse(raw); }
  catch { console.log(`  ${w}: JSON invalide, skip`); continue; }
  const subs = extractSubjects(edition, w);
  console.log(`  ${w}: ${subs.length} sujets extraits`);
  subjects.push(...subs);
}

// Déduplication cross-éditions (une query identique = un seul test).
const dedup = new Map();
for (const s of subjects) {
  const k = s.query.toLowerCase();
  if (!dedup.has(k)) dedup.set(k, s);
}
subjects = [...dedup.values()];

if (LIMIT && subjects.length > LIMIT) {
  console.log(`Limitation à ${LIMIT} queries (sur ${subjects.length})`);
  subjects = subjects.slice(0, LIMIT);
}

console.log(`\nTotal queries à tester : ${subjects.length}`);
console.log(`Délai entre requêtes : ${DELAY_MS} ms\n`);

await mkdir(OUT_DIR, { recursive: true });

const queries = [];
let foundCount = 0;
for (let i = 0; i < subjects.length; i++) {
  const s = subjects[i];
  process.stdout.write(`  [${i + 1}/${subjects.length}] "${s.query}" … `);
  const res = await runQuery(s);
  queries.push(res);
  if (res.found) foundCount++;
  const tag = res.found
    ? `✓ pos ${res.position}`
    : (res.error ? `✗ ${res.error}` : 'absent');
  console.log(tag);
  if (i < subjects.length - 1) await sleep(DELAY_MS);
}

const total = queries.length;
const report = {
  date: DATE,
  generated_at: nowISO(),
  site_audited: SITE_DOMAIN,
  source: 'DuckDuckGo HTML (https://html.duckduckgo.com/html/)',
  note: 'Proxy de citabilité : mesure la présence dans une SERP web, pas la citation directe par un LLM. Voir en-tête du script pour les limites.',
  queries,
  summary: {
    total_queries: total,
    found_count: foundCount,
    found_pct: total ? Math.round((foundCount / total) * 100) : 0,
    by_kind: subjects.reduce((acc, s) => {
      acc[s.kind] = (acc[s.kind] || 0) + 1;
      return acc;
    }, {}),
    errors: queries.filter(q => q.error && !q.found).length
  }
};

const outPath = join(OUT_DIR, `${DATE}.json`);
await writeFile(outPath, JSON.stringify(report, null, 2));
console.log(`\n✓ ${outPath}`);
console.log(`  Trouvés : ${foundCount}/${total} (${report.summary.found_pct} %)`);
