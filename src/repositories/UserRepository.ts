import api from '@/services/axios'
import { UserFactory } from '@/factories/UserFactory'
import type { User } from '@/models/User'

export class UserRepository {
  static async getCurrent(): Promise<User> {
    const res = await api.get('/me') // lub /user jeśli tak masz na backendzie
    return UserFactory.fromApi(res.data)
  }

  static async update(id: number, data: Partial<User>): Promise<User> {
    const res = await api.put(`/users/${id}`, data)
    return UserFactory.fromApi(res.data.user ?? res.data)
  }
}
