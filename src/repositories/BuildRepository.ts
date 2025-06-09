import api from '@/services/axios'
import type { IItem } from '@/interfaces/IItem'

export class BuildRepository {
  static async fetchBuild(myChampionId: string, enemyChampionId: string): Promise<IItem[]> {
    const response = await api.get<IItem[]>(`/build/${enemyChampionId}/against/${myChampionId}`)
    return response.data
  }
}
