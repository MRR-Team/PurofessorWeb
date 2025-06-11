import type { ICounterStat } from '@/interfaces/ICounterStat'
import { StatsRepository } from '@/repositories/StatsRepository'

export class StatsService {
  constructor(private readonly statsRepository = StatsRepository) {}

  async loadCounterSearchStats(): Promise<ICounterStat[]> {
    return this.statsRepository.fetchCounterSearchStats()
  }

  async loadLogs(): Promise<string[]> {
    return this.statsRepository.fetchLogs()
  }
}
