const LANGUAGE_KEY = 'language'

export class LanguageService {
  static getLanguage(): string {
    return localStorage.getItem(LANGUAGE_KEY) || 'pl'
  }

  static saveLanguage(language: string): void {
    localStorage.setItem(LANGUAGE_KEY, language)
  }
}
