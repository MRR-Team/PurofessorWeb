import { useChampionStore } from '@/stores/championStore'
import { ChampionRepository } from '@/repositories/ChampionRepository'

export async function fetchChampions() {
  const store = useChampionStore()
  store.isLoading = true
  store.error = null

  try {
    const data = await ChampionRepository.getAll()
    store.champions = data
  } catch (err) {
    store.error = 'Nie udało się pobrać championów'
  } finally {
    store.isLoading = false
  }
}

export const championService = {
  fetchChampions
}
