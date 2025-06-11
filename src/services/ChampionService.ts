import type { Champion } from '@/models/Champion'
import { ChampionRepository } from '@/repositories/ChampionRepository'

export class ChampionService {
  constructor(private readonly championRepository = ChampionRepository) {}

  async loadChampions(): Promise<Champion[]> {
    return this.championRepository.getAll()
  }

  async toggleChampionAvailability(championId: number): Promise<void> {
    await this.championRepository.toggleAvailability(championId)
  }
}
