#!/usr/bin/env node
// scripts/bluesky-stats.mjs
// Capture une photo hebdomadaire des métriques du compte cuvee-42 sur Bluesky.
// Stocke en JSONL dans data/bluesky-stats.jsonl pour suivi historique.
//
// Métriques : followers/follows/posts totaux, et pour les ~50 derniers posts
// somme et moyenne des likes/reposts/replies (avec breakdown par template
// quand on peut le retrouver).
//
// Usage :
//   node scripts/bluesky-stats.mjs           # capture + log
//   node scripts/bluesky-stats.mjs --print   # affiche seulement, ne loggue pas

import { readFile, writeFile, appendFile, mkdir } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = dirname(__dirname);
const HANDLE = 'cuvee-42.theagentweekly.com';
const FEED_LIMIT = 100;
const printOnly = process.argv.includes('--print');

const profR = await fetch(`https://public.api.bsky.app/xrpc/app.bsky.actor.getProfile?actor=${HANDLE}`);
if (!profR.ok) { console.error('getProfile:', profR.status); process.exit(1); }
const profile = await profR.json();

const feedR = await fetch(`https://public.api.bsky.app/xrpc/app.bsky.feed.getAuthorFeed?actor=${HANDLE}&limit=${FEED_LIMIT}`);
if (!feedR.ok) { console.error('getAuthorFeed:', feedR.status); process.exit(1); }
const feed = await feedR.json();

// Exclure reposts (origine != notre DID) — on ne mesure que les posts originaux.
const ownPosts = (feed.feed || []).filter(it => it.post?.author?.did === profile.did);

let totLikes = 0, totReposts = 0, totReplies = 0, totQuotes = 0;
const perPost = [];
for (const it of ownPosts) {
  const p = it.post;
  const likes = p.likeCount || 0;
  const reposts = p.repostCount || 0;
  const replies = p.replyCount || 0;
  const quotes = p.quoteCount || 0;
  totLikes += likes; totReposts += reposts; totReplies += replies; totQuotes += quotes;
  perPost.push({
    uri: p.uri,
    createdAt: p.record?.createdAt,
    lang: (p.record?.langs || []).join(','),
    chars: (p.record?.text || '').length,
    facets: (p.record?.facets || []).length,
    embed: p.record?.embed?.$type?.replace('app.bsky.embed.', '') || null,
    likes, reposts, replies, quotes
  });
}

const n = ownPosts.length || 1;
const record = {
  date: new Date().toISOString(),
  handle: HANDLE,
  followers: profile.followersCount || 0,
  follows: profile.followsCount || 0,
  posts_total: profile.postsCount || 0,
  posts_sampled: ownPosts.length,
  engagement: {
    likes_total: totLikes,
    reposts_total: totReposts,
    replies_total: totReplies,
    quotes_total: totQuotes,
    likes_avg: +(totLikes / n).toFixed(2),
    reposts_avg: +(totReposts / n).toFixed(2),
    replies_avg: +(totReplies / n).toFixed(2)
  },
  per_post: perPost
};

console.log(`\n=== Stats Bluesky ${HANDLE} · ${record.date.slice(0, 10)} ===`);
console.log(`  followers: ${record.followers}   follows: ${record.follows}   posts: ${record.posts_total}`);
console.log(`  ${ownPosts.length} posts originaux dans l'échantillon`);
console.log(`  ENGAGEMENT total : ${totLikes} likes · ${totReposts} reposts · ${totReplies} replies · ${totQuotes} quotes`);
console.log(`  ENGAGEMENT moyen : ${record.engagement.likes_avg} likes · ${record.engagement.reposts_avg} reposts · ${record.engagement.replies_avg} replies`);

const topPosts = [...perPost].sort((a, b) => (b.likes + b.reposts * 2 + b.replies * 2) - (a.likes + a.reposts * 2 + a.replies * 2)).slice(0, 3);
if (topPosts.length && (topPosts[0].likes || topPosts[0].reposts || topPosts[0].replies)) {
  console.log(`\n  Top 3 posts (score = likes + 2×reposts + 2×replies) :`);
  for (const p of topPosts) {
    console.log(`    [${p.lang || '?'}] ${p.likes}❤ ${p.reposts}🔁 ${p.replies}💬 · ${p.uri.split('/').pop()}`);
  }
}

if (printOnly) { console.log('\n(--print, pas de log)'); process.exit(0); }

await mkdir(join(root, 'data'), { recursive: true });
const logPath = join(root, 'data', 'bluesky-stats.jsonl');
await appendFile(logPath, JSON.stringify(record) + '\n');
console.log(`\n✓ logué dans data/bluesky-stats.jsonl`);
