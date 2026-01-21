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

export function MinimalTemplate({ quote, language }: TemplateProps) {
  const t = getTranslation(language)
  const totalPhaseAmount = quote.phases.reduce((sum, p) => sum + p.amount, 0)

  return (
    <div className="bg-zinc-950 text-zinc-100 min-h-screen p-12 print:p-8 print:bg-zinc-950">
      <div className="max-w-6xl mx-auto">
        <header className="mb-16 pb-8 border-b border-zinc-800">
          <h1 className="text-5xl font-light tracking-tight mb-4">
            {quote.project.name || (language === 'ko' ? '프로젝트명' : 'Project Name')}
          </h1>
          <p className="text-zinc-500 text-lg">{quote.project.subtitle}</p>
          <div className="flex gap-6 mt-6 text-sm text-zinc-600">
            <span>{quote.project.date}</span>
            {quote.project.client && <span>→ {quote.project.client}</span>}
          </div>
        </header>

        {quote.project.description && (
          <section className="mb-12">
            <p className="text-zinc-400 leading-relaxed">{quote.project.description}</p>
          </section>
        )}

        <section className="mb-12">
          <h2 className="text-xs uppercase tracking-widest text-zinc-600 mb-6">{t('section.scope')}</h2>
          <div className="grid grid-cols-2 gap-12">
            <div>
              <h3 className="text-sm text-emerald-500 mb-4">{t('section.included')}</h3>
              <ul className="space-y-2">
                {quote.scope.includes.filter(i => i.value).map((item) => (
                  <li key={item.id} className="text-sm text-zinc-400 flex items-start gap-2">
                    <span className="text-emerald-500 mt-1">+</span>
                    {item.value}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-sm text-red-500 mb-4">{t('section.excluded')}</h3>
              <ul className="space-y-2">
                {quote.scope.excludes.filter(i => i.value).map((item) => (
                  <li key={item.id} className="text-sm text-zinc-400 flex items-start gap-2">
                    <span className="text-red-500 mt-1">−</span>
                    {item.value}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {quote.techStack.some(tech => tech.name) && (
          <section className="mb-12">
            <h2 className="text-xs uppercase tracking-widest text-zinc-600 mb-6">{t('section.techStack')}</h2>
            <div className="flex flex-wrap gap-3">
              {quote.techStack.filter(tech => tech.name).map((tech) => (
                <span key={tech.id} className="text-sm px-3 py-1 bg-zinc-900 text-zinc-400 rounded">
                  {tech.name}
                </span>
              ))}
            </div>
          </section>
        )}

        <section className="mb-12">
          <h2 className="text-xs uppercase tracking-widest text-zinc-600 mb-6">{t('section.phases')}</h2>
          <div className="space-y-6">
            {quote.phases.map((phase) => (
              <div key={phase.id} className="border-l border-zinc-800 pl-6">
                <div className="flex justify-between items-baseline mb-2">
                  <h3 className="text-lg font-light">{phase.name}</h3>
                  <span className="text-xl font-light text-white">{formatAmount(phase.amount, language)}</span>
                </div>
                {phase.description && (
                  <p className="text-sm text-zinc-600 mb-3">{phase.description}</p>
                )}
                <ul className="space-y-1">
                  {phase.items.filter(i => i.name).map((item) => (
                    <li key={item.id} className="text-sm text-zinc-500">
                      {item.name}
                      {item.detail && <span className="text-zinc-700"> — {item.detail}</span>}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-12 py-12 border-y border-zinc-800 text-center">
          <p className="text-xs uppercase tracking-widest text-zinc-600 mb-4">{t('table.total')}</p>
          <p className="text-5xl font-light">{formatAmount(totalPhaseAmount, language)}</p>
          <p className="text-xs text-zinc-700 mt-2">{t('unit.vatExcluded')}</p>
        </section>

        {quote.paymentTerms.some(term => term.condition) && (
          <section className="mb-12">
            <h2 className="text-xs uppercase tracking-widest text-zinc-600 mb-6">{t('section.paymentTerms')}</h2>
            <div className="space-y-3">
              {quote.paymentTerms.filter(term => term.condition).map((term) => (
                <div key={term.id} className="flex justify-between items-center py-2 border-b border-zinc-900">
                  <div>
                    <span className="text-zinc-300">{term.phase}</span>
                    <span className="text-zinc-600 text-sm ml-3">{term.condition}</span>
                  </div>
                  <span className="text-zinc-400">{formatAmount(term.amount, language)}</span>
                </div>
              ))}
            </div>
          </section>
        )}

        {quote.schedule.some(s => s.phase) && (
          <section className="mb-12">
            <h2 className="text-xs uppercase tracking-widest text-zinc-600 mb-6">{t('section.timeline')}</h2>
            <div className="space-y-4">
              {quote.schedule.filter(s => s.phase).map((item) => (
                <div key={item.id} className="flex items-baseline gap-6">
                  <span className="text-sm text-zinc-600 w-20 shrink-0">{item.duration}</span>
                  <div>
                    <span className="text-zinc-300">{item.phase}</span>
                    <span className="text-zinc-600 text-sm ml-3">{item.deliverable}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {quote.terms.some(term => term.label) && (
          <section className="mb-12">
            <h2 className="text-xs uppercase tracking-widest text-zinc-600 mb-6">{t('section.terms')}</h2>
            <div className="space-y-2">
              {quote.terms.filter(term => term.label).map((term) => (
                <div key={term.id} className="flex gap-6 text-sm">
                  <span className="text-zinc-600 w-32 shrink-0">{term.label}</span>
                  <span className="text-zinc-400">{term.value}</span>
                </div>
              ))}
            </div>
          </section>
        )}

        {quote.expansions.some(e => e.feature) && (
          <section className="mb-12">
            <h2 className="text-xs uppercase tracking-widest text-zinc-600 mb-6">{t('section.expansions')}</h2>
            <div className="space-y-2">
              {quote.expansions.filter(e => e.feature).map((exp) => (
                <div key={exp.id} className="flex justify-between items-center py-2 text-sm">
                  <div>
                    <span className="text-zinc-400">{exp.feature}</span>
                    <span className="text-zinc-700 ml-3">{exp.description}</span>
                  </div>
                  <span className="text-zinc-600">{formatAmount(exp.amount, language)}</span>
                </div>
              ))}
            </div>
          </section>
        )}

        <footer className="text-center text-xs text-zinc-700 pt-8 border-t border-zinc-900">
          <p>{t('section.footer1')}</p>
        </footer>
      </div>
    </div>
  )
}
