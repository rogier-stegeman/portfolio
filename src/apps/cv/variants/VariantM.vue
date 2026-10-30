<script setup lang="ts">
import { computed, ref } from 'vue'
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

const props = defineProps<{
  data: CvData
}>()

type TabKey = 'overview' | 'experience' | 'apps' | 'education'

interface TabDefinition {
  key: TabKey
  label: string
}

const activeTab = ref<TabKey>('overview')

const tabs: readonly TabDefinition[] = [
  { key: 'overview', label: 'Overview' },
  { key: 'experience', label: 'Experience' },
  { key: 'apps', label: 'Portfolio Apps' },
  { key: 'education', label: 'Education & Skills' },
]

const mainOrganization = computed(() => props.data.experience[0])
const latestRole = computed(() => mainOrganization.value?.roles[0])
</script>

<template>
  <div class="mx-auto max-w-6xl space-y-6 px-6 py-8 pb-20">
    <!-- Persistent Profile Header -->
    <Card>
      <CardHeader>
        <div class="space-y-1">
          <CardTitle class="text-2xl font-semibold tracking-tight">
            {{ data.profile.name }}
          </CardTitle>
          <CardDescription class="text-base text-foreground/90">
            {{ data.profile.headline }} · {{ data.profile.location }}
          </CardDescription>
        </div>
        <CardAction>
          <div class="flex flex-wrap gap-2">
            <Button
              v-for="link in data.profile.links"
              :key="link.url"
              variant="outline"
              size="sm"
              as-child
            >
              <a :href="link.url" target="_blank" rel="noopener noreferrer">
                <ExternalLink class="size-3.5 text-muted-foreground" />
                <span>{{ link.label }}</span>
              </a>
            </Button>
          </div>
        </CardAction>
      </CardHeader>
      <CardContent>
        <p class="max-w-4xl leading-relaxed text-muted-foreground">
          {{ data.profile.summary }}
        </p>
      </CardContent>
    </Card>

    <!-- Tab Navigation Bar -->
    <nav class="flex flex-wrap items-center gap-1.5 rounded-lg border bg-muted/40 p-1.5">
      <button
        v-for="tab in tabs"
        :key="tab.key"
        type="button"
        class="rounded-md px-4 py-2 text-sm font-medium transition-colors"
        :class="
          activeTab === tab.key
            ? 'bg-background font-semibold text-foreground shadow-xs'
            : 'text-muted-foreground hover:bg-background/50 hover:text-foreground'
        "
        @click="activeTab = tab.key"
      >
        {{ tab.label }}
      </button>
    </nav>

    <!-- Tab 1: Overview -->
    <section v-if="activeTab === 'overview'" class="space-y-6">
      <div class="grid grid-cols-1 items-start gap-6 lg:grid-cols-12">
        <div class="space-y-6 lg:col-span-7">
          <Card>
            <CardHeader>
              <div class="space-y-1">
                <span class="text-xs font-medium tracking-wider text-muted-foreground uppercase">
                  Latest Role
                </span>
                <CardTitle class="text-xl font-semibold">
                  {{ latestRole?.title }}
                </CardTitle>
                <CardDescription>
                  {{ mainOrganization?.organization }} · {{ latestRole?.location }}
                </CardDescription>
              </div>
              <CardAction>
                <Badge variant="outline">{{ latestRole?.period }}</Badge>
              </CardAction>
            </CardHeader>
            <CardContent class="space-y-4">
              <p class="leading-relaxed text-muted-foreground">{{ latestRole?.summary }}</p>
              <ul
                v-if="latestRole?.highlights?.length"
                class="list-disc space-y-1 pl-5 text-sm text-muted-foreground"
              >
                <li v-for="item in latestRole.highlights" :key="item">{{ item }}</li>
              </ul>
              <div class="pt-2">
                <Button variant="outline" size="sm" @click="activeTab = 'experience'">
                  View full career timeline &rarr;
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        <div class="space-y-6 lg:col-span-5">
          <Card>
            <CardHeader>
              <CardTitle class="text-xl font-semibold">Core Competencies</CardTitle>
              <CardDescription>Overview of key technical areas</CardDescription>
            </CardHeader>
            <CardContent class="space-y-4">
              <div v-for="group in data.skillGroups" :key="group.category" class="space-y-1.5">
                <h3 class="text-xs font-medium tracking-wider text-muted-foreground uppercase">
                  {{ group.category }}
                </h3>
                <div class="flex flex-wrap gap-1.5">
                  <Badge v-for="skill in group.skills" :key="skill" variant="secondary">
                    {{ skill }}
                  </Badge>
                </div>
              </div>
              <div class="pt-2">
                <Button variant="outline" size="sm" @click="activeTab = 'education'">
                  View education & skills &rarr;
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <div class="space-y-4">
        <div class="flex flex-wrap items-center justify-between gap-2">
          <div class="space-y-0.5">
            <h2 class="text-lg font-semibold">Portfolio Apps</h2>
            <p class="text-sm text-muted-foreground">
              Commercial systems, personal tools, and domain applications
            </p>
          </div>
          <Button variant="ghost" size="sm" @click="activeTab = 'apps'">
            View details &rarr;
          </Button>
        </div>

        <div class="grid grid-cols-1 gap-4 md:grid-cols-2">
          <Card v-for="app in data.portfolioApps" :key="app.id">
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
      </div>
    </section>

    <!-- Tab 2: Experience -->
    <section v-else-if="activeTab === 'experience'" class="space-y-6">
      <Card v-for="entry in data.experience" :key="entry.organization">
        <CardHeader>
          <div class="space-y-1">
            <CardTitle class="text-xl font-semibold">{{ entry.organization }}</CardTitle>
            <CardDescription>{{ entry.location }}</CardDescription>
          </div>
          <CardAction>
            <Badge variant="outline">{{ entry.totalPeriod }}</Badge>
          </CardAction>
        </CardHeader>
        <CardContent>
          <ol class="relative space-y-8 border-l-2 pl-6">
            <li
              v-for="role in entry.roles"
              :key="`${role.title}-${role.period}`"
              class="relative space-y-2"
            >
              <div class="flex flex-wrap items-baseline justify-between gap-2">
                <h3 class="text-base font-semibold">{{ role.title }}</h3>
                <span class="text-sm text-muted-foreground">{{ role.period }}</span>
              </div>
              <p class="text-sm text-muted-foreground">{{ role.location }}</p>
              <p class="leading-relaxed text-foreground/90">{{ role.summary }}</p>
              <ul
                v-if="role.highlights?.length"
                class="list-disc space-y-1 pl-5 text-sm text-muted-foreground"
              >
                <li v-for="item in role.highlights" :key="item">{{ item }}</li>
              </ul>
            </li>
          </ol>
        </CardContent>
      </Card>
    </section>

    <!-- Tab 3: Portfolio Apps -->
    <section v-else-if="activeTab === 'apps'" class="space-y-6">
      <div class="space-y-1">
        <h2 class="text-xl font-semibold">Portfolio Apps</h2>
        <p class="text-sm text-muted-foreground">
          Commercial systems, personal tools, and specialised domain applications.
        </p>
      </div>

      <div class="grid grid-cols-1 gap-6 md:grid-cols-2">
        <Card v-for="app in data.portfolioApps" :key="app.id">
          <CardHeader>
            <CardTitle class="text-lg font-semibold">
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
            <p class="leading-relaxed text-muted-foreground">{{ app.summary }}</p>
            <p v-if="app.externalUrl" class="text-xs text-muted-foreground/80">
              (Repository currently private &middot; will be made public)
            </p>
          </CardContent>
        </Card>
      </div>
    </section>

    <!-- Tab 4: Education & Skills -->
    <section v-else-if="activeTab === 'education'" class="space-y-8">
      <div class="space-y-4">
        <div class="space-y-1">
          <h2 class="text-xl font-semibold">Education</h2>
          <p class="text-sm text-muted-foreground">
            Academic qualifications and specialised minors
          </p>
        </div>
        <div class="grid grid-cols-1 gap-4 md:grid-cols-2">
          <Card v-for="edu in data.education" :key="`${edu.institution}-${edu.degree}`">
            <CardHeader>
              <div class="space-y-1">
                <CardTitle class="text-lg font-semibold">{{ edu.degree }}</CardTitle>
                <CardDescription>{{ edu.institution }} · {{ edu.location }}</CardDescription>
              </div>
              <CardAction>
                <Badge variant="outline">{{ edu.period }}</Badge>
              </CardAction>
            </CardHeader>
            <CardContent v-if="edu.summary">
              <p class="leading-relaxed text-muted-foreground">{{ edu.summary }}</p>
            </CardContent>
          </Card>
        </div>
      </div>

      <div class="space-y-4">
        <div class="space-y-1">
          <h2 class="text-xl font-semibold">Skills Matrix</h2>
          <p class="text-sm text-muted-foreground">
            Technical capabilities categorised by focus area
          </p>
        </div>
        <div class="grid grid-cols-1 gap-4 md:grid-cols-3">
          <Card v-for="group in data.skillGroups" :key="group.category">
            <CardHeader>
              <CardTitle class="text-base font-semibold">{{ group.category }}</CardTitle>
            </CardHeader>
            <CardContent>
              <div class="flex flex-wrap gap-1.5">
                <Badge v-for="skill in group.skills" :key="skill" variant="secondary">
                  {{ skill }}
                </Badge>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  </div>
</template>
