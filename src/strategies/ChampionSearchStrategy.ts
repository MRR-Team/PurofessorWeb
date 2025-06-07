import type { Champion } from '@/models/Champion'

export interface SearchStrategy<T> {
  search(input: string, list: T[]): T[]
}

export class SearchByName implements SearchStrategy<Champion> {
  search(input: string, list: Champion[]): Champion[] {
    return list.filter(champ =>
      champ.name.toLowerCase().includes(input.toLowerCase())
    )
  }
}

export class SearchByRole implements SearchStrategy<Champion> {
  constructor(private role: string) {}

  search(_: string, list: Champion[]): Champion[] {
    return list.filter(champ => champ.role.toLowerCase() === this.role.toLowerCase())
  }
}
