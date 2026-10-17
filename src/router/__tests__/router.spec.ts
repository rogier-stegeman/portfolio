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

  it('renders the Playground view at /playground when includeUnreleased is true', async () => {
    const { wrapper } = await mountAppAt('/playground', true)

    expect(wrapper.find('h1').text()).toBe('Playground')
  })

  it('renders the Not Found view at /playground when includeUnreleased is false', async () => {
    const { wrapper } = await mountAppAt('/playground', false)

    expect(wrapper.find('h1').text()).toBe('Not Found')
  })
})
