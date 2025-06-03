const THEME_KEY = 'theme'

export class ThemeService {
  static getTheme(): string {
    return localStorage.getItem(THEME_KEY) || 'light'
  }

  static saveTheme(theme: string): void {
    localStorage.setItem(THEME_KEY, theme)
  }
}
