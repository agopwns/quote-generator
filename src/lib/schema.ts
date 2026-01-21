import { z } from 'zod'

export const phaseItemSchema = z.object({
  id: z.string(),
  name: z.string().min(1, '항목명을 입력하세요'),
  detail: z.string(),
  status: z.enum(['visual', 'working', 'infra', 'docs', 'stabilization']),
})

export const phaseSchema = z.object({
  id: z.string(),
  name: z.string().min(1, '페이즈 이름을 입력하세요'),
  description: z.string(),
  amount: z.number().min(0),
  items: z.array(phaseItemSchema),
})

export const quoteSchema = z.object({
  project: z.object({
    name: z.string().min(1, '프로젝트명을 입력하세요'),
    subtitle: z.string(),
    description: z.string(),
    date: z.string(),
    client: z.string(),
  }),
  scope: z.object({
    includes: z.array(z.object({ id: z.string(), value: z.string() })),
    excludes: z.array(z.object({ id: z.string(), value: z.string() })),
  }),
  techStack: z.array(
    z.object({
      id: z.string(),
      category: z.string(),
      name: z.string(),
    })
  ),
  phases: z.array(phaseSchema),
  paymentTerms: z.array(
    z.object({
      id: z.string(),
      phase: z.string(),
      condition: z.string(),
      amount: z.number(),
    })
  ),
  schedule: z.array(
    z.object({
      id: z.string(),
      phase: z.string(),
      duration: z.string(),
      deliverable: z.string(),
    })
  ),
  terms: z.array(
    z.object({
      id: z.string(),
      label: z.string(),
      value: z.string(),
    })
  ),
  expansions: z.array(
    z.object({
      id: z.string(),
      feature: z.string(),
      description: z.string(),
      amount: z.number(),
    })
  ),
})

export type QuoteFormData = z.infer<typeof quoteSchema>
