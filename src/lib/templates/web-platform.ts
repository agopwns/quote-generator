import { ProjectTemplate } from '../types'

export const webPlatformTemplate: ProjectTemplate = {
  id: 'web-platform',
  name: 'Web Platform',
  icon: '🖥️',
  description: 'SaaS, dashboard, full-stack platform',
  category: 'platform',
  data: {
    project: {
      name: '',
      subtitle: 'Web Platform Development Proposal',
      description: 'Full-stack web platform with advanced features',
      date: '',
      client: '',
    },
    scope: {
      includes: [
        { id: '1', value: 'User authentication & authorization' },
        { id: '2', value: 'Dashboard with analytics' },
        { id: '3', value: 'Real-time data updates' },
        { id: '4', value: 'API integrations' },
        { id: '5', value: 'Admin management panel' },
        { id: '6', value: 'Email notification system' },
        { id: '7', value: 'Data export (CSV, PDF)' },
      ],
      excludes: [
        { id: '1', value: 'Cloud infrastructure costs' },
        { id: '2', value: 'Third-party API fees' },
        { id: '3', value: 'Ongoing maintenance' },
      ],
    },
    techStack: [
      { id: '1', category: 'Frontend', name: 'Next.js + TypeScript' },
      { id: '2', category: 'Backend', name: 'Node.js + NestJS' },
      { id: '3', category: 'Database', name: 'PostgreSQL + Redis' },
      { id: '4', category: 'Real-time', name: 'Socket.io' },
      { id: '5', category: 'Cloud', name: 'AWS / GCP' },
      { id: '6', category: 'CI/CD', name: 'GitHub Actions' },
    ],
    phases: [
      {
        id: '1',
        name: 'Phase 1: Architecture & Design',
        description: 'System design and prototyping',
        amount: 500,
        items: [
          { id: '1', name: 'System architecture', detail: 'Technical design doc', status: 'docs' },
          { id: '2', name: 'Database modeling', detail: 'ERD, API specs', status: 'docs' },
          { id: '3', name: 'UI/UX design', detail: 'Design system', status: 'visual' },
        ],
      },
      {
        id: '2',
        name: 'Phase 2: Core Backend',
        description: 'API and infrastructure',
        amount: 800,
        items: [
          { id: '1', name: 'Auth system', detail: 'RBAC, OAuth', status: 'working' },
          { id: '2', name: 'Core APIs', detail: 'Business logic', status: 'working' },
          { id: '3', name: 'Database setup', detail: 'Migrations, seeds', status: 'infra' },
          { id: '4', name: 'Real-time engine', detail: 'WebSocket', status: 'working' },
        ],
      },
      {
        id: '3',
        name: 'Phase 3: Frontend Platform',
        description: 'User interface development',
        amount: 700,
        items: [
          { id: '1', name: 'Dashboard', detail: 'Charts, analytics', status: 'visual' },
          { id: '2', name: 'Data management', detail: 'CRUD interfaces', status: 'working' },
          { id: '3', name: 'Real-time updates', detail: 'Live data sync', status: 'working' },
        ],
      },
      {
        id: '4',
        name: 'Phase 4: Admin & Integration',
        description: 'Admin panel and external integrations',
        amount: 500,
        items: [
          { id: '1', name: 'Admin dashboard', detail: 'User/data management', status: 'working' },
          { id: '2', name: 'External APIs', detail: 'Third-party integrations', status: 'working' },
          { id: '3', name: 'Email system', detail: 'Transactional emails', status: 'working' },
        ],
      },
      {
        id: '5',
        name: 'Phase 5: DevOps & Launch',
        description: 'Infrastructure and deployment',
        amount: 500,
        items: [
          { id: '1', name: 'CI/CD pipeline', detail: 'Automated deployment', status: 'infra' },
          { id: '2', name: 'Monitoring', detail: 'Logs, alerts', status: 'infra' },
          { id: '3', name: 'Security audit', detail: 'Penetration testing', status: 'stabilization' },
          { id: '4', name: 'Documentation', detail: 'API docs, guides', status: 'docs' },
        ],
      },
    ],
    paymentTerms: [
      { id: '1', phase: 'Contract', condition: 'Upon signing', amount: 900 },
      { id: '2', phase: 'Phase 2', condition: 'Backend completion', amount: 700 },
      { id: '3', phase: 'Phase 4', condition: 'Feature complete', amount: 700 },
      { id: '4', phase: 'Final', condition: 'Production launch', amount: 700 },
    ],
    schedule: [
      { id: '1', phase: 'Phase 1', duration: '2 weeks', deliverable: 'Architecture, design' },
      { id: '2', phase: 'Phase 2', duration: '5 weeks', deliverable: 'API server' },
      { id: '3', phase: 'Phase 3', duration: '4 weeks', deliverable: 'Frontend' },
      { id: '4', phase: 'Phase 4', duration: '3 weeks', deliverable: 'Admin, integrations' },
      { id: '5', phase: 'Phase 5', duration: '2 weeks', deliverable: 'Production ready' },
    ],
    terms: [
      { id: '1', label: 'Warranty', value: '6 months after launch' },
      { id: '2', label: 'Source code', value: 'Full ownership transfer' },
      { id: '3', label: 'Documentation', value: 'Technical & user docs included' },
      { id: '4', label: 'Training', value: '4 hours included' },
    ],
    expansions: [
      { id: '1', feature: 'Mobile app', description: 'React Native companion app', amount: 1500 },
      { id: '2', feature: 'AI features', description: 'ML-powered analytics', amount: 800 },
      { id: '3', feature: 'White-label', description: 'Multi-tenant support', amount: 600 },
    ],
  },
}
