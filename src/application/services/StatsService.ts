import type { ICounterStat } from '@/domain/interfaces/ICounterStat.ts'
import { StatsRepository } from '@/infrastructure/repositories/StatsRepository.ts'

export class StatsService {
  constructor(private readonly statsRepository = StatsRepository) {}

  async loadCounterSearchStats(): Promise<ICounterStat[]> {
    return this.statsRepository.fetchCounterSearchStats()
  }

  async loadLogs(): Promise<string[]> {
    return this.statsRepository.fetchLogs()
  }
}
