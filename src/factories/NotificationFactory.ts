import { Notification } from '@/models/Notification'
import type { INotification } from '@/interfaces/INotification'

export class NotificationFactory {
  static fromApi(data: INotification): Notification {
    return new Notification(
      data.id,
      data.title,
      data.content,
      data.type,
      data.createdAt ?? data.created_at ?? new Date().toISOString()
    )
  }
}
