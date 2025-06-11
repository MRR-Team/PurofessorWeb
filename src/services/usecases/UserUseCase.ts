import { UserService } from '@/services/UserService'
import type { User } from '@/models/User'
import type { IUser } from '@/interfaces/IUser'

export function useUserUseCase() {
  const userService = new UserService()

  async function fetchUsers(): Promise<User[]> {
    return userService.loadUsers()
  }

  async function updateUser(userId: number, payload: Partial<IUser>): Promise<User> {
    return userService.updateUser(userId, payload)
  }

  async function deleteUser(userId: number): Promise<void> {
    return userService.deleteUser(userId)
  }

  return {
    fetchUsers,
    updateUser,
    deleteUser
  }
}
