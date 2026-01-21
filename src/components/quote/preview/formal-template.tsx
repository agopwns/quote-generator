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

export function FormalTemplate({ quote }: TemplateProps) {
  const totalPhaseAmount = quote.phases.reduce((sum, p) => sum + p.amount, 0)

  return (
    <div className="bg-white text-gray-900 min-h-screen p-16 print:p-12 font-serif">
      <div className="max-w-6xl mx-auto">
        <header className="text-center mb-16 pb-8 border-b-2 border-gray-900">
          <p className="text-sm tracking-[0.3em] text-gray-500 mb-4">DEVELOPMENT PROPOSAL</p>
          <h1 className="text-3xl font-bold mb-2">{quote.project.name || 'PROJECT NAME'}</h1>
          <p className="text-gray-600">{quote.project.subtitle}</p>
          <div className="mt-6 text-sm text-gray-500">
            <span>Date: {quote.project.date}</span>
            {quote.project.client && <span className="ml-8">Client: {quote.project.client}</span>}
          </div>
        </header>

        {quote.project.description && (
          <section className="mb-10">
            <h2 className="text-lg font-bold mb-4 pb-2 border-b border-gray-300">1. Project Overview</h2>
            <p className="text-gray-700 leading-relaxed">{quote.project.description}</p>
          </section>
        )}

        <section className="mb-10">
          <h2 className="text-lg font-bold mb-4 pb-2 border-b border-gray-300">2. Scope of Work</h2>
          <div className="mb-6">
            <h3 className="font-bold text-sm mb-3">2.1 Items Included in This Proposal</h3>
            <ul className="space-y-1 ml-4">
              {quote.scope.includes.filter(i => i.value).map((item, idx) => (
                <li key={item.id} className="text-sm text-gray-700">
                  {idx + 1}. {item.value}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-sm mb-3">2.2 Items Excluded from This Proposal</h3>
            <ul className="space-y-1 ml-4">
              {quote.scope.excludes.filter(i => i.value).map((item, idx) => (
                <li key={item.id} className="text-sm text-gray-700">
                  {idx + 1}. {item.value}
                </li>
              ))}
            </ul>
          </div>
        </section>

        {quote.techStack.some(t => t.name) && (
          <section className="mb-10">
            <h2 className="text-lg font-bold mb-4 pb-2 border-b border-gray-300">3. Technical Specifications</h2>
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-300">
                  <th className="text-left py-2 font-bold">Category</th>
                  <th className="text-left py-2 font-bold">Technology</th>
                </tr>
              </thead>
              <tbody>
                {quote.techStack.filter(t => t.name).map((tech) => (
                  <tr key={tech.id} className="border-b border-gray-200">
                    <td className="py-2 text-gray-600">{tech.category}</td>
                    <td className="py-2">{tech.name}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>
        )}

        <section className="mb-10">
          <h2 className="text-lg font-bold mb-4 pb-2 border-b border-gray-300">4. Development Plan</h2>
          {quote.phases.map((phase, phaseIdx) => (
            <div key={phase.id} className="mb-6">
              <div className="flex justify-between items-baseline mb-2">
                <h3 className="font-bold text-sm">4.{phaseIdx + 1} {phase.name}</h3>
                <span className="font-bold">{formatAmount(phase.amount)}</span>
              </div>
              {phase.description && (
                <p className="text-sm text-gray-600 mb-2 italic">{phase.description}</p>
              )}
              <table className="w-full text-sm ml-4">
                <tbody>
                  {phase.items.filter(i => i.name).map((item, idx) => (
                    <tr key={item.id} className="border-b border-gray-100">
                      <td className="py-1.5 w-8 text-gray-400">{idx + 1})</td>
                      <td className="py-1.5">{item.name}</td>
                      <td className="py-1.5 text-gray-500">{item.detail}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ))}
        </section>

        <section className="mb-10">
          <h2 className="text-lg font-bold mb-4 pb-2 border-b border-gray-300">5. Cost Summary</h2>
          <table className="w-full text-sm border border-gray-300">
            <thead>
              <tr className="bg-gray-100">
                <th className="text-left py-2 px-3 border-b border-gray-300 font-bold">Phase</th>
                <th className="text-left py-2 px-3 border-b border-gray-300 font-bold">Description</th>
                <th className="text-right py-2 px-3 border-b border-gray-300 font-bold">Amount</th>
              </tr>
            </thead>
            <tbody>
              {quote.phases.map((phase) => (
                <tr key={phase.id} className="border-b border-gray-200">
                  <td className="py-2 px-3">{phase.name}</td>
                  <td className="py-2 px-3 text-gray-600">{phase.description || '-'}</td>
                  <td className="py-2 px-3 text-right">{formatAmount(phase.amount)}</td>
                </tr>
              ))}
              <tr className="bg-gray-900 text-white">
                <td colSpan={2} className="py-2 px-3 font-bold">TOTAL (VAT Excluded)</td>
                <td className="py-2 px-3 text-right font-bold">{formatAmount(totalPhaseAmount)}</td>
              </tr>
            </tbody>
          </table>
        </section>

        {quote.paymentTerms.some(t => t.condition) && (
          <section className="mb-10">
            <h2 className="text-lg font-bold mb-4 pb-2 border-b border-gray-300">6. Payment Terms</h2>
            <table className="w-full text-sm border border-gray-300">
              <thead>
                <tr className="bg-gray-100">
                  <th className="text-left py-2 px-3 border-b border-gray-300 font-bold">Milestone</th>
                  <th className="text-left py-2 px-3 border-b border-gray-300 font-bold">Condition</th>
                  <th className="text-right py-2 px-3 border-b border-gray-300 font-bold">Amount</th>
                </tr>
              </thead>
              <tbody>
                {quote.paymentTerms.filter(t => t.condition).map((term) => (
                  <tr key={term.id} className="border-b border-gray-200">
                    <td className="py-2 px-3">{term.phase}</td>
                    <td className="py-2 px-3 text-gray-600">{term.condition}</td>
                    <td className="py-2 px-3 text-right">{formatAmount(term.amount)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>
        )}

        {quote.schedule.some(s => s.phase) && (
          <section className="mb-10">
            <h2 className="text-lg font-bold mb-4 pb-2 border-b border-gray-300">7. Project Schedule</h2>
            <table className="w-full text-sm border border-gray-300">
              <thead>
                <tr className="bg-gray-100">
                  <th className="text-left py-2 px-3 border-b border-gray-300 font-bold">Phase</th>
                  <th className="text-left py-2 px-3 border-b border-gray-300 font-bold">Duration</th>
                  <th className="text-left py-2 px-3 border-b border-gray-300 font-bold">Deliverables</th>
                </tr>
              </thead>
              <tbody>
                {quote.schedule.filter(s => s.phase).map((item) => (
                  <tr key={item.id} className="border-b border-gray-200">
                    <td className="py-2 px-3">{item.phase}</td>
                    <td className="py-2 px-3">{item.duration}</td>
                    <td className="py-2 px-3 text-gray-600">{item.deliverable}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>
        )}

        {quote.terms.some(t => t.label) && (
          <section className="mb-10">
            <h2 className="text-lg font-bold mb-4 pb-2 border-b border-gray-300">8. Terms and Conditions</h2>
            <table className="w-full text-sm">
              <tbody>
                {quote.terms.filter(t => t.label).map((term) => (
                  <tr key={term.id} className="border-b border-gray-200">
                    <td className="py-2 w-40 font-medium">{term.label}</td>
                    <td className="py-2 text-gray-700">{term.value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>
        )}

        {quote.expansions.some(e => e.feature) && (
          <section className="mb-10">
            <h2 className="text-lg font-bold mb-4 pb-2 border-b border-gray-300">9. Optional Additions</h2>
            <p className="text-sm text-gray-600 mb-4 italic">
              The following features are available as future enhancements:
            </p>
            <table className="w-full text-sm border border-gray-300">
              <thead>
                <tr className="bg-gray-100">
                  <th className="text-left py-2 px-3 border-b border-gray-300 font-bold">Feature</th>
                  <th className="text-left py-2 px-3 border-b border-gray-300 font-bold">Description</th>
                  <th className="text-right py-2 px-3 border-b border-gray-300 font-bold">Est. Cost</th>
                </tr>
              </thead>
              <tbody>
                {quote.expansions.filter(e => e.feature).map((exp) => (
                  <tr key={exp.id} className="border-b border-gray-200">
                    <td className="py-2 px-3">{exp.feature}</td>
                    <td className="py-2 px-3 text-gray-600">{exp.description}</td>
                    <td className="py-2 px-3 text-right">{formatAmount(exp.amount)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>
        )}

        <footer className="text-center pt-12 border-t-2 border-gray-900 mt-16">
          <p className="text-sm text-gray-500 mb-2">
            This proposal is valid for thirty (30) days from the date of issue.
          </p>
          <p className="text-sm text-gray-500">
            For inquiries, please contact the undersigned.
          </p>
          <div className="mt-12 pt-8">
            <div className="inline-block text-left">
              <div className="border-t border-gray-400 pt-2 w-48">
                <p className="text-sm font-medium">Authorized Signature</p>
                <p className="text-xs text-gray-500">Date: _______________</p>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  )
}
