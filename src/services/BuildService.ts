import { BuildRepository } from '@/repositories/BuildRepository'
import type { IItem } from '@/interfaces/IItem'

export class BuildService {
  static async loadBuild(myChampionId: string, enemyChampionId: string): Promise<IItem[]> {
    return BuildRepository.fetchBuild(myChampionId, enemyChampionId)
  }
}
