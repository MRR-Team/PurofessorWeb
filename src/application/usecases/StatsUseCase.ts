import { StatsService } from '@/application/services/StatsService.ts'
import type { ICounterStat } from '@/domain/interfaces/ICounterStat'

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
