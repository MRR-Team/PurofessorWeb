import api from '@/services/axios';
import { User } from '@/models/User';
import type { IUser } from '@/interfaces/IUser';

export const UserApiService = {
  async getMe(): Promise<User> {
    const response = await api.get<IUser>('/me');
    const { id, name, email, role } = response.data;
    return new User(id, name, email, role);
  },

  async updateProfile(userId: number, payload: Partial<IUser>): Promise<User> {
    const response = await api.put<IUser>(`/users/${userId}`, payload);
    const { id, name, email, role } = response.data;
    return new User(id, name, email, role);

  }
};
