import { NotificationRepository } from '@/repositories/NotificationRepository'
import { useNotificationStore } from '@/stores/notificationStore'

export function notificationUseCase() {
  const store = useNotificationStore()

  async function fetchNotifications() {
    store.setLoading(true)
    store.setError(null)

    try {
      const notifications = await NotificationRepository.getAll()
      store.setNotifications(notifications)
    } catch (e: unknown) {
      store.setError(
        e instanceof Error ? e.message : 'Nie udało się pobrać powiadomień'
      )
    } finally {
      store.setLoading(false)
    }
  }

  async function getNotificationById(id: number) {
    const cached = store.notifications.find((n) => n.id === id)
    if (cached) return cached

    try {
      const notification = await NotificationRepository.getById(id)
      store.addNotification(notification)
      return notification
    } catch (e: unknown) {
      console.error('Nie udało się pobrać powiadomienia o ID:', id)
      return undefined
    }
  }

  return {
    fetchNotifications,
    getNotificationById
  }
}
