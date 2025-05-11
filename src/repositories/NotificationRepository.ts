import api from '@/services/axios'
import { NotificationFactory } from '@/factories/NotificationFactory'
import type { Notification } from '@/models/Notification'

export class NotificationRepository {
  static async getAll(): Promise<Notification[]> {
    const response = await api.get('/notifications')
    return response.data.map((item: any) => NotificationFactory.fromApi(item))
  }

  static async getById(id: number): Promise<Notification> {
    const response = await api.get(`/notifications/${id}`)
    return NotificationFactory.fromApi(response.data)
  }
}
