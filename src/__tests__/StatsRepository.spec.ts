import { describe, it, expect, vi, beforeEach } from 'vitest'
import { StatsRepository } from '@/infrastructure/repositories/StatsRepository'
import api from '@/infrastructure/axios'

vi.mock('@/infrastructure/axios')

describe('StatsRepository', () => {
  beforeEach(() => {
    vi.resetAllMocks()
  })

  it('fetchCounterSearchStats calls GET /stats/counter-search', async () => {
    ;(api.get as any).mockResolvedValue({ data: [{ champion: 'Aatrox', count: 5 }] })

    const result = await StatsRepository.fetchCounterSearchStats()

    expect(api.get).toHaveBeenCalledWith('/stats/counter-search')
    expect(result[0].champion).toBe('Aatrox')
  })

  it('fetchLogs calls GET /stats/logs', async () => {
    ;(api.get as any).mockResolvedValue({ data: ['log1', 'log2'] })

    const result = await StatsRepository.fetchLogs()

    expect(api.get).toHaveBeenCalledWith('/stats/logs')
    expect(result.length).toBe(2)
  })
})
