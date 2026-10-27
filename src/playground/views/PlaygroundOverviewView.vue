<script setup lang="ts">
import { RouterLink } from 'vue-router'

interface WorkbenchSection {
  title: string
  description: string
  href: string
  actionLabel: string
}

const sections: WorkbenchSection[] = [
  {
    title: 'Design Tokens',
    description:
      'Inspect colour palettes, typography scales, radii, and semantic CSS custom properties.',
    href: '/playground/tokens',
    actionLabel: 'Explore tokens',
  },
  {
    title: 'Component Workbench',
    description:
      'Browse and test foundational UI primitives, variant matrices, and compound compositions.',
    href: '/playground/components',
    actionLabel: 'View components',
  },
  {
    title: 'UI Prototypes',
    description:
      'Explore throwaway layout explorations, interactive variants, and experimental features.',
    href: '/playground/prototypes',
    actionLabel: 'Browse prototypes',
  },
]
</script>

<template>
  <div class="space-y-6">
    <header class="space-y-2">
      <h1 class="text-2xl font-semibold">Playground Overview</h1>
      <p class="text-muted-foreground">
        A development-only workbench for inspecting design tokens, exercising reusable UI
        components, and evaluating throwaway design prototypes outside production builds.
      </p>
    </header>

    <div class="grid grid-cols-1 gap-4 md:grid-cols-3">
      <article
        v-for="section in sections"
        :key="section.href"
        class="flex flex-col justify-between gap-4 rounded-lg border border-border bg-card p-6 text-card-foreground"
      >
        <div class="space-y-1">
          <h2 class="font-semibold">{{ section.title }}</h2>
          <p class="text-muted-foreground">{{ section.description }}</p>
        </div>

        <RouterLink :to="section.href" class="font-medium text-primary">
          {{ section.actionLabel }}
        </RouterLink>
      </article>
    </div>
  </div>
</template>
