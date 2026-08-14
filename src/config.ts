import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
export const repoRoot = resolve(here, "..");

export const config = {
  port: Number(process.env.PORT || 4317),
  hermesCommand: process.env.HERMES_COMMAND || "hermes",
  grantFinderCommand: process.env.GRANT_FINDER_COMMAND || "grant-finder",
  defaultOrgId: process.env.GRANT_AGENT_ORG_ID || "new-world-kids",
  icmInstancesDir: join(repoRoot, "icm", "instances"),
  stateFile: join(repoRoot, ".grant-agent", "state.json"),
  publicDir: join(repoRoot, "public"),
};
