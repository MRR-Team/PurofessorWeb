import api from '@/services/axios'

export const UserRepository = {
  async update(id: number, data: { name: string, email: string }) {
    return await api.put(`/users/${id}`, data)
  },
  async getMe() {
    return await api.get('/me')
  }
}
