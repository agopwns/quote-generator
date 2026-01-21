'use client'

import { Quote } from '@/lib/types'
import { Language, getTranslation } from '@/lib/i18n'

interface TemplateProps {
  quote: Quote
  language: Language
}

function formatAmount(amount: number, language: Language): string {
  if (language === 'en') {
    if (amount >= 10000) {
      return `${(amount / 10000).toLocaleString()}B KRW`
    }
    return `${amount.toLocaleString()}M KRW`
  }
  if (amount >= 10000) {
    return `${(amount / 10000).toLocaleString()}억원`
  }
  return `${amount.toLocaleString()}만원`
}

export function NotionTemplate({ quote, language }: TemplateProps) {
  const t = getTranslation(language)
  const totalPhaseAmount = quote.phases.reduce((sum, p) => sum + p.amount, 0)

  return (
    <div className="bg-card text-card-foreground font-sans max-w-6xl mx-auto px-8 py-12 print:p-6">
      <div className="mb-10">
        <span className="text-6xl block mb-4">📋</span>
        <h1 className="text-4xl font-bold mb-2">{quote.project.name || (language === 'ko' ? '프로젝트명' : 'Project Name')}</h1>
        <p className="text-muted-foreground text-lg">{quote.project.subtitle}</p>
      </div>

      <div className="bg-muted rounded-lg p-5 mb-10 space-y-3">
        <div className="flex items-center">
          <span className="w-32 text-muted-foreground text-sm">📅 {language === 'ko' ? '날짜' : 'Date'}</span>
          <span className="text-sm">{quote.project.date}</span>
        </div>
        {quote.project.client && (
          <div className="flex items-center">
            <span className="w-32 text-muted-foreground text-sm">👤 {t('table.client')}</span>
            <span className="text-sm">{quote.project.client}</span>
          </div>
        )}
        <div className="flex items-center">
          <span className="w-32 text-muted-foreground text-sm">💰 {t('table.total')}</span>
          <span className="text-sm font-semibold">{formatAmount(totalPhaseAmount, language)}</span>
        </div>
        {quote.project.description && (
          <div className="flex items-start">
            <span className="w-32 text-muted-foreground text-sm">📝 {language === 'ko' ? '설명' : 'Description'}</span>
            <span className="text-sm">{quote.project.description}</span>
          </div>
        )}
      </div>

      <div className="border-l-4 border-green-400 bg-green-50 p-4 rounded-r-lg mb-4">
        <h2 className="font-bold text-green-800 mb-3">✅ {t('section.included')}</h2>
        <ul className="space-y-1">
          {quote.scope.includes.filter(i => i.value).map((item) => (
            <li key={item.id} className="text-sm flex items-start gap-2">
              <span className="text-green-600">•</span>
              {item.value}
            </li>
          ))}
        </ul>
      </div>

      <div className="border-l-4 border-red-400 bg-red-50 p-4 rounded-r-lg mb-10">
        <h2 className="font-bold text-red-800 mb-3">❌ {t('section.excluded')}</h2>
        <ul className="space-y-1">
          {quote.scope.excludes.filter(i => i.value).map((item) => (
            <li key={item.id} className="text-sm flex items-start gap-2">
              <span className="text-red-600">•</span>
              {item.value}
            </li>
          ))}
        </ul>
      </div>

      {quote.techStack.some(tech => tech.name) && (
        <div className="mb-10">
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
            <span>🛠️</span> {t('section.techStack')}
          </h2>
          <div className="flex flex-wrap gap-2">
            {quote.techStack.filter(tech => tech.name).map((tech) => (
              <span key={tech.id} className="bg-secondary text-secondary-foreground px-3 py-1.5 rounded-md text-sm">
                {tech.category}: {tech.name}
              </span>
            ))}
          </div>
        </div>
      )}

      <div className="mb-10">
        <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
          <span>📦</span> {t('section.phases')}
        </h2>
        <div className="space-y-4">
          {quote.phases.map((phase) => (
            <div key={phase.id} className="border border-gray-200 rounded-lg overflow-hidden">
              <div className="bg-muted px-4 py-3 flex justify-between items-center">
                <span className="font-semibold">{phase.name}</span>
                <span className="text-blue-600 font-bold">{formatAmount(phase.amount, language)}</span>
              </div>
              {phase.description && (
                <div className="px-4 py-2 bg-yellow-50 text-sm text-yellow-800">
                  🎯 {phase.description}
                </div>
              )}
              <div className="px-4 py-3">
                <ul className="space-y-2">
                  {phase.items.filter(i => i.name).map((item) => (
                    <li key={item.id} className="flex items-center gap-2 text-sm">
                      <span className="w-4 h-4 rounded bg-green-100 flex items-center justify-center text-xs text-green-600">✓</span>
                      <span>{item.name}</span>
                      {item.detail && <span className="text-muted-foreground">— {item.detail}</span>}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-primary text-primary-foreground p-6 rounded-lg mb-10 text-center">
        <p className="text-sm opacity-70 mb-1">{t('section.totalCost')}</p>
        <p className="text-3xl font-bold">{formatAmount(totalPhaseAmount, language)}</p>
        <p className="text-xs opacity-60 mt-1">{t('unit.vatExcluded')}</p>
      </div>

      {quote.paymentTerms.some(term => term.condition) && (
        <div className="mb-10">
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
            <span>💳</span> {t('section.paymentTerms')}
          </h2>
          <div className="space-y-2">
            {quote.paymentTerms.filter(term => term.condition).map((term, idx) => (
              <div key={term.id} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                <div className="flex items-center gap-3">
                  <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 text-xs flex items-center justify-center font-bold">
                    {idx + 1}
                  </span>
                  <div>
                    <span className="font-medium">{term.phase}</span>
                    <span className="text-muted-foreground text-sm ml-2">— {term.condition}</span>
                  </div>
                </div>
                <span className="font-bold text-blue-600">{formatAmount(term.amount, language)}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {quote.schedule.some(s => s.phase) && (
        <div className="mb-10">
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
            <span>📅</span> {t('section.timeline')}
          </h2>
          <div className="space-y-3">
            {quote.schedule.filter(s => s.phase).map((item) => (
              <div key={item.id} className="flex items-start gap-4 p-3 border-l-2 border-blue-400 bg-blue-50 rounded-r-lg">
                <div>
                  <p className="font-medium">{item.phase}</p>
                  <p className="text-sm text-muted-foreground">{item.deliverable}</p>
                </div>
                <span className="ml-auto text-sm font-mono bg-background px-2 py-1 rounded">{item.duration}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {quote.terms.some(term => term.label) && (
        <div className="mb-10">
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
            <span>📜</span> {t('section.terms')}
          </h2>
          <div className="bg-muted rounded-lg p-4 space-y-2">
            {quote.terms.filter(term => term.label).map((term) => (
              <div key={term.id} className="flex">
                <span className="w-32 text-muted-foreground text-sm shrink-0">{term.label}</span>
                <span className="text-sm">{term.value}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {quote.expansions.some(e => e.feature) && (
        <div className="mb-10">
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
            <span>🚀</span> {t('section.expansions')}
          </h2>
          <div className="space-y-2">
            {quote.expansions.filter(e => e.feature).map((exp) => (
              <div key={exp.id} className="flex items-center justify-between p-3 border border-dashed border-gray-300 rounded-lg">
                <div>
                  <span className="font-medium">{exp.feature}</span>
                  <span className="text-muted-foreground text-sm ml-2">— {exp.description}</span>
                </div>
                <span className="text-muted-foreground">{formatAmount(exp.amount, language)}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="text-center text-muted-foreground text-sm pt-6 border-t border-border">
        <p>{t('section.footer1')}</p>
      </div>
    </div>
  )
}
