import { describe, it, expect, beforeEach } from 'vitest'
import { UserPersistenceAdapter } from '@/application/adapters/UserPersistenceAdapter'
import { User } from '@/domain/models/User'

describe('UserPersistenceAdapter', () => {
  const testUser = new User(1, 'Darkness', 'darkness@example.com', true)

  beforeEach(() => {
    localStorage.clear()
  })

  it('should save and get user', () => {
    UserPersistenceAdapter.saveUser(testUser)
    const loadedUser = UserPersistenceAdapter.getUser()

    expect(loadedUser).not.toBeNull()
    expect(loadedUser?.id).toBe(testUser.id)
    expect(loadedUser?.name).toBe(testUser.name)
    expect(loadedUser?.email).toBe(testUser.email)
    expect(loadedUser?.is_admin).toBe(testUser.is_admin)
  })

  it('should save and get token', () => {
    UserPersistenceAdapter.saveToken('fake-token')
    expect(UserPersistenceAdapter.getToken()).toBe('fake-token')
  })

  it('should clear session', () => {
    UserPersistenceAdapter.saveUser(testUser)
    UserPersistenceAdapter.saveToken('token')

    UserPersistenceAdapter.clearSession()

    expect(UserPersistenceAdapter.getUser()).toBeNull()
    expect(UserPersistenceAdapter.getToken()).toBeNull()
  })
})
