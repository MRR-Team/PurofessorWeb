import { RiotStatusService } from '@/application/services/RiotStatusService'

export function useRiotStatusUseCase() {
  const riotStatusService = new RiotStatusService()

  async function fetchStatus(region: string): Promise<any> {
    return riotStatusService.loadStatus(region)
  }

  return {
    fetchStatus
  }
}
