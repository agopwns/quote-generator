'use client'

import { Quote } from '@/lib/types'
import { Language, getTranslation } from '@/lib/i18n'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { getThemeStyleObject } from '@/lib/theme-utils'

interface TemplateProps {
  quote: Quote
  language: Language
  colorTheme?: string
  darkMode?: boolean
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

export function ShadcnTemplate({ quote, language, colorTheme = 'default', darkMode = false }: TemplateProps) {
  const t = getTranslation(language)
  const totalPhaseAmount = quote.phases.reduce((sum, p) => sum + p.amount, 0)
  const themeStyles = getThemeStyleObject(colorTheme, darkMode ? 'dark' : 'light')

  return (
    <div 
      className={`min-h-screen p-8 print:p-4 ${darkMode ? 'dark' : ''}`}
      style={{
        ...themeStyles,
        backgroundColor: darkMode ? 'var(--background)' : undefined,
        color: darkMode ? 'var(--foreground)' : undefined,
      }}
    >
      <div className={`max-w-6xl mx-auto space-y-6 ${!darkMode ? 'bg-slate-50' : ''}`} style={!darkMode ? {} : { backgroundColor: 'var(--background)' }}>
        <Card className="border-none shadow-lg">
          <CardHeader className="text-center pb-2">
            <CardTitle className="text-3xl font-bold tracking-tight">
              {quote.project.name || (language === 'ko' ? '프로젝트명' : 'Project Name')}
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
              <CardTitle className="text-base text-green-700">✓ {t('section.included')}</CardTitle>
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
              <CardTitle className="text-base text-red-700">✗ {t('section.excluded')}</CardTitle>
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

        {quote.techStack.some(tech => tech.name) && (
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">{t('section.techStack')}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {quote.techStack.filter(tech => tech.name).map((tech) => (
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
            <CardTitle className="text-lg">{t('section.phases')}</CardTitle>
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
                  <Badge className="text-lg px-3 py-1">{formatAmount(phase.amount, language)}</Badge>
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
            <p className="text-slate-400 text-sm mb-2">{t('section.totalCost')}</p>
            <p className="text-4xl font-bold mb-2">{formatAmount(totalPhaseAmount, language)}</p>
            <p className="text-slate-500 text-sm">{t('unit.vatExcluded')}</p>
          </CardContent>
        </Card>

        {quote.paymentTerms.some(term => term.condition) && (
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">{t('section.paymentTerms')}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {quote.paymentTerms.filter(term => term.condition).map((term) => (
                  <div key={term.id} className="flex items-center justify-between p-3 rounded-lg bg-slate-50">
                    <div>
                      <span className="font-medium">{term.phase}</span>
                      <span className="text-muted-foreground text-sm ml-2">{term.condition}</span>
                    </div>
                    <Badge variant="outline" className="font-bold">{formatAmount(term.amount, language)}</Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {quote.schedule.some(s => s.phase) && (
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">{t('section.timeline')}</CardTitle>
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

        {quote.terms.some(term => term.label) && (
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">{t('section.terms')}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-3">
                {quote.terms.filter(term => term.label).map((term) => (
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
              <CardTitle className="text-lg">{t('section.expansions')}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {quote.expansions.filter(e => e.feature).map((exp) => (
                  <div key={exp.id} className="flex items-center justify-between p-3 rounded-lg border border-dashed">
                    <div>
                      <span className="font-medium">{exp.feature}</span>
                      <span className="text-muted-foreground text-sm ml-2">{exp.description}</span>
                    </div>
                    <span className="text-muted-foreground">{formatAmount(exp.amount, language)}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        <div className="text-center text-muted-foreground text-sm py-4">
          <p>{t('section.footer1')}</p>
        </div>
      </div>
    </div>
  )
}
