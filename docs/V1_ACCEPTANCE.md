# Prototype V1 Acceptance Contract

## Product promise
**Software that gets you out of your seat.**

Prototype V1 proves one narrow funding workflow for New World Kids. It is not a production multi-tenant SaaS and it does not submit grants.

## V1 journey
Funding need -> canonical ICM -> deterministic Grant Finder research -> Hermes Grant Director ranking -> Working / Needs you / Ready.

## Safeguards carried forward from the architecture review

### Authorization and revocation
- V1 local user IDs are correlation identifiers, not production authentication.
- No external write/submit capability exists.
- Production identity and revocation must come from QM scopes/policy before any external-action feature ships.

### Private-data isolation
- V1 reads only the selected organization ICM instance.
- Organization IDs are path-validated.
- Secrets are never stored in ICM fixture files, API payload logs, or the repository.
- Before multiplayer production, prove two-scope isolation and access revocation in QM.

### State ownership
- ICM owns canonical institutional facts.
- The local `.grant-agent/state.json` owns only developer-prototype run state.
- Production run/approval/audit state moves to the QM durable store; the local JSON store is not the final architecture.

### Approval/version integrity
- Every material research/result mutation increments `artifactVersion` and invalidates prior approval.
- Approval is rejected if the requested version is stale.
- Prototype V1 exposes approval only for ready work and exposes no submission endpoint.

### Factual validation
- Grant Finder is a provenance/retrieval engine, not final eligibility authority.
- Hermes is instructed to use only canonical organization context and the source-cited packet.
- Missing facts become `Needs you`; the agent must not fill them in.
- A future application packet must pass a fresh-context evidence critic against the official opportunity source before submission can ever be enabled.

### Privacy gates
- Prototype prompts contain bounded organization context plus the selected research packet.
- The Hermes adapter exposes only the read-only `search` toolset.
- Local/private mode is a later QVAC/QM milestone; V1 must not be marketed as fully local because Hermes/provider calls and public research may leave the device.

## Definition of done for V1
- [ ] Node tests pass.
- [ ] New World Kids ICM loads and produces a valid Grant Finder assignment.
- [ ] Missing `grant-finder` fails closed into `Needs you` with no fake opportunities.
- [ ] Missing Hermes fails closed into `Needs you` with no fake ranking.
- [ ] With both adapters installed, one real New World Kids funding need returns source-cited candidates.
- [ ] Hermes returns only the documented structured match contract.
- [ ] At least one weak candidate is rejected with a source/evidence reason.
- [ ] Artifact mutation invalidates approval.
- [ ] Stale approval is rejected.
- [ ] No route or tool can externally submit a grant.
- [ ] Mobile viewport has no horizontal overflow and the primary input/action remain usable.
- [ ] Keyboard focus is visible.
- [ ] Reduced-motion preference is respected.

## Gauntlet rule
Do not call this 9.5 because the shell runs. A 9.5 claim requires real New World Kids workflow evidence, source-grounding accuracy, scope/security proof, independent critic review, browser/operator success data, and measured reduction in human work.
