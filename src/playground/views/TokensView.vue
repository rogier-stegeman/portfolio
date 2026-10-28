<script setup lang="ts">
interface ColorToken {
  name: string
  variable: string
}

/** A surface colour token paired with the foreground token used for text on it. */
interface SurfaceToken extends ColorToken {
  foreground: string
}

interface SurfaceTokenCategory {
  title: string
  tokens: SurfaceToken[]
}

const surfaceCategories: SurfaceTokenCategory[] = [
  {
    title: 'Surfaces & Backgrounds',
    tokens: [
      { name: 'Background', variable: '--background', foreground: '--foreground' },
      { name: 'Card', variable: '--card', foreground: '--card-foreground' },
      { name: 'Popover', variable: '--popover', foreground: '--popover-foreground' },
    ],
  },
  {
    title: 'Brand & Action',
    tokens: [
      { name: 'Primary', variable: '--primary', foreground: '--primary-foreground' },
      { name: 'Secondary', variable: '--secondary', foreground: '--secondary-foreground' },
      { name: 'Accent', variable: '--accent', foreground: '--accent-foreground' },
    ],
  },
  {
    title: 'Muted & Feedback',
    tokens: [
      { name: 'Muted', variable: '--muted', foreground: '--muted-foreground' },
      { name: 'Destructive', variable: '--destructive', foreground: '--destructive-foreground' },
    ],
  },
]

const borderTokens: ColorToken[] = [
  { name: 'Border', variable: '--border' },
  { name: 'Input', variable: '--input' },
  { name: 'Ring', variable: '--ring' },
]

const radiusTokens: string[] = ['--radius-sm', '--radius-md', '--radius-lg', '--radius-xl']
</script>

<template>
  <div class="space-y-8">
    <header class="space-y-2">
      <h1 class="text-2xl font-semibold">Design Tokens</h1>
      <p class="text-muted-foreground">
        Semantic design tokens defined in <code>src/assets/main.css</code>.
      </p>
    </header>

    <section v-for="category in surfaceCategories" :key="category.title" class="space-y-3">
      <h2 class="font-semibold">{{ category.title }}</h2>

      <ul class="grid grid-cols-1 gap-4 md:grid-cols-3">
        <li v-for="token in category.tokens" :key="token.variable" class="space-y-2">
          <div
            class="rounded-md border p-4"
            :style="{
              backgroundColor: `var(${token.variable})`,
              color: `var(${token.foreground})`,
            }"
          >
            <p class="font-semibold">Aa Heading</p>
            <p>The quick brown fox jumps over the lazy dog.</p>
          </div>
          <div>
            <p class="font-medium">{{ token.name }}</p>
            <p>
              <code>{{ token.variable }}</code> /
              <code class="text-muted-foreground">{{ token.foreground }}</code>
            </p>
          </div>
        </li>
      </ul>
    </section>

    <section class="space-y-3">
      <h2 class="font-semibold">Borders &amp; Radii</h2>

      <ul class="grid grid-cols-1 gap-4 md:grid-cols-3">
        <li v-for="token in borderTokens" :key="token.variable" class="space-y-2">
          <div
            class="rounded-md border-4 bg-background p-4 text-foreground"
            :style="{ borderColor: `var(${token.variable})` }"
          >
            The quick brown fox jumps over the lazy dog.
          </div>
          <div>
            <p class="font-medium">{{ token.name }}</p>
            <p>
              <code>{{ token.variable }}</code>
            </p>
          </div>
        </li>
      </ul>

      <ul class="grid grid-cols-2 gap-4 md:grid-cols-4">
        <li v-for="token in radiusTokens" :key="token" class="space-y-2">
          <div class="h-16 border bg-muted" :style="{ borderRadius: `var(${token})` }" />
          <p>
            <code>{{ token }}</code>
          </p>
        </li>
      </ul>
    </section>
  </div>
</template>
