import { login, register, resetPassword } from './authService'
import { useUserSessionStore } from '@/stores/userSessionStore'
import { UserFactory } from '@/factories/UserFactory'
import { UserPersistenceService } from './userPersistenceService'

export async function handleLogin(email: string, password: string) {
  const store = useUserSessionStore()
  store.setLoading(true)
  store.setError(null)

  try {
    const res = await login({ email, password })
    const user = UserFactory.fromApi(res.user)

    store.setUser(user)
    store.setToken(res.token)

    UserPersistenceService.saveUser(user)
    UserPersistenceService.saveToken(res.token)
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

export async function handleRegister(
  name: string,
  email: string,
  password: string,
  confirmPassword: string
) {
  if (password !== confirmPassword) {
    throw new Error('Hasła się nie zgadzają')
  }

  await register({ name, email, password, password_confirmation: confirmPassword })
}

export async function handleReset(email: string) {
  await resetPassword(email)
}
