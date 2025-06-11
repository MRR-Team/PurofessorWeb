import { NotificationRepository } from '@/repositories/NotificationRepository'
import type { Notification } from '@/models/Notification'

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
