import { BuildService } from '@/application/services/BuildService.ts'
import type { Item } from '@/domain/models/Item'

export function useBuildUseCase() {
  const buildService = new BuildService()

  async function generateBuild(myChampionId: string, enemyChampionId: string): Promise<Item[]> {
    return buildService.loadBuild(myChampionId, enemyChampionId)
  }

  return {
    generateBuild
  }
}
