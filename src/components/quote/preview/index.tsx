'use client'

import { Quote } from '@/lib/types'
import { useQuoteStore } from '@/lib/store'
import { getColorTheme } from '@/lib/color-themes'
import { DefaultTemplate } from './default-template'
import { NotionTemplate } from './notion-template'
import { ShadcnTemplate } from './shadcn-template'
import { MinimalTemplate } from './minimal-template'
import { FormalTemplate } from './formal-template'

interface QuotePreviewProps {
  quote: Quote
}

export function QuotePreview({ quote }: QuotePreviewProps) {
  const { designTemplate, language, colorTheme } = useQuoteStore()
  const themeConfig = getColorTheme(colorTheme)

  const renderTemplate = () => {
    switch (designTemplate) {
      case 'notion':
        return <NotionTemplate quote={quote} language={language} />
      case 'shadcn':
        return <ShadcnTemplate quote={quote} language={language} />
      case 'minimal':
        return <MinimalTemplate quote={quote} language={language} />
      case 'formal':
        return <FormalTemplate quote={quote} language={language} />
      default:
        return <DefaultTemplate quote={quote} language={language} />
    }
  }

  return (
    <div style={themeConfig.cssVars as React.CSSProperties}>
      {renderTemplate()}
    </div>
  )
}

export {
  DefaultTemplate,
  NotionTemplate,
  ShadcnTemplate,
  MinimalTemplate,
  FormalTemplate,
}
