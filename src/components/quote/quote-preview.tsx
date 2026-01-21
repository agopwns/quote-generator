'use client'

import { Quote } from '@/lib/types'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

interface QuotePreviewProps {
  quote: Quote
}

const STATUS_LABELS: Record<string, string> = {
  visual: '✓ 시각',
  working: '✓ 동작',
  infra: '✓ 인프라',
  docs: '✓ 문서',
  stabilization: '✓ 안정화',
}

function formatAmount(amount: number): string {
  if (amount >= 10000) {
    return `${(amount / 10000).toLocaleString()}억원`
  }
  return `${amount.toLocaleString()}만원`
}

export function QuotePreview({ quote }: QuotePreviewProps) {
  const totalPhaseAmount = quote.phases.reduce((sum, p) => sum + p.amount, 0)

  return (
    <div className="bg-white text-gray-900 p-12 max-w-4xl mx-auto print:p-8">
      {/* 표지 */}
      <div className="text-center py-20 border-b-2 border-gray-200 mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">{quote.project.name || '프로젝트명'}</h1>
        <p className="text-xl text-gray-600 mb-8">{quote.project.subtitle}</p>
        {quote.project.description && (
          <p className="text-gray-500 mb-8">{quote.project.description}</p>
        )}
        <p className="text-gray-400">{quote.project.date}</p>
      </div>

      {/* 프로젝트 개요 */}
      <section className="mb-10">
        <h2 className="text-xl font-bold border-b-2 border-blue-500 pb-2 mb-4">
          <span className="text-blue-500 mr-2">01</span>프로젝트 개요
        </h2>
        <Table>
          <TableBody>
            <TableRow>
              <TableCell className="font-medium w-40 bg-gray-50">프로젝트명</TableCell>
              <TableCell>{quote.project.name}</TableCell>
            </TableRow>
            {quote.project.client && (
              <TableRow>
                <TableCell className="font-medium bg-gray-50">클라이언트</TableCell>
                <TableCell>{quote.project.client}</TableCell>
              </TableRow>
            )}
            <TableRow>
              <TableCell className="font-medium bg-gray-50">총 개발 비용</TableCell>
              <TableCell className="font-bold text-blue-600">
                {formatAmount(totalPhaseAmount)} (VAT 별도)
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </section>

      {/* 개발 범위 */}
      <section className="mb-10">
        <h2 className="text-xl font-bold border-b-2 border-blue-500 pb-2 mb-4">
          <span className="text-blue-500 mr-2">02</span>개발 범위
        </h2>
        <div className="grid grid-cols-2 gap-6">
          <div className="bg-green-50 border-2 border-green-500 rounded-lg p-4">
            <h4 className="font-bold text-green-700 mb-3">✓ 포함 항목</h4>
            <ul className="space-y-1">
              {quote.scope.includes.filter(i => i.value).map((item) => (
                <li key={item.id} className="text-sm">• {item.value}</li>
              ))}
            </ul>
          </div>
          <div className="bg-red-50 border-2 border-red-500 rounded-lg p-4">
            <h4 className="font-bold text-red-700 mb-3">✗ 제외 항목</h4>
            <ul className="space-y-1">
              {quote.scope.excludes.filter(i => i.value).map((item) => (
                <li key={item.id} className="text-sm">• {item.value}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* 기술 스택 */}
      {quote.techStack.some(t => t.name) && (
        <section className="mb-10">
          <h2 className="text-xl font-bold border-b-2 border-blue-500 pb-2 mb-4">
            <span className="text-blue-500 mr-2">03</span>기술 스택
          </h2>
          <div className="flex flex-wrap gap-3">
            {quote.techStack.filter(t => t.name).map((tech) => (
              <div key={tech.id} className="bg-gray-100 px-4 py-2 rounded-lg text-sm">
                <span className="text-blue-600 font-medium">{tech.category}</span> {tech.name}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 단계별 개발 계획 */}
      <section className="mb-10">
        <h2 className="text-xl font-bold border-b-2 border-blue-500 pb-2 mb-4">
          <span className="text-blue-500 mr-2">04</span>단계별 개발 계획
        </h2>
        {quote.phases.map((phase) => (
          <div key={phase.id} className="bg-gray-50 rounded-lg p-6 mb-4 border-l-4 border-blue-500">
            <div className="flex justify-between items-start mb-2">
              <h3 className="text-lg font-bold">{phase.name}</h3>
              <span className="text-2xl font-bold text-blue-600">{formatAmount(phase.amount)}</span>
            </div>
            {phase.description && (
              <p className="text-gray-600 bg-white px-3 py-2 rounded mb-4 text-sm">
                🎯 목표: {phase.description}
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

      {/* 비용 요약 */}
      <section className="mb-10">
        <h2 className="text-xl font-bold border-b-2 border-blue-500 pb-2 mb-4">
          <span className="text-blue-500 mr-2">05</span>비용 요약
        </h2>
        <div className="bg-gradient-to-r from-gray-800 to-gray-600 text-white p-8 rounded-xl text-center mb-6">
          <p className="text-sm opacity-80 mb-2">총 개발 비용</p>
          <p className="text-4xl font-bold">{formatAmount(totalPhaseAmount)}</p>
          <p className="text-sm opacity-60 mt-2">VAT 별도</p>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>단계</TableHead>
              <TableHead>내용</TableHead>
              <TableHead className="text-right">금액</TableHead>
              <TableHead className="text-right">비율</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {quote.phases.map((phase) => (
              <TableRow key={phase.id}>
                <TableCell className="font-medium">{phase.name}</TableCell>
                <TableCell>{phase.description || '-'}</TableCell>
                <TableCell className="text-right">{formatAmount(phase.amount)}</TableCell>
                <TableCell className="text-right">
                  {totalPhaseAmount > 0 ? Math.round((phase.amount / totalPhaseAmount) * 100) : 0}%
                </TableCell>
              </TableRow>
            ))}
            <TableRow className="bg-gray-900 text-white">
              <TableCell colSpan={2} className="font-bold">총 합계</TableCell>
              <TableCell className="text-right font-bold">{formatAmount(totalPhaseAmount)}</TableCell>
              <TableCell className="text-right font-bold">100%</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </section>

      {/* 결제 조건 */}
      {quote.paymentTerms.some(t => t.condition) && (
        <section className="mb-10">
          <h2 className="text-xl font-bold border-b-2 border-blue-500 pb-2 mb-4">
            <span className="text-blue-500 mr-2">06</span>결제 조건
          </h2>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>시점</TableHead>
                <TableHead>조건</TableHead>
                <TableHead className="text-right">금액</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {quote.paymentTerms.filter(t => t.condition).map((term) => (
                <TableRow key={term.id}>
                  <TableCell className="font-medium">{term.phase}</TableCell>
                  <TableCell>{term.condition}</TableCell>
                  <TableCell className="text-right text-blue-600 font-bold">
                    {formatAmount(term.amount)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </section>
      )}

      {/* 개발 일정 */}
      {quote.schedule.some(s => s.phase) && (
        <section className="mb-10">
          <h2 className="text-xl font-bold border-b-2 border-blue-500 pb-2 mb-4">
            <span className="text-blue-500 mr-2">07</span>개발 일정
          </h2>
          <div className="relative pl-8">
            <div className="absolute left-2 top-0 bottom-0 w-0.5 bg-blue-500"></div>
            {quote.schedule.filter(s => s.phase).map((item, index) => (
              <div key={item.id} className="relative pb-6">
                <div className="absolute -left-6 top-1 w-4 h-4 bg-blue-500 rounded-full border-2 border-white shadow"></div>
                <h4 className="font-bold">{item.phase} ({item.duration})</h4>
                <p className="text-gray-600 text-sm">{item.deliverable}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 기타 조건 */}
      {quote.terms.some(t => t.label) && (
        <section className="mb-10">
          <h2 className="text-xl font-bold border-b-2 border-blue-500 pb-2 mb-4">
            <span className="text-blue-500 mr-2">08</span>기타 조건
          </h2>
          <Table>
            <TableBody>
              {quote.terms.filter(t => t.label).map((term) => (
                <TableRow key={term.id}>
                  <TableCell className="font-medium w-40 bg-gray-50">{term.label}</TableCell>
                  <TableCell>{term.value}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </section>
      )}

      {/* 향후 확장 옵션 */}
      {quote.expansions.some(e => e.feature) && (
        <section className="mb-10">
          <h2 className="text-xl font-bold border-b-2 border-blue-500 pb-2 mb-4">
            <span className="text-blue-500 mr-2">09</span>향후 확장 옵션
          </h2>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>기능</TableHead>
                <TableHead>설명</TableHead>
                <TableHead className="text-right">예상 비용</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {quote.expansions.filter(e => e.feature).map((exp) => (
                <TableRow key={exp.id}>
                  <TableCell className="font-medium">{exp.feature}</TableCell>
                  <TableCell>{exp.description}</TableCell>
                  <TableCell className="text-right">{formatAmount(exp.amount)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </section>
      )}

      {/* 푸터 */}
      <div className="text-center text-gray-400 text-sm pt-8 border-t border-gray-200">
        <p>본 제안서의 유효기간은 발행일로부터 30일입니다.</p>
        <p>문의사항이 있으시면 언제든 연락 주시기 바랍니다.</p>
      </div>
    </div>
  )
}
