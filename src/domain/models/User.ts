import type {IUser} from "@/domain/interfaces/IUser.ts";

export class User implements IUser{
  constructor(
    public id: number,
    public name: string,
    public email: string,
    public is_admin: boolean
  ) {}
}
