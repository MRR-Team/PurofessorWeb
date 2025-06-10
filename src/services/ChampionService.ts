import { ChampionRepository } from '@/repositories/ChampionRepository'
import type { Champion } from '@/models/Champion'

export class ChampionService {
  static async loadChampions(): Promise<Champion[]> {
    return ChampionRepository.getAll()
  }

  static async loadChampionById(id: number): Promise<Champion> {
    return ChampionRepository.getById(id)
  }
}
