<script setup lang="ts">
import { useRoute } from 'vue-router'

const route = useRoute()
</script>

<template>
  <div class="space-y-2">
    <h1 class="text-2xl font-semibold">Prototype: {{ route.params.name }}</h1>
    <p class="text-sm text-muted-foreground">
      Isolated environment for prototype {{ route.params.name }}.
    </p>
  </div>
</template>
