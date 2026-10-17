# Agent Directives & Engineering Constitution

Prioritise quality, clarity, and maintainability over rapid, haphazard generation.

## Technical Baseline

- **Framework:** Vue 3 with `<script setup lang="ts">` and the Composition API exclusively.
- **TypeScript:** Strict mode enabled ("strict": true, "noImplicitAny": true, "forceConsistentCasingInFileNames": true). Avoid loose casting (`as unknown` or `any`).
- **Component Contracts:** Use TypeScript type-based declarations for `defineProps<Props>()` and `defineEmits<Emits>()` rather than runtime object validation. Define explicit interfaces for domain models.
- **Styling:** Tailwind CSS v4. Keep styles clean, idiomatic, and readable.
- **Primitives:** shadcn-vue (backed by Reka UI) and `@lucide/vue` icons.
- **Testing:** Vitest + `@vue/test-utils` + `happy-dom`.

## Simplicity & The KISS Principle

- Write code that is as simple as possible to get the job done cleanly.
- Avoid premature abstractions. Do not create composables, generic utility wrappers, or state machines for logic that can be handled clearly in standard Vue reactivity.
- Keep styling straightforward: use Tailwind utility classes directly in the template. Avoid deeply nested custom CSS classes or complex dynamic style objects unless strictly necessary.

## Backlog & Idea Management (GitHub Issues)

- Backlog tasks, feature ideas, and planned enhancements are tracked exclusively through **GitHub Issues**.
- When an idea or enhancement arises during development, propose a concise GitHub Issue title and short description.

## In-App Domain Research & Methodology

- For domain-specific applications (e.g., urban ecology), co-locate a `research.md` directly inside that app's root folder (`src/apps/<app>/research.md`).
- When building these apps, provide an in-app trigger (e.g., a "Methodology & Research" button) to render this content directly in an in-app drawer or modal so reviewers can inspect the literature and methodology directly in the application.

## Architecture Decision Records (ADRs)

- Major technical choices (libraries, architectural patterns, state approaches, geospatial engines) are documented in `docs/adr/` *at the time the technology is introduced*.
- ADRs reflect **software architecture**, distinct from domain scientific research (`research.md`).
- When a new tool, major refactor, or architectural pattern is introduced:
  1. Draft a new ADR in `docs/adr/XXXX-<title>.md` using the ADR template.
  2. Populate the **Context**, **Options Considered**, and **Evaluation/Trade-offs** objectively.
  3. Leave the **Decision & Rationale** section formatted as a draft prompt for the human lead author to finalise in their own voice.
  4. Link the new ADR in the root `README.md` index table.

## Incremental Execution & Reviewability

- Build in small, well-executed, logical increments. Keep tasks focused on a single clear objective so changes remain easily inspectable and reviewable by a human reviewer.
- Never bundle foundational scaffolding, UI library primitives, and full feature applications into a single monolithic commit.
- Verify visual changes in Antigravity's integrated browser before concluding any UI task.

## Testing & Verification Standards

- Every business function, router resolution, and interactive component must have corresponding unit/integration tests in Vitest.
- Test dual conditions across the board:
  1. **Happy Paths:** Verify components and views render and behave correctly when given complete, valid data.
  2. **Expected Failures & Edge Cases:** Verify graceful degradations, empty states, missing props, and unmatched routes.
- Run `npm run type-check` (`vue-tsc --noEmit`), `npm run test -- --run`, and `npm run build` to verify clean passes and zero TypeScript diagnostics before completing an increment.

## Git & Branching Protocol

- Follow the **Conventional Commits** specification:
  - `feat(<scope>): <short description>`
  - `fix(<scope>): <short description>`
  - `test(<scope>): <short description>`
  - `refactor(<scope>): <short description>`
  - `chore(<scope>): <short description>`
- Routine development occurs on local feature branches (`feat/<name>`).
- Only push to branches matching `preview/*` (e.g., `preview/cv-layout`) when a live Cloudflare preview build is explicitly requested, to conserve build limits.

## Cloudflare Management

- Use the connected Cloudflare MCP server to register custom subdomains and inspect Pages project status.

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
