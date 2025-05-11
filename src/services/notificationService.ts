import { useNotificationStore } from '@/stores/notificationStore'
import { NotificationRepository } from '@/repositories/NotificationRepository'
import { Notification } from '@/models/Notification'
import { toRawNotification } from '@/utils/toRawNotification'
import type { INotification } from '@/interfaces/INotification'

export async function fetchNotifications(): Promise<void> {
  const store = useNotificationStore()
  store.isLoading = true
  store.error = null

  try {
    const data: Notification[] = await NotificationRepository.getAll()
    store.notifications = data.map(toRawNotification)
  } catch (err) {
    console.error('Błąd ładowania powiadomień:', err)
    store.error = 'Nie udało się pobrać powiadomień'
  } finally {
    store.isLoading = false
  }
}
