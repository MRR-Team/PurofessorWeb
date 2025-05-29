import api from './axios'
import { AuthMapper } from '@/mappers/AuthMapper'
import type { LoginPayload, RegisterPayload } from '@/interfaces/IAuth'
import type { User } from '@/models/User'

export async function login(payload: LoginPayload): Promise<{ token: string; user: User }> {
  const response = await api.post('/login', payload)
  return AuthMapper.fromLoginResponse(response.data)
}

export async function register(payload: RegisterPayload): Promise<void> {
  await api.post('/register', payload)
}

export async function resetPassword(email: string): Promise<void> {
  await api.post('/forgot-password', { email })
}
