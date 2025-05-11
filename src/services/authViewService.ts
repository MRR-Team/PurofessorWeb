import { login, register, resetPassword } from './authService'
import { useUserStore } from '@/stores/userStore'
import { UserFactory } from '@/factories/UserFactory'

export async function handleLogin(email: string, password: string) {
  const store = useUserStore()
  const res = await login({ email, password })
  const user = UserFactory.fromApi(res.user)
  store.setUser(user, res.token)
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
