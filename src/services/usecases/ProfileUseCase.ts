import { UserApiRepository } from '@/services/api/UserApiRepository'
import { useUserSessionStore } from '@/stores/userSessionStore'

export function useProfileUseCase() {
  const store = useUserSessionStore()

  async function updateProfile(name: string, email: string) {
    store.setLoading(true)
    store.setError(null)

    try {
      const user = store.user
      if (!user) throw new Error('Brak zalogowanego użytkownika')

      const updatedUser = await UserApiRepository.updateProfile(user.id, {
        name,
        email
      })

      store.setUser(updatedUser)
    } catch (e: any) {
      const message =
        e?.response?.data?.message || e.message || 'Błąd aktualizacji profilu.'
      store.setError(message)
      throw new Error(message)
    } finally {
      store.setLoading(false)
    }
  }

  return {
    updateProfile
  }
}
