import { ProjectTemplate } from '../types'

export const webEcommerceTemplate: ProjectTemplate = {
  id: 'web-ecommerce',
  name: '쇼핑몰',
  icon: '🛒',
  description: '결제 기능 포함 온라인 쇼핑몰',
  category: 'web',
  data: {
    project: {
      name: '',
      subtitle: 'E-commerce Development Proposal',
      description: 'Full-featured online shopping platform',
      date: '',
      client: '',
    },
    scope: {
      includes: [
        { id: '1', value: 'Product catalog & search' },
        { id: '2', value: 'Shopping cart & wishlist' },
        { id: '3', value: 'User authentication & profiles' },
        { id: '4', value: 'Payment gateway integration (PG)' },
        { id: '5', value: 'Order management system' },
        { id: '6', value: 'Admin dashboard' },
        { id: '7', value: 'Inventory management' },
      ],
      excludes: [
        { id: '1', value: 'Server hosting costs' },
        { id: '2', value: 'PG transaction fees' },
        { id: '3', value: 'Product photography' },
        { id: '4', value: 'Product data entry' },
      ],
    },
    techStack: [
      { id: '1', category: 'Frontend', name: 'Next.js + TypeScript' },
      { id: '2', category: 'Backend', name: 'Node.js + Express' },
      { id: '3', category: 'Database', name: 'PostgreSQL' },
      { id: '4', category: 'Payment', name: 'Toss Payments / Stripe' },
      { id: '5', category: 'Cloud', name: 'AWS (EC2, S3, RDS)' },
      { id: '6', category: 'Search', name: 'Elasticsearch' },
    ],
    phases: [
      {
        id: '1',
        name: 'Phase 1: Planning & Design',
        description: 'Requirements and UI/UX design',
        amount: 300,
        items: [
          { id: '1', name: 'Requirements analysis', detail: 'Feature specifications', status: 'docs' },
          { id: '2', name: 'Database design', detail: 'ERD, schema', status: 'docs' },
          { id: '3', name: 'UI/UX design', detail: 'Figma prototype', status: 'visual' },
        ],
      },
      {
        id: '2',
        name: 'Phase 2: Backend Development',
        description: 'API and database implementation',
        amount: 500,
        items: [
          { id: '1', name: 'User system', detail: 'Auth, profiles', status: 'working' },
          { id: '2', name: 'Product management', detail: 'CRUD, categories', status: 'working' },
          { id: '3', name: 'Order system', detail: 'Cart, checkout', status: 'working' },
          { id: '4', name: 'Payment integration', detail: 'PG connection', status: 'working' },
        ],
      },
      {
        id: '3',
        name: 'Phase 3: Frontend Development',
        description: 'User-facing storefront',
        amount: 400,
        items: [
          { id: '1', name: 'Product pages', detail: 'List, detail, search', status: 'visual' },
          { id: '2', name: 'Checkout flow', detail: 'Cart, payment', status: 'working' },
          { id: '3', name: 'User dashboard', detail: 'Orders, profile', status: 'visual' },
        ],
      },
      {
        id: '4',
        name: 'Phase 4: Admin & Testing',
        description: 'Admin panel and QA',
        amount: 300,
        items: [
          { id: '1', name: 'Admin dashboard', detail: 'Analytics, management', status: 'working' },
          { id: '2', name: 'QA testing', detail: 'Full test cycle', status: 'stabilization' },
          { id: '3', name: 'Deployment', detail: 'Production setup', status: 'infra' },
        ],
      },
    ],
    paymentTerms: [
      { id: '1', phase: 'Contract', condition: 'Upon signing', amount: 450 },
      { id: '2', phase: 'Midterm', condition: 'Backend completion', amount: 450 },
      { id: '3', phase: 'Final', condition: 'Project launch', amount: 600 },
    ],
    schedule: [
      { id: '1', phase: 'Phase 1', duration: '2 weeks', deliverable: 'Design, DB schema' },
      { id: '2', phase: 'Phase 2', duration: '4 weeks', deliverable: 'API server' },
      { id: '3', phase: 'Phase 3', duration: '3 weeks', deliverable: 'Storefront' },
      { id: '4', phase: 'Phase 4', duration: '2 weeks', deliverable: 'Admin, launch' },
    ],
    terms: [
      { id: '1', label: 'Warranty', value: '3 months after launch' },
      { id: '2', label: 'Source code', value: 'Full ownership transfer' },
      { id: '3', label: 'Training', value: '2 hours admin training included' },
    ],
    expansions: [
      { id: '1', feature: 'Review system', description: 'Product reviews & ratings', amount: 150 },
      { id: '2', feature: 'Coupon system', description: 'Discounts, promotions', amount: 120 },
      { id: '3', feature: 'Multi-vendor', description: 'Marketplace features', amount: 400 },
    ],
  },
}
