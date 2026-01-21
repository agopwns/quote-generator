import { ProjectTemplate } from '../types'

export const mobileAppTemplate: ProjectTemplate = {
  id: 'mobile-app',
  name: '모바일 앱',
  icon: '📱',
  description: 'iOS/Android 크로스플랫폼 앱',
  category: 'mobile',
  data: {
    project: {
      name: '',
      subtitle: 'Mobile App Development Proposal',
      description: 'Cross-platform mobile application for iOS and Android',
      date: '',
      client: '',
    },
    scope: {
      includes: [
        { id: '1', value: 'iOS/Android app (React Native)' },
        { id: '2', value: 'Backend API server' },
        { id: '3', value: 'Admin web dashboard' },
        { id: '4', value: 'Push notification system' },
        { id: '5', value: 'App Store / Play Store deployment' },
      ],
      excludes: [
        { id: '1', value: 'Server hosting costs' },
        { id: '2', value: 'App store developer account fees' },
        { id: '3', value: 'Maintenance (separate contract)' },
      ],
    },
    techStack: [
      { id: '1', category: 'Mobile', name: 'React Native' },
      { id: '2', category: 'Backend', name: 'Node.js + Express' },
      { id: '3', category: 'Database', name: 'PostgreSQL' },
      { id: '4', category: 'Cloud', name: 'AWS (EC2, S3, RDS)' },
      { id: '5', category: 'Push', name: 'Firebase Cloud Messaging' },
    ],
    phases: [
      {
        id: '1',
        name: 'Phase 1: Planning & Design',
        description: 'Requirements analysis and UI/UX design',
        amount: 300,
        items: [
          { id: '1', name: 'Requirements analysis', detail: 'Feature specs', status: 'docs' },
          { id: '2', name: 'UI/UX design', detail: 'Figma prototype', status: 'visual' },
          { id: '3', name: 'DB design', detail: 'ERD documentation', status: 'docs' },
        ],
      },
      {
        id: '2',
        name: 'Phase 2: Backend Development',
        description: 'API server and database setup',
        amount: 500,
        items: [
          { id: '1', name: 'Auth system', detail: 'JWT, social login', status: 'working' },
          { id: '2', name: 'API development', detail: 'REST API', status: 'working' },
          { id: '3', name: 'AWS infrastructure', detail: 'EC2, RDS, S3', status: 'infra' },
        ],
      },
      {
        id: '3',
        name: 'Phase 3: App Development',
        description: 'Mobile app UI and features',
        amount: 800,
        items: [
          { id: '1', name: 'Main screens', detail: 'Home, navigation, profile', status: 'visual' },
          { id: '2', name: 'Core features', detail: 'Business logic', status: 'working' },
          { id: '3', name: 'Push notifications', detail: 'FCM integration', status: 'working' },
        ],
      },
      {
        id: '4',
        name: 'Phase 4: Testing & Launch',
        description: 'QA and app store deployment',
        amount: 400,
        items: [
          { id: '1', name: 'QA testing', detail: 'Functional/UI tests', status: 'stabilization' },
          { id: '2', name: 'App store review', detail: 'iOS/Android submission', status: 'docs' },
          { id: '3', name: 'Launch', detail: 'Deployment & monitoring', status: 'infra' },
        ],
      },
    ],
    paymentTerms: [
      { id: '1', phase: 'Contract', condition: 'Upon signing', amount: 600 },
      { id: '2', phase: 'Midterm', condition: 'Phase 2 completion', amount: 500 },
      { id: '3', phase: 'Final', condition: 'App launch', amount: 900 },
    ],
    schedule: [
      { id: '1', phase: 'Phase 1', duration: '2 weeks', deliverable: 'Design, specs' },
      { id: '2', phase: 'Phase 2', duration: '4 weeks', deliverable: 'API server, admin' },
      { id: '3', phase: 'Phase 3', duration: '6 weeks', deliverable: 'Beta app' },
      { id: '4', phase: 'Phase 4', duration: '2 weeks', deliverable: 'Production release' },
    ],
    terms: [
      { id: '1', label: 'Warranty', value: '3 months after launch' },
      { id: '2', label: 'Source code', value: 'Full delivery upon completion' },
      { id: '3', label: 'Support', value: 'Unlimited during development' },
    ],
    expansions: [
      { id: '1', feature: 'Chat feature', description: '1:1 and group chat', amount: 300 },
      { id: '2', feature: 'Payment system', description: 'In-app purchases', amount: 200 },
      { id: '3', feature: 'Multi-language', description: 'i18n support', amount: 100 },
    ],
  },
}
