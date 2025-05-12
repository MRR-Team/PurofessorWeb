import { defineStore } from 'pinia'
import { championService } from '@/services/championService'
import { toRawChampion } from '@/utils/toRawChampion'
import type { IChampion } from '@/interfaces/IChampion'

type State = {
  champions: IChampion[]
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
        this.champions = champions.map(toRawChampion)
      } catch (err: unknown) {
        this.error = err instanceof Error ? err.message : 'Nie udało się pobrać championów'
      } finally {
        this.isLoading = false
      }
    },

    async getChampionById(id: number): Promise<IChampion | undefined> {
      const cached = this.champions.find(c => c.id === id)
      if (cached) return cached

      try {
        const champion = await championService.loadChampionById(id)
        const raw = toRawChampion(champion)
        this.champions.push(raw)
        return raw
      } catch (err: unknown) {
        console.error('Nie udało się pobrać championa o ID:', id)
        return undefined
      }
    }
  }
})
