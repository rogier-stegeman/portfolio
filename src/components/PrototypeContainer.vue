<script setup lang="ts">
const isVisible = import.meta.env.DEV || import.meta.env.MODE === 'preview'
</script>

<template>
  <div
    v-if="isVisible"
    id="prototype-container"
    class="fixed bottom-4 left-1/2 z-50 flex -translate-x-1/2 items-center gap-3 empty:hidden"
  />
</template>
