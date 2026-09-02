# Mission Completion Standard

## Locked rule

A governed mission is **not complete** because an agent says it is complete.

A mission may be reported as complete only when all three conditions are true:

1. the governing GitHub Actions workflow reaches `completed`;
2. every required job and required gate concludes `success`;
3. the mission produces the required review artifact and that artifact passes its own validation gate.

For the ASC3ND funding mission, the required artifact is:

`asc3nd-funding-review-packet`

containing:

`artifacts/asc3nd-funding-review-packet.json`

The packet must declare `status: READY_FOR_REVIEW`, preserve source/evidence data, and keep external submission disabled during the proof phase.

## Human-facing states

- `WORKING` — required jobs are queued or running.
- `FAILED` — a required gate or artifact check failed. Report the failing gate and evidence; do not claim partial work as success.
- `READY_FOR_REVIEW` — workflow completed, all required gates passed, and the required review artifact exists and validates.
- `APPROVED` — a human with the required authority approved the relevant artifact/action.
- `DELIVERED` — an approved external action succeeded and proof was recorded.

`READY_FOR_REVIEW` is not permission to submit a grant, send external communication, make a payment, accept legal terms, or perform another consequential action.

## Evidence rule

Every completion claim must point to the workflow run and the required artifact. Re-running the same mission must generate a new run and a new artifact; old successful evidence does not prove the new run.

## ASC3ND proof contract

The current proof requires:

- Node/runtime verification;
- Grant Agent contract tests;
- local server smoke with submission disabled;
- pinned OpenProse Grant Finder build;
- New World Kids regression discovery contract;
- ASC3ND deterministic funding mission;
- ASC3ND review packet validation;
- successful artifact upload.

Only after all of the above pass may the run be called `READY_FOR_REVIEW`.
