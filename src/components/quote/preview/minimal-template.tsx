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
    <div className="bg-background text-foreground min-h-screen p-12 print:p-8 print:bg-background">
      <div className="max-w-6xl mx-auto">
        <header className="mb-16 pb-8 border-b border-border">
          <h1 className="text-5xl font-light tracking-tight mb-4">
            {quote.project.name || (language === 'ko' ? '프로젝트명' : 'Project Name')}
          </h1>
          <p className="text-muted-foreground text-lg">{quote.project.subtitle}</p>
          <div className="flex gap-6 mt-6 text-sm text-muted-foreground">
            <span>{quote.project.date}</span>
            {quote.project.client && <span>→ {quote.project.client}</span>}
          </div>
        </header>

        {quote.project.description && (
          <section className="mb-12">
            <p className="text-muted-foreground leading-relaxed">{quote.project.description}</p>
          </section>
        )}

        <section className="mb-12">
          <h2 className="text-xs uppercase tracking-widest text-muted-foreground mb-6">{t('section.scope')}</h2>
          <div className="grid grid-cols-2 gap-12">
            <div>
              <h3 className="text-sm text-emerald-500 mb-4">{t('section.included')}</h3>
              <ul className="space-y-2">
                {quote.scope.includes.filter(i => i.value).map((item) => (
                  <li key={item.id} className="text-sm text-muted-foreground flex items-start gap-2">
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
                  <li key={item.id} className="text-sm text-muted-foreground flex items-start gap-2">
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
            <h2 className="text-xs uppercase tracking-widest text-muted-foreground mb-6">{t('section.techStack')}</h2>
            <div className="flex flex-wrap gap-3">
              {quote.techStack.filter(tech => tech.name).map((tech) => (
                <span key={tech.id} className="text-sm px-3 py-1 bg-muted text-muted-foreground rounded">
                  {tech.name}
                </span>
              ))}
            </div>
          </section>
        )}

        <section className="mb-12">
          <h2 className="text-xs uppercase tracking-widest text-muted-foreground mb-6">{t('section.phases')}</h2>
          <div className="space-y-6">
            {quote.phases.map((phase) => (
              <div key={phase.id} className="border-l border-border pl-6">
                <div className="flex justify-between items-baseline mb-2">
                  <h3 className="text-lg font-light">{phase.name}</h3>
                  <span className="text-xl font-light text-foreground">{formatAmount(phase.amount, language)}</span>
                </div>
                {phase.description && (
                  <p className="text-sm text-muted-foreground mb-3">{phase.description}</p>
                )}
                <ul className="space-y-1">
                  {phase.items.filter(i => i.name).map((item) => (
                    <li key={item.id} className="text-sm text-muted-foreground">
                      {item.name}
                      {item.detail && <span className="text-muted-foreground/70"> — {item.detail}</span>}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-12 py-12 border-y border-border text-center">
          <p className="text-xs uppercase tracking-widest text-muted-foreground mb-4">{t('table.total')}</p>
          <p className="text-5xl font-light">{formatAmount(totalPhaseAmount, language)}</p>
          <p className="text-xs text-muted-foreground/70 mt-2">{t('unit.vatExcluded')}</p>
        </section>

        {quote.paymentTerms.some(term => term.condition) && (
          <section className="mb-12">
            <h2 className="text-xs uppercase tracking-widest text-muted-foreground mb-6">{t('section.paymentTerms')}</h2>
            <div className="space-y-3">
              {quote.paymentTerms.filter(term => term.condition).map((term) => (
                <div key={term.id} className="flex justify-between items-center py-2 border-b border-border">
                  <div>
                    <span className="text-foreground">{term.phase}</span>
                    <span className="text-muted-foreground text-sm ml-3">{term.condition}</span>
                  </div>
                  <span className="text-muted-foreground">{formatAmount(term.amount, language)}</span>
                </div>
              ))}
            </div>
          </section>
        )}

        {quote.schedule.some(s => s.phase) && (
          <section className="mb-12">
            <h2 className="text-xs uppercase tracking-widest text-muted-foreground mb-6">{t('section.timeline')}</h2>
            <div className="space-y-4">
              {quote.schedule.filter(s => s.phase).map((item) => (
                <div key={item.id} className="flex items-baseline gap-6">
                  <span className="text-sm text-muted-foreground w-20 shrink-0">{item.duration}</span>
                  <div>
                    <span className="text-foreground">{item.phase}</span>
                    <span className="text-muted-foreground text-sm ml-3">{item.deliverable}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {quote.terms.some(term => term.label) && (
          <section className="mb-12">
            <h2 className="text-xs uppercase tracking-widest text-muted-foreground mb-6">{t('section.terms')}</h2>
            <div className="space-y-2">
              {quote.terms.filter(term => term.label).map((term) => (
                <div key={term.id} className="flex gap-6 text-sm">
                  <span className="text-muted-foreground w-32 shrink-0">{term.label}</span>
                  <span className="text-muted-foreground">{term.value}</span>
                </div>
              ))}
            </div>
          </section>
        )}

        {quote.expansions.some(e => e.feature) && (
          <section className="mb-12">
            <h2 className="text-xs uppercase tracking-widest text-muted-foreground mb-6">{t('section.expansions')}</h2>
            <div className="space-y-2">
              {quote.expansions.filter(e => e.feature).map((exp) => (
                <div key={exp.id} className="flex justify-between items-center py-2 text-sm">
                  <div>
                    <span className="text-muted-foreground">{exp.feature}</span>
                    <span className="text-muted-foreground/70 ml-3">{exp.description}</span>
                  </div>
                  <span className="text-muted-foreground">{formatAmount(exp.amount, language)}</span>
                </div>
              ))}
            </div>
          </section>
        )}

        <footer className="text-center text-xs text-muted-foreground/70 pt-8 border-t border-border">
          <p>{t('section.footer1')}</p>
        </footer>
      </div>
    </div>
  )
}
