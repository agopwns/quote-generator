'use client'

import { UseFormReturn, useFieldArray } from 'react-hook-form'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { QuoteFormData } from '@/lib/schema'
import { Plus, X } from 'lucide-react'

interface ExpansionsEditorProps {
  form: UseFormReturn<QuoteFormData>
}

export function ExpansionsEditor({ form }: ExpansionsEditorProps) {
  const { control, register } = form

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'expansions',
  })

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">향후 확장 옵션</CardTitle>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() =>
              append({ id: crypto.randomUUID(), feature: '', description: '', amount: 0 })
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
              placeholder="기능 (예: 푸시 알림)"
              className="w-1/4"
              {...register(`expansions.${index}.feature`)}
            />
            <Input
              placeholder="설명 (예: FCM 연동)"
              className="flex-1"
              {...register(`expansions.${index}.description`)}
            />
            <div className="flex items-center gap-1">
              <Input
                type="number"
                placeholder="금액"
                className="w-28 text-right"
                {...register(`expansions.${index}.amount`, { valueAsNumber: true })}
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
