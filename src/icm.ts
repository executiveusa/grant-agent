import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { config } from "./config.ts";
import type { OrganizationContext, OrganizationProfile, ResearchAssignment } from "./types.ts";

const SAFE_ID = /^[a-z0-9][a-z0-9-]{0,63}$/;

function assertSafeId(id: string): void {
  if (!SAFE_ID.test(id)) throw new Error(`invalid organization id: ${id}`);
}

export async function loadOrganization(orgId: string): Promise<OrganizationContext> {
  assertSafeId(orgId);
  const base = join(config.icmInstancesDir, orgId);
  const [profileText, contextMarkdown] = await Promise.all([
    readFile(join(base, "profile.json"), "utf8"),
    readFile(join(base, "CONTEXT.md"), "utf8"),
  ]);
  const profile = JSON.parse(profileText) as OrganizationProfile;
  if (profile.id !== orgId) throw new Error(`ICM profile id mismatch: expected ${orgId}, got ${profile.id}`);
  if (!profile.name || !profile.description || !profile.location) {
    throw new Error(`ICM profile ${orgId} is missing required identity fields`);
  }
  return { profile, contextMarkdown };
}

export function buildResearchAssignment(
  org: OrganizationContext,
  need: string,
  now = new Date(),
): ResearchAssignment {
  const trimmed = need.trim();
  if (trimmed.length < 12) throw new Error("funding need must be specific enough to research");
  const date = now.toISOString().slice(0, 10);
  return {
    assignment_id: `${org.profile.id}-${date}-${crypto.randomUUID().slice(0, 8)}`,
    research_question: `Find current non-dilutive funding opportunities for this nonprofit need: ${trimmed}`,
    company_profile: {
      name: org.profile.name,
      description: org.profile.description,
      stage: org.profile.stage,
      location: org.profile.location,
      technologies: org.profile.focus_areas,
      constraints: org.profile.constraints,
    },
    focus_areas: org.profile.focus_areas,
    target_geographies: org.profile.target_geographies,
    known_grants: org.profile.known_grants ?? [],
  };
}
