import api from '@/services/axios'
import { UserFactory } from '@/factories/UserFactory'
import type { IUser } from '@/interfaces/IUser'
import type { User } from '@/models/User'

export const UserApiService = {
  async getMe(): Promise<User> {
    const response = await api.get<IUser>('/me')
    return UserFactory.fromApi(response.data)
  },

  async updateProfile(userId: number, payload: Partial<IUser>): Promise<User> {
    const response = await api.put<IUser>(`/users/${userId}`, payload)
    return UserFactory.fromApi(response.data)
  }
}
