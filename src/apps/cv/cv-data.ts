export interface ProfileLink {
  label: string
  url: string
}

export interface Profile {
  name: string
  headline: string
  location: string
  summary: string
  links: readonly ProfileLink[]
}

export interface PortfolioAppEntry {
  id: string
  title: string
  summary: string
  status: 'released' | 'unreleased'
  statusLabel: string
  route?: string
}

export interface ExperienceRole {
  title: string
  period: string
  location: string
  summary: string
  highlights?: readonly string[]
}

export interface ExperienceEntry {
  organization: string
  location: string
  totalPeriod: string
  roles: readonly ExperienceRole[]
}

export interface EducationEntry {
  institution: string
  degree: string
  period: string
  location: string
  summary?: string
}

export interface SkillGroup {
  category: string
  skills: readonly string[]
}

export interface CvData {
  profile: Profile
  portfolioApps: readonly PortfolioAppEntry[]
  experience: readonly ExperienceEntry[]
  education: readonly EducationEntry[]
  skillGroups: readonly SkillGroup[]
}

export const cvData: CvData = {
  profile: {
    name: 'Rogier Stegeman',
    headline: 'Software Engineer at Vartion B.V.',
    location: 'Arnhem, Netherlands',
    summary:
      'Software engineer with a background in bioinformatics and data science, building full-stack web applications, data processing pipelines, and domain-driven systems. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    links: [
      {
        label: 'LinkedIn',
        url: 'https://www.linkedin.com/in/rogier-stegeman',
      },
      {
        label: 'GitHub',
        url: 'https://github.com/rogier-stegeman',
      },
    ],
  },
  portfolioApps: [
    {
      id: 'urban-heat-island-mitigation',
      title: 'Urban Heat Island Mitigation',
      summary:
        'Spatial analysis of urban canopy coverage, surface temperature anomalies, and green infrastructure interventions for microclimate cooling.',
      status: 'unreleased',
      statusLabel: 'In development',
    },
    {
      id: 'urban-habitat-connector',
      title: 'Urban Habitat Connector',
      summary:
        'Ecological network modelling application for evaluating habitat fragmentation, pollinator corridors, and urban biodiversity connectivity.',
      status: 'unreleased',
      statusLabel: 'In development',
    },
  ],
  experience: [
    {
      organization: 'Vartion B.V.',
      location: 'Arnhem, Netherlands',
      totalPeriod: '2018 – Present',
      roles: [
        {
          title: 'Software Engineer',
          period: 'Feb 2024 – Present',
          location: 'Arnhem, Netherlands',
          summary:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
          highlights: [
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
            'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore.',
          ],
        },
        {
          title: 'Research Engineer',
          period: 'Apr 2020 – Jan 2024',
          location: 'Amsterdam, Netherlands',
          summary:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida.',
        },
        {
          title: 'Graduate Intern Bioinformatician',
          period: 'Sep 2020 – Jun 2021',
          location: 'Netherlands',
          summary:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam.',
        },
        {
          title: 'Data Engineer',
          period: 'Nov 2019 – Apr 2020',
          location: 'Randstad, Netherlands',
          summary:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nisi. Nulla quis sem at nibh elementum imperdiet.',
        },
        {
          title: 'Junior Software Developer',
          period: 'Jan 2019 – Nov 2019',
          location: 'Randstad, Netherlands',
          summary:
            'Junior software developer for the research and development team of Vartion B.V. Development of an automated data processing and analysis approach on the interpretation of clinical trial data provided by The National Library of Medicine for novel insight generation by combining data processing with machine learning and front-end development.',
          highlights: [
            'Word/n-gram embedding',
            'Topic modelling',
            'Named entity recognition',
            'Coreference resolution',
          ],
        },
        {
          title: 'Intern Bioinformatician',
          period: 'Aug 2018 – Jan 2019',
          location: 'Randstad, Netherlands',
          summary:
            'Genematics Harvey approaches a new way in tackling growing costs in healthcare, resistant bacteria against modern drugs, and scarcity in food around the world. By giving researchers and medical doctors more insight into their biological data, new findings and possible solutions can be generated.',
        },
      ],
    },
  ],
  education: [
    {
      institution: 'HAN University of Applied Sciences',
      degree: 'BASc in Bioinformatics',
      period: '2016 – 2020',
      location: 'Nijmegen, Netherlands',
      summary:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Focus on computational biology, sequence analysis, statistical modelling, and software engineering for life sciences.',
    },
    {
      institution: 'HAN University of Applied Sciences',
      degree: 'Minor in Data Science — ConTaInR',
      period: '2019 – 2020',
      location: 'Nijmegen, Netherlands',
      summary:
        'ConTaInR is a Python-based tool for taxonomic annotation of 16S rRNA sequences. The tool uses input data from the preprocessing section and runs BLAST against a 16S rRNA reference database. After running BLAST, the results are analysed and the taxonomic distribution is visualised in a sunburst diagram.',
    },
  ],
  skillGroups: [
    {
      category: 'Frontend',
      skills: ['TypeScript', 'Vue 3', 'Tailwind CSS', 'HTML & CSS', 'Vite', 'Vitest'],
    },
    {
      category: 'Backend & Data',
      skills: [
        'Python',
        'PHP',
        'SQL',
        'NLP & Text Mining',
        'Data Processing',
        'Bioinformatics (16S rRNA, BLAST)',
      ],
    },
    {
      category: 'Architecture & Workflow',
      skills: [
        'Domain Modelling',
        'Test-Driven Development',
        'Rapid AI Prototyping',
        'Git & CI/CD',
        'Cloudflare Workers',
      ],
    },
  ],
}
