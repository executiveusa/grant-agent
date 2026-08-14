# Third-Party Adoption Rules

Before copying or vendoring code/data, record: source commit/tag, license, NOTICE/attribution requirements, modification policy, update strategy, security review, and removal path.

## Prototype V1 baselines

### Pauli Hermes Agent
- Source: `executiveusa/pauli-hermes-agent`
- Prototype baseline: `3c3f9a60f576ef47d079e511a18e01764b0af772`
- Role: maintained Grant Director runtime/orchestration dependency, not vendored code.
- Update strategy: test new upstream/main revisions behind the adapter; never assume a Hermes update is Grant Agent-safe until the V1 contract tests and a bounded live run pass.
- Removal path: replace the `src/hermes.ts` adapter with another harness without changing canonical ICM.

### OpenProse Grant Finder
- Source: `openprose/grant-finder`
- Prototype baseline inspected: `35e947d928d4d9ce377fb31f21fa774fe5a90425`
- Role: deterministic/source-cited discovery and provenance engine invoked through its public CLI contract.
- V1 command contract: `grant-finder research --assignment <path> --json`.
- Update strategy: pin the installed binary/source revision during a measured New World Kids run; update only after fixtures and provenance behavior pass.
- Removal path: another discovery adapter may implement the same Research Assignment -> source-cited packet boundary.

### QM
- Source: `yc-software/qm`
- Uploaded architecture snapshot reviewed for this build: `/mnt/data/qm-main.zip`, SHA-256 `4fbb9c43a9da8dbc00c68310b0c09e0991db52a19cd565450cb09f8f53b4090e`.
- Snapshot root package: `qm` `0.1.0`, MIT; included control-plane CLI package `@yc-software/qm` `0.1.6`, MIT.
- Role: multiplayer identity/scope/policy/durable-state/scheduling/audit/sandbox control plane.
- V1 status: architecture adopted; the lightweight developer shell does **not** yet claim to be the full QM runtime.
- Update strategy: before coding the first-class Hermes QM harness, choose and record the exact tested upstream commit because QM is changing rapidly. Never float production on `main`.
- Removal path: ICM and Grant Agent domain contracts remain portable even if the control plane changes.

## Current decisions
- Hermes: integrate as maintained runtime/upstream dependency, not a one-time copy.
- Agent-S: adapter boundary; pin tested versions before computer-use work.
- grant-finder: use through its CLI/provenance boundary; preserve provenance behavior and MIT notices when distribution requires them.
- OGrants metadata: CC0; proposal files are CC BY 4.0 and need attribution/author rights preserved.
- microgrants: CC0 seed data; do not assume entries are current - verify source status.
- CrewAI grant finder: workflow reference only because a repository license was not observed.
- ArrowJS: optional spike only; MIT.
- QVAC: Apache-2.0; local/private provider candidate.
- Context Ontology Accelerator: Apache-2.0; adopt patterns selectively rather than importing its AWS-heavy stack into MVP.
- pauli-remote-screen: AGPL-3.0; keep as a separable service/research boundary until commercial obligations are reviewed.

Do not train or fine-tune on third-party proposal text merely because it is publicly reachable. Licensing, attribution, privacy, and purpose must be reviewed first.
