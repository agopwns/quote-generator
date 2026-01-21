'use client'

import { useQuoteStore } from '@/lib/store'
import { DESIGN_TEMPLATES, DesignTemplate } from '@/lib/types'

export function TemplateStyleSelector() {
  const { designTemplate, setDesignTemplate } = useQuoteStore()

  return (
    <div className="flex items-center gap-2">
      <span className="text-sm text-gray-500">Style:</span>
      <select
        value={designTemplate}
        onChange={(e) => setDesignTemplate(e.target.value as DesignTemplate)}
        className="text-sm border border-gray-300 rounded px-2 py-1 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        {DESIGN_TEMPLATES.map((template) => (
          <option key={template.id} value={template.id}>
            {template.name}
          </option>
        ))}
      </select>
    </div>
  )
}
