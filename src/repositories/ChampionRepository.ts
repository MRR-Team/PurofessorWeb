import api from '@/services/axios'
import { ChampionFactory } from '@/factories/ChampionFactory'
import type { Champion } from '@/models/Champion'
import type { IChampion } from '@/interfaces/IChampion'

export class ChampionRepository {
  static async getAll(): Promise<Champion[]> {
    const response = await api.get<IChampion[]>('/champions')
    return response.data.map(item => ChampionFactory.fromApi(item))
  }

  static async getById(id: number): Promise<Champion> {
    const response = await api.get<IChampion>(`/champions/${id}`)
    return ChampionFactory.fromApi(response.data)
  }
}
