import { defineStore } from 'pinia'
import type { IUser } from '@/interfaces/IUser'

export const useUserStore = defineStore('user', {
  state: () => ({
    token: localStorage.getItem('token') || '',
    user: localStorage.getItem('user')
      ? JSON.parse(localStorage.getItem('user')!) as IUser
      : null as IUser | null
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
    }
  }
})
