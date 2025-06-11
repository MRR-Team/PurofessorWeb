import api from '@/services/axios'
import { ChampionFactory } from '@/factories/ChampionFactory'
import type { IChampion } from '@/interfaces/IChampion'
import type { Champion } from '@/models/Champion'

export const ChampionRepository = {
  async getAll(): Promise<Champion[]> {
    const response = await api.get<IChampion[]>('/champions')
    return response.data.map(ChampionFactory.fromApi)
  },

  async getById(id: number): Promise<Champion> {
    const response = await api.get<IChampion>(`/champions/${id}`)
    return ChampionFactory.fromApi(response.data)
  },

  async toggleAvailability(id: number): Promise<void> {
    await api.patch(`/champions/${id}/toggle-availability`)
  }
}
