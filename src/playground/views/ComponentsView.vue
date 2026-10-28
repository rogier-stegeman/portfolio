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

const buttonIconSizes: NonNullable<ButtonVariants['size']>[] = [
  'icon-xs',
  'icon-sm',
  'icon',
  'icon-lg',
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

      <div class="space-y-4">
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
            <Button v-for="size in buttonIconSizes" :key="size" :size="size" variant="outline">
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

      <div class="flex flex-wrap items-center gap-3">
        <Badge v-for="sample in badgeVariantsList" :key="sample.variant" :variant="sample.variant">
          {{ sample.label }}
        </Badge>
      </div>
    </section>

    <section class="space-y-4">
      <div class="space-y-1">
        <h2 class="font-semibold">Card</h2>
        <p class="text-muted-foreground">
          Composable surface container with header, title, description, action, content, and footer
          slots.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Card Title</CardTitle>
          <CardDescription>Card Description</CardDescription>
          <CardAction>Card Action</CardAction>
        </CardHeader>
        <CardContent>
          <p>Card Content</p>
        </CardContent>
        <CardFooter>
          <p>Card Footer</p>
        </CardFooter>
      </Card>
    </section>
  </div>
</template>
