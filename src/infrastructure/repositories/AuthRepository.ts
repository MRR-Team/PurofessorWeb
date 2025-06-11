import api from '@/infrastructure/axios.ts'
import type { LoginPayload, RegisterPayload } from '@/domain/interfaces/IAuth.ts'

export const AuthRepository = {
  async login(payload: LoginPayload) {
    return await api.post('/login', payload)
  },
  async register(payload: RegisterPayload) {
    return await api.post('/register', payload)
  },
  async resetPassword(email: string) {
    return await api.post('/forgot-password', { email })
  },
  async logout() {
    return await api.post('/logout')
  }
}
