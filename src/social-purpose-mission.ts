export type GrantMissionEnvelope = {
  version: "1.0";
  task_id: string;
  tenant_id: string;
  owner_repository: string;
  lane: "grants";
  objective: string;
  executor?: "grant-agent" | "hermes" | "firstmate" | "human" | null;
  risk_tier: 0 | 1 | 2 | 3;
  acceptance_criteria: string[];
  allowed_capabilities: string[];
  denied_capabilities: string[];
  approval: {
    required: boolean;
    classes: string[];
    approval_id?: string | null;
  };
  evidence_contract: {
    required: string[];
    return_to_icm: boolean;
  };
};

export type MissionValidation =
  | { ok: true; mission: GrantMissionEnvelope }
  | { ok: false; code: string; message: string };

const consequential = new Set([
  "grant_submission",
  "legal_attestation",
  "external_email",
  "portal_acceptance",
  "money_movement",
  "production_mutation",
]);

export function validateGrantMissionEnvelope(
  value: unknown,
  expectedTenant?: string,
): MissionValidation {
  if (!value || typeof value !== "object") {
    return fail("INVALID_ENVELOPE", "Mission envelope must be an object.");
  }

  const mission = value as Partial<GrantMissionEnvelope>;
  if (mission.version !== "1.0") return fail("UNSUPPORTED_VERSION", "Mission envelope version must be 1.0.");
  if (!text(mission.task_id)) return fail("MISSING_TASK_ID", "task_id is required.");
  if (!text(mission.tenant_id)) return fail("MISSING_TENANT", "tenant_id is required.");
  if (expectedTenant && mission.tenant_id !== expectedTenant) {
    return fail("TENANT_MISMATCH", "Mission tenant does not match the active Grant Agent workspace.");
  }
  if (mission.lane !== "grants") return fail("WRONG_LANE", "Grant Agent accepts only grants missions.");
  if (!text(mission.owner_repository)) return fail("MISSING_OWNER_REPOSITORY", "owner_repository is required.");
  if (!text(mission.objective)) return fail("MISSING_OBJECTIVE", "objective is required.");
  if (![0, 1, 2, 3].includes(Number(mission.risk_tier))) return fail("INVALID_RISK", "risk_tier must be 0-3.");
  if (!nonEmptyStrings(mission.acceptance_criteria)) return fail("MISSING_ACCEPTANCE", "At least one acceptance criterion is required.");
  if (!Array.isArray(mission.allowed_capabilities) || !Array.isArray(mission.denied_capabilities)) {
    return fail("MISSING_CAPABILITY_POLICY", "allowed_capabilities and denied_capabilities are required.");
  }
  if (!mission.approval || typeof mission.approval.required !== "boolean" || !Array.isArray(mission.approval.classes)) {
    return fail("MISSING_APPROVAL_POLICY", "approval policy is required.");
  }
  if (!mission.evidence_contract || !Array.isArray(mission.evidence_contract.required) || mission.evidence_contract.return_to_icm !== true) {
    return fail("MISSING_EVIDENCE_CONTRACT", "Grant missions must return required evidence to ICM.");
  }

  const allowed = new Set(mission.allowed_capabilities);
  const requestsConsequential = [...consequential].some((capability) => allowed.has(capability));
  if ((Number(mission.risk_tier) === 3 || requestsConsequential) && !mission.approval.required) {
    return fail("APPROVAL_REQUIRED", "Consequential grant missions must require human approval.");
  }
  if ((Number(mission.risk_tier) === 3 || requestsConsequential) && !text(mission.approval.approval_id)) {
    return fail("APPROVAL_ID_REQUIRED", "Consequential grant missions require a recorded approval_id before execution.");
  }

  for (const denied of mission.denied_capabilities) {
    if (allowed.has(denied)) return fail("CAPABILITY_CONFLICT", `Capability ${denied} is both allowed and denied.`);
  }

  return { ok: true, mission: mission as GrantMissionEnvelope };
}

export function assertProvenance(facts: Array<{ key: string; value: unknown; source?: string | null }>): void {
  const missing = facts.filter((fact) => fact.value !== null && fact.value !== undefined && !text(fact.source));
  if (missing.length > 0) {
    throw new Error(`MISSING_PROVENANCE:${missing.map((fact) => fact.key).join(",")}`);
  }
}

function text(value: unknown): value is string {
  return typeof value === "string" && value.trim().length > 0;
}

function nonEmptyStrings(value: unknown): value is string[] {
  return Array.isArray(value) && value.length > 0 && value.every(text);
}

function fail(code: string, message: string): MissionValidation {
  return { ok: false, code, message };
}
