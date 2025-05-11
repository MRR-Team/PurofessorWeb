import { Notification } from '@/models/Notification'

export class NotificationFactory {
  static fromApi(data: any): Notification {
    return new Notification(
      data.id,
      data.title,
      data.content,
      data.type,
      data.created_at ?? data.createdAt ?? new Date().toISOString()
    )
  }
}
