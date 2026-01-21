'use client'

import { useState } from 'react'
import { QuoteForm } from '@/components/quote/quote-form'
import { QuotePreview } from '@/components/quote/preview'
import { Sidebar } from '@/components/quote/sidebar'
import { SaveDialog } from '@/components/quote/save-dialog'
import { TemplateStyleSelector } from '@/components/quote/template-style-selector'
import { useQuoteStore } from '@/lib/store'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Eye, Printer, Menu, FileCode } from 'lucide-react'
import { downloadHTML } from '@/lib/html-exporter'
import { LanguageToggle } from '@/components/quote/language-toggle'
import { getTranslation } from '@/lib/i18n'

export default function Home() {
  const { draft, language, designTemplate, colorTheme, darkMode } = useQuoteStore()
  const t = getTranslation(language)
  const [previewOpen, setPreviewOpen] = useState(false)
  const [saveOpen, setSaveOpen] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(true)

  const handlePrint = () => {
    setPreviewOpen(false)
    setTimeout(() => {
      window.print()
    }, 100)
  }

  return (
    <div className="h-screen flex flex-col bg-gray-50">
      <header className="bg-white border-b sticky top-0 z-10 no-print">
        <div className="px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              <Menu className="h-5 w-5" />
            </Button>
            <h1 className="text-lg font-bold">{t('app.title')}</h1>
          </div>
          <div className="flex items-center gap-2">
            <LanguageToggle />
            <Dialog open={previewOpen} onOpenChange={setPreviewOpen}>
              <DialogTrigger asChild>
                <Button variant="outline" size="sm">
                  <Eye className="h-4 w-4 mr-1" />
                  {t('app.preview')}
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-[98vw] w-[98vw] sm:max-w-[98vw] h-[98vh] flex flex-col pl-0 pr-4 py-0">
                <DialogHeader className="shrink-0 px-6 py-4 border-b bg-white">
                  <DialogTitle className="flex items-center justify-between">
                    <span>{t('preview.title')}</span>
                    <div className="flex items-center gap-4">
                      <TemplateStyleSelector />
                      <Button size="sm" variant="outline" onClick={() => downloadHTML(draft, language, designTemplate, { colorTheme, darkMode })}>
                        <FileCode className="h-4 w-4 mr-1" />
                        {t('preview.html')}
                      </Button>
                      <Button size="sm" onClick={handlePrint}>
                        <Printer className="h-4 w-4 mr-1" />
                        {t('preview.print')}
                      </Button>
                    </div>
                  </DialogTitle>
                </DialogHeader>
                <div className="flex-1 overflow-auto min-h-0 bg-gray-100">
                  <QuotePreview quote={draft} />
                </div>
              </DialogContent>
            </Dialog>
            <Button size="sm" onClick={handlePrint}>
              <Printer className="h-4 w-4 mr-1" />
              {t('app.pdf')}
            </Button>
          </div>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden no-print">
        {sidebarOpen && (
          <Sidebar onSave={() => setSaveOpen(true)} />
        )}
        <main className="flex-1 overflow-auto">
          <div className="max-w-4xl mx-auto px-6 py-8">
            <QuoteForm />
          </div>
        </main>
      </div>

      <SaveDialog open={saveOpen} onOpenChange={setSaveOpen} />

      <div className="print-only">
        <QuotePreview quote={draft} />
      </div>
    </div>
  )
}
