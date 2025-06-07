import api from '@/services/axios'
import type { IChampion } from '@/interfaces/IChampion'

export class CounterRepository {
  static async fetchCounter(role: string, enemyChampionId: string): Promise<IChampion[]> {
    const response = await api.get<IChampion[]>(`/counter/${role}/${enemyChampionId}`)
    return response.data
  }
}
