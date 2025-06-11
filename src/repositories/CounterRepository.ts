import api from '@/services/axios'
import { ChampionFactory } from '@/factories/ChampionFactory'
import type { IChampion } from '@/interfaces/IChampion'
import type { Champion } from '@/models/Champion'

export const CounterRepository = {
  async fetchCounter(role: string, enemyChampionId: string): Promise<Champion[]> {
    const response = await api.get<IChampion[]>(`/counter/${role}/${enemyChampionId}`)
    return response.data.map(ChampionFactory.fromApi)
  }
}
