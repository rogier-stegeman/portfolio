<script setup lang="ts">
import { Boxes, FlaskConical, Palette } from '@lucide/vue'
import { RouterLink } from 'vue-router'

interface WorkbenchSection {
  title: string
  description: string
  href: string
  actionLabel: string
  icon: typeof Palette
}

const sections: WorkbenchSection[] = [
  {
    title: 'Design Tokens',
    description:
      'Inspect colour palettes, typography scales, radii, and semantic CSS custom properties.',
    href: '/playground/tokens',
    actionLabel: 'Explore tokens',
    icon: Palette,
  },
  {
    title: 'Component Workbench',
    description:
      'Browse and test foundational UI primitives, variant matrices, and compound compositions.',
    href: '/playground/components',
    actionLabel: 'View components',
    icon: Boxes,
  },
  {
    title: 'UI Prototypes',
    description:
      'Explore throwaway layout explorations, interactive variants, and experimental features.',
    href: '/playground/prototypes',
    actionLabel: 'Browse prototypes',
    icon: FlaskConical,
  },
]
</script>

<template>
  <div class="space-y-8">
    <header class="space-y-2">
      <h1 class="text-3xl font-bold tracking-tight">Playground Overview</h1>
      <p class="max-w-2xl text-base text-muted-foreground">
        A development-only workbench for inspecting design tokens, exercising reusable UI
        components, and evaluating throwaway design prototypes outside production builds.
      </p>
    </header>

    <div class="grid grid-cols-1 gap-6 md:grid-cols-3">
      <article
        v-for="section in sections"
        :key="section.href"
        class="flex flex-col justify-between rounded-lg border border-border bg-card p-6 shadow-sm transition-colors hover:border-border/80 hover:bg-card/90"
      >
        <div class="space-y-4">
          <span
            class="inline-flex size-10 items-center justify-center rounded-md bg-accent text-accent-foreground"
            aria-hidden="true"
          >
            <component :is="section.icon" class="size-5" />
          </span>
          <div class="space-y-1.5">
            <h2 class="text-xl font-semibold tracking-tight">{{ section.title }}</h2>
            <p class="text-sm leading-relaxed text-muted-foreground">{{ section.description }}</p>
          </div>
        </div>

        <div class="pt-6">
          <RouterLink
            :to="section.href"
            class="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
          >
            <span>{{ section.actionLabel }}</span>
            <span aria-hidden="true">&rarr;</span>
          </RouterLink>
        </div>
      </article>
    </div>
  </div>
</template>
