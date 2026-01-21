'use client'

import { useState } from 'react'
import { QuoteForm } from '@/components/quote/quote-form'
import { QuotePreview } from '@/components/quote/quote-preview'
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
import { Eye, Printer, RotateCcw } from 'lucide-react'

export default function Home() {
  const { quote, resetQuote } = useQuoteStore()
  const [previewOpen, setPreviewOpen] = useState(false)

  const handlePrint = () => {
    setPreviewOpen(false)
    setTimeout(() => {
      window.print()
    }, 100)
  }

  const handleReset = () => {
    if (confirm('모든 입력 내용을 초기화하시겠습니까?')) {
      resetQuote()
      window.location.reload()
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b sticky top-0 z-10 no-print">
        <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-xl font-bold">견적서 생성기</h1>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={handleReset}>
              <RotateCcw className="h-4 w-4 mr-1" />
              초기화
            </Button>
            <Dialog open={previewOpen} onOpenChange={setPreviewOpen}>
              <DialogTrigger asChild>
                <Button variant="outline" size="sm">
                  <Eye className="h-4 w-4 mr-1" />
                  미리보기
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-5xl h-[90vh]">
                <DialogHeader>
                  <DialogTitle className="flex items-center justify-between">
                    견적서 미리보기
                    <Button size="sm" onClick={handlePrint}>
                      <Printer className="h-4 w-4 mr-1" />
                      인쇄 / PDF 저장
                    </Button>
                  </DialogTitle>
                </DialogHeader>
                <ScrollArea className="h-full">
                  <QuotePreview quote={quote} />
                </ScrollArea>
              </DialogContent>
            </Dialog>
            <Button size="sm" onClick={handlePrint}>
              <Printer className="h-4 w-4 mr-1" />
              PDF
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-8 no-print">
        <QuoteForm onPreview={() => setPreviewOpen(true)} />
      </main>

      <div className="print-only">
        <QuotePreview quote={quote} />
      </div>
    </div>
  )
}
