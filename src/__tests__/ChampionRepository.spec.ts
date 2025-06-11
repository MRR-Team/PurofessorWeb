import { describe, it, expect, vi, beforeEach } from 'vitest'
import { ChampionRepository } from '@/infrastructure/repositories/ChampionRepository'
import api from '@/infrastructure/axios'

vi.mock('@/infrastructure/axios')

describe('ChampionRepository', () => {
  beforeEach(() => {
    vi.resetAllMocks()
  })

  it('getAll calls GET /champions', async () => {
    ;(api.get as any).mockResolvedValue({ data: [{ id: 1, name: 'Champion 1', photo: '', role: '', position: '', isAvailable: true }] })

    const result = await ChampionRepository.getAll()

    expect(api.get).toHaveBeenCalledWith('/champions')
    expect(result[0].id).toBe(1)
  })

  it('getById calls GET /champions/:id', async () => {
    ;(api.get as any).mockResolvedValue({ data: { id: 1, name: 'Champion 1', photo: '', role: '', position: '', isAvailable: true } })

    const result = await ChampionRepository.getById(1)

    expect(api.get).toHaveBeenCalledWith('/champions/1')
    expect(result.id).toBe(1)
  })

  it('toggleAvailability calls PATCH /champions/:id/toggle-availability', async () => {
    ;(api.patch as any).mockResolvedValue({})

    await ChampionRepository.toggleAvailability(1)

    expect(api.patch).toHaveBeenCalledWith('/champions/1/toggle-availability')
  })
})
