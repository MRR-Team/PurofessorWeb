export class Notification {
  constructor(
    public id: number,
    public title: string,
    public content: string,
    public type: 'info' | 'warning' | 'danger' | 'update',
    public createdAt: string // ISO string, np. 2025-05-15T12:34:56Z
  ) {}

  isCritical(): boolean {
    return this.type === 'danger' || this.type === 'warning'
  }

  shortPreview(): string {
    return this.content.length > 100 ? this.content.slice(0, 100) + '...' : this.content
  }

  getFormattedDate(): string {
    return new Date(this.createdAt).toLocaleString('pl-PL')
  }
}
