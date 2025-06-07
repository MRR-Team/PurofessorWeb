import { AuthApiRepository } from '@/services/api/AuthApiRepository'
import { GoogleAuthApiRepository } from '@/services/api/GoogleAuthApiRepository'
import { UserFactory } from '@/factories/UserFactory'
import { UserPersistenceAdapter } from '@/services/adapters/UserPersistenceAdapter'
import { useUserSessionStore } from '@/stores/userSessionStore'

export function useAuthUseCase() {
  const store = useUserSessionStore()

  async function login(email: string, password: string) {
    store.setLoading(true)
    store.setError(null)

    try {
      const response = await AuthApiRepository.login({ email, password })
      const { token, user } = response.data

      const userModel = UserFactory.fromApi(user)

      store.setUser(user)
      store.setToken(token)

      UserPersistenceAdapter.saveUser(userModel)
      UserPersistenceAdapter.saveToken(token)
    } catch (e: any) {
      if (e?.response?.status === 401) {
        store.setError('Nieprawidłowy email lub hasło.')
      } else if (e?.response?.status === 422) {
        store.setError('Wprowadź poprawne dane.')
      } else {
        store.setError('Wystąpił błąd logowania.')
      }
    } finally {
      store.setLoading(false)
    }
  }

  async function register(name: string, email: string, password: string, confirmPassword: string) {
    if (password !== confirmPassword) {
      throw new Error('Hasła się nie zgadzają')
    }

    await AuthApiRepository.register({ name, email, password, password_confirmation: confirmPassword })
  }

  async function resetPassword(email: string) {
    await AuthApiRepository.resetPassword(email)
  }

  function loginWithGoogle() {
    const redirectUrl = GoogleAuthApiRepository.getGoogleRedirectUrl()
    window.location.href = redirectUrl
  }

  function processGoogleCallback(): { token: string; user: any } | null {
    const urlParams = new URLSearchParams(window.location.search)
    const token = urlParams.get('token')
    const userParam = urlParams.get('user')

    if (token && userParam) {
      try {
        const user = UserFactory.fromApi(JSON.parse(decodeURIComponent(userParam)))

        store.setUser(user)
        store.setToken(token)

        UserPersistenceAdapter.saveUser(user)
        UserPersistenceAdapter.saveToken(token)

        return { token, user }
      } catch (e) {
        console.error('Błąd parsowania usera z Google OAuth:', e)
        return null
      }
    }

    return null
  }

  return {
    login,
    register,
    resetPassword,
    loginWithGoogle,
    processGoogleCallback
  }
}
