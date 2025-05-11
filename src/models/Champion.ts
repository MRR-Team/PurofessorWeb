import type { IChampion } from '@/interfaces/IChampion'

export class Champion implements IChampion {
  constructor(
    public id: number,
    public name: string,
    public title: string,
    public role: string,
    public difficulty: string,
    public image: string,
    public inRotation: boolean,
    public counters: string[],
    public recommendedItems: string[],
    public patchNotes: string
  ) {}

  isAvailable(): boolean {
    return this.inRotation
  }

  getDisplayName(): string {
    return `${this.name}, ${this.title}`
  }
}
