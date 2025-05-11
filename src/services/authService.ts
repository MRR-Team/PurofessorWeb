import api from './axios'
import { UserFactory } from '@/factories/UserFactory'
import type { User } from '@/models/User'

// Typy
export interface LoginPayload {
  email: string
  password: string
}

export interface RegisterPayload {
  name: string
  email: string
  password: string
  password_confirmation: string
}

// Login
export async function login(payload: LoginPayload): Promise<{ token: string; user: User }> {
  const response = await api.post('/login', payload)
  const { token, user } = response.data

  return {
    token,
    user: UserFactory.fromApi(user)
  }
}

// Register
export async function register(payload: RegisterPayload): Promise<void> {
  await api.post('/register', payload)
}

// Reset Password
export async function resetPassword(email: string): Promise<void> {
  await api.post('/forgot-password', { email })
}
