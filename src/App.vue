<script setup lang="ts">
import { RouterView } from 'vue-router'
import PrototypeContainer from '@/components/PrototypeContainer.vue'
import ThemeSwitcher from '@/components/ThemeSwitcher.vue'
</script>

<template>
  <RouterView />
  <ThemeSwitcher />
  <PrototypeContainer />
</template>
