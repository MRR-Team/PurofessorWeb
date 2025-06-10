import { StatsService } from '@/services/StatsService'
import type { CounterStat } from '@/repositories/StatsRepository'

export function useStatsUseCase() {
  async function fetchCounterStats(): Promise<CounterStat[]> {
    return StatsService.loadCounterSearchStats()
  }

  async function fetchLogs(): Promise<string[]> {
    return StatsService.loadLogs()
  }

  return {
    fetchCounterStats,
    fetchLogs
  }
}
