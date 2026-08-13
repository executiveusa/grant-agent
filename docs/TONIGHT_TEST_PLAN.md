# Tonight Test Plan

## Goal
Prove the New World Kids funding workflow end to end without external submission.

## Flow
`funding need -> QM scope -> Hermes Grant Director -> ICM -> grant-finder -> match -> draft packet -> independent critic -> human decision state`

## Tasks
1. Pin QM and Pauli Hermes revisions and document license/update strategy.
2. Boot one local Grant Agent organization.
3. Implement Hermes as a QM harness adapter with scope/session/context/tool mapping.
4. Instantiate a verified New World Kids ICM workspace and one real funding goal.
5. Create shared, owner-private, and second-team-member scopes and test isolation.
6. Convert the funding goal into `grant-finder` assignment JSON and persist source-cited candidates.
7. Run fit analysis with hard disqualifiers, evidence, uncertainty, and effort.
8. Turn one candidate into an official-requirements checklist and draft packet.
9. Run a fresh-context critic that did not author the packet.
10. Persist one Needs-you/approval state and resume after an authorized teammate responds.
11. Expose only conversation plus Working / Needs you / Ready for this slice.

## Proof
- restart preserves workflow state
- private scope remains private
- candidates retain official/public provenance
- organization facts used in drafting map to ICM evidence
- fresh critic reports no unresolved critical factual errors before Ready
- external submission is not available in this slice
- one real NW Kids opportunity is manually checked against the official source

## Gauntlet
Ask:
- Does this remove work or create another tool to operate?
- Can a nontechnical leader state an outcome and understand the next step?
- Does multiplayer eliminate handoffs?
- Is ICM still authoritative?
- Can consequential actions occur without the intended gate?
- Can QM/Hermes be upgraded without rebuilding Grant Agent?
- Can the organization export its institutional context?

## Stop conditions
Fix architecture before adding features if scope isolation fails, ICM and runtime facts diverge, Hermes requires invasive QM-core changes, humans must manually orchestrate workers, or the critic cannot trace claims to evidence.