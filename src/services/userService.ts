import { UserRepository } from '@/repositories/UserRepository'
import { UserFactory } from '@/factories/UserFactory'
import type { User } from '@/models/User'

export async function updateUserProfile(id: number, name: string, email: string): Promise<User> {
  const response = await UserRepository.update(id, { name, email })
  return UserFactory.fromApi(response.data)
}

export async function fetchCurrentUser(): Promise<User> {
  const response = await UserRepository.getMe()
  return UserFactory.fromApi(response.data)
}

export function persistUser(user: User, token: string): void {
  localStorage.setItem('user', JSON.stringify(user))
  localStorage.setItem('token', token)
}

export function clearUser(): void {
  localStorage.removeItem('user')
  localStorage.removeItem('token')
}

export function loadUserFromStorage(): { user: User | null, token: string } {
  const token = localStorage.getItem('token') || ''
  const userData = localStorage.getItem('user')
  const user = userData ? UserFactory.fromStorage(JSON.parse(userData)) : null
  return { user, token }
}
