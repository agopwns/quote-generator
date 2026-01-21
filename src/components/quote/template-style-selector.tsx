'use client'

import { useQuoteStore } from '@/lib/store'
import { DESIGN_TEMPLATES, DesignTemplate } from '@/lib/types'
import { getTranslation } from '@/lib/i18n'

const DESIGN_TEMPLATE_KEYS: Record<DesignTemplate, string> = {
  default: 'design.default',
  notion: 'design.notion',
  shadcn: 'design.shadcn',
  minimal: 'design.minimal',
  formal: 'design.formal',
}

export function TemplateStyleSelector() {
  const { designTemplate, setDesignTemplate, language } = useQuoteStore()
  const t = getTranslation(language)

  return (
    <div className="flex items-center gap-2">
      <span className="text-sm text-muted-foreground">{t('preview.style')}</span>
      <select
        value={designTemplate}
        onChange={(e) => setDesignTemplate(e.target.value as DesignTemplate)}
        className="text-sm border rounded px-2 py-1 bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
      >
        {DESIGN_TEMPLATES.map((template) => (
          <option key={template.id} value={template.id}>
            {t(DESIGN_TEMPLATE_KEYS[template.id])}
          </option>
        ))}
      </select>
    </div>
  )
}
