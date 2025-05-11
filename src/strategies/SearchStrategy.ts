import type { Champion } from '@/models/Champion'

export interface SearchStrategy {
  search(input: string, list: Champion[]): Champion[]
}

export class SearchByName implements SearchStrategy {
  search(input: string, list: Champion[]): Champion[] {
    return list.filter(champ =>
      champ.name.toLowerCase().includes(input.toLowerCase())
    )
  }
}

export class SearchByRole implements SearchStrategy {
  constructor(private role: string) {}

  search(_: string, list: Champion[]): Champion[] {
    return list.filter(champ => champ.role.toLowerCase() === this.role.toLowerCase())
  }
}
