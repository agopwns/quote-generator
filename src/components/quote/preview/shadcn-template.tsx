'use client'

import { Quote } from '@/lib/types'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'

interface TemplateProps {
  quote: Quote
}

function formatAmount(amount: number): string {
  if (amount >= 10000) {
    return `${(amount / 10000).toLocaleString()}억원`
  }
  return `${amount.toLocaleString()}만원`
}

export function ShadcnTemplate({ quote }: TemplateProps) {
  const totalPhaseAmount = quote.phases.reduce((sum, p) => sum + p.amount, 0)

  return (
    <div className="bg-slate-50 min-h-screen p-8 print:p-4 print:bg-white">
      <div className="max-w-6xl mx-auto space-y-6">
        <Card className="border-none shadow-lg">
          <CardHeader className="text-center pb-2">
            <CardTitle className="text-3xl font-bold tracking-tight">
              {quote.project.name || 'Project Name'}
            </CardTitle>
            <p className="text-muted-foreground">{quote.project.subtitle}</p>
          </CardHeader>
          <CardContent className="text-center">
            {quote.project.description && (
              <p className="text-sm text-muted-foreground mb-4">{quote.project.description}</p>
            )}
            <div className="flex justify-center gap-4 text-sm">
              <Badge variant="outline">{quote.project.date}</Badge>
              {quote.project.client && <Badge variant="secondary">{quote.project.client}</Badge>}
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-2 gap-4">
          <Card className="border-green-200 bg-green-50/50">
            <CardHeader className="pb-2">
              <CardTitle className="text-base text-green-700">✓ Included</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-1.5">
                {quote.scope.includes.filter(i => i.value).map((item) => (
                  <li key={item.id} className="text-sm flex items-start gap-2">
                    <span className="text-green-500 mt-0.5">•</span>
                    {item.value}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card className="border-red-200 bg-red-50/50">
            <CardHeader className="pb-2">
              <CardTitle className="text-base text-red-700">✗ Excluded</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-1.5">
                {quote.scope.excludes.filter(i => i.value).map((item) => (
                  <li key={item.id} className="text-sm flex items-start gap-2">
                    <span className="text-red-500 mt-0.5">•</span>
                    {item.value}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>

        {quote.techStack.some(t => t.name) && (
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Tech Stack</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {quote.techStack.filter(t => t.name).map((tech) => (
                  <Badge key={tech.id} variant="secondary" className="text-sm">
                    {tech.category}: {tech.name}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Development Phases</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {quote.phases.map((phase, idx) => (
              <div key={phase.id}>
                {idx > 0 && <Separator className="mb-4" />}
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="font-semibold">{phase.name}</h3>
                    {phase.description && (
                      <p className="text-sm text-muted-foreground">{phase.description}</p>
                    )}
                  </div>
                  <Badge className="text-lg px-3 py-1">{formatAmount(phase.amount)}</Badge>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {phase.items.filter(i => i.name).map((item) => (
                    <div key={item.id} className="flex items-center gap-2 text-sm p-2 rounded-md bg-slate-50">
                      <div className="w-2 h-2 rounded-full bg-primary"></div>
                      <span>{item.name}</span>
                      {item.detail && <span className="text-muted-foreground text-xs">({item.detail})</span>}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="bg-slate-900 text-white border-none">
          <CardContent className="py-8 text-center">
            <p className="text-slate-400 text-sm mb-2">Total Development Cost</p>
            <p className="text-4xl font-bold mb-2">{formatAmount(totalPhaseAmount)}</p>
            <p className="text-slate-500 text-sm">VAT excluded</p>
          </CardContent>
        </Card>

        {quote.paymentTerms.some(t => t.condition) && (
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Payment Schedule</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {quote.paymentTerms.filter(t => t.condition).map((term) => (
                  <div key={term.id} className="flex items-center justify-between p-3 rounded-lg bg-slate-50">
                    <div>
                      <span className="font-medium">{term.phase}</span>
                      <span className="text-muted-foreground text-sm ml-2">{term.condition}</span>
                    </div>
                    <Badge variant="outline" className="font-bold">{formatAmount(term.amount)}</Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {quote.schedule.some(s => s.phase) && (
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Project Timeline</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="relative">
                <div className="absolute left-2 top-2 bottom-2 w-0.5 bg-primary/20"></div>
                <div className="space-y-4">
                  {quote.schedule.filter(s => s.phase).map((item) => (
                    <div key={item.id} className="flex items-start gap-4 pl-6 relative">
                      <div className="absolute left-0 top-1.5 w-4 h-4 rounded-full bg-primary border-2 border-white shadow"></div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <span className="font-medium">{item.phase}</span>
                          <Badge variant="outline" className="text-xs">{item.duration}</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">{item.deliverable}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {quote.terms.some(t => t.label) && (
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Terms & Conditions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-3">
                {quote.terms.filter(t => t.label).map((term) => (
                  <div key={term.id} className="p-3 rounded-lg bg-slate-50">
                    <p className="text-xs text-muted-foreground mb-1">{term.label}</p>
                    <p className="text-sm font-medium">{term.value}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {quote.expansions.some(e => e.feature) && (
          <Card className="border-dashed">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Future Expansion Options</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {quote.expansions.filter(e => e.feature).map((exp) => (
                  <div key={exp.id} className="flex items-center justify-between p-3 rounded-lg border border-dashed">
                    <div>
                      <span className="font-medium">{exp.feature}</span>
                      <span className="text-muted-foreground text-sm ml-2">{exp.description}</span>
                    </div>
                    <span className="text-muted-foreground">{formatAmount(exp.amount)}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        <div className="text-center text-muted-foreground text-sm py-4">
          <p>This proposal is valid for 30 days from the date of issue.</p>
        </div>
      </div>
    </div>
  )
}
