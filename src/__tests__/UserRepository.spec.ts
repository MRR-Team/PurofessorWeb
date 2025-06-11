import { describe, it, expect, vi, beforeEach } from 'vitest'
import { UserRepository } from '@/infrastructure/repositories/UserRepository'
import api from '@/infrastructure/axios'

vi.mock('@/infrastructure/axios')

describe('UserRepository', () => {
  beforeEach(() => {
    vi.resetAllMocks()
  })

  it('getAll calls GET /users', async () => {
    ;(api.get as any).mockResolvedValue({ data: { data: [{ id: 1, name: 'John', email: 'john@test.com', is_admin: false }] } })

    const result = await UserRepository.getAll()

    expect(api.get).toHaveBeenCalledWith('/users')
    expect(result[0].id).toBe(1)
  })

  it('updateUser calls PUT /users/:id', async () => {
    ;(api.put as any).mockResolvedValue({ data: { id: 1, name: 'John', email: 'john@test.com', is_admin: false } })

    const result = await UserRepository.updateUser(1, { name: 'John' })

    expect(api.put).toHaveBeenCalledWith('/users/1', { name: 'John' })
    expect(result.id).toBe(1)
  })

  it('deleteUser calls DELETE /users/:id', async () => {
    ;(api.delete as any).mockResolvedValue({})

    await UserRepository.deleteUser(1)

    expect(api.delete).toHaveBeenCalledWith('/users/1')
  })

  it('fetchCurrentUser calls GET /users', async () => {
    ;(api.get as any).mockResolvedValue({ data: { id: 1, name: 'John', email: 'john@test.com', is_admin: false } })

    const result = await UserRepository.fetchCurrentUser()

    expect(api.get).toHaveBeenCalledWith('/users')
    expect(result.id).toBe(1)
  })

  it('getCurrentUser calls GET /users/:id', async () => {
    ;(api.get as any).mockResolvedValue({ data: { id: 1, name: 'John', email: 'john@test.com', is_admin: false } })

    const result = await UserRepository.getCurrentUser(1)

    expect(api.get).toHaveBeenCalledWith('/users/1')
    expect(result.id).toBe(1)
  })
})
