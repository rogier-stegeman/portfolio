<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { Button } from '@/components/ui/button'
</script>

<template>
  <main class="space-y-4 p-6">
    <div class="space-y-2">
      <h1 class="text-2xl font-semibold">Not Found</h1>
      <p class="text-muted-foreground">The requested page could not be found.</p>
    </div>
    <Button as-child>
      <RouterLink to="/cv">Back to CV</RouterLink>
    </Button>
  </main>
</template>
