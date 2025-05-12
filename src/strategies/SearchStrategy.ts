import type { IChampion } from '@/interfaces/IChampion'

export interface SearchStrategy {
  search(input: string, list: IChampion[]): IChampion[]
}

export class SearchByName implements SearchStrategy {
  search(input: string, list: IChampion[]): IChampion[] {
    return list.filter(champ =>
      champ.name.toLowerCase().includes(input.toLowerCase())
    )
  }
}

export class SearchByRole implements SearchStrategy {
  constructor(private role: string) {}

  search(_: string, list: IChampion[]): IChampion[] {
    return list.filter(champ => champ.role.toLowerCase() === this.role.toLowerCase())
  }
}
