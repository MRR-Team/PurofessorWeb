import { ChampionRepository } from '@/repositories/ChampionRepository'
import type { Champion } from '@/models/Champion'

export async function loadChampions(): Promise<Champion[]> {
  return await ChampionRepository.getAll()
}

export async function loadChampionById(id: number): Promise<Champion> {
  return await ChampionRepository.getById(id)
}
