import type { IUser } from '@/interfaces/IUser'
import { User } from '@/models/User'

export class UserFactory {
  static fromApi(data: IUser): User {
    return new User(
      data.id,
      data.name,
      data.email,
      data.is_admin)
  }
}
