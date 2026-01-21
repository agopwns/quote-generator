'use client'

import { useEffect, useRef } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { quoteSchema, QuoteFormData } from '@/lib/schema'
import { useQuoteStore } from '@/lib/store'
import { DEFAULT_QUOTE } from '@/lib/types'
import { ProjectInfo } from './project-info'
import { ScopeEditor } from './scope-editor'
import { TechStack } from './tech-stack'
import { PhaseEditor } from './phase-editor'
import { PaymentTerms } from './payment-terms'
import { ScheduleEditor } from './schedule-editor'
import { TermsEditor } from './terms-editor'
import { ExpansionsEditor } from './expansions-editor'

export function QuoteForm() {
  const { draft, currentId, setDraft } = useQuoteStore()
  const prevIdRef = useRef<string | null>(currentId)

  const form = useForm<QuoteFormData>({
    resolver: zodResolver(quoteSchema),
    defaultValues: draft || DEFAULT_QUOTE,
  })

  useEffect(() => {
    if (prevIdRef.current !== currentId) {
      form.reset(draft)
      prevIdRef.current = currentId
    }
  }, [currentId, draft, form])

  useEffect(() => {
    const subscription = form.watch((value) => {
      if (value) {
        setDraft(value as QuoteFormData)
      }
    })
    return () => subscription.unsubscribe()
  }, [form, setDraft])

  return (
    <form className="space-y-6">
      <ProjectInfo form={form} />
      <ScopeEditor form={form} />
      <TechStack form={form} />
      <PhaseEditor form={form} />
      <PaymentTerms form={form} />
      <ScheduleEditor form={form} />
      <TermsEditor form={form} />
      <ExpansionsEditor form={form} />
    </form>
  )
}
