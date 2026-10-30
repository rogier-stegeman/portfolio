import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import { cvData } from '@/apps/cv/cv-data'
import VariantM from '@/apps/cv/variants/VariantM.vue'

describe('VariantM', () => {
  it('renders persistent profile header with external links and summary', () => {
    const wrapper = mount(VariantM, {
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

  it('renders the Overview tab by default with highlights', () => {
    const wrapper = mount(VariantM, {
      props: { data: cvData },
    })

    // Overview content is rendered
    expect(wrapper.text()).toContain('Latest Role')
    expect(wrapper.text()).toContain('Software Engineer')
    expect(wrapper.text()).toContain('Core Competencies')
    expect(wrapper.text()).toContain('Portfolio Apps')
    expect(wrapper.text()).toContain('TrackEx')
    expect(wrapper.text()).toContain('Eco Living')
    expect(wrapper.text()).toContain('Urban Heat Island Mitigation')
    expect(wrapper.text()).toContain('Urban Habitat Connector')
  })

  it('switches between tabs when clicking navigation buttons', async () => {
    const wrapper = mount(VariantM, {
      props: { data: cvData },
    })

    const navButtons = wrapper.findAll('nav button')
    expect(navButtons).toHaveLength(4)

    // Click Experience tab
    const experienceBtn = navButtons.find((btn) => btn.text().includes('Experience'))
    expect(experienceBtn).toBeDefined()
    await experienceBtn!.trigger('click')

    expect(wrapper.text()).toContain('Vartion B.V.')
    expect(wrapper.text()).toContain('Software Engineer')
    expect(wrapper.text()).toContain('Research Engineer')
    expect(wrapper.text()).toContain('Graduate Intern Bioinformatician')
    expect(wrapper.text()).toContain('Data Engineer')
    expect(wrapper.text()).toContain('Junior Software Developer')
    expect(wrapper.text()).toContain('Intern Bioinformatician')
    expect(wrapper.text()).toContain('Named entity recognition')

    // Click Portfolio Apps tab
    const appsBtn = navButtons.find((btn) => btn.text().includes('Portfolio Apps'))
    expect(appsBtn).toBeDefined()
    await appsBtn!.trigger('click')

    expect(wrapper.text()).toContain('TrackEx')
    expect(wrapper.text()).toContain('Eco Living')
    expect(wrapper.text()).toContain('Urban Heat Island Mitigation')
    expect(wrapper.text()).toContain('Urban Habitat Connector')
    expect(wrapper.text()).not.toContain('Domain:')
    expect(wrapper.text()).not.toContain('Technology:')

    // Click Education & Skills tab
    const eduBtn = navButtons.find((btn) => btn.text().includes('Education & Skills'))
    expect(eduBtn).toBeDefined()
    await eduBtn!.trigger('click')

    expect(wrapper.text()).toContain('HAN University of Applied Sciences')
    expect(wrapper.text()).toContain('BASc in Bioinformatics')
    expect(wrapper.text()).toContain('Minor in Data Science — ConTaInR')
    expect(wrapper.text()).toContain('Skills Matrix')
    expect(wrapper.text()).toContain('Frontend')
    expect(wrapper.text()).toContain('Backend & Data')
    expect(wrapper.text()).toContain('Architecture & Workflow')
  })
})
