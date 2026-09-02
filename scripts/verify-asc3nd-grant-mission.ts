import assert from "node:assert/strict";
import { mkdir, writeFile } from "node:fs/promises";
import { buildResearchAssignment, loadOrganization } from "../src/icm.ts";
import { researchFunding } from "../src/grant-finder.ts";

const org = await loadOrganization("asc3nd");
const need = "Find current non-dilutive funding for youth development, mentorship, practical life skills, community participation, and opportunity access in Everett, Snohomish County, and Washington.";
const assignment = buildResearchAssignment(org, need);
const packet: any = await researchFunding(assignment);

assert.equal(assignment.company_profile.name, "ASC3ND Collective");
assert.equal(packet.assignment_id, assignment.assignment_id);
assert.equal(packet.retrieval?.no_llm, true, "Grant Finder retrieval must remain deterministic/no-LLM");
assert.ok(Array.isArray(packet.grants), "Research Packet must contain grants[]");
assert.ok(Array.isArray(packet.coverage), "Research Packet must contain coverage[]");

for (const grant of packet.grants) {
  assert.equal(typeof grant.recommendation_id, "string");
  assert.equal(typeof grant.program_name, "string");
  assert.equal(typeof grant.url, "string");
  assert.ok(grant.url.startsWith("http"), "Every opportunity must carry a source URL");
  assert.ok(Array.isArray(grant.evidence));
  for (const evidence of grant.evidence) {
    assert.equal(typeof evidence.url, "string");
    assert.equal(typeof evidence.claim, "string");
  }
}

const reviewPacket = {
  version: "1.1",
  status: "READY_FOR_REVIEW",
  tenant: org.profile.id,
  organization: org.profile.name,
  funding_need: need,
  assignment,
  generated_at: new Date().toISOString(),
  completion_standard: {
    workflow_completed: true,
    required_checks_passed: true,
    review_packet_produced: true,
    agent_action_packet_produced: true,
    external_submission_enabled: false,
  },
  summary: {
    grant_count: packet.grants.length,
    high_fit_count: packet.summary?.high_fit_count ?? null,
    coverage: packet.coverage.map((row: any) => ({ lane: row.source_lane, status: row.status })),
  },
  opportunities: packet.grants,
};

const highFit = packet.grants.filter((grant: any) => grant.eligibility_fit?.level === "high").length;
const mediumFit = packet.grants.filter((grant: any) => grant.eligibility_fit?.level === "medium").length;
const lowFit = packet.grants.filter((grant: any) => grant.eligibility_fit?.level === "low").length;

const briefLines = [
  "# ASC3ND Funding Review Brief",
  "",
  `Status: ${reviewPacket.status}`,
  `Generated: ${reviewPacket.generated_at}`,
  `Organization: ${reviewPacket.organization}`,
  `Funding need: ${need}`,
  "",
  "## Executive decision",
  "",
  `The discovery workflow passed, but the current result is not application-ready. ${packet.grants.length} opportunities were returned: ${highFit} high fit, ${mediumFit} medium fit, and ${lowFit} low fit. This packet proves the workflow; it does not prove that ASC3ND should apply to any retrieved grant.`,
  "",
  "Recommended next action: approve a Discovery Refinement Mission that verifies grant-critical ASC3ND facts, expands discovery to local/private sources, applies hard eligibility before ranking, and returns no more than five defensible opportunities.",
  "",
  "No grant submission is authorized by this packet.",
  "",
  "## Current candidates",
  "",
  ...packet.grants.flatMap((grant: any, index: number) => [
    `### ${index + 1}. ${grant.program_name}`,
    `- Agency: ${grant.agency}`,
    `- Deadline: ${grant.deadline ?? "Unknown"}`,
    `- Fit: ${String(grant.eligibility_fit?.level ?? "unknown").toUpperCase()}`,
    `- Source: ${grant.url}`,
    "- Action: Do not pursue until hard eligibility and ASC3ND applicant status are verified.",
    "",
  ]),
  "## Human facts needed before serious matching",
  "",
  "- Legal entity name and EIN",
  "- Current 501(c)(3) status or fiscal sponsor arrangement",
  "- Current programs, target ages/populations, and service geography",
  "- Current annual and program budgets",
  "- Measurable outcomes or credible proxy evidence",
  "- Leadership/board roster where required",
  "- Current partners",
  "- Standard attachments available",
  "- Practical grant-size range",
  "",
  "## Approval boundary",
  "",
  "Safe without further approval: public research, requirements extraction, deadline verification, internal eligibility checks, internal fit memos, evidence maps, and internal drafts based only on approved facts.",
  "",
  "Explicit human approval required: funder contact, external email, portal account changes, acceptance of terms, final uploads, legal certifications, application submission, spending money, credential changes, or destructive actions.",
].join("\n");

