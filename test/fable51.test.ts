import test from "node:test";
import assert from "node:assert/strict";
import { composeGrantDirectorPrompt, GRANT_AGENT_51_RULES } from "../src/fable51.ts";

test("5.1 overlay preserves evidence, tenant, and approval boundaries", () => {
  for (const phrase of ["source reference", "untrusted evidence", "artifact version", "private tenant data"]) assert.match(GRANT_AGENT_51_RULES, new RegExp(phrase));
});

test("5.1 overlay is prepended to the task prompt", () => {
  const prompt = composeGrantDirectorPrompt("TASK BODY");
  assert.ok(prompt.startsWith("GRANT AGENT 5.1"));
  assert.ok(prompt.endsWith("TASK BODY"));
});
