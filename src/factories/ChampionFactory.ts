import { Champion } from '@/models/Champion'
import type { IChampion } from '@/interfaces/IChampion'

export class ChampionFactory {
  static fromApi(data: IChampion): Champion {
    return new Champion(
      data.id,
      data.name,
      data.title,
      data.role,
      data.difficulty,
      data.image,
      data.inRotation,
      data.counters ?? [],
      data.recommendedItems ?? [],
      data.patchNotes ?? ''
    )
  }
}
