import { describe, it, expect, beforeEach } from 'vitest'
import { ThemePersistenceAdapter } from '@/application/adapters/ThemePersistenceAdapter'

describe('ThemePersistenceAdapter', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('should save and get theme', () => {
    ThemePersistenceAdapter.saveTheme('dark')
    expect(ThemePersistenceAdapter.getTheme()).toBe('dark')
  })

  it('should return "light" if theme is not set', () => {
    expect(ThemePersistenceAdapter.getTheme()).toBe('light')
  })
})
