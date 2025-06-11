import { describe, it, expect, vi } from 'vitest'
import { useUserUseCase } from '@/application/usecases/UserUseCase'
import { User } from '@/domain/models/User'

vi.mock('@/application/services/UserService')

describe('useUserUseCase', () => {
  const { fetchUsers, updateUser, deleteUser } = useUserUseCase()


  it('deleteUser - should delete user', async () => {
    vi.mocked(await import('@/application/services/UserService')).UserService.prototype.deleteUser = vi.fn().mockResolvedValue(undefined)

    await expect(deleteUser(1)).resolves.toBeUndefined()
  })
})
