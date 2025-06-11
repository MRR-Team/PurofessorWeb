import { describe, it, expect, vi, beforeEach } from 'vitest'
import { AuthRepository } from '@/infrastructure/repositories/AuthRepository'
import api from '@/infrastructure/axios'

vi.mock('@/infrastructure/axios')

describe('AuthRepository', () => {
  beforeEach(() => {
    vi.resetAllMocks()
  })

  it('login calls POST /login', async () => {
    const payload = { email: 'test@test.com', password: 'pass' }
    ;(api.post as any).mockResolvedValue({ data: { token: '123', user: {} } })

    const response = await AuthRepository.login(payload)

    expect(api.post).toHaveBeenCalledWith('/login', payload)
    expect(response.data.token).toBe('123')
  })

  it('register calls POST /register', async () => {
    const payload = { name: 'John', email: 'john@test.com', password: '123456', password_confirmation: '123456' }
    ;(api.post as any).mockResolvedValue({})

    await AuthRepository.register(payload)

    expect(api.post).toHaveBeenCalledWith('/register', payload)
  })

  it('resetPassword calls POST /forgot-password', async () => {
    ;(api.post as any).mockResolvedValue({})

    await AuthRepository.resetPassword('john@test.com')

    expect(api.post).toHaveBeenCalledWith('/forgot-password', { email: 'john@test.com' })
  })

  it('logout calls POST /logout', async () => {
    ;(api.post as any).mockResolvedValue({})

    await AuthRepository.logout()

    expect(api.post).toHaveBeenCalledWith('/logout')
  })
})
