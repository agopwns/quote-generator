'use client'

import { UseFormReturn } from 'react-hook-form'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { QuoteFormData } from '@/lib/schema'

interface ProjectInfoProps {
  form: UseFormReturn<QuoteFormData>
}

export function ProjectInfo({ form }: ProjectInfoProps) {
  const { register } = form

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">프로젝트 정보</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="project.name">프로젝트명 *</Label>
            <Input
              id="project.name"
              placeholder="예: InMuu 플랫폼"
              {...register('project.name')}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="project.subtitle">부제목</Label>
            <Input
              id="project.subtitle"
              placeholder="예: 모바일 앱 개발 제안서"
              {...register('project.subtitle')}
            />
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="project.description">설명</Label>
          <Textarea
            id="project.description"
            placeholder="프로젝트에 대한 간단한 설명"
            {...register('project.description')}
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="project.date">날짜</Label>
            <Input
              id="project.date"
              type="month"
              {...register('project.date')}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="project.client">클라이언트</Label>
            <Input
              id="project.client"
              placeholder="클라이언트명 (선택)"
              {...register('project.client')}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
