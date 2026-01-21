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

export function FormalTemplate({ quote, language }: TemplateProps) {
  const t = getTranslation(language)
  const totalPhaseAmount = quote.phases.reduce((sum, p) => sum + p.amount, 0)

  return (
    <div className="bg-white text-gray-900 min-h-screen p-16 print:p-12 font-serif">
      <div className="max-w-6xl mx-auto">
        <header className="text-center mb-16 pb-8 border-b-2 border-gray-900">
          <p className="text-sm tracking-[0.3em] text-gray-500 mb-4">{language === 'ko' ? '개발 제안서' : 'DEVELOPMENT PROPOSAL'}</p>
          <h1 className="text-3xl font-bold mb-2">{quote.project.name || (language === 'ko' ? '프로젝트명' : 'PROJECT NAME')}</h1>
          <p className="text-gray-600">{quote.project.subtitle}</p>
          <div className="mt-6 text-sm text-gray-500">
            <span>{language === 'ko' ? '날짜' : 'Date'}: {quote.project.date}</span>
            {quote.project.client && <span className="ml-8">{t('table.client')}: {quote.project.client}</span>}
          </div>
        </header>

        {quote.project.description && (
          <section className="mb-10">
            <h2 className="text-lg font-bold mb-4 pb-2 border-b border-gray-300">1. {t('section.overview')}</h2>
            <p className="text-gray-700 leading-relaxed">{quote.project.description}</p>
          </section>
        )}

        <section className="mb-10">
          <h2 className="text-lg font-bold mb-4 pb-2 border-b border-gray-300">2. {t('section.scope')}</h2>
          <div className="mb-6">
            <h3 className="font-bold text-sm mb-3">2.1 {t('section.included')}</h3>
            <ul className="space-y-1 ml-4">
              {quote.scope.includes.filter(i => i.value).map((item, idx) => (
                <li key={item.id} className="text-sm text-gray-700">
                  {idx + 1}. {item.value}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-sm mb-3">2.2 {t('section.excluded')}</h3>
            <ul className="space-y-1 ml-4">
              {quote.scope.excludes.filter(i => i.value).map((item, idx) => (
                <li key={item.id} className="text-sm text-gray-700">
                  {idx + 1}. {item.value}
                </li>
              ))}
            </ul>
          </div>
        </section>

        {quote.techStack.some(tech => tech.name) && (
          <section className="mb-10">
            <h2 className="text-lg font-bold mb-4 pb-2 border-b border-gray-300">3. {t('section.techStack')}</h2>
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-300">
                  <th className="text-left py-2 font-bold">{language === 'ko' ? '분류' : 'Category'}</th>
                  <th className="text-left py-2 font-bold">{language === 'ko' ? '기술' : 'Technology'}</th>
                </tr>
              </thead>
              <tbody>
                {quote.techStack.filter(tech => tech.name).map((tech) => (
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
          <h2 className="text-lg font-bold mb-4 pb-2 border-b border-gray-300">4. {t('section.phases')}</h2>
          {quote.phases.map((phase, phaseIdx) => (
            <div key={phase.id} className="mb-6">
              <div className="flex justify-between items-baseline mb-2">
                <h3 className="font-bold text-sm">4.{phaseIdx + 1} {phase.name}</h3>
                <span className="font-bold">{formatAmount(phase.amount, language)}</span>
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
          <h2 className="text-lg font-bold mb-4 pb-2 border-b border-gray-300">5. {t('section.costSummary')}</h2>
          <table className="w-full text-sm border border-gray-300">
            <thead>
              <tr className="bg-gray-100">
                <th className="text-left py-2 px-3 border-b border-gray-300 font-bold">{t('table.phase')}</th>
                <th className="text-left py-2 px-3 border-b border-gray-300 font-bold">{t('table.description')}</th>
                <th className="text-right py-2 px-3 border-b border-gray-300 font-bold">{t('table.amount')}</th>
              </tr>
            </thead>
            <tbody>
              {quote.phases.map((phase) => (
                <tr key={phase.id} className="border-b border-gray-200">
                  <td className="py-2 px-3">{phase.name}</td>
                  <td className="py-2 px-3 text-gray-600">{phase.description || '-'}</td>
                  <td className="py-2 px-3 text-right">{formatAmount(phase.amount, language)}</td>
                </tr>
              ))}
              <tr className="bg-gray-900 text-white">
                <td colSpan={2} className="py-2 px-3 font-bold">{t('table.total')} ({t('unit.vatExcluded')})</td>
                <td className="py-2 px-3 text-right font-bold">{formatAmount(totalPhaseAmount, language)}</td>
              </tr>
            </tbody>
          </table>
        </section>

        {quote.paymentTerms.some(term => term.condition) && (
          <section className="mb-10">
            <h2 className="text-lg font-bold mb-4 pb-2 border-b border-gray-300">6. {t('section.paymentTerms')}</h2>
            <table className="w-full text-sm border border-gray-300">
              <thead>
                <tr className="bg-gray-100">
                  <th className="text-left py-2 px-3 border-b border-gray-300 font-bold">{t('table.timing')}</th>
                  <th className="text-left py-2 px-3 border-b border-gray-300 font-bold">{t('table.condition')}</th>
                  <th className="text-right py-2 px-3 border-b border-gray-300 font-bold">{t('table.amount')}</th>
                </tr>
              </thead>
              <tbody>
                {quote.paymentTerms.filter(term => term.condition).map((term) => (
                  <tr key={term.id} className="border-b border-gray-200">
                    <td className="py-2 px-3">{term.phase}</td>
                    <td className="py-2 px-3 text-gray-600">{term.condition}</td>
                    <td className="py-2 px-3 text-right">{formatAmount(term.amount, language)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>
        )}

        {quote.schedule.some(s => s.phase) && (
          <section className="mb-10">
            <h2 className="text-lg font-bold mb-4 pb-2 border-b border-gray-300">7. {t('section.timeline')}</h2>
            <table className="w-full text-sm border border-gray-300">
              <thead>
                <tr className="bg-gray-100">
                  <th className="text-left py-2 px-3 border-b border-gray-300 font-bold">{t('table.phase')}</th>
                  <th className="text-left py-2 px-3 border-b border-gray-300 font-bold">{t('table.duration')}</th>
                  <th className="text-left py-2 px-3 border-b border-gray-300 font-bold">{t('table.deliverable')}</th>
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

        {quote.terms.some(term => term.label) && (
          <section className="mb-10">
            <h2 className="text-lg font-bold mb-4 pb-2 border-b border-gray-300">8. {t('section.terms')}</h2>
            <table className="w-full text-sm">
              <tbody>
                {quote.terms.filter(term => term.label).map((term) => (
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
            <h2 className="text-lg font-bold mb-4 pb-2 border-b border-gray-300">9. {t('section.expansions')}</h2>
            <p className="text-sm text-gray-600 mb-4 italic">
              {language === 'ko' ? '다음 기능은 향후 확장 옵션으로 제공됩니다:' : 'The following features are available as future enhancements:'}
            </p>
            <table className="w-full text-sm border border-gray-300">
              <thead>
                <tr className="bg-gray-100">
                  <th className="text-left py-2 px-3 border-b border-gray-300 font-bold">{t('table.feature')}</th>
                  <th className="text-left py-2 px-3 border-b border-gray-300 font-bold">{t('table.description')}</th>
                  <th className="text-right py-2 px-3 border-b border-gray-300 font-bold">{t('table.estCost')}</th>
                </tr>
              </thead>
              <tbody>
                {quote.expansions.filter(e => e.feature).map((exp) => (
                  <tr key={exp.id} className="border-b border-gray-200">
                    <td className="py-2 px-3">{exp.feature}</td>
                    <td className="py-2 px-3 text-gray-600">{exp.description}</td>
                    <td className="py-2 px-3 text-right">{formatAmount(exp.amount, language)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>
        )}

        <footer className="text-center pt-12 border-t-2 border-gray-900 mt-16">
          <p className="text-sm text-gray-500 mb-2">
            {t('section.footer1')}
          </p>
          <p className="text-sm text-gray-500">
            {t('section.footer2')}
          </p>
          <div className="mt-12 pt-8">
            <div className="inline-block text-left">
              <div className="border-t border-gray-400 pt-2 w-48">
                <p className="text-sm font-medium">{language === 'ko' ? '서명' : 'Authorized Signature'}</p>
                <p className="text-xs text-gray-500">{language === 'ko' ? '날짜' : 'Date'}: _______________</p>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  )
}
