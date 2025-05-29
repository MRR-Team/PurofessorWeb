import { describe, it, expect, beforeEach, vi } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useUserStore } from '@/stores/userStore'
import type { IUser } from '@/interfaces/IUser'
import { UserFactory } from '@/factories/UserFactory'

describe('userStore', () => {
  const mockUser = UserFactory.fromApi({
    id: 1,
    name: 'Test User',
    email: 'test@example.com',
    role: 'user'
  })

  beforeEach(() => {
    setActivePinia(createPinia())
    localStorage.clear()
    vi.resetAllMocks()
  })

  it('should set user and token, and save to localStorage', () => {
    const store = useUserStore()
    store.setUser(mockUser, 'abc123')

    expect(store.user).toEqual(mockUser)
    expect(store.token).toBe('abc123')
    expect(localStorage.getItem('user')).toBe(JSON.stringify(mockUser))
    expect(localStorage.getItem('token')).toBe('abc123')
  })

  it('should clear user and token on logout', () => {
    const store = useUserStore()
    store.setUser(mockUser, 'abc123')
    store.logout()

    expect(store.user).toBeNull()
    expect(store.token).toBe('')
    expect(localStorage.getItem('user')).toBeNull()
    expect(localStorage.getItem('token')).toBeNull()
  })
})
