<script setup lang="ts">
import type { CvData } from '@/apps/cv/cv-data'
import { computed, ref } from 'vue'
import { ExternalLink } from '@lucide/vue'
import { GitHubIcon, LinkedInIcon } from '@/components/icons'
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

type SectionKey = 'experience' | 'apps' | 'education' | 'skills'

interface BookmarkItem {
  id: SectionKey
  label: string
  count: number
}

const activeSection = ref<SectionKey>('experience')

const bookmarks = computed<readonly BookmarkItem[]>(() => [
  {
    id: 'experience',
    label: 'Experience',
    count: props.data.experience[0]?.roles.length ?? 0,
  },
  {
    id: 'apps',
    label: 'Apps',
    count: props.data.portfolioApps.length,
  },
  {
    id: 'education',
    label: 'Education',
    count: props.data.education.length,
  },
  {
    id: 'skills',
    label: 'Skills',
    count: props.data.skillGroups.length,
  },
])

function selectSection(id: SectionKey) {
  activeSection.value = id
  if (typeof window !== 'undefined') {
    const el = document.getElementById(`section-${id}`)
    el?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
}
</script>

<template>
  <div class="mx-auto max-w-7xl px-4 py-8 pb-20 sm:px-6 lg:px-8">
    <div class="grid grid-cols-1 items-start gap-8 lg:grid-cols-12">
      <!-- Left pane: Orientation panel with profile and interactive bookmarks -->
      <aside
        class="space-y-6 rounded-2xl border bg-card/60 p-6 backdrop-blur-sm lg:sticky lg:top-8 lg:col-span-4"
      >
        <header class="space-y-3">
          <div class="space-y-1">
            <h1 class="text-2xl font-bold tracking-tight text-foreground">
              {{ data.profile.name }}
            </h1>
            <p class="font-medium text-foreground/90">{{ data.profile.headline }}</p>
            <p class="text-sm text-muted-foreground">{{ data.profile.location }}</p>
          </div>
          <p class="text-sm leading-relaxed text-muted-foreground">{{ data.profile.summary }}</p>
          <div class="flex flex-wrap gap-2 pt-2">
            <Button
              v-for="link in data.profile.links"
              :key="link.url"
              variant="outline"
              size="icon-sm"
              class="rounded-full"
              as-child
            >
              <a
                :href="link.url"
                target="_blank"
                rel="noopener noreferrer"
                :aria-label="link.label"
              >
                <LinkedInIcon v-if="link.label.toLowerCase() === 'linkedin'" class="size-4" />
                <GitHubIcon v-else-if="link.label.toLowerCase() === 'github'" class="size-4" />
                <span class="sr-only">{{ link.label }}</span>
              </a>
            </Button>
          </div>
        </header>

        <nav class="space-y-3 border-t pt-5">
          <div class="flex items-center justify-between">
            <h2 class="text-xs font-semibold tracking-wider text-muted-foreground uppercase">
              Bookmarks
            </h2>
            <span class="text-xs text-muted-foreground">Jump to section</span>
          </div>
          <div class="flex flex-wrap gap-2 lg:flex-col lg:gap-1.5">
            <Button
              v-for="bookmark in bookmarks"
              :key="bookmark.id"
              :variant="activeSection === bookmark.id ? 'secondary' : 'ghost'"
              size="sm"
              class="w-full justify-between"
              @click="selectSection(bookmark.id)"
            >
              <span>{{ bookmark.label }}</span>
              <Badge variant="outline" class="font-mono text-xs">
                {{ bookmark.count }}
              </Badge>
            </Button>
          </div>
        </nav>
      </aside>

      <!-- Right pane: Continuously scrollable reader content -->
      <div id="reader-content" class="space-y-8 lg:col-span-8">
        <!-- Experience: Unified Chronological Vartion B.V. Career Timeline -->
        <section id="section-experience" class="space-y-4">
          <div class="flex items-center justify-between">
            <h2 class="text-xl font-semibold tracking-tight">Experience</h2>
            <span class="text-xs text-muted-foreground">Career Timeline</span>
          </div>

          <Card v-for="entry in data.experience" :key="entry.organization">
            <CardHeader>
              <CardTitle>{{ entry.organization }}</CardTitle>
              <CardDescription>{{ entry.location }}</CardDescription>
              <CardAction>
                <Badge variant="outline">{{ entry.totalPeriod }}</Badge>
              </CardAction>
            </CardHeader>
            <CardContent>
              <div
                class="relative pl-6 before:absolute before:top-2 before:bottom-2 before:left-0 before:w-px before:bg-border"
              >
                <div
                  v-for="role in entry.roles"
                  :key="`${role.title}-${role.period}`"
                  class="relative space-y-2 pb-8 last:pb-0"
                >
                  <span
                    class="absolute top-1.5 -left-6 size-2.5 -translate-x-1/2 rounded-full border-2 border-background bg-primary"
                  />
                  <div class="flex flex-wrap items-baseline justify-between gap-2">
                    <h3 class="font-semibold text-foreground">{{ role.title }}</h3>
                    <span class="font-mono text-xs text-muted-foreground">{{ role.period }}</span>
                  </div>
                  <p class="text-xs text-muted-foreground">{{ role.location }}</p>
                  <p class="text-sm leading-relaxed text-muted-foreground">{{ role.summary }}</p>
                  <ul
                    v-if="role.highlights?.length"
                    class="list-disc space-y-1 pl-4 text-xs text-muted-foreground"
                  >
                    <li v-for="item in role.highlights" :key="item">{{ item }}</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        <!-- Portfolio Apps: Domain applications -->
        <section id="section-apps" class="space-y-4">
          <div class="flex items-center justify-between">
            <h2 class="text-xl font-semibold tracking-tight">Portfolio Apps</h2>
            <span class="text-xs text-muted-foreground">Applications & Systems</span>
          </div>

          <div class="grid grid-cols-1 gap-5 md:grid-cols-2">
            <Card
              v-for="app in data.portfolioApps"
              :key="app.id"
              class="flex flex-col justify-between"
            >
              <CardHeader>
                <CardTitle class="text-lg">
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
                <p class="text-sm leading-relaxed text-muted-foreground">{{ app.summary }}</p>
                <p v-if="app.externalUrl" class="text-xs text-muted-foreground/80">
                  (Repository currently private &middot; will be made public)
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        <!-- Education Milestones -->
        <section id="section-education" class="space-y-4">
          <div class="flex items-center justify-between">
            <h2 class="text-xl font-semibold tracking-tight">Education</h2>
            <span class="text-xs text-muted-foreground">Academic Milestones</span>
          </div>

          <div class="grid grid-cols-1 gap-4 md:grid-cols-2">
            <Card
              v-for="edu in data.education"
              :key="`${edu.institution}-${edu.degree}`"
              class="flex flex-col justify-between"
            >
              <CardHeader>
                <CardTitle class="text-base">{{ edu.degree }}</CardTitle>
                <CardDescription>{{ edu.institution }} · {{ edu.location }}</CardDescription>
                <CardAction>
                  <Badge variant="outline">{{ edu.period }}</Badge>
                </CardAction>
              </CardHeader>
              <CardContent v-if="edu.summary">
                <p class="text-sm leading-relaxed text-muted-foreground">{{ edu.summary }}</p>
              </CardContent>
            </Card>
          </div>
        </section>

        <!-- Skills Matrix -->
        <section id="section-skills" class="space-y-4">
          <div class="flex items-center justify-between">
            <h2 class="text-xl font-semibold tracking-tight">Skills</h2>
            <span class="text-xs text-muted-foreground">Technical Competencies</span>
          </div>

          <Card>
            <CardContent class="grid grid-cols-1 gap-6 pt-6 sm:grid-cols-3">
              <div v-for="group in data.skillGroups" :key="group.category" class="space-y-2.5">
                <h3 class="text-sm font-semibold text-foreground">{{ group.category }}</h3>
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
