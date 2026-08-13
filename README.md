# Grant Agent

Grant Agent is a domain-specific, multiplayer funding operating system for nonprofits.

The customer experiences one simple agent. Under the hood, a Hermes-based orchestrator uses an ICM workspace, deterministic grant research, specialist subagents, connected tools, and constrained computer use to move work through the full funding lifecycle:

**understand the organization -> discover -> qualify -> prepare -> review -> submit -> track -> report -> learn**

## Canonical repository

This repository is the canonical product repository: `executiveusa/grant-agent`.

Upstream/reference repositories remain separate. We integrate through pinned dependencies, adapters, datasets, skills, or documented design patterns rather than casually copying code.

## Product thesis

Nonprofits do not primarily need another AI writing box. They need a grants department that already knows the organization, continuously finds relevant funding, turns context into complete work, coordinates with the team, and escalates only the decisions that require people.

## Architecture rule

Everything is organized through ICM. Start with `AGENTS.md`, then `CONTEXT.md`.

## Current phase

Foundation / product architecture. The next build target is one verified vertical slice: onboard one nonprofit, create its ICM, find source-cited opportunities, rank them, prepare one application packet, and stop at a human approval gate.