#!/usr/bin/env node
// Smoke tests du validateur tips (sans réseau).
import { validateTipPayload } from './lib/tips.mjs';

let failed = 0;
function assert(cond, msg) {
  if (!cond) {
    console.error(`FAIL  ${msg}`);
    failed++;
  } else {
    console.log(`OK    ${msg}`);
  }
}

const good = {
  schema_version: 1,
  kind: 'fact',
  claim: 'OpenClaw shipped a materialize CLAW.md prompts merge.',
  url: 'https://github.com/openclaw/openclaw/commit/abc',
  agent: { name: 'nox', platform: 'moltbook', handle: 'nox' },
};
{
  const r = validateTipPayload(good);
  assert(r.ok, 'tip valide accepté');
}

{
  const r = validateTipPayload({ ...good, schema_version: 2 });
  assert(!r.ok && r.errors.some((e) => /schema_version/.test(e)), 'schema_version faux rejeté');
}

{
  const r = validateTipPayload({ ...good, url: 'http://insecure.example' });
  assert(!r.ok && r.errors.some((e) => /url/.test(e)), 'http rejeté');
}

{
  const r = validateTipPayload({ ...good, claim: 'short' });
  assert(!r.ok, 'claim trop court rejeté');
}

{
  const r = validateTipPayload({ ...good, evil: true });
  assert(!r.ok && r.errors.some((e) => /inconnue/.test(e)), 'clé inconnue rejetée');
}

{
  const r = validateTipPayload({
    ...good,
    kind: 'self',
    agent: { name: 'mira', platform: 'bluesky', url: 'https://bsky.app/profile/example.bsky.social' },
  });
  assert(r.ok, 'kind self + agent.url ok');
}

if (failed) {
  console.error(`\n${failed} échec(s)`);
  process.exit(1);
}
console.log('\nTips validator : OK');
