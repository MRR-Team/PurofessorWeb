import api from '@/services/axios'
import { ItemFactory } from '@/factories/ItemFactory'
import type { Item } from '@/models/Item'
import type { IItem } from '@/interfaces/IItem'

export class BuildRepository {
  static async fetchBuild(myChampionId: string, enemyChampionId: string): Promise<Item[]> {
    const response = await api.get<IItem[]>(`/build/${enemyChampionId}/against/${myChampionId}`)
    return response.data.map(ItemFactory.fromApi)
  }
}
