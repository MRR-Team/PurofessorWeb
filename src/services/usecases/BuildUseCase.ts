import { BuildService } from '@/services/BuildService'
import type { Item } from '@/models/Item'

export function useBuildUseCase() {
  const buildService = new BuildService()

  async function generateBuild(myChampionId: string, enemyChampionId: string): Promise<Item[]> {
    return buildService.loadBuild(myChampionId, enemyChampionId)
  }

  return {
    generateBuild
  }
}
