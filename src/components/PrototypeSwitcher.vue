<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { ChevronLeft, ChevronRight } from '@lucide/vue'
import { Button } from '@/components/ui/button'

export interface PrototypeVariant {
  key: string
  label?: string
}

const props = defineProps<{
  variants: readonly (string | PrototypeVariant)[]
}>()

const isVisible = import.meta.env.DEV || import.meta.env.MODE === 'preview'

const route = useRoute()
const router = useRouter()

const normalizedVariants = computed<PrototypeVariant[]>(() =>
  props.variants.map((variant) => (typeof variant === 'string' ? { key: variant } : variant)),
)

const activeIndex = computed(() => {
  const list = normalizedVariants.value
  if (list.length === 0) return -1

  const queryVariant = route.query.variant
  const currentKey = Array.isArray(queryVariant) ? queryVariant[0] : queryVariant
  const matchedIndex = list.findIndex((item) => item.key === currentKey)

  return matchedIndex >= 0 ? matchedIndex : 0
})

const activeVariant = computed(() => {
  const index = activeIndex.value
  return index >= 0 ? normalizedVariants.value[index] : undefined
})

const activeLabel = computed(() => {
  const current = activeVariant.value
  if (!current) return ''
  return current.label ? `${current.key} (${current.label})` : current.key
})

function cycleVariant(delta: number) {
  const list = normalizedVariants.value
  if (list.length === 0) return

  const nextIndex = (activeIndex.value + delta + list.length) % list.length
  const nextVariant = list[nextIndex]
  if (!nextVariant) return

  void router.replace({
    query: {
      ...route.query,
      variant: nextVariant.key,
    },
  })
}

function isEditableElement(element: EventTarget | null): boolean {
  if (!(element instanceof HTMLElement)) return false
  const tagName = element.tagName
  if (tagName === 'INPUT' || tagName === 'TEXTAREA' || tagName === 'SELECT') return true
  if (element.isContentEditable || element.getAttribute('contenteditable') === 'true') return true
  return element.closest('[contenteditable="true"], [contenteditable=""]') !== null
}

function handleKeydown(event: KeyboardEvent) {
  if (event.altKey || event.ctrlKey || event.metaKey || event.shiftKey) return
  if (isEditableElement(event.target) || isEditableElement(document.activeElement)) {
    return
  }

  if (event.key === 'ArrowLeft') {
    cycleVariant(-1)
  } else if (event.key === 'ArrowRight') {
    cycleVariant(1)
  }
}

onMounted(() => {
  if (isVisible) {
    window.addEventListener('keydown', handleKeydown)
  }
})

onBeforeUnmount(() => {
  if (isVisible) {
    window.removeEventListener('keydown', handleKeydown)
  }
})
</script>

<template>
  <div
    v-if="isVisible && normalizedVariants.length > 0"
    class="fixed bottom-4 left-1/2 z-50 flex -translate-x-1/2 items-center gap-2 rounded-full border bg-popover px-3 py-1.5 text-popover-foreground shadow-md"
  >
    <Button variant="ghost" size="icon-sm" @click="cycleVariant(-1)">
      <ChevronLeft />
    </Button>

    <span class="px-2 font-medium">{{ activeLabel }}</span>

    <Button variant="ghost" size="icon-sm" @click="cycleVariant(1)">
      <ChevronRight />
    </Button>
  </div>
</template>
