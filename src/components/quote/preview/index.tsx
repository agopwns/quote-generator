'use client'

import { Quote, DesignTemplate } from '@/lib/types'
import { useQuoteStore } from '@/lib/store'
import { DefaultTemplate } from './default-template'
import { NotionTemplate } from './notion-template'
import { ShadcnTemplate } from './shadcn-template'
import { MinimalTemplate } from './minimal-template'
import { FormalTemplate } from './formal-template'

interface QuotePreviewProps {
  quote: Quote
}

export function QuotePreview({ quote }: QuotePreviewProps) {
  const { designTemplate } = useQuoteStore()

  switch (designTemplate) {
    case 'notion':
      return <NotionTemplate quote={quote} />
    case 'shadcn':
      return <ShadcnTemplate quote={quote} />
    case 'minimal':
      return <MinimalTemplate quote={quote} />
    case 'formal':
      return <FormalTemplate quote={quote} />
    default:
      return <DefaultTemplate quote={quote} />
  }
}

export {
  DefaultTemplate,
  NotionTemplate,
  ShadcnTemplate,
  MinimalTemplate,
  FormalTemplate,
}
