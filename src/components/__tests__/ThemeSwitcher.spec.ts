import { afterEach, describe, expect, it } from 'vitest'
import { flushPromises, mount } from '@vue/test-utils'
import { createMemoryHistory, createRouter } from 'vue-router'
import ThemeSwitcher from '@/components/ThemeSwitcher.vue'

async function mountThemeSwitcher(initialPath: string) {
  const router = createRouter({
    history: createMemoryHistory(),
    routes: [{ path: '/:pathMatch(.*)*', component: { template: '<div />' } }],
  })
  await router.push(initialPath)
  await router.isReady()

  const wrapper = mount(ThemeSwitcher, {
    global: {
      plugins: [router],
    },
  })
  await flushPromises()

  return { wrapper, router }
}

describe('ThemeSwitcher', () => {
  afterEach(() => {
    window.localStorage.clear()
    document.documentElement.removeAttribute('data-theme')
  })

  it('renders PrototypeSwitcher internally and sets document data-theme attribute', async () => {
    const { wrapper, router } = await mountThemeSwitcher('/cv?theme=frutiger-aero')

    expect(wrapper.text()).toContain('Frutiger Aero')
    expect(document.documentElement.getAttribute('data-theme')).toBe('frutiger-aero')
    expect(window.localStorage.getItem('portfolio-theme')).toBe('frutiger-aero')

    await router.push('/cv?theme=gen-x-soft-club')
    await flushPromises()

    expect(wrapper.text()).toContain('Gen X Soft Club')
    expect(document.documentElement.getAttribute('data-theme')).toBe('gen-x-soft-club')

    wrapper.unmount()
  })

  it('falls back to localStorage or default theme when query parameter is not present', async () => {
    window.localStorage.setItem('portfolio-theme', 'slate-ombre')

    const { wrapper } = await mountThemeSwitcher('/cv')

    expect(wrapper.text()).toContain('Slate Ombre')
    expect(document.documentElement.getAttribute('data-theme')).toBe('slate-ombre')

    wrapper.unmount()
  })
})
