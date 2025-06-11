import { describe, it, expect } from 'vitest'
import { User } from '@/domain/models/User'

describe('User model', () => {
  it('should correctly construct user', () => {
    const user = new User(1, 'John Doe', 'john@example.com', true)

    expect(user.id).toBe(1)
    expect(user.name).toBe('John Doe')
    expect(user.email).toBe('john@example.com')
    expect(user.is_admin).toBe(true)
  })
})
