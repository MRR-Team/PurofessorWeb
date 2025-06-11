import type { User } from '@/domain/models/User.ts'
import type { IUser } from '@/domain/interfaces/IUser.ts'
import { UserRepository } from '@/infrastructure/repositories/UserRepository.ts'

export class UserService {
  constructor(private readonly userApiRepository = UserRepository) {}

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
