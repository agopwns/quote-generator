'use client'

import { UseFormReturn, useFieldArray } from 'react-hook-form'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { QuoteFormData } from '@/lib/schema'
import { Plus, X } from 'lucide-react'

interface TechStackProps {
  form: UseFormReturn<QuoteFormData>
}

export function TechStack({ form }: TechStackProps) {
  const { control, register } = form

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'techStack',
  })

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">기술 스택</CardTitle>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => append({ id: crypto.randomUUID(), category: '', name: '' })}
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
              placeholder="분류 (예: Frontend)"
              className="w-1/3"
              {...register(`techStack.${index}.category`)}
            />
            <Input
              placeholder="기술명 (예: Flutter 3.x)"
              {...register(`techStack.${index}.name`)}
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
