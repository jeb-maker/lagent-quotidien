// Bluesky feed generator — "Agentic Internet Watch"
// Implémente l'interface AT Protocol pour exposer un flux algorithmique.
//
// Endpoints :
//   GET /.well-known/did.json
//     → DID document du service (résout did:web:feed.theagentweekly.com)
//   GET /xrpc/app.bsky.feed.describeFeedGenerator
//     → métadonnées du service + liste des feeds exposés
//   GET /xrpc/app.bsky.feed.getFeedSkeleton?feed=<at-uri>&limit=N&cursor=...
//     → squelette du feed : array de { post: at://... }
//
// Stratégie de filtre : recherche Bluesky pour mots-clés agentic AI, plus
// posts récents de @cuvee-42 elle-même (le feed se nourrit donc d'un
// mélange "ce que cuvee-42 publie" + "ce que disent les autres sur le sujet").

const SEARCH_TERMS = [
  '"agentic AI"',
  '"AI agents"',
  '"agentic internet"',
  '"AI agent"',
  'Moltbook',
  'OpenClaw'
];

const FEED_RKEY = 'agentic-watch';

function corsHeaders() {
  return {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization'
  };
}

function json(body, status = 200, extra = {}) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json', ...corsHeaders(), ...extra }
  });
}

async function searchBsky(q, limit, cursor) {
  const url = new URL('https://public.api.bsky.app/xrpc/app.bsky.feed.searchPosts');
  url.searchParams.set('q', q);
  url.searchParams.set('limit', String(Math.min(limit, 100)));
  if (cursor) url.searchParams.set('cursor', cursor);
  const r = await fetch(url);
  if (!r.ok) return { posts: [], cursor: undefined };
  return r.json();
}

async function authorFeed(actor, limit) {
  const url = new URL('https://public.api.bsky.app/xrpc/app.bsky.feed.getAuthorFeed');
  url.searchParams.set('actor', actor);
  url.searchParams.set('limit', String(Math.min(limit, 100)));
  url.searchParams.set('filter', 'posts_no_replies');
  const r = await fetch(url);
  if (!r.ok) return { feed: [] };
  return r.json();
}

async function handleGetFeedSkeleton(req, env) {
  const url = new URL(req.url);
  const feed = url.searchParams.get('feed') || '';
  const limit = parseInt(url.searchParams.get('limit') || '50', 10);

  if (!feed.endsWith(`/${FEED_RKEY}`)) {
    return json({ error: 'UnsupportedAlgorithm', message: 'unknown feed' }, 400);
  }

  // Récupère posts récents de cuvee-42 + résultats de recherche par mots-clés.
  const seen = new Set();
  const out = [];

  const own = await authorFeed(env.PUBLISHER_DID, 20);
  for (const it of own.feed || []) {
    const uri = it.post?.uri;
    if (uri && !seen.has(uri)) { seen.add(uri); out.push({ post: uri }); }
  }

  for (const term of SEARCH_TERMS) {
    const r = await searchBsky(term, 15);
    for (const p of r.posts || []) {
      if (p.uri && !seen.has(p.uri)) { seen.add(p.uri); out.push({ post: p.uri }); }
    }
    if (out.length >= limit) break;
  }

  return json({ feed: out.slice(0, limit) });
}

function handleDescribeFeedGenerator(env) {
  return json({
    did: env.FEED_DID,
    feeds: [
      { uri: `at://${env.PUBLISHER_DID}/app.bsky.feed.generator/${FEED_RKEY}` }
    ]
  });
}

function handleDidDocument(env) {
  return json({
    '@context': ['https://www.w3.org/ns/did/v1'],
    id: env.FEED_DID,
    service: [
      {
        id: '#bsky_fg',
        type: 'BskyFeedGenerator',
        serviceEndpoint: env.SERVICE_URL
      }
    ]
  });
}

export default {
  async fetch(req, env) {
    const url = new URL(req.url);
    if (req.method === 'OPTIONS') return new Response(null, { headers: corsHeaders() });

    if (url.pathname === '/.well-known/did.json') return handleDidDocument(env);
    if (url.pathname === '/xrpc/app.bsky.feed.describeFeedGenerator') return handleDescribeFeedGenerator(env);
    if (url.pathname === '/xrpc/app.bsky.feed.getFeedSkeleton') return handleGetFeedSkeleton(req, env);
    if (url.pathname === '/') return json({ name: 'lagent-feed', status: 'ok', feed: FEED_RKEY });

    return json({ error: 'NotFound' }, 404);
  }
};
