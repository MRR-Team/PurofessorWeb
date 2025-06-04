import { defineStore } from 'pinia'
import type { User } from '@/models/User'
import { UserFactory } from '@/factories/UserFactory'
import type { IUser } from '@/interfaces/IUser'

interface State {
  user: User | null
  token: string | null
  isLoading: boolean
  error: string | null
}

export const useUserSessionStore = defineStore('userSession', {
  state: (): State => ({
    user: null,
    token: null,
    isLoading: false,
    error: null
  }),

  actions: {
    setUser(rawUser: IUser) {
      this.user = UserFactory.fromApi(rawUser)
    },

    setToken(token: string) {
      this.token = token
    },

    setLoading(value: boolean) {
      this.isLoading = value
    },

    setError(message: string | null) {
      this.error = message
    },

    clearSession() {
      this.user = null
      this.token = null
      this.error = null
    }
  }
})
