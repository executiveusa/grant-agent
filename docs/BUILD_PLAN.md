# Build Plan

## Product goal
Build the factory first, then prove one end-to-end nonprofit instance with New World Kids before selling the system.

## Phase 0 - foundation
Repository lock, ICM contracts, integration/legal matrix, product thesis, security model, Gauntlet bars, design direction, Black Swan hypotheses.

## Phase 1 - runtime/control-plane architecture
Integrate Grant Agent as a maintained product distribution using:
- QM for multiplayer identity, scopes, policy, durable operational state, schedules, audit, and per-scope sandbox boundaries.
- Hermes as the Grant Director reasoning/orchestration harness.
- ICM as canonical organization/funding context.

Create a Hermes adapter against QM's harness contract. Do not fork QM core into organization-specific code. Define tool allowlists, skill registry, subagent contracts, model routing, cron/proactivity, context-loader boundary, and approval semantics. Preserve clean upstream update paths for both QM and Hermes.

## Phase 2 - organization brain
Implement tenant/workspace generator and onboarding. New World Kids is fixture zero.

Ingest approved website content + uploaded documents + selected connectors into canonical ICM with provenance. Add query/index layer while keeping files authoritative. Map users/rooms to QM scopes and explicit shared/private context grants.

## Phase 3 - discovery + matching
Integrate `openprose/grant-finder`, Grants.gov/public sources, microgrants seed, freshness registry, dedupe, hard-eligibility filter, source-cited fit packets, and benchmark fixtures. Add OGrants as precedent intelligence with license/provenance controls.

## Phase 4 - application factory
RFP/PDF/portal requirement extraction, evidence map, question checklist, reusable response retrieval, drafting, budget/attachment planning, independent evidence critic, human edit/approval states.

## Phase 5 - multiplayer disappearing interface
Use QM web/Slack surfaces or thin product-specific shells over QM identity/session primitives. Primary user experience is conversation plus:
- `Working`
- `Needs you`
- `Ready`

Inline artifacts appear only when a decision is needed. Composio handles broad per-user SaaS connections where appropriate. Audit/action permissions remain inspectable but are not the primary UI.

Design for future voice/mobile/wearable surfaces now by keeping work commands outcome-based and stateful rather than dashboard-dependent.

## Phase 6 - portal operator
Agent-S/browser adapter, isolated tenant sessions, approved credentials, save-draft flows, uploads, verification, stop-at-submit gate, human takeover path. Build our own grant-portal benchmark before broad automation. API/structured adapters always take precedence over visual computer use.

## Phase 7 - post-award + watchdog
Reporting/renewal obligations, proactive opportunity scans, Watchdog friction detection, daily/weekly goal review, and bounded "do smart things" routine. Proactivity may expand breadth but not the action risk tier.

## Phase 8 - private/local edition
Prototype QM deployment plus local ICM/storage and QVAC-backed inference/embeddings/RAG. Add explicit cloud-boundary indicators for web research, model calls, Composio, and browser providers. Local/private is an architecture mode, not a vague privacy claim.

## Phase 9 - capital readiness
After grant operations are proven, add a financial-readiness lane for the nonprofit itself: clean document room, banking packets, revenue/receivable tracking, reserves, grant/contracts pipeline, lender requirements, financing opportunity research, and capital-stack planning.

Explore mission-lending structures only after legal/compliance research. Potential paths include partnering with existing CDFIs, becoming an SBA microloan intermediary where eligible, or eventually building a qualifying financing entity/CDFI structure. Do not represent the organization as a lender or extend regulated credit from software alone.

## Phase 10 - nonprofit operating system expansion
Reuse the same factory for adjacent domain operators:
- fundraising/campaigns
- donor stewardship
- reporting/compliance
- volunteer coordination
- program administration
- communications
- board/governance support
- capital readiness

Grant Agent remains the wedge and proving ground.

## Tonight's verified vertical slice
Target a working internal system, not false production completeness:
1. QM core boots in a development deployment with one org and at least two scopes.
2. Hermes adapter satisfies the QM harness contract and runs the Grant Director.
3. ICM loader mounts one New World Kids workspace as canonical context.
4. One real NW Kids funding need becomes a machine-readable `grant-finder` assignment.
5. Source-cited candidates return.
6. Match worker rejects/qualifies candidates with explicit reasons and evidence.
7. One selected opportunity becomes a requirements checklist + first draft packet.
8. Evidence critic runs in fresh bounded context.
9. Human approval state persists in durable state.
10. A second authorized team scope can inspect/collaborate without leaking private scope data.
11. UI/channel shows only conversation plus Working / Needs you / Ready for the core flow.
12. No external grant submission is possible in this slice.

## Required proof before calling the vertical slice complete
- deterministic fixture test for discovery
- ICM provenance on every organization fact used in fit/drafting
- two-scope isolation test
- restart test proving operational state is durable
- fresh-context critic on one application packet
- human approval persistence test
- no hidden credentials in repo/logs
- one real NW Kids opportunity reviewed against its official source

## Production requirements
Security testing, tenant isolation, real portal tests, accessibility, billing, deployment, observability, support, privacy/legal docs, data export, disaster recovery, model/browser provider disclosure, and independent Gauntlet review.