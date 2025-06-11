import { ChampionService } from '@/services/ChampionService'

export function useChampionAdminUseCase() {
  const championService = new ChampionService()

  async function toggleChampionAvailability(championId: number): Promise<void> {
    await championService.toggleChampionAvailability(championId)
  }

  async function reloadChampions() {
    return championService.loadChampions()
  }

  return {
    toggleChampionAvailability,
    reloadChampions
  }
}
