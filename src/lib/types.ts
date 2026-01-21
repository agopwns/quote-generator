export interface PhaseItem {
  id: string
  name: string
  detail: string
  status: 'visual' | 'working' | 'infra' | 'docs' | 'stabilization'
}

export interface Phase {
  id: string
  name: string
  description: string
  amount: number
  items: PhaseItem[]
}

export interface TechStackItem {
  id: string
  category: string
  name: string
}

export interface PaymentTerm {
  id: string
  phase: string
  condition: string
  amount: number
}

export interface ScheduleItem {
  id: string
  phase: string
  duration: string
  deliverable: string
}

export interface TermItem {
  id: string
  label: string
  value: string
}

export interface ExpansionOption {
  id: string
  feature: string
  description: string
  amount: number
}

export interface Quote {
  project: {
    name: string
    subtitle: string
    description: string
    date: string
    client: string
  }
  scope: {
    includes: { id: string; value: string }[]
    excludes: { id: string; value: string }[]
  }
  techStack: TechStackItem[]
  phases: Phase[]
  paymentTerms: PaymentTerm[]
  schedule: ScheduleItem[]
  terms: TermItem[]
  expansions: ExpansionOption[]
}

export interface SavedQuote {
  id: string
  name: string
  createdAt: string
  updatedAt: string
  data: Quote
}

export const MAX_SAVED_QUOTES = 10

export const DEFAULT_QUOTE: Quote = {
  project: {
    name: '',
    subtitle: '모바일 앱 개발 제안서',
    description: '',
    date: new Date().toISOString().slice(0, 7),
    client: '',
  },
  scope: {
    includes: [{ id: '1', value: '' }],
    excludes: [{ id: '1', value: '' }],
  },
  techStack: [{ id: '1', category: '', name: '' }],
  phases: [
    {
      id: '1',
      name: 'Phase 1',
      description: '',
      amount: 0,
      items: [{ id: '1', name: '', detail: '', status: 'working' }],
    },
  ],
  paymentTerms: [{ id: '1', phase: '', condition: '', amount: 0 }],
  schedule: [{ id: '1', phase: '', duration: '', deliverable: '' }],
  terms: [{ id: '1', label: '', value: '' }],
  expansions: [{ id: '1', feature: '', description: '', amount: 0 }],
}
