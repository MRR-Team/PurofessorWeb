import { NotificationRepository } from '@/repositories/NotificationRepository'
import type { Notification } from '@/models/Notification'

async function loadNotifications(): Promise<Notification[]> {
  return await NotificationRepository.getAll()
}

async function loadNotificationById(id: number): Promise<Notification> {
  return await NotificationRepository.getById(id)
}

export const notificationService = {
  loadNotifications,
  loadNotificationById
}
