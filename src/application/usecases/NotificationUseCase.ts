import { NotificationRepository } from '@/infrastructure/repositories/NotificationRepository'
import type { Notification } from '@/domain/models/Notification'

export function notificationUseCase() {
  const notificationRepository = NotificationRepository

  async function fetchNotifications(): Promise<Notification[]> {
    return notificationRepository.getAll()
  }

  async function getNotificationById(id: number): Promise<Notification> {
    return notificationRepository.getById(id)
  }

  return {
    fetchNotifications,
    getNotificationById
  }
}
