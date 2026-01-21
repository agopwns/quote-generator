'use client'

import { useQuoteStore } from '@/lib/store'
import { MAX_SAVED_QUOTES } from '@/lib/types'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Separator } from '@/components/ui/separator'
import { 
  FilePlus, 
  FileText, 
  Trash2, 
  FolderOpen,
  Save
} from 'lucide-react'

interface SidebarProps {
  onSave: () => void
}

export function Sidebar({ onSave }: SidebarProps) {
  const { 
    draft,
    savedQuotes, 
    currentId, 
    newQuote, 
    loadQuote, 
    deleteQuote 
  } = useQuoteStore()

  const handleDelete = (e: React.MouseEvent, id: string) => {
    e.stopPropagation()
    if (confirm('이 견적서를 삭제하시겠습니까?')) {
      deleteQuote(id)
    }
  }

  const handleNew = () => {
    if (draft.project.name || draft.phases.some(p => p.amount > 0)) {
      if (!confirm('현재 작성 중인 내용이 있습니다. 새 견적서를 시작하시겠습니까?')) {
        return
      }
    }
    newQuote()
  }

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr)
    return date.toLocaleDateString('ko-KR', { 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  return (
    <div className="w-64 border-r bg-gray-50 flex flex-col h-full">
      <div className="p-4 border-b bg-white">
        <h2 className="font-semibold text-sm text-gray-600 mb-3">📁 견적서</h2>
        <div className="space-y-2">
          <Button 
            variant="outline" 
            size="sm" 
            className="w-full justify-start"
            onClick={handleNew}
          >
            <FilePlus className="h-4 w-4 mr-2" />
            새 견적서
          </Button>
          <Button 
            variant="default" 
            size="sm" 
            className="w-full justify-start"
            onClick={onSave}
          >
            <Save className="h-4 w-4 mr-2" />
            저장하기
          </Button>
        </div>
      </div>

      <div className="p-4 border-b">
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
          <FileText className="h-4 w-4" />
          <span>임시 저장</span>
        </div>
        <div 
          className={`p-3 rounded-lg cursor-pointer transition-colors ${
            !currentId 
              ? 'bg-blue-100 border-2 border-blue-400' 
              : 'bg-white border border-gray-200 hover:bg-gray-100'
          }`}
          onClick={() => !currentId && null}
        >
          <p className="text-sm font-medium truncate">
            {draft.project.name || '(제목 없음)'}
          </p>
          <p className="text-xs text-gray-500">자동 저장됨</p>
        </div>
      </div>

      <div className="flex-1 flex flex-col min-h-0">
        <div className="p-4 pb-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <FolderOpen className="h-4 w-4" />
              <span>저장됨</span>
            </div>
            <span className="text-xs text-gray-400">
              {savedQuotes.length}/{MAX_SAVED_QUOTES}
            </span>
          </div>
        </div>

        <ScrollArea className="flex-1 px-4">
          {savedQuotes.length === 0 ? (
            <p className="text-sm text-gray-400 text-center py-4">
              저장된 견적서가 없습니다
            </p>
          ) : (
            <div className="space-y-2 pb-4">
              {savedQuotes.map((quote) => (
                <div
                  key={quote.id}
                  className={`p-3 rounded-lg cursor-pointer transition-colors group ${
                    currentId === quote.id
                      ? 'bg-blue-100 border-2 border-blue-400'
                      : 'bg-white border border-gray-200 hover:bg-gray-100'
                  }`}
                  onClick={() => loadQuote(quote.id)}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{quote.name}</p>
                      <p className="text-xs text-gray-500">
                        {formatDate(quote.updatedAt)}
                      </p>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
                      onClick={(e) => handleDelete(e, quote.id)}
                    >
                      <Trash2 className="h-3 w-3 text-red-500" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </ScrollArea>
      </div>
    </div>
  )
}
