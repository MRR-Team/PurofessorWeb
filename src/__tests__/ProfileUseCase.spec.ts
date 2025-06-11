import { describe, it, expect, vi } from 'vitest'
import { useProfileUseCase } from '@/application/usecases/ProfileUseCase'
import { User } from '@/domain/models/User'

vi.mock('@/application/services/UserService')

describe('useProfileUseCase', () => {
  const { validateProfileData, updateProfile, fetchCurrentUser } = useProfileUseCase()

  it('validateProfileData - valid', () => {
    const result = validateProfileData('John', 'john@example.com')
    expect(result).toBeNull()
  })

  it('validateProfileData - invalid name', () => {
    const result = validateProfileData('', 'john@example.com')
    expect(result).toBe('Imię jest wymagane.')
  })

  it('validateProfileData - invalid email', () => {
    const result = validateProfileData('John', 'invalid-email')
    expect(result).toBe('Podaj poprawny adres e-mail.')
  })

})
