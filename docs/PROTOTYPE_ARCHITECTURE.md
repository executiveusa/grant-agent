# Executable Prototype Architecture

## Why this shell exists
The long-term product uses QM + Hermes + ICM. Prototype V1 deliberately proves the domain workflow before importing the whole control plane into the user-facing slice.

This is not architectural drift. It is the Collins/Gauntlet principle of building one verified slice before scaling the system.

## Runtime flow

```text
Browser chat
  |
POST /api/v1/need
  |
Director
  |-- ICM loader -> `icm/instances/new-world-kids`
  |-- Grant Finder adapter -> source-cited Research Packet
  |-- Hermes adapter -> bounded Grant Director judgment
  `-- StateStore -> Working / Needs you / Ready
```

## Ownership boundaries

### ICM owns
- organization identity
- mission/program context
- legal/fiscal-sponsor constraints
- approved factual context
- future evidence and funding history

### Grant Finder owns
- public-source retrieval
- local funding ledger
- provenance/source-lane evidence
- deterministic candidate packet for a fixed ledger/assignment

### Hermes owns
- contextual judgment
- candidate triage
- reasoned pursue/review/reject decisions
- identifying missing facts
- selecting the next human decision

### Prototype StateStore owns
- developer run state only
- work state
- artifact version
- approval version
- blocker/result packet

It does not own canonical organization facts.

### QM will own before multiplayer/external action
- authenticated identities
- organization/user/team scopes
- revocation
- durable operational state
- audit trail
- schedules
- sandbox boundaries
- runtime permission enforcement

## No-submit invariant
There is no Grant Agent code path in V1 that authenticates to or submits into a grant portal. A POST route containing `submit` returns 403. Browser/computer-use dependencies are intentionally absent.

## Interface contract
The interface exposes the minimum state a human needs:
- **Working**: keep doing the bounded job without interrupting the human.
- **Needs you**: a fact, judgment, permission, or blocker genuinely needs a person.
- **Ready**: bounded work is prepared for review/approval.

This contract is intentionally transport-independent so the same work state can later surface in web, Slack, mobile, voice, or wearable interfaces.
