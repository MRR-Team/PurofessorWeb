import { describe, it, expect, vi, beforeEach } from 'vitest'
import { NotificationRepository } from '@/infrastructure/repositories/NotificationRepository'
import api from '@/infrastructure/axios'

vi.mock('@/infrastructure/axios')

describe('NotificationRepository', () => {
  beforeEach(() => {
    vi.resetAllMocks()
  })

  it('getAll calls GET /notifications', async () => {
    ;(api.get as any).mockResolvedValue({ data: [{ id: 1, title: 'Title', content: 'Content', type: 'info' }] })

    const result = await NotificationRepository.getAll()

    expect(api.get).toHaveBeenCalledWith('/notifications')
    expect(result[0].id).toBe(1)
  })

  it('getById calls GET /notifications/:id', async () => {
    ;(api.get as any).mockResolvedValue({ data: { id: 1, title: 'Title', content: 'Content', type: 'info' } })

    const result = await NotificationRepository.getById(1)

    expect(api.get).toHaveBeenCalledWith('/notifications/1')
    expect(result.id).toBe(1)
  })
})
