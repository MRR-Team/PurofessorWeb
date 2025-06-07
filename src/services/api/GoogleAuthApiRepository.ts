import api from '@/services/axios.ts'

export class GoogleAuthApiRepository {
  static getGoogleRedirectUrl(): string {
    return 'http://localhost/api/auth/redirect/google'
  }

  static async fetchGoogleRedirectUrl(): Promise<string> {
    const response = await api.get<string>('/auth/redirect/google-url')
    return response.data
  }
}
