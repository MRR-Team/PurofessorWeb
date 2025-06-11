// src/__tests__/AuthUseCase.spec.ts
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { useAuthUseCase } from '@/application/usecases/AuthUseCase'
import { AuthRepository } from '@/infrastructure/repositories/AuthRepository'
import { GoogleAuthRepository } from '@/infrastructure/repositories/GoogleAuthRepository'

vi.mock('@/infrastructure/repositories/AuthRepository')
vi.mock('@/infrastructure/repositories/GoogleAuthRepository')

describe('useAuthUseCase', () => {
  const { login, register, resetPassword, logout } = useAuthUseCase()

  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('login should call AuthRepository.login', async () => {
    const mockResponse = { data: { token: 'token123', user: { id: 1, name: 'John', email: 'john@example.com', is_admin: false } } }
    vi.mocked(AuthRepository.login).mockResolvedValue(mockResponse)

    const result = await login('john@example.com', 'password123')
    expect(result.token).toBe('token123')
    expect(result.user.name).toBe('John')
  })

  it('register should call AuthRepository.register', async () => {
    vi.mocked(AuthRepository.register).mockResolvedValue(undefined)
    await register('John', 'john@example.com', 'password123', 'password123')
    expect(AuthRepository.register).toHaveBeenCalled()
  })

  it('resetPassword should call AuthRepository.resetPassword', async () => {
    vi.mocked(AuthRepository.resetPassword).mockResolvedValue(undefined)
    await resetPassword('john@example.com')
    expect(AuthRepository.resetPassword).toHaveBeenCalledWith('john@example.com')
  })

  it('logout should call AuthRepository.logout', async () => {
    vi.mocked(AuthRepository.logout).mockResolvedValue(undefined)
    await logout()
    expect(AuthRepository.logout).toHaveBeenCalled()
  })
})
