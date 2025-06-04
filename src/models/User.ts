export class User {
  constructor(
    public id: number,
    public name: string,
    public email: string,
    public is_admin: boolean
  ) {}

  getDisplayName(): string {
    return this.name || this.email
  }
}
