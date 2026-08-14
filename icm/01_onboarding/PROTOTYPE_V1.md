# Prototype V1 — Customer Zero Onboarding

## Input
A New World Kids funding need stated in plain language.

## Canonical organization instance
`icm/instances/new-world-kids/`

## Process
1. Load the bounded customer-zero profile and context.
2. Refuse unsafe organization path identifiers.
3. Build the deterministic Research Assignment.
4. Hand the assignment to the Grant Finder adapter.
5. Preserve returned provenance in the run artifact.

## Output
A source-cited research packet ready for bounded Grant Director judgment.

## Human gate
If an organization fact required for eligibility is absent or disputed, do not infer it. Route the workflow to `Needs you`.

## Completion
This stage is complete only when the Research Assignment contains no invented organization facts and the discovery adapter either returns a source-cited packet or fails closed.
