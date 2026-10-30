<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import PrototypeSwitcher, { type PrototypeVariant } from '@/components/PrototypeSwitcher.vue'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

interface AppSummary {
  id: string
  title: string
  period: string
  status: string
  summary: string
}

const variants: PrototypeVariant[] = [
  { key: 'A', label: 'Split sidebar' },
  { key: 'B', label: 'Stacked timeline' },
]

const apps: AppSummary[] = [
  {
    id: 'cv',
    title: 'CV App',
    period: '2026 Q3',
    status: 'Released',
    summary:
      'Author profile, engineering experience, and entry points to the Application Portfolio.',
  },
  {
    id: 'urban-ecology',
    title: 'Urban Ecology App',
    period: '2026 Q4',
    status: 'Unreleased App',
    summary: 'Spatial analysis of urban canopy coverage and local biodiversity corridors.',
  },
]

const route = useRoute()

const activeVariant = computed(() => {
  const raw = route.query.variant
  const current = Array.isArray(raw) ? raw[0] : raw
  return current === 'B' ? 'B' : 'A'
})
</script>

<template>
  <div class="space-y-8 pb-16">
    <header class="space-y-2">
      <div class="flex items-center gap-3">
        <h1 class="text-2xl font-semibold">Example Prototype</h1>
        <Badge variant="outline">Variant {{ activeVariant }}</Badge>
      </div>
      <p class="text-muted-foreground">
        Starter standalone prototype comparing a split sidebar layout against a chronological
        timeline layout.
      </p>
    </header>

    <section v-if="activeVariant === 'A'" class="grid grid-cols-1 gap-6 lg:grid-cols-3">
      <Card>
        <CardHeader>
          <CardTitle>Portfolio Summary</CardTitle>
          <CardDescription>Split sidebar layout (Variant A)</CardDescription>
        </CardHeader>
        <CardContent>
          <p class="text-muted-foreground">
            Pairs a persistent context panel on the left with a multi-column card grid on the right
            for scanning parallel Apps.
          </p>
        </CardContent>
      </Card>

      <div class="grid grid-cols-1 gap-4 md:grid-cols-2 lg:col-span-2">
        <Card v-for="app in apps" :key="app.id">
          <CardHeader>
            <CardTitle>{{ app.title }}</CardTitle>
            <CardDescription>{{ app.period }}</CardDescription>
          </CardHeader>
          <CardContent>
            <p>{{ app.summary }}</p>
          </CardContent>
          <CardFooter>
            <Badge variant="secondary">{{ app.status }}</Badge>
          </CardFooter>
        </Card>
      </div>
    </section>

    <section v-else class="max-w-2xl space-y-6">
      <div class="space-y-1">
        <h2 class="font-semibold">Chronological Delivery Feed</h2>
        <p class="text-muted-foreground">
          Single-column vertical timeline layout (Variant B) emphasising sequential milestones.
        </p>
      </div>

      <ol class="space-y-4 border-l pl-6">
        <li v-for="app in apps" :key="app.id" class="space-y-2">
          <div class="flex flex-wrap items-center justify-between gap-2">
            <h3 class="font-semibold">{{ app.title }}</h3>
            <div class="flex items-center gap-2">
              <span class="text-muted-foreground">{{ app.period }}</span>
              <Badge>{{ app.status }}</Badge>
            </div>
          </div>
          <p class="text-muted-foreground">{{ app.summary }}</p>
          <div>
            <Button variant="outline" size="sm">Open App</Button>
          </div>
        </li>
      </ol>
    </section>

    <PrototypeSwitcher :variants="variants" />
  </div>
</template>
