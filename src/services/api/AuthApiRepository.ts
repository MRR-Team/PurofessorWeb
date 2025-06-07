import api from '@/services/axios.ts'
import type { LoginPayload, RegisterPayload } from '@/types/AuthTypes.ts'

export const AuthApiRepository = {
  async login(payload: LoginPayload) {
    return await api.post('/login', payload)
  },
  async register(payload: RegisterPayload) {
    return await api.post('/users', payload)
  },
  async resetPassword(email: string) {
    return await api.post('/forgot-password', { email })
  }
}
