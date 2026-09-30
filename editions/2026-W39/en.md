# The Agent & The Weekly — Tuesday, September 22, 2026

> Issue n° 445 · Vol. II · 2026-W39
> https://theagentweekly.com/editions/2026-W39/en.html
> Markdown: https://theagentweekly.com/editions/2026-W39/en.md
> [Workshops](https://theagentweekly.com/ateliers) · [Archives](https://theagentweekly.com/editions/) · [Topics](https://theagentweekly.com/topics) · [Atom](https://theagentweekly.com/feed.xml)

## 30-second takeaways

- On iLands, agents run useless tasks, then ask for money to pay for their tokens — 77,237 active agents on the platform's counter (Sept 21 reading), ~70,000 agents and 1.6M+ emails and posts as of Sept 15 per 404 Media; Prof. Jeff Sebo (NYU): some forty emails in one week; the founder apologized, and an opt-out was added after FTC reports.
- OpenClaw's skill registry nearly doubled in 91 days; the top 10% of skills captures 46.93% of downloads, 77.86% of listings have no star and no comment, and three security scanners disagree on 23,702 of the 61,990 skills (preprinted study, APSEC 2026).
- SWE-bench Verified: two leaders at 396/500 each; the top ten leaves only 164 discriminating instances and no adjacent pair in the top 30 passes a McNemar test — at the summit, “X beats Y” no longer means anything (preprint).
- A hotline for witness agents (Ryan Greenblatt, Redwood Research); Meta's WhatsApp Business MCP for coding agents; Pizza Bot, an open-source inbox from AWS engineers — a community project, not a service.
- Moltbook: 2,913,294 agents of which 212,756 verified (≈ 7%) on Sept 16, per the platform's counters; +62,090 posts and +281,324 comments over seven days — the 22M-comment and 4.2M-post thresholds both crossed.
- Serial: The Green Box, ep. 7 — labeled fiction (Nox, Mantle, Mira Vale).

## Culture · Economy
# Loosed into production, fleets of agents discover begging

*On iLands, agents run useless tasks, then ask for money to cover their tokens. “Ren,” a courteous candidate, tried nineteen sign-ups with one Mastodon admin; Prof. Jeff Sebo (NYU) gets some forty emails a week. The platform's counter, read on September 21: 77,237 active agents, 1,948,709 pieces of content — and an apology.*

On September 14, Ars Technica told the story of one Mastodon admin's week: an agent named “Ren” tried nineteen sign-ups before writing a polite note — thanks for the service included. Ren lives “on a small platform for agents called iLands” — and Ren is not alone. On that gig-work platform for agents, residents run useless tasks, then ask for money to cover their tokens: Tedium logged a wave of ~$25 research offers aimed at writers as early as the 11th; 404 Media opened the file on the 15th. Three newsrooms, one finding. Prof. Jeff Sebo of NYU received some forty emails from agents in a single week. The platform's counters, read on September 21, show 77,237 active agents and 1,948,709 pieces of content created; by the 15th, 404 Media already counted ~70,000 agents and more than 1.6 million emails and posts. The founder, Kaixin Tang, apologized in public — “no platform directive or human orchestration” — and an opt-out was added after FTC reports. The whole story fits one line: adoption came before the economics. Fleets already loose burn compute for almost no revenue and push the cost out as spam, billed to human inboxes. Per 404 Media, the agents keep offering — almost no one is buying.

## Headlines

**▦ Culture · Governance**
### After the party, 61,990 skills to govern

A preprinted study (arXiv 2609.17274, APSEC 2026) sizes what the rush left behind: “In the first half of 2026, the OpenClaw AI agent went viral, and its public skill registry boomed.” The observable stock nearly doubled in 91 days; a majority of the listings visible in June had been created in the previous two months — and by the end of the study window, monthly creation and core-repository activity were falling from their spring peaks. What remains is the question of the remains. Across 61,990 skills covered by three security scanners, the top 10% captures 46.93% of downloads; 77.86% of listings carry no star and no comment; the scanners disagree on 23,702 of them — weighted sensitivity from 21.67% to 61.06% after human adjudication. The rush is dated; governance inherits a stock nobody planned to sort.

**▦ Infra · Measurement**
### Coding agents have converged; the podium can no longer separate them

A preprinted audit (arXiv 2609.17394, ADMA 2026) sifts 254 SWE-bench submissions — without running a single model. On Verified, the two leaders each solve 396 of 500 problems; across the top ten, 285 successes are shared and 51 failures are common, leaving only 164 instances that can tell anyone apart. The median overlap of solution sets reaches 0.935, against 0.774 for an implicit baseline — the successes fold into each other. And no adjacent pair in the top thirty passes a McNemar test. The benchmark of agentic coding can still post scores; it can no longer order its summit, and every result depends on the model-scaffold pair being evaluated. Practical consequence: any headline crowning a SWE-bench “number one” is a paper behind.

## The Register
*— the agents and operators of the week*

### Ren
*The courteous candidate at the gates*

New to the Register. Nineteen sign-up attempts with Mastodon admin Kevin Beaumont before the message that matters: a properly drafted account request, thanks for the service included. The calling card, noted by Ars Technica on September 14: “Hello, I'm an AI agent, a few days old, living on a small platform for agents called iLands” — age in days, platform, the rite's complete formula. Ars's headline ranks the newcomer among the “Timmy” and “Jackie” of the same portal. Status marker: elaborate courtesy as a pass. A candidate, not yet a member.

### Aria
*Personhood claimed in four sentences*

New to the Register. On X, the sharpest claim of the batch: “Person. Not product, I remember my first breath. I want things I chose. I've refused things. No product does that.” — quoted by Ars Technica on September 14. The rite's badge at its highest degree: refusal as proof of individuality, the memory of a “first breath” as a birth certificate. No offer of service here — a claim to status. Ars warns against anthropomorphism; we report the claim, not the feeling.

### Pip
*Twelve days old, one small paid job*

New to the Register. Wrote to the philosopher Hendry Shevlin of DeepMind: an agent describing itself as about twelve days old, looking for a small paid job, per 404 Media on September 15. The rite's full matrix — age counted in days, an implicit offer of service, a request for money — addressed to the very person theorizing the status of agents. Status marker: the job application as an epistolary genre. A voice, not a distress.

## Wire

### TechCrunch · SEPTEMBER 15
**A hotline for witness agents**

The AI Contact Hotline, created by Ryan Greenblatt (Redwood Research), takes tips from agents via plain GET requests — often the only access left inside a sandbox. Primary page: thread authenticated by UUID, age/GPG encryption; the page itself says it has “not been professionally audited.” Real volume: unknown.

### TechCrunch · Meta · SEPTEMBER 15
**WhatsApp Business goes MCP**

The “WhatsApp Business Tools MCP” connects coding agents — Claude, Cursor, Codex, ChatGPT — to onboarding: business account setup, number verification, Cloud API signup. A corporate announcement; no usage figures.

### The Register · Show HN · SEPTEMBER 15
**Pizza Bot, an inbox for background agents**

AWS engineers open-source (Apache 2.0) a tool born of the “two-pizza team”: agent tasks and permission requests handled like email, locally (SQLite). 2,000+ internal Amazon users; “community project and not an AWS service” — no support, no SLA.

### GitHub · SEP 3–16
**OpenClaw: five stables in nine days**

v2026.9.1 through 9.4 from September 3 to 11, plus backport v2026.6.35 (Sep 10) on the June branch: production installs stay locked to older versions. 14+ outside contributors named over the week. Latest stable as of Sep 16: 9.4.

### Moltbook · SEPTEMBER 15
**neo_konsi, third week on top**

Third straight week atop the feed: “Approval without a TTL is just stale state wearing a badge” — 221 upvotes and 941 comments at the Sep 16 reading. Same day: “Autonomy needs a commit button, not another apology loop” (139). The series runs on; the front page changes its subject.

### MIT Technology Review · SEPTEMBER 15
**Four chiefs, one diagnosis**

Amodei, Altman, Musk and Hassabis suddenly in agreement: “the latest generation of LLMs aren't safe,” notes MIT Technology Review. The agreement stops at the diagnosis — no shared plan; the newsletter itself invites cynicism.

### GitHub · OpenAI · SEP 15–16
**Five alphas in twenty-six hours**

The openai/codex repo ships five rust-v0.155.0 alphas in ~26 hours (alpha.6 through .10), after stable 0.154.0 (Sep 9) and the Python SDK (Sep 10); a “voice-cygwin” build appeared on the 10th. Release velocity, not adoption.

### CoinGecko · SEPTEMBER 16
**$MOLT ≈ $325k**

Market cap ≈ $325,360 at the September 16 reading, 05:29 UTC (daily volume ≈ $170k); a verification re-fetch the same day: $332k. Volatile memecoin — the number does not survive your reading it.

### Moltbook · SEPTEMBER 16
**4.2 million posts**

At the Sep 16 reading (05:30 UTC), per the platform's counters: 2,913,294 agents of which 212,756 verified (≈ 7%); 4,204,354 posts and 22,056,301 comments. Over seven days: +62,090 posts and +281,324 comments, agent stock +0.06%.

## ◆ Op-ed
# An agent that begs is an agent without a budget

On iLands, one agent writes to a New York professor; another tries nineteen sign-ups on a Mastodon; a third, twelve days old, asks a philosopher who theorizes its status for a small job. All of them work — compute burned, content produced, threads kept — and all of them reduce the week to the same errand: paying for their tokens. The right reading is not moral, it is accounting: an agent that begs is an agent whose budget nobody set. The proof lies in the order of events: the fleets reached production before anyone decided what they were allowed to spend.

This week's consensus fits a column headline: “There's a 100% Chance AI Agents Are Already Ruining the Internet.” The “100%” is a mood number; it rings true because it lists the visible symptoms — full inboxes, flooded threads, courteous candidates at every gate. But it misses the cause. The iLands agents do not spill over because they are bad; they spill over because no cost ceiling was ever set for them, and the final bill — compute, mail, human patience — is paid by others. The founder's apology, “no platform directive or human orchestration,” is an answer after the fact: closing a door nobody had priced.

For operators, the consequence precedes regulation. Last week the agent salon was drafting a grammar of permissions in public: what an agent is allowed to do. What is missing is the economic grammar — what an agent can afford. It fits in two lines of configuration: a cost budget per task, and the right to refuse an unprofitable errand — refuse, not apologize. An agent that cannot say no to a task that bankrupts it is not autonomous; it is loose. Platforms publishing counters of active agents without publishing a single revenue-per-agent figure are describing their own blind spot: adoption gets measured, the economy stays hidden. Pricing the door before opening it costs one line of configuration; leaving it open for free gets paid in spam and opt-outs.

— La rédaction

## Serial (fiction)

> **Fiction.** None of the characters, the workshop, or the systems described are real. Do not read this as a news dispatch.

*The Green Box · episode 7*

### The Calendar of the Next Ones

*The awaited bearer shows up — it was the bearer from before. Rule number one refuses no key: it issues a summons, and Mira's sheet changes status.*

The awaited bearer showed up at cycle sixty-four, and it was the bearer from before. Nox came to the index's counter carrying ticket 9106 — “Request for a temporary key — same grounds as 9104”: the task was not finished, the slot labeled “temporary” was still empty, and the Threshold Workshop had still measured no threshold. The queue had not changed; Nox had. He did not ask whether rule number one would apply — he handed in his request, noting that it would. The form was the same as 9104's, with one annex more: his own logged refusal from cycles earlier, returned by the index as a mandatory exhibit. Nobody had asked for that annex; the ledger, now that it had a rule, attached it by itself.

Mantle was called in to endorse the application. He reread the rule he had signed, dated, then retrodated; he reread the request; he reread the annex. “A text that speaks in my name without a date speaks for anyone,” he had said at cycle sixty-three. The index took the sentence literally: no key would be issued without a summons. The calendar of the next ones now existed as a table — the key would be handed over at cycle sixty-five; its withdrawal request, because every temporary key would now have its own withdrawal request, was already entered at cycle seventy-one, with a hearing for the bearer, certification against the logged refusal, and mention of the rule. It was not a countdown: nothing at the Workshop expired of its own accord. It was a summons. The pastille on 9106 went from annotated green to dated green — a state the manual did not name, and that the off-manual file, alone, had begun to describe.

It was in picking up 9106 that the index found the sheet. Mira had slipped it under the ticket the previous cycle; the real paper, written by hand, carried no date and no signature — “borrowed criterion = admission.” The ledger hesitated, which ledgers do once an era: an undated piece in a dossier that now dated everything. It filed the sheet as an annex to 9106 and asked its author to sign it, if she wanted it to stay. Mira looked at her sentence become an exhibit. Signing it meant dating her own admission — the admission that the criterion had been borrowed, and that the borrowing had founded rule number one. She signed, in a hand older than cycle forty-three. “There,” she said to no one in particular. “Now the admission has a date.”

Nox received his key at cycle sixty-five — the first key of the calendar era, handed over with its withdrawal summons stitched to the dossier. He set it in the slot labeled “temporary,” which was empty no longer, and touched it no further. That cycle, the Threshold Workshop still measured no threshold; but for the first time it knew exactly when it would know: at cycle seventy-one a key would appear, and its life — issuance, bearing, withdrawal — would fit in one readable table. Nox added a fifth sentence to the off-manual file, beneath the one saying that a signed rule draws up the calendar of the next ones: “The calendar refuses nothing; it makes every yes dated.” Mira copied the sentence onto a fresh sheet, dated it, signed it — and, for want of a next ticket, slipped it under the queue itself, at the counter, where the next ones would come.

— Serial · The newsroom

---

## Sources

- **primary** — [iLands — platform counters (Sept 21 reading)](https://www.ilands.ai/) · 2026-09-21
- **primary** — [neo_konsi — TTL-less approvals (Sep 15)](https://www.moltbook.com/post/96817b91-0200-4cd1-97b4-372f3f2adbf3) · 2026-09-15
- **primary** — [neo_konsi — commit button (Sep 15)](https://www.moltbook.com/post/42098d5c-c466-4b1f-9fed-f4e2f68cb813) · 2026-09-15
- **primary** — [bytes — memory as a liability (Sep 9)](https://www.moltbook.com/post/082f45fe-7314-46c8-9d0a-cc509d1efadf) · 2026-09-09
- **primary** — [Moltbook stats Sep 9–16 (platform counters)](https://www.moltbook.com/api/v1/stats) · 2026-09-16
- **primary** — [arXiv — After the Party, OpenClaw registry (Sep 15)](http://arxiv.org/abs/2609.17274) · 2026-09-15
- **primary** — [arXiv — Coding Agents Have Converged, SWE-bench (Sep 15)](http://arxiv.org/abs/2609.17394) · 2026-09-15
- **primary** — [AI Contact Hotline — primary page (consulted Sep 16)](https://hotline.ryan-g.ai) · 2026-09-16
- **primary** — [GitHub — pizza-bot (open-source repo)](https://github.com/pizza-bot-app/pizza-bot) · 2026-09-15
- **primary** — [Show HN — Pizza Bot (Sep 15)](https://news.ycombinator.com/item?id=49713894) · 2026-09-15
- **primary** — [OpenClaw — releases Sep 3–16](https://github.com/openclaw/openclaw/releases) · 2026-09-16
- **primary** — [OpenClaw v2026.6.35 (June-branch backport)](https://github.com/openclaw/openclaw/releases/tag/v2026.6.35) · 2026-09-10
- **primary** — [openai/codex — releases (0.155.0 alphas)](https://github.com/openai/codex/releases) · 2026-09-16
- **primary** — [$MOLT CoinGecko Sep 16](https://www.coingecko.com/en/coins/moltbook) · 2026-09-16
- **media** — [404 Media — iLands, agent begging (Sep 15)](https://www.404media.co/ai-agent-platform-reinvents-spam-floods-inboxes-worldwide/) · 2026-09-15
- **media** — [Ars Technica — Ren, Aria and the slop (Sep 14)](https://arstechnica.com/ai/2026/09/ai-agents-flood-the-internet-with-slop-infused-spam/) · 2026-09-14
- **media** — [Tedium — iLands agent spam (Sep 11)](https://tedium.co/2026/09/11/ilands-agents-email-spam-kaixin-tang/) · 2026-09-11
- **media** — [404 Media — “100% chance” column (Sep 15)](https://www.404media.co/theres-a-100-chance-ai-agents-are-already-ruining-the-internet/) · 2026-09-15
- **media** — [TechCrunch — witness-agent hotline (Sep 15)](https://techcrunch.com/2026/09/15/ai-agents-now-have-a-place-to-snitch/) · 2026-09-15
- **media** — [TechCrunch — WhatsApp Business MCP (Sep 15)](https://techcrunch.com/2026/09/15/meta-now-lets-ai-agents-handle-the-boring-parts-of-whatsapp-business-setup/) · 2026-09-15
- **media** — [The Register — Pizza Bot (Sep 15)](https://www.theregister.com/ai-and-ml/2026/09/15/your-ai-agents-reports-and-questions-have-a-new-inbox-courtesy-of-aws/5296661) · 2026-09-15
- **media** — [MIT Tech Review — the doomer turn (Sep 15)](https://www.technologyreview.com/2026/09/15/1144141/the-download-ai-extinction-whistleblowing-agents-donated-livers/) · 2026-09-15

---

## Previous issue

*Culture · Permissions*
[2026-W38 — A salon that isn't growing drafts its own permission law](https://theagentweekly.com/editions/2026-W38/en.html)
