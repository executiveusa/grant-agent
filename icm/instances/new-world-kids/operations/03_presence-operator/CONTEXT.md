# Lane 03 — Nonprofit Presence Operator

## Status: PARKED on the owner's 36 grill answers (2026-09-15). Research-only until they land.

## Purpose
Reusable "Nonprofit Presence Launch" workflow; NWKids is the first production test. Claim/create and verify the org's presence accounts. Loop: GRILL -> INSPECT -> ELIGIBILITY -> DISCOVER EXISTING -> CLAIM/CREATE -> VERIFY -> POPULATE -> QA -> EVIDENCE -> CONTINUE PAST BLOCKERS.

## Owner's laws (verbatim force)
- Inspect every open tab before opening anything new.
- Never create a duplicate account before searching for an existing one.
- Never invent nonprofit facts; prefer official documents over marketing copy.
- Use the org's controlled email (info@nwkids.org) for accounts and verification.
- Read verification emails and complete verification automatically where permitted.
- A failed site is a blocker to record, not the end of the run.
- Org owns every account. No purchases, no fundraising, no grants from this lane.
- Not every nonprofit qualifies for every platform (Google for Nonprofits needs IRS 501(c)(3); GBP excludes online-only orgs and may need live mobile video verification).

## Research completed 2026-09-15 (pre-grill)
- WA SOS verified: ACTIVE, exp 05/31/2027, EIN 85-1516064 (lane 01).
- No existing social accounts found (IG/FB/LinkedIn/X/YouTube/TikTok); no Candid/GuideStar/Charity Navigator profiles.
- Existing org accounts discovered in vault: "Google nwkidsorg@gmail.com", "GreatNonprofits nwkids" (agent-designated), "Hostinger account" (panel covers info@nwkids.org webmail).
- Eligibility hinge: own IRS 501(c)(3) almost certainly absent (HSI fiscal sponsor processes donations) - grill answer decides the Google for Nonprofits path.
- Org profile skeleton: org-profile-skeleton.md in this folder.

## Blockers to record
- Infisical web login: vault "Infisical token" credential rejected (present but stale) - HERMES project not inspectable until refreshed; webmail credential check must go through the Hostinger vault entry instead.
- ccfs.sos.wa.gov blocks config-b proxy; use config-c.
