export interface ThemeVariant {
  key: string
  label: string
}

export const themeVariants: readonly ThemeVariant[] = [
  { key: 'neutral-ombre', label: 'Neutral Ombre' },
  { key: 'slate-ombre', label: 'Slate Ombre' },
  { key: 'purple-ombre', label: 'Purple Ombre' },
  { key: 'gen-x-soft-club', label: 'Gen X Soft Club' },
  { key: 'gen-x-soft-club-ombre', label: 'Gen X Ombre' },
  { key: 'frutiger-aero', label: 'Frutiger Aero' },
]

export const DEFAULT_THEME = 'neutral-ombre'

export function isValidTheme(key: string | null | undefined): key is string {
  if (!key) return false
  return themeVariants.some((variant) => variant.key === key)
}
