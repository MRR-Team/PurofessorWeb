import { UserApiRepository } from '@/services/api/UserApiRepository'
import type { User } from '@/models/User'

export class UserService {
  static async loadUsers(): Promise<User[]> {
    return UserApiRepository.getAll()
  }

  static async updateUser(userId: number, payload: Partial<User>): Promise<User> {
    await UserApiRepository.updateUser(userId, payload)
    return UserApiRepository.getCurrentUser(userId)
  }


  static async deleteUser(userId: number): Promise<void> {
    return UserApiRepository.deleteUser(userId)
  }
  static async fetchCurrentUser(): Promise<User> {
    return UserApiRepository.fetchCurrentUser()
  }
  static async getCurrentUser(userId: number): Promise<User> {
    return UserApiRepository.getCurrentUser(userId)
  }


}
