# Portfolio

**Live Portfolio:** [https://portfolio.rogier.app](https://portfolio.rogier.app)

A software engineering Portfolio by Rogier Stegeman: a collection of self-contained web Apps—starting with an interactive CV and expanding into domain-specific urban ecology Apps—together with the repository, architecture records, and verification pipeline that build them.

## Architecture & Domain Documentation

- [**Domain Glossary (`GLOSSARY.md`)**](./GLOSSARY.md) — Canonical ubiquitous language used across code, tests, issues, and pull requests (**Portfolio**, **App**, **CV**, **Unreleased App**, **Playground**).
- [**Architecture Decision Records (`docs/adr/`)**](./docs/adr/) — Records of significant architectural trade-offs:
  - [ADR-0001: Path-based routing for all Apps on a single subdomain](./docs/adr/0001-path-based-routing.md)
  - [ADR-0002: Host on Cloudflare Workers with Static Assets](./docs/adr/0002-cloudflare-workers-static-assets.md)

## Tech Stack

| Layer                   | Technology                                             | Rationale                                                                                                               |
| ----------------------- | ------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------- |
| Framework & Routing     | Vue 3 (`<script setup>`), Vite, Vue Router             | Lightweight, reactive single-page architecture with path-based App isolation on a single origin.                        |
| Language                | TypeScript (strict mode)                               | Compile-time safety across component contracts, route definitions, and domain models.                                   |
| Styling & UI Primitives | Tailwind CSS v4, `shadcn-vue` (Reka UI), `@lucide/vue` | Accessible headless primitives and CSS-first design tokens supporting system light and dark themes.                     |
| Testing                 | Vitest, `@vue/test-utils`, `happy-dom`                 | Fast integration testing against public component and router seams.                                                     |
| Linting & Formatting    | Oxlint, ESLint, Oxfmt, Husky, Commitlint               | Fast hybrid static analysis, Tailwind-aware formatting, and Conventional Commit enforcement.                            |
| Hosting & CI/CD         | Cloudflare Workers (Static Assets), GitHub Actions     | Edge SPA hosting on `portfolio.rogier.app` with automated CI verification and opt-in `preview`-labelled PR deployments. |

## AI-Assisted Engineering Workflow

This Portfolio is built with an explicit human-in-the-loop AI engineering workflow:

- [**`AGENTS.md`**](./AGENTS.md) defines the repository's non-discoverable conventions, verification gate, and pull request handover protocol.
- [**`mattpocock/skills`**](https://github.com/mattpocock/skills) (`.agents/skills/` and [`docs/agents/`](./docs/agents/)) provides structured workflows for domain modelling, grilling specifications, test-driven development, and two-axis code review (Standards and Spec).
- Architectural trade-offs in [`docs/adr/`](./docs/adr/) are drafted with options and consequences surfaced objectively, then finalised in the human author's own voice; agents open pull requests and the human maintainer reviews and merges every change.

## Local Development & Verification

### Prerequisites

- **Node.js** `>=24.0.0` (pinned in [`.node-version`](./.node-version))
- **pnpm** `12.x` (pinned via `packageManager` in [`package.json`](./package.json))

### Commands

```bash
# Install dependencies
pnpm install

# Start the local Vite development server (includes Unreleased Apps and the Playground)
pnpm dev

# Run the unified verification gate (lint, format check, type-check, tests, and production build)
pnpm verify

# Run unit and integration tests in watch mode
pnpm test
```

## Licence

- **Source code:** Licensed under the [MIT License](./LICENSE).
- **Personal content & media:** All personal CV content, biographical text, photography, and personal media in this repository are **© Rogier Stegeman. All rights reserved.**
