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
