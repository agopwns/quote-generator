export interface ThemeStyleProps {
  background: string
  foreground: string
  card: string
  'card-foreground': string
  popover: string
  'popover-foreground': string
  primary: string
  'primary-foreground': string
  secondary: string
  'secondary-foreground': string
  muted: string
  'muted-foreground': string
  accent: string
  'accent-foreground': string
  destructive: string
  border: string
  input: string
  ring: string
  'chart-1': string
  'chart-2': string
  'chart-3': string
  'chart-4': string
  'chart-5': string
}

export interface ColorTheme {
  id: string
  name: string
  nameKo: string
  description: string
  descriptionKo: string
  styles: {
    light: ThemeStyleProps
    dark: ThemeStyleProps
  }
}

const defaultTheme: ColorTheme = {
  id: 'default',
  name: 'Default',
  nameKo: '기본',
  description: 'Clean neutral theme',
  descriptionKo: '깔끔한 중립 테마',
  styles: {
    light: {
      background: '#ffffff',
      foreground: '#0a0a0a',
      card: '#ffffff',
      'card-foreground': '#0a0a0a',
      popover: '#ffffff',
      'popover-foreground': '#0a0a0a',
      primary: '#171717',
      'primary-foreground': '#fafafa',
      secondary: '#f5f5f5',
      'secondary-foreground': '#171717',
      muted: '#f5f5f5',
      'muted-foreground': '#737373',
      accent: '#f5f5f5',
      'accent-foreground': '#171717',
      destructive: '#ef4444',
      border: '#e5e5e5',
      input: '#e5e5e5',
      ring: '#a3a3a3',
      'chart-1': '#e76e50',
      'chart-2': '#2a9d90',
      'chart-3': '#274754',
      'chart-4': '#e8c468',
      'chart-5': '#f4a462',
    },
    dark: {
      background: '#0a0a0a',
      foreground: '#fafafa',
      card: '#171717',
      'card-foreground': '#fafafa',
      popover: '#171717',
      'popover-foreground': '#fafafa',
      primary: '#fafafa',
      'primary-foreground': '#171717',
      secondary: '#262626',
      'secondary-foreground': '#fafafa',
      muted: '#262626',
      'muted-foreground': '#a3a3a3',
      accent: '#262626',
      'accent-foreground': '#fafafa',
      destructive: '#dc2626',
      border: '#262626',
      input: '#262626',
      ring: '#d4d4d4',
      'chart-1': '#2662d9',
      'chart-2': '#2eb88a',
      'chart-3': '#e88c30',
      'chart-4': '#af57db',
      'chart-5': '#e23670',
    },
  },
}

const doom64Theme: ColorTheme = {
  id: 'doom-64',
  name: 'Doom 64',
  nameKo: 'Doom 64',
  description: 'Red/green game style',
  descriptionKo: '빨강/초록 게임 스타일',
  styles: {
    light: {
      background: '#1a1a1a',
      foreground: '#e5e5e5',
      card: '#262626',
      'card-foreground': '#e5e5e5',
      popover: '#262626',
      'popover-foreground': '#e5e5e5',
      primary: '#e53935',
      'primary-foreground': '#ffffff',
      secondary: '#689f38',
      'secondary-foreground': '#000000',
      muted: '#333333',
      'muted-foreground': '#a3a3a3',
      accent: '#ff6f61',
      'accent-foreground': '#000000',
      destructive: '#b71c1c',
      border: '#404040',
      input: '#333333',
      ring: '#e53935',
      'chart-1': '#e53935',
      'chart-2': '#689f38',
      'chart-3': '#ff6f61',
      'chart-4': '#ffd54f',
      'chart-5': '#4fc3f7',
    },
    dark: {
      background: '#0d0d0d',
      foreground: '#e5e5e5',
      card: '#1a1a1a',
      'card-foreground': '#e5e5e5',
      popover: '#1a1a1a',
      'popover-foreground': '#e5e5e5',
      primary: '#e53935',
      'primary-foreground': '#ffffff',
      secondary: '#689f38',
      'secondary-foreground': '#000000',
      muted: '#262626',
      'muted-foreground': '#a3a3a3',
      accent: '#ff6f61',
      'accent-foreground': '#000000',
      destructive: '#b71c1c',
      border: '#333333',
      input: '#262626',
      ring: '#e53935',
      'chart-1': '#e53935',
      'chart-2': '#689f38',
      'chart-3': '#ff6f61',
      'chart-4': '#ffd54f',
      'chart-5': '#4fc3f7',
    },
  },
}

