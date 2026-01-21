'use client'

import { useQuoteStore } from '@/lib/store'
import { PROJECT_TEMPLATES } from '@/lib/templates'
import { ScrollArea } from '@/components/ui/scroll-area'

export function TemplateSelector() {
  const { loadProjectTemplate, draft } = useQuoteStore()

  const handleSelect = (templateId: string) => {
    const template = PROJECT_TEMPLATES.find((t) => t.id === templateId)
    if (!template) return

    if (draft.project.name || draft.phases.some((p) => p.amount > 0)) {
      if (!confirm('Current draft will be replaced. Continue?')) {
        return
      }
    }

    loadProjectTemplate(template)
  }

  return (
    <ScrollArea className="flex-1 px-4">
      <div className="space-y-2 pb-4">
        {PROJECT_TEMPLATES.map((template) => (
          <div
            key={template.id}
            className="p-3 rounded-lg cursor-pointer transition-colors bg-white border border-gray-200 hover:bg-blue-50 hover:border-blue-300"
            onClick={() => handleSelect(template.id)}
          >
            <div className="flex items-start gap-3">
              <span className="text-2xl">{template.icon}</span>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium">{template.name}</p>
                <p className="text-xs text-gray-500">{template.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </ScrollArea>
  )
}
