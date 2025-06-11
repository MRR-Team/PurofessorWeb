import { defineStore } from 'pinia'
import type { User } from '@/models/User'

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
    setUsers(users: User[]) {
      this.users = users
    },

    updateUser(updatedUser: User) {
      const index = this.users.findIndex(u => u.id === updatedUser.id)
      if (index !== -1) {
        this.users[index] = updatedUser
      }
    },

    deleteUser(userId: number) {
      this.users = this.users.filter(user => user.id !== userId)
    },

    setLoading(isLoading: boolean) {
      this.isLoading = isLoading
    },

    setError(error: string | null) {
      this.error = error
    }
  }
})
