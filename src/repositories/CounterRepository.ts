import api from '@/services/axios'

export class CounterRepository {
  static async fetchCounter(role: string, enemyChampion: string): Promise<string[]> {
    const response = await api.get<string[]>(`/counter/${role}/${enemyChampion}`)
    return response.data
  }
}
