import { UserService } from '@/services/UserService'
import { ValidatorUtils } from '@/utils/ValidatorUtils'
import type { User } from '@/models/User'

export function useProfileUseCase() {
  const userService = new UserService()

  function validateProfileData(name: string, email: string): string | null {
    return (
      ValidatorUtils.validateName(name) ||
      ValidatorUtils.validateEmail(email) ||
      null
    )
  }

  async function updateProfile(userId: number, name: string, email: string): Promise<User> {
    const updatedUser = await userService.updateUser(userId, { name, email })
    return updatedUser
  }

  async function fetchCurrentUser(userId: number): Promise<User> {
    return userService.getCurrentUser(userId)
  }

  return {
    validateProfileData,
    updateProfile,
    fetchCurrentUser
  }
}
