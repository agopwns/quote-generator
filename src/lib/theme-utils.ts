import { COLOR_THEMES, ThemeStyleProps, getThemeById } from './themes'

function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null
}

function rgbToOklch(r: number, g: number, b: number): string {
  const rLinear = r / 255
  const gLinear = g / 255
  const bLinear = b / 255

  const toLinear = (c: number) =>
    c <= 0.04045 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4)

  const rL = toLinear(rLinear)
  const gL = toLinear(gLinear)
  const bL = toLinear(bLinear)

  const l = 0.4122214708 * rL + 0.5363325363 * gL + 0.0514459929 * bL
  const m = 0.2119034982 * rL + 0.6806995451 * gL + 0.1073969566 * bL
  const s = 0.0883024619 * rL + 0.2817188376 * gL + 0.6299787005 * bL

  const lRoot = Math.cbrt(l)
  const mRoot = Math.cbrt(m)
  const sRoot = Math.cbrt(s)

  const L = 0.2104542553 * lRoot + 0.793617785 * mRoot - 0.0040720468 * sRoot
  const a = 1.9779984951 * lRoot - 2.428592205 * mRoot + 0.4505937099 * sRoot
  const b_ = 0.0259040371 * lRoot + 0.7827717662 * mRoot - 0.808675766 * sRoot

  const C = Math.sqrt(a * a + b_ * b_)
  let H = (Math.atan2(b_, a) * 180) / Math.PI
  if (H < 0) H += 360

  return `oklch(${L.toFixed(3)} ${C.toFixed(3)} ${H.toFixed(1)})`
}

export function hexToOklch(hex: string): string {
  const rgb = hexToRgb(hex)
  if (!rgb) return hex
  return rgbToOklch(rgb.r, rgb.g, rgb.b)
}

export function generateThemeCSSVariables(
  themeId: string,
  mode: 'light' | 'dark'
): Record<string, string> {
  const theme = getThemeById(themeId)
  if (!theme) return {}

  const styles = theme.styles[mode]
  const variables: Record<string, string> = {}

  Object.entries(styles).forEach(([key, value]) => {
    variables[`--${key}`] = hexToOklch(value)
  })

  return variables
}

export function generateThemeCSSString(
  themeId: string,
  mode: 'light' | 'dark'
): string {
  const variables = generateThemeCSSVariables(themeId, mode)
  return Object.entries(variables)
    .map(([key, value]) => `${key}: ${value};`)
    .join('\n  ')
}

export function generateFullThemeCSS(themeId: string): string {
  const lightVars = generateThemeCSSString(themeId, 'light')
  const darkVars = generateThemeCSSString(themeId, 'dark')

  return `:root {
  ${lightVars}
}

.dark {
  ${darkVars}
}`
}

export function getThemeStyleObject(
  themeId: string,
  mode: 'light' | 'dark'
): React.CSSProperties {
  const variables = generateThemeCSSVariables(themeId, mode)
  const styleObj: Record<string, string> = {}

  Object.entries(variables).forEach(([key, value]) => {
    styleObj[key] = value
  })

  return styleObj as React.CSSProperties
}

export { COLOR_THEMES, getThemeById }
export type { ThemeStyleProps }
