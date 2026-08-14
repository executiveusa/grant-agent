import { mkdir, readFile, rename, writeFile } from "node:fs/promises";
import { dirname } from "node:path";
import type { DirectorResult, PersistentState, RunRecord, WorkState } from "./types.ts";

function emptyState(): PersistentState {
  return { schemaVersion: 1, runs: {} };
}

export class StateStore {
  private readonly path: string;

  constructor(path: string) {
    this.path = path;
  }

  private async read(): Promise<PersistentState> {
    try {
      const raw = await readFile(this.path, "utf8");
      const parsed = JSON.parse(raw) as PersistentState;
      if (parsed.schemaVersion !== 1 || typeof parsed.runs !== "object") {
        throw new Error("unsupported state schema");
      }
      return parsed;
    } catch (error: any) {
      if (error?.code === "ENOENT") return emptyState();
      throw error;
    }
  }

  private async write(state: PersistentState): Promise<void> {
    await mkdir(dirname(this.path), { recursive: true });
    const tmp = `${this.path}.${process.pid}.tmp`;
    await writeFile(tmp, `${JSON.stringify(state, null, 2)}\n`, { mode: 0o600 });
    await rename(tmp, this.path);
  }

  async create(orgId: string, actorId: string, need: string): Promise<RunRecord> {
    const state = await this.read();
    const now = new Date().toISOString();
    const run: RunRecord = {
      runId: crypto.randomUUID(),
      orgId,
      actorId,
      need,
      state: "working",
      createdAt: now,
      updatedAt: now,
      artifactVersion: 1,
    };
    state.runs[run.runId] = run;
    await this.write(state);
    return run;
  }

  async patch(runId: string, patch: Partial<Pick<RunRecord, "state" | "blocker" | "result" | "researchPacket">>): Promise<RunRecord> {
    const state = await this.read();
    const current = state.runs[runId];
    if (!current) throw new Error(`unknown run: ${runId}`);
    const mutatesArtifact = patch.result !== undefined || patch.researchPacket !== undefined;
    const next: RunRecord = {
      ...current,
      ...patch,
      artifactVersion: mutatesArtifact ? current.artifactVersion + 1 : current.artifactVersion,
      updatedAt: new Date().toISOString(),
    };
    if (mutatesArtifact) delete next.approvedVersion;
    state.runs[runId] = next;
    await this.write(state);
    return next;
  }

  async approve(runId: string, actorId: string, artifactVersion: number): Promise<RunRecord> {
    const state = await this.read();
    const current = state.runs[runId];
    if (!current) throw new Error(`unknown run: ${runId}`);
    if (current.state !== "ready") throw new Error("only ready work can be approved");
    if (artifactVersion !== current.artifactVersion) {
      throw new Error(`stale approval: artifact is v${current.artifactVersion}, request was v${artifactVersion}`);
    }
    const next = {
      ...current,
      actorId,
      approvedVersion: artifactVersion,
      updatedAt: new Date().toISOString(),
    };
    state.runs[runId] = next;
    await this.write(state);
    return next;
  }

  async latestForOrg(orgId: string): Promise<RunRecord | null> {
    const state = await this.read();
    return Object.values(state.runs)
      .filter((run) => run.orgId === orgId)
      .sort((a, b) => b.updatedAt.localeCompare(a.updatedAt))[0] ?? null;
  }

  async get(runId: string): Promise<RunRecord | null> {
    const state = await this.read();
    return state.runs[runId] ?? null;
  }
}

export function finalStateFor(result: DirectorResult): WorkState {
  const pursue = result.matches.filter((m) => m.decision === "pursue");
  if (pursue.length === 0) return "needs-you";
  if (pursue.some((m) => m.missing_facts.length > 0)) return "needs-you";
  return "ready";
}
