import { User } from '@/models/User'
import type { IUser } from '@/interfaces/IUser'

export class UserFactory {
  static fromApi(data: IUser): User {
    return new User(
      data.id,
      data.name,
      data.email,
      data.role
    )
  }
}
