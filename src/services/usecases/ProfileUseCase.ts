import { UserService } from '@/services/UserService'
import { useUserSessionStore } from '@/stores/userSessionStore'
import { ValidatorUtils } from '@/utils/ValidatorUtils'
import { UserPersistenceAdapter } from '@/services/adapters/UserPersistenceAdapter'
import { User } from '@/models/User'

export function useProfileUseCase() {
  const store = useUserSessionStore()

  function validateProfileData(name: string, email: string): string | null {
    return (
      ValidatorUtils.validateName(name) ||
      ValidatorUtils.validateEmail(email) ||
      null
    )
  }

  async function updateProfile(name: string, email: string): Promise<void> {
    if (!store.user) {
      throw new Error('Brak użytkownika w sesji.')
    }

    const updatedUser = await UserService.updateUser(store.user.id, {
      name,
      email
    })

    const mergedUser = new User(
      updatedUser.id,
      updatedUser.name,
      updatedUser.email,
      store.user.is_admin
    )

    store.setUser(mergedUser)
    UserPersistenceAdapter.saveUser(mergedUser)
  }

  return {
    validateProfileData,
    updateProfile
  }
}
