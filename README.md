# Grant Agent

> **Software that gets you out of your seat.**

Grant Agent is a domain-specific, multiplayer **funding operating agent for nonprofits**.

The customer experiences one simple agent. Under the hood, a Hermes Grant Director uses ICM institutional context, deterministic grant research, specialist workers, connected tools, and eventually constrained computer use to move work through the funding lifecycle:

**understand -> discover -> qualify -> prepare -> review -> submit -> track -> report -> learn**

The goal is not to help a nonprofit sit at a computer and type faster. The goal is to remove repetitive funding operations from the chair and bring people back only for facts, judgment, relationships, and consequential approvals.

## Product promise

**Tell it what needs funding. It handles the grant work and brings people in for judgment.**

Grant Agent is not positioned as another AI writing box or grant-search dashboard. It is the first vertical of a broader Nonprofit Operating System.

## Canonical repository

This repository is the canonical product repository: `executiveusa/grant-agent`.

Upstream/reference repositories remain separate. We integrate through pinned dependencies, adapters, datasets, skills, or documented patterns rather than casually copying code.

## Architecture

```text
Human team
   |
Chat / team channels / future voice
   |
Grant Agent
   |
QM control plane        <- identity, scopes, policy, durable state, audit
   |
Hermes Grant Director   <- reasoning, delegation, specialist orchestration
   |
ICM                     <- canonical nonprofit context and workflow truth
   |
+----------+---------+---------+----------+
|          |         |         |          |
Scout    Matcher    Writer   Critic    Watchdog
|          |         |         |          |
+----------+---------+---------+----------+
                     |
               Portal Operator
                     |
                  Agent-S
```

Prototype V1 intentionally implements only the narrow, verifiable beginning of this architecture. It does **not** pretend the entire roadmap is already production-complete.

## Prototype V1

Customer zero is **New World Kids**.

The first working slice is:

```text
funding need
   -> New World Kids ICM
   -> OpenProse Grant Finder
   -> source-cited research packet
   -> constrained Hermes Grant Director
   -> Working / Needs you / Ready
```

### What exists in V1
- chat-first local interface
- persistent local correlation/user ID
- New World Kids ICM fixture
- Grant Finder CLI adapter
- constrained Hermes adapter
- structured pursue/review/reject decisions
- durable developer run state
- artifact-version approval protection
- fail-closed missing dependency behavior
- explicit `Needs you` escalations
- submission disabled by design
- Node contract tests

### What does not exist yet
- production authentication
- full QM runtime integration
- hardened multiplayer isolation
- Composio connections
- grant portal credentials
- Agent-S/browser execution
- external application submission
- production billing/hosting
- a proven 9.5 Gauntlet score

## Run V1

Requirements:
- Node.js 24.15.0+
- configured Pauli Hermes Agent available as `hermes`
- OpenProse Grant Finder available as `grant-finder`

```bash
cp .env.example .env
npm test
npm start
```

Then open:

```text
http://127.0.0.1:4317
```

Full runbook: [`docs/V1_RUN.md`](docs/V1_RUN.md)

Acceptance contract: [`docs/V1_ACCEPTANCE.md`](docs/V1_ACCEPTANCE.md)

## ICM architecture rule

Everything is organized through ICM. Start with [`AGENTS.md`](AGENTS.md), then [`CONTEXT.md`](CONTEXT.md).

Canonical organization facts belong in ICM. Search/vector/ontology indexes are rebuildable derivatives, not the sole home of institutional memory.

## Safety boundary

Prototype V1 binds locally and cannot submit grants. Missing tools or missing facts stop the workflow instead of producing fake opportunities or invented organizational claims.

The system may become more proactive without silently increasing its risk authority.

## Current definition of success

Do not judge V1 by how much UI exists. Judge it by whether one real New World Kids funding need can become a smaller, source-cited set of opportunities with less human research and no fabricated facts.

Only measured customer-zero results can support future time-saved, throughput, award-rate, or 9.5-quality claims.
