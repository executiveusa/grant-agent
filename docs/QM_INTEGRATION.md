# QM Integration

## Decision
Use QM as the multiplayer control plane around Hermes. QM does not replace Hermes and does not replace ICM.

## Stack
- Grant Agent: product and nonprofit-domain behavior.
- QM: identity, scopes, durable runtime state, scheduling, audit, shared/private workspaces, sandbox boundaries, web/Slack surfaces.
- Hermes: Grant Director reasoning, delegation, skills, and specialist orchestration.
- ICM: canonical organization truth, evidence, programs, funding strategy, grant lifecycle artifacts, and approved workflow rules.
- Derived index: rebuildable search/embedding/ontology layer generated from ICM and approved sources.

## Hermes adapter
The uploaded QM snapshot defines a harness interface and currently routes Pi, OpenCode, Codex, Claude, and mock harnesses. Grant Agent should add Hermes as a first-class harness adapter rather than disguising it as another harness.

The adapter must map QM session/scope into Hermes run context, inject bounded ICM context, expose only QM-approved tools, stream progress back, persist run state, and stop at approval gates.

## Scope model
- Organization scope: approved mission, programs, public evidence, global goals, shared funding strategy.
- User scope: private notes, preferences, working files, and user-specific connected accounts.
- Team/project scope: shared application workspace for authorized collaborators.
- Ephemeral worker scope: bounded context/tools for one specialist job.

## Connector model
Composio is a connector/authentication bus under Grant Agent permission rules, not the control plane. A broad connected account must not automatically become available to every worker.

## Computer-use model
Agent-S is the last-mile execution engine behind the Portal Operator.

Priority: official API -> structured adapter/feed -> browser automation -> visual computer use.

## Local/private model
Combine local ICM/runtime stores with QVAC-backed local inference/embeddings/RAG where practical. Any task that reaches the public web, SaaS connectors, an external model, or a browser provider must be treated as leaving the local trust boundary.

## Multiplayer proof
Before market use, prove two-person collaboration, private-scope isolation, shared-context consistency, access revocation, action attribution, durable restart recovery, escalation/resume, and inability of a specialist worker to expand its own permissions.

## Adoption rule
The QM snapshot contains strong architecture but also documents security limitations. Reuse only the components/interfaces we can test. Do not market QM or Grant Agent as a security certification.