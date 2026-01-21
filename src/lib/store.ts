import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { Quote, SavedQuote, DEFAULT_QUOTE, MAX_SAVED_QUOTES } from './types'

interface QuoteStore {
  draft: Quote
  savedQuotes: SavedQuote[]
  currentId: string | null
  setDraft: (quote: Quote) => void
  resetDraft: () => void
  saveQuote: (name: string) => boolean
  loadQuote: (id: string) => void
  deleteQuote: (id: string) => void
  updateQuote: (id: string) => void
  newQuote: () => void
}

export const useQuoteStore = create<QuoteStore>()(
  persist(
    (set, get) => ({
      draft: DEFAULT_QUOTE,
      savedQuotes: [],
      currentId: null,

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
    }),
    {
      name: 'quote-storage-v2',
    }
  )
)
