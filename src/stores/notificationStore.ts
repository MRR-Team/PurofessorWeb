import { defineStore } from 'pinia'
import type { Notification } from '@/models/Notification'

interface State {
  notifications: Notification[]
  isLoading: boolean
  error: string | null
}

export const useNotificationStore = defineStore('notifications', {
  state: (): State => ({
    notifications: [],
    isLoading: false,
    error: null
  }),

  actions: {
    setNotifications(notifications: Notification[]) {
      this.notifications = notifications
    },

    addNotification(notification: Notification) {
      this.notifications.push(notification)
    },

    setLoading(isLoading: boolean) {
      this.isLoading = isLoading
    },

    setError(error: string | null) {
      this.error = error
    }
  }
})
