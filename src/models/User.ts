import type { IUser } from '@/interfaces/IUser'

export class User implements IUser {
  constructor(
    public id: number,
    public name: string,
    public email: string,
    public role: 'user' | 'admin'
  ) {}

  isAdmin(): boolean {
    return this.role === 'admin'
  }

  getDisplayName(): string {
    return this.name || this.email
  }
}
