import { defineStore } from 'pinia'
import type { User } from '@/models/User'
import { UserService } from '@/services/UserService'

interface State {
  users: User[]
  isLoading: boolean
  error: string | null
}

export const useUserStore = defineStore('users', {
  state: (): State => ({
    users: [],
    isLoading: false,
    error: null
  }),

  actions: {
    async fetchUsers() {
      this.isLoading = true
      this.error = null

      try {
        this.users = await UserService.loadUsers()
      } catch (err: unknown) {
        this.error = err instanceof Error ? err.message : 'Nie udało się pobrać użytkowników.'
      } finally {
        this.isLoading = false
      }
    },

    async updateUser(userId: number, payload: Partial<User>) {
      try {
        const updatedUser = await UserService.updateUser(userId, payload)
        const index = this.users.findIndex(u => u.id === userId)
        if (index !== -1) {
          this.users[index] = updatedUser
        }
      } catch (err: unknown) {
        console.error('Nie udało się zaktualizować użytkownika:', err)
      }
    },

    async deleteUser(userId: number) {
      try {
        await UserService.deleteUser(userId)
        this.users = this.users.filter(user => user.id !== userId)
      } catch (err: unknown) {
        console.error('Nie udało się usunąć użytkownika:', err)
      }
    }
  }
})
