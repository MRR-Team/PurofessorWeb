import { defineStore } from 'pinia'
import { ChampionRepository } from '@/repositories/ChampionRepository'
import type { IChampion } from '@/interfaces/IChampion'

export const useChampionStore = defineStore('champions', {
  state: () => ({
    champions: [] as IChampion[],
    isLoading: false,
    error: null as string | null
  }),

  actions: {
    async fetchChampions() {
      this.isLoading = true
      this.error = null

      try {
        const data = await ChampionRepository.getAll()
        this.champions = data
      } catch (err: any) {
        console.error('Błąd pobierania championów:', err)
        this.error = 'Nie udało się pobrać championów'
      } finally {
        this.isLoading = false
      }
    },

    getChampionById(id: number): IChampion | undefined {
      return this.champions.find(c => c.id === id)
    }
  }
})
