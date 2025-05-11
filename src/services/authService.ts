import axios from './axios'

interface LoginPayload {
  email: string
  password: string
}

interface LoginResponse {
  token: string
  user: {
    id: number
    name: string
    email: string
    role: string
  }
}

interface RegisterPayload {
  name: string
  email: string
  password: string
  password_confirmation: string
}

export async function register(payload: RegisterPayload): Promise<void> {
  await axios.post('/register', payload)
}
export async function resetPassword(email: string): Promise<void> {
  await axios.post('/forgot-password', { email })
}
export async function login(payload: LoginPayload): Promise<LoginResponse> {
  const response = await axios.post<LoginResponse>(
    'http://localhost:8000/api/login', // Zmień jak backend ustali endpoint
    payload
  )
  return response.data
}
