import { execFile } from "node:child_process";
import { mkdtemp, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { promisify } from "node:util";
import { config } from "./config.ts";
import type { ResearchAssignment } from "./types.ts";

const execFileAsync = promisify(execFile);

export async function researchFunding(assignment: ResearchAssignment): Promise<unknown> {
  const dir = await mkdtemp(join(tmpdir(), "grant-agent-research-"));
  const assignmentPath = join(dir, "assignment.json");
  await writeFile(assignmentPath, `${JSON.stringify(assignment, null, 2)}\n`, { mode: 0o600 });

  try {
    const { stdout, stderr } = await execFileAsync(
      config.grantFinderCommand,
      ["research", "--assignment", assignmentPath, "--json"],
      {
        cwd: dir,
        timeout: 120_000,
        maxBuffer: 8 * 1024 * 1024,
        env: { ...process.env },
      },
    );
    if (!stdout.trim()) throw new Error(`grant-finder returned no JSON${stderr ? `: ${stderr.trim()}` : ""}`);
    return JSON.parse(stdout);
  } catch (error: any) {
    if (error?.code === "ENOENT") {
      throw new Error(
        "grant-finder is not installed. Build/install openprose/grant-finder and make the grant-finder binary available on PATH.",
      );
    }
    if (error instanceof SyntaxError) throw new Error("grant-finder returned invalid JSON");
    throw error;
  } finally {
    await rm(dir, { recursive: true, force: true });
  }
}
