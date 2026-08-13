# Build Plan

## Product goal
Build the factory first, then prove one end-to-end instance.

## Phase 0 - foundation (now)
Repository lock, ICM contracts, integration/legal matrix, product thesis, security model, Gauntlet bars, design direction.

## Phase 1 - Hermes distribution
Create Grant Agent as an overlay/distribution on the maintained Hermes core. Define Grant Director persona, tool allowlists, skill registry, subagent contracts, model routing, cron/proactivity, and ICM context loader. Preserve upstream sync.

## Phase 2 - organization brain
Implement tenant workspace generator and onboarding. Ingest website + uploaded docs + selected connectors into canonical ICM with provenance. Add query/index layer while keeping files authoritative.

## Phase 3 - discovery + matching
Integrate `openprose/grant-finder`, Grants.gov/public sources, microgrants seed, freshness registry, dedupe, hard-eligibility filter, source-cited fit packets, and benchmark fixtures.

## Phase 4 - application factory
RFP/PDF/portal requirement extraction, evidence map, question checklist, reusable response retrieval, drafting, budget/attachment planning, independent evidence critic, human edit/approval states.

## Phase 5 - multiplayer shell
Chat-first web UI + team channel integration. Primary surfaces only: conversation, `Working`, `Needs you`, `Ready`. Inline artifacts appear when decisions are needed. Composio handles per-user connections; audit/action permissions stay visible.

## Phase 6 - portal operator
Agent-S/browser adapter, isolated tenant sessions, save-draft flows, uploads, verification, stop-at-submit gate, human takeover. Build our own grant-portal benchmark before broad automation.

## Phase 7 - post-award + watchdog
Reporting/renewal obligations, proactive scans, Watchdog friction detection, daily/weekly "do smart things" routine within risk limits.

## Phase 8 - private/local
QVAC provider for local inference/embeddings/RAG, local workspace/storage, cloud-boundary indicators, sync/export controls. Do not promise fully offline behavior for web grant discovery.

## First-day AI-speed target
A working developer vertical slice, not false production completeness:
1. Hermes Grant Director boots from Grant Agent ICM.
2. One nonprofit workspace is generated.
3. One funding need becomes a `grant-finder` research assignment.
4. Source-cited candidates return.
5. Match worker rejects/qualifies with reasons.
6. One opportunity becomes a requirement checklist + draft packet.
7. Human approval state is persisted.
8. UI shows the conversation and the three work states.

Production requires security testing, tenant isolation, real portal tests, accessibility, billing, deployment, support, privacy/legal docs, and independent Gauntlet review.