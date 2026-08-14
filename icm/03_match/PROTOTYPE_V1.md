# Prototype V1 — Match

## Input
- canonical New World Kids ICM context
- the human's funding need
- source-cited Grant Finder Research Packet

## Process
Hermes runs as the bounded Grant Director reasoning adapter. Prototype V1 exposes only the read-only `search` toolset and explicitly denies authority to submit, message, change accounts, or modify canonical organization facts.

The output contract is structured JSON containing:
- summary
- pursue / review / reject per candidate
- reason
- source/evidence references
- missing facts
- single next action

## Output
A versioned match artifact.

## Human gate
Any pursue candidate with unresolved required facts becomes `Needs you`.

## Completion
- no fabricated eligibility or organization data
- weak candidates can be rejected explicitly
- source/evidence reason is retained
- workflow is `Ready` only when at least one pursue candidate has no unresolved missing fact in this bounded stage
