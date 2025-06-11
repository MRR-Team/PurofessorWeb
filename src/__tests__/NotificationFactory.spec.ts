import { describe, it, expect } from 'vitest'
import { NotificationFactory } from '@/domain/factories/NotificationFactory'
import type { INotification } from '@/domain/interfaces/INotification'

describe('NotificationFactory', () => {
  it('should create Notification model from API data', () => {
    const apiData: INotification = {
      id: 123,
      title: 'Test Notification',
      content: 'This is a test notification.',
      type: 'info',
      createdAt: '2024-01-01T12:00:00Z'
    }

    const notification = NotificationFactory.fromApi(apiData)

    expect(notification.id).toBe(apiData.id)
    expect(notification.title).toBe(apiData.title)
    expect(notification.content).toBe(apiData.content)
    expect(notification.type).toBe(apiData.type)
    expect(notification.createdAt).toBe(apiData.createdAt)
    expect(notification.getFormattedDate()).toBeDefined()
    expect(notification.shortPreview()).toContain(notification.content.slice(0, 100))
  })
})
