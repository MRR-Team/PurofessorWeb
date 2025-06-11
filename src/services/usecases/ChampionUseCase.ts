import { ChampionService } from '@/services/ChampionService'
import { useChampionStore } from '@/stores/championStore'

export function useChampionUseCase() {
  const championService = new ChampionService()
  const championStore = useChampionStore()

  async function fetchChampions() {
    championStore.setLoading(true)
    championStore.setError(null)

    try {
      const champions = await championService.loadChampions()
      championStore.setChampions(champions)
    } catch (err: any) {
      championStore.setError(err?.message || 'Nie udało się pobrać championów.')
    } finally {
      championStore.setLoading(false)
    }
  }

  return {
    fetchChampions
  }
}
