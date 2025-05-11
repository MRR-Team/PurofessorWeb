import { useChampionStore } from '@/stores/championStore'
import { ChampionRepository } from '@/repositories/ChampionRepository'
import type { IChampion } from '@/interfaces/IChampion'
import { Champion } from '@/models/Champion'
import { toRawChampion } from '@/utils/toRawChampion'

async function fetchChampions(): Promise<void> {
  const store = useChampionStore()
  store.isLoading = true
  store.error = null

  try {
    const champions: Champion[] = await ChampionRepository.getAll()
    store.champions = champions.map(toRawChampion)
  } catch (err) {
    console.error('Błąd pobierania championów:', err)
    store.error = 'Nie udało się pobrać championów'
  } finally {
    store.isLoading = false
  }
}

async function getChampionById(id: number): Promise<Champion | undefined> {
  const store = useChampionStore()

  const cached = store.champions.find(c => c.id === id)
  if (cached) return new Champion(
    cached.id,
    cached.name,
    cached.title,
    cached.role,
    cached.difficulty,
    cached.image,
    cached.inRotation,
    cached.counters,
    cached.recommendedItems,
    cached.patchNotes
  )

  try {
    const champion = await ChampionRepository.getById(id)
    store.champions.push(toRawChampion(champion))
    return champion
  } catch (err) {
    console.error(`Nie udało się pobrać championa o ID ${id}`)
    return undefined
  }
}

export const championService = {
  fetchChampions,
  getChampionById
}
