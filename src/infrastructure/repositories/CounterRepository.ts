import api from '@/infrastructure/axios.ts'
import { ChampionFactory } from '@/domain/factories/ChampionFactory.ts'
import type { IChampion } from '@/domain/interfaces/IChampion.ts'
import type { Champion } from '@/domain/models/Champion.ts'

export const CounterRepository = {
  async fetchCounter(role: string, enemyChampionId: string): Promise<Champion[]> {
    const response = await api.get<IChampion[]>(`/counter/${role}/${enemyChampionId}`)
    return response.data.map(ChampionFactory.fromApi)
  }
}
