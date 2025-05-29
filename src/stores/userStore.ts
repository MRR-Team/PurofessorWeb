import { defineStore } from 'pinia'
import { updateUserProfile, fetchCurrentUser, persistUser, clearUser, loadUserFromStorage } from '@/services/userService'
import type { User } from '@/models/User'

export const useUserStore = defineStore('user', {
  state: () => {
    const { user, token } = loadUserFromStorage()
    return {
      user: user as User | null,
      token,
      isLoading: false,
      error: null as string | null
    }
  },

  actions: {
    setUser(user: User, token: string) {
      this.user = user
      this.token = token
      persistUser(user, token)
    },

    logout() {
      this.user = null
      this.token = ''
      clearUser()
    },

    async updateProfile(name: string, email: string) {
      if (!this.user) return
      this.isLoading = true
      this.error = null

      try {
        const updated = await updateUserProfile(this.user.id, name, email)
        this.setUser(updated, this.token)
      } catch (err: any) {
        this.error = 'Nie udało się zaktualizować profilu'
      } finally {
        this.isLoading = false
      }
    },

    async fetchUser() {
      this.isLoading = true
      this.error = null
      try {
        const user = await fetchCurrentUser()
        this.setUser(user, this.token)
      } catch (err: any) {
        this.error = 'Nie udało się pobrać danych użytkownika'
      } finally {
        this.isLoading = false
      }
    }
  }
})
