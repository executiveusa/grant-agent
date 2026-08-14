import test from "node:test";
import assert from "node:assert/strict";
import { mkdtemp, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { StateStore } from "../src/state.ts";

async function withStore(fn: (store: StateStore) => Promise<void>) {
  const dir = await mkdtemp(join(tmpdir(), "grant-agent-state-test-"));
  try {
    await fn(new StateStore(join(dir, "state.json")));
  } finally {
    await rm(dir, { recursive: true, force: true });
  }
}

test("run state survives a new StateStore instance", async () => {
  await withStore(async (store) => {
    const run = await store.create("new-world-kids", "user-one", "Fund youth programming in Seattle");
    const reopened = new StateStore((store as any).path);
    const recovered = await reopened.get(run.runId);
    assert.equal(recovered?.runId, run.runId);
    assert.equal(recovered?.state, "working");
  });
});

test("material artifact changes increment version and invalidate approval", async () => {
  await withStore(async (store) => {
    const run = await store.create("new-world-kids", "user-one", "Fund youth programming in Seattle");
    const result = {
      summary: "One source-backed candidate is ready for human review.",
      matches: [{ id: "grant-1", decision: "pursue" as const, reason: "Matches geography and youth focus.", evidence: ["official-source"], missing_facts: [] }],
      next_action: "Review the candidate.",
    };
    const ready = await store.patch(run.runId, { result, state: "ready" });
    assert.equal(ready.artifactVersion, 2);

    const approved = await store.approve(run.runId, "owner-one", ready.artifactVersion);
    assert.equal(approved.approvedVersion, 2);

    const changed = await store.patch(run.runId, { researchPacket: { changed: true } });
    assert.equal(changed.artifactVersion, 3);
    assert.equal(changed.approvedVersion, undefined);
  });
});

test("stale approvals are rejected", async () => {
  await withStore(async (store) => {
    const run = await store.create("new-world-kids", "user-one", "Fund youth programming in Seattle");
    const ready = await store.patch(run.runId, {
      state: "ready",
      result: {
        summary: "Ready",
        matches: [{ id: "grant-1", decision: "pursue", reason: "Fit", evidence: ["source"], missing_facts: [] }],
        next_action: "Review",
      },
    });
    await assert.rejects(() => store.approve(run.runId, "owner-one", ready.artifactVersion - 1), /stale approval/);
  });
});

test("non-ready work cannot be approved", async () => {
  await withStore(async (store) => {
    const run = await store.create("new-world-kids", "user-one", "Fund youth programming in Seattle");
    await assert.rejects(() => store.approve(run.runId, "owner-one", run.artifactVersion), /only ready work/);
  });
});
