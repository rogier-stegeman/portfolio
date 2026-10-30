<script setup lang="ts">
// UI Prototype: Layout variants of the CV App, switchable via `?variant=`, on the `/cv` route.
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { cvData } from '@/apps/cv/cv-data'
import VariantD from '@/apps/cv/variants/VariantD.vue'
import VariantJ from '@/apps/cv/variants/VariantJ.vue'
import VariantK from '@/apps/cv/variants/VariantK.vue'
import VariantM from '@/apps/cv/variants/VariantM.vue'
import PrototypeSwitcher, { type PrototypeVariant } from '@/components/PrototypeSwitcher.vue'

type CvVariantKey = 'D' | 'J' | 'K' | 'M'

const variants: readonly (PrototypeVariant & { key: CvVariantKey })[] = [
  { key: 'D', label: 'Apps-First Showcase' },
  { key: 'J', label: 'Dual-Pane Interactive Reader' },
  { key: 'K', label: 'Technical Spec Sheet' },
  { key: 'M', label: 'Tabbed Workspace' },
]

const route = useRoute()

const activeVariant = computed<CvVariantKey>(() => {
  const raw = route.query.variant
  const current = Array.isArray(raw) ? raw[0] : raw
  const matched = variants.find((variant) => variant.key === current)
  return matched ? matched.key : 'D'
})
</script>

<template>
  <main>
    <VariantD v-if="activeVariant === 'D'" :data="cvData" />
    <VariantJ v-else-if="activeVariant === 'J'" :data="cvData" />
    <VariantK v-else-if="activeVariant === 'K'" :data="cvData" />
    <VariantM v-else :data="cvData" />

    <PrototypeSwitcher
      :variants="variants"
      :use-global-container="false"
      class="fixed right-4 bottom-4 z-50 shadow-lg backdrop-blur-md"
    />
  </main>
</template>
