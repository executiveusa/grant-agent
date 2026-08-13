# Integration Matrix

Everything supplied to the project has a role. "Integrate" does not always mean copy source code.

| Source | Role in Grant Agent | Integration form | License / risk |
|---|---|---|---|
| `executiveusa/pauli-hermes-agent` | Core reasoning, memory, skills, cron, subagents, model/tool routing | Pinned upstream-compatible runtime/overlay; preserve update path | MIT upstream; maintain fork boundary |
| `executiveusa/pauli-agent-S-computer-use-` | Computer/browser execution | Portal Operator adapter; isolated sessions; task-specific permission packets | Apache-2.0 upstream; high side-effect risk |
| `OpenHands/open-operator` | Computer-use capability/evaluation research | Benchmark and architecture reference | MIT; not the runtime itself |
| `executiveusa/pauli-remote-screen-` | Human takeover and visible remote-session concepts | Evaluate as separate service/boundary, not tightly copied into proprietary core | AGPL-3.0; legal/deployment review required |
| `openprose/grant-finder` | Deterministic, source-cited opportunity discovery | First-class CLI/service adapter; machine-readable research packets | MIT; strong candidate for direct reuse |
| `weecology/ogrants` | Funded-proposal exemplars + grant metadata | Metadata ingestion; proposal exemplars with attribution/license metadata | metadata CC0; proposals CC BY 4.0; site MIT |
| `nayafia/microgrants` | Microgrant opportunity seed | Import/normalize CC0 records; freshness checker required | CC0 |
| `deacs11/CrewAI_Grant_Funding_Opportunity_Finder_-_Eligibility_Checker_Crew` | Useful decomposition pattern: extract -> search -> extract -> eligibility -> report | Reference architecture only | no repo license observed; do not copy implementation |
| `standardagents/arrow-js` | Agent-native ephemeral UI and sandbox experiment | Spike `@arrow-js/sandbox` for safe generated micro-interfaces; do not make core UI dependent until proven | MIT |
| `justin-schroeder` | Adjacent agent/UI engineering research | Research only until a specific repo/use is named and licensed | per-repo review |
| ICM Architect | Core durable context architecture | Adopt invariants and folder contracts directly | MIT |
| Gauntlet Loop | Quality-control process | Store bars, separate builder/critic, blind comparisons, no round-count exit | process/skill |
| Black Swan Spotter | Hidden-constraint and opportunity analysis | Ethical strategy/critic skill; no deceptive funder manipulation | user-supplied skill; source-derived methods need careful public-copy use |
| Context Ontology Accelerator | Queryable company / semantic context / permissions | Adapt Scan-Model-Serve, namespace roles, ontology/index layer, delegated user access | Apache-2.0; AWS-heavy implementation is deferred |
| QVAC | Local/private edition | Local model provider, embeddings/RAG, optional on-device fine-tuning | Apache-2.0 |
| Composio | Team tool connectivity | Per-user authenticated sessions, OAuth/tool connections, triggers, scoped actions | external service; document data-flow/vendor dependency |
| Collins-Level Website Protocol | Marketing/product design governance | Required design gates and independent reviews | internal protocol |

## Source priority for grant discovery

Use the most deterministic/legal interface available:

**official API -> public structured feed -> deterministic adapter -> normal web research -> browser automation -> visual computer use**

Computer use is for workflows that cannot be completed reliably through APIs. It should not replace APIs just because clicking is possible.

## Paid databases
Each source gets a machine-readable policy record: allowed methods, terms URL, permitted scope, login requirements, caching/retention rules, and review date. Restricted sources (for example, GrantStation under its current terms) must remain human-assisted unless written permission authorizes automation.