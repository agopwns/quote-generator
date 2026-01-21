'use client'

import { useQuoteStore } from '@/lib/store'
import { COLOR_THEMES } from '@/lib/color-themes'
import { ColorTheme } from '@/lib/types'
import { cn } from '@/lib/utils'

export function ColorThemeSelector() {
  const { colorTheme, setColorTheme } = useQuoteStore()

  return (
    <div className="flex items-center gap-1.5">
      {COLOR_THEMES.map((theme) => (
        <button
          key={theme.id}
          onClick={() => setColorTheme(theme.id as ColorTheme)}
          className={cn(
            'w-6 h-6 rounded-full border-2 transition-all hover:scale-110',
            colorTheme === theme.id
              ? 'border-foreground ring-2 ring-offset-2 ring-foreground/20'
              : 'border-transparent hover:border-muted-foreground/50'
          )}
          style={{ backgroundColor: theme.previewColor }}
          title={theme.name}
        />
      ))}
    </div>
  )
}
