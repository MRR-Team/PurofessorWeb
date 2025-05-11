import axios from 'axios'
import type { InternalAxiosRequestConfig } from 'axios'

const instance = axios.create({
  baseURL: 'http://localhost:8000/api'
})

instance.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const token = localStorage.getItem('token')
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

export default instance
