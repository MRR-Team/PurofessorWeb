import { useUserStore } from '@/stores/userStore'
import { UserRepository } from '@/repositories/UserRepository'
import type { IUser } from '@/interfaces/IUser'

export async function updateProfile(name: string, email: string): Promise<void> {
  const store = useUserStore()
  const currentUser = store.user
  if (!currentUser) throw new Error('Brak użytkownika')

  const updatedUser: IUser = await UserRepository.update(currentUser.id, { name, email })
  store.setUser(updatedUser, store.token)
}
