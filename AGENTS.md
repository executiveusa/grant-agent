# Grant Agent - Agent Entry Point

You are inside the canonical Grant Agent repository.

## Route by task

- Product intent, scope, principles -> `CONTEXT.md`
- Product thesis / positioning -> `icm/_shared/product-thesis.md`
- System architecture / agent roles -> `icm/_shared/architecture.md`
- Source and repo integration rules -> `icm/_shared/integration-matrix.md`
- Security / privacy / local mode -> `icm/_shared/security-privacy.md`
- Agent workforce behavior -> `icm/_shared/workforce-principles.md`
- GTM / packaging / pricing hypotheses -> `icm/_shared/go-to-market.md`
- Gauntlet bars and release gates -> `icm/_shared/gauntlet.md`
- Hidden leverage / Black Swan findings -> `icm/_shared/black-swan.md`
- Build sequence -> `docs/BUILD_PLAN.md`
- Marketing/product art direction -> `docs/DESIGN_DIRECTION.md`

## Pipeline

`01_onboarding -> 02_discovery -> 03_match -> 04_application -> 05_submission -> 06_post_award -> 07_learning`

Read only the current stage contract plus the minimum referenced context. Write outputs back to the stage workspace. External side effects require the approval policy in `icm/_shared/security-privacy.md`.

Never store secrets in ICM files, prompts, logs, or Git.