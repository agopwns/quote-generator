import { ColorTheme } from './types'

export interface ColorThemeConfig {
  id: ColorTheme
  name: string
  previewColor: string
  cssVars: {
    '--primary': string
    '--primary-foreground': string
    '--accent': string
    '--accent-foreground': string
    '--ring': string
  }
}

export const COLOR_THEMES: ColorThemeConfig[] = [
  {
    id: 'zinc',
    name: 'Zinc',
    previewColor: '#71717a',
    cssVars: {
      '--primary': 'oklch(0.205 0 0)',
      '--primary-foreground': 'oklch(0.985 0 0)',
      '--accent': 'oklch(0.97 0 0)',
      '--accent-foreground': 'oklch(0.205 0 0)',
      '--ring': 'oklch(0.708 0 0)',
    },
  },
  {
    id: 'blue',
    name: 'Blue',
    previewColor: '#3b82f6',
    cssVars: {
      '--primary': 'oklch(0.546 0.245 262.881)',
      '--primary-foreground': 'oklch(0.985 0 0)',
      '--accent': 'oklch(0.932 0.032 255.585)',
      '--accent-foreground': 'oklch(0.21 0.056 254.624)',
      '--ring': 'oklch(0.546 0.245 262.881)',
    },
  },
  {
    id: 'green',
    name: 'Green',
    previewColor: '#22c55e',
    cssVars: {
      '--primary': 'oklch(0.723 0.219 149.579)',
      '--primary-foreground': 'oklch(0.985 0 0)',
      '--accent': 'oklch(0.962 0.044 156.743)',
      '--accent-foreground': 'oklch(0.262 0.051 152.078)',
      '--ring': 'oklch(0.723 0.219 149.579)',
    },
  },
  {
    id: 'orange',
    name: 'Orange',
    previewColor: '#f97316',
    cssVars: {
      '--primary': 'oklch(0.705 0.213 47.604)',
      '--primary-foreground': 'oklch(0.985 0 0)',
      '--accent': 'oklch(0.954 0.038 75.164)',
      '--accent-foreground': 'oklch(0.292 0.059 52.598)',
      '--ring': 'oklch(0.705 0.213 47.604)',
    },
  },
  {
    id: 'red',
    name: 'Red',
    previewColor: '#ef4444',
    cssVars: {
      '--primary': 'oklch(0.637 0.237 25.331)',
      '--primary-foreground': 'oklch(0.985 0 0)',
      '--accent': 'oklch(0.936 0.032 17.717)',
      '--accent-foreground': 'oklch(0.258 0.061 24.126)',
      '--ring': 'oklch(0.637 0.237 25.331)',
    },
  },
  {
    id: 'violet',
    name: 'Violet',
    previewColor: '#8b5cf6',
    cssVars: {
      '--primary': 'oklch(0.606 0.25 292.717)',
      '--primary-foreground': 'oklch(0.985 0 0)',
      '--accent': 'oklch(0.943 0.029 294.588)',
      '--accent-foreground': 'oklch(0.245 0.065 281.103)',
      '--ring': 'oklch(0.606 0.25 292.717)',
    },
  },
]

export function getColorTheme(id: ColorTheme): ColorThemeConfig {
  return COLOR_THEMES.find((t) => t.id === id) || COLOR_THEMES[0]
}
