import api from '@/services/axios'
import { ItemFactory } from '@/factories/ItemFactory'
import type { IItem } from '@/interfaces/IItem'
import type { Item } from '@/models/Item'

export class BuildRepository {
  async fetchBuild(myChampionId: string, enemyChampionId: string): Promise<Item[]> {
    const response = await api.get<IItem[]>(`/build/${enemyChampionId}/against/${myChampionId}`)
    return response.data.map(ItemFactory.fromApi)
  }
}
