import { ProjectTemplate } from '../types'

export const mvpTemplate: ProjectTemplate = {
  id: 'mvp',
  name: 'MVP / Prototype',
  icon: '🔧',
  description: 'Quick validation, minimal viable product',
  category: 'mvp',
  data: {
    project: {
      name: '',
      subtitle: 'MVP Development Proposal',
      description: 'Rapid prototype for market validation',
      date: '',
      client: '',
    },
    scope: {
      includes: [
        { id: '1', value: 'Core feature implementation (3-5 features)' },
        { id: '2', value: 'Basic user authentication' },
        { id: '3', value: 'Simple responsive UI' },
        { id: '4', value: 'Basic database setup' },
        { id: '5', value: 'Quick deployment' },
      ],
      excludes: [
        { id: '1', value: 'Advanced security features' },
        { id: '2', value: 'Performance optimization' },
        { id: '3', value: 'Scalability considerations' },
        { id: '4', value: 'Comprehensive testing' },
        { id: '5', value: 'Documentation' },
      ],
    },
    techStack: [
      { id: '1', category: 'Frontend', name: 'Next.js' },
      { id: '2', category: 'Backend', name: 'Supabase / Firebase' },
      { id: '3', category: 'Styling', name: 'Tailwind CSS' },
      { id: '4', category: 'Hosting', name: 'Vercel' },
    ],
    phases: [
      {
        id: '1',
        name: 'Phase 1: Rapid Design',
        description: 'Quick wireframing and planning',
        amount: 100,
        items: [
          { id: '1', name: 'Feature prioritization', detail: 'Core vs nice-to-have', status: 'docs' },
          { id: '2', name: 'Wireframes', detail: 'Quick sketches', status: 'visual' },
        ],
      },
      {
        id: '2',
        name: 'Phase 2: Core Development',
        description: 'Build essential features',
        amount: 300,
        items: [
          { id: '1', name: 'Auth setup', detail: 'Basic login/signup', status: 'working' },
          { id: '2', name: 'Core features', detail: 'Main functionality', status: 'working' },
          { id: '3', name: 'Basic UI', detail: 'Functional interface', status: 'visual' },
        ],
      },
      {
        id: '3',
        name: 'Phase 3: Polish & Deploy',
        description: 'Final touches and launch',
        amount: 100,
        items: [
          { id: '1', name: 'Bug fixes', detail: 'Critical issues only', status: 'stabilization' },
          { id: '2', name: 'Deployment', detail: 'Quick launch', status: 'infra' },
        ],
      },
    ],
    paymentTerms: [
      { id: '1', phase: 'Contract', condition: 'Upon signing', amount: 250 },
      { id: '2', phase: 'Final', condition: 'MVP launch', amount: 250 },
    ],
    schedule: [
      { id: '1', phase: 'Phase 1', duration: '3 days', deliverable: 'Wireframes' },
      { id: '2', phase: 'Phase 2', duration: '2 weeks', deliverable: 'Working MVP' },
      { id: '3', phase: 'Phase 3', duration: '3 days', deliverable: 'Live product' },
    ],
    terms: [
      { id: '1', label: 'Warranty', value: '2 weeks bug fixes' },
      { id: '2', label: 'Iterations', value: '1 round of minor changes' },
      { id: '3', label: 'Timeline', value: 'Fast-track delivery' },
    ],
    expansions: [
      { id: '1', feature: 'Full product', description: 'Complete development', amount: 1000 },
      { id: '2', feature: 'Mobile app', description: 'React Native version', amount: 800 },
      { id: '3', feature: 'Analytics', description: 'User tracking setup', amount: 100 },
    ],
  },
}
