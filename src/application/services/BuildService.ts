import type { Item } from '@/domain/models/Item.ts'
import { BuildRepository } from '@/infrastructure/repositories/BuildRepository.ts'

export class BuildService {
  constructor(private readonly buildRepository = new BuildRepository()) {}

  async loadBuild(myChampionId: string, enemyChampionId: string): Promise<Item[]> {
    return this.buildRepository.fetchBuild(myChampionId, enemyChampionId)
  }
}
