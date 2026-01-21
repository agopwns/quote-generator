'use client'

import { Quote } from '@/lib/types'
import { Language, getTranslation } from '@/lib/i18n'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

interface TemplateProps {
  quote: Quote
  language: Language
}

const getStatusLabels = (language: Language): Record<string, string> => ({
  visual: language === 'ko' ? '✓ 시각' : '✓ Visual',
  working: language === 'ko' ? '✓ 동작' : '✓ Logic',
  infra: language === 'ko' ? '✓ 인프라' : '✓ Infra',
  docs: language === 'ko' ? '✓ 문서' : '✓ Docs',
  stabilization: '✓ QA',
})

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

export function DefaultTemplate({ quote, language }: TemplateProps) {
  const t = getTranslation(language)
  const STATUS_LABELS = getStatusLabels(language)
  const totalPhaseAmount = quote.phases.reduce((sum, p) => sum + p.amount, 0)

  return (
    <div className="bg-white text-gray-900 p-12 max-w-7xl mx-auto print:p-8">
      <div className="text-center py-20 border-b-2 border-gray-200 mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">{quote.project.name || (language === 'ko' ? '프로젝트명' : 'Project Name')}</h1>
        <p className="text-xl text-gray-600 mb-8">{quote.project.subtitle}</p>
        {quote.project.description && (
          <p className="text-gray-500 mb-8">{quote.project.description}</p>
        )}
        <p className="text-gray-400">{quote.project.date}</p>
      </div>

      <section className="mb-10">
        <h2 className="text-xl font-bold border-b-2 border-blue-500 pb-2 mb-4">
          <span className="text-blue-500 mr-2">01</span>{t('section.overview')}
        </h2>
        <Table>
          <TableBody>
            <TableRow>
              <TableCell className="font-medium w-40 bg-gray-50">{t('table.project')}</TableCell>
              <TableCell>{quote.project.name}</TableCell>
            </TableRow>
            {quote.project.client && (
              <TableRow>
                <TableCell className="font-medium bg-gray-50">{t('table.client')}</TableCell>
                <TableCell>{quote.project.client}</TableCell>
              </TableRow>
            )}
            <TableRow>
              <TableCell className="font-medium bg-gray-50">{t('table.totalCost')}</TableCell>
              <TableCell className="font-bold text-blue-600">
                {formatAmount(totalPhaseAmount, language)} ({t('unit.vatExcluded')})
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold border-b-2 border-blue-500 pb-2 mb-4">
          <span className="text-blue-500 mr-2">02</span>{t('section.scope')}
        </h2>
        <div className="grid grid-cols-2 gap-6">
          <div className="bg-green-50 border-2 border-green-500 rounded-lg p-4">
            <h4 className="font-bold text-green-700 mb-3">✓ {t('section.included')}</h4>
            <ul className="space-y-1">
              {quote.scope.includes.filter(i => i.value).map((item) => (
                <li key={item.id} className="text-sm">• {item.value}</li>
              ))}
            </ul>
          </div>
          <div className="bg-red-50 border-2 border-red-500 rounded-lg p-4">
            <h4 className="font-bold text-red-700 mb-3">✗ {t('section.excluded')}</h4>
            <ul className="space-y-1">
              {quote.scope.excludes.filter(i => i.value).map((item) => (
                <li key={item.id} className="text-sm">• {item.value}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {quote.techStack.some(tech => tech.name) && (
        <section className="mb-10">
          <h2 className="text-xl font-bold border-b-2 border-blue-500 pb-2 mb-4">
            <span className="text-blue-500 mr-2">03</span>{t('section.techStack')}
          </h2>
          <div className="flex flex-wrap gap-3">
            {quote.techStack.filter(tech => tech.name).map((tech) => (
              <div key={tech.id} className="bg-gray-100 px-4 py-2 rounded-lg text-sm">
                <span className="text-blue-600 font-medium">{tech.category}</span> {tech.name}
              </div>
            ))}
          </div>
        </section>
      )}

      <section className="mb-10">
        <h2 className="text-xl font-bold border-b-2 border-blue-500 pb-2 mb-4">
          <span className="text-blue-500 mr-2">04</span>{t('section.phases')}
        </h2>
        {quote.phases.map((phase) => (
          <div key={phase.id} className="bg-gray-50 rounded-lg p-6 mb-4 border-l-4 border-blue-500">
            <div className="flex justify-between items-start mb-2">
              <h3 className="text-lg font-bold">{phase.name}</h3>
              <span className="text-2xl font-bold text-blue-600">{formatAmount(phase.amount, language)}</span>
            </div>
            {phase.description && (
              <p className="text-gray-600 bg-white px-3 py-2 rounded mb-4 text-sm">
                🎯 {language === 'ko' ? '목표' : 'Goal'}: {phase.description}
              </p>
            )}
            <ul className="space-y-2">
              {phase.items.filter(i => i.name).map((item) => (
                <li key={item.id} className="flex justify-between py-1 border-b border-gray-200 last:border-0">
                  <span>{item.name} {item.detail && <span className="text-gray-500">- {item.detail}</span>}</span>
                  <span className="text-green-600 text-sm">{STATUS_LABELS[item.status]}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold border-b-2 border-blue-500 pb-2 mb-4">
          <span className="text-blue-500 mr-2">05</span>{t('section.costSummary')}
        </h2>
        <div className="bg-gradient-to-r from-gray-800 to-gray-600 text-white p-8 rounded-xl text-center mb-6">
          <p className="text-sm opacity-80 mb-2">{t('section.totalCost')}</p>
          <p className="text-4xl font-bold">{formatAmount(totalPhaseAmount, language)}</p>
          <p className="text-sm opacity-60 mt-2">{t('unit.vatExcluded')}</p>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>{t('table.phase')}</TableHead>
              <TableHead>{t('table.description')}</TableHead>
              <TableHead className="text-right">{t('table.amount')}</TableHead>
              <TableHead className="text-right">{t('table.percent')}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {quote.phases.map((phase) => (
              <TableRow key={phase.id}>
                <TableCell className="font-medium">{phase.name}</TableCell>
                <TableCell>{phase.description || '-'}</TableCell>
                <TableCell className="text-right">{formatAmount(phase.amount, language)}</TableCell>
                <TableCell className="text-right">
                  {totalPhaseAmount > 0 ? Math.round((phase.amount / totalPhaseAmount) * 100) : 0}%
                </TableCell>
              </TableRow>
            ))}
            <TableRow className="bg-gray-900 text-white">
              <TableCell colSpan={2} className="font-bold">{t('table.total')}</TableCell>
              <TableCell className="text-right font-bold">{formatAmount(totalPhaseAmount, language)}</TableCell>
              <TableCell className="text-right font-bold">100%</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </section>

      {quote.paymentTerms.some(term => term.condition) && (
        <section className="mb-10">
          <h2 className="text-xl font-bold border-b-2 border-blue-500 pb-2 mb-4">
            <span className="text-blue-500 mr-2">06</span>{t('section.paymentTerms')}
          </h2>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>{t('table.timing')}</TableHead>
                <TableHead>{t('table.condition')}</TableHead>
                <TableHead className="text-right">{t('table.amount')}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {quote.paymentTerms.filter(term => term.condition).map((term) => (
                <TableRow key={term.id}>
                  <TableCell className="font-medium">{term.phase}</TableCell>
                  <TableCell>{term.condition}</TableCell>
                  <TableCell className="text-right text-blue-600 font-bold">
                    {formatAmount(term.amount, language)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </section>
      )}

      {quote.schedule.some(s => s.phase) && (
        <section className="mb-10">
          <h2 className="text-xl font-bold border-b-2 border-blue-500 pb-2 mb-4">
            <span className="text-blue-500 mr-2">07</span>{t('section.timeline')}
          </h2>
          <div className="relative pl-8">
            <div className="absolute left-2 top-0 bottom-0 w-0.5 bg-blue-500"></div>
            {quote.schedule.filter(s => s.phase).map((item) => (
              <div key={item.id} className="relative pb-6">
                <div className="absolute -left-6 top-1 w-4 h-4 bg-blue-500 rounded-full border-2 border-white shadow"></div>
                <h4 className="font-bold">{item.phase} ({item.duration})</h4>
                <p className="text-gray-600 text-sm">{item.deliverable}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {quote.terms.some(term => term.label) && (
        <section className="mb-10">
          <h2 className="text-xl font-bold border-b-2 border-blue-500 pb-2 mb-4">
            <span className="text-blue-500 mr-2">08</span>{t('section.terms')}
          </h2>
          <Table>
            <TableBody>
              {quote.terms.filter(term => term.label).map((term) => (
                <TableRow key={term.id}>
                  <TableCell className="font-medium w-40 bg-gray-50">{term.label}</TableCell>
                  <TableCell>{term.value}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </section>
      )}

      {quote.expansions.some(e => e.feature) && (
        <section className="mb-10">
          <h2 className="text-xl font-bold border-b-2 border-blue-500 pb-2 mb-4">
            <span className="text-blue-500 mr-2">09</span>{t('section.expansions')}
          </h2>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>{t('table.feature')}</TableHead>
                <TableHead>{t('table.description')}</TableHead>
                <TableHead className="text-right">{t('table.estCost')}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {quote.expansions.filter(e => e.feature).map((exp) => (
                <TableRow key={exp.id}>
                  <TableCell className="font-medium">{exp.feature}</TableCell>
                  <TableCell>{exp.description}</TableCell>
                  <TableCell className="text-right">{formatAmount(exp.amount, language)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </section>
      )}

      <div className="text-center text-gray-400 text-sm pt-8 border-t border-gray-200">
        <p>{t('section.footer1')}</p>
        <p>{t('section.footer2')}</p>
      </div>
    </div>
  )
}
