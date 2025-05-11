import { useNotificationStore } from '@/stores/notificationStore'
import { NotificationRepository } from '@/repositories/NotificationRepository'

export async function fetchNotifications() {
  const store = useNotificationStore()
  store.isLoading = true
  store.error = null

  try {
    const data = await NotificationRepository.getAll()
    store.notifications = data
  } catch (err) {
    store.error = 'Nie udało się pobrać powiadomień'
  } finally {
    store.isLoading = false
  }
}
