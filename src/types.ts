export type WorkState = "working" | "needs-you" | "ready";

export interface OrganizationProfile {
  id: string;
  name: string;
  legal_name?: string;
  description: string;
  stage: string;
  location: string;
  focus_areas: string[];
  target_geographies: string[];
  constraints: string[];
  known_grants?: string[];
  programs?: Array<{ name: string; geography?: string; description: string }>;
  source_refs?: string[];
}

export interface OrganizationContext {
  profile: OrganizationProfile;
  contextMarkdown: string;
}

export interface ResearchAssignment {
  assignment_id: string;
  research_question: string;
  company_profile: {
    name: string;
    description: string;
    stage: string;
    location: string;
    technologies: string[];
    constraints: string[];
  };
  focus_areas: string[];
  target_geographies: string[];
  known_grants: string[];
}

export interface MatchDecision {
  id: string;
  title?: string;
  decision: "pursue" | "review" | "reject";
  reason: string;
  evidence: string[];
  missing_facts: string[];
}

export interface DirectorResult {
  summary: string;
  matches: MatchDecision[];
  next_action: string;
}

export interface RunRecord {
  runId: string;
  orgId: string;
  actorId: string;
  need: string;
  state: WorkState;
  createdAt: string;
  updatedAt: string;
  artifactVersion: number;
  approvedVersion?: number;
  blocker?: string;
  result?: DirectorResult;
  researchPacket?: unknown;
}

export interface PersistentState {
  schemaVersion: 1;
  runs: Record<string, RunRecord>;
}
