'use client'

import { UseFormReturn, useFieldArray } from 'react-hook-form'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { QuoteFormData } from '@/lib/schema'
import { Plus, X } from 'lucide-react'

interface ScheduleEditorProps {
  form: UseFormReturn<QuoteFormData>
}

export function ScheduleEditor({ form }: ScheduleEditorProps) {
  const { control, register } = form

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'schedule',
  })

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">개발 일정</CardTitle>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() =>
              append({ id: crypto.randomUUID(), phase: '', duration: '', deliverable: '' })
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
              placeholder="단계 (예: Phase 1)"
              className="w-28"
              {...register(`schedule.${index}.phase`)}
            />
            <Input
              placeholder="기간 (예: 3주)"
              className="w-24"
              {...register(`schedule.${index}.duration`)}
            />
            <Input
              placeholder="납품물 (예: TestFlight 빌드)"
              className="flex-1"
              {...register(`schedule.${index}.deliverable`)}
            />
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
