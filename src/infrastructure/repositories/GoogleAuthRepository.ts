import api from '@/infrastructure/axios.ts'

export class GoogleAuthRepository {
  static getGoogleRedirectUrl(): string {
    return 'https://collegiumpizzerona.pl/api/auth/redirect/google'
  }

  static async fetchGoogleRedirectUrl(): Promise<string> {
    const response = await api.get<string>('/auth/redirect/google-url')
    return response.data
  }
}
