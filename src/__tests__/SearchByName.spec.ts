import { describe, it, expect } from 'vitest'
import { SearchByName } from '@/strategies/SearchStrategy'
import type { IChampion } from '@/interfaces/IChampion'

describe('SearchByName', () => {
  const strategy = new SearchByName()

  const champions: IChampion[] = [
    { id: 1, name: 'Aatrox', title: 'the Darkin Blade', role: 'fighter', difficulty: 'moderate', image: 'aatrox.png', inRotation: true, counters: [], recommendedItems: [], patchNotes: '' },
    { id: 2, name: 'Ahri', title: 'the Nine-Tailed Fox', role: 'mage', difficulty: 'easy', image: 'ahri.png', inRotation: false, counters: [], recommendedItems: [], patchNotes: '' },
    { id: 3, name: 'Akali', title: 'the Rogue Assassin', role: 'assassin', difficulty: 'hard', image: 'akali.png', inRotation: true, counters: [], recommendedItems: [], patchNotes: '' }
  ]

  it('should return champions whose name includes the input (case-insensitive)', () => {
    const result = strategy.search('a', champions)
    expect(result.length).toBe(3)
  })

  it('should return only exact matches', () => {
    const result = strategy.search('ahri', champions)
    expect(result.length).toBe(1)
    expect(result[0].name).toBe('Ahri')
  })

  it('should return an empty array when no matches found', () => {
    const result = strategy.search('zzzz', champions)
    expect(result).toEqual([])
  })
})
