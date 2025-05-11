import { User } from '@/models/User'

export class UserFactory {
  static fromApi(data: any): User {
    return new User(
      data.id,
      data.name,
      data.email,
      data.role
    )
  }
}
