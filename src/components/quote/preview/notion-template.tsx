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

export function NotionTemplate({ quote }: TemplateProps) {
  const totalPhaseAmount = quote.phases.reduce((sum, p) => sum + p.amount, 0)

  return (
    <div className="bg-white font-sans max-w-6xl mx-auto px-8 py-12 print:p-6">
      <div className="mb-10">
        <span className="text-6xl block mb-4">📋</span>
        <h1 className="text-4xl font-bold mb-2">{quote.project.name || 'Project Name'}</h1>
        <p className="text-gray-500 text-lg">{quote.project.subtitle}</p>
      </div>

      <div className="bg-gray-50 rounded-lg p-5 mb-10 space-y-3">
        <div className="flex items-center">
          <span className="w-32 text-gray-500 text-sm">📅 Date</span>
          <span className="text-sm">{quote.project.date}</span>
        </div>
        {quote.project.client && (
          <div className="flex items-center">
            <span className="w-32 text-gray-500 text-sm">👤 Client</span>
            <span className="text-sm">{quote.project.client}</span>
          </div>
        )}
        <div className="flex items-center">
          <span className="w-32 text-gray-500 text-sm">💰 Total</span>
          <span className="text-sm font-semibold">{formatAmount(totalPhaseAmount)}</span>
        </div>
        {quote.project.description && (
          <div className="flex items-start">
            <span className="w-32 text-gray-500 text-sm">📝 Description</span>
            <span className="text-sm">{quote.project.description}</span>
          </div>
        )}
      </div>

      <div className="border-l-4 border-green-400 bg-green-50 p-4 rounded-r-lg mb-4">
        <h2 className="font-bold text-green-800 mb-3">✅ Included</h2>
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
        <h2 className="font-bold text-red-800 mb-3">❌ Excluded</h2>
        <ul className="space-y-1">
          {quote.scope.excludes.filter(i => i.value).map((item) => (
            <li key={item.id} className="text-sm flex items-start gap-2">
              <span className="text-red-600">•</span>
              {item.value}
            </li>
          ))}
        </ul>
      </div>

      {quote.techStack.some(t => t.name) && (
        <div className="mb-10">
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
            <span>🛠️</span> Tech Stack
          </h2>
          <div className="flex flex-wrap gap-2">
            {quote.techStack.filter(t => t.name).map((tech) => (
              <span key={tech.id} className="bg-gray-100 text-gray-700 px-3 py-1.5 rounded-md text-sm">
                {tech.category}: {tech.name}
              </span>
            ))}
          </div>
        </div>
      )}

      <div className="mb-10">
        <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
          <span>📦</span> Phases
        </h2>
        <div className="space-y-4">
          {quote.phases.map((phase) => (
            <div key={phase.id} className="border border-gray-200 rounded-lg overflow-hidden">
              <div className="bg-gray-50 px-4 py-3 flex justify-between items-center">
                <span className="font-semibold">{phase.name}</span>
                <span className="text-blue-600 font-bold">{formatAmount(phase.amount)}</span>
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
                      {item.detail && <span className="text-gray-400">— {item.detail}</span>}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-gray-900 text-white p-6 rounded-lg mb-10 text-center">
        <p className="text-sm text-gray-400 mb-1">Total Development Cost</p>
        <p className="text-3xl font-bold">{formatAmount(totalPhaseAmount)}</p>
        <p className="text-xs text-gray-500 mt-1">VAT excluded</p>
      </div>

      {quote.paymentTerms.some(t => t.condition) && (
        <div className="mb-10">
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
            <span>💳</span> Payment Terms
          </h2>
          <div className="space-y-2">
            {quote.paymentTerms.filter(t => t.condition).map((term, idx) => (
              <div key={term.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 text-xs flex items-center justify-center font-bold">
                    {idx + 1}
                  </span>
                  <div>
                    <span className="font-medium">{term.phase}</span>
                    <span className="text-gray-500 text-sm ml-2">— {term.condition}</span>
                  </div>
                </div>
                <span className="font-bold text-blue-600">{formatAmount(term.amount)}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {quote.schedule.some(s => s.phase) && (
        <div className="mb-10">
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
            <span>📅</span> Timeline
          </h2>
          <div className="space-y-3">
            {quote.schedule.filter(s => s.phase).map((item) => (
              <div key={item.id} className="flex items-start gap-4 p-3 border-l-2 border-blue-400 bg-blue-50 rounded-r-lg">
                <div>
                  <p className="font-medium">{item.phase}</p>
                  <p className="text-sm text-gray-600">{item.deliverable}</p>
                </div>
                <span className="ml-auto text-sm font-mono bg-white px-2 py-1 rounded">{item.duration}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {quote.terms.some(t => t.label) && (
        <div className="mb-10">
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
            <span>📜</span> Terms
          </h2>
          <div className="bg-gray-50 rounded-lg p-4 space-y-2">
            {quote.terms.filter(t => t.label).map((term) => (
              <div key={term.id} className="flex">
                <span className="w-32 text-gray-500 text-sm shrink-0">{term.label}</span>
                <span className="text-sm">{term.value}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {quote.expansions.some(e => e.feature) && (
        <div className="mb-10">
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
            <span>🚀</span> Future Options
          </h2>
          <div className="space-y-2">
            {quote.expansions.filter(e => e.feature).map((exp) => (
              <div key={exp.id} className="flex items-center justify-between p-3 border border-dashed border-gray-300 rounded-lg">
                <div>
                  <span className="font-medium">{exp.feature}</span>
                  <span className="text-gray-500 text-sm ml-2">— {exp.description}</span>
                </div>
                <span className="text-gray-600">{formatAmount(exp.amount)}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="text-center text-gray-400 text-sm pt-6 border-t border-gray-100">
        <p>Valid for 30 days • Questions? Contact us anytime</p>
      </div>
    </div>
  )
}
