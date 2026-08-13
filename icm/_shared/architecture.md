# Architecture

## One face, many workers

The user talks to one **Grant Director**. The Grant Director is powered by Hermes. Specialist subagents are ephemeral workers, not separate products or permanent personalities. ICM is the canonical institutional context. QM is the multiplayer operating fabric around the agent: identity, scopes, permissions, durable sessions, schedules, audit, shared rooms, and isolated sandboxes.

```text
Human team / web / Slack / future voice-wearables
                    |
                    v
              QM surfaces
                    |
       identity + scope + policy + audit
                    |
                    v
             Grant Director
                (Hermes)
                    |
             ICM context router
                    |
  +---------+-------+-------+----------+----------+
  |         |               |          |          |
Scout     Matcher         Writer    Evidence   Watchdog
  |         |               |          |          |
  +---------+-------+-------+----------+----------+
                    |
              Portal Operator
                    |
             Agent-S / browser
                    |
              external portals
```

## What each layer owns

### Grant Agent product layer
Owns nonprofit/funding UX, ICM schemas, workflows, evaluation, grant-source policies, agent contracts, packaged deployment, and market offer.

### QM control plane
Use QM as the **team operating fabric**, not as another chatbot. The uploaded QM architecture provides personal/shared scopes, durable Postgres-backed state, per-scope sandboxes, identity/policy, keychain/credential views, crons/watches, web and Slack surfaces, skills, audit, and interchangeable agent harness adapters.

Grant Agent should adopt these ideas/interfaces rather than independently rebuilding multiplayer primitives. Organization-specific Grant Agent data remains outside QM core. If QM is consumed as an upstream dependency/private downstream, preserve a clean upstream boundary.

### Hermes cognition layer
Hermes is the Grant Director harness: reasoning, delegation, skills, model routing, persistence/learning hooks, long-running work, and specialist orchestration. We add a Hermes harness adapter to QM rather than forcing Grant Agent to use Pi/Claude/Codex as its product brain.

### ICM canonical context layer
ICM remains authoritative for organizational truth, workflows, evidence, policies, grant history, and reusable institutional memory. QM memory/session stores are operational runtime state. They may index or reference ICM, but they must not silently become the only home of business-critical facts.

### Queryable second brain
Derived indexes may include relational search, embeddings, and an optional ontology graph. They are rebuildable from ICM and approved connected sources. For larger deployments, adapt Context Ontology Accelerator ideas: Scan -> Model -> Serve, namespace isolation, ontology-backed concepts, provenance, and delegated acting authority.

### Tools and execution
- `openprose/grant-finder`: deterministic/source-cited discovery and provenance engine.
- Grants.gov/public APIs: preferred first-party discovery lanes.
- OGrants: precedent/example intelligence under its documented licenses.
- microgrants: seed discovery source, revalidated for freshness.
- Composio: broad per-user SaaS connector/authentication bus where appropriate.
- Agent-S: visual/GUI computer-use execution for portal work when APIs/structured adapters are unavailable.
- Open Operator: computer-use research and benchmark reference.
- remote-screen: potential consented human-takeover layer; isolate until AGPL deployment implications are approved.
- QVAC: local inference/embedding/RAG option for privacy-first deployments.
- ArrowJS: optional experiment for ephemeral agent-generated micro-UI; it does not replace the primary application stack unless a spike proves material advantage.

## Specialist workers

### Grant Director
Understands the funding goal, routes work, protects context budget, coordinates the human team, chooses tools, escalates decisions, and owns end-to-end state.

### Funding Scout
Uses official APIs, public feeds, `grant-finder`, approved datasets, and web research. Writes source-cited candidate records; does not make final eligibility claims.

### Fit Analyst
Compares opportunity requirements with organization/program ICM. Produces fit, disqualifiers, missing facts, effort estimate, confidence, and explicit evidence.

### Proposal Architect / Writer
Turns the official RFP plus approved organization evidence into a requirements checklist, outline, responses, attachment plan, and draft. Never invents outcomes or budgets.

### Evidence & Compliance Critic
Fresh-context reviewer. Verifies every factual claim, eligibility condition, deadline, attachment, word limit, and cross-answer inconsistency against official sources and ICM evidence.

### Portal Operator
Receives a narrow execution packet and uses browser/computer control. It may navigate, fill approved answers, upload approved files, and save drafts. Submission is policy-gated.

### Watchdog / Friction Observer
Observes failures, repeated corrections, missing context, duplicate work, stale sources, tool permission problems, deadline risk, and workflow bottlenecks. Recommends changes; it does not silently rewrite canonical facts.

### Reporting / Renewal Worker
Maintains award obligations, reporting dates, evidence requests, deliverables, renewal windows, and reusable outcome narratives.

### Capital Readiness Worker
Future lane. Tracks organizational financial readiness, banking documentation, contracts/receivables, reserves, covenants, lender requirements, and financing opportunities. It may prepare readiness packets but may not provide regulated lending/legal conclusions without appropriate review.

### Black Swan Strategist
Ethically searches for hidden constraints, unstated decision criteria, missing stakeholders, non-obvious fit signals, and leverage. It cannot fabricate funder preferences or use deceptive tactics.

## ICM + QM scopes + Hermes subagents

Use three different concepts deliberately:

1. **ICM workspace** = durable institutional truth and workflow artifacts.
2. **QM scope** = who is acting, what they may see/use, and their operational sandbox/session boundary.
3. **Hermes subagent** = temporary specialist reasoning/execution worker.

Example: Finance and Programs can share the same organization ICM while QM ensures each user/room receives only authorized context/tools. Hermes can then spawn a Budget Reviewer with only the selected grant, approved budget files, and current task contract.

## Multiplayer model

Humans should not manage a visible swarm. They collaborate with one Grant Director in shared/private channels. QM handles identity and scope. The Grant Director delegates internally. The team sees work states and escalations, not infrastructure.

Primary work states:
- **Working** - agent has enough context/authority to continue.
- **Needs you** - a bounded fact, judgment, permission, or approval is required.
- **Ready** - a meaningful artifact/outcome is complete and inspectable.

## Proactive model

The system may proactively research, compare, prepare, monitor, and recommend when goals, context, and permission make the action low-risk. Risk tier does not expand merely because scope expands. External submissions, binding terms, financial commitments, permission changes, sensitive credential grants, and other material side effects remain explicit gates.

The standing internal instruction is not merely "do smart things." It is:

**Do smart things that advance documented organizational goals using only authorized context and tools, and escalate actions above the current risk tier.**

## Software that gets you out of your seat

The product philosophy is to remove screen-bound administrative work rather than accelerate humans into doing more of it. Web chat is the first interface, not the final interface. Architecture must support Slack, email, voice, mobile notifications, and future wearable/ambient interfaces without requiring the user to operate a dashboard.

The interface should disappear as confidence rises: users state outcomes, inspect important work, answer escalations, and approve consequential actions.

## Factory before product

The product includes a nonprofit-instance factory. Onboarding produces a new organization workspace from templates: identity, programs, evidence, finance, legal, funder history, tool scopes, approval rules, team mapping, and evaluation fixtures. New customers should be instantiated, not hand-built.

The deeper platform opportunity is a reusable nonprofit operating-system factory. Grant Agent is the first vertical because funding work has clear pain, measurable outcomes, rich context, and valuable repetitive execution.