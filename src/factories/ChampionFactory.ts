import { Champion } from '@/models/Champion'

export class ChampionFactory {
  static fromApi(data: any): Champion {
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
