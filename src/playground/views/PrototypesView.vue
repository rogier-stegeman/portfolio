<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { Button } from '@/components/ui/button'
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { discoveredPrototypes } from '@/playground/prototypes'
</script>

<template>
  <div class="space-y-8">
    <header class="space-y-2">
      <h1 class="text-2xl font-semibold">UI Prototypes</h1>
      <p class="text-muted-foreground">
        Index and host for standalone throwaway design prototypes discovered in
        <code>src/playground/prototypes/</code>.
      </p>
    </header>

    <div v-if="discoveredPrototypes.length > 0" class="grid grid-cols-1 gap-4 md:grid-cols-3">
      <Card v-for="prototype in discoveredPrototypes" :key="prototype.slug">
        <CardHeader>
          <CardTitle>{{ prototype.title }}</CardTitle>
          <CardDescription>{{ prototype.fileName }}</CardDescription>
        </CardHeader>

        <CardFooter>
          <Button variant="outline" as-child>
            <RouterLink :to="prototype.href">Open prototype</RouterLink>
          </Button>
        </CardFooter>
      </Card>
    </div>

    <p v-else class="text-muted-foreground">
      No standalone prototypes found in <code>src/playground/prototypes/</code>.
    </p>
  </div>
</template>
