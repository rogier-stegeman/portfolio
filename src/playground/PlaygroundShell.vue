<script setup lang="ts">
import {
  Boxes,
  ChevronRight,
  FlaskConical,
  LayoutDashboard,
  LogOut,
  Menu,
  Palette,
  X,
} from '@lucide/vue'
import { computed, ref, watch } from 'vue'
import { RouterLink, RouterView, useRoute } from 'vue-router'

interface NavItem {
  name: string
  href: string
  icon: typeof LayoutDashboard
  exact?: boolean
}

const navItems: NavItem[] = [
  { name: 'Overview', href: '/playground', icon: LayoutDashboard, exact: true },
  { name: 'Tokens', href: '/playground/tokens', icon: Palette },
  { name: 'Components', href: '/playground/components', icon: Boxes },
  { name: 'Prototypes', href: '/playground/prototypes', icon: FlaskConical },
]

interface BreadcrumbItem {
  label: string
  href?: string
}

const route = useRoute()
const isMobileNavOpen = ref(false)

// Close mobile navigation on route change
watch(
  () => route.fullPath,
  () => {
    isMobileNavOpen.value = false
  },
)

const breadcrumbs = computed<BreadcrumbItem[]>(() => {
  const path = route.path.replace(/\/$/, '')
  const items: BreadcrumbItem[] = [
    { label: 'Playground', href: path === '/playground' ? undefined : '/playground' },
  ]

  if (path === '/playground') {
    items.push({ label: 'Overview' })
  } else if (path === '/playground/tokens') {
    items.push({ label: 'Tokens' })
  } else if (path === '/playground/components') {
    items.push({ label: 'Components' })
  } else if (path.startsWith('/playground/prototypes')) {
    const prototypeName = route.params.name as string | undefined
    if (prototypeName) {
      items.push({ label: 'Prototypes', href: '/playground/prototypes' })
      items.push({ label: prototypeName })
    } else {
      items.push({ label: 'Prototypes' })
    }
  }

  return items
})

function isItemActive(item: NavItem) {
  const current = route.path.replace(/\/$/, '')
  if (item.exact) {
    return current === item.href
  }
  return current.startsWith(item.href)
}
</script>

<template>
  <div class="flex min-h-screen bg-background text-foreground">
    <!-- Desktop Sidebar -->
    <aside
      class="hidden w-64 shrink-0 flex-col border-r border-border bg-card text-card-foreground md:flex"
    >
      <div class="flex h-16 items-center justify-between border-b border-border px-6">
        <div class="flex items-center gap-2">
          <span class="font-semibold tracking-tight">Playground</span>
          <span
            class="rounded-full bg-accent px-2 py-0.5 text-xs font-medium text-accent-foreground"
          >
            Dev
          </span>
        </div>
      </div>

      <nav aria-label="Playground navigation" class="flex-1 space-y-1 p-4">
        <RouterLink
          v-for="item in navItems"
          :key="item.href"
          :to="item.href"
          class="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors"
          :class="[
            isItemActive(item)
              ? 'bg-accent text-accent-foreground'
              : 'text-muted-foreground hover:bg-accent/50 hover:text-foreground',
          ]"
        >
          <component :is="item.icon" class="size-4 shrink-0" aria-hidden="true" />
          <span>{{ item.name }}</span>
        </RouterLink>
      </nav>
    </aside>

    <!-- Mobile Drawer Overlay -->
    <div
      v-if="isMobileNavOpen"
      class="fixed inset-0 z-40 bg-background/80 backdrop-blur-xs md:hidden"
      aria-hidden="true"
      @click="isMobileNavOpen = false"
    />

    <!-- Mobile Drawer Content -->
    <aside
      v-if="isMobileNavOpen"
      class="fixed inset-y-0 left-0 z-50 flex w-64 flex-col border-r border-border bg-card p-4 text-card-foreground shadow-lg md:hidden"
    >
      <div class="flex items-center justify-between pb-4">
        <div class="flex items-center gap-2">
          <span class="font-semibold tracking-tight">Playground</span>
          <span
            class="rounded-full bg-accent px-2 py-0.5 text-xs font-medium text-accent-foreground"
          >
            Dev
          </span>
        </div>
        <button
          type="button"
          class="inline-flex size-8 items-center justify-center rounded-md text-muted-foreground hover:bg-accent hover:text-foreground"
          aria-label="Close navigation"
          @click="isMobileNavOpen = false"
        >
          <X class="size-5" />
        </button>
      </div>

      <nav aria-label="Playground navigation" class="flex-1 space-y-1">
        <RouterLink
          v-for="item in navItems"
          :key="item.href"
          :to="item.href"
          class="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors"
          :class="[
            isItemActive(item)
              ? 'bg-accent text-accent-foreground'
              : 'text-muted-foreground hover:bg-accent/50 hover:text-foreground',
          ]"
          @click="isMobileNavOpen = false"
        >
          <component :is="item.icon" class="size-4 shrink-0" aria-hidden="true" />
          <span>{{ item.name }}</span>
        </RouterLink>
      </nav>
    </aside>

    <!-- Main Shell Area -->
    <div class="flex flex-1 flex-col overflow-hidden">
      <!-- Persistent Header -->
      <header
        class="flex h-16 shrink-0 items-center justify-between border-b border-border bg-card/50 px-4 backdrop-blur-xs sm:px-6"
      >
        <div class="flex items-center gap-3">
          <!-- Mobile Menu Toggle Button -->
          <button
            type="button"
            class="inline-flex size-9 items-center justify-center rounded-md border border-border text-muted-foreground hover:bg-accent hover:text-foreground md:hidden"
            aria-label="Toggle navigation menu"
            @click="isMobileNavOpen = !isMobileNavOpen"
          >
            <Menu class="size-5" />
          </button>

          <!-- Breadcrumbs -->
          <nav aria-label="Breadcrumbs">
            <ol class="flex items-center gap-1.5 text-sm text-muted-foreground">
              <li
                v-for="(crumb, index) in breadcrumbs"
                :key="crumb.label"
                class="flex items-center gap-1.5"
              >
                <ChevronRight v-if="index > 0" class="size-3.5 shrink-0" aria-hidden="true" />
                <RouterLink
                  v-if="crumb.href && index < breadcrumbs.length - 1"
                  :to="crumb.href"
                  class="font-medium text-foreground/80 transition-colors hover:text-foreground"
                >
                  {{ crumb.label }}
                </RouterLink>
                <span
                  v-else
                  :class="[
                    index === breadcrumbs.length - 1
                      ? 'font-semibold text-foreground'
                      : 'text-muted-foreground',
                  ]"
                  :aria-current="index === breadcrumbs.length - 1 ? 'page' : undefined"
                >
                  {{ crumb.label }}
                </span>
              </li>
            </ol>
          </nav>
        </div>

        <!-- Exit to Portfolio action linking back to /cv -->
        <RouterLink
          to="/cv"
          class="inline-flex items-center gap-2 rounded-md border border-border bg-background px-3 py-1.5 text-xs font-medium text-foreground transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none sm:text-sm"
        >
          <LogOut class="size-4" aria-hidden="true" />
          <span>Exit to Portfolio</span>
        </RouterLink>
      </header>

      <!-- Scrollable Main View Container -->
      <main class="flex-1 overflow-y-auto p-6 md:p-8">
        <div class="mx-auto max-w-6xl">
          <RouterView />
        </div>
      </main>
    </div>
  </div>
</template>
