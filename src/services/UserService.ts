import type { User } from '@/models/User'
import type { IUser } from '@/interfaces/IUser'
import { UserApiRepository } from '@/services/api/UserApiRepository'

export class UserService {
  constructor(private readonly userApiRepository = UserApiRepository) {}

  async loadUsers(): Promise<User[]> {
    return this.userApiRepository.getAll()
  }

  async updateUser(userId: number, payload: Partial<IUser>): Promise<User> {
    await this.userApiRepository.updateUser(userId, payload)
    return this.userApiRepository.getCurrentUser(userId)
  }

  async deleteUser(userId: number): Promise<void> {
    return this.userApiRepository.deleteUser(userId)
  }

  async getCurrentUser(userId: number): Promise<User> {
    return this.userApiRepository.getCurrentUser(userId)
  }
}
