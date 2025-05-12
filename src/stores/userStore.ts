import { defineStore } from 'pinia'
import type { IUser } from '@/interfaces/IUser'
import { updateUserData, getMe } from '@/services/userService'

export const useUserStore = defineStore('user', {
  state: () => ({
    token: localStorage.getItem('token') ?? '',
    user: localStorage.getItem('user')
      ? (JSON.parse(localStorage.getItem('user')!) as IUser)
      : (null as IUser | null),
    error: null as string | null,
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
      } catch (err: unknown) {
        if (err instanceof Error) {
          console.error('Błąd aktualizacji profilu:', err.message)
          this.error = err.message
        } else {
          this.error = 'Nie udało się zaktualizować profilu'
        }
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
      } catch (err: unknown) {
        if (err instanceof Error) {
          console.error('Błąd pobierania użytkownika:', err.message)
          this.error = err.message
        } else {
          this.error = 'Nie udało się pobrać danych użytkownika'
        }
      } finally {
        this.isLoading = false
      }
    }
  }
})
