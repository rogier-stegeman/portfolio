---
status: proposed
---

# Path-based routing for all Apps on a single subdomain

## Context

The Portfolio contains several Apps (the CV, and later ecology Apps) built from one Vite + Vue repository and deployed as one static bundle. The apex domain `rogier.app` is in use by a private server, so the Portfolio must live on a subdomain. The original plan gave each App its own subdomain (`cv.rogier.app`, …) and selected the App at runtime from `window.location.hostname`.

## Considered Options

- **Host-aware routing (one subdomain per App).** Each App feels standalone and has its own memorable URL. Costs: `localhost` cannot distinguish Apps, so a dev-only launcher is needed; every App needs its own DNS binding; routing must be tested per hostname; the indirection is unusual enough to read as over-engineering.
- **Path-based routing on one subdomain.** Plain Vue Router, no localhost special case, one domain binding, one deployment. Apps share an origin (and therefore storage and cookies), and their URLs are less standalone.

## Decision

> **Draft for the author to finalise in their own voice.** Prompts: Why does simplicity outweigh standalone URLs for this Portfolio? What would make you revisit this (e.g. an App that needs its own origin or audience)?

Path-based routing on `portfolio.rogier.app`. Each App, including the CV, lives in its own `src/apps/<app>/` folder and owns a route prefix (`/cv`, `/heat-island`, …), so moving an App to its own subdomain later is a routing change, not a restructure. The root `/` redirects to `/cv`.

## Consequences

- One subdomain to bind and one Worker to deploy.
- The CV holds no privileged position in the routing; the root can later become a landing page without moving the CV.
- Apps must not rely on origin-scoped state (local storage keys, cookies) being private to them; namespace such keys per App.
