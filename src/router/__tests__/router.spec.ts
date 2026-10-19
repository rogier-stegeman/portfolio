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

    // Shell header: Breadcrumbs
    const breadcrumbNav = wrapper.find('nav[aria-label="Breadcrumbs"]')
    expect(breadcrumbNav.exists()).toBe(true)
    expect(breadcrumbNav.text()).toContain('Playground')
    expect(breadcrumbNav.text()).toContain('Overview')

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

  it('resolves sub-routes to their view components within the shell with updated breadcrumbs', async () => {
    // Tokens workbench
    const { wrapper: tokensWrapper } = await mountAppAt('/playground/tokens', true)
    expect(tokensWrapper.find('h1').text()).toContain('Design Tokens')
    expect(tokensWrapper.find('nav[aria-label="Breadcrumbs"]').text()).toContain('Tokens')
    expect(tokensWrapper.find('nav[aria-label="Playground navigation"]').exists()).toBe(true)

    // Components workbench
    const { wrapper: componentsWrapper } = await mountAppAt('/playground/components', true)
    expect(componentsWrapper.find('h1').text()).toContain('Component Workbench')
    expect(componentsWrapper.find('nav[aria-label="Breadcrumbs"]').text()).toContain('Components')
    expect(componentsWrapper.find('nav[aria-label="Playground navigation"]').exists()).toBe(true)

    // Prototypes index
    const { wrapper: prototypesWrapper } = await mountAppAt('/playground/prototypes', true)
    expect(prototypesWrapper.find('h1').text()).toContain('UI Prototypes')
    expect(prototypesWrapper.find('nav[aria-label="Breadcrumbs"]').text()).toContain('Prototypes')
    expect(prototypesWrapper.find('nav[aria-label="Playground navigation"]').exists()).toBe(true)
  })

  it('resolves dynamic prototype route /playground/prototypes/:name with parameter in title and breadcrumbs', async () => {
    const { wrapper } = await mountAppAt('/playground/prototypes/hero-variant', true)

    expect(wrapper.find('h1').text()).toContain('Prototype: hero-variant')
    const breadcrumbs = wrapper.find('nav[aria-label="Breadcrumbs"]')
    expect(breadcrumbs.text()).toContain('Playground')
    expect(breadcrumbs.text()).toContain('Prototypes')
    expect(breadcrumbs.text()).toContain('hero-variant')
    expect(breadcrumbs.find('a[href="/playground/prototypes"]').exists()).toBe(true)
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
    expect(wrapper.find('nav[aria-label="Breadcrumbs"]').text()).toContain('Tokens')

    // Click breadcrumb link back to Playground
    const breadcrumbRootLink = wrapper.find('nav[aria-label="Breadcrumbs"] a[href="/playground"]')
    await breadcrumbRootLink.trigger('click')
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
