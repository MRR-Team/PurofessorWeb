import { NotificationRepository } from '@/repositories/NotificationRepository'
import type { Notification } from '@/models/Notification'

export async function loadNotifications(): Promise<Notification[]> {
  return await NotificationRepository.getAll()
}

export async function loadNotificationById(id: number): Promise<Notification> {
  return await NotificationRepository.getById(id)
}
