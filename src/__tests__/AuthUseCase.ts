import { describe, it, expect, vi } from 'vitest'
import { useAuthUseCase } from '@/application/usecases/AuthUseCase'
import { User } from '@/domain/models/User'

vi.mock('@/infrastructure/repositories/AuthRepository')
vi.mock('@/infrastructure/repositories/GoogleAuthRepository')

describe('useAuthUseCase', () => {
  const { login, register, resetPassword, logout } = useAuthUseCase()

  it('login - should return token and user', async () => {
    const userMock = new User(1, 'John', 'john@example.com', false)
    vi.mocked(await import('@/infrastructure/repositories/AuthRepository')).AuthRepository.login = vi.fn().mockResolvedValue({
      data: {
        token: 'mock-token',
        user: { id: 1, name: 'John', email: 'john@example.com', is_admin: false }
      }
    })

    const result = await login('john@example.com', 'password')
    expect(result.token).toBe('mock-token')
    expect(result.user).toEqual(userMock)
  })

  it('register - should register', async () => {
    vi.mocked(await import('@/infrastructure/repositories/AuthRepository')).AuthRepository.register = vi.fn().mockResolvedValue(undefined)

    await expect(register('John', 'john@example.com', 'password', 'password')).resolves.toBeUndefined()
  })

  it('resetPassword - should send reset', async () => {
    vi.mocked(await import('@/infrastructure/repositories/AuthRepository')).AuthRepository.resetPassword = vi.fn().mockResolvedValue(undefined)

    await expect(resetPassword('john@example.com')).resolves.toBeUndefined()
  })

  it('logout - should logout', async () => {
    vi.mocked(await import('@/infrastructure/repositories/AuthRepository')).AuthRepository.logout = vi.fn().mockResolvedValue(undefined)

    await expect(logout()).resolves.toBeUndefined()
  })

  it('register - throws error if passwords do not match', async () => {
    await expect(register('John', 'john@example.com', 'password1', 'password2')).rejects.toThrow('Hasła się nie zgadzają')
  })
})
