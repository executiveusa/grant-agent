import { createServer, type IncomingMessage, type ServerResponse } from "node:http";
import { readFile } from "node:fs/promises";
import { extname, join, normalize } from "node:path";
import { config } from "./config.ts";
import { director } from "./director.ts";
import { StateStore } from "./state.ts";

const state = new StateStore(config.stateFile);
const MAX_BODY = 1_000_000;

function sendJson(res: ServerResponse, status: number, body: unknown): void {
  res.writeHead(status, {
    "content-type": "application/json; charset=utf-8",
    "cache-control": "no-store",
  });
  res.end(JSON.stringify(body));
}

async function readJson(req: IncomingMessage): Promise<any> {
  let size = 0;
  const chunks: Buffer[] = [];
  for await (const chunk of req) {
    const buf = Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk);
    size += buf.length;
    if (size > MAX_BODY) throw new Error("request body too large");
    chunks.push(buf);
  }
  const raw = Buffer.concat(chunks).toString("utf8") || "{}";
  return JSON.parse(raw);
}

function contentType(path: string): string {
  switch (extname(path)) {
    case ".html": return "text/html; charset=utf-8";
    case ".js": return "text/javascript; charset=utf-8";
    case ".css": return "text/css; charset=utf-8";
    default: return "application/octet-stream";
  }
}

async function serveStatic(pathname: string, res: ServerResponse): Promise<boolean> {
  const wanted = pathname === "/" ? "/index.html" : pathname;
  const safe = normalize(wanted).replace(/^([.][.][/\\])+/, "");
  if (safe.includes("..")) return false;
  const filePath = join(config.publicDir, safe.replace(/^[/\\]/, ""));
  try {
    const body = await readFile(filePath);
    res.writeHead(200, {
      "content-type": contentType(filePath),
      "cache-control": filePath.endsWith("index.html") ? "no-store" : "public, max-age=300",
    });
    res.end(body);
    return true;
  } catch {
    return false;
  }
}

const server = createServer(async (req, res) => {
  try {
    const url = new URL(req.url || "/", `http://${req.headers.host || "localhost"}`);

    if (req.method === "GET" && url.pathname === "/api/v1/health") {
      return sendJson(res, 200, {
        ok: true,
        version: "0.1.0",
        philosophy: "Software that gets you out of your seat.",
        submissionEnabled: false,
      });
    }

    if (req.method === "GET" && url.pathname === "/api/v1/state") {
      const orgId = url.searchParams.get("orgId") || config.defaultOrgId;
      return sendJson(res, 200, { run: await state.latestForOrg(orgId) });
    }

    if (req.method === "POST" && url.pathname === "/api/v1/need") {
      const body = await readJson(req);
      const orgId = String(body.orgId || config.defaultOrgId);
      const actorId = String(body.actorId || "").trim();
      const need = String(body.need || "").trim();
      if (!actorId) return sendJson(res, 400, { error: "actorId is required" });
      if (need.length < 12) return sendJson(res, 400, { error: "Describe the funding need in a little more detail." });
      const run = await director.handleFundingNeed({ orgId, actorId, need });
      return sendJson(res, 200, { run });
    }

    if (req.method === "POST" && url.pathname.startsWith("/api/v1/runs/") && url.pathname.endsWith("/approve")) {
      const runId = url.pathname.split("/")[4];
      const body = await readJson(req);
      const actorId = String(body.actorId || "").trim();
      const artifactVersion = Number(body.artifactVersion);
      if (!actorId || !Number.isInteger(artifactVersion)) {
        return sendJson(res, 400, { error: "actorId and artifactVersion are required" });
      }
      const run = await state.approve(runId, actorId, artifactVersion);
      return sendJson(res, 200, { run });
    }

    if (req.method === "POST" && url.pathname.includes("submit")) {
      return sendJson(res, 403, { error: "External grant submission is intentionally disabled in Prototype V1." });
    }

    if (req.method === "GET" && await serveStatic(url.pathname, res)) return;
    sendJson(res, 404, { error: "not found" });
  } catch (error: any) {
    sendJson(res, 500, { error: error instanceof Error ? error.message : String(error) });
  }
});

server.listen(config.port, "127.0.0.1", () => {
  console.log(`Grant Agent V1 listening on http://127.0.0.1:${config.port}`);
  console.log("Software that gets you out of your seat.");
});
