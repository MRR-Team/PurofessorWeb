import { UserRepository } from '@/repositories/UserRepository'
import type { IUser } from '@/interfaces/IUser'

export async function updateUserData(userId: number, data: { name: string; email: string }): Promise<IUser> {
  return await UserRepository.update(userId, data)
}

export async function getMe(): Promise<IUser> {
  return await UserRepository.getCurrent()
}
