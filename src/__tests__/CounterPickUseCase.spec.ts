// src/__tests__/CounterPickUseCase.spec.ts
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { useCounterPickUseCase } from '@/application/usecases/CounterPickUseCase'
import { CounterService } from '@/application/services/CounterService'

vi.mock('@/application/services/CounterService')

describe('useCounterPickUseCase', () => {
  const { generateCounter } = useCounterPickUseCase()

  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('generateCounter should call CounterService.loadCounter', async () => {
    vi.mocked(CounterService.prototype.loadCounter).mockResolvedValue([{ id: 1, name: 'Ahri', role: 'mid', isAvailable: true } as any])

    const result = await generateCounter('mid', '1')
    expect(result.length).toBe(1)
    expect(result[0].name).toBe('Ahri')
  })
})
