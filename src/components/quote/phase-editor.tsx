'use client'

import { UseFormReturn, useFieldArray, useWatch } from 'react-hook-form'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { QuoteFormData } from '@/lib/schema'
import { DevItemPreset } from '@/lib/presets'
import { PresetSelector } from './preset-selector'
import { Plus, X, GripVertical } from 'lucide-react'
import { useQuoteStore } from '@/lib/store'
import { getTranslation, Language } from '@/lib/i18n'

interface PhaseEditorProps {
  form: UseFormReturn<QuoteFormData>
}

const getStatusLabels = (language: Language) => ({
  visual: { label: language === 'ko' ? '시각' : 'Visual', color: 'bg-blue-100 text-blue-700' },
  working: { label: language === 'ko' ? '동작' : 'Logic', color: 'bg-green-100 text-green-700' },
  infra: { label: language === 'ko' ? '인프라' : 'Infra', color: 'bg-purple-100 text-purple-700' },
  docs: { label: language === 'ko' ? '문서' : 'Docs', color: 'bg-yellow-100 text-yellow-700' },
  stabilization: { label: language === 'ko' ? '안정화' : 'QA', color: 'bg-orange-100 text-orange-700' },
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

export function PhaseEditor({ form }: PhaseEditorProps) {
  const { control, register, setValue } = form
  const { language } = useQuoteStore()
  const t = getTranslation(language)

  const { fields: phases, append: appendPhase, remove: removePhase } = useFieldArray({
    control,
    name: 'phases',
  })

  const watchedPhases = useWatch({ control, name: 'phases' })
  const totalAmount = watchedPhases?.reduce((sum, phase) => sum + (phase?.amount || 0), 0) || 0

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">{t('form.phase')}</h2>
        <div className="flex items-center gap-4">
          <span className="text-sm text-muted-foreground">
            {t('form.totalSum')}: <span className="font-bold text-foreground">{formatAmount(totalAmount, language)}</span>
          </span>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() =>
              appendPhase({
                id: crypto.randomUUID(),
                name: `Phase ${phases.length + 1}`,
                description: '',
                amount: 0,
                items: [{ id: crypto.randomUUID(), name: '', detail: '', status: 'working' }],
              })
            }
          >
            <Plus className="h-4 w-4 mr-1" />
            {t('form.addPhase')}
          </Button>
        </div>
      </div>

      {phases.map((phase, phaseIndex) => (
        <PhaseCard
          key={phase.id}
          form={form}
          phaseIndex={phaseIndex}
          onRemove={() => removePhase(phaseIndex)}
          canRemove={phases.length > 1}
        />
      ))}
    </div>
  )
}

interface PhaseCardProps {
  form: UseFormReturn<QuoteFormData>
  phaseIndex: number
  onRemove: () => void
  canRemove: boolean
}

function PhaseCard({ form, phaseIndex, onRemove, canRemove }: PhaseCardProps) {
  const { control, register, setValue, getValues } = form
  const { language } = useQuoteStore()
  const t = getTranslation(language)
  const STATUS_LABELS = getStatusLabels(language)

  const { fields: items, append: appendItem, remove: removeItem } = useFieldArray({
    control,
    name: `phases.${phaseIndex}.items`,
  })

  const watchedAmount = useWatch({ control, name: `phases.${phaseIndex}.amount` })

  const handlePresetSelect = (preset: DevItemPreset) => {
    appendItem({
      id: crypto.randomUUID(),
      name: preset.name,
      detail: preset.detail,
      status: preset.status,
    })
    const currentAmount = getValues(`phases.${phaseIndex}.amount`) || 0
    setValue(`phases.${phaseIndex}.amount`, currentAmount + preset.suggestedAmount)
  }

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <GripVertical className="h-5 w-5 text-muted-foreground cursor-grab" />
            <Input
              className="w-40 font-semibold"
              {...register(`phases.${phaseIndex}.name`)}
            />
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <Input
                type="number"
                className="w-32 text-right"
                placeholder={t('form.amount')}
                {...register(`phases.${phaseIndex}.amount`, { valueAsNumber: true })}
              />
              <span className="text-sm text-muted-foreground">{t('unit.won')}</span>
            </div>
            {canRemove && (
              <Button type="button" variant="ghost" size="icon" onClick={onRemove}>
                <X className="h-4 w-4" />
              </Button>
            )}
          </div>
        </div>
        <Input
          className="mt-2"
          placeholder={t('form.goalPlaceholder')}
          {...register(`phases.${phaseIndex}.description`)}
        />
      </CardHeader>
      <CardContent className="space-y-2">
        {items.map((item, itemIndex) => (
          <div key={item.id} className="flex items-center gap-2">
            <Input
              placeholder={t('form.itemName')}
              className="flex-1"
              {...register(`phases.${phaseIndex}.items.${itemIndex}.name`)}
            />
            <Input
              placeholder={t('form.itemDetail')}
              className="flex-1"
              {...register(`phases.${phaseIndex}.items.${itemIndex}.detail`)}
            />
            <select
              className="h-9 rounded-md border border-input bg-background px-3 text-sm"
              {...register(`phases.${phaseIndex}.items.${itemIndex}.status`)}
            >
              {Object.entries(STATUS_LABELS).map(([key, { label }]) => (
                <option key={key} value={key}>
                  {label}
                </option>
              ))}
            </select>
            {items.length > 1 && (
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={() => removeItem(itemIndex)}
              >
                <X className="h-4 w-4" />
              </Button>
            )}
          </div>
        ))}
        <div className="flex gap-2">
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="flex-1"
            onClick={() =>
              appendItem({
                id: crypto.randomUUID(),
                name: '',
                detail: '',
                status: 'working',
              })
            }
          >
            <Plus className="h-4 w-4 mr-1" />
            {t('form.addItem')}
          </Button>
          <PresetSelector onSelect={handlePresetSelect} />
        </div>
      </CardContent>
    </Card>
  )
}
