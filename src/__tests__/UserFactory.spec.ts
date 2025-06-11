import { describe, it, expect } from 'vitest'
import { UserFactory } from '@/domain/factories/UserFactory'
import type { IUser } from '@/domain/interfaces/IUser'

describe('UserFactory', () => {
  it('should create User model from API data', () => {
    const apiData: IUser = {
      id: 42,
      name: 'Darkness',
      email: 'darkness@example.com',
      is_admin: true
    }

    const user = UserFactory.fromApi(apiData)

    expect(user.id).toBe(apiData.id)
    expect(user.name).toBe(apiData.name)
    expect(user.email).toBe(apiData.email)
    expect(user.is_admin).toBe(apiData.is_admin)
  })
})
