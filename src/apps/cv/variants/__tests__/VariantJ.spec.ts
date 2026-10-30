import { describe, expect, it, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { cvData } from '@/apps/cv/cv-data'
import VariantJ from '@/apps/cv/variants/VariantJ.vue'

describe('VariantJ', () => {
  it('renders author profile and external links in sticky left pane', () => {
    const wrapper = mount(VariantJ, {
      props: { data: cvData },
    })

    expect(wrapper.text()).toContain(cvData.profile.name)
    expect(wrapper.text()).toContain(cvData.profile.headline)
    expect(wrapper.text()).toContain(cvData.profile.location)
    expect(wrapper.text()).toContain(cvData.profile.summary)

    const links = wrapper.findAll('aside a')
    expect(links.length).toBeGreaterThanOrEqual(2)
    const hrefs = links.map((l) => l.attributes('href'))
    expect(hrefs).toContain('https://www.linkedin.com/in/rogier-stegeman')
    expect(hrefs).toContain('https://github.com/rogier-stegeman')
  })

  it('renders section bookmarks with counts', () => {
    const wrapper = mount(VariantJ, {
      props: { data: cvData },
    })

    const nav = wrapper.find('aside nav')
    expect(nav.exists()).toBe(true)
    expect(nav.text()).toContain('Experience')
    expect(nav.text()).toContain('Apps')
    expect(nav.text()).toContain('Education')
    expect(nav.text()).toContain('Skills')
  })

  it('renders portfolio apps cleanly without domain or tech tags', () => {
    const wrapper = mount(VariantJ, {
      props: { data: cvData },
    })

    for (const app of cvData.portfolioApps) {
      expect(wrapper.text()).toContain(app.title)
      expect(wrapper.text()).toContain(app.summary)
      expect(wrapper.text()).toContain(app.statusLabel)
      expect(wrapper.text()).toContain(app.category)
    }

    const trackExLink = wrapper.find('a[href="https://github.com/rogier-stegeman/TrackEx"]')
    expect(trackExLink.exists()).toBe(true)
    expect(wrapper.text()).toContain('Repository currently private')

    expect(wrapper.text()).not.toContain('Domain Focus')
    expect(wrapper.text()).not.toContain('Tech Stack')
  })

  it('renders unified chronological Vartion B.V. career timeline', () => {
    const wrapper = mount(VariantJ, {
      props: { data: cvData },
    })

    const vartion = cvData.experience.find((e) => e.organization === 'Vartion B.V.')
    expect(vartion).toBeDefined()
    expect(wrapper.text()).toContain('Vartion B.V.')
    expect(wrapper.text()).toContain('2018 – Present')

    for (const role of vartion!.roles) {
      expect(wrapper.text()).toContain(role.title)
      expect(wrapper.text()).toContain(role.period)
    }
  })

  it('renders education milestones and technical skills', () => {
    const wrapper = mount(VariantJ, {
      props: { data: cvData },
    })

    for (const edu of cvData.education) {
      expect(wrapper.text()).toContain(edu.degree)
      expect(wrapper.text()).toContain(edu.institution)
      expect(wrapper.text()).toContain(edu.period)
    }

    for (const group of cvData.skillGroups) {
      expect(wrapper.text()).toContain(group.category)
      for (const skill of group.skills) {
        expect(wrapper.text()).toContain(skill)
      }
    }
  })

  it('keeps all sections visible while bookmarks scroll to them', async () => {
    const scrollIntoViewMock = vi.fn<() => void>()
    window.HTMLElement.prototype.scrollIntoView = scrollIntoViewMock

    const wrapper = mount(VariantJ, {
      props: { data: cvData },
      attachTo: document.body,
    })

    // All sections are present simultaneously in DOM
    expect(wrapper.find('#section-experience').exists()).toBe(true)
    expect(wrapper.find('#section-apps').exists()).toBe(true)
    expect(wrapper.find('#section-education').exists()).toBe(true)
    expect(wrapper.find('#section-skills').exists()).toBe(true)

    // Click 'Apps' bookmark
    const buttons = wrapper.findAll('aside nav button')
    const appsButton = buttons.find((btn) => btn.text().includes('Apps'))
    expect(appsButton).toBeDefined()
    await appsButton!.trigger('click')

    // Sections remain continuously rendered (not filtered out)
    expect(wrapper.find('#section-experience').exists()).toBe(true)
    expect(wrapper.find('#section-apps').exists()).toBe(true)
    expect(wrapper.find('#section-education').exists()).toBe(true)
    expect(wrapper.find('#section-skills').exists()).toBe(true)
    expect(scrollIntoViewMock).toHaveBeenCalledWith({ behavior: 'smooth', block: 'start' })

    wrapper.unmount()
  })
})
