import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import { createMemoryHistory, createRouter } from 'vue-router'
import App from '@/App.vue'
import { themeVariants } from '@/lib/themes'

describe('Theme Variants & Presets', () => {
  it('defines all leftover themes with valid keys and labels', () => {
    const requiredKeys = [
      'neutral-ombre',
      'slate-ombre',
      'purple-ombre',
      'gen-x-soft-club',
      'gen-x-soft-club-ombre',
      'frutiger-aero',
    ]

    const removedKeys = [
      'neutral-dark',
      'neutral-soft',
      'slate-dark',
      'slate-soft',
      'purple',
      'purple-dark',
      'purple-soft',
      'gen-x-soft-club-soft',
      'neutral-light',
      'stone-dark',
      'blue',
      'glassmorphic',
      'glassmorphic-neon',
      'cyberpunk',
      'emerald',
      'amber',
    ]

    const variantKeys = themeVariants.map((t) => t.key)

    for (const key of requiredKeys) {
      expect(variantKeys).toContain(key)
    }

    for (const key of removedKeys) {
      expect(variantKeys).not.toContain(key)
    }

    // Ensure all keys are unique and have proper labels
    const uniqueKeys = new Set(variantKeys)
    expect(uniqueKeys.size).toBe(themeVariants.length)

    for (const variant of themeVariants) {
      expect(variant.key.trim().length).toBeGreaterThan(0)
      expect(variant.label.trim().length).toBeGreaterThan(0)
    }
  })

  it('updates document data-theme attribute in response to route query changes in App.vue', async () => {
    const router = createRouter({
      history: createMemoryHistory(),
      routes: [{ path: '/cv', component: { template: '<div>CV</div>' } }],
    })

    await router.push('/cv?theme=frutiger-aero')
    await router.isReady()

    const wrapper = mount(App, {
      global: {
        plugins: [router],
      },
    })

    expect(document.documentElement.getAttribute('data-theme')).toBe('frutiger-aero')

    await router.push('/cv?theme=slate-ombre')
    expect(document.documentElement.getAttribute('data-theme')).toBe('slate-ombre')

    await router.push('/cv?theme=gen-x-soft-club')
    expect(document.documentElement.getAttribute('data-theme')).toBe('gen-x-soft-club')

    await router.push('/cv?theme=purple-ombre')
    expect(document.documentElement.getAttribute('data-theme')).toBe('purple-ombre')

    wrapper.unmount()
  })
})
