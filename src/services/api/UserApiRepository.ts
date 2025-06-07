import api from '@/services/axios.ts'
import { UserFactory } from '@/factories/UserFactory.ts'
import type { IUser } from '@/interfaces/IUser.ts'
import type { User } from '@/models/User.ts'

export const UserApiRepository = {

  async updateProfile(userId: number, payload: Partial<IUser>): Promise<User> {
    const response = await api.put<IUser>(`/users/${userId}`, payload)
    return UserFactory.fromApi(response.data)
  }
}
