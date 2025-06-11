// src/__tests__/StatsUseCase.spec.ts
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { useStatsUseCase } from '@/application/usecases/StatsUseCase'
import { StatsService } from '@/application/services/StatsService'

vi.mock('@/application/services/StatsService')

describe('useStatsUseCase', () => {
  const { fetchCounterStats, fetchLogs } = useStatsUseCase()

  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('fetchCounterStats should call StatsService.loadCounterSearchStats', async () => {
    vi.mocked(StatsService.prototype.loadCounterSearchStats).mockResolvedValue([{ champion: 'Ahri', count: 10 }])

    const result = await fetchCounterStats()
    expect(result).toEqual([{ champion: 'Ahri', count: 10 }])
  })

  it('fetchLogs should call StatsService.loadLogs', async () => {
    vi.mocked(StatsService.prototype.loadLogs).mockResolvedValue(['log1', 'log2'])

    const result = await fetchLogs()
    expect(result).toEqual(['log1', 'log2'])
  })
})
