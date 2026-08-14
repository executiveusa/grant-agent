# Prototype V1 — Discovery

## Input
Machine-readable Research Assignment generated from canonical New World Kids ICM.

## Process
Invoke the pinned/tested OpenProse Grant Finder CLI boundary:

`grant-finder research --assignment <path> --json`

Grant Finder is treated as a deterministic provenance/retrieval engine, not final eligibility authority.

## Output
Source-cited Research Packet containing candidates, evidence, deadlines/signals, and source-lane coverage available from the installed engine.

## Human gate
None for read-only public-source retrieval. If the engine is unavailable, stale in a material way, or returns invalid JSON, stop in `Needs you` rather than substitute model-generated opportunities.

## Completion
Packet is persisted as a versioned run artifact and passed to Match together with bounded canonical organization context.
