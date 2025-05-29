import api from '@/services/axios'
import type { LoginPayload, RegisterPayload } from '@/types/AuthTypes'

export const AuthRepository = {
  async login(payload: LoginPayload) {
    return await api.post('/login', payload)
  },
  async register(payload: RegisterPayload) {
    return await api.post('/register', payload)
  },
  async resetPassword(email: string) {
    return await api.post('/forgot-password', { email })
  }
}
