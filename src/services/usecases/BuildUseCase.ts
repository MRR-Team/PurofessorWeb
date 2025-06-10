import { BuildRepository } from '@/repositories/BuildRepository'
import type { Item } from '@/models/Item'

export function useBuildUseCase() {
  async function generateBuild(myChampionId: string, enemyChampionId: string): Promise<Item[]> {
    return BuildRepository.fetchBuild(myChampionId, enemyChampionId)
  }

  return {
    generateBuild
  }
}
