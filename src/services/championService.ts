import { ChampionRepository } from '@/repositories/ChampionRepository'
import type { Champion } from '@/models/Champion'

async function loadChampions(): Promise<Champion[]> {
  return await ChampionRepository.getAll()
}

async function loadChampionById(id: number): Promise<Champion> {
  return await ChampionRepository.getById(id)
}

export const championService = {
  loadChampions,
  loadChampionById
}
