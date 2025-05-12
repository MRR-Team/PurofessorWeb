import { defineStore } from 'pinia'
import type { IUser } from '@/interfaces/IUser'
import { updateUserData, getMe } from '@/services/userService'

type State = {
  token: string
  user: IUser | null
  error: string | null
  isLoading: boolean
}

export const useUserStore = defineStore('user', {
  state: (): State => ({
    token: localStorage.getItem('token') ?? '',
    user: localStorage.getItem('user')
      ? (JSON.parse(localStorage.getItem('user')!) as IUser)
      : null,
    error: null,
    isLoading: false
  }),

  actions: {
    setUser(user: IUser, token: string) {
      this.user = user
      this.token = token
      localStorage.setItem('user', JSON.stringify(user))
      localStorage.setItem('token', token)
    },

    logout() {
      this.user = null
      this.token = ''
      localStorage.removeItem('user')
      localStorage.removeItem('token')
    },

    async updateProfile(name: string, email: string): Promise<void> {
      if (!this.user) return
      this.isLoading = true
      this.error = null

      try {
        const updatedUser = await updateUserData(this.user.id, { name, email })
        this.setUser(updatedUser, this.token)
      } catch (e: unknown) {
        this.error = e instanceof Error ? e.message : 'Nie udało się zaktualizować profilu'
      } finally {
        this.isLoading = false
      }
    },

    async fetchCurrentUser(): Promise<void> {
      this.isLoading = true
      this.error = null

      try {
        const me = await getMe()
        this.setUser(me, this.token)
      } catch (e: unknown) {
        this.error = e instanceof Error ? e.message : 'Nie udało się pobrać danych użytkownika'
      } finally {
        this.isLoading = false
      }
    }
  }
})
