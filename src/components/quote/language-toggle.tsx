'use client'

import { useQuoteStore } from '@/lib/store'
import { Button } from '@/components/ui/button'

export function LanguageToggle() {
  const { language, setLanguage } = useQuoteStore()

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={() => setLanguage(language === 'ko' ? 'en' : 'ko')}
      className="font-medium"
    >
      {language === 'ko' ? '🇰🇷 한국어' : '🇺🇸 EN'}
    </Button>
  )
}
