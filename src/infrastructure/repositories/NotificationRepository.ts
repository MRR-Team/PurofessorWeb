import api from '@/infrastructure/axios.ts'
import { NotificationFactory } from '@/domain/factories/NotificationFactory.ts'
import type { INotification } from '@/domain/interfaces/INotification.ts'
import type { Notification } from '@/domain/models/Notification.ts'

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
