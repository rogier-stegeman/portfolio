<script setup lang="ts">
import type { CvData } from '@/apps/cv/cv-data'
import { ExternalLink } from '@lucide/vue'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

defineProps<{
  data: CvData
}>()
</script>

<template>
  <div class="mx-auto max-w-6xl space-y-6 px-4 py-8 pb-20 sm:px-6">
    <!-- Header / Technical Specification Overview -->
    <header class="overflow-hidden rounded-lg border border-border bg-card">
      <div
        class="flex flex-wrap items-center justify-between border-b border-border bg-muted/40 px-4 py-2 text-xs text-muted-foreground"
      >
        <span class="flex items-center gap-2 font-medium">
          <span class="inline-block h-2 w-2 rounded-full bg-emerald-500"></span>
          <span>Technical Specification Sheet</span>
        </span>
        <span>{{ data.profile.location }}</span>
      </div>

      <div class="grid grid-cols-1 gap-6 p-6 lg:grid-cols-12">
        <div class="space-y-4 lg:col-span-8">
          <div class="space-y-1">
            <h1 class="text-3xl font-semibold tracking-tight">{{ data.profile.name }}</h1>
            <p class="text-base font-medium text-foreground/90">{{ data.profile.headline }}</p>
          </div>
          <p class="max-w-2xl text-sm leading-relaxed text-muted-foreground">
            {{ data.profile.summary }}
          </p>
        </div>

        <div
          class="flex flex-col justify-between gap-4 border-t border-border pt-4 lg:col-span-4 lg:border-t-0 lg:border-l lg:pt-0 lg:pl-6"
        >
          <div class="space-y-2">
            <div class="text-xs font-semibold tracking-wider text-muted-foreground uppercase">
              Profile Details
            </div>
            <div class="divide-y divide-border rounded border border-border bg-muted/20 text-xs">
              <div class="flex justify-between px-3 py-1.5">
                <span class="text-muted-foreground">Location:</span>
                <span class="font-medium">{{ data.profile.location }}</span>
              </div>
              <div class="flex justify-between px-3 py-1.5">
                <span class="text-muted-foreground">Current organisation:</span>
                <span class="font-medium">Vartion B.V.</span>
              </div>
              <div class="flex justify-between px-3 py-1.5">
                <span class="text-muted-foreground">Tenure:</span>
                <span class="font-medium">2018 – Present</span>
              </div>
            </div>
          </div>

          <div class="flex flex-wrap gap-2 pt-2">
            <Button
              v-for="link in data.profile.links"
              :key="link.url"
              variant="outline"
              size="sm"
              as-child
              class="text-xs"
            >
              <a :href="link.url" target="_blank" rel="noopener noreferrer">
                <ExternalLink class="h-3.5 w-3.5 text-muted-foreground" />
                <span>{{ link.label }}</span>
              </a>
            </Button>
          </div>
        </div>
      </div>
    </header>

    <!-- Portfolio Apps -->
    <section class="space-y-3">
      <div class="flex items-center justify-between border-b border-border pb-2">
        <h2 class="text-lg font-semibold tracking-tight text-foreground">Portfolio Apps</h2>
        <Badge variant="outline" class="text-xs">
          {{ data.portfolioApps.length }} applications
        </Badge>
      </div>

      <div class="grid grid-cols-1 gap-4 md:grid-cols-2">
        <article
          v-for="app in data.portfolioApps"
          :key="app.id"
          class="flex flex-col justify-between overflow-hidden rounded-lg border border-border bg-card"
        >
          <div>
            <div
              class="flex items-center justify-between border-b border-border bg-muted/30 px-4 py-2 text-xs"
            >
              <span class="font-medium text-muted-foreground">{{ app.category }} App</span>
              <Badge variant="secondary" class="text-[11px]">
                {{ app.statusLabel }}
              </Badge>
            </div>
            <div class="space-y-2 p-4">
              <h3 class="text-base font-semibold tracking-tight">
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
              </h3>
              <p class="text-sm leading-relaxed text-muted-foreground">{{ app.summary }}</p>
              <p v-if="app.externalUrl" class="text-xs text-muted-foreground/80">
                (Repository currently private &middot; will be made public)
              </p>
            </div>
          </div>
        </article>
      </div>
    </section>

    <!-- Experience -->
    <section class="space-y-3">
      <div class="flex items-center justify-between border-b border-border pb-2">
        <h2 class="text-lg font-semibold tracking-tight text-foreground">Experience</h2>
        <Badge v-if="data.experience[0]" variant="outline" class="text-xs">
          {{ data.experience[0].totalPeriod }}
        </Badge>
      </div>

      <div
        v-for="entry in data.experience"
        :key="entry.organization"
        class="overflow-hidden rounded-lg border border-border bg-card"
      >
        <div
          class="flex flex-wrap items-center justify-between border-b border-border bg-muted/40 px-4 py-3"
        >
          <div class="space-y-0.5">
            <h3 class="text-base font-semibold tracking-tight">{{ entry.organization }}</h3>
            <p class="text-xs text-muted-foreground">{{ entry.location }}</p>
          </div>
          <div class="flex items-center gap-2">
            <Badge variant="outline" class="text-xs">
              {{ entry.totalPeriod }}
            </Badge>
            <Badge variant="secondary" class="text-xs"> {{ entry.roles.length }} roles </Badge>
          </div>
        </div>

        <div class="divide-y divide-border">
          <div
            v-for="(role, roleIdx) in entry.roles"
            :key="`${role.title}-${role.period}`"
            class="grid grid-cols-1 gap-4 p-5 transition-colors hover:bg-muted/10 md:grid-cols-12"
          >
            <div class="space-y-1.5 md:col-span-4">
              <div class="flex items-center gap-2">
                <span class="text-xs font-semibold text-primary">
                  Role {{ roleIdx + 1 }} of {{ entry.roles.length }}
                </span>
              </div>
              <h4 class="text-base font-medium text-foreground">{{ role.title }}</h4>
              <p class="text-xs font-medium text-foreground/80">{{ role.period }}</p>
              <p class="text-xs text-muted-foreground">{{ role.location }}</p>
            </div>

            <div class="space-y-3 md:col-span-8">
              <p class="text-sm leading-relaxed text-muted-foreground">
                {{ role.summary }}
              </p>
              <div
                v-if="role.highlights?.length"
                class="space-y-1.5 rounded border border-border/80 bg-muted/20 p-3"
              >
                <div class="text-xs font-medium text-foreground">Key highlights</div>
                <ul class="list-disc space-y-1 pl-4 text-xs text-muted-foreground">
                  <li v-for="highlight in role.highlights" :key="highlight">
                    {{ highlight }}
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Grid for Education & Skills -->
    <div class="grid grid-cols-1 items-start gap-6 lg:grid-cols-12">
      <!-- Education -->
      <section class="space-y-3 lg:col-span-7">
        <div class="flex items-center justify-between border-b border-border pb-2">
          <h2 class="text-lg font-semibold tracking-tight text-foreground">Education</h2>
          <Badge variant="outline" class="text-xs"> {{ data.education.length }} records </Badge>
        </div>

        <div class="space-y-3">
          <div
            v-for="edu in data.education"
            :key="`${edu.institution}-${edu.degree}`"
            class="overflow-hidden rounded-lg border border-border bg-card"
          >
            <div
              class="flex flex-wrap items-center justify-between border-b border-border bg-muted/30 px-4 py-2 text-xs"
            >
              <span class="font-medium text-muted-foreground">
                {{ edu.institution }}
              </span>
              <Badge variant="outline" class="text-[11px]">
                {{ edu.period }}
              </Badge>
            </div>
            <div class="space-y-2 p-4">
              <div class="flex flex-wrap items-baseline justify-between gap-2">
                <h3 class="text-base font-semibold tracking-tight">{{ edu.degree }}</h3>
                <span class="text-xs text-muted-foreground">{{ edu.location }}</span>
              </div>
              <p v-if="edu.summary" class="text-sm leading-relaxed text-muted-foreground">
                {{ edu.summary }}
              </p>
            </div>
          </div>
        </div>
      </section>

      <!-- Skills -->
      <section class="space-y-3 lg:col-span-5">
        <div class="flex items-center justify-between border-b border-border pb-2">
          <h2 class="text-lg font-semibold tracking-tight text-foreground">Skills</h2>
          <Badge variant="outline" class="text-xs">
            {{ data.skillGroups.length }} categories
          </Badge>
        </div>

        <div class="overflow-hidden rounded-lg border border-border bg-card">
          <div class="divide-y divide-border">
            <div v-for="group in data.skillGroups" :key="group.category" class="space-y-2 p-4">
              <div class="flex items-center justify-between">
                <h3 class="text-xs font-semibold tracking-wider text-muted-foreground uppercase">
                  {{ group.category }}
                </h3>
                <span class="text-xs text-muted-foreground">
                  {{ group.skills.length }} skills
                </span>
              </div>
              <div class="flex flex-wrap gap-1.5">
                <Badge
                  v-for="skill in group.skills"
                  :key="skill"
                  variant="secondary"
                  class="text-xs"
                >
                  {{ skill }}
                </Badge>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>

    <!-- Verification Footer -->
    <footer
      class="flex flex-wrap items-center justify-between border-t border-border pt-4 text-xs text-muted-foreground"
    >
      <span>{{ data.profile.name }} · Curriculum Vitae</span>
      <span>Technical Specification Sheet</span>
    </footer>
  </div>
</template>
