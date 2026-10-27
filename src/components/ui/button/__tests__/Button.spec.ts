import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import { Button } from '@/components/ui/button'

describe('Button', () => {
  it('renders slot content and emits click events when enabled', async () => {
    const wrapper = mount(Button, {
      slots: {
        default: 'Save changes',
      },
    })

    expect(wrapper.element.tagName).toBe('BUTTON')
    expect(wrapper.text()).toBe('Save changes')

    await wrapper.trigger('click')
    expect(wrapper.emitted('click')).toHaveLength(1)
  })

  it('marks the button as disabled and suppresses click emission when disabled', async () => {
    const wrapper = mount(Button, {
      props: {
        disabled: true,
      },
      slots: {
        default: 'Unavailable',
      },
    })

    expect(wrapper.attributes('disabled')).toBeDefined()

    await wrapper.trigger('click')
    expect(wrapper.emitted('click')).toBeUndefined()
  })

  it('accepts all semantic variants, sizes, and custom class overrides', () => {
    const variants = ['default', 'secondary', 'destructive', 'outline', 'ghost', 'link'] as const
    const sizes = ['default', 'xs', 'sm', 'lg', 'icon', 'icon-xs', 'icon-sm', 'icon-lg'] as const

    for (const variant of variants) {
      for (const size of sizes) {
        const wrapper = mount(Button, {
          props: {
            variant,
            size,
            class: 'custom-btn-class',
          },
          slots: {
            default: `${variant}-${size}`,
          },
        })

        expect(wrapper.text()).toBe(`${variant}-${size}`)
        expect(wrapper.classes()).toContain('custom-btn-class')
      }
    }
  })

  it('renders as a custom element when using the as prop from Reka UI Primitive', () => {
    const wrapper = mount(Button, {
      props: {
        as: 'a',
      },
      attrs: {
        href: '/cv',
      },
      slots: {
        default: 'View CV',
      },
    })

    expect(wrapper.element.tagName).toBe('A')
    expect(wrapper.attributes('href')).toBe('/cv')
    expect(wrapper.text()).toBe('View CV')
  })
})
