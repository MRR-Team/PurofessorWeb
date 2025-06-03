import { defineStore } from 'pinia'
import { ThemeService } from '@/services/ThemeService'
import { LanguageService } from '@/services/LanguageService'

export const useUiStore = defineStore('ui', {
  state: () => ({
    theme: ThemeService.getTheme(),
    language: LanguageService.getLanguage()
  }),
  actions: {
    setTheme(newTheme: string) {
      this.theme = newTheme
      ThemeService.saveTheme(newTheme)
    },
    setLanguage(newLang: string) {
      this.language = newLang
      LanguageService.saveLanguage(newLang)
    }
  }
})
