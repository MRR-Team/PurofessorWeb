export class ThemeService {
  static saveTheme(theme: string): void {
    localStorage.setItem('theme', theme)

    if (theme === 'dark') {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }

  static getTheme(): string {
    const stored = localStorage.getItem('theme')
    if (stored === 'dark') {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
    return stored || 'light'
  }
}
