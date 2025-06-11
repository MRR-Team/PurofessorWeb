import { defineStore } from 'pinia'
import type { Champion } from '@/domain/models/Champion'

interface State {
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
    setChampions(champions: Champion[]) {
      this.champions = champions
    },

    updateChampion(updatedChampion: Champion) {
      const index = this.champions.findIndex(c => c.id === updatedChampion.id)
      if (index !== -1) {
        this.champions[index] = updatedChampion
      }
    },

    setLoading(isLoading: boolean) {
      this.isLoading = isLoading
    },

    setError(error: string | null) {
      this.error = error
    }
  }
})
