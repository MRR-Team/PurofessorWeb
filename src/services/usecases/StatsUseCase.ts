import { StatsService } from '@/services/StatsService'
import type { ICounterStat } from '@/interfaces/ICounterStat'

export function useStatsUseCase() {
  const statsService = new StatsService()

  async function fetchCounterStats(): Promise<ICounterStat[]> {
    return statsService.loadCounterSearchStats()
  }

  async function fetchLogs(): Promise<string[]> {
    return statsService.loadLogs()
  }

  return {
    fetchCounterStats,
    fetchLogs
  }
}
