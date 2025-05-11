export interface IChampion {
  id: number
  name: string
  title: string
  role: string
  difficulty: string
  image: string
  inRotation: boolean
  counters: string[]
  recommendedItems: string[]
  patchNotes: string
}
