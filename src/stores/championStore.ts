import { defineStore } from 'pinia'
import { championService } from '@/services/championService'
import type { Champion } from '@/models/Champion'

type State = {
  champions: Champion[]
  isLoading: boolean
  error: string | null
}

export const useChampionStore = defineStore('champions', {
  state: (): State => ({
    champions: [],
    isLoading: false,
    error: null
  }),

  actions: {
    async fetchChampions() {
      this.isLoading = true
      this.error = null

      try {
        const champions = await championService.loadChampions()
        this.champions = champions
      } catch (err: unknown) {
        this.error = err instanceof Error ? err.message : 'Nie udało się pobrać championów'
      } finally {
        this.isLoading = false
      }
    },

    async getChampionById(id: number): Promise<Champion | undefined> {
      const cached = this.champions.find(c => c.id === id)
      if (cached) return cached

      try {
        const champion = await championService.loadChampionById(id)
        this.champions.push(champion)
        return champion
      } catch (err: unknown) {
        console.error('Nie udało się pobrać championa o ID:', id)
        return undefined
      }
    }
  }
})
