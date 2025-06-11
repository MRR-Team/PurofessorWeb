import { describe, it, expect, vi, beforeEach } from 'vitest'
import { BuildRepository } from '@/infrastructure/repositories/BuildRepository'
import api from '@/infrastructure/axios'

vi.mock('@/infrastructure/axios')

describe('BuildRepository', () => {
  beforeEach(() => {
    vi.resetAllMocks()
  })

  it('fetchBuild calls GET /build', async () => {
    ;(api.get as any).mockResolvedValue({ data: [{ id: 1, name: 'Item 1', role: 'top' }] })

    const result = await new BuildRepository().fetchBuild('1', '2')

    expect(api.get).toHaveBeenCalledWith('/build/2/against/1')
    expect(result[0].id).toBe(1)
    expect(result[0].getDisplayName()).toBe('Item 1')
  })
})
