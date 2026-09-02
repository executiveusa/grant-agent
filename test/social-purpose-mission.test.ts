import test from "node:test";
import assert from "node:assert/strict";
import { assertProvenance, validateGrantMissionEnvelope } from "../src/social-purpose-mission.ts";

function mission(overrides: Record<string, unknown> = {}) {
  return {
    version: "1.0",
    task_id: "asc3nd-grant-001",
    tenant_id: "asc3nd",
    owner_repository: "executiveusa/grant-agent",
    lane: "grants",
    objective: "Find one real grant and prepare a sourced review packet.",
    executor: "grant-agent",
    risk_tier: 1,
    acceptance_criteria: ["Official source captured", "Eligibility decision has evidence"],
    allowed_capabilities: ["public_research", "internal_draft"],
    denied_capabilities: ["grant_submission"],
    approval: { required: false, classes: [], approval_id: null },
    evidence_contract: { required: ["source_url", "fit_report"], return_to_icm: true },
    ...overrides,
  };
}

test("accepts a bounded internal grant mission", () => {
  const result = validateGrantMissionEnvelope(mission(), "asc3nd");
  assert.equal(result.ok, true);
});

test("fails closed on tenant mismatch", () => {
  const result = validateGrantMissionEnvelope(mission(), "new-world-kids");
  assert.deepEqual(result, {
    ok: false,
    code: "TENANT_MISMATCH",
    message: "Mission tenant does not match the active Grant Agent workspace.",
  });
});

test("requires recorded approval before grant submission", () => {
  const result = validateGrantMissionEnvelope(
    mission({
      risk_tier: 3,
      allowed_capabilities: ["grant_submission"],
      denied_capabilities: [],
      approval: { required: true, classes: ["grant_submission"], approval_id: null },
    }),
    "asc3nd",
  );
  assert.equal(result.ok, false);
  if (!result.ok) assert.equal(result.code, "APPROVAL_ID_REQUIRED");
});

test("accepts consequential mission only after explicit approval id", () => {
  const result = validateGrantMissionEnvelope(
    mission({
      risk_tier: 3,
      allowed_capabilities: ["grant_submission"],
      denied_capabilities: [],
      approval: { required: true, classes: ["grant_submission"], approval_id: "approval-123" },
    }),
    "asc3nd",
  );
  assert.equal(result.ok, true);
});

test("rejects capability policy conflicts", () => {
  const result = validateGrantMissionEnvelope(
    mission({ allowed_capabilities: ["grant_submission"], denied_capabilities: ["grant_submission"] }),
    "asc3nd",
  );
  assert.equal(result.ok, false);
  if (!result.ok) assert.equal(result.code, "APPROVAL_REQUIRED");
});

test("requires provenance for non-null organization facts", () => {
  assert.throws(
    () => assertProvenance([{ key: "ein", value: "12-3456789", source: null }]),
    /MISSING_PROVENANCE:ein/,
  );
  assert.doesNotThrow(() =>
    assertProvenance([{ key: "mission", value: "Serve youth", source: "icm://asc3nd/identity/mission" }]),
  );
});
