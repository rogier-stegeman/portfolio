<script setup lang="ts">
import { Boxes } from '@lucide/vue'
</script>

<template>
  <div class="space-y-6">
    <header class="space-y-2">
      <div class="flex items-center gap-3">
        <span
          class="inline-flex size-9 items-center justify-center rounded-md bg-accent text-accent-foreground"
          aria-hidden="true"
        >
          <Boxes class="size-5" />
        </span>
        <h1 class="text-3xl font-bold tracking-tight">Component Workbench</h1>
      </div>
      <p class="text-muted-foreground">
        Showcase and testing workbench for shared foundational UI primitives.
      </p>
    </header>

    <div
      class="rounded-lg border border-dashed border-border bg-card/50 p-8 text-center text-sm text-muted-foreground"
    >
      Core UI primitives (Button, Badge, Card) will be scaffolded in Issue #23.
    </div>
  </div>
</template>
