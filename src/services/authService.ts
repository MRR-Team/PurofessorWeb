import { AuthRepository } from '@/repositories/AuthRepository'
import { UserFactory } from '@/factories/UserFactory'
import type { User } from '@/models/User'
import type { LoginPayload, RegisterPayload } from '@/types/AuthTypes'

export async function login(payload: LoginPayload): Promise<{ token: string, user: User }> {
  const response = await AuthRepository.login(payload)
  const { token, user } = response.data
  return {
    token,
    user: UserFactory.fromApi(user)
  }
}

export async function register(payload: RegisterPayload): Promise<void> {
  await AuthRepository.register(payload)
}

export async function resetPassword(email: string): Promise<void> {
  await AuthRepository.resetPassword(email)
}
