import type { Item } from '@/models/Item'
import { BuildRepository } from '@/repositories/BuildRepository'

export class BuildService {
  constructor(private readonly buildRepository = new BuildRepository()) {}

  async loadBuild(myChampionId: string, enemyChampionId: string): Promise<Item[]> {
    return this.buildRepository.fetchBuild(myChampionId, enemyChampionId)
  }
}
