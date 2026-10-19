<script setup lang="ts">
import { FlaskConical } from '@lucide/vue'
import { useRoute } from 'vue-router'

const route = useRoute()
</script>

<template>
  <div class="space-y-6">
    <header class="space-y-2">
      <div class="flex items-center gap-3">
        <span
          class="inline-flex size-9 items-center justify-center rounded-md bg-accent text-accent-foreground"
          aria-hidden="true"
        >
          <FlaskConical class="size-5" />
        </span>
        <h1 class="text-3xl font-bold tracking-tight">Prototype: {{ route.params.name }}</h1>
      </div>
      <p class="text-muted-foreground">
        Isolated environment for prototype
        <code class="rounded bg-muted px-1.5 py-0.5 font-mono text-xs text-foreground">
          {{ route.params.name }}
        </code>
      </p>
    </header>

    <div
      class="rounded-lg border border-dashed border-border bg-card/50 p-8 text-center text-sm text-muted-foreground"
    >
      Dynamic standalone prototype resolution will be scaffolded in Issue #24.
    </div>
  </div>
</template>
