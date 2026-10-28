import type { Component } from 'vue'

export interface DiscoveredPrototype {
  slug: string
  title: string
  fileName: string
  href: string
  component: Component
}

const prototypeModules = import.meta.glob<{ default: Component }>('./*.vue', {
  eager: true,
})

export const discoveredPrototypes: DiscoveredPrototype[] = Object.entries(prototypeModules)
  .map(([filePath, module]) => {
    const fileName = filePath.split('/').pop() ?? filePath
    const baseName = fileName.replace(/\.vue$/, '')
    const slugSource = baseName.replace(/Prototype$/, '') || baseName
    const slug = slugSource.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase()
    const title = baseName.replace(/([a-z0-9])([A-Z])/g, '$1 $2')

    return {
      slug,
      title,
      fileName,
      href: `/playground/prototypes/${slug}`,
      component: module.default,
    }
  })
  .sort((a, b) => a.slug.localeCompare(b.slug))
