import { describe, it, expect, vi, beforeEach } from 'vitest'
import { ChampionRepository } from '@/repositories/ChampionRepository'
import { ChampionFactory } from '@/factories/ChampionFactory'
import { Champion } from '@/models/Champion'
import api from '@/services/axios'
import type { IChampion } from '@/interfaces/IChampion'

// Mocks
vi.mock('@/services/axios', () => ({
  default: {
    get: vi.fn()
  }
}))

describe('ChampionRepository', () => {
  const mockData: IChampion = {
    id: 1,
    name: 'Aatrox',
    title: 'the Darkin Blade',
    role: 'fighter',
    difficulty: 'moderate',
    image: 'aatrox.png',
    inRotation: true,
    counters: [],
    recommendedItems: [],
    patchNotes: ''
  }

  const mockChampion = new Champion(
    mockData.id,
    mockData.name,
    mockData.title,
    mockData.role,
    mockData.difficulty,
    mockData.image,
    mockData.inRotation,
    mockData.counters,
    mockData.recommendedItems,
    mockData.patchNotes
  )

  beforeEach(() => {
    vi.clearAllMocks()
    vi.spyOn(ChampionFactory, 'fromApi').mockReturnValue(mockChampion)
  })

  it('should fetch all champions and convert them with factory', async () => {
    // @ts-expect-error: mocked in test
    api.get.mockResolvedValue({ data: [mockData] })

    const result = await ChampionRepository.getAll()

    expect(api.get).toHaveBeenCalledWith('/champions')
    expect(ChampionFactory.fromApi).toHaveBeenCalledWith(mockData)
    expect(result).toEqual([mockChampion])
  })

  it('should fetch single champion by id and convert with factory', async () => {
    // @ts-expect-error: mocked in test
    api.get.mockResolvedValue({ data: mockData })

    const result = await ChampionRepository.getById(1)

    expect(api.get).toHaveBeenCalledWith('/champions/1')
    expect(ChampionFactory.fromApi).toHaveBeenCalledWith(mockData)
    expect(result).toEqual(mockChampion)
  })

})
