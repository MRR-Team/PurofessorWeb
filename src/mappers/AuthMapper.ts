import { UserFactory } from '@/factories/UserFactory'
import type { User } from '@/models/User'

export class AuthMapper {
  static fromLoginResponse(data: any): { token: string; user: User } {
    return {
      token: data.token,
      user: UserFactory.fromApi(data.user)
    }
  }
}
