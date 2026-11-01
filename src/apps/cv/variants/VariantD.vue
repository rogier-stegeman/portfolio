<script setup lang="ts">
import type { CvData } from '@/apps/cv/cv-data'
import { ExternalLink } from '@lucide/vue'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

defineProps<{
  data: CvData
}>()
</script>

<template>
  <div class="mx-auto max-w-6xl space-y-8 px-6 py-8 pb-20">
    <header class="space-y-4 border-b pb-6">
      <div class="flex flex-wrap items-start justify-between gap-4">
        <div class="space-y-1">
          <h1 class="text-3xl font-semibold">{{ data.profile.name }}</h1>
          <p class="text-muted-foreground">
            {{ data.profile.headline }} · {{ data.profile.location }}
          </p>
        </div>
        <div class="flex flex-wrap gap-2">
          <Button
            v-for="(link, idx) in data.profile.links"
            :key="link.url"
            :variant="idx === 0 ? 'default' : 'outline'"
            size="sm"
            as-child
          >
            <a :href="link.url" target="_blank" rel="noopener noreferrer">
              <ExternalLink
                class="size-3.5"
                :class="idx === 0 ? 'text-primary-foreground' : 'text-muted-foreground'"
              />
              <span>{{ link.label }}</span>
            </a>
          </Button>
        </div>
      </div>
      <p class="max-w-3xl text-muted-foreground">{{ data.profile.summary }}</p>
    </header>

    <section class="space-y-3">
      <div class="flex items-center justify-between">
        <h2 class="text-lg font-semibold">Application Portfolio</h2>
        <span class="text-sm text-muted-foreground">
          Commercial systems, personal tools, and domain applications
        </span>
      </div>

      <div class="grid grid-cols-1 gap-4 md:grid-cols-2">
        <Card v-for="app in data.applicationPortfolio" :key="app.id">
          <CardHeader>
            <CardTitle>
              <a
                v-if="app.externalUrl"
                :href="app.externalUrl"
                target="_blank"
                rel="noopener noreferrer"
                class="inline-flex items-center gap-1.5 hover:underline"
              >
                <span>{{ app.title }}</span>
                <ExternalLink class="size-3.5 text-muted-foreground" />
              </a>
              <span v-else>{{ app.title }}</span>
            </CardTitle>
            <CardAction>
              <div class="flex flex-wrap items-center gap-1.5">
                <Badge variant="outline">{{ app.category }}</Badge>
                <Badge :variant="app.status === 'existing' ? 'default' : 'secondary'">
                  {{ app.statusLabel }}
                </Badge>
              </div>
            </CardAction>
          </CardHeader>
          <CardContent class="space-y-2">
            <p class="text-muted-foreground">{{ app.summary }}</p>
            <p v-if="app.externalUrl" class="text-xs text-muted-foreground/80">
              (Repository currently private &middot; will be made public)
            </p>
          </CardContent>
        </Card>
      </div>
    </section>

    <div class="grid grid-cols-1 items-start gap-8 border-t pt-8 lg:grid-cols-12">
      <section class="space-y-4 lg:col-span-7">
        <h2 class="text-xl font-semibold">Experience</h2>
        <Card v-for="entry in data.experience" :key="entry.organization">
          <CardHeader>
            <CardTitle class="text-xl font-semibold">{{ entry.organization }}</CardTitle>
            <CardDescription>{{ entry.location }}</CardDescription>
            <CardAction>
              <Badge variant="outline">{{ entry.totalPeriod }}</Badge>
            </CardAction>
          </CardHeader>
          <CardContent>
            <ol class="relative ml-1.5 space-y-7 border-l-2 border-border pl-6">
              <li
                v-for="(role, index) in entry.roles"
                :key="`${role.title}-${role.period}`"
                class="relative space-y-2"
              >
                <span
                  class="absolute top-1.5 -left-[31px] size-3 rounded-full border-2 border-background"
                  :class="
                    index === 0 ? 'bg-primary ring-4 ring-primary/20' : 'bg-muted-foreground/40'
                  "
                />
                <div class="flex flex-wrap items-baseline justify-between gap-2">
                  <h3 class="font-semibold text-foreground">{{ role.title }}</h3>
                  <span class="text-xs font-medium text-muted-foreground">{{ role.period }}</span>
                </div>
                <p class="text-xs text-muted-foreground">{{ role.location }}</p>
                <p class="text-sm leading-relaxed text-muted-foreground">{{ role.summary }}</p>
                <ul
                  v-if="role.highlights?.length"
                  class="list-disc space-y-1 pl-4 text-xs text-muted-foreground"
                >
                  <li v-for="item in role.highlights" :key="item">{{ item }}</li>
                </ul>
              </li>
            </ol>
          </CardContent>
        </Card>
      </section>

      <div class="space-y-8 lg:col-span-5">
        <section class="space-y-4">
          <h2 class="text-xl font-semibold">Education</h2>
          <div class="space-y-4">
            <Card v-for="edu in data.education" :key="`${edu.institution}-${edu.degree}`">
              <CardHeader>
                <CardTitle>{{ edu.degree }}</CardTitle>
                <CardDescription>{{ edu.institution }} · {{ edu.location }}</CardDescription>
                <CardAction>
                  <Badge variant="outline">{{ edu.period }}</Badge>
                </CardAction>
              </CardHeader>
              <CardContent v-if="edu.summary">
                <p class="text-muted-foreground">{{ edu.summary }}</p>
              </CardContent>
            </Card>
          </div>
        </section>

        <section class="space-y-4">
          <h2 class="text-xl font-semibold">Skills</h2>
          <Card>
            <CardContent class="space-y-4 pt-6">
              <div v-for="group in data.skillGroups" :key="group.category" class="space-y-2">
                <h3 class="font-medium text-foreground">{{ group.category }}</h3>
                <div class="flex flex-wrap gap-1.5">
                  <Badge v-for="skill in group.skills" :key="skill" variant="secondary">
                    {{ skill }}
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  </div>
</template>
