import { GoogleAuthRepository } from '@/repositories/GoogleAuthRepository'
import { UserFactory } from '@/factories/UserFactory'
import type { User } from '@/models/User'

export class GoogleAuthService {
  static loginWithGoogle() {
    const redirectUrl = GoogleAuthRepository.getGoogleRedirectUrl()
    window.location.href = redirectUrl
  }

  static processGoogleCallback(): { token: string; user: User } | null {
    const urlParams = new URLSearchParams(window.location.search)
    const token = urlParams.get('token')
    const userParam = urlParams.get('user')

    if (token && userParam) {
      try {
        const user = UserFactory.fromApi(JSON.parse(decodeURIComponent(userParam)))
        return { token, user }
      } catch (e) {
        console.error('Błąd parsowania usera z Google OAuth:', e)
        return null
      }
    }

    return null
  }
}
