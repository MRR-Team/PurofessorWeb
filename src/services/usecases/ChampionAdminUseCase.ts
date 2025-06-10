import { ChampionRepository } from '@/repositories/ChampionRepository'
import api from '@/services/axios'

export function useChampionAdminUseCase() {
  async function toggleChampionAvailability(championId: number): Promise<void> {
    await api.patch(`/champions/${championId}/toggle-availability`)
  }

  async function reloadChampions() {
    return ChampionRepository.getAll()
  }

  return {
    toggleChampionAvailability,
    reloadChampions
  }
}
