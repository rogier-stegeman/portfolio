<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { Button } from '@/components/ui/button'
</script>

<template>
  <main class="flex min-h-screen items-center justify-center p-6">
    <section class="w-full max-w-lg space-y-4 rounded-lg border bg-card p-8 text-card-foreground">
      <div class="space-y-1">
        <h1 class="text-2xl font-semibold">Not Found</h1>
        <p class="text-muted-foreground">The requested page could not be found.</p>
      </div>
      <Button as-child>
        <RouterLink to="/cv">Back to CV</RouterLink>
      </Button>
    </section>
  </main>
</template>
