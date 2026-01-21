'use client'

import { Quote } from '@/lib/types'

interface TemplateProps {
  quote: Quote
}

function formatAmount(amount: number): string {
  if (amount >= 10000) {
    return `${(amount / 10000).toLocaleString()}억원`
  }
  return `${amount.toLocaleString()}만원`
}

export function MinimalTemplate({ quote }: TemplateProps) {
  const totalPhaseAmount = quote.phases.reduce((sum, p) => sum + p.amount, 0)

  return (
    <div className="bg-zinc-950 text-zinc-100 min-h-screen p-12 print:p-8 print:bg-zinc-950">
      <div className="max-w-3xl mx-auto">
        <header className="mb-16 pb-8 border-b border-zinc-800">
          <h1 className="text-5xl font-light tracking-tight mb-4">
            {quote.project.name || 'Project Name'}
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
          <h2 className="text-xs uppercase tracking-widest text-zinc-600 mb-6">Scope</h2>
          <div className="grid grid-cols-2 gap-12">
            <div>
              <h3 className="text-sm text-emerald-500 mb-4">Included</h3>
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
              <h3 className="text-sm text-red-500 mb-4">Excluded</h3>
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

        {quote.techStack.some(t => t.name) && (
          <section className="mb-12">
            <h2 className="text-xs uppercase tracking-widest text-zinc-600 mb-6">Stack</h2>
            <div className="flex flex-wrap gap-3">
              {quote.techStack.filter(t => t.name).map((tech) => (
                <span key={tech.id} className="text-sm px-3 py-1 bg-zinc-900 text-zinc-400 rounded">
                  {tech.name}
                </span>
              ))}
            </div>
          </section>
        )}

        <section className="mb-12">
          <h2 className="text-xs uppercase tracking-widest text-zinc-600 mb-6">Phases</h2>
          <div className="space-y-6">
            {quote.phases.map((phase) => (
              <div key={phase.id} className="border-l border-zinc-800 pl-6">
                <div className="flex justify-between items-baseline mb-2">
                  <h3 className="text-lg font-light">{phase.name}</h3>
                  <span className="text-xl font-light text-white">{formatAmount(phase.amount)}</span>
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
          <p className="text-xs uppercase tracking-widest text-zinc-600 mb-4">Total</p>
          <p className="text-5xl font-light">{formatAmount(totalPhaseAmount)}</p>
          <p className="text-xs text-zinc-700 mt-2">VAT excluded</p>
        </section>

        {quote.paymentTerms.some(t => t.condition) && (
          <section className="mb-12">
            <h2 className="text-xs uppercase tracking-widest text-zinc-600 mb-6">Payment</h2>
            <div className="space-y-3">
              {quote.paymentTerms.filter(t => t.condition).map((term) => (
                <div key={term.id} className="flex justify-between items-center py-2 border-b border-zinc-900">
                  <div>
                    <span className="text-zinc-300">{term.phase}</span>
                    <span className="text-zinc-600 text-sm ml-3">{term.condition}</span>
                  </div>
                  <span className="text-zinc-400">{formatAmount(term.amount)}</span>
                </div>
              ))}
            </div>
          </section>
        )}

        {quote.schedule.some(s => s.phase) && (
          <section className="mb-12">
            <h2 className="text-xs uppercase tracking-widest text-zinc-600 mb-6">Timeline</h2>
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

        {quote.terms.some(t => t.label) && (
          <section className="mb-12">
            <h2 className="text-xs uppercase tracking-widest text-zinc-600 mb-6">Terms</h2>
            <div className="space-y-2">
              {quote.terms.filter(t => t.label).map((term) => (
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
            <h2 className="text-xs uppercase tracking-widest text-zinc-600 mb-6">Expansions</h2>
            <div className="space-y-2">
              {quote.expansions.filter(e => e.feature).map((exp) => (
                <div key={exp.id} className="flex justify-between items-center py-2 text-sm">
                  <div>
                    <span className="text-zinc-400">{exp.feature}</span>
                    <span className="text-zinc-700 ml-3">{exp.description}</span>
                  </div>
                  <span className="text-zinc-600">{formatAmount(exp.amount)}</span>
                </div>
              ))}
            </div>
          </section>
        )}

        <footer className="text-center text-xs text-zinc-700 pt-8 border-t border-zinc-900">
          <p>Valid for 30 days</p>
        </footer>
      </div>
    </div>
  )
}
