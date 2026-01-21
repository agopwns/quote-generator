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

export default function Home() {
  const { draft } = useQuoteStore()
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
            <h1 className="text-lg font-bold">견적서 생성기</h1>
          </div>
          <div className="flex items-center gap-2">
            <Dialog open={previewOpen} onOpenChange={setPreviewOpen}>
              <DialogTrigger asChild>
                <Button variant="outline" size="sm">
                  <Eye className="h-4 w-4 mr-1" />
                  미리보기
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-[98vw] w-[98vw] h-[98vh] flex flex-col p-0">
                <DialogHeader className="shrink-0 px-6 py-4 border-b bg-white">
                  <DialogTitle className="flex items-center justify-between">
                    <span>미리보기</span>
                    <div className="flex items-center gap-4">
                      <TemplateStyleSelector />
                      <Button size="sm" variant="outline" onClick={() => downloadHTML(draft)}>
                        <FileCode className="h-4 w-4 mr-1" />
                        HTML
                      </Button>
                      <Button size="sm" onClick={handlePrint}>
                        <Printer className="h-4 w-4 mr-1" />
                        인쇄 / PDF
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
              PDF
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
