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
  version: "1.0",
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
    external_submission_enabled: false,
  },
  summary: {
    grant_count: packet.grants.length,
    high_fit_count: packet.summary?.high_fit_count ?? null,
    coverage: packet.coverage.map((row: any) => ({ lane: row.source_lane, status: row.status })),
  },
  opportunities: packet.grants,
};

await mkdir("artifacts", { recursive: true });
await writeFile(
  "artifacts/asc3nd-funding-review-packet.json",
  JSON.stringify(reviewPacket, null, 2) + "\n",
  "utf8",
);

console.log(JSON.stringify({
  tenant: reviewPacket.tenant,
  organization: reviewPacket.organization,
  assignment_id: packet.assignment_id,
  grant_count: reviewPacket.summary.grant_count,
  high_fit_count: reviewPacket.summary.high_fit_count,
  coverage: reviewPacket.summary.coverage,
  artifact: "artifacts/asc3nd-funding-review-packet.json",
  candidates: packet.grants.slice(0, 10).map((grant: any) => ({
    recommendation_id: grant.recommendation_id,
    program_name: grant.program_name,
    url: grant.url,
  })),
}, null, 2));
