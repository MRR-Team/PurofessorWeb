export const LanguagePersistenceAdapter = {
  saveLanguage(language: string): void {
    localStorage.setItem('language', language)
  },

  getLanguage(): string {
    return localStorage.getItem('language') || 'pl'
  }
}

