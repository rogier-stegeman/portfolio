<script setup lang="ts">
import { watch } from 'vue'
import { useRoute, RouterView } from 'vue-router'
import PrototypeContainer from '@/components/PrototypeContainer.vue'

const route = useRoute()

watch(
  () => route.query.theme,
  (theme) => {
    if (typeof document === 'undefined') return
    const themeName = Array.isArray(theme) ? theme[0] : theme
    if (themeName) {
      document.documentElement.setAttribute('data-theme', themeName)
    } else {
      document.documentElement.removeAttribute('data-theme')
    }
  },
  { immediate: true },
)
</script>

<template>
  <RouterView />
  <PrototypeContainer />
</template>
