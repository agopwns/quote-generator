import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { Quote, SavedQuote, DEFAULT_QUOTE, MAX_SAVED_QUOTES, DesignTemplate, ProjectTemplate, ColorTheme } from './types'
import { Language } from './i18n'

interface QuoteStore {
  draft: Quote
  savedQuotes: SavedQuote[]
  currentId: string | null
  designTemplate: DesignTemplate
  colorTheme: ColorTheme
  templateVersion: number
  language: Language
  setDraft: (quote: Quote) => void
  resetDraft: () => void
  saveQuote: (name: string) => boolean
  saveAsNewQuote: (name: string) => boolean
  loadQuote: (id: string) => void
  deleteQuote: (id: string) => void
  updateQuote: (id: string) => void
  newQuote: () => void
  setDesignTemplate: (template: DesignTemplate) => void
  setColorTheme: (theme: ColorTheme) => void
  loadProjectTemplate: (template: ProjectTemplate) => void
  setLanguage: (lang: Language) => void
}

export const useQuoteStore = create<QuoteStore>()(
  persist(
    (set, get) => ({
      draft: DEFAULT_QUOTE,
      savedQuotes: [],
      currentId: null,
      designTemplate: 'default' as DesignTemplate,
      colorTheme: 'zinc' as ColorTheme,
      templateVersion: 0,
      language: 'ko' as Language,

      setDraft: (draft) => set({ draft }),

      resetDraft: () => set({ draft: DEFAULT_QUOTE, currentId: null }),

      newQuote: () => set({ draft: DEFAULT_QUOTE, currentId: null }),

      saveQuote: (name: string) => {
        const { draft, savedQuotes, currentId } = get()
        const now = new Date().toISOString()

        if (currentId) {
          const updated = savedQuotes.map((q) =>
            q.id === currentId
              ? { ...q, name, updatedAt: now, data: draft }
              : q
          )
          set({ savedQuotes: updated })
          return true
        }

        if (savedQuotes.length >= MAX_SAVED_QUOTES) {
          return false
        }

        const newQuote: SavedQuote = {
          id: crypto.randomUUID(),
          name,
          createdAt: now,
          updatedAt: now,
          data: draft,
        }

        set({
          savedQuotes: [newQuote, ...savedQuotes],
          currentId: newQuote.id,
        })
        return true
      },

      saveAsNewQuote: (name: string) => {
        const { draft, savedQuotes } = get()
        const now = new Date().toISOString()

        if (savedQuotes.length >= MAX_SAVED_QUOTES) {
          return false
        }

        const newQuote: SavedQuote = {
          id: crypto.randomUUID(),
          name,
          createdAt: now,
          updatedAt: now,
          data: draft,
        }

        set({
          savedQuotes: [newQuote, ...savedQuotes],
          currentId: newQuote.id,
        })
        return true
      },

      loadQuote: (id: string) => {
        const { savedQuotes } = get()
        const quote = savedQuotes.find((q) => q.id === id)
        if (quote) {
          set({ draft: quote.data, currentId: id })
        }
      },

      deleteQuote: (id: string) => {
        const { savedQuotes, currentId } = get()
        const filtered = savedQuotes.filter((q) => q.id !== id)
        set({
          savedQuotes: filtered,
          currentId: currentId === id ? null : currentId,
          draft: currentId === id ? DEFAULT_QUOTE : get().draft,
        })
      },

      updateQuote: (id: string) => {
        const { draft, savedQuotes } = get()
        const now = new Date().toISOString()
        const updated = savedQuotes.map((q) =>
          q.id === id ? { ...q, updatedAt: now, data: draft } : q
        )
        set({ savedQuotes: updated })
      },

      setDesignTemplate: (template: DesignTemplate) => set({ designTemplate: template }),

      setColorTheme: (theme: ColorTheme) => set({ colorTheme: theme }),

      loadProjectTemplate: (template: ProjectTemplate) => {
        const { language } = get()
        const templateData = template.data[language]
        set({
          draft: {
            ...templateData,
            project: {
              ...templateData.project,
              date: new Date().toISOString().slice(0, 7),
            },
          },
          currentId: null,
          templateVersion: get().templateVersion + 1,
        })
      },

      setLanguage: (lang: Language) => set({ language: lang }),
    }),
    {
      name: 'quote-storage-v5',
    }
  )
)
