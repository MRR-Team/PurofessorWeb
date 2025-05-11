import api from '@/services/axios'
import { ChampionFactory } from '@/factories/ChampionFactory'
import type { Champion } from '@/models/Champion'

export class ChampionRepository {
  static async getAll(): Promise<Champion[]> {
    const response = await api.get('/champions')
    return response.data.map((championData: any) => ChampionFactory.fromApi(championData))
  }

  static async getById(id: number): Promise<Champion> {
    const response = await api.get(`/champions/${id}`)
    return ChampionFactory.fromApi(response.data)
  }
}
