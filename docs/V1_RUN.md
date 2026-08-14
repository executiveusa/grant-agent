# Prototype V1 Runbook

## Goal
Prove one honest New World Kids funding workflow:

`funding need -> ICM -> Grant Finder -> Hermes Grant Director -> Working / Needs you / Ready`

Prototype V1 is local, read-oriented, and cannot submit a grant.

## Prerequisites
- Node.js 24.15.0+
- The maintained Pauli Hermes Agent installed/configured so `hermes` works
- OpenProse Grant Finder installed so `grant-finder` works
- A configured Hermes model/provider for reasoning

No npm dependencies are required for the V1 shell.

## Verify the deterministic funding engine

From a Grant Finder clone at the tested revision, build/install its CLI according to the upstream README, then check:

```bash
grant-finder doctor --json
grant-finder version
```

Grant Agent invokes this public contract:

```bash
grant-finder research --assignment /path/to/assignment.json --json
```

## Verify Hermes

```bash
hermes --help
hermes -z 'Return exactly: {"ok":true}' -t search
```

The Grant Agent adapter intentionally exposes only Hermes' read-only `search` toolset in V1. Do not broaden that list to terminal, files, browser, or computer-use tools in this slice.

## Start Grant Agent

```bash
cp .env.example .env
npm test
npm start
```

Open:

```text
http://127.0.0.1:4317
```

The browser creates a stable local correlation ID such as `user-ab12cd34`. It is **not production authentication**.

## First New World Kids test

Start with one concrete need, for example:

> Find funding to expand practical life-skills programming for youth in Seattle, with emphasis on hands-on education, food systems, and community resilience.

Expected behavior:
1. UI moves to **Working**.
2. New World Kids canonical context loads from `icm/instances/new-world-kids/`.
3. A machine-readable Grant Finder Research Assignment is generated.
4. Grant Finder returns a source-cited packet or the workflow fails closed.
5. Hermes receives bounded organization context + the research packet.
6. Hermes returns structured pursue/review/reject decisions with evidence and missing facts.
7. Missing facts move the workflow to **Needs you**.
8. A source-backed candidate with no unresolved required facts can move to **Ready**.
9. No external submission is possible.

## What to record as proof
For each customer-zero run, record in the ICM learning area or an approved test artifact:
- funding need
- Grant Finder revision
- Hermes revision/model/provider
- search timestamp
- number of candidates returned
- candidates rejected before writing
- reasons for rejection
- factual/missing-data escalations
- human minutes spent
- screen minutes spent
- runtime/tool cost where measurable
- final human judgment
- source URLs used

Do not publish claimed time savings until a baseline and after-state have actually been measured.

## Failure behavior

### `grant-finder` missing
The run becomes **Needs you**. Grant Agent must not invent opportunities.

### Hermes missing or misconfigured
The run becomes **Needs you**. Grant Agent must not invent rankings.

### Missing organization fact
The match should include the missing fact and stop in **Needs you**.

### Opportunity evidence conflicts with ICM
Do not reconcile silently. Stop and surface the conflict.

## Prototype security boundary
- Binds to `127.0.0.1`, not the public network.
- No external submission route.
- No portal credentials.
- No Composio/OAuth yet.
- No browser/computer-use yet.
- Local state is developer-prototype state only; QM durable state replaces it before multiplayer/external-action release.

## Next verified slice after this one
After the real New World Kids need -> shortlist flow passes:
1. integrate QM at an exact pinned revision;
2. add Hermes as a first-class QM harness;
3. prove two authorized scopes and private-context isolation;
4. persist approval/audit state in QM;
5. add one application packet and fresh-context critic;
6. only then begin Agent-S save-draft portal work.
