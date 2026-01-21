'use client'

import { useState, useRef, useEffect } from 'react'
import { DEV_ITEM_PRESETS, PRESET_CATEGORIES, DevItemPreset } from '@/lib/presets'
import { Button } from '@/components/ui/button'
import { Package } from 'lucide-react'

interface PresetSelectorProps {
  onSelect: (preset: DevItemPreset) => void
}

export function PresetSelector({ onSelect }: PresetSelectorProps) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const categories = Object.keys(PRESET_CATEGORIES) as Array<keyof typeof PRESET_CATEGORIES>

  return (
    <div className="relative" ref={ref}>
      <Button
        type="button"
        variant="outline"
        size="sm"
        onClick={() => setOpen(!open)}
      >
        <Package className="h-4 w-4 mr-1" />
        프리셋 추가
      </Button>

      {open && (
        <div className="absolute left-0 top-full mt-1 w-72 bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-80 overflow-auto">
          {categories.map((categoryKey) => {
            const presets = DEV_ITEM_PRESETS.filter((p) => p.category === categoryKey)
            if (presets.length === 0) return null

            return (
              <div key={categoryKey} className="p-2">
                <h4 className="text-xs font-semibold text-gray-500 px-2 py-1">
                  {PRESET_CATEGORIES[categoryKey]}
                </h4>
                {presets.map((preset) => (
                  <button
                    key={preset.id}
                    type="button"
                    className="w-full text-left px-2 py-1.5 hover:bg-gray-100 rounded text-sm flex items-center justify-between"
                    onClick={() => {
                      onSelect(preset)
                      setOpen(false)
                    }}
                  >
                    <div>
                      <span className="font-medium">{preset.name}</span>
                      <span className="text-gray-400 text-xs ml-1">({preset.detail})</span>
                    </div>
                    <span className="text-blue-600 text-xs font-medium">
                      {preset.suggestedAmount}만원
                    </span>
                  </button>
                ))}
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
