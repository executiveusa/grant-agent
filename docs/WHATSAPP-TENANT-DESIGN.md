# Reusable WhatsApp Grant Agent

## Product boundary

A tenant-scoped assistant for nonprofit teams. From WhatsApp, an approved organization member can ask it to research opportunities, compare fit, prepare source-backed drafts, list missing facts, track reviewed deadlines, and prepare follow-ups. It does not impersonate a person, submit grants, send follow-ups, spend, publish, or change canonical organization data without exact approval.

## Reference flow

1. Meta Cloud API receives a webhook and verifies the request signature.
2. The channel gateway normalizes the event and retains the provider message ID for idempotency.
3. An identity service maps the verified WhatsApp number to one tenant, actor, role, and permission set. Message text cannot select a tenant.
4. A tenant context loader reads only that organization's profile, approved files, prior runs, and connector grants.
5. Grant Agent creates or resumes a run, then returns `working`, `needs-you`, or `ready`.
6. Research adapters use official sources first and store source URL, observed time, excerpt, and extraction method.
7. Draft artifacts are versioned. Any material edit invalidates approval.
8. The outbound gateway may send status and review links within the tenant's approved WhatsApp scope. Submission and external follow-up are separate actions with separate gates.
9. Every action writes an append-only receipt with tenant, actor, provider message ID, artifact version, sources, policy decision, and outcome.

## First safe release

- One verified WhatsApp number maps to one tenant.
- Research, matching, drafting, and review only.
- No grant submission connector or automatic funder messaging.
- Tenant-specific encrypted storage and secrets.
- Explicit retention and deletion controls.
- Rate limits, webhook replay protection, idempotency, audit export, and kill switch.

## Required components

- `whatsapp-gateway`: signature verification, normalization, delivery receipts, retries.
- `tenant-identity`: phone-to-tenant binding, role checks, revocation.
- `grant-director`: current source-backed match and draft loop.
- `artifact-review`: versioned drafts and scoped approval challenges.
- `connector-broker`: least-privilege source access, disabled by default.
- `receipt-ledger`: immutable audit events with privacy-safe exports.
- `operator-console`: tenant provisioning, revocation, data deletion, incident controls.

## Approval challenge

A review request must show the organization, action, recipient or destination, artifact version, material facts, and expiry. Approval tokens are single-use and invalid after any artifact change. A WhatsApp "yes" is accepted only when it replies to a live challenge from the bound actor and the provider reply reference matches that challenge.

## Acceptance tests before pilot

- Cross-tenant access and confused-deputy tests fail closed.
- Forged signatures, replayed messages, duplicate webhooks, and unbound numbers fail closed.
- Prompt instructions inside source pages and uploaded files cannot change tools, goals, or tenant.
- Stale approval and edited-draft tests fail.
- Every match claim has a source and observed time.
- Export and deletion work for one tenant without affecting another.
- Human takeover and kill switch are proven.
