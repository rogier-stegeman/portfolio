# Portfolio

A software engineering portfolio: a collection of web apps and the repository that builds them, both presented to recruiters and technical reviewers.

## Language

**Portfolio**:
The whole deliverable: the live apps together with this repository, its history, and its documentation.
_Avoid_: Site, website, project

**App**:
A self-contained user-facing application within the Portfolio, with its own purpose and audience-facing entry point. Apps may share styling and components but never depend on each other's internals.
_Avoid_: Showcase app, tool, microsite, sub-site

**CV**:
The App that presents the author: profile, experience, skills, and links to the other Apps.
_Avoid_: Résumé, portfolio page, home page

**Unreleased App**:
An App that exists in the repository but is not yet available to visitors of the live Portfolio; work in progress for an App is incubated here rather than elsewhere.
_Avoid_: Draft app, staging app, hidden app

**Existing App**:
An application created outside this portfolio repository (either commercially for a client or as a standalone personal tool) that is presented on the CV and may be merged into the portfolio in the future.
_Avoid_: Legacy app, old project, side project

**Playground**:
A development-only area for exploring UI outside any App: a workbench for shared components and styling, and the home for design prototypes that have no page to live on. Never visible to visitors; not an App.
_Avoid_: Sandbox, demo, storybook, incubator

**Prototype**:
A temporary, throwaway exploration created to answer a design question (such as layout or state flow), evaluated via switchable variants. Hosted either directly on an existing App page or within the Playground; never shipped to production.
_Avoid_: Spike, experiment, POC, mock
