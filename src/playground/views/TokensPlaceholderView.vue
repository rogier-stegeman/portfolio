<script setup lang="ts">
import { Palette } from '@lucide/vue'
</script>

<template>
  <div class="space-y-6">
    <header class="space-y-2">
      <div class="flex items-center gap-3">
        <span
          class="inline-flex size-9 items-center justify-center rounded-md bg-accent text-accent-foreground"
          aria-hidden="true"
        >
          <Palette class="size-5" />
        </span>
        <h1 class="text-3xl font-bold tracking-tight">Design Tokens</h1>
      </div>
      <p class="text-muted-foreground">
        Visualisation and colour swatch workbench for portfolio design tokens.
      </p>
    </header>

    <div
      class="rounded-lg border border-dashed border-border bg-card/50 p-8 text-center text-sm text-muted-foreground"
    >
      Token workbench will be scaffolded in Issue #22.
    </div>
  </div>
</template>
