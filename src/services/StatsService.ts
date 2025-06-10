import { StatsRepository } from '@/repositories/StatsRepository'
import type { CounterStat } from '@/repositories/StatsRepository'

export class StatsService {
  static async loadCounterSearchStats(): Promise<CounterStat[]> {
    return StatsRepository.fetchCounterSearchStats()
  }
  static async loadLogs(): Promise<string[]> {
    return StatsRepository.fetchLogs()
  }
}
