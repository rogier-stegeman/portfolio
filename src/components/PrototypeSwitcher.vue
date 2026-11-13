<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { Check, ChevronDown, ChevronLeft, ChevronRight, ChevronUp } from '@lucide/vue'
import { onClickOutside } from '@vueuse/core'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

export interface PrototypeVariant {
  key: string
  label?: string
}

const props = withDefaults(
  defineProps<{
    variants: readonly (string | PrototypeVariant)[]
    queryParam?: string
    enableKeyboard?: boolean
    useGlobalContainer?: boolean
    storageKey?: string
    class?: string
  }>(),
  {
    queryParam: 'variant',
    enableKeyboard: true,
    useGlobalContainer: true,
    storageKey: undefined,
    class: undefined,
  },
)

const isVisible = import.meta.env.DEV || import.meta.env.MODE === 'preview'

const route = useRoute()
const router = useRouter()

const isMounted = ref(false)
const isOpen = ref(false)
const rootRef = ref<HTMLElement | null>(null)

onClickOutside(rootRef, () => {
  isOpen.value = false
})

const canTeleport = computed(() => {
  if (!isMounted.value || !props.useGlobalContainer || typeof document === 'undefined') {
    return false
  }
  return document.getElementById('prototype-container') !== null
})

onMounted(() => {
  isMounted.value = true
})

const normalizedVariants = computed<PrototypeVariant[]>(() =>
  props.variants.map((variant) => (typeof variant === 'string' ? { key: variant } : variant)),
)

const activeIndex = computed(() => {
  const list = normalizedVariants.value
  if (list.length === 0) return -1

  const queryVal = route.query[props.queryParam]
  const currentKey = Array.isArray(queryVal) ? queryVal[0] : queryVal
  let matchedIndex = list.findIndex((item) => item.key === currentKey)

  if (matchedIndex < 0 && props.storageKey && typeof window !== 'undefined') {
    try {
      const saved = window.localStorage.getItem(props.storageKey)
      matchedIndex = list.findIndex((item) => item.key === saved)
    } catch {
      // Ignore storage access errors
    }
  }

  return matchedIndex >= 0 ? matchedIndex : 0
})

const activeVariant = computed(() => {
  const index = activeIndex.value
  return index >= 0 ? normalizedVariants.value[index] : undefined
})

function formatVariantLabel(variant: PrototypeVariant): string {
  if (!variant.label) return variant.key
  if (variant.key === variant.label) return variant.label
  return variant.key.length <= 2 ? `${variant.key} (${variant.label})` : variant.label
}

const activeLabel = computed(() => {
  return activeVariant.value ? formatVariantLabel(activeVariant.value) : ''
})

function selectVariant(key: string) {
  isOpen.value = false
  if (props.storageKey && typeof window !== 'undefined') {
    try {
      window.localStorage.setItem(props.storageKey, key)
    } catch {
      // Ignore storage access errors
    }
  }
  void router.replace({
    query: {
      ...route.query,
      [props.queryParam]: key,
    },
  })
}

function cycleVariant(delta: number) {
  const list = normalizedVariants.value
  if (list.length === 0) return

  const nextIndex = (activeIndex.value + delta + list.length) % list.length
  const nextVariant = list[nextIndex]
  if (!nextVariant) return

  selectVariant(nextVariant.key)
}

function isEditableElement(element: EventTarget | null): boolean {
  if (!(element instanceof HTMLElement)) return false
  const tagName = element.tagName
  if (tagName === 'INPUT' || tagName === 'TEXTAREA' || tagName === 'SELECT') return true
  if (element.isContentEditable || element.getAttribute('contenteditable') === 'true') return true
  return element.closest('[contenteditable="true"], [contenteditable=""]') !== null
}

function handleKeydown(event: KeyboardEvent) {
  if (isOpen.value && event.key === 'Escape') {
    isOpen.value = false
    event.stopPropagation()
    return
  }

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

let isKeydownListening = false

function attachKeydown() {
  if (isVisible && props.enableKeyboard && !isKeydownListening) {
    window.addEventListener('keydown', handleKeydown)
    isKeydownListening = true
  }
}

function detachKeydown() {
  if (isKeydownListening) {
    window.removeEventListener('keydown', handleKeydown)
    isKeydownListening = false
  }
}

onMounted(() => {
  attachKeydown()
})

watch(
  () => props.enableKeyboard,
  (enabled) => {
    if (enabled) {
      attachKeydown()
    } else {
      detachKeydown()
    }
  },
)

onBeforeUnmount(() => {
  detachKeydown()
})
</script>

<template>
  <Teleport to="#prototype-container" :disabled="!canTeleport">
    <div
      v-if="isVisible && normalizedVariants.length > 0"
      ref="rootRef"
      :class="
        cn(
          'relative flex items-center gap-1.5 rounded-full border bg-popover px-2 py-1 text-popover-foreground shadow-md',
          props.class,
        )
      "
    >
      <Button variant="ghost" size="icon-sm" class="rounded-full" @click="cycleVariant(-1)">
        <ChevronLeft />
      </Button>

      <span
        role="button"
        tabindex="0"
        class="flex cursor-pointer items-center gap-1.5 rounded-md px-2 py-1 text-sm font-medium transition-colors select-none hover:bg-accent hover:text-accent-foreground"
        @click="isOpen = !isOpen"
        @keydown.enter.space.prevent="isOpen = !isOpen"
      >
        <span>{{ activeLabel }}</span>
        <ChevronUp v-if="isOpen" class="size-3.5 text-muted-foreground" />
        <ChevronDown v-else class="size-3.5 text-muted-foreground" />
      </span>

      <Button variant="ghost" size="icon-sm" class="rounded-full" @click="cycleVariant(1)">
        <ChevronRight />
      </Button>

      <!-- Selection popup menu -->
      <div
        v-if="isOpen"
        class="absolute bottom-full left-1/2 mb-2 max-h-72 w-max max-w-xs min-w-44 -translate-x-1/2 overflow-y-auto rounded-lg border bg-popover p-1 text-popover-foreground shadow-lg"
      >
        <button
          v-for="variant in normalizedVariants"
          :key="variant.key"
          type="button"
          :class="
            cn(
              'flex w-full items-center justify-between gap-3 rounded-md px-2.5 py-1.5 text-left text-sm transition-colors hover:bg-accent hover:text-accent-foreground',
              variant.key === activeVariant?.key && 'bg-accent/60 font-medium text-foreground',
            )
          "
          @click="selectVariant(variant.key)"
        >
          <span>{{ formatVariantLabel(variant) }}</span>
          <Check v-if="variant.key === activeVariant?.key" class="size-4 shrink-0 text-primary" />
        </button>
      </div>
    </div>
  </Teleport>
</template>
