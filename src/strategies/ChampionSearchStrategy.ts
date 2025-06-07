import type { Champion } from '@/models/Champion'

export interface ChampionSearchStrategy<T> {
  search(input: string, list: T[]): T[]
}

export class SearchByName implements ChampionSearchStrategy<Champion> {
  search(input: string, list: Champion[]): Champion[] {
    return list.filter(champ =>
      champ.name.toLowerCase().includes(input.toLowerCase())
    )
  }
}

export class SearchByRole implements ChampionSearchStrategy<Champion> {
  constructor(private role: string) {}

  search(_: string, list: Champion[]): Champion[] {
    return list.filter(champ => champ.role.toLowerCase() === this.role.toLowerCase())
  }
}
