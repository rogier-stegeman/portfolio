<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { Button } from '@/components/ui/button'
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'

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
  <div class="space-y-8">
    <header class="space-y-2">
      <h1 class="text-2xl font-semibold">Playground Overview</h1>
      <p class="text-muted-foreground">
        A development-only workbench for inspecting design tokens, exercising reusable UI
        components, and evaluating throwaway design prototypes outside production builds.
      </p>
    </header>

    <div class="grid grid-cols-1 gap-4 md:grid-cols-3">
      <Card v-for="section in sections" :key="section.href">
        <CardHeader>
          <CardTitle>{{ section.title }}</CardTitle>
          <CardDescription>{{ section.description }}</CardDescription>
        </CardHeader>

        <CardFooter>
          <Button variant="outline" as-child>
            <RouterLink :to="section.href">
              {{ section.actionLabel }}
            </RouterLink>
          </Button>
        </CardFooter>
      </Card>
    </div>
  </div>
</template>
