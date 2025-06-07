import api from '@/services/axios'

export class GoogleAuthRepository {
  static getGoogleRedirectUrl(): string {
    return 'http://localhost/api/auth/redirect/google'
  }

  static async fetchGoogleRedirectUrl(): Promise<string> {
    const response = await api.get<string>('/auth/redirect/google-url')
    return response.data
  }
}
