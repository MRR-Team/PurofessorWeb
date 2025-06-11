import api from '@/infrastructure/axios.ts'
import { ChampionFactory } from '@/domain/factories/ChampionFactory.ts'
import type { IChampion } from '@/domain/interfaces/IChampion.ts'
import type { Champion } from '@/domain/models/Champion.ts'

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
