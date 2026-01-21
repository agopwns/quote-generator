import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { Quote, DEFAULT_QUOTE } from './types'

interface QuoteStore {
  quote: Quote
  setQuote: (quote: Quote) => void
  resetQuote: () => void
}

export const useQuoteStore = create<QuoteStore>()(
  persist(
    (set) => ({
      quote: DEFAULT_QUOTE,
      setQuote: (quote) => set({ quote }),
      resetQuote: () => set({ quote: DEFAULT_QUOTE }),
    }),
    {
      name: 'quote-storage',
    }
  )
)
