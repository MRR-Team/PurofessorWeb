import { describe, it, expect, vi, beforeEach } from 'vitest'
import { CounterRepository } from '@/infrastructure/repositories/CounterRepository'
import api from '@/infrastructure/axios'

vi.mock('@/infrastructure/axios')

describe('CounterRepository', () => {
  beforeEach(() => {
    vi.resetAllMocks()
  })

  it('fetchCounter calls GET /counter/:role/:enemyChampionId', async () => {
    ;(api.get as any).mockResolvedValue({ data: [{ id: 1, name: 'Champion 1' }] })

    const result = await CounterRepository.fetchCounter('top', '123')

    expect(api.get).toHaveBeenCalledWith('/counter/top/123')
    expect(result[0].id).toBe(1)
  })
})
