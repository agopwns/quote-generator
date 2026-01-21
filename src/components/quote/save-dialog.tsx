'use client'

import { useState, useEffect } from 'react'
import { useQuoteStore } from '@/lib/store'
import { MAX_SAVED_QUOTES } from '@/lib/types'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog'

interface SaveDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function SaveDialog({ open, onOpenChange }: SaveDialogProps) {
  const { draft, savedQuotes, currentId, saveQuote } = useQuoteStore()
  const [name, setName] = useState('')
  const [error, setError] = useState('')

  const isEditing = !!currentId
  const currentQuote = savedQuotes.find(q => q.id === currentId)
  const canSaveNew = savedQuotes.length < MAX_SAVED_QUOTES

  useEffect(() => {
    if (open) {
      if (isEditing && currentQuote) {
        setName(currentQuote.name)
      } else {
        setName(draft.project.name || '')
      }
      setError('')
    }
  }, [open, isEditing, currentQuote, draft.project.name])

  const handleSave = () => {
    if (!name.trim()) {
      setError('견적서 이름을 입력해주세요')
      return
    }

    if (!isEditing && !canSaveNew) {
      setError(`최대 ${MAX_SAVED_QUOTES}개까지만 저장할 수 있습니다`)
      return
    }

    const success = saveQuote(name.trim())
    if (success) {
      onOpenChange(false)
    } else {
      setError(`최대 ${MAX_SAVED_QUOTES}개까지만 저장할 수 있습니다`)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>
            {isEditing ? '견적서 저장' : '새 견적서 저장'}
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="quote-name">견적서 이름</Label>
            <Input
              id="quote-name"
              value={name}
              onChange={(e) => {
                setName(e.target.value)
                setError('')
              }}
              placeholder="예: InMuu 플랫폼 제안서"
              onKeyDown={(e) => e.key === 'Enter' && handleSave()}
            />
            {error && <p className="text-sm text-red-500">{error}</p>}
          </div>
          {!isEditing && (
            <p className="text-sm text-gray-500">
              저장된 견적서: {savedQuotes.length}/{MAX_SAVED_QUOTES}
            </p>
          )}
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            취소
          </Button>
          <Button onClick={handleSave}>
            {isEditing ? '저장' : '새로 저장'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
