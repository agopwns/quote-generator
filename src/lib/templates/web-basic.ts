import { ProjectTemplate } from '../types'

export const webBasicTemplate: ProjectTemplate = {
  id: 'web-basic',
  name: '웹사이트 (기본)',
  icon: '🌐',
  description: '랜딩페이지, 회사 소개 사이트',
  category: 'web',
  data: {
    project: {
      name: '',
      subtitle: 'Website Development Proposal',
      description: 'Responsive website with modern design',
      date: '',
      client: '',
    },
    scope: {
      includes: [
        { id: '1', value: 'Responsive web design (PC/Mobile)' },
        { id: '2', value: 'Main page + 5 sub pages' },
        { id: '3', value: 'Contact form' },
        { id: '4', value: 'SEO optimization' },
        { id: '5', value: 'Google Analytics integration' },
      ],
      excludes: [
        { id: '1', value: 'Server hosting costs' },
        { id: '2', value: 'Domain registration' },
        { id: '3', value: 'Content writing' },
        { id: '4', value: 'Photography/video production' },
      ],
    },
    techStack: [
      { id: '1', category: 'Frontend', name: 'Next.js' },
      { id: '2', category: 'Styling', name: 'Tailwind CSS' },
      { id: '3', category: 'Hosting', name: 'Vercel' },
      { id: '4', category: 'Analytics', name: 'Google Analytics' },
    ],
    phases: [
      {
        id: '1',
        name: 'Phase 1: Design',
        description: 'UI/UX design and prototype',
        amount: 150,
        items: [
          { id: '1', name: 'Requirements analysis', detail: 'Meeting & documentation', status: 'docs' },
          { id: '2', name: 'UI design', detail: 'Figma mockup', status: 'visual' },
          { id: '3', name: 'Design review', detail: 'Feedback & revisions', status: 'visual' },
        ],
      },
      {
        id: '2',
        name: 'Phase 2: Development',
        description: 'Frontend implementation',
        amount: 250,
        items: [
          { id: '1', name: 'Page development', detail: 'All pages coding', status: 'working' },
          { id: '2', name: 'Responsive design', detail: 'Mobile optimization', status: 'visual' },
          { id: '3', name: 'Forms & interactions', detail: 'Contact form, animations', status: 'working' },
        ],
      },
      {
        id: '3',
        name: 'Phase 3: Launch',
        description: 'Deployment and optimization',
        amount: 100,
        items: [
          { id: '1', name: 'SEO setup', detail: 'Meta tags, sitemap', status: 'docs' },
          { id: '2', name: 'Deployment', detail: 'Production launch', status: 'infra' },
          { id: '3', name: 'QA testing', detail: 'Cross-browser testing', status: 'stabilization' },
        ],
      },
    ],
    paymentTerms: [
      { id: '1', phase: 'Contract', condition: 'Upon contract signing', amount: 200 },
      { id: '2', phase: 'Final', condition: 'Upon project completion', amount: 300 },
    ],
    schedule: [
      { id: '1', phase: 'Phase 1', duration: '1 week', deliverable: 'Design mockup' },
      { id: '2', phase: 'Phase 2', duration: '2 weeks', deliverable: 'Developed website' },
      { id: '3', phase: 'Phase 3', duration: '1 week', deliverable: 'Live website' },
    ],
    terms: [
      { id: '1', label: 'Warranty', value: '1 month after launch' },
      { id: '2', label: 'Revisions', value: 'Up to 2 rounds included' },
      { id: '3', label: 'Source code', value: 'Provided upon final payment' },
    ],
    expansions: [
      { id: '1', feature: 'Blog system', description: 'CMS integration', amount: 100 },
      { id: '2', feature: 'Multi-language', description: 'i18n support', amount: 80 },
      { id: '3', feature: 'Newsletter', description: 'Email subscription', amount: 50 },
    ],
  },
}
