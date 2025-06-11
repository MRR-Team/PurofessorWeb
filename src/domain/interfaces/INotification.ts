export interface INotification {
  id: number
  title: string
  content: string
  type: 'info' | 'warning' | 'danger' | 'update'
  createdAt?: string
  created_at?: string
}
