import api from '@/infrastructure/axios.ts'
import { UserFactory } from '@/domain/factories/UserFactory.ts'
import type { IUser } from '@/domain/interfaces/IUser.ts'
import type { User } from '@/domain/models/User.ts'

export const UserRepository = {
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
  },
  async fetchCurrentUser(): Promise<User> {
    const response = await api.get<IUser>('/users')
    return UserFactory.fromApi(response.data)
  },
  async getCurrentUser(userId: number): Promise<User> {
    const response = await api.get<IUser>(`/users/${userId}`)
    return UserFactory.fromApi(response.data)
  }
}
