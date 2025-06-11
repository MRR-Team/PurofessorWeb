import api from '@/infrastructure/axios.ts'
import { ItemFactory } from '@/domain/factories/ItemFactory.ts'
import type { IItem } from '@/domain/interfaces/IItem.ts'
import type { Item } from '@/domain/models/Item.ts'

export class BuildRepository {
  async fetchBuild(myChampionId: string, enemyChampionId: string): Promise<Item[]> {
    const response = await api.get<IItem[]>(`/build/${enemyChampionId}/against/${myChampionId}`)
    return response.data.map(ItemFactory.fromApi)
  }
}
