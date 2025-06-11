import { describe, it, expect, vi, beforeEach } from 'vitest'
import { notificationUseCase } from '@/application/usecases/NotificationUseCase'
import type { Notification } from '@/domain/models/Notification'
import { NotificationFactory } from '@/domain/factories/NotificationFactory'

vi.mock('@/infrastructure/repositories/NotificationRepository', () => {
  return {
    NotificationRepository: {
      getAll: vi.fn(),
      getById: vi.fn()
    }
  }
})

import { NotificationRepository } from '@/infrastructure/repositories/NotificationRepository'

describe('notificationUseCase', () => {
  const mockNotification: Notification = NotificationFactory.fromApi({
    id: 1,
    title: 'Test Notification',
    content: 'This is a test notification.',
    type: 'info',
    createdAt: new Date().toISOString()
  })

  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('fetchNotifications should return notifications', async () => {
    ;(NotificationRepository.getAll as any).mockResolvedValue([mockNotification])

    const { fetchNotifications } = notificationUseCase()
    const result = await fetchNotifications()

    expect(NotificationRepository.getAll).toHaveBeenCalled()
    expect(result).toEqual([mockNotification])
  })

  it('getNotificationById should return notification', async () => {
    ;(NotificationRepository.getById as any).mockResolvedValue(mockNotification)

    const { getNotificationById } = notificationUseCase()
    const result = await getNotificationById(1)

    expect(NotificationRepository.getById).toHaveBeenCalledWith(1)
    expect(result).toEqual(mockNotification)
  })
})
