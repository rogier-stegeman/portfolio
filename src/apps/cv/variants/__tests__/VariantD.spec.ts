import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import { cvData, type CvData } from '@/apps/cv/cv-data'
import VariantD from '@/apps/cv/variants/VariantD.vue'

describe('VariantD', () => {
  it('renders author profile header with name, headline, location, and external links', () => {
    const wrapper = mount(VariantD, {
      props: { data: cvData },
    })

    expect(wrapper.text()).toContain(cvData.profile.name)
    expect(wrapper.text()).toContain(cvData.profile.headline)
    expect(wrapper.text()).toContain(cvData.profile.location)
    expect(wrapper.text()).toContain(cvData.profile.summary)

    const links = wrapper.findAll('header a')
    expect(links.length).toBe(cvData.profile.links.length)
    const hrefs = links.map((link) => link.attributes('href'))
    expect(hrefs).toContain('https://www.linkedin.com/in/rogier-stegeman')
    expect(hrefs).toContain('https://github.com/rogier-stegeman')
  })

  it('renders top showcase grid for portfolio apps', () => {
    const wrapper = mount(VariantD, {
      props: { data: cvData },
    })

    expect(wrapper.text()).toContain('Portfolio Apps')

    for (const app of cvData.portfolioApps) {
      expect(wrapper.text()).toContain(app.title)
      expect(wrapper.text()).toContain(app.summary)
      expect(wrapper.text()).toContain(app.statusLabel)
    }
  })

  it('renders unified chronological Vartion B.V. career timeline with visual milestone nodes', () => {
    const wrapper = mount(VariantD, {
      props: { data: cvData },
    })

    const vartion = cvData.experience.find((e) => e.organization === 'Vartion B.V.')
    expect(vartion).toBeDefined()
    expect(wrapper.text()).toContain('Vartion B.V.')
    expect(wrapper.text()).toContain('2018 – Present')
    expect(wrapper.text()).toContain('Arnhem, Netherlands')

    const timeline = wrapper.find('ol')
    expect(timeline.exists()).toBe(true)
    expect(timeline.classes()).toContain('border-l-2')

    const timelineItems = timeline.findAll(':scope > li')
    expect(timelineItems.length).toBe(vartion!.roles.length)

    // Check timeline node indicators are present
    const nodes = timeline.findAll('li > span.rounded-full')
    expect(nodes.length).toBe(vartion!.roles.length)
    expect(nodes[0]?.classes()).toContain('bg-primary')

    vartion!.roles.forEach((role) => {
      expect(timeline.text()).toContain(role.title)
      expect(timeline.text()).toContain(role.period)
      expect(timeline.text()).toContain(role.location)
      expect(timeline.text()).toContain(role.summary)
    })

    const allHighlights = vartion!.roles.flatMap((role) => role.highlights ?? [])
    expect(allHighlights.length).toBeGreaterThan(0)
    allHighlights.forEach((highlight) => {
      expect(timeline.text()).toContain(highlight)
    })
  })

  it('renders education cards and categorized skills', () => {
    const wrapper = mount(VariantD, {
      props: { data: cvData },
    })

    expect(wrapper.text()).toContain('Education')
    for (const edu of cvData.education) {
      expect(wrapper.text()).toContain(edu.degree)
      expect(wrapper.text()).toContain(edu.institution)
      expect(wrapper.text()).toContain(edu.period)
    }

    expect(wrapper.text()).toContain('Skills')
    for (const group of cvData.skillGroups) {
      expect(wrapper.text()).toContain(group.category)
      for (const skill of group.skills) {
        expect(wrapper.text()).toContain(skill)
      }
    }
  })

  it('handles minimal dataset without crashing', () => {
    const minimalData: CvData = {
      profile: {
        name: 'Jane Doe',
        headline: 'Staff Engineer',
        location: 'Utrecht, Netherlands',
        summary: 'Minimal summary.',
        links: [],
      },
      portfolioApps: [],
      experience: [],
      education: [],
      skillGroups: [],
    }

    const wrapper = mount(VariantD, {
      props: { data: minimalData },
    })

    expect(wrapper.text()).toContain('Jane Doe')
    expect(wrapper.text()).toContain('Staff Engineer')
  })
})