const agentReadme = `# ASC3ND Funding Packet - Agent Operating Instructions

This package is both a human review packet and an agent action packet.

## Operating law

Use ICM as the canonical source of organization truth. Do not treat this README, search output, model memory, or prior drafts as authority for an ASC3ND fact unless the fact is linked to approved ICM provenance.

## ICM execution pattern

\`\`\`text
00_intake
-> 01_load_context
-> 02_define_acceptance
-> 03_research
-> 04_eligibility
-> 05_prepare
-> 06_independent_review
-> 07_human_approval
-> 08_external_action
-> 09_evidence
-> 10_learning
\`\`\`

Each stage writes a durable artifact before the next begins.

## Mission states

WORKING | NEEDS_HUMAN | READY_FOR_REVIEW | APPROVED | EXECUTING_APPROVED_ACTIONS | COMPLETED | FAILED

Never report COMPLETED unless acceptance gates pass and evidence exists.

## Immediate mission

Current state: READY_FOR_REVIEW.

The current discovery produced no high-fit opportunities. The next valid mission is refine discovery, not apply to the first retrieved grant.

### After human approval, take real steps

When a human explicitly approves \`APPROVE: discovery-refinement:v1\`:

1. Load the ASC3ND ICM profile and provenance index.
2. Create a structured unknowns artifact for every grant-critical fact still missing.
3. Resolve only facts supported by approved internal sources or primary public sources.
4. Put unresolved facts into NEEDS_HUMAN; never guess.
5. Search sources in this order: official grant APIs/government programs; Washington/Snohomish/Everett sources; community foundations; corporate/community giving; youth-development/mentoring funders; private foundations with current published eligibility.
6. Normalize each opportunity into the common grant artifact schema.
7. Apply hard eligibility filters before fit scoring.
8. Reject opportunities that fail geography, entity type, program purpose, applicant status, deadline, or other hard requirements.
9. For survivors, record source URL, deadline, supported amount/range, eligibility evidence, fit rationale, effort, missing information, and recommended next step.
10. Return no more than five opportunities unless a human requests more.
11. Run an independent critic in fresh context.
12. Stop at READY_FOR_REVIEW.

### After a human approves one opportunity

The agent may extract the complete NOFO/RFP requirements, build an evidence map from ICM, identify missing facts/attachments, draft answers using only sourced facts, build a budget-input checklist without inventing numbers, run fact/provenance review, run Humanizer only after facts are locked, run a fresh Gauntlet critic, and package the result as READY_FOR_APPLICATION_REVIEW.

## Approval semantics

Approval must be explicit and bound to action class plus artifact version.

Examples:
- \`APPROVE: discovery-refinement:v1\`
- \`APPROVE: prepare-application:<opportunity-id>:<artifact-version>\`
- \`APPROVE: submit-application:<opportunity-id>:<artifact-version>\`

A general "looks good" is not submission authority.

## Tier 3 external-action gate

Grant submission, legal attestation, external email, portal acceptance, payments, credential changes, and destructive actions require explicit approval. Before acting, verify tenant=asc3nd, artifact version, approval ID, exact action class, destination, and that no required fact remains unresolved. Otherwise stop at NEEDS_HUMAN.

## Evidence returned to ICM

After every approved external action, record mission ID, tenant, actor/agent, action, source/destination, artifact version, approval ID, timestamp, result, confirmation/receipt, errors/retries, and next obligation/deadline. Never store passwords, tokens, MFA codes, or raw secrets in ICM.

## Required outcome for the next run

Optimize for hard eligibility, credible mission fit, primary-source evidence, human time saved, and zero invented facts. A run returning zero valid opportunities is better than ten irrelevant grants.
`;

const agentMission = {
  version: "1.0",
  mission_id: "asc3nd-discovery-refinement-v1",
  tenant_id: "asc3nd",
  lane: "grants",
  state: "NEEDS_HUMAN",
  approval_required: "APPROVE: discovery-refinement:v1",
  objective: "Produce a source-cited shortlist of no more than five genuinely eligible, mission-aligned funding opportunities for ASC3ND.",
  icm_rules: {
    canonical_truth: "ICM",
    no_invented_facts: true,
    return_evidence_to_icm: true,
    hard_eligibility_before_fit: true,
    cross_tenant_retrieval: false,
  },
  acceptance_criteria: [
    "Every shortlisted opportunity has a primary or authoritative source URL.",
    "Every shortlisted opportunity has explicit eligibility evidence.",
    "Hard geography/entity/purpose/deadline filters pass.",
    "No unresolved material fact is silently assumed.",
    "No more than five opportunities are returned unless a human requests more.",
    "Fresh-context critic reviews the shortlist.",
    "External submission remains disabled.",
  ],
  allowed_without_additional_approval: [
    "public_research",
    "requirements_extraction",
    "eligibility_check",
    "internal_fit_memo",
    "internal_draft",
    "evidence_map",
  ],
  forbidden_without_specific_approval: [
    "grant_submission",
    "legal_attestation",
    "external_email",
    "portal_acceptance",
    "payment",
    "credential_change",
    "destructive_action",
  ],
  next_state_on_success: "READY_FOR_REVIEW",
  next_state_on_missing_fact: "NEEDS_HUMAN",
};

await mkdir("artifacts", { recursive: true });
await Promise.all([
  writeFile("artifacts/asc3nd-funding-review-packet.json", JSON.stringify(reviewPacket, null, 2) + "\n", "utf8"),
  writeFile("artifacts/ASC3ND_FUNDING_REVIEW_BRIEF.md", briefLines + "\n", "utf8"),
  writeFile("artifacts/README_AGENT_ACTIONS.md", agentReadme + "\n", "utf8"),
  writeFile("artifacts/AGENT_MISSION.json", JSON.stringify(agentMission, null, 2) + "\n", "utf8"),
]);

console.log(JSON.stringify({
  tenant: reviewPacket.tenant,
  organization: reviewPacket.organization,
  assignment_id: packet.assignment_id,
  grant_count: reviewPacket.summary.grant_count,
  high_fit_count: reviewPacket.summary.high_fit_count,
  coverage: reviewPacket.summary.coverage,
  artifacts: [
    "artifacts/asc3nd-funding-review-packet.json",
    "artifacts/ASC3ND_FUNDING_REVIEW_BRIEF.md",
    "artifacts/README_AGENT_ACTIONS.md",
    "artifacts/AGENT_MISSION.json",
  ],
}, null, 2));
