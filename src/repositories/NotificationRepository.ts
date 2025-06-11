import api from '@/services/axios'
import { NotificationFactory } from '@/factories/NotificationFactory'
import type { INotification } from '@/interfaces/INotification'
import type { Notification } from '@/models/Notification'

export const NotificationRepository = {
  async getAll(): Promise<Notification[]> {
    const response = await api.get<INotification[]>('/notifications')
    return response.data.map(NotificationFactory.fromApi)
  },

  async getById(id: number): Promise<Notification> {
    const response = await api.get<INotification>(`/notifications/${id}`)
    return NotificationFactory.fromApi(response.data)
  }
}
