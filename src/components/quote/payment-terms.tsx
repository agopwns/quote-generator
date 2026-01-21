'use client'

import { UseFormReturn, useFieldArray, useWatch } from 'react-hook-form'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { QuoteFormData } from '@/lib/schema'
import { Plus, X } from 'lucide-react'

interface PaymentTermsProps {
  form: UseFormReturn<QuoteFormData>
}

export function PaymentTerms({ form }: PaymentTermsProps) {
  const { control, register } = form

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'paymentTerms',
  })

  const watchedTerms = useWatch({ control, name: 'paymentTerms' })
  const totalAmount = watchedTerms?.reduce((sum, term) => sum + (term?.amount || 0), 0) || 0

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-lg">결제 조건</CardTitle>
            <p className="text-sm text-muted-foreground mt-1">
              합계: {totalAmount.toLocaleString()}만원
            </p>
          </div>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() =>
              append({ id: crypto.randomUUID(), phase: '', condition: '', amount: 0 })
            }
          >
            <Plus className="h-4 w-4 mr-1" />
            추가
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-2">
        {fields.map((field, index) => (
          <div key={field.id} className="flex gap-2">
            <Input
              placeholder="시점 (예: 1차)"
              className="w-24"
              {...register(`paymentTerms.${index}.phase`)}
            />
            <Input
              placeholder="조건 (예: 계약 체결 시)"
              className="flex-1"
              {...register(`paymentTerms.${index}.condition`)}
            />
            <div className="flex items-center gap-1">
              <Input
                type="number"
                placeholder="금액"
                className="w-28 text-right"
                {...register(`paymentTerms.${index}.amount`, { valueAsNumber: true })}
              />
              <span className="text-sm text-muted-foreground">만원</span>
            </div>
            {fields.length > 1 && (
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={() => remove(index)}
              >
                <X className="h-4 w-4" />
              </Button>
            )}
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
