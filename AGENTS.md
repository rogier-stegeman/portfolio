# Agent Directives

## Simplicity & Styling

- Express state and logic directly in standard Vue reactivity; extract a composable or helper only when a second caller shares the same behaviour.
- Define explicit TypeScript interfaces for domain models.
- Style components with Tailwind utility classes in the template and shared design tokens in `src/assets/main.css`.
- Generate new UI primitives in `src/components/ui/` via `pnpm dlx shadcn-vue@latest add <component>`, preserving upstream `shadcn-vue` variant and size APIs unless the user explicitly requests a customisation.
- Consult authoritative upstream indexes (`https://www.shadcn-vue.com/llms.txt`, `https://reka-ui.com/llms.txt`, `https://ui.shadcn.com/llms.txt`) when researching component APIs, props, or composition patterns.
- Rely on the root and default styling such as `text-base` for styling unless there's a compelling reason to deviate or the user requests this.
- Build views and components with minimal, unopinionated markup and layout classes; rely on native HTML elements and `shadcn-vue` primitives without manual `role`, `aria-*`, or test-only `data-*` attributes.
- Use built-in framework and router capabilities rather than custom state or duplicated responsive DOM trees.

## Domain Modelling & Architecture

- Use the canonical terms defined in [`GLOSSARY.md`](./GLOSSARY.md) across code, tests, documentation, issues, and pull requests, and update `GLOSSARY.md` inline as domain concepts crystallise.
- For domain-specific Apps (e.g., urban ecology), co-locate `src/apps/<app>/research.md` and provide an in-app trigger (drawer or modal) so reviewers can read the methodology and literature directly in the App.
- Offer a new Architecture Decision Record (`docs/adr/NNNN-<slug>.md`) only when all three `/domain-modeling` criteria hold:
  1. **Hard to reverse**: changing course later carries meaningful cost.
  2. **Surprising without context**: a future reader will wonder why it was done this way.
  3. **The result of a real trade-off**: genuine alternatives existed and one was chosen for specific reasons.
- Place standalone UI prototypes (`/prototype` skill sub-shape B) in `src/playground/prototypes/` to be hosted within the Playground at `/playground/prototypes/:name`.
- Draft new ADRs in `proposed` status with objective **Context**, **Considered Options**, and **Consequences**, leaving a draft prompt in **Decision** for the human lead author to finalise in their own voice, and link the ADR in [`README.md`](./README.md).

## Backlog & Issue Tracking

- Track backlog tasks, feature ideas, and planned enhancements in **GitHub Issues**. When an out-of-scope enhancement arises during work, propose a concise GitHub Issue title and description.

## Testing & Verification

- Test behaviour through public module and router interfaces on both **happy paths** (complete, valid data and expected rendering) and **expected failures & edge cases** (empty states, missing inputs, unmatched or gated routes); do not test purely declarative styling or static configuration via file-system inspection.
- Verify visual changes in the integrated browser before concluding any UI task; if no browser tool is available in the session, notify the user to verify the UI locally during review rather than probing the dev server via shell HTTP requests.
- Run targeted tests and type-checks during iteration, reserving `pnpm verify` as the single verification gate (lint, format check, type-check, unit/integration tests, and production build) before completing an increment.

## Shell & Environment Execution

- When running HTTP checks or shell commands on Windows (PowerShell), always invoke the native binary `curl.exe` with an explicit timeout (e.g., `curl.exe --max-time 5 ...`) rather than bare `curl` (which aliases to `Invoke-WebRequest` and hangs indefinitely during headless Internet Explorer COM initialisation).
- When creating or editing GitHub issues or pull requests via `gh` on Windows (PowerShell), write multi-line Markdown bodies to a file and pass `--body-file` rather than inline `--body "..."` to prevent PowerShell from escaping backticks and mangling formatting.
- Enforce explicit process timeouts or watchdog timers on background commands to prevent silent stalls.

## Git & Pull Requests

- Keep each commit and pull request focused on a single logical objective.
- Format commit messages using **Conventional Commits** (`<type>(<scope>): <description>`) with allowed types: `feat`, `fix`, `test`, `refactor`, `chore`, `docs`, `ci`, `build`, `perf`.
- Develop on a feature branch (`feat/<name>`), run `pnpm verify`, and pause with changes uncommitted for local review in chat; commit, push, and open a pull request only when the human maintainer asks, and leave merging to the human maintainer.
- Add the `preview` label to a pull request when a live Cloudflare Workers preview deployment (`pr-<number>`) is requested.

## Language Conventions

Write in `en-GB` for human prose and `en-US` for code identifiers.

- **Code identifiers (variables, functions, types, schema):** `en-US` (e.g., `color`, `initialize`, `serialize`).
- **Human prose (comments, docs, git commits, UI copy):** `en-GB` (e.g., `colour`, `initialise`, `authorise`).

## Agent skills

### Issue tracker

GitHub issues via `gh` CLI. See `docs/agents/issue-tracker.md`.

### Triage labels

Canonical triage roles mapped to matching labels (`needs-triage`, `needs-info`, `ready-for-agent`, `ready-for-human`, `wontfix`). See `docs/agents/triage-labels.md`.

### Domain docs

Single-context (`GLOSSARY.md` and `docs/adr/` at the repository root). See `docs/agents/domain.md`.
