import type {IUser} from "@/interfaces/IUser.ts";

export class User implements IUser{
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
