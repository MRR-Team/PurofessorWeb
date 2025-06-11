import { defineStore } from 'pinia'

interface State {
  theme: string
  language: string
}

export const useUiStore = defineStore('ui', {
  state: (): State => ({
    theme: 'light',
    language: 'pl'
  }),

  actions: {
    setTheme(newTheme: string) {
      this.theme = newTheme
    },

    setLanguage(newLang: string) {
      this.language = newLang
    }
  }
})
