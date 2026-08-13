# Architecture

## One face, many workers

The user talks to one **Grant Director** built on Hermes. Specialist subagents are ephemeral workers, not separate products or permanent personalities. ICM is the durable state and routing layer.

```text
Human team / Slack / web chat
            |
      Grant Director
        (Hermes)
            |
   ICM context router
            |
  +---------+----------+----------+----------+
  |         |          |          |          |
Scout     Matcher     Writer   Evidence    Watchdog
  |         |          |          |          |
  +---------+----------+----------+----------+
            |
      Portal Operator
            |
      Agent-S/browser
            |
      external portals
```

## Specialist workers

### Grant Director
Understands goal, routes work, protects context budget, coordinates team, chooses tools, escalates decisions, and owns end-to-end state.

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

### Black Swan Strategist
Ethically searches for hidden constraints, unstated decision criteria, missing stakeholders, non-obvious fit signals, and leverage. It cannot fabricate funder preferences or use deceptive tactics.

## ICM + subagents
ICM alone is best for sequential human-reviewed work. Multiplayer concurrency genuinely needs runtime orchestration. We therefore use ICM as the shared filesystem/state machine and Hermes subagents for parallel execution. Every subagent gets only the current contract, required references, and explicit inputs, then writes a reviewable artifact back.

## Second brain
Two layers:
1. **ICM canonical layer** - portable Markdown/YAML/files; one home per fact.
2. **Queryable index layer** - embeddings/relational indexes/optional ontology graph generated from ICM and connected sources. The index is rebuildable; it is never the only home of important facts.

For larger deployments, adapt Context Ontology Accelerator ideas: Scan -> Model -> Serve, namespace isolation, ontology-backed concepts, and agents acting on behalf of users with delegated permissions.

## Factory before product
The product includes a nonprofit-instance factory. Onboarding produces a new organization workspace from templates: identity, programs, evidence, finance, legal, funder history, tool scopes, and approval rules. New customers should be instantiated, not hand-built.