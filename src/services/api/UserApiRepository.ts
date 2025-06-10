import api from '@/services/axios'
import { UserFactory } from '@/factories/UserFactory'
import type { IUser } from '@/interfaces/IUser'
import type { User } from '@/models/User'

export const UserApiRepository = {
  async getAll(): Promise<User[]> {
    const response = await api.get<{ data: IUser[] }>('/users')
    return response.data.data.map(UserFactory.fromApi)
  },

  async updateUser(userId: number, payload: Partial<IUser>): Promise<User> {
    const response = await api.put<IUser>(`/users/${userId}`, payload)
    return UserFactory.fromApi(response.data)
  },

  async deleteUser(userId: number): Promise<void> {
    await api.delete(`/users/${userId}`)
  }
}
