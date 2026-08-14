import assert from "node:assert/strict";
import { buildResearchAssignment, loadOrganization } from "../src/icm.ts";
import { researchFunding } from "../src/grant-finder.ts";

const org = await loadOrganization("new-world-kids");
const assignment = buildResearchAssignment(
  org,
  "Find current non-dilutive funding for practical life-skills and youth development programming in Washington, including hands-on education and community resilience.",
);

const packet: any = await researchFunding(assignment);

assert.equal(packet.assignment_id, assignment.assignment_id);
assert.equal(packet.retrieval?.no_llm, true, "Grant Finder retrieval should remain deterministic/no-LLM");
assert.ok(Array.isArray(packet.grants), "Research Packet must contain grants[]");
assert.ok(Array.isArray(packet.coverage), "Research Packet must contain coverage[]");

for (const grant of packet.grants) {
  assert.equal(typeof grant.recommendation_id, "string");
  assert.equal(typeof grant.program_name, "string");
  assert.equal(typeof grant.url, "string");
  assert.ok(Array.isArray(grant.evidence));
  for (const evidence of grant.evidence) {
    assert.equal(typeof evidence.url, "string");
    assert.equal(typeof evidence.claim, "string");
  }
}

console.log(JSON.stringify({
  assignment_id: packet.assignment_id,
  grant_count: packet.grants.length,
  high_fit_count: packet.summary?.high_fit_count ?? null,
  coverage: packet.coverage.map((row: any) => ({ lane: row.source_lane, status: row.status })),
}, null, 2));
