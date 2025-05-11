import type { IChampion } from '@/interfaces/IChampion'
import type { Champion } from '@/models/Champion'

export function toRawChampion(champion: Champion): IChampion {
  return {
    id: champion.id,
    name: champion.name,
    title: champion.title,
    role: champion.role,
    difficulty: champion.difficulty,
    image: champion.image,
    inRotation: champion.inRotation,
    counters: champion.counters,
    recommendedItems: champion.recommendedItems,
    patchNotes: champion.patchNotes
  }
}
