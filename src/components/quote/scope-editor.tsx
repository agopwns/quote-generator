'use client'

import { UseFormReturn, useFieldArray } from 'react-hook-form'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { QuoteFormData } from '@/lib/schema'
import { Plus, X } from 'lucide-react'

interface ScopeEditorProps {
  form: UseFormReturn<QuoteFormData>
}

export function ScopeEditor({ form }: ScopeEditorProps) {
  const { control, register } = form

  const includesArray = useFieldArray({
    control,
    name: 'scope.includes',
  })

  const excludesArray = useFieldArray({
    control,
    name: 'scope.excludes',
  })

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">개발 범위</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-green-600">✓ 포함 항목</span>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => includesArray.append({ id: crypto.randomUUID(), value: '' })}
            >
              <Plus className="h-4 w-4 mr-1" />
              추가
            </Button>
          </div>
          <div className="space-y-2">
            {includesArray.fields.map((field, index) => (
              <div key={field.id} className="flex gap-2">
                <Input
                  placeholder="포함할 기능"
                  {...register(`scope.includes.${index}.value`)}
                />
                {includesArray.fields.length > 1 && (
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => includesArray.remove(index)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-red-600">✗ 제외 항목</span>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => excludesArray.append({ id: crypto.randomUUID(), value: '' })}
            >
              <Plus className="h-4 w-4 mr-1" />
              추가
            </Button>
          </div>
          <div className="space-y-2">
            {excludesArray.fields.map((field, index) => (
              <div key={field.id} className="flex gap-2">
                <Input
                  placeholder="제외할 기능"
                  {...register(`scope.excludes.${index}.value`)}
                />
                {excludesArray.fields.length > 1 && (
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => excludesArray.remove(index)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                )}
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
