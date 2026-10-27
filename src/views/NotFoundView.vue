<script setup lang="ts">
import { ArrowLeft, Compass } from '@lucide/vue'
import { RouterLink } from 'vue-router'
</script>

<template>
  <main class="flex min-h-screen items-center justify-center bg-background p-6 text-foreground">
    <section
      class="w-full max-w-lg rounded-lg border border-border bg-card p-8 text-card-foreground shadow-sm"
    >
      <div class="flex items-start gap-3">
        <span
          class="inline-flex size-10 shrink-0 items-center justify-center rounded-md bg-accent text-accent-foreground"
          aria-hidden="true"
        >
          <Compass class="size-5" />
        </span>
        <div class="space-y-4">
          <div class="space-y-1">
            <h1 class="text-2xl font-semibold tracking-tight">Not Found</h1>
            <p class="text-muted-foreground">The requested page could not be found.</p>
          </div>
          <RouterLink
            to="/cv"
            class="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 font-medium text-primary-foreground transition-opacity hover:opacity-90 focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
          >
            <ArrowLeft class="size-4" aria-hidden="true" />
            <span>Back to CV</span>
          </RouterLink>
        </div>
      </div>
    </section>
  </main>
</template>
