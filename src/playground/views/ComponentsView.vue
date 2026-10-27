<script setup lang="ts">
import { Plus } from '@lucide/vue'
import { Badge, type BadgeVariants } from '@/components/ui/badge'
import { Button, type ButtonVariants } from '@/components/ui/button'
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

interface ButtonVariantSample {
  label: string
  variant: NonNullable<ButtonVariants['variant']>
}

interface ButtonSizeSample {
  label: string
  size: NonNullable<ButtonVariants['size']>
}

interface BadgeVariantSample {
  label: string
  variant: NonNullable<BadgeVariants['variant']>
}

const buttonVariantsList: ButtonVariantSample[] = [
  { label: 'Default', variant: 'default' },
  { label: 'Secondary', variant: 'secondary' },
  { label: 'Destructive', variant: 'destructive' },
  { label: 'Outline', variant: 'outline' },
  { label: 'Ghost', variant: 'ghost' },
  { label: 'Link', variant: 'link' },
]

const buttonSizesList: ButtonSizeSample[] = [
  { label: 'Extra Small', size: 'xs' },
  { label: 'Small', size: 'sm' },
  { label: 'Default', size: 'default' },
  { label: 'Large', size: 'lg' },
]

const buttonIconSizesList: ButtonSizeSample[] = [
  { label: 'Add item (extra small)', size: 'icon-xs' },
  { label: 'Add item (small)', size: 'icon-sm' },
  { label: 'Add item (default)', size: 'icon' },
  { label: 'Add item (large)', size: 'icon-lg' },
]

const badgeVariantsList: BadgeVariantSample[] = [
  { label: 'Default', variant: 'default' },
  { label: 'Secondary', variant: 'secondary' },
  { label: 'Destructive', variant: 'destructive' },
  { label: 'Outline', variant: 'outline' },
]
</script>

<template>
  <div class="space-y-8">
    <header class="space-y-2">
      <h1 class="text-2xl font-semibold">Component Workbench</h1>
      <p class="text-muted-foreground">
        Showcase and testing workbench for shared foundational UI primitives.
      </p>
    </header>

    <section class="space-y-4">
      <div class="space-y-1">
        <h2 class="font-semibold">Button</h2>
        <p class="text-muted-foreground">
          Action triggers built on Reka UI primitives supporting semantic variants, standard sizes,
          and disabled states.
        </p>
      </div>

      <div class="space-y-3 rounded-lg border bg-card p-6">
        <div class="space-y-2">
          <h3 class="font-medium">Variants</h3>
          <div class="flex flex-wrap items-center gap-3">
            <Button
              v-for="sample in buttonVariantsList"
              :key="sample.variant"
              :variant="sample.variant"
            >
              {{ sample.label }}
            </Button>
          </div>
        </div>

        <div class="space-y-2">
          <h3 class="font-medium">Text Button Sizes</h3>
          <div class="flex flex-wrap items-center gap-3">
            <Button v-for="sample in buttonSizesList" :key="sample.size" :size="sample.size">
              {{ sample.label }}
            </Button>
          </div>
        </div>

        <div class="space-y-2">
          <h3 class="font-medium">Icon Button Sizes</h3>
          <div class="flex flex-wrap items-center gap-3">
            <Button
              v-for="sample in buttonIconSizesList"
              :key="sample.size"
              :size="sample.size"
              variant="outline"
              :aria-label="sample.label"
            >
              <Plus />
            </Button>
          </div>
        </div>

        <div class="space-y-2">
          <h3 class="font-medium">Disabled States</h3>
          <div class="flex flex-wrap items-center gap-3">
            <Button disabled>Disabled Default</Button>
            <Button variant="secondary" disabled>Disabled Secondary</Button>
            <Button variant="outline" disabled>Disabled Outline</Button>
          </div>
        </div>
      </div>
    </section>

    <section class="space-y-4">
      <div class="space-y-1">
        <h2 class="font-semibold">Badge</h2>
        <p class="text-muted-foreground">
          Compact status and metadata indicators across semantic variants.
        </p>
      </div>

      <div class="flex flex-wrap items-center gap-3 rounded-lg border bg-card p-6">
        <Badge v-for="sample in badgeVariantsList" :key="sample.variant" :variant="sample.variant">
          {{ sample.label }}
        </Badge>
      </div>
    </section>

    <section class="space-y-4">
      <div class="space-y-1">
        <h2 class="font-semibold">Card</h2>
        <p class="text-muted-foreground">
          Composable surface containers displayed in realistic metadata and action contexts.
        </p>
      </div>

      <div class="grid grid-cols-1 gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Metadata Summary Card</CardTitle>
            <CardDescription>
              Demonstrates structured key-value display paired with a status badge and timestamp
              footer.
            </CardDescription>
            <CardAction>
              <Badge variant="secondary">Read-only</Badge>
            </CardAction>
          </CardHeader>
          <CardContent class="space-y-2">
            <div class="flex justify-between">
              <span class="text-muted-foreground">Composition</span>
              <span class="font-medium">Header + Content + Footer</span>
            </div>
            <div class="flex justify-between">
              <span class="text-muted-foreground">Interactive actions</span>
              <Badge variant="outline">None</Badge>
            </div>
          </CardContent>
          <CardFooter class="text-xs text-muted-foreground">
            Proves container layout with non-actionable metadata
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Action Card</CardTitle>
            <CardDescription>
              Demonstrates a prompt or confirmation card with primary and secondary button triggers.
            </CardDescription>
          </CardHeader>
          <CardContent>
            Proves how Button primitives integrate inside CardFooter, aligning secondary dismiss and
            primary confirm actions below descriptive body copy.
          </CardContent>
          <CardFooter class="justify-end gap-2">
            <Button variant="outline" size="sm">Dismiss</Button>
            <Button size="sm">Confirm Action</Button>
          </CardFooter>
        </Card>
      </div>
    </section>
  </div>
</template>
