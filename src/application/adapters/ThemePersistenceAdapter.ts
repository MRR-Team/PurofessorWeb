export const ThemePersistenceAdapter = {
  saveTheme(theme: string): void {
    localStorage.setItem('theme', theme)
  },

  getTheme(): string {
    return localStorage.getItem('theme') || 'light'
  }
}

