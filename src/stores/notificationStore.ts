import { defineStore } from 'pinia'
import { NotificationRepository } from '@/repositories/NotificationRepository'
import type { INotification } from '@/interfaces/INotification'

export const useNotificationStore = defineStore('notifications', {
  state: () => ({
    notifications: [] as INotification[],
    isLoading: false,
    error: null as string | null
  }),

  actions: {
    async fetchNotifications() {
      this.isLoading = true
      this.error = null

      try {
        const data = await NotificationRepository.getAll()
        this.notifications = data
      } catch (err: any) {
        console.error('Błąd ładowania powiadomień:', err)
        this.error = 'Nie udało się pobrać powiadomień'
      } finally {
        this.isLoading = false
      }
    },

    getById(id: number): INotification | undefined {
      return this.notifications.find(n => n.id === id)
    },

    getCritical(): INotification[] {
      return this.notifications.filter(n => n.type === 'danger' || n.type === 'warning')
    }
  }
})
