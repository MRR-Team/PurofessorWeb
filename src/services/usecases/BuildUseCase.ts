import { BuildService } from '@/services/BuildService'
import { ItemFactory } from '@/factories/ItemFactory'
import type { Item } from '@/models/Item'

export function useBuildUseCase() {
  async function generateBuild(myChampionId: string, enemyChampionId: string): Promise<Item[]> {
    const response = await BuildService.loadBuild(myChampionId, enemyChampionId)
    return response.map(item => ItemFactory.fromApi(item))
  }

  return {
    generateBuild
  }
}
