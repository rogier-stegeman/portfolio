import { describe, expect, it } from 'vitest'
import { flushPromises, mount } from '@vue/test-utils'
import { createMemoryHistory } from 'vue-router'
import App from '@/App.vue'
import { createAppRouter } from '@/router'

async function mountAppAt(path: string, includeUnreleased?: boolean) {
  const router = createAppRouter({
    history: createMemoryHistory(),
    includeUnreleased,
  })
  await router.push(path)
  await router.isReady()

  const wrapper = mount(App, {
    global: {
      plugins: [router],
    },
  })
  await flushPromises()

  return { wrapper, router }
}

describe('Portfolio routing', () => {
  it('redirects / to /cv and renders the CV App shell', async () => {
    const { wrapper, router } = await mountAppAt('/')

    expect(router.currentRoute.value.fullPath).toBe('/cv')
    expect(wrapper.find('h1').text()).toBe('CV')
  })

  it('renders the CV App shell when navigating directly to /cv', async () => {
    const { wrapper, router } = await mountAppAt('/cv')

    expect(router.currentRoute.value.fullPath).toBe('/cv')
    expect(wrapper.find('h1').text()).toBe('CV')
  })

  it('renders the Not Found view with a link back to /cv for unknown routes', async () => {
    const { wrapper } = await mountAppAt('/unknown-route')

    expect(wrapper.find('h1').text()).toBe('Not Found')
    const backLink = wrapper.find('a[href="/cv"]')
    expect(backLink.exists()).toBe(true)
  })

  it('renders the persistent shell layout and overview landing page at /playground', async () => {
    const { wrapper } = await mountAppAt('/playground', true)

    // Shell header: Exit to Portfolio action linking back to /cv
    const exitLink = wrapper.find('a[href="/cv"]')
    expect(exitLink.exists()).toBe(true)
    expect(exitLink.text()).toContain('Exit to Portfolio')

    // Shell sidebar: Navigation links
    const sidebar = wrapper.find('nav[aria-label="Playground navigation"]')
    expect(sidebar.exists()).toBe(true)
    expect(sidebar.find('a[href="/playground"]').text()).toContain('Overview')
    expect(sidebar.find('a[href="/playground/tokens"]').text()).toContain('Tokens')
    expect(sidebar.find('a[href="/playground/components"]').text()).toContain('Components')
    expect(sidebar.find('a[href="/playground/prototypes"]').text()).toContain('Prototypes')

    // Overview landing page: Launchpad / summary cards
    const main = wrapper.find('main')
    expect(main.exists()).toBe(true)
    expect(main.find('a[href="/playground/tokens"]').exists()).toBe(true)
    expect(main.find('a[href="/playground/components"]').exists()).toBe(true)
    expect(main.find('a[href="/playground/prototypes"]').exists()).toBe(true)
  })

  it('resolves sub-routes to their view components within the shell', async () => {
    // Tokens workbench
    const { wrapper: tokensWrapper } = await mountAppAt('/playground/tokens', true)
    expect(tokensWrapper.find('h1').text()).toContain('Design Tokens')
    expect(tokensWrapper.find('nav[aria-label="Playground navigation"]').exists()).toBe(true)

    // Components workbench
    const { wrapper: componentsWrapper } = await mountAppAt('/playground/components', true)
    expect(componentsWrapper.find('h1').text()).toContain('Component Workbench')
    expect(componentsWrapper.find('nav[aria-label="Playground navigation"]').exists()).toBe(true)

    // Prototypes index
    const { wrapper: prototypesWrapper } = await mountAppAt('/playground/prototypes', true)
    expect(prototypesWrapper.find('h1').text()).toContain('UI Prototypes')
    expect(prototypesWrapper.find('nav[aria-label="Playground navigation"]').exists()).toBe(true)
  })

  it('renders the Design Token workbench grouped into functional categories at /playground/tokens', async () => {
    const { wrapper } = await mountAppAt('/playground/tokens', true)

    const main = wrapper.find('main')
    expect(main.find('h1').text()).toBe('Design Tokens')

    const categoryHeadings = main.findAll('h2').map((heading) => heading.text())
    expect(categoryHeadings).toEqual([
      'Surfaces & Backgrounds',
      'Brand & Action',
      'Muted & Feedback',
      'Borders & Radii',
    ])

    const mainText = main.text()
    for (const token of [
      '--background',
      '--foreground',
      '--card',
      '--card-foreground',
      '--popover',
      '--popover-foreground',
      '--primary',
      '--primary-foreground',
      '--secondary',
      '--secondary-foreground',
      '--accent',
      '--accent-foreground',
      '--muted',
      '--muted-foreground',
      '--destructive',
      '--destructive-foreground',
      '--border',
      '--input',
      '--ring',
      '--radius-sm',
      '--radius-md',
      '--radius-lg',
      '--radius-xl',
    ]) {
      expect(mainText).toContain(token)
    }
  })

  it('pairs each surface colour swatch with sample text in its foreground colour', async () => {
    const { wrapper } = await mountAppAt('/playground/tokens', true)

    const primarySwatch = wrapper.find('[style*="var(--primary)"]')
    expect(primarySwatch.exists()).toBe(true)
    expect(primarySwatch.attributes('style')).toContain('color: var(--primary-foreground)')
    expect(primarySwatch.text()).not.toBe('')

    const primaryItem = wrapper.findAll('li').find((item) => item.text().includes('--primary'))
    expect(primaryItem?.text()).toContain('Primary')
  })

  it('demonstrates each border radius scale with a curvature sample', async () => {
    const { wrapper } = await mountAppAt('/playground/tokens', true)

    for (const scale of ['sm', 'md', 'lg', 'xl']) {
      expect(wrapper.find(`[style*="border-radius: var(--radius-${scale})"]`).exists()).toBe(true)
    }
  })

  it('renders the Component Workbench with Button, Badge, and Card showcases at /playground/components', async () => {
    const { wrapper } = await mountAppAt('/playground/components', true)

    const main = wrapper.find('main')
    expect(main.find('h1').text()).toBe('Component Workbench')

    const sectionHeadings = main.findAll('h2').map((heading) => heading.text())
    expect(sectionHeadings).toEqual(['Button', 'Badge', 'Card'])

    // Button showcase: primary variants, sizes, and disabled state
    const buttons = main.findAll('button')
    expect(buttons.length).toBeGreaterThan(0)
    expect(main.find('button[disabled]').exists()).toBe(true)

    const mainText = main.text()
    for (const label of [
      'Default',
      'Secondary',
      'Destructive',
      'Outline',
      'Ghost',
      'Link',
      'Extra Small',
      'Small',
      'Large',
    ]) {
      expect(mainText).toContain(label)
    }

    // Card showcase: raw Card primitive and its sub-components
    const card = main.find('[data-slot="card"]')
    expect(card.exists()).toBe(true)
    expect(card.find('[data-slot="card-title"]').text()).toBe('Card Title')
    expect(card.find('[data-slot="card-description"]').text()).toBe('Card Description')
    expect(card.find('[data-slot="card-action"]').text()).toBe('Card Action')
    expect(card.find('[data-slot="card-content"]').text()).toBe('Card Content')
    expect(card.find('[data-slot="card-footer"]').text()).toBe('Card Footer')
  })

  it('resolves dynamic prototype route /playground/prototypes/:name with parameter in title', async () => {
    const { wrapper } = await mountAppAt('/playground/prototypes/hero-variant', true)

    expect(wrapper.find('h1').text()).toContain('Prototype: hero-variant')
    expect(wrapper.find('nav[aria-label="Playground navigation"]').exists()).toBe(true)
  })

  it('transitions between sub-routes when clicking navigation links without full page reloads', async () => {
    const { wrapper, router } = await mountAppAt('/playground', true)

    // Initial state: Overview
    expect(wrapper.find('h1').text()).toContain('Playground Overview')
    expect(router.currentRoute.value.fullPath).toBe('/playground')

    // Click Tokens in sidebar
    const tokensLink = wrapper.find(
      'nav[aria-label="Playground navigation"] a[href="/playground/tokens"]',
    )
    await tokensLink.trigger('click')
    await flushPromises()

    expect(router.currentRoute.value.fullPath).toBe('/playground/tokens')
    expect(wrapper.find('h1').text()).toContain('Design Tokens')

    // Click Overview in sidebar back to Playground root
    const overviewLink = wrapper.find(
      'nav[aria-label="Playground navigation"] a[href="/playground"]',
    )
    await overviewLink.trigger('click')
    await flushPromises()

    expect(router.currentRoute.value.fullPath).toBe('/playground')
    expect(wrapper.find('h1').text()).toContain('Playground Overview')

    // Click Exit to Portfolio
    const exitLink = wrapper.find('a[href="/cv"]')
    await exitLink.trigger('click')
    await flushPromises()

    expect(router.currentRoute.value.fullPath).toBe('/cv')
    expect(wrapper.find('h1').text()).toBe('CV')
  })

  it('renders the Not Found view for playground and any nested sub-routes when includeUnreleased is false', async () => {
    const pathsToTest = [
      '/playground',
      '/playground/tokens',
      '/playground/components',
      '/playground/prototypes',
      '/playground/prototypes/hero-variant',
    ]

    for (const path of pathsToTest) {
      const { wrapper } = await mountAppAt(path, false)
      expect(wrapper.find('h1').text()).toBe('Not Found')
      expect(wrapper.find('a[href="/cv"]').exists()).toBe(true)
    }
  })
})
