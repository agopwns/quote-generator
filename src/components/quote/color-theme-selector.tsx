'use client'

import { useQuoteStore } from '@/lib/store'
import { COLOR_THEMES } from '@/lib/themes'
import { ScrollArea } from '@/components/ui/scroll-area'
import { getTranslation } from '@/lib/i18n'

export function ColorThemeSelector() {
  const { colorTheme, setColorTheme, darkMode, setDarkMode, designTemplate, language } = useQuoteStore()
  const t = getTranslation(language)

  const isShadcnTemplate = designTemplate === 'shadcn'

  return (
    <div className="flex flex-col h-full">
      <div className="px-4 py-3 border-b border-gray-100">
        <label
          className={`flex items-center justify-between cursor-pointer group ${
            !isShadcnTemplate ? 'opacity-40 cursor-not-allowed' : ''
          }`}
        >
          <span className="text-sm font-medium text-gray-700">
            {language === 'ko' ? '다크모드' : 'Dark Mode'}
          </span>
          <div className="relative">
            <input
              type="checkbox"
              checked={darkMode}
              onChange={(e) => setDarkMode(e.target.checked)}
              disabled={!isShadcnTemplate}
              className="sr-only peer"
            />
            <div
              className={`
                w-11 h-6 rounded-full transition-all duration-300 ease-out
                ${isShadcnTemplate 
                  ? 'bg-gray-200 peer-checked:bg-gradient-to-r peer-checked:from-indigo-500 peer-checked:to-purple-500 peer-focus:ring-2 peer-focus:ring-indigo-300' 
                  : 'bg-gray-100'
                }
              `}
            />
            <div
              className={`
                absolute top-0.5 left-0.5 w-5 h-5 rounded-full transition-all duration-300 ease-out
                shadow-sm
                ${darkMode && isShadcnTemplate ? 'translate-x-5 bg-white' : 'translate-x-0 bg-white'}
              `}
            />
          </div>
        </label>
        {!isShadcnTemplate && (
          <p className="text-xs text-gray-400 mt-1.5">
            {language === 'ko' 
              ? '모던 카드 스타일에서만 사용 가능' 
              : 'Only available with Modern Card style'}
          </p>
        )}
      </div>

      <ScrollArea className="flex-1 px-4 pt-3">
        <div className="grid grid-cols-2 gap-3 pb-4">
          {COLOR_THEMES.map((theme) => {
            const isSelected = colorTheme === theme.id
            const colors = darkMode && isShadcnTemplate ? theme.styles.dark : theme.styles.light

            return (
              <button
                key={theme.id}
                onClick={() => setColorTheme(theme.id)}
                className={`
                  relative p-3 rounded-xl text-left transition-all duration-200 ease-out
                  border-2 group
                  ${isSelected
                    ? 'border-indigo-500 bg-indigo-50/50 shadow-md shadow-indigo-100'
                    : 'border-gray-200 bg-white hover:border-gray-300 hover:shadow-sm'
                  }
                `}
              >
                {isSelected && (
                  <div className="absolute -top-1 -right-1 w-5 h-5 bg-indigo-500 rounded-full flex items-center justify-center shadow-sm">
                    <svg
                      className="w-3 h-3 text-white"
                      fill="none"
                      strokeWidth="2.5"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </svg>
                  </div>
                )}

                <div className="flex items-center gap-1.5 mb-2.5">
                  <div
                    className="w-5 h-5 rounded-full ring-1 ring-black/10 shadow-inner transition-transform duration-200 group-hover:scale-110"
                    style={{ backgroundColor: colors.primary }}
                    title="Primary"
                  />
                  <div
                    className="w-5 h-5 rounded-full ring-1 ring-black/10 shadow-inner transition-transform duration-200 group-hover:scale-110"
                    style={{ backgroundColor: colors.secondary }}
                    title="Secondary"
                  />
                  <div
                    className="w-5 h-5 rounded-full ring-1 ring-black/10 shadow-inner transition-transform duration-200 group-hover:scale-110"
                    style={{ backgroundColor: colors.accent }}
                    title="Accent"
                  />
                </div>

                <p
                  className={`
                    text-sm font-medium truncate transition-colors duration-200
                    ${isSelected ? 'text-indigo-700' : 'text-gray-700 group-hover:text-gray-900'}
                  `}
                >
                  {language === 'ko' ? theme.nameKo : theme.name}
                </p>

                <p
                  className={`
                    text-xs truncate mt-0.5 transition-colors duration-200
                    ${isSelected ? 'text-indigo-500' : 'text-gray-400 group-hover:text-gray-500'}
                  `}
                >
                  {language === 'ko' ? theme.descriptionKo : theme.description}
                </p>
              </button>
            )
          })}
        </div>
      </ScrollArea>
    </div>
  )
}
