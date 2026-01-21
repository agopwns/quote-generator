'use client'

import { UseFormReturn, useFieldArray, useWatch } from 'react-hook-form'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { QuoteFormData } from '@/lib/schema'
import { Plus, X, GripVertical } from 'lucide-react'

interface PhaseEditorProps {
  form: UseFormReturn<QuoteFormData>
}

const STATUS_LABELS: Record<string, { label: string; color: string }> = {
  visual: { label: '시각', color: 'bg-blue-100 text-blue-700' },
  working: { label: '동작', color: 'bg-green-100 text-green-700' },
  infra: { label: '인프라', color: 'bg-purple-100 text-purple-700' },
  docs: { label: '문서', color: 'bg-yellow-100 text-yellow-700' },
  stabilization: { label: '안정화', color: 'bg-orange-100 text-orange-700' },
}

function formatAmount(amount: number): string {
  if (amount >= 10000) {
    return `${(amount / 10000).toLocaleString()}억원`
  }
  return `${amount.toLocaleString()}만원`
}

export function PhaseEditor({ form }: PhaseEditorProps) {
  const { control, register, setValue } = form

  const { fields: phases, append: appendPhase, remove: removePhase } = useFieldArray({
    control,
    name: 'phases',
  })

  const watchedPhases = useWatch({ control, name: 'phases' })
  const totalAmount = watchedPhases?.reduce((sum, phase) => sum + (phase?.amount || 0), 0) || 0

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">개발 단계 (Phase)</h2>
        <div className="flex items-center gap-4">
          <span className="text-sm text-muted-foreground">
            총 합계: <span className="font-bold text-foreground">{formatAmount(totalAmount)}</span>
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
            페이즈 추가
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
  const { control, register, setValue } = form

  const { fields: items, append: appendItem, remove: removeItem } = useFieldArray({
    control,
    name: `phases.${phaseIndex}.items`,
  })

  const watchedAmount = useWatch({ control, name: `phases.${phaseIndex}.amount` })

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
                placeholder="금액"
                {...register(`phases.${phaseIndex}.amount`, { valueAsNumber: true })}
              />
              <span className="text-sm text-muted-foreground">만원</span>
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
          placeholder="목표: 예) 앱 설치 → 로그인 → 홈 화면 진입 가능"
          {...register(`phases.${phaseIndex}.description`)}
        />
      </CardHeader>
      <CardContent className="space-y-2">
        {items.map((item, itemIndex) => (
          <div key={item.id} className="flex items-center gap-2">
            <Input
              placeholder="항목명"
              className="flex-1"
              {...register(`phases.${phaseIndex}.items.${itemIndex}.name`)}
            />
            <Input
              placeholder="상세 (선택)"
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
        <Button
          type="button"
          variant="ghost"
          size="sm"
          className="w-full"
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
          항목 추가
        </Button>
      </CardContent>
    </Card>
  )
}
