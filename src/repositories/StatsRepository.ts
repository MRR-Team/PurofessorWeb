import api from '@/services/axios'

export interface CounterStat {
  champion: { id: number; name: string }
  total: number
}

export class StatsRepository {
  static async fetchCounterSearchStats(): Promise<CounterStat[]> {
    const response = await api.get<CounterStat[]>('/stats/counter-search')
    return response.data
  }

  static async fetchLogs(): Promise<string[]> {
    const response = await api.get<string[]>('/stats/logs')
    return response.data
  }

}
