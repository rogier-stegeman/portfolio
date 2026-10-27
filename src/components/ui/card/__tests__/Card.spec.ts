import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import { defineComponent } from 'vue'
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

describe('Card', () => {
  it('renders composed CardHeader, CardTitle, CardDescription, CardAction, CardContent, and CardFooter slots', () => {
    const ComposedCard = defineComponent({
      components: {
        Card,
        CardAction,
        CardHeader,
        CardTitle,
        CardDescription,
        CardContent,
        CardFooter,
      },
      template: `
        <Card class="custom-card">
          <CardHeader class="custom-header">
            <CardTitle class="custom-title">Architecture Overview</CardTitle>
            <CardDescription class="custom-description">Summary of active runtime services</CardDescription>
            <CardAction class="custom-action">Read-only</CardAction>
          </CardHeader>
          <CardContent class="custom-content">
            <p>All edge workers healthy.</p>
          </CardContent>
          <CardFooter class="custom-footer">
            <span>Updated 2 minutes ago</span>
          </CardFooter>
        </Card>
      `,
    })

    const wrapper = mount(ComposedCard)

    expect(wrapper.classes()).toContain('custom-card')
    expect(wrapper.find('.custom-header').exists()).toBe(true)
    expect(wrapper.find('h3.custom-title').text()).toBe('Architecture Overview')
    expect(wrapper.find('.custom-description').text()).toBe('Summary of active runtime services')
    expect(wrapper.find('.custom-action').text()).toBe('Read-only')
    expect(wrapper.find('.custom-content').text()).toContain('All edge workers healthy.')
    expect(wrapper.find('.custom-footer').text()).toContain('Updated 2 minutes ago')
  })

  it('renders a minimal Card when optional header and footer subcomponents are omitted', () => {
    const MinimalCard = defineComponent({
      components: { Card, CardContent },
      template: `
        <Card>
          <CardContent>Standalone body content</CardContent>
        </Card>
      `,
    })

    const wrapper = mount(MinimalCard)

    expect(wrapper.find('h3').exists()).toBe(false)
    expect(wrapper.text()).toBe('Standalone body content')
  })
})
