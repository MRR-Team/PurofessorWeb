import api from '@/infrastructure/axios'

export const RiotStatusRepository = {
  async fetchStatus(region: string): Promise<any> {
    const response = await api.get(`/riot/status/${region}`)
    return response.data
  }
}
