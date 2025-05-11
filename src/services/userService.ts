import { useUserStore } from '@/stores/userStore'
import { UserRepository } from '@/repositories/UserRepository'

export async function updateProfile(name: string, email: string) {
  const store = useUserStore()
  const currentUser = store.user
  if (!currentUser) throw new Error('Brak użytkownika')

  const updatedUser = await UserRepository.update(currentUser.id, { name, email })
  store.setUser(updatedUser, store.token)
}
