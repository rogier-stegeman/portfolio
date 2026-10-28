<script setup lang="ts">
import { computed } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import { Button } from '@/components/ui/button'
import { discoveredPrototypes } from '@/playground/prototypes'

const route = useRoute()

const prototypeSlug = computed(() => {
  const param = route.params.name
  return Array.isArray(param) ? (param[0] ?? '') : (param ?? '')
})

const matchedPrototype = computed(() =>
  discoveredPrototypes.find((prototype) => prototype.slug === prototypeSlug.value),
)
</script>

<template>
  <component :is="matchedPrototype.component" v-if="matchedPrototype" />

  <div v-else class="space-y-4">
    <header class="space-y-2">
      <h1 class="text-2xl font-semibold">Prototype not found</h1>
      <p class="text-muted-foreground">
        No standalone prototype matching <code>{{ prototypeSlug }}</code> was found in
        <code>src/playground/prototypes/</code>.
      </p>
    </header>

    <div>
      <Button variant="outline" as-child>
        <RouterLink to="/playground/prototypes">Back to prototypes</RouterLink>
      </Button>
    </div>
  </div>
</template>
