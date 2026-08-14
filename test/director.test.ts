import test from "node:test";
import assert from "node:assert/strict";
import { mkdtemp, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { createDirector } from "../src/director.ts";
import { StateStore } from "../src/state.ts";
import type { OrganizationContext } from "../src/types.ts";

const org: OrganizationContext = {
  profile: {
    id: "new-world-kids",
    name: "New World Kids",
    description: "Youth practical life-skills nonprofit.",
    stage: "nonprofit organization",
    location: "Washington, United States",
    focus_areas: ["youth development", "education"],
    target_geographies: ["Washington", "United States"],
    constraints: ["Do not invent eligibility."],
  },
  contextMarkdown: "# New World Kids\nUse only verified facts.",
};

async function tempStore() {
  const dir = await mkdtemp(join(tmpdir(), "grant-agent-director-test-"));
  return { dir, store: new StateStore(join(dir, "state.json")) };
}

test("funding need flows through deterministic research then Hermes-style ranking", async () => {
  const { dir, store } = await tempStore();
  const calls: string[] = [];
  try {
    const director = createDirector({
      state: store,
      loadOrg: async () => { calls.push("icm"); return org; },
      research: async (assignment) => {
        calls.push("research");
        assert.equal(assignment.company_profile.name, "New World Kids");
        return { candidates: [{ id: "wa-youth-1", title: "Youth Capacity Fund", source_url: "https://example.org/official" }] };
      },
      rank: async ({ researchPacket }) => {
        calls.push("rank");
        assert.ok(researchPacket);
        return {
          summary: "One candidate deserves attention.",
          matches: [{
            id: "wa-youth-1",
            title: "Youth Capacity Fund",
            decision: "pursue",
            reason: "The packet indicates a Washington youth-program fit.",
            evidence: ["https://example.org/official"],
            missing_facts: [],
          }],
          next_action: "Review the official eligibility language.",
        };
      },
    });

    const run = await director.handleFundingNeed({
      orgId: "new-world-kids",
      actorId: "user-one",
      need: "Fund expansion of practical life-skills programming for Seattle youth.",
    });

    assert.deepEqual(calls, ["icm", "research", "rank"]);
    assert.equal(run.state, "ready");
    assert.equal(run.result?.matches[0].decision, "pursue");
    assert.ok(run.researchPacket);
  } finally {
    await rm(dir, { recursive: true, force: true });
  }
});

test("missing human facts stop the workflow in Needs you", async () => {
  const { dir, store } = await tempStore();
  try {
    const director = createDirector({
      state: store,
      loadOrg: async () => org,
      research: async () => ({ candidates: [{ id: "grant-2" }] }),
      rank: async () => ({
        summary: "The opportunity may fit but a current program budget is required.",
        matches: [{ id: "grant-2", decision: "pursue", reason: "Potential program fit.", evidence: ["official-source"], missing_facts: ["Current program budget"] }],
        next_action: "Confirm the current program budget.",
      }),
    });

    const run = await director.handleFundingNeed({
      orgId: "new-world-kids",
      actorId: "user-one",
      need: "Fund expansion of practical life-skills programming for Seattle youth.",
    });
    assert.equal(run.state, "needs-you");
    assert.equal(run.blocker, "Confirm the current program budget.");
  } finally {
    await rm(dir, { recursive: true, force: true });
  }
});

test("adapter failure stops instead of fabricating a fallback result", async () => {
  const { dir, store } = await tempStore();
  try {
    const director = createDirector({
      state: store,
      loadOrg: async () => org,
      research: async () => { throw new Error("grant-finder unavailable"); },
      rank: async () => { throw new Error("should not run"); },
    });

    const run = await director.handleFundingNeed({
      orgId: "new-world-kids",
      actorId: "user-one",
      need: "Fund expansion of practical life-skills programming for Seattle youth.",
    });
    assert.equal(run.state, "needs-you");
    assert.equal(run.result, undefined);
    assert.match(run.blocker || "", /grant-finder unavailable/);
  } finally {
    await rm(dir, { recursive: true, force: true });
  }
});
