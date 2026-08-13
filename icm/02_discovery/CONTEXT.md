# 02 Discovery Contract

## Reads
Funding need + organization/program ICM + source policy registry.

## Does
Translate the funding need into a research assignment. Query official APIs and approved public sources first, then deterministic adapters such as `grant-finder`, then approved web research. Deduplicate and preserve provenance/freshness.

## Writes
Source-cited opportunity candidates with official URL, funder/program, amount/range when confirmed, deadline/certainty, geography, stated eligibility, source timestamp, and retrieval lane.

## Human check
Not required for routine public research. Escalate restricted/paywalled source access.

## Exit
Bounded candidate packet with explicit source coverage and no silent omissions for required lanes.