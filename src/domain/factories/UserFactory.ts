import type { IUser } from '@/domain/interfaces/IUser.ts'
import { User } from '@/domain/models/User.ts'

export class UserFactory {
  static fromApi(data: IUser): User {
    return new User(
      data.id,
      data.name,
      data.email,
      data.is_admin)
  }
}
