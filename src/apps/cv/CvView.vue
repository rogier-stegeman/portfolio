<script setup lang="ts">
import { FileText } from '@lucide/vue'
</script>

<template>
  <main class="flex min-h-screen items-center justify-center bg-background p-6 text-foreground">
    <section
      class="w-full max-w-lg rounded-lg border border-border bg-card p-8 text-card-foreground shadow-sm"
    >
      <div class="flex items-center gap-3">
        <span
          class="inline-flex size-10 items-center justify-center rounded-md bg-accent text-accent-foreground"
          aria-hidden="true"
        >
          <FileText class="size-5" />
        </span>
        <div>
          <h1 class="text-2xl font-semibold tracking-tight">CV</h1>
          <p class="text-muted-foreground">
            Curriculum vitae and Portfolio overview placeholder shell.
          </p>
        </div>
      </div>
    </section>
  </main>
</template>
