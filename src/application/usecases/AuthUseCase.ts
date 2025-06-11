import { AuthRepository } from '@/infrastructure/repositories/AuthRepository.ts'
import { GoogleAuthRepository } from '@/infrastructure/repositories/GoogleAuthRepository.ts'
import { UserFactory } from '@/domain/factories/UserFactory'
import type { User } from '@/domain/models/User'

export function useAuthUseCase() {
  async function login(email: string, password: string): Promise<{ token: string; user: User }> {
    const response = await AuthRepository.login({ email, password })
    const { token, user } = response.data
    const userModel = UserFactory.fromApi(user)

    return { token, user: userModel }
  }

  async function register(name: string, email: string, password: string, confirmPassword: string): Promise<void> {
    if (password !== confirmPassword) {
      throw new Error('Hasła się nie zgadzają')
    }

    await AuthRepository.register({ name, email, password, password_confirmation: confirmPassword })
  }

  async function resetPassword(email: string): Promise<void> {
    await AuthRepository.resetPassword(email)
  }

  function loginWithGoogle() {
    const redirectUrl = GoogleAuthRepository.getGoogleRedirectUrl()
    window.location.href = redirectUrl
  }

  function processGoogleCallback(): { token: string; user: User } | null {
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

  async function logout(): Promise<void> {
    await AuthRepository.logout()
  }

  return {
    login,
    register,
    resetPassword,
    loginWithGoogle,
    processGoogleCallback,
    logout
  }
}
