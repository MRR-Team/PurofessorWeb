import type { Champion } from '@/domain/models/Champion.ts'
import { ChampionRepository } from '@/infrastructure/repositories/ChampionRepository.ts'

export class ChampionService {
  constructor(private readonly championRepository = ChampionRepository) {}

  async loadChampions(): Promise<Champion[]> {
    return this.championRepository.getAll()
  }

  async toggleChampionAvailability(championId: number): Promise<void> {
    await this.championRepository.toggleAvailability(championId)
  }
}
