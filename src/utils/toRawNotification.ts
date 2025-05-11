import type { Notification } from '@/models/Notification'
import type { INotification } from '@/interfaces/INotification'

export function toRawNotification(n: Notification): INotification {
  return {
    id: n.id,
    title: n.title,
    content: n.content,
    type: n.type,
    createdAt: n.createdAt
  }
}
