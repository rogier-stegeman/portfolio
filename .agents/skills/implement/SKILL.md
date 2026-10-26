---
name: implement
description: 'Implement a piece of work based on a spec or set of tickets.'
disable-model-invocation: true
---

Implement the work described by the user in the spec or tickets.

If the user passes a ticket reference, fetch it from the issue tracker and state its title before starting. If the reference is ambiguous, ask.

Call the Skill tool with "tdd" when implementing executable behaviour at public seams. For purely declarative styling, theme tokens, or static configuration, rely on static checks and visual review rather than manufacturing artificial test seams.

During iteration, run targeted single test files and typechecking (`vue-tsc --noEmit`). Reserve `pnpm verify` as the single final gate once implementation and review conclude.

Once done, call the Skill tool with "code-review" to review the work.

Pause with changes uncommitted for local review in chat.
