import { Notification } from '@/domain/models/Notification.ts'
import type { INotification } from '@/domain/interfaces/INotification.ts'

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
