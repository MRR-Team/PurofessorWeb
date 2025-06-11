import { describe, it, expect } from 'vitest'
import { Notification } from '@/domain/models/Notification'

describe('Notification model', () => {
  const notification = new Notification(
    1,
    'Test Title',
    'This is a test content that is quite long to test shortPreview functionality.',
    'danger',
    '2024-06-10T12:34:56.000Z'
  )

  it('should return true for isCritical when type is danger', () => {
    expect(notification.isCritical()).toBe(true)
  })

  it('should return false for isCritical when type is info', () => {
    const infoNotification = new Notification(2, 'Info', 'Content', 'info', '2024-06-10T12:34:56.000Z')
    expect(infoNotification.isCritical()).toBe(false)
  })


  it('should return full content in shortPreview if short enough', () => {
    const shortNotification = new Notification(3, 'Short', 'Short content', 'info', '2024-06-10T12:34:56.000Z')
    expect(shortNotification.shortPreview()).toBe('Short content')
  })

  it('should format date correctly', () => {
    const formattedDate = notification.getFormattedDate()
    // tu robimy tylko sprawdzenie że jest stringiem
    expect(typeof formattedDate).toBe('string')
    expect(formattedDate).toMatch(/\d{2}\.\d{2}\.\d{4}/) // "10.06.2024" np.
  })
})
