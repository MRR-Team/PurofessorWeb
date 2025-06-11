import api from '@/services/axios'
import type { ICounterStat } from '@/interfaces/ICounterStat'

export const StatsRepository = {
  async fetchCounterSearchStats(): Promise<ICounterStat[]> {
    const response = await api.get<ICounterStat[]>('/stats/counter-search')
    return response.data
  },

  async fetchLogs(): Promise<string[]> {
    const response = await api.get<string[]>('/stats/logs')
    return response.data
  }
}
