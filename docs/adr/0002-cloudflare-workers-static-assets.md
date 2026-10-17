---
status: proposed
---

# Host on Cloudflare Workers with Static Assets

## Context

The Portfolio is a static single-page application. The `rogier.app` zone is already managed in Cloudflare, so Cloudflare hosting avoids moving DNS. Cloudflare offers two products for this: Pages, and Workers with Static Assets. As of 2026 Pages is supported but receives new features after Workers, and Cloudflare recommends Workers for new projects.

## Considered Options

- **Cloudflare Pages.** 500 builds/month on the free plan, with dashboard filtering so only chosen branches (e.g. `preview/*`) get preview builds. SPA fallback via `public/_redirects`. Server-side code via the older Pages Functions model.
- **Cloudflare Workers with Static Assets.** 3,000 build minutes/month on the free plan; preview builds are all-or-nothing in the dashboard. SPA fallback via `not_found_handling: "single-page-application"` in `wrangler.jsonc`. Native path to server-side code and storage bindings (D1, KV, R2) should an App ever need them.
- **Other static hosts (Netlify, Vercel, GitHub Pages).** Viable, but would split hosting from the DNS provider for no gain.

## Decision

> **Draft for the author to finalise in their own voice.** Prompts: Why follow Cloudflare's direction rather than the product with the more convenient preview filtering? How much weight did the option of adding server-side code later carry?

Workers with Static Assets, deployed from GitHub Actions rather than Cloudflare's Git integration: production deploys run on `main` only after CI passes, and a PR gets a preview deployment only when it carries the `preview` label.

## Consequences

- Hosting configuration (`wrangler.jsonc`) and the deploy pipeline live in the repository rather than the dashboard.
- GitHub holds one Cloudflare API token as an Actions secret, scoped to the minimum permissions needed to deploy the Worker.
- Each labelled PR gets a stable preview URL (`pr-<number>`) that updates on every push.
