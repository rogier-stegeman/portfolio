import { describe, expect, it } from 'vitest'
import { flushPromises, mount } from '@vue/test-utils'
import { createMemoryHistory, createRouter } from 'vue-router'
import CvView from '@/apps/cv/CvView.vue'
import PrototypeSwitcher from '@/components/PrototypeSwitcher.vue'

async function mountCvView(initialPath = '/cv') {
  const router = createRouter({
    history: createMemoryHistory(),
    routes: [{ path: '/cv', component: CvView }],
  })
  await router.push(initialPath)
  await router.isReady()

  const wrapper = mount(CvView, {
    global: {
      plugins: [router],
    },
  })
  await flushPromises()

  return { wrapper, router }
}

describe('CvView', () => {
  it('renders default VariantD and mounts PrototypeSwitcher positioned directly above the theme switcher', async () => {
    const { wrapper } = await mountCvView('/cv')

    // Renders default VariantD heading and profile
    expect(wrapper.text()).toContain('Rogier Stegeman')
    expect(wrapper.text()).toContain('Portfolio Apps')

    // Finds the layout switcher
    const switcher = wrapper.findComponent(PrototypeSwitcher)
    expect(switcher.exists()).toBe(true)

    // Positioned at fixed right-4 bottom-16 on top of the bottom-4 theme switcher
    const switcherRoot = switcher.find('div')
    expect(switcherRoot.classes()).toContain('fixed')
    expect(switcherRoot.classes()).toContain('right-4')
    expect(switcherRoot.classes()).toContain('bottom-16')
  })

  it('switches between layout variants via ?variant= query parameter', async () => {
    const { wrapper, router } = await mountCvView('/cv?variant=K')

    // VariantK renders Technical Specification Sheet
    expect(wrapper.text()).toContain('Technical Specification Sheet')

    await router.replace('/cv?variant=M')
    await flushPromises()

    // VariantM renders Tabbed Workspace navigation
    expect(wrapper.text()).toContain('Overview')
    expect(wrapper.text()).toContain('Experience')
    expect(wrapper.text()).toContain('Apps')
  })
})
