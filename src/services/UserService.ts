import { UserApiRepository } from '@/services/api/UserApiRepository'
import type { User } from '@/models/User'

export class UserService {
  static async loadUsers(): Promise<User[]> {
    return UserApiRepository.getAll()
  }

  static async updateUser(userId: number, payload: Partial<User>): Promise<User> {
    return UserApiRepository.updateUser(userId, payload)
  }

  static async deleteUser(userId: number): Promise<void> {
    return UserApiRepository.deleteUser(userId)
  }
}
