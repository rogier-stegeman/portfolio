import { afterEach, describe, expect, it, vi } from 'vitest'
import { flushPromises, mount } from '@vue/test-utils'
import { createMemoryHistory, createRouter } from 'vue-router'
import PrototypeSwitcher from '@/components/PrototypeSwitcher.vue'

async function mountSwitcher(
  initialPath: string,
  props: InstanceType<typeof PrototypeSwitcher>['$props'],
) {
  const router = createRouter({
    history: createMemoryHistory(),
    routes: [{ path: '/:pathMatch(.*)*', component: { template: '<div />' } }],
  })
  await router.push(initialPath)
  await router.isReady()

  const wrapper = mount(PrototypeSwitcher, {
    props,
    global: {
      plugins: [router],
    },
  })
  await flushPromises()

  return { wrapper, router }
}

describe('PrototypeSwitcher', () => {
  afterEach(() => {
    vi.unstubAllEnvs()
  })

  it('displays the active variant and cycles through variants with wrap-around when arrow buttons are clicked, updating ?variant=', async () => {
    const { wrapper, router } = await mountSwitcher('/playground/prototypes/example', {
      variants: [
        { key: 'A', label: 'Split view' },
        { key: 'B', label: 'Stacked timeline' },
      ],
    })

    expect(wrapper.text()).toContain('A (Split view)')

    const [prevButton, nextButton] = wrapper.findAll('button')

    // Cycle forward: A -> B
    await nextButton!.trigger('click')
    await flushPromises()
    expect(router.currentRoute.value.query.variant).toBe('B')
    expect(wrapper.text()).toContain('B (Stacked timeline)')

    // Cycle forward with wrap-around: B -> A
    await nextButton!.trigger('click')
    await flushPromises()
    expect(router.currentRoute.value.query.variant).toBe('A')
    expect(wrapper.text()).toContain('A (Split view)')

    // Cycle backward with wrap-around: A -> B
    await prevButton!.trigger('click')
    await flushPromises()
    expect(router.currentRoute.value.query.variant).toBe('B')
    expect(wrapper.text()).toContain('B (Stacked timeline)')

    wrapper.unmount()
  })

  it('cycles variants with ArrowLeft and ArrowRight keys unless modifier keys are pressed or focus is inside an editable control', async () => {
    const { wrapper, router } = await mountSwitcher('/playground/prototypes/example?variant=A', {
      variants: ['A', 'B', 'C'],
    })

    expect(wrapper.text()).toContain('A')

    // ArrowRight cycles A -> B
    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight' }))
    await flushPromises()
    expect(router.currentRoute.value.query.variant).toBe('B')

    // ArrowLeft cycles B -> A
    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowLeft' }))
    await flushPromises()
    expect(router.currentRoute.value.query.variant).toBe('A')

    // Modifier keys (e.g. Alt+ArrowRight) do not trigger cycling
    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight', altKey: true }))
    await flushPromises()
    expect(router.currentRoute.value.query.variant).toBe('A')

    // Focused input suppresses arrow key cycling
    const input = document.createElement('input')
    document.body.appendChild(input)
    input.focus()
    input.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight', bubbles: true }))
    await flushPromises()
    expect(router.currentRoute.value.query.variant).toBe('A')
    input.remove()

    // Focused textarea suppresses arrow key cycling
    const textarea = document.createElement('textarea')
    document.body.appendChild(textarea)
    textarea.focus()
    textarea.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight', bubbles: true }))
    await flushPromises()
    expect(router.currentRoute.value.query.variant).toBe('A')
    textarea.remove()

    // Focused contenteditable element suppresses arrow key cycling
    const editable = document.createElement('div')
    editable.setAttribute('contenteditable', 'true')
    document.body.appendChild(editable)
    editable.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight', bubbles: true }))
    await flushPromises()
    expect(router.currentRoute.value.query.variant).toBe('A')
    editable.remove()

    wrapper.unmount()
  })

  it('cycles an independent query parameter when queryParam is customized, preserving other params', async () => {
    const { wrapper, router } = await mountSwitcher('/cv?variant=C&theme=neutral-dark', {
      variants: [
        { key: 'neutral-dark', label: 'Neutral Dark' },
        { key: 'zinc-dark', label: 'Zinc Dark' },
      ],
      queryParam: 'theme',
    })

    expect(wrapper.text()).toContain('Neutral Dark')

    const [, nextButton] = wrapper.findAll('button')
    await nextButton!.trigger('click')
    await flushPromises()

    expect(router.currentRoute.value.query.theme).toBe('zinc-dark')
    expect(router.currentRoute.value.query.variant).toBe('C')
    expect(wrapper.text()).toContain('Zinc Dark')

    wrapper.unmount()
  })

  it('disables arrow key listening when enableKeyboard is false', async () => {
    const { wrapper, router } = await mountSwitcher('/cv?theme=neutral-dark', {
      variants: ['neutral-dark', 'zinc-dark'],
      queryParam: 'theme',
      enableKeyboard: false,
    })

    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight' }))
    await flushPromises()
    expect(router.currentRoute.value.query.theme).toBe('neutral-dark')

    wrapper.unmount()
  })

  it('teleports into #prototype-container when container is available and useGlobalContainer is true', async () => {
    const container = document.createElement('div')
    container.id = 'prototype-container'
    document.body.appendChild(container)

    const { wrapper } = await mountSwitcher('/cv', {
      variants: ['A', 'B'],
      useGlobalContainer: true,
    })

    expect(container.textContent).toContain('A')

    wrapper.unmount()
    container.remove()
  })

  it('renders inline without teleporting when useGlobalContainer is false', async () => {
    const container = document.createElement('div')
    container.id = 'prototype-container'
    document.body.appendChild(container)

    const { wrapper } = await mountSwitcher('/cv', {
      variants: ['A', 'B'],
      useGlobalContainer: false,
    })

    expect(container.textContent).toBe('')
    expect(wrapper.text()).toContain('A')

    wrapper.unmount()
    container.remove()
  })

  it('opens a selection menu when the label is clicked, allowing direct variant selection', async () => {
    const { wrapper, router } = await mountSwitcher('/cv?variant=A', {
      variants: [
        { key: 'A', label: 'First' },
        { key: 'B', label: 'Second' },
        { key: 'C', label: 'Third' },
      ],
      useGlobalContainer: false,
    })

    const trigger = wrapper.find('[role="button"]')
    expect(trigger.exists()).toBe(true)

    // Open menu
    await trigger.trigger('click')
    await flushPromises()

    // Menu should list all variants
    const items = wrapper.findAll('.absolute button')
    expect(items).toHaveLength(3)
    expect(items[2]!.text()).toContain('C (Third)')

    // Click third item (C)
    await items[2]!.trigger('click')
    await flushPromises()

    expect(router.currentRoute.value.query.variant).toBe('C')
    expect(wrapper.text()).toContain('C (Third)')
    // Menu closes after selection
    expect(wrapper.find('.absolute').exists()).toBe(false)

    wrapper.unmount()
  })

  it('closes the selection menu when pressing Escape', async () => {
    const { wrapper } = await mountSwitcher('/cv?variant=A', {
      variants: ['A', 'B'],
      useGlobalContainer: false,
    })

    const trigger = wrapper.find('[role="button"]')
    await trigger.trigger('click')
    await flushPromises()
    expect(wrapper.find('.absolute').exists()).toBe(true)

    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }))
    await flushPromises()
    expect(wrapper.find('.absolute').exists()).toBe(false)

    wrapper.unmount()
  })

  it('hides the switcher and does not listen to arrow keys in production builds', async () => {
    vi.stubEnv('DEV', false)
    vi.stubEnv('MODE', 'production')

    const { wrapper, router } = await mountSwitcher('/playground/prototypes/example?variant=A', {
      variants: ['A', 'B'],
    })

    expect(wrapper.findAll('button')).toHaveLength(0)

    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight' }))
    await flushPromises()
    expect(router.currentRoute.value.query.variant).toBe('A')

    wrapper.unmount()
  })
})
