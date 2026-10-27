import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import { Badge } from '@/components/ui/badge'

describe('Badge', () => {
  it('renders slot content across semantic variants', () => {
    const variants = ['default', 'secondary', 'destructive', 'outline'] as const

    for (const variant of variants) {
      const wrapper = mount(Badge, {
        props: {
          variant,
        },
        slots: {
          default: `Status: ${variant}`,
        },
      })

      expect(wrapper.text()).toBe(`Status: ${variant}`)
    }
  })

  it('renders with default variant when no variant prop is passed and merges custom classes', () => {
    const wrapper = mount(Badge, {
      props: {
        class: 'custom-badge-class',
      },
      slots: {
        default: 'Default badge',
      },
    })

    expect(wrapper.text()).toBe('Default badge')
    expect(wrapper.classes()).toContain('custom-badge-class')
  })
})
