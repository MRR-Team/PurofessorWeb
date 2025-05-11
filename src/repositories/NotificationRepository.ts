import api from '@/services/axios'
import { NotificationFactory } from '@/factories/NotificationFactory'
import type { Notification } from '@/models/Notification'
import type { INotification } from '@/interfaces/INotification'

export class NotificationRepository {
  static async getAll(): Promise<Notification[]> {
    const response = await api.get<INotification[]>('/notifications')
    return response.data.map(item => NotificationFactory.fromApi(item))
  }

  static async getById(id: number): Promise<Notification> {
    const response = await api.get<INotification>(`/notifications/${id}`)
    return NotificationFactory.fromApi(response.data)
  }
}
