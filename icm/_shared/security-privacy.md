# Security, Privacy, and Permission Model

Grant data can include financials, personnel information, donor/funder relationships, legal documents, account credentials, and unpublished program strategy. Privacy is product behavior, not marketing copy.

## Tenant boundary
- Every organization has an immutable tenant/workspace ID.
- ICM paths, indexes, files, connections, browser sessions, and audit records are tenant-scoped.
- No cross-tenant retrieval, memories, examples, or training by default.
- Canonical facts remain exportable from ICM.

## Identity
Agents act on behalf of an authenticated user/team role. Adopt the delegated-access idea used by Context Ontology Accelerator: no magical universal agent identity. Tool calls resolve to a user, tenant, role, and explicit grant of permission.

## Roles
Suggested baseline: Owner, Grant Lead, Contributor, Reviewer, Read Only, Agent Service. Each tool and action declares required role.

## Side-effect tiers
- **Tier 0 - read:** search public sources, read authorized docs, summarize.
- **Tier 1 - internal write:** create/edit ICM artifacts, draft applications, update internal pipeline.
- **Tier 2 - reversible external:** save a draft in a portal, create calendar reminder, draft email; logged and scoped.
- **Tier 3 - consequential:** send external email, accept terms, submit application, spend money, change account settings. Requires explicit policy/approval unless an owner has pre-authorized that exact action class.

The agent may become more proactive without silently increasing its risk tier.

## Browser/computer use
- isolated browser profile/session per tenant
- narrow task packet
- domain allowlist
- secret injection outside model context
- no credential logging/screenshots in long-term memory
- screenshot/action trace for auditable operations where lawful
- stop-and-escalate on CAPTCHA, MFA, legal attestations, ambiguity, or unexpected account changes
- human takeover path

## Composio
Use stable internal user IDs, per-user connected accounts, minimum OAuth scopes, separate read/write auth configs where useful, and connection revocation. Credentials should not pass through model text.

## Local/private edition
QVAC is the preferred local-first research path for on-device model inference, embeddings, and RAG. Local mode must make its boundary explicit: which operations are fully local and which connectors/web lookups still leave the device.

## Cloud edition
Do not store customer production data in a shared experimental database without a deliberate tenant/RLS/security review. The current Grant Agent repo has no dedicated Vercel project and no dedicated Supabase project; provisioning is a later gated step.

## Secrets
Never commit secrets, browser cookies, raw OAuth tokens, portal passwords, API keys, or personal credentials. ICM stores secret *names/pointers* only.

## Audit
Log who/what/when/tenant/tool/action/result/approval/provenance. The Watchdog scans repeated failures and permission drift.