const midnightBloomTheme: ColorTheme = {
  id: 'midnight-bloom',
  name: 'Midnight Bloom',
  nameKo: '미드나잇 블룸',
  description: 'Elegant purple style',
  descriptionKo: '우아한 보라색 스타일',
  styles: {
    light: {
      background: '#faf5ff',
      foreground: '#1e1b4b',
      card: '#ffffff',
      'card-foreground': '#1e1b4b',
      popover: '#ffffff',
      'popover-foreground': '#1e1b4b',
      primary: '#6c5ce7',
      'primary-foreground': '#ffffff',
      secondary: '#4b0082',
      'secondary-foreground': '#e5e5e5',
      muted: '#f3e8ff',
      'muted-foreground': '#6b7280',
      accent: '#a855f7',
      'accent-foreground': '#ffffff',
      destructive: '#ef4444',
      border: '#e9d5ff',
      input: '#f3e8ff',
      ring: '#6c5ce7',
      'chart-1': '#6c5ce7',
      'chart-2': '#a855f7',
      'chart-3': '#4b0082',
      'chart-4': '#c084fc',
      'chart-5': '#8b5cf6',
    },
    dark: {
      background: '#13111c',
      foreground: '#e5e5e5',
      card: '#1e1b2e',
      'card-foreground': '#e5e5e5',
      popover: '#1e1b2e',
      'popover-foreground': '#e5e5e5',
      primary: '#6c5ce7',
      'primary-foreground': '#ffffff',
      secondary: '#4b0082',
      'secondary-foreground': '#e5e5e5',
      muted: '#2a2640',
      'muted-foreground': '#a3a3a3',
      accent: '#a855f7',
      'accent-foreground': '#ffffff',
      destructive: '#dc2626',
      border: '#3b3654',
      input: '#2a2640',
      ring: '#6c5ce7',
      'chart-1': '#6c5ce7',
      'chart-2': '#a855f7',
      'chart-3': '#4b0082',
      'chart-4': '#c084fc',
      'chart-5': '#8b5cf6',
    },
  },
}

const neoBrutalismTheme: ColorTheme = {
  id: 'neo-brutalism',
  name: 'Neo Brutalism',
  nameKo: '네오 브루탈리즘',
  description: 'Bold red/yellow style',
  descriptionKo: '대담한 빨강/노랑 스타일',
  styles: {
    light: {
      background: '#fffbeb',
      foreground: '#1c1917',
      card: '#ffffff',
      'card-foreground': '#1c1917',
      popover: '#ffffff',
      'popover-foreground': '#1c1917',
      primary: '#ff6666',
      'primary-foreground': '#000000',
      secondary: '#ffff33',
      'secondary-foreground': '#000000',
      muted: '#fef3c7',
      'muted-foreground': '#78716c',
      accent: '#fbbf24',
      'accent-foreground': '#000000',
      destructive: '#dc2626',
      border: '#1c1917',
      input: '#fef3c7',
      ring: '#ff6666',
      'chart-1': '#ff6666',
      'chart-2': '#ffff33',
      'chart-3': '#fbbf24',
      'chart-4': '#fb923c',
      'chart-5': '#f87171',
    },
    dark: {
      background: '#1c1917',
      foreground: '#fafaf9',
      card: '#292524',
      'card-foreground': '#fafaf9',
      popover: '#292524',
      'popover-foreground': '#fafaf9',
      primary: '#ff6666',
      'primary-foreground': '#000000',
      secondary: '#ffff33',
      'secondary-foreground': '#000000',
      muted: '#44403c',
      'muted-foreground': '#a8a29e',
      accent: '#fbbf24',
      'accent-foreground': '#000000',
      destructive: '#ef4444',
      border: '#57534e',
      input: '#44403c',
      ring: '#ff6666',
      'chart-1': '#ff6666',
      'chart-2': '#ffff33',
      'chart-3': '#fbbf24',
      'chart-4': '#fb923c',
      'chart-5': '#f87171',
    },
  },
}

export const COLOR_THEMES: ColorTheme[] = [
  defaultTheme,
  doom64Theme,
  midnightBloomTheme,
  neoBrutalismTheme,
]

export function getThemeById(id: string): ColorTheme | undefined {
  return COLOR_THEMES.find((theme) => theme.id === id)
}
