<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'

interface NavItem {
  name: string
  href: string
}

const navItems: NavItem[] = [
  { name: 'Overview', href: '/playground' },
  { name: 'Tokens', href: '/playground/tokens' },
  { name: 'Components', href: '/playground/components' },
  { name: 'Prototypes', href: '/playground/prototypes' },
]
</script>

<template>
  <div class="flex min-h-screen bg-background text-foreground">
    <aside class="w-64 border-r border-border bg-card p-4 text-card-foreground">
      <div class="mb-4 font-semibold">Playground</div>

      <nav aria-label="Playground navigation" class="flex flex-col gap-1">
        <RouterLink
          v-for="item in navItems"
          :key="item.href"
          :to="item.href"
          exact-active-class="bg-accent text-accent-foreground"
          class="rounded-md px-3 py-2 text-muted-foreground"
        >
          {{ item.name }}
        </RouterLink>
      </nav>
    </aside>

    <div class="flex flex-1 flex-col">
      <header class="flex h-14 items-center justify-end border-b border-border px-6">
        <RouterLink to="/cv" class="text-muted-foreground">Exit to Portfolio</RouterLink>
      </header>

      <main class="flex-1 p-6">
        <RouterView />
      </main>
    </div>
  </div>
</template>
