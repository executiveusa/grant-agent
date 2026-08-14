import { config } from "./config.ts";
import { buildResearchAssignment, loadOrganization } from "./icm.ts";
import { researchFunding } from "./grant-finder.ts";
import { rankWithHermes } from "./hermes.ts";
import { StateStore, finalStateFor } from "./state.ts";
import type { DirectorResult, OrganizationContext, ResearchAssignment } from "./types.ts";

export interface DirectorDeps {
  loadOrg(orgId: string): Promise<OrganizationContext>;
  research(assignment: ResearchAssignment): Promise<unknown>;
  rank(input: { org: OrganizationContext; need: string; researchPacket: unknown }): Promise<DirectorResult>;
  state: StateStore;
}

export function createDirector(deps: DirectorDeps) {
  return {
    async handleFundingNeed(input: { orgId: string; actorId: string; need: string }) {
      const run = await deps.state.create(input.orgId, input.actorId, input.need.trim());
      try {
        const org = await deps.loadOrg(input.orgId);
        const assignment = buildResearchAssignment(org, input.need);
        const researchPacket = await deps.research(assignment);
        await deps.state.patch(run.runId, { researchPacket });

        const result = await deps.rank({ org, need: input.need, researchPacket });
        const state = finalStateFor(result);
        return await deps.state.patch(run.runId, { result, state, blocker: state === "needs-you" ? result.next_action : undefined });
      } catch (error: any) {
        return await deps.state.patch(run.runId, {
          state: "needs-you",
          blocker: error instanceof Error ? error.message : String(error),
        });
      }
    },
  };
}

export const director = createDirector({
  loadOrg: loadOrganization,
  research: researchFunding,
  rank: rankWithHermes,
  state: new StateStore(config.stateFile),
});
