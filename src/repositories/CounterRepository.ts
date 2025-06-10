import api from '@/services/axios'
import { ChampionFactory } from '@/factories/ChampionFactory'
import type { Champion } from '@/models/Champion'
import type { IChampion } from '@/interfaces/IChampion'

export class CounterRepository {
  static async fetchCounter(role: string, enemyChampionId: string): Promise<Champion[]> {
    const response = await api.get<IChampion[]>(`/counter/${role}/${enemyChampionId}`)
    return response.data.map(ChampionFactory.fromApi)
  }
}
