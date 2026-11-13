<script setup lang="ts">
import { watch } from 'vue'
import { useRoute } from 'vue-router'
import PrototypeSwitcher from '@/components/PrototypeSwitcher.vue'
import { DEFAULT_THEME, isValidTheme, themeVariants } from '@/lib/themes'

const route = useRoute()
const STORAGE_KEY = 'portfolio-theme'

watch(
  () => route.query.theme,
  (theme) => {
    if (typeof document === 'undefined') return
    const themeName = Array.isArray(theme) ? theme[0] : theme
    if (isValidTheme(themeName)) {
      document.documentElement.setAttribute('data-theme', themeName)
      try {
        window.localStorage.setItem(STORAGE_KEY, themeName)
      } catch {
        // Ignore storage access errors
      }
    } else {
      let saved: string | null = null
      try {
        saved = window.localStorage.getItem(STORAGE_KEY)
      } catch {
        // Ignore storage access errors
      }
      const active = isValidTheme(saved) ? saved : DEFAULT_THEME
      document.documentElement.setAttribute('data-theme', active)
    }
  },
  { immediate: true },
)
</script>

<template>
  <PrototypeSwitcher
    :variants="themeVariants"
    query-param="theme"
    :use-global-container="false"
    :enable-keyboard="false"
    storage-key="portfolio-theme"
    class="fixed right-4 bottom-4 z-50 shadow-lg backdrop-blur-md"
  />
</template>
