import { defineStore } from 'pinia'
import { notificationService } from '@/services/notificationService'
import { toRawNotification } from '@/utils/toRawNotification'
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
        const data = await notificationService.loadNotifications()
        this.notifications = data.map(toRawNotification)
      } catch (err: unknown) {
        this.error = err instanceof Error ? err.message : 'Nie udało się pobrać powiadomień'
      } finally {
        this.isLoading = false
      }
    },

    async getById(id: number): Promise<INotification | undefined> {
      const cached = this.notifications.find(n => n.id === id)
      if (cached) return cached

      try {
        const notification = await notificationService.loadNotificationById(id)
        const raw = toRawNotification(notification)
        this.notifications.push(raw)
        return raw
      } catch (err: unknown) {
        console.error('Nie udało się pobrać powiadomienia o ID:', id)
        return undefined
      }
    }
  }
})
