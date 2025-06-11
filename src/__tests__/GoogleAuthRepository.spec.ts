import { describe, it, expect, vi, beforeEach } from 'vitest'
import { GoogleAuthRepository } from '@/infrastructure/repositories/GoogleAuthRepository'
import api from '@/infrastructure/axios'

vi.mock('@/infrastructure/axios')

describe('GoogleAuthRepository', () => {
  beforeEach(() => {
    vi.resetAllMocks()
  })

  it('getGoogleRedirectUrl returns static URL', () => {
    const url = GoogleAuthRepository.getGoogleRedirectUrl()
    expect(url).toBe('https://collegiumpizzerona.pl/api/auth/redirect/google')
  })

  it('fetchGoogleRedirectUrl calls GET /auth/redirect/google-url', async () => {
    ;(api.get as any).mockResolvedValue({ data: 'http://redirect-url' })

    const url = await GoogleAuthRepository.fetchGoogleRedirectUrl()

    expect(api.get).toHaveBeenCalledWith('/auth/redirect/google-url')
    expect(url).toBe('http://redirect-url')
  })
})
