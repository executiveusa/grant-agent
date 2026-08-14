import test from "node:test";
import assert from "node:assert/strict";
import { buildResearchAssignment, loadOrganization } from "../src/icm.ts";

test("New World Kids customer-zero ICM loads with bounded public-safe context", async () => {
  const org = await loadOrganization("new-world-kids");
  assert.equal(org.profile.id, "new-world-kids");
  assert.equal(org.profile.legal_name, "THE NORTH WEST KIDS");
  assert.match(org.contextMarkdown, /Software that gets you out of your seat/);
  assert.match(org.contextMarkdown, /No external submission is enabled in Prototype V1/);
});

test("ICM becomes a grant-finder-compatible assignment without inventing facts", async () => {
  const org = await loadOrganization("new-world-kids");
  const assignment = buildResearchAssignment(
    org,
    "Find funding to expand practical life-skills programming for youth in Seattle.",
    new Date("2026-08-13T00:00:00Z"),
  );

  assert.match(assignment.assignment_id, /^new-world-kids-2026-08-13-/);
  assert.equal(assignment.company_profile.name, "New World Kids");
  assert.equal(assignment.company_profile.stage, "nonprofit organization");
  assert.ok(assignment.focus_areas.includes("youth development"));
  assert.ok(assignment.target_geographies.includes("Washington"));
  assert.ok(assignment.company_profile.constraints.some((item) => item.includes("501(c)(3)")));
});

test("unsafe organization ids are rejected before filesystem access", async () => {
  await assert.rejects(() => loadOrganization("../another-org"), /invalid organization id/);
});
