import { afterEach, describe, expect, it, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import PrototypeContainer from '@/components/PrototypeContainer.vue'

describe('PrototypeContainer', () => {
  afterEach(() => {
    vi.unstubAllEnvs()
  })

  it('renders the prototype dock container with id prototype-container in dev mode', () => {
    const wrapper = mount(PrototypeContainer)
    const el = wrapper.find('#prototype-container')
    expect(el.exists()).toBe(true)
    expect(el.classes()).toContain('fixed')
    expect(el.classes()).toContain('bottom-4')
    expect(el.classes()).toContain('empty:hidden')
  })

  it('renders nothing in production mode', () => {
    vi.stubEnv('DEV', false)
    vi.stubEnv('MODE', 'production')

    const wrapper = mount(PrototypeContainer)
    expect(wrapper.find('#prototype-container').exists()).toBe(false)
  })
})
