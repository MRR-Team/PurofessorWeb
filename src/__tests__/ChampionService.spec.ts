// src/__tests__/ChampionService.spec.ts
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { ChampionService } from '@/application/services/ChampionService'
import { ChampionRepository } from '@/infrastructure/repositories/ChampionRepository'

vi.mock('@/infrastructure/repositories/ChampionRepository')

describe('ChampionService', () => {
  const service = new ChampionService()

  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('loadChampions should call ChampionRepository.getAll', async () => {
    vi.mocked(ChampionRepository.getAll).mockResolvedValue([{ id: 1, name: 'Ahri', role: 'mid', isAvailable: true } as any])

    const result = await service.loadChampions()
    expect(result.length).toBe(1)
    expect(result[0].name).toBe('Ahri')
  })

  it('toggleChampionAvailability should call ChampionRepository.toggleAvailability', async () => {
    vi.mocked(ChampionRepository.toggleAvailability).mockResolvedValue(undefined)

    await service.toggleChampionAvailability(1)
    expect(ChampionRepository.toggleAvailability).toHaveBeenCalledWith(1)
  })
})
