import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import { cvData } from '@/apps/cv/cv-data'
import VariantK from '@/apps/cv/variants/VariantK.vue'

describe('VariantK', () => {
  it('renders technical spec sheet header without cringe pseudo-terminal strings', () => {
    const wrapper = mount(VariantK, {
      props: { data: cvData },
    })

    expect(wrapper.text()).toContain('Technical Specification Sheet')
    expect(wrapper.text()).toContain('Portfolio Apps')
    expect(wrapper.text()).toContain('Experience')
    expect(wrapper.text()).toContain('Education')
    expect(wrapper.text()).toContain('Skills')

    // Verify absence of cringe pseudo-terminal dev jargon
    expect(wrapper.text()).not.toContain('// 01_PROFILE')
    expect(wrapper.text()).not.toContain('SYS://')
    expect(wrapper.text()).not.toContain('APP_ID:')
    expect(wrapper.text()).not.toContain('SPEC_REVISION:')
    expect(wrapper.text()).not.toContain('ORG://')
  })

  it('renders profile section with metadata and external links', () => {
    const wrapper = mount(VariantK, {
      props: { data: cvData },
    })

    expect(wrapper.text()).toContain(cvData.profile.name)
    expect(wrapper.text()).toContain(cvData.profile.headline)
    expect(wrapper.text()).toContain(cvData.profile.location)
    expect(wrapper.text()).toContain(cvData.profile.summary)

    const links = wrapper.findAll('a')
    expect(links.length).toBeGreaterThanOrEqual(2)
    const hrefs = links.map((l) => l.attributes('href'))
    expect(hrefs).toContain('https://www.linkedin.com/in/rogier-stegeman')
    expect(hrefs).toContain('https://github.com/rogier-stegeman')
  })

  it('renders portfolio apps cleanly without domain or tech tags', () => {
    const wrapper = mount(VariantK, {
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

    expect(wrapper.text()).not.toContain('DOMAIN:')
    expect(wrapper.text()).not.toContain('TECH STACK:')
  })

  it('renders grouped Vartion B.V. experience with clear chronological role progression', () => {
    const wrapper = mount(VariantK, {
      props: { data: cvData },
    })

    expect(wrapper.text()).toContain('Vartion B.V.')
    expect(wrapper.text()).toContain('2018 – Present')

    const vartion = cvData.experience.find((e) => e.organization === 'Vartion B.V.')
    expect(vartion).toBeDefined()

    vartion!.roles.forEach((role, idx) => {
      expect(wrapper.text()).toContain(role.title)
      expect(wrapper.text()).toContain(role.period)
      expect(wrapper.text()).toContain(`Role ${idx + 1} of ${vartion!.roles.length}`)
    })

    expect(wrapper.text()).not.toContain('ROLE_INDEX:')
  })

  it('renders education and skills sections with tabular structure', () => {
    const wrapper = mount(VariantK, {
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
})
