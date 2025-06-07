import api from '@/services/axios.ts'

export class CounterRepository {
  static async getCounter(role: string, enemyChampion: string): Promise<string[]> {
    const response = await api.get<string[]>(`/counter/${role}/${enemyChampion}`)
    return response.data
  }
}
