import { User } from '@/domain/models/User'
import {useTranslation} from "@/composables/useTranslation.ts";
const { t } = useTranslation()

const USER_KEY = 'user'
const TOKEN_KEY = 'token'

export const UserPersistenceAdapter = {
  saveUser(user: User) {
    const rawUser = {
      id: user.id,
      name: user.name,
      email: user.email,
      is_admin: user.is_admin
    }
    localStorage.setItem(USER_KEY, JSON.stringify(rawUser))
  },

  getUser(): User | null {
    const data = localStorage.getItem(USER_KEY)
    if (!data) return null

    try {
      const parsed = JSON.parse(data)
      return new User(parsed.id, parsed.name, parsed.email, parsed.is_admin)
    } catch (e) {
      console.error(t.value.failedToParse, e)
      return null
    }
  },

  saveToken(token: string) {
    localStorage.setItem(TOKEN_KEY, token)
  },

  getToken(): string | null {
    return localStorage.getItem(TOKEN_KEY)
  },

  clearSession() {
    localStorage.removeItem(USER_KEY)
    localStorage.removeItem(TOKEN_KEY)
  }
}
