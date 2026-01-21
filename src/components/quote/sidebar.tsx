'use client'

import { useState } from 'react'
import { useQuoteStore } from '@/lib/store'
import { MAX_SAVED_QUOTES } from '@/lib/types'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { TemplateSelector } from './template-selector'
import { getTranslation } from '@/lib/i18n'
import { 
  FilePlus, 
  FileText, 
  Trash2, 
  FolderOpen,
  Save,
  LayoutTemplate
} from 'lucide-react'

interface SidebarProps {
  onSave: () => void
}

type TabType = 'quotes' | 'templates'

export function Sidebar({ onSave }: SidebarProps) {
  const [activeTab, setActiveTab] = useState<TabType>('quotes')
  const { 
    draft,
    savedQuotes, 
    currentId, 
    newQuote, 
    loadQuote, 
    deleteQuote,
    language
  } = useQuoteStore()
  const t = getTranslation(language)

  const handleDelete = (e: React.MouseEvent, id: string) => {
    e.stopPropagation()
    if (confirm(t('sidebar.deleteConfirm'))) {
      deleteQuote(id)
    }
  }

  const handleNew = () => {
    if (draft.project.name || draft.phases.some(p => p.amount > 0)) {
      if (!confirm(t('sidebar.newConfirm'))) {
        return
      }
    }
    newQuote()
  }

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr)
    return date.toLocaleDateString(language === 'ko' ? 'ko-KR' : 'en-US', { 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  return (
    <div className="w-64 border-r bg-gray-50 flex flex-col h-full">
      <div className="p-4 border-b bg-white">
        <div className="flex gap-1 mb-3">
          <button
            className={`flex-1 py-1.5 px-2 text-sm font-medium rounded transition-colors ${
              activeTab === 'quotes'
                ? 'bg-gray-900 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
            onClick={() => setActiveTab('quotes')}
          >
            <FileText className="h-3.5 w-3.5 inline mr-1" />
            {t('sidebar.quotes')}
          </button>
          <button
            className={`flex-1 py-1.5 px-2 text-sm font-medium rounded transition-colors ${
              activeTab === 'templates'
                ? 'bg-gray-900 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
            onClick={() => setActiveTab('templates')}
          >
            <LayoutTemplate className="h-3.5 w-3.5 inline mr-1" />
            {t('sidebar.templates')}
          </button>
        </div>
        {activeTab === 'quotes' && (
          <div className="space-y-2">
            <Button 
              variant="outline" 
              size="sm" 
              className="w-full justify-start"
              onClick={handleNew}
            >
              <FilePlus className="h-4 w-4 mr-2" />
              {t('sidebar.newQuote')}
            </Button>
            <Button 
              variant="default" 
              size="sm" 
              className="w-full justify-start"
              onClick={onSave}
            >
              <Save className="h-4 w-4 mr-2" />
              {t('sidebar.save')}
            </Button>
          </div>
        )}
      </div>

      {activeTab === 'quotes' ? (
        <>
          <div className="p-4 border-b">
            <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
              <FileText className="h-4 w-4" />
              <span>{t('sidebar.draft')}</span>
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
                {draft.project.name || t('sidebar.untitled')}
              </p>
              <p className="text-xs text-gray-500">{t('sidebar.autoSaved')}</p>
            </div>
          </div>

          <div className="flex-1 flex flex-col min-h-0">
            <div className="p-4 pb-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <FolderOpen className="h-4 w-4" />
                  <span>{t('sidebar.saved')}</span>
                </div>
                <span className="text-xs text-gray-400">
                  {savedQuotes.length}/{MAX_SAVED_QUOTES}
                </span>
              </div>
            </div>

            <ScrollArea className="flex-1 px-4">
              {savedQuotes.length === 0 ? (
                <p className="text-sm text-gray-400 text-center py-4">
                  {t('sidebar.noSavedQuotes')}
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
        </>
      ) : (
        <div className="flex-1 flex flex-col min-h-0 pt-4">
          <div className="px-4 pb-2">
            <p className="text-sm text-gray-500">{t('sidebar.selectTemplate')}</p>
          </div>
          <TemplateSelector />
        </div>
      )}
    </div>
  )
}
