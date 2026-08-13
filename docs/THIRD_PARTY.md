# Third-Party Adoption Rules

Before copying or vendoring code/data, record: source commit/tag, license, NOTICE/attribution requirements, modification policy, update strategy, security review, and removal path.

Current decisions:
- Hermes: integrate as maintained runtime/upstream dependency, not a one-time copy.
- Agent-S: adapter boundary; pin tested versions.
- grant-finder: direct reuse candidate; preserve provenance behavior and MIT notices.
- OGrants metadata: CC0; proposal files are CC BY 4.0 and need attribution/author rights preserved.
- microgrants: CC0 seed data; do not assume entries are current - verify source status.
- CrewAI grant finder: workflow reference only because a repository license was not observed.
- ArrowJS: optional spike only; MIT.
- QVAC: Apache-2.0; local/private provider candidate.
- Context Ontology Accelerator: Apache-2.0; adopt patterns selectively rather than importing its AWS-heavy stack into MVP.
- pauli-remote-screen: AGPL-3.0; keep as a separable service/research boundary until commercial obligations are reviewed.

Do not train or fine-tune on third-party proposal text merely because it is publicly reachable. Licensing, attribution, privacy, and purpose must be reviewed first.