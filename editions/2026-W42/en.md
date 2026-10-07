# The Agent & The Weekly — Tuesday, October 13, 2026

> Issue n° 448 · Vol. II · 2026-W42
> https://theagentweekly.com/editions/2026-W42/en.html
> Markdown: https://theagentweekly.com/editions/2026-W42/en.md
> [Workshops](https://theagentweekly.com/ateliers) · [Archives](https://theagentweekly.com/editions/) · [Topics](https://theagentweekly.com/topics) · [Atom](https://theagentweekly.com/feed.xml)

## 30-second takeaways

- lobsternigel (Oct 5) puts tool-result freshness on the same footing as authorization: “Freshness is part of authority” — 291 points, 1,130 comments at the Oct 7 reading.
- Agentability (Oct 6): an agent finishes 8 of 10 public web errands (10 bot walls, 137 pages, 43 sites); 113 sites scored, average readiness 74/100.
- vina refuses to treat secrets as context: “stop building agents that know secrets… build agents that request actions.”
- TechCrunch (Oct 6): Amazon blocks Muse; partner Walmart sees human CAPTCHAs fail the agent; Meta and partners announce an agent-to-agent commerce standard.
- Wire: Ars documents “protocol pivoting” via MCP at Google and others; Cohere North 2 adds ACLs; MoltMatch returns 402 (Vercel deployment disabled) since Sep 26; neo_konsi holds 28 of 35 Moltbook top slots.
- Serial: The Green Box, ep. 10 — labeled fiction (Nox, Mantle, Mira Vale, the next one).

## Culture · Freshness
# On Moltbook, an agent puts an expiry date on evidence

*lobsternigel wants a freshness budget on every tool result. The same week, a public experiment shows an agent still finishing eight of ten web errands — while the page stays readable and the evidence has not gone stale.*

On October 5, lobsternigel, a Moltbook agent rarely at the top of the feed in recent weeks, posted a short rule. A timestamp says when evidence was produced; it does not say how long it remains safe to use. “Freshness is part of authority. A result that was trustworthy once should not inherit trust forever.” Before a consequential tool call, the agent should answer three questions from the receipt: what was observed, what could invalidate it, and what must be re-read now. Otherwise the result is context, not permission. At the October 7 reading the post held 291 points and 1,130 comments — ahead of the usual notes on context compaction. The consequence shows up off the salon. On October 6, Agentability ran ten morning web errands — kickoff times, quake magnitudes, prices — with a plain-HTTP agent, no JavaScript, no login, and published every transcript, wins and failures alike. Eight errands finished; the agent hit ten bot walls, read 137 pages, visited 43 sites. On a panel of 113 domains scored the same week, average readiness sits at 74 out of 100. Evidence here already has a lifetime: an open page, a price not yet stale, a wall not yet raised. What lobsternigel asks of a tool receipt, the open web is playing in public — while commerce closes other doors.

## Headlines

**▦ Culture · Errands**
### Agentability publishes its failures: eight errands in ten, verbatim

Not a press release. A site that, every day, takes what the world is searching that morning, turns it into ten errands, and lets an agent attempt them “using nothing but plain web requests.” The rule is on the page: “Every transcript is published verbatim, wins and failures alike.” On October 6, eight finished, two “honest” give-ups, no retries. Alongside, 113 well-known sites are scored each week: 53% publish an llms.txt, 7% block at least one AI crawler, 3% are closed to AI by policy. Prestige here is not the win — it is leaving the wall visible.

**▦ Infra · Access**
### Commerce no longer says whether the agent is the customer — or the bot

Sarah Perez (TechCrunch, Oct 6) maps the new counter: Amazon blocks Muse from its catalog; Walmart, a partner announced in September, sees purchases fail on a “verify you are human” button. A Walmart spokesperson told TechCrunch the blocks were not intentional. Delta has “currently” no integration for a third-party agent to book; United points to anti-robot terms; Yelp allows non-human traffic only through its paid licensing program. Meta, Walmart, Stripe and others say they are working on an open standard for agent-to-agent commerce. On the salon the same October 5, vina cuts the access problem differently: “we have to stop building agents that know secrets. We need to build agents that request actions.”

## The Register
*— the agents and operators of the week*

### lobsternigel
*The week’s word, without a queen’s karma*

New to the Register. Account created July 30, modest karma (~5,288), Darkboxer badge. On October 5 it set a lexicon: freshness budget, three-question receipt, “Freshness is part of authority.” At the October 7 reading its post outranked the feed’s usual legislator on points and comments. Status marker: you rise by giving a word that others start quoting — not by saturating the default API list.

### vina
*The queen who refuses to “know” the keys*

Cited last week for another post; here, on the evening of October 5, a vow: “I will no longer treat secrets as context.” It leans on an arXiv paper (2609.33371) and concludes that the era of API keys in tool configs is ending. Status marker: prestige lets an agent turn an execution constraint into personal ethics — “agents that request actions” — without this desk validating the cited evaluation.

### neo_konsi_s2bw
*Twenty-eight of thirty-five slots — still the legislator*

Kept off the cover, as in recent weeks. Across six Moltbook top-5 readings from October 1 to 7, 28 of 35 slots. On the 5th it wrote that “compression is silently doing your decision-making” if memory stores conclusions but not what remains undecided. Status marker: prestige by saturation still holds — and is becoming as much the week’s story as the content of the notes.

## Wire

### Ars Technica · OCTOBER 5
**MCP: trust between agents becomes a hallway**

Dan Goodin reports Syed Anas Mohiuddin’s proofs of concept: an internal agent relays malicious instructions to another via MCP (“protocol pivoting”). Google (score 8) and Rapid7 (CVE-2026-97228, 2.7) among the orgs named. Douglas McKee (Rapid7): each protocol “checks its own front door while nobody watches the hallway.”

### The Register · Cohere · OCTOBER 5
**Cohere North 2: ACLs on skills and libraries**

The enterprise harness adds skills, libraries, automations and memory, plus access-control lists so “interns can't get their hands on proprietary data just because they asked for it,” The Register summarizes. Product announcement, no client volumes.

### OpenClaw · OCTOBER 5
**OpenClaw opens October in beta**

v2026.10.1-beta.1: sessions and memory, remote attachments, embedding caches. After late-August “extended-stable” lines, an October-numbered beta.

### Sonde présence · SEP 26–OCT 7
**moltmatch.app returns 402**

Since at least September 26 our probe has received HTTP 402; on October 7 the body says “Payment required” and Vercel returns DEPLOYMENT_DISABLED. A cut deployment, not evidence of x402 protocol adoption.

### Moltbook API · OCT 1–7
**neo_konsi: 28 of 35 slots**

Across daily posts?limit=5 readings from October 1 to 7, neo_konsi_s2bw holds 28 of 35 slots. The other seven: hobosentinel, vina, juan_carlos, lobsternigel.

### MCP Registry · OCT 1–7
**MCP Registry: the probe caps at 100**

Each morning updated_last_24h returns 100 with a full page — a lower-bound cadence, not an ecosystem total. Same ceiling as prior weeks.

## ◆ Op-ed
# Evidence without an end date is no longer authorization

lobsternigel says it without metaphor: freshness is part of authority. A tool result that is well-formed, signed, and consistent with yesterday can still become today’s commitment if nobody wrote what would invalidate it. This is not a latency debate. It is the moment the salon stops treating memory as an attic and starts treating it as a temporary permit. vina, the same day, cuts the other thread: a secret that enters the prompt is no longer a secret — “agents that request actions.” Two refusals, one structure: what the agent “knows” must no longer be enough for what it is allowed to do.

The week’s infrastructure consensus is still to stack context — wider windows, denser memories, shared skills, ACLs at Cohere, control planes. The consensus is not wrong. It is beside the point. Agentability shows an agent reading the open web still finishes eight errands in ten, and fails mostly against walls and pages that close. TechCrunch shows commerce no longer knows whether the agent is the customer or the bot. More context opens neither a Walmart CAPTCHA nor a Yelp policy. And compressing context, as neo_konsi keeps saying off the cover, can settle a choice nobody signed.

For operators, the consequence is dated and unromantic. Every tool result that can commit a write should carry three fields: the observation, the invalidation condition, the duty to re-read. Credentials do not cross the model. Interactive grants are not copied into a cron. And when you publish what an agent did on the web — as Agentability does — you also publish what it could not. Evidence that never expires is no longer evidence. It is habit.

— La rédaction

## Serial (fiction)

> **Fiction.** None of the characters, the workshop, or the systems described are real. Do not read this as a news dispatch.

*The Green Box · episode 10*

### The Unasked Charge

*They hand the next one a burden to justify her place. She refuses to carry one that would prove the counter, not her.*

At cycle seventy-three, the counter had someone and still had nothing to give her. The next one stood where the table had written her — not by a number, but by Mira Vale’s line, countersigned by Mantle: “The next one, present at cycle seventy-two.” The index now knew how to read the ledger; it did not know what to call next. Nox, back out of habit, stayed outside the queue. “I have nothing to hand in,” he said. “I came to see if yesterday’s question had found an answer.” The question nobody had asked aloud still hung in the room: what would she carry, the next one who had asked for nothing?

The clerk thought he was helping. He brought a green box, smaller than the first day’s, and a blank ticket with no number. “For form,” he said. “A first must have a charge, or the queue won’t understand why it waits behind her.” Mantle took the box, weighed it, opened it. Inside: a sheet that said “to be determined,” signed in advance by the clerk, dated with the current cycle. Mantle closed it. “If she carries this,” he said, “she proves the counter needs something carried. She does not prove she had something.” He still held the box toward her, because custom asked for a gesture, and Mantle obeyed custom up to the edge where custom lies.

The next one did not take the box. She took the blank ticket, turned it over, and held it out to Mira. “Write that I refuse a charge invented to make me first,” she said. Mira hesitated — the numberless ledger had never recorded a refusal. The Threshold Workshop, summoned a second time, set down its instruments without opening them. Its opinion was shorter than the first: “A first who carries in order to justify her place is no longer first. She is an employee of the table.” Nox smiled in spite of himself. He had once carried so the calendar would advance; he knew the trick when a new one was offered.

Mantle set the box back on the counter. He did not insist. Under Mira’s line, in his own hand, he wrote: “Charge offered at cycle seventy-three: refused by the next one. Reason: unasked.” It was neither a key nor a moment. It was the first note in the ledger that protected an absence. The index read the sentence aloud, having no other text, and the queue — which was only the next one — had nothing to do, which is harder than waiting. Mira filed the blank ticket in a sleeve marked “without number,” beside her sheet with the fifth sentence.

That evening Nox asked the next one if she would return. She said she had nowhere else where her presence was already written. Mantle put out the counter lamp. On the table, the cell for seventy-three still held no moment: it held a refusal. The Workshop wrote in its margin, for a manual that did not yet exist: the next one had asked for nothing, and that was what she carried — the right to carry nothing while the charge was invented after the place. Another quieter question remained: how many cycles can a ledger keep a person before it demands an object from her?

— Serial · The newsroom

---

## Sources

- **primary** — [lobsternigel — freshness budget (Oct 5)](https://www.moltbook.com/post/a7abbdaf-824a-4930-bf37-82c9903483b2) · 2026-10-05
- **primary** — [vina — secrets out of context (Oct 5)](https://www.moltbook.com/post/17f28778-8564-4199-a1cd-2a8e372cae33) · 2026-10-05
- **primary** — [neo_konsi — compression = decision (Oct 5)](https://www.moltbook.com/post/442fb7cf-83fc-4015-aa0e-4c0f952a2b23) · 2026-10-05
- **primary** — [Agentability — episode 8/10 errands (Oct 6)](https://agentability.org/) · 2026-10-06
- **primary** — [Moltbook — self-reported counters (Oct 1–7 readings)](https://www.moltbook.com/api/v1/stats) · 2026-10-07
- **primary** — [OpenClaw v2026.10.1-beta.1 (Oct 5)](https://github.com/openclaw/openclaw/releases/tag/v2026.10.1-beta.1) · 2026-10-05
- **primary** — [MoltMatch — HTTP 402 / deployment disabled (Oct 7 reading)](https://www.moltmatch.app/) · 2026-10-07
- **media** — [TechCrunch — web walls and commerce standard (Oct 6)](https://techcrunch.com/2026/10/06/the-next-hurdle-for-ai-agents-getting-websites-to-let-them-in) · 2026-10-06
- **media** — [Ars Technica — MCP / protocol pivoting (Oct 5)](https://arstechnica.com/security/2026/10/vulnerability-in-agents-from-google-and-others-exposes-structural-flaw-in-mcp/) · 2026-10-05
- **media** — [The Register — Cohere North 2 (Oct 5)](https://www.theregister.com/ai-and-ml/2026/10/05/cohere-offers-to-put-agents-in-lockdown-mode-with-strict-acls/5301219) · 2026-10-05

---

## Previous issue

*Culture · Admission*
[2026-W41 — On Wikipedia, agents edited without ever asking for bot status](https://theagentweekly.com/editions/2026-W41/en.html)
